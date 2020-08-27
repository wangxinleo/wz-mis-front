<template>
  <div class="EmpInShow-container">
    <el-row :gutter="15">
      <el-col :xs="24" :sm="24" :md="8" :lg="6" :xl="4">
        <el-card>
          <el-form
            ref="EmpInShowForm"
            :model="EmpInShowForm"
            :rules="EmpInShowFormRules"
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
                id="empText"
                v-model="EmpInShowForm.empText"
                type="textarea"
              >
              </el-input>
            </el-form-item>
          </el-form>
        </el-card>
      </el-col>
      <el-col :xs="24" :sm="24" :md="16" :lg="18" :xl="20">
        <el-card>
          <el-table :data="EmpInShowTable.data" border height="630">
            <el-table-column type="index" label="#">
              <template slot-scope="scope">
                {{
                  (EmpInShowTable.page - 1) * EmpInShowTable.pageSize +
                  scope.$index +
                  1
                }}
              </template>
            </el-table-column>
            <el-table-column prop="chineseName" label="中文名" width="180">
            </el-table-column>
            <el-table-column prop="employeecode" label="工号" width="180">
            </el-table-column>
            <el-table-column prop="ondutytime" label="入职时间">
            </el-table-column>
            <el-table-column prop="outdutytime" label="离职时间">
            </el-table-column>
          </el-table>
          <el-pagination
            layout="total, prev, pager, next, jumper"
            :total="EmpInShowTable.total"
            @current-change="EmpInShowCurrentChange"
          >
          </el-pagination>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { getEmpOnDutyTime } from "@/api/support";
import _ from "lodash";
export default {
  name: "EmpInShow",
  components: {},
  data() {
    return {
      EmpInShowForm: {
        empText: "",
        pageSize: 50,
        page: 0,
      },
      EmpInShowFormRules: {
        empText: [
          { required: true, message: "请输入员工信息", trigger: "blur" },
        ],
      },
      EmpInShowTable: {
        page: 1,
        pageSize: 20,
        total: 1,
        data: [
          {
            chineseName: "测试1",
            employeecode: 852134,
            ondutytime: "2020-8-27 16:02:49",
            outdutytime: "2020-8-27 16:02:49",
          },
        ],
      },
    };
  },
  created() {},
  mounted() {},
  methods: {
    // 清空输入框
    clearEmpText() {
      this.$refs.EmpInShowForm.resetFields();
    },
    // 提交查询
    submitEmpText() {
      this.$refs.EmpInShowForm.validate((validate) => {
        // 空input return
        if (!validate) return false;
        // 深拷贝数据
        const searchData = this.returnSearchData();
        this.getEmpOnDutyTime(searchData);
      });
    },
    EmpInShowCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    // 处理待提交的表单数据
    returnSearchData(form) {
      // 深拷贝数据
      const searchData = _.cloneDeep(this.EmpInShowForm);
      searchData.empText = searchData.empText.split("\n");
      if (form) {
        searchData.page = form.page;
        searchData.pageSize = form.pageSize;
      }
      return searchData;
    },
    // 异步环节
    getEmpOnDutyTime(data) {
      getEmpOnDutyTime(data)
        .then((res) => {
          console.log(res);
        })
        .catch((res) => {
          console.log(res);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.EmpInShow-container {
  ::v-deep {
    .el-card__body {
      width: 100%;
      height: 708px;
    }

    #empText {
      width: 100%;
      height: 580px;
    }

    // .el-table__body-wrapper {
    //   width: 100%;
    //   height: 590px;
    // }
  }
}
</style>
