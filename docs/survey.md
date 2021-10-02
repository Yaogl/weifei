# 问卷设计 API

## 问卷列表

**请求**

- uri: `/surveys/list`
- method:`GET`
- query:
  - page
  - pageSize
  - keyword
  - status

| 属性     | 类型   | 必填 | 说明          | 默认 |
| -------- | ------ | ---- | ------------- | ---- |
| page     | number | N    | 页码          | 1    |
| pageSize | number | N    | 每页显示条数: | 20   |
| keyword  | string | N    | 搜索关键词    |
| status   | number | N    | 状态          |

**响应**

```
{
    code:0,
    msg:"",
    data:{
        "items":[
            {
                id:1001,
                name:"智能制造业安全问卷",
                status:1,
                status_str:"正在回收",
                creator_id:101,
                creator_name:"张三",
                industry:"制造业"
            },
            ...
        ],
        "pager":{
            total:2003,
            page:1,
            pageSize:20
        }
    }
}
```

## 问卷新增

**请求**

- uri: `/surveys/add`
- method:`POST`
- body: `type:application/json`

```
{
    name:"智能制造业安全问卷",
    industry:"制造业",
    title:"首页标题",
    summary:"首页简介",
    end_summary:"结束语",
    pages:[
        {
            title:"一级标题",
            question:[
                {
                    title:"智能制造业安全问卷",
                    question_type:"选择题",
                    question_option: {
                        ...题型设置
                    },
                },
                ...题
            ],

            groups:[
                {
                    title:"二级标题",
                    question:[
                        {
                            title:"智能制造业安全问卷",
                            question_type:"选择题",
                            question_option: {
                                ...题型设置
                            },
                        },
                        ...题
                    ]
                },
                ...组
            ]
        }
        ...页
    },
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

## 问卷编辑

**请求**

- uri: `/surveys/edit/{ID}`
- method:`PUT`
- body: `type:application/json`

```
{
    name:"智能制造业安全问卷",
    status:1,
    industry:"制造业",
    title:"首页标题",
    summary:"首页简介",
    end_summary:"结束语",
    pages:[
        {
            id:1000001,
            title:"企业基本信息",
            parent_id:0,
            groups:[
                {
                    id:1001001,
                    title:"智能制造业安全问卷",
                    question:[
                        {
                            id:1000001,
                            title:"智能制造业安全问卷",
                            question_type:"选择题",
                            question_option: {
                                ...
                            },
                        },
                        ...题
                    ]
                },
                ...组
            ]
        }
        ...页
    },
}
```

**响应**

```
{
    code:0,
    msg:"",
    data:"",
}
```

## 问卷详情

**请求**

- uri: `/surveys/get/{ID}`
- method:`GET`

**响应**

```
{
    code:0,
    msg:"",
    data:{
        id:1001,
        name:"智能制造业安全问卷",
        status:1,
        status_str:"正在回收",
        creator_id:101,
        creator_name:"张三",
        industry:"制造业",
        createtime:11220128230,
        createtime_str:"2021-05-07 12:12:12",
        title:"首页标题",
        summary:"首页简介",
        end_summary:"结束语",
        pages:[
            {
                id:1000001,
                title:"企业基本信息",
                parent_id:0,
                groups:[
                    {
                        id:1001001,
                        title:"智能制造业安全问卷",
                        question:[
                            {
                                id:1000001,
                                title:"智能制造业安全问卷",
                                question_type:"选择题",
                                question_option: {
                                    ...
                                },
                            },
                            ...题
                        ]
                    },
                    ...组
                ]
            }
            ...页
        },
    }
}
```

## 问卷删除

**请求**

- uri: `/surveys/delete/{ID}`
- method:`DELETE`

**响应**

```
{
    code:0,
    msg:"",
    data:""
}
```
