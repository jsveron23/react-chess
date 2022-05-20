import zlib from 'zlib';

export function compress(data) {
  let compressedStr;

  try {
    const str = JSON.stringify(data);

    compressedStr = zlib.deflateSync(str).toString('base64');
  } catch (err) {
    console.error(err);
  }

  return compressedStr;
}

export function decompress(data) {
  let decompressedStr;

  try {
    const buf = Buffer.from(data, 'base64');

    decompressedStr = zlib.inflateSync(buf).toString();
  } catch (err) {
    console.error(err);
  }

  return decompressedStr;
}
