<template>
    <div class="thumb-bg">
        <div class="thumb-img" :style="{backgroundImage: `url(${image})`}"></div>
    </div>
</template>
<script>
export default {
    props: {
        image: {
            type: String,
            required: true
        }
    }
}
</script>
<style lang="scss" scoped>
.thumb-bg {
    position: absolute;
    top: -60px;
    left: 0;
    width: 70px;
    height: 70px;
    border-radius: 50%;
    border: 5px solid #fff;
    background: #fff;
    
    .thumb-img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
        background: red;
        background-size: cover;
        background-position: center center;
        transform-origin: 95% 55%;
        transition: all .3s;
    }
    &:hover {
        .thumb-img {
            transform: rotate(-110deg)
        }
    }
}
</style>