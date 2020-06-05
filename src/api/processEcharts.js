import request from "@/utils/request";

export function getMISProcessList(data) {
  return request({
    url: "/processEcharts/getMISProcessList",
    method: "post",
    data,
  });
}
export function getHotProcess(data) {
  return request({
    url: "/processEcharts/getHotProcess",
    method: "post",
    data,
  });
}

export function getProcessNumByYY(data) {
  return request({
    url: "/processEcharts/getProcessNumByYY",
    method: "post",
    data,
  });
}

export function doDelete(data) {
  return request({
    url: "/processEcharts/doDelete",
    method: "post",
    data,
  });
}
