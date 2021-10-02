import request from '@/utils/request'

export function getAllPermission() {
  return request({
    url: '/auth/permissions',
    method: 'get'
  })
}

export function addRole(data) {
  return request({
    url: '/auth/role-add',
    method: 'post',
    data
  })
}

export function delRole(id) {
  return request({
    url: `/auth/role-del/${id}`,
    method: 'delete'
  })
}

export function getRoles(data) {
  return request({
    url: '/auth/role-list',
    method: 'get',
    params: data
  })
}

export function editRole(roleId, data) {
  return request({
    url: `/auth/role-edit/${roleId}`,
    method: 'put',
    data
  })
}

export function getPermissionsByRoleId(roleId) {
  return request({
    url: `/auth/role-info/${roleId}`,
    method: 'get'
  })
}
