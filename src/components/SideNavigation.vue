<template>
  <div class="side-navigation" :class="{'active': isActive}">
    <div class="side-menu-top" v-on:click="changeIsActive">
    </div>
    <ul class="side-navigation-list">
      <li class="side-navigation-item"  v-on:click="activeLink(1)" :class="{'active': activeIndex === 1}">
        <router-link :to="{path: '/'}" style="--clr:#f44336;" title="主页">
          <span class="icon"><i class='bx bxs-home'></i></span>
          <span class="text">主页</span>
        </router-link>
      </li>
      <li class="side-navigation-item" v-on:click="activeLink(2)" :class="{'active': activeIndex === 2}">
        <router-link :to="{path: '/'}" style="--clr:#ffa117;" title="搜索">
          <span class="icon"><i class='bx bx-search' ></i></span>
          <span class="text">高级检索</span>
        </router-link>
      </li>
      <li class="side-navigation-item" v-on:click="activeLink(3)" :class="{'active': activeIndex === 3}">
        <router-link :to="{path: '/'}" style="--clr:#0fc70f;" title="主页">
          <span class="icon"><i class='bx bxs-home'></i></span>
          <span class="text">主页</span>
        </router-link>
      </li>
      <li class="side-navigation-item" v-on:click="activeLink(4)" :class="{'active': activeIndex === 4}">
        <router-link :to="{path: '/'}" style="--clr:#2196f3;" title="主页">
          <span class="icon"><i class='bx bxs-home'></i></span>
          <span class="text">主页</span>
        </router-link>
      </li>
      <li class="side-navigation-item user-box">
        <router-link to="#" :style="{'--clr':userStateClr}">
          <i class='bx bxs-circle user-info' style=""></i>
          <span class="icon avatar"><img alt="头像" src="../assets/logo.png"></span>
          <span class="text">用户名用户名用户名</span>
        </router-link>
        <ul class="user-sub-menu" @click="toHome">
          <li class="sub-item">
            <i class='bx bx-user'></i>
            <span>个人中心</span>
            <i class='bx bx-chevron-right right'></i>
          </li>
          <li class="sub-item">
            <i class='bx bxs-user-account'></i>
            <span>账号设置</span>
            <i class='bx bx-chevron-right right'></i>
          </li>
          <li class="sub-item" @click="toMessageCenter">
            <i class='bx bx-message-rounded'></i>
            <span>消息中心</span>
            <i class='bx bxs-circle notice' style="font-size:12px;color: #FF5733;"></i>
            <i class='bx bx-chevron-right right'></i>
          </li>
          <li class="sub-item">
            <i class='bx bx-group'></i>
            <span>我的机构</span>
            <i class='bx bx-chevron-right right'></i>
          </li>
          <li class="bottom-bor">
          </li>
          <li class="sub-item log-out">
            <i class='bx bx-log-out-circle'></i>
            <span>退出登录</span>
            <i class='bx bx-chevron-right right'></i>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "SideNavigation",
  data() {
    return {
      isActive: false,
      index: 0,
      userStateClr: '#f44336',
    }
  },
  computed :{
    activeIndex() {
      if(this.$route.path === '' || this.$route.path === '/' || this.$route.path === '/settings')
        return 1;
    },
  },
  methods: {
    toHome() {
      let that = this;
      that.$router.push('/home')
    },
    toMessageCenter() {
      let that = this;
      that.$router.push('/MessageManage')
    },
    activeLink(index){
    },
    changeIsActive() {
      this.isActive = !this.isActive;
      this.$emit('getActive', this.isActive);
    },
  },
}
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  text-align: left;
  z-index: 20;
}

.side-navigation {
  position: fixed;
  height: 100vh;
  top:0;
  left: 0;
  background-color: #f4f4f4;
  width: 75px;
  display: flex;
  transition: .5s;
}


.side-navigation.active {
  width: 170px;
}

:root {
  --bg: #ffffff;
}

.side-navigation .side-menu-top {
  position: absolute;
  top:0;
  left: 0;
  width: 100%;
  height: 60px;
  padding: 0 23px;
  border-bottom: 1px solid #ccc;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  cursor: pointer;
}

.side-navigation .side-menu-top::before {
  content: '';
  position: absolute;
  width: 30px;
  height: 2px;
  background-color: #333;
  transform: translateY(-8px);
  transition: .5s;
}

.side-navigation.active .side-menu-top::before {
  transform: translateX(45px) translateY(0) rotate(45deg);
  background-color: #f44336;
}

.side-navigation .side-menu-top::after {
  content: '';
  position: absolute;
  width: 30px;
  height: 2px;
  background-color: #333;
  transform: translateY(8px);
  box-shadow: 0 -8px 0 #333;
  transition: .5s;
}

.side-navigation.active .side-menu-top::after {
  transform: translateX(45px) translateY(0) rotate(-45deg);
  box-shadow: 0 0 0 #f44336;
  background-color: #f44336;
}

.side-navigation .side-navigation-list {
  display: flex;
  flex-direction: column;
  margin-top: 90px;
  width: 100%;
}

.side-navigation .side-navigation-list .side-navigation-item {
  cursor:pointer;
  list-style: none;
  width: 100%;
  height: 76px;
  border-radius: 12px;
  border: 8px solid transparent;
  transition: .5s;
}

.side-navigation .side-navigation-list .side-navigation-item.active {
  transform: translateX(20px);
  background-color: #ffffff;
}

.side-navigation .side-navigation-list .side-navigation-item::before {
  content: '';
  position: absolute;
  width: 20px;
  height: 20px;
  background-color: transparent;
  top: -28px;
  right: 12px;
  border-bottom-right-radius: 20px;
  box-shadow: 6px 5px 0 5px #ffffff;
  transform: scale(0);
  transform-origin: bottom right;
  transition: .5s;
}

.side-navigation .side-navigation-list .side-navigation-item.active::before{
  right: 12px;
  transform: scale(1);
}

.side-navigation .side-navigation-list .side-navigation-item::after {
  content: '';
  position: absolute;
  width: 20px;
  height: 20px;
  background-color: transparent;
  bottom: -28px;
  right: 12px;
  border-top-right-radius: 20px;
  box-shadow: 6px -5px 0 5px #ffffff;
  transform: scale(0);
  transform-origin: bottom right;
  transition: .5s;
}

.side-navigation .side-navigation-list .side-navigation-item.active::after{
  right: 12px;
  transform: scale(1);
}

.side-navigation .side-navigation-list a{
  position: relative;
  display: flex;
  text-decoration: none;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  text-align: center;
  z-index: 1000;
}

.side-navigation-item .icon {
  position: relative;
  display: block;
  min-width: 60px;
  height: 60px;
  font-size: 1.75em;
  line-height: 48px;
  text-align: center;
  border: 6px solid transparent;
  border-radius: 10px;
  background-color: #f4f4f4;
  transition: 0.5s;
  color: black;
}

.side-navigation-item.active .icon{
  background-color: var(--clr);
  color: #ffffff;
}

.side-navigation-item .icon::before{
  content: '';
  position: absolute;
  top:12px;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: var(--clr);
  filter: blur(8px);
  opacity: 0;
  transition: 0.5s;
}

.side-navigation-item.active .icon::before{
  opacity: 0.4;
}

.side-navigation-item .icon::after {
  content: '';
  position: absolute;
  top: 15px;
  left: -35px;
  width: 10px;
  height: 10px;
  background: var(--clr);
  border: 4px solid #ffffff;
  border-radius: 50%;
}

.side-navigation-item .text {
  position: relative;
  margin-bottom: 8px;
  padding: 0 10px;
  color: #333;
  display: block;
  align-items: center;
  height: 22px;
  opacity: 0;
  visibility: hidden;
  transition: 0.5s;
  overflow: hidden;
}

.side-navigation.active .side-navigation-item .text {
  visibility: visible;
  opacity: 1;
}

.side-navigation.active .side-navigation-item.active .text
{
  color: var(--clr);
}

.side-navigation-item.user-box {
  position: absolute;
  bottom: 20px;
}

.user-box img {
  width: 48px;
  height: 48px;
}

.side-navigation-item.user-box:hover {
  transform: translateX(20px);
  background-color: #ffffff;
}

.side-navigation-item.user-box:hover::before{
  right: 12px;
  transform: scale(1);
}

.side-navigation-item.user-box:hover::after{
  right: 12px;
  transform: scale(1);
}

.user-box .user-sub-menu {
  list-style: none;
  background: #ffffff;
  position: absolute;
  width: 200px;
  right: -200px;
  top: -200px;
  color: #333;
  border-radius: 10px;
  z-index: 99;
  padding: 10px 10px 10px 10px;
  border: #eeeeee 2px solid;
  transition: 0.5s;
  opacity: 0;
  visibility: hidden;
  pointer-events: none;
}

.user-box:hover .user-sub-menu {
  top:-150px;
  right: -210px;
  opacity: 1;
  visibility: visible;
  pointer-events: auto;
}

.user-box .user-info {
  position:absolute;
  top: 0;
  right:0;
  z-index:100;
  font-size:12px;
  color: #FF5733;
  visibility: visible;
  opacity: 1;
  transition: all 0.5s ease;
}

.user-box:hover .user-info{
  opacity: 0;
  visibility: hidden;
}

.user-box .user-sub-menu li{
  display: flex;
  height: 30px;
  line-height: 30px;
  padding: 0 8px;
  cursor: pointer;
  margin-top: 5px;
}

.user-box .user-sub-menu li:hover{
  border-radius: 10px;
  background-color: #e4e4e4;
}

.user-box .user-sub-menu .right{
  margin-left: auto;
}


.user-box .user-sub-menu li i{
  font-size: 20px;
  height: 30px;
  min-width: 30px;
  line-height: 30px;
  text-align: center;
}

.user-box .user-sub-menu .bottom-bor{
  height: 0;
  margin-top: 5px;
  margin-bottom: 5px;
  padding: 0;
  border-bottom: #dddddd 1px solid;
  pointer-events: none;
}

.user-box .user-sub-menu .log-out:hover{
  border-radius: 10px;
  background-color: #ed5a65;
  color: #fff;
}
</style>
