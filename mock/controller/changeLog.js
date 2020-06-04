import { mock } from "mockjs";

export default [
  {
    url: "/changeLog/getFetchData",
    type: "post",
    response: (config) => {
      return {
        code: 200,
        msg: "success",
        totalCount: 999,
        data: mock({
          "data|10-31": [
            {
              content: "@character",
              timestamp: "@time",
            },
          ],
        }).data,
      };
    },
  },
  {
    url: "/changeLog/doEdit",
    type: "post",
    response: (config) => {
      return {
        code: 200,
        msg: "模拟保存成功",
      };
    },
  },
  {
    url: "/changeLog/doDelete",
    type: "post",
    response: (config) => {
      return {
        code: 200,
        msg: "模拟删除成功",
      };
    },
  },
];
