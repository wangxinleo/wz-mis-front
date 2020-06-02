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
            <el-form-item label="工号" prop="empNum">
              <el-input v-model="MISmobileForm.empNum"></el-input>
            </el-form-item>
            <el-form-item label="姓名" prop="empName">
              <el-input v-model="MISmobileForm.empName"></el-input>
            </el-form-item>
            <el-form-item label="所属厂" prop="area">
              <el-input v-model="MISmobileForm.area"></el-input>
            </el-form-item>
            <el-form-item label="部门" prop="empDep">
              <el-input v-model="MISmobileForm.empDep"></el-input>
            </el-form-item>
            <el-form-item label="长号" prop="longTel">
              <el-input v-model="MISmobileForm.longTel"></el-input>
            </el-form-item>
            <el-form-item label="短号" prop="shortTel">
              <el-input v-model="MISmobileForm.shortTel"></el-input>
            </el-form-item>
            <el-form-item label="状态" prop="status">
              <el-select
                v-model="MISmobileForm.status"
                placeholder="请选择状态"
              >
                <el-option label="已发出" value="0"></el-option>
                <el-option label="已退回" value="1"></el-option>
                <el-option label="其他" value="2"></el-option>
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
export default {
  name: "MiSmobile",
  components: {},
  data() {
    return {
      MISmobileForm: {
        empNum: "",
        empName: "",
        area: "",
        empDep: "",
        longTel: "",
        shortTel: "",
        status: "",
      },
      MISmobileRules: {
        empNum: [{ required: true, message: "请输入工号", trigger: "blur" }],
        empName: [{ required: true, message: "请输入姓名", trigger: "blur" }],
        area: [{ required: true, message: "请输入所属厂", trigger: "blur" }],
        empDep: [{ required: true, message: "请输入部门", trigger: "blur" }],
        longTel: [{ required: true, message: "请输入长号", trigger: "blur" }],
        shortTel: [{ required: true, message: "请输入短号", trigger: "blur" }],
        status: [{ required: true, message: "请选择状态", trigger: "blur" }],
      },
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
  },
};
</script>

<style lang="scss" scoped></style>
