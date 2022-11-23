<template>
  <div class="settings">
    <div class="header">
      <div class="header-text-box">
        <p id="welcome" class="header-text">开启你的学术之旅</p>
      </div>
      <div class="header-search-box">
        <input type="text" autocomplete="off"  
               id="input"
               class="search-input"
               v-model="input"
               placeholder="Search resources..."
               @keyup.enter="">
        <span class="search-icon" title="搜索"><i class='bx bx-search' @click=""></i></span>
      </div>
      <div class="hotWord-box">
        <ul id="hot" class="hotWord-list">
          <li><span class="hotWord-text">热词推荐</span></li>
          <li id="hot1" class="hot-item"><span class="hotWord">AI</span></li>
          <li id="hot2" class="hot-item"><span class="hotWord">计算机技术</span></li>
          <li id="hot3" class="hot-item"><span class="hotWord">核磁共振</span></li>
          <li id="hot4" class="hot-item"><span class="hotWord">无机化学</span></li>
        </ul>
      </div>
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
.settings {
  position: relative;
  margin: 0 auto;
  width: 100%;
  height: 300px;
  border-radius: 10px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.3), 0 6px 20px 0 rgba(0, 0, 0, 0.3);
  background: url("../assets/img/settings/searchImg.jpg") no-repeat;
  background-size: 100% 300px;
}

.header {
  max-width: 1380px;
  width: 100%;
  margin: 0 auto;
}

.header-text-box{
  width: 100%;
  margin: 0 auto;
  padding: 30px 0;
  text-align: center;
}

.header-text-box .header-text{
  font-size: 65px;
  color: white;
  font-weight: bold;
  margin: 0;
}

.header-search-box {
  position: relative;
  text-align: center;
}

.header-search-box .search-input{
  position: relative;
  font-size: 18px;
  font-weight: bold;
  min-width: 550px;
  height: 30px;
  padding: 10px 20px 10px 20px;
  border-radius: 10px;
  border: none;
  outline: none;
}

.header-search-box .search-icon i{
  color: #333333;
  margin-left: 5px;
  line-height: 50px;
  height: 50px;
  font-size: 20px;
  min-width: 50px;
  background: white;
  border-radius: 50%;
  cursor: pointer;
  transition: .5s;
}

.header-search-box .search-icon i:hover {
  color: white;
  background: #2196f3;
}

.hotWord-box {
  margin-top: 30px;
  width: 100%;
}

.hotWord-box .hotWord-list{
  margin: 0;
  padding: 0;
  width: 100%;
  display: flex;
  list-style: none;
  height: 30px;
  line-height: 40px;
  align-items: center;
  justify-content: center;
}

.hotWord-box .hotWord-list .hotWord-text {
  color: white;
  font-size: 20px;
  font-weight: bold;
}

.hotWord-list .hot-item {
  font-size: 14px;
  margin: 0 20px;
  background: white;
  min-width: 50px;
  text-align: center;
  padding: 5px 15px;
  border-radius: 20px;
  cursor: pointer;
  transition: 0.5s;
}

.hotWord-list .hot-item:hover {
  padding: 8px 20px;
  font-size: 18px;
  color: white;
  background: #2196f3;
}
</style>
