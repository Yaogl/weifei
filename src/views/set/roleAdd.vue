<template>
  <div class="page">
    <bread />
    <div class="container flex">
      <div class="title">角色名称 <span style="color: #EF5D4A">*</span></div>
      <el-card class="box-card" style="margin-bottom: 40px">
        <div class="cell">
          <div class="el-icon-user">&nbsp;&nbsp;&nbsp;&nbsp;添加角色名称</div>
          <el-input
            v-model="roleName"
            style="width: 10%"
            type="text"
            placeholder="请输入角色名称"
          />
        </div>
      </el-card>

      <div class="title">权限配置 <span style="color: #EF5D4A">*</span></div>
      <el-card
        v-for="permission1 in allPermission"
        :key="permission1.id"
        class="box-card"
      >
        <div slot="header">
          <div class="header">
            <span> &nbsp;&nbsp;&nbsp;&nbsp;{{ permission1.name }} </span>
            <el-switch v-model="switchValues[permission1.id]" />
          </div>
        </div>
        <div
          v-for="permission2 in permission1.children"
          :key="permission2.id"
          class="item-p"
        >
          <div class="item">
            <span> &nbsp;&nbsp;{{ permission2.name }} </span>
            <el-switch v-model="switchValues[permission2.id]" />
          </div>
          <div v-for="permission3 in permission2.children" class="item2">
            <span> &nbsp;&nbsp;{{ permission3.name }} </span>
            <el-switch v-model="switchValues[permission3.id]" />
          </div>
        </div>
      </el-card>
      <div style="text-align: right; width: 100%;margin-bottom: 30px">
        <el-button class="btn" @click="switchValues = {}">取消</el-button>
        <el-button class="btn" type="success" @click="submit">保存</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import {
  getAllPermission,
  addRole,
  getPermissionsByRoleId,
  editRole
} from '@/api/role'

export default {
  name: 'RoleAdd',
  data() {
    return {
      allPermission: [],
      roleName: '',
      switchValues: {},
      id: null
    }
  },
  created() {
    this.id = this.$route.query.id
    this.getData()
  },
  methods: {
    init() {
      this.roleName = ''
      this.switchValues = {}
    },
    getData() {
      this.init()
      getAllPermission().then(res => {
        const { data } = res
        this.allPermission = data
      })
      if (this.id) {
        getPermissionsByRoleId(this.id).then(res => {
          const {
            data: { permissions, roleName }
          } = res
          console.log(permissions)
          const switchValues = {}
          permissions.map(item => {
            switchValues[item.id] = true
          })
          this.switchValues = switchValues
          this.roleName = roleName
        })
      }
    },
    submit() {
      if (!this.roleName) {
        this.$message.warning('请输入角色名称')
        return
      }
      const permissionIds = []
      for (const id in this.switchValues) {
        if (this.switchValues[id] === true) {
          permissionIds.push(parseInt(id))
        }
      }
      if (this.id) {
        editRole(this.id, {
          permissionIds,
          roleName: this.roleName
        }).then(res => {
          this.$message.success('修改成功')
        })
      } else {
        addRole({
          permissionIds,
          roleName: this.roleName
        }).then(res => {
          this.$message.success('添加成功')
          this.init()
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'global';
.flex {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
.cell {
  font-size: $font-base;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
}
.box-card {
  width: 100%;
  margin-bottom: 20px;
  .item-p {
    display: flex;
    flex-direction: column;
  }
  .header,
  .item,
  .item2 {
    font-size: $font-md;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    padding: 10px 0;
  }
  .item {
    margin: 10px 0;
  }
  .item2 {
    margin-left: 40px;
  }
}

.title {
  font-size: $font-md;
  font-weight: 500;
  color: $color-text-primary;
  padding-bottom: 20px;
}

.btn {
  width: 150px;
}
</style>
