<template>
  <div class="home">
    <div class="intro">
      <div class="avatar">
        <img :src="require('../assets/' + baseInfo.avatar)">
      </div>
      <div class="profile">
        <ul class="profile-list">
          <li class="profile-list-item">
            <span class="icon"><i class='bx bxs-user'></i></span>
            <span class="text" style="font-size: 25px; font-weight: bold">{{baseInfo.username}}</span>
          </li>
          <li class="profile-list-item">
            <span class="icon"><i class='bx bxs-home'></i></span>
            <span class="text">{{baseInfo.institution.name}}</span>
          </li>
          <li class="profile-list-item">
            <span class="icon"><i class='bx bxs-bookmark'></i></span>
            <span class="text">{{baseInfo.bio}}</span>
          </li>
        </ul>
      </div>
      <div class="social-info">
        <div class="social-info-item">
          <div class="title" @click="toFollowList" @click="toFollowList">
            <span class="icon" style="font-size: 28px; position: relative; top: 0px;" :class="{'active': isLike}"><i class='bx bxs-user-plus' ></i></span>
            <span class="text" style="position: relative; top: -6px;">关注</span>
          </div>
          <div class="social-info-number">
            <div class="number">
              {{baseInfo.follows}}
            </div>
          </div>
        </div>
        <div class="social-info-item" v-if="baseInfo.identity===1" @click="toFollowerList">
        <div class="social-info-item" v-if="baseInfo.identity===1" @click="toFollowerList">
          <div class="title">
            <span class="icon"><i class='bx bxs-heart' ></i></span>
            <span class="text">粉丝</span>
          </div>
          <div class="social-info-number">
            <div class="number">
              {{baseInfo.followers}}
            </div>
          </div>
        </div>
        <div class="social-info-item">
          <div class="title">
            <span class="icon" :class="{'active': isLike}"><i class='bx bxs-like' ></i></span>
            <span class="text">获赞</span>
          </div>
          <div class="social-info-number">
            <div class="number">
              {{baseInfo.likes}}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="info-box">
      <div class="title">
        <div class="image">
          <img src="../assets/img/home/user.png">
        </div>
        <span class="title-name">
          个人中心
        </span>
      </div>
      <div class="divider-x"></div>
      <div class="source-box">
        <div class="source-item" :class="{'active' : isActive1}" @click="changeActive1">
          <span class="image">
<!--            <img src="../assets/img/home/information.png">-->
            <i class='bx bx-info-circle'></i>
          </span>
          <span class="name">
            个人信息
          </span>
        </div>
        <!--
                <div class="source-item" :class="{'active' : isActive2}" @click="changeActive2">
                  <span class="image">
                  <img src="../assets/img/home/password.png">
        <!--
                <div class="source-item" :class="{'active' : isActive2}" @click="changeActive2">
                  <span class="image">
                  <img src="../assets/img/home/password.png">
            <i class='bx bx-shield'></i>
          </span>
          <span class="name">
            修改密码
          </span>
        </div>
        -->
        -->
        <div class="source-item" :class="{'active' : isActive3}" @click="changeActive3">
          <span class="image">
<!--            <img src="../assets/img/home/avatar.png">-->
            <i class='bx bx-user-circle'></i>
          </span>
          <span class="name">
            个人头像
          </span>
        </div>
      </div>
      <div class="divider-y"></div>
      <div class="content-box">
        <div class="show-box" v-if="isActive1" v-if="isActive1">
          <div class="content-item">
            <div class="item-name">
              用户名
            </div>
            <div class="item-content">
              {{baseInfo.username}}
            </div>
          </div>
          <div class="content-item">
            <div class="item-name">
              邮箱
            </div>
            <div class="item-content" v-if="baseInfo.mail !== null" v-if="baseInfo.mail !== null">
              {{baseInfo.mail}}
            </div>
            <div class="item-content" v-if="baseInfo.mail === null">
              未设置
            </div>
            <div class="item-content" v-if="baseInfo.mail === null">
              未设置
            </div>
          </div>
          <div class="content-item">
            <div class="item-name">
              身份
            </div>
            <div class="item-content" v-if="baseInfo.identity === 0">
              <div class="text">
                普通用户
              </div>
              <div class="image">
                <img src="../assets/img/home/user.png" style="margin: 5px; width: 35px; height: 35px; position: relative; left: -100px; filter: drop-shadow(100px 0px rgba(98,100,100,0.82)); ">
              </div>
            </div>
            <div class="item-content" v-if="baseInfo.identity === 1">
              <div class="text">
                认证学者
              </div>
              <div class="image">
                <img src="../assets/img/home/scholar.png">
              </div>
            </div>
          </div>
          <div class="content-item">
            <div class="item-name">
              当前状态
            </div>
            <div class="item-content" v-if="baseInfo.state === 0">
              <div class="text" style="width: 50px;">
                正常
              </div>
              <div class="image">
                <img src="../assets/img/home/state-point.png" style="width: 80px; height: 80px; position: relative; left: -110px; filter: drop-shadow(90px 0px rgba(8,117,8,0.82)); ">
              </div>
            </div>
            <div class="item-content" v-if="baseInfo.state === 1">
              <div class="text" style="width: 50px;">
                禁言
              </div>
              <div class="image">
                <img src="../assets/img/home/state-point.png" style="width: 80px; height: 80px; position: relative; left: -110px; filter: drop-shadow(90px 0px rgba(217,4,21,0.97)); ">
              </div>
            </div>
            <div class="item-content" v-if="baseInfo.state === 2">
              <div class="text" style="width: 50px;">
                封禁
              </div>
              <div class="image">
                <img src="../assets/img/home/state-point.png" style="width: 80px; height: 80px; position: relative; left: -110px; filter: drop-shadow(90px 0px rgb(0,0,0)); ">
              </div>
            </div>
          </div>
          <div class="content-item">
            <div class="item-name">
              生日
            </div>
            <div class="item-content" v-if="baseInfo.birthday !== null" v-if="baseInfo.birthday !== null">
              {{baseInfo.birthday}}
            </div>
            <div class="item-content" v-if="baseInfo.birthday === null">
              未设置
            </div>
            <div class="item-content" v-if="baseInfo.birthday === null">
              未设置
            </div>
          </div>
          <div class="content-item">
            <div class="item-name">
              性别
            </div>
            <div class="item-content" v-if="baseInfo.gender !== null && baseInfo.gender !== null && baseInfo.gender===0">
              保密
            </div>
            <div class="item-content" v-if="baseInfo.gender !== null && baseInfo.gender !== null && baseInfo.gender===1">
              男
            </div>
            <div class="item-content" v-if="baseInfo.gender !== null && baseInfo.gender !== null && baseInfo.gender===2">
              女
            </div>
            <div class="item-content" v-if="baseInfo.gender === null">
              未设置
            </div>
          </div>
          <div class="content-item">
            <div class="item-name">
              个人简介
            </div>
            <div class="item-content" v-if="baseInfo.bio !== null" v-if="baseInfo.bio !== null">
              {{baseInfo.bio}}
            </div>
            <div class="item-content" v-if="baseInfo.bio === null">
              未设置
            </div>
          </div>
          <el-button type="primary" plain icon="el-icon-edit" style="position: absolute; right: 0px; top: 0px;" @click="editInfoVisible = true;">编辑信息</el-button>
          <el-button type="primary" plain icon="el-icon-lock" style="position: absolute; right: 150px; top: 0px;" @click="changePwdVisible = true;">修改密码</el-button>
          <el-dialog title="编辑信息" :visible="editInfoVisible" width="35%" :center="isCenter">
            <el-form :model="infoForm" label-width="80px">
              <el-form-item label="用户名" label-width="80px">
                <el-input v-model="infoForm.name" autocomplete="off" :placeholder="infoForm.name"></el-input>
              </el-form-item>
              <el-form-item label="邮箱" >
                <el-input v-model="infoForm.mail" autocomplete="off" :placeholder="infoForm.mail"></el-input>
              </el-form-item>
              <el-form-item label="生日" >
                <el-date-picker
                    v-model="infoForm.birthday"
                    type="date"
                    placeholder="选择日期">
                </el-date-picker>
              </el-form-item>
              <el-form-item label="性别" >
                <el-select v-model="infoForm.gender" placeholder="请选择性别">
                  <el-option label="保密" :value=0></el-option>
                  <el-option label="男" :value=1></el-option>
                  <el-option label="女" :value=2></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="个人简介">
                <el-input
                    type="textarea"
                    maxlength="60"
                    placeholder="请输入内容"
                    v-model="infoForm.bio">
                </el-input>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer" style=" position: relative; top: -20px;">
              <el-button @click="editInfoVisible = false">取 消</el-button>
              &emsp;&emsp;&emsp;
              <el-button type="primary" plain @click="changeInfo(uid); editInfoVisible = false">确 定</el-button>
            </div>
          </el-dialog>
          <el-dialog title="修改密码" :visible="changePwdVisible" width="35%" :center="isCenter">
            <el-form :model="password" label-width="80px">
              <el-form-item label="原密码" label-width="80px">
                <el-input v-model="password.password_old" autocomplete="off" placeholder="请输入原密码" show-password clearable></el-input>
              </el-form-item>
              <el-form-item label="新密码" >
                <el-input v-model="password.password1" autocomplete="off" placeholder="请输入新密码" show-password clearable></el-input>
              </el-form-item>
              <el-form-item label="确认密码" >
                <el-input v-model="password.password2" autocomplete="off" placeholder="请再次输入新密码" show-password clearable></el-input>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer" style=" position: relative; top: -20px;">
              <el-button @click="changePwdVisible = false">取 消</el-button>
              &emsp;&emsp;&emsp;
              <el-button type="primary" plain @click="changePwd(uid); changePwdVisible = false">确 定</el-button>
            </div>
          </el-dialog>
        </div>
        <div class="show-box" v-if="isActive3">
          <div class="user-avatar">
            <img :src="require('../assets/' + baseInfo.avatar)">
          </div>
          <el-button type="primary" plain icon="el-icon-edit" style="position: absolute; left: 50px; bottom: 10px;" @click="changeAvatarVisible = true">更换头像</el-button>
          <el-dialog
              title="上传头像"
              :visible.sync="changeAvatarVisible"
              width="30%"
              class = "changeAvatar">
              <span>
                <input type="file" ref="pic">
              </span>
              <span slot="footer" class="dialog-footer">
                <el-button @click="changeAvatarVisible = false">取 消 上 传</el-button>
                <el-button type="primary" @click="toChangeAvatar(uid)">确 定 上 传</el-button>
              </span>
          </el-dialog>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {format} from 'date-fns';
import moment from 'moment';

import {format} from 'date-fns';
import moment from 'moment';

export default {
  name: "Home",
  data() {
    return {
      uid: 1,
      closable: true, //是否可关闭dialog
      isCenter: true, //dialog footer 和 head 是否居中
      closable: true, //是否可关闭dialog
      isCenter: true, //dialog footer 和 head 是否居中
      isActive1: true, //true 则展示系统消息
      isActive2: false, //true 则展示收到的私信
      isActive3: false, //true 则展示发送的私信
      avatar: 'img/home/avatar1.jpg',
      username: 'Peter',
      institution: 'Beihang University',
      bio: 'I am Peter',
      isFollow: false,
      isLike: false,
      isScholar: false,
      editInfoVisible: false,
      changePwdVisible: false,
      changeAvatarVisible: false,
      password: {
        id: this.uid,
        password_old: '',
        password1: '',
        password2: '',
      },
      changePwdVisible: false,
      changeAvatarVisible: false,
      password: {
        id: this.uid,
        password_old: '',
        password1: '',
        password2: '',
      },
      infoForm: {
        name: '',
        name: '',
        mail: '',
        birthday: '',
        bio: '',
        gender: null,
        style: {
          width: "100px",
        }
      },
      baseInfo: {
        username:"lisi",
        avatar: 'img/home/avatar1.jpg',
        mail: '123@qq.com',
        birthday: "2022-10-16",
        institution: {
          name: 'Beihang University',
        },
        follows: 32,
        likes: 20,
        followers: 15,
        follows: 32,
        likes: 20,
        followers: 15,
        identity: 1,
        bio:"2234223422342234223422342234223422342234",
        state: 1,
        gender: 1,
        login_date: '2022-10-16 22:10:16',
      },

    }
  },
  methods: {
    toFollowerList() {
      let that = this;
      that.$router.push('/followList');
    },
    toFollowList() {
      let that = this;
      that.$router.push('/followList');
    },
    toFollowerList() {
      let that = this;
      that.$router.push('/followList');
    },
    toFollowList() {
      let that = this;
      that.$router.push('/followList');
    },
    changePage(currentPage) {
      this.showList = [];
      for(let i = (currentPage-1)*3, j = 0; i < this.followList.length && j < 3; i++,j++) {
        this.showList[j] = this.followList[i]
      }
    },
    changeActive1() {
      if(!this.isActive1) {
        this.isActive1 = true;
        this.isActive2 = false;
        this.isActive3 = false;
      }
    },
    changeActive2() {
      if(!this.isActive2) {
        this.isActive2 = true;
        this.isActive1 = false;
        this.isActive3 = false;
      }
    },
    changeActive3() {
      if(!this.isActive3) {
        this.isActive3 = true;
        this.isActive1 = false;
        this.isActive2 = false;
      }
    },
    changePwd(uid) {
      let param = this.password
      param.id = uid
      console.log(param)
      this.axios({
        headers: {
          jwt: this.$store.state.token,
        },
        method: 'post',
        url: 'http://139.9.134.209:8000/api/relation/changePwd',
        data: param,
      })
      .then(res => {
        console.log(res.data)
        if(res.data.errno === 0) {
          this.$message ({
            message: '修改成功',
            type: 'success',
            showClose: true,
          });
        }
        else {
          this.$message ({
            message: res.data.msg,
            type: 'error',
            showClose: true,
          });
        }

      })
      .catch(err => {
        console.log(err);
      })

      this.password = { //重置为空
        id: this.uid,
        password_old: '',
        password1: '',
        password2: '',
      }
    },
    toChangeAvatar(){
      this.changeAvatarVissible = false;
      const tempthis = this;
      let fileToUpload = this.$refs.pic.files[0];
      //console.log(fileToUpload)
      let param = new FormData();  //创建表单对象
      param.append("avatar",fileToUpload);
      // param.append("uid",tempthis.$store.state.userInfo.uid);
      param.append("uid",tempthis.uid);

      param.forEach((value, key) => {
        console.log(`key ${key}: value ${value}`);
      })

      this.axios({
        method: 'post',
        url: 'http://139.9.134.209:8000/api/relation/editInfo/aaa',
        data: param,
        headers: {
          jwt: this.$store.state.token,
        },
      })
      .then(res => {
        console.log(res.data)
        if(res.data.errno===0) {
          tempthis.$message({
            type: 'success',
            showClose: true,
            message: "头像上传成功",
          })
        }
        else {
          if(res.data.errno===0) {
            tempthis.$message({
              type: 'success',
              showClose: true,
              // message: "res.data.msg",
              message: "头像上传失败",
            })
          }
        }
        tempthis.getBaseInfo(tempthis.uid);
        console.log(this.baseInfo)

      })
      .catch(err => {
        console.log(err);
      })

    },
    changePwd(uid) {
      let param = this.password
      param.id = uid
      console.log(param)
      this.axios({
        headers: {
          jwt: this.$store.state.token,
        },
        method: 'post',
        url: 'http://139.9.134.209:8000/api/relation/changePwd',
        data: param,
      })
          .then(res => {
            console.log(res.data)
            if(res.data.errno === 0) {
              this.$message ({
                message: '修改成功',
                type: 'success',
                showClose: true,
              });
            }
            else {
              this.$message ({
                message: res.data.msg,
                type: 'error',
                showClose: true,
              });
            }

          })
          .catch(err => {
            console.log(err);
          })

      this.password = { //重置为空
        id: this.uid,
        password_old: '',
        password1: '',
        password2: '',
      }
    },
    toChangeAvatar(){
      this.changeAvatarVissible = false;
      const tempthis = this;
      let fileToUpload = this.$refs.pic.files[0];
      //console.log(fileToUpload)
      let param = new FormData();  //创建表单对象
      param.append("avatar",fileToUpload);
      // param.append("uid",tempthis.$store.state.userInfo.uid);
      param.append("uid",tempthis.uid);

      param.forEach((value, key) => {
        console.log(`key ${key}: value ${value}`);
      })

      this.axios({
        method: 'post',
        url: 'http://139.9.134.209:8000/api/relation/editInfo/aaa',
        data: param,
        headers: {
          jwt: this.$store.state.token,
        },
      })
          .then(res => {
            console.log(res.data)
            if(res.data.errno===0) {
              tempthis.$message({
                type: 'success',
                showClose: true,
                message: "头像上传成功",
              })
            }
            else {
              if(res.data.errno===0) {
                tempthis.$message({
                  type: 'success',
                  showClose: true,
                  // message: "res.data.msg",
                  message: "头像上传失败",
                })
              }
            }
            tempthis.getBaseInfo(tempthis.uid);
            console.log(this.baseInfo)

          })
          .catch(err => {
            console.log(err);
          })

    },
    changeInfo(uid) {
      let birth;
    // .format("yyyy-MM-dd"),
      console.log(typeof this.infoForm.birthday)
      birth = format(this.infoForm.birthday, "yyyy-MM-dd");
      console.log(birth)

      // console.log(this.infoForm.birthday)
      let param = {
        id: uid,
        name: this.infoForm.name,
        mail: this.infoForm.mail,
        birthday: birth,
        gender: this.infoForm.gender,
        bio: this.infoForm.bio,
      }
      console.log(param)
      this.axios({
        headers: {
          jwt: this.$store.state.token,
        },
        headers: {
          jwt: this.$store.state.token,
        },
        method: 'post',
        url: 'http://139.9.134.209:8000/api/relation/editInfo',
        data: param,
      })
          .then(res => {
            console.log(res.data)
        if(res.data.errno === 0) {
          if(res.data.errno === 0) {
            this.$message ({
              message: "取消成功",
              showClose: true,
              type: 'success',
            })
            this.baseInfo.follows--;
            this.getBaseInfo(uid); //重新获取数据
          }
            if(res.data.errno === 0) {
              if(res.data.errno === 0) {
                this.$message ({
                  message: "取消成功",
                  showClose: true,
                  type: 'success',
                })
                this.baseInfo.follows--;
                this.getBaseInfo(uid); //重新获取数据
              }

          else {
            this.$message ({
              message: "操作失败",
              showClose: true,
              type: 'error',
            })
          }
        }

          })
          .catch(err => {
            console.log(err);
          })

      this.infoForm = {
        name: '',  //重置为空
        mail: '',
        birthday: '',
        bio: '',
        gender: null,
        style: {
          width: "100px",
        },
      }

      this.infoForm = {
        name: '',  //重置为空
        mail: '',
        birthday: '',
        bio: '',
        gender: null,
        style: {
          width: "100px",
        },
      }
    },
    getBaseInfo(uid) {
      this.axios({
        method: 'get',
        url: 'http://139.9.134.209:8000/api/relation/getBaseInfo?user_id=' + uid,
        headers: {
          jwt: this.$store.state.token,
        },
        headers: {
          jwt: this.$store.state.token,
        },
      })
          .then(res => {
            console.log(res.data)

        this.baseInfo = res.data
            if(this.baseInfo.avatar === null) {
          if(this.baseInfo.avatar === null) {
          this.baseInfo.avatar = 'img/home/no-avatar.png'
        }
        // this.baseInfo.avatar = 'img/home/no-avatar.png'
            }
            // this.baseInfo.avatar = 'img/home/avatar1.jpg'
        console.log(this.baseInfo)

      })
      .catch(err => {
        console.log(err);
      })

    },
  },

  created() {
    this.getBaseInfo(1);
  }
}
</script>

<style scoped>
* {
  margin: 0px;
  padding: 0px;
  box-sizing: border-box;
}

.home {
  height: 790px;
  width: 100%;
  min-width: 1400px;
}
.intro {
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  min-width: 1400px;
  height: 200px;
  display: flex;
  justify-content: flex-start;
  border-radius: 5px;
  box-shadow: 0 1px 20px 0 rgba(0, 0, 0, 0.1), 0 2px 20px 0 rgba(0, 0, 0, 0.1);
}

.avatar {
  position: relative;
  margin: 15px 0px 15px 30px;
  width: 170px;
  width: 170px;
  height: 170px;
  vertical-align: middle;
}

.avatar img {
  height: 170px;
  width: 170px;
  width: 170px;
  max-height: 100%;
  vertical-align: middle;
  border-radius: 5px;
}

.profile {
  position: relative;
  margin:10px;
  width: 150px;
  height: 150px;
}

.profile ul {
  list-style: none;
}

.profile .profile-list .profile-list-item {
  margin: 15px 10px 30px 10px;
  width: 600px;
  display: flex;
  height: 30px;
  line-height: 40px;
  align-items: center;
}

.profile .profile-list .profile-list-item .icon {
  font-size: 25px;
  margin-right: 10px;
  margin-top: 4px;
}

.profile .profile-list .profile-list-item .text {
}

.social-info {
  position: absolute;
  right: 0px;
  bottom: 0px;
  width: 360px;
  height: 80px;
  display: flex;
  justify-content: flex-end;
}

.social-info .social-info-item {
  width: 120px;
  height: 80px;
  cursor: pointer;
  transition: 0.2s
  transition: 0.2s
}

.social-info .social-info-item:hover {
  color: #2196f3;
}

.social-info .social-info-item .title {
  width: 120px;
  height: 40px;


}

.social-info .social-info-item .title .icon {
  position: relative;
  margin: 0 5px 0 30px;
  font-size: 20px;
  top: 5px;
}

.social-info .social-info-item .title .icon.active{
  color: pink;
}

.social-info .social-info-item .title .text {
  position: relative;
  top: 2px;
  margin: 0px 20px 0 0;
}

.social-info-number {
  width: 120px;
  height: 40px;
  display: flex;
  justify-content: flex-end;
}

.social-info-number .number {
  position: relative;
  top: 5px;
  margin: 0 auto;
}

.info-box {
  position: relative;
  top: 220px;
  width: 100%;
  min-width: 1400px;
  height: 550px;
  border-radius: 5px;
  box-shadow: 0 1px 20px 0 rgba(0, 0, 0, 0.1), 0 2px 20px 0 rgba(0, 0, 0, 0.1);
}

.info-box:hover {

}

.info-box .title {
  height: 60px;
  line-height: 50px;
  position: absolute;
  top: 20px;
  left: 30px;
  display: flex;
  align-items: center;
}

.info-box .title .image{
  height: 60px;
  width: 60px;
  overflow: hidden;
}

.info-box .title .image img{
  height: 60px;
  width: 60px;
  position: relative;
  left: -70px;
  filter: drop-shadow(70px 0px rgba(48, 105, 243, 0.82));
}

.info-box .title-name {
  margin: 0 0 0 10px;
  font-size: 35px;
  font-weight: 900;
}

.divider-x {
  position: absolute;
  margin: 0 auto;
  /*width: 1350px;*/
  width: 100%;
  height: 2px;
  /*left: 25px;*/
  top: 90px;
  background-color: #d4d4d4;
  text-align: center;
  font-size: 16px;
  color: rgba(101, 101, 101, 1);
}

.source-box {
  display: inline-block;
  top: 110px;
  left: 5px;
  position: relative;
  height: 430px;
  width: 300px;
  overflow: hidden;
  z-index: 1;
}

.source-box:hover {
  cursor: pointer;
}

.source-box .source-item {
  /*background: rgb(244,244,244);*/
  position: relative;
  height: 70px;
  width: 250px;
  border-radius: 5px;
  margin: 10px 25px 10px 25px;
  vertical-align: middle;
  text-align: center;
  align-items: center;
  justify-content: center;
  transition: all 0.6s;
  overflow: hidden;
  display: flex;
  box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.2);
}

.source-box .source-item:hover,
.source-box .source-item.active {
  background-color: rgba(244, 244, 244, 0.9);
  /*background-color: #f4f4f4;*/
  height: 70px;
  width: 250px;
  /*margin: 5px 15px 5px 15px;*/
}

.source-box .source-item .image{
  min-width: 40px;
  min-height: 40px;
  font-size: 40px;
  line-height: 70px;
  margin-right: 10px;
  transition: 0.6s;
  /*margin: 0 30px 0 40px;*/
}

.source-box .source-item:hover .image,
.source-box .source-item.active.active .image {
  margin-top: 5px;
  color: #4DA5FF;
}

.source-box .source-item .image img {
  height: 40px;
  width: 40px;
  /*margin: 10px 30px 10px 40px;*/
  transition-property: height, width, margin;
  transition: ease-in 0.6s ease-out 0s;
}

.source-box .source-item.active .image img{
  height: 50px;
  width: 50px;
  margin: 10px 30px 10px 35px;
  position: relative;
  left: -100px;
  filter: drop-shadow(100px 0px rgba(48, 105, 243, 0.82));
}

.source-box .source-item .name {
  font-size:20px;
  font-weight: 900;
  text-align: center;
  transition-property: font-size, font-weight, top;
  transition: all 0.6s;
  overflow: hidden;
  line-height: 70px;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.source-box .source-item:hover .name,
.source-box .source-item.active .name {
  color: #4DA5FF;
  font-size: 25px;
  font-weight: 900;
  text-overflow: ellipsis;
}

.divider-y {
  display: inline-block;
  position: absolute;
  top: 93px;
  margin: 2px 0 0 0;
  left: 320px;
  width: 2px;
  height: 450px;
  background-color: #d4d4d4;
  font-size: 16px;
  color: green;
  z-index: 2;
}

.info-box .content-box {
  display: inline-block;
  /*border: solid red;*/
  position: absolute;
  top: 95px;
  left: 340px;
  width: 1050px;
  margin: auto;
  height: 450px;
}

.info-box .content-box .show-box {
  /*border: solid red;*/
  width: 900px;
  height: 430px;
  position: relative;
  top: 10px;
  left: 100px;
}

.info-box .content-box .show-box .content-item {
  /*border: solid red;*/
  /*border: solid red;*/
  display: flex;
  flex-direction: row;
  width: 850px;
  height: 50px;
  margin: 10px 0px 10px 5px;
}

.info-box .content-box .show-box .content-item .item-name {
  /*border: solid red;*/
  display: flex;
  position: relative;
  left: 0px;
  top: 0px;
  height: 50px;
  width: 120px;
  font-size: 25px;
  font-weight: bold;
  text-align: right;
  line-height: 50px;
  flex-direction: row-reverse;
  align-items: center;
}

.info-box .content-box .show-box .content-item .item-content {
  /*border: solid red;*/
  display: flex;
  position: relative;
  left: 50px;
  height: 50px;
  width: 650px;
  font-size: 20px;
  font-weight: normal;
  flex-direction: row;
  line-height: 50px;
  align-items: center;
}

.info-box .content-box .show-box .content-item .item-content .text {
  /*border: solid red;*/
  display: flex;
  position: relative;
  height: 50px;
  width: 90px;
  font-size: 20px;
  font-weight: normal;
  flex-direction: row;
  line-height: 50px;
  align-items: center;
}

.info-box .content-box .show-box .content-item .item-content .image {
  /*border: solid red;*/
  display: flex;
  position: relative;
  height: 50px;
  width: 50px;
  font-size: 20px;
  font-weight: normal;
  flex-direction: row;
  line-height: 50px;
  align-items: center;
  overflow: hidden;
}

.info-box .content-box .show-box .content-item .item-content .image img {
  height: 45px;
  width: 45px;
  position: relative;
}

/*************  我的头像 css  ***********/

.info-box .content-box .show-box .user-avatar {
  /*border: solid red;*/
  position: relative;
  left: -70px;
  top: 10px;
  width: 350px;
  height: 350px;
}

.info-box .content-box .show-box .user-avatar img {
  /*border: solid red;*/
  width: 330px;
  height: 330px;
  margin: 10px 10px 10px 10px;
  border-radius: 5px;
}






/*************  我的头像 css  ***********/

.info-box .content-box .show-box .user-avatar {
  /*border: solid red;*/
  position: relative;
  left: -70px;
  top: 10px;
  width: 350px;
  height: 350px;
}

.info-box .content-box .show-box .user-avatar img {
  /*border: solid red;*/
  width: 330px;
  height: 330px;
  margin: 10px 10px 10px 10px;
  border-radius: 5px;
}





</style>
