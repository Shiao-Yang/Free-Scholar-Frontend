<template>

  <div class="background">

    <div class="leftup">
      <div class="title">
        {{ literature_title }}
      </div>
      <div class="author">
        {{ author }}
      </div>
<!--      <div class="fromwhere">-->
<!--        {{ institution }}-->
<!--      </div>-->
      <div class="theicons">
        <span class="header-icon" style="margin-right: 50px">
              <i class='bx bxs-like' style="margin-right: 7px" @click="toLikeThisPaper"></i>
              <span style="font-size: 14px">{{ number_of_like }}</span>
            </span>
        <span class="header-icon" style="margin-right: 50px">
              <i class='el-icon-star-off' style="margin-right: 7px;color: orange"></i>
              <span style="font-size: 14px">{{ number_of_collect }}</span>
            </span>
        <span class="header-icon" style="margin-right: 50px">
              <i class='bx bxs-message-rounded-dots' style="margin-right: 7px"></i>
              <span style="font-size: 14px">{{ number_of_comment }}</span>
            </span>
        <span class="header-icon" style="margin-right: 50px">
            <i class='el-icon-s-promotion' style="margin-right: 7px"></i>
            <span style="font-size: 14px"><el-link type="primary" :href=out_link_str>外部链接</el-link></span>
            <div class="sub-menu"></div>
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
        <div class="replys" v-if="commentList.length>0">
          <div style="width:100%;margin-top: 5px;" v-for="item in commentList">
            <div style="height: 40px;width: 40px;display: inline-block;vertical-align: middle;">
              <img :src="require('../assets/' + item.userAvatarUrl)" style="height: 40px;width: 40px;border-radius: 20px">
            </div>
            <div style="display:inline-block;margin-left: 5px">
              <p>{{ item.userName }}</p>
            </div>
            <div style="display: inline-block;margin-left: 10px">
              <p style="font-size: 10px">{{ item.editTime }}</p>
            </div>
            <div style="display: inline-block;margin-left: 10px" id="likeTheComment">
              <i class='bx bxs-like'></i>
            </div>
            <div style="display: inline-block;margin-left: 2px">
              <p>{{ item.likeNum }}</p>
            </div>
            <div style="">
              <p>{{ item.detail }}</p>
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
          <div class="recommendationTitle">
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
      this_paper:[],  //this_paper[0]存储着此paper的基本信息
      literature_title: "改进的二分查找法",
      literature_id:"aa11AA",
      author: "王ll,朱虹",
      institution: "璃月职业技术学院 母猪产后护理系",
      number_of_download: 87,
      number_of_like: 999,
      number_of_collect: 11,
      number_of_comment: 110,
      out_link_str: "http://www.baidu.com",
      number_of_read: 27,
      tags: [],
      abstract: "你说得对，但是对有序数列的查找算法中二分法查找（binarysearch）是最常用的。" +
          "利用二分法，在含有n个元素的有...之差的最大值的一个上界，" +
          "就可以有比二分法 更加有效的查找方式，文章给出了一个称之为改进的 祝大家翅膀更好",
      commentList: [],
      relevant_recommended_literature: [
        {
          recommended_literature_title: "感觉画质",
          recommended_literature_author: "王海涛",
          recommended_literature_link_str: ""
        },
        {
          recommended_literature_title: "弗如远甚",
          recommended_literature_author: "大力为",
          recommended_literature_link_str: ""
        }
      ]
    }
  },
  mounted() {
    this.toGetPaperById();
  },
  methods:{
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
      tempthis.literature_title = tempthis.this_paper[0].title
      tempthis.toReadThisPaper(tempthis.literature_id,tempthis.literature_title)

      //作者名字
      tempthis.author=tempthis.this_paper[0].authors[0].name
      for(let i = 1;i<tempthis.this_paper[0].authors.length;i++){
        tempthis.author = tempthis.author +", "+tempthis.this_paper[0].authors[i].name
      }

      //机构  存疑  目前逻辑是一作的第一个机构，这显然不符合实际
      //tempthis.institution = tempthis.this_paper[0].authors[0].org.split(",")[0]

      //外部链接
      tempthis.out_link_str = tempthis.this_paper[0].url[0]

      //关键词
      for(let i = 0;i<tempthis.this_paper[0].keywords.length;i++){
        tempthis.tags[i]= tempthis.this_paper[0].keywords[i]
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
      console.log('params:')
      console.log(params)
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
          })
          .catch(err => {
            console.log(err);
          })
    },
    toLikeThisPaper(){
      const tempthis = this;
      let formData = new FormData();
      formData.append('paper_id',tempthis.literature_id)
      this.axios({
        headers: {
          jwt: JSON.parse(sessionStorage.getItem('baseInfo')).token,
        },
        method: 'post',
        url: 'https://139.9.134.209:8000/api/publication/LikePaper/',
        data: formData
      })
          .then(res => {
            console.log('like:')
            console.log(res)
          })
          .catch(err => {
            console.log(err);
          })
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
  position: absolute;
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
  position: absolute;
  color: #030303;
  font-size: 15px;
  top: 120px;
  left: 20px;
}

.keywordsAndAbstract {
  position: absolute;
  color: #030303;
  font-size: 15px;
  top: 155px;
  left: 20px;
}

.abstract {
  position: relative;
  color: #030303;
  font-size: 10px;
  top:10px;
  text-overflow: ellipsis;
}

.leftup .author {
  position: absolute;
  color: #248F24;
  font-size: 15px;
  top: 70px;
  left: 20px;
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
  cursor: pointer;
}
.header-icon:hover {
  color: #2196f3;
}
</style>
