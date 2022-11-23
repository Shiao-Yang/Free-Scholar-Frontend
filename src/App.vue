<template>
  <div id="app">
    <div>
      <SideNavigation @getActive="getSideActive" v-if="needSide"></SideNavigation>
      <div class="app-container" :class="{'active': sideActive}" :style="{width: containerWidth+'px'}">
        <router-view/>
      </div>
    </div>
  </div>
</template>

<style>
.app-container {
  position: absolute;
  top: 0;
  left:100px;
  transition: 0.5s;
  margin-top: 20px;
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

  computed: {
    containerWidth() {
      let val = 120;
      if(this.sideActive === true)
        val = 220;
      return this.screenWidth - val
    }
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
