<template>
  <div class="statistic">
    <div class="mask" v-if="this.visible === true"></div>
    <div class="windows" v-if="this.visible === true">
      <div class="pop">
        <div style="position: relative;">
          <div class="title">文献id：</div>
          <div class="Informations">
            {{Literature[this.currentInstitutional].id}}
          </div>
        </div>
        <div>
          <div class="title">题目：</div>
          <div class="Informations">
            {{Literature[this.currentInstitutional].name}}
          </div>
        </div>
        <div>
          <span class="title">发表时间：</span>
          <span class="Informations">
                {{Literature[this.currentInstitutional].date}}
              </span>
        </div>
        <div>
          <span class="title">发表于：</span>
          <span class="Informations">
                {{Literature[this.currentInstitutional].origin}}
              </span>
        </div>
        <div>
          <span class="title">作者：</span>
          <span>
            <el-button type="primary" plain>新增作者</el-button>
          </span>
          <div class="table">
            <el-table
                :data="tableData"
                style="width: 100%"
                max-height="250">
              <el-table-column
                  prop="num"
                  label="序号"
                  width="50">
              </el-table-column>
              <el-table-column
                  prop="name"
                  label="姓名"
                  width="200">
              </el-table-column>
              <el-table-column
                  prop="id"
                  label="id"
                  width="280">
              </el-table-column>
              <el-table-column
                  fixed="right"
                  label="操作"
                  width="50">
                <template slot-scope="scope">
                  <el-button
                      @click.native.prevent="deleteRow(scope.$index, tableData)"
                      type="text"
                      size="small">
                    移除
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
      </div>
      <div class="windows-close" style="position: absolute;left: 600px;top: 20px" title="关闭">
        <i class='bx bx-x' style="font-size: 40px" @click="close"></i>
      </div>
    </div>
    <el-card class="box-card">
      <div style="font-size: 25px;color: #030303;margin-left: 20px">
        数据统计
      </div>
      <div style="text-align: center">
        <img src="../assets/img/LiteratureManage/statistic.png">
      </div>
    </el-card>
    <el-card class="box-card" style="margin-top: 40px;min-height: 1000px">
      <div style="font-size: 25px;color: #030303;margin-left: 20px">
        <i class='bx bxs-bookmark-alt' style="margin-right: 20px;color: #FBBD08;margin-bottom: 30px"></i>文献管理
      </div>
      <div class="divider"></div>
      <div style="display: flex">
        <div style="width: 100px;margin-top: 15px">
          <el-button type="primary" plain @click="newLiterature">新添文献</el-button>
        </div>
        <div class="header-search-box">
          <input type="text" autocomplete="off"
                 id="input"
                 class="search-input"
                 v-model="input"
                 placeholder="Search resources..."
                 @keyup.enter="">
          <span class="search-icon" title="搜索"><i class='bx bx-search' @click="search"></i></span>
        </div>
      </div>
      <div class="literature">
        <div class="literature-box" v-for="(item,index) in Literature" :key="index">
          <div style="position: relative;left: 30px;top: 30px">
            <div>
              <div class="title">文献id：</div>
              <div class="Information">
                {{Literature[index].id | ellipsis}}
              </div>
              <div style="display: inline-block">
                <el-button type="text" @click="open(index)">
                  <i class='bx bx-dots-horizontal-rounded' style="font-size: 25px;color: black"></i>
                </el-button>
              </div>
            </div>
            <div>
              <div class="title">题目：</div>
              <div class="Information">
                  {{Literature[index].name | ellipsis}}
              </div>
            </div>
            <div>
              <span class="title">发表于：</span>
              <span class="Information">
                {{Literature[index].origin | ellipsis}}
              </span>
            </div>
            <div>
              <span class="title">发表时间：</span>
              <span class="Information">
                {{Literature[index].date | ellipsis}}
              </span>
            </div>
          </div>
        </div>
        <div style="position: absolute;width:100%;bottom: 10px;text-align: center;margin-top: 100px">
          <div class="block">
            <el-pagination
                layout="prev, pager, next"
                :page-size="pageSize"
                :pager-count="pageNum"
                :total="List.length"
                @current-change="changePage">
            </el-pagination>
          </div>
        </div>
      </div>
    </el-card>
  </div>

</template>

<script>
export default {
  name: "LiteratureManage",
  data (){
    return {
      visible : false,
      currentInstitutional : 0,
      List : [
        {
          "id" : 1,
          "name": "hahaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
          "origin" : "Science",
          "date" : "2021",
          "author" : [
      {
        "num" : 1,
        "name" : "不知名",
        "id" : 1,
        "right" : "移除",
      },
      {
        "num" : 2,
        "name" : "不知名2",
        "id" : 2,
        "right" : "移除",
      },
      {
        "num" : 3,
        "name" : "不知名2",
        "id" : 3,
        "right" : "移除",
      },
      {
        "num" : 4,
        "name" : "不知名2",
        "id" : 4,
      },
    ],
        },
        {
          "id" : 1,
          "name": "hahaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
          "origin" : "Science",
          "date" : "2021",
        },
        {
          "id" : 1,
          "name": "hahaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
          "origin" : "Science",
          "date" : "2021",
        },
        {
          "id" : 1,
          "name": "hahaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
          "origin" : "Science",
          "date" : "2021",
        },
        {
          "id" : 1,
          "name": "hahaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
          "origin" : "Science",
          "date" : "2021",
        },
        {
          "id" : 1,
          "name": "hahaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
          "origin" : "Science",
          "date" : "2021",
        },
        {
          "id" : 4,
          "name": "hahaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
          "origin" : "Science",
          "date" : "2021",
        },
        {
          "id" : 7,
          "name": "hahaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
          "origin" : "Science",
          "date" : "2021",
        },
        {
          "id" : 1,
          "name": "hahaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
          "origin" : "Science",
          "date" : "2021",
        },
        {
          "id" : 1,
          "name": "hahaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
          "origin" : "Science",
          "date" : "2021",
        },
        {
          "id" : 9,
          "name": "hahaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
          "origin" : "Science",
          "date" : "2021",
        },
        {
          "id" : 1,
          "name": "hahaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
          "origin" : "Science",
          "date" : "2021",
        },
        {
          "id" : 1,
          "name": "hahaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
          "origin" : "Science",
          "date" : "2021",
        },
        {
          "id" : 11,
          "name": "hahaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
          "origin" : "Science",
          "date" : "2021",
        },
        {
          "id" : 1,
          "name": "hahaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
          "origin" : "Science",
          "date" : "2021",
        },
        {
          "id" : 1,
          "name": "hahaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
          "origin" : "Science",
          "date" : "2021",
        },
        {
          "id" : 1,
          "name": "hahaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
          "origin" : "Science",
          "date" : "2021",
        },
        {
          "id" : 1,
          "name": "hahaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
          "origin" : "Science",
          "date" : "2021",
        },
        {
          "id" : 1,
          "name": "hahaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
          "origin" : "Science",
          "date" : "2021",
        },
        {
          "id" : 1,
          "name": "hahaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
          "origin" : "Science",
          "date" : "2021",
        },
        {
          "id" : 1,
          "name": "hahaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
          "origin" : "Science",
          "date" : "2021",
        },
        {
          "id" : 1,
          "name": "hahaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
          "origin" : "Science",
          "date" : "2021",
        },
        {
          "id" : 1,
          "name": "hahaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
          "origin" : "Science",
          "date" : "2021",
        },
        {
          "id" : 1,
          "name": "hahaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
          "origin" : "Science",
          "date" : "2021",
        },
        {
          "id" : 1,
          "name": "hahaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
          "origin" : "Science",
          "date" : "2021",
        },
        {
          "id" : 1,
          "name": "hahaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
          "origin" : "Science",
          "date" : "2021",
        },
        {
          "id" : 1,
          "name": "hahaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
          "origin" : "Science",
          "date" : "2021",
        },
        {
          "id" : 1,
          "name": "hahaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
          "origin" : "Science",
          "date" : "2021",
        },
        {
          "id" : 1,
          "name": "hahaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
          "origin" : "Science",
          "date" : "2021",
        },
        {
          "id" : 1,
          "name": "hahaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
          "origin" : "Science",
          "date" : "2021",
        },
      ],
      Literature : [],
      tableData : [
        {
          "num" : 1,
          "name" : "不知名",
          "id" : 1,
          "right" : "移除",
        },
        {
          "num" : 2,
          "name" : "不知名2",
          "id" : 2,
          "right" : "移除",
        },
        {
          "num" : 3,
          "name" : "不知名2",
          "id" : 3,
          "right" : "移除",
        },
        {
          "num" : 4,
          "name" : "不知名2",
          "id" : 4,
        },
      ],
      // 每页显示数量
      pageSize: 6,
      // 共几页
      pageNum: 0,
      // 当前显示的数据
      dataShow: "",
      // 默认当前显示第一页
      currentPage: 0,
      input: '',
      field: 'title',
    }
  },
  filters:{
    ellipsis(value){
      if (!value) return '';
      if (value.length > 20) {
        return value.slice(0,20) + '...'
      }
      return value
    }
  },
  created() {
    var i = 0;
    i = this.List.length / 6;
    if (i < 1)
      i = 1;
    this.pageNum = i * 10;
    this.changePage(1);
  },
  methods:{
    changePage(val){
      let i;
      let length = this.List.length
      this.Literature = [];
      for (i = (val-1) * 6; i < length && i < val * 6; i++) {
        this.Literature.push(this.List[i]);
      }
    },
    open(index) {
      this.visible = true;
      this.currentInstitutional = index;
      this.tableData = this.Literature[index].author;
    },
    close(){
      this.visible = false;
    },
    deleteRow(index, rows) {
      rows.splice(index, 1);
      this.$axios({
        method: 'post',
        url: '',
        data: qs.stringify({
          "id":this.Literature[this.currentInstitutional].id,
          "uid":this.Literature[this.currentInstitutional].author[index].uid,
          "name":this.Literature[this.currentInstitutional].author[index].name
        })
      }).then(res =>{
        switch (res.data.errno){
          case 0:
            window.alert(res.data.msg);
        }
      })
    },
    search(){
      this.List = [];
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
        this.$message('请输入搜索内容')
        return;
      }
      this.$axios( {
        method: 'post',
        url: this.$store.state.address+'api/publication/search/',
        data: params
      })
          .then(async res =>{
        var i = 0;
        for (i = 0; i < res.data.hits.length; i++){
          this.List.push({
            id: res.data.hits[i]._source.id,
            name: res.data.hits[i]._source.title,
            origin: "123",
            date: res.data.hits[i]._source.year,
            author: res.data.hits[i]._source.authors
          })
        }
        var i = 0;
        i = this.List.length / 6;
        if (i < 1)
           i = 1;
        this.pageNum = i * 10;
        this.changePage(1);
      })
    },
    addAuthor(){
      this.$axios({
        method: 'post',
        url: '',
        data: qs.stringify({
          "id":this.Literature[this.currentInstitutional].id,
          "uid":this.Literature[this.currentInstitutional].author[index].uid,
          "name":this.Literature[this.currentInstitutional].author[index].name
        })
      }).then(res =>{
        switch (res.data.errno){
          case 0:
            window.alert(res.data.msg);
        }
      })
    },
    newLiterature(){

    }
  }
}
</script>

<style scoped>
.box-card {
  width: 100%;
  min-width: 1400px;
}
.table {
  position: relative;
  width: 600px;
  left: -30px;
  top: 10px;
  border: 1px solid rgb(240,240,240);
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.1), 0 6px 20px 0 rgba(0, 0, 0, 0.1);
}
.pop {
  position: relative;
  left: 100px;
  top: 50px;
  line-height: 45px;
}
.Informations {
  position: relative;
  display: inline-block;
  width: 400px;
  text-align: left;
  word-break: break-all;
  word-wrap: break-word;
  line-height: 24px;

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
  width: 700px;
  height: 650px;
  top: 30px;
  left: 450px;
  z-index: 1000;
}
.Information {
  position: relative;
  display: inline-block;
  left: 0px;
  width: 220px;
  text-align: left;
  word-break: break-all;
  word-wrap: break-word;
}
.title {
  display: inline-block;
  text-align: right;
  width: 100px;
  color: #030303;
  font-weight: bold;
  font-size: 20px;
}
.literature-box {
  display: inline-block;
  margin-right: 30px;
  margin-top: 30px;
  width: 390px;
  height: 250px;
  border: 1px solid rgb(240,240,240);
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.1), 0 6px 20px 0 rgba(0, 0, 0, 0.1);
  line-height: 30px;
}
.literature {
  width: 100%;
  justify-content: center;
  margin-top: 40px;
}

.header-search-box {
  margin-left: auto;
  margin-top: 15px;
  width: 700px;
}

.header-search-box .search-input{
  position: relative;
  font-size: 15px;
  min-width: 50%;
  height: 20px;
  padding: 10px 20px 10px 20px;
  border-radius: 10px;
  border: 1px solid rgb(240,240,240);
  /*border-bottom: 3px solid rgba(33,150,243,0.5);*/
  /*box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.1), 0 6px 20px 0 rgba(0, 0, 0, 0.1);*/
  outline: none;
}

.header-search-box .search-input:focus {
  border: 1px solid #2196f3;
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
.statistic {
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

.windows-close {
  cursor: pointer;
}

.windows-close:hover {
  color: #f44336;
}
</style>
