import request from "@/utils/request";

export function getFetchData(data) {
  return request({
    url: "/changeLog/getFetchData",
    method: "post",
    data,
  });
}

export function doEdit(data) {
  return request({
    url: "/changeLog/doEdit",
    method: "post",
    data,
  });
}

export function doDelete(data) {
  return request({
    url: "/changeLog/doDelete",
    method: "post",
    data,
  });
}
