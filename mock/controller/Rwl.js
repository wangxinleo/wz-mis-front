import { mock } from "mockjs";

export default [
  {
    url: "/Rwl/getGZLList",
    type: "post",
    response: (config) => {
      return {
        code: 200,
        msg: "success",
        totalCount: 31,
        data: mock({
          data: {
            tooltip: {
              trigger: "item",
              formatter: "{a} <br/>{b}: {c} ({d}%)",
            },
            legend: {
              orient: "vertical",
              left: 10,
              data: [
                "直接访问",
                "邮件营销",
                "联盟广告",
                "视频广告",
                "搜索引擎",
              ],
            },
            series: [
              {
                name: "访问来源",
                type: "pie",
                radius: ["50%", "70%"],
                avoidLabelOverlap: false,
                label: {
                  show: false,
                  position: "center",
                },
                emphasis: {
                  label: {
                    show: true,
                    fontSize: "30",
                    fontWeight: "bold",
                  },
                },
                labelLine: {
                  show: false,
                },
                data: [
                  { value: 335, name: "直接访问" },
                  { value: 310, name: "邮件营销" },
                  { value: 234, name: "联盟广告" },
                  { value: 135, name: "视频广告" },
                  { value: 1548, name: "搜索引擎" },
                ],
              },
            ],
          },
        }).data,
      };
    },
  },
  {
    url: "/Rwl/getCY",
    type: "post",
    response: (config) => {
      return {
        code: 200,
        msg: "success",
        totalCount: 31,
        data: mock({
          data: {
            grid: {
              top: "4%",
              left: "2%",
              right: "4%",
              bottom: "0%",
            },
            series: [
              {
                type: "wordCloud",
                gridSize: 15,
                sizeRange: [12, 40],
                rotationRange: [0, 0],
                width: "100%",
                height: "100%",
                textStyle: {
                  normal: {
                    color: () => {
                      const arr = [
                        "#1890FF",
                        "#36CBCB",
                        "#4ECB73",
                        "#FBD437",
                        "#F2637B",
                        "#975FE5",
                      ];
                      let index = Math.floor(Math.random() * arr.length);
                      return arr[index];
                    },
                  },
                },
                "data|2-25": [
                  {
                    name: "@cword(3,5)",
                    "value|4-1000": 100,
                  },
                ],
              },
            ],
          },
        }).data,
      };
    },
  },
  {
    url: "/Rwl/doEdit",
    type: "post",
    response: (config) => {
      return {
        code: 200,
        msg: "模拟保存成功",
      };
    },
  },
  {
    url: "/Rwl/doDelete",
    type: "post",
    response: (config) => {
      return {
        code: 200,
        msg: "模拟删除成功",
      };
    },
  },
];
