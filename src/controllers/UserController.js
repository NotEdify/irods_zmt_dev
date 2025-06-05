export const AddUserController = (name, zone, userType, httpApiLocation) => {
  const url = `${httpApiLocation}/users-groups`;
  const params = new URLSearchParams({
    op: "create_user",
    name: name,
    zone: zone,
    "user-type": userType,
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

export const ModifyUserPasswordController = (
  name,
  zone,
  newPassword,
  httpApiLocation,
) => {
  const url = `${httpApiLocation}/users-groups`;
  const params = new URLSearchParams({
    op: "set_password",
    name: name,
    zone: zone,
    "new-password": newPassword,
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

export const ModifyUserTypeController = (
  name,
  zone,
  newUserType,
  httpApiLocation,
) => {
  const url = `${httpApiLocation}/users-groups`;
  const params = new URLSearchParams({
    op: "set_user_type",
    name: name,
    zone: zone,
    "new-user-type": newUserType,
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

export const RemoveUserController = async (name, zone, httpApiLocation) => {
  const url = `${httpApiLocation}/users-groups`;
  const params = new URLSearchParams({
    op: "remove_user",
    name: name,
    zone: zone,
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

