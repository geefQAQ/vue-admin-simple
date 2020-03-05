<template>
    <article-detail :is-edit="false" />
</template>
<script>
import ArticleDetail from './create-article'
export default {
    name: 'CreateArticle',
    components: {
        ArticleDetail
    }
}
</script>