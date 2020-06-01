<template>
  <div class="index-container">
    <el-row :gutter="15">
      <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
        <el-card shadow="never">
          <div slot="header">
            <span>日均任务量</span>
          </div>
          <byui-chart
            :autoresize="true"
            theme="byui-echarts-theme"
            :options="fwl"
          />
          <div class="bottom">
            <span
              >日均任务量:

              <byui-count
                :start-val="config1.startVal"
                :end-val="config1.endVal"
                :duration="config1.duration"
                :separator="config1.separator"
                :prefix="config1.prefix"
                :suffix="config1.suffix"
                :decimals="config1.decimals"
              />
            </span>
          </div>
        </el-card>
      </el-col>
      <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
        <el-card shadow="never">
          <div slot="header">
            <span>热词检索</span>
          </div>
          <byui-chart
            :autoresize="true"
            theme="byui-echarts-theme"
            :options="cy"
            @click="handleClick"
          />
          <div class="bottom">
            <span
              >热点数量:<byui-count
                :start-val="config3.startVal"
                :end-val="config3.endVal"
                :duration="config3.duration"
                :separator="config3.separator"
                :prefix="config3.prefix"
                :suffix="config3.suffix"
                :decimals="config3.decimals"
            /></span>
          </div>
        </el-card>
      </el-col>
      <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
        <el-card>
          欢迎来到MIS辅助管理系统
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import ByuiChart from "@/plugins/echarts";
import ByuiCount from "@/plugins/byuiCount";

import { getGZLList, getCY } from "@/api/Rwl.js";
export default {
  name: "Index",
  components: {
    ByuiChart,
    ByuiCount,
  },
  data() {
    return {
      nodeEnv: process.env.NODE_ENV,
      config1: {
        startVal: 0,
        endVal: this.$baseLodash.random(2, 200),
        decimals: 0,
        prefix: "",
        suffix: "",
        separator: ",",
        duration: 8000,
      },
      config3: {
        startVal: 0,
        endVal: this.$baseLodash.random(1000, 20000),
        decimals: 0,
        prefix: "",
        suffix: "",
        separator: ",",
        duration: 8000,
      },
      //访问量
      fwl: {},
      cy: {},
    };
  },
  created() {
    this.getGZLList();
    this.getCY();
  },
  mounted() {},
  methods: {
    handleClick(e) {
      this.$baseMessage(`点击了${e.name},这里可以写跳转`);
    },
    getGZLList() {
      getGZLList().then((res) => {
        console.log(res);
        this.fwl = res.data;
      });
    },
    getCY() {
      getCY().then((res) => {
        console.log(res);
        this.cy = res.data;
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.index-container {
  ::v-deep {
    .el-card__body {
      .echarts {
        width: 100%;
        height: 200px;
      }
    }
  }

  .bottom {
    height: 40px;
    padding-top: 20px;
    margin-top: 5px;
    color: #595959;
    text-align: left;
    border-top: 1px solid $base-border-color;
  }
}
</style>
