<template>
  <div class="searchList" ref="box">
    <div class="search-box">
      <div class="search-head-box">
        <span>Free Scholar</span>
      </div>
      <div class="first-search">
        <div class="first-selects">
          <div class="mainSelect" id="select-type" style="outline: none" v-model="field">
            <div class="main-selected">
              <span class="main-selected-text">{{translateField(field)}}</span>
            </div>
            <div class="main-icon" :class="{'active': firstFieldSelect}" @click="firstFieldSelect=!firstFieldSelect">
              <i class='bx bx-chevron-left'></i>
            </div>
            <div class="sub-menu" :class="{'active': firstFieldSelect}">
              <div class="sub-menu-item" :class="{'selected': field === 'title'}" @click="field='title';firstFieldSelect=false">
                <span class="text">标题</span>
              </div>
              <div class="sub-menu-item" :class="{'selected': field === 'keywords'}" @click="field='keywords';firstFieldSelect=false">
                <span class="text">关键词</span>
              </div>
              <div class="sub-menu-item" :class="{'selected': field === 'abstract'}" @click="field='abstract';firstFieldSelect=false">
                <span class="text">摘要</span>
              </div>
              <div class="sub-menu-item" :class="{'selected': field === 'author'}" @click="field='author';firstFieldSelect=false">
                <span class="text">作者</span>
              </div>
              <div class="sub-menu-item" :class="{'selected': field === 'venue'}" @click="field='venue';firstFieldSelect=false">
                <span class="text">期刊</span>
              </div>
            </div>
          </div>
        </div>
        <div class="header-search-box">
          <input type="text" autocomplete="off"
                 id="input"
                 class="search-input"
                 v-model="input"
                 placeholder="Search resources..."
                 @keyup.enter="search(0)">
        </div>
        <div class="advance-search-option" @click="isAdvanceSearch=!isAdvanceSearch">
          <span class="advance-search-text">高级检索</span>
          <span class="advance-search-icon" :class="{'active':isAdvanceSearch}"><i class='bx bx-chevron-left' ></i></span>
        </div>
        <div class="search-icon-box">
          <span class="search-icon" title="搜索"><i class='bx bx-search' @click="search(0)"></i></span>
        </div>
      </div>
      <div class="advance-search" v-if="isAdvanceSearch === true">
        <div class="more-search" v-for="(item, i) in inputs">
          <div class="mainSelect condition" id="select-type" style="outline: none" v-model="fields[i]">
            <div class="main-selected">
              <span class="main-selected-text">{{translateCondition(conditions[i])}}</span>
            </div>
            <div class="main-icon" :class="{'active': conditionSelect[i]}" @click="changeConditionSelect(i)">
              <i class='bx bx-chevron-left'></i>
            </div>
            <div class="sub-menu" :class="{'active': conditionSelect[i]}">
              <div class="sub-menu-item" :class="{'selected': conditions[i] === 'AND'}" @click="changeConditions(i, 'AND')">
                <span class="text">且</span>
              </div>
              <div class="sub-menu-item" :class="{'selected': conditions[i] === 'OR'}" @click="changeConditions(i, 'OR')">
                <span class="text">或</span>
              </div>
              <div class="sub-menu-item" :class="{'selected': conditions[i] === 'NOR'}" @click="changeConditions(i, 'NOR')">
                <span class="text">非</span>
              </div>
            </div>
          </div>
          <div class="mainSelect" id="select-type" style="outline: none" v-model="fields[i]">
            <div class="main-selected">
              <span class="main-selected-text">{{translateField(fields[i])}}</span>
            </div>
            <div class="main-icon" :class="{'active': fieldSelect[i]}" @click="changeFieldSelect(i)">
              <i class='bx bx-chevron-left'></i>
            </div>
            <div class="sub-menu" :class="{'active': fieldSelect[i]}">
              <div class="sub-menu-item" :class="{'selected': fields[i] === 'title'}" @click="changeFields(i, 'title')">
                <span class="text">标题</span>
              </div>
              <div class="sub-menu-item" :class="{'selected': fields[i] === 'keywords'}" @click="changeFields(i, 'keywords')">
                <span class="text">关键词</span>
              </div>
              <div class="sub-menu-item" :class="{'selected': fields[i] === 'abstract'}" @click="changeFields(i, 'abstract')">
                <span class="text">摘要</span>
              </div>
              <div class="sub-menu-item" :class="{'selected': fields[i] === 'author'}" @click="changeFields(i, 'author')">
                <span class="text">作者</span>
              </div>
              <div class="sub-menu-item" :class="{'selected': fields[i] === 'venue'}" @click="changeFields(i, 'venue')">
                <span class="text">期刊</span>
              </div>
            </div>
          </div>
          <div class="header-search-box">
            <input type="text" autocomplete="off"
                   class="search-input"
                   v-model="inputs[i]"
                   placeholder="Search resources..."
                   @keyup.enter="search(0)">
          </div>
          <div class="search-icon-box">
            <span class="search-icon" title="删除"><i class='bx bx-minus-circle' @click="del(i)"></i></span>
          </div>
        </div>
        <div class="condition-box">
          <div class="add-condition" >
            <div class="add-condition-btn" @click="addCondition">
              <span class="btn-icon"><i class='bx bx-plus-circle'></i></span>
              <span class="btn-text">添加条件</span>
            </div>
          </div>
            <div class="clear-condition" >
            <div class="clear-condition-btn"@click="clearCondition">
              <span class="btn-icon"><i class='bx bx-wind'></i></span>
              <span class="btn-text">清空条件</span>
            </div>
          </div>
        </div>
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
          <span class="search-icon" title="搜索"><i class='bx bx-search' @click="search(4)"></i></span>
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
        <p class="filter-item">
          <span v-if="item !== keyword" style="cursor: pointer" @click="search(1,item)">{{item}}</span>
          <span v-else style="cursor: pointer;color: #2196f3" @click="search(5)">{{item}}</span>
        </p>
      </div>
      <p style="font-size: 12px;margin-top: 20px;margin-bottom: 8px;cursor: pointer" @click="organization_zone = !organization_zone">机构
        <i class='bx bx-chevron-down' style="position: absolute;font-size: 16px;right: 10px"></i>
      </p>
      <hr style=" height:2px;border:none;border-top:2px solid #ecf0f1;margin: 0px" />
      <div class="item-2" v-for="item in organizations" v-if="organization_zone">
        <p class="filter-item">
          <span v-if="item !== org" style="cursor: pointer" @click="search(2,item)">{{item}}</span>
          <span v-else style="cursor: pointer;color: #2196f3" @click="search(6)">{{item}}</span>
        </p>
      </div>
      <p style="font-size: 12px;margin-top: 20px;margin-bottom: 8px;cursor: pointer" @click="journal_zone = !journal_zone">期刊
        <i class='bx bx-chevron-down' style="position: absolute;font-size: 16px;right: 10px"></i>
      </p>
      <hr style=" height:2px;border:none;border-top:2px solid #ecf0f1;margin: 0px" />
      <div class="item-2" v-for="item in journals" v-if="journal_zone">
        <p class="filter-item">
          <span v-if="item !== venue" style="cursor: pointer" @click="search(3,item)">{{item}}</span>
          <span v-else style="cursor: pointer;color: #2196f3" @click="search(7)">{{item}}</span>
        </p>
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
            <i v-if="!result.user_collected" class='bx bxs-star'  :class="{'icon-active':result.collected,'icon':!result.collected}"></i>
            <i v-else class='bx bxs-star' style="color: #2196f3" :class="{'icon-active':result.collected,'icon':!result.collected}"></i>
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
      firstFieldSelect: false,
      isAdvanceSearch: false,
      time_zone: true,
      type_zone: true,
      language_zone: true,
      keyword_zone: true,
      organization_zone: true,
      journal_zone: true,
      show_card: false,
      startTime: '',
      endTime: '',
      searchType: '',
      field: 'title',
      input: '',
      conditions: [],
      fieldSelect: [],
      conditionSelect:[],
      fields: [],
      inputs: [],
      oldConditions: [],
      oldFields: [],
      oldInputs: [],
      searches: 0,
      total: 0,
      currentPage: 1,
      user_collected: false,
      collection_num: 0,
      comment_num: 0,
      keyword: '',
      org: '',
      venue: '',
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
      ],
      organizations: [
      ],
      journals: [
      ],
      displayResult: [ // 只展示20个
      ],
      results: [

      ]
    }
  },
  methods: {
    changeFieldSelect(index) {
      this.$set(this.fieldSelect, index, !this.fieldSelect[index])
    },
    changeConditionSelect(index) {
      this.$set(this.conditionSelect, index, !this.conditionSelect[index])
    },
    changeConditions(index, content){
      this.$set(this.conditions, index, content);
      this.$set(this.conditionSelect, index, false);
    },
    changeFields(index, content) {
      this.$set(this.fields, index, content);
      this.$set(this.fieldSelect, index, false);
    },
    del(index) {
      this.searches -= 1;
      this.conditions.splice(index,1);
      this.fields.splice(index,1);
      this.inputs.splice(index,1);
      this.conditionSelect.splice(index, 1);
      this.fieldSelect.splice(index, 1);
    },
    addCondition(){
      this.searches += 1;
      this.conditions.push('AND');
      this.fields.push('title');
      this.inputs.push('');
      this.fieldSelect.push(false);
      this.conditionSelect.push(false);
    },
    clearCondition(){
      this.searches = 0;
      this.conditions = [];
      this.fields = [];
      this.inputs = [];
      this.fieldSelect = [];
      this.conditionSelect = [];
    },
    translateCondition(condition) {
      if(condition === 'AND') {
        return '且';
      }
      else if(condition === 'OR') {
        return '或';
      }
      else if(condition === 'NOR') {
        return '非';
      }
      else
        return "";
    },
    translateField(field) {
      if(field === 'title') {
        return "标题";
      }
      else if(field === 'keywords') {
        return "关键词";
      }
      else if(field === 'abstract') {
        return "摘要";
      }
      else if(field === 'author') {
        return "作者";
      }
      else if(field === 'venue') {
        return "期刊";
      }
      else
        return "";
    },
    search(flag,val) { // flag = 0:普通搜索,1:筛选关键词搜索,2:筛选机构搜索,3:筛选期刊搜索，4:筛选时间搜索,5:取消关键词搜索,6:取消机构搜索,7:取消期刊搜索
      this.show_card = false;
      let params = {
        page: 1,
        condition: [
            {
              type: "OR",
              input: this.input,
              field: this.field
            }
        ],
        filter: [],
      }
      if (this.input === '') {
        this.$message('请输入首项搜索值')
        return;
      }
      if (flag === 0) {
        let i;
        for (i = 0; i < this.inputs.length; i++) {
          params.condition.push({type: this.conditions[i],input: this.inputs[i],field: this.fields[i]})
        }
        this.oldConditions = this.conditions;
        this.oldInputs = this.inputs;
        this.oldFields = this.fields;
      } else if (flag === 1) {
        this.keyword = val
        params.filter.push({field: 'keyword',value: val})
        let i;
        for (i = 0; i < this.oldInputs.length; i++) {
          params.condition.push({type: this.oldConditions[i],input: this.oldInputs[i],field: this.oldFields[i]})
        }
        if (this.org !== '') {
          params.filter.push({field: 'org',value: this.org})
        }
        if (this.venue !== '') {
          params.filter.push({field: 'venue',value: this.venue})
        }
        if (!(this.startTime === '' || this.endTime === '' || this.startTime === null || this.endTime === null) && this.startTime <= this.endTime) {
          params.filter.push({field: 'year',value: [''+this.startTime.getFullYear(),''+this.endTime.getFullYear()]})
        }
        this.$refs.box.scrollIntoView()
      } else if (flag === 2) {
        this.org = val
        params.filter.push({field: 'org',value: val})
        let i;
        for (i = 0; i < this.oldInputs.length; i++) {
          params.condition.push({type: this.oldConditions[i],input: this.oldInputs[i],field: this.oldFields[i]})
        }
        if (this.keyword !== '') {
          params.filter.push({field: 'keyword',value: this.keyword})
        }
        if (this.venue !== '') {
          params.filter.push({field: 'venue',value: this.venue})
        }
        if (!(this.startTime === '' || this.endTime === '' || this.startTime === null || this.endTime === null) && this.startTime <= this.endTime) {
          params.filter.push({field: 'year',value: [''+this.startTime.getFullYear(),''+this.endTime.getFullYear()]})
        }
        this.$refs.box.scrollIntoView()
      } else if (flag === 3) {
        this.venue = val
        params.filter.push({field: 'venue',value: val})
        let i;
        for (i = 0; i < this.oldInputs.length; i++) {
          params.condition.push({type: this.oldConditions[i],input: this.oldInputs[i],field: this.oldFields[i]})
        }
        if (this.keyword !== '') {
          params.filter.push({field: 'keyword',value: this.keyword})
        }
        if (this.org !== '') {
          params.filter.push({field: 'org',value: this.org})
        }
        if (!(this.startTime === '' || this.endTime === '' || this.startTime === null || this.endTime === null) && this.startTime <= this.endTime) {
          params.filter.push({field: 'year',value: [''+this.startTime.getFullYear(),''+this.endTime.getFullYear()]})
        }
        this.$refs.box.scrollIntoView()
      } else if (flag === 4) {
        if (this.startTime === '' || this.endTime === '' || this.startTime === null || this.endTime === null) {
          this.$message('请选择时间')
          return;
        } else if (this.startTime > this.endTime) {
          this.$message('请选择正确的时间顺序')
          return;
        }
        params.filter.push({field: 'year',value: [''+this.startTime.getFullYear(),''+this.endTime.getFullYear()]})
        let i;
        for (i = 0; i < this.oldInputs.length; i++) {
          params.condition.push({type: this.oldConditions[i],input: this.oldInputs[i],field: this.oldFields[i]})
        }
        if (this.keyword !== '') {
          params.filter.push({field: 'keyword',value: this.keyword})
        }
        if (this.org !== '') {
          params.filter.push({field: 'org',value: this.org})
        }
        if (this.venue !== '') {
          params.filter.push({field: 'venue',value: this.venue})
        }
        this.$refs.box.scrollIntoView()
      } else if (flag === 5) {
        this.keyword = '';
        let i;
        for (i = 0; i < this.oldInputs.length; i++) {
          params.condition.push({type: this.oldConditions[i],input: this.oldInputs[i],field: this.oldFields[i]})
        }
        if (this.org !== '') {
          params.filter.push({field: 'org',value: this.org})
        }
        if (this.venue !== '') {
          params.filter.push({field: 'venue',value: this.venue})
        }
        if (!(this.startTime === '' || this.endTime === '' || this.startTime === null || this.endTime === null) && this.startTime <= this.endTime) {
          params.filter.push({field: 'year',value: [''+this.startTime.getFullYear(),''+this.endTime.getFullYear()]})
        }
        this.$refs.box.scrollIntoView()
      } else if (flag === 6) {
        this.org = '';
        let i;
        for (i = 0; i < this.oldInputs.length; i++) {
          params.condition.push({type: this.oldConditions[i],input: this.oldInputs[i],field: this.oldFields[i]})
        }
        if (this.keyword !== '') {
          params.filter.push({field: 'keyword',value: this.keyword})
        }
        if (this.venue !== '') {
          params.filter.push({field: 'venue',value: this.venue})
        }
        if (!(this.startTime === '' || this.endTime === '' || this.startTime === null || this.endTime === null) && this.startTime <= this.endTime) {
          params.filter.push({field: 'year',value: [''+this.startTime.getFullYear(),''+this.endTime.getFullYear()]})
        }
        this.$refs.box.scrollIntoView()
      } else if (flag === 7) {
        this.venue = '';
        let i;
        for (i = 0; i < this.oldInputs.length; i++) {
          params.condition.push({type: this.oldConditions[i],input: this.oldInputs[i],field: this.oldFields[i]})
        }
        if (this.keyword !== '') {
          params.filter.push({field: 'keyword',value: this.keyword})
        }
        if (this.org !== '') {
          params.filter.push({field: 'org',value: this.org})
        }
        if (!(this.startTime === '' || this.endTime === '' || this.startTime === null || this.endTime === null) && this.startTime <= this.endTime) {
          params.filter.push({field: 'year',value: [''+this.startTime.getFullYear(),''+this.endTime.getFullYear()]})
        }
        this.$refs.box.scrollIntoView()
      }
      console.log(params)
      this.axios({
        method: 'post',
        url: this.$store.state.address+'api/publication/search/',
        data: params
      })
          .then(async res => {
            console.log(res.data)
            this.total = res.data.total.value
            this.displayResult = [];
            let i = 0;
            for (i = 0; i < res.data.hits.length; i++) {
              let Abstract, quotes;
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
                    id: res.data.hits[i]._source.id,
                    articleName: res.data.hits[i]._source.title,
                    author: res.data.hits[i]._source.authors,
                    abstract: Abstract,
                    liked: false,
                    likes: '54',
                    collected: this.user_collected,
                    collections: this.collection_num,
                    comments: this.comment_num,
                    quotes: quotes,
                    year: res.data.hits[i]._source.year,
                  }
              )
              if (flag === 0) {
                this.startTime = ''
                this.endTime = ''
                this.keyword = ''
                this.org = ''
                this.venue = ''
              }
              this.getPaperData(res.data.hits[i]._source.id, i)
              this.getOrgList()
              this.getKeyList()
              this.getVenueList()
            }
            this.show_card = true;
            this.currentPage = 1;
          })
    },
    changePage(val){
      this.show_card = false;
      console.log('page:'+val)
      let params = {
        page: val,
        condition: [
          {
            type: "OR",
            input: this.input,
            field: this.field
          }
        ],
        filter: [],
      }
      let i;
      for (i = 0; i < this.oldInputs.length; i++) {
        params.condition.push({type: this.oldConditions[i],input: this.oldInputs[i],field: this.oldFields[i]})
      }
      if (this.keyword !== '') {
        params.filter.push({field: 'keyword',value: this.keyword})
      }
      if (this.org !== '') {
        params.filter.push({field: 'org',value: this.org})
      }
      if (this.venue !== '') {
        params.filter.push({field: 'venue',value: this.venue})
      }
      if (!(this.startTime === '' || this.endTime === '' || this.startTime === null || this.endTime === null) && this.startTime <= this.endTime) {
        params.filter.push({field: 'year',value: [''+this.startTime.getFullYear(),''+this.endTime.getFullYear()]})
      }
      console.log(params)
      this.axios({
        method: 'post',
        url: this.$store.state.address+'api/publication/search/',
        data: params
      })
          .then(async res => {
            console.log(res.data)
            this.total = res.data.total.value
            this.displayResult = [];
            let i = 0;
            for (i = 0; i < res.data.hits.length; i++) {
              let Abstract, quotes;
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
                    id: res.data.hits[i]._source.id,
                    articleName: res.data.hits[i]._source.title,
                    author: res.data.hits[i]._source.authors,
                    abstract: Abstract,
                    liked: false,
                    likes: '54',
                    collected: this.user_collected,
                    collections: this.collection_num,
                    comments: this.comment_num,
                    quotes: quotes,
                    year: res.data.hits[i]._source.year,
                  }
              )
              this.getPaperData(res.data.hits[i]._source.id, i)
              this.getOrgList()
              this.getKeyList()
              this.getVenueList()
            }
            this.show_card = true;
          })
    },
    async getPaperData(id,index) { // 获得文献收藏数、评论数、是否收藏
      let params = {
        p_id: id,
        u_id: 1, // 暂时为1
      }
      await this.axios( {
        method: "post",
        url: this.$store.state.address+'api/searchList/PaperData/',
        data: params
      })
          .then(res => {
            //console.log(res.data)
            this.displayResult[index].collected = res.data.user_collected;
            this.displayResult[index].collections = res.data.collection_num;
            this.displayResult[index].comments = res.data.comment_num;
          })
    },
    getOrgList() {
      let params = {
        idList: [

        ]
      }
      let i = 0, len = this.displayResult.length;
      for (; i < len; i++) {
        params.idList.push(this.displayResult[i].id);
      }
      this.axios( {
        method: "post",
        url: this.$store.state.address+'api/publication/getOrgListByIdList/',
        data: params
      })
          .then(res => {
            console.log(res.data)
            this.organizations = res.data.data
          })
    },
    getKeyList() {
      let params = {
        idList: [

        ]
      }
      let i = 0, len = this.displayResult.length;
      for (; i < len; i++) {
        params.idList.push(this.displayResult[i].id);
      }
      this.axios( {
        method: "post",
        url: this.$store.state.address+'api/publication/getKeyListByIdList/',
        data: params
      })
          .then(res => {
            console.log(res.data)
            this.keywords = res.data.data
          })
    },
    getVenueList() {
      let params = {
        idList: [

        ]
      }
      let i = 0, len = this.displayResult.length;
      for (; i < len; i++) {
        params.idList.push(this.displayResult[i].id);
      }
      this.axios( {
        method: "post",
        url: this.$store.state.address+'api/publication/getVenueListByIdList/',
        data: params
      })
          .then(res => {
            console.log(res.data)
            this.journals = res.data.data
          })
    }
  }
}
</script>

<style scoped>
@import url('https://fonts.font.im/css2?family=Nerko+One&display=swap');
.search-box {
  position: relative;
  margin: 0 auto 20px;
  width: 100%;
  min-width: 1300px;
  max-width: 1300px;
  border-radius: 10px;
  box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.2);
  background: url("../assets/img/settings/searchImg.jpg") no-repeat;
  background-size: 100% 100%;
  padding: 30px 0 40px 0;
  transition: 0.3s;
  text-align: center;
  /*min-height: 100px;*/
  /*border: 1px solid rgb(240,240,240);*/
  /*box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.2);*/
}

.search-head-box {
  font-size: 60px;
  color: white;
  font-family: 'Nerko One', cursive;
}

.first-search {
  position: relative;
  display: flex;
  height: 50px;
  width: 50%;
  min-width: 1000px;
  margin: auto;
  border-radius: 10px;
  /*border-top-left-radius: 10px;*/
  /*border-top-right-radius: 10px;*/
  background-color: white;
  box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.2);
}
.first-search :focus{
  position: relative;
  display: flex;
  height: 50px;
  width: 50%;
  min-width: 900px;
  margin: auto;
  /*border-radius: 10px;*/
  border-top-left-radius: 10px;
  border-bottom-right-radius: 10px;
  background-color: white;
  box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.2);
  z-index: 1000;
}

.search-box .first-selects .mainSelect {
  display: flex;
  height: 50px;
  width: 120px;
  font-size: 18px;
  text-align: center;
  border: none;
  border-bottom-left-radius: 10px;
  border-top-left-radius: 10px;
  border-right: 2px solid #f4f4f4;
  transition: 0.5s;
  cursor: pointer;
  background-color: #f4f4f4;
}
.search-box .mainSelect {
  display: flex;
  height: 50px;
  width: 120px;
  font-size: 18px;
  text-align: center;
  border: none;
  border-right: 2px solid #f4f4f4;
  transition: 0.5s;
  cursor: pointer;
  background-color: #f4f4f4;
}
.search-box .mainSelect.condition {
  width: 80px;

}

.search-box .mainSelect .main-icon{
  margin-left: auto;
  min-width: 30px;
  height: 50px;
  line-height: 50px;
  text-align: center;
  font-size: 30px;
  transition: .5s;
}

.search-box .mainSelect.condition .sub-menu {
  bottom: -100px;
  width: 80px;
}
.search-box .mainSelect.condition .sub-menu.active{
  bottom: -110px;
}

.search-box .mainSelect .sub-menu{
  position: absolute;
  width: 120px;
  bottom: -160px;
  z-index: 1000;
  background-color: #ffffff;
  border: 2px solid rgb(240,240,240);
  border-radius: 10px;
  transition: 0.3s;
  visibility: hidden;
  opacity: 0;
  pointer-events: none;
}


.search-box .mainSelect .sub-menu.active{
  bottom: -180px;
  visibility: visible;
  opacity: 1;
  pointer-events: auto;
}

.search-box .mainSelect .sub-menu .sub-menu-item{
  transition: 0.3s;
  padding: 5px 0;
  border-radius: 5px;
}

.search-box .mainSelect .sub-menu .sub-menu-item:hover{
  background-color: #1890ff;
  color: #ffffff;
}

.search-box .mainSelect .sub-menu .sub-menu-item.selected{
  font-weight: bold;
  background-color: #f4f4f4;
}

.search-box .mainSelect .sub-menu .sub-menu-item.selected:hover{
  background-color: #1890ff;
}

.search-box .mainSelect .main-icon.active {
  transform: rotate(-90deg);
}

.search-box .mainSelect .main-selected{
  width: 90px;
  text-align: center;
  height: 50px;
  line-height: 50px;
  font-weight: bold;
  font-size: 20px;
}

.search-box .mainSelect:hover {
  border-right: 2px solid #2196f3;
}

.advance-search {
  width: 50%;
  min-width: 1000px;
  margin: 2px auto;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  background-color: white;
}


.header-search-box {
  width: 68%;
  min-width: 490px;
  border-radius: 10px;
  position: relative;
}

.header-search-box .search-input{
  position: relative;
  font-size: 18px;
  width: 100%;
  height: 50px;
  padding: 0 20px 0 10px;
  /*border-radius: 10px;*/
  border: none;
  /*border: 2px solid rgb(240,240,240);*/
  /*border-bottom: 3px solid rgba(33,150,243,0.5);*/
  /*box-shadow: 0 0px 8px 0 rgba(0, 0, 0, 0.1);*/
  outline: none;
}
.more-search .header-search-box .search-input {
  min-width: 50%;
}

.more-search .search-icon-box{
  margin-left: auto;
  text-align: center;
  margin-right: 10px;
  cursor: pointer;
  line-height: 50px;
  height: 50px;
  min-width: 50px;
  font-size: 28px;
  border-radius: 10px;
}

.more-search .search-icon-box:hover{
  color: #f44336;
}

.first-search .advance-search-option {
  background-color: white;
  margin-left: auto;
  height: 50px;
  margin-right: 10px;
  line-height: 50px;
  cursor: pointer;
  font-size: 20px;
  color: #2196f3;
}

.first-search .advance-search-option .advance-search-icon i{
  transition: 0.5s;
}

.first-search .advance-search-option .advance-search-icon.active i{
  transform: rotate(-90deg);
}


.first-search .search-icon i{
  text-align: center;
  color: #333333;
  line-height: 50px;
  height: 45px;
  font-size: 28px;
  min-width: 45px;
  background: white;
  cursor: pointer;
  transition: .2s;
  border-radius: 10px;
}

.first-search .search-icon i:hover {
  font-weight: bold;
}

.header-search-box .search-icon .bx-minus-circle:hover {
  color: white;
  background: #C34A36;
}
.more-search {
  position: relative;
  display: flex;
  margin: auto;
  height: 50px;
  border-bottom: 2px solid rgba(0,0,0,0.1);
}
.condition-box {
  top: 10px;
  width: 50%;
  height: 50px;
  min-width: 1000px;
  display: flex;
  text-align: center;
  align-items: center;
  justify-content: center;
  /*border-bottom-left-radius: 10px;*/
  /*border-bottom-right-radius: 10px;*/
  /*border: 2px solid rgb(240,240,240);*/
  /*box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.2);*/
  /*border-top: 2px solid #f4f4f4;*/
  /*background: #f44336;*/
}
.add-condition {
  margin-right: 40px;
}

.add-condition .add-condition-btn{
  height: 30px;
  line-height: 30px;
  text-align: center;
  cursor: pointer;
  border-radius: 10px;
  background-color: #2196f3;
  color: #f4f4f4;
  font-size: 18px;
  padding: 5px 10px;
  transition: 0.3s;
}

.add-condition .add-condition-btn:hover {
  padding: 8px 15px;
}

.add-condition .add-condition-btn .btn-icon{
  min-width: 30px;
}

.clear-condition {
  cursor: pointer;
  margin-right: 40px;
}

.clear-condition .clear-condition-btn{
  height: 30px;
  line-height: 30px;
  background-color: #f44336;
  color: #f4f4f4;
  border-radius: 10px;
  text-align: center;
  cursor: pointer;
  font-size: 18px;
  padding: 5px 10px;
  transition: 0.2s;
}
.clear-condition .clear-condition-btn:hover{
  padding: 8px 15px;
}

.clear-condition .clear-condition-btn .btn-icon {
  margin:auto;
}

#filter {
  position: absolute;
  left: 0px;
  width: 27%;
  min-width: 330px;
  margin-bottom: 40px;
  padding: 10px;
  box-shadow: 0 1px 10px 0 rgba(0, 0, 0, 0.1), 0 2px 10px 0 rgba(0, 0, 0, 0.1);
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
  left: 30px;
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
  /*overflow: auto;*/
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
