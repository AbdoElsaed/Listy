const API = "/api/v1";

export const register = async (user) => {
  const res = await fetch(`${API}/user/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });

  const data = await res.json();
  return data;
};

export const login = async (user) => {
  const res = await fetch(`${API}/user/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });

  const data = await res.json();
  return data;
};

export const getUserByToken = async (token) => {
  const res = await fetch(`${API}/user/`, {
    method: "GET",
    headers: {
      Authorization: token,
    },
  });

  const user = await res.json();
  return user;
};

export const getPublicLists = async () => {
  const res = await fetch(`${API}/list/public`);
  const lists = await res.json();
  return lists;
};

export const getMyLists = async (token) => {
  const res = await fetch(`${API}/list`, {
    method: "GET",
    headers: {
      Authorization: token,
    },
  });
  const lists = await res.json();
  return lists;
};

export const addList = async ({ data, token }) => {
  const res = await fetch(`${API}/list`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify(data),
  });

  const list = await res.json();
  return list;
};

export const addItem = async ({ data, token }) => {
  const res = await fetch(`${API}/item`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify(data),
  });

  const item = await res.json();
  return item;
};

export const EditUser = async ({ data, token }) => {
  const res = await fetch(`${API}/user`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify(data),
  });

  const user = await res.json();
  return user;
};

export const EditAvatar = async ({ formData, token }) => {
  const res = await fetch(`${API}/user/avatar`, {
    method: "POST",
    headers: {
      Authorization: token,
    },
    body: formData,
  });

  const { avatar } = await res.json();
  return avatar.location;
};

export const getAvatar = async (token) => {
  const res = await fetch(`${API}/user/avatar`, {
    method: "GET",
    headers: {
      Authorization: token,
    },
  });

  const { avatar } = await res.json();
  return avatar;
};

export const deleteItem = async ({ token, id }) => {
  const res = await fetch(`${API}/item/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: token,
    },
  });

  const item = await res.json();
  return item;
};

export const deleteList = async ({ token, id }) => {
  const res = await fetch(`${API}/list/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: token,
    },
  });

  const list = await res.json();
  return list;
};

export const editList = async ({ token, id, data }) => {
  const res = await fetch(`${API}/list/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify(data),
  });

  const list = await res.json();
  return list;
};

export const saveList = async ({ token, listId }) => {
  const res = await fetch(`${API}/user/saveList`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify({ listId }),
  });

  const user = await res.json();
  return user;
};

export const unSaveList = async ({ token, listId }) => {
  const res = await fetch(`${API}/user/unSaveList`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify({ listId }),
  });

  const user = await res.json();
  return user;
};

export const getSavedLists = async (token) => {
  const res = await fetch(`${API}/user/savedLists`, {
    method: "GET",
    headers: {
      Authorization: token,
    },
  });

  const { savedLists } = await res.json();
  return savedLists;
};
