import request from '@/utils/request'
// 协议统计
export function protocalStatic (params) {
  return request({
    url: '/home/stat/protocal',
    method: 'get',
    params
  })
}
// 全球统计
export function globalStatic () {
  return request({
    url: '/home/stat/global',
    method: 'get'
  })
}
// 活跃统计
export function activeStatic (params) {
  return request({
    url: '/home/stat/active',
    method: 'get',
    params
  })
}
// 国家活跃统计
export function countryStatic (params) {
  return request({
    url: '/home/stat/country',
    method: 'get',
    params
  })
}
// 域名统计 top10
export function domainTop (params) {
  return request({
    url: '/home/stat/domain',
    method: 'get',
    params
  })
}
// 品牌统计 top20+其他
export function brandTop (params) {
  return request({
    url: '/home/stat/brand',
    method: 'get',
    params
  })
}
