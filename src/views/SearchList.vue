<template>
  <div class="searchList">
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
      <select id="select-type" style="outline: none">
        <option value="0">标题</option>
        <option value="1">关键词</option>
        <option value="2">摘要</option>
        <option value="3">作者</option>
        <option value="4">组织</option>
        <option value="5">期刊</option>
      </select>
      <div class="header-search-box">
        <input type="text" autocomplete="off"
               id="input"
               class="search-input"
               v-model="input"
               placeholder="Search resources..."
               @keyup.enter="search()">
        <span class="search-icon" title="搜索"><i class='bx bx-search' @click="search()"></i></span>
      </div>
      <div class="result-box" v-for="(result, i) in displayResult">
        <p class="articleName">{{result.articleName}}</p>
        <ul class="authors-list">
          <li class="author" v-for="author in result.author">{{author}}</li>
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
        </ul>
      </div>
    </div>
    <div class="block">
      <el-pagination
          style="position: absolute;left: 40%;bottom: -5%"
          layout="prev, pager, next"
          :page-size="5"
          :pager-count="10"
          :total="results.length"
          @current-change="changePage"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>

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
      input: '',
      startTime: '',
      endTime: '',
      searchType: '',
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
      displayResult: [ // 只展示5个
        {
          articleName: '改进的二分法查找1',
          author: ['小红','小明'],
          abstract: '确定该区间的中间位置K（2）将查找的值T与array[k]比较。若相等，查找成功返回此位置；否则确定新的查找区域，继续二分查找。区域确定如下：a.array[k]>T 由数组的有序性可知array[k,k+1,……,high]>T;故新的区间为array[low,……，K-1]b.array[k]<T 类似上面查找区间为array[k+1,……，high]。每一次查找与中间值比较，可以确定是否查找成功，不成功当前查找区间将缩小一半，递归查找即可。时间复杂度为:O(log2n)。',
          liked: false,
          likes: '54',
          collected: false,
          collections: '27',
          comments: '10',
          quotes: '11',
        }, {
          articleName: '改进的二分法查找2',
          author: ['小红','小明'],
          abstract: '确定该区间的中间位置K（2）将查找的值T与array[k]比较。若相等，查找成功返回此位置；否则确定新的查找区域，继续二分查找。区域确定如下：a.array[k]>T 由数组的有序性可知array[k,k+1,……,high]>T;故新的区间为array[low,……，K-1]b.array[k]<T 类似上面查找区间为array[k+1,……，high]。每一次查找与中间值比较，可以确定是否查找成功，不成功当前查找区间将缩小一半，递归查找即可。时间复杂度为:O(log2n)。',
          liked: false,
          likes: '54',
          collected: false,
          collections: '27',
          comments: '10',
          quotes: '11',
        }, {
          articleName: '改进的二分法查找3',
          author: ['小红','小明'],
          abstract: '确定该区间的中间位置K（2）将查找的值T与array[k]比较。若相等，查找成功返回此位置；否则确定新的查找区域，继续二分查找。区域确定如下：a.array[k]>T 由数组的有序性可知array[k,k+1,……,high]>T;故新的区间为array[low,……，K-1]b.array[k]<T 类似上面查找区间为array[k+1,……，high]。每一次查找与中间值比较，可以确定是否查找成功，不成功当前查找区间将缩小一半，递归查找即可。时间复杂度为:O(log2n)。',
          liked: false,
          likes: '54',
          collected: false,
          collections: '27',
          comments: '10',
          quotes: '11',
        }, {
          articleName: '改进的二分法查找4',
          author: ['小红','小明'],
          abstract: '确定该区间的中间位置K（2）将查找的值T与array[k]比较。若相等，查找成功返回此位置；否则确定新的查找区域，继续二分查找。区域确定如下：a.array[k]>T 由数组的有序性可知array[k,k+1,……,high]>T;故新的区间为array[low,……，K-1]b.array[k]<T 类似上面查找区间为array[k+1,……，high]。每一次查找与中间值比较，可以确定是否查找成功，不成功当前查找区间将缩小一半，递归查找即可。时间复杂度为:O(log2n)。',
          liked: false,
          likes: '54',
          collected: false,
          collections: '27',
          comments: '10',
          quotes: '11',
        }, {
          articleName: '改进的二分法查找5',
          author: ['小红','小明'],
          abstract: '确定该区间的中间位置K（2）将查找的值T与array[k]比较。若相等，查找成功返回此位置；否则确定新的查找区域，继续二分查找。区域确定如下：a.array[k]>T 由数组的有序性可知array[k,k+1,……,high]>T;故新的区间为array[low,……，K-1]b.array[k]<T 类似上面查找区间为array[k+1,……，high]。每一次查找与中间值比较，可以确定是否查找成功，不成功当前查找区间将缩小一半，递归查找即可。时间复杂度为:O(log2n)。',
          liked: false,
          likes: '54',
          collected: false,
          collections: '27',
          comments: '10',
          quotes: '11',
        }
      ],
      results: [
        {
          articleName: '改进的二分法查找1',
          author: ['小红','小明'],
          abstract: '确定该区间的中间位置K（2）将查找的值T与array[k]比较。若相等，查找成功返回此位置；否则确定新的查找区域，继续二分查找。区域确定如下：a.array[k]>T 由数组的有序性可知array[k,k+1,……,high]>T;故新的区间为array[low,……，K-1]b.array[k]<T 类似上面查找区间为array[k+1,……，high]。每一次查找与中间值比较，可以确定是否查找成功，不成功当前查找区间将缩小一半，递归查找即可。时间复杂度为:O(log2n)。',
          liked: false,
          likes: '54',
          collected: false,
          collections: '27',
          comments: '10',
          quotes: '11',
        }, {
          articleName: '改进的二分法查找2',
          author: ['小红','小明'],
          abstract: '确定该区间的中间位置K（2）将查找的值T与array[k]比较。若相等，查找成功返回此位置；否则确定新的查找区域，继续二分查找。区域确定如下：a.array[k]>T 由数组的有序性可知array[k,k+1,……,high]>T;故新的区间为array[low,……，K-1]b.array[k]<T 类似上面查找区间为array[k+1,……，high]。每一次查找与中间值比较，可以确定是否查找成功，不成功当前查找区间将缩小一半，递归查找即可。时间复杂度为:O(log2n)。',
          liked: false,
          likes: '54',
          collected: false,
          collections: '27',
          comments: '10',
          quotes: '11',
        }, {
          articleName: '改进的二分法查找3',
          author: ['小红','小明'],
          abstract: '确定该区间的中间位置K（2）将查找的值T与array[k]比较。若相等，查找成功返回此位置；否则确定新的查找区域，继续二分查找。区域确定如下：a.array[k]>T 由数组的有序性可知array[k,k+1,……,high]>T;故新的区间为array[low,……，K-1]b.array[k]<T 类似上面查找区间为array[k+1,……，high]。每一次查找与中间值比较，可以确定是否查找成功，不成功当前查找区间将缩小一半，递归查找即可。时间复杂度为:O(log2n)。',
          liked: false,
          likes: '54',
          collected: false,
          collections: '27',
          comments: '10',
          quotes: '11',
        }, {
          articleName: '改进的二分法查找4',
          author: ['小红','小明'],
          abstract: '确定该区间的中间位置K（2）将查找的值T与array[k]比较。若相等，查找成功返回此位置；否则确定新的查找区域，继续二分查找。区域确定如下：a.array[k]>T 由数组的有序性可知array[k,k+1,……,high]>T;故新的区间为array[low,……，K-1]b.array[k]<T 类似上面查找区间为array[k+1,……，high]。每一次查找与中间值比较，可以确定是否查找成功，不成功当前查找区间将缩小一半，递归查找即可。时间复杂度为:O(log2n)。',
          liked: false,
          likes: '54',
          collected: false,
          collections: '27',
          comments: '10',
          quotes: '11',
        }, {
          articleName: '改进的二分法查找5',
          author: ['小红','小明'],
          abstract: '确定该区间的中间位置K（2）将查找的值T与array[k]比较。若相等，查找成功返回此位置；否则确定新的查找区域，继续二分查找。区域确定如下：a.array[k]>T 由数组的有序性可知array[k,k+1,……,high]>T;故新的区间为array[low,……，K-1]b.array[k]<T 类似上面查找区间为array[k+1,……，high]。每一次查找与中间值比较，可以确定是否查找成功，不成功当前查找区间将缩小一半，递归查找即可。时间复杂度为:O(log2n)。',
          liked: false,
          likes: '54',
          collected: false,
          collections: '27',
          comments: '10',
          quotes: '11',
        }, {
          articleName: '改进的二分法查找6',
          author: ['小红','小明'],
          abstract: '确定该区间的中间位置K（2）将查找的值T与array[k]比较。若相等，查找成功返回此位置；否则确定新的查找区域，继续二分查找。区域确定如下：a.array[k]>T 由数组的有序性可知array[k,k+1,……,high]>T;故新的区间为array[low,……，K-1]b.array[k]<T 类似上面查找区间为array[k+1,……，high]。每一次查找与中间值比较，可以确定是否查找成功，不成功当前查找区间将缩小一半，递归查找即可。时间复杂度为:O(log2n)。',
          liked: false,
          likes: '54',
          collected: false,
          collections: '27',
          comments: '10',
          quotes: '11',
        }
      ]
    }
  },
  methods: {
    changePage(val){
      let i;
      let length = this.results.length
      console.log("val:"+val)
      console.log("length:"+length)
      this.displayResult = [];
      for (i = (val-1) * 5; i < length && i < val * 5; i++) {
        this.displayResult.push(this.results[i]);
      }
    },
    select(){
      let sel_obj = document.getElementById("select-type");
      let index = sel_obj.selectedIndex;
      this.searchType = sel_obj.options[index].value;
      // alert(sel_obj.options[index].value);
    },
    search() {
      this.select()
    }
  }
}
</script>

<style scoped>
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
  left: 32%;
  width: 70%;
  height: 760px;
  max-height: 760px;
  overflow: hidden;
}

.header-search-box {
  position: relative;
}

.header-search-box .search-input{
  position: relative;
  font-size: 15px;
  min-width: 50%;
  height: 20px;
  padding: 10px 20px 10px 20px;
  border-radius: 10px;
  border: 1px solid rgb(240,240,240);
  border-bottom: 3px solid rgba(33,150,243,0.5);
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.1), 0 6px 20px 0 rgba(0, 0, 0, 0.1);
  outline: none;
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

.header-search-box .search-icon i:hover {
  color: white;
  background: #2196f3;
}
.result-box {
  margin: 0 0 20px 0;
}
.articleName {
  color: #2196f3;
  font-size: 19px;
  margin: 0;
  cursor: pointer;
}
.authors-list {
  margin: 0;
  padding: 0;
  width: 70%;
  display: flex;
  list-style: none;
  height: 20px;
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
  width: 75%;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  cursor: pointer;
}
.info-list {
  margin: 0;
  padding: 0;
  width: 500px;
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