# 问卷回收 API

## 问卷回收列表

**请求**

- uri: `/survey-collections/list`
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

## 问卷回收新增

**请求**

- uri: `/survey-collections/add`
- method:`POST`
- body: `type:application/json`

```
{
    "surveyId":1001,
    "answers":[
        {
            "questionId":100001,
            "answer":{
                "value":"A",
                "text":"内"
            }
        },
        {
            "questionId":100002,
            "answer":{
                "value":"B",
                "text":"内"
            }
        },
        {
            "questionId":100003,
            "answer":{
                "text":"内"
            }
        },
        {
            "questionId":100001,
            "answer":{
                "text":"内"
            }
        }
    ]
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

## 问卷回收编辑

**请求**

- uri: `/survey-collections/edit/{ID}`
- method:`PUT`
- body: `type:application/json`

```

{
    "id":10000001,
    "surveyId":1001,
    "answers":[
        {
            "questionId":100001,
            "answer":{
                "value":"A",
                "text":"内"
            }
        },
        {
            "questionId":100002,
            "answer":{
                "value":"B",
                "text":"内"
            }
        },
        {
            "questionId":100003,
            "answer":{
                "text":"内"
            }
        },
        {
            "questionId":100001,
            "answer":{
                "text":"内"
            }
        }
    ]
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

## 问卷回收详情

**请求**

- uri: `/collections/get/{ID}`
- method:`GET`

**响应**

```
{
    code:0,
    msg:"",
    data:{
    "id":100010101,
    "surveyId":1001,
    "answers":[
        {
            "questionId":100001,
            "answer":{
                "value":"A",
                "text":"内"
            }
        },
        {
            "questionId":100002,
            "answer":{
                "value":"B",
                "text":"内"
            }
        },
        {
            "questionId":100003,
            "answer":{
                "text":"内"
            }
        },
        {
            "questionId":100001,
            "answer":{
                "text":"内"
            }
        }
    ]
}
```

## 问卷回收删除

**请求**

- uri: `/survey-collections/delete/{ID}`
- method:`DELETE`

**响应**

```
{
    code:0,
    msg:"",
    data:""
}
```
