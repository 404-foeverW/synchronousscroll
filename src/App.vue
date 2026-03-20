<template>
  <img alt="Vue logo" src="./assets/logo.png">
  <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
  <!-- <ScrolLing></ScrolLing> -->
  <!-- <ScrolLingCommon></ScrolLingCommon> -->
  <!-- transform: translate 形式 -->
  <!-- <ScrolLingCommmonT></ScrolLingCommmonT> -->
   <ScrolLingComponent :scrollDate="scrollDate" :type="type" @scrollToDown="scrollToDown"></ScrolLingComponent>
</template>

<script setup>
import { editDatakey } from './utils/common';
import { onMounted, ref } from 'vue';
import ScrolLingComponent from './components/ScrolLingComponent.vue';
// import ScrolLingCommmonT from './components/ScrolLingCommmonT.vue';
// import ScrolLingCommon from './components/ScrolLingCommon.vue';
// import HelloWorld from './components/HelloWorld.vue'
// import ScrolLing from './components/ScrolLingControll.vue';
import { createMockData, createSignlrMockData } from '@/utils/mock';
let scrollDateO = ref(null);
let scrollDateT = ref(null);
let scrollDateW = ref(null);
let scrollDate = ref([]);
// type: 1: 一次排列 2: 合并排列 3: 上下排列
let type = ref(1);

function scrollToDown() {
  console.log('scrollToDown')
}

onMounted(() => {
  scrollDateO.value = {
    headerDate: ['选择'],
    data: editDatakey(createSignlrMockData().dataList)
  }
  scrollDateT.value = {
    headerDate: ['ID', '姓名', '年龄', '性别', '地址', '电话', '邮箱', '选择'],
    data: editDatakey(createMockData().dataList)
  }
  scrollDateW.value = {
    headerDate: ['选择'],
    data: editDatakey(createSignlrMockData().dataList)
  }
  scrollDate.value = [scrollDateO.value, scrollDateT.value, scrollDateW.value];
  console.log(scrollDate.value);
})
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
