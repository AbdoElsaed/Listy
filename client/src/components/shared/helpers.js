export const createFormData = (values, stringify = []) => {
console.log('values', values);
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
