<template>

  <div class="background">
    <div class="up">
      <div class="uptitle">
        <img src="../assets/logo.png" style="height: 25px">
        事务中心
      </div>
    </div>
    <div class="leftdown">
      <el-aside width="200px" style="background-color: rgb(238, 241, 246);height: 625px;width: 200px">
        <el-menu :default-openeds="[]">
          <el-submenu index="1">
            <template slot="title"><i class="el-icon-message"></i>举报</template>
            <el-menu-item-group>
              <el-menu-item index="1-1">全部记录</el-menu-item>
              <el-menu-item index="1-2">待处理</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title"><i class="el-icon-s-promotion"></i>申诉</template>
            <el-menu-item-group>
              <el-menu-item index="2-1">全部记录</el-menu-item>
              <el-menu-item index="2-2">待处理</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title"><i class="el-icon-menu"></i>机构申请</template>
            <el-menu-item-group>
              <el-menu-item index="3-1">全部记录</el-menu-item>
              <el-menu-item index="3-2">待处理</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="4">
            <template slot="title"><i class="el-icon-s-custom"></i>学者申请</template>
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
                <div>
                  <div
                      style="height: 40px;width: 40px;display: inline-block;vertical-align: middle;margin-bottom: 10px">
                    <img :src="require('../assets/' + item.sponsorAvatar)"
                         style="height: 40px;width: 40px;border-radius: 5px">
                  </div>
                  <p style="display: inline-block;font-size: 25px;margin-left: 25px">{{ recordList[index].sponsor }}</p>
                  &nbsp发起的关于
                  <p style="color: #0f62fe;display: inline-block;font-size: 20px;text-decoration: underline;cursor: pointer">
                    {{ recordList[index].target }}</p>
                  &nbsp的{{ transactionType }}
                  <el-button type="text" @click="dialogVisible = true">
                    <i class='bx bx-dots-horizontal-rounded'
                       style="font-size: 25px;color: black;margin-left: 600px"></i>
                  </el-button>
                  <el-dialog
                      title="处理事务"
                      :visible.sync="dialogVisible"
                      width="30%"
                      :before-close="handleClose">
                    <div style="">
                      <strong>申诉编号:&nbsp</strong>
                      <p style="display:inline-block">{{ item.id }}</p>
                    </div>
                    <div style="">
                      <strong>申诉发起时间:&nbsp</strong>
                      <p style="display:inline-block">{{ item.time }}</p>
                    </div>
                    <div style="">
                      <strong>申诉发起人:&nbsp</strong>
                      <p style="display:inline-block">{{ item.sponsor }}</p>
                    </div>
                    <div style="">
                      <strong>申诉目标:&nbsp</strong>
                      <p style="display:inline-block;color: #0f62fe;text-decoration: underline;cursor: pointer">{{ item.target }}</p>
                    </div>
                    <div style="">
                      <strong>申诉理由:&nbsp</strong>
                      <p style="display:inline-block">{{ item.reason }}</p>
                    </div>
                    <div style="">
                      <strong>申诉状态:&nbsp</strong>
                      <p style="display:inline-block">待处理</p>
                    </div>
                    <div style="">
                      <strong>处理回复:&nbsp</strong>
                      <p style="display:inline-block">&nbsp</p>
                      <div style="margin-top: 10px">
                      <el-input
                          type="textarea"
                          :rows="4"
                          placeholder=""
                          v-model="textarea">
                      </el-input>
                      </div>
                    </div>
                    <span slot="footer" class="dialog-footer">
                      <el-button type="success" @click="dialogVisible = false">同意</el-button>
                      <el-button type="danger" @click="dialogVisible = false">拒绝</el-button>
                    </span>
                  </el-dialog>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div style="margin-top: 10px;text-align: center">
          <el-pagination
              layout="prev, pager, next, jumper"
              :page-size="pageSize"
              :pager-count="pageNum"
              :total="List.length"
              @current-change="changePage">
          </el-pagination>
        </div>
      </div>
    </div>
  </div>


</template>

<script>
export default {
  name: "ScholarsDetails",
  data() {
    return {
      textarea: '',
      dialogVisible: false,
      transactionType: "申诉",
      input: '',
      entryList: [],
      visible: false,
      currentInstitutional: 0,
      List: [
        {
          "id": 1,
          "time": "2022-11-21 14:56:12",
          "sponsor": "王明",
          "target": "某某文献",
          "targetUlr": "",
          "reason": "不喜欢",
          "state": 0,
          "sponsorAvatar": "img/home/avatar1.jpg",
        },
        {
          "id": 1,
          "time": "2022-11-21 14:56:12",
          "sponsor": "王明",
          "target": "某某文献",
          "targetUlr": "",
          "reason": "不喜欢",
          "state": 0,
          "sponsorAvatar": "img/home/avatar1.jpg",
        },
        {
          "id": 1,
          "time": "2022-11-21 14:56:12",
          "sponsor": "王明",
          "target": "某某文献",
          "targetUlr": "",
          "reason": "不喜欢",
          "state": 0,
          "sponsorAvatar": "img/home/avatar1.jpg",
        },
        {
          "id": 1,
          "time": "2022-11-21 14:56:12",
          "sponsor": "王明",
          "target": "某某文献",
          "targetUlr": "",
          "reason": "不喜欢",
          "state": 0,
          "sponsorAvatar": "img/home/avatar1.jpg",
        },
        {
          "id": 1,
          "time": "2022-11-21 14:56:12",
          "sponsor": "王明",
          "target": "某某文献",
          "targetUlr": "",
          "reason": "不喜欢",
          "state": 0,
          "sponsorAvatar": "img/home/avatar1.jpg",
        },
        {
          "id": 1,
          "time": "2022-11-21 14:56:12",
          "sponsor": "王明",
          "target": "某某文献",
          "targetUlr": "",
          "reason": "不喜欢",
          "state": 0,
          "sponsorAvatar": "img/home/avatar1.jpg",
        },
        {
          "id": 1,
          "time": "2022-11-21 14:56:12",
          "sponsor": "王明",
          "target": "某某文献",
          "targetUlr": "",
          "reason": "不喜欢",
          "state": 0,
          "sponsorAvatar": "img/home/avatar1.jpg",
        },
      ],
      recordList: [],

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
  methods: {
    changePage(val) {
      let i;
      let length = this.List.length
      this.recordList = [];
      for (i = (val - 1) * 6; i < length && i < val * 6; i++) {
        this.recordList.push(this.List[i]);
      }
    },
    toHandleThisTransaction(index) {
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {
          });
    }
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

.uptitle {
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
  border: 1px solid rgb(240, 240, 240);
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

.background {
  position: absolute;
}

.line1 {
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