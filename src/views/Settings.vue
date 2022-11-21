<template>
  <div class="settings">
    <img src="../assets/img/searchImg.jpg" id="searchImg">
    <p id="welcome">开启你的学术之旅</p>
    <img src="../assets/img/logo.png" id="logo">
    <div id="search">
      <input type="text" autocomplete="off" id="input" v-model="input" placeholder="Search resources..." @keyup.enter="">
      <img src="../assets/img/search.png" id="searchBtn" @click="">
    </div>
    <div id="hot">
      <div id="hot1" class="hot"><span class="hotWord">AI</span></div>
      <div id="hot2" class="hot"><span class="hotWord">计算机技术</span></div>
      <div id="hot3" class="hot"><span class="hotWord">核磁共振</span></div>
      <div id="hot4" class="hot"><span class="hotWord">无机化学</span></div>
    </div>
  </div>
</template>

<script>

  export default {
    name: 'Settings',
    created() {

    },
    mounted() {

    },
    data() {
      return {
        input: '',

      }
    },
    methods: {

    }
  }
</script>

<style scoped>

#searchImg {
  position:  absolute;
  width: 1380px;
  height: 200px;
  left: 100px;
  top: 30px;
  border-radius: 10px;
  //box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.3), 0 6px 20px 0 rgba(0, 0, 0, 0.3);
}
#welcome {
  position: relative;
  left: 500px;
  top: 40px;
  margin: 0px;
  font-size: 35px;
  color: white;
}
#logo {
  position: absolute;
  left: 450px;
  top: 120px;
  width: 40px;
  height: 40px;
}
#search {
  position: relative;
  left: 500px;
  top: 60px;
}
#input {
  width: 500px;
  height: 40px;
  border-radius: 5px;
  border: 1px solid rgb(240,240,240);
  font-size: 20px;
}
#input:focus {
  outline: 1.2px solid #3498db;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.3), 0 6px 20px 0 rgba(0, 0, 0, 0.3);
}
#searchBtn {
  position: relative;
  width: 30px;
  height: 30px;
  top: 10px;
  left: -35px;
  cursor: pointer;
}
#hot {
  position: absolute;
  left: 500px;
  top: 180px;
  width: 1000px;
}
.hot {
  position: relative;
  cursor: pointer;
  float: left;
  height: 40px;
  margin: 0px 20px 0 20px;
  background-color: white;
  border-radius: 10px;
  opacity: 0.9;
  border: 1px solid rgb(240,240,240);
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.1), 0 6px 20px 0 rgba(0, 0, 0, 0.1);
}
.hotWord {
  position: relative;
  margin: 10px;
  top: 8px;
}
</style>