<template>
    <div class="NS">
        <div class="left">
            <div class="name">
                <div class="blackBox">
                    <img :src="baseInfo.avatar" class="image">
                    <div class="userName" style="position: absolute; text-align: center;
                     font-size: 120%; display: inline-block; left: 85px; right: 0;
                     top: 40px; color: white; font-weight: bold">{{this.userName}}</div>
                </div>
                <div class="option-box" v-if="accreditation===1 && isMyself===false">
                    <div>
                        <div class="follow" v-if="this.follow===0" style="color: #333333" @click="focus(scholar_id)">
                            <i class="bx bxs-user-plus"></i>
                            <div class="fo" style="position: relative; display: inline-block; bottom: 5px;
                            font-size: 15px">关注</div>
                        </div>
                        <a class="follow" v-else style="color: #2196f3" title="取消关注" @click="unFocus(scholar_id)">
                            <i class="bx bxs-user-plus"></i>
                            <div style="position: relative; display: inline-block; bottom: 5px;
                            font-size: 15px">已关注</div>
                        </a>
                    </div>
                    <div>
                        <a class="claim" v-if="this.accreditation===0" style="color: #333333; cursor: pointer"
                           title="立即认领" @click="toAdmitScholar">
                            <i class="bx bxs-award"></i>
                            <div class="cl" style="position: relative; display: inline-block; bottom: 5px;
                            font-size: 15px;" >未认领</div>
                        </a>
                        <div class="claim" v-else style="color: #ffcb74">
                            <i class="bx bxs-award"></i>
                            <div style="position: relative; display: inline-block; bottom: 5px;
                            font-size: 15px;">已认领</div>
                        </div>
                    </div>
                    <div>
                        <div class="message" @click="replyVisible = true">
                            <i class="bx bxs-chat"></i>
                            <div style="position: relative; display: inline-block; font-size: 15px; bottom: 5px;">私信</div>
                        </div>
                    </div>

                </div>
                <div class="option-box" v-else>
                    <div>
                        <a class="claim" v-if="this.accreditation===0" style="color: #333333; cursor: pointer"
                           title="立即认领" @click="toAdmitScholar">
                            <i class="bx bxs-award"></i>
                            <div class="cl" style="position: relative; display: inline-block; bottom: 5px;
                            font-size: 15px;" >未认领</div>
                        </a>
                        <div class="claim" v-else style="color: #ffcb74">
                            <i class="bx bxs-award"></i>
                            <div style="position: relative; display: inline-block; bottom: 5px;
                            font-size: 15px;">已认领</div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="introduction">
                <i class="bx bxs-user-pin"></i>
                <div class="intro">个人简介</div>
                <div class="line"></div>
                <div class="detail">{{introduction}}</div>
            </div>
            <div class="name">
                <i class='bx bxs-thermometer'></i>
                <div class="heat">热度</div>
                <div class="line"></div>
                <div style="position: absolute; text-align: center; width: 100%; top: 70px;
                 font-size: 30px; color: #C34A36">{{heat}}</div>
            </div>
            <div class="name">
                <i class='bx bx-globe'></i>
                <div class="heat">门户访问量</div>
                <div class="line2"></div>
                <div style="position: absolute; text-align: center; width: 100%; top: 70px;
                 font-size: 30px; color: #ffc75f">{{visitors}}</div>
            </div>
        </div>
        <div class="middle">
            <div class="top" style="position: relative; height: 60px">
                <i class='bx bxs-graduation'></i>
                <div style="position: absolute; left: 75px; font-size: 25px; font-weight: bold; top: 5px">学术成果</div>
                <div class="line" style="margin-top: 10px"></div>
            </div>
            <div style="position: relative; height: 30px">
                <div style="position: absolute; left: 20px">排序方式：</div>
                <button class="sort" @click="sortByTime(0)" v-if="sort===0" style="color: white;
                background: #2196f3;">按发表时间排序</button>
                <button class="sort" @click="sortByTime(0)" v-else >按发表时间排序</button>
                <button class="sort" style="left: 220px" @click="sortByTime(1)" v-if="sort===0">按引用量排序</button>
                <button class="sort" @click="sortByTime(1)" v-else style="left: 220px; color: white;
                background: #2196f3;">按引用量排序</button>
            </div>
            <div style="overflow: auto; position: absolute; width: 100%; height: 660px">
                <div class="contents" v-for="(item) in paperList">
                    <div style="display: flex; width: 98%; height: auto">
                        <i class='bx bxs-bookmark-alt'></i>
                        <div class="title" @click="$router.push('/searchDetails/'+item.id)">{{item.title}}</div>
                    </div>
                    <div style="position: relative; display: flex; flex-wrap: wrap; list-style: none; line-height: 15px;
                    margin-left: 25px; align-items: center;">
                        <div class="author" v-for="(tItem) in item.authors" >
                            <span v-if="tItem.id" @click="temp(tItem.id)">{{tItem.name}}</span>
                            <span v-else @click="$message('暂无该作者信息')">{{tItem.name}}</span>
                        </div>
                        <div style="margin-left: auto">
                            <div class="year">年份: {{item.year}}</div>
                            <i class='bx bx-link'></i>
                            <div class="citation">被引用次数: {{item.n_citation}}</div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
        <div class="right">
            <div class="top" style="position: relative; height: 60px">
                <i class='bx bxs-contact'></i>
                <div style="position: absolute; left: 75px; font-size: 25px; font-weight: bold; top: 5px">学者关系网</div>
                <div class="line" style="margin-top: 10px"></div>
            </div>
            <div style="position: absolute; overflow: auto; width: 100%; height: 690px">
                <div class="scholar" v-for="(item) in scholarList" v-if="item.count!==0">
                    <div>
                        <img src="../assets/img/home/avatar.png" class="image"
                             style="height: 60px; width: 60px; margin: 5px;
                             padding: 0; border-radius: 8px">
                        <div class="right-name" style="position: absolute; left: 70px; margin-top: 10px;cursor: pointer;
                    font-weight: bold">
                            <span v-if="item.id" @click="switchScholar(item.id)">{{item.name}}</span>
                            <span v-else @click="$message('暂无该作者信息')">{{item.name}}</span>
                        </div>
                        <div style="position: absolute; left: 70px; font-size: 10px; bottom: 10px">合作论文数：{{item.count}}</div>
                    </div>

                </div>
            </div>

        </div>

        <div class="question-btn" @click="dialogVisible = true">

        <el-dialog append-to-body title="发送私信" :visible="replyVisible" :center="isCenter" width="30%">
          <el-input
              style="z-index: 2"
              type="textarea"
              maxlength="500"
              placeholder="请输入内容"
              v-model="msg_send.content">
          </el-input>
          <div slot="footer" class="dialog-footer">
            <el-button @click="replyVisible = false; msg_send.content=''">取 消</el-button>
            <el-button type="primary" plain @click="sendMsg">确 定</el-button>
          </div>
        </el-dialog>
        <div class="question-btn">

          <div class="question-icon" title="举报冒领"><i class='bx bxs-error-circle' ></i></div>
          <div class="question-sub-item">
          </div>
        </div>
        <el-dialog append-to-body
                title="举报学者"
                :visible.sync="dialogVisible"
                width="40%"
                >
            <el-input
                    type="textarea"
                    :rows="5"
                    placeholder="请输入内容"
                    v-model="textarea">
            </el-input>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="complain(textarea)">确 定</el-button>
            </span>
        </el-dialog>
    </div>

    </div>

</template>

<script>
    import qs from 'qs';
    export default {
        name: "NS",
        data() {
            return {
                textarea: '',
                dialogVisible: false,
                uid: '540888a2dabfae92b4247e94',
                user_id: null,
                userName: '',
                baseInfo: {
                    userName: '王海涛',
                    avatar: this.$store.state.url + 'default.png',
                    user_id: null,
                    scholar_id: null,
                },
                coWorkers: [],//记录学者关系网里的基本信息
                sort: 0, //0表示按时间排序，1表示按引用量排序
                follow: 0, //1表示已关注，0表示未关注
                accreditation: 0, //1表示已认证，0表示未认证
                introduction:'这个人很懒，什么都没有写……',
                heat: 0,
                visitors: 0,
                paperList: [],
                scholarList: [],
                // paper_id: '',
                scholar_id: 0,
                isMyself: false,//0表示不是自己，1表示是自己
                replyVisible: false,
                isCenter: true,
                msg_send: {
                  owner_id: 1,
                  content: '',
                },

            }
        },
        methods: {
            switchScholar(author_id){

                console.log(author_id)
              this.getCoworkers(author_id)
              this.getBaseInfo(author_id)
            },
            complain(textarea){
                this.$axios({
                    method: 'post',
                    url: 'http://139.9.134.209:8000/api/user/complainSochlar/',
                    data: qs.stringify({
                        scholar_id: this.scholar_id,
                        reason: textarea,
                    }),
                    headers: {
                        jwt: JSON.parse(sessionStorage.getItem('baseInfo')).token,
                    },
                }).then(res => {
                    if(res.data.msg==='success'){
                        this.$message({
                            type: 'success',
                            message: '举报成功！请等待审核'
                        })
                    }
                    else {
                        this.$message({
                            type: 'error',
                            message: '举报失败！'
                        })
                    }
                }).catch(err => {
                    this.$message({
                        type: 'error',
                        message: '举报失败！'
                    })
                })
                this.dialogVisible = false;
            },
            unFocus(sid){
                this.open(sid);
            },
            open(sid) {
                this.$confirm('确认取消关注?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    let params = {
                        // user_id: uid,
                        aim_id: sid,
                    }
                    this.$axios({
                        method: 'post',
                        url: 'http://139.9.134.209:8000/api/relation/unFocus',
                        data: params,
                        headers: {
                            jwt: JSON.parse(sessionStorage.getItem('baseInfo')).token,
                        },
                    }).then(res => {
                        console.log(res)
                        if(res.data.errno===0){
                            this.follow = 0;
                            this.$message({
                                type: 'success',
                                message: '操作成功!'
                            });
                        }
                    }).catch(err => {
                        console.log(err)
                    })

                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            focus(uid){
                console.log('scholar_id: '+uid)
                let params = {
                    // user_id: uid,
                    aim_id: uid,
                }
                this.$axios({
                    method: 'post',
                    url: 'http://139.9.134.209:8000/api/relation/focus',
                    data: params,
                    headers: {
                        jwt: JSON.parse(sessionStorage.getItem('baseInfo')).token,
                    },
                })
                    .then(res => {
                        console.log(res.data);
                        if(res.data.errno===0){
                            this.follow = 1;
                        }

                    })
                    .catch(err => {
                        console.log(err);
                    })
            },
            temp(id){
                this.uid = id;
                this.getCoworkers(id);
            },
            sortByTime(n){
                // console.log('uid: '+this.uid)
                this.sort = n;
                if(n==0){
                    this.paperList.sort(function (a, b) {
                        return b.year - a.year;
                    })
                }
                else {
                    this.paperList.sort(function (a, b) {
                        return b.n_citation - a.n_citation;
                    })
                }
            },
            coWorkerAvatar(aid){
                this.$axios({
                    method: 'get',
                    url: this.$store.state.address + 'api/ScholarPortal/GetBaseInfo?author_id=' + aid,
                    // url: this.$store.state.address + 'api/ScholarPortal/GetBaseInfo/?pid=' + '1',
                    headers: {
                        jwt: JSON.parse(sessionStorage.getItem('baseInfo')).token,
                    },
                }).then(res => {
                    console.log(res)
                    console.log('success: '+ res.data.user_id)
                    if(res.data.errno===0){
                        this.coGetAvatar(res.data.user_id)
                    }
                    else {
                        this.coWorkers.append(this.$store.state.url + 'default.png');
                    }
                }).catch(err => {
                    console.log(err)
                })
            },
            getCoworkers(uid){
                this.axios({
                    method: 'post',
                    url: this.$store.state.address+'api/author/getAuthor/',
                    data: qs.stringify({
                        id: uid
                    })
                }).then(res => {
                    console.log(res.data)
                    this.scholarList = res.data.coworkers;

                    // for(scholar in this.scholarList){
                    //     console.log(scholar)
                    //     // if(scholar.id!=null){
                    //     //     console.log('scholar.id: '+scholar.id )
                    //     //     // this.coWorkerAvatar(scholar.id);
                    //     // }
                    // }
                    // for(let i=0; i<this.scholarList.length; i++){
                    //     let id = this.scholarList[i].id;
                    //     if(id != null){
                    //         // this.coWorkerAvatar(id);
                    //     }
                    //     else {
                    //         this.coWorkers.append(this.$store.state.url + 'default.png');
                    //     }
                    // }
                    // console.log('this is coWorkers\' avatar' );
                    // console.log(this.coWorkers);
                    this.paperList = res.data.data.pubs;
                    this.userName = res.data.data.name;
                    // this.coID = res.data.
                    this.sortByTime(0)
                }).catch(err => {
                    // console.log(err)
                })
            },
            Random(min, max) {
                return Math.round(Math.random() * (max - min)) + min;
            },
            getBaseInfo(uid){
                console.log(JSON.parse(sessionStorage.getItem('baseInfo')).token);
                this.axios({
                    method: 'get',
                    url: this.$store.state.address + 'api/ScholarPortal/GetBaseInfo?author_id=' + uid,
                    // url: this.$store.state.address + 'api/ScholarPortal/GetBaseInfo/?pid=' + '1',
                    headers: {
                        jwt: JSON.parse(sessionStorage.getItem('baseInfo')).token,
                    },
                }).then(res => {
                    console.log(res)
                    this.scholar_id = res.data.scholar_id;
                    this.isMyself  = res.data.is_mine;
                    if(res.data.Hotpoint==null){
                        this.heat = 0;
                    }
                    else {
                        this.heat = res.data.Hotpoint
                    }
                    if(res.data.followed===true){
                        this.follow = 1;
                    }
                    if(res.data.visitors==null){
                        this.visitors = 0
                    }

                    else{
                        this.visitors = res.data.visitors
                    }
                    if(res.data.errno===1){
                        this.accreditation = 0;
                        this.visitors = this.Random(5,10);
                        this.heat = this.Random(10000,50000);
                    }
                    else{
                        this.accreditation = 1;
                        console.log('user_id: '+ res.data.user_id)
                        this.getAvatar(res.data.user_id)
                    }
                    if(res.data.scholar_id !== null){
                      this.baseInfo.scholar_id = res.data.scholar_id
                    }
                    if(res.data.user_id !== null){
                      this.baseInfo.user_id = res.data.user_id
                    }

                }).catch(err =>{
                    console.log(err)
                })

            },
            toAdmitScholar() {
            this.$router.push({
              path: '/admitScholar',
              query: {
                author_id: this.uid,
                scholar_id: this.baseInfo.scholar_id,
              }
            })
          },
            sendMsg() {
            this.msg_send.owner_id = this.baseInfo.user_id

            console.log(this.msg_send);
            if(this.msg_send.content === '') {
              this.$message({
                type: 'error',
                showClose: true,
                message: '内容不能为空'
              })
              return;
            }
            let params = new FormData();
            params.append("owner_id", this.msg_send.owner_id);
            params.append("content", this.msg_send.content);

            this.axios({
              headers: {
                jwt: JSON.parse(sessionStorage.getItem('baseInfo')).token,
              },
              method: 'post',
              url: 'http://139.9.134.209:8000/api/MessageCenter/sendMsg/',
              data: params,
            })
                .then(res => {
                  this.dis_msg_list = [];
                  // if(this.isActive1) { //当前处于系统消息列表
                  //   this.getMsgPlm(this.uid);
                  // }
                  // else if(this.isActive2) { //当前处于收到的私信列表
                  //   this.getMsgRec(this.uid);
                  // }
                  // else if(this.isActive3) { //当前处于发送的私信列表
                  //   this.getMsgSend(this.uid);
                  // }

                  if(res.data.errno === 0) {
                    this.$message({
                      type: 'success',
                      showClose: true,
                      message: '发送成功'
                    })
                  }

                })
                .catch(err => {
                  console.log(err)
                })
            this.replyVisible = false;
            this.msg_send.content = '';
          },
            coGetAvatar(user_id){
              //获取学者关系网里的头像
                let formData = new FormData();
                formData.append('field_id',user_id)
                // console.log('user_id: ' + user_id)
                this.$axios({
                    method: 'post',
                    url: this.$store.state.address + 'api/serialization/user/',
                    data: formData,
                }).then(res => {
                    this.coWorkers.append(this.$store.state.url + res.data.avatar);
                }).catch(err => {
                    console.log(err)
                })
            },
            getAvatar(user_id){
                let formData = new FormData();
                formData.append('field_id',user_id)
                // console.log('user_id: ' + user_id)
                this.$axios({
                    method: 'post',
                    url: this.$store.state.address + 'api/serialization/user/',
                    data: formData,
                }).then(res => {

                    this.baseInfo.avatar = this.$store.state.url + res.data.avatar;
                    console.log("avatar: "+this.baseInfo.avatar)
                    // this.baseInfo.avatar = res.data.avatar;
                    // if(this.baseInfo.avatar === null) {
                    //     this.baseInfo.avatar = 'img/home/no-avatar.png'
                    // }
                }).catch(err => {
                    console.log(err)
                })
            }
        },
        created() {
            // console.log(this.$route.query.id)
            this.uid = this.$route.query.id;

            this.getCoworkers(this.uid)
            this.getBaseInfo(this.uid)
        },

    }
</script>

<style scoped>
    .NS {
      width: 100%;
      /*min-width: 1450px;*/
    }

    .left {
        position: relative;
        display: inline-block;
        width: 24%;
        /*min-width: 330px;*/
        margin: 10px;
        height: 760px;
        /*background-color: #4DA5FF;*/
    }
    .middle {
        position: relative;
        display: inline-block;
        width: 45%;
        /*min-width: 680px;*/
        height: 760px;
        margin: 10px;
        /*background-color: #00CA97;*/
        border-radius: 5px;
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.2);
    }
    .right {
        position: relative;
        display: inline-block;
        width: 24%;
        /*min-width: 330px;*/
        height: 760px;
        margin: 10px;
        /*margin-top: 0;*/
        border-radius: 5px;
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.2);
    }
    /* 设置滚动条的样式 */
    ::-webkit-scrollbar {
        width:10px;
    }
    /* 滚动槽 */
    ::-webkit-scrollbar-track {
        /*-webkit-box-shadow:inset006pxrgba(0,0,0,0.3);*/
        border-radius:10px;
    }
    /* 滚动条滑块 */
    ::-webkit-scrollbar-thumb {
        border-radius:10px;
        background:rgba(0,0,0,0.1);
        /*-webkit-box-shadow:inset006pxrgba(0,0,0,0.5);*/
    }
    .middle .title {
        position: relative;
        text-decoration: none;
        display: inline-block;
        margin-bottom: 5px;
        margin-left: 5px;
        margin-top: 5px;
        /*left: 25px;*/
        font-size: 15px;
        color: #4DA5FF;
        cursor: pointer;
    }
    .middle .title:hover {
        position: relative;
        text-decoration: underline;
        margin-left: 5px;
        margin-top: 5px;
        /*left: 25px;*/
        font-size: 15px;
        color: #4DA5FF;
        cursor: pointer;
    }
    .right .bxs-contact {
        position: absolute;
        /*margin-top: 10px;*/
        margin-left: 20px;
        font-size: 50px;
        color: #845ec2;
    }
    .right .scholar {
        position: relative;
        border-radius: 5px;
        box-shadow: 0px 0px 5px rgba(0,0,0,0.3);
        height: 70px;
        width: 93%;
        margin: 10px auto;
        /*overflow: auto;*/
        /*overflow: hidden;*/
    }
    .bxs-graduation {
        position: absolute;
        /*margin-top: 10px;*/
        margin-left: 20px;
        font-size: 50px;
        color: #FBBD08;
    }
    .contents .bx-link {
        position: relative;
        display: inline-block;
        font-size: 13px;
        margin-right: 5px;
    }
    .contents .year {
        position: relative;
        display: inline-block;
        /*align-self: cross-end;*/
        margin-right: 10px;
        font-size: 13px;
    }
    .contents .citation {
        position: relative;
        display: inline-block;
        /*align-self: cross-end;*/
        margin-right: 10px;
        font-size: 13px;
    }
    .middle .bxs-bookmark-alt {
        /*position: relative;*/
        /*display: inline-block;*/
        font-size: 20px;
        margin: 5px 5px 10px 10px;
        color: #FBBD08;
    }
    .middle .author {
        /*position: relative;*/
        /*display: inline-block;*/
        margin-left: 15px;
        font-size: 10px;
        color: #24bf24;
        cursor: pointer;
    }
    .middle .author:hover {
        color: #27ae60;
        font-weight: bold;
    }
    .middle .sort {
        position: absolute;
        background-color: white;
        color: #0f62fe;
        border: 1px solid #0f62fe;
        left: 100px;
        transition: .5s;
        /*border-radius: 5px;*/
    }
    .middle .sort:hover {
        color: white;
        background: #2196f3;
    }
    /*.middle .sort:focus {*/
    /*    color: white;*/
    /*    background: #2196f3;*/
    /*}*/
    .middle .contents {
        position: relative;
        /*display: flex;*/
        /*!*flex-wrap: wrap;*!*/
        /*flex-direction: row;*/
        height: auto;
        width: 95%;
        padding-bottom: 5px;
        margin: 10px auto;
        border-radius: 10px;
        box-shadow: 0px 0px 5px rgba(0,0,0,0.3);
    }

    .left .option-box {
        position: absolute;
        width: 100%;
        display: flex;
        justify-content: space-around;
    }
    .left .name {
        position: relative;
        background-color: white;
        width: 100%;
        height: 145px;
        border-radius: 10px;
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.2);
        margin-bottom: 10px;
    }
    .left .introduction {
        position: relative;
        background-color: white;
        width: 100%;
        height: 170px;
        border-radius: 10px;
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.2);
        margin-bottom: 10px;
    }
    .name .bxs-user-plus {
        position: relative;
        display: inline-block;
        font-size: 30px;
        margin-top: 7px;
        /*margin-left: 15px;*/
        /*color: #333333;*/
    }

    .introduction .bxs-user-pin {
        position: absolute;
        margin-top: 15px;
        margin-left: 20px;
        font-size: 30px;
        color: #0089ba;
    }
    .introduction .intro {
        position: absolute;
        margin-top: 13px;
        left: 55px;
        font-size: 20px;
        font-weight: bold;
    }
    .line {
        position: relative;
        width: 80%;
        background-color: #0081cf;
        margin-left: 20px;
        height: 1px;
        top: 48px;
    }
    .introduction .detail {
        position: absolute;
        font-size: 10px;
        top: 55px;
        left: 20px;
    }
    .name .bxs-thermometer {
        position: absolute;
        margin-top: 15px;
        font-size: 30px;
        margin-left: 20px;
        color: #c34a36;

    }
    .name .bx-globe {
        position: absolute;
        margin-top: 15px;
        font-size: 30px;
        margin-left: 20px;
        color: #ffc75f;
    }
    .name .line {
        position: relative;
        width: 80%;
        background-color: #C34A36;
        margin-left: 20px;
        height: 1px;
        top: 48px;
    }
    .name .line2 {
        position: relative;
        width: 80%;
        background-color: #ffc75f;
        margin-left: 20px;
        height: 1px;
        top: 48px;
    }
    .name .heat{
        position: absolute;
        margin-top: 13px;
        left: 55px;
        font-size: 20px;
        font-weight: bold;
    }
    .name .bxs-award {
        position: relative;
        display: inline-block;
        font-size: 30px;
        margin-top: 7px;
        /*left: 105px;*/
        /*color: #ffcb74;*/
    }
    .name .bxs-chat {
        position: relative;
        display: inline-block;
        font-size: 30px;
        margin-top: 7px;
        /*left: 210px;*/
        color: #333333;
    }
    .blackBox {
        position: relative;
        background: url("../assets/img/ScholarsPortal/nameBackground.jpg");
        position: relative; width: 100%; height: 100px;
        border-radius: 10px
    }
    .image {
        position: absolute;

        padding: 15px;
        width: 70px; height: 70px;
        border-radius: 20px;

        display: inline-block
    }

    .follow {
      transition: 0.2s;
      /*color: #333333;*/
      cursor: pointer;
    }

    .follow:hover .fo{
      color: #2196f3;
    }

    .follow:hover .bxs-user-plus{
      color: #2196f3;
    }
    .name .claim {
        transition: 0.2s;
    }
    .name .claim:hover {
        color: #ffcb74;
    }
    .claim:hover .bxs-award{
        color: #ffcb74;
    }
    .claim:hover .cl {
        color: #ffcb74;
    }
    .message {
      /*transition: 0.2s;*/
      color: #333333;
      cursor: pointer;
    }

    .message:hover {
      color: #00cc00;
    }

    .message:hover .bxs-chat{
      color: #00cc00;
    }

    .right .right-name:hover {
        color: #2196f3;
    }

    .question-btn {
      position: fixed;
      right: 10px;
      bottom: 10px;
      z-index: 1000;
      cursor: pointer;
    }

    .question-icon {
      display: block;
      width: 30px;
      height: 30px;
      line-height: 30px;
      /*border-radius: 100%;*/
      /*border: 2px solid rgba(244, 244, 244, 0.8);*/
      font-size: 30px;
    }

    .question-icon:hover {
      color: #f44336;
    }
</style>
