<template>

  <div class="background">

    <div class="leftup">
      <div class="title" :title="literature_title">
        {{ literature_title }}
      </div>
      <div class="author">
        <div class="author-list" >
          <div class="author-item" v-for="author in authors">
            <span class="author-name" :title="author.name" @click="$router.push({path:'/NS',query:{id: author.id}})">{{author.name}}</span>
          </div>
        </div>
      </div>
<!--      <div class="fromwhere">-->
<!--        {{ institution }}-->
<!--      </div>-->
      <div class="theicons">
        <span class="header-icon" style="margin-right: 50px">
              <i class='bx bxs-like' style="margin-right: 7px" @click="toLikeThisPaper" v-if="hasLikedThisPaper===false"></i>
              <i class='bx bxs-like' style="margin-right: 7px;color:orange" @click="toLikeThisPaper" v-else-if="hasLikedThisPaper===true"></i>
              <span style="font-size: 14px">{{ number_of_like }}</span>
            </span>
        <span class="header-icon" style="margin-right: 50px">
              <i class='el-icon-star-off' style="margin-right: 7px;color: orange" @click="drawer = true" v-if="hasCollectedThisPaper===false"></i>
              <i class='el-icon-star-on' style="margin-right: 7px;color: orange" @click="drawer = true" v-else-if="hasCollectedThisPaper===true"></i>
              <span style="font-size: 14px">{{ number_of_collect }}</span>
              <el-drawer
                  :visible.sync="drawer"
                  :direction="direction"
                  :before-close="handleClose">
                <div style="text-align: left">
                  <div style="color: black;position: relative;left: 40px;top: -20px">
                  <h2>选择收藏夹</h2>
                </div>
                  <el-form ref="form" :model="form" label-width="80px">
                <el-form-item >
                  <el-radio-group v-model="form.index">
                    <div v-for="(item,index) in List" :key="index" style="margin-bottom: 20px">
                      <el-radio :label="item.name"></el-radio>
                    </div>
                  </el-radio-group>
                </el-form-item>
              </el-form>
                  <div style="position: relative;left: 170px;width: 50px">
                <el-button type="primary" plain @click="collect">加入收藏夹</el-button>
              </div>
                </div>
              </el-drawer>
            </span>
        <span class="header-icon" style="margin-right: 50px" @click="toWriteComment">
              <i class='bx bxs-message-rounded-dots' style="margin-right: 7px"></i>
              <span style="font-size: 14px">{{ number_of_comment }}</span>
            </span>
        <span class="header-icon" :class="{'active': urlActive}" @click="changeUrlActive" style="margin-right: 50px">
            <i class='el-icon-s-promotion' style="margin-right: 7px"></i>
            <span style="font-size: 14px">外部链接</span>
            <span class="url-icon" ><i class='bx bx-caret-left'></i></span>
            <div class="sub-menu">
              <div class="sub-item" v-if="out_link_str === null || out_link_str === undefined || out_link_str.length === 0">
                暂无链接
              </div>
              <div class="sub-item" v-for="url in out_link_str">
                <a :href="url" :title="url" target="_blank">{{ url }}</a>
              </div>
            </div>
        </span>
      </div>
      <div class="keywordsAndAbstract" >
        关键词：
        <span style="margin-right: 20px; " v-for="item in tags">
             <el-tag style="margin-top: 5px; ">{{ item }}</el-tag>
            </span>
        <div class="abstract">
          摘要：
          {{ abstract }}
        </div>
      </div>
    </div>
    <div class="rightup">
      <img src="../assets/img/light.jpg" class="picture">
      <div style="position:absolute; color: white; z-index:2;font-size: 36px;width: 100%;top:70px;text-align: center">累计访问量</div>
      <div style="position:absolute; color: white; z-index:2;font-size: 60px;width: 100%;top:140px;text-align: center">
        {{ number_of_read }}
      </div>
    </div>
    <div class="leftdown">
      <div class="title">
        评论
        <div class="replys" v-if="commentList.length>=0">
          <div style="width:100%;margin-top: 5px;" v-for="item in commentList">
            <div style="height: 40px;width: 40px;display: inline-block;vertical-align: middle;">
              <img :src="'http://139.9.134.209:8000/media/avatars/'+item.avatar" style="height: 40px;width: 40px;border-radius: 20px">
            </div>
            <div style="display:inline-block;margin-left: 5px">
              <p>{{ item.username }}</p>
            </div>
            <div style="">
              <p>{{ item.text }}</p>
              <div class="divider"></div>
            </div>
          </div>
        </div>
        <div v-else style="font-size: 20px;margin-top: 20px">
          暂无评论
        </div>
      </div>
    </div>
    <div class="rightdown">
      <div class="title">
        文献推荐
      </div>
      <div class="recommendations">
        <div class="recommendation" v-for="item in relevant_recommended_literature">
          <div class="recommendationTitle" @click="$router.push('../');$router.push('SearchDetails/'+item.recommended_literature_id)">
            {{ item.recommended_literature_title }}
          </div>
          <div class="recommendationAuthor">
            {{ item.recommended_literature_author }}
          </div>
        </div>
      </div>
    </div>
  </div>


</template>

<script>
import qs from "qs";

export default {
  name: "ScholarsDetails",
  data() {
    return {
      urlActive: false,
      form: {
        index: '',
      },
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
      drawer: false,
      direction: 'rtl',
      this_paper:[],  //this_paper[0]存储着此paper的基本信息
      literature_title: "改进的二分查找法",
      literature_id:"aa11AA",
      authors: [],
      institution: "璃月职业技术学院 母猪产后护理系",
      number_of_download: 87,
      number_of_like: 999,
      number_of_collect: 11,
      number_of_comment: 110,
      out_link_str: "http://www.baidu.com",
      number_of_read: 0,
      tags: [],
      abstract: "你说得对，但是对有序数列的查找算法中二分法查找（binarysearch）是最常用的。" +
          "利用二分法，在含有n个元素的有...之差的最大值的一个上界，" +
          "就可以有比二分法 更加有效的查找方式，文章给出了一个称之为改进的 祝大家翅膀更好",
      commentList: [],
      hasLikedThisPaper:false,
      hasCollectedThisPaper:false,
      relevant_recommended_literature: [
        {
          recommended_literature_title: "Invariant scattering convolution networks.",
          recommended_literature_author: "Joan Bruna, Stephane Mallat",
          recommended_literature_id: "53e99a8cb7602d9702303c85"
        },
        {
          recommended_literature_title: "Convolution Kernels on Discrete Structures",
          recommended_literature_author: "David Haussler",
          recommended_literature_id: "53e9ac3db7602d9703607b7b"
        }
      ],
    }
  },
  mounted() {
    this.toGetPaperById();
  },
  $route(){
    //跳转到该页面后需要进行的操作

  },
  created() {
    this.List = [];
    if(sessionStorage.getItem('baseInfo') === null
        || JSON.parse(sessionStorage.getItem('baseInfo')).token === null
        || JSON.parse(sessionStorage.getItem('baseInfo')).token === undefined) {
      this.$axios({
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
    }
    else{
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
    }

  },
  methods:{
    handleClose(done) {
        done();
    },
    collect(){
      var i = 0;
      for (i = 0;i < this.List.length; i++){
        if (this.List[i].name === this.form.index)
          break;
      }
      let params = new FormData();
      params.append("paper_id", this.literature_id);
      params.append("favorites_id", this.List[i].id);
      this.$axios({
        headers: {
          jwt: JSON.parse(sessionStorage.getItem('baseInfo')).token,
        },
        method: 'post',
        url: this.$store.state.address+'api/publication/CollectPaper/',
        data: params,
      }).then(res =>{
        if (res.data.message !== undefined)
          this.$message.success(res.data.message);
        else
          this.$message.error(res.data.msg);
        this.drawer = false;
        location.reload()
        console.log("collect")
        console.log(res)
      })
      this.handleClose();
    },
    toGetPaperById:function (){
      const tempthis = this;
      //tempthis.literature_id = "55d06634696322190568b85f";
      //这里，实际用的时候是↓
      tempthis.literature_id = tempthis.$route.params.LiteratureId
      let formData = new FormData();
      formData.append('id',tempthis.literature_id)
      this.axios({
        method: 'post',
        url: 'http://139.9.134.209:8000/api/publication/getPaperById/',
        data: formData
      })
          .then(res => {
            tempthis.this_paper[0] = res.data.paper
            console.log("res.data.paper:")
            console.log(tempthis.this_paper[0])
            tempthis.toLoadData()
          })
          .catch(err => {
            console.log(err);
          })
    },
    toLoadData:function (){
      const tempthis = this;
      //标题
      if(tempthis.this_paper[0].title!==undefined && tempthis.this_paper[0].title!==null)
        tempthis.literature_title = tempthis.this_paper[0].title
      tempthis.toReadThisPaper(tempthis.literature_id,tempthis.literature_title)

      //作者名字
      if(tempthis.this_paper[0].authors!==undefined && tempthis.this_paper[0].authors!==null)
        tempthis.authors=tempthis.this_paper[0].authors

      //机构  存疑  目前逻辑是一作的第一个机构，这显然不符合实际
      //tempthis.institution = tempthis.this_paper[0].authors[0].org.split(",")[0]

      //外部链接
      if(tempthis.this_paper[0].url!==undefined && tempthis.this_paper[0].url!==null)
        tempthis.out_link_str = tempthis.this_paper[0].url

      if(tempthis.this_paper[0].keywords!==undefined && tempthis.this_paper[0].keywords!==null){
        //关键词
        for(let i = 0;i<tempthis.this_paper[0].keywords.length;i++){
          tempthis.tags[i]= tempthis.this_paper[0].keywords[i]
        }
      }


      //摘要
      tempthis.abstract = tempthis.this_paper[0].abstract
    },
    toReadThisPaper:function (paperId,paperName){
      const tempthis = this;
     /* let formData = new FormData();
      formData.append('paper_id',paperId)
      formData.append('paper_name',paperName)*/
      let params = {
        paper_id:paperId,
        paper_name:paperName
      }
      console.log(params)
      if(sessionStorage.getItem('baseInfo') === null
          || JSON.parse(sessionStorage.getItem('baseInfo')).token === null
          || JSON.parse(sessionStorage.getItem('baseInfo')).token === undefined) {
        this.axios({
          method: 'post',
          url: 'http://139.9.134.209:8000/api/publication/ReadPaper/',
          data: params
          /*   data: formData
             data: qs.stringify(params)*/
        })
            .then(res => {
              console.log("otherPaperData1:")
              tempthis.this_paper[1]=res.data;
              tempthis.number_of_like = tempthis.this_paper[1].like_count;
              tempthis.number_of_collect= tempthis.this_paper[1].collect_count;
              tempthis.number_of_comment = tempthis.this_paper[1].comment.length;
              tempthis.number_of_read = tempthis.this_paper[1].read_count;
              tempthis.hasLikedThisPaper = tempthis.this_paper[1].isLiked;
              tempthis.hasCollectedThisPaper = tempthis.this_paper[1].isCollected;
              tempthis.commentList = tempthis.this_paper[1].comment
              console.log("commentList")
              console.log(tempthis.commentList)
            })
            .catch(err => {
              console.log(err);
            })
      }
      else {
        this.axios({
          headers: {
            jwt: JSON.parse(sessionStorage.getItem('baseInfo')).token,
          },
          method: 'post',
          url: 'http://139.9.134.209:8000/api/publication/ReadPaper/',
          data: params
          /*   data: formData
             data: qs.stringify(params)*/
        })
            .then(res => {
              console.log("otherPaperData:")
              console.log(res)
              tempthis.this_paper[1]=res.data;
              tempthis.number_of_like = tempthis.this_paper[1].like_count;
              tempthis.number_of_collect= tempthis.this_paper[1].collect_count;
              tempthis.number_of_comment = tempthis.this_paper[1].comment.length;
              tempthis.number_of_read = tempthis.this_paper[1].read_count;
              tempthis.hasLikedThisPaper = tempthis.this_paper[1].isLiked;
              tempthis.hasCollectedThisPaper = tempthis.this_paper[1].isCollected;
              tempthis.commentList = tempthis.this_paper[1].comment
              console.log("commentList")
              console.log(tempthis.commentList.length)
            })
            .catch(err => {
              console.log(err);
            })
      }
    },
    toLikeThisPaper(){
      const tempthis = this
      let params = new FormData();
      params.append("paper_id", this.literature_id);
      this.$axios({
        headers: {
          jwt: JSON.parse(sessionStorage.getItem('baseInfo')).token,
        },
        method: 'post',
        url: this.$store.state.address+'api/publication/LikePaper/',
        data: params,
      }).then(res =>{
        console.log('like:')
        console.log(res)
        if(tempthis.hasLikedThisPaper===true){
          tempthis.hasLikedThisPaper=false;
          tempthis.number_of_like--;
        }else if(tempthis.hasLikedThisPaper===false){
          tempthis.hasLikedThisPaper=true;
          tempthis.number_of_like++;
        }
      })
    },
    changeUrlActive() {
      this.urlActive = !this.urlActive
    },
    toWriteComment(){
      this.$prompt('发一条友善的评论吧', '发布评论', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
      }).then(({ value }) => {
        console.log(value)
        const tempthis = this;
        let params ={
          paper_id:this.literature_id,
          content:value
        }
        console.log("comment params")
        console.log(params)
        this.axios({
          method: 'post',
          url: 'http://139.9.134.209:8000/api/publication/MakeComment/',
          headers: {
            jwt: JSON.parse(sessionStorage.getItem('baseInfo')).token,
          },
          data:qs.stringify(params)
        })
            .then(res => {
              console.log(res)
              location.reload()
            })
            .catch(err => {
              console.log(err);
            })
      }).catch(() => {

      });
  }
  }
}
</script>

<style scoped>

.leftup {
  position: relative;
  display: inline-block;
  height: 350px;
  /*width: 900px;*/
  width: 72%;
  left: 0;
  right: 0;
  margin: 10px;
  background-color: white;
  border-radius: 10px;
  /*margin-top: 0px;*/
  box-shadow: 0px 0px 5px rgba(0,0,0,0.3);
  overflow: auto;
}

.rightup {
  position: absolute;
  height: 275px;
  display: inline-block;
  /*width: 275px;*/
  width: 24%;
  margin: 10px;
  background-color: white;
  border-radius: 10px;
  /*margin-top: 0px;*/
  /*box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.3), 0 6px 20px 0 rgba(0, 0, 0, 0.3);*/
  box-shadow: 0px 0px 5px rgba(0,0,0,0.3);
}

.leftdown {
  position: relative;
  display: inline-block;
  height: 275px;
  /*width: 900px;*/
  width: 72%;
  /*top: 50px;*/
  background-color: white;
  border-radius: 10px;
  margin: 10px;
  /*box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.3), 0 6px 20px 0 rgba(0, 0, 0, 0.3);*/
  overflow: auto;
  box-shadow: 0px 0px 5px rgba(0,0,0,0.3);
}

.rightdown {
  position: absolute;
  height: 350px;
  display: inline-block;
  /*width: 275px;*/
  width: 24%;
  margin: 10px;
  /*left: 925px;*/
  top: 300px;
  background-color: white;
  border-radius: 10px;
  /*margin-top: 50px;*/
  box-shadow: 0px 0px 5px rgba(0,0,0,0.3);
}

/* 设置滚动条的样式 */
::-webkit-scrollbar {
  width:10px;
}
/* 滚动槽 */
::-webkit-scrollbar-track {
  /*-webkit-box-shadow:inset006pxrgba(0,0,0,0.3);*/
  border-radius:10px;
}
/* 滚动条滑块 */
::-webkit-scrollbar-thumb {
  border-radius:10px;
  background:rgba(0,0,0,0.1);
  /*-webkit-box-shadow:inset006pxrgba(0,0,0,0.5);*/
}

.Image {
  position: absolute;

}

.background {
  width: 88%;
  margin: 0 auto;
  position: relative;
}

.cover {
  position: absolute;
  height: 230px;
  width: 230px;
  top: 20px;
  /*margin: 20px;*/
  border-radius: 10px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.3), 0 6px 20px 0 rgba(0, 0, 0, 0.3);
}

.leftup .title {
  width: 95%;
  height: 50px;
  overflow: hidden;
  margin-top: 20px;
  margin-left: 20px;
  /*position: absolute;*/
  font-size: 35px;
  left: 20px;
  top: 20px;
}

.leftdown .title {
  position: relative;
  font-size: 35px;
  /*left: 20px;*/
  /*top: 20px;*/
  margin: 20px;
}

.rightup .picture {
  position: relative;
  /*height: 275px;*/
  /*width: 275px;*/
  height:100%;
  width: 100%;
  border-radius: 10px;
}

.rightdown .title {
  position: absolute;
  font-size: 35px;
  left: 20px;
  top: 20px;
}

.fromwhere {
  position: absolute;
  color: #030303;
  font-size: 15px;
  top: 95px;
  left: 20px;
}

.theicons {
  color: #030303;
  font-size: 15px;
  /*top: 120px;*/
  margin-left: 20px;
}

.keywordsAndAbstract {
  /*position: absolute;*/
  color: #030303;
  font-size: 15px;
  top: 155px;
  margin-left: 20px;
}

.abstract {
  position: relative;
  color: #030303;
  font-size: 10px;
  top:10px;
  text-overflow: ellipsis;
}

.leftup .author {
  /*position: absolute;*/
  color: #248F24;
  font-size: 15px;
  margin-left: 20px;
  width: 95%;
  overflow: scroll;
  /*top: 70px;*/
  /*left: 20px;*/
}

.replys {
  font-size: 15px;
  overflow: auto;
  width: 100%;
}

.recommendations {
  margin-top: 90px;
  margin-left: 20px;
}

.recommendation {
  margin-top: 15px;
}

.recommendationTitle {
  font-size: 25px;
  color: #4DA5FF;
}

.recommendationTitle:hover {
  cursor: pointer
}

.recommendationAuthor {
  font-size: 15px;
  color: #A7A7B4;
}
.divider {
  position:relative;
  width: 100%;
  height: 2px;
  background-color: #d4d4d4;
  text-align: center;
  font-size: 16px;
  color: rgba(101, 101, 101, 1);
}
#likeTheComment :hover{
  cursor: pointer
}

.header-icon {
  position: relative;
  height: 20px;
  line-height: 20px;
  cursor: pointer;
  text-align: center;
  transition: 0.2s;
}
.header-icon:hover {
  color: #2196f3;
}

.header-icon .url-icon {
  display: inline-block;
  margin-top: 10px;
  height: 20px;
  font-size: 16px;
  line-height: 20px;
  transition: 0.2s;
}

.header-icon.active .url-icon {
  transform: rotate(-90deg);
}

.header-icon .sub-menu {
  position: absolute;
  left: -250px;
  z-index: 1000;
  width: 600px;
  overflow: hidden;
  text-align: center;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1), 0 2px 4px 0 rgba(0, 0, 0, 0.1);
  transition: 0.3s all ease;
  opacity: 0;
  padding: 5px;
  pointer-events: none;

}

.header-icon.active .sub-menu {
  margin-top: 10px;
  opacity: 1;
  pointer-events: auto;
}

.header-icon .sub-menu .sub-item {
  width: 95%;
  margin: 10px auto;
  background-color: transparent;
  border-radius: 10px;
  height: 30px;
  line-height: 30px;
}

.header-icon .sub-menu .sub-item:hover {
  background-color: #00B7FC;
}

.header-icon .sub-menu .sub-item a {
  color: black;
  text-decoration: none;
}

.header-icon .sub-menu .sub-item:hover a {
  color: white;
}

.leftup .author-list {
  width: 100%;
  line-height: 25px;
}

.leftup .author-list .author-item {
  display: inline-block;
  margin-right: 5px;
  transition: 0.2s;
  cursor: pointer;
}

.leftup .author-list .author-item:hover {
  color: #248F24;
  font-weight: bold;
}

</style>
