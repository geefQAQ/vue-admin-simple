<template>
<div>
    <el-form>
        <sticky :z-index="10" :class-name="'va-sticky-bg draft'">
            <el-dropdown class="ca-dropdown" trigger="click">
                 <el-button size="medium" class="ca-button" type="plain">
                    评论：{{postForm.comment_disabled}}<i class="el-icon-caret-bottom el-icon--right"></i>
                </el-button>
                <el-dropdown-menu class="ca-dropdown-menu">
                    <!-- 加入item标签，在change事件后会自动消失，如果删除item标签，change后不会消失-->
                    <el-dropdown-item class="ca-dropdown-item">
                        <el-radio-group v-model="postForm.comment_disabled">
                            <el-radio :label="'开启'">开启评论</el-radio>
                            <el-radio :label="'关闭'">关闭评论</el-radio>
                        </el-radio-group>
                    </el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
            <el-dropdown class="ca-dropdown" trigger="click">
                <el-button size="medium" class="ca-button" type="plain">
                    平台{{`(${postForm.platforms.length})`}}<i class="el-icon-caret-bottom el-icon--right"></i>
                </el-button>
                <el-dropdown-menu class="ca-dropdown-menu" style="padding: 10px 20px;">
                    <el-checkbox-group v-model="postForm.platforms">
                        <el-checkbox label="平台1"></el-checkbox>
                        <el-checkbox label="平台2"></el-checkbox>
                        <el-checkbox label="平台3"></el-checkbox>
                    </el-checkbox-group>
                </el-dropdown-menu>
            </el-dropdown>
            <el-dropdown class="ca-dropdown" trigger="click">
                <el-button size="medium" type="plain">
                    链接<i class="el-icon-caret-bottom el-icon--right"></i>
                </el-button>
                <el-dropdown-menu class="ca-dropdown-menu">
                    <el-input placeholder="请输入链接" style="width: 400px;" v-model="postForm.source_uri">
                        <template slot="prepend">URL</template>
                    </el-input>
                </el-dropdown-menu>
            </el-dropdown>
            <el-button size="medium" type="success">
                发布
            </el-button>
        </sticky>
        <div class="va-app-container">
            <aside>
                目前缓存的方案对于某些业务是不适合的，比如文章详情页这种 /article/1 /article/2，他们的路由不同但对应的组件却是一样的，所以他们的组件 name 就是一样的，就如前面提到的，keep-alive的 include 只能根据组件名来进行缓存，所以这样就出问题了。目前有两种解决方案：
                不使用 keep-alive 的 include 功能 ，直接是用 keep-alive 缓存所有组件，这样子是支持前面所说的业务情况的。 前往@/layout/components/AppMain.vue文件下，移除include相关代码即可。当然直接使用 keep-alive 也是有弊端的，他并不能动态的删除缓存，你最多只能帮它设置一个最大缓存实例的个数 limit。相关 issue
                使用 localStorage 等浏览器缓存方案，自己进行缓存处理
                <a href="https://panjiachen.gitee.io/vue-element-admin-site/zh/guide/essentials/tags-view.html#visitedviews-cachedviews">点击这里查看更多</a>
            </aside>
            
            <el-row>
                <el-col :span="24">
                    <el-form-item style="margin-bottom: 40px;">
                        <m-input v-model="postForm.title" name="name">
                            标题
                        </m-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="作者:">
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
                    <el-form-item label="发布时间:">
                        <el-date-picker
                            v-model="postForm.displayTime"
                            size="medium"
                            type="datetime"
                            placeholder="请选择日期时间"
                        >
                        </el-date-picker>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="重要性:">
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
            <el-form-item label="概要:" label-width="44px">
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
            <tinymce v-model="content"/>
        </div>
    </el-form>
</div>
</template>
<script>
import Sticky from '@/components/Sticky'
import Tinymce from '@/components/Tinymce'
import MInput from '@/components/MaterialInput'
import { searchAuthor } from '@/api/remote-search'
export default {
    name: 'CreateArticle',
    components: {
        Tinymce,
        Sticky,
        MInput,
    },
    data() {
        return {
            authorLoading: false,
            postForm: {
                comment_disabled: "开启",
                platforms: ['平台1'],
                source_uri: '',
                author: '',
                nameOptions: [],
                displayTime: '',
                importance: 1,
                summary: '',
                title: '',
            },
            content: '<p>test</p>',
        }
    },
    methods: {
        getRemoteUserList(val) {
            this.authorLoading = true,
            searchAuthor(val)
                .then(res => {
                    this.postForm.nameOptions = res.data.items.map(i => i.name)
                    this.authorLoading = false
                })
        },
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
</style>
<style lang="scss">
.el-rate__icon {
    margin-right: 3px;
}
</style>