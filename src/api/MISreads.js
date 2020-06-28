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
    url: "/MIS/getFilesData",
    method: "post",
    data,
  });
}
export function openFilesUrl(data) {
  return request({
    url: "/MIS/openFilesUrl",
    method: "post",
    data,
  });
}

export function getPhonesData(data) {
  return request({
    url: "/MIS/getPhonesData",
    method: "post",
    data,
  });
}

export function getComputersData(data) {
  return request({
    url: "/MIS/getComputersData",
    method: "post",
    data,
  });
}

export function getAreaOption(data) {
  return request({
    url: "/MIS/getAreaOption",
    method: "post",
    data,
  });
}
export function getDeptOption(data) {
  return request({
    url: "/MIS/getDeptOption",
    method: "post",
    data,
  });
}
