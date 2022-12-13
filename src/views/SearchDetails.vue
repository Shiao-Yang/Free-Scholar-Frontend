<template>

  <div class="background">
    <div class="leftup">
      <div class="title">
        {{ literature_title }}
      </div>
      <div class="author">
        {{ author }}
      </div>
      <div class="fromwhere">
        {{ institution }}
      </div>
      <div class="theicons">
          <span style="margin-right: 50px">
              <i class='el-icon-download' style="margin-right: 7px"></i>
              <span style="font-size: 14px">{{ number_of_download }}</span>
            </span>
        <span style="margin-right: 50px">
              <i class='bx bxs-like' style="margin-right: 7px"></i>
              <span style="font-size: 14px">{{ number_of_like }}</span>
            </span>
        <span style="margin-right: 50px">
              <i class='el-icon-star-off' style="margin-right: 7px;color: orange"></i>
              <span style="font-size: 14px">{{ number_of_collect }}</span>
            </span>
        <span style="margin-right: 50px">
              <i class='bx bxs-message-rounded-dots' style="margin-right: 7px"></i>
              <span style="font-size: 14px">{{ number_of_comment }}</span>
            </span>
        <span style="margin-right: 50px">
            <i class='el-icon-s-promotion' style="margin-right: 7px"></i>
              <span style="font-size: 14px"><el-link type="primary" :href=out_link_str>外部链接</el-link></span>
            </span>
      </div>
      <div class="keywords">
        关键词：
        <span style="margin-right: 20px" v-for="item in tags">
             <el-tag>{{ item.content }}</el-tag>
            </span>
      </div>
      <div class="abstract">
        摘要：
        {{ abstract }}
      </div>
    </div>
    <div class="rightup">
      <img src="../assets/logo.png" class="picture">
      <div style="position:absolute; z-index:2;font-size: 36px;width: 100%;top:70px;text-align: center">今日访问量</div>
      <div style="position:absolute; z-index:2;font-size: 36px;width: 100%;top:140px;text-align: center">
        {{ number_of_today_visit }}
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
export default {
  name: "ScholarsDetails",
  data() {
    return {
      literature_title: "改进的二分查找法",
      author: "王ll,朱虹",
      institution: "璃月职业技术学院 母猪产后护理系",
      number_of_download: 87,
      number_of_like: 999,
      number_of_collect: 11,
      number_of_comment: 110,
      out_link_str: "http://www.baidu.com",
      number_of_today_visit: 27,
      tags: [
        {
          content: "计算机科学"
        }, {
          content: "母猪"
        }, {
          content: "西非文学"
        }
      ],
      abstract: "你说得对，但是对有序数列的查找算法中二分法查找（binarysearch）是最常用的。" +
          "利用二分法，在含有n个元素的有...之差的最大值的一个上界，" +
          "就可以有比二分法 更加有效的查找方式，文章给出了一个称之为改进的 祝大家翅膀更好",
      commentList: [
        {
          editTime: "22-10-17",
          userName: "YAN",
          userAvatarUrl: "img/home/avatar1.jpg",
          detail: "相见时难别亦难",
          likeNum: 11
        },
        {
          editTime: "22-10-19",
          userName: "NNN",
          userAvatarUrl: "img/home/avatar1.jpg",
          detail: "东风无力百花残",
          likeNum: 12
        },
        {
          editTime: "22-10-17",
          userName: "YAN",
          userAvatarUrl: "img/home/avatar1.jpg",
          detail: "相见时iuu难别亦难",
          likeNum: 12
        },
        {
          editTime: "22-10-19",
          userName: "NNN",
          userAvatarUrl: "img/home/avatar1.jpg",
          detail: "东风无力irk百花残",
          likeNum: 12
        }
      ],
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
  overflow: auto;
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
  overflow: auto;
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

.keywords {
  position: absolute;
  color: #030303;
  font-size: 15px;
  top: 155px;
  left: 20px;
}

.abstract {
  position: absolute;
  color: #030303;
  font-size: 10px;
  top: 190px;
  left: 20px;
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
  width: 850px;
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
</style>