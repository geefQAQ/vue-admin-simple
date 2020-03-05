<template>
    <article-detail :is-edit="false" />
</template>
<script>
import ArticleDetail from './components/article-detail'
export default {
    name: 'CreateArticle',
    components: {
        ArticleDetail
    }
}
</script>