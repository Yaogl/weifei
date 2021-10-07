import request from '@/utils/request'
// 服务器节点列表
export function getServerList (data) {
  return request({
    url: '/server/list',
    method: 'get',
    data
  })
}
// 服务器节点详情
export function getServerDetails (id) {
  return request({
    url: `/server/detail/${id}`,
    method: 'get'
  })
}
// 上传获取文件
export function uploadFileGet (data) {
  return request({
    url: `/file/upload/get`,
    method: 'post',
    data
  })
}
// 上传下发文件
export function uploadFileDeliver (data) {
  return request({
    url: `/file/upload/deliver`,
    method: 'post',
    data
  })
}
// 删除文件
export function uploadFileDel (id) {
  return request({
    url: `/file/del`,
    method: 'get',
    params: { id }
  })
}
// 下载节点文件
export function uploadDownload (id) {
  return request({
    url: `/file/download`,
    method: 'get',
    params: { id }
  })
}
// 获取节点文件列表
export function fileListGet (params) {
  return request({
    url: `/file/list/get`,
    method: 'get',
    params
  })
}
// 获取下发文件列表
export function fileListDeliver (params) {
  return request({
    url: `/file/list/deliver`,
    method: 'get',
    params
  })
}
