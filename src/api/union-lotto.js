import api from '@/utils/request'

// 获取所有福利彩票信息
export function getUnionLotto() {
  return api({
    url: '/unionLotto/get',
    method: 'get'
  })
}

// 获取彩票分析信息
export function getProbability() {
  return api({
    url: '/probability/get',
    method: 'get'
  })
}
