import * as R from 'ramda'
import _detectEmpty from './internal/_detectEmpty'
import _isExist from './internal/_isExist'

const isExist = (v) => !_detectEmpty(v)

isExist.and = _isExist('every')
isExist.or = _isExist('some')
isExist.lazy = R.thunkify(isExist)

export default isExist
