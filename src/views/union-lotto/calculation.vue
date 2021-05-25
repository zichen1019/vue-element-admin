<template>
  <el-card class="box-card">
    <el-card class="box-card">
      <div>
        <el-input v-model="unionLotto[0]" style="width: 10%;margin-left: 3%;">
          <template slot="prepend">红1</template>
        </el-input>
        <el-input v-model="unionLotto[1]" style="width: 10%;margin-left: 3%;">
          <template slot="prepend">红2</template>
        </el-input>
        <el-input v-model="unionLotto[2]" style="width: 10%;margin-left: 3%;">
          <template slot="prepend">红3</template>
        </el-input>
        <el-input v-model="unionLotto[3]" style="width: 10%;margin-left: 3%;">
          <template slot="prepend">红4</template>
        </el-input>
        <el-input v-model="unionLotto[4]" style="width: 10%;margin-left: 3%;">
          <template slot="prepend">红5</template>
        </el-input>
        <el-input v-model="unionLotto[5]" style="width: 10%;margin-left: 3%;">
          <template slot="prepend">红6</template>
        </el-input>
        <el-input v-model="unionLotto[6]" style="width: 10%;margin-left: 3%;">
          <template slot="prepend">蓝1</template>
        </el-input>
      </div>
      <div style="margin: 10px auto;">
        <el-button icon="el-icon-search" type="primary" round @click="winningProbabilitys">中奖几率</el-button>
        <el-button icon="el-icon-view" type="primary" round @click="autoWinningProbabilitys">自动化测试中奖几率</el-button>
        <el-button icon="el-icon-edit" type="danger" round @click="machineSelection">机选几率</el-button>
        <el-button icon="el-icon-delete" type="primary" round @click="delWinningProbabilitys">清空当前中奖几率</el-button>
      </div>
      <el-tabs type="border-card">
        <el-tab-pane label="中奖几率">
          <el-table :data="winningLotto" height="1000" border stripe>
            <el-table-column type="index" align="center" label="序号" />
            <el-table-column prop="red1" align="center" label="红1">
              <template slot-scope="scope">
                <el-button type="danger" circle>{{ scope.row.red1 ? scope.row.red1 : '' }}</el-button>
              </template>
            </el-table-column>
            <el-table-column prop="red2" align="center" label="红2">
              <template slot-scope="scope">
                <el-button type="danger" circle>{{ scope.row.red2 ? scope.row.red2 : '' }}</el-button>
              </template>
            </el-table-column>
            <el-table-column prop="red3" align="center" label="红3">
              <template slot-scope="scope">
                <el-button type="danger" circle>{{ scope.row.red3 ? scope.row.red3 : '' }}</el-button>
              </template>
            </el-table-column>
            <el-table-column prop="red4" align="center" label="红4">
              <template slot-scope="scope">
                <el-button type="danger" circle>{{ scope.row.red4 ? scope.row.red4 : '' }}</el-button>
              </template>
            </el-table-column>
            <el-table-column prop="red5" align="center" label="红5">
              <template slot-scope="scope">
                <el-button type="danger" circle>{{ scope.row.red5 ? scope.row.red5 : '' }}</el-button>
              </template>
            </el-table-column>
            <el-table-column prop="red6" align="center" label="红6">
              <template slot-scope="scope">
                <el-button type="danger" circle>{{ scope.row.red6 ? scope.row.red6 : '' }}</el-button>
              </template>
            </el-table-column>
            <el-table-column prop="blue" align="center" label="蓝1">
              <template slot-scope="scope">
                <el-button type="primary" circle>{{ scope.row.blue ? scope.row.blue : '' }}</el-button>
              </template>
            </el-table-column>
            <el-table-column prop="first" align="center" label="一等奖">
              <template slot-scope="scope">
                <el-tag type="danger">{{ scope.row.first }}</el-tag>
              </template>
            </el-table-column>
            <el-table-column prop="second" align="center" label="二等奖">
              <template slot-scope="scope">
                <el-tag type="danger">{{ scope.row.second }}</el-tag>
              </template>
            </el-table-column>
            <el-table-column prop="third" align="center" label="三等奖">
              <template slot-scope="scope">
                <el-tag type="danger">{{ scope.row.third }}</el-tag>
              </template>
            </el-table-column>
            <el-table-column prop="fourth" align="center" label="四等奖">
              <template slot-scope="scope">
                <el-tag type="warning">{{ scope.row.fourth }}</el-tag>
              </template>
            </el-table-column>
            <el-table-column prop="fiveth" align="center" label="五等奖">
              <template slot-scope="scope">
                <el-tag type="info">{{ scope.row.fiveth }}</el-tag>
              </template>
            </el-table-column>
            <el-table-column prop="sixth" align="center" label="六等奖">
              <template slot-scope="scope">
                <el-tag type="success">{{ scope.row.sixth }}</el-tag>
              </template>
            </el-table-column>
            <el-table-column prop="noprize" align="center" label="未中奖">
              <template slot-scope="scope">
                <el-tag>{{ scope.row.noprize }}</el-tag>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="往期中奖">
          <el-table :data="unionLottos" height="1000" border stripe>
            <el-table-column type="index" align="center" label="序号" />
            <el-table-column prop="qihao" align="center" label="期号" />
            <el-table-column prop="kaijiangriqi" align="center" label="开奖日期" />
            <el-table-column prop="red1" align="center" label="红1">
              <template slot-scope="scope">
                <el-button type="danger" circle>{{ scope.row.red1 }}</el-button>
              </template>
            </el-table-column>
            <el-table-column prop="red2" align="center" label="红2">
              <template slot-scope="scope">
                <el-button type="danger" circle>{{ scope.row.red2 }}</el-button>
              </template>
            </el-table-column>
            <el-table-column prop="red3" align="center" label="红3">
              <template slot-scope="scope">
                <el-button type="danger" circle>{{ scope.row.red3 }}</el-button>
              </template>
            </el-table-column>
            <el-table-column prop="red4" align="center" label="红4">
              <template slot-scope="scope">
                <el-button type="danger" circle>{{ scope.row.red4 }}</el-button>
              </template>
            </el-table-column>
            <el-table-column prop="red5" align="center" label="红5">
              <template slot-scope="scope">
                <el-button type="danger" circle>{{ scope.row.red5 }}</el-button>
              </template>
            </el-table-column>
            <el-table-column prop="red6" align="center" label="红6">
              <template slot-scope="scope">
                <el-button type="danger" circle>{{ scope.row.red6 }}</el-button>
              </template>
            </el-table-column>
            <el-table-column prop="blue" align="center" label="蓝1">
              <template slot-scope="scope">
                <el-button type="primary" circle>{{ scope.row.blue }}</el-button>
              </template>
            </el-table-column>
            <el-table-column prop="sizeRatio" align="center" label="大小比">
              <template slot-scope="scope">
                <el-tag type="primary">{{ scope.row.sizeRatio }}</el-tag>
              </template>
            </el-table-column>
            <el-table-column prop="intervalRatio" align="center" label="区间比">
              <template slot-scope="scope">
                <el-tag type="primary">{{ scope.row.intervalRatio }}</el-tag>
              </template>
            </el-table-column>
            <el-table-column prop="parityRatio" align="center" label="奇偶比">
              <template slot-scope="scope">
                <el-tag type="primary">{{ scope.row.parityRatio }}</el-tag>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="红球走势">
          红球走势
          <el-table :data="redBallTrend" height="1000" border stripe>
            <el-table-column type="index" align="center" label="序号" />
            <el-table-column prop="qihao" align="center" label="期号" />
            <el-table-column prop="red1" align="center" label="红1">
              <template slot-scope="scope">
                <el-button type="danger" circle>{{ scope.row.red1 }}</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="蓝球走势">
          蓝球走势
          <el-table :data="blueBallTrend" max-height="700" style="margin: 20px auto;" border stripe>
            <el-table-column type="index" align="center" width="50" label="序号" />
            <el-table-column prop="qihao" align="center" label="期号" />
            <el-table-column v-for="(col, index) in blueBallTrendCol" :key="index" :prop="col.prop" :label="col.label" align="center">
              <template slot-scope="scope">
                <el-button v-if="scope.row.win === index + 1" type="primary" circle>{{ scope.row.win }}</el-button>
                <el-button v-else circle>{{ scope.row[col.prop] }}</el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-table :data="unionLottos" height="200" border stripe>
            <el-table-column type="index" align="center" width="50" label="序号" />
            <el-table-column prop="qihao" align="center" label="期号" />
            <el-table-column v-for="(col, index) in blueBallTrendCol" :key="index" :prop="col.prop" :label="col.label" align="center">
              <template slot-scope="scope">
                <el-button v-if="parseInt(scope.row.blue) === index + 1" type="primary" circle>{{ parseInt(scope.row.blue) }}</el-button>
                <el-button v-else circle>{{ index + 1 }}</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="中奖规则">
          <el-table :data="winningRules" :span-method="mergeCols" border stripe>
            <el-table-column prop="title" align="center" label="奖级" />
            <el-table-column prop="condition" align="center" label="中奖条件">
              <el-table-column prop="red" align="center" label="红球">
                <template slot-scope="scope">
                  <el-button v-for="(r, index) in scope.row.red" :key="r + '_' + index" type="danger" circle />
                  <el-button v-for="r in (6 - scope.row.red)" :key="r" circle="" />
                </template>
              </el-table-column>
              <el-table-column prop="blue" align="center" label="蓝球">
                <template slot-scope="scope">
                  <el-button v-for="r in scope.row.blue" :key="r" type="primary" circle />
                  <el-button v-show="!scope.row.blue" circle="" />
                </template>
              </el-table-column>
            </el-table-column>
            <el-table-column prop="explain" align="center" label="说明" />
            <el-table-column prop="bonus" align="center" label="奖金" />
            <el-table-column prop="multiple" align="center" label="收益倍数" />
          </el-table>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </el-card>
</template>

<script>
import { getUnionLotto } from '@/api/union-lotto'

export default {
  name: 'WinningProbability',
  data() {
    return {
      // 往期中奖号码
      unionLottos: [],
      // 存储待查询的双色球号码
      unionLotto: [1, 12, 14, 19, 23, 33, 1],
      // 存储中奖几率数据
      winningLotto: [],
      // 红球走势
      redBallTrend: [],
      redBallTrendCol: [],
      // 蓝球走势
      blueBallTrend: [],
      blueBallTrendCol: [],
      // 中奖规则
      winningRules: [
        { title: '一等奖', red: 6, blue: 1, explain: '6+1：所有球全中', bonus: '最高1000万', multiple: '浮动' },
        { title: '二等奖', red: 6, blue: 0, explain: '6+0：所有红球全中', bonus: '最高1000万', multiple: '浮动' },
        { title: '三等奖', red: 5, blue: 1, explain: '5+1：中五个红球和1个蓝球', bonus: '3000元', multiple: '1500倍' },
        { title: '四等奖', red: 5, blue: 0, explain: '5+0：任意中5个球', bonus: '200元', multiple: '100倍' },
        { title: '四等奖', red: 4, blue: 1, explain: '4+1：任意中5个球', bonus: '200元', multiple: '100倍' },
        { title: '五等奖', red: 4, blue: 0, explain: '4+0：任意中4个球', bonus: '10元', multiple: '5倍' },
        { title: '五等奖', red: 3, blue: 1, explain: '3+1：任意中4个球', bonus: '10元', multiple: '5倍' },
        { title: '六等奖', red: 0, blue: 1, explain: '0+1：中1个蓝球即可', bonus: '5元', multiple: '2.5倍' }
      ]
    }
  },
  created() {
    this.getUnionLottoData()
  },
  methods: {
    /**
     * 初始化
     */
    init() {
      // 初始化蓝球走势和红球走势列
      for (let i = 0; i < 33; i++) {
        this.redBallTrendCol.push({ label: i + 1 })
        if (i < 16) {
          this.blueBallTrendCol.push({ prop: String.fromCharCode(i + 65), label: i + 1 + '' })
        }
      }
      // 初始化红球走势数据
      for (let i = 0; i < 10; i++) {
        this.redBallTrend[i] = { qihao: i + 1 }
      }
      // 初始化蓝球走势数据
      // 出现次数
      const numberOfOccurrences = { A: 0 }
      // 最大遗漏
      const maxOmission = {}
      // 最大连出
      const maxEvenOut = {}
      for (let i = 0; i < 30; i++) {
        const row = this.unionLottos[this.unionLottos.length - 1 - i]
        const preRow = this.unionLottos[this.unionLottos.length - 1 - i - 1]
        const blue = { qihao: parseInt(row.qihao.substring(4)), win: parseInt(row.blue) }
        for (let j = 0; j < 16; j++) {
          blue[String.fromCharCode(j + 65)] = j + 1
          if (!numberOfOccurrences[String.fromCharCode(j + 65)]) {
            numberOfOccurrences[String.fromCharCode(j + 65)] = 0
          }
          numberOfOccurrences[String.fromCharCode(j + 65)] += 1
          if (row.blue !== preRow.blue) {
            if (!maxOmission[String.fromCharCode(j + 65)]) {
              maxOmission[String.fromCharCode(j + 65)] = 0
            }
            maxOmission[String.fromCharCode(j + 65)] += 1
          } else {
            if (!maxEvenOut[String.fromCharCode(j + 65)]) {
              maxEvenOut[String.fromCharCode(j + 65)] = 0
            }
            maxEvenOut[String.fromCharCode(j + 65)] += 1
          }
        }
        this.blueBallTrend.push(blue)
      }
      console.log(numberOfOccurrences)
      console.log(maxOmission)
      console.log(maxEvenOut)
    },
    /**
     * 获取每期数据
     */
    getUnionLottoData() {
      getUnionLotto().then(res => {
        for (let i = 0; i < res.unionLotto.length; i++) {
          // 判断大小比 - 规则：1-16(为小):17-33(为大)
          let sizeRatio = 0 // 大区间
          if (res.unionLotto[i].red1 >= 17) {
            sizeRatio++
          }
          if (res.unionLotto[i].red2 >= 17) {
            sizeRatio++
          }
          if (res.unionLotto[i].red3 >= 17) {
            sizeRatio++
          }
          if (res.unionLotto[i].red4 >= 17) {
            sizeRatio++
          }
          if (res.unionLotto[i].red5 >= 17) {
            sizeRatio++
          }
          if (res.unionLotto[i].red6 >= 17) {
            sizeRatio++
          }
          res.unionLotto[i].sizeRatio = sizeRatio + ':' + (6 - sizeRatio)
          // 判断区间比 - 规则：1-11:12-22:23-33为三个区间
          let intervalRatioA = 0 // 1-11
          let intervalRatioB = 0 // 12-22
          let intervalRatioC = 0 // 23-33
          if (res.unionLotto[i].red1 >= 23) {
            intervalRatioC++
          } else if (res.unionLotto[i].red1 >= 12) {
            intervalRatioB++
          } else {
            intervalRatioA++
          }
          if (res.unionLotto[i].red2 >= 23) {
            intervalRatioC++
          } else if (res.unionLotto[i].red2 >= 12) {
            intervalRatioB++
          } else {
            intervalRatioA++
          }
          if (res.unionLotto[i].red3 >= 23) {
            intervalRatioC++
          } else if (res.unionLotto[i].red3 >= 12) {
            intervalRatioB++
          } else {
            intervalRatioA++
          }
          if (res.unionLotto[i].red4 >= 23) {
            intervalRatioC++
          } else if (res.unionLotto[i].red4 >= 12) {
            intervalRatioB++
          } else {
            intervalRatioA++
          }
          if (res.unionLotto[i].red5 >= 23) {
            intervalRatioC++
          } else if (res.unionLotto[i].red5 >= 12) {
            intervalRatioB++
          } else {
            intervalRatioA++
          }
          if (res.unionLotto[i].red6 >= 23) {
            intervalRatioC++
          } else if (res.unionLotto[i].red6 >= 12) {
            intervalRatioB++
          } else {
            intervalRatioA++
          }
          res.unionLotto[i].intervalRatio = intervalRatioA + ':' + intervalRatioB + ':' + intervalRatioC
          // 判断奇偶比 - 规则：奇数:偶数
          let parityRatio = 0 // 偶数
          if (res.unionLotto[i].red1 % 2 === 0) {
            parityRatio++
          }
          if (res.unionLotto[i].red2 % 2 === 0) {
            parityRatio++
          }
          if (res.unionLotto[i].red3 % 2 === 0) {
            parityRatio++
          }
          if (res.unionLotto[i].red4 % 2 === 0) {
            parityRatio++
          }
          if (res.unionLotto[i].red5 % 2 === 0) {
            parityRatio++
          }
          if (res.unionLotto[i].red6 % 2 === 0) {
            parityRatio++
          }
          res.unionLotto[i].parityRatio = (6 - parityRatio) + ':' + parityRatio
        }

        this.unionLottos = res.unionLotto

        this.init()
      })
    },
    /**
     * 合并单元格
     * @param row
     * @param column
     * @param rowIndex
     * @param columnIndex
     * @returns {{colspan: number, rowspan: number}}
     */
    mergeCols({ row, column, rowIndex, columnIndex }) {
      if (rowIndex === 3 || rowIndex === 5) {
        if (columnIndex === 0) {
          return {
            rowspan: 2,
            colspan: 1
          }
        }
      } else if (rowIndex === 4 || rowIndex === 6) {
        if (columnIndex === 0) {
          return {
            rowspan: 0,
            colspan: 0
          }
        }
      }
    },
    /**
     * 计算中奖几率
     */
    winningProbabilitys: function() {
      // 格式化彩票号码
      for (let i = 0; i < this.unionLotto.length; i++) {
        this.unionLotto[i] = parseInt(this.unionLotto[i])
        if (!this.unionLotto[i]) {
          this.$message({
            message: '彩票号码只允许为数字，不允许输入其他字符，系统已自动将其特殊字符恢复为默认数字"0"，请键入正确的值。',
            type: 'warning'
          })
          this.unionLotto[i] = 1
        }
      }
      // 存储所有中奖及未中奖数据
      const store = { red1: this.unionLotto[0], red2: this.unionLotto[1], red3: this.unionLotto[2], red4: this.unionLotto[3], red5: this.unionLotto[4], red6: this.unionLotto[5], blue: this.unionLotto[6],
        first: 0, second: 0, third: 0, fourth: 0, fiveth: 0, sixth: 0, noprize: 0 }
      for (let i = 0; i < this.unionLottos.length; i++) {
        const unionLottos = [this.unionLottos[i].red1, this.unionLottos[i].red2, this.unionLottos[i].red3, this.unionLottos[i].red4, this.unionLottos[i].red5, this.unionLottos[i].red6, this.unionLottos[i].blue]
        const redAndBlue = this.existsRedAndBlue(this.unionLotto, unionLottos)
        // 判断中的几等奖
        this.level(redAndBlue, store)
      }
      this.winningLotto.push(store)
    },
    /**
     * 判断红球和蓝球是否存在，并将存在的个数返回
     */
    existsRedAndBlue(unionLotto, unionLottos) {
      let blueKey = 0
      let redKey = 0
      // 先判断蓝球是否存在
      if (unionLotto[6] === parseInt(unionLottos[6])) {
        blueKey = 1
      }
      // 判断红球是否存在
      for (let j = 0; j < 6; j++) {
        for (let k = 0; k < 6; k++) {
          if (unionLotto[k] === parseInt(unionLottos[j])) {
            redKey++
            break
          }
          // 如果蓝球存在，红球还剩最后两个没有判断时，并且此时红球还一个都没有中时，那就没必要再往后执行了，因为中与不中都是六等奖。
          if (blueKey && j === 4 && redKey === 1) {
            break
          }
        }
      }
      return {
        red: redKey,
        blue: blueKey
      }
    },
    /**
     * 判断当前的级别，并对次数进行增加
     * @param redAndBlue
     * @param store
     */
    level(redAndBlue, store) {
      if (redAndBlue.blue) {
        if (redAndBlue.red === 6) {
          store.first = store.first ? store.first + 1 : 1
        } else if (redAndBlue.red === 5) {
          store.third = store.third ? store.third + 1 : 1
        } else if (redAndBlue.red === 4) {
          store.fourth = store.fourth ? store.fourth + 1 : 1
        } else if (redAndBlue.red === 3) {
          store.fiveth = store.fiveth ? store.fiveth + 1 : 1
        } else {
          store.sixth = store.sixth ? store.sixth + 1 : 1
        }
      } else {
        if (redAndBlue.red === 6) {
          store.second = store.second ? store.second + 1 : 1
        } else if (redAndBlue.red === 5) {
          store.fourth = store.fourth ? store.fourth + 1 : 1
        } else if (redAndBlue.red === 4) {
          store.fiveth = store.fiveth ? store.fiveth + 1 : 1
        } else {
          store.noprize = store.noprize ? store.noprize + 1 : 1
        }
      }
    },
    /**
     * 清空当前中奖几率
     */
    delWinningProbabilitys() {
      this.winningLotto = []
    },
    /**
     * 自动化寻找中奖几率最高的一组双色球
     */
    autoWinningProbabilitys() {
      let index = 1
      const array = []
      console.log('自动化测试开始')
      const t = Date.now()
      for (let j = 0; j < 50000; j++) {
        console.log('次数：' + index)
        const a = this.randomGeneration()
        let b = false
        for (let k = 0; k < array.length; k++) {
          if (array[k] === a) {
            b = true
          }
        }
        if (b) {
          continue
        }
        array.push(a)
        this.unionLotto = a
        this.winningProbabilitys()
        index++
      }
      console.log('共生成' + index + '组数据,耗时' + (Date.now() - t) + 'ms')
      console.log(array)
      if (this.winningLotto.length === 0) {
        this.$message({
          message: '未找到你想要的数据，继续加载中。',
          type: 'warning'
        })
      }
    },
    /**
     * 机选双色球
     */
    machineSelection() {
      this.unionLotto = this.randomGeneration()
      this.winningProbabilitys()
    },
    /**
     * 随机生成双色球
     * @returns {Array} 生成的双色球
     */
    randomGeneration() {
      const doubleChromosphere = []
      for (let i = 0; i < 6; i++) {
        doubleChromosphere[i] = Math.floor(Math.random() * 32 + 1)
      }
      doubleChromosphere[6] = Math.floor(Math.random() * 16 + 1)
      return doubleChromosphere
    }
  }
}
</script>

<style>
.el-input__inner{
     color: blue;
}
.el-input-group__prepend{
    color: red;
  }
</style>
