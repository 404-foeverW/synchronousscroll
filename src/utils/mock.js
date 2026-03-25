import mock from "mockjs";
const template = {
    'dataList|20': [{
        // 第1列：ID
        'id|+1': 1,

        // 第2列：随机姓名
        'name': '@cname',

        // 第3列：随机邮箱
        'email': '@email', 
        
        // 第4列：随机日期
        'date': '@date("yyyy-MM-dd")', 
        
        // 第5列：性别
        'sex': "@pick([1, 0])", 
        
        // 第6列：随机段落文本
        'paragraph': '@paragraph(1)', 
        
        // 第7列：随机整数排名 (100-1000)
        'number|100-1000': 1, 
        
        // 第8列：随机布尔值 是否提高
        'boolean': '@boolean'
    }]
};
const signletemplate = {
    'dataList|20': [{
        'f_name': '@cname'
    }]
}
function createMockData() {
    let result = mock.mock(template);
    console.log(JSON.stringify(result));
    return result;
}
function createSignlrMockData() {
    let result = mock.mock(signletemplate);
    console.log(JSON.stringify(result));
    return result;
}
// export default createMockData;
export {
    createSignlrMockData,
    createMockData
}