<template>
    <div class="va-404">
        <div class="va-404-content">
            <div class="va-404-pic">
                <img src="@/assets/404/404.png" alt="404" class="va-404-pic__parent">
                <img src="@/assets/404/404_cloud.png" alt="404" class="va-404-pic__child left">
                <img src="@/assets/404/404_cloud.png" alt="404" class="va-404-pic__child mid">
                <img src="@/assets/404/404_cloud.png" alt="404" class="va-404-pic__child right">
            </div>
            <div class="va-404-text">
                <div class="va-404-text__oops">OOPS!</div>
                <div class="va-404-text__info">All rights reserved</div>
                <div class="va-404-text__headline">The webmaster said that you can not enter this page...</div>
                <div class="va-404-text__info">Please check that the URL you entered is correct, or click the button below to return to the homepage.</div>
                <a class="va-404-text__return-home" href="/">Back to home</a>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.va-404 {
    padding: 0 calc((100vw - 1200px) / 2);
    height: 100%
}

.va-404-content {
    overflow: hidden;
    // background-color: lightblue;
    padding: 100px 50px 0;
    // 不要用margin 
    // margin-top: 100px;
}

.va-404-pic {
    position: relative;
    float: left;
    width: 600px;
    overflow: hidden;

    &__parent {
        width: 100%;
    }
    &__child {
        position: absolute;

        &.left {
            width: 80px;
            top: 17px;
            left: 220px;
            opacity: 0;
            animation: 2s cloudLeft 1s linear forwards
        }

        &.mid {
            width: 46px;
            top: 10px;
            left: 420px;
            opacity: 0;
            animation: 2s cloudMid 1.2s linear forwards;
        }

        &.right {
            width: 62px;
            top: 100px;
            left: 500px;
            opacity: 0;
            animation: 2s cloudRight 1s linear forwards;
      }
    }
    // 动画的坐标和元素的定位关键是 直线的函数 y = ax + b
    // a 是斜率 b 是偏移 y 相对于 top x 是 left
    // 圆点是左上角，top 正值是向下，所以要么top 全部是负，要么向下为正方向
    // 需求是元素会从 右上 向 左下 运动，定向下为正方向，斜率为-1/2，偏移根据不同位置设定
    // 如mid : y = -1/2x + 220 

    @keyframes cloudLeft { 
        0% {
          top: 17px;
          left: 220px;
          opacity: 0;
        }
        20% {
          top: 33px;
          left: 188px;
          opacity: 1;
        }
        80% {
          top: 81px;
          left: 92px;
          opacity: 1;
        }
        100% {
          top: 97px;
          left: 60px;
          opacity: 0;
        }
    }

    @keyframes cloudMid {
        0% {
          top: 10px;
          left: 420px;
          opacity: 0;
        }
        20% {
          top: 40px;
          left: 360px;
          opacity: 1;
        }
        70% {
          top: 130px;
          left: 180px;
          opacity: 1;
        }
        100% {
          top: 160px;
          left: 120px;
          opacity: 0;
        }
    }

    @keyframes cloudRight {
        0% {
          top: 100px;
          left: 500px;
          opacity: 0;
        }
        20% {
          top: 120px;
          left: 460px;
          opacity: 1;
        }
        80% {
          top: 180px;
          left: 340px;
          opacity: 1;
        }
        100% {
          top: 200px;
          left: 300px;
          opacity: 0;
        }
      }
}

.va-404-text {
    float: left;
    // background-color: lightgreen;
    width: 300px;
    overflow: hidden;

    &__oops {
        font-size: 32px;
        line-height: 40px;
        font-weight: bold;
        color: #1482f0;
        margin-bottom: 20px;
        animation: 1s slideUp forwards
    }

    &__info {
        font-size: 13px;
        line-height: 21px;
        color: grey;
        // opacity: 0;
        margin-bottom: 30px;
        animation: 1s slideUp .3s forwards
    }

    &__headline {
        font-size: 20px;
        line-height: 24px;
        color: #222;
        font-weight: bold;
        // opacity: 0;
        margin-bottom: 10px;
        animation: 1s slideUp .1s forwards
    }

    &__return-home {
        display: block;
        width: 110px;
        height: 36px;
        border-radius: 100px;
        background-color: #1482f0;
        text-align: center;
        line-height: 36px;
        color: #fff;
        animation: 1s slideUp forwards
    }
    @keyframes slideUp {
        0% {
            transform: translateY(60px);
            opacity: 0;
        }
        100% {
            transform: translateY(0);
            opacity: 1;
        }
    }
}

</style>