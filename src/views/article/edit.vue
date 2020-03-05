<template>
    <article-detail :is-edit="true" />
</template>
<script>
import ArticleDetail from './create-article'
export default {
    name: 'EditArticle',
    components: {
        ArticleDetail
    }
}
</script>