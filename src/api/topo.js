import request from '@/utils/request'
// 获取组件列表
export function getComponentsList(params) {
  return request({
    url: '/components/list',
    method: 'get',
    params
  })
}
// 获取组件编辑options列表
export function getOptionsList(params) {
  return request({
    url: '/component-options/all',
    method: 'get',
    params
  })
}
// 提交到专业组件库
export function componentPro(data) {
  return request({
    url: '/component-pro/add',
    method: 'post',
    data
  })
}
// 获取厂商列表
export function getVendorsList(params) {
  return request({
    url: '/vendors/all',
    method: 'get',
    params
  })
}
// 获取设备列表
export function getDevicesList(params) {
  return request({
    url: '/devices/all',
    method: 'get',
    params
  })
}
// 获取全部固件
export function getFirmwaresList(params) {
  return request({
    url: '/firmwares/all',
    method: 'get',
    params
  })
}
// 获取评估列表
export function getAssessList(params) {
  return request({
    url: '/assess/list',
    method: 'get',
    params
  })
}
// 完成评估
export function finishAssessInfo(id) {
  return request({
    url: `/assess/finish/${id}`,
    method: 'put'
  })
}
// 获取评估详情
export function getAssessInfo(id) {
  return request({
    url: `/assess/get/${id}`,
    method: 'get'
  })
}
// 获取评估详情
export function getSurveyCollectionAssess(id) {
  return request({
    url: `/survey-collection-assess/get/${id}`,
    method: 'get'
  })
}
// 获取问题评估详情
export function getSurveyQuestion(id) {
  return request({
    url: `/survey-collections/get/${id}`,
    method: 'get'
  })
}
// 新增拓扑
export function addNewTopo(data, id) {
  if (id) {
    return request({
      url: `/topologies/edit/${id}`,
      method: 'put',
      data
    })
  }
  return request({
    url: `/topologies/add`,
    method: 'post',
    data
  })
}
// 导出拓扑
export function exportTopo(id) {
  return request({
    url: `/topologies/export/${id}`,
    method: 'post'
  })
}

// 编辑拓扑
export function editTopo(data, id) {
  return request({
    url: `/topologies/edit/${id}`,
    method: 'put',
    data
  })
}
// 编辑拓扑
export function getTopoInfo(id) {
  return request({
    url: `/topologies/get/${id}`,
    method: 'get'
  })
}
// 使用拓扑
// - uri: `/topologies/use/{id}`
// - method:`PUT`
export function useTopo(id) {
  return request({
    url: `/topologies/use/${id}`,
    method: 'put'
  })
}
// - query: `assessId` 评估id
// 查看拓扑列表
export function getTopoList(id) {
  return request({
    url: `/topologies/all`,
    method: 'get',
    params: {
      assessId: id
    }
  })
}
// 删除拓扑
export function deleteTopo(id) {
  return request({
    url: `/topologies/delete/${id}`,
    method: 'delete'
  })
}
// 获取拓扑模板列表
export function getTopoTemplateList() {
  return request({
    // url: `/topology-templates/list`,
    url: `/topology-templates/all`,
    method: 'get'
  })
}
// 获取拓扑模板详情
export function getTopoTemplateInfo(id) {
  return request({
    url: `/topology-templates/get/${id}`,
    method: 'get'
  })
}
// 保存为模板
export function addTopoTemplate(data) {
  return request({
    url: `/topology-templates/add`,
    method: 'post',
    data
  })
}
export const uploadThumbUrl =
  process.env.VUE_APP_BASE_API + '/topology-templates/upload'

// 结合问卷弹窗
// **请求**
// - uri: `/survey-collections/list`
// - method:`GET`
export function getSurveyCollections(params) {
  return request({
    url: `/survey-collections/list`,
    method: 'get',
    params
  })
}
// 结合问卷保存
// **请求**
// - uri: `/assess/link-survey-collection`
// - method:`POST`
// - body: `type:application/json`

// ```
// {
//     "id":123,
//     "surveyId":23242
// }
export function linkSurveyCollection(data) {
  return request({
    url: `/assess/link-survey-collection`,
    method: 'post',
    data
  })
}
//  攻击路径检索
// - uri: `/attack-links/list`
// - method:`GET`
// - query:
//     - topologyId 拓扑id （必传）
//     - nodeStart 起始节点id
//     - nodeEnd 结束节点id
//     - pageSize
//     - page
export function attackLinksList(params) {
  return request({
    url: `/attack-links/list`,
    method: 'get',
    params
  })
}
// 攻击路径详情
// - uri: `/attack-links/get/{ID}/tid/{topologyId}`
// - method:`GET`
export function attackLinksInfo(id, tid) {
  return request({
    url: `/attack-links/get/${id}/tid/${tid}`,
    method: 'get'
  })
}
// 攻击路径统计检索
// - uri: `/attack-links/analyse`
// - method:`GET`
// - query:
//   - topologyId 拓扑 id （必传）
//   - nodeStart
//   - nodeEnd
export function attackLinksAnalyse(params) {
  return request({
    url: `/attack-links/analyse`,
    method: 'get',
    params
  })
}
//  评估结果：异常信息:漏洞
// - uri: `/assess/{id}/vulnerabilities`
// - method:`GET`
export function getVulnerabilities(id) {
  return request({
    url: `/assess/${id}/vulnerabilities`,
    method: 'get'
  })
}
//  评估结果：异常信息:设备
// - uri: `/assess/{id}/devices`
// - method:`GET`
export function getDevicesUnnormal(id) {
  return request({
    url: `/assess/${id}/devices`,
    method: 'get'
  })
}
// 评估结果：改建意见
// - uri: `/assess/{id}/suggestions`
// - method:`GET`
export function getSuggestions(id) {
  return request({
    url: `/assess/${id}/suggestions`,
    method: 'get'
  })
}
// 评估结果：图表-按漏洞
// - uri: `/assess/{id}/analyse-vulnerabilities`
// - method:`GET`
export function getVulnerabilitiesChart(id) {
  return request({
    url: `/assess/${id}/analyse-vulnerabilities`,
    method: 'get'
  })
}
//  评估结果：图表-按安全等级
// - uri: `/assess/{id}/analyse-level`
// - method:`GET`
export function getSafeLevelChart(id) {
  return request({
    url: `/assess/${id}/analyse-level`,
    method: 'get'
  })
}
// 设备与漏洞图
export function getAnalyseTypeChart(id) {
  return request({
    url: `/assess/${id}/analyse-type`,
    method: 'get'
  })
}
export function getHomeVulnerabilities() {
  return request({
    url: `/home-data/top-vulnerabilities`,
    method: 'get'
  })
}
export function getHomeDevices() {
  return request({
    url: `/home-data/top-devices`,
    method: 'get'
  })
}
export function getHomeSecurities() {
  return request({
    url: `/home-data/top-securities`,
    method: 'get'
  })
}
