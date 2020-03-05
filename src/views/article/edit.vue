<template>
    <article-detail :is-edit="true" />
</template>
<script>
import ArticleDetail from './components/article-detail'
export default {
    name: 'EditArticle',
    components: {
        ArticleDetail
    }
}
</script>