import { mock } from "mockjs";

export default [
  {
    url: "/MISreads/getEmpData",
    type: "post",
    response: (config) => {
      return {
        code: 200,
        msg: "success",
        totalCount: 999,
        data: mock({
          "data|1-50": [
            {
              empNum: "@integer(20000, 900000)",
              empName: "@cname",
              empPosition: "@cword(2,5)",
              empDep: "@cword(3,7)",
              tel: /188\d{7}/,
              comCode: /D\d{12}/,
              mail: "@email",
              mailPass: "@string(7, 10)",
              powers: {
                "inMail|1-2": true,
                "internet|1-2": true,
                "outMail|1-2": true,
              },
              ill: "@csentence",
            },
          ],
        }).data,
      };
    },
  },
  {
    url: "/MISreads/doEdit",
    type: "post",
    response: (config) => {
      return {
        code: 200,
        msg: "模拟保存成功",
      };
    },
  },
  {
    url: "/MISreads/doDelete",
    type: "post",
    response: (config) => {
      return {
        code: 200,
        msg: "模拟删除成功",
      };
    },
  },
];
