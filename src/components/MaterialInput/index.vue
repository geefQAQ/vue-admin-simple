<!-- 详细解释版本 -->
<template>
    <div :class="computedClass" class="material-input__component">
        <div :class="{iconClass: icon}">
            <i v-if="icon" :class="'el-icon-' + icon" class="el-input__icon material-input__icon"></i>
            <!-- 有关input的属性，如spellcheck,maxlength等 https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/input/text -->
            <input 
                v-if="type === 'text'"
                v-model="currentValue"
                type="text"
                :spellcheck="false"
                :disabled="disabled"
                :placeholder="fullPlaceHolder"
                :autocomplete="autoComplete"
                :readonly="readonly"
                :minlength="minlength"
                :maxlength="maxlength"
                :required="required"
                class="material-input"
                @input="handleInput"
                @focus="handleFocus"
                @blur="handleBlur"
            >
            <span class="material-input-bar"></span>
            <label class="material-label">
                <!-- 占位元素，父组件引用时，内容就是slot -->
                <slot /> 
            </label>
        </div>
    </div>
</template>
<script>
// source:https://github.com/wemake-services/vue-material-input/blob/master/src/components/MaterialInput.vue
export default {
    name: 'MInput',
    props: {
        type: {
            type: String,
            default: 'text'
        },
        value: [String, Number],
        icon: String,
        placeholder: String,
        disabled: Boolean,
        readonly: Boolean,
        minlength: Number,
        maxlength: Number,
        autoComplete: {
            type: String,
            default: 'off'
        },
        required: {
            type: Boolean,
            default: true
        },
        validateEvent: {
            type: Boolean,
            default: true
        }
    },
    data() {
        return {
            focused: false,
            currentValue: this.value, // 也可以用v-model="currentValue",效果一样
            fullPlaceHolder: null
        }
    },
    computed: {
        computedClass() {
            return {
                'material--active': this.focused,
                'material--raised': Boolean(this.focused || this.currentValue), // 当有值时，仅有raised，没有active，就是区分这种情况
                'material--disabled': this.disabled,
            }   
        }
    },
    watch: {
        value(newValue) {
            this.currentValue = newValue
        }
    },
    methods: {
        handleInput(event) {
            const value = event.target.value
            this.$emit('input', value)
            // 这段代码作用是可以输入文本的时候同时在父组件进行校验，原理不懂，特别是el.form.change，这样都可以触发父组件change事件？？
            if (this.$parent.$options.componentName === 'ElFormItem') {
            // componentName是在原型链上找的，也就是说只要父辈元素有componentName是ElFormItem就可以
              if (this.validateEvent) {
                this.$parent.$emit('el.form.change', [value]) // 这里就真不明白了，el和form甚至不用$ https://cn.vuejs.org/v2/api/#parent 官方甚至不推荐
                // 估计是 中封装了el.form.change事件，
                // 是ElForm中封装的el.form里面的事件，有兴趣可以看下ElForm的源码
              }
            }
            // this.$emit('change', value) // 监听文本框内容，并传到父组件相应的变量中，感觉是和input事件重复了,有一点不同就是父组件校验的时候,change可以一直触发校验事件，input只有在提交时才能触发
        },
        handleFocus() {
            this.focused = true
            if(this.placeholder && this.placeholder !== '') {
                this.fullPlaceHolder = this.placeholder
            }
        },
        handleBlur() {
            this.focused = false
            this.fullPlaceHolder = null // 避免误以为是填写了
            // 同样的blur时候也能触发el.form.blur
            // if (this.$parent.$options.componentName === 'ElFormItem') {
            //     if (this.validateEvent) {
            //     this.$parent.$emit('el.form.blur', [this.currentValue])
            //     }
            // }
        }
    },
}
</script>
<style lang="scss" scoped>
// Fonts
$font-size-base: 16px;
$font-size-small: 18px;
$font-weight-bold: bold;
$font-weight-normal: normal;
// Themes
$color-grey: #9E9E9E;
$color-grey-light: #E0E0E0;
$color-blue: #2196F3;
// Utils
$spacer: 12px; // 不知道是什么
$transition: all .2s ease;
$index-has-icon: 30px; // 不懂命名
// Base clases:
%base-bar-pseudo { // %: 占位符选择器，只会出现在@extend中，而且不是一个类，跟.不一样 https://www.cnblogs.com/7z7chn/p/5393455.html
    content: '';
    position: absolute;
    bottom: 0; // bottom: 0是让高度从bottom开始，往上延伸，解释了为什么span会和input的border重合，因为span的bottom与input的bottom一样位置
    width: 0;
    height: 1px;
    transition: $transition; // 为什么是all不是width，如果是width,focus的时候是先height瞬间为5，然后width过渡，blur时，height瞬间为0，width过渡但不显示
    background: $color-blue;
}
// Mixins
@mixin slided-top() { // 可以多个属性，关键是可以传参 https://www.sass.hk/docs/
    top: - ($font-size-base + $spacer);
    left: 0;
    font-size: $font-size-base;
    font-weight: $font-weight-bold;
}

// Component
.material-input__component {
    position: relative;
    margin-top: 30px;
    .iconClass {
        .material-input__icon {
            position: absolute;
            left: 0;
            line-height: $font-size-base;
            top: $spacer;
            color: $color-grey;
            width: $index-has-icon;
            height: $font-size-base;
            font-size: $font-size-base;
            font-weight: $font-weight-normal;
            pointer-events: none;
        }
        .material-input {
            text-indent: $index-has-icon;
        }
        .material-label {
            left: $index-has-icon;
        }
    }
    .material-input {
        padding: 12px 12px 2px 6px;
        display: block;
        width: 100%;
        border-bottom: 1px solid $color-grey-light;
        box-sizing: border-box;
        &:focus {
            outline: none;
            border: none;
            border-bottom: 1px solid transparent;
        }
    }
    .material-input-bar {
        position: relative;
        display: block; // inline-block，受到struct(幽灵节点)的影响，只能通过父元素设置font-size:0，才能消除掉诡异的高度，所以一般改为block
        width: 100%;
        // height: 5px; // 这里的span只起到定位(左上角)和定宽(父元素100%)的作用，不添加高度，能让有高度的伪元素直接覆盖掉input的border
        &::before {
            @extend %base-bar-pseudo; // @extend 继承样式
            right: 50%; // right: 50%的意思是伪元素的right是父元素的50%，top,left默认0
        }
        &::after {
            @extend %base-bar-pseudo;
            left: 50%;
        }
    }
    .material-label {
        display: block;
        position: absolute;
        left: 0; top: 0;
        font-size: $font-size-small;
        color: $color-grey;
        transition: $transition;
    }

    // Active state
    &.material--active {
        .material-input {
            border-bottom-color: transparent;
        }
        .material-input-bar {
            &::before, &::after{
                width: 50%;
            }
        }
        .material-input__icon {
            color: $color-blue;
        }
        .material-label {
            color: $color-blue;
        }
    }
    // Raised state
    &.material--raised {
        .material-label {
            @include slided-top() // 引入mixin，明白了为什么要区分raised与active后，raised只负责位置上偏移与文字大小变化，不负责颜色变化
        }
    }
    // Disabled state
    &.material--disabled {
        .material-input {
            border-bottom-style: dashed 
        }
    }
}


</style>