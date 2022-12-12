<template>
  <div class="adminHome">
    <div class="data-statistics">
      <p id="statistics">数据统计</p>
      <div class="user-box data-box">
        <i class='bx bxs-user'></i>
        <div class="info">
          <p class="title">用户数量</p>
          <p class="num">{{userNum}}</p>
        </div>
      </div>
      <div class="scholar-box data-box">
        <i class='bx bx-award'></i>
        <div class="info">
          <p class="title">认证学者</p>
          <p class="num">{{scholarNum}}</p>
        </div>
      </div>
      <div class="admin-box data-box">
        <i class='bx bxs-coffee-alt' ></i>
        <div class="info">
          <p class="title">管理员</p>
          <p class="num">{{adminNum}}</p>
        </div>
      </div>
    </div>
    <div class="user-admin">
      <i class='bx bxs-user-rectangle'></i>
      <span>用户管理</span>
      <hr style="height:3px;border:none;border-top:1px solid rgba(128, 128, 128, 0.4);margin-top: 10px" />
      <div class="header-search-box">
        <input type="text" autocomplete="off"
               id="input"
               class="search-input"
               v-model="input"
               placeholder="搜索用户"
               @keyup.enter="getUser">
        <span class="search-icon" title="搜索"><i class='bx bx-search' @click="getUser"></i></span>
      </div>
      <div v-for="(item, i) in displayResult" class="result-box">
        <img class="avatar" :src="$store.state.url+item.avatar">
        <table class="result-info">
          <tr class="name"><td class="title">姓名:</td><span>{{item.name}}&nbsp</span><i class="bx bxs-user"></i></tr>
          <tr class="e-mail"><td class="title">e-mail:</td><span>{{item.mail}}</span></tr>
          <tr class="status"><td class="title">状态:</td>
            <span v-if="item.status===0">正常&nbsp&nbsp<i class='bx bxs-circle green'></i></span>
            <span v-else-if="item.status===1">禁言中&nbsp&nbsp<i class="bx bxs-circle red"></i></span>
            <span v-else-if="item.status===2">封禁&nbsp&nbsp<i class="bx bxs-circle black"></i></span>
          </tr>
        </table>
        <div class="op-box">
          <img src="../assets/img/adminUser/eyedropper.png" class="op" title="恢复正常" @click="setNormal(item.id,i)">
          <img src="../assets/img/adminUser/comment-slash.png" class="op" title="禁言" @click="setMute(item.id,i)">
          <img src="../assets/img/adminUser/ban.png" class="op" title="封禁" @click="setBan(item.id,i)">
        </div>
      </div>
    </div>

    <div class="block" style="width: 90%;margin-top: 10px;height: 30px;text-align: center">
      <el-pagination
          layout="prev, pager, next, jumper"
          :page-size="5"
          :pager-count="11"
          :total="users.length"
          @current-change="changePage"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>

export default {
  name: 'AdminUser',
  created() {
    window.myData = this;
    this.getNum()
  },
  mounted() {

  },
  data() {
    return {
      input: '',
      adminNum: 0,
      scholarNum: 0,
      userNum: 0,
      displayResult: [],
      users: []
    }
  },
  methods: {
    changePage(val){
      let i;
      let length = this.users.length
      console.log("val:"+val)
      console.log("length:"+length)
      this.displayResult = [];
      for (i = (val-1) * 5; i < length && i < val * 5; i++) {
        this.displayResult.push(this.users[i]);
      }
    },
    getUser() {
      if (this.input === '') {
        this.$message.warning('请输入搜索值')
        return
      }
      this.axios( {
        method: 'post',
        url: this.$store.state.address+'api/relation/getUser',
        data: {input: this.input},
        headers: {
          jwt: JSON.parse(sessionStorage.getItem('baseInfo')).token,
        },
      })
          .then(res => {
            console.log(res.data)
            let i = 0;
            this.users = []
            this.displayResult = []
            for (; i < res.data.length; i++) {
              this.users.push({id: res.data[i].id,
                name: res.data[i].name,
                mail: res.data[i].mail,
                avatar: res.data[i].avatar,
                status: res.data[i].state})
            }
            i = 0;
            for (; i < 5 && i < res.data.length; i++) {
              this.displayResult.push({id: res.data[i].id,
                name: res.data[i].name,
                mail: res.data[i].mail,
                avatar: res.data[i].avatar,
                status: res.data[i].state})
            }
          })
    },
    getNum() {
      this.axios( {
        method: 'get',
        url: this.$store.state.address+'api/relation/getNum',
        headers: {
          jwt: JSON.parse(sessionStorage.getItem('baseInfo')).token,
        },
      })
          .then(res => {
            console.log(res.data)
            this.adminNum = res.data.adminNum
            this.scholarNum = res.data.scholarNum
            this.userNum = res.data.userNum
          })
    },
    setNormal(id,i) {
      this.axios({
        method: 'post',
        url: this.$store.state.address+'api/relation/setNormal',
        data: {_id: id},
        headers: {
          jwt: JSON.parse(sessionStorage.getItem('baseInfo')).token,
        },
      })
          .then(res => {
            console.log(res.data)
            switch (res.data.errno) {
              case 0:
                    this.displayResult[i].status = 0
                    this.$message.success(res.data.msg)
            }
          })
    },
    setMute(id,i) {
      this.axios({
        method: 'post',
        url: this.$store.state.address+'api/relation/setMute',
        data: {_id: id},
        headers: {
          jwt: JSON.parse(sessionStorage.getItem('baseInfo')).token,
        },
      })
          .then(res => {
            console.log(res.data)
            switch (res.data.errno) {
              case 0:
                this.displayResult[i].status = 1
                this.$message.success(res.data.msg)
            }
          })
    },
    setBan(id,i) {
      this.axios({
        method: 'post',
        url: this.$store.state.address+'api/relation/setBan',
        data: {_id: id},
        headers: {
          jwt: JSON.parse(sessionStorage.getItem('baseInfo')).token,
        },
      })
          .then(res => {
            console.log(res.data)
            switch (res.data.errno) {
              case 0:
                this.displayResult[i].status = 2
                this.$message.success(res.data.msg)
            }
          })
    }
  }
}
</script>

<style scoped>
.data-statistics {
  position: relative;
  margin-top: 0;
  left: 0;
  width: 90%;
  height: 250px;
  border-radius: 2px;
  padding: 1px;
  box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.2);
}
#statistics {
  font-weight: bold;
  font-size: 20px;
  margin: 10px 0 0 40px;
}
.data-box {
  position: relative;
  float: left;
  width: 150px;
  height: 150px;
  border-radius: 10px;
  box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.2);
  padding: 10px;
  margin: 20px 100px 0 20px;
}
.data-box .bx {
  position: relative;
  float: left;
  font-size: 70px;
  margin-top: 40px;
}
.user-box {
  margin-left: 205px;
}
.bxs-user {
  color: #1CBBB4;
}
.bx-award {
  color: #FBBD08;
}
.data-box .bxs-coffee-alt {
  color: #FF9671;
}
.info {
  position: relative;
  float: left;
}
.info>.title {
  font-weight: bold;
  font-size: 18px;
  margin-top: 30px;
}
.info .num {
  position: relative;
  font-weight: bold;
  text-align: center;
  margin-top: 30px;
}
.user-admin {
  position: relative;
  margin-top: 20px;
  left: 0;
  width: 90%;
  min-height: 440px;
  border-radius: 2px;
  padding: 1px;
  box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.2);
}
.user-admin .bxs-user-rectangle {
  color: #FBBD08;
  font-size: 20px;
  margin: 10px 0 0 10px;
}
.user-admin>span{
  font-size: 20px;
  font-weight: bold;
  margin: 0 0 0 10px;
}
.header-search-box {
  display: inline-block;
  position: relative;
  height: 60px;
  /*width: 100%;*/
  margin-left: 70%;
}
.header-search-box .search-input{
  position: relative;
  display: inline-block;
  font-size: 15px;
  width: 260px;
  min-width: 220px;
  height: 10px;
  padding: 10px 20px 10px 10px;
  border-radius: 2px;
  border: 1px solid rgb(240,240,240);
  margin: 0 auto;
  /*border-bottom: 3px solid rgba(33,150,243,0.5);*/
  box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.2);
  outline: none;
}

.header-search-box .search-icon i{
  position: relative;
  text-align: center;
  display: inline-block;
  color: #333333;
  margin-left: 5px;
  /*margin-bottom: 40px;*/
  line-height: 40px;
  height: 40px;
  right: 0px;
  /*width: 50px;*/
  font-size: 15px;
  min-width: 40px;
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
.result-box {
  width: 90%;
  margin: 10px 0 10px 50px;
  padding: 1px;
  height: 150px;
  border-radius: 5px;
  box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.2);
}
.result-box .avatar {
  width: 120px;
  height: 120px;
  border-radius: 5px;
  float: left;
  margin: 15px 10px 0 20px;
}
.result-info {
  float: left;
  margin: 18px 0 0 0;
  border-spacing: 0px;
  border-collapse: collapse;
}
.result-info .title {
  font-weight: bold;
  width: 70px;
  text-align: right;
  padding: 0 30px 10px 0;
}
.result-info .bxs-user,.result-info .bx-award{
  font-size: 18px;
}
.bxs-circle.green{
  color: #00CA97;
}
.bxs-circle.red {
  color: #C34A36;
}
.result-box .op-box {
  position: absolute;
  right: 10%;
  margin-top: 50px;
}
.result-box .op {
  width: 50px;
  height: 50px;
  margin-left: 40px;
  cursor: pointer;
}
</style>