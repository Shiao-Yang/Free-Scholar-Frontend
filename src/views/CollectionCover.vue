<template>
  <div class="box">
    <div class="mask" v-if="this.visible === true"></div>
    <div class="windows" v-if="this.visible === true">
      <div class="newForm">
        <el-form ref="form" label-width="120px">
          <el-form-item label="收藏夹标题:" :model="form" style="width: 200px">
            <el-input v-model="form.title" style="width: 340px"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div class="nowSubmit">
        <el-button type="primary" @click="onSubmit">立即创建</el-button>
        <el-button style="margin-left: 30px" @click="close">取消</el-button>
      </div>
    </div>
    <div class="myCollection">
      <div class="title">
        <div class="titleName">
          <i style="color: #E1A105;font-size: 40px" class="el-icon-star-on" ></i>
          <span style="position: relative;top: -5px;left: 10px">
          我的收藏
        </span>
        </div>
      </div>
      <div class="divider"></div>
      <div class="MyCreate">
        <div class="Mytitle">
          <div class="SubTitleText">
            <i class='bx bxs-folder' style="color: orange"></i>
            <span class="sub-title">我创建的</span>
          </div>
        </div>
        <div class="item" v-for="(item,index) in MyCreateList" :key="index" :title="item.title" @click="toCollection(1, index)">
          <img :src="'http://139.9.134.209:8000/media/coverimgs/'+item.avatar" class="cover">
          <div class="name">
            {{item.title}}
          </div>
          <div class="date">
            创建于{{item.date}}
          </div>
        </div>
        <div class="item" title="新建">
        <div class="newCollection">
          <i class='bx bx-plus' style="font-size: 150px;position: relative;left: 12px" @click="newCollect"></i>
        </div>
        <div class="name">
          新建收藏夹
        </div>
        <div class="date">
          &nbsp;
        </div>
      </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CollectionCover",
  data() {
    return {
      form :{
        title : '',
      },
      visible : false,
      name:'这是一个标题很长的收藏夹',
      MyCreateList:[
        {
          "id":1,
          "title":"编译技术答案",
          "date":"2021-12-01",
        },
        {
          "id":1,
          "title":"编译技术答案",
          "date":"2021-12-01",
        },
      ],
      MyCollection:[
        {
          "id":1,
          "title":"编译技术答案",
          "date":"2021-12-01",
        },
        {
          "id":1,
          "title":"编译技术答案",
          "date":"2021-12-01",
        },
      ],
    };
  },
  created() {
    this.getCollections();
  },
  filters:{
    ellipsis(value){
      if (!value) return '';
      if (value.length > 8) {
        return value.slice(0,8) + '...'
      }
      return value
    }
  },
  methods: {
    getCollections(){
      this.MyCollection = [];
      this.MyCreateList = [];
      this.$axios({
        headers: {
          jwt: JSON.parse(sessionStorage.getItem('baseInfo')).token,
        },
        method: 'get',
        url: this.$store.state.address+'api/relation/getFavorites',
        data: '1',
      }).then(res =>{
        var i = 0;
        for (i = 0; i < res.data.length; i++){
          this.MyCreateList.push({
            id : res.data[i].id,
            title : res.data[i].title,
            avatar : res.data[i].avatar,
            count : res.data[i].count,
            date : res.data[i].time,
          })
        }
      })
      this.$axios({
        headers: {
          jwt: JSON.parse(sessionStorage.getItem('baseInfo')).token,
        },
        method: 'get',
        url: this.$store.state.address+'api/relation/getCollectFavorites',
        data: '1',
      }).then(res =>{
        var i = 0;
        for (i = 0; i < res.data.length; i++){
          this.MyCollection.push({
            id : res.data[i].id,
            title : res.data[i].title,
            avatar : res.data[i].avatar,
            count : res.data[i].count,
            date : res.data[i].time,
          })
        }
      })
    },
    onSubmit(){
      let params = {
        title: this.form.title,
      }
      this.$axios({
        headers: {
          jwt: JSON.parse(sessionStorage.getItem('baseInfo')).token,
        },
        method: 'post',
        url: this.$store.state.address+'api/relation/newFavorites',
        data: params,
      }).then(res =>{
        if(res.data.msg === '创建成功')
          this.$message.success(res.data.msg);
        else
          this.$message.error(res.data.msg);
        this.form.title = '';
        this.visible = false;
        this.getCollections();
      })
    },
    close(){
      this.visible = false;
    },
    newCollect(){
      this.visible = true;
    },
    handleChange(val) {
      console.log(val);
    },
    onItem() {
      this.itemStyle = 'background-color: #00AEEC';
    },
    leaveItem() {
      this.itemStyle = '';
    },
    toCollection(ListNum, index) {
      this.$router.push(
          {
            name: 'Collection',
            params: {
              selected: ListNum,
              index: index,
            }
          }
      );
    },
  }
}
</script>

<style scoped>
.nowSubmit {
  position: relative;
  top: 150px;
  left: 130px;
}
.newForm {
  position: relative;
  top: 80px;
  width: 600px;
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
  width: 500px;
  height: 350px;
  top: 130px;
  left: 500px;
  z-index: 1000;
}
.newCollection {
  border-radius: 10px;
  width: 180px;
  height: 150px;
  margin-bottom: 6px;
  background-color: #F4F4F4;
}
.dotClass {
  width:10px;
  height:10px;
  border-radius: 50%;
  display: inline-block;
  margin-left: 10px;
}
.date {
  margin-left: 3px;
  font-size: 8px;
  margin-bottom: 10px;
}
.name {
  width: 200px;
  margin-left: 3px;
  font-size: 21px;
  margin-bottom: 6px;
}
.cover {
  border-radius: 10px;
  width: 180px;
  height: 150px;
  margin-bottom: 6px;
}
.item {
  display: inline-block;
  margin-left: 20px;
  cursor: pointer;
}

.Mytitle {
  position: relative;
  height: 40px;
  margin-bottom: 20px;
  line-height: 30px;
  margin-left: 20px;
  font-size: 24px;
}

.MyCreate {
  text-align: left;
  background-color: white;
  box-shadow: 0 1px 20px 0 rgba(0, 0, 0, 0.1), 0 2px 20px 0 rgba(0, 0, 0, 0.1);
  width: 95%;
  min-width: 1050px;
  min-height: 500px;
  margin: 30px auto 30px;
  padding: 20px 10px;
  border-radius: 10px;
}
.titleName {
  position: relative;
  top: 25px;
  left: -40px;
}
.divider {
  position: relative;
  width: 100%;
  height: 2px;
  background-color: #d4d4d4;
  text-align: center;
  font-size: 16px;
  color: rgba(101, 101, 101, 1);
}
.title{
  font-size: 25px;
  margin-left: 100px;
  height: 80px;
}

.myCollection {
  width: 100%;
  min-width: 1125px;
  background-color: #FFFFFF;
  box-shadow: 0 1px 20px 0 rgba(0, 0, 0, 0.1), 0 2px 20px 0 rgba(0, 0, 0, 0.1);
  padding-bottom: 30px;
  margin: auto auto 30px;
}
</style>
