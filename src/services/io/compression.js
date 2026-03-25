import zlib from 'zlib';
import { debug } from '~/utils';

/**
 * Compress data to base64 string
 * @param {*} data - Data to compress
 * @return {string} Compressed base64 string
 */
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

/**
 * Decompress base64 string to original data
 * @param {string} data - Base64 compressed string
 * @return {string} Decompressed string
 */
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
