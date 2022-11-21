<template>
  <div class="box">
    <h3>
      this is collection
    </h3>
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
          <i class='bx bxs-folder' style="color: orange"></i>
          我创建的
        </div>
        <div class="item">
          <img src="../assets/Cover1.jpg" class="cover">
          <div class="name">
            植物学研究
          </div>
          <div class="date">
            创建于2021-11-03
          </div>
        </div>
        <div class="item">
        <img src="../assets/Cover1.jpg" class="cover">
        <div class="name">
          植物学研究
        </div>
        <div class="date">
          创建于2021-11-03
        </div>
      </div>
        <div class="item">
        <img src="../assets/Cover1.jpg" class="cover">
        <div class="name">
          {{name|ellipsis}}
        </div>
        <div class="date">
          创建于2021-11-03
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
        <div class="item">
          <img src="../assets/Cover1.jpg" class="cover">
          <div class="name">
            植物学研究
          </div>
          <div class="date">
            更新于2021-11-03<i class="dotClass" style="background-color: red"></i>
          </div>
        </div>
        <div class="item">
        <img src="../assets/Cover1.jpg" class="cover">
        <div class="name">
          植物学研究
        </div>
        <div class="date">
          更新于2021-11-03
        </div>
      </div>
        <div class="item">
        <img src="../assets/Cover1.jpg" class="cover">
        <div class="name">
          植物学研究
        </div>
        <div class="date">
          更新于2021-11-03<i class="dotClass" style="background-color: red"></i>
        </div>
      </div>
        <div class="item">
        <img src="../assets/Cover1.jpg" class="cover">
        <div class="name">
          植物学研究
        </div>
        <div class="date">
          更新于2021-11-03
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
      name:'这是一个标题很长的收藏夹'
    };
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
    }
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
  margin-bottom: 20px;
  left: 10px;
  font-size: 24px;
}
.MyCreate {
  text-align: left;
  position: relative;
  left: 35px;
  top: 20px;
  background-color: white;
  width: 1050px;
  height: auto;
  margin-bottom: 15px;
}
.titleName {
  position: relative;
  top: 25px;
  left: -40px;
}
.divider {
  position: relative;
  margin: 0 auto;
  width: 1100px;
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
.box{
  background-color: gray;
  height: 1000px;
  margin: auto;
}
.myCollection {
  height: 710px;
  width: 1125px;
  background-color: #F4F4F4;
  margin: auto;
}
</style>