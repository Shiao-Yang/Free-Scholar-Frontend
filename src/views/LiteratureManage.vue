<template>
  <div class="statistic">
    <div class="mask" v-if="this.visible === true"></div>
    <div class="windows" v-if="this.visible === true">
      <div class="pop">
        <div style="position: relative;">
          <div class="title">文献id：</div>
          <div class="Informations">
            {{Literature[this.currentInstitutional].id}}
          </div>
        </div>
        <div>
          <div class="title">题目：</div>
          <div class="Informations">
            {{Literature[this.currentInstitutional].name}}
          </div>
        </div>
        <div>
          <span class="title">发表时间：</span>
          <span class="Informations">
                {{Literature[this.currentInstitutional].date}}
              </span>
        </div>
        <div>
          <span class="title">发表于：</span>
          <span class="Informations">
                {{Literature[this.currentInstitutional].origin}}
              </span>
        </div>
        <div>
          <span class="title">作者：</span>
          <span>
            <el-button type="primary" plain>新增作者</el-button>
          </span>
          <div class="table">
            <el-table
                :data="tableData"
                style="width: 100%"
                max-height="250">
              <el-table-column
                  prop="num"
                  label="序号"
                  width="50">
              </el-table-column>
              <el-table-column
                  prop="name"
                  label="姓名"
                  width="200">
              </el-table-column>
              <el-table-column
                  prop="id"
                  label="id"
                  width="280">
              </el-table-column>
              <el-table-column
                  fixed="right"
                  label="操作"
                  width="50">
                <template slot-scope="scope">
                  <el-button
                      @click.native.prevent="deleteRow(scope.$index, tableData)"
                      type="text"
                      size="small">
                    移除
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
      </div>
      <div class="windows-close" style="position: absolute;left: 600px;top: 20px" title="关闭">
        <i class='bx bx-x' style="font-size: 40px" @click="close"></i>
      </div>
    </div>
    <div class="mask" v-if="this.visible1 === true"></div>
    <div class="windows" v-if="this.visible1 === true">
      <el-form ref="form" :model="form" label-width="100px" style="width: 620px;position: relative;top: 60px">
        <div v-if="this.active === 0">
          <el-form-item label="title" prop="title"
          :rules="[{ required: true, message: '请输入文献标题', trigger: 'blur' },]">
            <el-input v-model="form.title"></el-input>
          </el-form-item>
          <el-form-item label="year">
            <el-input v-model="form.year"></el-input>
          </el-form-item>
          <el-form-item label="n_citation">
            <el-input v-model="form.n_citation"></el-input>
          </el-form-item>
          <el-form-item label="lang">
            <el-input v-model="form.lang"></el-input>
          </el-form-item>
          <el-form-item label="doi">
            <el-input v-model="form.doi"></el-input>
          </el-form-item>
          <el-form-item label="issn">
            <el-input v-model="form.issn"></el-input>
          </el-form-item>
        </div>
        <div v-if="this.active === 1">
          <el-form-item label="venue_raw">
            <el-input v-model="form.raw"></el-input>
          </el-form-item>
          <el-form-item label="venue_id">
            <el-input v-model="form.id"></el-input>
          </el-form-item>
          <el-form-item label="keywords">
            <el-input v-model="form.keywords"></el-input>
          </el-form-item>
          <el-form-item label="pdf">
            <el-input v-model="form.pdf"></el-input>
          </el-form-item>
          <el-form-item label="url">
            <el-input v-model="form.url"></el-input>
          </el-form-item>
          <el-form-item label="abstract" prop="desc">
            <el-input type="textarea" v-model="form.abstract"></el-input>
          </el-form-item>
        </div>
        <div v-if="this.active === 2|| this.active === 3">
          <el-form-item
              v-for="(domain, index) in dynamicValidateForm.domains"
              :label="'作者' + index"
              :key="domain.key"
              :prop="'domains.' + index + '.value'"
              :rules="{required: true, message: '作者不能为空', trigger: 'blur'}"
              style="width: 700px"
          >
            <el-input v-model="domain.name" style="width: 135px;margin-right: 10px" placeholder="输入姓名"></el-input>
            <el-input v-model="domain.org" style="width: 135px;margin-right: 10px" placeholder="输入机构"></el-input>
            <el-input v-model="domain.id" style="width: 135px;margin-right: 10px" placeholder="输入id"></el-input>
            <el-button @click.prevent="removeDomain(domain)">删除</el-button>
          </el-form-item>
          <el-form-item>
            <el-button @click="addDomain">新增作者</el-button>
          </el-form-item>
        </div>
      </el-form>
      <div style="width: 500px;position: relative;left: 100px;top: 100px">
        <el-steps :active="active" finish-status="success">
          <el-step title="步骤 1"></el-step>
          <el-step title="步骤 2"></el-step>
          <el-step title="步骤 3"></el-step>
        </el-steps>
        <el-button style="margin-top: 12px;" @click="next">下一步</el-button>
        <el-button style="margin-top: 12px;margin-left: 300px" @click="upload" v-if="this.active === 3">提交</el-button>
      </div>
      <div class="windows-close" style="position: absolute;left: 600px;top: 20px" title="关闭">
        <i class='bx bx-x' style="font-size: 40px" @click="closenew"></i>
      </div>
    </div>
    <el-card class="box-card">
      <div style="font-size: 25px;color: #030303;margin-left: 20px">
        数据统计
      </div>
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
    </el-card>
    <el-card class="box-card" style="margin-top: 40px;min-height: 1000px">
      <div style="font-size: 25px;color: #030303;margin-left: 20px">
        <i class='bx bxs-bookmark-alt' style="margin-right: 20px;color: #FBBD08;margin-bottom: 30px"></i>文献管理
      </div>
      <div class="divider"></div>
      <div style="display: flex">
        <div style="width: 100px;margin-top: 15px">
          <el-button type="primary" plain @click="newLiterature">新添文献</el-button>
        </div>
        <div class="header-search-box">
          <input type="text" autocomplete="off"
                 id="input"
                 class="search-input"
                 v-model="input"
                 placeholder="Search resources..."
                 @keyup.enter="">
          <span class="search-icon" title="搜索"><i class='bx bx-search' @click="search"></i></span>
        </div>
      </div>
      <div class="literature">
        <div class="literature-box" v-for="(item,index) in Literature" :key="index">
          <div style="position: relative;left: 30px;top: 30px">
            <div>
              <div class="title">文献id：</div>
              <div class="Information">
                {{Literature[index].id | ellipsis}}
              </div>
              <div style="display: inline-block">
                <el-button type="text" @click="open(index)">
                  <i class='bx bx-dots-horizontal-rounded' style="font-size: 25px;color: black"></i>
                </el-button>
              </div>
            </div>
            <div>
              <div class="title">题目：</div>
              <div class="Information">
                  {{Literature[index].name | ellipsis}}
              </div>
            </div>
            <div>
              <span class="title">发表于：</span>
              <span class="Information">
                {{Literature[index].origin | ellipsis}}
              </span>
            </div>
            <div>
              <span class="title">发表时间：</span>
              <span class="Information">
                {{Literature[index].date | ellipsis}}
              </span>
            </div>
          </div>
        </div>
        <div style="position: absolute;width:100%;bottom: 10px;text-align: center;margin-top: 100px">
          <div class="block">
            <el-pagination
                layout="prev, pager, next"
                :page-size="pageSize"
                :pager-count="pageNum"
                :total="List.length"
                @current-change="changePage">
            </el-pagination>
          </div>
        </div>
      </div>
    </el-card>
  </div>

</template>

<script>
const echarts = require('echarts')

export default {
  name: "LiteratureManage",
  data (){
    return {
      dynamicValidateForm: {
        domains: [{
          name: '',
          org: '',
          id: '',
        }],
        email: ''
      },
      form:{

      },
      active : 0,
      visible : false,
      visible1 : false,
      currentInstitutional : 0,
      List : [],
      Literature : [],
      tableData : [],
      // 每页显示数量
      pageSize: 6,
      // 共几页
      pageNum: 0,
      // 当前显示的数据
      dataShow: "",
      // 默认当前显示第一页
      currentPage: 0,
      input: '',
      field: 'title',
      adminNum: 0,
      userNum: 0,
      scholarNum: 0,
      // 数据可视化相关数据
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
  filters:{
    ellipsis(value){
      if (!value) return '';
      if (value.length > 20) {
        return value.slice(0,20) + '...'
      }
      return value
    }
  },
  created() {
    var i = 0;
    i = this.List.length / 6;
    if (i < 1)
      i = 1;
    this.pageNum = i * 10;
    this.changePage(1);
  },
  mounted() {
    this.initCharts();
    this.changeChartType(1)
  },
  methods:{
    changePage(val){
      let i;
      let length = this.List.length
      this.Literature = [];
      for (i = (val-1) * 6; i < length && i < val * 6; i++) {
        this.Literature.push(this.List[i]);
      }
    },
    open(index) {
      this.visible = true;
      this.currentInstitutional = index;
      this.tableData = this.Literature[index].author;
    },
    close(){
      this.visible = false;
    },
    deleteRow(index, rows) {
      rows.splice(index, 1);
      this.$axios({
        method: 'post',
        url: '',
        data: qs.stringify({
          "id":this.Literature[this.currentInstitutional].id,
          "uid":this.Literature[this.currentInstitutional].author[index].uid,
          "name":this.Literature[this.currentInstitutional].author[index].name
        })
      }).then(res =>{
        switch (res.data.errno){
          case 0:
            window.alert(res.data.msg);
        }
      })
    },
    search(){
      this.List = [];
      let params = {
        page: 1,
        condition: [
          {
            type: "OR",
            input: this.input,
            field: this.field
          }
        ],
        filter: [],
      }
      if (this.input === '') {
        this.$message('请输入搜索内容')
        return;
      }
      this.$axios( {
        method: 'post',
        url: this.$store.state.address+'api/publication/search/',
        data: params
      })
          .then(async res =>{
        var i = 0;
        for (i = 0; i < res.data.hits.length; i++){
          this.List.push({
            id: res.data.hits[i]._source.id,
            name: res.data.hits[i]._source.title,
            origin: "123",
            date: res.data.hits[i]._source.year,
            author: res.data.hits[i]._source.authors
          })
        }
        var i = 0;
        i = this.List.length / 6;
        if (i < 1)
           i = 1;
        this.pageNum = i * 10;
        this.changePage(1);
      })
    },
    addAuthor(){
      this.$axios({
        method: 'post',
        url: '',
        data: qs.stringify({
          "id":this.Literature[this.currentInstitutional].id,
          "uid":this.Literature[this.currentInstitutional].author[index].uid,
          "name":this.Literature[this.currentInstitutional].author[index].name
        })
      }).then(res =>{
        switch (res.data.errno){
          case 0:
            window.alert(res.data.msg);
        }
      })
    },
    newLiterature(){
      this.visible1 = true;
    },
    closenew(){
      this.visible1 = false;
    },
    upload(){
      let venues = {
        raw : this.form.raw,
        id : this.form.id
      };
      let params = {
        title : this.form.title,
        year : this.form.year,
        n_citation : this.form.n_citation,
        lang : this.form.lang,
        doi : this.form.doi,
        issn : this.form.issn,
        venue : venues,
        keywords : this.form.keywords,
        pdf : this.form.pdf,
        url : this.form.url,
        abstract : this.form.abstract,
        authors: this.dynamicValidateForm.domains
      };
      this.$axios({
        headers: {
          jwt: JSON.parse(sessionStorage.getItem('baseInfo')).token,
        },
        method: 'post',
        url: this.$store.state.address+'api/publication/addPub/',
        data: params,
      }).then(res =>{
        this.$message.success(res.data.msg);
      })
      this.visible1 = false;
    },
    next() {
      if (this.active++ > 2) this.active = 0;
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    removeDomain(item) {
      var index = this.dynamicValidateForm.domains.indexOf(item)
      if (index !== -1) {
        this.dynamicValidateForm.domains.splice(index, 1)
      }
    },
    addDomain() {
      this.dynamicValidateForm.domains.push({
        name: '',
        org: '',
        id: '',
        key: Date.now()
      });
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
.mask {
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  left: 0;
  top: 0;
  z-index: 999;
  display: flex;
  align-items: center;
  justify-content: center;
}
.windows {
  position: fixed;
  background-color: white;
  width: 500px;
  height: 350px;
  top: 130px;
  left: 500px;
  z-index: 1000;
}
.box-card {
  width: 95%;
  min-width: 1400px;
}
.table {
  position: relative;
  width: 600px;
  left: -30px;
  top: 10px;
  border: 1px solid rgb(240,240,240);
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.1), 0 6px 20px 0 rgba(0, 0, 0, 0.1);
}
.pop {
  position: relative;
  left: 100px;
  top: 50px;
  line-height: 45px;
}
.Informations {
  position: relative;
  display: inline-block;
  width: 400px;
  text-align: left;
  word-break: break-all;
  word-wrap: break-word;
  line-height: 24px;

}
.mask {
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  left: 0;
  top: 0;
  z-index: 999;
  display: flex;
  align-items: center;
  justify-content: center;
}
.windows {
  position: fixed;
  background-color: white;
  width: 700px;
  height: 650px;
  top: 30px;
  left: 450px;
  z-index: 1000;
}
.Information {
  position: relative;
  display: inline-block;
  left: 0px;
  width: 220px;
  text-align: left;
  word-break: break-all;
  word-wrap: break-word;
}
.title {
  display: inline-block;
  text-align: right;
  width: 100px;
  color: #030303;
  font-weight: bold;
  font-size: 20px;
}
.literature-box {
  display: inline-block;
  margin-right: 30px;
  margin-top: 30px;
  width: 390px;
  height: 250px;
  border: 1px solid rgb(240,240,240);
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.1), 0 6px 20px 0 rgba(0, 0, 0, 0.1);
  line-height: 30px;
}
.literature {
  width: 100%;
  justify-content: center;
  margin-top: 40px;
}

.header-search-box {
  margin-left: auto;
  margin-top: 15px;
  width: 700px;
}

.header-search-box .search-input{
  position: relative;
  font-size: 15px;
  min-width: 50%;
  height: 20px;
  padding: 10px 20px 10px 20px;
  border-radius: 10px;
  border: 1px solid rgb(240,240,240);
  /*border-bottom: 3px solid rgba(33,150,243,0.5);*/
  /*box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.1), 0 6px 20px 0 rgba(0, 0, 0, 0.1);*/
  outline: none;
}

.header-search-box .search-input:focus {
  border: 1px solid #2196f3;
}
.header-search-box .search-icon i{
  text-align: center;
  color: #333333;
  margin-left: 5px;
  margin-bottom: 40px;
  line-height: 50px;
  height: 50px;
  font-size: 15px;
  min-width: 50px;
  background: white;
  border-radius: 50%;
  cursor: pointer;
  transition: .5s;
}
.header-search-box .search-icon i:hover {
  color: white;
  background: #2196f3;
}
.statistic {
}
.divider {
  position: relative;
  margin: 0 auto;
  width: 100%;
  height: 2px;
  background-color: #d4d4d4;
  text-align: center;
  font-size: 16px;
  color: rgba(101, 101, 101, 1);
}

.windows-close {
  cursor: pointer;
}

.windows-close:hover {
  color: #f44336;
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
