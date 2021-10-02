import request from '@/utils/request'

export function getCompanys(data) {
  return request({
    url: '/companies/list',
    method: 'get',
    params: data
  })
}

export function getCompany(id) {
  return request({
    url: `/companies/get/${id}`,
    method: 'get'
  })
}

export function editCompany(id, data) {
  return request({
    url: `/companies/edit/${id}`,
    method: 'put',
    data
  })
}
