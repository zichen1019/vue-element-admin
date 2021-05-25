<template>
  <div v-if="scData.show">
    <el-row type="flex" justify="center" :gutter="10" style="margin-top: 10px;">
      <el-col :span="2" style="padding-top: 7px;">
        <div class="grid-content bg-purple">
          <b>
            {{ scData.classification }}：
          </b>
        </div>
      </el-col>
      <el-col :span="14" style="padding-top: 7px;">
        <el-checkbox-group v-model="multipleChoice">
          <div :class="showAllConditions && scData.conditions.length / columns.length > 5 ? 'manyConditions' : 'oneConditions'">
            <el-row v-for="(item, index) in scData.conditions" :key="index" :gutter="10" style="margin-top: 1px;">
              <template v-if="index % columns.length === 0 && (showAllConditions || index === 0)">
                <el-col v-for="column in columns" :key="column" :span="3">
                  <template v-if="scData.conditions[index + column]">
                    <template v-if="(scData.conditions[index + column]).length > 15">
                      <el-tooltip class="item" effect="dark" :content="scData.conditions[index + column]" placement="top">
                        <el-checkbox v-if="showMultipleChoice" :label="(scData.conditions[index + column]).substring(0, 15) + '...'" />
                        <el-link v-else type="primary" :underline="false" @click="checkOne(scData.conditions[index + column])">
                          {{ (scData.conditions[index + column]).substring(0, 15) }}....
                        </el-link>
                      </el-tooltip>
                    </template>
                    <template v-else>
                      <el-checkbox v-if="showMultipleChoice" :label="scData.conditions[index + column]" />
                      <el-link v-else type="primary" :underline="false" @click="checkOne(scData.conditions[index + column])">
                        {{ scData.conditions[index + column] }}
                      </el-link>
                    </template>
                  </template>
                </el-col>
              </template>
            </el-row>
          </div>
        </el-checkbox-group>
        <el-row v-if="showMultipleChoice" type="flex" justify="center" :gutter="10" style="margin-top: 10px;">
          <el-col :span="6">
            <el-button size="mini" @click="commitMoreChoice">
              确定
            </el-button>
            <el-button size="mini" @click="hiddenMoreChoice">
              取消
            </el-button>
          </el-col>
        </el-row>
      </el-col>
      <el-col :span="2">
        <template v-if="!showMultipleChoice">
          <el-button size="mini" @click="showMoreChoice">
            多选
          </el-button>
          <template v-if="scData.conditions.length > columns.length">
            <el-button v-if="showAllConditions" size="mini" @click="hiddenMoreConditions">
              收起
            </el-button>
            <el-button v-else size="mini" @click="showMoreConditions">
              更多
            </el-button>
          </template>
        </template>
      </el-col>
    </el-row>
    <el-row type="flex" justify="center">
      <el-col :span="18">
        <el-divider />
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'ScreeningCriteria',
  props: {
    /**
     * 分类对象
     * [{ classification: '语言', conditions: ['c'], show: true }]
     */
    scData: {
      type: Object,
      required: true
    },
    /**
     * 选中的标签数组
     */
    tags: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      // 展示所有条件
      showAllConditions: false,
      // 展示标签的列
      columns: [0, 1, 2, 3, 4, 5, 6, 7],
      // 展示所有多选
      showMultipleChoice: false,
      // 多选数组
      multipleChoice: []
    }
  },
  methods: {
    /**
     * 显示该分类下的所有条件
     */
    showMoreConditions() {
      this.showAllConditions = true
    },
    /**
     * 只显示一行条件
     */
    hiddenMoreConditions() {
      this.showAllConditions = false
    },
    /**
     * 选中标签时关闭展示全部条件并且关闭该分类的显示
     * @param tag
     */
    checkOne(tag) {
      this.scData.show = false
      this.hiddenMoreConditions()
      this.tags.push({
        name: tag,
        classification: this.scData.classification
      })
    },
    showMoreChoice() {
      this.showMoreConditions()
      this.showMultipleChoice = true
      this.multipleChoice.length = 0
    },
    hiddenMoreChoice() {
      this.hiddenMoreConditions()
      this.showMultipleChoice = false
      this.multipleChoice.length = 0
    },
    commitMoreChoice() {
      if (this.multipleChoice.length) {
        this.tags.push({
          name: this.multipleChoice.slice(),
          classification: this.scData.classification
        })
      }
      this.scData.show = false
      this.hiddenMoreChoice()
      this.hiddenMoreConditions()
    }
  }
}
</script>

<style scoped>
.el-divider--horizontal {
  margin: 5px auto;
}
.oneConditions {
  height: 20px;
}
.manyConditions {
  height: 125px;
  overflow-x: hidden;
}
</style>
