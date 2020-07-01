<template>
  <div class="MISPCMaintain-container">
    <byui-query-form>
      <byui-query-form-left-panel :span="12">
        <el-form :inline="true" @submit.native.prevent>
          <el-form-item label="文件名">
            <el-input v-model="filename" placeholder="请输出要导出文件的名称" />
          </el-form-item>
          <el-form-item label="文件类型">
            <el-select v-model="bookType" style="width: 100px;">
              <el-option
                v-for="item in options"
                :key="item"
                :label="item"
                :value="item"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="自动列宽">
            <el-radio-group v-model="autoWidth">
              <el-radio :label="true">
                是
              </el-radio>
              <el-radio :label="false">
                否
              </el-radio>
            </el-radio-group>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="handleDownload">
              导出 Excel
            </el-button>
          </el-form-item>
        </el-form>
      </byui-query-form-left-panel>
      <byui-query-form-right-panel :span="12">
        <el-form :inline="true">
          <el-form-item>
            <el-checkbox-group v-model="checkList">
              <el-checkbox label="维修中"></el-checkbox>
              <el-checkbox label="已报废"></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item>
            <el-date-picker
              v-model="dateInterval"
              type="daterange"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              style="width: 250px;"
              @change="changeDate"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-input
              v-model="searchForm.empText"
              placeholder="请输入内容"
              clearable
            >
              <el-select
                slot="prepend"
                v-model="searchForm.select"
                placeholder="请选择"
                style="width: 100px;"
              >
                <el-option label="OA单号" value="OAid"></el-option>
                <el-option label="所属厂" value="listFactory"></el-option>
                <el-option label="电脑编号" value="CNum"></el-option>
                <el-option label="联系人" value="Contact"></el-option>
                <el-option label="维修人" value="Maintainer"></el-option>
              </el-select>
              <el-button
                slot="append"
                icon="el-icon-search"
                @click="submitSearchForm()"
              ></el-button>
            </el-input>
          </el-form-item>
        </el-form>
      </byui-query-form-right-panel>
    </byui-query-form>
    <el-table
      v-loading="loading.MISPCMaintainData"
      :data="MISPCMaintainData.data"
      border
      style="width: 100%;"
      stripe
      height="620"
    >
      <el-table-column type="expand">
        <template slot-scope="scope">
          <el-form
            label-position="left"
            class="demo-table-expand"
            label-width="150px"
          >
            <el-form-item label="计算机密码">
              <span>{{ scope.row.Pass }}</span>
            </el-form-item>
            <el-form-item label="维修原因">
              <span>{{ scope.row.Info }}</span>
            </el-form-item>
            <el-form-item v-if="scope.row.Scrap" label="报废原因">
              <span>{{ scope.row.Scrap }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column type="index" label="#">
        <template slot-scope="scope">
          {{
            (MISPCMaintainData.page - 1) * MISPCMaintainData.pageSize +
            scope.$index +
            1
          }}
        </template>
      </el-table-column>
      <el-table-column
        prop="OAid"
        label="OA单号"
        show-overflow-tooltip
        width="150"
      >
      </el-table-column>
      <el-table-column prop="listFactory" label="所属厂" show-overflow-tooltip>
      </el-table-column>
      <el-table-column prop="CNum" label="电脑编号" show-overflow-tooltip>
      </el-table-column>
      <el-table-column prop="Contact" label="联系人" show-overflow-tooltip>
      </el-table-column>
      <el-table-column prop="Tel" label="联系电话" show-overflow-tooltip>
      </el-table-column>
      <el-table-column prop="Maintainer" label="维修人"> </el-table-column>
      <el-table-column prop="STA" label="状态" width="150">
        <template slot-scope="scope">
          <el-tag
            v-if="scope.row.STA === '完成'"
            effect="dark"
            type="success"
            >{{ scope.row.STA }}</el-tag
          >
          <el-tag
            v-if="scope.row.STA === '维修中'"
            effect="dark"
            type="warning"
            >{{ scope.row.STA }}</el-tag
          >
        </template>
      </el-table-column>
      <el-table-column prop="StartDate" label="申请时间" width="150">
        <template slot-scope="scope">
          {{ scope.row.StartDate | formatDate }}
        </template>
      </el-table-column>
      <el-table-column prop="FinishDate" label="完成时间" width="150">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.FinishDate.substr(0, 10) == '1900-01-01'"
            >未完成</el-tag
          >
          <span v-else>{{ scope.row.FinishDate | formatDate }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="Scrap" label="是否报废" width="90">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.Scrap" type="danger">已报废</el-tag>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      :current-page="MISPCMaintainData.page"
      :page-sizes="[50, 100, 200, 400]"
      :page-size="MISPCMaintainData.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total.MISPCMaintainData"
      @size-change="MISPCMaintainDataSizeChange"
      @current-change="MISPCMaintainDataCurrentChange"
    >
    </el-pagination>
  </div>
</template>

<script>
import { getMISPCMaintainData } from "@/api/MISreads";
import moment from "moment";
import _ from "lodash";

export default {
  name: "MISPCMaintain",
  components: {},
  filters: {
    formatDate(value) {
      if (!value) return "";
      return moment(value).format("YYYY-MM-DD");
    },
  },
  data() {
    return {
      searchForm: {
        empText: "",
        select: "",
        checkList: [],
        page: 1,
        pageSize: 100,
        startDate: "2019-01-01",
        overDate: "",
      },
      MISPCMaintainData: {},
      // 总行数
      total: {
        MISPCMaintainData: 0,
      },
      // 加载动画
      loading: {
        MISPCMaintainData: false,
      },
      // 筛选
      checkList: [],
      dateInterval: [],
      // Excel
      downloadLoading: false,
      filename: "",
      autoWidth: true,
      bookType: "xlsx",
      options: ["xlsx", "csv", "txt"],
    };
  },
  computed: {
    nowDate() {
      const value = moment(new Date()).format("YYYY-MM-DD");
      return value;
    },
  },
  watch: {
    dateInterval(newvalue, oldvalue) {
      if (newvalue) {
        this.searchForm.startDate = moment(newvalue[0]).format("YYYY-MM-DD");
        this.searchForm.overDate = moment(newvalue[1]).format("YYYY-MM-DD");
      } else {
        this.searchForm.startDate = "2019-01-01";
        this.searchForm.overDate = this.nowDate;
        this.submitSearchForm();
      }
    },
    checkList(newvalue, oldvalue) {
      this.searchForm.checkList = newvalue;
      this.submitSearchForm();
    },
  },
  created() {
    this.searchForm.overDate = this.nowDate;
    this.submitSearchForm();
  },
  mounted() {},
  methods: {
    // 提交查询
    submitSearchForm() {
      const searchData = this.returnSearchData();
      this.getMISPCMaintainData(searchData);
    },
    // 电脑维修记录 分页数量
    MISPCMaintainDataSizeChange(val) {
      this.getMISPCMaintainData({
        empText: this.MISPCMaintainData.searchHistroy,
        page: this.MISPCMaintainData.page,
        pageSize: val,
        startDate: this.MISPCMaintainData.startDate,
        overDate: this.MISPCMaintainData.overDate,
        select: this.MISPCMaintainData.select,
        checkList: this.MISPCMaintainData.checkList,
      });
    },
    // 电脑维修记录 当前页
    MISPCMaintainDataCurrentChange(val) {
      this.getMISPCMaintainData({
        empText: this.MISPCMaintainData.searchHistroy,
        page: val,
        pageSize: this.MISPCMaintainData.pageSize,
        startDate: this.MISPCMaintainData.startDate,
        overDate: this.MISPCMaintainData.overDate,
        select: this.MISPCMaintainData.select,
        checkList: this.MISPCMaintainData.checkList,
      });
    },
    // 处理待提交的表单数据
    returnSearchData(form) {
      // 深拷贝数据
      const searchData = _.cloneDeep(this.searchForm);
      if (searchData.empText) {
        searchData.empText = searchData.empText.split(" ");
      } else {
        searchData.empText = [];
      }

      if (form) {
        searchData.page = form.page;
        searchData.pageSize = form.pageSize;
      }

      return searchData;
    },
    // 日期选择器确认
    changeDate() {
      this.searchForm.pageSize = 400;
      this.submitSearchForm();
    },
    // 导出excel
    async handleDownload() {
      this.downloadLoading = true;
      const { export_json_to_excel } = await import("@/vendor/ExportExcel");
      const tHeader = [
        "OA单号",
        "所属厂",
        "电脑编号",
        "联系人",
        "联系电话",
        "维修人",
        "状态",
        "申请时间",
        "完成时间",
        "报废",
        "维修原因",
      ];
      const filterVal = [
        "OAid",
        "listFactory",
        "CNum",
        "Contact",
        "Tel",
        "Maintainer",
        "STA",
        "StartDate",
        "FinishDate",
        "Scrap",
        "Info",
      ];
      const list = this.MISPCMaintainData.data;
      const data = this.formatJson(filterVal, list);
      export_json_to_excel({
        header: tHeader,
        data,
        filename: this.filename,
        autoWidth: this.autoWidth,
        bookType: this.bookType,
      });
      this.downloadLoading = false;
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map((v) =>
        filterVal.map((j) => {
          return v[j];
        })
      );
    },
    // 电脑维修记录
    async getMISPCMaintainData(data) {
      // 加载动画
      this.loading.MISPCMaintainData = true;
      await getMISPCMaintainData(data)
        .then((res) => {
          // 记录总行数，不然大于1页时无法返回正确的总数
          if (res.page == 1) {
            this.total.MISPCMaintainData = res.totalCount;
          }
          // 呈现数据
          this.MISPCMaintainData = res;
          // 关闭加载动画
          this.loading.MISPCMaintainData = false;
        })
        .catch((err) => {
          // 关闭加载动画
          this.loading.MISPCMaintainData = false;
        });
    },
  },
};
</script>
<style lang="scss" scoped>
.MISPCMaintain-container {
  ::v-deep {
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
