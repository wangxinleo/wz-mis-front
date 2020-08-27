import { mock } from "mockjs";

export default [
  {
    url: "/api/support/getEmpOnDutyTime",
    type: "post",
    response: (config) => {
      return {
        code: 200,
        msg: "success",
        page: 1,
        pageSize: 20,
        total: 1,
        data: mock({
          "data|50": [
            {
              chineseName: "@cname",
              employeecode: Random.string("number", 6),
              ondutytime: "@datetime",
              outdutytime: "@datetime",
            },
          ],
        }).data,
      };
    },
  },
  {
    url: "/support/doEdit",
    type: "post",
    response: (config) => {
      return {
        code: 200,
        msg: "模拟保存成功",
      };
    },
  },
  {
    url: "/support/doDelete",
    type: "post",
    response: (config) => {
      return {
        code: 200,
        msg: "模拟删除成功",
      };
    },
  },
];
