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
            grid: {
              top: "4%",
              left: "2%",
              right: "4%",
              bottom: "0%",
              containLabel: true,
            },
            xAxis: {
              type: "category",
              data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
            },
            yAxis: {
              type: "value",
            },
            series: [
              {
                data: [120, 200, 150, 80, 70, 110, 130],
                type: "bar",
                showBackground: true,
                backgroundStyle: {
                  color: "rgba(220, 220, 220, 0.8)",
                },
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
