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
    <div class="info-box">
      <div class="title">
        <div class="image">
          <img src="../assets/img/home/user.png">
        </div>
        <span class="title-name">
          个人中心
        </span>
      </div>
      <div class="divider-x"></div>
      <div class="source-box">
        <div class="source-item" :class="{'active' : isActive1}" @click="changeActive1">
          <span class="image">
            <img src="../assets/img/home/information.png">
          </span>
          <span class="name">
            个人信息
          </span>
        </div>
        <div class="source-item" :class="{'active' : isActive2}" @click="changeActive2">
          <span class="image">
            <img src="../assets/img/home/password.png">
          </span>
          <span class="name">
            修改密码
          </span>
        </div>
        <div class="source-item" :class="{'active' : isActive3}" @click="changeActive3">
          <span class="image">
            <img src="../assets/img/home/avatar.png">
          </span>
            <span class="name">
            个人头像
          </span>
        </div>
      </div>
      <div class="divider-y"></div>
      <div class="content-box">
        <div class="show-box">
          <div class="content-item">
            <div class="item-name">
              用户名
            </div>
            <div class="item-content">
              {{baseInfo.username}}
            </div>
          </div>
          <div class="content-item">
            <div class="item-name">
              邮箱
            </div>
            <div class="item-content">
              {{baseInfo.email}}
            </div>
          </div>
          <div class="content-item">
            <div class="item-name">
              身份
            </div>
            <div class="item-content" v-if="baseInfo.identity === 0">
              普通用户
            </div>
            <div class="item-content" v-if="baseInfo.identity === 1">
              学者
            </div>
            <div class="item-content" v-if="baseInfo.identity === 2">
              管理员
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      uid: 1,
      isActive1: true, //true 则展示系统消息
      isActive2: false, //true 则展示收到的私信
      isActive3: false, //true 则展示发送的私信
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
      baseInfo: {
        username:"lisi",
        avatar: 'img/home/avatar1.jpg',
        email: '123@qq.com',
        identity: 0,
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
      for(let i = (currentPage-1)*3, j = 0; i < this.followList.length && j < 3; i++,j++) {
        this.showList[j] = this.followList[i]
      }
    },
    changeActive1() {
      if(!this.isActive1) {
        this.isActive1 = true;
        this.isActive2 = false;
        this.isActive3 = false;
      }
    },
    changeActive2() {
      if(!this.isActive2) {
        this.isActive2 = true;
        this.isActive1 = false;
        this.isActive3 = false;
      }
    },
    changeActive3() {
      if(!this.isActive3) {
        this.isActive3 = true;
        this.isActive1 = false;
        this.isActive2 = false;
      }
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
  }
}
</script>

<style scoped>
* {
  margin: 0px;
  padding: 0px;
  box-sizing: border-box;
}

.home {
  height: 790px;
  width: 1400px;
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
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.1);
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

.info-box {
  position: relative;
  top: 220px;
  width: 1400px;
  height: 550px;
  background: rgb(244,244,244);
  border-radius: 5px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.1);
}

.info-box:hover {

}

.info-box .title {
  height: 60px;
  line-height: 50px;
  position: absolute;
  top: 20px;
  left: 30px;
  display: flex;
  align-items: center;
}

.info-box .title .image{
  height: 60px;
  width: 60px;
  overflow: hidden;
}

.info-box .title .image img{
  height: 60px;
  width: 60px;
  position: relative;
  left: -70px;
  filter: drop-shadow(70px 0px rgba(48, 105, 243, 0.82));
}

.info-box .title-name {
  margin: 0 0 0 10px;
  font-size: 35px;
  font-weight: 900;
}

.divider-x {
  position: absolute;
  margin: 0 auto;
  width: 1350px;
  height: 2px;
  left: 25px;
  top: 90px;
  background-color: #d4d4d4;
  text-align: center;
  font-size: 16px;
  color: rgba(101, 101, 101, 1);
}

.source-box {
  display: inline-block;
  top: 110px;
  left: 5px;
  position: relative;
  height: 430px;
  width: 300px;
  overflow: hidden;
  z-index: 1;
}

.source-box:hover {
  cursor: pointer;
}

.source-box .source-item {
  background: rgb(244,244,244);
  position: relative;
  height: 60px;
  width: 250px;
  border-radius: 5px;
  margin: 10px 25px 10px 25px;
  vertical-align: middle;
  transition: all 0.6s;
  overflow: hidden;
}

.source-box .source-item.active {
  background-color: #d9d7d7;
  height: 70px;
  width: 275px;
  margin: 5px 15px 5px 15px;
}

.source-box .source-item .image img {
  height: 40px;
  width: 40px;
  margin: 10px 30px 10px 40px;
  transition-property: height, width, margin;
  transition: ease-in 0.6s ease-out 0s;
}

.source-box .source-item.active .image img{
  height: 50px;
  width: 50px;
  margin: 10px 30px 10px 35px;
  position: relative;
  left: -100px;
  filter: drop-shadow(100px 0px rgba(48, 105, 243, 0.82));
}

.source-box .source-item .name {
  font-size:20px;
  font-weight: 900;
  position: absolute;
  top: 15px;
  transition-property: font-size, font-weight, top;
  transition: all 0.6s;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.source-box .source-item.active .name {
  color: #4DA5FF;
  font-size:25px;
  font-weight: 900;
  position: absolute;
  top: 17px;
  text-overflow: ellipsis;
}

.divider-y {
  display: inline-block;
  position: absolute;
  top: 93px;
  margin: 2px 0 0 0;
  left: 320px;
  width: 2px;
  height: 450px;
  background-color: #d4d4d4;
  font-size: 16px;
  color: green;
  z-index: 2;
}

.info-box .content-box {
  display: inline-block;
  border: solid red;
  position: absolute;
  top: 95px;
  left: 340px;
  width: 1050px;
  height: 450px;
}

.info-box .content-box .show-box {
  border: solid red;
  width: 900px;
  height: 400px;
  position: relative;
  top: 25px;
  left: 25px;
}

.info-box .content-box .show-box .content-item {
  display: flex;
  flex-direction: row;
  border: solid red;
  width: 850px;
  height: 50px;
  margin: 10px 0px 10px 5px;
}

.info-box .content-box .show-box .content-item .item-name {
  border: solid red;
  display: flex;
  position: relative;
  left: 0px;
  top: 0px;
  height: 50px;
  width: 120px;
  font-size: 25px;
  font-weight: bold;
  text-align: right;
  line-height: 50px;
  flex-direction: row-reverse;
  align-items: center;
}

.info-box .content-box .show-box .content-item .item-content {
  border: solid red;
  display: flex;
  position: relative;
  left: 50px;
  height: 50px;
  width: 650px;
  font-size: 20px;
  font-weight: normal;
  flex-direction: row;
  line-height: 50px;
  align-items: center;
}







</style>
