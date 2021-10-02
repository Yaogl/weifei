# 拓扑和评估

## 评估列表

**请求**

- uri: `/assess/list`
- method:`GET`
- query:
  - `companyName` 公司名称
  - `status` 评估状态
  - `safeLevel` 安全级别
  - `surveyId` 关联问卷
  - `timeStart` 评估时间开始
  - `timeEnd` 评估时间结束
  - `pageSize`
  - `page`

## 评估详情

**请求**

- uri: `/assess/get/{id}`
- method:`GET`

`测试可以用id：27`

**返回**

- attackLinkCount : 节点攻击数
- totalLinks ：总攻击路径数
- assessDetail：评估详情

```
{
    "nodeAttackCount": {
        "1": 37,
        "2": 37,
        "3": 37,
        "4": 9,
        "5": 15,
        "6": 21,
        "7": 25,
        "8": 3,
        "9": 6,
        "10": 3,
        "11": 15,
        "12": 18,
        "13": 18,
        "14": 15,
        "15": 21,
        "16": 15,
        "17": 21,
        "18": 28,
        "19": 3,
        "20": 3,
        "21": 3,
        "22": 3,
        "23": 3,
        "25": 3,
        "26": 3,
        "27": 3
    },
    "attackLinkCount": [
        {
            "attackPercent": 0,
            "nodeStart": 2,
            "nodeEnd": 1
        },
        {
            "attackPercent": 0,
            "nodeStart": 3,
            "nodeEnd": 2
        },
        {
            "attackPercent": 0,
            "nodeStart": 7,
            "nodeEnd": 3
        },
        {
            "attackPercent": 0,
            "nodeStart": 6,
            "nodeEnd": 3
        },
        {
            "attackPercent": 0,
            "nodeStart": 5,
            "nodeEnd": 3
        },
        {
            "attackPercent": 0,
            "nodeStart": 4,
            "nodeEnd": 3
        },
        {
            "attackPercent": 0,
            "nodeStart": 25,
            "nodeEnd": 4
        },
        {
            "attackPercent": 0,
            "nodeStart": 26,
            "nodeEnd": 4
        },
        {
            "attackPercent": 0,
            "nodeStart": 27,
            "nodeEnd": 4
        },
        {
            "attackPercent": 0,
            "nodeStart": 19,
            "nodeEnd": 5
        },
        {
            "attackPercent": 0,
            "nodeStart": 20,
            "nodeEnd": 5
        },
        {
            "attackPercent": 0,
            "nodeStart": 21,
            "nodeEnd": 5
        },
        {
            "attackPercent": 0,
            "nodeStart": 22,
            "nodeEnd": 5
        },
        {
            "attackPercent": 0,
            "nodeStart": 23,
            "nodeEnd": 5
        },
        {
            "attackPercent": 0,
            "nodeStart": 24,
            "nodeEnd": 5
        },
        {
            "attackPercent": 0,
            "nodeStart": 15,
            "nodeEnd": 6
        },
        {
            "attackPercent": 0,
            "nodeStart": 16,
            "nodeEnd": 6
        },
        {
            "attackPercent": 0,
            "nodeStart": 17,
            "nodeEnd": 6
        },
        {
            "attackPercent": 6,
            "nodeStart": 18,
            "nodeEnd": 6
        },
        {
            "attackPercent": 0,
            "nodeStart": 8,
            "nodeEnd": 7
        },
        {
            "attackPercent": 0,
            "nodeStart": 9,
            "nodeEnd": 7
        },
        {
            "attackPercent": 0,
            "nodeStart": 10,
            "nodeEnd": 7
        },
        {
            "attackPercent": 0,
            "nodeStart": 11,
            "nodeEnd": 7
        },
        {
            "attackPercent": 3,
            "nodeStart": 12,
            "nodeEnd": 7
        },
        {
            "attackPercent": 0,
            "nodeStart": 13,
            "nodeEnd": 12
        },
        {
            "attackPercent": 3,
            "nodeStart": 14,
            "nodeEnd": 12
        }
    ],
    "assessDetail": {
        "id": 27,
        "companyId": 35,
        "companyName": "测试公司35",
        "status": 2,
        "createtime": "2021-05-27T13:49:43.194+00:00",
        "updatetime": null,
        "topologyStatus": 1,
        "surveyStatus": 0,
        "attackLinks": null,
        "safeLevel": null,
        "assessTime": null,
        "vulnerabilityNum": null,
        "score": null,
        "surveyId": 32,
        "topologyId": 30
    },
    "attackLinkTotal": 32
}
```

## 评估结果：异常信息:漏洞

**请求**

- uri: `/assess/{id}/vulnerabilities`
- method:`GET`

`测试可以用id：27`

## 评估结果：异常信息:设备

**请求**

- uri: `/assess/{id}/devices`
- method:`GET`

`测试可以用id：27`

## 评估结果：按设备类型统计

**请求**

- uri: `/assess/{id}/analyse-type`
- method:`GET`

`测试可以用id：27`

```
{
        "assessVulnerability": [
            {
                "sum": 49,
                "type": "computer"
            },
            {
                "sum": 3,
                "type": "firewall"
            },
            {
                "sum": 28,
                "type": "plc"
            },
            {
                "sum": 6,
                "type": "router"
            },
            {
                "sum": 18,
                "type": "switch"
            }
        ],
        "topologyNode": [
            {
                "count": 12,
                "type": "computer"
            },
            {
                "count": 1,
                "type": "firewall"
            },
            {
                "count": 7,
                "type": "plc"
            },
            {
                "count": 2,
                "type": "router"
            },
            {
                "count": 5,
                "type": "switch"
            }
        ]
    }
}
```

## 评估结果：改建意见

- uri: `/assess/{id}/suggestions`
- method:`GET`

`测试可以用id：27`

**返回**

```
[
    {
        "id": 2,
        "type": "标题",
        "text": "建议企业结合自身情况,对已制订的工控安全事件应急晌应预案进行定期演练,及时发现不足,并在必要时对应急响应预案进行修订。",
        "assessId": 27
    },
    {
        "id": 3,
        "type": "操作系统",
        "text": "建议企业建立工业控制系统资产清单,明确资产责任人以及资产使用与处置规则。",
        "assessId": 27
    }
]
```

## 评估结果：图表-按漏洞

- uri: `/assess/{id}/analyse-vulnerabilities`
- method:`GET`

`测试可以用id：27`

**返回**

```
[
    {
        "vulnerability_type": "通用型漏洞",
        "count": 3
    },
    {
        "vulnerability_type": "授权问题",
        "count": 2
    },
    {
        "vulnerability_type": "缓冲区溢出",
        "count": 1
    },
    {
        "vulnerability_type": "信息泄露",
        "count": 1
    },
    {
        "vulnerability_type": "资料不足",
        "count": 1
    },
    {
        "vulnerability_type": "输入验证",
        "count": 1
    }
]
```

## 评估结果：图表-按安全等级

- uri: `/assess/{id}/analyse-level`
- method:`GET`

`测试可以用id：27`

**返回**

```
 [
    {
        "danger_level": "中",
        "count": 6
    },
    {
        "danger_level": "高",
        "count": 2
    },
    {
        "danger_level": "低",
        "count": 1
    }
]
```

## 攻击路径检索

**请求**

- uri: `/attack-links/list`
- method:`GET`
- query:
  - topologyId 拓扑 id （必传）
  - nodeStart 起始节点 id
  - nodeEnd 结束节点 id
  - pageSize
  - page

**响应**

```
{
    "pager": {
        "total": 9,
        "pageSize": 20,
        "page": 1
    },
    "items": [
        {
            "attackLink": [
                6,
                7,
                9
            ],
            "topologyId": 20,
            "linkId": 1
        },
        {
            "attackLink": [
                1,
                2,
                3,
                4,
                5,
                6,
                7,
                9
            ],
            "topologyId": 20,
            "linkId": 2
        },
        {
            "attackLink": [
                1,
                2,
                3,
                4,
                7,
                9
            ],
            "topologyId": 20,
            "linkId": 3
        },
        {
            "attackLink": [
                1,
                2,
                23,
                4,
                7,
                9
            ],
            "topologyId": 20,
            "linkId": 4
        },
        {
            "attackLink": [
                1,
                22,
                23,
                24,
                7,
                9
            ],
            "topologyId": 20,
            "linkId": 5
        },
        {
            "attackLink": [
                1,
                2,
                3,
                4,
                5,
                6,
                7,
                9
            ],
            "topologyId": 20,
            "linkId": 6
        },
        {
            "attackLink": [
                1,
                2,
                3,
                4,
                7,
                9
            ],
            "topologyId": 20,
            "linkId": 7
        },
        {
            "attackLink": [
                1,
                2,
                23,
                4,
                7,
                9
            ],
            "topologyId": 20,
            "linkId": 8
        },
        {
            "attackLink": [
                1,
                22,
                23,
                24,
                7,
                9
            ],
            "topologyId": 20,
            "linkId": 9
        }
    ]
}
```

## 攻击路径详情

**请求**

- uri: `/attack-links/get/{ID}`
- method:`GET`

**响应**

- attackLink:攻击链路
- attackDetail[]:攻击链路详情 - deviceVulnerabilities[] :漏洞列表
  ...

```
{
    "attackLink": [
        1,
        2,
        3,
        4,
        27
    ],
    "linkId": 5,
    "topologyId": 30,
    "attackDetail":[
         {
            "deviceType": "router",
            "deviceLabel": "路由器",
            "deviceId": 2,
            "deviceData": {
                "system": "Centos",
                "vendor": "H3C",
                "lan": [
                    {
                        "netmask": "192.168.1.1",
                        "ip": "192.168.1.1",
                        "mac": "192.168.1.1"
                    }
                ],
                "model": "AAA",
                "firmware": "1121212"
            },
            "deviceVulnerabilities": [
                {
                    "id": 4,
                    "vulnerabilityName": "OpenBSD输入验证错误漏洞",
                    "vulnerabilityType": "通用型漏洞",
                    "dangerLevel": "中",
                    "cveId": "CVE-2020-26142",
                    "cveLink": "http://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2020-26142",
                    "cnvdId": "CNVD-2021-34515",
                    "cnvdLink": null,
                    "cvssScore": null,
                    "affectedProducts": null,
                    "vulnerabilitySummary": null,
                    "suggestion": null
                },
            ]
         }
    ]
```

## 攻击路径统计检索

**请求**

- uri: `/attack-links/analyse`
- method:`GET`
- query:
  - topologyId 拓扑 id （必传）
  - nodeStart
  - nodeEnd
    **响应**

```
{
    "code": 200,
    "message": "操作成功",
    "data": {
        "attackLinkTotal":12,
        "nodeAttackCount":{
            1:20,
            3:25,
            4:5,
            6:45
        },
        "attackLinkCount":[
            {
                "nodeStart":1,
                "nodeEnd":2,
                "attackPercent":25
            },
            {
                "nodeStart":2,
                "nodeEnd":3,
                "attackPercent":22
            }
        ]

    }
}
```

**响应说明**

-attackLinkTotal:总攻击链路数

- nodeAttackCount{}：节点 id:节点攻击占比%
- attackLinkCount[{}]:
  - nodeStart:节点起点
  - nodeEnd: 节点重点
  - attackPercent:攻击线路占比%

## 新增拓扑

**界面上创建评估就跳转到新建拓扑页面，保存拓扑时后台会自动生成评估的数据，状态未评估**

**请求**

- uri: `/topologies/add`
- method:`POST`
- body: `type:application/json`

status: 0 草稿 1 使用中 2 未使用，
`对应评估列表页（0编辑中1已完成2已创建）`有一些疑问，暂时按这个

**注意：id 用 int 格式,目前都兼容**

```
{
    "status":0,
    "nodes":[
        {
            "id":"0",
            "type":"firewall",
            "entry":false,
            "target":false,
            "label":"防火墙",
            "data":{
                "system":"linux",
                "vendor":"360",
                "model":"S2626-PWR",
                "firmware":"1.2.4"
            },
            "parent_node":"-1",
            "child_nodes":[
                {
                    "id":"1",
                    "direction":"up",
                    "connector":"2",
                    "style":"1"
                }
            ],
            "net":[
                {
                    "ip":"",
                    "mac":"",
                    "gateway":""
                }
            ],
            "position":{
                "x":110,
                "y":545
            }
        },
        {
            "id":"1",
            "type":"router",
            "entry":true,
            "target":false,
            "label":"路由器",
            "data":{
                "net":[
                    {
                        "ip":"10.19.110.24",
                        "mac":"2C:61:04:3E:17:BC",
                        "gateway":"11.2.2.12.2"
                    }
                ],
                "system":"linux",
                "vendor":"H3C",
                "lan":[
                    {
                        "ip":"192.168.10.1",
                        "mac":"2C:61:04:3E:17:BA",
                        "netmask":"255.255.255.0"
                    },
                    {
                        "ip":"192.168.20.1",
                        "mac":"2C:61:04:3E:17:BA",
                        "netmask":"255.255.255.0"
                    },
                    {
                        "ip":"192.168.30.1",
                        "mac":"2C:61:04:3E:17:BA",
                        "netmask":"255.255.255.0"
                    }
                ],
                "model":"S2626-PWR",
                "firmware":"1.2.4"
            },
            "parent_node":"0",
            "child_nodes":[
                {
                    "id":"2",
                    "direction":"up",
                    "connector":"2",
                    "style":"1"
                }
            ],
            "net":[
                {
                    "ip":"10.19.110.24",
                    "mac":"2C:61:04:3E:17:BC",
                    "gateway":"11.2.2.12.2"
                }
            ],
            "options":{
                "system":{
                    "options":{
                        "data":[
                            "Win7",
                            "Win10",
                            "Centos",
                            "Mac OS X"
                        ],
                        "canInput":true
                    },
                    "require":1,
                    "label":"操作系统",
                    "type":2
                },
                "vendor":{
                    "options":{
                        "dataForm":"vendors/all",
                        "canInput":true
                    },
                    "require":1,
                    "label":"厂商",
                    "type":2,
                    "child":"model"
                },
                "lan":{
                    "options":[
                        {
                            "name":"ip",
                            "label":"ip地址",
                            "type":1
                        },
                        {
                            "name":"mac",
                            "label":"mac地址",
                            "type":1
                        },
                        {
                            "name":"netmask",
                            "label":"子网掩码",
                            "type":1
                        }
                    ],
                    "require":1,
                    "label":"lan",
                    "type":3
                },
                "model":{
                    "parent":"vendor",
                    "options":{
                        "dataForm":"devices/all?vendor=",
                        "canInput":true
                    },
                    "require":1,
                    "label":"设备型号",
                    "type":2,
                    "child":"firmware"
                },
                "firmware":{
                    "parent":"model",
                    "options":{
                        "dataForm":"firmwares/all?productName=",
                        "canInput":true
                    },
                    "require":1,
                    "label":"固件版本",
                    "type":2
                }
            },
            "position":{
                "x":420,
                "y":545
            }
        },
        {
            "id":"2",
            "type":"switch",
            "entry":false,
            "target":false,
            "label":"三层交换机",
            "data":{
                "vendor":"H3C",
                "model":"S2626-PWR",
                "firmware":"1.2.4",
                "vlan":[
                    {
                        "ip":"192.168.10.1",
                        "netmask":"255.255.255.0"
                    },
                    {
                        "ip":"192.168.20.1",
                        "netmask":"255.255.255.0"
                    },
                    {
                        "ip":"192.168.30.1",
                        "netmask":"255.255.255.0"
                    }
                ]
            },
            "parent_node":"1",
            "child_nodes":[
                {
                    "id":"5",
                    "direction":"down",
                    "connector":"2",
                    "style":"1"
                }
            ],
            "net":[
                {
                    "ip":"",
                    "mac":"",
                    "gateway":""
                }
            ],
            "position":{
                "x":730,
                "y":545
            }
        },
        {
            "id":"5",
            "type":"switch",
            "entry":false,
            "target":false,
            "label":"二层交换机",
            "data":{
                "net":[
                    {
                        "ip":"",
                        "mac":"",
                        "gateway":""
                    }
                ],
                "vlan":[
                    {
                        "ip":"192.168.30.1",
                        "netmask":"255.255.255.0"
                    }
                ],
                "vendor":"H3C",
                "model":"S5120-52SC-HI",
                "firmware":"1.2.4"
            },
            "parent_node":"2",
            "child_nodes":[
                {
                    "id":"20",
                    "direction":"down",
                    "connector":"2",
                    "style":"1"
                },
                {
                    "id":"21",
                    "direction":"up",
                    "connector":"2",
                    "style":"1"
                },
                {
                    "id":"22",
                    "direction":"up",
                    "connector":"2",
                    "style":"2"
                }
            ],
            "net":[
                {
                    "ip":"",
                    "mac":"",
                    "gateway":""
                }
            ],
            "options":{
                "vlan":{
                    "options":[
                        {
                            "name":"ip",
                            "label":"ip地址",
                            "type":1
                        },
                        {
                            "name":"netmask",
                            "label":"子网掩码",
                            "type":1
                        }
                    ],
                    "require":1,
                    "label":"lan",
                    "type":3
                },
                "vendor":{
                    "options":{
                        "dataForm":"vendors/all",
                        "canInput":true
                    },
                    "require":1,
                    "label":"厂商",
                    "type":2,
                    "child":"model"
                },
                "model":{
                    "parent":"vendor",
                    "options":{
                        "dataForm":"devices/all?vendor=",
                        "canInput":true
                    },
                    "require":1,
                    "label":"设备型号",
                    "type":2,
                    "child":"firmware"
                },
                "firmware":{
                    "options":{
                        "dataForm":"firmwares/all?productName=",
                        "canInput":true
                    },
                    "require":1,
                    "label":"固件版本",
                    "type":2
                }
            },
            "position":{
                "x":1090,
                "y":545
            }
        },
        {
            "id":"20",
            "type":"computer",
            "entry":false,
            "target":false,
            "label":"工程师站",
            "data":{
                "system":"win10",
                "vendor":"DELL",
                "model":"XPS13-7391",
                "services":[
                    {
                        "name":"ssh",
                        "version":"2.2"
                    },
                    {
                        "name":"ftp",
                        "version":"1.1"
                    }
                ]
            },
            "parent_node":"5",
            "child_nodes":[

            ],
            "net":[
                {
                    "ip":"192.168.30.2",
                    "mac":"2C:61:04:3E:17:CD",
                    "gateway":"192.168.30.1"
                }
            ],
            "position":{
                "x":1385,
                "y":545
            }
        },
        {
            "id":"21",
            "type":"computer",
            "entry":false,
            "target":false,
            "label":"HMI",
            "data":{
                "system":"linux",
                "vendor":"DELL",
                "model":"XPS13-7391",
                "services":[
                    {
                        "name":"ssh",
                        "version":"2.2"
                    },
                    {
                        "name":"ftp",
                        "version":"1.1"
                    }
                ]
            },
            "parent_node":"5",
            "child_nodes":[

            ],
            "net":[
                {
                    "ip":"192.168.30.3",
                    "mac":"2C:61:04:3E:17:CD",
                    "gateway":"192.168.30.1"
                }
            ],
            "position":{
                "x":1380,
                "y":650
            }
        },
        {
            "id":"22",
            "type":"plc",
            "entry":false,
            "target":true,
            "label":"PLC",
            "data":{
                "vendor":"Siemens",
                "model":"SIMATIC S7-300",
                "firmware":"1.0.2"
            },
            "parent_node":"5",
            "child_nodes":[

            ],
            "net":[
                {
                    "ip":"192.168.30.5",
                    "mac":"2C:61:04:3E:17:FD",
                    "gateway":"192.168.30.1"
                }
            ],
            "position":{
                "x":1380,
                "y":750
            }
        }
    ]
}
```

## 编辑拓扑

**请求**

- uri: `/topologies/edit/{id}`
- method:`PUT`
- body: `type:application/json`

参数和新增一样，后台暂时的做法是删除旧的新建一个新的

## 查看拓扑列表

**请求**

- uri: `/topologies/all`
- method:`GET`
- query: `assessId` 评估 id

## 查看拓扑详情

**请求**

- uri: `/topologies/get/{id}`
- method:`GET`

## 删除拓扑

**请求**

- uri: `/topologies/delete/{id}`
- method:`DELETE`

## 使用拓扑

**请求**

- uri: `/topologies/use/{id}`
- method:`PUT`

## 拓扑模板列表

**请求**

- uri: `/topology-templates/all`
- method:`GET`

## 拓扑模板详情

**请求**

- uri: `/topology-templates/get/{id}`
- method:`GET`

## 保存为模板

**请求**

- uri: `/topology-templates/add`
- method:`POST`

```
{
    "name":"模板名称",
    "thumb":"图片路径", // 图片上传接口还没写
    "topoJson":[
        {
            "id":"0",
            "type":"firewall",
            "entry":false,
            "target":false,
            "label":"防火墙",
            "data":{
                "system":"linux",
                "vendor":"360",
                "model":"S2626-PWR",
                "firmware":"1.2.4"
            },
            "parent_node":"-1",
            "child_nodes":[
                {
                    "id":"1",
                    "direction":"up",
                    "connector":"2",
                    "style":"1"
                }
            ],
            "net":[
                {
                    "ip":"",
                    "mac":"",
                    "gateway":""
                }
            ],
            "position":{
                "x":110,
                "y":545
            }
        },
        {
            "id":"1",
            "type":"router",
            "entry":true,
            "target":false,
            "label":"路由器",
            "data":{
                "net":[
                    {
                        "ip":"10.19.110.24",
                        "mac":"2C:61:04:3E:17:BC",
                        "gateway":"11.2.2.12.2"
                    }
                ],
                "system":"linux",
                "vendor":"H3C",
                "lan":[
                    {
                        "ip":"192.168.10.1",
                        "mac":"2C:61:04:3E:17:BA",
                        "netmask":"255.255.255.0"
                    },
                    {
                        "ip":"192.168.20.1",
                        "mac":"2C:61:04:3E:17:BA",
                        "netmask":"255.255.255.0"
                    },
                    {
                        "ip":"192.168.30.1",
                        "mac":"2C:61:04:3E:17:BA",
                        "netmask":"255.255.255.0"
                    }
                ],
                "model":"S2626-PWR",
                "firmware":"1.2.4"
            },
            "parent_node":"0",
            "child_nodes":[
                {
                    "id":"2",
                    "direction":"up",
                    "connector":"2",
                    "style":"1"
                }
            ],
            "net":[
                {
                    "ip":"10.19.110.24",
                    "mac":"2C:61:04:3E:17:BC",
                    "gateway":"11.2.2.12.2"
                }
            ],
            "options":{
                "system":{
                    "options":{
                        "data":[
                            "Win7",
                            "Win10",
                            "Centos",
                            "Mac OS X"
                        ],
                        "canInput":true
                    },
                    "require":1,
                    "label":"操作系统",
                    "type":2
                },
                "vendor":{
                    "options":{
                        "dataForm":"vendors/all",
                        "canInput":true
                    },
                    "require":1,
                    "label":"厂商",
                    "type":2,
                    "child":"model"
                },
                "lan":{
                    "options":[
                        {
                            "name":"ip",
                            "label":"ip地址",
                            "type":1
                        },
                        {
                            "name":"mac",
                            "label":"mac地址",
                            "type":1
                        },
                        {
                            "name":"netmask",
                            "label":"子网掩码",
                            "type":1
                        }
                    ],
                    "require":1,
                    "label":"lan",
                    "type":3
                },
                "model":{
                    "parent":"vendor",
                    "options":{
                        "dataForm":"devices/all?vendor=",
                        "canInput":true
                    },
                    "require":1,
                    "label":"设备型号",
                    "type":2,
                    "child":"firmware"
                },
                "firmware":{
                    "parent":"model",
                    "options":{
                        "dataForm":"firmwares/all?productName=",
                        "canInput":true
                    },
                    "require":1,
                    "label":"固件版本",
                    "type":2
                }
            },
            "position":{
                "x":420,
                "y":545
            }
        },
        {
            "id":"2",
            "type":"switch",
            "entry":false,
            "target":false,
            "label":"三层交换机",
            "data":{
                "vendor":"H3C",
                "model":"S2626-PWR",
                "firmware":"1.2.4",
                "vlan":[
                    {
                        "ip":"192.168.10.1",
                        "netmask":"255.255.255.0"
                    },
                    {
                        "ip":"192.168.20.1",
                        "netmask":"255.255.255.0"
                    },
                    {
                        "ip":"192.168.30.1",
                        "netmask":"255.255.255.0"
                    }
                ]
            },
            "parent_node":"1",
            "child_nodes":[
                {
                    "id":"5",
                    "direction":"down",
                    "connector":"2",
                    "style":"1"
                }
            ],
            "net":[
                {
                    "ip":"",
                    "mac":"",
                    "gateway":""
                }
            ],
            "position":{
                "x":730,
                "y":545
            }
        },
        {
            "id":"5",
            "type":"switch",
            "entry":false,
            "target":false,
            "label":"二层交换机",
            "data":{
                "net":[
                    {
                        "ip":"",
                        "mac":"",
                        "gateway":""
                    }
                ],
                "vlan":[
                    {
                        "ip":"192.168.30.1",
                        "netmask":"255.255.255.0"
                    }
                ],
                "vendor":"H3C",
                "model":"S5120-52SC-HI",
                "firmware":"1.2.4"
            },
            "parent_node":"2",
            "child_nodes":[
                {
                    "id":"20",
                    "direction":"down",
                    "connector":"2",
                    "style":"1"
                },
                {
                    "id":"21",
                    "direction":"up",
                    "connector":"2",
                    "style":"1"
                },
                {
                    "id":"22",
                    "direction":"up",
                    "connector":"2",
                    "style":"2"
                }
            ],
            "net":[
                {
                    "ip":"",
                    "mac":"",
                    "gateway":""
                }
            ],
            "options":{
                "vlan":{
                    "options":[
                        {
                            "name":"ip",
                            "label":"ip地址",
                            "type":1
                        },
                        {
                            "name":"netmask",
                            "label":"子网掩码",
                            "type":1
                        }
                    ],
                    "require":1,
                    "label":"lan",
                    "type":3
                },
                "vendor":{
                    "options":{
                        "dataForm":"vendors/all",
                        "canInput":true
                    },
                    "require":1,
                    "label":"厂商",
                    "type":2,
                    "child":"model"
                },
                "model":{
                    "parent":"vendor",
                    "options":{
                        "dataForm":"devices/all?vendor=",
                        "canInput":true
                    },
                    "require":1,
                    "label":"设备型号",
                    "type":2,
                    "child":"firmware"
                },
                "firmware":{
                    "options":{
                        "dataForm":"firmwares/all?productName=",
                        "canInput":true
                    },
                    "require":1,
                    "label":"固件版本",
                    "type":2
                }
            },
            "position":{
                "x":1090,
                "y":545
            }
        },
        {
            "id":"20",
            "type":"computer",
            "entry":false,
            "target":false,
            "label":"工程师站",
            "data":{
                "system":"win10",
                "vendor":"DELL",
                "model":"XPS13-7391",
                "services":[
                    {
                        "name":"ssh",
                        "version":"2.2"
                    },
                    {
                        "name":"ftp",
                        "version":"1.1"
                    }
                ]
            },
            "parent_node":"5",
            "child_nodes":[

            ],
            "net":[
                {
                    "ip":"192.168.30.2",
                    "mac":"2C:61:04:3E:17:CD",
                    "gateway":"192.168.30.1"
                }
            ],
            "position":{
                "x":1385,
                "y":545
            }
        },
        {
            "id":"21",
            "type":"computer",
            "entry":false,
            "target":false,
            "label":"HMI",
            "data":{
                "system":"linux",
                "vendor":"DELL",
                "model":"XPS13-7391",
                "services":[
                    {
                        "name":"ssh",
                        "version":"2.2"
                    },
                    {
                        "name":"ftp",
                        "version":"1.1"
                    }
                ]
            },
            "parent_node":"5",
            "child_nodes":[

            ],
            "net":[
                {
                    "ip":"192.168.30.3",
                    "mac":"2C:61:04:3E:17:CD",
                    "gateway":"192.168.30.1"
                }
            ],
            "position":{
                "x":1380,
                "y":650
            }
        },
        {
            "id":"22",
            "type":"plc",
            "entry":false,
            "target":true,
            "label":"PLC",
            "data":{
                "vendor":"Siemens",
                "model":"SIMATIC S7-300",
                "firmware":"1.0.2"
            },
            "parent_node":"5",
            "child_nodes":[

            ],
            "net":[
                {
                    "ip":"192.168.30.5",
                    "mac":"2C:61:04:3E:17:FD",
                    "gateway":"192.168.30.1"
                }
            ],
            "position":{
                "x":1380,
                "y":750
            }
        }
    ]
}
```

## 图片上传接口

**请求**

- uri: `/topology-templates/upload`
- method:`POST`
- Content-Type: multipart/form-data;
- file:file

## 结合问卷弹窗

**请求**

- uri: `/survey-collections/list`
- method:`GET`

## 结合问卷保存

**请求**

- uri: `/assess/link-survey-collection`
- method:`POST`
- body: `type:application/json`

```
{
    "id":123,
    "surveyCollectionId":23242
}
```

## 专业组件提交申请

**请求**

- uri: `/component-pro/add`
- method:`POST`
- body: `type:application/json`

eg:

```
{
    "label":"集线器",
    "vendor":"H3C",
    "model":"WD210",
    "firmware":"1.0.2"
}
```

## 专业组件审核列表

**请求**

- uri: `/component-pro/list`
- method:`GET`
- params:
  - status: 0 待审核，1 采纳 -1 拒绝

eg:

```
{
    "pager": {
        "total": 3,
        "pageSize": 20,
        "page": 1
    },
    "items": [
        {
            "id": 3,
            "label": "集线器",
            "vendor": "H3C",
            "model": "WD210",
            "firmware": "1.0.2",
            "userName": "company6_admin",
            "userId": 17,
            "companyId": 35,
            "companyName": "测试公司35",
            "status": 0,
            "createtime": "2021-06-11T03:53:53.880+00:00"
        }

    ]
}
```

## 专业组件审核操作

**请求**

- uri: `/component-pro/edit/{ID}`
- method:`PUT`
- body: `type:application/json`

eg:

```
{
    "status":1 // 1采纳 -1 拒绝
}
```
