<template>

  <div class="background">
    <div class="up">
      <div class="uptitle">
        <img src="../assets/logo.png" style="height: 25px">
        事务中心
      </div>
    </div>
    <div class="leftdown">
      <el-aside width="200px" style="background-color: rgb(238, 241, 246);height: 625px;width: 200px"  >
        <el-menu :default-openeds="['1', '3']">
          <el-submenu index="1">
            <template slot="title"><i class="el-icon-message"></i>举报</template>
            <el-menu-item-group>
              <el-menu-item index="1-1">全部记录</el-menu-item>
              <el-menu-item index="1-2">待处理</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title"><i class="el-icon-menu"></i>申诉</template>
            <el-menu-item-group>
              <el-menu-item index="2-1">全部记录</el-menu-item>
              <el-menu-item index="2-2">待处理</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title"><i class="el-icon-setting"></i>机构申请</template>
            <el-menu-item-group>
              <el-menu-item index="3-1">全部记录</el-menu-item>
              <el-menu-item index="3-2">待处理</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="4">
            <template slot="title"><i class="el-icon-setting"></i>学者申请</template>
            <el-menu-item-group>
              <el-menu-item index="4-1">全部记录</el-menu-item>
              <el-menu-item index="4-2">待处理</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-aside>
    </div>
    <div class="rightdown">
      <div class="line1">
        <el-input
            placeholder="搜索记录"
            v-model="input"
            clearable
            style="width: 450px">
        </el-input>
        <el-button icon="el-icon-search" circle style="margin-left: 5px"></el-button>
      </div>
      <div class="block">
        <div class="records">
          <div class="recordList-box" v-for="(item,index) in recordList" :key="index">
            <div style="position: relative;left: 30px;top: 0px">
              <div>
                <div class="name">
                  {{recordList[index].name}}
                   发起的关于xxx的申诉
                  <el-button type="text" @click="open(index)">
                    <i class='bx bx-dots-horizontal-rounded' style="font-size: 25px;color: black"></i>
                  </el-button>
                </div>
              </div>
            </div>
          </div>
        </div>
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



</template>

<script>
export default {
  name: "ScholarsDetails",
  data() {
    return {
      input: '',
      entryList: [
      ],
      visible : false,
      currentInstitutional : 0,
      List : [
        {
          "name" : 1,

        },
        {
          "name" : 2,

        },
        {
          "name" : 3,
        },
        {
          "name" : 4,
        },
        {
          "name" : 5,
        },
        {
          "name" : 6,
        },
        {
          "name" : 7,
        },
      ],
      recordList : [],

      // 每页显示数量
      pageSize: 6,
      // 共几页
      pageNum: 0,
      // 当前显示的数据
      dataShow: "",
      // 默认当前显示第一页
      currentPage: 0
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
  methods:{
    changePage(val){
      let i;
      let length = this.List.length
      this.recordList = [];
      for (i = (val-1) * 6; i < length && i < val * 6; i++) {
        this.recordList.push(this.List[i]);
      }
    },
  }
}
</script>

<style scoped>

.up {
  position: absolute;
  height: 50px;
  width: 1300px;
  left: 0;
  right: 0;
  /*margin: 0 auto;*/
  background-color: white;
  border-radius: 0px;
  margin-top: 0px;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.3), 0 1px 2px 0 rgba(0, 0, 0, 0.3);
}
.uptitle{
  font-size: 30px;
}
.leftdown {
  position: relative;
  height: 625px;
  width: 200px;
  top: 5px;
  left: 0;
  right: 0;
  background-color: white;
  border-radius: 0px;
  margin-top: 50px;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.3), 0 1px 2px 0 rgba(0, 0, 0, 0.3);
}
.rightdown {
  position: absolute;
  height: 625px;
  width: 1095px;
  top: 5px;
  left: 205px;
  right: 0;
  background-color: white;
  border-radius: 0;
  margin-top: 50px;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.3), 0 1px 2px 0 rgba(0, 0, 0, 0.3);
}
.Name {
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
.recordList-box {
  display: inline-block;
  margin-right: 30px;
  margin-top: 30px;
  width: 1035px;
  height: 50px;
  border: 1px solid rgb(240,240,240);
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.1), 0 6px 20px 0 rgba(0, 0, 0, 0.1);
  line-height: 5px;
}
.records {
  margin-top: 0px;
}

.header-search-box .search-icon i:hover {
  color: white;
  background: #2196f3;
}
.statistic {
}
.background{
  position: absolute;
}
.line1{
  text-align: center;
  font-size: 5px;
}
.divider {
  position: relative;
  margin: 0 auto;
  width: 1300px;
  height: 2px;
  background-color: #d4d4d4;
  text-align: center;
  font-size: 16px;
  color: rgba(101, 101, 101, 1);
}
</style>