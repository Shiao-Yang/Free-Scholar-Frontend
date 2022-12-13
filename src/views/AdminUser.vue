<template>
  <div class="adminHome">
    <div class="data-statistics">
      <p id="statistics">数据统计</p>
      <div class="dashboard-container">
        <div class="dashboard-header">
          <div class="dashboard-header-btn" :class="{'active': chartType === 1}" @click="changeChartType(1)">
            <span class="header-icon "><i class='bx bxs-user-detail'></i></span>
            <span class="header-text">用户统计</span>
          </div>
          <div class="dashboard-header-btn" :class="{'active': chartType === 2}" @click="changeChartType(2)">
            <span class="header-icon"><i class='bx bxs-hot'></i></span>
            <span class="header-text">热词统计</span>
          </div>
          <div class="dashboard-header-btn" :class="{'active': chartType === 3}" @click="changeChartType(3)">
            <span class="header-icon"><i class='bx bxs-dashboard' ></i></span>
            <span class="header-text">任务统计</span>
          </div>
        </div>
        <div class="main-chart-box">
          <div ref="userChart" class="chart-item" v-show="chartType === 1"></div>
          <div ref="hotChart" class="chart-item" v-show="chartType === 2"></div>
          <div ref="taskChart" class="chart-item" v-show="chartType === 3"></div>
        </div>
      </div>
<!--      <div class="user-box data-box">-->
<!--        <i class='bx bxs-user'></i>-->
<!--        <div class="info">-->
<!--          <p class="title">用户数量</p>-->
<!--          <p class="num">{{userNum}}</p>-->
<!--        </div>-->
<!--      </div>-->
<!--      <div class="scholar-box data-box">-->
<!--        <i class='bx bx-award'></i>-->
<!--        <div class="info">-->
<!--          <p class="title">认证学者</p>-->
<!--          <p class="num">{{scholarNum}}</p>-->
<!--        </div>-->
<!--      </div>-->
<!--      <div class="admin-box data-box">-->
<!--        <i class='bx bxs-coffee-alt' ></i>-->
<!--        <div class="info">-->
<!--          <p class="title">管理员</p>-->
<!--          <p class="num">{{adminNum}}</p>-->
<!--        </div>-->
<!--      </div>-->
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

const echarts = require('echarts')

export default {
  name: 'AdminUser',
  created() {
    window.myData = this;
    this.getNum()
  },
  mounted() {
    this.initCharts();
    this.changeChartType(1)
  },
  data() {
    return {
      input: '',
      adminNum: 0,
      scholarNum: 0,
      userNum: 0,
      displayResult: [],
      users: [],
      chartType: 0,
      userChart: null,
      userChartOption: {

        title: {
          text: '用户统计图',
          left: 'center'
        },
        legend: {
          orient: 'vertical',
          x: 'left',
          data: ['认证学者', '普通用户', '管理员']
        },
        tooltip: {
          trigger: 'item',
        },
        series: [
          {
            type: 'pie',
            radius: ['50%', '70%'],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: 'center'
            },
            labelLine: {
              show: false
            },
            emphasis: {
              label: {
                show: true,
                fontSize: '30',
                fontWeight: 'bold'
              }
            },
            data: [
              { value: 10, name: '认证学者' },
              { value: 23, name: '普通用户' },
              { value: 1, name: '管理员' },
            ]
          }
        ]
      },
      hotChart: null,
      hotChartOption: {
        title: {
          text: '热词搜索频率统计图',
          left: 'center',
        },
        xAxis: {
          data: ['AI', '生物', '数学', '物理', '三体问题', '天体物理', '云计算']
        },
        tooltip: {
          trigger: 'item',
        },
        yAxis: {},
        series: [
          {
            type: 'bar',
            data: [78, 63, 55, 44, 32, 28, 25]
          }
        ]
      },
      taskChart: null,
      taskChartOption: {
        title: {
          text: '七天处理工作统计图',
          left: 'center',
        },
        xAxis: {
          data: ['2022/12/7', '2022/12/8', '2022/12/9',
            '2022/12/10', '2022/12/11', '2022/12/12',
            '2022/12/13',
          ],
        },
        yAxis: {},
        tooltip: {
          trigger: 'item',
        },
        series: [
          {
            data: [10, 5, 3, 8, 3, 16, 25],
            type: 'line',
            label: {
              show: true,
              position: 'bottom',
              textStyle: {
                fontSize: 20
              }
            }
          }
        ]
      }
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
            let i = 0,len = res.data.length;
            this.users = []
            this.displayResult = []
            if (len === 0) {
              this.$message('结果为空')
            }
            for (; i < len; i++) {
              this.users.push({id: res.data[i].id,
                name: res.data[i].name,
                mail: res.data[i].mail,
                avatar: res.data[i].avatar,
                status: res.data[i].state})
            }
            i = 0;
            for (; i < 5 && i < len; i++) {
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
    },
    getUserChartNum(userOption) {
      this.axios( {
        method: 'get',
        url: this.$store.state.address+'api/relation/getNum',
        headers: {
          jwt: JSON.parse(sessionStorage.getItem('baseInfo')).token,
        },
      })
          .then(res => {
            console.log(res.data)
            userOption.series[0].data = [
              { value: res.data.scholarNum, name: '认证学者' },
              { value: res.data.userNum, name: '普通用户' },
              { value: res.data.adminNum, name: '管理员' },
            ]
            this.userChart.setOption(userOption)
            this.adminNum = res.data.adminNum
            this.scholarNum = res.data.scholarNum
            this.userNum = res.data.userNum
          })
    },
    changeChartType(index) {
      let self = this
      if(index === this.chartType)
        return ;
      this.chartType = index;
      switch (index) {
        case 1:
          setTimeout(function (){
            self.userChart.resize();
          }, 10)
        case 2:
          setTimeout(function (){
            self.hotChart.resize();
          }, 10)
        case 3:
          setTimeout(function (){
            self.taskChart.resize();
          }, 10)
      }
    },
    initCharts() {
      this.userChart = echarts.init(this.$refs.userChart);
      this.hotChart = echarts.init(this.$refs.hotChart);
      this.taskChart = echarts.init(this.$refs.taskChart)
      window.addEventListener("resize", ()=> {
        this.userChart.resize()
        this.hotChart.resize()
        this.taskChart.resize()
      });
      this.setOptions();
    },
    setOptions() {
      let userOption = this.userChartOption;
      let hotOption = this.hotChartOption;
      let taskOption = this.taskChartOption
      this.getUserChartNum(userOption);
      hotOption.xAxis.data = ['人工智能', '生物', '数学', '物理', '三体问题', '天体物理', '云计算']
      hotOption.series[0].data = [99, 63, 55, 44, 32, 28, 25];
      this.hotChart.setOption(hotOption)
      this.hotChartOption = hotOption
      this.taskChart.setOption(taskOption)
      this.taskChartOption = taskOption
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
  border-radius: 2px;
  padding: 1px;
  box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.2);
}
#statistics {
  width: 100%;
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

.dashboard-container {
  width: 100%;
  margin-top: 20px;
}

.dashboard-container .dashboard-header {
  display: flex;
  width: 100%;
  margin-left: 20px;
  height: 50px;
  line-height: 50px;
  text-align: center;
}

.dashboard-header-btn {
  margin-right: 30px;
  font-size: 20px;
  padding: 5px;
  cursor: pointer;
  transition: 0.2s all ease;
}

.dashboard-header-btn:hover {
  font-weight: 500;
  color: #0f62fe;
  border-bottom: 2px solid #2196f3;
}

.dashboard-header-btn.active {
  font-weight: bold;
  border-bottom: 4px solid #2196f3;
  color: #0f62fe;
}

.dashboard-header-btn .header-icon {
  display: inline-block;
  line-height: 30px;
  min-width: 30px;
}

.dashboard-header-btn .header-text {
  line-height: 30px;
  height: 30px;
}

.main-chart-box {
  width: 95%;
  margin: 30px auto auto;
}

.chart-item {
  width: 95%;
  height: 500px;
  transition: 1s all ease;
}
</style>
