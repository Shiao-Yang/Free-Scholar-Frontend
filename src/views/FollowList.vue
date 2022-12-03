<template>
  <div class="home">
    <div class="intro">
      <div class="avatar">
        <img :src="require('../assets/' + baseInfo.avatar)">
      </div>
      <div class="profile">
        <ul class="profile-list">
          <li class="profile-list-item">
            <span class="icon"><i class='bx bxs-user'></i></span>
            <span class="text" style="font-size: 25px; font-weight: bold">{{baseInfo.username}}</span>
          </li>
          <li class="profile-list-item">
            <span class="icon"><i class='bx bxs-home'></i></span>
            <span class="text">{{baseInfo.institution.name}}</span>
          </li>
          <li class="profile-list-item">
            <span class="icon"><i class='bx bxs-bookmark'></i></span>
            <span class="text">{{baseInfo.bio}}</span>
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
              {{baseInfo.follows}}
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
              {{baseInfo.followers}}
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
              {{baseInfo.likes}}
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
            <img :src="require('../assets/' + item.avatar)" style="max-width: 100%">
          </div>
          <div class="profile">
            <ul class="profile-list">
              <li class="profile-list-item">
                <span class="icon"><i class='bx bxs-user'></i></span>
                <span class="text" style="font-size: 20px; font-weight: bold">{{item.username}}</span>
              </li>
              <li class="profile-list-item">
                <span class="icon"><i class='bx bxs-bookmark'></i></span>
                <span class="text">{{item.bio}}</span>
              </li>
            </ul>
          </div>
          <div class="social-info">
            <div class="social-info-item">
              <span class="icon" style="color: cornflowerblue"><i class='bx bxs-message-rounded-dots' title="私信"></i></span>
            </div>
            <div class="social-info-item">
              <span class="icon" style="color: red" @click="unFocus(this.uid, item.id)"><i class='bx bxs-user-x' title="取消关注"></i></span>
            </div>
          </div>
          <div class="social-info-number">
            <span class="number">关注于 : {{item.time}}</span>
          </div>
        </div>
      </div>
      <div class="pagination">
        <el-pagination
            background
            :page-size="3"
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
      uid: 1,
      avatar: 'img/home/avatar1.jpg',
      username: 'Peter',
      institution: 'Beihang University',
      bio: 'I am Peter',
      isFollow: false,
      isLike: false,
      isScholar: false,
      follows: 32,
      likes: 20,
      followers: 15,
      currentPage: 1,
      pageSize: 3,
      baseInfo: {
        username:"lisi",
        avatar: 'img/home/avatar1.jpg',
        institution:{
          name:"UBAA",
        },
        bio:"2234",
        follows:1,
        followers:1,
        likes:0,
      },
      showList: [
        {
          id: 1,
          avatar: 'img/home/avatar1.jpg',
          username: '王婉',
          institution: 'Beihang University',
          bio: 'I am 王婉',
          time: '2022-01-10 16:07',
        },
        {
          id: 1,
          avatar: 'img/home/avatar1.jpg',
          username: '王婉',
          institution: 'Beihang University',
          bio: 'I am 王婉',
          time: '2022-01-10 16:07',
        },
        {
          id: 1,
          avatar: 'img/home/avatar1.jpg',
          username: '王婉',
          institution: 'Beihang University',
          bio: 'I am 王婉',
          time: '2022-01-10 16:07',
        },
      ],
      followList:[
        {
          id: 1,
          avatar: 'img/home/avatar1.jpg',
          username: '王婉',
          institution: 'Beihang University',
          bio: 'I am 王婉',
          time: '2022-01-10 16:01',
        },
        {
          id: 1,
          avatar: 'img/home/avatar1.jpg',
          username: '王婉',
          institution: 'Beihang University',
          bio: 'I am 王婉',
          time: '2022-01-10 16:02',
        },
        {
          id: 1,
          avatar: 'img/home/avatar1.jpg',
          username: '王婉',
          institution: 'Beihang University',
          bio: 'I am 王婉',
          time: '2022-01-10 16:03',
        },
        {
          id: 1,
          avatar: 'img/home/avatar1.jpg',
          username: '王婉',
          institution: 'Beihang University',
          bio: 'I am 王婉',
          time: '2022-01-10 16:04',
        },
        {
          id: 1,
          avatar: 'img/home/avatar1.jpg',
          username: '王婉',
          institution: 'Beihang University',
          bio: 'I am 王婉',
          time: '2022-01-10 16:05',
        },
      ]
    }
  },
  methods: {
    changePage(currentPage) {
      this.showList = [];
      for (let i = (currentPage - 1) * 3, j = 0; i < this.followList.length && j < 3; i++, j++) {
        this.showList[j] = this.followList[i]
        this.showList[j].avatar = 'img/home/avatar1.jpg'
        this.showList[j].time = new Date(this.followList[i].time).toLocaleString('zh', {hour12: false})
      }
    },
    unFocus(uid, aid) { //uid: 当前用户, aid: 被关注的用户
      let params = {
        user_id: uid,
        aim_id: aid,
      }

      this.axios({
        method: 'post',
        url: 'http://139.9.134.209:8000/api/relation/unFocus',
        data: params,
      })
      .then(res => {
        console.log(res.data);
        this.getFollows(uid); //重新获取数据
      })
      .catch(err => {
        console.log(err);
      })

    },

    getFollows(uid) {
      this.axios({
        method: 'get',
        url: 'http://139.9.134.209:8000/api/relation/getFollows?user_id=' + uid,
      })
      .then(res => {
        console.log(res.data)
        this.followList = [];
        this.followList = res.data;
        this.showList = [];

        console.log(this.followList[0]);
        console.log(typeof this.followList[0].time)

        for (let i = (this.currentPage - 1) * 3, j = 0; i < this.followList.length && j < 3; i++, j++) {
          this.showList[j] = this.followList[i]
          this.showList[j].avatar = 'img/home/avatar1.jpg'
          this.showList[j].time = new Date(this.followList[i].time).toLocaleString('zh', {hour12: false})
        }

      })
      .catch(err => {
        console.log(err);
      })

    },

    getBaseInfo(uid) {
      this.axios({
        method: 'get',
        url: 'http://139.9.134.209:8000/api/relation/getBaseInfo?user_id=' + uid,
      })
      .then(res => {
        console.log(res.data)

        this.baseInfo = res.data
        this.baseInfo.avatar = 'img/home/avatar1.jpg'
        console.log(this.baseInfo)

      })
      .catch(err => {
        console.log(err);
      })

    },
  },

  created() {
    this.getBaseInfo(1);
    this.getFollows(1);
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
  font-size: 60px;
  margin: 10px;
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
