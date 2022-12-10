<template>
  <div class="box">
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
        <div class="item" v-for="(item,index) in MyCreateList" :key="index">
          <img src="../assets/Cover1.jpg" class="cover">
          <div class="name">
            {{MyCreateList[index].title}}
          </div>
          <div class="date">
            创建于{{MyCreateList[index].date}}
          </div>
        </div>
        <div class="item">
        <div class="newCollection">
          <i class='bx bx-plus' style="font-size: 150px;position: relative;left: 12px"></i>
        </div>
        <div class="name">
          新建收藏夹
        </div>
        <div class="date">
          &nbsp;
        </div>
      </div>
      </div>
      <div class="MyCreate">
        <div class="Mytitle">
          <i class='bx bxs-folder' style="color: orange"></i>
          我的收藏与订阅
        </div>
        <div class="item" v-for="(item,index) in MyCollection" :key="index">
          <img src="../assets/Cover1.jpg" class="cover">
          <div class="name">
            {{MyCollection[index].title}}
          </div>
          <div class="date">
            更新于{{MyCollection[index].date}}<i class="dotClass" style="background-color: red"></i>
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
    this.$axios({
      method: 'get',
      url: '',
      data: ''
    }).then(res =>{
      var i = 0;
      for (i = 0; i < res.data.length; i++){
        this.MyCreateList.push({

        })
      }
    })
    this.$axios({
      method: 'get',
      url: '',
      data: ''
    }).then(res =>{
      var i = 0;
      for (i = 0; i < res.data.length; i++){
        this.MyCollection.push({

        })
      }
    })
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
    handleChange(val) {
      console.log(val);
    },
    onItem() {
      this.itemStyle = 'background-color: #00AEEC';
    },
    leaveItem() {
      this.itemStyle = '';
    },

  }
}
</script>

<style scoped>
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
  height: auto;
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
