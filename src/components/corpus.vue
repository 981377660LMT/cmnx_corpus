<template>
  <div id="corpus">
    <!-- 帮助对话框 -->
    <el-dialog title="提示" :visible.sync="showHelp" width="30%" center close-on-click-modal="true">
      <span>需要注意的是内容是默认不居中的</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="centerDialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
    <el-card class="box-card">
      <!-- 卡片的头部 -->
      <!-- 固定的switch开关 -->
      <el-switch v-model="switchValue" active-color="#13ce66" inactive-color="grey" @change="switchChange($event)">
      </el-switch>
      <!-- 卡片里放东西 -->

      <el-row :gutter="20">
        <el-col :span="12" :offset="6" id="help" @click.native="showHelp=true">需要一些帮助?
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
          <el-input v-model="input" placeholder="请输入中文/日文开始搜索" prefix-icon="el-icon-edit-outline" size="medium" clearable autofocus="true">
            <template slot="prepend">
              <el-dropdown trigger="hover" @command="handleMatchCommand" show-timeout="100" hide-timeout="100">
                <span class="el-dropdown-link">
                  选择搜索模式<i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item icon="el-icon-bicycle" command="1">
                    在中文与日文中搜索</el-dropdown-item>
                  <el-dropdown-item icon="el-icon-ship" command="2">
                    仅在中文中搜索</el-dropdown-item>
                  <el-dropdown-item icon="el-icon-truck" command="3">
                    仅在日文中搜索</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </template>
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </el-col>
      </el-row>
      <!-- 加载 -->
      <el-main v-loading="showLoading" v-if="showLoading" element-loading-spinner="el-icon-loading" element-loading-background="#DFDFDF" element-loading-text="正在查找中，请稍等片刻......" id="loading">
      </el-main>
      <!-- 表格 -->
      <el-table :data="tableData" stripe border style="width: 100%" v-show="showTable">
        <el-table-column type="index" width="50" align="center">
        </el-table-column>
        <el-table-column prop="from" label="来源" width="160">
        </el-table-column>
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
            <i style="font-size:28px;cursor:pointer" class="el-icon-star-on" v-if="scope.row.like==true" @click="toggleLike(scope.row.corpusId,scope.row.like)"></i>
            <i style="font-size:28px;cursor:pointer" class="el-icon-star-off" v-if="scope.row.like==false" @click="toggleLike(scope.row.corpusId,scope.row.like)"></i>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页下 -->
      <el-pagination class="paginationBottom" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[3, 5, 7, 10]" :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper" :total="totalNumber" :popper-append-to-body="false">
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
import Lodash from "lodash"
import Help from "./tips/Help"

export default {
  name: "Corpus",
  data() {
    return {
      // 向后台发送currentPage,pageSize,input三个参数
      //查询到的词条数
      totalNumber: 0,
      currentPage: 1,
      pageSize: 5,
      //绑定表格数据
      tableData: [],
      // input里的输入
      input: "",
      // 显示帮助
      showHelp: false,
      // 夜间模式
      switchValue: true,
      showTable: true,
      showLoading: false,
      showMask: false,
      matchMode: ""
    }
  },
  created() {},
  mounted() {},
  computed: {
    //在手机界面被删除的语料id
    corpusId: function() {
      return this.$store.state.corpusId
    }
  },
  watch: {
    input: function() {
      this.doDebounceSearch()
    },
    //手机界面的收藏被删除时，对应的收藏星星变色
    corpusId: function(corpusId) {
      for (let corpus of this.tableData) {
        let { corpusId: shouldChangedCorpusId } = corpus
        if (shouldChangedCorpusId === corpusId) {
          return (corpus.like = !corpus.like)
        }
      }
    }
  },
  components: {
    Help
  },
  methods: {
    toggleLike(corpusId, like) {
      console.log(corpusId, like)
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
      const { data, status } = await this.$axios.put("/putLike", { corpusId: corpusId })
      if (status != 200) return this.$message.error("(◎-◎;)!!  添加收藏失败了...?")
      this.$message.success({
        showClose: true,
        message: `添加收藏成功！`,
        duration: 1500
      })
      this.$store.commit("changeLikeNumber", data.likeNumber)
    },
    async deleteLike(corpusId) {
      const { data, status } = await this.$axios.delete("/deleteLike", { data: { corpusId: corpusId } })
      if (status != 200) return this.$message.error("(◎-◎;)!!  删除收藏失败了...?")
      this.$message.success({
        showClose: true,
        message: `删除收藏成功！`,
        duration: 1500
      })
      console.log(data.likeNumber)
      this.$store.commit("changeLikeNumber", data.likeNumber)
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
      const { data, status } = await this.$axios.get("/doSearch", {
        params: {
          matchMode: this.matchMode,
          searchInput: this.input,
          searchPage: this.currentPage,
          searchPageSize: this.pageSize
        }
      })
      if (status !== 200) return this.$message.error("(◎-◎;)!!  搜索失败了...?")
      console.log(data.searchResultstatus)
      this.tableData = data.searchResult
      this.totalNumber = data.totalNumber
      this.showLoading = false
      this.showTable = true
      this.$parent.api.reBuild()
    },
    // 有防抖的搜索
    doDebounceSearch: Lodash.debounce(async function() {
      console.log(this)
      this.doSearch()
    }, 500),
    //无防抖的搜索
    doNoDebounceSearch: Lodash.debounce(async function() {
      this.doSearch()
    }, 0),
    // 页码size变化
    handleSizeChange(newSize) {
      this.pageSize = newSize
      this.doNoDebounceSearch()
    },
    // 当前页码数变化
    handleCurrentChange(newPage) {
      this.currentPage = newPage
      this.doNoDebounceSearch()
    },
    goToCorpus() {
      this.$parent.api.moveTo(2, 1)
    },
    // 选择匹配程度后的回调函数
    handleMatchCommand(value) {
      this.matchMode = value
      this.doNoDebounceSearch()
    }
  }
}
</script>

<style lang="less" scoped>
@import "../assets/css/corpus.css";
.loop(@n) when (@n < 20) {
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
