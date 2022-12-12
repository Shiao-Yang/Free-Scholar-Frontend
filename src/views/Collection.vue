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
      <div class="main-container">
        <div class="Collections">
          <ul class="menu">
            <li class="menu-item" :class="{'active': activeMenu1}">
              <div class="menu-title" @click="activeMenu1 = !activeMenu1">
                <div class="menu-content">
                  <span class="menu-icon"><i class='bx bxs-bookmarks'></i></span>
                  <span class="menu-text">我创建的</span>
                </div>
                <span class="menu-arrow"><i class='bx bxs-chevron-left' ></i></span>
              </div>
              <ul class="sub-menu">
                <li class="sub-item">
                  <span class="sub-icon"><i class='bx bx-plus-circle'></i></span>
                  <span class="sub-text">新建收藏夹</span>
                  <span class="sub-edit-icon"></span>
                </li>
                <div v-for="(item,index) in List" :key="index">
                  <li class="sub-item" :class="{'active': item.isClick === 1}" @click="clickItem(index)">
                    <span class="sub-icon" v-if="item.isClick === 0"><i class='bx bxs-folder' ></i></span>
                    <span class="sub-icon" v-else><i class='bx bxs-folder-open' ></i></span>
                    <span class="sub-text">{{ item.name }}</span>
                    <span class="sub-edit-icon"><i class='bx bx-edit-alt' ></i></span>
                  </li>
                </div>
              </ul>
            </li>
            <li class="menu-item" :class="{'active': activeMenu2}" >
              <div class="menu-title" @click="activeMenu2 = !activeMenu2">
                <div class="menu-content">
                  <span class="menu-icon"><i class='bx bxs-collection' ></i></span>
                  <span class="menu-text">我收藏的</span>
                </div>
                <span class="menu-arrow"><i class='bx bxs-chevron-left' ></i></span>
              </div>
              <ul class="sub-menu">
                <li class="sub-item">
                  <span class="sub-text"></span>
                  <span class="sub-edit-icon"></span>
                </li>
              </ul>
            </li>
          </ul>
<!--          <el-collapse v-model="activeNames" @change="handleChange">-->
<!--            <el-collapse-item name="1">-->
<!--              <template slot="title">-->
<!--              <span style="font-size: 18px;margin-left: 20px">-->
<!--                我创建的-->
<!--              </span>-->
<!--              </template>-->
<!--              <div class="item" @mouseenter="onNew" @mouseleave="leaveNew" :style="NewStyle">-->
<!--                <i class="el-icon-circle-plus" style="margin-right: 5px;margin-left: 10px;"></i><b>新建收藏夹</b>-->
<!--              </div>-->
<!--              <div v-for="(item,index) in List" :key="index">-->
<!--                <div class="item" @mouseenter="onItem(index)" @mouseleave="leaveItem(index)" @click="clickItem(index)" :style="List[index].style">-->
<!--                  <div v-if="List[index].isClick === 0">-->
<!--                    <i class="bx bxs-folder" style="margin-right: 5px;margin-left: 10px;"></i><b>{{List[index].name}}</b>-->
<!--                  </div>-->
<!--                  <div v-if="List[index].isClick === 1">-->
<!--                    <i class="bx bxs-folder-open" style="margin-right: 5px;margin-left: 10px;color: white"></i><b style="color: white">{{List[index].name}}</b>-->
<!--                  </div>-->
<!--                </div>-->
<!--              </div>-->
<!--            </el-collapse-item>-->
<!--            <el-collapse-item name="2">-->
<!--              <template slot="title">-->
<!--              <span style="font-size: 18px;margin-left: 20px">-->
<!--                我的订阅与收藏-->
<!--              </span>-->
<!--              </template>-->
<!--              <div v-for="(item,index) in List1" :key="index">-->
<!--                <div class="item" @mouseenter="onItem1(index)" @mouseleave="leaveItem1(index)" @click="click1Item(index)" :style="List1[index].style">-->
<!--                  <div v-if="List1[index].isClick === 0">-->
<!--                    <i class="bx bxs-book-alt" style="margin-right: 5px;margin-left: 10px;"></i><b>{{List1[index].name}}</b>-->
<!--                    <span style="float: right;margin-right: 20px">-->
<!--                    32-->
<!--                  </span>-->
<!--                  </div>-->
<!--                  <div v-if="List1[index].isClick === 1">-->
<!--                    <i class="bx bxs-book-open" style="margin-right: 5px;margin-left: 10px;color: white"></i><b style="color: white">{{List1[index].name}}</b>-->
<!--                    <span style="float: right;margin-right: 20px;color: white">-->
<!--                    32-->
<!--                  </span>-->
<!--                  </div>-->
<!--                </div>-->
<!--              </div>-->
<!--              <div v-for="(item,index) in List2" :key="index">-->
<!--                <div class="item" @mouseenter="onItem2(index)" @mouseleave="leaveItem2(index)" @click="click2Item(index)" :style="List2[index].style">-->
<!--                  <div v-if="List2[index].isClick === 0">-->
<!--                    <i class="bx bxs-folder" style="margin-right: 5px;margin-left: 10px;"></i><b>{{List2[index].name}}</b>-->
<!--                  </div>-->
<!--                  <div v-if="List2[index].isClick === 1">-->
<!--                    <i class="bx bxs-folder-open" style="margin-right: 5px;margin-left: 10px;color: white"></i><b style="color: white">{{List2[index].name}}</b>-->
<!--                  </div>-->
<!--                </div>-->
<!--              </div>-->
<!--            </el-collapse-item>-->
<!--          </el-collapse>-->
        </div>
        <div class="CollectionItems">
          <div class="CollectionItem">
            <div class="itemTitle">
              改进的二分法查找
            </div>
            <div class="author">
              王嗨涛，朱虹-计算机工程，2006-cqvip.com
            </div>
            <div class="introductions">
              ...对有序数列的查找算法中二分法查找（binarysearch）是最常用的。利用二分法，在含有n个元素的有...之差的最大值的一个上界，就可以有比二分法
              更加有效的查找方式，文章给出了一个称之为改进的...
            </div>
            <div style="margin-top: 7px">
            <span style="margin-right: 50px">
              <i class='bx bxs-like' style="margin-right: 7px"></i>
              <span style="font-size: 14px">53</span>
            </span>
              <span style="margin-right: 50px">
              <i class='el-icon-star-on' style="margin-right: 7px;color: orange"></i>
              <span style="font-size: 14px">31</span>
            </span>
              <span style="margin-right: 50px">
              <i class='bx bxs-message-rounded-dots' style="margin-right: 7px"></i>
              <span style="font-size: 14px">10</span>
            </span>
              <span style="font-size: 14px">
              被引用次数：27
            </span>
            </div>
          </div>
          <div class="CollectionItem">
            <div class="itemTitle">
              改进的二分法查找
            </div>
            <div class="author">
              王嗨涛，朱虹-计算机工程，2006-cqvip.com
            </div>
            <div class="introductions">
              ...对有序数列的查找算法中二分法查找（binarysearch）是最常用的。利用二分法，在含有n个元素的有...之差的最大值的一个上界，就可以有比二分法
              更加有效的查找方式，文章给出了一个称之为改进的...
            </div>
            <div style="margin-top: 7px">
            <span style="margin-right: 50px">
              <i class='bx bxs-like' style="margin-right: 7px"></i>
              <span style="font-size: 14px">53</span>
            </span>
              <span style="margin-right: 50px">
              <i class='el-icon-star-on' style="margin-right: 7px;color: orange"></i>
              <span style="font-size: 14px">31</span>
            </span>
              <span style="margin-right: 50px">
              <i class='bx bxs-message-rounded-dots' style="margin-right: 7px"></i>
              <span style="font-size: 14px">10</span>
            </span>
              <span style="font-size: 14px">
              被引用次数：27
            </span>
            </div>
          </div>
          <div class="CollectionItem">
            <div class="itemTitle">
              改进的二分法查找
            </div>
            <div class="author">
              王嗨涛，朱虹-计算机工程，2006-cqvip.com
            </div>
            <div class="introductions">
              ...对有序数列的查找算法中二分法查找（binarysearch）是最常用的。利用二分法，在含有n个元素的有...之差的最大值的一个上界，就可以有比二分法
              更加有效的查找方式，文章给出了一个称之为改进的...
            </div>
            <div style="margin-top: 7px">
            <span style="margin-right: 50px">
              <i class='bx bxs-like' style="margin-right: 7px"></i>
              <span style="font-size: 14px">53</span>
            </span>
              <span style="margin-right: 50px">
              <i class='el-icon-star-on' style="margin-right: 7px;color: orange"></i>
              <span style="font-size: 14px">31</span>
            </span>
              <span style="margin-right: 50px">
              <i class='bx bxs-message-rounded-dots' style="margin-right: 7px"></i>
              <span style="font-size: 14px">10</span>
            </span>
              <span style="font-size: 14px">
              被引用次数：27
            </span>
            </div>
          </div>
          <div class="CollectionItem">
            <div class="itemTitle">
              改进的二分法查找
            </div>
            <div class="author">
              王嗨涛，朱虹-计算机工程，2006-cqvip.com
            </div>
            <div class="introductions">
              ...对有序数列的查找算法中二分法查找（binarysearch）是最常用的。利用二分法，在含有n个元素的有...之差的最大值的一个上界，就可以有比二分法
              更加有效的查找方式，文章给出了一个称之为改进的...
            </div>
            <div style="margin-top: 7px">
            <span style="margin-right: 50px">
              <i class='bx bxs-like' style="margin-right: 7px"></i>
              <span style="font-size: 14px">53</span>
            </span>
              <span style="margin-right: 50px">
              <i class='el-icon-star-on' style="margin-right: 7px;color: orange"></i>
              <span style="font-size: 14px">31</span>
            </span>
              <span style="margin-right: 50px">
              <i class='bx bxs-message-rounded-dots' style="margin-right: 7px"></i>
              <span style="font-size: 14px">10</span>
            </span>
              <span style="font-size: 14px">
              被引用次数：27
            </span>
            </div>
          </div>
          <div class="CollectionItem">
            <div class="itemTitle">
              改进的二分法查找
            </div>
            <div class="author">
              王嗨涛，朱虹-计算机工程，2006-cqvip.com
            </div>
            <div class="introductions">
              ...对有序数列的查找算法中二分法查找（binarysearch）是最常用的。利用二分法，在含有n个元素的有...之差的最大值的一个上界，就可以有比二分法
              更加有效的查找方式，文章给出了一个称之为改进的...
            </div>
            <div style="margin-top: 7px">
            <span style="margin-right: 50px">
              <i class='bx bxs-like' style="margin-right: 7px"></i>
              <span style="font-size: 14px">53</span>
            </span>
              <span style="margin-right: 50px">
              <i class='el-icon-star-on' style="margin-right: 7px;color: orange"></i>
              <span style="font-size: 14px">31</span>
            </span>
              <span style="margin-right: 50px">
              <i class='bx bxs-message-rounded-dots' style="margin-right: 7px"></i>
              <span style="font-size: 14px">10</span>
            </span>
              <span style="font-size: 14px">
              被引用次数：27
            </span>
            </div>
          </div>
          <div class="CollectionItem">
            <div class="itemTitle">
              改进的二分法查找
            </div>
            <div class="author">
              王嗨涛，朱虹-计算机工程，2006-cqvip.com
            </div>
            <div class="introductions">
              ...对有序数列的查找算法中二分法查找（binarysearch）是最常用的。利用二分法，在含有n个元素的有...之差的最大值的一个上界，就可以有比二分法
              更加有效的查找方式，文章给出了一个称之为改进的...
            </div>
            <div style="margin-top: 7px">
            <span style="margin-right: 50px">
              <i class='bx bxs-like' style="margin-right: 7px"></i>
              <span style="font-size: 14px">53</span>
            </span>
              <span style="margin-right: 50px">
              <i class='el-icon-star-on' style="margin-right: 7px;color: orange"></i>
              <span style="font-size: 14px">31</span>
            </span>
              <span style="margin-right: 50px">
              <i class='bx bxs-message-rounded-dots' style="margin-right: 7px"></i>
              <span style="font-size: 14px">10</span>
            </span>
              <span style="font-size: 14px">
              被引用次数：27
            </span>
            </div>
          </div>
          <div class="CollectionItem">
            <div class="itemTitle">
              改进的二分法查找
            </div>
            <div class="author">
              王嗨涛，朱虹-计算机工程，2006-cqvip.com
            </div>
            <div class="introductions">
              ...对有序数列的查找算法中二分法查找（binarysearch）是最常用的。利用二分法，在含有n个元素的有...之差的最大值的一个上界，就可以有比二分法
              更加有效的查找方式，文章给出了一个称之为改进的...
            </div>
            <div style="margin-top: 7px">
            <span style="margin-right: 50px">
              <i class='bx bxs-like' style="margin-right: 7px"></i>
              <span style="font-size: 14px">53</span>
            </span>
              <span style="margin-right: 50px">
              <i class='el-icon-star-on' style="margin-right: 7px;color: orange"></i>
              <span style="font-size: 14px">31</span>
            </span>
              <span style="margin-right: 50px">
              <i class='bx bxs-message-rounded-dots' style="margin-right: 7px"></i>
              <span style="font-size: 14px">10</span>
            </span>
              <span style="font-size: 14px">
              被引用次数：27
            </span>
            </div>
          </div>
          <div class="CollectionItem">
            <div class="itemTitle">
              改进的二分法查找
            </div>
            <div class="author">
              王嗨涛，朱虹-计算机工程，2006-cqvip.com
            </div>
            <div class="introductions">
              ...对有序数列的查找算法中二分法查找（binarysearch）是最常用的。利用二分法，在含有n个元素的有...之差的最大值的一个上界，就可以有比二分法
              更加有效的查找方式，文章给出了一个称之为改进的...
            </div>
            <div style="margin-top: 7px">
            <span style="margin-right: 50px">
              <i class='bx bxs-like' style="margin-right: 7px"></i>
              <span style="font-size: 14px">53</span>
            </span>
              <span style="margin-right: 50px">
              <i class='el-icon-star-on' style="margin-right: 7px;color: orange"></i>
              <span style="font-size: 14px">31</span>
            </span>
              <span style="margin-right: 50px">
              <i class='bx bxs-message-rounded-dots' style="margin-right: 7px"></i>
              <span style="font-size: 14px">10</span>
            </span>
              <span style="font-size: 14px">
              被引用次数：27
            </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Collection",
  data() {
    return {
      activeMenu1: false,
      activeMenu2: false,
      activeNames: [],
      NewStyle: '',
      List: [
        {
          "name" : '二分法',
          "style" : '',
          "isClick" : 0,
        },
        {
          "name" : '植物学研究',
          "style" : '',
          "isClick" : 0,
        },
        {
          "name" : '天文学论文合集',
          "style" : '',
          "isClick" : 0,
        },
        {
          "name" : '北美落叶林',
          "style" : '',
          "isClick" : 0,
        }
        ],
      List1: [
        {
          "name" : '二分法',
          "style" : '',
          "isClick" : 0,
        },
        {
          "name" : '植物学研究',
          "style" : '',
          "isClick" : 0,
        },
        {
          "name" : '天文学论文合集',
          "style" : '',
          "isClick" : 0,
        },
        {
          "name" : '北美落叶林',
          "style" : '',
          "isClick" : 0,
        }
      ],
      List2: [
        {
          "name" : '二分法',
          "style" : '',
          "isClick" : 0,
        },
        {
          "name" : '植物学研究',
          "style" : '',
          "isClick" : 0,
        },
        {
          "name" : '天文学论文合集',
          "style" : '',
          "isClick" : 0,
        },
        {
          "name" : '北美落叶林',
          "style" : '',
          "isClick" : 0,
        }
      ],
    };
  },
  methods: {
    handleChange(val) {
      console.log(val);
    },
    onNew() {
      this.NewStyle = 'border: #4DA5FF;\n' +
          '  border-style: inset;\n' +
          '  border-width: 2px;';
    },
    leaveNew() {
      this.NewStyle = '';
    },
    onItem(id) {
      this.List[id].style = this.List[id].style + 'border: #4DA5FF;\n' +
          '  border-style: inset;\n' +
          '  border-width: 2px;';
    },
    leaveItem(id) {
      if(this.List[id].isClick !== 1){
        this.List[id].style = '';
      }
    },
    clickItem(id) {
      var i = 0;
      for(i = 0;i < this.List.length; i++){
        this.List[i].isClick = 0;
        this.List[i].style = '';
      }
      this.List[id].isClick = 1;
      this.List[id].style = 'background-color: #00AEEC;';
    },
    onItem1(id) {
      this.List1[id].style = this.List1[id].style + 'border: #4DA5FF;\n' +
          '  border-style: inset;\n' +
          '  border-width: 2px;';
    },
    leaveItem1(id) {
      if(this.List1[id].isClick !== 1){
        this.List1[id].style = '';
      }
    },
    click1Item(id) {
      var i = 0;
      for(i = 0;i < this.List1.length; i++){
        this.List1[i].isClick = 0;
        this.List1[i].style = '';
      }
      for(i = 0;i < this.List2.length; i++){
        this.List2[i].isClick = 0;
        this.List2[i].style = '';
      }
      this.List1[id].isClick = 1;
      this.List1[id].style = 'background-color: #00AEEC;';
    },
    onItem2(id) {
      this.List2[id].style = this.List2[id].style + 'border: #4DA5FF;\n' +
          '  border-style: inset;\n' +
          '  border-width: 2px;';
    },
    leaveItem2(id) {
      if(this.List2[id].isClick !== 1){
        this.List2[id].style = '';
      }
    },
    click2Item(id) {
      var i = 0;
      for(i = 0;i < this.List2.length; i++){
        this.List2[i].isClick = 0;
        this.List2[i].style = '';
      }
      for(i = 0;i < this.List1.length; i++){
        this.List1[i].isClick = 0;
        this.List1[i].style = '';
      }
      this.List2[id].isClick = 1;
      this.List2[id].style = 'background-color: #00AEEC;';
    },
  }
}
</script>

<style scoped>
ul {
  list-style: none;
}
li {

}
.introductions {
  color: #030303;
  font-size: 10px;
}
.author {
  color: #248F24;
  font-size: 10px;
}
.itemTitle {
  color: #4DA5FF;
  font-size: 22px;
}

.CollectionItem {
  position: relative;
  height: auto;
  margin-top: 20px;
}
.CollectionItems {
  text-align: left;
  margin-left: 50px;
  margin-right: 50px;
  margin-bottom: 50px;
  height: 760px;
  overflow: auto;

}
.item {
  padding-top: 10px;
  height: 35px;
  transition: 0.5s;
  text-align: left;
  font-size: 14px;
}
.Collections {
  position: relative;
  border-color: #d4d4d4;
  border-right-style: solid;
  left: 4px;
  width: 240px;
  /*height: 100%;*/
}

.CollectionItems::-webkit-scrollbar {
  width: 0;
}

.titleName {
  position: relative;
  top: 25px;
  left: -40px;
}
.divider {
  position: relative;
  margin: 0 auto;
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
  height: 100px;
}

.myCollection {
  width: 100%;
  min-width: 1125px;
  height: auto;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.3), 0 6px 20px 0 rgba(0, 0, 0, 0.3);
  margin: auto auto 40px;
}

.main-container {
  display: flex;
}

.Collections .menu {
  height: 100%;
  width: 100%;
  margin: 0;
  padding: 0;
  transition: all ease 0.4s;
}

.Collections .menu .menu-item {
  width: 100%;
  position: relative;
  list-style: none;
  transition:all ease 0.4s;
}

.Collections .menu .menu-item .menu-arrow {
  transition: all ease 0.4s;
}

.Collections .menu .menu-item.active .menu-arrow {
  transform: rotate(-90deg);
}

.Collections .menu .menu-item.active .menu-title,
.Collections .menu .menu-item:hover .menu-title {
  background-color: rgba(244, 244, 244, 1);
}

.Collections .menu .menu-item .menu-title {
  height: 40px;
  line-height: 40px;
  font-size: 18px;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  background-color: rgba(244,244,244, 0.3);
  transition: 0.4s all ease;
}

.Collections .menu .menu-item .menu-title:hover {
  background-color: rgba(244,244,244, 1);
}

.Collections .menu .menu-item .menu-title .menu-content .menu-icon i{
  height: 40px;
  line-height: 40px;
  margin-right: 10px;
  text-align: center;
}

.Collections .menu .menu-item .sub-menu {
  list-style: none;
  margin: 0;
  padding: 0;
  display: none;
  opacity: 0;
  visibility: hidden;
  width: 100%;
  transition: all ease 0.4s;
  pointer-events: none;
}

.Collections .menu .menu-item.active .sub-menu {
  opacity: 1;
  visibility: visible;
  display: inline-block;
  pointer-events: auto;
}

.menu-item .sub-menu .sub-item{
  margin: 10px 20px;
  height: 30px;
  line-height: 30px;
  display: flex;
  font-size: 14px;
  text-align: center;
  justify-items: center;
  background-color: #f4f4f4;
  border-radius: 20px;
  cursor: pointer;
}

.menu-item .sub-menu .sub-item.active,
.menu-item .sub-menu .sub-item:hover {
  background-color: #2196f3;
  color: white;
}

.menu-item .sub-menu .sub-item .sub-icon {
  min-width: 30px;
}

.menu-item .sub-menu .sub-item .sub-text {
  overflow: hidden;
}


.menu-item .sub-menu .sub-item .sub-edit-icon {
  margin-left: auto;
  opacity: 0;
  visibility: hidden;
  pointer-events: none;
  transition: all ease 0.4s;
}

.menu-item .sub-menu .sub-item:hover .sub-edit-icon{
  margin-right: 10px;
  opacity: 1;
  visibility: visible;
  pointer-events: auto;
}

</style>
