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
            <span class="text" style="font-size: 25px; font-weight: bold">{{username}}</span>
          </li>
          <li class="profile-list-item">
            <span class="icon"><i class='bx bxs-home'></i></span>
            <span class="text">{{institution}}</span>
          </li>
          <li class="profile-list-item">
            <span class="icon"><i class='bx bxs-bookmark'></i></span>
            <span class="text">{{profile}}</span>
          </li>
        </ul>
      </div>
      <div class="social-info">
        <div class="social-info-item">
          <div class="title">
            <span class="icon" style="font-size: 28px; position: relative; top: 0px;" :class="{'active': isLike}"><i class='bx bxs-user-plus' ></i></span>
            <span class="text" style="position: relative; top: -6px;">关注</span>
          </div>
          <div class="social-info-number">
            <div class="number">
              {{FollowNumber}}
            </div>
          </div>
        </div>
        <div class="social-info-item" v-if="isScholar===true">
          <div class="title">
            <span class="icon"><i class='bx bxs-heart' ></i></span>
            <span class="text">粉丝</span>
          </div>
          <div class="social-info-number">
            <div class="number">
              {{FanNumber}}
            </div>
          </div>
        </div>
        <div class="social-info-item">
          <div class="title">
            <span class="icon" :class="{'active': isLike}"><i class='bx bxs-like' ></i></span>
            <span class="text">获赞</span>
          </div>
          <div class="social-info-number">
            <div class="number">
              {{LikeNumber}}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="content-list">
      <div class="title">
        <i class="el-icon-star-on" style="color: #E1A105;font-size: 50px; margin-right: 10px"></i>
        <span class="title-name">
          我的关注
        </span>
      </div>
      <div class="divider"></div>
      <div class="follow-list">
        <div class="follow-list-item" v-for="(item,index) in showList" :key="index">
          <div class="avatar">
            <img :src="require('../assets/' + item.Avatar)" style="max-width: 100%">
          </div>
          <div class="profile">
            <ul class="profile-list">
              <li class="profile-list-item">
                <span class="icon"><i class='bx bxs-user'></i></span>
                <span class="text" style="font-size: 20px; font-weight: bold">{{item.Userame}}</span>
              </li>
              <li class="profile-list-item">
                <span class="icon"><i class='bx bxs-home'></i></span>
                <span class="text">{{item.Institution}}</span>
              </li>
              <li class="profile-list-item">
                <span class="icon"><i class='bx bxs-bookmark'></i></span>
                <span class="text">{{item.Profile}}</span>
              </li>
            </ul>
          </div>
          <div class="social-info">
            <div class="social-info-item">
              <span class="icon" style="color: cornflowerblue"><i class='bx bxs-message-rounded-dots' title="私信"></i></span>
            </div>
            <div class="social-info-item">
              <span class="icon" style="color: red"><i class='bx bxs-user-x' title="取消关注"></i></span>
            </div>
          </div>
          <div class="social-info-number">
            <span class="number">关注于 : {{item.FollowTime}}</span>
          </div>
        </div>
      </div>
      <div class="pagination">
        <el-pagination
            background
            page-size="3"
            layout="prev, pager, next"
            :hide-on-single-page=true
            :current-page="this.currentPage"
            @current-change="changePage"
            :total="followList.length">
        </el-pagination>
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
      showList: [
        {
          Avatar: 'img/home/avatar1.jpg',
          Userame: '王婉',
          Institution: 'Beihang University',
          Profile: 'I am 王婉',
          FollowTime: '2022-01-10 16:07',
        },
        {
          Avatar: 'img/home/avatar1.jpg',
          Userame: '王婉',
          Institution: 'Beihang University',
          Profile: 'I am 王婉',
          FollowTime: '2022-01-10 16:07',
        },
        {
          Avatar: 'img/home/avatar1.jpg',
          Userame: '王婉',
          Institution: 'Beihang University',
          Profile: 'I am 王婉',
          FollowTime: '2022-01-10 16:07',
        },
      ],
      followList:[
        {
          Avatar: 'img/home/avatar1.jpg',
          Userame: '王婉',
          Institution: 'Beihang University',
          Profile: 'I am 王婉',
          FollowTime: '2022-01-10 16:01',
        },
        {
          Avatar: 'img/home/avatar1.jpg',
          Userame: '王婉',
          Institution: 'Beihang University',
          Profile: 'I am 王婉',
          FollowTime: '2022-01-10 16:02',
        },
        {
          Avatar: 'img/home/avatar1.jpg',
          Userame: '王婉',
          Institution: 'Beihang University',
          Profile: 'I am 王婉',
          FollowTime: '2022-01-10 16:03',
        },
        {
          Avatar: 'img/home/avatar1.jpg',
          Userame: '王婉',
          Institution: 'Beihang University',
          Profile: 'I am 王婉',
          FollowTime: '2022-01-10 16:04',
        },
        {
          Avatar: 'img/home/avatar1.jpg',
          Userame: '王婉',
          Institution: 'Beihang University',
          Profile: 'I am 王婉',
          FollowTime: '2022-01-10 16:05',
        },
      ]
    }
  },
  methods: {
    changePage(currentPage) {
      this.showList = [];
      for(let i = (currentPage-1)*3, j = 0; i < this.followList.length && j < 3; i++,j++) {
        this.showList[j] = this.followList[i]
      }
    },
    init() {
      this.showList = [];
      for(let i = (this.currentPage-1)*3, j = 0; i < this.followList.length && j < 3; i++,j++) {
        this.showList[j] = this.followList[i]
      }
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
  top: 0px;
  left: 0px;
  width: 1400px;
  height: 200px;
  background: rgb(244,244,244);
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
}

.social-info .social-info-item .title {
  width: 120px;
  height: 40px;
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
  width: 1400px;
  height: 470px;
  background: rgb(244,244,244);
  border-radius: 5px;
}

.content-list .title {
  height: 45px;
  line-height: 50px;
  position: absolute;
  top: 20px;
  left: 20px;
  display: flex;
  align-items: center;
}

.content-list .title-name {
  margin: 0;
  font-size: 25px;
}

.divider {
  position: absolute;
  margin: 0 auto;
  width: 1350px;
  height: 2px;
  left: 25px;
  top: 75px;
  background-color: #d4d4d4;
  text-align: center;
  font-size: 16px;
  color: rgba(101, 101, 101, 1);
}

.follow-list {
  position: absolute;
  top: 90px;
  width: 1400px;
  height: 370px;
}

.follow-list-item {
  position: relative;
  width: 1375px;
  height: 110px;
  margin: 0 0 15px 10px;
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
  height: 3px;
  line-height: 10px;
  align-items: center;
}

.follow-list-item .profile .profile-list .profile-list-item .icon {
  font-size: 20px;
  margin-right: 10px;
}

.follow-list-item .profile .profile-list .profile-list-item .text {
  font-size: 10px;
  position: relative;
  top: 2px;
}

.follow-list-item .social-info {
  position: absolute;
  right: 0px;
  bottom: 0px;
  width: 370px;
  height: 85px;
  display: flex;
  justify-content: flex-end;
}

.follow-list-item .social-info .social-info-item {
  position: relative;
  right: -5px;
  display: inline;
}

.follow-list-item .social-info .social-info-item .icon {
  margin: 0px 10px 0 40px;
  font-size: 45px;
  transition: all .5s ease;
  cursor: pointer;
}

.follow-list-item .social-info .social-info-item .icon:hover {
  font-size: 55px;
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

</style>
