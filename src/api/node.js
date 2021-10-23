import request from '@/utils/request'
// 路由器心跳接收
export function heartbeat (params) {
  return request({
    url: '/node/heartbeat',
    method: 'get',
    params
  })
}
// ip suggest
export function ipsearch (params) {
  return request({
    url: '/node/ipsearch',
    method: 'get',
    params
  })
}
// 字典值获取
export function dictsearch (params) {
  return request({
    url: '/node/dictsearch',
    method: 'get',
    params
  })
}
// 节点列表获取
export function nodeSearch (params) {
  return request({
    url: '/node/search',
    method: 'get',
    params
  })
}
// 删除节点
export function nodeDel (str) {
  return request({
    url: '/node/del?' + str,
    method: 'get'
  })
}
// 根据节点id查询抓取配置
export function nodeScrawconfig (params) {
  return request({
    url: '/node/scrawconfig/get',
    method: 'get',
    params
  })
}
// 新增或更新抓取配置
export function nodeScrawconfigAdd (data) {
  return request({
    url: '/node/scrawconfig/save',
    method: 'post',
    data
  })
}
// 执行命令
export function nodeExecmd (data) {
  return request({
    url: '/node/execmd',
    method: 'post',
    data
  })
}

// 获取节点文件
export function nodeFileGet (params) {
  return request({
    url: '/node/fileget',
    method: 'get',
    params
  })
}
// 文件下发
export function nodeFiledeliver (data) {
  return request({
    url: '/node/filedeliver',
    method: 'post',
    data
  })
}
// 操作记录
export function nodeOperatelist (params) {
  return request({
    url: '/node/operatelist',
    method: 'get',
    params
  })
}
// 操作详情
export function nodeOperateInfo (params) {
  return request({
    url: '/node/operatedetail',
    method: 'get',
    params
  })
}
