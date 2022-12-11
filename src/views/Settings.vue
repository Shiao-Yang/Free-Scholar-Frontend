<template>
  <div class="settings">
    <div class="header">
      <div class="header-text-box">
        <p id="welcome" class="header-text">开启你的学术之旅</p>
      </div>
      <div class="header-search-box">
        <input type="text" autocomplete="off"
               id="input"
               class="search-input"
               v-model="input"
               placeholder="Search resources..."
               @keyup.enter="search()">
        <span class="search-icon" title="搜索"><i class='bx bx-search' @click="search()"></i></span>
      </div>
      <div class="hotWord-box">
        <ul id="hot" class="hotWord-list">
          <li><span class="hotWord-text">热词推荐</span></li>
          <li id="hot1" class="hot-item"><span class="hotWord">AI</span></li>
          <li id="hot2" class="hot-item"><span class="hotWord">计算机技术</span></li>
          <li id="hot3" class="hot-item"><span class="hotWord">核磁共振</span></li>
        </ul>
      </div>
    </div>
    <div class="content">
      <p><i class='bx bxs-hot'></i>热点文章</p>
      <div class="result-box" v-for="(result, i) in paper">
        <p class="articleName"><span style="cursor: pointer" @click="">{{result.title}}</span></p>
        <ul class="authors-list">
          <li class="author" v-for="author in result.author">{{author.name}}</li>
        </ul>
        <p class="abstract">{{result.abstract}}</p>
        <ul class="info-list">
          <li class="info">
            <i class='bx bxs-star' style="font-size: 15px"></i>
            <span class="nums">{{result.collection}}</span>
          </li>
          <li class="info">
            <i class='bx bxs-comment icon'></i>
            <span class="nums">{{result.comment}}</span>
          </li>
          <li class="info">
            <span>被引用次数:&nbsp</span>
            <span class="nums">{{result.quote}}</span>
          </li>
        </ul>
        <hr style=" height:2px;border:none;border-top:2px solid #ecf0f1;margin-top: 5px" />
      </div>
    </div>
    <div class="side">
      <div class="register-login" v-if="!isLogin">
        <p>知识不分国界</p>
        <p>智慧不设围墙</p>
        <div class="btn" @click="$router.push('/login&signup')"><span>登录/注册</span></div>
      </div>
      <div class="trending-box">
      <p><i class='bx bxs-hot'></i>Trending</p>
      <table class="trending-table">
        <tr v-for="(item, i) in hotWord" class="trending">
          <td class="trending-num" :class="{'first':i===0,'second':i===1,'third':i===2}">{{i+1}}</td>
          <td class="trending-name"><span @click="input=item;search()">{{item}}</span></td>
        </tr>
      </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Settings',
  created() {
    this.getHotWord()
    this.getHotPaper()
    this.isLogin()
  },
  mounted() {
  },
  data() {
    return {
      input: '',
      hotWord: [
        'AI',
        '无机化学',
        '计算机技术',
        '核磁共振',
        '蛋白质分析结构',
        '大规模基因组测序',
        '计算机技术',
        '核磁共振',
        '蛋白质分析结构',
        '大规模基因组测序'
      ],
      paper: [
        {
          id: '',
          title: 'aaa',
          author: [
            {
              id: '111',
              name: 'peter'
            }
          ],
          abstract: '11111111111111111111111111111111111111111111',
          collection: 1,
          comment: 2,
          quote: 3
        }, {
          id: '',
          title: 'aaa',
          author: [
            {
              id: '111',
              name: 'peter'
            }
          ],
          abstract: '11111111111111111111111111111111111111111111',
          collection: 1,
          comment: 2,
          quote: 3
        }
      ]
    }
  },
  methods: {
    isLogin(){
      if (sessionStorage.getItem('baseInfo') !== null) {
        console.log('true111')
        return true
      }
      console.log('false111')
      return false
    },
    search() {
      this.$store.state.input = this.input
      this.$router.push('/searchList')
    },
    getHotWord() {
      this.axios({
        method: 'post',
        url: this.$store.state.address+'api/publication/HotWord/'
      })
          .then(res=>{
            console.log(res.data)
          })
    },
    getHotPaper() {
      this.axios({
        method: 'post',
        url: this.$store.state.address+'api/publication/HotPaper/'
      })
          .then(res=>{
            console.log('hotPaper:')
            console.log(res.data)
          })
    }
  }
}
</script>

<style scoped>
.settings {
  position: relative;
  margin: 0 auto;
  width: 100%;
  min-width: 1300px;
  height: 300px;
  border-radius: 10px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.3), 0 6px 20px 0 rgba(0, 0, 0, 0.3);
  background: url("../assets/img/settings/searchImg.jpg") no-repeat;
  background-size: 100% 300px;
}
.header {
  max-width: 1380px;
  width: 100%;
  margin: 0 auto;
}
.header-text-box{
  width: 100%;
  margin: 0 auto;
  padding: 30px 0;
  text-align: center;
}
.header-text-box .header-text{
  font-size: 65px;
  color: white;
  font-weight: bold;
  margin: 0;
}
.header-search-box {
  /*margin: 0 auto;*/
  position: relative;
  text-align: center;
}
.header-search-box .search-input{
  position: relative;
  font-size: 18px;
  font-weight: bold;
  min-width: 550px;
  height: 30px;
  padding: 10px 20px 10px 20px;
  border-radius: 10px;
  border: none;
  outline: none;
}
.header-search-box .search-icon i{
  color: #333333;
  margin-left: 5px;
  line-height: 50px;
  height: 50px;
  font-size: 20px;
  min-width: 50px;
  background: white;
  border-radius: 50%;
  cursor: pointer;
  transition: .5s;
}
.header-search-box .search-icon i:hover {
  color: white;
  background: #2196f3;
}
.hotWord-box {
  margin-top: 30px;
  width: 100%;
}
.hotWord-box .hotWord-list{
  margin: 0;
  padding: 0;
  width: 100%;
  display: flex;
  list-style: none;
  height: 30px;
  line-height: 40px;
  align-items: center;
  justify-content: center;
}
.hotWord-box .hotWord-list .hotWord-text {
  color: white;
  font-size: 20px;
  font-weight: bold;
}
.hotWord-list .hot-item {
  font-size: 14px;
  margin: 0 20px;
  background: white;
  min-width: 50px;
  text-align: center;
  padding: 5px 15px;
  border-radius: 20px;
  cursor: pointer;
  transition: 0.5s;
}
.hotWord-list .hot-item:hover {
  padding: 8px 20px;
  font-size: 18px;
  font-weight: bold;
  color: white;
  background: #2196f3;
}
.content {
  position: relative;
  float: left;
  margin: 100px 0 0 0;
  padding: 1px;
  width: 76%;
  min-width: 900px;
  min-height: 400px;
  border-radius: 10px;
  box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.2);
}
.content>p {
  display: flex;
  align-items: center;
  font-size: 16px;
  font-weight: bold;
  margin: 10px 0 0 10px;
}
.content>p>i{
  color: #DA1E28;
  font-size: 30px;
}
.result-box {
  margin: 0 0 20px 20px;
  width: 95%;
  padding: 10px;
}
.articleName {
  color: #2196f3;
  font-size: 19px;
  margin: 0;
}
.authors-list {
  margin: 0;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  list-style: none;
  line-height: 15px;
  align-items: center;
}
.author {
  font-size: 15px;
  color: #27ae60;
  margin-right: 10px;
  cursor: pointer;
}
.author:hover {
  color: #248F24;
  font-weight: bold;
}
.abstract {
  margin: 4px 0 8px 0;
  font-size: 15px;
  line-height: 18px;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
  cursor: pointer;
  color: #333333;
}
.info-list {
  margin: 0;
  padding: 0;
  width: 100%;
  display: flex;
  list-style: none;
  height: 20px;
  line-height: 15px;
  align-items: center;
}
.info {
  margin-right: 40px;
}
.info .icon {
  font-size: 15px;
}
.side {
  float: left;
  position: relative;
  width: 20%;
  min-width: 250px;
  padding: 10px;
  margin: 100px 0 0 20px;
}
.register-login {
  width: 100%;
  height: 200px;
  background: url("../assets/img/settings/sky.png") no-repeat;
  background-size: 100% 300px;
  border-radius: 10px;
  padding: 1px;
}
.register-login p {
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
  font-size: 30px;
  margin: 0;
}
.register-login > p:first-child {
  margin-top: 20px;
}
.register-login .btn {
  position: relative;
  text-align: center;
  width: 120px;
  height: 45px;
  background-color: #2196f3;
  color: white;
  font-weight: bold;
  font-size: 20px;
  margin: 20px auto;
  border-radius: 5px;
  box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.2);
  cursor: pointer;
  transition: 0.5s;
}
.register-login .btn:hover {
  background-color: white;
  color: black;
}
.register-login .btn span {
  position: relative;
  top: 20%;
}
.trending-box {
  margin-top: 20px;
  padding: 10px;
  border-radius: 5px;
  box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.2);
}
.trending-box>p {
  display: flex;
  align-items: center;
  font-size: 16px;
  font-weight: bold;
  margin: 10px 0 0 10px;
}
.trending-box>p>i{
  color: #DA1E28;
  font-size: 30px;
  margin-right: 5px;
}
table {
  border-spacing: 0 5px;
}

.trending-table {
  width: 80%;
  text-align: center;
  /*border-spacing: 10px 0;*/
}

.trending-num {
  width: 20%;
  /*padding-right: 40px;*/
}
.trending-num.first {
  color: #DA1E28;
}
.trending-num.first + .trending-name{
  color: #DA1E28;
}
.trending-num.second {
  color: #FF9671;
}
.trending-num.second + .trending-name{
  color: #FF9671;
}
.trending-num.third {
  color: #2C73D2;
}
.trending-num.third + .trending-name{
  color: #2C73D2;
}
.trending-name {
  width: 80%;
}
.trending-name span{
  cursor: pointer;
}
</style>
