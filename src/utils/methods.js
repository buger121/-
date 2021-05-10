/**
 *  数组扁平化
 * @param {array} 一维或多维数组
 * @return {array} 一维数组
 */
function flat(arr) {
    let tmpArr = []
    for (let i = 0; i < arr.length; i++) {
        if (typeof arr[i] !== 'object') {
            tmpArr.push(arr[i])
        } else {
            tmpArr = tmpArr.concat(arr[i])
        }
    }
    return tmpArr
}

export { flat }
