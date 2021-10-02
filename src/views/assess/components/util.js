import store from '@/store'
const IMGURL = process.env.VUE_APP_IMAGE_URL

export const getTopoNodes = (nodesData, layout) => {
  const compList = store.getters.topoComponents

  if (layout) {
    const model = {
      nodes: nodesData.map(item => {
        item.data.net = item.net || [
          { ip: '', mac: '', gateway: '', netmask: '' }
        ]
        item.net = item.data.net
        const display_type = item.display_type || item.display_type
        const imgItem = compList.find(comp => display_type === comp.display_type)
        if (item.type === 'ics_device') {
          return {
            shape: 'cust-html',
            id: item.id.toString(),
            data: item,
            html() {
              const wrap = document.createElement('div')
              wrap.innerHTML = `<img src="${IMGURL + imgItem &&
                imgItem.icon}" style="width: 40px;height: 40px;" />`
              return wrap
            }
          }
        }
        return {
          shape: 'image-rect',
          id: item.id.toString(),
          data: item,
          attrs: {
            title: {
              text: item.label
            },
            text: {
              text: `${item.id}链路占比 (${item.percent}%)`
            },
            image: {
              'xlink:href': imgItem && imgItem.icon && IMGURL + imgItem.icon
            }
          }
        }
      }),
      edges: []
    }
    nodesData.map(item => {
      if (item.child_nodes) {
        item.child_nodes.map(child => {
          model.edges.push({
            source: item.id.toString(),
            target: child.id.toString(),
            vertices: child.vertices || [],
            attrs: {
              line: {
                stroke: '#000',
                targetMarker:
                  child.direction === 'up/down' || child.direction === 'up'
                    ? 'classic'
                    : null,
                sourceMarker: child.direction === 'down' ? 'classic' : null,
                strokeDasharray: child.type === '2' ? 5 : null
              }
            },
            router: {
              name: child.connector === '1' ? null : 'manhattan'
            },
            connector: child.connector === '3' ? 'curve' : null
          })
        })
      }
    })
    return model
  } else {
    const data = {
      cells: []
    }
    nodesData.map(item => {
      item.data.net = item.net || [
        { ip: '', mac: '', gateway: '', netmask: '' }
      ]
      const display_type = item.display_type
      const imgItem = compList.find(comp => display_type === comp.display_type)
      item.net = item.data.net
      const { position } = item
      if (item.type === 'ics_device') {
        data.cells.push({
          id: item.id.toString(),
          shape: 'cust-html',
          data: item,
          position,
          html() {
            const wrap = document.createElement('div')
            wrap.innerHTML = `<img src="${IMGURL + imgItem &&
              imgItem.icon}" style="width: 40px;height: 40px;" />`
            return wrap
          }
        })
      } else {
        data.cells.push({
          shape: 'image-rect',
          id: item.id.toString(),
          data: item,
          position,
          attrs: {
            title: {
              text: item.label
            },
            text: {
              text: `${item.id}链路占比 (${item.percent}%)`
            },
            image: {
              'xlink:href': imgItem && imgItem.icon && IMGURL + imgItem.icon
            }
          }
        })
      }
    })
    nodesData.map(item => {
      if (item.child_nodes) {
        item.child_nodes.map(child => {
          data.cells.push({
            shape: 'edge',
            source: {
              cell: item.id.toString(),
              port: child.sourcePort || ''
            },
            target: {
              cell: child.id.toString(),
              port: child.targetPort || ''
            },
            vertices: child.vertices || [],
            attrs: {
              line: {
                stroke: '#000',
                targetMarker:
                  child.direction === 'up/down' || child.direction === 'up'
                    ? 'classic'
                    : null,
                sourceMarker: child.direction === 'down' ? 'classic' : null,
                strokeDasharray: child.type === '2' ? 5 : null
              }
            },
            router: {
              name: child.connector === '1' ? null : 'manhattan'
            },
            connector: child.connector === '3' ? 'curve' : null
          })
        })
      }
    })
    return data
  }
}
