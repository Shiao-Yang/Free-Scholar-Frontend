<template>
  <div class="searchList">
    <div class="search-box">
      <div class="first-search">
        <select id="select-type" style="outline: none" v-model="field">
          <option value="title">标题</option>
          <option value="keywords">关键词</option>
          <option value="abstract">摘要</option>
          <option value="author">作者</option>
          <option value="venue">期刊</option>
        </select>
        <span class="header-search-box">
      <input type="text" autocomplete="off"
             id="input"
             class="search-input"
             v-model="input"
             placeholder="Search resources..."
             @keyup.enter="search()">
      <span class="search-icon" title="搜索"><i class='bx bx-search' @click="search()"></i></span>
      </span>
      </div>
      <div class="more-search" v-for="(item, i) in inputs">
        <select style="outline: none" v-model="conditions[i]">
          <option value="AND">且</option>
          <option value="OR">或</option>
          <option value="NOR">非</option>
        </select>
        <select style="outline: none" v-model="fields[i]">
          <option value="title">标题</option>
          <option value="keywords">关键词</option>
          <option value="abstract">摘要</option>
          <option value="author">作者</option>
          <option value="venue">期刊</option>
        </select>
        <span class="header-search-box">
        <input type="text" autocomplete="off"
             class="search-input"
             v-model="inputs[i]"
             placeholder="Search resources..."
             @keyup.enter="search()">
        <span class="search-icon" title="删除"><i class='bx bx-minus-circle' @click="del(i)"></i></span>
        </span>
      </div>
      <div class="condition-box">
        <span class="add-condition" @click="addCondition">
          添加条件
        </span>
        <span class="clear-condition" @click="clearCondition">
          清空条件
        </span>
      </div>
    </div>
    <div id="filter">
      <p style="left: 5px;position:relative;">筛选</p>
      <p style="font-size: 12px;margin-top: 20px;margin-bottom: 8px;cursor: pointer" @click="time_zone = !time_zone">
        时间
        <i class='bx bx-chevron-down' style="position: absolute;font-size: 16px;right: 10px;"></i>
      </p>
      <hr style=" height:2px;border:none;border-top:2px solid #ecf0f1;margin: 0px" />
      <div class="time-range" v-if="time_zone">
        <div class="block">
          <el-date-picker
              style="width: 95px;margin-right: 20px"
              v-model="startTime"
              type="year">
          </el-date-picker>
          <span>~</span>
          <el-date-picker
              style="width: 95px;margin-left: 20px"
              v-model="endTime"
              type="year">
          </el-date-picker>
          <span class="search-icon" title="搜索"><i class='bx bx-search' @click=""></i></span>
        </div>
        <table>
          <tr>
            <td style="cursor: pointer"><span style="color: #2196f3;margin: 15px;">近十年</span></td>
            <td style="cursor: pointer"><span style="color: #2196f3;margin: 15px;">近五年</span></td>
            <td style="cursor: pointer"><span style="color: #2196f3;margin: 15px;">近三年</span></td>
          </tr>
        </table>
      </div>
      <p style="font-size: 12px;margin-top: 20px;margin-bottom: 8px;width: 100%;cursor: pointer" @click="type_zone = !type_zone">出版物类型
        <i class='bx bx-chevron-down' style="position: absolute;font-size: 16px;right: 10px"></i>
      </p>
      <hr style=" height:2px;border:none;border-top:2px solid #ecf0f1;margin: 0px" />
      <div class="item" v-for="item in types" v-if="type_zone">
        <img v-if=!item.active :src="item.src" class="icon" :style="{width: item.size,height: item.size}">
        <img v-else :src="item.srcActive" class="icon" :style="{width: item.size,height: item.size}">
        <span v-if=item.active class="type" @click="item.active=false" style="color: #2196f3">{{item.type}}</span>
        <span v-else class="type" @click="item.active=true">{{item.type}}</span>
        <span class="num">{{item.num}}</span>
      </div>
      <p style="font-size: 12px;margin-top: 20px;margin-bottom: 8px;cursor: pointer" @click="language_zone = !language_zone">语言
        <i class='bx bx-chevron-down' style="position: absolute;font-size: 16px;right: 10px"></i>
      </p>
      <hr style=" height:2px;border:none;border-top:2px solid #ecf0f1;margin: 0px" />
      <div class="item" v-for="item in languages" v-if="language_zone">
        <label v-if="item.active"><input type="checkbox" :checked="item.active" @click="item.active=false"/>{{item.language}} </label>
        <label v-else><input type="checkbox" :checked="item.active" @click="item.active=true"/>{{item.language}} </label>
        <span class="num">{{item.num}}</span>
      </div>
      <p style="font-size: 12px;margin-top: 20px;margin-bottom: 8px;cursor: pointer" @click="keyword_zone = !keyword_zone">关键词
        <i class='bx bx-chevron-down' style="position: absolute;font-size: 16px;right: 10px"></i>
      </p>
      <hr style=" height:2px;border:none;border-top:2px solid #ecf0f1;margin: 0px" />
      <div class="item-2" v-for="item in keywords" v-if="keyword_zone">
        <p class="filter-item"><span style="cursor: pointer">{{item}}</span></p>
      </div>
      <p style="font-size: 12px;margin-top: 20px;margin-bottom: 8px;cursor: pointer" @click="organization_zone = !organization_zone">机构
        <i class='bx bx-chevron-down' style="position: absolute;font-size: 16px;right: 10px"></i>
      </p>
      <hr style=" height:2px;border:none;border-top:2px solid #ecf0f1;margin: 0px" />
      <div class="item-2" v-for="item in organizations" v-if="organization_zone">
        <p class="filter-item"><span style="cursor: pointer">{{item}}</span></p>
      </div>
      <p style="font-size: 12px;margin-top: 20px;margin-bottom: 8px;cursor: pointer" @click="journal_zone = !journal_zone">期刊
        <i class='bx bx-chevron-down' style="position: absolute;font-size: 16px;right: 10px"></i>
      </p>
      <hr style=" height:2px;border:none;border-top:2px solid #ecf0f1;margin: 0px" />
      <div class="item-2" v-for="item in journals" v-if="journal_zone">
        <p class="filter-item"><span style="cursor: pointer">{{item}}</span></p>
      </div>
    </div>
    <div class="content">
      <div class="result-box" v-for="(result, i) in displayResult">
        <p class="articleName"><span style="cursor: pointer" @click="">{{result.articleName}}</span></p>
        <ul class="authors-list">
          <li class="author" v-for="author in result.author">{{author.name}}</li>
        </ul>
        <p class="abstract">{{result.abstract}}</p>
        <ul class="info-list">
          <li class="info">
            <i class='bx bxs-like' :class="{'icon-active':result.liked,'icon':!result.liked}"></i>
            <span class="nums">{{result.likes}}</span>
          </li>
          <li class="info">
            <i class='bx bxs-star'  :class="{'icon-active':result.collected,'icon':!result.collected}"></i>
            <span class="nums">{{result.collections}}</span>
          </li>
          <li class="info">
            <i class='bx bxs-comment icon'></i>
            <span class="nums">{{result.comments}}</span>
          </li>
          <li class="info">
            <span>被引用次数:&nbsp</span>
            <span class="nums">{{result.quotes}}</span>
          </li>
          <li class="info">
            <span>年份:&nbsp</span>
            <span class="nums">{{result.year}}</span>
          </li>
        </ul>
      </div>
    </div>
    <div class="block">
      <el-pagination
          style="position: absolute;left: 35%;"
          layout="prev, pager, next, jumper"
          :page-size="20"
          :current-page.sync="currentPage"
          :pager-count="11"
          :total="total"
          @current-change="changePage"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>

import qs from "qs";

export default {
  name: 'SearchList',
  created() {
    window.myData = this;
  },
  mounted() {

  },
  data() {
    return {
      time_zone: true,
      type_zone: true,
      language_zone: true,
      keyword_zone: true,
      organization_zone: true,
      journal_zone: true,
      startTime: '',
      endTime: '',
      searchType: '',
      field: 'title',
      input: '',
      conditions: [],
      fields: [],
      inputs: [],
      oldConditions: [],
      oldFields: [],
      oldInputs: [],
      searches: 0,
      total: 0,
      currentPage: 1,
      types: [{
          active: false,
          srcActive: require("../assets/img/searchList/conferenceActive.png"),
          src: require("../assets/img/searchList/conference.png"),
          size: "15px",
          type: "会议论文",
          num: "345",
        }, {
          active: false,
          srcActive: require("../assets/img/searchList/magazineActive.png"),
          src: require("../assets/img/searchList/magazine.png"),
          size: "14px",
          type: "期刊",
          num: "1234",
        }
      ],
      languages: [{
          language: "英文",
          active: false,
          num: "1234",
        }, {
          language: "中文",
          active: false,
          num: "12",
        }, {
          language: "其它",
          active: false,
          num: "2377"
        }
      ],
      keywords: [
        "1111","22222","33333","4444444","555","21323"
      ],
      organizations: [
        "1111","22222","33333","4444444","555","21323"
      ],
      journals: [
        "1111","22222","33333","4444444","555","21323"
      ],
      displayResult: [ // 只展示20个
      ],
      results: [

      ]
    }
  },
  methods: {
    del(index) {
      this.searches -= 1;
      this.conditions.splice(index,1);
      this.fields.splice(index,1);
      this.inputs.splice(index,1);
    },
    addCondition(){
      this.searches += 1;
      this.conditions.push('AND');
      this.fields.push('title');
      this.inputs.push('');
    },
    clearCondition(){
      this.searches = 0;
      this.conditions = [];
      this.fields = [];
      this.inputs = [];
    },
    search() {
      let params = {
        page: 1,
        condition: [
            {
              type: "OR",
              input: this.input,
              field: this.field
            }
        ]
      }
      let i;
      for (i = 0; i < this.inputs.length; i++) {
        params.condition.push({type: this.conditions[i],input: this.inputs[i],field: this.fields[i]})
      }
      this.oldConditions = this.conditions;
      this.oldInputs = this.inputs;
      this.oldFields = this.fields;
      console.log(params)
      this.axios({
        method: 'post',
        url: 'http://139.9.134.209:8000/api/publication/search/',
        data: params
      })
          .then(res => {
            console.log(res.data)
            this.total = res.data.total.value
            this.displayResult = [];
            let i = 0;
            for (i = 0; i < res.data.hits.length; i++) {
              let Abstract,quotes;
              if (res.data.hits[i]._source.hasOwnProperty('abstract')) {
                Abstract = res.data.hits[i]._source.abstract
              } else {
                Abstract = '';
              }
              if (res.data.hits[i]._source.hasOwnProperty('n_citation')) {
                quotes = res.data.hits[i]._source.n_citation
              } else {
                quotes = 0;
              }
              this.displayResult.push(
                  {
                    articleName: res.data.hits[i]._source.title,
                    author: res.data.hits[i]._source.authors,
                    abstract: Abstract,
                    liked: false,
                    likes: '54',
                    collected: false,
                    collections: '27',
                    comments: '10',
                    quotes:  quotes,
                    year: res.data.hits[i]._source.year,
                  }
              )
            }
            this.currentPage = 1;
          })
    },
    changePage(val){
      console.log('page:'+val)
      let params = {
        page: val,
        condition: [
          {
            type: "OR",
            input: this.input,
            field: this.field
          }
        ]
      }
      let i;
      for (i = 0; i < this.oldInputs.length; i++) {
        params.condition.push({type: this.oldConditions[i],input: this.oldInputs[i],field: this.oldFields[i]})
      }
      console.log(params)
      this.axios({
        method: 'post',
        url: 'http://139.9.134.209:8000/api/publication/search/',
        data: params
      })
          .then(res => {
            console.log(res.data)
            this.total = res.data.total.value
            this.displayResult = [];
            let i = 0;
            for (i = 0; i < res.data.hits.length; i++) {
              let Abstract,quotes;
              if (res.data.hits[i]._source.hasOwnProperty('abstract')) {
                Abstract = res.data.hits[i]._source.abstract
              } else {
                Abstract = '';
              }
              if (res.data.hits[i]._source.hasOwnProperty('n_citation')) {
                quotes = res.data.hits[i]._source.n_citation
              } else {
                quotes = 0;
              }
              this.displayResult.push(
                  {
                    articleName: res.data.hits[i]._source.title,
                    author: res.data.hits[i]._source.authors,
                    abstract: Abstract,
                    liked: false,
                    likes: '54',
                    collected: false,
                    collections: '27',
                    comments: '10',
                    quotes:  quotes,
                    year: res.data.hits[i]._source.year,
                  }
              )
            }
          })
    },
  }
}
</script>

<style scoped>
.search-box {
  position: relative;
  margin: 0 auto 20px;
  width: 50%;
  min-height: 100px;
  border-radius: 3px;
  border: 1px solid rgb(240,240,240);
  box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.2);
}
.first-search {
  height: 50px;
  margin-bottom: 20px;
}
.header-search-box {
  position: relative;
}

.header-search-box .search-input{
  position: relative;
  font-size: 15px;
  min-width: 72%;
  height: 20px;
  padding: 10px 20px 10px 20px;
  border-radius: 3px;
  border: 2px solid rgb(240,240,240);
  border-bottom: 3px solid rgba(33,150,243,0.5);
  box-shadow: 0 0px 8px 0 rgba(0, 0, 0, 0.1);
  outline: none;
}
.more-search .header-search-box .search-input {
  min-width: 67%;
}
.header-search-box .search-icon i{
  text-align: center;
  color: #333333;
  margin-left: 5px;
  margin-bottom: 40px;
  line-height: 50px;
  height: 50px;
  font-size: 15px;
  min-width: 50px;
  background: white;
  border-radius: 50%;
  cursor: pointer;
  transition: .5s;
}

.header-search-box .search-icon .bx-search:hover {
  color: white;
  background: #2196f3;
}
.header-search-box .search-icon .bx-minus-circle:hover {
  color: white;
  background: #C34A36;
}
.more-search {
  height: 50px;
  margin-bottom: 5px;
}
.add-condition {

  cursor: pointer;
}
.clear-condition {
  margin-left: 75%;
  cursor: pointer;
}
#filter {
  position: absolute;
  left: 0px;
  width: 27%;
}
.time-range {
  margin: 10px 0 10px 5px;
}
.block {
  margin-bottom: 10px;
}
.block .search-icon i {
  text-align: center;
  color: #333333;
  margin-left: 5px;
  line-height: 40px;
  height: 40px;
  font-size: 15px;
  min-width: 40px;
  background: white;
  border-radius: 50%;
  cursor: pointer;
  transition: .5s;
}
.block .search-icon i:hover {
  color: white;
  background: #2196f3;
}
table {
  border: 1px solid #2196f3;
  magin: 0px auto;
  border-spacing: 0px;
  border-collapse: collapse;
}
td {
  border: 1px solid #2196f3;
}
td:hover {
  background-color: #f8f8ff;
}
.item {
  margin: 10px 0px 10px 0px;
}
.type {
  position: absolute;
  left: 20px;
  cursor: pointer;
}
.num {
  position: absolute;
  right: 10px;
}
.filter-item{
  margin: 5px 5px;
}
.content {
  position: relative;
  margin-top: 50px;
  left: 32%;
  width: 70%;
  min-height: 550px;
}

.result-box {
  margin: 0 0 20px 0;
  width: 80%;
}
.articleName {
  color: #2196f3;
  font-size: 19px;
  margin: 0;
}
.authors-list {
  margin: 0;
  padding: 0;
  width: 70%;
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
.abstract {
  margin: 4px 0 8px 0;
  font-size: 15px;
  line-height: 18px;
  width: 90%;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
  cursor: pointer;
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
.info .icon-active {
  font-size: 15px;
  color: #2196f3;
}
</style>