export const AddSpecificQueryController = (alias, sqlStr, httpApiLocation) => {
  const url = `${httpApiLocation}/query`;
  const params = new URLSearchParams({
    op: "add_specific_query",
    name: alias,
    sql: sqlStr,
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

export const DeleteSpecificQueryController = (alias, httpApiLocation) => {
  const url = `${httpApiLocation}/query`;
  const params = new URLSearchParams({
    op: "remove_specific_query",
    name: alias,
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

