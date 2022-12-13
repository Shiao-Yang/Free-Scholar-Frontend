<template>
  <div class="side-navigation" :class="{'active': isActive}">
    <div class="side-menu-top" v-on:click="changeIsActive">
    </div>
    <ul class="side-navigation-list" v-if="!isAdmin">
      <li class="side-navigation-item"  v-on:click="activeLink(1)" :class="{'active': activeIndex === 1}">
        <router-link :to="{path: '/'}" style="--clr:#f44336;" title="主页">
          <span class="icon"><i class='bx bxs-home'></i></span>
          <span class="text">主页</span>
        </router-link>
      </li>
      <li class="side-navigation-item" v-on:click="activeLink(2)" :class="{'active': activeIndex === 2}">
        <router-link :to="{path: '/searchList'}" style="--clr:#0fc70f;" title="搜索">
          <span class="icon"><i class='bx bx-search' ></i></span>
          <span class="text">检索页</span>
        </router-link>
      </li>
      <li class="side-navigation-item" v-on:click="activeLink(8)" :class="{'active': activeIndex === 8}" v-if="isLogin">
        <router-link :to="{path: '/collectionCover'}" style="--clr:#ffa117;" title="收藏夹">
          <span class="icon"><i class='bx bxs-star' ></i></span>
          <span class="text">收藏夹</span>
        </router-link>
      </li>
      <li class="side-navigation-item" v-on:click="activeLink(9)" :class="{'active': activeIndex === 9}" v-if="isLogin">
        <router-link :to="{path: '/history'}" style="--clr:#2196f3;" title="历史记录">
          <span class="icon"><i class='bx bx-history'></i></span>
          <span class="text">历史记录</span>
        </router-link>
      </li>
      <li class="side-navigation-item user-box" v-if="isLogin">
        <router-link to="#" :style="{'--clr':userStateClr}">
          <i class='bx bxs-circle user-info' style="" v-if="this.$store.state.msg_plm_has_new > 0 || this.$store.state.msg_rec_has_new > 0"></i>
          <span class="icon avatar">
            <img alt="头像" :src="this.$store.state.url+baseInfo.avatar"
                 v-if="baseInfo !== null && baseInfo !== undefined && baseInfo.avatar !== null && baseInfo.avatar !== undefined">
            <i title="头像错误" class='bx bxs-user' v-else></i>
          </span>
          <span class="text">
            <span v-if="baseInfo.username !== null && baseInfo.username !== undefined">{{ baseInfo.username }}</span>
            <span v-else-if="baseInfo.name !== null && baseInfo.name !== undefined">{{ baseInfo.name }}</span>
          </span>
        </router-link>
        <ul class="user-sub-menu">
          <li class="sub-item" @click="toHome">
            <i class='bx bx-user'></i>
            <span>个人中心</span>
            <i class='bx bx-chevron-right right'></i>
          </li>
          <li class="sub-item" @click="toMessageCenter">
            <i class='bx bx-message-rounded'></i>
            <span>消息中心</span>
            <i class='bx bxs-circle notice' style="font-size:12px;color: #FF5733;" v-if="this.$store.state.msg_plm_has_new > 0 || this.$store.state.msg_rec_has_new > 0"></i>
            <i class='bx bx-chevron-right right'></i>
          </li>
          <li class="bottom-bor">
          </li>
          <li class="sub-item log-out" @click="logout">
            <i class='bx bx-log-out-circle'></i>
            <span>退出登录</span>
            <i class='bx bx-chevron-right right'></i>
          </li>
        </ul>
      </li>
      <li class="side-navigation-item user-box" v-else>
        <router-link to="#" :style="{'--clr':userStateClr}">
          <span class="icon avatar"><i class='bx bxs-user'></i></span>
          <span class="text">游客</span>
        </router-link>
        <ul class="user-sub-menu sub-menu-admin">
          <li class="sub-item log-in" @click="login">
            <i class='bx bx-log-in-circle'></i>
            <span>登录/注册</span>
            <i class='bx bx-chevron-right right'></i>
          </li>
        </ul>
      </li>
    </ul>
    <ul class="side-navigation-list" v-else>
      <li class="side-navigation-item"  v-on:click="activeLink(1)" :class="{'active': activeIndex === 1}">
        <router-link :to="{path: '/'}" style="--clr:#f44336;" title="主页">
          <span class="icon"><i class='bx bxs-home'></i></span>
          <span class="text">主页</span>
        </router-link>
      </li>
      <li class="side-navigation-item" v-on:click="activeLink(2)" :class="{'active': activeIndex === 2}">
        <router-link :to="{path: '/searchList'}" style="--clr:#0fc70f;" title="搜索">
          <span class="icon"><i class='bx bx-search' ></i></span>
          <span class="text">检索页</span>
        </router-link>
      </li>
      <li class="side-navigation-item" v-on:click="activeLink(3)" :class="{'active': activeIndex === 3}">
        <router-link :to="{path: '/adminHome'}" style="--clr:#845EC2;" title="管理员主页">
          <span class="icon"><i class='bx bxs-tachometer' ></i></span>
          <span class="text">管理员页</span>
        </router-link>
      </li>
      <li class="side-navigation-item" v-on:click="activeLink(4)" :class="{'active': activeIndex === 4}">
        <router-link :to="{path: '/adminUser'}" style="--clr:#D65DB1;" title="用户管理">
          <span class="icon"><i class='bx bxs-user-circle' ></i></span>
          <span class="text">用户管理</span>
        </router-link>
      </li>
      <li class="side-navigation-item" v-on:click="activeLink(5)" :class="{'active': activeIndex === 5}">
        <router-link :to="{path: '/LiteratureManage'}" style="--clr:#FF6F91;" title="文献管理">
          <span class="icon"><i class='bx bxs-book' ></i></span>
          <span class="text">文献管理</span>
        </router-link>
      </li>
      <li class="side-navigation-item" v-on:click="activeLink(7)" :class="{'active': activeIndex === 7}">
        <router-link :to="{path: '/TransactionCenter'}" style="--clr:#FF9671;" title="事务中心">
          <span class="icon"><i class='bx bx-task' ></i></span>
          <span class="text">事务中心</span>
        </router-link>
      </li>
      <li class="side-navigation-item user-box" v-if="isLogin">
        <router-link to="#" style="--clr: #0fc70f">
          <span class="icon avatar">
            <img alt="头像" :src="this.$store.state.url+baseInfo.avatar"
                 v-if="baseInfo !== null && baseInfo !== undefined && baseInfo.avatar !== null && baseInfo.avatar !== undefined">
            <i title="头像错误" class='bx bx-log-in-circle' v-else></i>
          </span>
          <span class="text">
            <span v-if="baseInfo.username !== null && baseInfo.username !== undefined">{{ baseInfo.username }}</span>
            <span v-else-if="baseInfo.name !== null && baseInfo.name !== undefined">{{ baseInfo.name }}</span>
          </span>
        </router-link>
        <ul class="user-sub-menu sub-menu-admin">
          <li class="sub-item log-out" @click="logout">
            <i class='bx bxs-user'></i>
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
      // userStateClr: '#f44336',
      msg_plm_has_new: 0, //新的系统消息的数量
      msg_rec_has_new: 0, //新的私信的数量
    }
  },
  computed :{
    activeIndex() {
      if(this.$route.path === ''
          || this.$route.path === '/'
          || this.$route.path.startsWith('/settings')
      )
        return 1;

      else if(this.$route.path.startsWith('/search') || this.$route.path.startsWith('/Search'))
        return 2;

      else if(this.$route.path.startsWith('/adminHome'))
        return 3;

      else if(this.$route.path.startsWith('/adminUser'))
        return 4;

      else if(this.$route.path.startsWith('/LiteratureManage'))
        return 5;

      else if(this.$route.path.startsWith('/Institutional'))
        return 6;

      else if(this.$route.path.startsWith('/TransactionCenter'))
        return 7;

      else if(this.$route.path.startsWith('/collection'))
        return 8;

      else if(this.$route.path.startsWith('/history'))
        return 9;
    },

    isLogin() {
      return this.$store.state.baseInfo.length !== 0;
    },
    isAdmin() {
      // return (this.$route.path.startsWith('/admin')
      //     || this.$route.path.indexOf('Manage') !== -1
      //     || this.$route.path.indexOf('manage') !== -1
      //     || this.$route.path.startsWith('/Institutional')
      //     || this.$route.path.startsWith('/TransactionCenter'))
      //     && !this.$route.path.startsWith('/MessageManage');
      return this.$store.state.baseInfo.isAdmin !== null && this.$store.state.baseInfo.isAdmin;
    },
    baseInfo() {
      return this.$store.state.baseInfo;
    },
    userStateClr() {
      if(this.$store.state.msg_plm_has_new > 0 || this.$store.state.msg_rec_has_new > 0)
        return '#f44336';
      else
        return '#0fc70f';
    },
  },
  watch: {
    baseInfo : {
      handler(newVal, oldVal) {
        if(newVal !== null
            && newVal !== undefined
            && newVal.uid !== null
            && newVal.uid !== undefined) {
          this.getMsgRec(newVal.uid, 0);
        }

      },
      deep: true,
    }
  },
  methods: {
    login() {
      this.$router.push({
        path: '/login&signup'
      })
    },
    logout() {
      let baseInfo = JSON.parse(sessionStorage.getItem('baseInfo'))
      let token = baseInfo.token;
      console.log(baseInfo)
      console.log(token)
      this.axios({
        headers: {
          jwt: baseInfo.token,
        },
        method: "post",
        url: 'http://139.9.134.209:8000/api/user/logout/',
      })
      .then(res => {
        if(res.data.errno === 0) {
          this.$message({
            message: '登出成功',
            showClose: true,
            type: 'success',
          })

          let tmp = sessionStorage.getItem('baseInfo')
          console.log(tmp)
          sessionStorage.removeItem('baseInfo')


          this.$router.push('/')
          this.$store.state.baseInfo = []
          window.location.reload()
        }
        else {
          this.$message({
            message: res.data.msg,
            showClose: true,
            type: 'error',
          })
        }
      })
      .catch(err => {
        console.log(err)
      })
    },
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

    getMsgRec(uid, type) { //type=0,初始化时的调用
      let that = this;
      this.axios({
        headers: {
          jwt: JSON.parse(sessionStorage.getItem('baseInfo')).token,
        },
        method: 'get',
        url: 'http://139.9.134.209:8000/api/MessageCenter/getMsgRec',
      })
          .then(res => {
            console.log(res.data)
            this.msg_rec_list = res.data;
            for(let i = 0; i < this.msg_rec_list.length; i++) {
              // this.msg_rec_list[i].avatar = 'user.png';
              this.msg_rec_list[i].create_time = new Date(this.msg_rec_list[i].create_time).toLocaleString('zh', {hour12: false})
            }
            that.$store.state.msg_rec_has_new = this.cal_msg_rec(this.msg_rec_list);

            this.dis_msg_list = this.msg_rec_list;

            console.log(this.dis_msg_list)
            // if(this.showContent) {
            //   this.changeShowContent();
            // }
            console.log(this.showContent)
            if(type === 0) {
              this.dis_msg_list = this.msg_plm_list;
            }
          })
          .catch(err => {
            console.log(err);
          })
    },

    getMsgPlm(uid) {
      let that = this;

      this.axios({
        headers: {
          jwt: JSON.parse(sessionStorage.getItem('baseInfo')).token,
        },
        method: 'get',
        url: 'http://139.9.134.209:8000/api/MessageCenter/getPlatMsg',
      })
          .then(res => {
            console.log(res.data)

            this.msg_plm_list = res.data;
            for(let i = 0; i < this.msg_plm_list.length; i++) {
              // this.msg_plm_list[i].avatar = 'user.png';
              this.msg_plm_list[i].create_time = new Date(this.msg_plm_list[i].create_time).toLocaleString('zh', {hour12: false})
            }
            this.dis_msg_list = this.msg_plm_list;
            that.$store.state.msg_plm_has_new = this.cal_msg_plm(this.msg_plm_list);
            // if(this.showContent) {
            //   this.changeShowContent();
            // }
          })
          .catch(err => {
            console.log(err);
          })
    },

    cal_msg_rec(msg_list) { //计算收到的私信是否有未读消息
      let has_new = 0;
      for(let i = 0; i < msg_list.length; i++) {
        if(!msg_list[i].is_read) { //有未读消息就+1
          has_new++;
        }
      }
      console.log(has_new);
      return has_new;
    },
    cal_msg_plm(msg_list) { //计算系统消息是否有未读消息
      let has_new = 0;
      console.log("in cal_msg_plm")
      for(let i = 0; i < msg_list.length; i++) {
        console.log(msg_list[i].is_read)
        if(!msg_list[i].is_read) { //有未读消息就+1
          has_new++;
        }
      }
      console.log(has_new)
      return has_new;
    },
  },

  created() {
    this.getMsgRec(this.uid);
  },
  mounted() {
    this.getMsgPlm(this.uid);
    console.log(this.msg_plm_has_new)
    console.log(this.msg_rec_has_new)
    // this.dis_msg_list = this.msg_plm_list; //初始展示msg_plm_list
    console.log(this.dis_msg_list)

    console.log(this.$store.state.msg_rec_has_new)
    console.log(this.$store.state.msg_plm_has_new)
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
  top: -100px;
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

.user-box .user-sub-menu.sub-menu-admin {
  top: -20px;
}



.user-box:hover .user-sub-menu {
  top: -75px;
  right: -210px;
  opacity: 1;
  visibility: visible;
  pointer-events: auto;
}

.user-box:hover .user-sub-menu.sub-menu-admin {
  top: 0;
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

.user-box .user-sub-menu .log-in:hover {
  border-radius: 10px;
  background-color: #00E6B8;
  color: #fff;
}
</style>
