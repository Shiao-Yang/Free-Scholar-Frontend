<template>
  <div class="message-center">
    <div class="title">
      <span class="image">
        <img src="../assets/img/MessageManage/user.png" style="height: 50px; width: 50px; margin: 10px 10px 10px 30px">
      </span>
      <span class="text" style="font-size:30px; font-weight: 900; position: absolute; top: 25px">
        消息中心
      </span>
    </div>
    <div class="divider-x"></div>
    <div class="source-box">
      <div class="platform-msg" :class="{'active' : isActive1}" @click="changeActive1">
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
      <div class="platform-msg" :class="{'active' : isActive2}" @click="changeActive2">
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
      <div class="platform-msg" :class="{'active' : isActive3}" @click="changeActive3">
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
      <div class="sender" v-for="(item, index) in msg_rec_list" :key="index">
        <span class="image">
        <img :src="require('../assets/img/MessageManage/' + item.avatar)">
        </span>
        <span class="name">
          {{ item.username }}
        </span>
        <span class="content">
          {{ item.content }}
        </span>
        <div class="red-point" v-if="!item.isRead">
          <img src="../assets/img/MessageManage/red-point.png">
        </div>
        <div class="operation">
          <img src="../assets/img/MessageManage/delete.png" title="删除">
        </div>
        <div class="send-time">
          <div class="text">
            {{item.time}}
          </div>
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
      isActive1: true, //true 则展示系统消息
      isActive2: false, //true 则展示收到的私信
      isActive3: false, //true 则展示发送的私信
      showContent: false, //true则展示消息具体内容
      msg_plm_has_new: 0, //新的系统消息的数量
      msg_rec_has_new: 0, //新的私信的数量
      cur_msg: { //当前显示的消息
        mid: 1,
        avatar: 'user.png',
        username: 'Peter杨',
        content: '你好吗你好吗你好吗',
        time: '2022-10-16 16:01',
        isRead: true,
      },
      dis_msg: [ //展示在右侧的消息列表
        {
          mid: 1,
          avatar: 'user.png',
          username: 'Peter杨',
          content: '你好吗你好吗你好吗',
          time: '2022-10-16 16:01',
          isRead: true,
        },
        {
          mid: 1,
          avatar: 'user.png',
          username: 'Peter杨',
          content: '你好吗你好吗你好吗',
          time: '2022-10-16 16:02',
          isRead: false,
        },
      ],
      msg_plm_list: [
        {
          mid: 1,
          avatar: 'user.png',
          username: 'Peter杨',
          content: '你好吗你好吗你好吗',
          time: '2022-10-16 16:01',
          isRead: true,
        },
        {
          mid: 1,
          avatar: 'user.png',
          username: 'Peter杨',
          content: '你好吗你好吗你好吗',
          time: '2022-10-16 16:02',
          isRead: false,
        },
      ],
      msg_rec_list: [
        {
          mid: 1,
          avatar: 'user.png',
          username: 'Peter杨',
          content: '你好吗你好吗你好吗',
          time: '2022-10-16 16:01',
          isRead: true,
        },
        {
          mid: 1,
          avatar: 'user.png',
          username: 'Peter杨',
          content: '你好吗你好吗你好吗',
          time: '2022-10-16 16:02',
          isRead: false,
        },
        {
          mid: 1,
          avatar: 'user.png',
          username: 'Peter杨',
          content: '你好吗你好吗你好吗',
          time: '2022-10-16 16:03',
          isRead: false,
        },
        {
          mid: 1,
          avatar: 'user.png',
          username: 'Peter杨',
          content: '你好吗你好吗你好吗',
          time: '2022-10-16 16:04',
          isRead: true,
        },
        {
          mid: 1,
          avatar: 'user.png',
          username: 'Peter杨',
          content: '你好吗你好吗你好吗',
          time: '2022-10-16 16:05',
          isRead: true,
        },
        {
          mid: 1,
          avatar: 'user.png',
          username: 'Peter杨',
          content: '你好吗你好吗你好吗',
          time: '2022-10-16 16:06',
          isRead: false,
        },

      ],
      msg_send_list: [
        {
          mid: 1,
          avatar: 'user.png',
          username: 'Peter杨',
          content: '你好吗你好吗你好吗',
          time: '2022-10-16 16:01',
          isRead: true,
        },
        {
          mid: 1,
          avatar: 'user.png',
          username: 'Peter杨',
          content: '你好吗你好吗你好吗',
          time: '2022-10-16 16:02',
          isRead: false,
        },
        {
          mid: 1,
          avatar: 'user.png',
          username: 'Peter杨',
          content: '你好吗你好吗你好吗',
          time: '2022-10-16 16:03',
          isRead: false,
        },
        {
          mid: 1,
          avatar: 'user.png',
          username: 'Peter杨',
          content: '你好吗你好吗你好吗',
          time: '2022-10-16 16:04',
          isRead: true,
        },
        {
          mid: 1,
          avatar: 'user.png',
          username: 'Peter杨',
          content: '你好吗你好吗你好吗',
          time: '2022-10-16 16:05',
          isRead: true,
        },
        {
          mid: 1,
          avatar: 'user.png',
          username: 'Peter杨',
          content: '你好吗你好吗你好吗',
          time: '2022-10-16 16:06',
          isRead: false,
        },

      ],
    }
  },

  methods: {
    changeActive1() {
      this.isActive1 = true;
      this.isActive2 = false;
      this.isActive3 = false;
    },
    changeActive2() {
      this.isActive2 = true;
      this.isActive1 = false;
      this.isActive3 = false;
    },
    changeActive3() {
      this.isActive3 = true;
      this.isActive1 = false;
      this.isActive2 = false;
    },
    cal_msg_rec(msg_list) { //计算收到的私信是否有未读消息
      let has_new = 0;
      for(let i = 0; i < msg_list.length; i++) {
        if(!msg_list[i].isRead) { //有未读消息就+1
          has_new++;
        }
      }
      return has_new;
    },
    cal_msg_plm(msg_list) { //计算系统消息是否有未读消息
      let has_new = 0;
      for(let i = 0; i < msg_list.length; i++) {
        if(!msg_list[i].isRead) { //有未读消息就+1
          has_new++;
        }
      }
      return has_new;
    },

    //获取用户收到的私信
    getMsgRec(uid) {
      let params = {
        
      }
    },

    readMsg(mid) {
      let param = {
        mid: mid,
      }
      this.axios({
        method: 'post',
        url: '',
        data: param,
      })
      .then(res => {
        console.log(res.data);
      })
      .catch(err => {
        console.log(err);
      })

    },

    openMessage(mid, index) { //查看一条消息的具体内容
      //系统消息
      if(this.isActive1) {
        this.readMsg(mid); //改变消息状态为已读
        if(!this.msg_plm_list[index].isRead) { //未读, 则改为已读, 新消息数量-1
          this.cal_msg_plm[index].isRead = true;
          this.msg_plm_has_new--;
        }
        this.cur_msg = this.msg_plm_list[index];
      }
      //已收到私信
      if(this.isActive2) {
        this.readMsg(mid); //改变消息状态为已读
        if(!this.msg_rec_list[index].isRead) { //未读, 则改为已读, 新消息数量-1
          this.msg_rec_list[index].isRead = true;
          this.msg_rec_has_new--;
        }
        this.cur_msg = this.msg_rec_list[index];
      }
      //已发送私信
      if(this.isActive3) {
        this.cur_msg = this.msg_send_list[index];
      }

      this.showContent = true;


    }
  },
  computed: {
  },
  created() {
    this.msg_rec_has_new = this.cal_msg_rec(this.msg_rec_list);
    this.msg_plm_has_new = this.cal_msg_plm(this.msg_rec_list);
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
  margin: 10px 0 0 0;
  height: 670px;
  width: 1410px;
  box-shadow: 0px 0px 5px rgba(0,0,0,0.3);
}

.divider-x {
  position: relative;
  margin: 0 auto;
  width: 1330px;
  height: 1px;
  background-color: #d4d4d4;
  text-align: center;
  font-size: 16px;
  color: rgba(101, 101, 101, 1);
}

.source-box {
  display: inline-block;
  top: 10px;
  left: 5px;
  position: relative;
  height: 580px;
  width: 350px;
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
  width: 300px;
  border-radius: 5px;
  margin: 10px 25px 10px 25px;
  vertical-align: middle;
  transition: all 0.6s;
}

.source-box .platform-msg.active {
  background-color: #e7e5e5;
  height: 70px;
  width: 310px;
  margin: 5px 25px 5px 15px;
}

.source-box .platform-msg .red-point {
  display: inline-block;
  position: absolute;
  top: 17px;
  left: 25px;
  height: 30px;
  width: 30px;
  overflow: hidden;
  transition: all 0.6s;
}

.source-box .platform-msg.active .red-point {
  display: inline-block;
  position: absolute;
  top: 21px;
  left: 15px;
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
  margin: 10px 30px 10px 60px;
  transition: all 0.6s;
}

.source-box .platform-msg.active .image img{
  height: 50px;
  width: 50px;
  margin: 10px 25px 10px 55px;
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
  height: 580px;
  width: 1020px;
  overflow: hidden;
  z-index: 1;
  overflow-x: hidden;
}

.sender-box:hover {
  overflow-y: auto;
  cursor: pointer;
}

.sender-box .sender {
  background-color: white;
  position: relative;
  border-radius: 5px;
  height: 100px;
  width: 950px;
  margin: 20px 35px 20px 35px;
  vertical-align: middle;
  box-shadow: 0px 0px 5px rgba(0,0,0, 0.3);
  transition: all 0.6s;
}

.sender-box .sender:hover {
  background-color: #e7e5e5;
  box-shadow: 0px 0px 6px rgba(0,0,0, 0.6);
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
  left: 360px;
  width: 2px;
  height: 590px;
  background-color: #d4d4d4;
  font-size: 16px;
  color: green;
  z-index: 2;
}


</style>
