function debounce(func, time, immediate) {
    let timer = null;
    return function(...args) {
        if(timer !== null) {
            clearTimeout(timer);
        }
        if(immediate) {
            let callNow = !timer;
            timer = setTimeout(() => {
                clearTimeout(timer);
                timer = null;
            }, time)
            callNow && func.apply(this, args);
            // if(!timer) {
            //     func.apply(this, args);
            //     timer = setTimeout(() => {
            //         clearTimeout(timer);
            //         timer = null;
            //     }, time);
            // }
        }else {
            timer = setTimeout(() => {
                func.apply(this, args);
                clearTimeout(timer);
                timer = null;
            }, time)
        }
    }
}
function throttle(func, time, immediate) {
    let timer = null;
    let flag = false;
    return function(...args) {
        if(flag) return;
        flag = true;
        if(immediate) {
            func.apply(this, args);
            timer = setTimeout(() => {
                flag = false;
                clearTimeout(timer);
                timer = null;
            }, time)
        }else {
            timer = setTimeout(() => {
                func.apply(this, args);
                flag = false;
                clearTimeout(timer);
                timer = null;
            }, time)
        }
    }
}

function throttleT(func, time, immediate) {
    let timer = null;
    return function(...args) {
        if(timer !== null) return;
        if(immediate) {
            func.apply(this, args);
            timer = setTimeout(() => {
                clearTimeout(timer);
                timer = null;
            }, time)
        }else {
            timer = setTimeout(() => {
                func.apply(this, args);
                clearTimeout(timer);
                timer = null;
            }, time)
        }
    }
}
/**
 * 对数组中的对象进行属性名修改，在原有属性名后添加索引
 * @param {Array} arr - 需要处理的数组，数组元素应为对象
 * @returns {undefined} - 该函数没有返回值
 */
function editDatakey(arr) {
  // 检查输入是否为数组，如果不是则直接返回
  if(!Array.isArray(arr)) return;
  // 创建一个新数组用于存储处理后的对象
  let newArr = [];
  // 遍历输入数组中的每个对象
  arr.forEach((item) => {
    // 创建一个新对象用于存储修改后的属性
    let obj = {};
    // 获取当前对象的所有属性名
    let keys = Object.keys(item);
    obj = {...item, keys: keys, keyNum: keys.length};
    // 遍历所有属性名
    // keys.forEach((key, index) => {
      // 将属性名修改为"属性名_索引"的形式，并赋值给新对象
        // obj[`data_${index}`] = item[key];
    // });
    // 将处理后的对象添加到新数组中
    newArr.push(obj);
  });
  return newArr;
  // 注意：函数中没有返回新数组，新数组在函数内部创建但未被使用
}

export {
    debounce,
    throttle,
    throttleT,
    editDatakey
}