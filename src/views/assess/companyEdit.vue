<template>
  <div class="page">
    <bread />
    <div class="container">
      <el-card class="box-card" style="margin-top: 30px">
        <div slot="header">
          <div class="header">
            基本资料填写
          </div>
        </div>
        <el-form
          ref="elForm"
          :model="formData"
          :rules="rules"
          size="medium"
          label-width="130px"
        >
          <el-form-item label="公司名称" prop="name">
            <el-input
              v-model="formData.name"
              type="text"
              placeholder="请输入公司名称"
              :autosize="{ minRows: 4, maxRows: 4 }"
              :style="{ width: '30%' }"
            />
          </el-form-item>
          <el-form-item label="企业所在城市" prop="addr">
            <el-cascader
              v-model="formData.addr"
              size="large"
              :options="options"
              :style="{ width: '30%' }"
              @change="handleChange"
            />
          </el-form-item>
          <el-form-item label="企业详细地址" prop="addrDetail">
            <el-input
              v-model="formData.addrDetail"
              type="text"
              placeholder="请输企业详细地址"
              :autosize="{ minRows: 4, maxRows: 4 }"
              :style="{ width: '30%' }"
            />
          </el-form-item>
          <el-form-item label="上市情况" prop="status">
            <el-select
              v-model="formData.status"
              placeholder="请选择"
              :style="{ width: '30%' }"
            >
              <el-option label="未上市" value="未上市" />
              <el-option label="主版" value="主版" />
              <el-option label="中小版" value="中小版" />
              <el-option label="创业版" value="创业版" />
              <el-option label="科创版" value="科创版" />
              <el-option label="新三版" value="新三版" />
              <el-option label="海外" value="海外" />
            </el-select>
          </el-form-item>
          <el-form-item label="产业领域" prop="type">
            <el-select
              v-model="formData.type"
              placeholder="请选择"
              :style="{ width: '30%' }"
            >
              <el-option label="农、林、牧、渔业" value="农、林、牧、渔业" />
              <el-option label="采掘业" value="采掘业" />
              <el-option label="制造业" value="制造业" />
              <el-option
                label="电力、煤气及水的生产和供应业"
                value="电力、煤气及水的生产和供应业"
              />
              <el-option
                label="建筑业、交通运输、仓储业"
                value="建筑业、交通运输、仓储业"
              />
              <el-option label="邮电通讯业" value="邮电通讯业" />
              <el-option label="批发和零售贸易" value="批发和零售贸易" />
              <el-option label="金融、保险业" value="金融、保险业" />
              <el-option label="房地产业" value="房地产业" />
              <el-option label="社会服务业" value="社会服务业" />
              <el-option label="信息与文化产业" value="信息与文化产业" />
              <el-option label="综合类" value="综合类" />
            </el-select>
          </el-form-item>
          <el-form-item label="联系人" prop="linkname">
            <el-input
              v-model="formData.linkname"
              type="text"
              placeholder="请输联系人"
              :autosize="{ minRows: 4, maxRows: 4 }"
              :style="{ width: '30%' }"
            />
          </el-form-item>
          <el-form-item label="联系电话" prop="mobile">
            <el-input
              v-model="formData.mobile"
              type="text"
              placeholder="请输联系电话"
              :autosize="{ minRows: 4, maxRows: 4 }"
              :style="{ width: '30%' }"
            />
          </el-form-item>
          <el-form-item label="描述" prop="describe">
            <el-input
              v-model="formData.describe"
              type="textarea"
              placeholder="请输内容"
              :autosize="{ minRows: 4, maxRows: 4 }"
              :style="{ width: '30%' }"
            />
          </el-form-item>
          <el-col :span="24">
            <el-form-item size="large" style="text-align: left">
              <el-button
                class="btn"
                type="success"
                :disabled="disabled"
                @click="submit"
              >保存</el-button>
              <el-button class="btn" @click="cannel">取消</el-button>
            </el-form-item>
          </el-col>
        </el-form>
      </el-card>
    </div>
  </div>
</template>

<script>
import { regionData, CodeToText } from 'element-china-area-data'
import { getCompany, editCompany } from '@/api/company'

export default {
  name: 'CompanyEdit',
  data() {
    return {
      id: null,
      options: regionData,
      selectedOptions: [],
      disabled: true,
      formData: {
        name: '',
        addr: [],
        addrDetail: '',
        status: '',
        type: '',
        linkname: '',
        mobile: '',
        describe: ''
      },
      rules: {
        name: [
          {
            required: true,
            message: '公司名称不能为空'
          },
          {
            validator(rule, value, callback) {
              if (value.length > 50) {
                callback(new Error('公司名称不能大于50个汉字'))
              }
              callback()
            }
          }
        ],
        addr: [
          {
            required: true,
            validator(rule, value, callback) {
              if (value.length === 0) {
                callback(new Error('企业所在城市不能为空'))
              }
              callback()
            }
          }
        ],
        addrDetail: [
          {
            validator(rule, value, callback) {
              if (value.length > 60) {
                callback(new Error('企业详细地址不能大于60个汉字'))
              }
              callback()
            }
          }
        ],
        describe: [
          {
            validator(rule, value, callback) {
              if (value.length > 300) {
                callback(new Error('描述不能大于300个汉字'))
              }
              callback()
            }
          }
        ],
        linkname: [
          {
            required: true,
            message: '联系人不能为空'
          },
          {
            validator(rule, value, callback) {
              if (value.length > 10) {
                callback(new Error('联系人不能大于10个汉字'))
              }
              callback()
            }
          }
        ],
        status: [
          {
            required: true,
            message: '上市情况不能为空',
            trigger: 'change'
          }
        ],
        type: [
          {
            required: true,
            message: '产业领域不能为空',
            trigger: 'change'
          }
        ],
        mobile: [
          {
            required: true,
            message: '联系人手机号不能为空'
          },
          {
            validator: function(rule, value, callback) {
              if (value === '') {
                callback()
              } else if (!/^1\d{10}$/.test(value)) {
                callback(new Error('手机号格式错误'))
              } else {
                callback()
              }
            },
            message: '手机号不合法',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  watch: {
    formData: {
      handler(val) {
        this.$nextTick(() => {
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
    this.id = this.$route.query.id || null
    this.init()
  },
  methods: {
    init() {
      if (this.id) {
        getCompany(this.id).then(res => {
          const { data } = res
          this.formData = {
            name: data.companyName,
            addrDetail: data.companyAddress,
            status: data.ipoStatus,
            type: data.companyDomain,
            linkname: data.contactName,
            mobile: data.contactPhone,
            describe: data.description,
            addr: [
              String(data.provinceId),
              String(data.cityId),
              String(data.countyId)
            ],
            province: data.province,
            city: data.city,
            county: data.county,
            provinceId: data.provinceId,
            cityId: data.cityId,
            countyId: data.countyId
          }
        })
      }
    },
    handleChange(value) {
      this.formData.province = CodeToText[value[0]]
      this.formData.city = CodeToText[value[1]]
      this.formData.county = CodeToText[value[2]]
      this.formData.provinceId = parseInt(value[0])
      this.formData.cityId = parseInt(value[1])
      this.formData.countyId = parseInt(value[2])
    },
    submit() {
      this.$refs['elForm'].validate(valid => {
        console.log(this.formData)
        if (!valid) {
          return false
        }
        const params = {
          companyName: this.formData.name,
          companyAddress: this.formData.addrDetail,
          ipoStatus: this.formData.status,
          companyDomain: this.formData.type,
          contactName: this.formData.linkname,
          contactPhone: this.formData.mobile,
          description: this.formData.describe,
          province: this.formData.province,
          city: this.formData.city,
          county: this.formData.county,
          provinceId: this.formData.provinceId,
          cityId: this.formData.cityId,
          countyId: this.formData.countyId
        }
        editCompany(this.id, params).then(res => {
          this.$message.success('修改成功')
        })
      })
    },
    cannel() {
      this.$refs['elForm'].resetFields()
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'global';

.header {
  border-left: 6px solid $color-success;
  padding-left: 10px;
}

.btn {
  width: 100px;
}
</style>
