<template>
    <div class="va-app-container">
        <div class="va-filter-container">
            <el-input v-model="filterData.title" @keyup.native.enter="fetchData" placeholder="搜索标题" style="width: 300px;margin-right: 5px;"></el-input>
            <el-select v-model="filterData.importance" placeholder="重要性" clearable style="width: 100px; margin-right: 5px;">
                <el-option v-for="(item, index) in importantOptions" :key="index" :label="item" :value="item" />
            </el-select>
            <el-select v-model="filterData.region" placeholder="地区" clearable style="width: 150px; margin-right: 5px;">
                <el-option v-for="(item, index) in regions" :key="index" :label="item.label" :value="item.value" />
            </el-select>
            <el-select v-model="filterData.sort" @change="fetchData" style="width: 90px; margin-right: 5px;">
                <el-option v-for="(item, index) in sortOptions" :key="index" :label="item.label" :value="item.value" />
            </el-select>
            <el-button @click="fetchData" class="va-button-search" type="primary">
                <i class="el-icon-search" />搜索
            </el-button>
            <el-button @click="handleCreateClick" class="va-button-create" type="primary">
                <i class="el-icon-edit" />创建
            </el-button>
            <el-button @click="handleDownload" class="va-button-export" type="primary">
                <i class="el-icon-download" />导出
            </el-button>
        </div>
        <el-table
            :data="list"
            ref="table"
            v-loading="listLoading"
            border
            fit
            highlight-current-row
            @sort-change="sortChange"
        >
            <el-table-column  :sort-orders="['descending', 'ascending']" :class-name="getSortClass()" sortable="custom" align="center" prop="id" label="ID" width="80"></el-table-column>

            <el-table-column prop="date" align="center" label="日期" width="150">
                <template slot-scope="{row}">
                    <span>{{ row.date | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
                </template>
            </el-table-column>

            <el-table-column prop="title" label="标题" min-width="400">
                <template slot-scope="{row}">
                    <span class="va-link-type" @click="handleClickEdit(row)">{{row.title}} </span>
                    <el-tag type="primary" plain>{{row.region}}</el-tag>
                </template>
            </el-table-column>

            <el-table-column prop="author" label="作者" width="80"></el-table-column>

            <el-table-column prop="imp" label="级别" width="100">
                <template slot-scope="{row}">
                    <!-- v-for可以直接遍历数字，如果imp为3，那么item相应为1，2，3，估计是vue自动转换为[1,2,3]这就很牛批 -->
                    <i v-for="(item, index) in row.imp" :key="index" class="el-icon-star-on" />
                </template>
            </el-table-column>

            <el-table-column align="center" prop="readings" label="阅读数" width="100">
                <template slot-scope="{row}">
                    <span class="va-link-type" @click="handleReadingsDialog(row.readings)">{{calcReadings(row.readings)}}</span>
                </template>
            </el-table-column>

            <el-table-column align="center" prop="status" label="状态" width="150">
                <template slot-scope="{row}">
                    <el-tag class="va-table-tag" :type="statusType(row.status)">{{row.status}}</el-tag>
                </template>
            </el-table-column>

            <el-table-column align="center" label="动作" width="240">
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
                    <el-button @click="handleClickEdit(row)" class="va-table-button" type="primary" size='mini'>编辑</el-button>
                    <el-button v-if="row.status !== '发布'" @click="row.status = '发布'" class="va-table-button" type="success" size='mini'>发布</el-button>
                    <el-button v-if="row.status !== '草稿'" @click="row.status = '草稿'" class="va-table-button" size='mini' plain>草稿</el-button>
                    <el-button v-if="row.status !== '删除'" @click="row.status = '删除'" class="va-table-button" type="danger" size='mini'>删除</el-button>
                </template>
            </el-table-column>
        </el-table>

        <!-- 分页 -->
        <!-- <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="filterData.currentPage"
            :page-sizes="[5, 10, 20, 30]"
            layout="total, sizes, prev, pager, next, jumper"
            style="margin-top: 20px;"
            :total="total">
        </el-pagination> -->
        <pagination 
            :total="total" 
            :page.sync="filterData.currentPage"
            :limit.sync="filterData.pageSize"
            @pagination="fetchData"
        />
        
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
            <el-form v-loading="dialogLoading" ref="dataForm" :model="temp" :rules="rules" label-width="80px" class="va-dialog-form">
                <el-form-item label="标题" prop="title">
                    <el-input v-model="temp.title"></el-input>
                </el-form-item>
                <el-form-item label="区域" prop="region">
                    <el-select v-model="temp.region">
                        <el-option v-for="(item, index) in regions" :key="index" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="时间" prop="date">
                    <!-- 注意，date组件绑定的是数值型的date -->
                    <el-date-picker type="datetime" v-model="temp.date" />
                </el-form-item>
                <el-form-item label="状态" prop="status">
                    <el-select v-model="temp.status">
                        <el-option v-for="(item, index) in status" :key="index" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="重要性" prop="imp">
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
                <!-- <el-button plain @click="editDialogVisible = false">取消</el-button> -->
                <el-button plain @click="handleBeforeClose">取消</el-button>
                <el-button type="primary" @click="handleDialogConfirm">确认</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
import { getComplexList, updateArticle, createArticle } from '@/api/article'
import { parseTime } from '@/utils'
import Pagination from '@/components/Pagination'

const statusType = {
    '发布': 'success',
    '草稿': 'info',
    '删除': 'danger'
}
   
export default {
    components: {
        Pagination
    },
    data() {
        return {
            list: null,
            total: 0,
            listLoading: true,
            dialogLoading: false,
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
            sortOptions: [
                { label: 'ID升序', value: 'ascending' },
                { label: 'ID降序', value: 'descending' },
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
                region: [{ required: true, message: '请选择地区', tigger: 'change'}],
                // imp的校验不起作用？ 答：起作用啊，只不过好像还有点问题
                imp: [{ required: true, message: '请选择重要性', trigger: 'chagne' }],
                status: [{ required: true, message: '请选择状态', trigger: 'change' }],
                date: [{ type:'date', required: true, message: '请选择时间', trigger: 'change' }]
            },
            filterData: {
                title: '',
                importance: null,
                region: '',
                sort: 'ascending',
                // 分页
                currentPage: 1,
                pageSize: 10,
            },
            importantOptions: [1, 2, 3],
            // 对话框状态
            dialogStatus: 'update',
        }
    },
    // 监听一个对象值的变化
    // watch: {
    //     filterData : {
    //         deep: true,
    //         handler(val) {
    //             console.log('filterData', val)
    //         }
    //     }
    // },
    filters: {
        // 不知道为什么不能直接用import进来的parseTime方法，只能添加filters让parseTime起效
        parseTime(time, format) {
            return parseTime(time, format)
        }
    },
    // 注意，这里是created，而不是用mounted，具体区别看官方文档，可简单理解为，created是html生成前，mounted是后，而且mounted可以update
    created() {
        this.fetchData()
    },
    methods: {
        // 请求数据
        fetchData() {
            this.listLoading = true
            // trim一下title
            if(this.filterData.title) this.filterData.title = this.filterData.title.trim()
            // 注意，readings是一个数组，如果是对象形式的话，处理起来会比较麻烦，特别是在table上显示，ui组件上是用数组来实现的。
            getComplexList(this.filterData).then(response => {
                this.list = response.data.items
                this.total = response.data.total
            })

            // 模拟请求到数据的时间
            setTimeout(() => {
                this.listLoading = false
            }, 0.5 * 1000)
        },
        // 点击ID小箭头
        sortChange(p) {
            // 注意，在select改变sort，并不会触发事件，只有当点击箭头才是触发事件的条件之一，所以要动态改变箭头样式不能在事件监听这里完成，要用ui组件提供的class-name
            // 参数{prop: 'id', order: 'ascending'}
            let { prop, order } = p
            if(prop === 'id') {
                if(order === 'ascending') { this.filterData.sort = 'ascending' }
                else if(order === 'descending') {this.filterData.sort = 'descending' }
                this.fetchData()
            }
        },
        // 根据排序改变箭头样式(初始化箭头样式)
        getSortClass() {
            console.log('test git 分支')
            // 这样处理有bug，当点击+change后，会增加类名而不是替换类名，也就是说两个类名同时存在，
            // th元素为该列的第一个元素，div元素为子元素，在改变class-name时，会在th上增加，在div上改变，点箭头，再按选择，会让th增加
            // 我想到的解决方法是获取类名，再作处理，有点繁琐，再想想有没有更简单的办法，比如ui组件的属性。先不处理。
            // 各种方式都试过都不行，因为sort-change是增加ascending/descending，但并不是通过class-name增加，ui在class-name中应该是替换，而不是增加，table是高度处理过的组件，很难再独立处理一个单元格。
            return this.filterData.sort === 'ascending' ? 'ascending' : 'descending'
        },
        // 状态样式
        statusType(p) {
            return statusType[p]
        },

        // 点击标题和编辑按钮
        handleClickEdit(row) {
            this.dialogStatus = 'update'
            // this.temp = item
            this.temp = Object.assign({}, row) // 复制row数据，不能直接赋值，否则会因为值引用，两个变量都指向同一个数据源，改变哪个都会改变
            // 注意，1、要改成数值型的date，才能被组件识别
            // 2、复制数据的时候，date对象会复制为string，所以校验类型的时候会报错，所以要对date进行类型转换
            // 3、如何整合到assign中呢，或者有没有必要呢? 答：没必要，也没必要一定转换成date，数字也可以，ui组件会识别并转换
            // this.temp.date = new Date(+this.temp.date)
            this.temp.date = +this.temp.date
            this.editDialogVisible = true
        },
        // 创建文章
        handleCreateClick() {
            this.dialogStatus = 'create',
            this.resetTemp();
            this.editDialogVisible = true
        },
        // 重置temp
        resetTemp() {
            this.temp = {
                title: '',
                region: '',
                date: '',
                status: '',
                remark: '',
                imp: null,
            }
        },
        // 修改表单确认
        handleEditSubmit() {
            this.dialogLoading = true
            this.$refs.dataForm.validate((valid) => {
                if(!valid) { return }
                // 发出post请求
                updateArticle(this.temp)
                    .then(res => {
                        // 模拟请求延迟
                        for(let i in this.list) {
                            if(this.list[i].id === this.temp.id) {
                                // 根据id，找到对应更改的表格项，然后修改表格
                                this.list.splice(i, 1, this.temp) // 删除i元素开始，长度为1的个数，然后用this.temp换上
                            }
                        }
                        setTimeout(() => {
                            this.dialogLoading = false
                            this.editDialogVisible = false
                            this.$notify({
                                title: `${res.data}`,
                                type: 'success'
                            })
                        }, 1000)
                    })
            })
        },
        handleCreateSubmit() {
            this.$refs.dataForm.validate(valid => {
                if(!valid) { return }
                createArticle(this.temp)
                    .then(res => {
                        let item = this.temp
                        item.id = Math.round(Math.random() * 100) + 1000
                        item.author = '一个帅逼'
                        item.readings = [
                            { key: 'PC', pv: 0 },
                            { key: 'IOS', pv: 0 },
                            { key: 'Android', pv: 0 }
                        ]
                        this.list.unshift(item)
                        this.editDialogVisible = false
                        this.$notify({
                            title: `${res.data}`,
                            type: 'success'
                        })
                    })
                })
        },
        
        handleDialogConfirm() {
            // 需不需要校验，如果数据没有变化，就不请求，这是一个优化吧
            this.dialogStatus === 'update' ? this.handleEditSubmit() : this.handleCreateSubmit()
        },
        // 确认关闭
        // 貌似这个有点问题，点击取消，然后在取消动画消失前再点击空白处，会弹出确认框，所以还是要在取消按钮上添加追加确认的功能
        handleBeforeClose(done) {
            // 为什么在button 上绑定这个函数时，不能正常运行? 答：在done()之前改变editDialogVisible就可以了
            this.$confirm('修改内容未被保存，确认关闭？')
                .then(() => {
                    this.editDialogVisible = false
                    done()
                })
                .catch(() => {})
        },

         // 计算总阅读数
        calcReadings(r) {
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
       
        // 导出excel
        handleDownload() {
            
            // filter用作，处理某个特定数据的格式
            const filter = ['date', 'author', 'title', 'status', 'region', 'imp']
            // 根据filter，增加相应的表头
            const tableHeader = ['时间', '作者', '标题', '状态', '区域', '重要性']
            const data = this.formatJSON(this.list, filter)
            // webpack可动态加载模块
            import('@/vendor/Export2Excel').then(excel => {
                // 参数excel相当于加载的js文件的export对象的所有内容
                 
                //  处理data，增加表头
                excel.export_json_to_excel({
                    data,
                    header: tableHeader,
                    bookType: 'xlsx',
                    fileName: '列表',
                })
            })
        },

        // 导出为excel时，把date转换为字符串
        formatJSON(list, filter) {
            // map用作遍历数据，然后对每个项进行修改，但不包括增加和删除
            return list.map(v => {
                // 这里貌似会有点绕，其实不绕
                return filter.map(j => {
                    if(j === 'date') {
                        // v[j]就是获取每个list的项的key为date的值
                        // date为时间戳，要解析为字符串
                        // 注意，不能写成v[j] = parseTime(v[j])，这样会改变this.list，也就是原数组的值，因为这里是值引用，直接返回修改结果就不会改变原数组
                        return parseTime(v[j])
                    }  else {
                        return v[j]
                    }
                })
            })
        },

         // 分页
        handleSizeChange(val) {
            this.filterData.pageSize = val
            this.fetchData()
        },
        handleCurrentPageChange(val) {
            this.filterData.currentPage = val
            this.fetchData()
        },
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
.va-filter-container {
    margin-bottom: 20px;
}
.va-button-search, .va-button-create, .va-button-export {
    padding: 11px 20px;
    font-weight: bold;
    margin: 0;
    margin-right: 5px;
}
.el-icon-search, .el-icon-edit, .el-icon-download {
    vertical-align: middle;
    margin-right: 8px;
    font-weight: bold;
}
.el-icon-star-on {
    font-size: 22px;
}
// 样式让loading在表单中居中
.va-dialog-form {
    width: 100%;
    box-sizing: border-box;
    padding-right: 400px;
}
</style>

<style scope>
/* 修改ui样式，注意不能加上lang属性，原因暂不明了 */
.el-table td, .el-table th {
    padding: 10px 0;
}
</style>