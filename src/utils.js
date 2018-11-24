// Accessing deeply nested values
export function getNestedValue(path) {
  return object => {
    return path.reduce((xs, x) => (xs && xs[x]: null), object);
  };
}

export function checkJsonType(response) {
    const contentType = response.headers.get('content-type');
    return contentType && contentType.includes('application/json')
      ? response.json()
      : Promise.reject(new Error("We haven't got JSON!"));
  }

export function catchErrors(description = '') {
  return err => {
    console.error(description, err);
    return err;
  };
}

export function genRangeYearArray(min, max) {
  const length = max - min;
  let yearsArray = [];
  for(let i=0; i <= length; i++) {
    yearsArray.push(min + i);
  }
  return yearsArray;
}
