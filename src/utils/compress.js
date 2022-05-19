import zlib from 'zlib';

function compress(data) {
  return zlib.deflateSync(JSON.stringify(data)).toString('base64');
}

export default compress;
