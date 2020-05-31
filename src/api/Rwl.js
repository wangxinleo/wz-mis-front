import request from "@/utils/request";

export function getGZLList(data) {
  return request({
    url: "/Rwl/getGZLList",
    method: "post",
    data,
  });
}
export function getCY(data) {
  return request({
    url: "/Rwl/getCY",
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
