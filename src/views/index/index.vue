<template>
  <div class="index-container">
    <el-row :gutter="15">
      <!-- 介绍条 -->
      <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
        <el-alert title="欢迎来到MIS辅助管理系统" :closable="false"> </el-alert>
        <br />
      </el-col>
      <!-- 流程统计 -->
      <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
        <el-card shadow="never" class="card">
          <div slot="header">
            <span>MIS流程统计</span>
          </div>
          <byui-chart
            :autoresize="true"
            theme="byui-echarts-theme"
            :options="fwl"
          />
          <div class="bottom">
            <span
              >月均任务量:

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
      <!-- 热点流程 -->
      <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
        <el-card shadow="never" class="card">
          <div slot="header">
            <span>热点流程</span>
          </div>
          <byui-chart
            :autoresize="true"
            theme="byui-echarts-theme"
            :options="cy"
            @click="handleClick"
          />
          <div class="bottom">
            <span
              >近期归档量:<byui-count
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
      <!-- 更新日志 -->
      <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
        <el-card class="card" shadow="never">
          <div slot="header">
            <span>更新日志</span>
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
    </el-row>
  </div>
</template>

<script>
import ByuiChart from "@/plugins/echarts";
import ByuiCount from "@/plugins/byuiCount";
import AppLink from "@/layouts/components/Link";
import { dependencies, devDependencies } from "../../../package.json";
import { getGZLList, getCY } from "@/api/Rwl.js";
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
      config1: {
        startVal: 0,
        endVal: 0,
        decimals: 0,
        prefix: "",
        suffix: "",
        separator: ",",
        duration: 8000,
      },
      config3: {
        startVal: 0,
        endVal: 0,
        decimals: 0,
        prefix: "",
        suffix: "",
        separator: ",",
        duration: 8000,
      },
      //访问量
      fwl: {},
      // 词云
      cy: {},
      //卡片图标
      iconList: [
        {
          icon: "video",
          title: "视频播放器",
          link: "/byui/player",
          color: "#ffc069",
        },
        {
          icon: "table",
          title: "表格",
          link: "/byui/table/comprehensiveTable",
          color: "#5cdbd3",
        },
        {
          icon: "laptop-code",
          title: "源码",
          link: "https://github.com/chuzhixin/vue-admin-beautiful",
          color: "#b37feb",
        },
        {
          icon: "book",
          title: "XXX",
          link: "",
          color: "#69c0ff",
        },
        {
          icon: "bullhorn",
          title: "XXX",
          link: "",
          color: "#ff85c0",
        },
        {
          icon: "gift",
          title: "XXX",
          link: "",
          color: "#ffd666",
        },

        {
          icon: "balance-scale-left",
          title: "公平的世界",
          link: "",
          color: "#ff9c6e",
        },
        {
          icon: "coffee",
          title: "休息一下",
          link: "",
          color: "#95de64",
        },
      ],
      //更新日志
      reverse: true,
      activities: [],
    };
  },
  created() {
    this.getGZLList();
    this.getCY();
    this.getFetchData();
  },
  mounted() {},
  methods: {
    handleClick(e) {
      this.$baseMessage(`点击了${e.name},这里可以写跳转`);
    },
    // MIS流程统计
    getGZLList() {
      getGZLList().then((res) => {
        console.log(res);
        this.fwl = res.data;
        this.config1.endVal = res.totalCount;
      });
    },
    // 词云
    getCY() {
      getCY().then((res) => {
        console.log(res);
        this.cy = res.data;
        this.config3.endVal = res.totalCount;
      });
    },
    // 更新日志
    getFetchData() {
      getFetchData().then((res) => {
        console.log(res);
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
        height: 200px;
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
