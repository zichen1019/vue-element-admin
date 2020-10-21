<template>
  <div :id="id" :class="className" :style="{height:height,width:width}" />
</template>

<script>
import echarts from 'echarts'
import resize from './mixins/resize'
import 'echarts/map/js/china'
import { loadBMap } from '@/utils/import-js'
require('echarts/extension/bmap/bmap')

export default {
  mixins: [resize],
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    id: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '200px'
    },
    height: {
      type: String,
      default: '200px'
    }
  },
  data() {
    return {
      chart: null
    }
  },
  mounted() {
    loadBMap('Ug9i9Vo9Uc3MSKE1BCTI3oWrLc4QzPAb').then(_ => {
      this.initChart()
    })
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    async initChart() {
      const time = Date.now()
      this.chart = echarts.init(document.getElementById(this.id))

      const BJData = [
        [{ name: '北京' }, { name: '上海', value: 95 }],
        [{ name: '北京' }, { name: '广州', value: 90 }],
        [{ name: '北京' }, { name: '大连', value: 80 }],
        [{ name: '北京' }, { name: '南宁', value: 70 }],
        [{ name: '北京' }, { name: '南昌', value: 60 }],
        [{ name: '北京' }, { name: '拉萨', value: 50 }],
        [{ name: '北京' }, { name: '长春', value: 40 }],
        [{ name: '北京' }, { name: '包头', value: 30 }],
        [{ name: '北京' }, { name: '重庆', value: 20 }],
        [{ name: '北京' }, { name: '常州', value: 10 }]
      ]

      const SHData = [
        [{ name: '上海' }, { name: '包头', value: 95 }],
        [{ name: '上海' }, { name: '昆明', value: 90 }],
        [{ name: '上海' }, { name: '广州', value: 80 }],
        [{ name: '上海' }, { name: '郑州', value: 70 }],
        [{ name: '上海' }, { name: '长春', value: 60 }],
        [{ name: '上海' }, { name: '重庆', value: 50 }],
        [{ name: '上海' }, { name: '长沙', value: 40 }],
        [{ name: '上海' }, { name: '北京', value: 30 }],
        [{ name: '上海' }, { name: '丹东', value: 20 }],
        [{ name: '上海' }, { name: '大连', value: 10 }]
      ]

      const GZData = [
        [{ name: '广州' }, { name: '福州', value: 95 }],
        [{ name: '广州' }, { name: '太原', value: 90 }],
        [{ name: '广州' }, { name: '长春', value: 80 }],
        [{ name: '广州' }, { name: '重庆', value: 70 }],
        [{ name: '广州' }, { name: '西安', value: 60 }],
        [{ name: '广州' }, { name: '成都', value: 50 }],
        [{ name: '广州' }, { name: '常州', value: 40 }],
        [{ name: '广州' }, { name: '北京', value: 30 }],
        [{ name: '广州' }, { name: '北海', value: 20 }],
        [{ name: '广州' }, { name: '海口', value: 10 }]
      ]

      const planePath = 'path://M1705.06,1318.313v-89.254l-319.9-221.799l0.073-208.063c0.521-84.662-26.629-121.796-63.961-121.491c-37.332-0.305-64.482,36.829-63.961,121.491l0.073,208.063l-319.9,221.799v89.254l330.343-157.288l12.238,241.308l-134.449,92.931l0.531,42.034l175.125-42.917l175.125,42.917l0.531-42.034l-134.449-92.931l12.238-241.308L1705.06,1318.313z'

      // 创建地址解析器实例
      // eslint-disable-next-line no-undef
      var myGeo = new BMap.Geocoder()

      // 添加百度地图插件bmp，获得地图对象，获取到的百度地图对象适用于所有的百度地图的接口。
      // eslint-disable-next-line no-undef
      const getPoint = async function(address) {
        // 将地址解析结果显示在地图上,并调整地图视野
        let res = []
        await new Promise((resolve, reject) => {
          myGeo.getPoint(address, function(point) {
            if (point) {
              resolve([point.lng, point.lat])
            } else {
              console.log(address + '没有匹配到结果!')
            }
          }, '中国')
        }).then(point => {
          res = point
        })
        return res
      }

      const convertData = async function(data) {
        const res = []
        for (let i = 0; i < data.length; i++) {
          const dataItem = data[i]
          const fromCoord = await getPoint(dataItem[0].name)
          const toCoord = await getPoint(dataItem[1].name)
          if (fromCoord && toCoord) {
            res.push([{
              coord: fromCoord
            }, {
              coord: toCoord
            }])
          }
        }
        return res
      }

      const convertData2 = async function(data) {
        const res = []
        for (const dataItem of data) {
          const point = await getPoint(dataItem[1].name)
          res.push({
            name: dataItem[1].name,
            value: point.concat([dataItem[1].value])
          })
        }
        return res
      }

      const color = ['#a6c84c', '#ffa022', '#46bee9']
      const series = []
      const cityDataArr = [['北京', BJData], ['上海', SHData], ['广州', GZData]]
      for (const item of cityDataArr) {
        const i = cityDataArr.indexOf(item)
        const linesData = await convertData(item[1])
        series.push({
          name: item[0] + ' Top10',
          type: 'lines',
          coordinateSystem: 'bmap',
          zlevel: 1,
          effect: {
            show: true,
            period: 6,
            trailLength: 0.7,
            color: color[i],
            symbolSize: 3
          },
          lineStyle: {
            normal: {
              color: color[i],
              width: 0,
              curveness: 0.2
            }
          },
          data: linesData
        },
        {
          name: item[0] + ' Top10',
          type: 'lines',
          coordinateSystem: 'bmap',
          zlevel: 2,
          effect: {
            show: true,
            period: 6,
            trailLength: 0,
            symbol: planePath,
            symbolSize: 15
          },
          lineStyle: {
            normal: {
              color: color[i],
              width: 1,
              opacity: 0.4,
              curveness: 0.2
            }
          },
          data: linesData
        },
        {
          name: item[0] + ' Top10',
          type: 'effectScatter',
          coordinateSystem: 'bmap',
          zlevel: 2,
          rippleEffect: {
            brushType: 'stroke'
          },
          label: {
            show: true,
            position: 'right',
            formatter: ''
          },
          symbolSize: function(val) {
            return val[2] / 8
          },
          itemStyle: {
            normal: {
              color: color[i]
            }
          },
          tooltip: {
            formatter: (params) => {
              return params.seriesName + '<br>' + params.name + ': ' + params.value[2]
            }
          },
          data: await convertData2(item[1])
        })
      }
      this.chart.setOption({
        title: {
          text: '模拟迁徙',
          subtext: '数据纯属虚构',
          left: 'center',
          textStyle: {
            color: '#000'
          }
        },
        tooltip: {
          trigger: 'item'
        },
        legend: {
          orient: 'vertical',
          top: 'bottom',
          left: 'right',
          data: ['北京 Top10', '上海 Top10', '广州 Top10'],
          textStyle: {
            color: '#fff'
          },
          selectedMode: 'single'
        },
        bmap: {
          nameMap: {
            'China': '中国'
          },
          roam: true, // 用户是否可以拖放和缩放地图
          opt: {
            enableMapClick: false // 禁止地图底图的点击事件
          }
        },
        animation: false, // 关闭动画效果，这样在地图上覆盖散点图或者热力图的时候，拖动将不会有比较长时间的延迟
        series: series
      })
      console.log('耗时: ' + (Date.now() - time))
    }
  }
}
</script>
