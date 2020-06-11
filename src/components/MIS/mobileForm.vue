<!-- mobileFormCom -->
<template>
  <div class="mobileForm">
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
          <option v-for="(item, i) in areaOption" :key="i">{{ item }}</option>
        </datalist>
      </el-form-item>
      <el-form-item label="部门" prop="Department">
        <el-input v-model="MISmobileForm.Department" list="dept"></el-input>
        <datalist id="dept">
          <option v-for="(item, i) in deptOption" :key="i">{{ item }}</option>
        </datalist>
      </el-form-item>
      <el-form-item label="长号" prop="issuePhoneNum">
        <el-input v-model="MISmobileForm.issuePhoneNum"></el-input>
      </el-form-item>
      <el-form-item label="短号" prop="issuePhoneSort">
        <el-input v-model="MISmobileForm.issuePhoneSort"></el-input>
      </el-form-item>
      <el-form-item label="状态" prop="isReturn">
        <el-select v-model="MISmobileForm.isReturn" placeholder="请选择状态">
          <el-option label="已发出" value="已发出"></el-option>
          <el-option label="已退回" value="已退回"></el-option>
          <el-option label="其他" value="其他"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="备注" prop="remark">
        <el-input v-model="MISmobileForm.remark" type="textarea"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm()">{{
          subBtnName
        }}</el-button>
        <el-button v-if="parent == 'default'" @click="resetForm()"
          >重置</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { getAreaOption, getDeptOption } from "@/api/MISreads";
import { addMISmobileForm, updateMISmobileForm } from "@/api/update";
import { Message } from "element-ui";
export default {
  name: "MobileForm",
  components: {},
  props: {
    mobileData: {
      type: Object,
      default: () => {
        return {
          employeeCode: "",
          employeeName: "",
          area: "",
          Department: "",
          issuePhoneNum: "",
          issuePhoneSort: "",
          isReturn: "",
          remark: "",
        };
      },
    },
    parent: {
      type: String,
      default: () => {
        return "default";
      },
    },
  },
  data() {
    return {
      MISmobileForm: this.mobileData,
      MISmobileRules: {
        employeeCode: [
          { required: true, message: "请输入工号", trigger: "blur" },
        ],
        employeeName: [
          { required: true, message: "请输入姓名", trigger: "blur" },
        ],
        area: [{ required: true, message: "请输入所属厂", trigger: "blur" }],
        // Department: [
        //   { required: true, message: "请输入部门", trigger: "blur" },
        // ],
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
  computed: {
    subBtnName() {
      if (this.parent === "MISreads") {
        return "立即修改";
      } else {
        return "立即创建";
      }
    },
  },
  watch: {
    mobileData(newValue) {
      this.MISmobileForm = newValue;
    },
  },
  created() {
    this.getAreaOption();
    this.getDeptOption();
  },
  mounted() {},
  methods: {
    submitForm(formName) {
      this.$refs.MISmobileForm.validate((valid) => {
        if (!valid) {
          return false;
        }
        if (this.parent === "MISreads") {
          this.updateMISmobileForm(this.MISmobileForm);
        } else {
          this.addMISmobileForm(this.MISmobileForm);
        }
      });
    },
    resetForm() {
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
    // 新增申请功能机信息(MISmobile)
    addMISmobileForm(data) {
      addMISmobileForm(data).then((res) => {
        if (res.code === 200) {
          Message({
            message: res.msg,
            type: "success",
            duration: 3000,
          });
          this.resetForm();
        }
      });
    },
    // 修改申请功能机信息(MISreads)
    updateMISmobileForm(data) {
      updateMISmobileForm(data).then((res) => {
        if (res.code === 200) {
          Message({
            message: res.msg,
            type: "success",
            duration: 3000,
          });
          this.$emit("closedialog", "");
          this.$emit("RefreshTable", "");
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.mobileForm {
  ::v-deep {
    .el-textarea__inner {
      height: 180px;
    }
  }
}
</style>
