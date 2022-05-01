import { isEmpty } from 'ramda';

function validateSnapshot(snapshot) {
  return snapshot && Array.isArray(snapshot) && !isEmpty(snapshot);
}

export default validateSnapshot;
