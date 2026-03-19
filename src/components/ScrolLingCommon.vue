<template>
    <div class="main_scroll">
        <div class="synchronized-scrolling">
            <!-- 左侧独立表格 (1列) -->
            <div class="table-wrapper left-wrapper">
                <div class="grid-header">
                    <div class="grid-row header-row">
                        <div class="grid-cell">选择</div>
                    </div>
                </div>
                <div class="grid-body" ref="leftScrollEl" id="left-grid-body" @scroll="onScroll">
                    <!-- JS 插入左侧数据 -->
                     <div class="grid-row header-row" v-for="item in leftData" :key="item.id">
                        <div class="grid-cell">{{ item.f_name }}</div>
                    </div>
                </div>
            </div>
            <div class="table-wrapper right-wrapper">
            <!-- 表头区域 -->
                <div class="grid-header">
                    <div class="grid-row header-row">
                        <div class="grid-cell">ID</div>
                        <div class="grid-cell">用户名</div>
                        <div class="grid-cell">邮箱</div>
                        <div class="grid-cell">注册日期</div>
                        <div class="grid-cell">性别</div>
                        <div class="grid-cell">个人简介</div>
                        <div class="grid-cell">排名</div>
                        <div class="grid-cell">状态</div>
                    </div>
                </div>

                <!-- 表格内容区域 -->
                <div class="grid-body" id="grid-body" ref="centerScrollEl" @scroll="onScroll">
                    <!-- 数据将由 JS 插入这里 -->
                    <div class="grid-row header-row" v-for="item in data" :key="item.id">
                        <div class="grid-cell">{{ item.id }}</div>
                        <div class="grid-cell">{{ item.name }}</div>
                        <div class="grid-cell">{{ item.email }}</div>
                        <div class="grid-cell">{{ item.date }}</div>
                        <div class="grid-cell">{{ item.sex ? '男' : '女'}}</div>
                        <div class="grid-cell">{{ item.paragraph }}</div>
                        <div class="grid-cell">{{ item.number }}</div>
                        <div class="grid-cell">{{ item.boolean ? '升高' : '降低'}}</div>
                    </div>
                </div>
            </div>
            <!-- 右侧独立表格 (1列) -->
            <div class="table-wrapper left-wrapper">
                <div class="grid-header">
                    <div class="grid-row header-row">
                        <div class="grid-cell">选择</div>
                    </div>
                </div>
                <div class="grid-body" ref="rightScrollEl" id="left-grid-body" @scroll="onScroll">
                    <!-- JS 插入左侧数据 -->
                     <div class="grid-row header-row" v-for="item in rightData" :key="item.id">
                        <div class="grid-cell">{{ item.f_name }}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { userScroll } from '@/hook/scroll';
import { createMockData, createSignlrMockData } from '@/utils/mock';
import { onMounted, onUnmounted, ref } from 'vue';
let data = ref([]);
let leftData = ref([]);
let rightData = ref([]);
let rightScrollEl = ref(null);
let leftScrollEl = ref(null);
let centerScrollEl = ref(null);
const SCROLL_THROTTLE_TIME = 16;

const { clearScroll, initScroll, onScroll} = userScroll();
initScroll([rightScrollEl, centerScrollEl, leftScrollEl], SCROLL_THROTTLE_TIME);

onMounted(() => {
    data.value = createMockData().dataList;
    leftData.value = createSignlrMockData().dataList;
    rightData.value = createSignlrMockData().dataList;
})
onUnmounted(() => {
    // targetScroll.value = null;
    clearScroll();
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

// 外层容器：Flex 布局
.synchronized-scrolling {
    display: flex;
    width: 100%;
    max-width: 1200px;
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
    flex: 1; // 占据剩余宽度
    min-width: 0; // 防止内容撑开 Flex 容器
}

// 通用 Grid 样式
.grid-header, .grid-body {
    display: grid;
    box-sizing: border-box; 
}

// 左侧表格 Grid 定义 (1列)
.left-wrapper .grid-header,
.left-wrapper .grid-body {
    grid-template-columns: 60px; // 与容器宽度一致
}

// 右侧表格 Grid 定义 (8列)
.right-wrapper .grid-header,
.right-wrapper .grid-body {
    // 定义列宽
    grid-template-columns: 60px 120px 200px 120px 100px 1fr 100px 100px;
}

// 表头样式
.grid-header {
    background-color: @header-bg;
    z-index: 10;
    border-bottom: 1px solid @border-color;
    flex-shrink: 0; // 防止表头被压缩
    padding-right: @scrollbar-width;
    .header-row {
        display: contents;
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
    display: contents;
    
    &:hover .grid-cell {
        background-color: @hover-bg;
    }
}

// 单元格通用样式
.grid-cell {
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
    
    &:last-child {
        border-right: none;
    }
}

.grid-header .grid-cell {
    font-weight: bold;
    color: #303133;
}

</style>