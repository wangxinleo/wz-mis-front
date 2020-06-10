<template>
  <div class="MISmobile-container">
    <el-row :gutter="15">
      <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
        <el-card>
          <el-form
            ref="MISmobileForm"
            :model="MISmobileForm"
            :rules="MISmobileRules"
            label-width="100px"
            class="demo-ruleForm"
          >
            <el-form-item label="工号" prop="employeeCode">
              <el-input v-model="MISmobileForm.employeeCode"></el-input>
            </el-form-item>
            <el-form-item label="姓名" prop="employeeName">
              <el-input v-model="MISmobileForm.employeeName"></el-input>
            </el-form-item>
            <el-form-item label="所属厂" prop="area">
              <el-input v-model="MISmobileForm.area" list="area"></el-input>
              <datalist id="area">
                <option>男11</option>
              </datalist>
            </el-form-item>
            <el-form-item label="部门" prop="Department">
              <el-input v-model="MISmobileForm.Department"></el-input>
            </el-form-item>
            <el-form-item label="长号" prop="issuePhoneNum">
              <el-input v-model="MISmobileForm.issuePhoneNum"></el-input>
            </el-form-item>
            <el-form-item label="短号" prop="issuePhoneSort">
              <el-input v-model="MISmobileForm.issuePhoneSort"></el-input>
            </el-form-item>
            <el-form-item label="状态" prop="isReturn">
              <el-select
                v-model="MISmobileForm.isReturn"
                placeholder="请选择状态"
              >
                <el-option label="已发出" value="已发出"></el-option>
                <el-option label="已退回" value="已退回"></el-option>
                <el-option label="其他" value="其他"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm()"
                >立即创建</el-button
              >
              <el-button @click="resetForm()">重置</el-button>
            </el-form-item>
          </el-form>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { getAreaOption, getDeptOption } from "@/api/MISreads";
export default {
  name: "MiSmobile",
  components: {},
  data() {
    return {
      MISmobileForm: {
        employeeCode: "",
        employeeName: "",
        area: "",
        Department: "",
        issuePhoneNum: "",
        issuePhoneSort: "",
        isReturn: "",
      },
      MISmobileRules: {
        employeeCode: [
          { required: true, message: "请输入工号", trigger: "blur" },
        ],
        employeeName: [
          { required: true, message: "请输入姓名", trigger: "blur" },
        ],
        area: [{ required: true, message: "请输入所属厂", trigger: "blur" }],
        Department: [
          { required: true, message: "请输入部门", trigger: "blur" },
        ],
        issuePhoneNum: [
          { required: true, message: "请输入长号", trigger: "blur" },
        ],
        issuePhoneSort: [
          { required: true, message: "请输入短号", trigger: "blur" },
        ],
        isReturn: [{ required: true, message: "请选择状态", trigger: "blur" }],
      },
      // 所属厂提示信息
      areaOption: [],
      // 部门提示信息
      deptOption: [],
    };
  },
  created() {},
  mounted() {},
  methods: {
    submitForm(formName) {
      this.$refs.MISmobileForm.validate((valid) => {
        if (!valid) {
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs.MISmobileForm.resetFields();
    },
    /**
     * 网络方法
     */

    // 获取所属厂提示信息
    getAreaOption(data) {
      getAreaOption(data).then((res) => {
        this.areaOption = res.data;
      });
    },
    // 获取部门提示信息
    getDeptOption(data) {
      getDeptOption(data).then((res) => {
        this.deptOption = res.data;
      });
    },
  },
};
</script>

<style lang="scss" scoped></style>
