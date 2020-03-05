<template>
    <!-- el-form的:model不能写成v-model，要细心留意demo的格式，不要随便改！ -->
    <el-form ref="postForm" :rules="rules" :model="postForm">
        <sticky :z-index="10" :class-name="'va-sticky-bg ' + postForm.status">
            <comment-dropdown v-model="postForm.comment_disabled" />
            <platform-dropdown v-model="postForm.platforms" />
            <source-url-dropdown v-model="postForm.source_uri" />
            <el-button 
            @click="submitForm" 
            v-loading="buttonLoading"  :disabled="buttonLoading"
            element-loading-spinner="el-icon-loading"
            element-loading-background="rgba(255, 255, 255, 0.8)"
            class="submit-button"
            size="medium" type="success">
                发布
            </el-button>
        </sticky>
        <div class="va-app-container">
            <warning />
            <el-row>
                <el-col :span="24">
                    <el-form-item prop="title" style="margin-bottom: 40px;">
                        <m-input v-model="postForm.title" icon="setting"  placeholder="可以是标题党建议之类的提示" :maxlength="100">标题</m-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item prop="author" label="作者:">
                        <!-- reserve-keyword：选中一个item后，blur后再focus时，会弹出搜索到该item的位置及全列表 -->
                        <el-select
                            v-model="postForm.author"
                            size="medium"
                            filterable
                            remote
                            reserve-keyword
                            placeholder="搜索作者名"
                            :remote-method="getRemoteUserList"
                            :loading="authorLoading">
                            <el-option
                                v-for="(item, index) in postForm.nameOptions"
                                :key="index"
                                :label="item"
                                :value="item">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="10">
                    <el-form-item prop="date" label="发布时间:">
                        <el-date-picker
                            v-model="postForm.displayTime"
                            format="yyyy-MM-dd HH:mm:ss"
                            size="medium"
                            type="datetime"
                            placeholder="请选择日期时间"
                        >
                        </el-date-picker>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item prop="importance" label="重要性:">
                        <el-rate
                            v-model="postForm.importance"
                            :max="3"
                            :colors="{1: '#99A9BF', 2: '#F7BA2A', 3: '#FF9900'}"
                            class="ca-rate"
                        >
                        </el-rate>
                    </el-form-item>
                </el-col>
            </el-row>
            <!-- label-width可以让label不占满一行的宽度，因为label是浮动 -->
            <el-form-item prop="summary" label="概要:" label-width="60px">
                <el-input
                    type="textarea"
                    placeholder="请输入概要"
                    autosize
                    :rows="1"
                    v-model="postForm.summary"
                    maxlength="40"
                    show-word-limit
                    class="ca-summary"
                />
            </el-form-item>
            <el-form-item prop="content">
                <tinymce v-model="postForm.content"/>
            </el-form-item>
            <el-form-item prop="image_uri">
                <upload v-model="postForm.image_uri"/>
            </el-form-item>
        </div>
    </el-form>
</template>
<script>
import Sticky from '@/components/Sticky'
import Tinymce from '@/components/Tinymce'
import MInput from '@/components/MaterialInput'
import Upload from '@/components/Upload'
import { searchAuthor } from '@/api/remote-search'
import { fetchArticle } from '@/api/article'
import Warning from '../components/warning'
// import CommentDropdown from "./dropdown/comment";
// import PlatformsDropdown from "./dropdown/platform";
// import SourceUriDropdown from "./dropdown/source-uri";
import { CommentDropdown, PlatformDropdown, SourceUrlDropdown } from './dropdown'

export default {
    name: 'CreateArticle',
    components: {
        Tinymce,
        Sticky,
        MInput,
        Upload,
        Warning,
        CommentDropdown,
        PlatformDropdown,
        SourceUrlDropdown
    },
    props: {
        isEdit: {
            type: Boolean,
            default: false
        }
    },
    data() {
        // https://github.com/yiminghe/async-validator
        const validateRequire = (rule, value, callback) => {
            // summary即是初始值为''，不明原因转换为undefined，title则不会，所以这里判断条件是!value，不能是value === ''
            // 用到validator函数是因为要触发$message，相当于执行callback这个异步操作之前，先触发$message，相当于让异步提示前有操作的空间
            if (!value) {
                this.$message({
                    message: rule.field + '为必传项',
                    type: 'error'
                })
                callback(new Error(rule.field + '为必传项'))
            } else {
                callback()
            }
        }
        return {
            tempRoute: {},
            authorLoading: false,
            postForm: {
                comment_disabled: false,
                platforms: ['平台1'],
                source_uri: '',
                author: '',
                nameOptions: [],
                displayTime: '',
                importance: 1,
                summary: '',
                title: '',
                image_uri: '',
                content: '',
                status: 'draft'
            },
            buttonLoading: false,
            // rules
            rules: {
                title: [{validator: validateRequire}],
                // author: [{validator: validateRequire}],
                // date: [{validator: validateRequire}],
                content: [{validator: validateRequire}],
                // image_uri: [{validator: validateRequire}],
                // summary: [{required: true, message: '请输入概要', trigger: 'blur'}]
            },
        }
    },
    created() {
        if(this.isEdit) {
            // 请求
            if(this.$route.params && this.$route.params.id) {
                this.fetchData(this.$route.params.id)
            }
        }
        this.tempRoute = Object.assign({}, this.$route)
    },
    methods: {
        fetchData(id) {
            fetchArticle(id)
            .then(res => {
                this.postForm.id = +res.data.id
                this.postForm.title = res.data.title + ' 文章ID:' + id
                this.postForm.author = res.data.author
                this.postForm.importance = res.data.imp
                this.postForm.displayTime = +res.data.date
                this.postForm.image_uri = res.data.image_uri
                this.postForm.content = res.data.baseContent
                this.postForm.summary = res.data.summary + ' 文章ID:' + id
            })
            .then(() => {
                // 更新标签名
                this.updateTagViewTitle()
                this.updatePageTitle()
            })
            
        },
        updateTagViewTitle() {
            const title = 'Edit Article'
            const route = Object.assign({}, this.tempRoute, { title: `${title}-${this.postForm.id}` })
            this.$store.dispatch('tagsView/updateVisitedView', route)
        },
        updatePageTitle() {
            const title = 'Edit Article'
            document.title = `${title} - ${this.postForm.id}`
        },
        getRemoteUserList(val) {
            this.authorLoading = true,
            searchAuthor(val)
                .then(res => {
                    this.postForm.nameOptions = res.data.items.map(i => i.name)
                    this.authorLoading = false
                })
        },
        submitForm() {
            this.$refs.postForm.validate(valid => {
                if(valid) {
                    this.buttonLoading = true,
                    this.$notify({
                        title: '成功',
                        message: '发布文章成功',
                        type: 'success',
                        duration: 2000,
                        // offset: 100,
                    })
                    this.postForm.status = 'published'
                    this.buttonLoading = false
                }else {
                    return false
                }
            })
        }
    },
}
</script>
<style lang="scss" scoped>
.ca-dropdown {
    margin-right: 5px;
}
.ca-dropdown-menu {
    padding: 0;
}
.ca-dropdown-item {
    padding: 0 20px;
     &:hover {
        // inherit的话是透明
        background-color: #fff;
        color: inherit
    }
}
.ca-button {
    &:hover, &:focus {
        background-color: #fff;
    }
}
.ca-rate {
    display: inline-block;
    font-size: 22px;
}
.ca-summary /deep/ {
    .el-textarea__inner {
        border: none;
        border-radius: 0;
        resize: none;
        border-bottom: 1px solid #bfcbd9;
    }
    .el-input__count {
        line-height: 20px;
        bottom: 5px;
    }
}
.submit-button /deep/ {
    .el-loading-spinner {
        margin-top: -7px;
    }
}
</style>