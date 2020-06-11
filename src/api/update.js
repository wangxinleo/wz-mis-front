import request from "@/utils/request";

export function addMISmobileForm(data) {
  return request({
    url: "/MIS/addMISmobileForm",
    method: "post",
    data,
  });
}

export function updateMISmobileForm(data) {
  return request({
    url: "/MIS/updateMISmobileForm",
    method: "post",
    data,
  });
}

export function deletePhonesData(id) {
  return request({
    url: "/MIS/deletePhonesData",
    method: "post",
    data: {
      id: id,
    },
  });
}
