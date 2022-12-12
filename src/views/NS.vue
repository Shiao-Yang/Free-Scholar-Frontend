<template>
    <div class="NS">
        <div class="left">
            <div class="name">
                <div class="blackBox">
                    <img :src="require('../assets/'+baseInfo.avatar)" class="image">
                    <div class="userName" style="position: absolute; text-align: center;
                     font-size: 120%; display: inline-block; left: 85px; right: 0;
                     top: 40px; color: white; font-weight: bold">{{this.userName}}</div>
                </div>
                <div class="option-box">
                  <div class="follow" v-if="this.follow===0" style="color: #333333">
                    <i class="bx bxs-user-plus"></i>
                    <div class="fo" style="position: absolute; margin-top: 13px; left: 50px; font-size: 15px"
                         @click="">关注</div>
                  </div>
                    <div class="follow" v-else style="color: #2196f3">
                        <i class="bx bxs-user-plus"></i>
                        <div style="position: absolute; margin-top: 13px; left: 50px; font-size: 15px"
                             @click="">已关注</div>
                    </div>
                  <div class="claim" v-if="this.accreditation===0" style="color: #333333">
                    <i class="bx bxs-award"></i>
                    <div style="position: absolute; margin-top: 13px; left: 135px; font-size: 15px;">未认领</div>
                  </div>
                    <div class="claim" v-else style="color: #ffcb74">
                        <i class="bx bxs-award"></i>
                        <div style="position: absolute; margin-top: 13px; left: 135px; font-size: 15px;">已认领</div>
                    </div>
                  <div class="message">
                    <i class="bx bxs-chat"></i>
                    <div style="position: absolute; margin-top: 13px; left: 245px; font-size: 15px">私信</div>
                  </div>
                </div>
            </div>
            <div class="introduction">
                <i class="bx bxs-user-pin"></i>
                <div class="intro">个人简介</div>
                <div class="line"></div>
                <div class="detail">{{introduction}}</div>
            </div>
            <div class="name">
                <i class='bx bxs-thermometer'></i>
                <div class="heat">热度</div>
                <div class="line"></div>
                <div style="position: absolute; text-align: center; width: 100%; top: 70px;
                 font-size: 30px; color: #C34A36">{{heat}}</div>
            </div>
            <div class="name">
                <i class='bx bx-globe'></i>
                <div class="heat">门户访问量</div>
                <div class="line2"></div>
                <div style="position: absolute; text-align: center; width: 100%; top: 70px;
                 font-size: 30px; color: #ffc75f">{{visitors}}</div>
            </div>
        </div>
        <div class="middle">
            <div class="top" style="position: relative; height: 60px">
                <i class='bx bxs-graduation'></i>
                <div style="position: absolute; left: 75px; font-size: 25px; font-weight: bold; top: 5px">学术成果</div>
                <div class="line" style="margin-top: 10px"></div>
            </div>
            <div style="position: relative; height: 30px">
                <div style="position: absolute; left: 20px">排序方式：</div>
                <button class="sort" @click="sortByTime(0)">按发表时间排序</button>
                <button class="sort" style="left: 220px" @click="sortByTime(1)">按引用量排序</button>
            </div>
            <div style="overflow: auto; position: absolute; width: 100%; height: 660px">
                <div class="contents" v-for="(item) in paperList">
                    <div style="display: flex; width: 98%; height: auto">
                        <i class='bx bxs-bookmark-alt'></i>
                        <a :href="item.url" class="title">{{item.title}}</a>
                    </div>
                    <div style="position: relative; display: flex; flex-wrap: wrap; list-style: none; line-height: 15px;
                    margin-left: 25px; align-items: center;">
                        <div class="author" v-for="(tItem) in item.authors" >
                            <span v-if="tItem.id" @click="temp(tItem.id)">{{tItem.name}}</span>
                            <span v-else @click="$message('暂无该作者信息')">{{tItem.name}}</span>
                        </div>
                        <div style="margin-left: auto">
                            <div class="year">年份: {{item.year}}</div>
                            <i class='bx bx-link'></i>
                            <div class="citation">被引用次数: {{item.n_citation}}</div>
                        </div>

                    </div>


                </div>
            </div>


        </div>
        <div class="right">
            <div class="top" style="position: relative; height: 60px">
                <i class='bx bxs-contact'></i>
                <div style="position: absolute; left: 75px; font-size: 25px; font-weight: bold; top: 5px">学者关系网</div>
                <div class="line" style="margin-top: 10px"></div>
            </div>
            <div style="position: absolute; overflow: auto; width: 100%; height: 690px">
                <div class="scholar" v-for="(item) in scholarList">
                    <img :src="require('../assets/'+'YAN.jpg')" class="image"
                         style="height: 60px; width: 60px; margin: 5px;
                padding: 0; border-radius: 8px">
                    <div style="position: absolute; left: 70px;
                margin-top: 10px; font-weight: bold">{{item.name}}</div>
                    <div style="position: absolute; left: 70px; font-size: 10px; bottom: 10px">合作论文数：{{item.count}}</div>
                </div>
            </div>

        </div>

    </div>

</template>

<script>
    import qs from 'qs';
    export default {
        name: "NS",
        data() {
            return {
                uid: '540888a2dabfae92b4247e94',
                userName: '',
                baseInfo: {
                    userName: '王海涛',
                    avatar: 'YAN.jpg',
                },
                sort: 0, //0表示按时间排序，1表示按引用量排序
                follow: 0, //1表示已关注，0表示未关注
                accreditation: 0, //1表示已认证，0表示未认证
                introduction:'这个人很懒，什么都没有写……',
                heat: 38,
                visitors: 23,
                paperList: [],
                scholarList: [],

            }
        },
        methods: {
            focus(uid){
              this.$axios({
                  method: 'post',
                  url: this.$store.state.address + 'api/relation/focus',
                  data: qs.stringify(({
                    aim_id: uid
                  }))
              }).then(res =>{
                  console.log(res)
              })
                .catch(err =>{
                    console.log(err)
                })
            },
            temp(id){
                this.uid = id;
                this.getCoworkers(id);
            },
            sortByTime(n){
                if(n==0){
                    this.paperList.sort(function (a, b) {
                        return b.year - a.year;
                    })
                }
                else {
                    this.paperList.sort(function (a, b) {
                        return b.n_citation - a.n_citation;
                    })
                }
            },
            getCoworkers(uid){
                this.axios({
                    method: 'post',
                    url: this.$store.state.address+'api/author/getAuthor/',
                    data: qs.stringify({
                        id: uid
                    })
                }).then(res => {
                    // console.log(res.data)
                    this.scholarList = res.data.coworkers;
                    this.paperList = res.data.data.pubs;
                    this.userName = res.data.data.name;
                    // this.coID = res.data.
                }).catch(err => {
                    // console.log(err)
                })
            },
            getBaseInfo(uid){
                this.axios({
                    method: 'get',
                    url: this.$store.state.address + 'api/ScholarPortal/GetBaseInfo/?pid=' + uid,
                    // url: this.$store.state.address + 'api/ScholarPortal/GetBaseInfo/?pid=' + '1',
                }).then(res => {
                    console.log(res)
                    if(res.data.introduction!=null){
                        this.introduction = res.data.introduction;
                    }
                    if(res.data.heat==null){
                        this.heat = 0;
                    }
                    else {
                        this.heat = res.data.heat
                    }
                    if(res.data.visitors==null){
                        this.visitors = 0
                    }
                    else{
                        this.visitors = res.data.visitors
                    }

                }).catch(err =>{
                    console.log(err)
                })

            },

        },
        created() {
            // console.log(this.$route.query.id)
            this.uid = this.$route.query.id;
            console.log(this.uid)
            this.getCoworkers(this.uid)
            // this.getBaseInfo(this.uid)
        }
    }
</script>

<style scoped>
    .NS {
      width: 100%;
      /*min-width: 1450px;*/
    }

    .left {
        position: relative;
        display: inline-block;
        width: 24%;
        /*min-width: 330px;*/
        margin: 10px;
        height: 760px;
        /*background-color: #4DA5FF;*/
    }
    .middle {
        position: relative;
        display: inline-block;
        width: 45%;
        /*min-width: 680px;*/
        height: 760px;
        margin: 10px;
        /*background-color: #00CA97;*/
        border-radius: 5px;
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.2);
    }
    .right {
        position: relative;
        display: inline-block;
        width: 24%;
        /*min-width: 330px;*/
        height: 760px;
        margin: 10px;
        /*margin-top: 0;*/
        border-radius: 5px;
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.2);
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
    .middle .title {
        position: relative;
        text-decoration: none;
        display: inline-block;
        margin-bottom: 5px;
        margin-left: 5px;
        margin-top: 5px;
        /*left: 25px;*/
        font-size: 15px;
        color: #4DA5FF;
        cursor: pointer;
    }
    .middle .title:hover {
        position: relative;
        text-decoration: underline;
        margin-left: 5px;
        margin-top: 5px;
        /*left: 25px;*/
        font-size: 15px;
        color: #4DA5FF;
        cursor: pointer;
    }
    .right .bxs-contact {
        position: absolute;
        /*margin-top: 10px;*/
        margin-left: 20px;
        font-size: 50px;
        color: #845ec2;
    }
    .right .scholar {
        position: relative;
        border-radius: 5px;
        box-shadow: 0px 0px 5px rgba(0,0,0,0.3);
        height: 70px;
        width: 93%;
        margin: 10px auto;
        /*overflow: auto;*/
        /*overflow: hidden;*/
    }
    .bxs-graduation {
        position: absolute;
        /*margin-top: 10px;*/
        margin-left: 20px;
        font-size: 50px;
        color: #FBBD08;
    }
    .contents .bx-link {
        position: relative;
        display: inline-block;
        font-size: 13px;
        margin-right: 5px;
    }
    .contents .year {
        position: relative;
        display: inline-block;
        /*align-self: cross-end;*/
        margin-right: 10px;
        font-size: 13px;
    }
    .contents .citation {
        position: relative;
        display: inline-block;
        /*align-self: cross-end;*/
        margin-right: 10px;
        font-size: 13px;
    }
    .middle .bxs-bookmark-alt {
        /*position: relative;*/
        /*display: inline-block;*/
        font-size: 20px;
        margin: 5px 5px 10px 10px;
        color: #FBBD08;
    }
    .middle .author {
        /*position: relative;*/
        /*display: inline-block;*/
        margin-left: 15px;
        font-size: 10px;
        color: #24bf24;
        cursor: pointer;
    }
    .middle .author:hover {
        color: #27ae60;
        font-weight: bold;
    }
    .middle .sort {
        position: absolute;
        background-color: white;
        color: #0f62fe;
        border: 1px solid #0f62fe;
        left: 100px;
        transition: .5s;
    }
    .middle .sort:hover {
        color: white;
        background: #2196f3;
    }
    .middle .sort:focus {
        color: white;
        background: #2196f3;
    }
    .middle .contents {
        position: relative;
        /*display: flex;*/
        /*!*flex-wrap: wrap;*!*/
        /*flex-direction: row;*/
        height: auto;
        width: 95%;
        padding-bottom: 5px;
        margin: 10px auto;
        border-radius: 10px;
        box-shadow: 0px 0px 5px rgba(0,0,0,0.3);
    }
    .left .name {
        position: relative;
        background-color: white;
        width: 100%;
        height: 145px;
        border-radius: 10px;
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.2);
        margin-bottom: 10px;
    }
    .left .introduction {
        position: relative;
        background-color: white;
        width: 100%;
        height: 170px;
        border-radius: 10px;
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.2);
        margin-bottom: 10px;
    }
    .name .bxs-user-plus {
        position: absolute;
        display: inline-block;
        font-size: 30px;
        margin-top: 7px;
        margin-left: 15px;
        /*color: #333333;*/
    }

    .introduction .bxs-user-pin {
        position: absolute;
        margin-top: 15px;
        margin-left: 20px;
        font-size: 30px;
        color: #0089ba;
    }
    .introduction .intro {
        position: absolute;
        margin-top: 13px;
        left: 55px;
        font-size: 20px;
        font-weight: bold;
    }
    .line {
        position: relative;
        width: 80%;
        background-color: #0081cf;
        margin-left: 20px;
        height: 1px;
        top: 48px;
    }
    .introduction .detail {
        position: absolute;
        font-size: 10px;
        top: 55px;
        left: 20px;
    }
    .name .bxs-thermometer {
        position: absolute;
        margin-top: 15px;
        font-size: 30px;
        margin-left: 20px;
        color: #c34a36;

    }
    .name .bx-globe {
        position: absolute;
        margin-top: 15px;
        font-size: 30px;
        margin-left: 20px;
        color: #ffc75f;
    }
    .name .line {
        position: relative;
        width: 80%;
        background-color: #C34A36;
        margin-left: 20px;
        height: 1px;
        top: 48px;
    }
    .name .line2 {
        position: relative;
        width: 80%;
        background-color: #ffc75f;
        margin-left: 20px;
        height: 1px;
        top: 48px;
    }
    .name .heat{
        position: absolute;
        margin-top: 13px;
        left: 55px;
        font-size: 20px;
        font-weight: bold;
    }
    .name .bxs-award {
        position: absolute;
        display: inline-block;
        font-size: 30px;
        margin-top: 7px;
        left: 105px;
        /*color: #ffcb74;*/
    }
    .name .bxs-chat {
        position: absolute;
        display: inline-block;
        font-size: 30px;
        margin-top: 7px;
        left: 210px;
        color: #333333;
    }
    .blackBox {
        position: relative;
        background: url("../assets/img/ScholarsPortal/nameBackground.jpg");
        position: relative; width: 100%; height: 100px;
        border-radius: 10px
    }
    .image {
        position: absolute;

        padding: 15px;
        width: 70px; height: 70px;
        border-radius: 20px;

        display: inline-block
    }

    .follow {
      transition: 0.2s;
      /*color: #333333;*/
      cursor: pointer;
    }

    .follow:hover .fo{
      color: #2196f3;
    }

    .follow:hover .bxs-user-plus{
      color: #2196f3;
    }

    .message {
      transition: 0.2s;
      color: #333333;
      cursor: pointer;
    }

    .message:hover {
      color: #00cc00;
    }

    .message:hover .bxs-chat{
      color: #00cc00;
    }
</style>
