# 用户权限相关 API

## 登录

**请求**

- uri: `/auth/login`
- method:`POST`
- body: `type:application/json`

```

{
    "username": "mike",
    "password": "1232132",
}

```

## 退出登录

**请求**

- uri: `/auth/logout`
- method:`POST`

## 新增用户

**请求**

- uri: `/auth/user-add`
- method:`POST`
- body: `type:application/json`

```

{
    "username": "mike",
    "password": "1232132",
    "roleId": 2
}

```

roleId 为 2 的时候固定为公司的管理员，后台会创建空白公司绑定到用户，用户登录后可以编辑公司信息

## 导航菜单和权限

权限和菜单通过一个接口返回

### 平台管理员

- 首页
- 问卷管理
  - 问卷回收管理
  - 所有问卷
- 评估管理（检索、详情、结合问卷、创建模板）
- 设置
  - 账号管理
  - 公司管理
  - 角色设置
  - 问卷设置

### 公司管理员

- 首页
- 问卷管理、
  - 我的问卷
  - 所有问卷
- 评估管理（检索、详情、结合问卷）（评估完成后是否有个推送来触发状态的修改和攻击链路的统计）
- 设置
  - 账号管理
  - 企业详情

### 所有权限列表 api

**请求**

- uri: `/auth/permissions`
- method:`GET`

**返回**

```
{
    "code": 200,
    "message": "操作成功",
    "data": [
        {
            "id": 100,
            "name": "首页",
            "url": "dashboard",
            "type": 0,
            "permission": "home",
            "method": null,
            "sort": 100,
            "parentId": 0,
            "children": [
                {
                    "id": 101,
                    "name": "首页全部数据",
                    "url": "",
                    "type": 1,
                    "permission": "home:data",
                    "method": null,
                    "sort": 100,
                    "parentId": 100,
                    "children": []
                }
            ]
        },
        {
            "id": 200,
            "name": "问卷管理",
            "url": "survey-collection/list",
            "type": 0,
            "permission": "survey-collection",
            "method": null,
            "sort": 200,
            "parentId": 0,
            "children": [
                {
                    "id": 210,
                    "name": "问卷回收管理",
                    "url": "survey-collection/list",
                    "type": 0,
                    "permission": "survey-collection",
                    "method": null,
                    "sort": 210,
                    "parentId": 200,
                    "children": [
                        {
                            "id": 211,
                            "name": "填写问卷",
                            "url": "survey-collection/add",
                            "type": 1,
                            "permission": "survey-collection",
                            "method": null,
                            "sort": 210,
                            "parentId": 210,
                            "children": []
                        }
                    ]
                },
                {
                    "id": 220,
                    "name": "所有问卷",
                    "url": "survey/list",
                    "type": 0,
                    "permission": "survey",
                    "method": null,
                    "sort": 220,
                    "parentId": 200,
                    "children": []
                }
            ]
        },
        {
            "id": 300,
            "name": "评估管理",
            "url": "assess/list",
            "type": 0,
            "permission": "assess",
            "method": null,
            "sort": 300,
            "parentId": 0,
            "children": [
                {
                    "id": 310,
                    "name": "评估创建",
                    "url": "assess/add",
                    "type": 0,
                    "permission": "assess:add",
                    "method": null,
                    "sort": 310,
                    "parentId": 300,
                    "children": [
                        {
                            "id": 311,
                            "name": "拓扑创建",
                            "url": "",
                            "type": 1,
                            "permission": "assess:toplogy:add",
                            "method": null,
                            "sort": 311,
                            "parentId": 310,
                            "children": []
                        },
                        {
                            "id": 312,
                            "name": "保存拓扑模板",
                            "url": "",
                            "type": 1,
                            "permission": "assess:toplogy:template",
                            "method": null,
                            "sort": 312,
                            "parentId": 310,
                            "children": []
                        }
                    ]
                },
                {
                    "id": 320,
                    "name": "评估删除",
                    "url": "assess/del",
                    "type": 1,
                    "permission": "assess:del",
                    "method": null,
                    "sort": 320,
                    "parentId": 300,
                    "children": []
                },
                {
                    "id": 330,
                    "name": "全部评估数据",
                    "url": "assess/detail",
                    "type": 1,
                    "permission": "assess:detail",
                    "method": null,
                    "sort": 330,
                    "parentId": 300,
                    "children": []
                }
            ]
        },
        {
            "id": 400,
            "name": "设置",
            "url": "setting/user",
            "type": 0,
            "permission": "setting",
            "method": null,
            "sort": 400,
            "parentId": 0,
            "children": [
                {
                    "id": 410,
                    "name": "账号管理",
                    "url": "setting/user",
                    "type": 0,
                    "permission": "user",
                    "method": null,
                    "sort": 400,
                    "parentId": 400,
                    "children": [
                        {
                            "id": 411,
                            "name": "账号添加",
                            "url": "",
                            "type": 1,
                            "permission": "user:add",
                            "method": null,
                            "sort": 411,
                            "parentId": 410,
                            "children": []
                        },
                        {
                            "id": 412,
                            "name": "账号编辑",
                            "url": "",
                            "type": 1,
                            "permission": "user:edit",
                            "method": null,
                            "sort": 412,
                            "parentId": 410,
                            "children": []
                        },
                        {
                            "id": 413,
                            "name": "账号启停",
                            "url": "",
                            "type": 1,
                            "permission": "user:status",
                            "method": null,
                            "sort": 413,
                            "parentId": 410,
                            "children": []
                        }
                    ]
                },
                {
                    "id": 420,
                    "name": "公司管理",
                    "url": "company/list",
                    "type": 0,
                    "permission": "company",
                    "method": null,
                    "sort": 420,
                    "parentId": 400,
                    "children": [
                        {
                            "id": 421,
                            "name": "公司信息编辑",
                            "url": "",
                            "type": 1,
                            "permission": "company",
                            "method": null,
                            "sort": 421,
                            "parentId": 420,
                            "children": []
                        }
                    ]
                },
                {
                    "id": 430,
                    "name": "角色设置",
                    "url": "",
                    "type": 0,
                    "permission": "role:del",
                    "method": null,
                    "sort": 430,
                    "parentId": 400,
                    "children": [
                        {
                            "id": 431,
                            "name": "角色添加",
                            "url": "",
                            "type": 1,
                            "permission": "role:add",
                            "method": null,
                            "sort": 431,
                            "parentId": 430,
                            "children": []
                        },
                        {
                            "id": 432,
                            "name": "角色编辑",
                            "url": "",
                            "type": 1,
                            "permission": "role:edit",
                            "method": null,
                            "sort": 432,
                            "parentId": 430,
                            "children": []
                        },
                        {
                            "id": 433,
                            "name": "角色删除",
                            "url": "",
                            "type": 1,
                            "permission": "role:del",
                            "method": null,
                            "sort": 433,
                            "parentId": 430,
                            "children": []
                        }
                    ]
                },
                {
                    "id": 440,
                    "name": "问卷设置",
                    "url": "survey/manage",
                    "type": 0,
                    "permission": "survey:manage",
                    "method": null,
                    "sort": 440,
                    "parentId": 400,
                    "children": [
                        {
                            "id": 441,
                            "name": "添加问卷",
                            "url": "",
                            "type": 1,
                            "permission": "survey:add",
                            "method": null,
                            "sort": 441,
                            "parentId": 440,
                            "children": []
                        },
                        {
                            "id": 442,
                            "name": "编辑问卷",
                            "url": "",
                            "type": 1,
                            "permission": "survey:edit",
                            "method": null,
                            "sort": 442,
                            "parentId": 440,
                            "children": []
                        },
                        {
                            "id": 443,
                            "name": "删除问卷",
                            "url": "",
                            "type": 1,
                            "permission": "survey:del",
                            "method": null,
                            "sort": 443,
                            "parentId": 440,
                            "children": []
                        },
                        {
                            "id": 444,
                            "name": "发布问卷",
                            "url": "",
                            "type": 1,
                            "permission": "survey:del",
                            "method": null,
                            "sort": 444,
                            "parentId": 440,
                            "children": []
                        }
                    ]
                }
            ]
        }
    ]
}
```

**字段说明**

- type：0 代表菜单，1 代表按钮或 API
- url：菜单的路由
- method:前端不用管，后台 API 权限校验用的

### 用户详情

**请求**

- uri: `/auth/user-info`
- method:`GET`

**返回**

```
{
    "code": 200,
    "message": "操作成功！",
    "data": {
        "credentialsNonExpired": true,
        "roles": [
            "超级管理员"
        ],
        "enabled": true,
        "companyId": 2,
        "roleIds": [
            1
        ],
        "createTime": 1621863419871,
        "permissions": [
            {
                "id": 100,
                "name": "首页",
                "url": "dashboard",
                "type": 0,
                "permission": "home",
                "method": null,
                "sort": 100,
                "parentId": 0,
                "children": [
                    {
                        "id": 101,
                        "name": "首页全部数据",
                        "url": "",
                        "type": 1,
                        "permission": "home:data",
                        "method": null,
                        "sort": 100,
                        "parentId": 100,
                        "children": []
                    }
                ]
            },
            {
                "id": 200,
                "name": "问卷管理",
                "url": "survey-collection/list",
                "type": 0,
                "permission": "survey-collection",
                "method": null,
                "sort": 200,
                "parentId": 0,
                "children": [
                    {
                        "id": 210,
                        "name": "问卷回收管理",
                        "url": "survey-collection/list",
                        "type": 0,
                        "permission": "survey-collection",
                        "method": null,
                        "sort": 210,
                        "parentId": 200,
                        "children": [
                            {
                                "id": 211,
                                "name": "填写问卷",
                                "url": "survey-collection/add",
                                "type": 1,
                                "permission": "survey-collection",
                                "method": null,
                                "sort": 210,
                                "parentId": 210,
                                "children": []
                            }
                        ]
                    },
                    {
                        "id": 220,
                        "name": "所有问卷",
                        "url": "survey/list",
                        "type": 0,
                        "permission": "survey",
                        "method": null,
                        "sort": 220,
                        "parentId": 200,
                        "children": []
                    }
                ]
            },
            {
                "id": 300,
                "name": "评估管理",
                "url": "assess/list",
                "type": 0,
                "permission": "assess",
                "method": null,
                "sort": 300,
                "parentId": 0,
                "children": [
                    {
                        "id": 310,
                        "name": "评估创建",
                        "url": "assess/add",
                        "type": 0,
                        "permission": "assess:add",
                        "method": null,
                        "sort": 310,
                        "parentId": 300,
                        "children": [
                            {
                                "id": 311,
                                "name": "拓扑创建",
                                "url": "",
                                "type": 1,
                                "permission": "assess:toplogy:add",
                                "method": null,
                                "sort": 311,
                                "parentId": 310,
                                "children": []
                            },
                            {
                                "id": 312,
                                "name": "保存拓扑模板",
                                "url": "",
                                "type": 1,
                                "permission": "assess:toplogy:template",
                                "method": null,
                                "sort": 312,
                                "parentId": 310,
                                "children": []
                            }
                        ]
                    },
                    {
                        "id": 320,
                        "name": "评估删除",
                        "url": "assess/del",
                        "type": 1,
                        "permission": "assess:del",
                        "method": null,
                        "sort": 320,
                        "parentId": 300,
                        "children": []
                    },
                    {
                        "id": 330,
                        "name": "全部评估数据",
                        "url": "assess/detail",
                        "type": 1,
                        "permission": "assess:detail",
                        "method": null,
                        "sort": 330,
                        "parentId": 300,
                        "children": []
                    }
                ]
            },
            {
                "id": 400,
                "name": "设置",
                "url": "setting/user",
                "type": 0,
                "permission": "setting",
                "method": null,
                "sort": 400,
                "parentId": 0,
                "children": [
                    {
                        "id": 410,
                        "name": "账号管理",
                        "url": "setting/user",
                        "type": 0,
                        "permission": "user",
                        "method": null,
                        "sort": 400,
                        "parentId": 400,
                        "children": [
                            {
                                "id": 411,
                                "name": "账号添加",
                                "url": "",
                                "type": 1,
                                "permission": "user:add",
                                "method": null,
                                "sort": 411,
                                "parentId": 410,
                                "children": []
                            },
                            {
                                "id": 412,
                                "name": "账号编辑",
                                "url": "",
                                "type": 1,
                                "permission": "user:edit",
                                "method": null,
                                "sort": 412,
                                "parentId": 410,
                                "children": []
                            },
                            {
                                "id": 413,
                                "name": "账号启停",
                                "url": "",
                                "type": 1,
                                "permission": "user:status",
                                "method": null,
                                "sort": 413,
                                "parentId": 410,
                                "children": []
                            }
                        ]
                    },
                    {
                        "id": 420,
                        "name": "公司管理",
                        "url": "company/list",
                        "type": 0,
                        "permission": "company",
                        "method": null,
                        "sort": 420,
                        "parentId": 400,
                        "children": [
                            {
                                "id": 421,
                                "name": "公司信息编辑",
                                "url": "",
                                "type": 1,
                                "permission": "company",
                                "method": null,
                                "sort": 421,
                                "parentId": 420,
                                "children": []
                            }
                        ]
                    },
                    {
                        "id": 430,
                        "name": "角色设置",
                        "url": "",
                        "type": 0,
                        "permission": "role:del",
                        "method": null,
                        "sort": 430,
                        "parentId": 400,
                        "children": [
                            {
                                "id": 431,
                                "name": "角色添加",
                                "url": "",
                                "type": 1,
                                "permission": "role:add",
                                "method": null,
                                "sort": 431,
                                "parentId": 430,
                                "children": []
                            },
                            {
                                "id": 432,
                                "name": "角色编辑",
                                "url": "",
                                "type": 1,
                                "permission": "role:edit",
                                "method": null,
                                "sort": 432,
                                "parentId": 430,
                                "children": []
                            },
                            {
                                "id": 433,
                                "name": "角色删除",
                                "url": "",
                                "type": 1,
                                "permission": "role:del",
                                "method": null,
                                "sort": 433,
                                "parentId": 430,
                                "children": []
                            }
                        ]
                    },
                    {
                        "id": 440,
                        "name": "问卷设置",
                        "url": "survey/manage",
                        "type": 0,
                        "permission": "survey:manage",
                        "method": null,
                        "sort": 440,
                        "parentId": 400,
                        "children": [
                            {
                                "id": 441,
                                "name": "添加问卷",
                                "url": "",
                                "type": 1,
                                "permission": "survey:add",
                                "method": null,
                                "sort": 441,
                                "parentId": 440,
                                "children": []
                            },
                            {
                                "id": 442,
                                "name": "编辑问卷",
                                "url": "",
                                "type": 1,
                                "permission": "survey:edit",
                                "method": null,
                                "sort": 442,
                                "parentId": 440,
                                "children": []
                            },
                            {
                                "id": 443,
                                "name": "删除问卷",
                                "url": "",
                                "type": 1,
                                "permission": "survey:del",
                                "method": null,
                                "sort": 443,
                                "parentId": 440,
                                "children": []
                            },
                            {
                                "id": 444,
                                "name": "发布问卷",
                                "url": "",
                                "type": 1,
                                "permission": "survey:del",
                                "method": null,
                                "sort": 444,
                                "parentId": 440,
                                "children": []
                            }
                        ]
                    }
                ]
            }
        ],
        "accountNonExpired": true,
        "id": 2,
        "accountNonLocked": true,
        "status": 1,
        "username": "user1"
    }
}
```

**字段说明**

pemissions 字段返回当前用户的所有权限

### 用户编辑

### 用户启停

### 添加角色

**请求**

- uri: `/auth/role-add`
- method:`POST`
- body: `type:application/json`

```
{
    "roleName":"角色名称",
    "permissionIds":[1,2,3,4,5,56,]
}
```
