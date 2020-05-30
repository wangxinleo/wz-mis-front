import request from "@/utils/request";

export function getList(data) {
  return request({
    url: "/Rwl/getList",
    method: "post",
    data,
  });
}

export function doEdit(data) {
  return request({
    url: "/Rwl/doEdit",
    method: "post",
    data,
  });
}

export function doDelete(data) {
  return request({
    url: "/Rwl/doDelete",
    method: "post",
    data,
  });
}
