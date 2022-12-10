<template>
  <div class="message-center">
    <div class="title">
      <span class="image">
        <i class='bx bxs-user-rectangle' style="font-size: 50px; margin: 10px 10px 10px 30px; color: #fbbd08"></i>
      </span>
      <span class="text" style="font-size:30px; font-weight: 900; position: absolute; top: 35px">
        消息中心
      </span>
    </div>
    <div class="divider-x"></div>
    <div class="source-box">
      <div class="platform-msg" :class="{'active' : isActive1}" @click="changeActive1(event)">
        <div class="red-point" v-if="msg_plm_has_new > 0">
          <img src="../assets/img/MessageManage/red-point.png">
        </div>
        <span class="image">
          <img src="../assets/img/MessageManage/notice.png">
        </span>
        <span class="name">
          系统通知
        </span>
      </div>
      <div class="platform-msg" :class="{'active' : isActive2}" @click="changeActive2(event)">
        <div class="red-point" v-if="msg_rec_has_new > 0">
          <img src="../assets/img/MessageManage/red-point.png">
        </div>
        <span class="image">
          <img src="../assets/img/MessageManage/message-received.png">
        </span>
        <span class="name">
          收到的私信
        </span>
      </div>
      <div class="platform-msg" :class="{'active' : isActive3}" @click="changeActive3(event)">
        <span class="image">
          <img src="../assets/img/MessageManage/message-sent.png">
        </span>
        <span class="name">
          发送的私信
        </span>
      </div>
    </div>
    <div class="divider-y"></div>
    <div class="sender-box">
      <div class="sender" v-for="(item, index) in dis_msg_list" :key="index" v-if="!showContent" @click="openMessage(item.mid, index)">
        <span class="image">
        <img :src="require('../assets/img/MessageManage/' + item.avatar)">
        </span>
        <span class="name">
          {{ item.username }}
        </span>
        <span class="content">
          {{ item.content }}
        </span>
        <div class="red-point" v-if="!item.is_read && !isActive3">
          <img src="../assets/img/MessageManage/red-point.png">
        </div>
        <div class="operation">
          <img class="delete-img" src="../assets/img/MessageManage/delete.png" title="删除" @click="deleteMsg(item.mid)">
        </div>
        <div class="send-time">
          <div class="text">
            {{item.create_time}}
          </div>
        </div>
      </div>
      <div class="sender-baseInfo" v-if="showContent" @click="changeShowContent(event, true)">
        <span class="image">
        <img :src="require('../assets/img/MessageManage/' + cur_msg.avatar)">
        </span>
        <span class="name">
          {{ cur_msg.username }}
        </span>
        <div class="operation">
          <img class="delete-img" src="../assets/img/MessageManage/delete.png" title="删除" @click="deleteMsg(cur_msg.mid)">
        </div>
        <div class="send-time">
          <div class="text">
            {{cur_msg.create_time}}
          </div>
        </div>
      </div>
      <div class="content-box" v-if="showContent">
        <div class="text-area">
          {{cur_msg.content}}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MessageManage",
  data() {
    return {
      uid: 1,
      isActive1: true, //true 则展示系统消息
      isActive2: false, //true 则展示收到的私信
      isActive3: false, //true 则展示发送的私信
      showContent: false, //true则展示消息具体内容
      msg_plm_has_new: 0, //新的系统消息的数量
      msg_rec_has_new: 0, //新的私信的数量
      cur_msg: { //当前显示的消息

      },
      cur_msg_1: { //当前显示的消息
        mid: 1,
        owner_id: 1,
        sender_id: 2,
        avatar: 'user.png',
        username: 'Peter杨',
        content: '你好吗你好吗你好吗',
        create_time: '2022-10-16 16:01',
        is_read: true,
      },
      dis_msg_list: [

      ],
      dis_msg_list_1: [ //展示在右侧的消息列表
        {
          mid: 1,
          owner_id: 1,
          sender_id: 2,
          username: 'Peter杨',
          avatar: 'user.png',
          content: '你好吗你好吗你好吗',
          creat_time: '2022-10-16 16:01',
          is_read: true,
        },
        {
          mid: 1,
          owner_id: 1,
          sender_id: 2,
          avatar: 'user.png',
          username: 'Peter杨',
          content: '你好吗你好吗你好吗',
          create_time: '2022-10-16 16:02',
          is_read: false,
        },
      ],
      msg_plm_list: [

      ],
      msg_plm_list_1: [
        {
          mid: 1,
          owner_id: 1,
          sender_id: 2,
          avatar: 'user.png',
          username: 'Peter杨',
          content: '你好吗你好吗你好吗',
          create_time: '2022-10-16 16:01',
          is_read: true,
        },
        {
          mid: 1,
          owner_id: 1,
          sender_id: 2,
          avatar: 'user.png',
          username: 'Peter杨',
          content: '你好吗你好吗你好吗',
          create_time: '2022-10-16 16:02',
          is_read: false,
        },
      ],
      msg_rec_list: [

      ],
      msg_rec_list_1: [
        {
          mid: 1,
          owner_id: 1,
          sender_id: 2,
          avatar: 'user.png',
          username: 'Peter杨',
          content: '你好吗你好吗你好吗',
          create_time: '2022-10-16 16:01',
          is_read: true,
        },
        {
          mid: 1,
          owner_id: 1,
          sender_id: 2,
          avatar: 'user.png',
          username: 'Peter杨',
          content: '你好吗你好吗你好吗',
          create_time: '2022-10-16 16:02',
          is_read: false,
        },
        {
          mid: 1,
          owner_id: 1,
          sender_id: 2,
          avatar: 'user.png',
          username: 'Peter杨',
          content: '你好吗你好吗你好吗',
          create_time: '2022-10-16 16:03',
          is_read: false,
        },
        {
          mid: 1,
          owner_id: 1,
          sender_id: 2,
          avatar: 'user.png',
          username: 'Peter杨',
          content: '你好吗你好吗你好吗',
          create_time: '2022-10-16 16:04',
          is_read: true,
        },
        {
          mid: 1,
          owner_id: 1,
          sender_id: 2,
          avatar: 'user.png',
          username: 'Peter杨',
          content: '你好吗你好吗你好吗',
          create_time: '2022-10-16 16:05',
          is_read: true,
        },
        {
          mid: 1,
          owner_id: 1,
          sender_id: 2,
          avatar: 'user.png',
          username: 'Peter杨',
          content: '你好吗你好吗你好吗',
          create_time: '2022-10-16 16:06',
          is_read: false,
        },

      ],

      msg_send_list: [

      ],
      msg_send_list_1: [
        {
          mid: 1,
          owner_id: 1,
          sender_id: 2,
          avatar: 'user.png',
          username: 'Pete杨',
          content: '你好吗你好吗你好吗',
          create_time: '2022-10-16 16:01',
          is_read: true,
        },
        {
          mid: 1,
          owner_id: 1,
          sender_id: 2,
          avatar: 'user.png',
          username: 'Petr杨',
          content: '你好吗你好吗你好吗',
          create_time: '2022-10-16 16:02',
          is_read: false,
        },
        {
          mid: 1,
          owner_id: 1,
          sender_id: 2,
          avatar: 'user.png',
          username: 'Peer杨',
          content: '你好吗你好吗你好吗',
          create_time: '2022-10-16 16:03',
          is_read: false,
        },
        {
          mid: 1,
          owner_id: 1,
          sender_id: 2,
          avatar: 'user.png',
          username: 'Pter杨',
          content: '你好吗你好吗你好吗',
          create_time: '2022-10-16 16:04',
          is_read: true,
        },
        {
          mid: 1,
          owner_id: 1,
          sender_id: 2,
          avatar: 'user.png',
          username: 'eter杨',
          content: '你好吗你好吗你好吗',
          create_time: '2022-10-16 16:05',
          is_read: true,
        },
        {
          mid: 1,
          owner_id: 1,
          sender_id: 2,
          avatar: 'user.png',
          username: 'Peter',
          content: '你好吗你好吗你好吗',
          create_time: '2022-10-16 16:06',
          is_read: false,
        },

      ],
    }
  },

  methods: {
    changeActive1(e) {
      if(!this.isActive1) {
        if(this.showContent) { //如果当前正在展示页面,应当关闭
          this.changeShowContent(e, true)
        }
        this.dis_msg_list = []
        this.getMsgPlm(this.uid) //重新获取数据，信任数据库
        // this.dis_msg_list = this.msg_plm_list; //getMsgPlm里有这句话, 但此时接口尚未实现, 暂时保留
        this.isActive1 = true;
        this.isActive2 = false;
        this.isActive3 = false;
      }
    },
    changeActive2(e) {
      if(!this.isActive2) {
        if(this.showContent) { //如果当前正在展示页面,应当关闭
          this.changeShowContent(e, true)
        }
        this.dis_msg_list = []
        this.isActive2 = true;
        this.isActive1 = false;
        this.isActive3 = false;
        this.getMsgRec(this.uid) //重新获取数据，信任数据库
        // this.dis_msg_list = this.msg_rec_list; //getMsgRec里有这句话, 但此时接口尚未实现, 暂时保留
      }
    },
    changeActive3(e) {
      if(!this.isActive3) {
        if(this.showContent) { //如果当前正在展示页面,应当关闭
          this.changeShowContent(e, true)
        }
        this.dis_msg_list = []
        this.getMsgSend(this.uid) //重新获取数据，信任数据库
        // this.dis_msg_list = this.msg_send_list; //getMsgSend里有这句话, 但此时接口尚未实现, 暂时保留
        this.isActive3 = true;
        this.isActive1 = false;
        this.isActive2 = false;
      }
    },
    isClickDelete(event) {
      if(!e) {
        var e = window.event;
      }
      var targ = e.target;
      var tname= targ.className;
      if(tname === 'delete-img') {
        return true;
      }
      else {
        return false;
      }
    },
    changeShowContent(event, ignore) { //event: 点击事件, ignore: 是否忽略点击区域的区别
      if(ignore)
        this.showContent = !this.showContent;
      else {
        let isDelete = this.isClickDelete(event);
        if(isDelete) { //点了删除图标
          if(this.showContent) { //显示具体内容时
            this.showContent = !this.showContent;
          }
        }
        else { //没点删除图标
          this.showContent = !this.showContent;
        }
      }
    },
    cal_msg_rec(msg_list) { //计算收到的私信是否有未读消息
      let has_new = 0;
      for(let i = 0; i < msg_list.length; i++) {
        if(!msg_list[i].is_read) { //有未读消息就+1
          has_new++;
        }
      }
      console.log(has_new);
      return has_new;
    },
    cal_msg_plm(msg_list) { //计算系统消息是否有未读消息
      let has_new = 0;
      console.log("in cal_msg_plm")
      for(let i = 0; i < msg_list.length; i++) {
        console.log(msg_list[i].is_read)
        if(!msg_list[i].is_read) { //有未读消息就+1
          has_new++;
        }
      }
      console.log(has_new)
      return has_new;
    },

    //删除消息
    deleteMsg(mid) {
      let params = new FormData();
      params.append("mid", mid);

      this.axios({
        method: 'post',
        url: 'http://139.9.134.209:8000/api/MessageCenter/deleteMessage/',
        data: params,
      })
      .then(res => {
        this.dis_msg_list = [];
        if(this.isActive1) { //当前处于系统消息列表
          this.getMsgPlm(this.uid);
        }
        else if(this.isActive2) { //当前处于收到的私信列表
          this.getMsgRec(this.uid);
        }
        else if(this.isActive3) { //当前处于发送的私信列表
          this.getMsgSend(this.uid);
        }

        if(res.data.errno === 0) {
          this.$message({
            type: 'success',
            showClose: true,
            message: '删除成功'
          })
        }

      })
      .catch(err => {
        console.log(err)
      })
    },

    //获取系统通知
    getMsgPlm(uid) {
      this.axios({
        method: 'get',
        url: 'http://139.9.134.209:8000/api/MessageCenter/getPlatMsg?owner_id=' + uid,
      })
      .then(res => {
        console.log(res.data)
        this.msg_plm_list = res.data;
        for(let i = 0; i < this.msg_plm_list.length; i++) {
          this.msg_plm_list[i].avatar = 'user.png';
          this.msg_plm_list[i].create_time = new Date(this.msg_plm_list[i].create_time).toLocaleString('zh', {hour12: false})
        }
        this.dis_msg_list = this.msg_plm_list;
        this.msg_plm_has_new = this.cal_msg_plm(this.msg_plm_list);
        // if(this.showContent) {
        //   this.changeShowContent();
        // }
      })
      .catch(err => {
        console.log(err);
      })
    },

    //获取用户收到的私信
    getMsgRec(uid, type) { //type=0,初始化时的调用
      this.axios({
        method: 'get',
        url: 'http://139.9.134.209:8000/api/MessageCenter/getMsgRec?owner_id=' + uid,
      })
      .then(res => {
        console.log(res.data)
        this.msg_rec_list = res.data;
        for(let i = 0; i < this.msg_rec_list.length; i++) {
          this.msg_rec_list[i].avatar = 'user.png';
          this.msg_rec_list[i].create_time = new Date(this.msg_rec_list[i].create_time).toLocaleString('zh', {hour12: false})
        }
        this.msg_rec_has_new = this.cal_msg_rec(this.msg_rec_list);
        this.dis_msg_list = this.msg_rec_list;

        console.log(this.dis_msg_list)
        // if(this.showContent) {
        //   this.changeShowContent();
        // }
        console.log(this.showContent)
        if(type === 0) {
          this.dis_msg_list = this.msg_plm_list;
        }
      })
      .catch(err => {
        console.log(err);
      })
    },

    //获取用户发送的私信
    getMsgSend(uid, type) { //type=0,初始化时的调用
      this.axios({
        method: 'get',
        url: 'http://139.9.134.209:8000/api/MessageCenter/getMsgSend?sender_id=' + uid,
      })
      .then(res => {
        console.log(res.data)
        this.msg_send_list = res.data;
        for(let i = 0; i < this.msg_send_list.length; i++) {
          this.msg_send_list[i].avatar = 'user.png';
          this.msg_send_list[i].create_time = new Date(this.msg_send_list[i].create_time).toLocaleString('zh', {hour12: false})
        }
        this.dis_msg_list = this.msg_send_list;

        // if(this.showContent) {
        //   this.changeShowContent();
        // }
        if(type === 0) {
          this.dis_msg_list = this.msg_plm_list;
        }
      })
      .catch(err => {
        console.log(err);
      })
    },

    readMsg(mid) {
      let param = new FormData();
      param.append("mid", mid);

      this.axios({
        method: 'post',
        url: 'http://139.9.134.209:8000/api/MessageCenter/readMessage/',
        data: param,
      })
      .then(res => {
        console.log(res.data);
      })
      .catch(err => {
        console.log(err);
      })

    },

    openMessage(mid, index, event) { //查看一条消息的具体内容
      // let uid = this.$store.state.userInfo.uid;

      let uid = 1;
      //系统消息
      if(this.isActive1) {
        console.log(this.dis_msg_list[index]);
        if(!this.dis_msg_list[index].is_read) { //未读, 则改为已读, 新消息数量-1
          this.dis_msg_list[index].is_read = true;
          this.msg_plm_list[index].is_read = true;
          this.msg_plm_has_new--;
          console.log(this.msg_plm_has_new);
          this.readMsg(mid); //改变消息状态为已读
        }
        this.cur_msg = this.dis_msg_list[index];
        this.changeShowContent(event, false); //改变展示状态，这里其实就是打开消息
        //this.getMsgPlm(uid); //重新获取数据
      }
      //已收到私信
      if(this.isActive2) {
        console.log(this.msg_rec_list[index]);
        if(!this.msg_rec_list[index].is_read) { //未读, 则改为已读, 新消息数量-1
          this.msg_rec_list[index].is_read = true;
          this.msg_rec_has_new--;
          this.readMsg(mid); //改变消息状态为已读
        }
        this.cur_msg = this.dis_msg_list[index];
        this.changeShowContent(event, false); //改变展示状态，这里其实就是打开消息
        //this.getMsgRec(uid); //重新获取数据
      }
      //已发送私信
      if(this.isActive3) {
        console.log(this.dis_msg_list[index])
        this.cur_msg = this.dis_msg_list[index];
        this.changeShowContent(event, false); //改变展示状态，这里其实就是打开消息
        //this.getMsgSend(uid); //重新获取数据
      }
    }
  },
  computed: {
  },
  beforeCreate() {

  },
  created() {
    this.getMsgRec(this.uid, 1);
  },
  mounted() {
    this.getMsgPlm(this.uid);
    console.log(this.msg_plm_has_new)
    console.log(this.msg_rec_has_new)
    this.dis_msg_list = this.msg_plm_list; //初始展示msg_plm_list
    console.log(this.dis_msg_list)
  }
}
</script>

<style scoped>
* {
  margin: 0px;
  padding: 0px;
  box-sizing: border-box;
  z-index: -10;
}

::-webkit-scrollbar {
  width: 5px;
}

::-webkit-scrollbar-track {
  background-color: white;
  height: 90%;
  margin: 0 0;
}

::-webkit-scrollbar-thumb {
  border-radius: 5px;
  background-color: #a3a4a9;
}

.message-center {

  margin: 20px auto;
  height: 730px;
  width: 90%;
  border-radius: 10px;
  box-shadow: 0px 0px 5px rgba(0,0,0,0.3);
}

.divider-x {
  position: relative;
  margin: 0 auto;
  width: 100%;
  height: 1px;
  background-color: #d4d4d4;
  text-align: center;
  font-size: 16px;
  color: rgba(101, 101, 101, 1);
}

.source-box {
  display: inline-block;
  /*background-color: #0fc70f;*/
  top: -50px;
  left: 5px;
  position: relative;
  height: 580px;
  width: 20%;
  overflow: hidden;
  z-index: 1;
}

.source-box:hover {
  cursor: pointer;
}

.source-box .platform-msg {
  background-color: white;
  position: relative;
  height: 60px;
  width: 100%;
  border-radius: 5px;
  margin: 0px 20px 10px 25px;
  vertical-align: middle;
  transition: all 0.6s;
}

.source-box .platform-msg.active {

  background-color: #e7e5e5;
  /*background-color: #0fc70f;*/
  height: 70px;
  width: 100%;
  margin: 5px 25px 5px 0px;
}

.source-box .platform-msg .red-point {
  display: inline-block;
  position: absolute;
  top: 17px;
  left: -15px;
  height: 30px;
  width: 30px;
  overflow: hidden;
  transition: all 0.6s;
  z-index: 6;
}

.source-box .platform-msg.active .red-point {
  display: inline-block;
  position: absolute;
  top: 21px;
  left: 0;
  height: 30px;
  width: 30px;
  overflow: hidden;
}

.source-box .platform-msg .red-point img{
  margin: 3px 3px;
  height: 20px;
  width: 20px;
  position: relative;
  left: -50px;
  filter: drop-shadow(50px 0px red);
}

.source-box .platform-msg .image img {
  height: 40px;
  width: 40px;
  margin: 10px 25px;
  transition: all 0.6s;
}

.source-box .platform-msg.active .image img{
  height: 50px;
  width: 50px;
  margin: 10px 10px 10px 40px;
}

.source-box .platform-msg .name {
  font-size:20px;
  font-weight: 900;
  position: absolute;
  top: 15px;
  transition: all 0.6s;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.source-box .platform-msg.active .name {
  font-size:25px;
  font-weight: 900;
  position: absolute;
  top: 17px;
  text-overflow: ellipsis;
}

.sender-box {
  display: inline-block;
  top: 5px;
  position: relative;
  left: 20px;
  height: 640px;
  width: 77%;
  overflow: hidden;
  z-index: 1;
  overflow-x: hidden;
}

.sender-box:hover {
  overflow-y: auto;
}

.sender-box .sender {
  background-color: white;
  position: relative;
  border-radius: 5px;
  height: 100px;
  width: 90%;
  margin: 20px 35px 20px 35px;
  vertical-align: middle;
  box-shadow: 0px 0px 5px rgba(0,0,0, 0.3);
  transition: all 0.6s;
}

.sender-box .sender:hover {
  background-color: #e7e5e5;
  box-shadow: 0px 0px 6px rgba(0,0,0, 0.6);
  cursor: pointer;
}

.sender-box .sender .image img {
  height: 80px;
  width: 80px;
  margin: 10px 10px 10px 10px;
  transition: all 0.6s;
}

.sender-box .sender:hover .image img{

}

.sender-box .sender .name {
  font-size:20px;
  font-weight: 900;
  position: absolute;
  top: 20px;
  transition: all 0.6s;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.sender-box .sender:hover .name {
  font-weight: 900;
  position: absolute;
  text-overflow: ellipsis;
}

.sender-box .sender .content {
  top: 60px;
  position: absolute;
  font-weight: 500;
  font-size: 10px;
  transition: all 0.6s;
  width: 250px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.sender-box .sender:hover .content {
  position: absolute;
  font-weight: 500;
}

.sender-box .sender .red-point {
  display: inline-block;
  position: absolute;
  top: 30px;
  left: 220px;
  height: 30px;
  width: 30px;
  overflow: hidden;
}

.sender-box .sender .red-point img{
  margin: 3px 3px;
  height: 20px;
  width: 20px;
  position: relative;
  left: -50px;
  filter: drop-shadow(50px 0px red);
}

.sender-box .sender .operation {
  display: inline-block;
  position: absolute;
  top: 0px;
  right: 50px;
  height: 100px;
  width: 100px;
  z-index: 5;
}

.sender-box .sender .operation img{
  margin: 20px 30px 40px 30px;
  height: 40px;
  width: 40px;
  transition: all ease 0.6s;
}

.sender-box .sender .operation img:hover{
  margin: 15px 25px 35px 25px;
  height: 50px;
  width: 50px;
  transition: all ease 0.6s;
}

.sender-box .sender .send-time{
  display: inline-block;
  position: absolute;
  bottom: 0px;
  right: 0px;
  height: 40px;
  width: 200px;
}

.sender-box .sender .send-time .text{
  position: absolute;
  top: 15px;
  right: 10px;
  width: 150px;
}

.divider-y {
  display: inline-block;
  position: absolute;
  margin: 2px 0 0 0;
  left: 320px;
  width: 2px;
  height: 640px;
  background-color: #d4d4d4;
  font-size: 16px;
  color: green;
  z-index: 2;
}

.sender-box .sender-baseInfo {
  background-color: white;
  position: relative;
  border-radius: 5px;
  height: 60px;
  width: 950px;
  margin: 20px 35px 20px 35px;
  vertical-align: middle;
  box-shadow: 0px 0px 5px rgba(0,0,0, 0.3);
  transition: all 0.6s;
}

.sender-box .sender-baseInfo:hover {
  background-color: #e7e5e5;
  box-shadow: 0px 0px 6px rgba(0,0,0, 0.6);
  cursor: pointer;
}

.sender-box .sender-baseInfo .image img {
  height: 40px;
  width: 40px;
  margin: 10px 20px 10px 25px;
  transition: all 0.6s;
}

.sender-box .sender-baseInfo:hover .image img{

}

.sender-box .sender-baseInfo .name {
  font-size: 17px;
  font-weight: 900;
  position: absolute;
  top: 20px;
  transition: all 0.6s;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.sender-box .sender-baseInfo:hover .name {
  font-weight: 900;
  position: absolute;
  text-overflow: ellipsis;
}

.sender-box .sender-baseInfo .operation {
  display: inline-block;
  position: absolute;
  top: 0px;
  right: 15px;
  height: 60px;
  width: 100px;
}

.sender-box .sender-baseInfo .operation img{
  margin: 15px 35px 15px 35px;
  height: 30px;
  width: 30px;
  transition: all ease 0.6s;
}

.sender-box .sender-baseInfo .operation img:hover{
  margin: 10px 30px 10px 30px;
  height: 40px;
  width: 40px;
  transition: all ease 0.6s;
  cursor: pointer;
}

.sender-box .sender-baseInfo .send-time{
  display: inline-block;
  position: absolute;
  bottom: 15px;
  right: 100px;
  height: 25px;
  width: 200px;
}

.sender-box .sender-baseInfo .send-time .text{
  position: absolute;
  top: 0px;
  left: 30px;
  width: 150px;
}

.content-box {
  display: inline-block;
  position: relative;
  top: 5px;
  left: 35px;
  height: 420px;
  width: 950px;
  border-radius: 5px;
  overflow: hidden;
  z-index: 1;
  overflow-x: hidden;
  box-shadow: 0px 0px 5px rgba(0,0,0, 0.3);
}

.content-box:hover {
  overflow-y: auto;
}

.content-box .text-area {
  width: 850px;
  position: relative;
  margin: 20px 50px 20px 50px;
  line-height: 25px;
  text-indent: 32px;
  word-spacing: 10px;
  letter-spacing: 0px;
}


</style>
