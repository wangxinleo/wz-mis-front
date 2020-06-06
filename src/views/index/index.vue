<template>
  <div class="index-container">
    <el-row :gutter="15">
      <!-- 介绍条 -->
      <!-- <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
        <el-alert title="欢迎来到MIS辅助管理系统" :closable="false"> </el-alert>
        <br />
      </el-col> -->
      <!-- 流程统计 -->
      <el-col :xs="24" :sm="24" :md="12" :lg="6" :xl="6">
        <el-card shadow="never">
          <div slot="header">
            <span>在线量</span>
          </div>
          <byui-chart
            :autoresize="true"
            theme="byui-echarts-theme"
            :options="fwl"
          />
          <div class="bottom">
            <span
              >日均在线量:

              <byui-count
                :start-val="MIStaskCount.startVal"
                :end-val="MIStaskCount.endVal"
                :duration="MIStaskCount.duration"
                :separator="MIStaskCount.separator"
                :prefix="MIStaskCount.prefix"
                :suffix="MIStaskCount.suffix"
                :decimals="MIStaskCount.decimals"
              />
            </span>
          </div>
        </el-card>
      </el-col>
      <el-col :xs="24" :sm="24" :md="12" :lg="6" :xl="6">
        <el-card shadow="never">
          <div slot="header">
            <span>MIS月度任务分布</span>
          </div>
          <byui-chart
            :autoresize="true"
            theme="byui-echarts-theme"
            :options="MISprocessCount"
          />
          <div class="bottom">
            <span
              >月均任务量:

              <byui-count
                :start-val="MIStaskCount.startVal"
                :end-val="MIStaskCount.endVal"
                :duration="MIStaskCount.duration"
                :separator="MIStaskCount.separator"
                :prefix="MIStaskCount.prefix"
                :suffix="MIStaskCount.suffix"
                :decimals="MIStaskCount.decimals"
              />
            </span>
          </div>
        </el-card>
      </el-col>
      <!-- 热点流程 -->
      <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
        <el-card shadow="never">
          <div slot="header">
            <span>热点流程->Top20</span>
          </div>
          <byui-chart
            :autoresize="true"
            theme="byui-echarts-theme"
            :options="hotProcess"
            @click="handleClick"
          />
          <div class="bottom">
            <span
              >近期归档量:<byui-count
                :start-val="processCount.startVal"
                :end-val="processCount.endVal"
                :duration="processCount.duration"
                :separator="processCount.separator"
                :prefix="processCount.prefix"
                :suffix="processCount.suffix"
                :decimals="processCount.decimals"
            /></span>
          </div>
        </el-card>
      </el-col>
      <!-- 11 -->
      <el-col :xs="24" :sm="24" :md="24" :lg="16" :xl="16">
        <el-card class="card" shadow="never">
          <div slot="header">
            <span>系统归档量</span>
          </div>
          <byui-chart
            :autoresize="true"
            theme="byui-echarts-theme"
            :options="ProcessNumByYY"
          />
        </el-card>
      </el-col>
      <!-- OA开发日志 -->
      <el-col :xs="24" :sm="24" :md="24" :lg="8" :xl="8">
        <el-card class="card" shadow="never">
          <div slot="header">
            <span>OA开发日志</span>
          </div>
          <el-timeline :reverse="reverse">
            <el-timeline-item
              v-for="(activity, index) in activities"
              :key="index"
              :timestamp="activity.timestamp"
              :color="activity.color"
            >
              {{ activity.content }}
            </el-timeline-item>
          </el-timeline>
        </el-card>
      </el-col>
      <!-- app按钮 -->
      <el-col
        v-for="(item, index) in iconList"
        :key="index"
        :xs="12"
        :sm="6"
        :md="3"
        :lg="3"
        :xl="3"
      >
        <app-link :to="item.link" target="_blank">
          <el-card class="icon-panel" shadow="never">
            <byui-icon
              :style="{ color: item.color }"
              :icon="['fas', item.icon]"
            ></byui-icon>
            <p>{{ item.title }}</p>
          </el-card>
        </app-link>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import ByuiChart from "@/plugins/echarts";
import ByuiCount from "@/plugins/byuiCount";
import AppLink from "@/layouts/components/Link";
import { dependencies, devDependencies } from "../../../package.json";
import {
  getMISProcessList,
  getHotProcess,
  getProcessNumByYY,
} from "@/api/processEcharts.js";
import { getFetchData } from "@/api/changeLog.js";
export default {
  name: "Index",
  components: {
    ByuiChart,
    ByuiCount,
    AppLink,
  },
  data() {
    return {
      nodeEnv: process.env.NODE_ENV,
      MIStaskCount: {
        startVal: 0,
        endVal: 0,
        decimals: 0,
        prefix: "",
        suffix: "",
        separator: ",",
        duration: 8000,
      },
      processCount: {
        startVal: 0,
        endVal: 0,
        decimals: 0,
        prefix: "",
        suffix: "",
        separator: ",",
        duration: 8000,
      },
      //访问量
      fwl: {
        grid: {
          top: "4%",
          left: "2%",
          right: "4%",
          bottom: "0%",
          containLabel: true,
        },
        xAxis: [
          {
            type: "category",
            boundaryGap: false,
            data: ["0时", "4时", "8时", "12时", "16时", "20时", "24时"],
            axisTick: {
              alignWithLabel: true,
            },
          },
        ],
        yAxis: [
          {
            type: "value",
          },
        ],
        series: [
          {
            name: "访问量",
            type: "line",
            data: [10, 52, 20, 33, 39, 33, 22],
            smooth: true,
            areaStyle: {},
          },
        ],
      },
      // MIS月度任务分布
      MISprocessCount: {},
      // 热门流程
      hotProcess: {},
      //年流程量
      ProcessNumByYY: {},
      //卡片图标
      iconList: [
        {
          icon: "book-reader",
          title: "权限查询",
          link: "/MIS/MISreads",
          color: "#ffc069",
        },
        {
          icon: "file-upload",
          title: "档案上传",
          link: "/MIS/MISedits/MISFile",
          color: "#5cdbd3",
        },
        {
          icon: "mobile-alt",
          title: "申请功能机",
          link: "/MIS/MISedits/MISmobile",
          color: "#b37feb",
        },
        {
          icon: "desktop",
          title: "OA首页",
          link: "http://172.18.8.20",
          color: "#69c0ff",
        },
        {
          icon: "bullhorn",
          title: "敬请期待",
          link: "",
          color: "#ff85c0",
        },
        {
          icon: "gift",
          title: "敬请期待",
          link: "",
          color: "#ffd666",
        },

        {
          icon: "balance-scale-left",
          title: "敬请期待",
          link: "",
          color: "#ff9c6e",
        },
        {
          icon: "coffee",
          title: "敬请期待",
          link: "",
          color: "#95de64",
        },
      ],
      //OA开发日志
      reverse: true,
      activities: [],
    };
  },
  created() {
    this.loadLocalStorage();
  },
  mounted() {},
  methods: {
    // 加载缓存数据
    loadLocalStorage() {
      if (
        !localStorage.getItem("loadTime") ||
        localStorage.getItem("loadTime") < Date.now()
      ) {
        // 加载图表
        // 有了一个新的idea
        async () => {
          this.getMISProcessList();
          this.getHotProcess();
          this.getProcessNumByYY();
          await localStorage.setItem("loadTime", Date.now() + 60 * 60 * 1000);
        };
      } else {
        // 加载缓存的数据
        this.MISprocessCount = JSON.parse(
          localStorage.getItem("MISprocessCount")
        ).data;
        this.hotProcess = JSON.parse(localStorage.getItem("hotProcess")).data;
        // this.FetchData = JSON.parse(localStorage.getItem("")).data;
        this.ProcessNumByYY = JSON.parse(
          localStorage.getItem("ProcessNumByYY")
        ).data;

        this.MIStaskCount.endVal = JSON.parse(
          localStorage.getItem("MISprocessCount")
        ).totalCount;
        this.processCount.endVal = JSON.parse(
          localStorage.getItem("hotProcess")
        ).totalCount;
      }
    },
    // 缓存到本地
    setlocalData(value, res) {
      const obj = {
        totalCount: res.totalCount,
        // date: Date.now() + 60 * 60 * 1000,
        data: res.data,
      };
      const temp = JSON.stringify(obj);
      localStorage.setItem(value, temp);
    },
    handleClick(e) {
      this.$baseMessage(`点击了${e.name},这里可以写跳转`);
    },
    // MIS月度任务分布
    getMISProcessList() {
      getMISProcessList().then((res) => {
        // 呈现数据
        this.MISprocessCount = res.data;
        //缓存到本地
        this.setlocalData("MISprocessCount", res);
        // 获取总数
        this.MIStaskCount.endVal = res.totalCount;
      });
    },
    // 热门流程
    getHotProcess() {
      getHotProcess().then((res) => {
        this.hotProcess = res.data;
        // 缓存到本地
        this.setlocalData("hotProcess", res);
        // 计算总数
        this.processCount.endVal = res.totalCount;
      });
    },
    // 近两年流程归档量对比
    getProcessNumByYY() {
      getProcessNumByYY().then((res) => {
        this.ProcessNumByYY = res.data;
        // 缓存到本地
        this.setlocalData("ProcessNumByYY", res);
      });
    },
    // OA开发日志
    getFetchData() {
      getFetchData().then((res) => {
        res.data.map((item, index) => {
          if (index === res.data.length - 1) {
            item.color = "#0bbd87";
          }
        });
        this.activities = res.data;
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
        height: 140px;
      }
    }
  }

  .card {
    min-height: 395px;

    ::v-deep {
      .el-card__body {
        .echarts {
          width: 100%;
          height: 305px;
        }
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

  .icon-panel {
    text-align: center;
    cursor: pointer;

    svg {
      font-size: 40px;
    }

    p {
      margin-top: 20px;
    }
  }
}
</style>
