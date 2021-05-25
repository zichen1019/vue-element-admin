<template>
  <div>
    <template>
      <el-card style="margin-bottom: 20px;">
        <el-row type="flex" justify="center">
          <el-col :span="12">
            <el-row type="flex" justify="center">
              <el-col :span="12">
                <el-autocomplete class="input-with-select" :model="listSearch.name" :fetch-suggestions="querySearch" placeholder="搜索网站" :trigger-on-focus="false">
                  <el-select slot="prepend" v-model="listSearch.classify" style="width: 80px;">
                    <el-option label="名称" value="1" />
                    <el-option label="网址" value="2" />
                  </el-select>
                  <el-button slot="append" icon="el-icon-search" />
                </el-autocomplete>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
        <el-row type="flex" justify="center">
          <el-col :span="18">
            <el-divider />
            <el-row type="flex" justify="center" style="margin: 10px auto;">
              <el-col :span="2" :offset="22">
                <el-button v-if="screeningCriteria" size="mini" @click="screeningCriteria = false">
                  收起筛选
                </el-button>
                <el-button v-else size="mini" @click="screeningCriteria = true">
                  展开筛选
                </el-button>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
        <template v-if="screeningCriteria">
          <el-row type="flex" justify="center">
            <el-col :span="18">
              <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item>所有标签</el-breadcrumb-item>
                <el-breadcrumb-item>
                  <el-tag v-for="(tag, index) in tags" :key="index" closable :type="tagColors[index % 5]" :disable-transitions="true" @close="handleClose(tag)">
                    <template v-if="tag.name instanceof Array">
                      {{ tag.name.join('、') }}
                    </template>
                    <template v-else>
                      {{ tag.name }}
                    </template>
                  </el-tag>
                </el-breadcrumb-item>
              </el-breadcrumb>
            </el-col>
          </el-row>
          <screening-criteria v-for="(item, index) in conditionlist" :key="index" :sc-data.sync="item" :tags.sync="tags" />
        </template>
      </el-card>
    </template>
    <template>
      <el-row type="flex" justify="center">
        <el-col :span="18">
          <el-card v-auto-height>
            <el-row v-for="(website, index) in websiteList" :key="index" type="flex" justify="center" :gutter="20">
              <template v-if="index % websiteCols.length === 0">
                <el-col v-for="colIndex in websiteCols" :key="colIndex" :span="4">
                  <template v-if="websiteList[index + colIndex]">
                    <!-- router-link 只能适用于在当前网站基础上打开新的窗口和页面，涉及其他网站的页面时就不能用router-link了，其to属性会默认添加当前网站的根路由 -->
                    <a :href="websiteList[index + colIndex].url" target="_blank">
                      <el-image :src="websiteList[index + colIndex].icon" style="width: 15px; height: 15px" />&emsp;
                      <el-link :underline="false">
                        {{ websiteList[index + colIndex].name }}
                      </el-link>
                    </a>
                  </template>
                </el-col>
              </template>
            </el-row>
          </el-card>
        </el-col>
      </el-row>
    </template>
  </div>
</template>

<script>
import ScreeningCriteria from '@/views/navigation/compoents/screening-criteria'
import { addResizeListener, removeResizeListener } from 'element-ui/src/utils/resize-event'

const doResize = (el) => {
  el.style.height = window.innerHeight - el.getBoundingClientRect().top - el.style.paddingTop - el.style.paddingBottom - el.style.marginTop - el.style.marginBottom + 'px'
}

export default {
  name: 'Navigation',
  components: { ScreeningCriteria },
  directives: {
    autoHeight: {
      // 指令的定义
      bind: function(el) {
        el = el.__vue__.$el
        el.resizeListener = () => {
          doResize(el)
        }
        addResizeListener(window.document.body, el.resizeListener)
      },
      inserted: function(el) {
        el = el.__vue__.$el
        doResize(el)
      },
      unbind: function(el) {
        if (el.__vue__) {
          el = el.__vue__.$el
          removeResizeListener(window.document.body, el.resizeListener)
        }
      }
    }
  },
  data() {
    return {
      listSearch: {
        name: '',
        classify: '1'
      },
      screeningCriteria: true,
      tagColors: ['primary', 'success', 'info', 'warning', 'danger'],
      tags: [
        { name: '标签一' },
        { name: '标签二' },
        { name: '标签三' },
        { name: '标签四' },
        { name: '标签五' },
        { name: '标签六' },
        { name: '标签七' },
        { name: '标签八' },
        { name: '标签九' },
        { name: ['标签十', '标签十一'] }
      ],
      conditionlist: [],
      // 查询出来的数据
      websiteList: [],
      websiteCols: [0, 1, 2, 3, 4],
      list: []
    }
  },
  watch: {
    tags: function() {
      this.getList()
    }
  },
  created() {
    this.getConditionlist()
    this.getWebsiteList()
  },
  methods: {
    /**
     * 查询过滤
     */
    querySearch(queryString, cb) {
      const list = this.list
      const results = queryString ? list.filter(this.createFilter(queryString)) : list
      // 调用 callback 返回建议列表的数据
      cb(results)
    },
    /**
     * 过滤器
     */
    createFilter(queryString) {
      return (item) => {
        return (item.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0)
      }
    },
    /**
     * 获取查询条件
     */
    getConditionlist() {
      this.conditionlist = [
        {
          classification: '编程语言',
          conditions: ['c', 'c#', 'c++', 'java', 'php', 'python', 'javascript', 'go', 'groovy', '1', '2', '3', '4', '5', '6', '7', 8, 9, 10, 11,
            12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40],
          show: true
        },
        {
          classification: 'spring框架',
          conditions: ['springboot', 'springcloud'],
          show: true
        },
        {
          classification: '前端框架',
          conditions: ['Vue', 'Element', 'Bootstrap', 'Echarts', 'ESLint'],
          show: true
        }
      ]
    },
    /**
     * 获取网站数据
     */
    getWebsiteList() {
      this.websiteList = [
        { name: 'Vue', toast: 'Vue', url: 'https://cn.vuejs.org/', icon: 'https://cn.vuejs.org/images/icons/favicon-16x16.png', classification: ['前端框架'], conditions: ['Vue'] },
        { name: 'Element', toast: 'Element', url: 'https://element.eleme.cn/', icon: 'https://element.eleme.cn/favicon.ico', classification: ['前端框架'], conditions: ['Element'] },
        { name: 'Bootstrap', toast: 'Bootstrap', url: 'https://www.bootcss.com/', icon: 'https://cdn.jsdelivr.net/npm/@bootcss/www.bootcss.com@0.0.31/dist/ico/favicon.ico', classification: ['前端框架'], conditions: ['Bootstrap'] },
        { name: 'Echarts', toast: 'Echarts', url: 'https://echarts.apache.org/', icon: 'https://echarts.apache.org/favicon.ico', classification: ['前端框架'], conditions: ['Echarts'] },
        { name: 'ESLint', toast: 'ESLint', url: 'https://eslint.org/', icon: 'https://eslint.org/assets/img/favicon.512x512.png', classification: ['前端框架'], conditions: ['ESLint'] }
      ]
    },
    /**
     * 关闭标签时，显示该分类条件并且在标签数组移除当前标签
     * @param tag
     */
    handleClose(tag) {
      this.conditionlist.forEach(row => {
        if (row.classification === tag.classification) {
          row.show = true
        }
      })
      this.tags.splice(this.tags.indexOf(tag), 1)
    }
  }
}
</script>

<style scoped>
.el-tag + .el-tag {
  margin-left: 10px;
}
.el-breadcrumb__item:first-child {
  margin-top: 7px;
}
.el-divider--horizontal:first-child {
  margin-bottom: 0px;
}
.el-avatar--small {
  width: 20px;
  height: 20px;
}
.el-link.el-link--primary:hover {
  color: #1890ff;
}
</style>
