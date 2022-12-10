<template>
  <div class="home">
    <div class="intro">
      <div class="avatar">
        <img :src="require('../assets/' + url)">
      </div>
      <div class="profile">
        <ul class="profile-list">
          <li class="profile-list-item">
            <span class="icon"><i class='bx bxs-user'></i></span>
            <span class="text" style="font-size: 25px; font-weight: bold">{{ username }}</span>
          </li>
          <li class="profile-list-item">
            <span class="icon"><i class='bx bxs-home'></i></span>
            <span class="text">{{ institution }}</span>
          </li>
          <li class="profile-list-item">
            <span class="icon"><i class='bx bxs-bookmark'></i></span>
            <span class="text">{{ profile }}</span>
          </li>
        </ul>
      </div>
      <div class="social-info">
        <div class="social-info-item">
          <div class="title">
            <span class="icon" style="font-size: 28px; position: relative; top: 0px;" :class="{'active': isLike}"><i
                class='bx bxs-user-plus'></i></span>
            <span class="text" style="position: relative; top: -6px;">关注</span>
          </div>
          <div class="social-info-number">
            <div class="number">
              {{ FollowNumber }}
            </div>
          </div>
        </div>
        <div class="social-info-item" v-if="isScholar===true">
          <div class="title">
            <span class="icon"><i class='bx bxs-heart'></i></span>
            <span class="text">粉丝</span>
          </div>
          <div class="social-info-number">
            <div class="number">
              {{ FanNumber }}
            </div>
          </div>
        </div>
        <div class="social-info-item">
          <div class="title">
            <span class="icon" :class="{'active': isLike}"><i class='bx bxs-like'></i></span>
            <span class="text">获赞</span>
          </div>
          <div class="social-info-number">
            <div class="number">
              {{ LikeNumber }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="content-list">
      <div class="title">
        <i class="el-icon-view" style="color: #E1A105;font-size: 50px; margin-right: 10px"></i>
        <span class="title-name">
          历史记录
        </span>
        <div style="margin-left: auto">
          <el-button @click="toDeleteAllHistory()">清空已选</el-button>
          <el-button @click="toDeleteSelectedHistory()">清空全部</el-button>
        </div>
      </div>
      <div class="divider"></div>
      <div class="history-list">
        <div class="history-list-divided-by-data" v-for="(item,index) in historyListDivededByDate" :key="index">
          <span class="history-time">{{historyListDivededByDate[index][0].date}}&nbsp</span>
          <el-table
                ref="multipleTable"
                :data="historyListDivededByDate[index]"
                tooltip-effect="dark"
                style="width: 100% ;overflow:auto;"
                fit="true"
                @selection-change="handleSelectionChange"
            >
              <el-table-column
                  prop="title"
                  label="标题"
                  width="1075">
              </el-table-column>
              <el-table-column
                  prop="time"
                  label="时间"
                  width="120">
              </el-table-column>
              <el-table-column
                  type="selection"
                  width="55">
              </el-table-column>
            </el-table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "FollowList",
  data() {
    return {
      url: 'img/home/avatar1.jpg',
      username: 'Peter',
      institution: 'Beihang University',
      profile: 'I am Peter',
      isFollow: false,
      isLike: false,
      isScholar: false,
      FollowNumber: 32,
      LikeNumber: 20,
      FanNumber: 15,
      currentPage: 1,
      historyList: [
        {
          date: '2022-11-18',
          title: '信号量在母猪产后护理的应用',
          time: '16:07',
        },
        {
          date: '2022-11-18',
          title: '七圣召唤技术实践',
          time: '11:03',
        },
        {
          date: '2022-11-18',
          title: '摸鱼学导论',
          time: '08:28',
        },
        {
          date: '2022-11-15',
          title: '信号量在母猪产后护理的应用',
          time: '08:07',
        },
        {
          date: '2022-11-15',
          title: '七圣召唤技术实践',
          time: '07:02',
        },
        {
          date: '2022-11-15',
          title: '信号量在母猪产后护理的应用',
          time: '06:07',
        },
        {
          date: '2022-11-15',
          title: '七圣召唤技术实践',
          time: '03:02',
        },
        {
          date: '2022-11-15',
          title: '信号量在母猪产后护理的应用',
          time: '01:07',
        },
        {
          date: '2022-11-15',
          title: '七圣召唤技术实践',
          time: '01:02',
        },

      ],
      historyListDivededByDate: [],
      multipleSelection: []
    }
  },
  methods: {
    changePage(currentPage) {
      this.showList = [];
      for (let i = (currentPage - 1) * 3, j = 0; i < this.followList.length && j < 3; i++, j++) {
        this.showList[j] = this.followList[i]
      }
    },
    init() {
      let len = this.historyList.length;
      let tempThis = this;
      let tempDate = this.historyList[0].date;
      let tempListDividedByDate = [];
      let j = 0;
      for (let i = 0; i < len; i++) {
        if (tempThis.historyList[i].date !== tempDate) {
          tempThis.historyListDivededByDate[j]=tempListDividedByDate;
          j = j + 1;
          tempListDividedByDate = [];
          tempDate = tempThis.historyList[i].date;
        }
        tempListDividedByDate[tempListDividedByDate.length]=tempThis.historyList[i];
        if(i===len-1){
          tempThis.historyListDivededByDate[j]=tempListDividedByDate;
        }
      }
      console.log(tempThis.historyListDivededByDate)
    },
    toDeleteAllHistory(){

    },
    toDeleteSelectedHistory(){

    },
    handleSelectionChange(val) {
      this.multipleSelection.push(val);
    }
  },
  created() {
    this.init()
  }
}
</script>

<style scoped>
* {
  margin: 0px;
  padding: 0px;
  box-sizing: border-box;
  z-index: -10;
}

.intro {
  position: absolute;
  width: 100%;
  min-width: 1450px;
  height: 200px;
  border-radius: 10px;
  box-shadow: 0 1px 20px 0 rgba(0, 0, 0, 0.1), 0 2px 20px 0 rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: flex-start;
  border-radius: 5px;
}

.avatar {
  position: relative;
  margin: 15px 0px 15px 30px;
  width: 150px;
  height: 170px;
  vertical-align: middle;
}

.avatar img {
  height: 170px;
  width: 140px;
  max-height: 100%;
  vertical-align: middle;
  border-radius: 5px;
  z-index: 1;
}

.profile {
  position: relative;
  margin:10px;
  width: 150px;
  height: 150px;
}

.profile ul {
  list-style: none;
}

.profile .profile-list .profile-list-item {
  margin: 15px 10px 30px 10px;
  width: 600px;
  display: flex;
  height: 30px;
  line-height: 40px;
  align-items: center;
}

.profile .profile-list .profile-list-item .icon {
  font-size: 25px;
  margin-right: 10px;
  margin-top: 4px;
}

.profile .profile-list .profile-list-item .text {
}

.social-info {
  position: absolute;
  right: 0px;
  bottom: 0px;
  width: 360px;
  height: 80px;
  display: flex;
  justify-content: flex-end;
}

.social-info .social-info-item {
  width: 120px;
  height: 80px;
  cursor: pointer;
  transition: 0.2s;
}

.social-info .social-info-item .title {
  width: 120px;
  height: 40px;

}

.social-info .social-info-item:hover {
  color: #2196f3;
}

.social-info .social-info-item .title .icon {
  position: relative;
  margin: 0 5px 0 30px;
  font-size: 20px;
  top: 5px;
}

.social-info .social-info-item .title .icon.active{
  color: pink;
}

.social-info .social-info-item .title .text {
  position: relative;
  top: 2px;
  margin: 0px 20px 0 0;
}

.social-info-number {
  width: 120px;
  height: 40px;
  display: flex;
  justify-content: flex-end;
}

.social-info-number .number {
  position: relative;
  top: 5px;
  margin: 0 auto;
}

.content-list {
  position: absolute;
  top: 220px;
  left: 0px;
  width: 100%;
  min-width: 1450px;
  height: 700px;
  box-shadow: 0 1px 20px 0 rgba(0, 0, 0, 0.1), 0 2px 20px 0 rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  align-items: center;
  margin-bottom: 30px;
}

.content-list .title {
  width: 95%;
  height: 45px;
  line-height: 50px;
  position: absolute;
  top: 20px;
  left: 2.5%;
  display: flex;
  align-items: center;
  margin: 0 auto;
}

.content-list .title-name {
  margin: 0;
  font-size: 25px;
}

.divider {
  position: absolute;
  margin: 0 auto;
  width: 100%;
  height: 2px;
  top: 75px;
  background-color: #d4d4d4;
  text-align: center;
  font-size: 16px;
  color: rgba(101, 101, 101, 1);
}

.follow-list {
  position: absolute;
  top: 90px;
  width: 100%;
  min-width: 665px;
  height: 370px;
}

.follow-list-item {
  position: relative;
  width: 100%;
  min-width: 700px;
  height: 110px;
  margin-bottom: 20px;
  background: rgb(255, 255, 255);
  display: flex;
  justify-content: flex-start;
  border-radius: 5px;
}

.follow-list-item .avatar {
  position: relative;
  top: -5px;
  left: -10px;
  width: 90px;
  height: 90px;
  display: flex;
  align-content: center;
}

.follow-list-item .avatar img {
  margin: 0;
  padding: 0;
  height: 170px;
  width: 160px;
  max-height: 100%;
  border-radius: 5px;
  z-index: 1;
}

.follow-list-item .profile {
  position: relative;
  top: -5px;
  left: -10px;
  width: 200px;
  height: 100px;
}

.follow-list-item  .profile ul {
  list-style: none;
}

.follow-list-item .profile .profile-list .profile-list-item {
  width: 600px;
  display: flex;
  position: relative;
  top: -7px;
  height: 30px;
  line-height: 30px;
  align-items: center;
}

.follow-list-item .profile .profile-list .profile-list-item .icon {
  font-size: 20px;
  margin-right: 10px;
}

.follow-list-item .profile .profile-list .profile-list-item .text {
  font-size: 10px;
  position: relative;
  top: 0px;
  width: 400px;
  max-width: 400px;
  white-space: nowrap;
  overflow-x: hidden;
  text-overflow: ellipsis;
}

.follow-list-item .social-info {
  position: absolute;
  right: 0px;
  top: 0px;
  width: 120px;
  height: 100px;
  display: flex;
  justify-content: flex-end;
}

.follow-list-item .social-info .social-info-item {
  width: 120px;
  height: 100px;
  position: relative;
  top: 25px;
  right: 20px;
  display: inline;
}

.follow-list-item .social-info .social-info-item .icon {
  color: cornflowerblue;
  margin: 20px;
  font-size: 40px;
  transition: all .5s ease;
  cursor: pointer;
}

.follow-list-item .social-info .social-info-item .icon:hover {
  font-size: 35px;
}

.follow-list-item .social-info .social-info-item .icon.active{
  color: pink;
}

.follow-list-item .social-info .social-info-item .text {
  position: relative;
  top: -2px;
  margin: 0px 10px 0 0;
}

.follow-list-item .social-info-number {
  position: absolute;
  right: 10px;
  bottom: 0px;
  width: 370px;
  height: 25px;
  display: flex;
  justify-content: flex-end;
}

.follow-list-item .social-info-number .number {
  margin: 0 25px 0 65px;
  font-size: 10px;
}

.content-list .pagination {
  position: absolute;
  top: 30px;
  right: 20px;
}

.history-list {
  margin: auto;
  position: relative;
  top: 90px;
  width: 95%;
  min-width: 1400px;
  height: 600px;
  overflow-y: auto;
}

.history-list::-webkit-scrollbar {
  width: 0;
  height: 0;
}

.history-list-divided-by-data {
  position: relative;
  width: 100%;
  margin: 0 0 15px 10px;
  display: flex;
  justify-content: flex-start;
  border-radius: 5px;
}

.content-list .pagination {
  position: absolute;
  top: 30px;
  right: 20px;
}

.history-list .history-time {
  font-size: 18px;
  font-weight: bold;
  margin-right: 40px;
}

</style>
