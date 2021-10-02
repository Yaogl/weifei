<template>
  <layout>
    <telemete slot="main">
      <el-dialog
        :title="formData.id ? '修改密码' : '添加账号'"
        :visible.sync="dialogVisible"
        width="20%"
      >
        <el-form ref="elForm" :model="formData" :rules="rule">
          <el-form-item label="账号" prop="username">
            <el-input
              v-model="formData.username"
              placeholder="请输入账号"
              clearable
              :readonly="formData.id"
              style="width: 80%"
            />
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input
              v-model="formData.password"
              placeholder="请输入密码"
              clearable
              style="width: 80%"
            />
          </el-form-item>
          <el-form-item v-if="!formData.id" label="角色" prop="roleId">
            <el-select v-model="formData.roleId" placeholder="请选择">
              <el-option
                v-for="item in roles"
                :key="item.value"
                :label="item.label"
                :value="String(item.value)"
              />
            </el-select>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" :disabled="disabled" @click="submit">
            确 定
          </el-button>
        </span>
      </el-dialog>
      <Table
        :columns="columns"
        :data="tableData"
        :header-cell-style="{ textAlign: 'center' }"
        :stripe="false"
        table-padding
        :page-size="pageSize"
        :page="page"
        :total="total"
        @getData="getData"
      >
        <templat slot="table-header">
          <div class="flex-x">
            <div class="flex-x">
              <el-input
                v-model="query.companyName"
                placeholder="请输入公司名称"
                label="企业名称"
                type="text"
                clearable
              />

            </div>
            <div class="flex-x">
              <el-input
                v-model="query.username"
                placeholder="请输入用户名"
                label="用户名"
                type="text"
                clearable
              />
            </div>
            <div class="flex-x">
              <el-button
                icon="el-icon-search"
                type="success"
                @click="getData(1)"
              >搜索</el-button>
            </div>
            <div class="flex-x">
              <el-button
                icon="el-icon-plus"
                type="success"
                @click="dialogVisible = true"
              >添加账号</el-button>
            </div>
          </div>
        </templat>
        <template slot-scope="scope" slot="key3">
          <div style="text-align: center">
            <span
              class="status"
              :class="[scope.row.key3 === 0 ? 'status0' : 'status1']"
            >{{ scope.row.key3 === 0 ? '停用' : '正常' }}</span>
          </div>
        </template>
        <template slot-scope="scope" slot="key5">
          <div style="text-align: center">
            <span
              class="btn color-success"
              type="text"
              @click="edit(scope.row)"
            >
              编辑
            </span>
            |
            <span
              v-if="scope.row.key3 === 0"
              class="btn color-success"
              type="text"
              @click="changeStatus(scope.row.key0, 1)"
            >
              启用
            </span>
            <span
              v-else
              class="btn color-success"
              type="text"
              @click="changeStatus(scope.row.key0, 0)"
            >停用</span>
          </div>
        </template>
      </Table>
    </telemete>
  </layout>
</template>

<script>
import layout from './setLayout'
import Table from '@/components/Table/index'
import { userList, userAdd, userEdit, userStatus } from '@/api/account'
import { getRoles } from '@/api/role'
import { parseTime } from '@/utils/index'
export default {
  name: 'Account',
  components: {
    layout,
    Table
  },
  data() {
    return {
      dialogVisible: false,
      disabled: true,
      formData: {
        id: null,
        username: '',
        password: '',
        roleId: ''
      },
      query: {
        companyName: '',
        username: ''
      },
      roles: [],
      rule: {
        username: [
          {
            required: true,
            message: '账号不能为空'
          },
          {
            validator(rule, value, callback) {
              if (!/^[0-9a-zA-Z]*$/gim.test(value)) {
                callback(new Error('账号只能是字母加数字'))
              }
              if (value.length > 40) {
                callback(new Error('账号长度不能大于40'))
              }
              callback()
            },
            trigger: 'change'
          }
        ],
        password: [
          {
            required: true,
            message: '密码不能为空',
            trigger: 'change'
          },
          {
            validator(rule, value, callback) {
              if (/[\u4e00-\u9fa5]/.test(value)) {
                callback(new Error('密码只能是字母、数字或符号'))
              }
              if (value.length < 8) {
                callback(new Error('密码长度不能小于8'))
              }
              callback()
            },
            trigger: 'change'
          }
        ],
        roleId: {
          required: true,
          message: '角色不能为空',
          trigger: 'change'
        }
      },
      page: 1,
      pageSize: 15,
      total: 0,
      tableData: [],
      columns: [
        { title: '序号', key: 'key0', align: 'center', minWidth: '24' },
        {
          title: '账号',
          key: 'key1',
          align: 'center'
        },
        {
          title: '账号角色',
          key: 'key2',
          align: 'center'
        },
        {
          title: '账号状态',
          slot: 'key3',
          align: 'center'
        },
        { title: '创建时间', key: 'key4', align: 'center' },
        { title: '操作', slot: 'key5' }
      ]
    }
  },
  watch: {
    dialogVisible(val) {
      if (val === true) {
        if (this.roles.length === 0) {
          this.getRoleList()
        }
      } else {
        this.formData = {
          id: null,
          username: '',
          password: '',
          roleId: ''
        }
      }
    },
    formData: {
      handler(val) {
        this.$nextTick(() => {
          this.$refs['elForm'] &&
            this.$refs['elForm'].validate(valid => {
              this.disabled = !valid
            })
        })
      },
      deep: true,
      immediate: true
    }
  },
  created() {
    this.getData()
  },
  methods: {
    getData(num = false) {
      if (num !== false) {
        this.page = num
      }
      const params = {
        page: this.page,
        pageSize: this.pageSize,
        companyName: this.query.companyName,
        username: this.query.username
      }

      userList(params).then(res => {
        const {
          data: {
            items,
            pager: { total }
          }
        } = res
        console.log(items)
        this.total = total
        const tableData = []
        items.forEach(item => {
          tableData.push({
            key0: item.id,
            key1: item.username,
            key2: item.roleName,
            key3: item.status,
            key4: parseTime(item.createTime)
          })
        })
        this.tableData = tableData
      })
    },
    edit(row) {
      console.log(row.key3)
      this.formData = {
        id: row.key0,
        username: row.key1,
        password: '',
        roleId: row.key3 + ''
      }
      this.dialogVisible = true
    },
    changeStatus(id, status) {
      userStatus(id, status).then(res => {
        this.$message.success('修改成功')
        this.getData()
      })
    },
    submit() {
      this.$refs.elForm.validate(valid => {
        console.log(valid)
        if (!valid) {
          return
        }
        if (this.formData.id) {
          userEdit(this.formData.id, this.formData).then(res => {
            this.$message.success('密码修改成功')
          })
        } else {
          userAdd(this.formData).then(res => {
            this.$message.success('提交成功')
            this.getData()
          })
        }
        this.dialogVisible = false
      })
    },
    getRoleList() {
      getRoles({
        page: 1,
        pageSize: 1000
      }).then(res => {
        const {
          data: { items }
        } = res
        this.roles = items.map(item => {
          return {
            value: item.id,
            label: item.name
          }
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'global';
.color-success {
  color: $color-success;
}
.status {
  padding: 5px 14px;
}

.status1 {
  background: #e2faea;
  color: #02bb50;
}
.status0 {
  background: #dadfe7;
  color: #858aa0;
}
.flex-x {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
