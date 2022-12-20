export default function (object, nestedProps, substitute = 'Not specified') {
  if (!object) return null;
  const nested = nestedProps.split('/');
  let val = object;

  while (nested.length > 0) {
    const prop = nested.shift();
    if (!val[prop] && val[prop] !== 0) {
      return substitute;
    }
    val = val[prop];
  }

  if (!val && val !== 0) {
    return substitute;
  }
  return val;
}
