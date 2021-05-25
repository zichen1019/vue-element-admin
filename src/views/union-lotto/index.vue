<template>
  <fieldset>
    <legend>总体数据</legend>
    <fieldset v-for="(unionLotto, index) in unionLottos" :key="index">
      <legend>{{ unionLotto.title }}</legend>
      <div class="card echarts">
        <line-chart :chart-data="unionLotto.lotto" :row-data="unionLotto.rowData" />
      </div>
      <el-card class="box-card">
        <el-table :data="unionLotto.luckyNumber" height="300px">
          <el-table-column prop="n" align="center" width="50px" label="吉1">
            <template slot-scope="scope">
              <el-button v-if="scope.row.n && scope.row.count && index < 7" type="danger" circle>{{ scope.row.n }}</el-button>
              <el-button v-else-if="scope.row.n && scope.row.count && index >= 7" type="primary" circle>{{ scope.row.n }}</el-button>
            </template>
          </el-table-column>
          <el-table-column prop="count" align="center" width="50px" label="次数">
            <template slot-scope="scope">
              <span v-show="scope.row.n && scope.row.count">{{ scope.row.count }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="n2" align="center" width="50px" label="吉2">
            <template slot-scope="scope">
              <el-button v-if="scope.row.n2 && scope.row.count2 && index < 7" type="danger" circle>{{ scope.row.n2 }}</el-button>
              <el-button v-else-if="scope.row.n2 && scope.row.count2 && index >= 7" type="primary" circle>{{ scope.row.n2 }}</el-button>
            </template>
          </el-table-column>
          <el-table-column prop="count2" align="center" width="50px" label="次数">
            <template slot-scope="scope">
              <span v-show="scope.row.n2 && scope.row.count2">{{ scope.row.count2 }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="n3" align="center" width="50px" label="吉3">
            <template slot-scope="scope">
              <el-button v-if="scope.row.n3 && scope.row.count3 && index < 7" type="danger" circle>{{ scope.row.n3 }}</el-button>
              <el-button v-else-if="scope.row.n3 && scope.row.count3 && index >= 7" type="primary" circle>{{ scope.row.n3 }}</el-button>
            </template>
          </el-table-column>
          <el-table-column prop="count3" align="center" width="50px" label="次数">
            <template slot-scope="scope">
              <span v-show="scope.row.n3 && scope.row.count3">{{ scope.row.count3 }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="n4" align="center" width="50px" label="吉4">
            <template slot-scope="scope">
              <el-button v-if="scope.row.n4 && scope.row.count4 && index < 7" type="danger" circle>{{ scope.row.n4 }}</el-button>
              <el-button v-else-if="scope.row.n4 && scope.row.count4 && index >= 7" type="primary" circle>{{ scope.row.n4 }}</el-button>
            </template>
          </el-table-column>
          <el-table-column prop="count4" align="center" width="50px" label="次数">
            <template slot-scope="scope">
              <span v-show="scope.row.n4 && scope.row.count4">{{ scope.row.count4 }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="n5" align="center" width="50px" label="吉5">
            <template slot-scope="scope">
              <el-button v-if="scope.row.n5 && scope.row.count5 && index < 7" type="danger" circle>{{ scope.row.n5 }}</el-button>
              <el-button v-else-if="scope.row.n5 && scope.row.count5 && index >= 7" type="primary" circle>{{ scope.row.n5 }}</el-button>
            </template>
          </el-table-column>
          <el-table-column prop="count5" align="center" width="50px" label="次数">
            <template slot-scope="scope">
              <span v-show="scope.row.n5 && scope.row.count5">{{ scope.row.count5 }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="n6" align="center" width="50px" label="吉6">
            <template slot-scope="scope">
              <el-button v-if="scope.row.n6 && scope.row.count6 && index < 7" type="danger" circle>{{ scope.row.n6 }}</el-button>
              <el-button v-else-if="scope.row.n6 && scope.row.count6 && index >= 7" type="primary" circle>{{ scope.row.n6 }}</el-button>
            </template>
          </el-table-column>
          <el-table-column prop="count6" align="center" width="50px" label="次数">
            <template slot-scope="scope">
              <span v-show="scope.row.n6 && scope.row.count6">{{ scope.row.count6 }}</span>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
    </fieldset>
  </fieldset>
</template>

<script>
import LineChart from './components/LineChart'
import { getUnionLotto, getProbability } from '@/api/union-lotto'
export default {
  name: 'UnionLotto',
  components: {
    LineChart
  },
  data() {
    return {
      unionLottos: [
        { title: '红1', lotto: { LottoData: [] }, luckyNumber: [], rowData: [] },
        { title: '红2', lotto: { LottoData: [] }, luckyNumber: [], rowData: [] },
        { title: '红3', lotto: { LottoData: [] }, luckyNumber: [], rowData: [] },
        { title: '红4', lotto: { LottoData: [] }, luckyNumber: [], rowData: [] },
        { title: '红5', lotto: { LottoData: [] }, luckyNumber: [], rowData: [] },
        { title: '红6', lotto: { LottoData: [] }, luckyNumber: [], rowData: [] },
        { title: '全红', lotto: { LottoData: [] }, luckyNumber: [], rowData: [] },
        { title: '蓝1', lotto: { LottoData: [] }, luckyNumber: [], rowData: [] }
      ]
    }
  },
  created() {
    this.getUnionLottoData()
    this.getProbabilityData()
  },
  methods: {
    /**
     * 获取每期数据
     */
    getUnionLottoData() {
      getUnionLotto().then(res => {
        console.log(res)
      })
    },
    /**
     * 获取最后一次比例分析
     */
    getProbabilityData() {
      getProbability().then(res => {
        this.viewLotto(res.probability[0])
      })
    },
    /**
     * 将数据解析为echarts可用的数据
     * @param data
     */
    viewLotto(data) {
      // 将数据解析为视图可用
      const xy = this.analysisData(data.red1, 1)
      this.unionLottos[0].rowData = xy.x
      this.unionLottos[0].lotto.LottoData = xy.y

      const xy2 = this.analysisData(data.red2, 2)
      this.unionLottos[1].rowData = xy2.x
      this.unionLottos[1].lotto.LottoData = xy2.y

      const xy3 = this.analysisData(data.red3, 3)
      this.unionLottos[2].rowData = xy3.x
      this.unionLottos[2].lotto.LottoData = xy3.y

      const xy4 = this.analysisData(data.red4, 4)
      this.unionLottos[3].rowData = xy4.x
      this.unionLottos[3].lotto.LottoData = xy4.y

      const xy5 = this.analysisData(data.red5, 5)
      this.unionLottos[4].rowData = xy5.x
      this.unionLottos[4].lotto.LottoData = xy5.y

      const xy6 = this.analysisData(data.red6, 6)
      this.unionLottos[5].rowData = xy6.x
      this.unionLottos[5].lotto.LottoData = xy6.y

      // 将红1到红6的所有中过奖的球综合到一起
      const xy7 = this.arraySUM(xy.y, xy2.y, xy3.y, xy4.y, xy5.y, xy6.y)
      this.unionLottos[6].rowData = xy7.x
      this.unionLottos[6].lotto.LottoData = xy7.y

      const xy8 = this.analysisData(data.blue, 8)
      this.unionLottos[7].rowData = xy8.x
      this.unionLottos[7].lotto.LottoData = xy8.y

      // 将数据按次序写入4列表格
      const cols = 6
      for (let k = 0; k < this.unionLottos.length; k++) {
        const lottos = []
        const lotto = JSON.parse(JSON.stringify(this.unionLottos[k].luckyNumber))
        for (let i = 0; i < lotto.length; i++) {
          if (i % cols === 0) {
            const index = i / cols
            lottos[index] = {}
            if (lotto[i] && lotto[i].count) {
              lottos[index].n = lotto[i].n
              lottos[index].count = lotto[i].count
            } else {
              break
            }
            let suoyin = i + 1
            if (lotto[suoyin] && lotto[suoyin].count) {
              lottos[index].n2 = lotto[suoyin].n
              lottos[index].count2 = lotto[suoyin].count
            } else {
              break
            }
            suoyin = i + 2
            if (lotto[suoyin] && lotto[suoyin].count) {
              lottos[index].n3 = lotto[suoyin].n
              lottos[index].count3 = lotto[suoyin].count
            } else {
              break
            }
            suoyin = i + 3
            if (lotto[suoyin] && lotto[suoyin].count) {
              lottos[index].n4 = lotto[suoyin].n
              lottos[index].count4 = lotto[suoyin].count
            } else {
              break
            }
            suoyin = i + 4
            if (lotto[suoyin] && lotto[suoyin].count) {
              lottos[index].n5 = lotto[suoyin].n
              lottos[index].count5 = lotto[suoyin].count
            }
            suoyin = i + 5
            if (lotto[suoyin] && lotto[suoyin].count) {
              lottos[index].n6 = lotto[suoyin].n
              lottos[index].count6 = lotto[suoyin].count
            } else {
              break
            }
          }
        }
        this.unionLottos[k].luckyNumber = lottos
      }
    },
    /**
     * 将字符串比例解析为可用的数据
     * @param data
     * @param index
     * @returns {{x: Array, y: Array}}
     */
    analysisData(data, index) {
      const x = []
      const y = []
      const lottos = []
      data = data.replace(/'/g, '"')
      data = JSON.parse(data)
      for (let i = 0; i < data.length; i++) {
        x.push(parseInt(data[i].n))
        y.push(data[i].count)
        lottos[i] = { n: i + 1, count: data[i].count }
      }
      lottos.sort(this.sortByCount)
      this.unionLottos[index - 1].luckyNumber = lottos
      return {
        x: x,
        y: y
      }
    },
    /**
     * 红球的综合数据
     * @param array1
     * @param array2
     * @param array3
     * @param array4
     * @param array5
     * @param array6
     * @returns {Array}
     */
    arraySUM(array1, array2, array3, array4, array5, array6) {
      const lottos = []
      const x = []
      const y = []
      for (let i = 0; i < array1.length; i++) {
        x[i] = i + 1
        y[i] = array1[i] + array2[i] + array3[i] + array4[i] + array5[i] + array6[i]
        lottos[i] = { n: i + 1, count: y[i] }
      }
      lottos.sort(this.sortByCount)
      this.unionLottos[6].luckyNumber = lottos
      return {
        x: x,
        y: y
      }
    },
    /**
     * 排序 按次数进行倒序，如果次数相同则按序号升序
     * @param a
     * @param b
     * @returns {number}
     */
    sortByCount(a, b) {
      if (b.count === a.count) {
        return a.n - b.n
      } else {
        return b.count - a.count
      }
    }
  }
}
</script>

<style scoped>
.echarts {
  width: 70%;
}
.chart {
  float: left;
}
.box-card {
  float: left;
  width: 30%;
  height: 340px;
}
.text {
  font-size: 14px;
}

.item {
  margin: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both
}
</style>
