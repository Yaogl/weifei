import request from '@/utils/request'

export function componentList(params) {
  return request({
    url: '/component-pro/list',
    method: 'get',
    params
  })
}

export function componentEdit(id, data) {
  return request({
    url: `/component-pro/edit/${id}`,
    method: 'put',
    data
  })
}
