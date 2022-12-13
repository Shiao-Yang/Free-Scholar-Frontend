<template>
  <div class="admitScholar-container">
    <div class="step-box">
      <el-steps :active="currentStep" align-center finish-status="success">
        <el-step :title="status1" icon="el-icon-edit" description="填写验证信息" ></el-step>
        <el-step :title="status2" icon="el-icon-s-promotion" description="验证身份"></el-step>
        <el-step :title="status3" icon="el-icon-circle-check" description="成功发送申请"></el-step>
      </el-steps>
    </div>
    <div class="main-container">
      <div class="edit-box" v-if="currentStep === 0">
        <div class="input-list">
          <div class="input-item">
            <span class="input-label">真实姓名</span>
            <input class="input-box" type="text" v-model="name">
          </div>
          <div class="input-item">
            <span class="input-label">邮箱地址</span>
            <input class="input-box" type="text" v-model="e_mail">
          </div>
        </div>
        <div class="option-box">
          <el-button class="option-btn" type="primary" plain @click="submitInfo()">提交</el-button>
          <el-button class="option-btn" type="danger" @click="$router.back()" plain>取消</el-button>
        </div>
      </div>
      <div class="verify-box" v-else-if="currentStep === 1">
        <div class="head-text-box">
          <span class="verify-icon"><i class='bx bx-envelope'></i></span>
          <span class="verify-notice">验证码已发送至邮箱<br>
            <span class="eMail-info">{{e_mail}}</span>
          </span>
        </div>
        <div class="verify-code-box">
          <div class="input-list">
            <div class="input-item">
              <span class="input-label">验证码</span>
              <input class="input-box" type="text" v-model="verifyCode">
              <span>
                <el-button :loading="loading" :class="{'disabled-style':getCodeBtnDisable}" :disabled="getCodeBtnDisable" type="primary" style="width: 120px; height:30px;text-align: center; position: relative; left: 20px;" @click="submitInfo">
                  {{codeBtnWord}}
                </el-button>
              </span>
            </div>
          </div>
        </div>
        <div class="option-box">
          <el-button class="option-btn" type="primary" plain @click="verify()">提交</el-button>
          <el-button class="option-btn" type="danger" @click="$router.back()" plain>取消</el-button>
        </div>
      </div>
      <div class="success-main-box" v-else-if="currentStep === 3">
        <div class="success-box" >
          <div class="success-icon"><i class='bx bx-check-circle'></i></div>
          <div class="success-info">
            <p class="success-text">
              已完成验证
            </p>
          </div>
        </div>
        <div class="option-box" style="margin-top: 30px">
          <el-button class="option-btn" type="success" plain @click="$router.back()">返回</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "AdmitScholar",
  data() {
    return {
      currentStep: 0,
      name: '',
      e_mail: '',
      verifyCode: '',
      author_id: 'a',
      number: 60,
      time: null,
      getCodeBtnDisable: false,
      // loading: true,
      codeBtnWord: '获取验证码', // 获取验证码按钮文字
      waitTime: 61, // 获取验证码按钮失效时间
      phone: {
        phone: '',
        code: ''
      },
    }
  },
  computed : {
    status1(){
      if(this.currentStep > 0)
        return '已完成'
      else
        return '进行中'
    },
    status2() {
      switch (this.currentStep) {
        case 0:
          return '步骤2'
        case 1:
          return '进行中';
        case 3:
          return '已完成';
      }
    },
    status3() {
      switch (this.currentStep) {
        case 0:
        case 1:
          return '步骤3'
        case 3:
          return '已完成'
      }
    }
  },
  methods : {
    phoneTimer() {
      const that = this
      that.waitTime--
      that.getCodeBtnDisable = true
      this.codeBtnWord = `${this.waitTime}s 后重新获取`
      console.log('获取时间的值2：' + this.waitTime)
      const timer = setInterval(function() {
        if (that.waitTime > 1) {
          that.waitTime--
          that.codeBtnWord = `${that.waitTime}s 后重新获取`
          // this.loading = true;
        } else {
          clearInterval(timer)
          that.codeBtnWord = '获取验证码'
          that.getCodeBtnDisable = false
          that.waitTime = 61
          // this.loading = false;
        }
      }, 1000)
    },

    submitInfo() {
      let self = this;
      let formdata = new FormData();
      formdata.append("email", self.e_mail)
      this.axios( {
        headers: {
          jwt: JSON.parse(sessionStorage.getItem('baseInfo')).token,
        },
        method: "POST",
        url: self.$store.state.address+"api/user/sendEmail/",
        data: formdata,
      }).then(res => {
        console.log(res.data)
        if(res.data.result === 1) {
          // console.log("成功发送邮件")
          this.$message({
            message: '成功发送邮件',
            showClose: true,
            type: 'success',
          })
          this.currentStep = 1;
          this.phoneTimer();
        }
        else {
          this.$message({
            message: res.data.msg,
            showClose: true,
            type: 'error',
          })
        }
      }).catch(err => {
        console.log(err)
      })
    },
    verify() {
      let self = this
      let formdata = new FormData
      formdata.append("code", self.verifyCode)
      this.axios({
        headers: {
          jwt: JSON.parse(sessionStorage.getItem('baseInfo')).token,
        },
        method: "POST",
        url: self.$store.state.address+"api/user/checkCode/",
        data: formdata,
      }).then(res => {
        console.log(res.data)
        if(res.data.error === 1) {
          this.$message({
            message: '验证码错误',
            showClose: true,
            type: 'error',
          })
        }
        else {
          this.$message({
            message: '验证码正确',
            showClose: true,
            type: 'success',
          })

          setTimeout(() => {
            this.currentStep = 3;
            this.admitScholar();
          }, 1000 )
        }
      })
    },



    start() {
      this.time=setInterval(function(){
        this.number--;
      },1000)
      if(this.number === 0) {
        clearInterval(this.time)
      }
    },

    stop() {
      // if(this.time === 0) {
      //   clearInterval(this.time)
      // }
    },

    admitScholar() {
      let self = this
      let formdata = new FormData
      formdata.append("name", self.name)
      formdata.append("email", self.e_mail)
      formdata.append("author_id", self.author_id)
      this.axios({
        headers: {
          jwt: JSON.parse(sessionStorage.getItem('baseInfo')).token,
        },
        method: "POST",
        url: self.$store.state.address+"api/user/admitScholar/",
        data: formdata,
      }).then(res => {
        console.log(res.data)
        if(res.data.errno === 0) {
          this.$message({
            message: '申请成功',
            showClose: true,
            type: 'success',
          })
        }
        else {
          this.$message({
            message: res.data.msg,
            showClose: true,
            type: 'error',
          })
        }
      })
    },
  },

  created() {
    this.author_id = this.$route.query.author_id
    this.scholar_id = this.$route.query.scholar_id
  }
}
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
}

.admitScholar-container {
  width: 100%;
  height: 100%;
}

.step-box {
  width: 100%;
  margin-top: 150px;
}

.main-container {
  margin-top: 100px;
  width: 100%;
}

.edit-box, .verify-box, .success-main-box {
  width: 100%;
  align-items: center;
  text-align: center;
}

.input-list {
  margin-top: 30px;
}

.input-item {
  width: 100%;
  height: 40px;
  line-height: 40px;
  margin: 40px 0;
}

.input-item .input-label {
  height: 40px;
  line-height: 40px;
  min-width: 120px;
  display: inline-block;
  font-weight: bold;
}

.input-item .input-box {
  outline: none;
  border: 2px solid rgba(244, 244, 244, 0.8);
  width: 200px;
  height: 25px;
  line-height: 25px;
  padding: 5px 10px;
  font-size: 16px;
  border-radius: 10px;
  transition: 0.4s all ease;
}

.input-item .input-box:focus {
  border-radius: 15px;
  width: 230px;
  height: 30px;
  line-height: 30px;
  font-size: 18px;
  border: 2px solid #2196f3;
}

.option-btn {
  /*border: solid red;*/
  width: 120px;
  height: 40px;
  margin-right: 40px;
}

.verify-box .head-text-box {
  margin-top: 40px;
  line-height: 30px;
  /*min-height: 110px;*/
  height: auto;
}


.verify-icon {
  display: block;
  font-size: 50px;
}

.eMail-info {
  color: #2196f3;
}

.success-box {
  margin-top: 50px;
  display: flex;
  justify-content: center;
  text-align: center;
}

.success-box .success-icon {
  font-size: 100px;
  color: #27ae60;
  display: inline-block;
  min-width: 150px;
}

.success-box .success-info {
  text-align: left;
}

.success-box .success-info .success-text {
  font-size: 24px;
  font-weight: bold;
  line-height: 130px;
}

.success-box .success-info .return-info {
  line-height: 20px;
  font-size: 14px;
  color: rgba(0, 0, 0, 0.7);
}

</style>
