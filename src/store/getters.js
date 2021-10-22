const getters = {
  sidebar: state => state.app.sidebar,
  isFullscreen: state => state.app.isFullscreen,
  device: state => state.app.device,
  userName: state => state.user.userName,
  showNavBar: state => state.app.showNavBar,
  nodeCountryList: state => state.nodes.nodeCountryList,
  nodeFirmwareList: state => state.nodes.nodeFirmwareList,
  nodeCpuList: state => state.nodes.nodeCpuList,
  nodeBrandList: state => state.nodes.nodeBrandList,
  nodeModelList: state => state.nodes.nodeModelList
}
export default getters
