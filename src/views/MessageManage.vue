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
    <div class="sender-box">
      <div class="platform-msg">
        <span class="image">
          <img src="../assets/img/MessageManage/notice.png">
        </span>
        <span class="name">
          系统通知
        </span>
      </div>
      <div class="sender" v-for="(item, index) in messageList" :key="index">
        <span class="image">
        <img :src="require('../assets/img/MessageManage/' + item.avatar)">
        </span>
        <span class="name">
          {{ item.username }}
        </span>
        <span class="content">
          {{ item.content }}
        </span>
      </div>
    </div>
    <div class="divider-y"></div>
    <div class="message-box">
      <div class="message-history">


      </div>
      <div class="divider-x" style="width: 990px; position: absolute; top: 372px;"></div>
      <div class="message-input">

      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MessageManage",
  data() {
    return {
      messageList: [
        {
          avatar: 'user.png',
          username: 'Peter杨',
          content: '你好吗你好吗你好吗'
        },
        {
          avatar: 'user.png',
          username: 'Peter杨',
          content: '你好吗你好吗你好吗'
        },
        {
          avatar: 'user.png',
          username: 'Peter杨',
          content: '你好吗你好吗你好吗'
        },
        {
          avatar: 'user.png',
          username: 'Peter杨',
          content: '你好吗你好吗你好吗'
        },
        {
          avatar: 'user.png',
          username: 'Peter杨',
          content: '你好吗你好吗你好吗'
        },
        {
          avatar: 'user.png',
          username: 'Peter杨',
          content: '你好吗你好吗你好吗'
        },

      ],
    }
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

.sender-box {
  display: inline-block;
  top: 5px;
  position: relative;
  height: 580px;
  width: 405px;
  overflow: hidden;
  z-index: 1;
}

.sender-box:hover {
  overflow: auto;
}


.sender-box .platform-msg {
  background-color: white;
  position: relative;
  border-radius: 5px;
  height: 60px;
  width: 380px;
  margin: 10px 10px 10px 10px;
  vertical-align: middle;
  box-shadow: 0px 0px 5px rgba(0,0,0, 0.3);
  transition: all 0.6s;
}

.sender-box .platform-msg:hover {
  background-color: #e7e5e5;
  height: 70px;
  width: 390px;
  margin: 5px 5px 5px 5px;
  box-shadow: 0px 0px 6px rgba(0,0,0, 0.6);
}

.sender-box .platform-msg .image img {
  height: 40px;
  width: 40px;
  margin: 10px 25px 10px 30px;
  transition: all 0.6s;
}

.sender-box .platform-msg:hover .image img{
  height: 50px;
  width: 50px;
  margin: 10px 30px 10px 30px;
}

.sender-box .platform-msg .name {
  font-size:20px;
  font-weight: 900;
  position: absolute;
  top: 15px;
  transition: all 0.6s;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.sender-box .platform-msg:hover .name {
  font-size:25px;
  font-weight: 900;
  position: absolute;
  top: 15px;
  text-overflow: ellipsis;
}



.sender-box .sender {
  background-color: white;
  position: relative;
  border-radius: 5px;
  height: 100px;
  width: 380px;
  margin: 10px 10px 10px 10px;
  vertical-align: middle;
  box-shadow: 0px 0px 5px rgba(0,0,0, 0.3);
  transition: all 0.6s;
}

.sender-box .sender:hover {
  background-color: #e7e5e5;
  height: 110px;
  width: 390px;
  margin: 5px 5px 5px 5px;
  box-shadow: 0px 0px 6px rgba(0,0,0, 0.6);
}

.sender-box .sender .image img {
  height: 80px;
  width: 80px;
  margin: 10px 10px 10px 10px;
  transition: all 0.6s;
}

.sender-box .sender:hover .image img{
  height: 90px;
  width: 90px;
  margin: 10px 15px 10px 10px;
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
  font-size:25px;
  font-weight: 900;
  position: absolute;
  top: 15px;
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
  top: 75px;
  position: absolute;
  font-weight: 500;
  font-size: 12px;
}

.divider-y {
  display: inline-block;
  position: absolute;
  margin: 2px 0 0 0;
  left: 407px;
  width: 2px;
  height: 590px;
  background-color: #d4d4d4;
  font-size: 16px;
  color: green;
  z-index: 2;
}

.message-box {
  border: solid green;
  display: inline-block;
  position: relative;
  top:5px;
  left: 2px;
  height: 580px;
  width: 990px;
  z-index: 1;
}

.message-history {
  border: solid red;
  position: absolute;
  left: 2px;
  height: 370px;
  width: 990px;
  overflow: auto;
  z-index: 2;
}

.message-history:hover {
  overflow: auto;
  z-index: 2;
}

.message-input {
  border: solid red;
  position: relative;
  top: 375px;
  left: 2px;
  height: 200px;
  width: 990px;
  z-index: 2;
}

</style>
