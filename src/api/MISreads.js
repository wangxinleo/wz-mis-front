import request from "@/utils/request";

export function getEmpData(data) {
  return request({
    url: "/MIS/getEmpData",
    method: "post",
    data,
  });
}

export function getFilesData(data) {
  return request({
    url: "/MISreads/getFilesData",
    method: "post",
    data,
  });
}

export function getPhonesData(data) {
  return request({
    url: "/MISreads/getPhonesData",
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
