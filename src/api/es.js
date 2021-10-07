import request from '@/utils/request'
// 开始时间和结束时间不能同时为空 删除
// 点击删除，弹出提示：删除该时间段内的数据后，将无法恢复，请谨慎操作。
export function esDel (params) {
  return request({
    url: '/es/del',
    method: 'get',
    params
  })
}
// 搜索es
export function esSearch (params) {
  return request({
    url: '/es/search',
    method: 'get',
    params
  })
}
