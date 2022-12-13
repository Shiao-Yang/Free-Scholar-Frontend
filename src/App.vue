<template>
  <div id="app">
    <div v-if="">
      <SideNavigation @getActive="getSideActive" v-if="needSide"></SideNavigation>
      <div class="app-container" :class="{'active': sideActive, 'login': isLoginPage}" :style="{width: containerWidth+'px'}">
        <router-view/>
      </div>
    </div>
    <div></div>
  </div>
</template>

<style>
.app-container {
  position: absolute;
  top: 0;
  left:115px;
  transition: 0.5s;
  margin-top: 20px;
  font-family: "Poppins", sans-serif;
}

.app-container.login {
  margin-top: 0;
}

.app-container.active {
  left:220px;
}
</style>
<script>
import SideNavigation from "@/components/SideNavigation";
export default {
  components: {
    SideNavigation,
  },
  data() {
    return {
      needSide: true,
      sideActive: false,
      margin: 120,
      screenWidth: null,
    }
  },

  created() {
    // 在页面加载时读取sessionStorage里的状态信息
    if (sessionStorage.getItem('store')) {
      this.$store.replaceState(
          Object.assign(
              {},
              this.$store.state,
              JSON.parse(sessionStorage.getItem('store'))
          )
      )
    }

    // 在页面刷新时将vuex里的信息保存到sessionStorage里
    // beforeunload事件在页面刷新时先触发
    window.addEventListener('beforeunload', () => {
      sessionStorage.setItem('store', JSON.stringify(this.$store.state))
    })
  },

  computed: {
    containerWidth() {
      let val = 115;
      if(this.sideActive === true)
        val = 220;
      return this.screenWidth - val
    },
    isLoginPage() {
      if(this.$route.path === '/login&signup')
        return true;
      else
        return false;
    },
  },
  methods: {
    getSideActive(isActive) {
      this.sideActive = isActive;
    },
  },

  mounted() {
    this.screenWidth = document.body.clientWidth
    window.onresize = () => {
      return (() => {
        this.screenWidth = document.body.clientWidth
      })()
    }
  },
}
</script>
