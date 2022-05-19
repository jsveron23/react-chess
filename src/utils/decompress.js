import zlib from 'zlib';

function decompress(data) {
  let decompressedStr;

  try {
    decompressedStr = zlib.inflateSync(Buffer.from(data, 'base64')).toString();
  } catch (err) {
    console.error(err);
  }

  return decompressedStr;
}

export default decompress;
