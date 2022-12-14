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
    <div>
        <el-dialog
            title="上传封面"
            :visible.sync="changeAvatarVisible"
            width="30%"
            class = "changeAvatar">
              <span>
                <input type="file" ref="pic">
              </span>
          <span slot="footer" class="dialog-footer">
                <el-button @click="changeAvatarVisible = false">取 消 上 传</el-button>
                <el-button type="primary" @click="toChangeAvatar(); changePwdVisible = false">确 定 上 传</el-button>
              </span>
        </el-dialog>
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
                <li class="sub-item" @click="newCollect">
                  <span class="sub-icon"><i class='bx bx-plus-circle'></i></span>
                  <span class="sub-text">新建收藏夹</span>
                  <span class="sub-edit-icon"></span>
                </li>
                <div v-for="(item,index) in List" :key="index">
                  <li class="sub-item" :class="{'active': item.isClick === 1}" @click="clickItem(index)">
                    <span class="sub-icon" v-if="item.isClick === 0"><i class='bx bxs-folder' ></i></span>
                    <span class="sub-icon" v-else><i class='bx bxs-folder-open' ></i></span>
                    <span class="sub-text">{{ item.name }}</span>
                    <span class="sub-edit-icon" @click="changeAvatar(item.id)" title="编辑封面"><i class='bx bx-edit-alt' ></i></span>
                    <span class="sub-delete-icon" title="删除收藏夹" @click="deletecollect(item.id)"><i class='bx bx-minus-circle'></i></span>
                  </li>
                </div>
              </ul>
            </li>
          </ul>
        </div>
        <div class="CollectionItems">
          <div class="CollectionItem" v-for="(item,index) in favorites" :key="index">
            <div class="itemTitle">
              <router-link :to="'SearchDetails/'+item.id" class="a">{{favorites[index].title}}</router-link><span style="float: right" @click="deletefrom(item.id)"><i class="el-icon-delete"></i></span>
            </div>
            <div class="author">
              <span v-for="(item,index1) in favorites[index].authors" :key="index1" style="margin-right: 8px;">
                <router-link :to="'NS?id='+item.id" style=" color: #248F24;font-weight :bold;font-size: 10px">
                  {{favorites[index].authors[index1].name}}
                </router-link>
              </span>
            </div>
            <div class="introductions">
              {{favorites[index].introduction | ellipsis}}
            </div>
            <div style="margin-top: 7px">
            <span style="margin-right: 50px">
              <i class='bx bxs-like' style="margin-right: 7px"></i>
              <span style="font-size: 14px">{{favorites[index].like}}</span>
            </span>
              <span style="margin-right: 50px">
              <i class='el-icon-star-on' style="margin-right: 7px;color: orange"></i>
              <span style="font-size: 14px">{{favorites[index].collect}}</span>
            </span>
              <span style="margin-right: 50px">
              <i class='bx bxs-message-rounded-dots' style="margin-right: 7px"></i>
              <span style="font-size: 14px">{{favorites[index].comment}}</span>
            </span>
              <span style="font-size: 14px">
              被引用次数：{{favorites[index].times}}
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
      nowCollectionid : 0,
      nowlistid : 0,
      activeMenu1: false,
      activeMenu2: false,
      // favorites: [],
      favorites : [],
      form :{
        title : '',
      },
      currentfid : 0,
      changePwdVisible: false,
      changeAvatarVisible: false,
      visible : false,
      visible1 : false,
      activeNames: [],
      NewStyle: '',
      List: [],
      List1: [],
      List2: [],
    };
  },
  created() {
    this.List = [];
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
        if(this.$route.params.selected === 1 && this.$route.params.index === i) {
          this.List.push({
            id : res.data[i].id,
            name : res.data[i].title,
            avatar : res.data[i].avatar,
            count : res.data[i].count,
            date : res.data[i].time,
            isClick: 1,
            style: ''
          })
          this.nowCollectionid = this.List[i].id;
          this.nowlistid = i;
          this.showFavorites(i);
        }
        else {
          this.List.push({
            id : res.data[i].id,
            name : res.data[i].title,
            avatar : res.data[i].avatar,
            count : res.data[i].count,
            date : res.data[i].time,
            isClick: 0,
            style: ''
          })
        }
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
        if(this.$route.params.selected === 2 && this.$route.params.index === i) {
          this.List1.push({
            id : res.data[i].id,
            name : res.data[i].title,
            avatar : res.data[i].avatar,
            count : res.data[i].count,
            date : res.data[i].time,
            isClick: 1,
            style: ''
          })
        }
        else {
          this.List1.push({
            id : res.data[i].id,
            name : res.data[i].title,
            avatar : res.data[i].avatar,
            count : res.data[i].count,
            date : res.data[i].time,
            isClick: 0,
            style: ''
          })
        }
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
        if(this.$route.params.selected === 3 && this.$route.params.index === i) {
          this.List2.push({
            id : res.data[i].id,
            name : res.data[i].title,
            avatar : res.data[i].avatar,
            count : res.data[i].count,
            date : res.data[i].time,
            isClick: 1,
            style: ''
          })
        }
        else {
          this.List2.push({
            id : res.data[i].id,
            name : res.data[i].title,
            avatar : res.data[i].avatar,
            count : res.data[i].count,
            date : res.data[i].time,
            isClick: 0,
            style: ''
          })
        }
      }
    })
    if(this.$route.params.selected === 1) {
      this.activeMenu1 = true;
    }

    else if(this.$route.params.selected === 2) {
      this.activeMenu2 = true;
    }
  },
  mounted() {
  },
  filters:{
    ellipsis(value){
      if (!value) return '';
      if (value.length > 500) {
        return value.slice(0,500) + '...'
      }
      return value
    }
  },
  methods: {
    deletecollect(id){
      let params = new FormData();
      params.append("favorites_id", id);
      this.$axios({
        headers: {
          jwt: JSON.parse(sessionStorage.getItem('baseInfo')).token,
        },
        method: 'post',
        url: this.$store.state.address+'api/relation/deleteFavorites',
        data: params,
      }).then(res =>{
        this.$message.success(res.data.msg);
        this.getCollections();
        this.showFavorites(this.nowlistid);
      })
    },
    deletefrom(id){
      let params = new FormData();
      params.append("paper_id", id);
      params.append("favorites_id", this.nowCollectionid);
      this.$axios({
        headers: {
          jwt: JSON.parse(sessionStorage.getItem('baseInfo')).token,
        },
        method: 'post',
        url: this.$store.state.address+'api/publication/UnCollectPaper/',
        data: params,
      }).then(res =>{
        this.$message.success(res.data.message);
        this.showFavorites(this.nowlistid);
      })
    },
    toChangeAvatar(){
      let fid = this.currentfid;
      this.changeAvatarVisible = false;
      let fileToUpload = this.$refs.pic.files[0];
      let param = new FormData();  //创建表单对象
      param.append("img",fileToUpload);
      param.append("fid",fid);
      param.forEach((value, key) => {
        console.log(`key ${key}: value ${value}`);
      })
      this.axios({
        method: 'post',
        url: 'http://139.9.134.209:8000/api/media/set_cover/',
        data: param,
        headers: {
          jwt: JSON.parse(sessionStorage.getItem('baseInfo')).token,
        },
      }).then(res => {
            this.$message.success(res.data.msg);
      })

    },
    changeAvatar(index) {
      this.visible1 = true;
      this.changeAvatarVisible = true;
      this.currentfid = index;
    },
    showFavorites(id) {
      this.favorites = [];
      let params = {
        favorites_id: this.List[id].id,
      }
      this.$axios({
        method: 'get',
        url: this.$store.state.address+'api/relation/showFavorites?favorites_id='+this.List[id].id,
      }).then(res =>{
        var i = 0;
        for (i = 0; i < res.data.length; i++){
          this.favorites.push({
            title: res.data[i].paper._source.title,
            id: res.data[i].paper._source.id,
            authors: res.data[i].paper._source.authors,
            introduction: res.data[i].paper._source.abstract,
            like: res.data[i].like_count,
            collect: res.data[i].collect_count,
            "comment" : 1,
            times: res.data[i].paper._source.n_citation,
          })
        }
      }).catch(err => {
        console.log(err);
      })
    },
    getCollections() {
      this.List = [];
      this.List1 = [];
      this.List2 = [];
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
          this.List.push({
            id : res.data[i].id,
            name : res.data[i].title,
            avatar : res.data[i].avatar,
            count : res.data[i].count,
            date : res.data[i].time,
            isClick: 0,
            style: ''
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
          this.List1.push({
            id : res.data[i].id,
            name : res.data[i].title,
            avatar : res.data[i].avatar,
            count : res.data[i].count,
            date : res.data[i].time,
            isClick: 0,
            style: ''
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
          this.List2.push({
            id : res.data[i].id,
            name : res.data[i].title,
            avatar : res.data[i].avatar,
            count : res.data[i].count,
            date : res.data[i].time,
            isClick: 0,
            style: ''
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
        this.$message.success(res.data.msg);
        this.getCollections();
      })
      this.form.title = '';
      this.visible = false;
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
      this.nowCollectionid = this.List[id].id;
      this.nowlistid = id;
      this.showFavorites(id);
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

author-name {

}
a {
  text-decoration: none;
  color: #4DA5FF;
}
ul {
  list-style: none;
}
li {

}
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
.introductions {
  color: #030303;
  font-size: 10px;
  width: 900px;
}
.author {
  color: #248F24;
  font-size: 10px;
  width: 900px;
}
.itemTitle {
  color: #4DA5FF;
  font-size: 22px;
  width: 900px;
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

.menu-item .sub-menu .sub-item .sub-delete-icon{
  color: #f44336;
  opacity: 0;
  visibility: hidden;
  pointer-events: none;
  transition: all ease 0.4s;
}


.menu-item .sub-menu .sub-item:hover .sub-edit-icon{
  margin-right: 5px;
  opacity: 1;
  visibility: visible;
  pointer-events: auto;
}

.menu-item .sub-menu .sub-item:hover .sub-delete-icon {
  margin-right: 10px;
  opacity: 1;
  visibility: visible;
  pointer-events: auto;
}

</style>
