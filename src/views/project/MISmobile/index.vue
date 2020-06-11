<template>
  <div class="MISmobile-container">
    <el-row :gutter="15">
      <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
        <el-card>
          <mobile-form></mobile-form>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
// import { getAreaOption, getDeptOption } from "@/api/MISreads";
// import { updateMISmobileForm } from "@/api/update";
// import { Message } from "element-ui";
import mobileForm from "@/components/MIS/mobileForm";
export default {
  name: "MiSmobile",
  components: {
    mobileForm,
  },
  // data() {
  //   return {
  //     MISmobileForm: {
  //       employeeCode: "",
  //       employeeName: "",
  //       area: "",
  //       Department: "",
  //       issuePhoneNum: "",
  //       issuePhoneSort: "",
  //       isReturn: "",
  //       remark: "",
  //     },
  //     MISmobileRules: {
  //       employeeCode: [
  //         { required: true, message: "请输入工号", trigger: "blur" },
  //       ],
  //       employeeName: [
  //         { required: true, message: "请输入姓名", trigger: "blur" },
  //       ],
  //       area: [{ required: true, message: "请输入所属厂", trigger: "blur" }],
  //       // Department: [
  //       //   { required: true, message: "请输入部门", trigger: "blur" },
  //       // ],
  //       issuePhoneNum: [
  //         { required: true, message: "请输入长号", trigger: "blur" },
  //       ],
  //       issuePhoneSort: [
  //         { required: true, message: "请输入短号", trigger: "blur" },
  //       ],
  //       isReturn: [{ required: true, message: "请选择状态", trigger: "blur" }],
  //     },
  //     // 所属厂提示信息
  //     areaOption: [],
  //     // 部门提示信息
  //     deptOption: [],
  //   };
  // },
  // created() {
  //   this.getAreaOption();
  //   this.getDeptOption();
  // },
  // mounted() {},
  // methods: {
  //   submitForm(formName) {
  //     this.$refs.MISmobileForm.validate((valid) => {
  //       if (!valid) {
  //         return false;
  //       }
  //       this.updateMISmobileForm(this.MISmobileForm);
  //     });
  //   },
  //   resetForm(formName) {
  //     this.$refs.MISmobileForm.resetFields();
  //   },
  //   /**
  //    * 网络方法
  //    */

  //   // 获取所属厂提示信息
  //   getAreaOption(data) {
  //     getAreaOption(data).then((res) => {
  //       this.areaOption = res.data;
  //     });
  //   },
  //   // 获取部门提示信息
  //   getDeptOption(data) {
  //     getDeptOption(data).then((res) => {
  //       this.deptOption = res.data;
  //     });
  //   },
  //   // 上传申请功能机信息
  //   updateMISmobileForm(data) {
  //     updateMISmobileForm(data).then((res) => {
  //       if (res.code === 200) {
  //         Message({
  //           message: res.msg,
  //           type: "success",
  //           duration: 3000,
  //         });
  //         this.$refs.MISmobileForm.resetFields();
  //       }
  //     });
  //   },
  // },
};
</script>

<style lang="scss" scoped></style>
