import { thunkify } from 'ramda'
import _detectEmpty from './internal/_detectEmpty'
import _isEmpty from './internal/_isEmpty'

const isEmpty = (v) => _detectEmpty(v)

isEmpty.and = _isEmpty('every')
isEmpty.or = _isEmpty('some')
isEmpty.lazy = thunkify(isEmpty)

export default isEmpty
