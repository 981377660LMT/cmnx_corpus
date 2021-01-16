<template>
  <div id="corpus">
    <el-card class="box-card">
      <!-- 卡片的头部 -->
      <!-- 固定的switch开关 -->
      <el-switch v-model="switchValue" active-color="#13ce66" inactive-color="grey" @change="switchChange($event)">
      </el-switch>
      <!-- 卡片里放东西 -->

      <el-row :gutter="20">
        <el-col :span="12" :offset="6" id="help" @click="showHelp = true">需要一些帮助?</el-col>
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
                  选择匹配程度<i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item icon="el-icon-bicycle" command="低">
                    低：>30%</el-dropdown-item>
                  <el-dropdown-item icon="el-icon-ship" command="中">
                    中：>60%</el-dropdown-item>
                  <el-dropdown-item icon="el-icon-truck" command="高">
                    高：>90%</el-dropdown-item>
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
        <el-table-column prop="from" label="来源" width="150">
        </el-table-column>
        <el-table-column prop="chinese" label="中文">
          <template slot-scope="scope">
            <span v-html="inputMatch(scope.row.chinese)"></span>
          </template>
        </el-table-column>
        <el-table-column prop="japanese" label="日文">
          <template slot-scope="scope">
            <span v-html="inputMatch(scope.row.japanese)"></span>
          </template>
        </el-table-column>
        <el-table-column label="收藏" width="56">
          <!-- 模板插槽like -->
          <template slot-scope="scope">
            <i style="font-size:32px;cursor:pointer" class="el-icon-star-on" v-if="scope.row.like == true" @click="deleteLike"></i>
            <i style="font-size:28px;cursor:pointer" class="el-icon-star-off" v-if="scope.row.like == false" @click="addLike"></i>
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
import Lodash from 'lodash'
export default {
  name: 'Corpus',
  data() {
    return {
      // 向后台发送currentPage,pageSize,input三个参数，全部查询排序取一部分后返回到tableData里
      //查询到的词条数
      totalNumber: 0,
      currentPage: 1,
      pageSize: 5,
      //绑定表格数据
      tableData: [],
      fakeData: [
        {
          from: 'FateZero',
          chinese:
            '如果他能早点将这一条铁则铭记在心的话，或许还有办法获得救赎。',
          japanese:
            'そんな鉄則を、もっと早くから肝きもに銘めいじておいたなら、まだ彼には救いがあった。',
          like: true
        },
        {
          from: 'FGO',
          chinese: '御主，旅途总是伴随着危险。当然，从者就是为此而存在的……',
          japanese:
            'マスター、旅には常に危険が伴います。もちろん、その為にサーヴァントがいるのですが……。',
          like: false
        },
        {
          from: '宫本武藏',
          chinese: '变迁，沧海桑田，要怎样面对呢？',
          japanese: 'どうなるものか、この天地の大きな動きが。',
          like: false
        },
        {
          from: 'Chusingura46+1 S',
          chinese:
            '「その傷は、我が亡き主君である浅野内匠頭が殿中、松の廊下で刃傷の際に切りつけた傷ではござらぬか？」',
          japanese:
            '「その傷は、我が亡き主君である浅野内匠頭が殿中、松の廊下で刃傷の際に切りつけた傷ではござらぬか？」',
          like: false
        },
        {
          from: '美少女万华镜1-4',
          chinese:
            '「分かっているんだろうな……帝大に合格できなければ、覡家の恥になるんだぞ……子供が二人もいて、どっちも帝大に入学できなかった、なんてことになれば、親戚中の笑いものだ……」',
          japanese:
            '「分かっているんだろうな……帝大に合格できなければ、覡家の恥になるんだぞ……子供が二人もいて、どっちも帝大に入学できなかった、なんてことになれば、親戚中の笑いものだ……」',
          like: true
        },
        {
          from: 'FSN Saber线',
          chinese:
            '「真是的，又是这时间回来。因为冬天日落的很早，我有说过要早点回来的对吧。」',
          japanese:
            '「もう、またこんな時間に帰ってきて。冬は日が暮れるのが早いんだから、もっと早くに帰ってきなさいって言ったでしょ」',
          like: false
        },
        {
          from: '古今和歌集',
          chinese: '今朝离别后，转瞬渡银河。未渡银河水，湿痕袖已多。',
          japanese: '今はとて 別るる時は 天の河 渡らぬ先に 袖ぞひちぬる',
          like: false
        }
        // {
        //   from: "鬼哭街",
        //   chinese:
        //     "嗜虐血腥的笑容浮在朱的唇边，像是在炫耀自己的破坏力一般，在自身周围挥舞鞭子张开结界。",
        //   japanese:
        //     "不敵な含笑に嗜虐の色さえ滲ませながら、｜朱《チュウ》はその破壊力を見せつけるかのように、おのれの周囲に鞭を振り巡らせて結界を張った。",
        //   like: true
        // },
        // {
        //   from: "罗生门",
        //   chinese:
        //     "凝神一看，道士吕翁仍然坐在他的枕边，主人煮的黄米饭，似乎还没有熟。卢生从青瓷枕上抬起头，揉着眼睛，打了一个大呵欠。邯郸的秋日午后，虽有阳光照在落叶的树木梢头，仍令人感到些许寒意。",
        //   japanese:
        //     "すると枕もとには依然として、道士どうしの呂翁ろおうが坐っている。主人の炊かしいでいた黍きびも、未いまだに熟さないらしい。盧生は青磁の枕から頭をあげると、眼をこすりながら大きな欠伸あくびをした。邯鄲かんたんの秋の午後は、落葉おちばした木々の梢こずえを照らす日の光があってもうすら寒い。",
        //   like: false
        // },
        // {
        //   from: "美少女万华镜5",
        //   chinese:
        //     "在树木丛生的山中小道上独行的少女，她的身影也同样被穿过树叶的斑驳月光所映现。",
        //   japanese:
        //     "鬱蒼とした山の中の道を一人歩く少女の姿も同様に、木の葉の陰から届く月光に映し出される。",
        //   like: false
        // }
        // {
        //   from: "明日方舟语音集",
        //   chinese: "过道内严禁烟火，请各位干员不要在走道吸烟，谢谢配合！",
        //   japanese:
        //     "通路内は火気厳禁ですオペレーターのみなさんここでの喫煙は控えてくださいご協力ありがとうございます！",
        //   like: false
        // },
        // {
        //   from: "起风了",
        //   chinese:
        //     "在那些夏日里，在弥望著茂密芒草的草原中，当你站在那里专心致志地作画的时候，我总是躺在旁边一株白桦的树荫下。",
        //   japanese:
        //     "それらの夏の日々、一面に薄の生い茂った草原の中で、お前が立ったまま热心に絵を描いていると、私はいつもその傍らの一本の白桦の木荫に身を横たえていたものだった。",
        //   like: false
        // },
        // {
        //   from: "沙耶之歌",
        //   chinese:
        //     "这些东西间在随意地谈论时，我是可以不理睬的。但是，到该我与他们说话的时候，也不能无视。",
        //   japanese:
        //     "こいつらが勝手に話し合っているうちは放っておけばいいが、こちらに話しかけてきたときまで無視するわけにもいかない。",
        //   like: true
        // },
        // {
        //   from: "虞美人草",
        //   chinese:
        //     "“真是一座顽固的山。”男人挺起方形的胸膛，身子微微靠在樱木拐杖上，随即又以蔑视比睿山的口吻道，“既然能看得那么清楚，爬上去应该是小事一桩。",
        //   japanese:
        //     "「恐ろしい頑固な山だなあ」と四角な胸を突き出して、ちょっと桜の杖に身を倚たせていたが、「あんなに見えるんだから、訳はない」と今度は叡山を軽蔑したような事を云う。",
        //   like: false
        // },
        // {
        //   from: "知网",
        //   chinese:
        //     "“天下真有这样标致人物，我今儿才算 见了！况且这通身的气派，竟不象老祖宗的外孙女 儿，竟是个嫡亲的孙女，怨不得老祖宗天天口头心 头一时不忘。只可怜我这妹妹这样命苦，怎么姑妈 偏就去世了！",
        //   japanese:
        //     "広い世間には本当にこん な器量よしもいらっしゃったのですわ ね。わたくし、今日初めてこの目で実物 を見られたというものです。それに、こ の全身からにおうようなご気品は、どう 見てもお祖母さまの外孫でいらっしゃる とはうけとれません。内孫の姫さんとし か見えませんものね。これならお祖母さ まが毎日のようにお噂もされ、お心にも かけていらっしゃいましたのもごもっと も。それにつけてもお可哀想なのはこの 方、こうまでご運がわるいとは。なぜに まあ叔母さまったら、あの世へいってお しまいになったのかしら……」",
        //   like: false
        // },
        // {
        //   from: "山月记",
        //   chinese: "令子路吃惊的是孔子之阔达自在，竟全然没有一丝道学家的腐气。",
        //   japanese: "闊達自在、いささかの道学者臭も無いのに子路は驚く。",
        //   like: false
        // },
        // {
        //   from: "忠臣藏剧本节选",
        //   chinese: "浅野内匠头大人的家臣片冈源五卫门求见",
        //   japanese:
        //     "只今玄関先に　浅野内匠头様家臣　片冈源五卫门なる者　おとないに来たり",
        //   like: false
        // }
      ],
      // input里的输入
      input: '',
      // 显示帮助
      showHelp: false,
      // 夜间模式
      switchValue: true,
      showTable: true,
      showLoading: false,
      showMask: false
    }
  },
  created() {},
  mounted() {},
  computed: {},
  watch: {
    input: function() {
      this.doDebounceSearch()
    }
  },
  components: {},
  methods: {
    // 点击like按钮发生的改变操作
    addLike() {
      this.$message.success({
        showClose: true,
        message: `添加收藏成功！`,
        duration: 1500
      })
    },
    deleteLike() {
      this.$message.success({
        showClose: true,
        message: `删除收藏成功！`,
        duration: 1500
      })
    },
    // 换背景，参数是true和false
    switchChange($event) {
      if ($event) {
        this.showMask = false
      } else {
        this.showMask = true
      }
    },
    // 有防抖的搜索
    doDebounceSearch: Lodash.debounce(function() {
      this.showTable = false
      this.showLoading = true
      setTimeout(() => {
        this.tableData = this.fakeData
        this.showLoading = false
        this.showTable = true
        this.$parent.api.reBuild()
        this.inputMatch()
      }, 500)
      // 发送请求
      // this.totalNumber = 10;
      // this.tableData=
    }, 500),
    //无防抖的搜索
    doNoDebounceSearch: Lodash.debounce(function() {
      this.showTable = false
      this.showLoading = true
      setTimeout(() => {
        this.tableData = []
        this.showLoading = false
        this.showTable = true
        this.$parent.api.reBuild()
        this.inputMatch()
      }, 500)
      // 发送请求
      // this.totalNumber = 10;
      // this.tableData=
    }, 0),
    // 匹配字符
    inputMatch(data) {
      let matchResultData = ''
      let matchInput = this.input.trim()
      for (let char of data) {
        if (this.input.includes(char)) {
          char = '<span class="matched">' + char + '</span>'
        }
        matchResultData += char
      }
      return matchResultData
    },
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
      this.$message.success({
        showClose: true,
        message: `当前匹配程度：${value}`,
        duration: 1500
      })
      this.doNoDebounceSearch()
    },
    changeDropDownBackground() {
      if (this.showMask == true) {
        document.querySelector('.')
      }
    }
  }
}
</script>

<style lang="less" scoped>
@import '../assets/css/corpus.css';
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
