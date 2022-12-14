<template>
  <div class="adminHome">
    <div class="body">
      <div class="header-box">
        <img class="avatar" :src="$store.state.url+$store.state.baseInfo.avatar">
        <div class="welcome">
          <p class="welcome-en">Hi! Admin!</p>
          <p class="welcome-zh">欢迎回来！</p>
        </div>
      </div>
<!--      <hr style="height:3px;border:none;border-top:1px solid rgba(128, 128, 128, 0.4);margin-top: 30px" />-->
      <div class="manage-box">
        <div class="todo">待处理<i class='bx bxs-circle' v-if="userItem!==0||scholarItem!==0"></i></div>
        <div class="user-manage manage">
          <i class='bx bxs-user'></i>
          <div class="info">
            <p class="title">用户事项</p>
            <p class="data data-todo" v-if="userItem!==0">{{userItem}}</p>
            <p class="data data-down" v-else>All Down</p>
          </div>
        </div>
        <div class="scholar-manage manage">
          <i class='bx bxs-objects-horizontal-left'></i>
          <div class="info">
            <p class="title">学术事项</p>
            <p class="data data-todo" v-if="scholarItem!==0">{{scholarItem}}</p>
            <p class="data data-down" v-else>All Down</p>
          </div>
        </div>
        <div class="total-manage">
          <p class="title">总计处理</p>
          <table>
            <tr>
              <td><i class='bx bxs-user-plus' title="用户事项"></i></td>
              <td><span>{{userItemAll}}</span>times</td>
            </tr>
            <tr>
              <td><i class='bx bx-list-check' title="举报"></i></td>
              <td><span>{{reportAll}}</span>times</td>
            </tr>
            <tr>
              <td><i class='bx bxs-objects-horizontal-left' title="申诉"></i></td>
              <td><span>{{complainAll}}</span>times</td>
            </tr>
          </table>
        </div>
      </div>
      <div class="chart">
        <div class="header"><p class="statistics">仪表盘</p></div>
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
<!--        <img src="../assets/img/adminHome/data.jpg">-->
      </div>

    </div>
    <div class="record">
      <!--
      <div class="header-search-box">
        <input type="text" autocomplete="off"
               id="input"
               class="search-input"
               v-model="input"
               placeholder="查询记录"
               @keyup.enter="">
        <span class="search-icon" title="搜索"><i class='bx bx-search' @click=""></i></span>
      </div>
      -->
      <p class="remind">最近记录</p>
      <!--
      <p style="text-align: center">暂无提醒</p>
      -->
      <table>
        <tr v-for="(item, i) in records" class="history">
          <td><img :src="$store.state.url+item.avatar" class="avatar"> </td>
          <td class="name-box"><span>{{item.name}}</span></td>
          <td class="action-box">
            <span v-if="item.type==='report'&&item.who==='user'">提交了一条</span>
            <span v-else-if="item.type==='complain'&&item.who==='user'">发起了一次</span>
            <span v-else-if="item.who==='admin'">处理了一次</span>
          </td>
          <td class="type-box">
            <span v-if="item.type==='report'">举报</span>
            <span v-else-if="item.type==='complain'">申诉</span>
          </td>
          <p>{{item.time}}</p>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
const echarts = require('echarts')
import { subDays, format } from 'date-fns'
export default {
  name: 'AdminHome',
  created() {
    window.myData = this;
    this.getUserItem()
    this.getScholarItem()
    this.getUserItemAll()
    this.getReportAll()
    this.getComplainAll()
    this.getRecentRecord()
  },
  mounted() {
    window.addEventListener('resize',function(){
      this.screenWidth = document.documentElement.clientWidth;
    })
    this.initCharts();
    this.changeChartType(1)
  },
  data() {
    return {
      input: '',
      userItem: 0,
      scholarItem: 0,
      userItemAll: 0,
      reportAll: 0,
      complainAll: 0,
      records: [

      ],
      screenWidth: document.documentElement.clientWidth,
      adminNum: 0,
      userNum: 0,
      scholarNum: 0,
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
              position: 'top',
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
    getUserItem() {
      this.axios({
        method: 'get',
        url: this.$store.state.address+'api/relation/getUserItem',
        headers: {
          jwt: JSON.parse(sessionStorage.getItem('baseInfo')).token,
        },
      })
          .then(res=>{
            console.log('getUserItem:')
            console.log(res.data)
            this.userItem = res.data.num
          })
    },
    getScholarItem() {
      this.axios({
        method: 'get',
        url: this.$store.state.address+'api/relation/getScholarItem',
        headers: {
          jwt: JSON.parse(sessionStorage.getItem('baseInfo')).token,
        },
      })
          .then(res=>{
            console.log('getScholarItem:')
            console.log(res.data)
            this.scholarItem = res.data.num
          })
    },
    getUserItemAll() {
      this.axios({
        method: 'get',
        url: this.$store.state.address+'api/relation/getUserItemAll',
        headers: {
          jwt: JSON.parse(sessionStorage.getItem('baseInfo')).token,
        },
      })
          .then(res=>{
            console.log('getUserItemAll:')
            console.log(res.data)
            this.userItemAll = res.data.num
          })
    },
    getReportAll() {
      this.axios({
        method: 'get',
        url: this.$store.state.address+'api/relation/getReportAll',
        headers: {
          jwt: JSON.parse(sessionStorage.getItem('baseInfo')).token,
        },
      })
          .then(res=>{
            console.log('getReportAll:')
            console.log(res.data)
            this.reportAll = res.data.num
          })
    },
    getComplainAll() {
      console.log('token:')
      console.log(JSON.parse(sessionStorage.getItem('baseInfo')).token)
      this.axios({
        method: 'get',
        url: this.$store.state.address+'api/relation/getComplainAll',
        headers: {
          jwt: JSON.parse(sessionStorage.getItem('baseInfo')).token,
        },
      })
          .then(res=>{
            console.log('getComplainAll:')
            console.log(res.data)
            this.complainAll = res.data.num
          })
    },
    getRecentRecord() {
      this.axios({
        method: 'get',
        url: this.$store.state.address+'api/relation/getRecentRecord',
        headers: {
          jwt: JSON.parse(sessionStorage.getItem('baseInfo')).token,
        },
      })
          .then(res=>{
            console.log('getRecentRecord:')
            console.log(res.data)
            let i = 0, len = res.data.result.length;
            for (i = 0; i < len; i++) {
              let tmp = {
                avatar: '',
                name: '',
                type: '',
                who: '',
                time: '',
              }
              tmp.avatar = res.data.result[i].avatar
              tmp.name = res.data.result[i].name
              let strList = res.data.result[i].time.split('T')
              tmp.time = strList[0]+' '+strList[1]
              if (res.data.result[i].type === 0) {
                tmp.type = 'report'
                tmp.who = 'user'
              } else if (res.data.result[i].type === 1) {
                tmp.type = 'complain'
                tmp.who = 'user'
              } else if (res.data.result[i].type === 2) {
                tmp.type = 'complain'
                tmp.who = 'admin'
              } else if (res.data.result[i].type === 3) {
                tmp.type = 'report'
                tmp.who = 'admin'
              }
              this.records.push(tmp)
            }
          })
    },
    getNum(userOption) {
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
    getSolvedTaskNum() {
      this.axios( {
        method: 'get',
        url: this.$store.state.address+'api/relation/getSolvedTaskNum',
        headers: {
          jwt: JSON.parse(sessionStorage.getItem('baseInfo')).token,
        },
      })
          .then(res => {
            let days = []
            let i = 6
            for(i=6; i>0; i--) {
              let day = subDays(new Date(), i)
              days.push(format(day, 'yyyy/MM/dd'))
            }
            days.push(format(new Date(), 'yyyy/MM/dd'))
            this.taskChartOption.xAxis.data = days
            let taskNum = []
            for(i=6; i>=0; i--) {
              taskNum.push(res.data[i])
            }
            this.taskChartOption.series[0].data = taskNum
            this.taskChart.setOption(this.taskChartOption)
          })
    },
    getHotWordDetails() {
      this.axios( {
        method: 'post',
        url: this.$store.state.address+'api/publication/HotWord/',
      })
          .then(res => {
            console.log('HotWord')
            console.log(res.data)
            let hotWordsName = []
            let hotWordsValue = []
            for(let i=0; i<res.data.word.length; i++) {
              hotWordsName.push(res.data.word[i].word_name)
              hotWordsValue.push(res.data.word[i].value)
            }
            console.log('HotWordsName')
            console.log(hotWordsName)
            this.hotChartOption.xAxis.data = hotWordsName
            console.log('HotWordsValue')
            this.hotChartOption.series[0].data = hotWordsValue
            this.hotChart.setOption(this.hotChartOption)
            console.log(hotWordsValue)
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
      this.getNum()
      window.addEventListener("resize", ()=> {
        this.userChart.resize()
        this.hotChart.resize()
        this.taskChart.resize()
      });
      this.setOptions();
    },
    setOptions() {
      let userOption = this.userChartOption;
      this.getNum(userOption);
      this.getSolvedTaskNum();
      this.getHotWordDetails()
    }
  },
  watch: {
  }
}
</script>

<style scoped>
.body {
  position: relative;
  /*display: inline-block;*/
  float: left;
  /*left: 300px;*/
  width: 70%;
  height: 100%;
  margin: 0;
  border-right: 1px solid rgba(128, 128, 128, 0.4);
}
.record {
  position: relative;
  float: left;
  /*left: 320px;*/
  width: 28%;
  /*width: 100px;*/
  /*width: 100%;*/
  height: 100%;
  margin-left: 20px;
}
.header-box {
  margin-top: 0;
  position: relative;
  height: 100px;
  width: 100%;
}
.history {
  padding: 5px 60px 5px 10px;
  border-radius: 30px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.1), 0 6px 20px 0 rgba(0, 0, 0, 0.1);
}
.history p {
  position: relative;
  margin: 0 0 0 20px;
  text-align: center;
}
.avatar {
  position: relative;
  float: left;
  height: 100px;
  width: 100px;
  /*margin: 20px;*/
  border-radius: 50px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.3), 0 6px 20px 0 rgba(0, 0, 0, 0.3);
}
.record .avatar {
  position: relative;
  float: left;
  height: 60px;
  width: 60px;
  /*margin: 20px;*/
  border-radius: 30px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.3), 0 6px 20px 0 rgba(0, 0, 0, 0.3);
  margin-left: 10px;
}
.welcome {
  float: left;
}
.welcome-en {
  font-weight: bold;
  font-size: 24px;
  margin: 25px 0 0 20px;
}
.welcome-zh {
  margin: 0 0 0 20px;
}
.manage-box {
  position: relative;
  width: 98%;
  height: 250px;
  padding-bottom: 50px;
  margin-top: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.1), 0 6px 20px 0 rgba(0, 0, 0, 0.1);
}
.todo {
  position: absolute;
  font-weight: bold;
  font-size: 30px;
  line-height: 50px;
  margin: 10px 0 0 40px;
}
.todo .bxs-circle {
  color: #C34A36;
  font-size: 20px;
  margin-left: 20px;
}
.manage {
  position: relative;
  float: left;
  margin: 80px 40px 0 20px;
  padding: 50px 40px 20px 0;
  border-radius: 10px;
  box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.1), 0 6px 20px 0 rgba(0, 0, 0, 0.1);
}
.manage .bx {
  position: relative;
  float: left;
  font-size: 120px;
}
.manage .bxs-user {
  color: #1CBBB4;
}
.manage .bxs-objects-horizontal-left {
  color: #F37B1D;
}
.info {
  position: relative;
  float: left;
}
.title {
  font-weight: bold;
  font-size: 24px;
  margin-top: 0;
}
.info .data {
  position: relative;
  font-weight: bold;
  text-align: center;
  margin-top: 40px;
}
.info .data-todo {
  color: #E54D42;
}
.info .data-down {
  color: #39B54A;
}
.total-manage {
  position: relative;
  margin-top: 20px;
  width: 200px;
  float: left;
  padding: 10px 10px 30px 20px;
  margin-left: 20px;
  border-radius: 10px;
  background-color: #f4f4f4;
  /*box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.1), 0 6px 20px 0 rgba(0, 0, 0, 0.1);*/
}
.total-manage .title {
  margin-bottom: 10px;
}
.total-manage .bx {
  font-size: 50px;
}
.total-manage .bxs-user-plus {
  color: #1CBBB4;
}
.total-manage .bx-list-check {
  color: #6739B6;
}
.total-manage .bxs-objects-horizontal-left {
  color: #F37B1D;
}
.total-manage span {
  font-weight: bold;
  font-size: 20px;
  margin: 0 10px;
}
.chart {
  position: relative;
  padding-top: 1px;
  margin-top: 20px;
  width: 98%;
  padding-bottom: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.1), 0 6px 20px 0 rgba(0, 0, 0, 0.1);
}
.header {
  height: 40px;
  line-height: 40px;
}

.statistics {
  position: relative;
  font-weight: bold;
  font-size: 30px;
  margin-top: 10px;
  /*line-height: 50px;*/
  margin-left: 40px;
  margin-bottom: 10px;

}

.header-search-box {
  /*display: inline-block;*/
  position: relative;
  height: 60px;
  margin: 0 auto;
  width: 350px;
  /*left: 120px;*/
}

.header-search-box .search-input{
  position: relative;
  display: inline-block;
  font-size: 15px;
  width: 240px;
  min-width: 220px;
  height: 20px;
  padding: 10px 20px 10px 20px;
  border-radius: 10px;
  border: 1px solid rgb(240,240,240);
  /*margin: 0 auto;*/
  /*border-bottom: 3px solid rgba(33,150,243,0.5);*/
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.1), 0 6px 20px 0 rgba(0, 0, 0, 0.1);
  outline: none;
}

.header-search-box .search-icon i{
  position: relative;
  text-align: center;
  display: inline-block;
  /*margin: 0 auto;*/
  color: #333333;
  margin-left: 5px;
  /*margin-bottom: 40px;*/
  line-height: 50px;
  height: 50px;
  right: 0px;
  /*width: 50px;*/
  font-size: 15px;
  min-width: 50px;
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
.remind {
  margin: 20px 0 10px 10px;
  font-size: 28px;
  font-weight: bold;
}
.record table tr {
  display: block;
  margin: 20px 0;
}
.name-box {
  width: 100px;
  max-width: 100px;
  overflow: hidden;
  text-align: center;
}
.name-box span{
  font-weight: bold;
  font-size: 18px;
}
.action-box span {
  margin-right: 20px;
}
.type-box span {
  font-weight: bold;
  font-size: 18px;
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
