import request from "@/utils/request";

export function getEmpData(data) {
  return request({
    url: "/MISreads/getEmpData",
    method: "post",
    data,
  });
}

export function doEdit(data) {
  return request({
    url: "/MISreads/doEdit",
    method: "post",
    data,
  });
}

export function doDelete(data) {
  return request({
    url: "/MISreads/doDelete",
    method: "post",
    data,
  });
}
