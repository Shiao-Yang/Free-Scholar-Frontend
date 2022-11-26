<template>
  <div class="adminHome">
    <div class="body">
      <div class="header-box">
        <img class="avatar" src="../assets/YAN.jpg">
        <div class="welcome">
          <p class="welcome-en">Hi! Admin!</p>
          <p class="welcome-zh">欢迎回来！</p>
        </div>
      </div>
      <hr style="height:3px;border:none;border-top:1px solid rgba(128, 128, 128, 0.4);margin-top: 30px" />
      <div class="manage-box">
        <div class="todo">待处理<i class='bx bxs-circle'></i></div>
        <div class="user-manage manage">
          <i class='bx bxs-user'></i>
          <div class="info">
            <p class="title">用户事项</p>
            <p class="data data-todo">32</p>
          </div>
        </div>
        <div class="scholar-manage manage">
          <i class='bx bxs-objects-horizontal-left'></i>
          <div class="info">
            <p class="title">学术事项</p>
            <p class="data data-down">All Down</p>
          </div>
        </div>
        <div class="total-manage">
          <p class="title">总计处理</p>
          <table>
            <tr>
              <td><i class='bx bxs-user-plus'></i></td>
              <td><span>2309</span>times</td>
            </tr>
            <tr>
              <td><i class='bx bx-list-check' ></i></td>
              <td><span>389</span>times</td>
            </tr>
            <tr>
              <td><i class='bx bxs-objects-horizontal-left'></i></td>
              <td><span>28</span>times</td>
            </tr>
          </table>
        </div>
      </div>
      <p class="statistics">仪表盘</p>
      <img src="../assets/img/adminHome/data.jpg">
    </div>
    <div class="record">
      <div class="header-search-box">
        <input type="text" autocomplete="off"
               id="input"
               class="search-input"
               v-model="input"
               placeholder="查询记录"
               @keyup.enter="">
        <span class="search-icon" title="搜索"><i class='bx bx-search' @click=""></i></span>
      </div>
      <p class="remind">提醒</p>
      <p style="text-align: center">暂无提醒</p>
      <table>
        <tr v-for="(item, i) in records">
          <td><img :src="item.avatar" class="avatar"> </td>
          <td class="name-box"><span>{{item.name}}</span></td>
          <td class="action-box">
            <span v-if="item.type==='report'&&item.who==='user'">提交了一条</span>
            <span v-else-if="item.type==='complain'&&item.who==='user'">发起了一次</span>
            <span v-else-if="item.who==='admin'">处理了一次</span>
          </td>
          <td class="type-box">
            <span v-if="item.type==='report'">举报</span>
            <span v-else-if="item.type==='complain'">申诉</span>
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>

export default {
  name: 'AdminHome',
  created() {
    window.myData = this;
  },
  mounted() {

  },
  data() {
    return {
      input: '',
      records: [
        {
          avatar: require('../assets/YAN.jpg'),
          name: '王婉',
          type: 'report',
          who: 'user',
        }, {
          avatar: require('../assets/YAN.jpg'),
          name: '王婉',
          type: 'complain',
          who: 'user',
        }, {
          avatar: require('../assets/YAN.jpg'),
          name: 'Admin',
          type: 'complain',
          who: 'admin'
        }
      ]
    }
  },
  methods: {
    changePage(val){
      let i;
      let length = this.results.length
      console.log("val:"+val)
      console.log("length:"+length)
      this.displayResult = [];
      for (i = (val-1) * 5; i < length && i < val * 5; i++) {
        this.displayResult.push(this.results[i]);
      }
    },
  }
}
</script>

<style scoped>
.body {
  position: relative;
  /*display: inline-block;*/
  float: left;
  /*left: 300px;*/
  width: 70%;
  height: 100%;
  margin: 0;
  border-right: 1px solid rgba(128, 128, 128, 0.4);
}
.record {
  position: relative;
  float: left;
  /*left: 320px;*/
  width: 26%;
  /*width: 100px;*/
  /*width: 100%;*/
  height: 100%;
  margin-left: 20px;
}
.header-box {
  margin-top: 0;
  position: relative;
  height: 100px;
  width: 100%;
}
.avatar {
  position: relative;
  float: left;
  height: 100px;
  width: 100px;
  /*margin: 20px;*/
  border-radius: 50px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.3), 0 6px 20px 0 rgba(0, 0, 0, 0.3);
}
.record .avatar {
  position: relative;
  float: left;
  height: 60px;
  width: 60px;
  /*margin: 20px;*/
  border-radius: 30px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.3), 0 6px 20px 0 rgba(0, 0, 0, 0.3);
  margin-left: 10px;
}
.welcome {
  float: left;
}
.welcome-en {
  font-weight: bold;
  font-size: 24px;
  margin: 25px 0 0 20px;
}
.welcome-zh {
  margin: 0 0 0 20px;
}
.manage-box {
  position: relative;
  width: 100%;
  height: 250px;
}
.todo {
  position: relative;
  font-weight: bold;
  font-size: 30px;
  line-height: 30px;
  margin: 20px 40px 10px 40px;
}
.todo .bxs-circle {
  color: #C34A36;
  font-size: 20px;
  margin-left: 20px;
}
.manage {
  position: relative;
  float: left;
  margin: 80px 60px 0 20px;
}
.manage .bx {
  position: relative;
  float: left;
  font-size: 120px;
}
.manage .bxs-user {
  color: #1CBBB4;
}
.manage .bxs-objects-horizontal-left {
  color: #F37B1D;
}
.info {
  position: relative;
  float: left;
}
.title {
  font-weight: bold;
  font-size: 24px;
  margin-top: 0;
}
.info .data {
  position: relative;
  font-weight: bold;
  text-align: center;
  margin-top: 40px;
}
.info .data-todo {
  color: #E54D42;
}
.info .data-down {
  color: #39B54A;
}
.total-manage {
  position: relative;
  float: left;
}
.total-manage .title {
  margin-bottom: 10px;
}
.total-manage .bx {
  font-size: 50px;
}
.total-manage .bxs-user-plus {
  color: #1CBBB4;
}
.total-manage .bx-list-check {
  color: #6739B6;
}
.total-manage .bxs-objects-horizontal-left {
  color: #F37B1D;
}
.total-manage span {
  font-weight: bold;
  font-size: 20px;
  margin: 0 10px;
}
.statistics {
  position: relative;
  font-weight: bold;
  font-size: 30px;
  margin-left: 40px;
  margin-bottom: 10px;
}

.header-search-box {
  display: inline-block;
  position: relative;
  height: 60px;
  /*width: 100%;*/
}

.header-search-box .search-input{
  position: relative;
  display: inline-block;
  font-size: 15px;
  width: 230px;
  min-width: 220px;
  height: 20px;
  padding: 10px 20px 10px 20px;
  border-radius: 10px;
  border: 1px solid rgb(240,240,240);
  margin: 0 auto;
  /*border-bottom: 3px solid rgba(33,150,243,0.5);*/
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.1), 0 6px 20px 0 rgba(0, 0, 0, 0.1);
  outline: none;
}

.header-search-box .search-icon i{
  position: relative;
  text-align: center;
  display: inline-block;

  color: #333333;
  margin-left: 5px;
  /*margin-bottom: 40px;*/
  line-height: 50px;
  height: 50px;
  right: 0px;
  /*width: 50px;*/
  font-size: 15px;
  min-width: 50px;
  /*min-width: 40%;*/
  background: white;
  border-radius: 50%;
  cursor: pointer;
  transition: .5s;
}

.header-search-box .search-icon i:hover {
  color: white;
  background: #2196f3;
}
.remind {
  margin: 20px 0 10px 0;
  font-size: 28px;
  font-weight: bold;
}
.record table tr {
  display: block;
  margin: 20px 0;
}
.name-box {
  width: 100px;
  max-width: 100px;
  overflow: hidden;
  text-align: center;
}
.name-box span{
  font-weight: bold;
  font-size: 18px;
}
.action-box span {
  margin-right: 20px;
}
.type-box span {
  font-weight: bold;
  font-size: 18px;
}
</style>