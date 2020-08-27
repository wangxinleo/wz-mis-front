import request from "@/utils/request";

export function getEmpOnDutyTime(data) {
  return request({
    url: "/support/getEmpOnDutyTime",
    method: "post",
    data,
  });
}

export function doEdit(data) {
  return request({
    url: "/support/doEdit",
    method: "post",
    data,
  });
}

export function doDelete(data) {
  return request({
    url: "/support/doDelete",
    method: "post",
    data,
  });
}
