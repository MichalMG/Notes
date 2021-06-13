const objectWithKey = (obj) => {
  const newArray = [];

  for (const key in obj) {
    newArray.push({ ...obj[key], _id: key });
  }

  return newArray;
}

export default objectWithKey;