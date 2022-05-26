import zlib from 'zlib';
import debug from './debug';

export function compress(data) {
  let compressedStr;

  try {
    const str = JSON.stringify(data);

    compressedStr = zlib.deflateSync(str).toString('base64');
  } catch (err) {
    debug.err('zlib - compress issue: ', err);
  }

  return compressedStr;
}

export function decompress(data) {
  let decompressedStr;

  try {
    const buf = Buffer.from(data, 'base64');

    decompressedStr = zlib.inflateSync(buf).toString();
  } catch (err) {
    debug.err('zlib - decompress issue: ', err);
  }

  return decompressedStr;
}
