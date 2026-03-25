<template>
    <div class="main_scroll">
        <div class="synchronized-scrolling">
            <div class="table-wrapper right-wrapper" v-for="(item, index) in props.scrollDate" :key="index">
            <!-- 表头区域 -->
                <div class="grid-header">
                    <div class="grid-row header-row">
                        <div class="grid-cell" v-for=" (headerTitle, idx) in item.headerDate" :key="idx">{{headerTitle}}</div>
                    </div>
                </div>

                <!-- 表格内容区域 -->
                <div class="grid-body" id="grid-body" ref="centerScrollEl" @scroll="onScroll">
                    <!-- 数据将由 JS 插入这里 -->
                    <div class="grid-row header-row" v-for="(list, listIndex) in item.data" :key="listIndex">
                        <div class="grid-cell" v-for="(key, indexKey) in list.keys" :key="indexKey">{{ list[key] }}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
// import { userScroll } from '@/hook/scroll';
// import { createMockData, createSignlrMockData } from '@/utils/mock';
// import { onMounted, onUnmounted, ref } from 'vue';
import { onMounted, onUnmounted, defineProps, ref } from 'vue';

// tableOverflow: 1 平分 2 不平分，最大width的自适应
const tableOverflow = ref(1);
const ROW_WIDTH = 60;
const maxRowNum = ref(0);
// const MAX_DIFF_NUM = 7;
const props = defineProps({
    scrollDate: {
        type: Array,
        default: () => []
    },
    type: {
        type: [String, Number],
        default: 1
    }
})
// let data = ref([]);
// let leftData = ref([]);
// let rightScrollEl = ref(null);
// let centerScrollEl = ref(null);
// const SCROLL_THROTTLE_TIME = 16;

// const { clearScroll, initScroll, onScroll} = userScroll();
// initScroll([rightScrollEl, centerScrollEl], SCROLL_THROTTLE_TIME);
function getMaxNum() {
    let viewWidth = document.body.clientWidth;
    maxRowNum.value = Math.floor(viewWidth / ROW_WIDTH);
}
function getOverflowBool() {
    let trunthRowNum = 0;
    let tableRowNum = [];
    props.scrollDate.forEach(item => {
        let num = item.headerDate.length + item.data[0].keyNum;
        tableRowNum.push(num);
        trunthRowNum = trunthRowNum + num;
    })
    if(trunthRowNum >= maxRowNum.value) {
        tableOverflow.value = 1;
    }else {
        // 考虑是否将各个表格的宽度不平分情况
        // tableAllocation(trunthRowNum, tableRowNum);
        // tableAllocation
    }
}

// function tableAllocation(rownum, rowNumArr) {
    // 多个固定宽度多个横向滚动
    // 单个固定多个横向滚动
    // 全部为固定
// }

onMounted(() => {
    // data.value = createMockData().dataList;
    // leftData.value = createSignlrMockData().dataList;
    getMaxNum();
    getOverflowBool();
})
onUnmounted(() => {
    // targetScroll.value = null;
    // clearScroll();
})
</script>
<style lang="less" scoped>
// 变量定义
@bg-color: #f4f6f8;
@table-bg: #ffffff;
@header-bg: #eef1f6;
@border-color: #dcdfe6;
@text-color: #606266;
@hover-bg: #f5f7fa;
@row-height: 50px; // 关键：两个表格必须使用相同的行高
@scrollbar-width: 8px;

body {
    margin: 0;
    padding: 20px;
    background-color: @bg-color;
    font-family: sans-serif;
}
.main_scroll {
    margin: 0 20px;
}

// 外层容器：Flex 布局
.synchronized-scrolling {
    display: flex;
    width: 100%;
    // max-width: 1200px;
    margin: 0 auto;
    background-color: @table-bg;
    border: 1px solid @border-color;
    border-radius: 4px;
    overflow: hidden; // 隐藏圆角溢出
    height: 500px; // 总高度
}

// 通用表格容器样式
.table-wrapper {
    display: flex;
    flex-direction: column;
    height: 100%;
    overflow: hidden; // 内部滚动
    background-color: @table-bg;
    box-sizing: border-box; 
}

// 左侧容器特定样式
.left-wrapper {
    width: 60px; // 固定宽度
    flex-shrink: 0; // 防止被挤压
    border-right: 1px solid @border-color;
    
    .grid-cell {
        box-sizing: border-box; 
        justify-content: center; // 内容居中
        padding: 0; // 减少内边距
    }
}

// 右侧容器特定样式
.right-wrapper {
    width: fit-content;
    // flex: 1; // 占据剩余宽度
    min-width: 0; // 防止内容撑开 Flex 容器
}

// 通用 Grid 样式
.grid-header, .grid-body {
    // display: grid;
    box-sizing: border-box; 
}

// 左侧表格 Grid 定义 (1列)
// .left-wrapper .grid-header,
// .left-wrapper .grid-body {
//     grid-template-columns: 60px; // 与容器宽度一致
// }

// 右侧表格 Grid 定义 (8列)
// .right-wrapper .grid-header,
// .right-wrapper .grid-body {
//     // 定义列宽
//     grid-template-columns: 60px 120px 200px 120px 100px 1fr 100px 100px;
// }

// 表头样式
.grid-header {
    background-color: @header-bg;
    z-index: 10;
    border-bottom: 1px solid @border-color;
    flex-shrink: 0; // 防止表头被压缩
    padding-right: @scrollbar-width;
    height: 50px;
    .header-row {
        // display: contents;
        display: flex
    }
}

// 表格主体样式
.grid-body {
    overflow-y: auto; // 允许垂直滚动
    flex: 1; // 占据剩余高度
    overflow-y: scroll; 
    overflow-x: scroll; 
    // 自定义滚动条样式 (仅右侧表格显示滚动条)
    &::-webkit-scrollbar {
        width: 8px;
    }
    &::-webkit-scrollbar-thumb {
        background: #c0c4cc;
        border-radius: 4px;
    }
    &::-webkit-scrollbar-track {
        background: #f4f4f5;
    }
}

// 行样式
.grid-row {
    // display: contents;
    display: flex;
    height: 60px;
    &:hover .grid-cell {
        background-color: @hover-bg;
    }
}

// 单元格通用样式
.grid-cell {
    width: 80px;
    max-width: 120px;
    height: @row-height; // 关键：固定高度确保对齐
    display: flex;
    align-items: center;
    padding: 0 16px;
    box-sizing: border-box;
    border-bottom: 1px solid @border-color;
    border-right: 1px solid @border-color;
    font-size: 14px;
    color: @text-color;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    // flex: 1;
    &:last-child {
        border-right: none;
    }
}

.grid-header .grid-cell {
    font-weight: bold;
    color: #303133;
}

</style>