import { curry, map, prop } from 'ramda';

function getTimeline(present, past) {
  const pastSnapshotList = map(prop('snapshot'), past);

  return [present.snapshot, ...pastSnapshotList];
}

export default curry(getTimeline);
