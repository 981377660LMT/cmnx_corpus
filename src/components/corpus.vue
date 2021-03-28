<template>
  <div id="corpus">
    <el-card class="box-card">
      <!-- 卡片的头部 -->
      <!-- 固定的switch开关 -->
      <el-switch
        v-model="switchValue"
        active-color="#13ce66"
        inactive-color="grey"
        @change="switchChange($event)"
      >
      </el-switch>
      <!-- 卡片里 -->
      <el-row :gutter="20">
        <el-col :span="12" :offset="6" @click.native="openTips">
          <div id="help">需要一些帮助?</div>
        </el-col>
      </el-row>
      <!-- 分割线 -->
      <div id="divider">
        <el-row :gutter="20">
          <el-col :span="24">
            <div class="dividerline"></div>
            <div class="el-icon-reading" style="font-size:40px"></div>
            <div class="dividerline"></div>
          </el-col>
        </el-row>
      </div>

      <!-- 搜索框 -->
      <el-row :gutter="20" id="search">
        <el-col :span="18" :offset="3">
          <el-input
            v-model="input"
            placeholder="请输入中文/日文开始搜索"
            prefix-icon="el-icon-edit-outline"
            size="medium"
            clearable
            autofocus="true"
          >
            <template slot="prepend">
              <el-dropdown
                trigger="hover"
                @command="handleMatchCommand"
                show-timeout="100"
                hide-timeout="100"
              >
                <span class="el-dropdown-link">
                  选择搜索模式<i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item command="1"> 在中文与日文中搜索</el-dropdown-item>
                  <el-dropdown-item command="2"> 仅在中文中搜索</el-dropdown-item>
                  <el-dropdown-item command="3"> 仅在日文中搜索</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </template>
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </el-col>
      </el-row>
      <!-- 加载 -->
      <el-main
        v-loading="showLoading"
        v-if="showLoading"
        element-loading-spinner="el-icon-loading"
        element-loading-background="#DFDFDF"
        element-loading-text="正在查找中，请稍等片刻......"
        id="loading"
      >
      </el-main>
      <!-- 表格 -->
      <el-table :data="tableData" stripe border style="width: 100%" v-show="showTable">
        <el-table-column type="index" width="50" align="center"> </el-table-column>
        <el-table-column prop="from" label="来源" width="160"> </el-table-column>
        <el-table-column prop="chinese" label="中文">
          <template slot-scope="scope">
            <span v-html="scope.row.chinese"></span>
          </template>
        </el-table-column>
        <el-table-column prop="japanese" label="日文">
          <template slot-scope="scope">
            <span v-html="scope.row.japanese"></span>
          </template>
        </el-table-column>
        <el-table-column label="收藏" width="56">
          <!-- 模板插槽like -->
          <template slot-scope="scope">
            <i
              style="font-size:28px;cursor:pointer"
              class="el-icon-star-on"
              v-if="scope.row.like == true"
              @click="toggleLike(scope.row.corpusId, scope.row.like)"
            ></i>
            <i
              style="font-size:28px;cursor:pointer"
              class="el-icon-star-off"
              v-if="scope.row.like == false"
              @click="toggleLike(scope.row.corpusId, scope.row.like)"
            ></i>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页 -->
      <el-pagination
        class="paginationBottom"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[5, 10, 15, 20]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalNumber"
        :popper-append-to-body="false"
      >
      </el-pagination>
    </el-card>
    <!-- 右箭头 -->
    <div class="arrow " @click="goToCorpus">
      <img src="../assets/arrow.png" />
    </div>
    <!-- 遮罩层 -->
    <div class="mask" v-if="showMask"></div>
  </div>
</template>

<script>
import { debounce } from 'lodash'

export default {
  name: 'Corpus',
  data() {
    return {
      // 向后台发送currentPage,pageSize,input三个参数
      //查询到的词条数
      totalNumber: 0,
      currentPage: 1,
      pageSize: 5,
      //绑定表格数据
      tableData: [],
      // 存储100条数据
      allData: [],
      // input里的输入
      input: '',
      // 夜间模式
      switchValue: true,
      showTable: true,
      showLoading: false,
      showMask: false,
      matchMode: '',
      //提示显示状态
      isNotification: false,
      isMouseDown: false,
    }
  },
  created() {},
  mounted() {},
  computed: {
    //在手机界面被删除的语料id
    corpusId: function() {
      return this.$store.state.corpusId
    },
  },
  watch: {
    input: function() {
      if (this.input.trim().length > 0) {
        this.doDebounceSearch()
      }
    },
    //手机界面的收藏被删除时，对应的收藏星星变色
    corpusId: function(corpusId) {
      for (let corpus of this.tableData) {
        let { corpusId: shouldChangedCorpusId } = corpus
        if (shouldChangedCorpusId === corpusId) {
          return (corpus.like = !corpus.like)
        }
      }
    },
  },
  components: {},
  methods: {
    toggleLike(corpusId, like) {
      // console.log(corpusId, like)
      if (!like) {
        this.addLike(corpusId)
      } else {
        this.deleteLike(corpusId)
      }
      if (!this.$store.state.token) return
      for (let item of this.tableData) {
        if (item.corpusId == corpusId) {
          item.like = !item.like
        }
      }
    },
    async addLike(corpusId) {
      const { data, status } = await this.$axios.put('/putLike', { corpusId: corpusId })
      if (status != 200) return this.$message.error('(◎-◎;)!!  添加收藏失败了...?')
      this.$message.success({
        showClose: true,
        message: `添加收藏成功！`,
        duration: 1500,
      })
      this.$store.commit('changeLikeNumber', data.likeNumber)
    },
    async deleteLike(corpusId) {
      const { data, status } = await this.$axios.delete('/deleteLike', {
        data: { corpusId: corpusId },
      })
      if (status != 200) return this.$message.error('(◎-◎;)!!  删除收藏失败了...?')
      this.$message.success({
        showClose: true,
        message: `删除收藏成功！`,
        duration: 1500,
      })
      // console.log(data.likeNumber)
      this.$store.commit('changeLikeNumber', data.likeNumber)
    },
    // 换背景，参数是true和false
    switchChange($event) {
      if ($event) {
        this.showMask = false
      } else {
        this.showMask = true
      }
    },
    async doSearch() {
      this.showTable = false
      this.showLoading = true

      const { data, status } = await this.$axios.get('/doSearch', {
        params: {
          matchMode: this.matchMode,
          searchInput: this.input,
          searchPage: this.currentPage,
          searchPageSize: this.pageSize,
        },
      })

      if (status !== 200) return this.$message.error('(◎-◎;)!!  搜索失败了...?')
      if ((this.currentPage - 1) * this.pageSize >= 120) {
        this.tableData = data.searchResult
      } else {
        this.allData = data.searchResult
        this.tableData = this.allData.slice(
          this.pageSize * (this.currentPage - 1),
          this.currentPage * this.pageSize
        )
      }
      this.totalNumber = data.totalNumber
      this.showLoading = false
      this.showTable = true
      this.$parent.api.reBuild()
    },
    // 有防抖的搜索
    doDebounceSearch: debounce(async function() {
      // console.log(this)
      this.doSearch()
    }, 500),
    //无防抖的搜索
    doNoDebounceSearch: debounce(async function() {
      this.doSearch()
    }, 0),
    // 页码size变化
    handleSizeChange(newSize) {
      this.pageSize = newSize
      if ((this.currentPage - 1) * this.pageSize < 120) {
        return (this.tableData = this.allData.slice(
          this.pageSize * (this.currentPage - 1),
          this.currentPage * this.pageSize
        ))
      }
      this.doNoDebounceSearch()
    },
    // 当前页码数变化
    handleCurrentChange(newPage) {
      this.currentPage = newPage
      if ((this.currentPage - 1) * this.pageSize < 120) {
        return (this.tableData = this.allData.slice(
          this.pageSize * (this.currentPage - 1),
          this.currentPage * this.pageSize
        ))
      }
      this.doNoDebounceSearch()
    },
    goToCorpus() {
      this.$parent.api.moveTo(2, 1)
    },
    // 选择匹配程度后的回调函数
    handleMatchCommand(value) {
      this.matchMode = value
      this.doNoDebounceSearch()
    },
    openTips() {
      if (this.isNotification) return
      this.isNotification = true
      this.$notify.info({
        title: 'Tips',
        dangerouslyUseHTMLString: true,
        message: `
        <p style="margin-top:5px;"><strong>1.&nbsp使用<span class="matched">空格</span>作为分隔符来匹配多个输入</strong></p>
        <p style="margin-top:5px;"><strong>2.&nbsp使用<span class="matched">英文双引号""</span>包围精确匹配的内容</strong></p>
        <p style="margin-top:5px;"><strong>3.&nbsp切换<span class="matched">搜索模式</span>在不同范围内搜索</strong></p>
        
        `,
        position: 'top-left',
        duration: 0,
        offset: 60,
        onClose: () => {
          this.isNotification = false
        },
      })
    },
  },
}
</script>

<style src="../assets/css/corpus.css"></style>
<style lang="less" scoped>
/deep/ .el-dropdown-menu__item {
  font-family: 'Microsoft YaHei';
}

/deep/ .el-input-group__prepend {
  cursor: pointer !important;
}

/deep/ .el-dropdown-link {
  font-size: 19px;
}

/deep/ .el-dropdown-menu__item:focus,
.el-dropdown-menu__item:not(.is-disabled):hover {
  background-color: rgba(206, 250, 202, 0.5) !important;
  color: green !important;
}

/deep/ .el-input__inner {
  padding-left: 32px;
}

/deep/ #corpus #search .el-input {
  font-size: 19px;
}

/deep/ #corpus .el-table {
  opacity: 0.8;
  border-radius: 10px;
  border: 1px solid rgb(146, 144, 144);
  font-weight: 500;
  font-size: 16px;
  -webkit-user-select: text;
}

/deep/ .el-icon-loading {
  font-size: 36px;
  color: #42b983;
}

/deep/ .el-loading-text {
  font-size: 18px;
  color: #42b983;
}

/deep/ .el-loading-mask {
  background-color: rgba(255, 255, 255, 0.65);
}

/deep/ .el-table__row {
  font-family: 'Microsoft YaHei';
}

/deep/ .el-input,
.el-pagination,
.el-table {
  margin-bottom: 30px;
}

/deep/ #corpus .el-select-dropdown__item.selected {
  color: #42b983;
}

/deep/ #corpus .el-pagination__sizes .el-input .el-input__inner:hover {
  border-color: #42b983;
}

/deep/ .el-select .el-input.is-focus .el-input__inner {
  border-color: #42b983;
}

/deep/ .el-select .el-input__inner:focus {
  border-color: #42b983;
}

/deep/ .el-select-dropdown__item.selected {
  color: #42b983;
}

/deep/ .el-input.is-active .el-input__inner,
/deep/ .el-input__inner:focus {
  border-color: #42b983;
}

/deep/ .el-pagination span:not([class*='suffix']) {
  font-size: 16px;
}

/deep/ .el-pager li,
/deep/ .el-pagination__sizes .el-input .el-input__inner {
  font-size: 15px;
}

/deep/ .el-pager li.active {
  color: #42b983 !important;
}

/deep/ .el-pager li:hover {
  color: #42b983;
}

/deep/ .el-select .el-input__inner {
  padding: 0;
}

/deep/ .el-pagination__jump .el-input__inner {
  padding: 0;
}

.loop(@n) when (@n < 21) {
  #corpus /deep/ .el-table__body {
    .el-table__row:nth-child(@{n}) {
      opacity: 0;
      animation: table-show 300ms @n * 20ms forwards ease-out;
    }
  }
  .loop((@n + 1));
}
.loop(0);

@keyframes table-show {
  0% {
    transform: translateY(30px);
    opacity: 0.3;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
}
</style>
