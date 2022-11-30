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
    <div class="relation-net">
      <div class="title">
        <i class='bx bx-shape-circle' style="color: forestgreen;font-size: 50px; margin-right: 10px"></i>
        <span class="title-name">
          朋友圈
        </span>
      </div>
      <div class="divider"></div>
    </div>
    <div class="scholar">
      <div class="title">
        <i class='bx bx-book-reader' style="color: deepskyblue;font-size: 50px; margin-right: 10px"></i>
        <span class="title-name">
          学术成果分析
        </span>
      </div>
      <div class="divider"></div>
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

.home {
  height: 1330px;
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

.relation-net {
  position: absolute;
  top: 220px;
  left: 0px;
  width: 1400px;
  height: 470px;
  background: rgb(244,244,244);
  border-radius: 5px;
}

.relation-net .title {
  height: 45px;
  line-height: 50px;
  position: absolute;
  top: 20px;
  left: 20px;
  display: flex;
  align-items: center;
}

.relation-net .title-name {
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

.scholar {
  position: absolute;
  top: 712px;
  left: 0px;
  width: 1400px;
  height: 600px;
  background: rgb(244,244,244);
  border-radius: 5px;
  margin-bottom: 50px;
}

.scholar .title {
  height: 45px;
  line-height: 50px;
  position: absolute;
  top: 20px;
  left: 20px;
  display: flex;
  align-items: center;
}

.scholar .title-name {
  margin: 0;
  font-size: 25px;
}

</style>
