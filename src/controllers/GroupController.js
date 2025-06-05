export const AddGroupController = (name, httpApiLocation) => {
  const url = `${httpApiLocation}/users-groups`;
  const params = new URLSearchParams({
    op: "create_group",
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

export const RemoveGroupController = async (name, httpApiLocation) => {
  const url = `${httpApiLocation}/users-groups`;
  const params = new URLSearchParams({
    op: "remove_group",
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

export const AddUserToGroupController = (
  user,
  zone,
  group,
  httpApiLocation,
) => {
  const url = `${httpApiLocation}/users-groups`;
  const params = new URLSearchParams({
    op: "add_to_group",
    user: user,
    zone: zone,
    group: group,
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

export const RemoveUserFromGroupController = (
  user,
  zone,
  group,
  httpApiLocation,
) => {
  const url = `${httpApiLocation}/users-groups`;
  const params = new URLSearchParams({
    op: "remove_from_group",
    user: user,
    zone: zone,
    group: group,
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
