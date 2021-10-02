# 其他 API

## 公司信息编辑

**请求**

- uri: `/companies/list`
- method:`GET`
- query:
  - page
  - pageSize
  - keyword
  - ...

**响应**

```
{
    code:0,
    msg:"",
    data:{
        "pager":{
            total:254,
            page:1,
            pageSize:20
        },
        "items":[
            {

            },
            ...
        ]
    }
}
```

## 公司信息编辑

**请求**

- uri: `/companies/edit/{ID}`
- method:`PUT`
- body: `type:application/json`

```

{
    "companyName": "mike",
    "provinceId": 1232132,
    "cityId": 102938,
    "countyId": 1000019,
    "companyAddress": "昌平",
    "ipoStatus": "已上市",
    "companyDomain": "有啥干啥",
    "contactName": "联系人",
    "contactPhone": "1234567890",
    "description": "aksfdf",
    "province": "",
    "city": "",
    "county": ""
}

```

**响应**

```
{
    code:0,
    msg:"",
    data:""
}
```

## 公司信息详情

**请求**

- uri: `/companies/get/{ID}`
- method:`GET`

```

{
    "companyName": "mike",
    "provinceId": 1232132,
    "cityId": 102938,
    "countyId": 1000019,
    "companyAddress": "昌平",
    "ipoStatus": "已上市",
    "companyDomain": "有啥干啥",
    "contactName": "联系人",
    "contactPhone": "1234567890",
    "description": "aksfdf",
    "province": "",
    "city": "",
    "county": ""
}

```

## 首页

### 漏洞排行

**请求**

- uri: `/home-data/top-vulnerabilities`
- method:`GET`

### 设备排行 (todo)

**请求**

- uri: `/home-data/top-devices`
- method:`GET`
