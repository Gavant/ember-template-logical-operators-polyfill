import { isArray } from '@ember/array';

export default function truthConvert(result): boolean {
  const truthy = result && result.isTruthy;
  if (typeof truthy === 'boolean') {
    return truthy;
  }

  if (isArray(result)) {
    return result.length === 0 ? false : true;
  } else {
    return !!result;
  }
}
