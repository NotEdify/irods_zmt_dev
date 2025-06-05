export const AddResourceController = (
  name,
  type,
  host,
  vaultPath,
  httpApiLocation,
) => {
  const url = `${httpApiLocation}/resources`;
  const params = new URLSearchParams({
    op: "create",
    name: name,
    type: type,
    host: host,
    "vault-path": vaultPath,
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

//Not seeing anything for modifying resources in the docs, not implemented yet probably
export const ModifyResourceController = (name, arg, value, httpApiLocation) => {
  const url = `${httpApiLocation}/resources`;
  const params = new URLSearchParams({
    op: "modify",
    name: name,
    property: arg,
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

export const RemoveResourceController = async (name, httpApiLocation) => {
  const url = `${httpApiLocation}/resources`;
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

export const AddChildResourceController = async (
  parent,
  child,
  httpApiLocation,
  parent_context_string,
) => {
  const url = `${httpApiLocation}/resources`;
  const params = new URLSearchParams({
    action: "add_child",
    "parent-name": parent,
    "child-name": child,
    context: parent_context_string,
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

export const RemoveChildResourceController = async (
  parent,
  child,
  httpApiLocation,
) => {
  const url = `${httpApiLocation}/resources`;
  const params = new URLSearchParams({
    action: "remove_child",
    "parent-name": parent,
    "child-name": child,
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
