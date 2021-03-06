export const createFormData = (values, stringify = []) => {
  const formData = new FormData();

  Object.keys(values).forEach((key) => {
    if (typeof values[key] !== "undefined" && values[key] !== null) {
      if (stringify.includes(key)) {
        formData.append(key, JSON.stringify(values[key]));
      } else {
        formData.append(key, values[key]);
      }
    }
  });

  return formData;
};

export const isListAuthor = (list, userId) => {
  const creatorId = list.creator._id ? list.creator._id : list.creator;
  return  creatorId === userId ? true : false;
};

export const isSavedList = (list, user) => {
  return user.savedLists && user.savedLists.includes(list._id) ? true : false;
};

export const checkFollowing = (following, id) => {
  const ids = following.map(i => i._id);
  return ids.includes(id);
}