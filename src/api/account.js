import request from '@/utils/request'

export function userList(params) {
  return request({
    url: '/auth/user-list',
    method: 'get',
    params
  })
}

export function userAdd(data) {
  return request({
    url: '/auth/user-add',
    method: 'post',
    data
  })
}

export function userEdit(id, data) {
  return request({
    url: `/auth/user-edit/${id}`,
    method: 'put',
    data
  })
}

export function userStatus(id, status) {
  return request({
    url: `/auth/user-status/${id}`,
    method: 'put',
    data: { status }
  })
}
