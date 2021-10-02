# 设备节点相关 API

## 组件`components/all`

```
{
    "id":1,
    "type":"computer",
    "label":"个人计算机",
    "icon":"",
    "isSymbol":0,
    "options":{
        "vendor":{
            "label":"厂商",
            "type":2,
            "require":1,
            "options":{
                "dataForm":"vendors/all",
                "canInput":true
            },
            "child":"model"
        },
        "model":{
            "label":"设备型号",
            "type":2,
            "require":1,
            "options":{
                "dataForm":"devices/all?vendor=",
                "canInput":true
            },
            "child":"firmware",
            "parent":"vendor"
        },
        "firmware":{
            "label":"固件版本",
            "require":1,
            "type":2,
            "options":{
                "dataForm":"firmwares/all?productName=",
                "canInput":true
            }
        },
        "system":{
            "label":"操作系统",
            "require":1,
            "type":2,
            "options":{
                "data":[
                    "Win7",
                    "Win10",
                    "Centos",
                    "Mac OS X"
                ],
                "canInput":true
            }
        },
        "lan":{
            "label":"lan",
            "require":1,
            "type":3,
            "options":[
                {
                    "name":"ip",
                    "type":1,
                    "label":"ip"
                },
                {
                    "name":"mac",
                    "type":1,
                    "label":"mac"
                },
                {
                    "name":"netmask",
                    "type":1,
                    "label":"netmask"
                }
            ]
        },
        "services":{
            "label":"运行的服务",
            "require":1,
            "type":3,
            "options":[
                {
                    "name":"name",
                    "type":2,
                    "label":"服务名称",
                    "options":{
                        "data":[
                            "FTP",
                            "SSH",
                            "MYSQL",
                            "SMTP"
                        ],
                        "canInput":true
                    }
                },
                {
                    "name":"version",
                    "type":1,
                    "label":"版本"
                }
            ]
        }
    }
}
```

**说明**

- 通过 child 和 parent 来实现联动
- type:1 输入 2 选择 3 分组
- dataForm:数据来源对应的 api 以及需要传的参数

## 厂商`vendors/all`

返回：

```
{
    "code": 200,
    "message": "操作成功",
    "data": [
        "Ericsson",
        "H3C",
        "Nokia",
        "Schneider Electric",
        "Siemens"
    ]
}

```

## 设备型号`devices/all`

参数

- vendor:厂商，如：`Siemens`
- deviceType:设备类型，如：`plc`

返回

```
{
    "code": 200,
    "message": "操作成功",
    "data": [
        "TM241C40R",
        "TM221C24U",
        "XBTGT6340",
        "TM241CEC24R",
        "XBTGT55340",
        "TM241C24T/U",
        "HMISTO531/532",
        "XBTGT1335",
        "XBTGT2110",
        "XBTGT4230",
        "HMIG5U_HMIDT551",
        "TM221M16R/G"
    ]
}
```

## 固件`firmwares/all`

参数

- productName:设备型号，如：`TP700 6AV2 124-1GC01-0AX0`

返回

```
{
    "code": 200,
    "message": "操作成功",
    "data": [
        "13.0.0.0",
        "13.0.1.0",
        "14.0.0.0",
        "14.0.1.0",
        "15.0.0.0",
        "15.1.0.0",
        "16.0.0.0"
    ]
}
```
