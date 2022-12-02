<template>

  <div class="background">
    <div class="leftup">
        <div class="title">
          改进的二分查找法
        </div>
        <div class="author">
          王ll，朱虹
        </div>
        <div class="fromwhere">
          jld大学 母猪产后护理
        </div>
        <div class="theicons">
          <span style="margin-right: 50px">
              <i class='el-icon-download' style="margin-right: 7px"></i>
              <span style="font-size: 14px">87次下载</span>
            </span>
            <span style="margin-right: 50px">
              <i class='bx bxs-like' style="margin-right: 7px"></i>
              <span style="font-size: 14px">999次点赞</span>
            </span>
          <span style="margin-right: 50px">
              <i class='el-icon-star-off' style="margin-right: 7px;color: orange"></i>
              <span style="font-size: 14px">11次收藏</span>
            </span>
          <span style="margin-right: 50px">
              <i class='bx bxs-message-rounded-dots' style="margin-right: 7px"></i>
              <span style="font-size: 14px">110条评论</span>
            </span>
          <span style="margin-right: 50px">
            <i class='el-icon-s-promotion' style="margin-right: 7px"></i>
              <span style="font-size: 14px"><el-link type="primary">外部链接</el-link></span>
            </span>
      </div>
      <div class="keywords">
        关键词：
            <span style="margin-right: 20px">
             <el-tag>计算机科学</el-tag>
            </span>
        <span style="margin-right: 20px">
              <el-tag>母猪</el-tag>
            </span>
        <span style="margin-right: 20px">
             <el-tag>西非文学</el-tag>
            </span>
      </div>
      <div class="abstract">
        摘要：
        对有序数列的查找算法中二分法查找（binarysearch）是最常用的。利用二分法，在含有n个元素的有...之差的最大值的一个上界，就可以有比二分法
        更加有效的查找方式，文章给出了一个称之为改进的
        祝大家翅膀更好
      </div>
    </div>
    <div class="rightup">
      <img src="../assets/logo.png" class="picture">
    </div>
    <div class="leftdown">
      <div class="title">
        评论
        <div class="replys" v-if="commentList.length>0">
          <ul>
            <li v-for="item in commentList">
              <div class="one-reply">
                <div class="reply-user-img">
                </div>
                <div class="reply-user-name">
                  <p class="reply-user-name-font">{{item.username}}</p>
                </div>
                <div class="reply-user-reply">
                  <p>{{item.detail}}</p>
                </div>
                <div class="reply-user-time">
                  <p class="reply-user-time-font">{{ item.editTime }}</p>
                </div>
              </div>
            </li>
          </ul>
        </div>
        <div v-else>
          暂无评论
        </div>
      </div>
    </div>
    <div class="rightdown">
      <div class="title">
        文献推荐
      </div>
        <div class="recommendations">
          <div class="recommendation">
            <div class="recommendationTitle">
              改进的二分法查找
            </div>
            <div class="recommendationAuthor">
              王嗨涛，朱虹
            </div>
          </div>
          <div class="recommendation">
            <div class="recommendationTitle">
              改进的二分法查找
            </div>
            <div class="recommendationAuthor">
              王嗨涛，朱虹
            </div>
        </div>
      </div>
    </div>
  </div>



</template>

<script>
export default {
  name: "ScholarsDetails",
  data(){
    return{
      commentList:[
        {
          editTime:"22-10-17",
          userName:"YAN",
          detail:"相见时难别亦难",
        },
        {
          editTime:"22-10-19",
          userName:"NNN",
          detail:"东风无力百花残",
        }
      ]}
  }
}
</script>

<style scoped>

.leftup {
  position: absolute;
  height: 350px;
  width: 900px;
  left: 0;
  right: 0;
  /*margin: 0 auto;*/
  background-color: white;
  border-radius: 10px;
  margin-top: 0px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.3), 0 6px 20px 0 rgba(0, 0, 0, 0.3);
}
.rightup {
  position: absolute;
  height: 275px;
  width: 275px;
  left: 925px;
  right: 0;
  /*margin: 0 auto;*/
  background-color: white;
  border-radius: 10px;
  margin-top: 0px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.3), 0 6px 20px 0 rgba(0, 0, 0, 0.3);
}
.leftdown {
  position: absolute;
  height: 275px;
  width: 900px;
  top: 325px;
  left: 0;
  right: 0;
  background-color: white;
  border-radius: 10px;
  margin-top: 50px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.3), 0 6px 20px 0 rgba(0, 0, 0, 0.3);
}
.rightdown {
  position: absolute;
  height: 350px;
  width: 275px;
  top: 250px;
  left: 925px;
  right: 0;
  background-color: white;
  border-radius: 10px;
  margin-top: 50px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.3), 0 6px 20px 0 rgba(0, 0, 0, 0.3);
}
.Image {
  position: absolute;

}
.background {
  position: absolute;
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
  position: absolute;
  font-size: 35px;
  left: 20px;
  top: 20px;
}
.rightup .picture {
  position: absolute;
  height: 275px;
  width: 275px;
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
  top:95px;
  left: 20px;
}
.theicons{
  position: absolute;
  color: #030303;
  font-size: 15px;
  top:120px;
  left: 20px;
}
.keywords{
  position: absolute;
  color: #030303;
  font-size: 15px;
  top:155px;
  left: 20px;
}
.abstract{
  position: absolute;
  color: #030303;
  font-size: 10px;
  top:190px;
  left: 20px;
}
.leftup .author {
  position: absolute;
  color: #248F24;
  font-size: 15px;
  top:70px;
  left: 20px;
}
.replys{
  font-size: 15px;
}
.recommendations{
  margin-top: 90px;
  margin-left: 20px;
}
.recommendation{
  margin-top: 15px;
}
.recommendationTitle{
  font-size: 25px;
  color:#4DA5FF;
}
.recommendationAuthor{
  font-size: 15px;
  color: #A7A7B4;
}
</style>