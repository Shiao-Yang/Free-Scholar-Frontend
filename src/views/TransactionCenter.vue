<template>

  <div class="background">
    <div class="up">
      <div class="uptitle" style="margin-left: 10px">
<!--        <img src="../assets/logo.png" style="height: 25px">-->
        事务中心
      </div>
    </div>
    <div class="leftdown">
      <el-aside width="200px" style="background-color: rgb(238, 241, 246);height: 625px;width: 200px">
        <el-menu :default-openeds="['1', '2','5']">
          <el-submenu index="1">
            <template slot="title"><i class="el-icon-message"></i>举报评论</template>
            <el-menu-item-group>
              <el-menu-item index="1-1" @click="toGetRecords(1,1)">全部记录</el-menu-item>
              <el-menu-item index="1-2" @click="toGetRecords(1,2)">待处理</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title"><i class="el-icon-edit-outline"></i>举报学者</template>
            <el-menu-item-group>
              <el-menu-item index="2-1" @click="toGetRecords(2,1)">全部记录</el-menu-item>
              <el-menu-item index="2-2" @click="toGetRecords(2,2)">待处理</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
<!--          <el-submenu index="3">-->
<!--            <template slot="title"><i class="el-icon-s-promotion"></i>申诉</template>-->
<!--            <el-menu-item-group>-->
<!--              <el-menu-item index="3-1" @click="toGetRecords(3,1)">全部记录</el-menu-item>-->
<!--              <el-menu-item index="3-2" @click="toGetRecords(3,2)">待处理</el-menu-item>-->
<!--            </el-menu-item-group>-->
<!--          </el-submenu>-->
<!--          <el-submenu index="4">-->
<!--            <template slot="title"><i class="el-icon-menu"></i>机构申请</template>-->
<!--            <el-menu-item-group>-->
<!--              <el-menu-item index="4-1" @click="toGetRecords(4,1)">全部记录</el-menu-item>-->
<!--              <el-menu-item index="4-2" @click="toGetRecords(4,2)">待处理</el-menu-item>-->
<!--            </el-menu-item-group>-->
<!--          </el-submenu>-->
          <el-submenu index="5">
            <template slot="title"><i class="el-icon-s-custom"></i>学者申请</template>
            <el-menu-item-group>
              <el-menu-item index="5-1" @click="toGetRecords(5,1)">全部记录</el-menu-item>
              <el-menu-item index="5-2" @click="toGetRecords(5,2)">待处理</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-aside>
    </div>
    <div class="rightdown">
<!--      <div class="line1" v-if="List.length>0">-->
<!--        <el-input-->
<!--            placeholder="搜索记录"-->
<!--            v-model="input"-->
<!--            clearable-->
<!--            style="width: 450px">-->
<!--        </el-input>-->
<!--        <el-button icon="el-icon-search" circle style="margin-left: 5px"></el-button>-->
<!--      </div>-->

    <!--1-1 举报评论 所有-->
      <div class="block" v-if="selectWhichMenu===1">
        <div class="records">
          <div class="recordList-box" v-for="(item,index) in recordList" :key="index">
            <div style="position: relative;left: 30px;top: 0px">
              <div>
                <div>
                  <div
                      style="height: 40px;width: 40px;display: inline-block;vertical-align: middle;margin-bottom: 10px">
                    <img :src="$store.state.url+userList[index].avatar"
                         style="height: 40px;width: 40px;border-radius: 5px"
                    >
                  </div>
                  <p style="display: inline-block;font-size: 25px;margin-left: 25px">{{ userList[index].name }}</p>
                  &nbsp发起的关于
                  <p style="color: #0f62fe;display: inline-block;font-size: 20px;">
                    评论&nbsp{{item.fields.reported }}</p>
                  &nbsp的{{ transactionType }}
                  <el-button type="text" @click="dialogVisible = true;handleWhichOne=index">
                    <i class='bx bx-dots-horizontal-rounded'
                       style="font-size: 25px;color: black;"></i>
                  </el-button>
                  <el-dialog
                      title="处理事务"
                      :visible.sync="dialogVisible"
                      width="30%">
                    <!--                      :before-close="handleClose"-->
                    <div style="">
                      <strong>举报编号:&nbsp</strong>
                      <p style="display:inline-block">{{ recordList[handleWhichOne].pk }}</p>
                    </div>
                    <div style="">
                      <strong>举报发起时间:&nbsp</strong>
                      <p style="display:inline-block">{{ recordList[handleWhichOne].fields.create_time}}</p>
                    </div>
                    <div style="">
                      <strong>举报发起人:&nbsp</strong>
                      <p style="display:inline-block">{{ userList[handleWhichOne].name }}</p>
                    </div>
                    <div style="">
                      <strong>举报评论编号:&nbsp</strong>
<!--                      <p style="display:inline-block;color: #0f62fe;text-decoration: underline;cursor: pointer">{{recordList[handleWhichOne].fields.reported}}</p>-->
                      <p style="display:inline-block;">{{recordList[handleWhichOne].fields.reported}}</p>
                    </div>
                    <div style="">
                      <strong>举报评论内容:&nbsp</strong>
                      <p style="display:inline-block;">{{reportedCommentList[handleWhichOne].content}}</p>
                    </div>
                    <div style="">
                      <strong>举报理由:&nbsp</strong>
                      <p style="display:inline-block">{{ recordList[handleWhichOne].fields.reason}}</p>
                    </div>
                    <div style="">
                      <strong>事务状态:&nbsp</strong>
                      <p style="display:inline-block" v-if="recordList[handleWhichOne].fields.status===0">待处理</p>
                      <p style="display:inline-block" v-else-if="recordList[handleWhichOne].fields.status===1">未通过</p>
                      <p style="display:inline-block" v-else-if="recordList[handleWhichOne].fields.status===2">已通过</p>
                    </div>
                    <div style="" v-if="recordList[handleWhichOne].fields.status===0">
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
                      <span slot="footer" class="dialog-footer" v-if="recordList[handleWhichOne].fields.status===0">
                      <el-button type="success" @click="agreeThisTransaction(0,recordList[handleWhichOne].pk,textarea);dialogVisible = false;textarea='';toGetRecords(1,1)">同意</el-button>
                      <el-button type="danger" @click="refuseThisTransaction(0,recordList[handleWhichOne].pk,textarea);dialogVisible = false;textarea='';toGetRecords(1,1)">拒绝</el-button>
                    </span>
                    </div>
                    <div style="" v-else>
                      <strong>处理回复:&nbsp</strong>
                      <p style="display:inline-block">{{recordList[handleWhichOne].fields.reply}}</p>
                    </div>
                  </el-dialog>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div style="margin-top: 10px;text-align: center" v-if="List.length>0">
          <el-pagination
              layout="prev, pager, next, jumper"
              :page-size="pageSize"
              :pager-count="pageNum"
              :total="List.length"
              @current-change="changePage">
          </el-pagination>
        </div>
      </div>

      <!--1-2 举报评论 未处理-->
      <div class="block" v-else-if="selectWhichMenu===2">
        <div class="records">
          <div class="recordList-box" v-for="(item,index) in recordList" :key="index">
            <div style="position: relative;left: 30px;top: 0px">
              <div>
                <div>
                  <div
                      style="height: 40px;width: 40px;display: inline-block;vertical-align: middle;margin-bottom: 10px">
                    <img :src="$store.state.url+userList[index].avatar"
                         style="height: 40px;width: 40px;border-radius: 5px"
                    >
                  </div>
                  <p style="display: inline-block;font-size: 25px;margin-left: 25px">{{ userList[index].name }}</p>
                  &nbsp发起的关于
                  <p style="color: #0f62fe;display: inline-block;font-size: 20px;">
                    评论&nbsp{{item.fields.reported }}</p>
                  &nbsp的{{ transactionType }}
                  <el-button type="text" @click="dialogVisible = true;handleWhichOne=index">
                    <i class='bx bx-dots-horizontal-rounded'
                       style="font-size: 25px;color: black;"></i>
                  </el-button>
                  <el-dialog
                      title="处理事务"
                      :visible.sync="dialogVisible"
                      width="30%">
                    <!--                      :before-close="handleClose"-->
                    <div style="">
                      <strong>举报编号:&nbsp</strong>
                      <p style="display:inline-block">{{ recordList[handleWhichOne].pk }}</p>
                    </div>
                    <div style="">
                      <strong>举报发起时间:&nbsp</strong>
                      <p style="display:inline-block">{{ recordList[handleWhichOne].fields.create_time}}</p>
                    </div>
                    <div style="">
                      <strong>举报发起人:&nbsp</strong>
                      <p style="display:inline-block">{{ userList[handleWhichOne].name }}</p>
                    </div>
                    <div style="">
                      <strong>举报评论编号:&nbsp</strong>
                      <!--                      <p style="display:inline-block;color: #0f62fe;text-decoration: underline;cursor: pointer">{{recordList[handleWhichOne].fields.reported}}</p>-->
                      <p style="display:inline-block;">{{recordList[handleWhichOne].fields.reported}}</p>
                    </div>
                    <div style="">
                      <strong>举报评论内容:&nbsp</strong>
                      <p style="display:inline-block;">{{reportedCommentList[handleWhichOne].content}}</p>
                    </div>
                    <div style="">
                      <strong>举报理由:&nbsp</strong>
                      <p style="display:inline-block">{{ recordList[handleWhichOne].fields.reason}}</p>
                    </div>
                    <div style="">
                      <strong>事务状态:&nbsp</strong>
                      <p style="display:inline-block" v-if="recordList[handleWhichOne].fields.status===0">待处理</p>
                      <p style="display:inline-block" v-else-if="recordList[handleWhichOne].fields.status===1">未通过</p>
                      <p style="display:inline-block" v-else-if="recordList[handleWhichOne].fields.status===2">已通过</p>
                    </div>
                    <div style="" v-if="recordList[handleWhichOne].fields.status===0">
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
                      <span slot="footer" class="dialog-footer" v-if="recordList[handleWhichOne].fields.status===0">
                      <el-button type="success" @click="agreeThisTransaction(0,recordList[handleWhichOne].pk,textarea);dialogVisible = false;textarea='';toGetRecords(1,2)">同意</el-button>
                      <el-button type="danger" @click="refuseThisTransaction(0,recordList[handleWhichOne].pk,textarea);dialogVisible = false;textarea='';toGetRecords(1,2)">拒绝</el-button>
                    </span>
                    </div>
                    <div style="" v-else>
                      <strong>处理回复:&nbsp</strong>
                      <p style="display:inline-block">{{recordList[handleWhichOne].fields.reply}}</p>
                    </div>
                  </el-dialog>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div style="margin-top: 10px;text-align: center" v-if="List.length>0">
          <el-pagination
              layout="prev, pager, next, jumper"
              :page-size="pageSize"
              :pager-count="pageNum"
              :total="List.length"
              @current-change="changePage">
          </el-pagination>
        </div>
      </div>

      <!--2-1 举报学者 所有-->
      <div class="block" v-else-if="selectWhichMenu===3">
        <div class="records">
          <div class="recordList-box" v-for="(item,index) in recordList" :key="index">
            <div style="position: relative;left: 30px;top: 0px">
              <div>
                <div>
                  <div
                      style="height: 40px;width: 40px;display: inline-block;vertical-align: middle;margin-bottom: 10px">
                    <img :src="$store.state.url+userList[index].avatar"
                         style="height: 40px;width: 40px;border-radius: 5px"
                    >
                  </div>
                  <p style="display: inline-block;font-size: 25px;margin-left: 25px">{{ userList[index].name }}</p>
                  &nbsp发起的关于
                  <p style="color: #0f62fe;display: inline-block;font-size: 20px;">
                    学者&nbsp{{reportedScholarList[index].name }}</p>
                  &nbsp的{{ transactionType }}
                  <el-button type="text" @click="dialogVisible = true;handleWhichOne=index">
                    <i class='bx bx-dots-horizontal-rounded'
                       style="font-size: 25px;color: black;"></i>
                  </el-button>
                  <el-dialog
                      title="处理事务"
                      :visible.sync="dialogVisible"
                      width="30%">
                    <!--                      :before-close="handleClose"-->
                    <div style="">
                      <strong>举报编号:&nbsp</strong>
                      <p style="display:inline-block">{{ recordList[handleWhichOne].pk }}</p>
                    </div>
                    <div style="">
                      <strong>举报发起时间:&nbsp</strong>
                      <p style="display:inline-block">{{ recordList[handleWhichOne].fields.create_time}}</p>
                    </div>
                    <div style="">
                      <strong>举报发起人:&nbsp</strong>
                      <p style="display:inline-block">{{ userList[handleWhichOne].name }}</p>
                    </div>
                    <div style="">
                      <strong>举报学者编号:&nbsp</strong>
                      <!--                      <p style="display:inline-block;color: #0f62fe;text-decoration: underline;cursor: pointer">{{recordList[handleWhichOne].fields.reported}}</p>-->
                      <p style="display:inline-block;">{{recordList[handleWhichOne].fields.scholar}}</p>
                    </div>
                    <div style="">
                      <strong>举报理由:&nbsp</strong>
                      <p style="display:inline-block">{{ recordList[handleWhichOne].fields.reason}}</p>
                    </div>
                    <div style="">
                      <strong>事务状态:&nbsp</strong>
                      <p style="display:inline-block" v-if="recordList[handleWhichOne].fields.status===0">待处理</p>
                      <p style="display:inline-block" v-else-if="recordList[handleWhichOne].fields.status===1">未通过</p>
                      <p style="display:inline-block" v-else-if="recordList[handleWhichOne].fields.status===2">已通过</p>
                    </div>
                    <div style="" v-if="recordList[handleWhichOne].fields.status===0">
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
                      <span slot="footer" class="dialog-footer" v-if="recordList[handleWhichOne].fields.status===0">
                      <el-button type="success" @click="agreeThisTransaction(1,recordList[handleWhichOne].pk,textarea);dialogVisible = false;textarea='';toGetRecords(2,1)">同意</el-button>
                      <el-button type="danger" @click="refuseThisTransaction(1,recordList[handleWhichOne].pk,textarea);dialogVisible = false;textarea='';toGetRecords(2,1)">拒绝</el-button>
                    </span>
                    </div>
                    <div style="" v-else>
                      <strong>处理回复:&nbsp</strong>
                      <p style="display:inline-block">{{recordList[handleWhichOne].fields.reply}}</p>
                    </div>
                  </el-dialog>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div style="margin-top: 10px;text-align: center" v-if="List.length>0">
          <el-pagination
              layout="prev, pager, next, jumper"
              :page-size="pageSize"
              :pager-count="pageNum"
              :total="List.length"
              :current-page="this.currentPage"
              @current-change="changePage">
          </el-pagination>
        </div>
      </div>

      <!--2-2 举报学者 未处理-->
      <div class="block" v-else-if="selectWhichMenu===4">
        <div class="records">
          <div class="recordList-box" v-for="(item,index) in recordList" :key="index">
            <div style="position: relative;left: 30px;top: 0px">
              <div>
                <div>
                  <div
                      style="height: 40px;width: 40px;display: inline-block;vertical-align: middle;margin-bottom: 10px">
                    <img :src="$store.state.url+userList[index].avatar"
                         style="height: 40px;width: 40px;border-radius: 5px"
                    >
                  </div>
                  <p style="display: inline-block;font-size: 25px;margin-left: 25px">{{ userList[index].name }}</p>
                  &nbsp发起的关于
                  <p style="color: #0f62fe;display: inline-block;font-size: 20px;">
                    学者&nbsp{{reportedScholarList[index].name }}</p>
                  &nbsp的{{ transactionType }}
                  <el-button type="text" @click="dialogVisible = true;handleWhichOne=index">
                    <i class='bx bx-dots-horizontal-rounded'
                       style="font-size: 25px;color: black;"></i>
                  </el-button>
                  <el-dialog
                      title="处理事务"
                      :visible.sync="dialogVisible"
                      width="30%">
                    <!--                      :before-close="handleClose"-->
                    <div style="">
                      <strong>举报编号:&nbsp</strong>
                      <p style="display:inline-block">{{ recordList[handleWhichOne].pk }}</p>
                    </div>
                    <div style="">
                      <strong>举报发起时间:&nbsp</strong>
                      <p style="display:inline-block">{{ recordList[handleWhichOne].fields.create_time}}</p>
                    </div>
                    <div style="">
                      <strong>举报发起人:&nbsp</strong>
                      <p style="display:inline-block">{{ userList[handleWhichOne].name }}</p>
                    </div>
                    <div style="">
                      <strong>举报学者编号:&nbsp</strong>
                      <!--                      <p style="display:inline-block;color: #0f62fe;text-decoration: underline;cursor: pointer">{{recordList[handleWhichOne].fields.reported}}</p>-->
                      <p style="display:inline-block;">{{recordList[handleWhichOne].fields.scholar}}</p>
                    </div>
                    <div style="">
                      <strong>举报理由:&nbsp</strong>
                      <p style="display:inline-block">{{ recordList[handleWhichOne].fields.reason}}</p>
                    </div>
                    <div style="">
                      <strong>事务状态:&nbsp</strong>
                      <p style="display:inline-block" v-if="recordList[handleWhichOne].fields.status===0">待处理</p>
                      <p style="display:inline-block" v-else-if="recordList[handleWhichOne].fields.status===1">未通过</p>
                      <p style="display:inline-block" v-else-if="recordList[handleWhichOne].fields.status===2">已通过</p>
                    </div>
                    <div style="" v-if="recordList[handleWhichOne].fields.status===0">
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
                      <span slot="footer" class="dialog-footer" v-if="recordList[handleWhichOne].fields.status===0">
                      <el-button type="success" @click="agreeThisTransaction(1,recordList[handleWhichOne].pk,textarea);dialogVisible = false;textarea='';toGetRecords(2,2)">同意</el-button>
                      <el-button type="danger" @click="refuseThisTransaction(1,recordList[handleWhichOne].pk,textarea);dialogVisible = false;textarea='';toGetRecords(2,2)">拒绝</el-button>
                    </span>
                    </div>
                    <div style="" v-else>
                      <strong>处理回复:&nbsp</strong>
                      <p style="display:inline-block">{{recordList[handleWhichOne].fields.reply}}</p>
                    </div>
                  </el-dialog>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div style="margin-top: 10px;text-align: center" v-if="List.length>0">
          <el-pagination
              layout="prev, pager, next, jumper"
              :page-size="pageSize"
              :pager-count="pageNum"
              :total="List.length"
              @current-change="changePage">
          </el-pagination>
        </div>
      </div>

      <!--3-1 申诉 全部 还没改完-->
      <div class="block" v-else-if="selectWhichMenu===5">
        <div class="records">
          <div class="recordList-box" v-for="(item,index) in recordList" :key="index">
            <div style="position: relative;left: 30px;top: 0px">
              <div>
                <div>
                  <div
                      style="height: 40px;width: 40px;display: inline-block;vertical-align: middle;margin-bottom: 10px">
                    <img :src="$store.state.url+userList[index].avatar"
                         style="height: 40px;width: 40px;border-radius: 5px"
                    >
                  </div>
                  <p style="display: inline-block;font-size: 25px;margin-left: 25px">{{ recordList[index].fields.name }}</p>
                  &nbsp发起的关于
                  <p style="color: #0f62fe;display: inline-block;font-size: 20px;">
                    &nbsp{{appealedPaperList[index].title }}</p>
                  &nbsp的{{ transactionType }}
                  <el-button type="text" @click="dialogVisible = true;handleWhichOne=index">
                    <i class='bx bx-dots-horizontal-rounded'
                       style="font-size: 25px;color: black;"></i>
                  </el-button>
                  <el-dialog
                      title="处理事务"
                      :visible.sync="dialogVisible"
                      width="30%">
                    <!--                      :before-close="handleClose"-->
                    <div style="">
                      <strong>申诉编号:&nbsp</strong>
                      <p style="display:inline-block">{{ recordList[handleWhichOne].pk }}</p>
                    </div>
                    <div style="">
                      <strong>申诉发起时间:&nbsp</strong>
                      <p style="display:inline-block">{{ recordList[handleWhichOne].fields.create_time}}</p>
                    </div>
                    <div style="">
                      <strong>申诉发起人:&nbsp</strong>
                      <p style="display:inline-block">{{ userList[handleWhichOne].name }}</p>
                    </div>
                    <div style="">
                      <strong>文献编号:&nbsp</strong>
                      <!--                      <p style="display:inline-block;color: #0f62fe;text-decoration: underline;cursor: pointer">{{recordList[handleWhichOne].fields.reported}}</p>-->
                      <p style="display:inline-block;">{{recordList[handleWhichOne].fields.paper_id}}</p>
                    </div>
                    <div style="">
                      <strong>文献题目:&nbsp</strong>
                      <p style="display:inline-block">{{ appealedPaperList[index].title }}</p>
                    </div>
                    <div style="">
                      <strong>文献作者:&nbsp</strong>
                      <p style="display:inline-block" v-if="appealedPaperList[index].authors.length===1">{{ appealedPaperList[index].authors[0].name }}</p>
                      <p style="display:inline-block" v-else-if="appealedPaperList[index].authors.length>1">{{ appealedPaperList[index].authors[0].name }}&nbsp等</p>
                    </div>
                    <div style="">
                      <strong>举报理由:&nbsp</strong>
                      <p style="display:inline-block">{{ recordList[handleWhichOne].fields.reason}}</p>
                    </div>
                    <div style="">
                      <strong>事务状态:&nbsp</strong>
                      <p style="display:inline-block" v-if="recordList[handleWhichOne].fields.status===0">待处理</p>
                      <p style="display:inline-block" v-else-if="recordList[handleWhichOne].fields.status===1">未通过</p>
                      <p style="display:inline-block" v-else-if="recordList[handleWhichOne].fields.status===2">已通过</p>
                    </div>
                    <div style="" v-if="recordList[handleWhichOne].fields.status===0">
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
                      <span slot="footer" class="dialog-footer" v-if="recordList[handleWhichOne].fields.status===0">
                      <el-button type="success" @click="agreeThisTransaction(2,recordList[handleWhichOne].pk,textarea);dialogVisible = false;textarea='';toGetRecords(3,1)">同意</el-button>
                      <el-button type="danger" @click="refuseThisTransaction(2,recordList[handleWhichOne].pk,textarea);dialogVisible = false;textarea='';toGetRecords(3,1)">拒绝</el-button>
                    </span>
                    </div>
                    <div style="" v-else>
                      <strong>处理回复:&nbsp</strong>
                      <p style="display:inline-block">{{recordList[handleWhichOne].fields.reply}}</p>
                    </div>
                  </el-dialog>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div style="margin-top: 10px;text-align: center" v-if="List.length>0">
          <el-pagination
              layout="prev, pager, next, jumper"
              :page-size="pageSize"
              :pager-count="pageNum"
              :total="List.length"
              @current-change="changePage">
          </el-pagination>
        </div>
      </div>

      <!--3-2 申诉 未处理 还没改完-->
      <div class="block" v-else-if="selectWhichMenu===6">
        <div class="records">
          <div class="recordList-box" v-for="(item,index) in recordList" :key="index">
            <div style="position: relative;left: 30px;top: 0px">
              <div>
                <div>
                  <div
                      style="height: 40px;width: 40px;display: inline-block;vertical-align: middle;margin-bottom: 10px">
                    <img :src="$store.state.url+userList[index].avatar"
                         style="height: 40px;width: 40px;border-radius: 5px"
                    >
                  </div>
                  <p style="display: inline-block;font-size: 25px;margin-left: 25px">{{ recordList[index].fields.name }}</p>
                  &nbsp发起的关于
                  <p style="color: #0f62fe;display: inline-block;font-size: 20px;">
                    &nbsp{{appealedPaperList[index].title }}</p>
                  &nbsp的{{ transactionType }}
                  <el-button type="text" @click="dialogVisible = true;handleWhichOne=index">
                    <i class='bx bx-dots-horizontal-rounded'
                       style="font-size: 25px;color: black;"></i>
                  </el-button>
                  <el-dialog
                      title="处理事务"
                      :visible.sync="dialogVisible"
                      width="30%">
                    <!--                      :before-close="handleClose"-->
                    <div style="">
                      <strong>申诉编号:&nbsp</strong>
                      <p style="display:inline-block">{{ recordList[handleWhichOne].pk }}</p>
                    </div>
                    <div style="">
                      <strong>申诉发起时间:&nbsp</strong>
                      <p style="display:inline-block">{{ recordList[handleWhichOne].fields.create_time}}</p>
                    </div>
                    <div style="">
                      <strong>申诉发起人:&nbsp</strong>
                      <p style="display:inline-block">{{ userList[handleWhichOne].name }}</p>
                    </div>
                    <div style="">
                      <strong>文献编号:&nbsp</strong>
                      <!--                      <p style="display:inline-block;color: #0f62fe;text-decoration: underline;cursor: pointer">{{recordList[handleWhichOne].fields.reported}}</p>-->
                      <p style="display:inline-block;">{{recordList[handleWhichOne].fields.paper_id}}</p>
                    </div>
                    <div style="">
                      <strong>文献题目:&nbsp</strong>
                      <p style="display:inline-block">{{ appealedPaperList[index].title }}</p>
                    </div>
                    <div style="">
                      <strong>文献作者:&nbsp</strong>
                      <p style="display:inline-block" v-if="appealedPaperList[index].authors.length===1">{{ appealedPaperList[index].authors[0].name }}</p>
                      <p style="display:inline-block" v-else-if="appealedPaperList[index].authors.length>1">{{ appealedPaperList[index].authors[0].name }}&nbsp等</p>
                    </div>
                    <div style="">
                      <strong>举报理由:&nbsp</strong>
                      <p style="display:inline-block">{{ recordList[handleWhichOne].fields.reason}}</p>
                    </div>
                    <div style="">
                      <strong>事务状态:&nbsp</strong>
                      <p style="display:inline-block" v-if="recordList[handleWhichOne].fields.status===0">待处理</p>
                      <p style="display:inline-block" v-else-if="recordList[handleWhichOne].fields.status===1">未通过</p>
                      <p style="display:inline-block" v-else-if="recordList[handleWhichOne].fields.status===2">已通过</p>
                    </div>
                    <div style="" v-if="recordList[handleWhichOne].fields.status===0">
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
                      <span slot="footer" class="dialog-footer" v-if="recordList[handleWhichOne].fields.status===0">
                      <el-button type="success" @click="agreeThisTransaction(2,recordList[handleWhichOne].pk,textarea);dialogVisible = false;textarea='';toGetRecords(3,2)">同意</el-button>
                      <el-button type="danger" @click="refuseThisTransaction(2,recordList[handleWhichOne].pk,textarea);dialogVisible = false;textarea='';toGetRecords(3,2)">拒绝</el-button>
                    </span>
                    </div>
                    <div style="" v-else>
                      <strong>处理回复:&nbsp</strong>
                      <p style="display:inline-block">{{recordList[handleWhichOne].fields.reply}}</p>
                    </div>
                  </el-dialog>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div style="margin-top: 10px;text-align: center" v-if="List.length>0">
          <el-pagination
              layout="prev, pager, next, jumper"
              :page-size="pageSize"
              :pager-count="pageNum"
              :total="List.length"
              @current-change="changePage">
          </el-pagination>
        </div>
      </div>

      <!--5-1 个人申请 全部-->
      <div class="block" v-else-if="selectWhichMenu===9">
        <div class="records">
          <div class="recordList-box" v-for="(item,index) in recordList" :key="index">
            <div style="position: relative;left: 30px;top: 0px">
              <div>
                <div>
                  <div
                      style="height: 40px;width: 40px;display: inline-block;vertical-align: middle;margin-bottom: 10px">
                    <img :src="$store.state.url+userList[index].avatar"
                         style="height: 40px;width: 40px;border-radius: 5px"
                    >
                  </div>
                  <p style="display: inline-block;font-size: 25px;margin-left: 25px">{{ recordList[index].fields.name}}</p>
                  &nbsp发起的
                  <p style="color: #0f62fe;display: inline-block;font-size: 20px;">
                    学者申请</p>
                  <el-button type="text" @click="dialogVisible = true;handleWhichOne=index">
                    <i class='bx bx-dots-horizontal-rounded'
                       style="font-size: 25px;color: black;"></i>
                  </el-button>
                  <el-dialog
                      title="处理事务"
                      :visible.sync="dialogVisible"
                      width="30%">
                    <!--                      :before-close="handleClose"-->
                    <div style="">
                      <strong>申请编号:&nbsp</strong>
                      <p style="display:inline-block">{{ recordList[handleWhichOne].pk }}</p>
                    </div>
                    <div style="">
                      <strong>学者姓名:&nbsp</strong>
                      <p style="display:inline-block">{{ recordList[handleWhichOne].fields.name}}</p>
                    </div>
                    <div style="">
                      <strong>学者邮箱:&nbsp</strong>
                      <p style="display:inline-block">{{userList[handleWhichOne].mail}}</p>
                    </div>
<!--                    <div style="">-->
<!--                      <strong>学者研究领域:&nbsp</strong>-->
<!--                      &lt;!&ndash;                      <p style="display:inline-block;color: #0f62fe;text-decoration: underline;cursor: pointer">{{recordList[handleWhichOne].fields.reported}}</p>&ndash;&gt;-->
<!--                      <p style="display:inline-block;">{{recordList[handleWhichOne].fields.field}}</p>-->
<!--                    </div>-->
                    <div style="">
                      <strong>事务状态:&nbsp</strong>
                      <p style="display:inline-block" v-if="recordList[handleWhichOne].fields.status===0">待处理</p>
                      <p style="display:inline-block" v-else-if="recordList[handleWhichOne].fields.status===1">未通过</p>
                      <p style="display:inline-block" v-else-if="recordList[handleWhichOne].fields.status===2">已通过</p>
                    </div>
                    <div style="" v-if="recordList[handleWhichOne].fields.status===0">
                      <strong>处理回复:&nbsp</strong>
                      <p style="display:inline-block">&nbsp</p>
<!--                      <div style="margin-top: 10px">-->
<!--                        <el-input-->
<!--                            type="textarea"-->
<!--                            :rows="4"-->
<!--                            placeholder=""-->
<!--                            v-model="textarea">-->
<!--                        </el-input>-->
<!--                      </div>-->
                      <span slot="footer" class="dialog-footer" v-if="recordList[handleWhichOne].fields.status===0">
                      <el-button type="success" @click="agreeThisTransaction(4,recordList[handleWhichOne].pk,textarea);dialogVisible = false;textarea='';toGetRecords(5,1)">同意</el-button>
                      <el-button type="danger" @click="refuseThisTransaction(4,recordList[handleWhichOne].pk,textarea);dialogVisible = false;textarea='';toGetRecords(5,1)">拒绝</el-button>
                    </span>
                    </div>
<!--                    <div style="" v-else>-->
<!--                      <strong>处理回复:&nbsp</strong>-->
<!--                      <p style="display:inline-block">{{recordList[handleWhichOne].fields.reply}}</p>-->
<!--                    </div>-->
                  </el-dialog>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div style="margin-top: 10px;text-align: center" v-if="List.length>0">
          <el-pagination
              layout="prev, pager, next, jumper"
              :page-size="pageSize"
              :pager-count="pageNum"
              :total="List.length"
              @current-change="changePage">
          </el-pagination>
        </div>
      </div>

      <!--5-2 个人申请 待处理-->
      <div class="block" v-else-if="selectWhichMenu===10">
        <div class="records">
          <div class="recordList-box" v-for="(item,index) in recordList" :key="index">
            <div style="position: relative;left: 30px;top: 0px">
              <div>
                <div>
                  <div
                      style="height: 40px;width: 40px;display: inline-block;vertical-align: middle;margin-bottom: 10px">
                    <img :src="$store.state.url+userList[index].avatar"
                         style="height: 40px;width: 40px;border-radius: 5px"
                    >
                  </div>
                  <p style="display: inline-block;font-size: 25px;margin-left: 25px">{{ recordList[index].fields.name}}</p>
                  &nbsp发起的关于
                  <p style="color: #0f62fe;display: inline-block;font-size: 20px;">
                    学者申请</p>
                  <el-button type="text" @click="dialogVisible = true;handleWhichOne=index">
                    <i class='bx bx-dots-horizontal-rounded'
                       style="font-size: 25px;color: black;"></i>
                  </el-button>
                  <el-dialog
                      title="处理事务"
                      :visible.sync="dialogVisible"
                      width="30%">
                    <!--                      :before-close="handleClose"-->
                    <div style="">
                      <strong>申请编号:&nbsp</strong>
                      <p style="display:inline-block">{{ recordList[handleWhichOne].pk }}</p>
                    </div>
                    <div style="">
                      <strong>学者姓名:&nbsp</strong>
                      <p style="display:inline-block">{{ recordList[handleWhichOne].fields.name}}</p>
                    </div>
                    <div style="">
                      <strong>学者邮箱:&nbsp</strong>
                      <p style="display:inline-block">{{userList[handleWhichOne].mail}}</p>
                    </div>
                    <div style="">
                      <strong>事务状态:&nbsp</strong>
                      <p style="display:inline-block" v-if="recordList[handleWhichOne].fields.status===0">待处理</p>
                      <p style="display:inline-block" v-else-if="recordList[handleWhichOne].fields.status===1">未通过</p>
                      <p style="display:inline-block" v-else-if="recordList[handleWhichOne].fields.status===2">已通过</p>
                    </div>
                    <div style="" v-if="recordList[handleWhichOne].fields.status===0">
                      <strong>处理回复:&nbsp</strong>
                      <p style="display:inline-block">&nbsp</p>
<!--                      <div style="margin-top: 10px">-->
<!--                        <el-input-->
<!--                            type="textarea"-->
<!--                            :rows="4"-->
<!--                            placeholder=""-->
<!--                            v-model="textarea">-->
<!--                        </el-input>-->
<!--                      </div>-->
                      <span slot="footer" class="dialog-footer" v-if="recordList[handleWhichOne].fields.status===0">
                      <el-button type="success" @click="agreeThisTransaction(4,recordList[handleWhichOne].pk,textarea);dialogVisible = false;textarea='';toGetRecords(5,2)">同意</el-button>
                      <el-button type="danger" @click="refuseThisTransaction(4,recordList[handleWhichOne].pk,textarea);dialogVisible = false;textarea='';toGetRecords(5,2)">拒绝</el-button>
                    </span>
                    </div>
<!--                    <div style="" v-else>-->
<!--                      <strong>处理回复:&nbsp</strong>-->
<!--                      <p style="display:inline-block">{{recordList[handleWhichOne].fields.reply}}</p>-->
<!--                    </div>-->
                  </el-dialog>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div style="margin-top: 10px;text-align: center" v-if="List.length>0">
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
import qs from "qs";

export default {
  name: "ScholarsDetails",
  data() {
    return {
      tempAvatar: "img/home/avatar1.jpg",
      selectWhichMenu:0,
      handleWhichOne:0,
      textarea: '',
      dialogVisible: false,
      transactionType: "申诉",
      input: '',
      entryList: [],
      visible: false,
      currentInstitutional: 0,
      List:[],
      recordList: [],
      //发起人
      userList:[],
      //被举报/被申诉/被申请的对象
      reportedCommentList:[],
      reportedScholarList:[],
      appealedPaperList:[],
      requestedScholarList:[],



      // 每页显示数量
      pageSize: 6,
      // 共几页
      pageNum: 0,
      // 当前显示的数据
      dataShow: "",
      // 默认当前显示第一页
      currentPage: 1
    }
  },
  created() {
  },
  methods: {
    toGetRecords(x,y){
      const tempthis = this;
      if(x===1&&y===1){
        tempthis.getAllAccusationRecords(1)
        tempthis.selectWhichMenu=1

      }else if(x===1&&y===2){
        tempthis.getPendingAccusationRecords(1)
        tempthis.selectWhichMenu=2

      }else if(x===2&&y===1){
        this.getAllAccusationRecords(2)
        tempthis.selectWhichMenu=3

      }else if(x===2&&y===2){
        tempthis.getPendingAccusationRecords(2)
        tempthis.selectWhichMenu=4

      // }else if(x===3&&y===1){
      //   tempthis.getAllAppealRecords()
      //   tempthis.selectWhichMenu=5
      //
      //
      //
      // }else if(x===3&&y===2){
      //   tempthis.getPendingAppealRecords()
      //   tempthis.selectWhichMenu=6

      }else if(x===4&&y===1){
        //tempthis.getAllInstitutionApplication()
        //tempthis.selectWhichMenu=7

      }else if(x===4&&y===2){
        //tempthis.getPendingInstitutionApplication()
        //tempthis.selectWhichMenu=8

      }else if(x===5&&y===1){
        tempthis.getAllScholarApplication()
        tempthis.selectWhichMenu=9

      }else if(x===5&&y===2){
        tempthis.getPendingScholarApplication()
        tempthis.selectWhichMenu=10
        console.log("users:")
        console.log(tempthis.userList)
        console.log("shows")
        console.log(tempthis.recordList)
      }
    },
    changePage(currentPage) {
      let i,j;
      let length = this.List.length
      this.recordList = [];
      for (i = (currentPage - 1) * 6,j=0; i < length && j <  6; i++,j++) {
        this.recordList[j]=this.List[i];
      }
      //console.log(this.recordList)
    },
    agreeThisTransaction(type,id,reply) {
      let params = {
        type:type,
        id:id,
        agreeOrRefuse:"True",
        reply:reply
      }
      this.axios({
        method: 'post',
        url: 'http://139.9.134.209:8000/api/relation/processRequest',
        data: qs.stringify(params),
        headers: {
          jwt: JSON.parse(sessionStorage.getItem('baseInfo')).token,
        },
      })
          .then(res => {
            console.log(res)
          })
          .catch(err => {
            console.log(err);
          })
    },
    refuseThisTransaction(type,id,reply) {
      let params = {
        type:type,
        id:id,
        agreeOrRefuse:"False",
        reply:reply
      }
      this.axios({
        method: 'post',
        url: 'http://139.9.134.209:8000/api/relation/processRequest',
        data: qs.stringify(params),
        headers: {
          jwt: JSON.parse(sessionStorage.getItem('baseInfo')).token,
        },
      })
          .then(res => {
            console.log(res)
          })
          .catch(err => {
            console.log(err);
          })
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {
          });
    },
    getAllAccusationRecords(type) {
      //type = 1: 对评论的举报
      //type = 2: 对学者的举报
      const tempthis = this;
      this.axios({
        method: 'get',
        url: 'http://139.9.134.209:8000/api/relation/getAllAccusationRecords',
        headers: {
          jwt: JSON.parse(sessionStorage.getItem('baseInfo')).token,
        },
      })
          .then(res => {
            if(type===1){
              tempthis.List = res.data[0]
              //console.log(tempthis.List)
              var i = 0;
              i = Math.ceil(tempthis.List.length / 6);
              tempthis.pageNum = i;
              tempthis.changePage(1);
              tempthis.transactionType="举报";
              console.log(tempthis.recordList.length)
              for(let i=0;i<tempthis.recordList.length;i++){
                tempthis.getUserInfoToShow(tempthis.recordList[i].fields.report,i)
                tempthis.getReportedCommentInfoToShow(tempthis.recordList[i].fields.reported,i)
              }
            }else if(type===2){
              tempthis.List = res.data[1]
              var i = 0;
              i = Math.ceil(tempthis.List.length / 6);
              tempthis.pageNum = i;
              tempthis.changePage(1);
              tempthis.transactionType="举报";
              console.log(tempthis.recordList)
              for(let i=0;i<tempthis.recordList.length;i++){
                tempthis.getUserInfoToShow(tempthis.recordList[i].fields.user,i)
                tempthis.getReportedScholarInfoToShow(tempthis.recordList[i].fields.scholar,i)
              }

            }
          })
          .catch(err => {
            console.log(err);
          })
    },
    getPendingAccusationRecords(type) {
      //type = 1: 对评论的举报
      //type = 2: 对学者的举报
      const tempthis = this;
      this.axios({
        method: 'get',
        url: 'http://139.9.134.209:8000/api/relation/getPendingAccusationRecords',
        headers: {
          jwt: JSON.parse(sessionStorage.getItem('baseInfo')).token,
        },
      })
          .then(res => {
            if(type===1){
              tempthis.List = res.data[0]
              //console.log(tempthis.List)
              var i = 0;
              i = Math.ceil(tempthis.List.length / 6);
              tempthis.pageNum = i;
              tempthis.changePage(1);
              tempthis.transactionType="举报";
              console.log(tempthis.recordList.length)
              for(let i=0;i<tempthis.recordList.length;i++){
                tempthis.getUserInfoToShow(tempthis.recordList[i].fields.report,i)
                tempthis.getReportedCommentInfoToShow(tempthis.recordList[i].fields.reported,i)
              }
              console.log(tempthis.reportedCommentList)
            }else if(type===2){
              console.log(res)
              tempthis.List = res.data[1]
              //console.log(tempthis.List)
              var i = 0;
              i = Math.ceil(tempthis.List.length / 6);
              tempthis.pageNum = i;
              tempthis.changePage(1);
              tempthis.transactionType="举报";
            }
            for(let i=0;i<tempthis.recordList.length;i++){
              tempthis.getUserInfoToShow(tempthis.recordList[i].fields.user,i)
              tempthis.getReportedScholarInfoToShow(tempthis.recordList[i].fields.scholar,i)
            }

          })
          .catch(err => {
            console.log(err);
          })
    },
    getAllAppealRecords(){
      const tempthis = this;
      this.axios({
        method: 'get',
        url: 'http://139.9.134.209:8000/api/relation/getAllAppealRecords',
        headers: {
          jwt: JSON.parse(sessionStorage.getItem('baseInfo')).token,
        },
      })
          .then(res => {
              tempthis.List = res.data[0]
              //console.log(tempthis.List)
              var i = 0;
              i = Math.ceil(tempthis.List.length / 6);
              tempthis.pageNum = i;
              tempthis.changePage(1);
              tempthis.transactionType="申诉";
              console.log(11111)
              console.log(tempthis.recordList)
              for(let i=0;i<tempthis.recordList.length;i++){
                tempthis.getUserInfoToShow(tempthis.recordList[i].fields.user,i)
                tempthis.getAppealedPaperInfoToShow(tempthis.recordList[i].fields.paper_id,i)
              }
              console.log(tempthis.appealedPaperList)
          })
          .catch(err => {
            console.log(err);
          })
    },
    getPendingAppealRecords(){
      const tempthis = this;
      this.axios({
        method: 'get',
        url: 'http://139.9.134.209:8000/api/relation/getPendingAppealRecords',
        headers: {
          jwt: JSON.parse(sessionStorage.getItem('baseInfo')).token,
        },
      })
          .then(res => {
            tempthis.List = res.data[0]
            //console.log(tempthis.List)
            var i = 0;
            i = Math.ceil(tempthis.List.length / 6);
            tempthis.pageNum = i;
            tempthis.changePage(1);
            tempthis.transactionType="申诉";
            for(let i=0;i<tempthis.recordList.length;i++){
              tempthis.getUserInfoToShow(tempthis.recordList[i].fields.user,i)
              tempthis.getAppealedPaperInfoToShow(tempthis.recordList[i].fields.paper_id,i)
            }
            console.log(tempthis.appealedPaperList)
          })
          .catch(err => {
            console.log(err);
          })
    },
    getAllInstitutionApplication(){
      const tempthis = this;
      this.axios({
        method: 'get',
        url: 'http://139.9.134.209:8000/api/relation/getAllInstitutionApplication',
        headers: {
          jwt: JSON.parse(sessionStorage.getItem('baseInfo')).token,
        },
      })
          .then(res => {
            tempthis.List = res.data[0]
            var i = 0;
            i = Math.ceil(tempthis.List.length / 6);
            tempthis.pageNum = i;
            tempthis.changePage(1);
            tempthis.transactionType="申请";
            console.log(tempthis.recordList)

          })
          .catch(err => {
            console.log(err);
          })
    },
    getPendingInstitutionApplication(){
      const tempthis = this;
      this.axios({
        method: 'get',
        url: 'http://139.9.134.209:8000/api/relation/getPendingInstitutionApplication',
        headers: {
          jwt: JSON.parse(sessionStorage.getItem('baseInfo')).token,
        },
      })
          .then(res => {
            tempthis.List = res.data[0]
            var i = 0;
            i = Math.ceil(tempthis.List.length / 6);
            tempthis.pageNum = i;
            tempthis.changePage(1);
            tempthis.transactionType="申请";
            console.log(tempthis.recordList)

          })
          .catch(err => {
            console.log(err);
          })
    },
    getAllScholarApplication(){
      const tempthis = this;
      this.axios({
        method: 'get',
        url: 'http://139.9.134.209:8000/api/relation/getAllScholarApplication',
        headers: {
          jwt: JSON.parse(sessionStorage.getItem('baseInfo')).token,
        },
      })
          .then(res => {
            console.log(res)
            tempthis.List = res.data[0]
            var i = 0;
            i = Math.ceil(tempthis.List.length / 6);
            tempthis.pageNum = i;
            tempthis.changePage(1);
            tempthis.transactionType="申请";
            for(let i=0;i<tempthis.recordList.length;i++){
              tempthis.getUserInfoToShow(tempthis.recordList[i].fields.user,i)
              tempthis.requestedScholarList[i]=tempthis.recordList[i].fields;
            }
          })
          .catch(err => {
            console.log(err);
          })
    },
    getPendingScholarApplication(){
      const tempthis = this;
      this.axios({
        method: 'get',
        url: 'http://139.9.134.209:8000/api/relation/getPendingScholarApplication',
        headers: {
          jwt: JSON.parse(sessionStorage.getItem('baseInfo')).token,
        },
      })
          .then(res => {
            console.log(res)
            tempthis.List = res.data[0]
            var i = 0;
            i = Math.ceil(tempthis.List.length / 6);
            tempthis.pageNum = i;
            tempthis.changePage(1);
            tempthis.transactionType="申请";
            for(let i=0;i<tempthis.recordList.length;i++){
              tempthis.getUserInfoToShow(tempthis.recordList[i].fields.user,i)
              tempthis.requestedScholarList[i]=tempthis.recordList[i];
            }
          })
          .catch(err => {
            console.log(err);
          })},
    getUserInfoToShow(userId,index) {
      const tempthis = this;
      let params = {
        field_id:userId
      }
      this.axios({
        method: 'post',
        url: 'http://139.9.134.209:8000/api/serialization/user/',
        data: qs.stringify(params),
      })
          .then(res => {
            tempthis.userList[index]=res.data
          })
          .catch(err => {
            console.log(err);
          })
    },
    getReportedCommentInfoToShow(commentId,index) {
      const tempthis = this;
      let params = {
        field_id:commentId
      }
      this.axios({
        method: 'post',
        url: 'http://139.9.134.209:8000/api/serialization/comment/',
        data: qs.stringify(params),
      })
          .then(res => {
            tempthis.reportedCommentList[index]=res.data
          })
          .catch(err => {
            console.log(err);
          })
    },
    getReportedScholarInfoToShow(scholarId,index) {
      const tempthis = this;
      let params = {
        field_id:scholarId
      }
      this.axios({
        method: 'post',
        url: 'http://139.9.134.209:8000/api/serialization/scholar/',
        data: qs.stringify(params),
      })
          .then(res => {
            tempthis.reportedScholarList[index]=res.data
            console.log(tempthis.reportedScholarList)
          })
          .catch(err => {
            console.log(err);
          })
    },
    getAppealedPaperInfoToShow(paperId,index) {
      const tempthis = this;
      let formData = new FormData();
      formData.append('id',"55d06634696322190568b85f")
      //这里，实际用的时候是formData.append('id',paperId) ！！！
      this.axios({
        method: 'post',
        url: 'http://139.9.134.209:8000/api/publication/getPaperById/',
        data: formData
      })
          .then(res => {
            console.log(res)
            tempthis.appealedPaperList[index] = res.data.paper
          })
          .catch(err => {
            console.log(err);
          })
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