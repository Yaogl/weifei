const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  showNavBar: state => state.app.showNavBar,
  zoom: state => state.topo.zoom,
  compose: state => state.topo.compose,
  connect: state => state.topo.connect,
  canEdit: state => state.topo.canEdit,
  curSelectCell: state => state.topo.curSelectCell,
  curCellId: state => state.topo.curCellId,
  curCellType: state => state.topo.curCellType,
  topoComponents: state => state.topo.topoComponents,
  topoComOptions: state => state.topo.topoComOptions,
  nextNodeId: state => state.topo.nextNodeId,
  removeVisibile: state => state.topo.removeVisibile,
  permissions: state => state.user.permissions
}
export default getters
