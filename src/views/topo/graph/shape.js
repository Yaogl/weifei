import { Graph, Path } from '@antv/x6'
const commonNodeInfo = {
  ports: {
    groups: {
      top: {
        position: [100, 5],
        attrs: {
          circle: {
            r: 5,
            magnet: true,
            stroke: '#5F95FF',
            strokeWidth: 2,
            fill: '#fff',
            style: {
              visibility: 'hidden'
            }
          }
        }
      },
      right: {
        position: [195, 25],
        attrs: {
          circle: {
            r: 5,
            magnet: true,
            stroke: '#5F95FF',
            strokeWidth: 2,
            fill: '#fff',
            style: {
              visibility: 'hidden'
            }
          }
        }
      },
      bottom: {
        position: [100, 45],
        attrs: {
          circle: {
            r: 5,
            magnet: true,
            stroke: '#5F95FF',
            strokeWidth: 2,
            fill: '#fff',
            style: {
              visibility: 'hidden'
            }
          }
        }
      },
      left: {
        position: [5, 25],
        attrs: {
          circle: {
            r: 5,
            magnet: true,
            stroke: '#5F95FF',
            strokeWidth: 2,
            fill: '#fff',
            style: {
              visibility: 'hidden'
            }
          }
        }
      }
    },
    items: [
      {
        group: 'top',
        id: 'top-port'
      },
      {
        group: 'right',
        id: 'right-port'
      },
      {
        group: 'bottom',
        id: 'bottom-port'
      },
      {
        group: 'left',
        id: 'left-port'
      }
    ]
  }
}
const ErrorImageRect = Graph.registerNode('error-image-rect', {
  inherit: 'rect',
  width: 200,
  height: 50,
  id: '',
  attrs: {
    body: {
      stroke: 'rgba(201, 27, 25, 1)',
      strokeWidth: 2,
      rx: 2,
      ry: 2,
      fill: 'transparent'
    },
    image: {
      'xlink:href':
        'https://gw.alipayobjects.com/zos/antfincdn/FLrTNDvlna/antv.png',
      'width': 25,
      'height': 31,
      'z': 1000,
      'refX': 12,
      'refY': 12
    },
    wrap: {
      stroke: 'transparent',
      strokeWidth: 1,
      width: 194,
      height: 44,
      fill: 'rgba(201, 27, 25, 0.6)',
      x: 3,
      y: 3,
      rx: 2,
      ry: 2
    },
    title: {
      'text': '',
      'refX': 50,
      'refY': 12,
      'fill': '#E3E3E3',
      'fontSize': 14,
      'text-anchor': 'start'
    },
    text: {
      'text': '',
      'refX': 50,
      'refY': 36,
      'fontSize': 12,
      'fill': '#E3E3E3',
      'text-anchor': 'start'
    }
  },
  markup: [
    {
      tagName: 'rect',
      selector: 'body'
    },
    {
      tagName: 'rect',
      selector: 'wrap'
    },
    {
      tagName: 'rect',
      selector: 'imageWrap'
    },
    {
      tagName: 'image',
      selector: 'image'
    },
    {
      tagName: 'text',
      selector: 'title'
    },
    {
      tagName: 'text',
      selector: 'text'
    }
  ],
  ...commonNodeInfo
})
const DarkImageRect = Graph.registerNode('dark-image-rect', {
  inherit: 'rect',
  width: 200,
  height: 50,
  id: '',
  attrs: {
    body: {
      stroke: '#44485C',
      strokeWidth: 2,
      rx: 2,
      ry: 2,
      fill: 'transparent'
    },
    image: {
      'xlink:href':
        'https://gw.alipayobjects.com/zos/antfincdn/FLrTNDvlna/antv.png',
      'width': 25,
      'height': 31,
      'z': 1000,
      'refX': 12,
      'refY': 12
    },
    imageWrap: {
      stroke: 'transparent',
      strokeWidth: 1,
      width: 44,
      height: 44,
      fill: '#2A83EF',
      x: 3,
      y: 3,
      rx: 2,
      ry: 2
    },
    wrap: {
      stroke: 'transparent',
      strokeWidth: 1,
      width: 194,
      height: 44,
      fill: '#3B3E51',
      x: 3,
      y: 3,
      rx: 2,
      ry: 2
    },
    title: {
      'text': '',
      'refX': 50,
      'refY': 12,
      'fill': '#E3E3E3',
      'fontSize': 14,
      'text-anchor': 'start'
    },
    text: {
      'text': '',
      'refX': 50,
      'refY': 36,
      'fontSize': 12,
      'fill': '#E3E3E3',
      'text-anchor': 'start'
    }
  },
  markup: [
    {
      tagName: 'rect',
      selector: 'body'
    },
    {
      tagName: 'rect',
      selector: 'wrap'
    },
    {
      tagName: 'rect',
      selector: 'imageWrap'
    },
    {
      tagName: 'image',
      selector: 'image'
    },
    {
      tagName: 'text',
      selector: 'title'
    },
    {
      tagName: 'text',
      selector: 'text'
    }
  ],
  ...commonNodeInfo
})
const CustHtml = Graph.registerNode('cust-html', {
  width: 40,
  height: 40,
  inherit: 'html',
  id: '',
  html() {
    const wrap = document.createElement('div')
    wrap.innerHTML = `
      <i class="iconfont" style="font-size: 40px;">
        &#xeb99;
      </i>`
    return wrap
  },
  ports: {
    groups: {
      top: {
        position: [20, 8],
        attrs: {
          circle: {
            r: 5,
            magnet: true,
            stroke: '#5F95FF',
            strokeWidth: 2,
            fill: '#fff',
            style: {
              visibility: 'hidden'
            }
          }
        }
      },
      right: {
        position: [32, 20],
        attrs: {
          circle: {
            r: 5,
            magnet: true,
            stroke: '#5F95FF',
            strokeWidth: 2,
            fill: '#fff',
            style: {
              visibility: 'hidden'
            }
          }
        }
      },
      bottom: {
        position: [20, 32],
        attrs: {
          circle: {
            r: 5,
            magnet: true,
            stroke: '#5F95FF',
            strokeWidth: 2,
            fill: '#fff',
            style: {
              visibility: 'hidden'
            }
          }
        }
      },
      left: {
        position: [8, 20],
        attrs: {
          circle: {
            r: 5,
            magnet: true,
            stroke: '#5F95FF',
            strokeWidth: 2,
            fill: '#fff',
            style: {
              visibility: 'hidden'
            }
          }
        }
      }
    },
    items: [
      {
        group: 'top'
      },
      {
        group: 'right'
      },
      {
        group: 'bottom'
      },
      {
        group: 'left'
      }
    ]
  }
})

const ImageRect = Graph.registerNode('image-rect', {
  inherit: 'rect',
  width: 200,
  height: 50,
  id: '',
  attrs: {
    body: {
      stroke: 'rgba(230, 234, 237, 1)',
      strokeWidth: 1,
      rx: 2,
      ry: 2,
      fill: '#fff'
    },
    image: {
      'xlink:href':
        'https://gw.alipayobjects.com/zos/antfincdn/FLrTNDvlna/antv.png',
      'width': 25,
      'height': 31,
      'z': 1000,
      'refX': 12,
      'refY': 12
    },
    imageWrap: {
      stroke: 'rgba(230, 234, 237, 1)',
      strokeWidth: 1,
      width: 44,
      height: 44,
      fill: '#E1E5EC',
      x: 3,
      y: 3,
      rx: 200,
      ry: 2
    },
    shadow: {
      stroke: 'transparent',
      width: 243,
      height: 91,
      fill: 'transparent',
      x: -20,
      y: -20,
      rx: 2,
      z: 100,
      ry: 2
    },
    wrap: {
      stroke: 'rgba(230, 234, 237, 1)',
      strokeWidth: 1,
      width: 194,
      height: 44,
      fill: 'transparent',
      x: 3,
      y: 3,
      rx: 2,
      ry: 2
    },
    title: {
      'text': 'Node',
      'refX': 50,
      'refY': 12,
      'fill': 'rgba(32, 32, 32, 1)',
      'fontSize': 14,
      'text-anchor': 'start'
    },
    text: {
      'text': '',
      'refX': 50,
      'refY': 36,
      'fontSize': 12,
      'fill': 'rgba(32, 32, 32, 1)',
      'text-anchor': 'start'
    }
  },
  markup: [
    {
      tagName: 'rect',
      selector: 'body'
    },
    {
      tagName: 'rect',
      selector: 'wrap'
    },
    {
      tagName: 'rect',
      selector: 'imageWrap'
    },
    {
      tagName: 'rect',
      selector: 'shadow'
    },
    {
      tagName: 'image',
      selector: 'image'
    },
    {
      tagName: 'text',
      selector: 'title'
    },
    {
      tagName: 'text',
      selector: 'text'
    }
  ],
  ...commonNodeInfo
})
Graph.registerConnector(
  'curve',
  (sourcePoint, targetPoint) => {
    const path = new Path()
    path.appendSegment(Path.createSegment('M', sourcePoint))
    path.appendSegment(
      Path.createSegment(
        'C',
        sourcePoint.x + 90,
        sourcePoint.y,
        targetPoint.x - 90,
        targetPoint.y,
        targetPoint.x,
        targetPoint.y
      )
    )
    return path.serialize()
  },
  true
)

export { ImageRect, ErrorImageRect, DarkImageRect, CustHtml }
