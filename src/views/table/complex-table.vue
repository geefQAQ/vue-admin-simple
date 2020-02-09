<template>
    <div class="va-app-container">
        <el-table
            :data="tableData"
            border
            fit
            size="small"
        >
            <el-table-column prop="id" label="ID" width="40"></el-table-column>
            <el-table-column prop="date" label="日期" width="200"></el-table-column>

            <el-table-column prop="title" label="标题" width="400">
                <template slot-scope="{row}">
                    <span class="va-link-type" @click="handleClickEdit(row)">{{row.title}} </span>
                    <el-tag type="primary" plain>{{row.region}}</el-tag>
                </template>
            </el-table-column>

            <el-table-column prop="author" label="作者"></el-table-column>

            <el-table-column prop="imp" label="级别">
                <template slot-scope="{row}">
                    <span style="font-size: 22px;" v-for="(item, index) in row.imp" :key="index">
                        <i class=el-icon-star-on />
                    </span>
                </template>
            </el-table-column>

            <el-table-column align="center" prop="readings" label="阅读数">
                <template slot-scope="{row}">
                    <span class="va-link-type" @click="handleReadingsDialog(row.readings)">{{clacReadings(row.readings)}}</span>
                </template>
            </el-table-column>

            <el-table-column align="center" prop="status" label="状态">
                <template slot-scope="{row}">
                    <el-tag class="va-table-tag" :type="statusType(row.status)">{{row.status}}</el-tag>
                </template>
            </el-table-column>

            <el-table-column label="动作" width="250">
                <!-- 这是我的做法，只用两个元素，加上一大堆的判断，很麻烦 -->
                <!-- <template slot-scope="scope">
                    <el-tag
                        @click="scope.row.status === 'draft' || scope.row.status === 'deleted' ? scope.row.status = 'published' :  scope.row.status = 'draft'"
                        :effect="scope.row.status === 'draft' || scope.row.status === 'deleted' ? 'dark' : 'light'"
                        :type="scope.row.status === 'draft' || scope.row.status === 'deleted' ? 'success' : 'info'"
                    >
                        {{scope.row.status !== 'published' ? 'Publish' : 'Draft'}} 
                    </el-tag>
                    <el-tag
                        @click="scope.row.status === 'draft' || scope.row.status === 'published' ? scope.row.status = 'deleted' :  scope.row.status = 'draft'"
                        :effect="scope.row.status === 'draft' || scope.row.status === 'published' ? 'dark' : 'light'"
                        :type="scope.row.status === 'draft' || scope.row.status === 'published' ? 'danger' : 'info'"
                    >
                        {{scope.row.status !== 'deleted' ? 'Delete' : 'Draft'}} size='
   '                 </el-tag>
                </template> -->

                <!-- 正规军的方法 -->
                <!-- 三个原则： 1、只能有2个按钮 2、按钮不能相同 3、位置始终是publish -> draft -> delete -->
                <!-- 所以这种方法更加灵活，特别是位置，能肯定是publish 然后到 delete，只要按钮定宽，就不会发生布局抖动 -->
                <template slot-scope="{row}">
                    <el-button class="va-table-button" type="primary" size='mini'>编辑</el-button>
                    <el-button v-if="row.status !== '发布'" @click="row.status = '发布'" class="va-table-button" type="success" size='mini'>发布</el-button>
                    <el-button v-if="row.status !== '草稿'" @click="row.status = '草稿'" class="va-table-button" size='mini' plain>草稿</el-button>
                    <el-button v-if="row.status !== '删除'" @click="row.status = '删除'" class="va-table-button" type="danger" size='mini'>删除</el-button>
                </template>
            </el-table-column>

        </el-table>
        <el-dialog title="阅读数" :visible.sync="readingsDialogVisible">
            <el-table :data="pvData" border>
                <el-table-column prop="key" label="设备"></el-table-column>
                <el-table-column prop="pv" label="Pv"></el-table-column>
            </el-table>
            <span slot="footer" style="text-align: right;">
                <el-button type="primary" @click="readingsDialogVisible = false">确定</el-button>
            </span>
        </el-dialog>

        <el-dialog :visible.sync="editDialogVisible" :before-close="handleBeforeClose">
            <el-form ref="dataForm" :model="temp" :rules="rules" label-width="80px" style="width: 400px;">
                <el-form-item label="标题" prop="title">
                    <el-input v-model="temp.title"></el-input>
                </el-form-item>
                <el-form-item label="区域">
                    <el-select v-model="temp.region">
                        <el-option v-for="(item, index) in regions" :key="index" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="时间" prop="date">
                    <!-- 注意，date组件绑定的是数值型的date -->
                    <el-date-picker type="datetime" v-model="temp.date" />
                </el-form-item>
                <el-form-item label="状态">
                    <el-select v-model="temp.status">
                        <el-option v-for="(item, index) in status" :key="index" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="重要性">
                    <el-rate
                        v-model="temp.imp"
                        :max="3"
                        :colors="['#99A9BF', '#F7BA2A', '#FF9900']"
                        style="margin-top: 10px;"
                    ></el-rate>
                </el-form-item>
                <el-form-item label="备注">
                    <el-input v-model="temp.remark" type="textarea" placeholder="请输入备注" ></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" style="text-align: right;">
                <el-button plain @click="editDialogVisible = false">取消</el-button>
                <el-button type="primary" @click="handleEditConfirm">确认</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
import { getComplexList, updateArticle } from '@/api/table'
const statusType = {
    '发布': 'success',
    '草稿': 'info',
    '删除': 'danger'
}
   
export default {
    data() {
        return {
            tableData: null,
            pvData: [],
            readingsDialogVisible: false,
            editDialogVisible: false,
            editDialogForm: {
                title: '',
            },
            regions: [
                { label: '中国', value: '中国' },
                { label: '美洲', value: '美洲' },
                { label: '欧洲', value: '欧洲' },
                { label: '日本', value: '日本' },
            ],
            status: [
                { label: '草稿', value: '草稿' },
                { label: '发布', value: '发布' },
                { label: '删除', value: '删除' },
            ],
            // temp
            temp: {
                title: '',
                region: '',
                date: new Date(),
                status: '',
                remark: '',
            },
            // form rules
            rules: {
                title: [{ required: true, message: '请输入标题', trigger: 'blur' }],
                date: [{ type:'date', required: true, message: '请选择时间', trigger: 'change' }]
            }
        }
    },
    mounted() {
        this.fetchData()
    },
    methods: {
        fetchData() {
            // 注意，readings是一个数组，如果是对象形式的话，处理起来会比较麻烦，特别是在table上显示，ui组件上是用数组来实现的。
            getComplexList().then(response => {
                this.tableData = response.data.items
            })
        },
        statusType(p) {
            return statusType[p]
        },
        handleReadingsDialog(r) {
            this.readingsDialogVisible = true
            this.pvData = r
            // 用reduce怎么实现呢？
            // reduce锤子，先fitler再reduce
            let mobile = r
                .filter(i => i.key === 'IOS' || i.key === 'Android')
                .reduce((acc, cur) => acc + cur.pv, 0)
            // for(let i of r) {
            //     if(i.key === 'IOS' || i.key === 'Android') {
            //         mobile = mobile + i.pv
            //     }
            // }
            // 如果数组中没有key为Mobile的元素，才push
            if(!this.pvData.some(i => i.key === 'Mobile')) {
                this.pvData.push({key: 'Mobile', pv: mobile})
            }
        },
        // 计算总阅读数
        clacReadings(r) {
            // 这是最简单容易理解的写法
            // let re = 0
            // for(let i of r) {
            //     re = re + i.pv
            // }
            // return re

            // reduce写法
            // https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce
            // 先根据条件过滤掉不需要加入计算的元素
            // 然后通过reduce进行累加
            return r
                .filter(i => i.key !== 'Mobile')
                .reduce((acc, cur) => {
                    return acc + cur.pv
                }, 0)
        },
        // 点击标题和编辑按钮
        handleClickEdit(row) {
            // this.temp = item
            this.temp = Object.assign({}, row) // 复制row数据，不能直接赋值，否则会因为值引用，两个变量都指向同一个数据源，改变哪个都会改变
            // 注意，要改成数值型的date，才能被组件识别
            this.temp.date = new Date(this.temp.date).getTime()
            this.editDialogVisible = true
        },
        // 确认关闭
        // 貌似这个有点问题，点击取消，然后在取消动画消失前再点击空白处，会弹出确认框，所以还是要在取消按钮上添加追加确认的功能
        handleBeforeClose(done) {
            // 为什么在button 上绑定这个函数时，不能正常运行
            this.$confirm('确认关闭？')
                .then( _ => {
                    done()
                })
                .catch( _=> {})
        },
        // 修改表单确认
        handleEditConfirm() {
            this.$refs.dataForm.validate((valid) => {
                if(!valid) {
                    return
                }
                // this.temp.date = 
                updateArticle(this.temp)
                    .then(response => {
                        for(let i in this.tableData) {
                            if(this.tableData[i].id === this.temp.id) {
                                // 根据id，找到对应更改的表格项，然后修改表格
                                this.tableData.splice(i, 1, this.temp)
                            }
                        }
                    })
                    .then(() => {
                        this.editDialogVisible = false
                    })
            })
        }
    }
}
</script>
<style lang="scss" scoped>
.va-table-button {
    width: 64px;
    padding: 7px 10px;
    font-weight: bold;
}
.va-table-tag {
    width: 64px;
}
.el-icon-star-on {
    // font-size: 22px;
}
</style>