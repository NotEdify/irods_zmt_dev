export const AddZoneController = (
  name,
  type,
  location,
  comment,
  httpApiLocation,
) => {
  const url = `${httpApiLocation}/zones`;
  const params = new URLSearchParams({
    op: "add",
    name: name,
    "connection-info": location,
    comment: comment,
  });

  return fetch(url, {
    method: "POST",
    body: params.toString(),
    headers: {
      "content-type": "application/x-www-form-urlencoded;charset=UTF-8",
      Authorization: `Bearer ${localStorage.getItem("zmt-token")}`,
    },
  });
};

export const DeleteZoneController = (name, httpApiLocation) => {
  const url = `${httpApiLocation}/zones`;
  const params = new URLSearchParams({
    op: "remove",
    name: name,
  });

  return fetch(url, {
    method: "POST",
    body: params.toString(),
    headers: {
      "content-type": "application/x-www-form-urlencoded;charset=UTF-8",
      Authorization: `Bearer ${localStorage.getItem("zmt-token")}`,
    },
  });
};

export const ModifyZoneController = (name, target, value, httpApiLocation) => {
  const url = `${httpApiLocation}/zones`;
  const params = new URLSearchParams({
    op: "modify",
    name: name,
    property: target,
    value: value,
  });

  return fetch(url, {
    method: "POST",
    body: params.toString(),
    headers: {
      "content-type": "application/x-www-form-urlencoded;charset=UTF-8",
      Authorization: `Bearer ${localStorage.getItem("zmt-token")}`,
    },
  });
};
