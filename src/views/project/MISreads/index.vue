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
                v-loading="loading.OAMISData"
                :data="OAMISData.data"
                style="width: 100%;"
                border
                stripe
                height="560"
              >
                <el-table-column type="expand">
                  <template slot-scope="scope">
                    <el-form
                      label-position="left"
                      class="demo-table-expand"
                      label-width="150px"
                    >
                      <el-form-item label="所任职务">
                        <span>{{ scope.row.XmlData.text_zw }}</span>
                      </el-form-item>
                      <el-form-item label="联系电话">
                        <span>{{ scope.row.XmlData.text_lxdh }}</span>
                      </el-form-item>
                      <el-form-item label="姓名全拼">
                        <span>{{ scope.row.XmlData.text_xmqp }}</span>
                      </el-form-item>
                      <el-form-item label="登记的邮箱密码">
                        <span>{{ scope.row.XmlData.text_mm }}</span>
                      </el-form-item>
                      <el-form-item label="OA单号">
                        <span
                          ><a @click="dumpOAdoc(scope.row)">{{
                            scope.row.WF_DocNumber
                          }}</a></span
                        >
                      </el-form-item>
                    </el-form>
                  </template>
                </el-table-column>
                <el-table-column type="index" label="#">
                  <template slot-scope="scope">
                    {{
                      (OAMISData.page - 1) * OAMISData.pageSize +
                      scope.$index +
                      1
                    }}
                  </template>
                </el-table-column>
                <el-table-column
                  prop="XmlData.text_gh"
                  label="工号"
                  width="100"
                >
                </el-table-column>
                <el-table-column
                  prop="XmlData.text_xm"
                  label="姓名"
                  width="100"
                >
                </el-table-column>
                <el-table-column
                  prop="XmlData.text_bm"
                  label="部门"
                  width="150"
                >
                </el-table-column>
                <el-table-column
                  prop="XmlData.text_jsjmc"
                  label="电脑编号"
                  width="150"
                >
                </el-table-column>
                <el-table-column prop="powers" label="权限" width="250">
                  <template slot-scope="scope">
                    <el-tag v-if="scope.row.XmlData.sqlb_nb === '内邮Mail权限'"
                      >内邮</el-tag
                    >
                    <el-tag
                      v-if="scope.row.XmlData.sqlb_i === 'Internet权限'"
                      type="danger"
                      >外网</el-tag
                    >
                    <el-tag
                      v-if="scope.row.XmlData.sqlb_wb === '外部Mail权限'"
                      type="info"
                      >外邮</el-tag
                    >
                    <el-tag
                      v-if="
                        scope.row.XmlData.sqlb_wx === true ||
                        String(scope.row.XmlData.text_qt).indexOf('微信') !== -1
                      "
                      type="success"
                      >微信</el-tag
                    >
                  </template>
                </el-table-column>
                <el-table-column
                  show-overflow-tooltip
                  prop="XmlData.text_qt"
                  label="其他说明"
                >
                </el-table-column>
                <el-table-column
                  prop="WF_DocCreated"
                  label="申请时间"
                  width="150"
                >
                </el-table-column>
              </el-table>
              <el-pagination
                :current-page="OAMISData.page"
                :page-sizes="[10, 20, 50, 100]"
                :page-size="OAMISData.pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total.OAMISData"
                @size-change="OAMISDataSizeChange"
                @current-change="OAMISDataCurrentChange"
              >
              </el-pagination>
            </el-tab-pane>
            <el-tab-pane label="纸质档案记录">
              <el-table
                :data="filesData.data"
                style="width: 100%;"
                border
                stripe
                height="560"
              >
                <el-table-column type="index" label="#"></el-table-column>
                <el-table-column prop="path" label="匹配记录">
                  <template slot-scope="scope">
                    <a @click="dumpFile(scope.row)">{{ scope.row.name }}</a>
                  </template>
                </el-table-column>
              </el-table>
            </el-tab-pane>
            <el-tab-pane label="功能机领取记录">
              <el-table
                :data="phonesData.data"
                style="width: 100%;"
                border
                stripe
                height="560"
              >
                <el-table-column type="index" label="#"></el-table-column>
                <el-table-column prop="employeeCode" label="工号" width="100">
                </el-table-column>
                <el-table-column prop="employeeName" label="姓名" width="100">
                </el-table-column>
                <el-table-column prop="area" label="所属厂" width="100">
                </el-table-column>
                <el-table-column prop="Department" label="部门" width="150">
                </el-table-column>
                <el-table-column prop="issuePhoneNum" label="长号" width="150">
                </el-table-column>
                <el-table-column prop="issuePhoneSort" label="短号" width="100">
                </el-table-column>
                <el-table-column prop="isReturn" label="状态" width="100">
                  <template slot-scope="scope">
                    <el-tag
                      v-if="scope.row.isReturn === '已发出'"
                      type="danger"
                      >{{ scope.row.isReturn }}</el-tag
                    >
                    <el-tag
                      v-if="scope.row.isReturn === '已退回'"
                      type="success"
                      >{{ scope.row.isReturn }}</el-tag
                    >

                    <el-tag
                      v-if="scope.row.isReturn === '其他'"
                      type="warning"
                      >{{ scope.row.isReturn }}</el-tag
                    >
                  </template>
                </el-table-column>
                <el-table-column
                  show-overflow-tooltip
                  prop="remark"
                  label="备注"
                >
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
              <el-pagination
                :current-page="phonesData.page"
                :page-sizes="[10, 20, 50, 100]"
                :page-size="phonesData.pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total.phonesData"
                @size-change="phonesDataSizeChange"
                @current-change="phonesDataCurrentChange"
              >
              </el-pagination>
            </el-tab-pane>
            <el-tab-pane disabled label="电脑档案记录"
              >电脑档案记录</el-tab-pane
            >
          </el-tabs>
        </el-card>
      </el-col>
    </el-row>
    <!-- 图片弹出框 -->
    <el-dialog
      title="文件预览"
      :visible.sync="fileVisible"
      :before-close="fileClose"
      width="80%"
    >
      <div>
        <img :src="fileUrl" />
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  getEmpData,
  getFilesData,
  getPhonesData,
  openFilesUrl,
} from "@/api/MISreads";
import _ from "lodash";
export default {
  name: "Misreads",
  components: {},
  data() {
    return {
      MISReadsForm: {
        empText: "",
        page: 1,
        pageSize: 100,
      },
      MISReadsFormRules: {
        empText: [
          { required: true, message: "请输入员工信息", trigger: "blur" },
        ],
      },
      // OA权限申请记录
      OAMISData: [],
      // 纸质档案记录
      filesData: [],
      // 功能机领取记录
      phonesData: [],
      // 分页总量
      total: {
        OAMISData: 0,
        filesData: 0,
        phonesData: 0,
      },
      // 加载动画
      loading: {
        OAMISData: false,
        filesData: false,
        phonesData: false,
      },
      // 图片弹出框
      fileVisible: false,
      fileUrl: "",
    };
  },
  created() {},
  mounted() {},
  methods: {
    // OA权限申请记录 分页数量
    phonesDataSizeChange(val) {
      this.getPhonesData({
        empText: this.phonesData.searchHistroy,
        page: this.phonesData.page,
        pageSize: val,
      });
    },
    // OA权限申请记录 当前页
    phonesDataCurrentChange(val) {
      this.getPhonesData({
        empText: this.phonesData.searchHistroy,
        page: val,
        pageSize: this.phonesData.pageSize,
      });
    },
    // OA权限申请记录 分页数量
    OAMISDataSizeChange(val) {
      this.getEmpData({
        empText: this.OAMISData.searchHistroy,
        page: this.OAMISData.page,
        pageSize: val,
      });
    },
    // OA权限申请记录 当前页
    OAMISDataCurrentChange(val) {
      this.getEmpData({
        empText: this.OAMISData.searchHistroy,
        page: val,
        pageSize: this.OAMISData.pageSize,
      });
    },
    // 打开OA表单
    dumpOAdoc(row) {
      const href =
        "http://172.18.8.20/bpm/linkey_workflow_engine.nsf/workflow_doc?readform&WF_ProcessUNID=" +
        row.WF_ProcessUNID +
        "&WF_DocUNID=" +
        row.WF_DocUNID +
        "&WF_DocAction=read";
      // 新标签页打开
      window.open(href);
    },
    // 打开纸质档案图片
    dumpFile(row) {
      this.fileVisible = true;
      console.log(row);
      this.openFilesUrl(row);
    },
    // 关闭纸质档案
    fileClose() {
      this.fileVisible = false;
      this.fileUrl = "";
    },
    // 清空输入框
    clearEmpText() {
      this.$refs.MISReadsForm.resetFields();
    },
    // 提交查询
    submitEmpText() {
      this.$refs.MISReadsForm.validate((validate) => {
        // 空input return
        if (!validate) return false;
        // 深拷贝数据
        const searchData = _.cloneDeep(this.MISReadsForm);
        searchData.empText = searchData.empText.split("\n");
        // 加载动画
        this.loading.OAMISData = true;
        this.loading.filesData = true;
        this.loading.phonesData = true;
        // 执行查询
        this.getEmpData(searchData);
        this.getFilesData(searchData);
        this.getPhonesData(searchData);
      });
    },
    // tag标签页旁边的新数据小星星
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

    // 查询OA权限申请记录
    getEmpData(data) {
      getEmpData(data)
        .then((res) => {
          // 记录总行数，不然大于1页时无法返回正确的总数
          if (res.page == 1) {
            this.total.OAMISData = res.totalCount;
          }
          // 新查询结果提示
          this.newTips("tab-0");
          // 呈现数据
          this.OAMISData = res;
          // 关闭加载动画
          this.loading.OAMISData = false;
        })
        .catch((err) => {
          this.newTips("tab-0", "delete");
          this.loading.OAMISData = false;
          this.OAMISData = "";
        });
    },
    // 查询纸质档案记录
    getFilesData(data) {
      getFilesData(data)
        .then((res) => {
          // 新查询结果提示
          this.newTips("tab-1");
          this.filesData = res;
        })
        .catch((err) => {
          this.newTips("tab-1", "delete");
          this.loading.filesData = false;
          this.filesData = "";
        });
    },
    // 打开纸质档案图片
    openFilesUrl(data) {
      openFilesUrl(data).then((res) => {
        this.fileUrl = res.data;
      });
    },
    // 查询功能机发放记录
    getPhonesData(data) {
      getPhonesData(data)
        .then((res) => {
          // 记录总行数，不然大于1页时无法返回正确的总数
          if (res.page == 1) {
            this.total.phonesData = res.totalCount;
          }
          // 新查询结果提示
          this.newTips("tab-2");
          this.phonesData = res;
        })
        .catch((err) => {
          this.newTips("tab-2", "delete");
          this.loading.phonesData = false;
          this.phonesData = "";
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
      height: 708px;
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
