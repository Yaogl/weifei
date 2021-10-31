import request from '@/utils/request'
// { uname, pwd }  登录
export function login (params) {
  return request({
    url: '/home/loginNew',
    method: 'get',
    params
  })
}

// 修改密码
// uname		NO	
// pwd		NO	
// newPwd		NO	
// confirmPwd		NO
export function changepwd (params) {
  return request({
    url: '/home/changepwd',
    method: 'get',
    params
  })
}
// 推出登录
export function logout () {
  return request({
    url: '/home/logout',
    method: 'get'
  })
}
