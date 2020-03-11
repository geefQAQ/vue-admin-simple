<template>
    <div v-loading.fullscreen.lock="fullscreenLoading" class="main-article" element-loading-text="正在生成PDF">
        <div class="article__heading">
            <div class="article__heading__title">
                {{ article.title }}
            </div>
        </div>
        <div class="node-article-content" v-html="article.content"></div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            fullscreenLoading: true,
            article: {
                title: '',
                content: ''
            }
        }
    },
    mounted() {
        this.fetchData()
    },
    methods: {
        fetchData() {
            // 懒加载
            import('./content').then(res => {
                this.article.title = res.default.title
                this.article.content = res.default.content
            })
            setTimeout(() => {
                this.fullscreenLoading = false
                // 注意$nextTick
                this.$nextTick(() => {
                    window.print()
                })
            }, 1000)
        }
    }
}
</script>
<style lang="scss">
@mixin clearfix {
    &:before, &:after {
        display: table;
        content: '';
        clear: both;
    }
}
.main-article {
    width: 740px;
    margin: 0 auto;
    padding: 20px;
    box-sizing: border-box;
    
}
.article__heading__title {
    display: block;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    word-wrap: break-word;
    overflow-wrap: break-word;
    font-size: 32px;
    line-height: 48px;
    font-weight: 600;
    color: #333;
    overflow: hidden;
}
.node-article-content {
    @include clearfix;
    margin: 20px 0 0;
    font-size: 16px;
    color: #333;
    letter-spacing: 0.5px;
    line-height: 28px;
    margin-bottom: 30px;
    font-family: medium-content-serif-font, Georgia, Cambria, "Times New Roman", Times, serif;

    a {
        background-position: 0 calc(1em + 1px);
        background-repeat: repeat-x;
        background-size: 1px 1px;
        background-image: linear-gradient(90deg, rgba(0, 0, 0, .84) 100%, transparent);
        padding: 0 6px;
        color: inherit;
        cursor: pointer;
        &:hover, &:focus {
            color: inherit;
            cursor: pointer;
        }
    }
    p {
        margin: 1em 0;
        font-weight: 400;
        font-style: normal;
        font-size: 21px;
        line-height: 1.58;
        letter-spacing: -.003em;

    }
    img {
        max-width: 100%;
        display: block;
        margin: 0 auto;
    }
    h3 {
        font-size: 34px;
    }
    h4 {
        font-size: 26px;
    }
    h3, h4 {
        line-height: 1.15;
        letter-spacing: -.015em;
        margin: 53px 0 0;
    }
    blockquote {
        margin: 1em 40px;
        font-weight: 400;
        font-style: italic;
        font-size: 21px;
        line-height: 1.58;
        letter-spacing: -.003em;
        border-left: 3px solid black;
        padding-left: 20px;
        margin-left: -23px;
    }
    ul {
        padding-left: 40px;
        li {
            list-style-type: disc;
            font-weight: 400;
            font-style: normal;
            font-size: 21px;
            line-height: 1.58;
            letter-spacing: -.003em;
            margin-left: 30px;
            margin-bottom: 14px;
        }
    }
    code {
        background: rgba(0,0,0,0.05);
        padding: 3px 4px;
        margin: 0 2px;
        font-size: 16px;
        display: inline-block;
    }
}
</style>