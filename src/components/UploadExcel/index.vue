<template>
    <div>
        <input ref="excel-upload-input" class="excel-upload-input" type="file" accept=".xlsx, .xls, .csv" @change="handleClick">
        <div class="drop-zone" @drop="handleDrop" @dragover="handleDragover" @dragenter="handleDragover">
            拖动Excel文件到这里，或者点击
            <el-button :disabled="loading" @click="handleDownload" type="primary" style="margin-left: 15px;vertical-align: middle;">浏览文件</el-button>
        </div>
    </div>
</template>
<script>
import XLSX from 'xlsx'
export default {
    name: 'UploadExcel',
    props: {
        onSuccess: Function,
        beforeUpload: Function,
    },
    data() {
        return {
            loading: false,
            excelData: {
                header: [],
                results: []
            }
        }
    },
    methods: {
        generateTable({ header, results}) {
            this.excelData.header = header
            this.excelData.results = results
            // 通过方法传递
            this.onSuccess && this.onSuccess(this.excelData)
        },
        // 拖动ed
        handleDrop(e) {
            e.stopPropagation()
            e.preventDefault()
            if(this.loading) {
                return false
            }
            // 为什么e打印出来找不到拖动的文件，甚至dataTransfer属性上也没有，files也是一个空数组
            // DataTransfer.files属性在拖动操作中表示文件列表。如果操作不包含文件，则此列表为空。
            // https://developer.mozilla.org/zh-CN/docs/Web/API/DataTransfer/files
            const files = e.dataTransfer.files
            // 只处理上传一个文件
            if(files.length !== 1) {
                this.$message.error('只支持上传一个文件')
                return 
            }
            const rawFile = files[0]
            if(!this.isExcel(rawFile.name)) {
                this.$message({
                    message: '只能上传后缀名为xlsx, xls, csv的文件',
                    type: 'error',
                    duration: 3000
                })
            }
            this.upload(rawFile)
        },
        // 拖动ing
        handleDragover(e) {
            e.stopPropagation()
            e.preventDefault()
            // 不懂
            // https://developer.mozilla.org/zh-CN/docs/Web/API/HTML_Drag_and_Drop_API
            // copy 表明被拖动的数据将从它原本的位置拷贝到目标的位置。
            // move 表明被拖动的数据将被移动。
            // link 表明在拖动源位置和目标位置之间将会创建一些关系表格或是连接。
            e.dataTransfer.dropEffect = 'copy'
        },
        // 1、处理点击上传事件
        handleClick(e) {
            const rawFile = e.target.files[0]
            if(!rawFile) return // 不懂这种健壮
            this.upload(rawFile)
            // this.readerData(rawFile)
        },
        upload(rawFile) {
            if(!this.beforeUpload) { // 没有该方法
                 this.readerData(rawFile)
            }
            const before = this.beforeUpload(rawFile)
            if(before) { // 通过了上传前的处理
                 this.readerData(rawFile)
            }
        },
        handleDownload() {
            // 点击button模拟点击input
            this.$refs['excel-upload-input'].click()
        },
        readerData(rawFile) {
            this.loading = true
            // 2、利用FileReader处理rawfile，建议用promise
            // 当 FileReader 读取文件的方式为  readAsArrayBuffer的时候，会触发一个 load 事件。可以使用 onload 属性对该事件进行处理。
            // https://developer.mozilla.org/zh-CN/docs/Web/API/FileReader/onload
            return new Promise((resolve, reject) => {
                const reader = new FileReader()
                reader.readAsArrayBuffer(rawFile) // 用readAsArrayBuffer方法解析数据，才有onload这个处理完数据之后的事件
                reader.onload = e => {
                    // 2.1、分离出ArrayBuffer部分的数据
                    // https://github.com/SheetJS/sheetjs#parsing-options
                    // "array"	array: array of 8-bit unsigned int (byte n is data[n])
                    // 可以说是readAsArrayBuffer决定了解析data的选项为array
                    const workbook = XLSX.read(e.target.result, { type: 'array' })
                    // 2.2、根据workbook一步步的找到并处理数据，这里只要第一个表格
                    const sheetName = workbook['SheetNames'][0]
                    const worksheet = workbook.Sheets[sheetName]
                    // 3、分别取出表头数据和表格数据
                    const header = this.getHeaderRow(worksheet)
                    const results = XLSX.utils.sheet_to_json(worksheet)
                    // 4、传递到父组件
                    this.generateTable({ header, results})
                    this.loading = false
                    resolve()
                }
            })
        },
        getHeaderRow(sheet) {
            let headerArray = []
            // 1、利用XLSX的range，注意参数是用了!ref
            const range = XLSX.utils.decode_range(sheet['!ref'])
            // 遍历出每一列的第一个数据
            let C = range.s.c
            let R = range.s.r
            // 相当于从0开始，遍历完excel的列数
            for(C; C <= range.e.c; C++) {
                // 根据坐标，取出数据，并放进到header
                let cell_address = { c:C, r:R }
                let cell = sheet[XLSX.utils.encode_cell(cell_address)]
                let cell_format
                cell_format = 'UNKNOWN' + C // 健壮，默认表头，一般会被覆盖
                if(cell && cell.t) { // 健壮，保证有值
                    cell_format = XLSX.utils.format_cell(cell)
                }
                headerArray.push(cell_format)
            }
            return headerArray
        },
        isExcel(filename) {
            return /\.(xlsx|xls|csv)$/.test(filename)
        }
    }
}
</script>
<style lang="scss" scoped>
.excel-upload-input {
    display: none;
    z-index: -999;
}
.drop-zone {
    height: 160px;
    width: 600px;
    margin: 0 auto;
    border: 2px dashed #bbb;
    border-radius: 5px;
    line-height: 160px;
    text-align: center;
    font-size: 24px;
    color: #bbb;
    
}
</style>