<template>
  <div :id="id" :class="className" :style="{height:height,width:width}" />
</template>

<script>
import echarts from 'echarts'
import resize from './mixins/resize'
import 'echarts/map/js/china'
import chinaJson from 'echarts/map/json/china-cities.json'

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
    this.initChart()
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    initChart() {
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

      const getCp = function(cityName) {
        const citys = chinaJson.features.filter(city => city.properties.name === cityName)
        if (citys.length > 1) {
          console.log(cityName + '获取经纬度时，查找到多个地市：' + citys.map(city => city.properties.name).join(','))
        } else if (!citys.length) {
          return []
        }
        return citys[0].properties.cp
      }

      const convertData = function(data) {
        const res = []
        for (let i = 0; i < data.length; i++) {
          const dataItem = data[i]
          const fromCoord = getCp(dataItem[0].name)
          const toCoord = getCp(dataItem[1].name)
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

      const color = ['#a6c84c', '#ffa022', '#46bee9']
      const series = [];
      [['北京', BJData], ['上海', SHData], ['广州', GZData]].forEach(function(item, i) {
        series.push({
          name: item[0] + ' Top10',
          type: 'lines',
          zlevel: 1,
          effect: {
            show: true,
            period: 6,
            trailLength: 0.7,
            color: '#fff',
            symbolSize: 3
          },
          lineStyle: {
            normal: {
              color: color[i],
              width: 0,
              curveness: 0.2
            }
          },
          data: convertData(item[1])
        },
        {
          name: item[0] + ' Top10',
          type: 'lines',
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
          data: convertData(item[1])
        },
        {
          name: item[0] + ' Top10',
          type: 'effectScatter',
          coordinateSystem: 'geo',
          zlevel: 2,
          rippleEffect: {
            brushType: 'stroke'
          },
          label: {
            show: true,
            position: 'right',
            formatter: '{b}'
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
          data: item[1].map(function(dataItem) {
            return {
              name: dataItem[1].name,
              value: getCp(dataItem[1].name).concat([dataItem[1].value])
            }
          })
        },
        {
          type: 'scatter',
          coordinateSystem: 'geo',
          zlevel: 2,
          rippleEffect: {
            period: 4,
            brushType: 'stroke',
            scale: 4
          },
          label: {
            normal: {
              show: true,
              position: 'right',
              offset: [5, 0],
              color: '#0f0',
              formatter: '{b}',
              textStyle: {
                color: '#0f0'
              }
            },
            emphasis: {
              show: true,
              color: '#f60'
            }
          },
          symbol: 'pin',
          symbolSize: 20,
          data: [{
            name: item[0],
            value: getCp(item[0])
          }]
        })
      })
      this.chart.setOption({
        backgroundColor: '#404a59',
        title: {
          text: '模拟迁徙',
          subtext: '数据纯属虚构',
          left: 'center',
          textStyle: {
            color: '#fff'
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
        geo: {
          map: 'china',
          label: {
            show: false
          },
          roam: true,
          itemStyle: {
            areaColor: '#323c48',
            borderColor: '#404a59'
          },
          emphasis: {
            label: {
              show: true,
              color: '#FFFF00'
            },
            itemStyle: {
              areaColor: '#2a333d'
            }
          }
        },
        series: series
      })
    }
  }
}
</script>
