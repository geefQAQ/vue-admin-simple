<template>
	<div style="display: inline-block;">
		<label class="radio-label" style="padding-left: 0;">文件名：</label>
		<el-input
			placeholder="请输入文件名(默认为excel-list)"
			v-model="filename"
			style="width: 300px;"
			>
			<i slot="prefix" class="el-input__icon el-icon-document"></i>
		</el-input>
	</div>
</template>
<script>
export default {
  name: 'FilenameOption',
	props: {
		value: {
			type: String,
			default: 'excel-list'
		}
	},
	computed: {
		filename: {
			get() {
				return this.value
			},
			set(val) {
				this.$emit('input', val)
			}
		}
	}
}
</script>
<style lang="scss" scoped>
.radio-label {
	font-size: 14px;
    color: #606266;
    line-height: 40px;
    padding-right: 12px;
}
</style>