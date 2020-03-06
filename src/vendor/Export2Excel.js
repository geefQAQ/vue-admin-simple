import XLSX from 'xlsx'
import { saveAs } from 'file-saver'

// 处理参数，官方提供了aoa_to_sheet，我先尝试不用，成功封装后再用aoa
let ws = {} // 函数声明比变量优先度高
function sheet_from_array_of_arrays (data) {
    let range = {
        s: { // s: start
            r: 0, // r: row,
            c: 0, // c: column
        },
        e: {  // e: end
            r: data.length,
            c: data[0].length,
        }
    }
    // R相当于每个data的项，data[R]相当于当前data的项的项，建议打印下data，二维数组
    for(let R = 0 ; R < data.length; R++) {
        
        for(let C = 0; C < data[R].length; C++) {
            // range: excel表的范围，如 A1 => E5
            // t: type
            let T
            if(typeof data[R][C] === 'number') { T = 'n'}
            else if (typeof data[R][C] === 'boolean') { T = 'b'}
            else { T = 's' }
            // 获取每一个元素，并赋值到excel表中对应的位置
            const cell = { v: data[R][C], t: T}
            // cell_ref是对应的excel表的位置，如A1
            const cell_address = {c: C, r: R} 
            const cell_ref = XLSX.utils.encode_cell(cell_address)
            ws[cell_ref] = cell // ws: worksheet
        }
    }
    ws['!ref'] = XLSX.utils.encode_range(range)
    return ws
}

// 转换为二进制
// sheet2arraybuffer?
function s2ab (data) {
    // 转换成二进制
    const buf = new ArrayBuffer(data.length)
    let view = new Uint8Array(buf)
    for (let i = 0; i != data.length; ++i) {
        // view[i] = s.charCodeAt(i) & 0xFF; & 是位运算符，表示与运算
        // 不这样处理的话，导出的excel会不能打开，不明白为什么
        view[i] = data.charCodeAt(i)
      }
    return buf
}

// 列的最大宽度
function setColMaxWidth (data) {
    // 1、把元素转化为元素长度，格式化后为[ [ {wch: 10},{wch: 10},{wch: 10} ],[],[] ]
    const data2Width = data.map(row => {
        // 记得 return
        return row.map(val => {
            // 判断是否为null/undefined
            if(val == null) {
                // 返回的是对象，与xlsx包有关
                return {
                    'wch': 10
                }
            }
            // 判断是否为汉字
            // 这里用的是unicode范围，注意charCodeAt(index)，这里默认第一位为汉字就当作汉字处理
            // 严谨的话，应该遍历字符串，然后汉字的长度*2，英文保持
            else if(val.toString().charCodeAt(0) > 255) {
                return {
                    'wch': val.toString().length * 2
                }
            }else {
                return {
                    'wch': val.toString().length
                }
            }
        })
    })
    // 2、每一列的最大宽度
    // 这里先用的for循环，貌似最好还是用for，因为比较大小的时候，要用到i和j两个，不适合用map，因为这里只需要得到result，不处理数组的元素什么的
    // 初始化result，外循环可以从1开始
    let result = data2Width[0]
    for(let i = 1; i < data2Width.length; i++) {
        for(let j = 0; j < data2Width[i].length; j++) {
            // 相当于每一次外循环，都会有j次内循环，每次内循环都会重新比对result的第j项的值，最终为每个元素的最大值
            if(result[j]['wch'] < data2Width[i][j]['wch']) {
                result[j]['wch'] = data2Width[i][j]['wch']
            }
        }
    }
    ws['!cols'] = result
} 

// Workbook构造函数
function Workbook () {
    this.SheetNames = []
    this.Sheets = {}
}

export function export_json_to_excel ({
    data,
    header,
    bookType = 'xlsx',
    fileName,
    autoWidth = true,
}) {
    fileName = fileName || 'excel-list'
    console.log('bookType', bookType, 'fileName', fileName)
    // 步骤
    // 1、处理参数，二维数组转换成excel的格式 
    const sheetName = 'sheetname'
    data.unshift(header) // 添加表头
    // 1.1 处理data，格式化为ws，并设置列宽度
    ws = sheet_from_array_of_arrays(data)
    if(autoWidth) {
        setColMaxWidth(data)
    }
    // 1.2 声明workbook，作为参数传入到xlsx.wirte方法
    let wb = new Workbook()
    wb.SheetNames.push(sheetName)
    wb.Sheets[sheetName] = ws
    const wbout = XLSX.write(wb, {
        type: 'binary',
        bookType: bookType
    })
    
    // 2、把处理完的数据转换成二进制
    
    // 3、通过保存方法，保存到本地
    const blob = new Blob([s2ab(wbout)], {
        // 不知道这个type有什么用，官方意思是兼容safari的快捷键方式
        // https://github.com/eligrey/FileSaver.js
        type: "application/octet-stream"
    })
    
    // 如果不加.xlsx，会默认为文本
    saveAs(blob, `${fileName}.${bookType}`)
}