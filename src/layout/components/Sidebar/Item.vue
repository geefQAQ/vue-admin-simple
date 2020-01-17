<script>
export default {
  name: "MenuItem",
  // 使组件无状态 (没有 data ) 和无实例 (没有 this 上下文)
  functional: true,
  props: {
    icon: {
      type: String,
      default: ""
    },
    title: {
      type: String,
      default: ""
    }
  },
  // 插槽slot https://cn.vuejs.org/v2/guide/components-slots.html#%E6%8F%92%E6%A7%BD%E5%86%85%E5%AE%B9
  // 渲染函数 https://cn.vuejs.org/v2/guide/render-function.html
  /**
   * render函数两个参数
   * @param {function} createElement
   * @param {object} context
   * @returns {array}
   */

  render(createElement, context) {
    const { icon, title } = context.props;
    const vnodes = [];
    const iconEle = createElement("i", {
      class: "va-icon va-icon__" + icon
    });

    if (icon) {
      vnodes.push(iconEle);
    }

    if (title) {
      vnodes.push(<span>{title}</span>);
    }
    return vnodes;
  }
};
</script>
