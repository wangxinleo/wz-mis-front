<template>
  <div class="MISreads-container">
    <el-row :gutter="15">
      <el-col :xs="24" :sm="24" :md="8" :lg="6" :xl="4">
        <el-card>
          <el-form
            ref="MISReadsForm"
            :model="MISReadsForm"
            :rules="MISReadsFormRules"
            label-width="100px"
            label-position="top"
            @submit.native.prevent
          >
            <el-form-item>
              <el-row type="flex" class="row-bg" justify="space-around">
                <el-col :span="9">
                  <el-button
                    icon="el-icon-delete-solid"
                    type="danger"
                    @click="clearEmpText()"
                    >清空</el-button
                  >
                </el-col>
                <el-col :span="9">
                  <el-button
                    icon="el-icon-plus"
                    type="primary"
                    @click="submitEmpText()"
                    >查询</el-button
                  >
                </el-col>
              </el-row>
            </el-form-item>
            <el-form-item label="请填入员工信息" prop="empText">
              <el-input
                v-model="MISReadsForm.empText"
                type="textarea"
              ></el-input>
            </el-form-item>
          </el-form>
        </el-card>
      </el-col>
      <el-col :xs="24" :sm="24" :md="16" :lg="18" :xl="20">
        <el-card>
          <el-tabs type="border-card">
            <el-tab-pane label="OA权限申请记录">
              <el-table
                :data="OAMISData"
                style="width: 100%;"
                border
                stripe
                height="600"
              >
                <el-table-column type="expand">
                  <template slot-scope="scope">
                    <el-form
                      label-position="left"
                      class="demo-table-expand"
                      label-width="150px"
                    >
                      <el-form-item label="所任职务">
                        <span>{{ scope.row.empPosition }}</span>
                      </el-form-item>
                      <el-form-item label="联系电话">
                        <span>{{ scope.row.tel }}</span>
                      </el-form-item>
                      <el-form-item label="邮箱地址">
                        <span>{{ scope.row.mail }}</span>
                      </el-form-item>
                      <el-form-item label="登记的邮箱密码">
                        <span>{{ scope.row.mailPass }}</span>
                      </el-form-item>
                    </el-form>
                  </template>
                </el-table-column>
                <el-table-column type="index" label="#"></el-table-column>
                <el-table-column prop="empNum" label="工号" width="100">
                </el-table-column>
                <el-table-column prop="empName" label="姓名" width="100">
                </el-table-column>
                <el-table-column prop="empDep" label="部门" width="150">
                </el-table-column>
                <el-table-column prop="comCode" label="电脑编号" width="150">
                </el-table-column>
                <el-table-column prop="powers" label="权限" width="200">
                  <template slot-scope="scope">
                    <el-tag v-if="scope.row.powers.inMail === true"
                      >内邮</el-tag
                    >
                    <el-tag
                      v-if="scope.row.powers.internet === true"
                      type="danger"
                      >外网</el-tag
                    >
                    <el-tag
                      v-if="scope.row.powers.outMail === true"
                      type="success"
                      >外邮</el-tag
                    >
                  </template>
                </el-table-column>
                <el-table-column
                  show-overflow-tooltip
                  prop="ill"
                  label="	其他说明"
                >
                </el-table-column>
              </el-table>
            </el-tab-pane>
            <el-tab-pane label="纸质档案记录">
              <el-table
                :data="filesData"
                style="width: 100%;"
                border
                stripe
                height="600"
              >
                <el-table-column type="index" label="#"></el-table-column>
                <el-table-column prop="path" label="匹配记录">
                  <template slot-scope="scope">
                    <a :href="scope.row.path">{{ scope.row.name }}</a>
                  </template>
                </el-table-column>
              </el-table>
            </el-tab-pane>
            <el-tab-pane label="功能机领取记录">
              <el-table
                :data="phonesData"
                style="width: 100%;"
                border
                stripe
                height="600"
              >
                <el-table-column type="index" label="#"></el-table-column>
                <el-table-column prop="empNum" label="工号" width="100">
                </el-table-column>
                <el-table-column prop="empName" label="姓名" width="100">
                </el-table-column>
                <el-table-column prop="area" label="所属厂" width="100">
                </el-table-column>
                <el-table-column prop="empDep" label="部门" width="150">
                </el-table-column>
                <el-table-column prop="longTel" label="长号" width="150">
                </el-table-column>
                <el-table-column prop="shortTel" label="短号" width="100">
                </el-table-column>
                <el-table-column prop="status" label="状态" width="100">
                  <template slot-scope="scope">
                    <el-tag v-if="scope.row.status === 0" type="danger"
                      >已发出</el-tag
                    >
                    <el-tag v-if="scope.row.status === 1" type="success"
                      >已退回</el-tag
                    >

                    <el-tag v-if="scope.row.status === 2" type="warning"
                      >其他</el-tag
                    >
                  </template>
                </el-table-column>
                <el-table-column show-overflow-tooltip prop="ill" label="备注">
                </el-table-column>
                <el-table-column label="操作" width="150">
                  <template slot-scope="scope">
                    <el-button
                      icon="el-icon-edit"
                      size="mini"
                      @click="alert(scope.row.empNum)"
                    ></el-button>
                    <el-button
                      type="danger"
                      icon="el-icon-delete-solid"
                      size="mini"
                    ></el-button>
                  </template>
                </el-table-column>
              </el-table>
            </el-tab-pane>
            <el-tab-pane disabled label="电脑档案记录"
              >电脑档案记录</el-tab-pane
            >
          </el-tabs>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { getEmpData, getFilesData, getPhonesData } from "@/api/MISreads";
export default {
  name: "Misreads",
  components: {},
  data() {
    return {
      MISReadsForm: {
        empText: "",
      },
      MISReadsFormRules: {
        empText: [
          { required: true, message: "请输入员工信息", trigger: "blur" },
        ],
      },
      OAMISData: [],
      filesData: [],
      phonesData: [],
    };
  },
  created() {},
  mounted() {},
  methods: {
    // 清空输入框
    clearEmpText() {
      this.$refs.MISReadsForm.resetFields();
    },
    // 提交查询
    submitEmpText() {
      this.$refs.MISReadsForm.validate((validate) => {
        if (!validate) return false;
        const empData = this.MISReadsForm.empText.split("\n");
        this.getEmpData(empData);
        this.getFilesData(empData);
        this.getPhonesData(empData);
      });
    },
    // 查询结果提示
    newTips(element, status = "") {
      if (status === "delete") {
        $("#" + element + ' [class="newTip"]').remove();
      } else {
        if ($("#" + element + ' [class="newTip"]').length == 0) {
          var html = document.getElementById(element).innerHTML;
          document.getElementById(element).innerHTML =
            html + "<span class='newTip' style='color:red'>*</span>";
        }
      }
    },
    /**
     * 网络请求
     */

    // 查询权限信息
    getEmpData(data) {
      getEmpData(data).then((res) => {
        console.log(res);
        if (res.code !== 200) {
          return Vue.prototype.$baseMessage(res.msg, "error");
        }
        if (res.data.length === 0) {
          this.newTips("tab-0", "delete");
        }
        // 新查询结果提示
        this.newTips("tab-0");
        this.OAMISData = res.data;
      });
    },
    // 查询纸质档案
    getFilesData(data) {
      getFilesData(data).then((res) => {
        console.log(res);
        if (res.code !== 200) {
          return Vue.prototype.$baseMessage(res.msg, "error");
        }
        if (res.data.length === 0) {
          this.newTips("tab-1", "delete");
        }
        // 新查询结果提示
        this.newTips("tab-1");
        this.filesData = res.data;
      });
    },
    // 查询功能机发放记录
    getPhonesData(data) {
      getPhonesData(data).then((res) => {
        console.log(res);
        if (res.code !== 200) {
          return Vue.prototype.$baseMessage(res.msg, "error");
        }
        if (res.data.length === 0) {
          this.newTips("tab-2", "delete");
        }
        // 新查询结果提示
        this.newTips("tab-2");
        this.phonesData = res.data;
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.MISreads-container {
  ::v-deep {
    .el-card__body {
      width: 100%;
      height: 700px;
    }

    .el-textarea__inner {
      width: 100%;
      height: 550px;
    }

    .el-tabs {
      width: 100%;
      height: 100%;
    }

    .demo-table-expand {
      font-size: 0;
    }

    .demo-table-expand label {
      width: 90px;
      color: #99a9bf;
    }

    .demo-table-expand .el-form-item {
      width: 50%;
      margin-right: 0;
      margin-bottom: 0;
    }
  }
}
</style>
