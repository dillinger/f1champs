// Accessing deeply nested values
export function getNestedValue(path) {
  return object => {
    return path.reduce((xs, x) => (xs && xs[x]: null), object);
  };
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
