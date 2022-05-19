import zlib from 'zlib';

function decompress(data) {
  return zlib.inflateSync(Buffer.from(data, 'base64')).toString();
}

export default decompress;
