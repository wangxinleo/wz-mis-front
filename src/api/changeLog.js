import request from "@/utils/request";

export function getFetchData(data) {
  return request({
    url: "/changeLog/getFetchData",
    method: "post",
    data,
  });
}
