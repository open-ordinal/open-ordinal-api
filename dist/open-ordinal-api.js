/*! 
* Open Ordinal API 0.9.0
*/
/******/ var __webpack_modules__ = ({

/***/ 526:
/***/ ((__unused_webpack_module, exports) => {



exports.byteLength = byteLength
exports.toByteArray = toByteArray
exports.fromByteArray = fromByteArray

var lookup = []
var revLookup = []
var Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array

var code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
for (var i = 0, len = code.length; i < len; ++i) {
  lookup[i] = code[i]
  revLookup[code.charCodeAt(i)] = i
}

// Support decoding URL-safe base64 strings, as Node.js does.
// See: https://en.wikipedia.org/wiki/Base64#URL_applications
revLookup['-'.charCodeAt(0)] = 62
revLookup['_'.charCodeAt(0)] = 63

function getLens (b64) {
  var len = b64.length

  if (len % 4 > 0) {
    throw new Error('Invalid string. Length must be a multiple of 4')
  }

  // Trim off extra bytes after placeholder bytes are found
  // See: https://github.com/beatgammit/base64-js/issues/42
  var validLen = b64.indexOf('=')
  if (validLen === -1) validLen = len

  var placeHoldersLen = validLen === len
    ? 0
    : 4 - (validLen % 4)

  return [validLen, placeHoldersLen]
}

// base64 is 4/3 + up to two characters of the original data
function byteLength (b64) {
  var lens = getLens(b64)
  var validLen = lens[0]
  var placeHoldersLen = lens[1]
  return ((validLen + placeHoldersLen) * 3 / 4) - placeHoldersLen
}

function _byteLength (b64, validLen, placeHoldersLen) {
  return ((validLen + placeHoldersLen) * 3 / 4) - placeHoldersLen
}

function toByteArray (b64) {
  var tmp
  var lens = getLens(b64)
  var validLen = lens[0]
  var placeHoldersLen = lens[1]

  var arr = new Arr(_byteLength(b64, validLen, placeHoldersLen))

  var curByte = 0

  // if there are placeholders, only get up to the last complete 4 chars
  var len = placeHoldersLen > 0
    ? validLen - 4
    : validLen

  var i
  for (i = 0; i < len; i += 4) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 18) |
      (revLookup[b64.charCodeAt(i + 1)] << 12) |
      (revLookup[b64.charCodeAt(i + 2)] << 6) |
      revLookup[b64.charCodeAt(i + 3)]
    arr[curByte++] = (tmp >> 16) & 0xFF
    arr[curByte++] = (tmp >> 8) & 0xFF
    arr[curByte++] = tmp & 0xFF
  }

  if (placeHoldersLen === 2) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 2) |
      (revLookup[b64.charCodeAt(i + 1)] >> 4)
    arr[curByte++] = tmp & 0xFF
  }

  if (placeHoldersLen === 1) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 10) |
      (revLookup[b64.charCodeAt(i + 1)] << 4) |
      (revLookup[b64.charCodeAt(i + 2)] >> 2)
    arr[curByte++] = (tmp >> 8) & 0xFF
    arr[curByte++] = tmp & 0xFF
  }

  return arr
}

function tripletToBase64 (num) {
  return lookup[num >> 18 & 0x3F] +
    lookup[num >> 12 & 0x3F] +
    lookup[num >> 6 & 0x3F] +
    lookup[num & 0x3F]
}

function encodeChunk (uint8, start, end) {
  var tmp
  var output = []
  for (var i = start; i < end; i += 3) {
    tmp =
      ((uint8[i] << 16) & 0xFF0000) +
      ((uint8[i + 1] << 8) & 0xFF00) +
      (uint8[i + 2] & 0xFF)
    output.push(tripletToBase64(tmp))
  }
  return output.join('')
}

function fromByteArray (uint8) {
  var tmp
  var len = uint8.length
  var extraBytes = len % 3 // if we have 1 byte left, pad 2 bytes
  var parts = []
  var maxChunkLength = 16383 // must be multiple of 3

  // go through the array every three bytes, we'll deal with trailing stuff later
  for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
    parts.push(encodeChunk(uint8, i, (i + maxChunkLength) > len2 ? len2 : (i + maxChunkLength)))
  }

  // pad the end with zeros, but make sure to not forget the extra bytes
  if (extraBytes === 1) {
    tmp = uint8[len - 1]
    parts.push(
      lookup[tmp >> 2] +
      lookup[(tmp << 4) & 0x3F] +
      '=='
    )
  } else if (extraBytes === 2) {
    tmp = (uint8[len - 2] << 8) + uint8[len - 1]
    parts.push(
      lookup[tmp >> 10] +
      lookup[(tmp >> 4) & 0x3F] +
      lookup[(tmp << 2) & 0x3F] +
      '='
    )
  }

  return parts.join('')
}


/***/ }),

/***/ 287:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */
/* eslint-disable no-proto */



const base64 = __webpack_require__(526)
const ieee754 = __webpack_require__(251)
const customInspectSymbol =
  (typeof Symbol === 'function' && typeof Symbol['for'] === 'function') // eslint-disable-line dot-notation
    ? Symbol['for']('nodejs.util.inspect.custom') // eslint-disable-line dot-notation
    : null

exports.Buffer = Buffer
exports.SlowBuffer = SlowBuffer
exports.INSPECT_MAX_BYTES = 50

const K_MAX_LENGTH = 0x7fffffff
exports.kMaxLength = K_MAX_LENGTH

/**
 * If `Buffer.TYPED_ARRAY_SUPPORT`:
 *   === true    Use Uint8Array implementation (fastest)
 *   === false   Print warning and recommend using `buffer` v4.x which has an Object
 *               implementation (most compatible, even IE6)
 *
 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
 * Opera 11.6+, iOS 4.2+.
 *
 * We report that the browser does not support typed arrays if the are not subclassable
 * using __proto__. Firefox 4-29 lacks support for adding new properties to `Uint8Array`
 * (See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438). IE 10 lacks support
 * for __proto__ and has a buggy typed array implementation.
 */
Buffer.TYPED_ARRAY_SUPPORT = typedArraySupport()

if (!Buffer.TYPED_ARRAY_SUPPORT && typeof console !== 'undefined' &&
    typeof console.error === 'function') {
  console.error(
    'This browser lacks typed array (Uint8Array) support which is required by ' +
    '`buffer` v5.x. Use `buffer` v4.x if you require old browser support.'
  )
}

function typedArraySupport () {
  // Can typed array instances can be augmented?
  try {
    const arr = new Uint8Array(1)
    const proto = { foo: function () { return 42 } }
    Object.setPrototypeOf(proto, Uint8Array.prototype)
    Object.setPrototypeOf(arr, proto)
    return arr.foo() === 42
  } catch (e) {
    return false
  }
}

Object.defineProperty(Buffer.prototype, 'parent', {
  enumerable: true,
  get: function () {
    if (!Buffer.isBuffer(this)) return undefined
    return this.buffer
  }
})

Object.defineProperty(Buffer.prototype, 'offset', {
  enumerable: true,
  get: function () {
    if (!Buffer.isBuffer(this)) return undefined
    return this.byteOffset
  }
})

function createBuffer (length) {
  if (length > K_MAX_LENGTH) {
    throw new RangeError('The value "' + length + '" is invalid for option "size"')
  }
  // Return an augmented `Uint8Array` instance
  const buf = new Uint8Array(length)
  Object.setPrototypeOf(buf, Buffer.prototype)
  return buf
}

/**
 * The Buffer constructor returns instances of `Uint8Array` that have their
 * prototype changed to `Buffer.prototype`. Furthermore, `Buffer` is a subclass of
 * `Uint8Array`, so the returned instances will have all the node `Buffer` methods
 * and the `Uint8Array` methods. Square bracket notation works as expected -- it
 * returns a single octet.
 *
 * The `Uint8Array` prototype remains unmodified.
 */

function Buffer (arg, encodingOrOffset, length) {
  // Common case.
  if (typeof arg === 'number') {
    if (typeof encodingOrOffset === 'string') {
      throw new TypeError(
        'The "string" argument must be of type string. Received type number'
      )
    }
    return allocUnsafe(arg)
  }
  return from(arg, encodingOrOffset, length)
}

Buffer.poolSize = 8192 // not used by this implementation

function from (value, encodingOrOffset, length) {
  if (typeof value === 'string') {
    return fromString(value, encodingOrOffset)
  }

  if (ArrayBuffer.isView(value)) {
    return fromArrayView(value)
  }

  if (value == null) {
    throw new TypeError(
      'The first argument must be one of type string, Buffer, ArrayBuffer, Array, ' +
      'or Array-like Object. Received type ' + (typeof value)
    )
  }

  if (isInstance(value, ArrayBuffer) ||
      (value && isInstance(value.buffer, ArrayBuffer))) {
    return fromArrayBuffer(value, encodingOrOffset, length)
  }

  if (typeof SharedArrayBuffer !== 'undefined' &&
      (isInstance(value, SharedArrayBuffer) ||
      (value && isInstance(value.buffer, SharedArrayBuffer)))) {
    return fromArrayBuffer(value, encodingOrOffset, length)
  }

  if (typeof value === 'number') {
    throw new TypeError(
      'The "value" argument must not be of type number. Received type number'
    )
  }

  const valueOf = value.valueOf && value.valueOf()
  if (valueOf != null && valueOf !== value) {
    return Buffer.from(valueOf, encodingOrOffset, length)
  }

  const b = fromObject(value)
  if (b) return b

  if (typeof Symbol !== 'undefined' && Symbol.toPrimitive != null &&
      typeof value[Symbol.toPrimitive] === 'function') {
    return Buffer.from(value[Symbol.toPrimitive]('string'), encodingOrOffset, length)
  }

  throw new TypeError(
    'The first argument must be one of type string, Buffer, ArrayBuffer, Array, ' +
    'or Array-like Object. Received type ' + (typeof value)
  )
}

/**
 * Functionally equivalent to Buffer(arg, encoding) but throws a TypeError
 * if value is a number.
 * Buffer.from(str[, encoding])
 * Buffer.from(array)
 * Buffer.from(buffer)
 * Buffer.from(arrayBuffer[, byteOffset[, length]])
 **/
Buffer.from = function (value, encodingOrOffset, length) {
  return from(value, encodingOrOffset, length)
}

// Note: Change prototype *after* Buffer.from is defined to workaround Chrome bug:
// https://github.com/feross/buffer/pull/148
Object.setPrototypeOf(Buffer.prototype, Uint8Array.prototype)
Object.setPrototypeOf(Buffer, Uint8Array)

function assertSize (size) {
  if (typeof size !== 'number') {
    throw new TypeError('"size" argument must be of type number')
  } else if (size < 0) {
    throw new RangeError('The value "' + size + '" is invalid for option "size"')
  }
}

function alloc (size, fill, encoding) {
  assertSize(size)
  if (size <= 0) {
    return createBuffer(size)
  }
  if (fill !== undefined) {
    // Only pay attention to encoding if it's a string. This
    // prevents accidentally sending in a number that would
    // be interpreted as a start offset.
    return typeof encoding === 'string'
      ? createBuffer(size).fill(fill, encoding)
      : createBuffer(size).fill(fill)
  }
  return createBuffer(size)
}

/**
 * Creates a new filled Buffer instance.
 * alloc(size[, fill[, encoding]])
 **/
Buffer.alloc = function (size, fill, encoding) {
  return alloc(size, fill, encoding)
}

function allocUnsafe (size) {
  assertSize(size)
  return createBuffer(size < 0 ? 0 : checked(size) | 0)
}

/**
 * Equivalent to Buffer(num), by default creates a non-zero-filled Buffer instance.
 * */
Buffer.allocUnsafe = function (size) {
  return allocUnsafe(size)
}
/**
 * Equivalent to SlowBuffer(num), by default creates a non-zero-filled Buffer instance.
 */
Buffer.allocUnsafeSlow = function (size) {
  return allocUnsafe(size)
}

function fromString (string, encoding) {
  if (typeof encoding !== 'string' || encoding === '') {
    encoding = 'utf8'
  }

  if (!Buffer.isEncoding(encoding)) {
    throw new TypeError('Unknown encoding: ' + encoding)
  }

  const length = byteLength(string, encoding) | 0
  let buf = createBuffer(length)

  const actual = buf.write(string, encoding)

  if (actual !== length) {
    // Writing a hex string, for example, that contains invalid characters will
    // cause everything after the first invalid character to be ignored. (e.g.
    // 'abxxcd' will be treated as 'ab')
    buf = buf.slice(0, actual)
  }

  return buf
}

function fromArrayLike (array) {
  const length = array.length < 0 ? 0 : checked(array.length) | 0
  const buf = createBuffer(length)
  for (let i = 0; i < length; i += 1) {
    buf[i] = array[i] & 255
  }
  return buf
}

function fromArrayView (arrayView) {
  if (isInstance(arrayView, Uint8Array)) {
    const copy = new Uint8Array(arrayView)
    return fromArrayBuffer(copy.buffer, copy.byteOffset, copy.byteLength)
  }
  return fromArrayLike(arrayView)
}

function fromArrayBuffer (array, byteOffset, length) {
  if (byteOffset < 0 || array.byteLength < byteOffset) {
    throw new RangeError('"offset" is outside of buffer bounds')
  }

  if (array.byteLength < byteOffset + (length || 0)) {
    throw new RangeError('"length" is outside of buffer bounds')
  }

  let buf
  if (byteOffset === undefined && length === undefined) {
    buf = new Uint8Array(array)
  } else if (length === undefined) {
    buf = new Uint8Array(array, byteOffset)
  } else {
    buf = new Uint8Array(array, byteOffset, length)
  }

  // Return an augmented `Uint8Array` instance
  Object.setPrototypeOf(buf, Buffer.prototype)

  return buf
}

function fromObject (obj) {
  if (Buffer.isBuffer(obj)) {
    const len = checked(obj.length) | 0
    const buf = createBuffer(len)

    if (buf.length === 0) {
      return buf
    }

    obj.copy(buf, 0, 0, len)
    return buf
  }

  if (obj.length !== undefined) {
    if (typeof obj.length !== 'number' || numberIsNaN(obj.length)) {
      return createBuffer(0)
    }
    return fromArrayLike(obj)
  }

  if (obj.type === 'Buffer' && Array.isArray(obj.data)) {
    return fromArrayLike(obj.data)
  }
}

function checked (length) {
  // Note: cannot use `length < K_MAX_LENGTH` here because that fails when
  // length is NaN (which is otherwise coerced to zero.)
  if (length >= K_MAX_LENGTH) {
    throw new RangeError('Attempt to allocate Buffer larger than maximum ' +
                         'size: 0x' + K_MAX_LENGTH.toString(16) + ' bytes')
  }
  return length | 0
}

function SlowBuffer (length) {
  if (+length != length) { // eslint-disable-line eqeqeq
    length = 0
  }
  return Buffer.alloc(+length)
}

Buffer.isBuffer = function isBuffer (b) {
  return b != null && b._isBuffer === true &&
    b !== Buffer.prototype // so Buffer.isBuffer(Buffer.prototype) will be false
}

Buffer.compare = function compare (a, b) {
  if (isInstance(a, Uint8Array)) a = Buffer.from(a, a.offset, a.byteLength)
  if (isInstance(b, Uint8Array)) b = Buffer.from(b, b.offset, b.byteLength)
  if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
    throw new TypeError(
      'The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array'
    )
  }

  if (a === b) return 0

  let x = a.length
  let y = b.length

  for (let i = 0, len = Math.min(x, y); i < len; ++i) {
    if (a[i] !== b[i]) {
      x = a[i]
      y = b[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

Buffer.isEncoding = function isEncoding (encoding) {
  switch (String(encoding).toLowerCase()) {
    case 'hex':
    case 'utf8':
    case 'utf-8':
    case 'ascii':
    case 'latin1':
    case 'binary':
    case 'base64':
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      return true
    default:
      return false
  }
}

Buffer.concat = function concat (list, length) {
  if (!Array.isArray(list)) {
    throw new TypeError('"list" argument must be an Array of Buffers')
  }

  if (list.length === 0) {
    return Buffer.alloc(0)
  }

  let i
  if (length === undefined) {
    length = 0
    for (i = 0; i < list.length; ++i) {
      length += list[i].length
    }
  }

  const buffer = Buffer.allocUnsafe(length)
  let pos = 0
  for (i = 0; i < list.length; ++i) {
    let buf = list[i]
    if (isInstance(buf, Uint8Array)) {
      if (pos + buf.length > buffer.length) {
        if (!Buffer.isBuffer(buf)) buf = Buffer.from(buf)
        buf.copy(buffer, pos)
      } else {
        Uint8Array.prototype.set.call(
          buffer,
          buf,
          pos
        )
      }
    } else if (!Buffer.isBuffer(buf)) {
      throw new TypeError('"list" argument must be an Array of Buffers')
    } else {
      buf.copy(buffer, pos)
    }
    pos += buf.length
  }
  return buffer
}

function byteLength (string, encoding) {
  if (Buffer.isBuffer(string)) {
    return string.length
  }
  if (ArrayBuffer.isView(string) || isInstance(string, ArrayBuffer)) {
    return string.byteLength
  }
  if (typeof string !== 'string') {
    throw new TypeError(
      'The "string" argument must be one of type string, Buffer, or ArrayBuffer. ' +
      'Received type ' + typeof string
    )
  }

  const len = string.length
  const mustMatch = (arguments.length > 2 && arguments[2] === true)
  if (!mustMatch && len === 0) return 0

  // Use a for loop to avoid recursion
  let loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'ascii':
      case 'latin1':
      case 'binary':
        return len
      case 'utf8':
      case 'utf-8':
        return utf8ToBytes(string).length
      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return len * 2
      case 'hex':
        return len >>> 1
      case 'base64':
        return base64ToBytes(string).length
      default:
        if (loweredCase) {
          return mustMatch ? -1 : utf8ToBytes(string).length // assume utf8
        }
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}
Buffer.byteLength = byteLength

function slowToString (encoding, start, end) {
  let loweredCase = false

  // No need to verify that "this.length <= MAX_UINT32" since it's a read-only
  // property of a typed array.

  // This behaves neither like String nor Uint8Array in that we set start/end
  // to their upper/lower bounds if the value passed is out of range.
  // undefined is handled specially as per ECMA-262 6th Edition,
  // Section 13.3.3.7 Runtime Semantics: KeyedBindingInitialization.
  if (start === undefined || start < 0) {
    start = 0
  }
  // Return early if start > this.length. Done here to prevent potential uint32
  // coercion fail below.
  if (start > this.length) {
    return ''
  }

  if (end === undefined || end > this.length) {
    end = this.length
  }

  if (end <= 0) {
    return ''
  }

  // Force coercion to uint32. This will also coerce falsey/NaN values to 0.
  end >>>= 0
  start >>>= 0

  if (end <= start) {
    return ''
  }

  if (!encoding) encoding = 'utf8'

  while (true) {
    switch (encoding) {
      case 'hex':
        return hexSlice(this, start, end)

      case 'utf8':
      case 'utf-8':
        return utf8Slice(this, start, end)

      case 'ascii':
        return asciiSlice(this, start, end)

      case 'latin1':
      case 'binary':
        return latin1Slice(this, start, end)

      case 'base64':
        return base64Slice(this, start, end)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return utf16leSlice(this, start, end)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = (encoding + '').toLowerCase()
        loweredCase = true
    }
  }
}

// This property is used by `Buffer.isBuffer` (and the `is-buffer` npm package)
// to detect a Buffer instance. It's not possible to use `instanceof Buffer`
// reliably in a browserify context because there could be multiple different
// copies of the 'buffer' package in use. This method works even for Buffer
// instances that were created from another copy of the `buffer` package.
// See: https://github.com/feross/buffer/issues/154
Buffer.prototype._isBuffer = true

function swap (b, n, m) {
  const i = b[n]
  b[n] = b[m]
  b[m] = i
}

Buffer.prototype.swap16 = function swap16 () {
  const len = this.length
  if (len % 2 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 16-bits')
  }
  for (let i = 0; i < len; i += 2) {
    swap(this, i, i + 1)
  }
  return this
}

Buffer.prototype.swap32 = function swap32 () {
  const len = this.length
  if (len % 4 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 32-bits')
  }
  for (let i = 0; i < len; i += 4) {
    swap(this, i, i + 3)
    swap(this, i + 1, i + 2)
  }
  return this
}

Buffer.prototype.swap64 = function swap64 () {
  const len = this.length
  if (len % 8 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 64-bits')
  }
  for (let i = 0; i < len; i += 8) {
    swap(this, i, i + 7)
    swap(this, i + 1, i + 6)
    swap(this, i + 2, i + 5)
    swap(this, i + 3, i + 4)
  }
  return this
}

Buffer.prototype.toString = function toString () {
  const length = this.length
  if (length === 0) return ''
  if (arguments.length === 0) return utf8Slice(this, 0, length)
  return slowToString.apply(this, arguments)
}

Buffer.prototype.toLocaleString = Buffer.prototype.toString

Buffer.prototype.equals = function equals (b) {
  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
  if (this === b) return true
  return Buffer.compare(this, b) === 0
}

Buffer.prototype.inspect = function inspect () {
  let str = ''
  const max = exports.INSPECT_MAX_BYTES
  str = this.toString('hex', 0, max).replace(/(.{2})/g, '$1 ').trim()
  if (this.length > max) str += ' ... '
  return '<Buffer ' + str + '>'
}
if (customInspectSymbol) {
  Buffer.prototype[customInspectSymbol] = Buffer.prototype.inspect
}

Buffer.prototype.compare = function compare (target, start, end, thisStart, thisEnd) {
  if (isInstance(target, Uint8Array)) {
    target = Buffer.from(target, target.offset, target.byteLength)
  }
  if (!Buffer.isBuffer(target)) {
    throw new TypeError(
      'The "target" argument must be one of type Buffer or Uint8Array. ' +
      'Received type ' + (typeof target)
    )
  }

  if (start === undefined) {
    start = 0
  }
  if (end === undefined) {
    end = target ? target.length : 0
  }
  if (thisStart === undefined) {
    thisStart = 0
  }
  if (thisEnd === undefined) {
    thisEnd = this.length
  }

  if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
    throw new RangeError('out of range index')
  }

  if (thisStart >= thisEnd && start >= end) {
    return 0
  }
  if (thisStart >= thisEnd) {
    return -1
  }
  if (start >= end) {
    return 1
  }

  start >>>= 0
  end >>>= 0
  thisStart >>>= 0
  thisEnd >>>= 0

  if (this === target) return 0

  let x = thisEnd - thisStart
  let y = end - start
  const len = Math.min(x, y)

  const thisCopy = this.slice(thisStart, thisEnd)
  const targetCopy = target.slice(start, end)

  for (let i = 0; i < len; ++i) {
    if (thisCopy[i] !== targetCopy[i]) {
      x = thisCopy[i]
      y = targetCopy[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

// Finds either the first index of `val` in `buffer` at offset >= `byteOffset`,
// OR the last index of `val` in `buffer` at offset <= `byteOffset`.
//
// Arguments:
// - buffer - a Buffer to search
// - val - a string, Buffer, or number
// - byteOffset - an index into `buffer`; will be clamped to an int32
// - encoding - an optional encoding, relevant is val is a string
// - dir - true for indexOf, false for lastIndexOf
function bidirectionalIndexOf (buffer, val, byteOffset, encoding, dir) {
  // Empty buffer means no match
  if (buffer.length === 0) return -1

  // Normalize byteOffset
  if (typeof byteOffset === 'string') {
    encoding = byteOffset
    byteOffset = 0
  } else if (byteOffset > 0x7fffffff) {
    byteOffset = 0x7fffffff
  } else if (byteOffset < -0x80000000) {
    byteOffset = -0x80000000
  }
  byteOffset = +byteOffset // Coerce to Number.
  if (numberIsNaN(byteOffset)) {
    // byteOffset: it it's undefined, null, NaN, "foo", etc, search whole buffer
    byteOffset = dir ? 0 : (buffer.length - 1)
  }

  // Normalize byteOffset: negative offsets start from the end of the buffer
  if (byteOffset < 0) byteOffset = buffer.length + byteOffset
  if (byteOffset >= buffer.length) {
    if (dir) return -1
    else byteOffset = buffer.length - 1
  } else if (byteOffset < 0) {
    if (dir) byteOffset = 0
    else return -1
  }

  // Normalize val
  if (typeof val === 'string') {
    val = Buffer.from(val, encoding)
  }

  // Finally, search either indexOf (if dir is true) or lastIndexOf
  if (Buffer.isBuffer(val)) {
    // Special case: looking for empty string/buffer always fails
    if (val.length === 0) {
      return -1
    }
    return arrayIndexOf(buffer, val, byteOffset, encoding, dir)
  } else if (typeof val === 'number') {
    val = val & 0xFF // Search for a byte value [0-255]
    if (typeof Uint8Array.prototype.indexOf === 'function') {
      if (dir) {
        return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset)
      } else {
        return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset)
      }
    }
    return arrayIndexOf(buffer, [val], byteOffset, encoding, dir)
  }

  throw new TypeError('val must be string, number or Buffer')
}

function arrayIndexOf (arr, val, byteOffset, encoding, dir) {
  let indexSize = 1
  let arrLength = arr.length
  let valLength = val.length

  if (encoding !== undefined) {
    encoding = String(encoding).toLowerCase()
    if (encoding === 'ucs2' || encoding === 'ucs-2' ||
        encoding === 'utf16le' || encoding === 'utf-16le') {
      if (arr.length < 2 || val.length < 2) {
        return -1
      }
      indexSize = 2
      arrLength /= 2
      valLength /= 2
      byteOffset /= 2
    }
  }

  function read (buf, i) {
    if (indexSize === 1) {
      return buf[i]
    } else {
      return buf.readUInt16BE(i * indexSize)
    }
  }

  let i
  if (dir) {
    let foundIndex = -1
    for (i = byteOffset; i < arrLength; i++) {
      if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
        if (foundIndex === -1) foundIndex = i
        if (i - foundIndex + 1 === valLength) return foundIndex * indexSize
      } else {
        if (foundIndex !== -1) i -= i - foundIndex
        foundIndex = -1
      }
    }
  } else {
    if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength
    for (i = byteOffset; i >= 0; i--) {
      let found = true
      for (let j = 0; j < valLength; j++) {
        if (read(arr, i + j) !== read(val, j)) {
          found = false
          break
        }
      }
      if (found) return i
    }
  }

  return -1
}

Buffer.prototype.includes = function includes (val, byteOffset, encoding) {
  return this.indexOf(val, byteOffset, encoding) !== -1
}

Buffer.prototype.indexOf = function indexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, true)
}

Buffer.prototype.lastIndexOf = function lastIndexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, false)
}

function hexWrite (buf, string, offset, length) {
  offset = Number(offset) || 0
  const remaining = buf.length - offset
  if (!length) {
    length = remaining
  } else {
    length = Number(length)
    if (length > remaining) {
      length = remaining
    }
  }

  const strLen = string.length

  if (length > strLen / 2) {
    length = strLen / 2
  }
  let i
  for (i = 0; i < length; ++i) {
    const parsed = parseInt(string.substr(i * 2, 2), 16)
    if (numberIsNaN(parsed)) return i
    buf[offset + i] = parsed
  }
  return i
}

function utf8Write (buf, string, offset, length) {
  return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length)
}

function asciiWrite (buf, string, offset, length) {
  return blitBuffer(asciiToBytes(string), buf, offset, length)
}

function base64Write (buf, string, offset, length) {
  return blitBuffer(base64ToBytes(string), buf, offset, length)
}

function ucs2Write (buf, string, offset, length) {
  return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length)
}

Buffer.prototype.write = function write (string, offset, length, encoding) {
  // Buffer#write(string)
  if (offset === undefined) {
    encoding = 'utf8'
    length = this.length
    offset = 0
  // Buffer#write(string, encoding)
  } else if (length === undefined && typeof offset === 'string') {
    encoding = offset
    length = this.length
    offset = 0
  // Buffer#write(string, offset[, length][, encoding])
  } else if (isFinite(offset)) {
    offset = offset >>> 0
    if (isFinite(length)) {
      length = length >>> 0
      if (encoding === undefined) encoding = 'utf8'
    } else {
      encoding = length
      length = undefined
    }
  } else {
    throw new Error(
      'Buffer.write(string, encoding, offset[, length]) is no longer supported'
    )
  }

  const remaining = this.length - offset
  if (length === undefined || length > remaining) length = remaining

  if ((string.length > 0 && (length < 0 || offset < 0)) || offset > this.length) {
    throw new RangeError('Attempt to write outside buffer bounds')
  }

  if (!encoding) encoding = 'utf8'

  let loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'hex':
        return hexWrite(this, string, offset, length)

      case 'utf8':
      case 'utf-8':
        return utf8Write(this, string, offset, length)

      case 'ascii':
      case 'latin1':
      case 'binary':
        return asciiWrite(this, string, offset, length)

      case 'base64':
        // Warning: maxLength not taken into account in base64Write
        return base64Write(this, string, offset, length)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return ucs2Write(this, string, offset, length)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}

Buffer.prototype.toJSON = function toJSON () {
  return {
    type: 'Buffer',
    data: Array.prototype.slice.call(this._arr || this, 0)
  }
}

function base64Slice (buf, start, end) {
  if (start === 0 && end === buf.length) {
    return base64.fromByteArray(buf)
  } else {
    return base64.fromByteArray(buf.slice(start, end))
  }
}

function utf8Slice (buf, start, end) {
  end = Math.min(buf.length, end)
  const res = []

  let i = start
  while (i < end) {
    const firstByte = buf[i]
    let codePoint = null
    let bytesPerSequence = (firstByte > 0xEF)
      ? 4
      : (firstByte > 0xDF)
          ? 3
          : (firstByte > 0xBF)
              ? 2
              : 1

    if (i + bytesPerSequence <= end) {
      let secondByte, thirdByte, fourthByte, tempCodePoint

      switch (bytesPerSequence) {
        case 1:
          if (firstByte < 0x80) {
            codePoint = firstByte
          }
          break
        case 2:
          secondByte = buf[i + 1]
          if ((secondByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0x1F) << 0x6 | (secondByte & 0x3F)
            if (tempCodePoint > 0x7F) {
              codePoint = tempCodePoint
            }
          }
          break
        case 3:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | (thirdByte & 0x3F)
            if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {
              codePoint = tempCodePoint
            }
          }
          break
        case 4:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          fourthByte = buf[i + 3]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | (fourthByte & 0x3F)
            if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {
              codePoint = tempCodePoint
            }
          }
      }
    }

    if (codePoint === null) {
      // we did not generate a valid codePoint so insert a
      // replacement char (U+FFFD) and advance only 1 byte
      codePoint = 0xFFFD
      bytesPerSequence = 1
    } else if (codePoint > 0xFFFF) {
      // encode to utf16 (surrogate pair dance)
      codePoint -= 0x10000
      res.push(codePoint >>> 10 & 0x3FF | 0xD800)
      codePoint = 0xDC00 | codePoint & 0x3FF
    }

    res.push(codePoint)
    i += bytesPerSequence
  }

  return decodeCodePointsArray(res)
}

// Based on http://stackoverflow.com/a/22747272/680742, the browser with
// the lowest limit is Chrome, with 0x10000 args.
// We go 1 magnitude less, for safety
const MAX_ARGUMENTS_LENGTH = 0x1000

function decodeCodePointsArray (codePoints) {
  const len = codePoints.length
  if (len <= MAX_ARGUMENTS_LENGTH) {
    return String.fromCharCode.apply(String, codePoints) // avoid extra slice()
  }

  // Decode in chunks to avoid "call stack size exceeded".
  let res = ''
  let i = 0
  while (i < len) {
    res += String.fromCharCode.apply(
      String,
      codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
    )
  }
  return res
}

function asciiSlice (buf, start, end) {
  let ret = ''
  end = Math.min(buf.length, end)

  for (let i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i] & 0x7F)
  }
  return ret
}

function latin1Slice (buf, start, end) {
  let ret = ''
  end = Math.min(buf.length, end)

  for (let i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i])
  }
  return ret
}

function hexSlice (buf, start, end) {
  const len = buf.length

  if (!start || start < 0) start = 0
  if (!end || end < 0 || end > len) end = len

  let out = ''
  for (let i = start; i < end; ++i) {
    out += hexSliceLookupTable[buf[i]]
  }
  return out
}

function utf16leSlice (buf, start, end) {
  const bytes = buf.slice(start, end)
  let res = ''
  // If bytes.length is odd, the last 8 bits must be ignored (same as node.js)
  for (let i = 0; i < bytes.length - 1; i += 2) {
    res += String.fromCharCode(bytes[i] + (bytes[i + 1] * 256))
  }
  return res
}

Buffer.prototype.slice = function slice (start, end) {
  const len = this.length
  start = ~~start
  end = end === undefined ? len : ~~end

  if (start < 0) {
    start += len
    if (start < 0) start = 0
  } else if (start > len) {
    start = len
  }

  if (end < 0) {
    end += len
    if (end < 0) end = 0
  } else if (end > len) {
    end = len
  }

  if (end < start) end = start

  const newBuf = this.subarray(start, end)
  // Return an augmented `Uint8Array` instance
  Object.setPrototypeOf(newBuf, Buffer.prototype)

  return newBuf
}

/*
 * Need to make sure that buffer isn't trying to write out of bounds.
 */
function checkOffset (offset, ext, length) {
  if ((offset % 1) !== 0 || offset < 0) throw new RangeError('offset is not uint')
  if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length')
}

Buffer.prototype.readUintLE =
Buffer.prototype.readUIntLE = function readUIntLE (offset, byteLength, noAssert) {
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  let val = this[offset]
  let mul = 1
  let i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }

  return val
}

Buffer.prototype.readUintBE =
Buffer.prototype.readUIntBE = function readUIntBE (offset, byteLength, noAssert) {
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) {
    checkOffset(offset, byteLength, this.length)
  }

  let val = this[offset + --byteLength]
  let mul = 1
  while (byteLength > 0 && (mul *= 0x100)) {
    val += this[offset + --byteLength] * mul
  }

  return val
}

Buffer.prototype.readUint8 =
Buffer.prototype.readUInt8 = function readUInt8 (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 1, this.length)
  return this[offset]
}

Buffer.prototype.readUint16LE =
Buffer.prototype.readUInt16LE = function readUInt16LE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 2, this.length)
  return this[offset] | (this[offset + 1] << 8)
}

Buffer.prototype.readUint16BE =
Buffer.prototype.readUInt16BE = function readUInt16BE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 2, this.length)
  return (this[offset] << 8) | this[offset + 1]
}

Buffer.prototype.readUint32LE =
Buffer.prototype.readUInt32LE = function readUInt32LE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)

  return ((this[offset]) |
      (this[offset + 1] << 8) |
      (this[offset + 2] << 16)) +
      (this[offset + 3] * 0x1000000)
}

Buffer.prototype.readUint32BE =
Buffer.prototype.readUInt32BE = function readUInt32BE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] * 0x1000000) +
    ((this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    this[offset + 3])
}

Buffer.prototype.readBigUInt64LE = defineBigIntMethod(function readBigUInt64LE (offset) {
  offset = offset >>> 0
  validateNumber(offset, 'offset')
  const first = this[offset]
  const last = this[offset + 7]
  if (first === undefined || last === undefined) {
    boundsError(offset, this.length - 8)
  }

  const lo = first +
    this[++offset] * 2 ** 8 +
    this[++offset] * 2 ** 16 +
    this[++offset] * 2 ** 24

  const hi = this[++offset] +
    this[++offset] * 2 ** 8 +
    this[++offset] * 2 ** 16 +
    last * 2 ** 24

  return BigInt(lo) + (BigInt(hi) << BigInt(32))
})

Buffer.prototype.readBigUInt64BE = defineBigIntMethod(function readBigUInt64BE (offset) {
  offset = offset >>> 0
  validateNumber(offset, 'offset')
  const first = this[offset]
  const last = this[offset + 7]
  if (first === undefined || last === undefined) {
    boundsError(offset, this.length - 8)
  }

  const hi = first * 2 ** 24 +
    this[++offset] * 2 ** 16 +
    this[++offset] * 2 ** 8 +
    this[++offset]

  const lo = this[++offset] * 2 ** 24 +
    this[++offset] * 2 ** 16 +
    this[++offset] * 2 ** 8 +
    last

  return (BigInt(hi) << BigInt(32)) + BigInt(lo)
})

Buffer.prototype.readIntLE = function readIntLE (offset, byteLength, noAssert) {
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  let val = this[offset]
  let mul = 1
  let i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readIntBE = function readIntBE (offset, byteLength, noAssert) {
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  let i = byteLength
  let mul = 1
  let val = this[offset + --i]
  while (i > 0 && (mul *= 0x100)) {
    val += this[offset + --i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readInt8 = function readInt8 (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 1, this.length)
  if (!(this[offset] & 0x80)) return (this[offset])
  return ((0xff - this[offset] + 1) * -1)
}

Buffer.prototype.readInt16LE = function readInt16LE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 2, this.length)
  const val = this[offset] | (this[offset + 1] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt16BE = function readInt16BE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 2, this.length)
  const val = this[offset + 1] | (this[offset] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt32LE = function readInt32LE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset]) |
    (this[offset + 1] << 8) |
    (this[offset + 2] << 16) |
    (this[offset + 3] << 24)
}

Buffer.prototype.readInt32BE = function readInt32BE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] << 24) |
    (this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    (this[offset + 3])
}

Buffer.prototype.readBigInt64LE = defineBigIntMethod(function readBigInt64LE (offset) {
  offset = offset >>> 0
  validateNumber(offset, 'offset')
  const first = this[offset]
  const last = this[offset + 7]
  if (first === undefined || last === undefined) {
    boundsError(offset, this.length - 8)
  }

  const val = this[offset + 4] +
    this[offset + 5] * 2 ** 8 +
    this[offset + 6] * 2 ** 16 +
    (last << 24) // Overflow

  return (BigInt(val) << BigInt(32)) +
    BigInt(first +
    this[++offset] * 2 ** 8 +
    this[++offset] * 2 ** 16 +
    this[++offset] * 2 ** 24)
})

Buffer.prototype.readBigInt64BE = defineBigIntMethod(function readBigInt64BE (offset) {
  offset = offset >>> 0
  validateNumber(offset, 'offset')
  const first = this[offset]
  const last = this[offset + 7]
  if (first === undefined || last === undefined) {
    boundsError(offset, this.length - 8)
  }

  const val = (first << 24) + // Overflow
    this[++offset] * 2 ** 16 +
    this[++offset] * 2 ** 8 +
    this[++offset]

  return (BigInt(val) << BigInt(32)) +
    BigInt(this[++offset] * 2 ** 24 +
    this[++offset] * 2 ** 16 +
    this[++offset] * 2 ** 8 +
    last)
})

Buffer.prototype.readFloatLE = function readFloatLE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, true, 23, 4)
}

Buffer.prototype.readFloatBE = function readFloatBE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, false, 23, 4)
}

Buffer.prototype.readDoubleLE = function readDoubleLE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, true, 52, 8)
}

Buffer.prototype.readDoubleBE = function readDoubleBE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, false, 52, 8)
}

function checkInt (buf, value, offset, ext, max, min) {
  if (!Buffer.isBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance')
  if (value > max || value < min) throw new RangeError('"value" argument is out of bounds')
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
}

Buffer.prototype.writeUintLE =
Buffer.prototype.writeUIntLE = function writeUIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) {
    const maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  let mul = 1
  let i = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUintBE =
Buffer.prototype.writeUIntBE = function writeUIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) {
    const maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  let i = byteLength - 1
  let mul = 1
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUint8 =
Buffer.prototype.writeUInt8 = function writeUInt8 (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0)
  this[offset] = (value & 0xff)
  return offset + 1
}

Buffer.prototype.writeUint16LE =
Buffer.prototype.writeUInt16LE = function writeUInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  this[offset] = (value & 0xff)
  this[offset + 1] = (value >>> 8)
  return offset + 2
}

Buffer.prototype.writeUint16BE =
Buffer.prototype.writeUInt16BE = function writeUInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  this[offset] = (value >>> 8)
  this[offset + 1] = (value & 0xff)
  return offset + 2
}

Buffer.prototype.writeUint32LE =
Buffer.prototype.writeUInt32LE = function writeUInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  this[offset + 3] = (value >>> 24)
  this[offset + 2] = (value >>> 16)
  this[offset + 1] = (value >>> 8)
  this[offset] = (value & 0xff)
  return offset + 4
}

Buffer.prototype.writeUint32BE =
Buffer.prototype.writeUInt32BE = function writeUInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  this[offset] = (value >>> 24)
  this[offset + 1] = (value >>> 16)
  this[offset + 2] = (value >>> 8)
  this[offset + 3] = (value & 0xff)
  return offset + 4
}

function wrtBigUInt64LE (buf, value, offset, min, max) {
  checkIntBI(value, min, max, buf, offset, 7)

  let lo = Number(value & BigInt(0xffffffff))
  buf[offset++] = lo
  lo = lo >> 8
  buf[offset++] = lo
  lo = lo >> 8
  buf[offset++] = lo
  lo = lo >> 8
  buf[offset++] = lo
  let hi = Number(value >> BigInt(32) & BigInt(0xffffffff))
  buf[offset++] = hi
  hi = hi >> 8
  buf[offset++] = hi
  hi = hi >> 8
  buf[offset++] = hi
  hi = hi >> 8
  buf[offset++] = hi
  return offset
}

function wrtBigUInt64BE (buf, value, offset, min, max) {
  checkIntBI(value, min, max, buf, offset, 7)

  let lo = Number(value & BigInt(0xffffffff))
  buf[offset + 7] = lo
  lo = lo >> 8
  buf[offset + 6] = lo
  lo = lo >> 8
  buf[offset + 5] = lo
  lo = lo >> 8
  buf[offset + 4] = lo
  let hi = Number(value >> BigInt(32) & BigInt(0xffffffff))
  buf[offset + 3] = hi
  hi = hi >> 8
  buf[offset + 2] = hi
  hi = hi >> 8
  buf[offset + 1] = hi
  hi = hi >> 8
  buf[offset] = hi
  return offset + 8
}

Buffer.prototype.writeBigUInt64LE = defineBigIntMethod(function writeBigUInt64LE (value, offset = 0) {
  return wrtBigUInt64LE(this, value, offset, BigInt(0), BigInt('0xffffffffffffffff'))
})

Buffer.prototype.writeBigUInt64BE = defineBigIntMethod(function writeBigUInt64BE (value, offset = 0) {
  return wrtBigUInt64BE(this, value, offset, BigInt(0), BigInt('0xffffffffffffffff'))
})

Buffer.prototype.writeIntLE = function writeIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) {
    const limit = Math.pow(2, (8 * byteLength) - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  let i = 0
  let mul = 1
  let sub = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeIntBE = function writeIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) {
    const limit = Math.pow(2, (8 * byteLength) - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  let i = byteLength - 1
  let mul = 1
  let sub = 0
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeInt8 = function writeInt8 (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80)
  if (value < 0) value = 0xff + value + 1
  this[offset] = (value & 0xff)
  return offset + 1
}

Buffer.prototype.writeInt16LE = function writeInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  this[offset] = (value & 0xff)
  this[offset + 1] = (value >>> 8)
  return offset + 2
}

Buffer.prototype.writeInt16BE = function writeInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  this[offset] = (value >>> 8)
  this[offset + 1] = (value & 0xff)
  return offset + 2
}

Buffer.prototype.writeInt32LE = function writeInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  this[offset] = (value & 0xff)
  this[offset + 1] = (value >>> 8)
  this[offset + 2] = (value >>> 16)
  this[offset + 3] = (value >>> 24)
  return offset + 4
}

Buffer.prototype.writeInt32BE = function writeInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (value < 0) value = 0xffffffff + value + 1
  this[offset] = (value >>> 24)
  this[offset + 1] = (value >>> 16)
  this[offset + 2] = (value >>> 8)
  this[offset + 3] = (value & 0xff)
  return offset + 4
}

Buffer.prototype.writeBigInt64LE = defineBigIntMethod(function writeBigInt64LE (value, offset = 0) {
  return wrtBigUInt64LE(this, value, offset, -BigInt('0x8000000000000000'), BigInt('0x7fffffffffffffff'))
})

Buffer.prototype.writeBigInt64BE = defineBigIntMethod(function writeBigInt64BE (value, offset = 0) {
  return wrtBigUInt64BE(this, value, offset, -BigInt('0x8000000000000000'), BigInt('0x7fffffffffffffff'))
})

function checkIEEE754 (buf, value, offset, ext, max, min) {
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
  if (offset < 0) throw new RangeError('Index out of range')
}

function writeFloat (buf, value, offset, littleEndian, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38)
  }
  ieee754.write(buf, value, offset, littleEndian, 23, 4)
  return offset + 4
}

Buffer.prototype.writeFloatLE = function writeFloatLE (value, offset, noAssert) {
  return writeFloat(this, value, offset, true, noAssert)
}

Buffer.prototype.writeFloatBE = function writeFloatBE (value, offset, noAssert) {
  return writeFloat(this, value, offset, false, noAssert)
}

function writeDouble (buf, value, offset, littleEndian, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -1.7976931348623157E+308)
  }
  ieee754.write(buf, value, offset, littleEndian, 52, 8)
  return offset + 8
}

Buffer.prototype.writeDoubleLE = function writeDoubleLE (value, offset, noAssert) {
  return writeDouble(this, value, offset, true, noAssert)
}

Buffer.prototype.writeDoubleBE = function writeDoubleBE (value, offset, noAssert) {
  return writeDouble(this, value, offset, false, noAssert)
}

// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
Buffer.prototype.copy = function copy (target, targetStart, start, end) {
  if (!Buffer.isBuffer(target)) throw new TypeError('argument should be a Buffer')
  if (!start) start = 0
  if (!end && end !== 0) end = this.length
  if (targetStart >= target.length) targetStart = target.length
  if (!targetStart) targetStart = 0
  if (end > 0 && end < start) end = start

  // Copy 0 bytes; we're done
  if (end === start) return 0
  if (target.length === 0 || this.length === 0) return 0

  // Fatal error conditions
  if (targetStart < 0) {
    throw new RangeError('targetStart out of bounds')
  }
  if (start < 0 || start >= this.length) throw new RangeError('Index out of range')
  if (end < 0) throw new RangeError('sourceEnd out of bounds')

  // Are we oob?
  if (end > this.length) end = this.length
  if (target.length - targetStart < end - start) {
    end = target.length - targetStart + start
  }

  const len = end - start

  if (this === target && typeof Uint8Array.prototype.copyWithin === 'function') {
    // Use built-in when available, missing from IE11
    this.copyWithin(targetStart, start, end)
  } else {
    Uint8Array.prototype.set.call(
      target,
      this.subarray(start, end),
      targetStart
    )
  }

  return len
}

// Usage:
//    buffer.fill(number[, offset[, end]])
//    buffer.fill(buffer[, offset[, end]])
//    buffer.fill(string[, offset[, end]][, encoding])
Buffer.prototype.fill = function fill (val, start, end, encoding) {
  // Handle string cases:
  if (typeof val === 'string') {
    if (typeof start === 'string') {
      encoding = start
      start = 0
      end = this.length
    } else if (typeof end === 'string') {
      encoding = end
      end = this.length
    }
    if (encoding !== undefined && typeof encoding !== 'string') {
      throw new TypeError('encoding must be a string')
    }
    if (typeof encoding === 'string' && !Buffer.isEncoding(encoding)) {
      throw new TypeError('Unknown encoding: ' + encoding)
    }
    if (val.length === 1) {
      const code = val.charCodeAt(0)
      if ((encoding === 'utf8' && code < 128) ||
          encoding === 'latin1') {
        // Fast path: If `val` fits into a single byte, use that numeric value.
        val = code
      }
    }
  } else if (typeof val === 'number') {
    val = val & 255
  } else if (typeof val === 'boolean') {
    val = Number(val)
  }

  // Invalid ranges are not set to a default, so can range check early.
  if (start < 0 || this.length < start || this.length < end) {
    throw new RangeError('Out of range index')
  }

  if (end <= start) {
    return this
  }

  start = start >>> 0
  end = end === undefined ? this.length : end >>> 0

  if (!val) val = 0

  let i
  if (typeof val === 'number') {
    for (i = start; i < end; ++i) {
      this[i] = val
    }
  } else {
    const bytes = Buffer.isBuffer(val)
      ? val
      : Buffer.from(val, encoding)
    const len = bytes.length
    if (len === 0) {
      throw new TypeError('The value "' + val +
        '" is invalid for argument "value"')
    }
    for (i = 0; i < end - start; ++i) {
      this[i + start] = bytes[i % len]
    }
  }

  return this
}

// CUSTOM ERRORS
// =============

// Simplified versions from Node, changed for Buffer-only usage
const errors = {}
function E (sym, getMessage, Base) {
  errors[sym] = class NodeError extends Base {
    constructor () {
      super()

      Object.defineProperty(this, 'message', {
        value: getMessage.apply(this, arguments),
        writable: true,
        configurable: true
      })

      // Add the error code to the name to include it in the stack trace.
      this.name = `${this.name} [${sym}]`
      // Access the stack to generate the error message including the error code
      // from the name.
      this.stack // eslint-disable-line no-unused-expressions
      // Reset the name to the actual name.
      delete this.name
    }

    get code () {
      return sym
    }

    set code (value) {
      Object.defineProperty(this, 'code', {
        configurable: true,
        enumerable: true,
        value,
        writable: true
      })
    }

    toString () {
      return `${this.name} [${sym}]: ${this.message}`
    }
  }
}

E('ERR_BUFFER_OUT_OF_BOUNDS',
  function (name) {
    if (name) {
      return `${name} is outside of buffer bounds`
    }

    return 'Attempt to access memory outside buffer bounds'
  }, RangeError)
E('ERR_INVALID_ARG_TYPE',
  function (name, actual) {
    return `The "${name}" argument must be of type number. Received type ${typeof actual}`
  }, TypeError)
E('ERR_OUT_OF_RANGE',
  function (str, range, input) {
    let msg = `The value of "${str}" is out of range.`
    let received = input
    if (Number.isInteger(input) && Math.abs(input) > 2 ** 32) {
      received = addNumericalSeparator(String(input))
    } else if (typeof input === 'bigint') {
      received = String(input)
      if (input > BigInt(2) ** BigInt(32) || input < -(BigInt(2) ** BigInt(32))) {
        received = addNumericalSeparator(received)
      }
      received += 'n'
    }
    msg += ` It must be ${range}. Received ${received}`
    return msg
  }, RangeError)

function addNumericalSeparator (val) {
  let res = ''
  let i = val.length
  const start = val[0] === '-' ? 1 : 0
  for (; i >= start + 4; i -= 3) {
    res = `_${val.slice(i - 3, i)}${res}`
  }
  return `${val.slice(0, i)}${res}`
}

// CHECK FUNCTIONS
// ===============

function checkBounds (buf, offset, byteLength) {
  validateNumber(offset, 'offset')
  if (buf[offset] === undefined || buf[offset + byteLength] === undefined) {
    boundsError(offset, buf.length - (byteLength + 1))
  }
}

function checkIntBI (value, min, max, buf, offset, byteLength) {
  if (value > max || value < min) {
    const n = typeof min === 'bigint' ? 'n' : ''
    let range
    if (byteLength > 3) {
      if (min === 0 || min === BigInt(0)) {
        range = `>= 0${n} and < 2${n} ** ${(byteLength + 1) * 8}${n}`
      } else {
        range = `>= -(2${n} ** ${(byteLength + 1) * 8 - 1}${n}) and < 2 ** ` +
                `${(byteLength + 1) * 8 - 1}${n}`
      }
    } else {
      range = `>= ${min}${n} and <= ${max}${n}`
    }
    throw new errors.ERR_OUT_OF_RANGE('value', range, value)
  }
  checkBounds(buf, offset, byteLength)
}

function validateNumber (value, name) {
  if (typeof value !== 'number') {
    throw new errors.ERR_INVALID_ARG_TYPE(name, 'number', value)
  }
}

function boundsError (value, length, type) {
  if (Math.floor(value) !== value) {
    validateNumber(value, type)
    throw new errors.ERR_OUT_OF_RANGE(type || 'offset', 'an integer', value)
  }

  if (length < 0) {
    throw new errors.ERR_BUFFER_OUT_OF_BOUNDS()
  }

  throw new errors.ERR_OUT_OF_RANGE(type || 'offset',
                                    `>= ${type ? 1 : 0} and <= ${length}`,
                                    value)
}

// HELPER FUNCTIONS
// ================

const INVALID_BASE64_RE = /[^+/0-9A-Za-z-_]/g

function base64clean (str) {
  // Node takes equal signs as end of the Base64 encoding
  str = str.split('=')[0]
  // Node strips out invalid characters like \n and \t from the string, base64-js does not
  str = str.trim().replace(INVALID_BASE64_RE, '')
  // Node converts strings with length < 2 to ''
  if (str.length < 2) return ''
  // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
  while (str.length % 4 !== 0) {
    str = str + '='
  }
  return str
}

function utf8ToBytes (string, units) {
  units = units || Infinity
  let codePoint
  const length = string.length
  let leadSurrogate = null
  const bytes = []

  for (let i = 0; i < length; ++i) {
    codePoint = string.charCodeAt(i)

    // is surrogate component
    if (codePoint > 0xD7FF && codePoint < 0xE000) {
      // last char was a lead
      if (!leadSurrogate) {
        // no lead yet
        if (codePoint > 0xDBFF) {
          // unexpected trail
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        } else if (i + 1 === length) {
          // unpaired lead
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        }

        // valid lead
        leadSurrogate = codePoint

        continue
      }

      // 2 leads in a row
      if (codePoint < 0xDC00) {
        if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
        leadSurrogate = codePoint
        continue
      }

      // valid surrogate pair
      codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000
    } else if (leadSurrogate) {
      // valid bmp char, but last char was a lead
      if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
    }

    leadSurrogate = null

    // encode utf8
    if (codePoint < 0x80) {
      if ((units -= 1) < 0) break
      bytes.push(codePoint)
    } else if (codePoint < 0x800) {
      if ((units -= 2) < 0) break
      bytes.push(
        codePoint >> 0x6 | 0xC0,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x10000) {
      if ((units -= 3) < 0) break
      bytes.push(
        codePoint >> 0xC | 0xE0,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x110000) {
      if ((units -= 4) < 0) break
      bytes.push(
        codePoint >> 0x12 | 0xF0,
        codePoint >> 0xC & 0x3F | 0x80,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else {
      throw new Error('Invalid code point')
    }
  }

  return bytes
}

function asciiToBytes (str) {
  const byteArray = []
  for (let i = 0; i < str.length; ++i) {
    // Node's code seems to be doing this and not & 0x7F..
    byteArray.push(str.charCodeAt(i) & 0xFF)
  }
  return byteArray
}

function utf16leToBytes (str, units) {
  let c, hi, lo
  const byteArray = []
  for (let i = 0; i < str.length; ++i) {
    if ((units -= 2) < 0) break

    c = str.charCodeAt(i)
    hi = c >> 8
    lo = c % 256
    byteArray.push(lo)
    byteArray.push(hi)
  }

  return byteArray
}

function base64ToBytes (str) {
  return base64.toByteArray(base64clean(str))
}

function blitBuffer (src, dst, offset, length) {
  let i
  for (i = 0; i < length; ++i) {
    if ((i + offset >= dst.length) || (i >= src.length)) break
    dst[i + offset] = src[i]
  }
  return i
}

// ArrayBuffer or Uint8Array objects from other contexts (i.e. iframes) do not pass
// the `instanceof` check but they should be treated as of that type.
// See: https://github.com/feross/buffer/issues/166
function isInstance (obj, type) {
  return obj instanceof type ||
    (obj != null && obj.constructor != null && obj.constructor.name != null &&
      obj.constructor.name === type.name)
}
function numberIsNaN (obj) {
  // For IE11 support
  return obj !== obj // eslint-disable-line no-self-compare
}

// Create lookup table for `toString('hex')`
// See: https://github.com/feross/buffer/issues/219
const hexSliceLookupTable = (function () {
  const alphabet = '0123456789abcdef'
  const table = new Array(256)
  for (let i = 0; i < 16; ++i) {
    const i16 = i * 16
    for (let j = 0; j < 16; ++j) {
      table[i16 + j] = alphabet[i] + alphabet[j]
    }
  }
  return table
})()

// Return not function with Error if BigInt not supported
function defineBigIntMethod (fn) {
  return typeof BigInt === 'undefined' ? BufferBigIntNotDefined : fn
}

function BufferBigIntNotDefined () {
  throw new Error('BigInt not supported')
}


/***/ }),

/***/ 7:
/***/ ((module) => {

// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.



var R = typeof Reflect === 'object' ? Reflect : null
var ReflectApply = R && typeof R.apply === 'function'
  ? R.apply
  : function ReflectApply(target, receiver, args) {
    return Function.prototype.apply.call(target, receiver, args);
  }

var ReflectOwnKeys
if (R && typeof R.ownKeys === 'function') {
  ReflectOwnKeys = R.ownKeys
} else if (Object.getOwnPropertySymbols) {
  ReflectOwnKeys = function ReflectOwnKeys(target) {
    return Object.getOwnPropertyNames(target)
      .concat(Object.getOwnPropertySymbols(target));
  };
} else {
  ReflectOwnKeys = function ReflectOwnKeys(target) {
    return Object.getOwnPropertyNames(target);
  };
}

function ProcessEmitWarning(warning) {
  if (console && console.warn) console.warn(warning);
}

var NumberIsNaN = Number.isNaN || function NumberIsNaN(value) {
  return value !== value;
}

function EventEmitter() {
  EventEmitter.init.call(this);
}
module.exports = EventEmitter;
module.exports.once = once;

// Backwards-compat with node 0.10.x
EventEmitter.EventEmitter = EventEmitter;

EventEmitter.prototype._events = undefined;
EventEmitter.prototype._eventsCount = 0;
EventEmitter.prototype._maxListeners = undefined;

// By default EventEmitters will print a warning if more than 10 listeners are
// added to it. This is a useful default which helps finding memory leaks.
var defaultMaxListeners = 10;

function checkListener(listener) {
  if (typeof listener !== 'function') {
    throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof listener);
  }
}

Object.defineProperty(EventEmitter, 'defaultMaxListeners', {
  enumerable: true,
  get: function() {
    return defaultMaxListeners;
  },
  set: function(arg) {
    if (typeof arg !== 'number' || arg < 0 || NumberIsNaN(arg)) {
      throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' + arg + '.');
    }
    defaultMaxListeners = arg;
  }
});

EventEmitter.init = function() {

  if (this._events === undefined ||
      this._events === Object.getPrototypeOf(this)._events) {
    this._events = Object.create(null);
    this._eventsCount = 0;
  }

  this._maxListeners = this._maxListeners || undefined;
};

// Obviously not all Emitters should be limited to 10. This function allows
// that to be increased. Set to zero for unlimited.
EventEmitter.prototype.setMaxListeners = function setMaxListeners(n) {
  if (typeof n !== 'number' || n < 0 || NumberIsNaN(n)) {
    throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received ' + n + '.');
  }
  this._maxListeners = n;
  return this;
};

function _getMaxListeners(that) {
  if (that._maxListeners === undefined)
    return EventEmitter.defaultMaxListeners;
  return that._maxListeners;
}

EventEmitter.prototype.getMaxListeners = function getMaxListeners() {
  return _getMaxListeners(this);
};

EventEmitter.prototype.emit = function emit(type) {
  var args = [];
  for (var i = 1; i < arguments.length; i++) args.push(arguments[i]);
  var doError = (type === 'error');

  var events = this._events;
  if (events !== undefined)
    doError = (doError && events.error === undefined);
  else if (!doError)
    return false;

  // If there is no 'error' event listener then throw.
  if (doError) {
    var er;
    if (args.length > 0)
      er = args[0];
    if (er instanceof Error) {
      // Note: The comments on the `throw` lines are intentional, they show
      // up in Node's output if this results in an unhandled exception.
      throw er; // Unhandled 'error' event
    }
    // At least give some kind of context to the user
    var err = new Error('Unhandled error.' + (er ? ' (' + er.message + ')' : ''));
    err.context = er;
    throw err; // Unhandled 'error' event
  }

  var handler = events[type];

  if (handler === undefined)
    return false;

  if (typeof handler === 'function') {
    ReflectApply(handler, this, args);
  } else {
    var len = handler.length;
    var listeners = arrayClone(handler, len);
    for (var i = 0; i < len; ++i)
      ReflectApply(listeners[i], this, args);
  }

  return true;
};

function _addListener(target, type, listener, prepend) {
  var m;
  var events;
  var existing;

  checkListener(listener);

  events = target._events;
  if (events === undefined) {
    events = target._events = Object.create(null);
    target._eventsCount = 0;
  } else {
    // To avoid recursion in the case that type === "newListener"! Before
    // adding it to the listeners, first emit "newListener".
    if (events.newListener !== undefined) {
      target.emit('newListener', type,
                  listener.listener ? listener.listener : listener);

      // Re-assign `events` because a newListener handler could have caused the
      // this._events to be assigned to a new object
      events = target._events;
    }
    existing = events[type];
  }

  if (existing === undefined) {
    // Optimize the case of one listener. Don't need the extra array object.
    existing = events[type] = listener;
    ++target._eventsCount;
  } else {
    if (typeof existing === 'function') {
      // Adding the second element, need to change to array.
      existing = events[type] =
        prepend ? [listener, existing] : [existing, listener];
      // If we've already got an array, just append.
    } else if (prepend) {
      existing.unshift(listener);
    } else {
      existing.push(listener);
    }

    // Check for listener leak
    m = _getMaxListeners(target);
    if (m > 0 && existing.length > m && !existing.warned) {
      existing.warned = true;
      // No error code for this since it is a Warning
      // eslint-disable-next-line no-restricted-syntax
      var w = new Error('Possible EventEmitter memory leak detected. ' +
                          existing.length + ' ' + String(type) + ' listeners ' +
                          'added. Use emitter.setMaxListeners() to ' +
                          'increase limit');
      w.name = 'MaxListenersExceededWarning';
      w.emitter = target;
      w.type = type;
      w.count = existing.length;
      ProcessEmitWarning(w);
    }
  }

  return target;
}

EventEmitter.prototype.addListener = function addListener(type, listener) {
  return _addListener(this, type, listener, false);
};

EventEmitter.prototype.on = EventEmitter.prototype.addListener;

EventEmitter.prototype.prependListener =
    function prependListener(type, listener) {
      return _addListener(this, type, listener, true);
    };

function onceWrapper() {
  if (!this.fired) {
    this.target.removeListener(this.type, this.wrapFn);
    this.fired = true;
    if (arguments.length === 0)
      return this.listener.call(this.target);
    return this.listener.apply(this.target, arguments);
  }
}

function _onceWrap(target, type, listener) {
  var state = { fired: false, wrapFn: undefined, target: target, type: type, listener: listener };
  var wrapped = onceWrapper.bind(state);
  wrapped.listener = listener;
  state.wrapFn = wrapped;
  return wrapped;
}

EventEmitter.prototype.once = function once(type, listener) {
  checkListener(listener);
  this.on(type, _onceWrap(this, type, listener));
  return this;
};

EventEmitter.prototype.prependOnceListener =
    function prependOnceListener(type, listener) {
      checkListener(listener);
      this.prependListener(type, _onceWrap(this, type, listener));
      return this;
    };

// Emits a 'removeListener' event if and only if the listener was removed.
EventEmitter.prototype.removeListener =
    function removeListener(type, listener) {
      var list, events, position, i, originalListener;

      checkListener(listener);

      events = this._events;
      if (events === undefined)
        return this;

      list = events[type];
      if (list === undefined)
        return this;

      if (list === listener || list.listener === listener) {
        if (--this._eventsCount === 0)
          this._events = Object.create(null);
        else {
          delete events[type];
          if (events.removeListener)
            this.emit('removeListener', type, list.listener || listener);
        }
      } else if (typeof list !== 'function') {
        position = -1;

        for (i = list.length - 1; i >= 0; i--) {
          if (list[i] === listener || list[i].listener === listener) {
            originalListener = list[i].listener;
            position = i;
            break;
          }
        }

        if (position < 0)
          return this;

        if (position === 0)
          list.shift();
        else {
          spliceOne(list, position);
        }

        if (list.length === 1)
          events[type] = list[0];

        if (events.removeListener !== undefined)
          this.emit('removeListener', type, originalListener || listener);
      }

      return this;
    };

EventEmitter.prototype.off = EventEmitter.prototype.removeListener;

EventEmitter.prototype.removeAllListeners =
    function removeAllListeners(type) {
      var listeners, events, i;

      events = this._events;
      if (events === undefined)
        return this;

      // not listening for removeListener, no need to emit
      if (events.removeListener === undefined) {
        if (arguments.length === 0) {
          this._events = Object.create(null);
          this._eventsCount = 0;
        } else if (events[type] !== undefined) {
          if (--this._eventsCount === 0)
            this._events = Object.create(null);
          else
            delete events[type];
        }
        return this;
      }

      // emit removeListener for all listeners on all events
      if (arguments.length === 0) {
        var keys = Object.keys(events);
        var key;
        for (i = 0; i < keys.length; ++i) {
          key = keys[i];
          if (key === 'removeListener') continue;
          this.removeAllListeners(key);
        }
        this.removeAllListeners('removeListener');
        this._events = Object.create(null);
        this._eventsCount = 0;
        return this;
      }

      listeners = events[type];

      if (typeof listeners === 'function') {
        this.removeListener(type, listeners);
      } else if (listeners !== undefined) {
        // LIFO order
        for (i = listeners.length - 1; i >= 0; i--) {
          this.removeListener(type, listeners[i]);
        }
      }

      return this;
    };

function _listeners(target, type, unwrap) {
  var events = target._events;

  if (events === undefined)
    return [];

  var evlistener = events[type];
  if (evlistener === undefined)
    return [];

  if (typeof evlistener === 'function')
    return unwrap ? [evlistener.listener || evlistener] : [evlistener];

  return unwrap ?
    unwrapListeners(evlistener) : arrayClone(evlistener, evlistener.length);
}

EventEmitter.prototype.listeners = function listeners(type) {
  return _listeners(this, type, true);
};

EventEmitter.prototype.rawListeners = function rawListeners(type) {
  return _listeners(this, type, false);
};

EventEmitter.listenerCount = function(emitter, type) {
  if (typeof emitter.listenerCount === 'function') {
    return emitter.listenerCount(type);
  } else {
    return listenerCount.call(emitter, type);
  }
};

EventEmitter.prototype.listenerCount = listenerCount;
function listenerCount(type) {
  var events = this._events;

  if (events !== undefined) {
    var evlistener = events[type];

    if (typeof evlistener === 'function') {
      return 1;
    } else if (evlistener !== undefined) {
      return evlistener.length;
    }
  }

  return 0;
}

EventEmitter.prototype.eventNames = function eventNames() {
  return this._eventsCount > 0 ? ReflectOwnKeys(this._events) : [];
};

function arrayClone(arr, n) {
  var copy = new Array(n);
  for (var i = 0; i < n; ++i)
    copy[i] = arr[i];
  return copy;
}

function spliceOne(list, index) {
  for (; index + 1 < list.length; index++)
    list[index] = list[index + 1];
  list.pop();
}

function unwrapListeners(arr) {
  var ret = new Array(arr.length);
  for (var i = 0; i < ret.length; ++i) {
    ret[i] = arr[i].listener || arr[i];
  }
  return ret;
}

function once(emitter, name) {
  return new Promise(function (resolve, reject) {
    function errorListener(err) {
      emitter.removeListener(name, resolver);
      reject(err);
    }

    function resolver() {
      if (typeof emitter.removeListener === 'function') {
        emitter.removeListener('error', errorListener);
      }
      resolve([].slice.call(arguments));
    };

    eventTargetAgnosticAddListener(emitter, name, resolver, { once: true });
    if (name !== 'error') {
      addErrorHandlerIfEventEmitter(emitter, errorListener, { once: true });
    }
  });
}

function addErrorHandlerIfEventEmitter(emitter, handler, flags) {
  if (typeof emitter.on === 'function') {
    eventTargetAgnosticAddListener(emitter, 'error', handler, flags);
  }
}

function eventTargetAgnosticAddListener(emitter, name, listener, flags) {
  if (typeof emitter.on === 'function') {
    if (flags.once) {
      emitter.once(name, listener);
    } else {
      emitter.on(name, listener);
    }
  } else if (typeof emitter.addEventListener === 'function') {
    // EventTarget does not have `error` event semantics like Node
    // EventEmitters, we do not listen for `error` events here.
    emitter.addEventListener(name, function wrapListener(arg) {
      // IE does not have builtin `{ once: true }` support so we
      // have to do it manually.
      if (flags.once) {
        emitter.removeEventListener(name, wrapListener);
      }
      listener(arg);
    });
  } else {
    throw new TypeError('The "emitter" argument must be of type EventEmitter. Received type ' + typeof emitter);
  }
}


/***/ }),

/***/ 251:
/***/ ((__unused_webpack_module, exports) => {

/*! ieee754. BSD-3-Clause License. Feross Aboukhadijeh <https://feross.org/opensource> */
exports.read = function (buffer, offset, isLE, mLen, nBytes) {
  var e, m
  var eLen = (nBytes * 8) - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var nBits = -7
  var i = isLE ? (nBytes - 1) : 0
  var d = isLE ? -1 : 1
  var s = buffer[offset + i]

  i += d

  e = s & ((1 << (-nBits)) - 1)
  s >>= (-nBits)
  nBits += eLen
  for (; nBits > 0; e = (e * 256) + buffer[offset + i], i += d, nBits -= 8) {}

  m = e & ((1 << (-nBits)) - 1)
  e >>= (-nBits)
  nBits += mLen
  for (; nBits > 0; m = (m * 256) + buffer[offset + i], i += d, nBits -= 8) {}

  if (e === 0) {
    e = 1 - eBias
  } else if (e === eMax) {
    return m ? NaN : ((s ? -1 : 1) * Infinity)
  } else {
    m = m + Math.pow(2, mLen)
    e = e - eBias
  }
  return (s ? -1 : 1) * m * Math.pow(2, e - mLen)
}

exports.write = function (buffer, value, offset, isLE, mLen, nBytes) {
  var e, m, c
  var eLen = (nBytes * 8) - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0)
  var i = isLE ? 0 : (nBytes - 1)
  var d = isLE ? 1 : -1
  var s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0

  value = Math.abs(value)

  if (isNaN(value) || value === Infinity) {
    m = isNaN(value) ? 1 : 0
    e = eMax
  } else {
    e = Math.floor(Math.log(value) / Math.LN2)
    if (value * (c = Math.pow(2, -e)) < 1) {
      e--
      c *= 2
    }
    if (e + eBias >= 1) {
      value += rt / c
    } else {
      value += rt * Math.pow(2, 1 - eBias)
    }
    if (value * c >= 2) {
      e++
      c /= 2
    }

    if (e + eBias >= eMax) {
      m = 0
      e = eMax
    } else if (e + eBias >= 1) {
      m = ((value * c) - 1) * Math.pow(2, mLen)
      e = e + eBias
    } else {
      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen)
      e = 0
    }
  }

  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}

  e = (e << mLen) | m
  eLen += mLen
  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}

  buffer[offset + i - d] |= s * 128
}


/***/ })

/******/ });
/************************************************************************/
/******/ // The module cache
/******/ var __webpack_module_cache__ = {};
/******/ 
/******/ // The require function
/******/ function __webpack_require__(moduleId) {
/******/ 	// Check if module is in cache
/******/ 	var cachedModule = __webpack_module_cache__[moduleId];
/******/ 	if (cachedModule !== undefined) {
/******/ 		return cachedModule.exports;
/******/ 	}
/******/ 	// Create a new module (and put it into the cache)
/******/ 	var module = __webpack_module_cache__[moduleId] = {
/******/ 		// no module.id needed
/******/ 		// no module.loaded needed
/******/ 		exports: {}
/******/ 	};
/******/ 
/******/ 	// Execute the module function
/******/ 	__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 
/******/ 	// Return the exports of the module
/******/ 	return module.exports;
/******/ }
/******/ 
/************************************************************************/
/******/ /* webpack/runtime/define property getters */
/******/ (() => {
/******/ 	// define getter functions for harmony exports
/******/ 	__webpack_require__.d = (exports, definition) => {
/******/ 		for(var key in definition) {
/******/ 			if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 				Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 			}
/******/ 		}
/******/ 	};
/******/ })();
/******/ 
/******/ /* webpack/runtime/hasOwnProperty shorthand */
/******/ (() => {
/******/ 	__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ })();
/******/ 
/******/ /* webpack/runtime/make namespace object */
/******/ (() => {
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = (exports) => {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/ })();
/******/ 
/************************************************************************/
var __webpack_exports__ = {};
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  Artist: () => (/* reexport */ Artist),
  Asset: () => (/* reexport */ Asset),
  Audio: () => (/* reexport */ Audio_Audio),
  Collection: () => (/* reexport */ Collection),
  Composition: () => (/* reexport */ Composition),
  Image: () => (/* reexport */ Image),
  OOMD: () => (/* reexport */ OOMD_namespaceObject),
  Ordinal: () => (/* reexport */ Ordinal),
  OrdinalType: () => (/* reexport */ OrdinalType),
  Release: () => (/* reexport */ Release),
  Sprite: () => (/* reexport */ Sprite),
  SpriteAnimation: () => (/* reexport */ SpriteAnimation),
  SpriteType: () => (/* reexport */ SpriteType),
  Track: () => (/* reexport */ Track),
  Trait: () => (/* reexport */ Trait),
  Variant: () => (/* reexport */ Variant),
  Video: () => (/* reexport */ Video),
  addAsset: () => (/* reexport */ addAsset),
  addCollection: () => (/* reexport */ addCollection),
  addComposition: () => (/* reexport */ addComposition),
  addTrait: () => (/* reexport */ addTrait),
  addVariant: () => (/* reexport */ addVariant),
  cached: () => (/* reexport */ cached),
  clearAssets: () => (/* reexport */ clearAssets),
  clearCollections: () => (/* reexport */ clearCollections),
  clearCompositions: () => (/* reexport */ clearCompositions),
  clearTraits: () => (/* reexport */ clearTraits),
  clearVariants: () => (/* reexport */ clearVariants),
  fetchLatest: () => (/* reexport */ fetchLatest),
  getAll: () => (/* reexport */ getAll),
  getAsset: () => (/* reexport */ getAsset),
  getAssets: () => (/* reexport */ getAssets),
  getBlockHash: () => (/* reexport */ getBlockHash),
  getBlockHeight: () => (/* reexport */ getBlockHeight),
  getBlockInfo: () => (/* reexport */ getBlockInfo),
  getBlockTime: () => (/* reexport */ getBlockTime),
  getChildrenAll: () => (/* reexport */ getChildrenAll),
  getChildrenPage: () => (/* reexport */ getChildrenPage),
  getCollection: () => (/* reexport */ getCollection),
  getCollections: () => (/* reexport */ getCollections),
  getComposition: () => (/* reexport */ getComposition),
  getCompositions: () => (/* reexport */ getCompositions),
  getDisplayedVariant: () => (/* reexport */ getDisplayedVariant),
  getId: () => (/* reexport */ getId),
  getInscription: () => (/* reexport */ getInscription),
  getLatestId: () => (/* reexport */ getLatestId),
  getLatestPath: () => (/* reexport */ getLatestPath),
  getMetadata: () => (/* reexport */ getMetadata),
  getOOMD: () => (/* reexport */ getOOMD),
  getOrdinalApiFromIFrame: () => (/* reexport */ getOrdinalApiFromIFrame),
  getParentsAll: () => (/* reexport */ getParentsAll),
  getParentsPage: () => (/* reexport */ getParentsPage),
  getRequestParams: () => (/* reexport */ getRequestParams),
  getSatAll: () => (/* reexport */ getSatAll),
  getSatAt: () => (/* reexport */ getSatAt),
  getSatPage: () => (/* reexport */ getSatPage),
  getTrait: () => (/* reexport */ getTrait),
  getTraits: () => (/* reexport */ getTraits),
  getType: () => (/* reexport */ getType),
  getVariant: () => (/* reexport */ getVariant),
  getVariants: () => (/* reexport */ getVariants),
  importLatest: () => (/* reexport */ importLatest),
  isOrdinalAPIExtensionsAvailable: () => (/* reexport */ isOrdinalAPIExtensionsAvailable),
  removeAsset: () => (/* reexport */ removeAsset),
  removeCollection: () => (/* reexport */ removeCollection),
  removeComposition: () => (/* reexport */ removeComposition),
  removeTrait: () => (/* reexport */ removeTrait),
  removeVariant: () => (/* reexport */ removeVariant),
  setDisplayedVariant: () => (/* reexport */ setDisplayedVariant),
  setId: () => (/* reexport */ setId),
  setMetadata: () => (/* reexport */ setMetadata),
  setType: () => (/* reexport */ setType)
});

// NAMESPACE OBJECT: ./lib/oomd/OOMD.js
var OOMD_namespaceObject = {};
__webpack_require__.r(OOMD_namespaceObject);

// NAMESPACE OBJECT: ./lib/ooapi/OOAPI.Core.js
var OOAPI_Core_namespaceObject = {};
__webpack_require__.r(OOAPI_Core_namespaceObject);
__webpack_require__.d(OOAPI_Core_namespaceObject, {
  Artist: () => (Artist),
  Asset: () => (Asset),
  Audio: () => (Audio_Audio),
  Collection: () => (Collection),
  Composition: () => (Composition),
  Image: () => (Image),
  OOMD: () => (OOMD_namespaceObject),
  Ordinal: () => (Ordinal),
  OrdinalType: () => (OrdinalType),
  Release: () => (Release),
  Sprite: () => (Sprite),
  SpriteAnimation: () => (SpriteAnimation),
  SpriteType: () => (SpriteType),
  Track: () => (Track),
  Trait: () => (Trait),
  Variant: () => (Variant),
  Video: () => (Video),
  addAsset: () => (addAsset),
  addCollection: () => (addCollection),
  addComposition: () => (addComposition),
  addTrait: () => (addTrait),
  addVariant: () => (addVariant),
  cached: () => (cached),
  clearAssets: () => (clearAssets),
  clearCollections: () => (clearCollections),
  clearCompositions: () => (clearCompositions),
  clearTraits: () => (clearTraits),
  clearVariants: () => (clearVariants),
  fetchLatest: () => (fetchLatest),
  getAll: () => (getAll),
  getAsset: () => (getAsset),
  getAssets: () => (getAssets),
  getBlockHash: () => (getBlockHash),
  getBlockHeight: () => (getBlockHeight),
  getBlockInfo: () => (getBlockInfo),
  getBlockTime: () => (getBlockTime),
  getChildrenAll: () => (getChildrenAll),
  getChildrenPage: () => (getChildrenPage),
  getCollection: () => (getCollection),
  getCollections: () => (getCollections),
  getComposition: () => (getComposition),
  getCompositions: () => (getCompositions),
  getDisplayedVariant: () => (getDisplayedVariant),
  getId: () => (getId),
  getInscription: () => (getInscription),
  getLatestId: () => (getLatestId),
  getLatestPath: () => (getLatestPath),
  getMetadata: () => (getMetadata),
  getOOMD: () => (getOOMD),
  getOrdinalApiFromIFrame: () => (getOrdinalApiFromIFrame),
  getParentsAll: () => (getParentsAll),
  getParentsPage: () => (getParentsPage),
  getRequestParams: () => (getRequestParams),
  getSatAll: () => (getSatAll),
  getSatAt: () => (getSatAt),
  getSatPage: () => (getSatPage),
  getTrait: () => (getTrait),
  getTraits: () => (getTraits),
  getType: () => (getType),
  getVariant: () => (getVariant),
  getVariants: () => (getVariants),
  importLatest: () => (importLatest),
  isOrdinalAPIExtensionsAvailable: () => (isOrdinalAPIExtensionsAvailable),
  removeAsset: () => (removeAsset),
  removeCollection: () => (removeCollection),
  removeComposition: () => (removeComposition),
  removeTrait: () => (removeTrait),
  removeVariant: () => (removeVariant),
  setDisplayedVariant: () => (setDisplayedVariant),
  setId: () => (setId),
  setMetadata: () => (setMetadata),
  setType: () => (setType)
});

;// CONCATENATED MODULE: ./lib/ooapi/models/utilities/Export.js
var ExportType;
(function (ExportType) {
    ExportType["ORDINAL"] = "ordinal";
    ExportType["DATA"] = "data";
    ExportType["BLOB"] = "blob";
    ExportType["RENDERER"] = "renderer";
})(ExportType || (ExportType = {}));
function getExportType(ex) {
    if (ex instanceof Blob) {
        return ExportType.BLOB;
    }
    else if (typeof ex === 'string') {
        if (ex.startsWith('data:')) {
            return ExportType.DATA;
        }
        else if (ex.startsWith('blob:')) {
            return ExportType.BLOB;
        }
        else {
            return ExportType.ORDINAL;
        }
    }
    throw new Error("Unsupported export type");
}
class Exportable {
    constructor(onExport) {
        this.onExport = onExport;
    }
    canExport() {
        return typeof this.onExport !== 'undefined';
    }
    async export() {
        if (!this.onExport) {
            throw new Error("Nothing to export!");
        }
        const exported = await this.onExport();
        if (exported instanceof Blob) {
            return URL.createObjectURL(exported);
        }
        switch (getExportType(exported)) {
            case ExportType.BLOB:
                return exported;
            case ExportType.DATA:
                return exported;
            case ExportType.ORDINAL:
                return '/content/' + exported;
            case ExportType.RENDERER:
                throw new Error("Renderer export type is not supported");
        }
    }
}
//# sourceMappingURL=Export.js.map
;// CONCATENATED MODULE: ./lib/ooapi/models/globals/Variant.js

/**
 * Variant Class
 * A Variant is a variant of the ordinal. It's a visual distinct visual representation.
 * It can be 2D and / or 3D or any other variation. Not to be confused with Composition.
 */
class Variant extends Exportable {
    constructor(options) {
        super(options.onExport);
        this.type = options.type;
        this.id = options.id;
        this.name = options.name;
        this.onDisplay = options.onDisplay;
        this.onHide = options.onHide;
    }
    async show() {
        if (this.onDisplay) {
            await this.onDisplay();
        }
        else if (this.onExport) {
            const ex = await this.onExport();
            if (getExportType(ex) === ExportType.ORDINAL) {
                const frame = document.createElement('iframe');
                frame.src = `/preview/${ex}`;
                frame.frameBorder = "0";
                frame.style.border = "none";
                frame.style.outline = "none";
                frame.style.overflow = "hidden";
                frame.style.width = "100%";
                frame.style.height = "100%";
                frame.style.position = "fixed";
                frame.style.top = "0";
                frame.style.left = "0";
                frame.style.bottom = "0";
                frame.style.right = "0";
                frame.style.margin = "0";
                frame.style.padding = "0";
                frame.style.zIndex = "999999";
                frame.scrolling = "no";
                document.body.style.border = "0";
                document.body.appendChild(frame);
            }
        }
    }
    async hide() {
        if (this.onHide) {
            await this.onHide();
        }
        else if (this.canExport()) {
            document.body.innerHTML = '';
        }
    }
}
//# sourceMappingURL=Variant.js.map
;// CONCATENATED MODULE: ./lib/ooapi/models/globals/Composition.js

/**
 * A Composition in the Open Ordinal API is a single image as a combination
 * of assets. This can be a single image with different assets combined (staged).
 *
 * Examples of what a Composition can be:
 * - Single image composed of multiple assets
 * - Animated GIF
 * - Rigged of multiple assets
 * - PFP (With background),
 * - PFP (No background)
 * - PFP Theme
 * - and so on...
 */
class Composition extends Exportable {
    constructor(options) {
        super(options.onExport);
        this.id = options.id;
        this.name = options.name;
    }
}
//# sourceMappingURL=Composition.js.map
;// CONCATENATED MODULE: ./lib/ooapi/models/globals/Asset.js
/**
 * Asset Class
 * Assets an Ordinal exposes to be used by externals e.g. Sprites,
 */
/**
 * An Asset in the Open Ordinal API is a single asset the ordinal expose.
 * This can be a single image or different pars a image consists of.
 * If you expose multiple assets to compose a Composition eaach of these
 * are considered an Asset.
 *
 * An Asset is defined when the ordinal want to expose them. One reason
 * to expose these is to give the user of an ordinal the option to bring
 * these to other platforms (i.e. games, remixing and other).
 */
class Asset {
    constructor(options) {
        this.id = options.id;
        this.type = options.type;
        this.name = options.name;
        if (typeof options.data === "string") {
            this.data = async () => options.data;
        }
        else {
            this.data = options.data;
        }
    }
    getType() {
        return this.type;
    }
    getName() {
        return this.name;
    }
    getId() {
        return this.id;
    }
    async getData() {
        if (this.data) {
            return await this.data();
        }
        return null;
    }
}
//# sourceMappingURL=Asset.js.map
;// CONCATENATED MODULE: ./lib/ooapi/models/globals/Trait.js
class Trait {
    constructor(options) {
        this.id = options.id;
        this.name = options.name;
        this.value = options.value;
    }
}
//# sourceMappingURL=Trait.js.map
;// CONCATENATED MODULE: ./lib/ooapi/models/base/Ordinal.js
/**
 * Ordinal Class
 */
var OrdinalType;
(function (OrdinalType) {
    // Audio
    OrdinalType["AUDIO"] = "audio";
    // Video
    OrdinalType["VIDEO"] = "video";
    // Image
    OrdinalType["IMAGE"] = "image";
    // 3D
    OrdinalType["MODEL"] = "3dmodel";
    // Pure Text
    OrdinalType["TEXT"] = "text";
    // Multi (Advanced - Can be multiple types)
    OrdinalType["MULTI"] = "multi";
})(OrdinalType || (OrdinalType = {}));
class Ordinal {
    constructor(options = {}) {
        this.id = options.id ?? '';
        this.transactionStamp = options.transactionStamp ?? null;
        this.info = options.info ?? null;
        this.metaData = options.metaData ?? null;
    }
    getId() {
        return this.id;
    }
    getTransactionStamp() {
        return this.transactionStamp;
    }
    getInfo() {
        return this.info;
    }
    getMetaData() {
        return this.metaData;
    }
}
//# sourceMappingURL=Ordinal.js.map
;// CONCATENATED MODULE: ./lib/ooapi/models/base/Audio.js
/**
 * Audio Class
 */
var AudioType;
(function (AudioType) {
    AudioType["Album"] = "Album";
    AudioType["Artist"] = "Artist";
    AudioType["Track"] = "Track";
})(AudioType || (AudioType = {}));
class Audio_Audio {
    constructor(audioData = {}) {
        this.url = audioData.url;
        this.type = audioData.type;
    }
    getUrl() {
        return this.url;
    }
    getType() {
        return this.type;
    }
}
//# sourceMappingURL=Audio.js.map
;// CONCATENATED MODULE: ./lib/ooapi/models/base/Image.js
/**
 * Image Class
 */
class Image {
    constructor(options = {}) {
        this.url = options.url;
        this.width = options.width;
        this.height = options.height;
        this.description = options.description;
    }
    getUrl() {
        return this.url;
    }
    getWidth() {
        return this.width;
    }
    getHeight() {
        return this.height;
    }
    getDescription() {
        return this.description;
    }
}
//# sourceMappingURL=Image.js.map
;// CONCATENATED MODULE: ./lib/ooapi/models/base/Video.js
/**
 * Video Class
 */
class Video {
    constructor(options = {}) {
        this.url = options.url;
        this.duration = options.duration;
        this.format = options.format;
        this.resolution = options.resolution;
    }
    getUrl() {
        return this.url;
    }
    getDuration() {
        return this.duration;
    }
    getFormat() {
        return this.format;
    }
    getResolution() {
        return this.resolution;
    }
}
//# sourceMappingURL=Video.js.map
;// CONCATENATED MODULE: ./lib/ooapi/models/utilities/Export/Sprite.js

/*
 * Sprite Class
 */
var SpriteType;
(function (SpriteType) {
    SpriteType["GridByCell"] = "gridbycell";
})(SpriteType || (SpriteType = {}));
class SpriteAnimation {
    constructor(data) {
        this.name = data.name;
        this.frames = data.frames;
        this.loop = data.loop ?? true;
    }
}
class Sprite {
    constructor(spriteData) {
        this.rows = 1;
        this.cells = 1;
        this.offset = { x: 0, y: 0 };
        this.padding = { x: 0, y: 0 };
        this.type = SpriteType.GridByCell;
        this.rows = spriteData.rows;
        this.cells = spriteData.cells;
        this.offset = spriteData.offset ?? this.offset;
        this.padding = spriteData.padding ?? this.padding;
        this.source = new Exportable(spriteData.sourceExport);
        this.actions = spriteData.actions;
    }
    ;
}
//# sourceMappingURL=Sprite.js.map
;// CONCATENATED MODULE: ./lib/ooapi/models/usecases/Collection.js
/**
 * Collection Class
 */
/**
 * A Collection is usually defined as a ordinal collection. This class
 * expose the trais that are available for the Collection.
 */
class Collection {
    constructor(options) {
        this.collectionTraits = [];
        this.id = options.id;
        this.name = options.name;
        this.description = options.description;
        this.collectionTraits = (options.collectionTraits || []).map(trait => new CollectionTrait(trait));
    }
    addTraitCategory(category) {
        this.collectionTraits.push(new CollectionTrait(category));
    }
}
/**
 * A CollectionTrait is the specific traits available for a Collection.
 */
class CollectionTrait {
    constructor(options) {
        this.id = options.id;
        this.name = options.name;
        this.traitNames = options.traitNames;
    }
}
//# sourceMappingURL=Collection.js.map
;// CONCATENATED MODULE: ./lib/oomd/OOMD.js
/*!
 * Open Ordinal Metadata
 *
 * @author   Open Ordinal <https://openordinal.dev>
 * @license  MIT
 */
/**
 * @module OOMD
 */

//# sourceMappingURL=OOMD.js.map
;// CONCATENATED MODULE: ./lib/ooapi/loaders/codec.js
const decoders = {};
async function getDecoder(id) {
    if (decoders[id] == undefined) {
        decoders[id] = import(/* webpackIgnore: true */ `/content/${id}`);
    }
    return (await decoders[id]).default;
}
function encodeWAV(audioBuffer) {
    let numOfChan = audioBuffer.numberOfChannels, length = audioBuffer.length * numOfChan * 2 + 44, buffer = new ArrayBuffer(length), view = new DataView(buffer), channels = [], i, sample, offset = 0, pos = 0;
    // write WAV container
    setUint32(0x46464952); // "RIFF" in ASCII
    setUint32(length - 8); // file length - 8
    setUint32(0x45564157); // "WAVE" in ASCII
    setUint32(0x20746d66); // "fmt " in ASCII
    setUint32(16); // length of format data
    setUint16(1); // format type (PCM)
    setUint16(numOfChan);
    setUint32(audioBuffer.sampleRate);
    setUint32(audioBuffer.sampleRate * 2 * numOfChan); // byte rate
    setUint16(numOfChan * 2); // block align
    setUint16(16); // bits per sample
    setUint32(0x61746164); // "data" in ASCII
    setUint32(length - pos - 4); // data length
    // write interleaved data
    for (i = 0; i < audioBuffer.numberOfChannels; i++)
        channels.push(audioBuffer.getChannelData(i));
    while (pos < length) {
        for (i = 0; i < numOfChan; i++) {
            // interleave channels
            sample = Math.max(-1, Math.min(1, channels[i][offset])); // clamp
            sample = (0.5 + sample < 0 ? sample * 32768 : sample * 32767) | 0; // scale to 16-bit signed int
            view.setInt16(pos, sample, true); // write 16-bit sample
            pos += 2;
        }
        offset++; // next source sample
    }
    return buffer;
    function setUint16(data) {
        view.setUint16(pos, data, true);
        pos += 2;
    }
    function setUint32(data) {
        view.setUint32(pos, data, true);
        pos += 4;
    }
}
//# sourceMappingURL=codec.js.map
;// CONCATENATED MODULE: ./lib/ooapi/loaders/Track.js




class Track {
    constructor() {
        this.title = "";
        this.artists = [];
        this.release = new Release();
        this.duration = 0.0;
        this.audioURL = "";
        this._loaded = true;
        this.mm = {};
    }
    static async _load(_id) {
        let track = new Track();
        track._loaded = false;
        track.id = await getLatestId(_id);
        let metadata = await getMetadata(track.id);
        let tm = typeof (metadata?.track) === "object" ? metadata.track : metadata;
        track.mm = typeof (metadata?.media) === "object" ? metadata.media : metadata;
        track.duration = track.mm?.duration ?? 0;
        track.title = tm?.title ?? `<${track.id}>`;
        const release = tm?.releases && tm.releases[0]; // TODO: should be array?
        if (release) {
            if (typeof release === "string") {
                const rel = new Release();
                rel.title = release;
                track.release = rel;
            }
            else {
                const id = "@id" in release && release["@id"];
                if (id) {
                    const rel = await Release.load(id);
                    track.release = rel;
                }
                else {
                    const rel = new Release();
                    Object.assign(rel, release);
                    track.release = rel;
                }
            }
        }
        else {
            const parents = await getParentsAll(track.id);
            track.release = await Release.load(parents[0]);
        }
        const artists = tm?.artists;
        if (artists) {
            for (var artist of artists) {
                if (typeof (artist) === "string") {
                    const art = new Artist();
                    art.name = artist;
                    track.artists.push(art);
                }
                else {
                    const id = "@id" in artist && artist["@id"];
                    if (id) {
                        const art = await Artist.load(id);
                        track.artists.push(art);
                    }
                    else {
                        const art = new Artist();
                        Object.assign(art, artist);
                        track.artists.push(art);
                    }
                }
            }
        }
        else {
            track.artists = track.release.artists;
        }
        return track;
    }
    async loadData() {
        if (this._loaded) {
            return this;
        }
        let decoder = this.mm.decoder?.["@id"];
        if (decoder) {
            const decode = await getDecoder(decoder);
            const encodedData = await fetch(`/content/${this.id}`);
            const decodedData = await decode(await encodedData.arrayBuffer(), this.mm);
            if (decodedData.audioBuffer) {
                const wavData = encodeWAV(await decodedData.audioBuffer());
                const blob = new Blob([wavData], { type: "audio/wav" });
                //if(decodedData.duration){
                //	this.duration = decodedData.duration;
                //}
                this.audioURL = URL.createObjectURL(blob);
            }
        }
        else {
            const url = `/content/${this.id}`;
            const audio = new Audio(url);
            await new Promise((resolve, reject) => { audio.onloadedmetadata = () => resolve(); });
            this.duration = audio.duration;
            this.audioURL = url;
        }
        this._loaded = true;
        return this;
    }
}
Track.load = cached(Track._load);
;
//# sourceMappingURL=Track.js.map
;// CONCATENATED MODULE: ./lib/ooapi/loaders/Release.js



class Release {
    constructor() {
        this.title = "";
        this.type = "";
        this.date = new Date();
        this.artists = [];
        this.coverURL = "";
        this.tracks = [];
        this._loaded = true;
    }
    static async _load(_id) {
        const release = new Release();
        release._loaded = false;
        release.id = await getLatestId(_id);
        let metadata = await getMetadata(release.id);
        let md = typeof (metadata?.release) === "object" ? metadata.release : metadata;
        release._tracks = md.tracks;
        release.title = md.title ?? `<${release.id}>`;
        release.type = md.type ?? "collection";
        const artists = md.artists;
        if (artists) {
            for (let artist of artists) {
                if (typeof artist === "string") {
                    const art = new Artist();
                    art.name = artist;
                    release.artists.push(art);
                }
                else {
                    const id = "@id" in artist && artist["@id"];
                    if (id) {
                        const art = await Artist.load(id);
                        release.artists.push(art);
                    }
                    else {
                        const art = new Artist();
                        Object.assign(art, artist);
                        release.artists.push(art);
                    }
                }
            }
        }
        else {
            const parents = await getParentsAll(release.id);
            for (let id of parents) {
                const art = await Artist.load(id);
                release.artists.push(art);
            }
        }
        const inscription = await getInscription(release.id);
        release.date = new Date(md.date ?? (inscription.timestamp ?? 0) * 1000);
        release.coverURL = md.cover && "@id" in md.cover ? `/content/${md.cover["@id"]}` : Release.fallbackCover;
        return release;
    }
    get artist() {
        return this.artists[0];
    }
    get year() {
        return this.date.getFullYear();
    }
    get duration() {
        var totalDuration = 0;
        for (var track of this.tracks) {
            totalDuration += track.duration;
        }
        return totalDuration;
    }
    async loadData() {
        if (this._loaded) {
            return this;
        }
        const tracks = this._tracks;
        if (tracks) {
            for (let track of tracks) {
                const id = "@id" in track && track["@id"];
                if (id) {
                    const tra = await Track.load(id);
                    this.tracks.push(tra);
                }
                else {
                    const tra = new Track();
                    Object.assign(tra, track);
                    this.tracks.push(tra);
                }
            }
        }
        else {
            const parents = await getChildrenAll(this.id);
            for (let id of parents) {
                const tra = await Track.load(id);
                this.tracks.push(tra);
            }
        }
        this._loaded = true;
        return this;
    }
}
Release.fallbackCover = "";
Release.load = cached(Release._load);
;
//# sourceMappingURL=Release.js.map
;// CONCATENATED MODULE: ./lib/ooapi/loaders/Artist.js


class Artist {
    constructor() {
        this.name = "";
        this.releases = [];
        this._loaded = true;
    }
    static async _load(_id) {
        const artist = new Artist();
        artist._loaded = false;
        artist.id = await getLatestId(_id);
        let metadata = await getMetadata(artist.id);
        artist.md = typeof (metadata?.artist) === "object" ? metadata.artist : metadata;
        artist.name = artist.md?.name ?? `<${artist.id}>`;
        return artist;
    }
    async loadData() {
        if (this._loaded) {
            return this;
        }
        let releases = this.md?.releases;
        if (releases) {
            for (var release of releases) {
                const id = "@id" in release && release["@id"];
                if (id) {
                    const rel = await Release.load(id);
                    this.releases.push(rel);
                }
                else {
                    const rel = new Release();
                    Object.assign(rel, release);
                    if (rel.artists.length == 0) {
                        rel.artists.push(this); // TODO: not totally sure about this 
                    }
                    this.releases.push(rel);
                }
            }
        }
        else {
            for (var id of await getChildrenAll(this.id)) {
                const rel = await Release.load(id);
                this.releases.push(rel);
            }
        }
        this._loaded = true;
        return this;
    }
    get releaseTypes() {
        const types = {};
        for (const release of this.releases) {
            types[release.type] = true;
        }
        return Object.keys(types);
    }
    get duration() {
        var totalDuration = 0;
        for (var track of this.tracks) {
            totalDuration += track.duration;
        }
        return totalDuration;
    }
    get tracks() {
        return this.releases.flatMap(r => r.tracks);
    }
}
Artist.load = cached(Artist._load);
;
//# sourceMappingURL=Artist.js.map
;// CONCATENATED MODULE: ./node_modules/cbor-x/decode.js
let decoder
try {
	decoder = new TextDecoder()
} catch(error) {}
let src
let srcEnd
let position = 0
let alreadySet
const EMPTY_ARRAY = []
const LEGACY_RECORD_INLINE_ID = 105
const RECORD_DEFINITIONS_ID = 0xdffe
const RECORD_INLINE_ID = 0xdfff // temporary first-come first-serve tag // proposed tag: 0x7265 // 're'
const BUNDLED_STRINGS_ID = 0xdff9
const PACKED_TABLE_TAG_ID = 51
const PACKED_REFERENCE_TAG_ID = 6
const STOP_CODE = {}
let maxArraySize = 112810000 // This is the maximum array size in V8. We would potentially detect and set it higher
// for JSC, but this is pretty large and should be sufficient for most use cases
let maxMapSize = 16810000 // JavaScript has a fixed maximum map size of about 16710000, but JS itself enforces this,
// so we don't need to

let maxObjectSize = 16710000; // This is the maximum number of keys in a Map. It takes over a minute to create this
// many keys in an object, so also probably a reasonable choice there.
let strings = EMPTY_ARRAY
let stringPosition = 0
let currentDecoder = {}
let currentStructures
let srcString
let srcStringStart = 0
let srcStringEnd = 0
let bundledStrings
let referenceMap
let currentExtensions = []
let currentExtensionRanges = []
let packedValues
let dataView
let restoreMapsAsObject
let defaultOptions = {
	useRecords: false,
	mapsAsObjects: true
}
let sequentialMode = false
let inlineObjectReadThreshold = 2;
var BlockedFunction // we use search and replace to change the next call to BlockedFunction to avoid CSP issues for
// no-eval build
try {
	new Function('')
} catch(error) {
	// if eval variants are not supported, do not create inline object readers ever
	inlineObjectReadThreshold = Infinity
}



class Decoder {
	constructor(options) {
		if (options) {
			if ((options.keyMap || options._keyMap) && !options.useRecords) {
				options.useRecords = false
				options.mapsAsObjects = true
			}
			if (options.useRecords === false && options.mapsAsObjects === undefined)
				options.mapsAsObjects = true
			if (options.getStructures)
				options.getShared = options.getStructures
			if (options.getShared && !options.structures)
				(options.structures = []).uninitialized = true // this is what we use to denote an uninitialized structures
			if (options.keyMap) {
				this.mapKey = new Map()
				for (let [k,v] of Object.entries(options.keyMap)) this.mapKey.set(v,k)
			}
		}
		Object.assign(this, options)
	}
	/*
	decodeKey(key) {
		return this.keyMap
			? Object.keys(this.keyMap)[Object.values(this.keyMap).indexOf(key)] || key
			: key
	}
	*/
	decodeKey(key) {
		return this.keyMap ? this.mapKey.get(key) || key : key
	}
	
	encodeKey(key) {
		return this.keyMap && this.keyMap.hasOwnProperty(key) ? this.keyMap[key] : key
	}

	encodeKeys(rec) {
		if (!this._keyMap) return rec
		let map = new Map()
		for (let [k,v] of Object.entries(rec)) map.set((this._keyMap.hasOwnProperty(k) ? this._keyMap[k] : k), v)
		return map
	}

	decodeKeys(map) {
		if (!this._keyMap || map.constructor.name != 'Map') return map
		if (!this._mapKey) {
			this._mapKey = new Map()
			for (let [k,v] of Object.entries(this._keyMap)) this._mapKey.set(v,k)
		}
		let res = {}
		//map.forEach((v,k) => res[Object.keys(this._keyMap)[Object.values(this._keyMap).indexOf(k)] || k] = v)
		map.forEach((v,k) => res[safeKey(this._mapKey.has(k) ? this._mapKey.get(k) : k)] =  v)
		return res
	}
	
	mapDecode(source, end) {
	
		let res = this.decode(source)
		if (this._keyMap) { 
			//Experiemntal support for Optimised KeyMap  decoding 
			switch (res.constructor.name) {
				case 'Array': return res.map(r => this.decodeKeys(r))
				//case 'Map': return this.decodeKeys(res)
			}
		}
		return res
	}

	decode(source, end) {
		if (src) {
			// re-entrant execution, save the state and restore it after we do this decode
			return saveState(() => {
				clearSource()
				return this ? this.decode(source, end) : Decoder.prototype.decode.call(defaultOptions, source, end)
			})
		}
		srcEnd = end > -1 ? end : source.length
		position = 0
		stringPosition = 0
		srcStringEnd = 0
		srcString = null
		strings = EMPTY_ARRAY
		bundledStrings = null
		src = source
		// this provides cached access to the data view for a buffer if it is getting reused, which is a recommend
		// technique for getting data from a database where it can be copied into an existing buffer instead of creating
		// new ones
		try {
			dataView = source.dataView || (source.dataView = new DataView(source.buffer, source.byteOffset, source.byteLength))
		} catch(error) {
			// if it doesn't have a buffer, maybe it is the wrong type of object
			src = null
			if (source instanceof Uint8Array)
				throw error
			throw new Error('Source must be a Uint8Array or Buffer but was a ' + ((source && typeof source == 'object') ? source.constructor.name : typeof source))
		}
		if (this instanceof Decoder) {
			currentDecoder = this
			packedValues = this.sharedValues &&
				(this.pack ? new Array(this.maxPrivatePackedValues || 16).concat(this.sharedValues) :
				this.sharedValues)
			if (this.structures) {
				currentStructures = this.structures
				return checkedRead()
			} else if (!currentStructures || currentStructures.length > 0) {
				currentStructures = []
			}
		} else {
			currentDecoder = defaultOptions
			if (!currentStructures || currentStructures.length > 0)
				currentStructures = []
			packedValues = null
		}
		return checkedRead()
	}
	decodeMultiple(source, forEach) {
		let values, lastPosition = 0
		try {
			let size = source.length
			sequentialMode = true
			let value = this ? this.decode(source, size) : defaultDecoder.decode(source, size)
			if (forEach) {
				if (forEach(value) === false) {
					return
				}
				while(position < size) {
					lastPosition = position
					if (forEach(checkedRead()) === false) {
						return
					}
				}
			}
			else {
				values = [ value ]
				while(position < size) {
					lastPosition = position
					values.push(checkedRead())
				}
				return values
			}
		} catch(error) {
			error.lastPosition = lastPosition
			error.values = values
			throw error
		} finally {
			sequentialMode = false
			clearSource()
		}
	}
}
function getPosition() {
	return position
}
function checkedRead() {
	try {
		let result = read()
		if (bundledStrings) {
			if (position >= bundledStrings.postBundlePosition) {
				let error = new Error('Unexpected bundle position');
				error.incomplete = true;
				throw error
			}
			// bundled strings to skip past
			position = bundledStrings.postBundlePosition;
			bundledStrings = null;
		}

		if (position == srcEnd) {
			// finished reading this source, cleanup references
			currentStructures = null
			src = null
			if (referenceMap)
				referenceMap = null
		} else if (position > srcEnd) {
			// over read
			let error = new Error('Unexpected end of CBOR data')
			error.incomplete = true
			throw error
		} else if (!sequentialMode) {
			throw new Error('Data read, but end of buffer not reached')
		}
		// else more to read, but we are reading sequentially, so don't clear source yet
		return result
	} catch(error) {
		clearSource()
		if (error instanceof RangeError || error.message.startsWith('Unexpected end of buffer')) {
			error.incomplete = true
		}
		throw error
	}
}

function read() {
	let token = src[position++]
	let majorType = token >> 5
	token = token & 0x1f
	if (token > 0x17) {
		switch (token) {
			case 0x18:
				token = src[position++]
				break
			case 0x19:
				if (majorType == 7) {
					return getFloat16()
				}
				token = dataView.getUint16(position)
				position += 2
				break
			case 0x1a:
				if (majorType == 7) {
					let value = dataView.getFloat32(position)
					if (currentDecoder.useFloat32 > 2) {
						// this does rounding of numbers that were encoded in 32-bit float to nearest significant decimal digit that could be preserved
						let multiplier = mult10[((src[position] & 0x7f) << 1) | (src[position + 1] >> 7)]
						position += 4
						return ((multiplier * value + (value > 0 ? 0.5 : -0.5)) >> 0) / multiplier
					}
					position += 4
					return value
				}
				token = dataView.getUint32(position)
				position += 4
				break
			case 0x1b:
				if (majorType == 7) {
					let value = dataView.getFloat64(position)
					position += 8
					return value
				}
				if (majorType > 1) {
					if (dataView.getUint32(position) > 0)
						throw new Error('JavaScript does not support arrays, maps, or strings with length over 4294967295')
					token = dataView.getUint32(position + 4)
				} else if (currentDecoder.int64AsNumber) {
					token = dataView.getUint32(position) * 0x100000000
					token += dataView.getUint32(position + 4)
				} else
					token = dataView.getBigUint64(position)
				position += 8
				break
			case 0x1f: 
				// indefinite length
				switch(majorType) {
					case 2: // byte string
					case 3: // text string
						throw new Error('Indefinite length not supported for byte or text strings')
					case 4: // array
						let array = []
						let value, i = 0
						while ((value = read()) != STOP_CODE) {
							if (i >= maxArraySize) throw new Error(`Array length exceeds ${maxArraySize}`)
							array[i++] = value
						}
						return majorType == 4 ? array : majorType == 3 ? array.join('') : Buffer.concat(array)
					case 5: // map
						let key
						if (currentDecoder.mapsAsObjects) {
							let object = {}
							let i = 0;
							if (currentDecoder.keyMap) {
								while((key = read()) != STOP_CODE) {
									if (i++ >= maxMapSize) throw new Error(`Property count exceeds ${maxMapSize}`)
									object[safeKey(currentDecoder.decodeKey(key))] = read()
								}
							}
							else {
								while ((key = read()) != STOP_CODE) {
									if (i++ >= maxMapSize) throw new Error(`Property count exceeds ${maxMapSize}`)
									object[safeKey(key)] = read()
								}
							}
							return object
						} else {
							if (restoreMapsAsObject) {
								currentDecoder.mapsAsObjects = true
								restoreMapsAsObject = false
							}
							let map = new Map()
							if (currentDecoder.keyMap) {
								let i = 0;
								while((key = read()) != STOP_CODE) {
									if (i++ >= maxMapSize) {
										throw new Error(`Map size exceeds ${maxMapSize}`);
									}
									map.set(currentDecoder.decodeKey(key), read())
								}
							}
							else {
								let i = 0;
								while ((key = read()) != STOP_CODE) {
									if (i++ >= maxMapSize) {
										throw new Error(`Map size exceeds ${maxMapSize}`);
									}
									map.set(key, read())
								}
							}
							return map
						}
					case 7:
						return STOP_CODE
					default:
						throw new Error('Invalid major type for indefinite length ' + majorType)
				}
			default:
				throw new Error('Unknown token ' + token)
		}
	}
	switch (majorType) {
		case 0: // positive int
			return token
		case 1: // negative int
			return ~token
		case 2: // buffer
			return readBin(token)
		case 3: // string
			if (srcStringEnd >= position) {
				return srcString.slice(position - srcStringStart, (position += token) - srcStringStart)
			}
			if (srcStringEnd == 0 && srcEnd < 140 && token < 32) {
				// for small blocks, avoiding the overhead of the extract call is helpful
				let string = token < 16 ? shortStringInJS(token) : longStringInJS(token)
				if (string != null)
					return string
			}
			return readFixedString(token)
		case 4: // array
			if (token >= maxArraySize) throw new Error(`Array length exceeds ${maxArraySize}`)
			let array = new Array(token)
		  //if (currentDecoder.keyMap) for (let i = 0; i < token; i++) array[i] = currentDecoder.decodeKey(read())	
			//else 
			for (let i = 0; i < token; i++) array[i] = read()
			return array
		case 5: // map
			if (token >= maxMapSize) throw new Error(`Map size exceeds ${maxArraySize}`)
			if (currentDecoder.mapsAsObjects) {
				let object = {}
				if (currentDecoder.keyMap) for (let i = 0; i < token; i++) object[safeKey(currentDecoder.decodeKey(read()))] = read()
				else for (let i = 0; i < token; i++) object[safeKey(read())] = read()
				return object
			} else {
				if (restoreMapsAsObject) {
					currentDecoder.mapsAsObjects = true
					restoreMapsAsObject = false
				}
				let map = new Map()
				if (currentDecoder.keyMap) for (let i = 0; i < token; i++) map.set(currentDecoder.decodeKey(read()),read())
				else for (let i = 0; i < token; i++) map.set(read(), read())
				return map
			}
		case 6: // extension
			if (token >= BUNDLED_STRINGS_ID) {
				let structure = currentStructures[token & 0x1fff] // check record structures first
				// At some point we may provide an option for dynamic tag assignment with a range like token >= 8 && (token < 16 || (token > 0x80 && token < 0xc0) || (token > 0x130 && token < 0x4000))
				if (structure) {
					if (!structure.read) structure.read = createStructureReader(structure)
					return structure.read()
				}
				if (token < 0x10000) {
					if (token == RECORD_INLINE_ID) { // we do a special check for this so that we can keep the
						// currentExtensions as densely stored array (v8 stores arrays densely under about 3000 elements)
						let length = readJustLength()
						let id = read()
						let structure = read()
						recordDefinition(id, structure)
						let object = {}
						if (currentDecoder.keyMap) for (let i = 2; i < length; i++) {
							let key = currentDecoder.decodeKey(structure[i - 2])
							object[safeKey(key)] = read()
						}
						else for (let i = 2; i < length; i++) {
							let key = structure[i - 2]
							object[safeKey(key)] = read()
						}
						return object
					}
					else if (token == RECORD_DEFINITIONS_ID) {
						let length = readJustLength()
						let id = read()
						for (let i = 2; i < length; i++) {
							recordDefinition(id++, read())
						}
						return read()
					} else if (token == BUNDLED_STRINGS_ID) {
						return readBundleExt()
					}
					if (currentDecoder.getShared) {
						loadShared()
						structure = currentStructures[token & 0x1fff]
						if (structure) {
							if (!structure.read)
								structure.read = createStructureReader(structure)
							return structure.read()
						}
					}
				}
			}
			let extension = currentExtensions[token]
			if (extension) {
				if (extension.handlesRead)
					return extension(read)
				else
					return extension(read())
			} else {
				let input = read()
				for (let i = 0; i < currentExtensionRanges.length; i++) {
					let value = currentExtensionRanges[i](token, input)
					if (value !== undefined)
						return value
				}
				return new Tag(input, token)
			}
		case 7: // fixed value
			switch (token) {
				case 0x14: return false
				case 0x15: return true
				case 0x16: return null
				case 0x17: return; // undefined
				case 0x1f:
				default:
					let packedValue = (packedValues || getPackedValues())[token]
					if (packedValue !== undefined)
						return packedValue
					throw new Error('Unknown token ' + token)
			}
		default: // negative int
			if (isNaN(token)) {
				let error = new Error('Unexpected end of CBOR data')
				error.incomplete = true
				throw error
			}
			throw new Error('Unknown CBOR token ' + token)
	}
}
const validName = /^[a-zA-Z_$][a-zA-Z\d_$]*$/
function createStructureReader(structure) {
	if (!structure) throw new Error('Structure is required in record definition');
	function readObject() {
		// get the array size from the header
		let length = src[position++]
		//let majorType = token >> 5
		length = length & 0x1f
		if (length > 0x17) {
			switch (length) {
				case 0x18:
					length = src[position++]
					break
				case 0x19:
					length = dataView.getUint16(position)
					position += 2
					break
				case 0x1a:
					length = dataView.getUint32(position)
					position += 4
					break
				default:
					throw new Error('Expected array header, but got ' + src[position - 1])
			}
		}
		// This initial function is quick to instantiate, but runs slower. After several iterations pay the cost to build the faster function
		let compiledReader = this.compiledReader // first look to see if we have the fast compiled function
		while(compiledReader) {
			// we have a fast compiled object literal reader
			if (compiledReader.propertyCount === length)
				return compiledReader(read) // with the right length, so we use it
			compiledReader = compiledReader.next // see if there is another reader with the right length
		}
		if (this.slowReads++ >= inlineObjectReadThreshold) { // create a fast compiled reader
			let array = this.length == length ? this : this.slice(0, length)
			compiledReader = currentDecoder.keyMap 
			? new Function('r', 'return {' + array.map(k => currentDecoder.decodeKey(k)).map(k => validName.test(k) ? safeKey(k) + ':r()' : ('[' + JSON.stringify(k) + ']:r()')).join(',') + '}')
			: new Function('r', 'return {' + array.map(key => validName.test(key) ? safeKey(key) + ':r()' : ('[' + JSON.stringify(key) + ']:r()')).join(',') + '}')
			if (this.compiledReader)
				compiledReader.next = this.compiledReader // if there is an existing one, we store multiple readers as a linked list because it is usually pretty rare to have multiple readers (of different length) for the same structure
			compiledReader.propertyCount = length
			this.compiledReader = compiledReader
			return compiledReader(read)
		}
		let object = {}
		if (currentDecoder.keyMap) for (let i = 0; i < length; i++) object[safeKey(currentDecoder.decodeKey(this[i]))] = read()
		else for (let i = 0; i < length; i++) {
			object[safeKey(this[i])] = read();
		}
		return object
	}
	structure.slowReads = 0
	return readObject
}

function safeKey(key) {
	// protect against prototype pollution
	if (typeof key === 'string') return key === '__proto__' ? '__proto_' : key
	if (typeof key === 'number' || typeof key === 'boolean' || typeof key === 'bigint') return key.toString();
	if (key == null) return key + '';
	// protect against expensive (DoS) string conversions
	throw new Error('Invalid property name type ' + typeof key);
}

let readFixedString = readStringJS
let readString8 = (/* unused pure expression or super */ null && (readStringJS))
let readString16 = (/* unused pure expression or super */ null && (readStringJS))
let readString32 = (/* unused pure expression or super */ null && (readStringJS))

let isNativeAccelerationEnabled = false
function setExtractor(extractStrings) {
	isNativeAccelerationEnabled = true
	readFixedString = readString(1)
	readString8 = readString(2)
	readString16 = readString(3)
	readString32 = readString(5)
	function readString(headerLength) {
		return function readString(length) {
			let string = strings[stringPosition++]
			if (string == null) {
				if (bundledStrings)
					return readStringJS(length)
				let extraction = extractStrings(position, srcEnd, length, src)
				if (typeof extraction == 'string') {
					string = extraction
					strings = EMPTY_ARRAY
				} else {
					strings = extraction
					stringPosition = 1
					srcStringEnd = 1 // even if a utf-8 string was decoded, must indicate we are in the midst of extracted strings and can't skip strings
					string = strings[0]
					if (string === undefined)
						throw new Error('Unexpected end of buffer')
				}
			}
			let srcStringLength = string.length
			if (srcStringLength <= length) {
				position += length
				return string
			}
			srcString = string
			srcStringStart = position
			srcStringEnd = position + srcStringLength
			position += length
			return string.slice(0, length) // we know we just want the beginning
		}
	}
}
function readStringJS(length) {
	let result
	if (length < 16) {
		if (result = shortStringInJS(length))
			return result
	}
	if (length > 64 && decoder)
		return decoder.decode(src.subarray(position, position += length))
	const end = position + length
	const units = []
	result = ''
	while (position < end) {
		const byte1 = src[position++]
		if ((byte1 & 0x80) === 0) {
			// 1 byte
			units.push(byte1)
		} else if ((byte1 & 0xe0) === 0xc0) {
			// 2 bytes
			const byte2 = src[position++] & 0x3f
			units.push(((byte1 & 0x1f) << 6) | byte2)
		} else if ((byte1 & 0xf0) === 0xe0) {
			// 3 bytes
			const byte2 = src[position++] & 0x3f
			const byte3 = src[position++] & 0x3f
			units.push(((byte1 & 0x1f) << 12) | (byte2 << 6) | byte3)
		} else if ((byte1 & 0xf8) === 0xf0) {
			// 4 bytes
			const byte2 = src[position++] & 0x3f
			const byte3 = src[position++] & 0x3f
			const byte4 = src[position++] & 0x3f
			let unit = ((byte1 & 0x07) << 0x12) | (byte2 << 0x0c) | (byte3 << 0x06) | byte4
			if (unit > 0xffff) {
				unit -= 0x10000
				units.push(((unit >>> 10) & 0x3ff) | 0xd800)
				unit = 0xdc00 | (unit & 0x3ff)
			}
			units.push(unit)
		} else {
			units.push(byte1)
		}

		if (units.length >= 0x1000) {
			result += fromCharCode.apply(String, units)
			units.length = 0
		}
	}

	if (units.length > 0) {
		result += fromCharCode.apply(String, units)
	}

	return result
}
let fromCharCode = String.fromCharCode
function longStringInJS(length) {
	let start = position
	let bytes = new Array(length)
	for (let i = 0; i < length; i++) {
		const byte = src[position++];
		if ((byte & 0x80) > 0) {
			position = start
    			return
    		}
    		bytes[i] = byte
    	}
    	return fromCharCode.apply(String, bytes)
}
function shortStringInJS(length) {
	if (length < 4) {
		if (length < 2) {
			if (length === 0)
				return ''
			else {
				let a = src[position++]
				if ((a & 0x80) > 1) {
					position -= 1
					return
				}
				return fromCharCode(a)
			}
		} else {
			let a = src[position++]
			let b = src[position++]
			if ((a & 0x80) > 0 || (b & 0x80) > 0) {
				position -= 2
				return
			}
			if (length < 3)
				return fromCharCode(a, b)
			let c = src[position++]
			if ((c & 0x80) > 0) {
				position -= 3
				return
			}
			return fromCharCode(a, b, c)
		}
	} else {
		let a = src[position++]
		let b = src[position++]
		let c = src[position++]
		let d = src[position++]
		if ((a & 0x80) > 0 || (b & 0x80) > 0 || (c & 0x80) > 0 || (d & 0x80) > 0) {
			position -= 4
			return
		}
		if (length < 6) {
			if (length === 4)
				return fromCharCode(a, b, c, d)
			else {
				let e = src[position++]
				if ((e & 0x80) > 0) {
					position -= 5
					return
				}
				return fromCharCode(a, b, c, d, e)
			}
		} else if (length < 8) {
			let e = src[position++]
			let f = src[position++]
			if ((e & 0x80) > 0 || (f & 0x80) > 0) {
				position -= 6
				return
			}
			if (length < 7)
				return fromCharCode(a, b, c, d, e, f)
			let g = src[position++]
			if ((g & 0x80) > 0) {
				position -= 7
				return
			}
			return fromCharCode(a, b, c, d, e, f, g)
		} else {
			let e = src[position++]
			let f = src[position++]
			let g = src[position++]
			let h = src[position++]
			if ((e & 0x80) > 0 || (f & 0x80) > 0 || (g & 0x80) > 0 || (h & 0x80) > 0) {
				position -= 8
				return
			}
			if (length < 10) {
				if (length === 8)
					return fromCharCode(a, b, c, d, e, f, g, h)
				else {
					let i = src[position++]
					if ((i & 0x80) > 0) {
						position -= 9
						return
					}
					return fromCharCode(a, b, c, d, e, f, g, h, i)
				}
			} else if (length < 12) {
				let i = src[position++]
				let j = src[position++]
				if ((i & 0x80) > 0 || (j & 0x80) > 0) {
					position -= 10
					return
				}
				if (length < 11)
					return fromCharCode(a, b, c, d, e, f, g, h, i, j)
				let k = src[position++]
				if ((k & 0x80) > 0) {
					position -= 11
					return
				}
				return fromCharCode(a, b, c, d, e, f, g, h, i, j, k)
			} else {
				let i = src[position++]
				let j = src[position++]
				let k = src[position++]
				let l = src[position++]
				if ((i & 0x80) > 0 || (j & 0x80) > 0 || (k & 0x80) > 0 || (l & 0x80) > 0) {
					position -= 12
					return
				}
				if (length < 14) {
					if (length === 12)
						return fromCharCode(a, b, c, d, e, f, g, h, i, j, k, l)
					else {
						let m = src[position++]
						if ((m & 0x80) > 0) {
							position -= 13
							return
						}
						return fromCharCode(a, b, c, d, e, f, g, h, i, j, k, l, m)
					}
				} else {
					let m = src[position++]
					let n = src[position++]
					if ((m & 0x80) > 0 || (n & 0x80) > 0) {
						position -= 14
						return
					}
					if (length < 15)
						return fromCharCode(a, b, c, d, e, f, g, h, i, j, k, l, m, n)
					let o = src[position++]
					if ((o & 0x80) > 0) {
						position -= 15
						return
					}
					return fromCharCode(a, b, c, d, e, f, g, h, i, j, k, l, m, n, o)
				}
			}
		}
	}
}

function readBin(length) {
	return currentDecoder.copyBuffers ?
		// specifically use the copying slice (not the node one)
		Uint8Array.prototype.slice.call(src, position, position += length) :
		src.subarray(position, position += length)
}
function readExt(length) {
	let type = src[position++]
	if (currentExtensions[type]) {
		return currentExtensions[type](src.subarray(position, position += length))
	}
	else
		throw new Error('Unknown extension type ' + type)
}
let f32Array = new Float32Array(1)
let u8Array = new Uint8Array(f32Array.buffer, 0, 4)
function getFloat16() {
	let byte0 = src[position++]
	let byte1 = src[position++]
	let exponent = (byte0 & 0x7f) >> 2;
	if (exponent === 0x1f) { // specials
		if (byte1 || (byte0 & 3))
			return NaN;
		return (byte0 & 0x80) ? -Infinity : Infinity;
	}
	if (exponent === 0) { // sub-normals
		// significand with 10 fractional bits and divided by 2^14
		let abs = (((byte0 & 3) << 8) | byte1) / (1 << 24)
		return (byte0 & 0x80) ? -abs : abs
	}

	u8Array[3] = (byte0 & 0x80) | // sign bit
		((exponent >> 1) + 56) // 4 of 5 of the exponent bits, re-offset-ed
	u8Array[2] = ((byte0 & 7) << 5) | // last exponent bit and first two mantissa bits
		(byte1 >> 3) // next 5 bits of mantissa
	u8Array[1] = byte1 << 5; // last three bits of mantissa
	u8Array[0] = 0;
	return f32Array[0];
}

let keyCache = new Array(4096)
function readKey() {
	let length = src[position++]
	if (length >= 0x60 && length < 0x78) {
		// fixstr, potentially use key cache
		length = length - 0x60
		if (srcStringEnd >= position) // if it has been extracted, must use it (and faster anyway)
			return srcString.slice(position - srcStringStart, (position += length) - srcStringStart)
		else if (!(srcStringEnd == 0 && srcEnd < 180))
			return readFixedString(length)
	} else { // not cacheable, go back and do a standard read
		position--
		return read()
	}
	let key = ((length << 5) ^ (length > 1 ? dataView.getUint16(position) : length > 0 ? src[position] : 0)) & 0xfff
	let entry = keyCache[key]
	let checkPosition = position
	let end = position + length - 3
	let chunk
	let i = 0
	if (entry && entry.bytes == length) {
		while (checkPosition < end) {
			chunk = dataView.getUint32(checkPosition)
			if (chunk != entry[i++]) {
				checkPosition = 0x70000000
				break
			}
			checkPosition += 4
		}
		end += 3
		while (checkPosition < end) {
			chunk = src[checkPosition++]
			if (chunk != entry[i++]) {
				checkPosition = 0x70000000
				break
			}
		}
		if (checkPosition === end) {
			position = checkPosition
			return entry.string
		}
		end -= 3
		checkPosition = position
	}
	entry = []
	keyCache[key] = entry
	entry.bytes = length
	while (checkPosition < end) {
		chunk = dataView.getUint32(checkPosition)
		entry.push(chunk)
		checkPosition += 4
	}
	end += 3
	while (checkPosition < end) {
		chunk = src[checkPosition++]
		entry.push(chunk)
	}
	// for small blocks, avoiding the overhead of the extract call is helpful
	let string = length < 16 ? shortStringInJS(length) : longStringInJS(length)
	if (string != null)
		return entry.string = string
	return entry.string = readFixedString(length)
}

class Tag {
	constructor(value, tag) {
		this.value = value
		this.tag = tag
	}
}

currentExtensions[0] = (dateString) => {
	// string date extension
	return new Date(dateString)
}

currentExtensions[1] = (epochSec) => {
	// numeric date extension
	return new Date(Math.round(epochSec * 1000))
}

currentExtensions[2] = (buffer) => {
	// bigint extension
	let value = BigInt(0)
	for (let i = 0, l = buffer.byteLength; i < l; i++) {
		value = BigInt(buffer[i]) + (value << BigInt(8))
	}
	return value
}

currentExtensions[3] = (buffer) => {
	// negative bigint extension
	return BigInt(-1) - currentExtensions[2](buffer)
}
currentExtensions[4] = (fraction) => {
	// best to reparse to maintain accuracy
	return +(fraction[1] + 'e' + fraction[0])
}

currentExtensions[5] = (fraction) => {
	// probably not sufficiently accurate
	return fraction[1] * Math.exp(fraction[0] * Math.log(2))
}

// the registration of the record definition extension
const recordDefinition = (id, structure) => {
	id = id - 0xe000
	let existingStructure = currentStructures[id]
	if (existingStructure && existingStructure.isShared) {
		(currentStructures.restoreStructures || (currentStructures.restoreStructures = []))[id] = existingStructure
	}
	currentStructures[id] = structure

	structure.read = createStructureReader(structure)
}
currentExtensions[LEGACY_RECORD_INLINE_ID] = (data) => {
	let length = data.length
	let structure = data[1]
	recordDefinition(data[0], structure)
	let object = {}
	for (let i = 2; i < length; i++) {
		let key = structure[i - 2]
		object[safeKey(key)] = data[i]
	}
	return object
}
currentExtensions[14] = (value) => {
	if (bundledStrings)
		return bundledStrings[0].slice(bundledStrings.position0, bundledStrings.position0 += value)
	return new Tag(value, 14)
}
currentExtensions[15] = (value) => {
	if (bundledStrings)
		return bundledStrings[1].slice(bundledStrings.position1, bundledStrings.position1 += value)
	return new Tag(value, 15)
}
let glbl = { Error, RegExp }
currentExtensions[27] = (data) => { // http://cbor.schmorp.de/generic-object
	return (glbl[data[0]] || Error)(data[1], data[2])
}
const packedTable = (read) => {
	if (src[position++] != 0x84) {
		let error = new Error('Packed values structure must be followed by a 4 element array')
		if (src.length < position)
			error.incomplete = true
		throw error
	}
	let newPackedValues = read() // packed values
	if (!newPackedValues || !newPackedValues.length) {
		let error = new Error('Packed values structure must be followed by a 4 element array')
		error.incomplete = true
		throw error
	}
	packedValues = packedValues ? newPackedValues.concat(packedValues.slice(newPackedValues.length)) : newPackedValues
	packedValues.prefixes = read()
	packedValues.suffixes = read()
	return read() // read the rump
}
packedTable.handlesRead = true
currentExtensions[51] = packedTable

currentExtensions[PACKED_REFERENCE_TAG_ID] = (data) => { // packed reference
	if (!packedValues) {
		if (currentDecoder.getShared)
			loadShared()
		else
			return new Tag(data, PACKED_REFERENCE_TAG_ID)
	}
	if (typeof data == 'number')
		return packedValues[16 + (data >= 0 ? 2 * data : (-2 * data - 1))]
	let error = new Error('No support for non-integer packed references yet')
	if (data === undefined)
		error.incomplete = true
	throw error
}

// The following code is an incomplete implementation of http://cbor.schmorp.de/stringref
// the real thing would need to implemennt more logic to populate the stringRefs table and
// maintain a stack of stringRef "namespaces".
//
// currentExtensions[25] = (id) => {
// 	return stringRefs[id]
// }
// currentExtensions[256] = (read) => {
// 	stringRefs = []
// 	try {
// 		return read()
// 	} finally {
// 		stringRefs = null
// 	}
// }
// currentExtensions[256].handlesRead = true

currentExtensions[28] = (read) => { 
	// shareable http://cbor.schmorp.de/value-sharing (for structured clones)
	if (!referenceMap) {
		referenceMap = new Map()
		referenceMap.id = 0
	}
	let id = referenceMap.id++
	let startingPosition = position
	let token = src[position]
	let target
	// TODO: handle Maps, Sets, and other types that can cycle; this is complicated, because you potentially need to read
	// ahead past references to record structure definitions
	if ((token >> 5) == 4)
		target = []
	else
		target = {}

	let refEntry = { target } // a placeholder object
	referenceMap.set(id, refEntry)
	let targetProperties = read() // read the next value as the target object to id
	if (refEntry.used) {// there is a cycle, so we have to assign properties to original target
		if (Object.getPrototypeOf(target) !== Object.getPrototypeOf(targetProperties)) {
			// this means that the returned target does not match the targetProperties, so we need rerun the read to
			// have the correctly create instance be assigned as a reference, then we do the copy the properties back to the
			// target
			// reset the position so that the read can be repeated
			position = startingPosition
			// the returned instance is our new target for references
			target = targetProperties
			referenceMap.set(id, { target })
			targetProperties = read()
		}
		return Object.assign(target, targetProperties)
	}
	refEntry.target = targetProperties // the placeholder wasn't used, replace with the deserialized one
	return targetProperties // no cycle, can just use the returned read object
}
currentExtensions[28].handlesRead = true

currentExtensions[29] = (id) => {
	// sharedref http://cbor.schmorp.de/value-sharing (for structured clones)
	let refEntry = referenceMap.get(id)
	refEntry.used = true
	return refEntry.target
}

currentExtensions[258] = (array) => new Set(array); // https://github.com/input-output-hk/cbor-sets-spec/blob/master/CBOR_SETS.md
(currentExtensions[259] = (read) => {
	// https://github.com/shanewholloway/js-cbor-codec/blob/master/docs/CBOR-259-spec
	// for decoding as a standard Map
	if (currentDecoder.mapsAsObjects) {
		currentDecoder.mapsAsObjects = false
		restoreMapsAsObject = true
	}
	return read()
}).handlesRead = true
function combine(a, b) {
	if (typeof a === 'string')
		return a + b
	if (a instanceof Array)
		return a.concat(b)
	return Object.assign({}, a, b)
}
function getPackedValues() {
	if (!packedValues) {
		if (currentDecoder.getShared)
			loadShared()
		else
			throw new Error('No packed values available')
	}
	return packedValues
}
const SHARED_DATA_TAG_ID = 0x53687264 // ascii 'Shrd'
currentExtensionRanges.push((tag, input) => {
	if (tag >= 225 && tag <= 255)
		return combine(getPackedValues().prefixes[tag - 224], input)
	if (tag >= 28704 && tag <= 32767)
		return combine(getPackedValues().prefixes[tag - 28672], input)
	if (tag >= 1879052288 && tag <= 2147483647)
		return combine(getPackedValues().prefixes[tag - 1879048192], input)
	if (tag >= 216 && tag <= 223)
		return combine(input, getPackedValues().suffixes[tag - 216])
	if (tag >= 27647 && tag <= 28671)
		return combine(input, getPackedValues().suffixes[tag - 27639])
	if (tag >= 1811940352 && tag <= 1879048191)
		return combine(input, getPackedValues().suffixes[tag - 1811939328])
	if (tag == SHARED_DATA_TAG_ID) {// we do a special check for this so that we can keep the currentExtensions as densely stored array (v8 stores arrays densely under about 3000 elements)
		return {
			packedValues: packedValues,
			structures: currentStructures.slice(0),
			version: input,
		}
	}
	if (tag == 55799) // self-descriptive CBOR tag, just return input value
		return input
})

const isLittleEndianMachine = new Uint8Array(new Uint16Array([1]).buffer)[0] == 1
const typedArrays = [Uint8Array, Uint8ClampedArray, Uint16Array, Uint32Array,
	typeof BigUint64Array == 'undefined' ? { name:'BigUint64Array' } : BigUint64Array, Int8Array, Int16Array, Int32Array,
	typeof BigInt64Array == 'undefined' ? { name:'BigInt64Array' } : BigInt64Array, Float32Array, Float64Array]
const typedArrayTags = [64, 68, 69, 70, 71, 72, 77, 78, 79, 85, 86]
for (let i = 0; i < typedArrays.length; i++) {
	registerTypedArray(typedArrays[i], typedArrayTags[i])
}
function registerTypedArray(TypedArray, tag) {
	let dvMethod = 'get' + TypedArray.name.slice(0, -5)
	let bytesPerElement;
	if (typeof TypedArray === 'function')
		bytesPerElement = TypedArray.BYTES_PER_ELEMENT;
	else
		TypedArray = null;
	for (let littleEndian = 0; littleEndian < 2; littleEndian++) {
		if (!littleEndian && bytesPerElement == 1)
			continue
		let sizeShift = bytesPerElement == 2 ? 1 : bytesPerElement == 4 ? 2 : bytesPerElement == 8 ? 3 : 0
		currentExtensions[littleEndian ? tag : (tag - 4)] = (bytesPerElement == 1 || littleEndian == isLittleEndianMachine) ? (buffer) => {
			if (!TypedArray)
				throw new Error('Could not find typed array for code ' + tag)
			if (!currentDecoder.copyBuffers) {
				// try provide a direct view, but will only work if we are byte-aligned
				if (bytesPerElement === 1 ||
					bytesPerElement === 2 && !(buffer.byteOffset & 1) ||
					bytesPerElement === 4 && !(buffer.byteOffset & 3) ||
					bytesPerElement === 8 && !(buffer.byteOffset & 7))
					return new TypedArray(buffer.buffer, buffer.byteOffset, buffer.byteLength >> sizeShift);
			}
			// we have to slice/copy here to get a new ArrayBuffer, if we are not word/byte aligned
			return new TypedArray(Uint8Array.prototype.slice.call(buffer, 0).buffer)
		} : buffer => {
			if (!TypedArray)
				throw new Error('Could not find typed array for code ' + tag)
			let dv = new DataView(buffer.buffer, buffer.byteOffset, buffer.byteLength)
			let elements = buffer.length >> sizeShift
			let ta = new TypedArray(elements)
			let method = dv[dvMethod]
			for (let i = 0; i < elements; i++) {
				ta[i] = method.call(dv, i << sizeShift, littleEndian)
			}
			return ta
		}
	}
}

function readBundleExt() {
	let length = readJustLength()
	let bundlePosition = position + read()
	for (let i = 2; i < length; i++) {
		// skip past bundles that were already read
		let bundleLength = readJustLength() // this will increment position, so must add to position afterwards
		position += bundleLength
	}
	let dataPosition = position
	position = bundlePosition
	bundledStrings = [readStringJS(readJustLength()), readStringJS(readJustLength())]
	bundledStrings.position0 = 0
	bundledStrings.position1 = 0
	bundledStrings.postBundlePosition = position
	position = dataPosition
	return read()
}

function readJustLength() {
	let token = src[position++] & 0x1f
	if (token > 0x17) {
		switch (token) {
			case 0x18:
				token = src[position++]
				break
			case 0x19:
				token = dataView.getUint16(position)
				position += 2
				break
			case 0x1a:
				token = dataView.getUint32(position)
				position += 4
				break
		}
	}
	return token
}

function loadShared() {
	if (currentDecoder.getShared) {
		let sharedData = saveState(() => {
			// save the state in case getShared modifies our buffer
			src = null
			return currentDecoder.getShared()
		}) || {}
		let updatedStructures = sharedData.structures || []
		currentDecoder.sharedVersion = sharedData.version
		packedValues = currentDecoder.sharedValues = sharedData.packedValues
		if (currentStructures === true)
			currentDecoder.structures = currentStructures = updatedStructures
		else
			currentStructures.splice.apply(currentStructures, [0, updatedStructures.length].concat(updatedStructures))
	}
}

function saveState(callback) {
	let savedSrcEnd = srcEnd
	let savedPosition = position
	let savedStringPosition = stringPosition
	let savedSrcStringStart = srcStringStart
	let savedSrcStringEnd = srcStringEnd
	let savedSrcString = srcString
	let savedStrings = strings
	let savedReferenceMap = referenceMap
	let savedBundledStrings = bundledStrings

	// TODO: We may need to revisit this if we do more external calls to user code (since it could be slow)
	let savedSrc = new Uint8Array(src.slice(0, srcEnd)) // we copy the data in case it changes while external data is processed
	let savedStructures = currentStructures
	let savedDecoder = currentDecoder
	let savedSequentialMode = sequentialMode
	let value = callback()
	srcEnd = savedSrcEnd
	position = savedPosition
	stringPosition = savedStringPosition
	srcStringStart = savedSrcStringStart
	srcStringEnd = savedSrcStringEnd
	srcString = savedSrcString
	strings = savedStrings
	referenceMap = savedReferenceMap
	bundledStrings = savedBundledStrings
	src = savedSrc
	sequentialMode = savedSequentialMode
	currentStructures = savedStructures
	currentDecoder = savedDecoder
	dataView = new DataView(src.buffer, src.byteOffset, src.byteLength)
	return value
}
function clearSource() {
	src = null
	referenceMap = null
	currentStructures = null
}

function addExtension(extension) {
	currentExtensions[extension.tag] = extension.decode
}

function setSizeLimits(limits) {
	if (limits.maxMapSize) maxMapSize = limits.maxMapSize;
	if (limits.maxArraySize) maxArraySize = limits.maxArraySize;
	if (limits.maxObjectSize) maxObjectSize = limits.maxObjectSize;
}

const mult10 = new Array(147) // this is a table matching binary exponents to the multiplier to determine significant digit rounding
for (let i = 0; i < 256; i++) {
	mult10[i] = +('1e' + Math.floor(45.15 - i * 0.30103))
}
let defaultDecoder = new Decoder({ useRecords: false })
const decode = defaultDecoder.decode
const decodeMultiple = defaultDecoder.decodeMultiple
const FLOAT32_OPTIONS = {
	NEVER: 0,
	ALWAYS: 1,
	DECIMAL_ROUND: 3,
	DECIMAL_FIT: 4
}
function roundFloat32(float32Number) {
	f32Array[0] = float32Number
	let multiplier = mult10[((u8Array[3] & 0x7f) << 1) | (u8Array[2] >> 7)]
	return ((multiplier * float32Number + (float32Number > 0 ? 0.5 : -0.5)) >> 0) / multiplier
}

;// CONCATENATED MODULE: ./node_modules/cbor-x/encode.js

let textEncoder
try {
	textEncoder = new TextEncoder()
} catch (error) {}
let extensions, extensionClasses
const encode_Buffer = typeof globalThis === 'object' && globalThis.Buffer;
const hasNodeBuffer = typeof encode_Buffer !== 'undefined'
const ByteArrayAllocate = hasNodeBuffer ? encode_Buffer.allocUnsafeSlow : Uint8Array
const ByteArray = hasNodeBuffer ? encode_Buffer : Uint8Array
const MAX_STRUCTURES = 0x100
const MAX_BUFFER_SIZE = hasNodeBuffer ? 0x100000000 : 0x7fd00000
let serializationId = 1
let throwOnIterable
let target
let targetView
let encode_position = 0
let safeEnd
let encode_bundledStrings = null
const MAX_BUNDLE_SIZE = 0xf000
const hasNonLatin = /[\u0080-\uFFFF]/
const RECORD_SYMBOL = Symbol('record-id')
class Encoder extends Decoder {
	constructor(options) {
		super(options)
		this.offset = 0
		let typeBuffer
		let start
		let sharedStructures
		let hasSharedUpdate
		let structures
		let referenceMap
		options = options || {}
		let encodeUtf8 = ByteArray.prototype.utf8Write ? function(string, position, maxBytes) {
			return target.utf8Write(string, position, maxBytes)
		} : (textEncoder && textEncoder.encodeInto) ?
			function(string, position) {
				return textEncoder.encodeInto(string, target.subarray(position)).written
			} : false

		let encoder = this
		let hasSharedStructures = options.structures || options.saveStructures
		let maxSharedStructures = options.maxSharedStructures
		if (maxSharedStructures == null)
			maxSharedStructures = hasSharedStructures ? 128 : 0
		if (maxSharedStructures > 8190)
			throw new Error('Maximum maxSharedStructure is 8190')
		let isSequential = options.sequential
		if (isSequential) {
			maxSharedStructures = 0
		}
		if (!this.structures)
			this.structures = []
		if (this.saveStructures)
			this.saveShared = this.saveStructures
		let samplingPackedValues, packedObjectMap, sharedValues = options.sharedValues
		let sharedPackedObjectMap
		if (sharedValues) {
			sharedPackedObjectMap = Object.create(null)
			for (let i = 0, l = sharedValues.length; i < l; i++) {
				sharedPackedObjectMap[sharedValues[i]] = i
			}
		}
		let recordIdsToRemove = []
		let transitionsCount = 0
		let serializationsSinceTransitionRebuild = 0
		
		this.mapEncode = function(value, encodeOptions) {
			// Experimental support for premapping keys using _keyMap instad of keyMap - not optiimised yet)
			if (this._keyMap && !this._mapped) {
				//console.log('encoding ', value)
				switch (value.constructor.name) {
					case 'Array': 
						value = value.map(r => this.encodeKeys(r))
						break
					//case 'Map': 
					//	value = this.encodeKeys(value)
					//	break
				}
				//this._mapped = true
			}
			return this.encode(value, encodeOptions)
		}
		
		this.encode = function(value, encodeOptions)	{
			if (!target) {
				target = new ByteArrayAllocate(8192)
				targetView = new DataView(target.buffer, 0, 8192)
				encode_position = 0
			}
			safeEnd = target.length - 10
			if (safeEnd - encode_position < 0x800) {
				// don't start too close to the end, 
				target = new ByteArrayAllocate(target.length)
				targetView = new DataView(target.buffer, 0, target.length)
				safeEnd = target.length - 10
				encode_position = 0
			} else if (encodeOptions === REUSE_BUFFER_MODE)
				encode_position = (encode_position + 7) & 0x7ffffff8 // Word align to make any future copying of this buffer faster
			start = encode_position
			if (encoder.useSelfDescribedHeader) {
				targetView.setUint32(encode_position, 0xd9d9f700) // tag two byte, then self-descriptive tag
				encode_position += 3
			}
			referenceMap = encoder.structuredClone ? new Map() : null
			if (encoder.bundleStrings && typeof value !== 'string') {
				encode_bundledStrings = []
				encode_bundledStrings.size = Infinity // force a new bundle start on first string
			} else
				encode_bundledStrings = null

			sharedStructures = encoder.structures
			if (sharedStructures) {
				if (sharedStructures.uninitialized) {
					let sharedData = encoder.getShared() || {}
					encoder.structures = sharedStructures = sharedData.structures || []
					encoder.sharedVersion = sharedData.version
					let sharedValues = encoder.sharedValues = sharedData.packedValues
					if (sharedValues) {
						sharedPackedObjectMap = {}
						for (let i = 0, l = sharedValues.length; i < l; i++)
							sharedPackedObjectMap[sharedValues[i]] = i
					}
				}
				let sharedStructuresLength = sharedStructures.length
				if (sharedStructuresLength > maxSharedStructures && !isSequential)
					sharedStructuresLength = maxSharedStructures
				if (!sharedStructures.transitions) {
					// rebuild our structure transitions
					sharedStructures.transitions = Object.create(null)
					for (let i = 0; i < sharedStructuresLength; i++) {
						let keys = sharedStructures[i]
						//console.log('shared struct keys:', keys)
						if (!keys)
							continue
						let nextTransition, transition = sharedStructures.transitions
						for (let j = 0, l = keys.length; j < l; j++) {
							if (transition[RECORD_SYMBOL] === undefined)
								transition[RECORD_SYMBOL] = i
							let key = keys[j]
							nextTransition = transition[key]
							if (!nextTransition) {
								nextTransition = transition[key] = Object.create(null)
							}
							transition = nextTransition
						}
						transition[RECORD_SYMBOL] = i | 0x100000
					}
				}
				if (!isSequential)
					sharedStructures.nextId = sharedStructuresLength
			}
			if (hasSharedUpdate)
				hasSharedUpdate = false
			structures = sharedStructures || []
			packedObjectMap = sharedPackedObjectMap
			if (options.pack) {
				let packedValues = new Map()
				packedValues.values = []
				packedValues.encoder = encoder
				packedValues.maxValues = options.maxPrivatePackedValues || (sharedPackedObjectMap ? 16 : Infinity)
				packedValues.objectMap = sharedPackedObjectMap || false
				packedValues.samplingPackedValues = samplingPackedValues
				findRepetitiveStrings(value, packedValues)
				if (packedValues.values.length > 0) {
					target[encode_position++] = 0xd8 // one-byte tag
					target[encode_position++] = 51 // tag 51 for packed shared structures https://www.potaroo.net/ietf/ids/draft-ietf-cbor-packed-03.txt
					writeArrayHeader(4)
					let valuesArray = packedValues.values
					encode(valuesArray)
					writeArrayHeader(0) // prefixes
					writeArrayHeader(0) // suffixes
					packedObjectMap = Object.create(sharedPackedObjectMap || null)
					for (let i = 0, l = valuesArray.length; i < l; i++) {
						packedObjectMap[valuesArray[i]] = i
					}
				}
			}
			throwOnIterable = encodeOptions & THROW_ON_ITERABLE;
			try {
				if (throwOnIterable)
					return;
				encode(value)
				if (encode_bundledStrings) {
					writeBundles(start, encode)
				}
				encoder.offset = encode_position // update the offset so next serialization doesn't write over our buffer, but can continue writing to same buffer sequentially
				if (referenceMap && referenceMap.idsToInsert) {
					encode_position += referenceMap.idsToInsert.length * 2
					if (encode_position > safeEnd)
						makeRoom(encode_position)
					encoder.offset = encode_position
					let serialized = insertIds(target.subarray(start, encode_position), referenceMap.idsToInsert)
					referenceMap = null
					return serialized
				}
				if (encodeOptions & REUSE_BUFFER_MODE) {
					target.start = start
					target.end = encode_position
					return target
				}
				return target.subarray(start, encode_position) // position can change if we call encode again in saveShared, so we get the buffer now
			} finally {
				if (sharedStructures) {
					if (serializationsSinceTransitionRebuild < 10)
						serializationsSinceTransitionRebuild++
					if (sharedStructures.length > maxSharedStructures)
						sharedStructures.length = maxSharedStructures
					if (transitionsCount > 10000) {
						// force a rebuild occasionally after a lot of transitions so it can get cleaned up
						sharedStructures.transitions = null
						serializationsSinceTransitionRebuild = 0
						transitionsCount = 0
						if (recordIdsToRemove.length > 0)
							recordIdsToRemove = []
					} else if (recordIdsToRemove.length > 0 && !isSequential) {
						for (let i = 0, l = recordIdsToRemove.length; i < l; i++) {
							recordIdsToRemove[i][RECORD_SYMBOL] = undefined
						}
						recordIdsToRemove = []
						//sharedStructures.nextId = maxSharedStructures
					}
				}
				if (hasSharedUpdate && encoder.saveShared) {
					if (encoder.structures.length > maxSharedStructures) {
						encoder.structures = encoder.structures.slice(0, maxSharedStructures)
					}
					// we can't rely on start/end with REUSE_BUFFER_MODE since they will (probably) change when we save
					let returnBuffer = target.subarray(start, encode_position)
					if (encoder.updateSharedData() === false)
						return encoder.encode(value) // re-encode if it fails
					return returnBuffer
				}
				if (encodeOptions & RESET_BUFFER_MODE)
					encode_position = start
			}
		}
		this.findCommonStringsToPack = () => {
			samplingPackedValues = new Map()
			if (!sharedPackedObjectMap)
				sharedPackedObjectMap = Object.create(null)
			return (options) => {
				let threshold = options && options.threshold || 4
				let position = this.pack ? options.maxPrivatePackedValues || 16 : 0
				if (!sharedValues)
					sharedValues = this.sharedValues = []
				for (let [ key, status ] of samplingPackedValues) {
					if (status.count > threshold) {
						sharedPackedObjectMap[key] = position++
						sharedValues.push(key)
						hasSharedUpdate = true
					}
				}
				while (this.saveShared && this.updateSharedData() === false) {}
				samplingPackedValues = null
			}
		}
		const encode = (value) => {
			if (encode_position > safeEnd)
				target = makeRoom(encode_position)

			var type = typeof value
			var length
			if (type === 'string') {
				if (packedObjectMap) {
					let packedPosition = packedObjectMap[value]
					if (packedPosition >= 0) {
						if (packedPosition < 16)
							target[encode_position++] = packedPosition + 0xe0 // simple values, defined in https://www.potaroo.net/ietf/ids/draft-ietf-cbor-packed-03.txt
						else {
							target[encode_position++] = 0xc6 // tag 6 defined in https://www.potaroo.net/ietf/ids/draft-ietf-cbor-packed-03.txt
							if (packedPosition & 1)
								encode((15 - packedPosition) >> 1)
							else
								encode((packedPosition - 16) >> 1)
						}
						return
/*						} else if (packedStatus.serializationId != serializationId) {
							packedStatus.serializationId = serializationId
							packedStatus.count = 1
							if (options.sharedPack) {
								let sharedCount = packedStatus.sharedCount = (packedStatus.sharedCount || 0) + 1
								if (shareCount > (options.sharedPack.threshold || 5)) {
									let sharedPosition = packedStatus.position = packedStatus.nextSharedPosition
									hasSharedUpdate = true
									if (sharedPosition < 16)
										target[position++] = sharedPosition + 0xc0

								}
							}
						} // else any in-doc incrementation?*/
					} else if (samplingPackedValues && !options.pack) {
						let status = samplingPackedValues.get(value)
						if (status)
							status.count++
						else
							samplingPackedValues.set(value, {
								count: 1,
							})
					}
				}
				let strLength = value.length
				if (encode_bundledStrings && strLength >= 4 && strLength < 0x400) {
					if ((encode_bundledStrings.size += strLength) > MAX_BUNDLE_SIZE) {
						let extStart
						let maxBytes = (encode_bundledStrings[0] ? encode_bundledStrings[0].length * 3 + encode_bundledStrings[1].length : 0) + 10
						if (encode_position + maxBytes > safeEnd)
							target = makeRoom(encode_position + maxBytes)
						target[encode_position++] = 0xd9 // tag 16-bit
						target[encode_position++] = 0xdf // tag 0xdff9
						target[encode_position++] = 0xf9
						// TODO: If we only have one bundle with any string data, only write one string bundle
						target[encode_position++] = encode_bundledStrings.position ? 0x84 : 0x82 // array of 4 or 2 elements depending on if we write bundles
						target[encode_position++] = 0x1a // 32-bit unsigned int
						extStart = encode_position - start
						encode_position += 4 // reserve for writing bundle reference
						if (encode_bundledStrings.position) {
							writeBundles(start, encode) // write the last bundles
						}
						encode_bundledStrings = ['', ''] // create new ones
						encode_bundledStrings.size = 0
						encode_bundledStrings.position = extStart
					}
					let twoByte = hasNonLatin.test(value)
					encode_bundledStrings[twoByte ? 0 : 1] += value
					target[encode_position++] = twoByte ? 0xce : 0xcf
					encode(strLength);
					return
				}
				let headerSize
				// first we estimate the header size, so we can write to the correct location
				if (strLength < 0x20) {
					headerSize = 1
				} else if (strLength < 0x100) {
					headerSize = 2
				} else if (strLength < 0x10000) {
					headerSize = 3
				} else {
					headerSize = 5
				}
				let maxBytes = strLength * 3
				if (encode_position + maxBytes > safeEnd)
					target = makeRoom(encode_position + maxBytes)

				if (strLength < 0x40 || !encodeUtf8) {
					let i, c1, c2, strPosition = encode_position + headerSize
					for (i = 0; i < strLength; i++) {
						c1 = value.charCodeAt(i)
						if (c1 < 0x80) {
							target[strPosition++] = c1
						} else if (c1 < 0x800) {
							target[strPosition++] = c1 >> 6 | 0xc0
							target[strPosition++] = c1 & 0x3f | 0x80
						} else if (
							(c1 & 0xfc00) === 0xd800 &&
							((c2 = value.charCodeAt(i + 1)) & 0xfc00) === 0xdc00
						) {
							c1 = 0x10000 + ((c1 & 0x03ff) << 10) + (c2 & 0x03ff)
							i++
							target[strPosition++] = c1 >> 18 | 0xf0
							target[strPosition++] = c1 >> 12 & 0x3f | 0x80
							target[strPosition++] = c1 >> 6 & 0x3f | 0x80
							target[strPosition++] = c1 & 0x3f | 0x80
						} else {
							target[strPosition++] = c1 >> 12 | 0xe0
							target[strPosition++] = c1 >> 6 & 0x3f | 0x80
							target[strPosition++] = c1 & 0x3f | 0x80
						}
					}
					length = strPosition - encode_position - headerSize
				} else {
					length = encodeUtf8(value, encode_position + headerSize, maxBytes)
				}

				if (length < 0x18) {
					target[encode_position++] = 0x60 | length
				} else if (length < 0x100) {
					if (headerSize < 2) {
						target.copyWithin(encode_position + 2, encode_position + 1, encode_position + 1 + length)
					}
					target[encode_position++] = 0x78
					target[encode_position++] = length
				} else if (length < 0x10000) {
					if (headerSize < 3) {
						target.copyWithin(encode_position + 3, encode_position + 2, encode_position + 2 + length)
					}
					target[encode_position++] = 0x79
					target[encode_position++] = length >> 8
					target[encode_position++] = length & 0xff
				} else {
					if (headerSize < 5) {
						target.copyWithin(encode_position + 5, encode_position + 3, encode_position + 3 + length)
					}
					target[encode_position++] = 0x7a
					targetView.setUint32(encode_position, length)
					encode_position += 4
				}
				encode_position += length
			} else if (type === 'number') {
				if (!this.alwaysUseFloat && value >>> 0 === value) {// positive integer, 32-bit or less
					// positive uint
					if (value < 0x18) {
						target[encode_position++] = value
					} else if (value < 0x100) {
						target[encode_position++] = 0x18
						target[encode_position++] = value
					} else if (value < 0x10000) {
						target[encode_position++] = 0x19
						target[encode_position++] = value >> 8
						target[encode_position++] = value & 0xff
					} else {
						target[encode_position++] = 0x1a
						targetView.setUint32(encode_position, value)
						encode_position += 4
					}
				} else if (!this.alwaysUseFloat && value >> 0 === value) { // negative integer
					if (value >= -0x18) {
						target[encode_position++] = 0x1f - value
					} else if (value >= -0x100) {
						target[encode_position++] = 0x38
						target[encode_position++] = ~value
					} else if (value >= -0x10000) {
						target[encode_position++] = 0x39
						targetView.setUint16(encode_position, ~value)
						encode_position += 2
					} else {
						target[encode_position++] = 0x3a
						targetView.setUint32(encode_position, ~value)
						encode_position += 4
					}
				} else {
					let useFloat32
					if ((useFloat32 = this.useFloat32) > 0 && value < 0x100000000 && value >= -0x80000000) {
						target[encode_position++] = 0xfa
						targetView.setFloat32(encode_position, value)
						let xShifted
						if (useFloat32 < 4 ||
								// this checks for rounding of numbers that were encoded in 32-bit float to nearest significant decimal digit that could be preserved
								((xShifted = value * mult10[((target[encode_position] & 0x7f) << 1) | (target[encode_position + 1] >> 7)]) >> 0) === xShifted) {
							encode_position += 4
							return
						} else
							encode_position-- // move back into position for writing a double
					}
					target[encode_position++] = 0xfb
					targetView.setFloat64(encode_position, value)
					encode_position += 8
				}
			} else if (type === 'object') {
				if (!value)
					target[encode_position++] = 0xf6
				else {
					if (referenceMap) {
						let referee = referenceMap.get(value)
						if (referee) {
							target[encode_position++] = 0xd8
							target[encode_position++] = 29 // http://cbor.schmorp.de/value-sharing
							target[encode_position++] = 0x19 // 16-bit uint
							if (!referee.references) {
								let idsToInsert = referenceMap.idsToInsert || (referenceMap.idsToInsert = [])
								referee.references = []
								idsToInsert.push(referee)
							}
							referee.references.push(encode_position - start)
							encode_position += 2 // TODO: also support 32-bit
							return
						} else 
							referenceMap.set(value, { offset: encode_position - start })
					}
					let constructor = value.constructor
					if (constructor === Object) {
						writeObject(value)
					} else if (constructor === Array) {
						length = value.length
						if (length < 0x18) {
							target[encode_position++] = 0x80 | length
						} else {
							writeArrayHeader(length)
						}
						for (let i = 0; i < length; i++) {
							encode(value[i])
						}
					} else if (constructor === Map) {
						if (this.mapsAsObjects ? this.useTag259ForMaps !== false : this.useTag259ForMaps) {
							// use Tag 259 (https://github.com/shanewholloway/js-cbor-codec/blob/master/docs/CBOR-259-spec--explicit-maps.md) for maps if the user wants it that way
							target[encode_position++] = 0xd9
							target[encode_position++] = 1
							target[encode_position++] = 3
						}
						length = value.size
						if (length < 0x18) {
							target[encode_position++] = 0xa0 | length
						} else if (length < 0x100) {
							target[encode_position++] = 0xb8
							target[encode_position++] = length
						} else if (length < 0x10000) {
							target[encode_position++] = 0xb9
							target[encode_position++] = length >> 8
							target[encode_position++] = length & 0xff
						} else {
							target[encode_position++] = 0xba
							targetView.setUint32(encode_position, length)
							encode_position += 4
						}
						if (encoder.keyMap) { 
							for (let [ key, entryValue ] of value) {
								encode(encoder.encodeKey(key))
								encode(entryValue)
							} 
						} else { 
							for (let [ key, entryValue ] of value) {
								encode(key) 
								encode(entryValue)
							} 	
						}
					} else {
						for (let i = 0, l = extensions.length; i < l; i++) {
							let extensionClass = extensionClasses[i]
							if (value instanceof extensionClass) {
								let extension = extensions[i]
								let tag = extension.tag
								if (tag == undefined)
									tag = extension.getTag && extension.getTag.call(this, value)
								if (tag < 0x18) {
									target[encode_position++] = 0xc0 | tag
								} else if (tag < 0x100) {
									target[encode_position++] = 0xd8
									target[encode_position++] = tag
								} else if (tag < 0x10000) {
									target[encode_position++] = 0xd9
									target[encode_position++] = tag >> 8
									target[encode_position++] = tag & 0xff
								} else if (tag > -1) {
									target[encode_position++] = 0xda
									targetView.setUint32(encode_position, tag)
									encode_position += 4
								} // else undefined, don't write tag
								extension.encode.call(this, value, encode, makeRoom)
								return
							}
						}
						if (value[Symbol.iterator]) {
							if (throwOnIterable) {
								let error = new Error('Iterable should be serialized as iterator')
								error.iteratorNotHandled = true;
								throw error;
							}
							target[encode_position++] = 0x9f // indefinite length array
							for (let entry of value) {
								encode(entry)
							}
							target[encode_position++] = 0xff // stop-code
							return
						}
						if (value[Symbol.asyncIterator] || isBlob(value)) {
							let error = new Error('Iterable/blob should be serialized as iterator')
							error.iteratorNotHandled = true;
							throw error;
						}
						if (this.useToJSON && value.toJSON) {
							const json = value.toJSON()
							// if for some reason value.toJSON returns itself it'll loop forever
							if (json !== value)
								return encode(json)
						}

						// no extension found, write as a plain object
						writeObject(value)
					}
				}
			} else if (type === 'boolean') {
				target[encode_position++] = value ? 0xf5 : 0xf4
			} else if (type === 'bigint') {
				if (value < (BigInt(1)<<BigInt(64)) && value >= 0) {
					// use an unsigned int as long as it fits
					target[encode_position++] = 0x1b
					targetView.setBigUint64(encode_position, value)
				} else if (value > -(BigInt(1)<<BigInt(64)) && value < 0) {
					// if we can fit an unsigned int, use that
					target[encode_position++] = 0x3b
					targetView.setBigUint64(encode_position, -value - BigInt(1))
				} else {
					// overflow
					if (this.largeBigIntToFloat) {
						target[encode_position++] = 0xfb
						targetView.setFloat64(encode_position, Number(value))
					} else {
						if (value >= BigInt(0))
							target[encode_position++] = 0xc2 // tag 2
						else {
							target[encode_position++] = 0xc3 // tag 2
							value = BigInt(-1) - value;
						}
						let bytes = [];
						while (value) {
							bytes.push(Number(value & BigInt(0xff)));
							value >>= BigInt(8);
						}
						writeBuffer(new Uint8Array(bytes.reverse()), makeRoom);
						return;
					}
				}
				encode_position += 8
			} else if (type === 'undefined') {
				target[encode_position++] = 0xf7
			} else {
				throw new Error('Unknown type: ' + type)
			}
		}

		const writeObject = this.useRecords === false ? this.variableMapSize ? (object) => {
			// this method is slightly slower, but generates "preferred serialization" (optimally small for smaller objects)
			let keys = Object.keys(object)
			let vals = Object.values(object)
			let length = keys.length
			if (length < 0x18) {
				target[encode_position++] = 0xa0 | length
			} else if (length < 0x100) {
				target[encode_position++] = 0xb8
				target[encode_position++] = length
			} else if (length < 0x10000) {
				target[encode_position++] = 0xb9
				target[encode_position++] = length >> 8
				target[encode_position++] = length & 0xff
			} else {
				target[encode_position++] = 0xba
				targetView.setUint32(encode_position, length)
				encode_position += 4
			}
			let key
			if (encoder.keyMap) { 
				for (let i = 0; i < length; i++) {
					encode(encoder.encodeKey(keys[i]))
					encode(vals[i])
				}
			} else {
				for (let i = 0; i < length; i++) {
					encode(keys[i])
					encode(vals[i])
				}
			}
		} :
		(object) => {
			target[encode_position++] = 0xb9 // always use map 16, so we can preallocate and set the length afterwards
			let objectOffset = encode_position - start
			encode_position += 2
			let size = 0
			if (encoder.keyMap) {
				for (let key in object) if (typeof object.hasOwnProperty !== 'function' || object.hasOwnProperty(key)) {
					encode(encoder.encodeKey(key))
					encode(object[key])
					size++
				}
			} else { 
				for (let key in object) if (typeof object.hasOwnProperty !== 'function' || object.hasOwnProperty(key)) {
						encode(key)
						encode(object[key])
					size++
				}
			}
			target[objectOffset++ + start] = size >> 8
			target[objectOffset + start] = size & 0xff
		} :
		(object, skipValues) => {
			let nextTransition, transition = structures.transitions || (structures.transitions = Object.create(null))
			let newTransitions = 0
			let length = 0
			let parentRecordId
			let keys
			if (this.keyMap) {
				keys = Object.keys(object).map(k => this.encodeKey(k))
				length = keys.length
				for (let i = 0; i < length; i++) {
					let key = keys[i]
					nextTransition = transition[key]
					if (!nextTransition) {
						nextTransition = transition[key] = Object.create(null)
						newTransitions++
					}
					transition = nextTransition
				}				
			} else {
				for (let key in object) if (typeof object.hasOwnProperty !== 'function' || object.hasOwnProperty(key)) {
					nextTransition = transition[key]
					if (!nextTransition) {
						if (transition[RECORD_SYMBOL] & 0x100000) {// this indicates it is a brancheable/extendable terminal node, so we will use this record id and extend it
							parentRecordId = transition[RECORD_SYMBOL] & 0xffff
						}
						nextTransition = transition[key] = Object.create(null)
						newTransitions++
					}
					transition = nextTransition
					length++
				}
			}
			let recordId = transition[RECORD_SYMBOL]
			if (recordId !== undefined) {
				recordId &= 0xffff
				target[encode_position++] = 0xd9
				target[encode_position++] = (recordId >> 8) | 0xe0
				target[encode_position++] = recordId & 0xff
			} else {
				if (!keys)
					keys = transition.__keys__ || (transition.__keys__ = Object.keys(object))
				if (parentRecordId === undefined) {
					recordId = structures.nextId++
					if (!recordId) {
						recordId = 0
						structures.nextId = 1
					}
					if (recordId >= MAX_STRUCTURES) {// cycle back around
						structures.nextId = (recordId = maxSharedStructures) + 1
					}
				} else {
					recordId = parentRecordId
				}
				structures[recordId] = keys
				if (recordId < maxSharedStructures) {
					target[encode_position++] = 0xd9
					target[encode_position++] = (recordId >> 8) | 0xe0
					target[encode_position++] = recordId & 0xff
					transition = structures.transitions
					for (let i = 0; i < length; i++) {
						if (transition[RECORD_SYMBOL] === undefined || (transition[RECORD_SYMBOL] & 0x100000))
							transition[RECORD_SYMBOL] = recordId
						transition = transition[keys[i]]
					}
					transition[RECORD_SYMBOL] = recordId | 0x100000 // indicates it is a extendable terminal
					hasSharedUpdate = true
				} else {
					transition[RECORD_SYMBOL] = recordId
					targetView.setUint32(encode_position, 0xd9dfff00) // tag two byte, then record definition id
					encode_position += 3
					if (newTransitions)
						transitionsCount += serializationsSinceTransitionRebuild * newTransitions
					// record the removal of the id, we can maintain our shared structure
					if (recordIdsToRemove.length >= MAX_STRUCTURES - maxSharedStructures)
						recordIdsToRemove.shift()[RECORD_SYMBOL] = undefined // we are cycling back through, and have to remove old ones
					recordIdsToRemove.push(transition)
					writeArrayHeader(length + 2)
					encode(0xe000 + recordId)
					encode(keys)
					if (skipValues) return; // special exit for iterator
					for (let key in object)
						if (typeof object.hasOwnProperty !== 'function' || object.hasOwnProperty(key))
							encode(object[key])
					return
				}
			}
			if (length < 0x18) { // write the array header
				target[encode_position++] = 0x80 | length
			} else {
				writeArrayHeader(length)
			}
			if (skipValues) return; // special exit for iterator
			for (let key in object)
				if (typeof object.hasOwnProperty !== 'function' || object.hasOwnProperty(key))
					encode(object[key])
		}
		const makeRoom = (end) => {
			let newSize
			if (end > 0x1000000) {
				// special handling for really large buffers
				if ((end - start) > MAX_BUFFER_SIZE)
					throw new Error('Encoded buffer would be larger than maximum buffer size')
				newSize = Math.min(MAX_BUFFER_SIZE,
					Math.round(Math.max((end - start) * (end > 0x4000000 ? 1.25 : 2), 0x400000) / 0x1000) * 0x1000)
			} else // faster handling for smaller buffers
				newSize = ((Math.max((end - start) << 2, target.length - 1) >> 12) + 1) << 12
			let newBuffer = new ByteArrayAllocate(newSize)
			targetView = new DataView(newBuffer.buffer, 0, newSize)
			if (target.copy)
				target.copy(newBuffer, 0, start, end)
			else
				newBuffer.set(target.slice(start, end))
			encode_position -= start
			start = 0
			safeEnd = newBuffer.length - 10
			return target = newBuffer
		}
		let chunkThreshold = 100;
		let continuedChunkThreshold = 1000;
		this.encodeAsIterable = function(value, options) {
			return startEncoding(value, options, encodeObjectAsIterable);
		}
		this.encodeAsAsyncIterable = function(value, options) {
			return startEncoding(value, options, encodeObjectAsAsyncIterable);
		}

		function* encodeObjectAsIterable(object, iterateProperties, finalIterable) {
			let constructor = object.constructor;
			if (constructor === Object) {
				let useRecords = encoder.useRecords !== false;
				if (useRecords)
					writeObject(object, true); // write the record identifier
				else
					writeEntityLength(Object.keys(object).length, 0xa0);
				for (let key in object) {
					let value = object[key];
					if (!useRecords) encode(key);
					if (value && typeof value === 'object') {
						if (iterateProperties[key])
							yield* encodeObjectAsIterable(value, iterateProperties[key]);
						else
							yield* tryEncode(value, iterateProperties, key);
					} else encode(value);
				}
			} else if (constructor === Array) {
				let length = object.length;
				writeArrayHeader(length);
				for (let i = 0; i < length; i++) {
					let value = object[i];
					if (value && (typeof value === 'object' || encode_position - start > chunkThreshold)) {
						if (iterateProperties.element)
							yield* encodeObjectAsIterable(value, iterateProperties.element);
						else
							yield* tryEncode(value, iterateProperties, 'element');
					} else encode(value);
				}
			} else if (object[Symbol.iterator] && !object.buffer) { // iterator, but exclude typed arrays
				target[encode_position++] = 0x9f; // start indefinite array
				for (let value of object) {
					if (value && (typeof value === 'object' || encode_position - start > chunkThreshold)) {
						if (iterateProperties.element)
							yield* encodeObjectAsIterable(value, iterateProperties.element);
						else
							yield* tryEncode(value, iterateProperties, 'element');
					} else encode(value);
				}
				target[encode_position++] = 0xff; // stop byte
			} else if (isBlob(object)){
				writeEntityLength(object.size, 0x40); // encode as binary data
				yield target.subarray(start, encode_position);
				yield object; // directly return blobs, they have to be encoded asynchronously
				restartEncoding();
			} else if (object[Symbol.asyncIterator]) {
				target[encode_position++] = 0x9f; // start indefinite array
				yield target.subarray(start, encode_position);
				yield object; // directly return async iterators, they have to be encoded asynchronously
				restartEncoding();
				target[encode_position++] = 0xff; // stop byte
			} else {
				encode(object);
			}
			if (finalIterable && encode_position > start) yield target.subarray(start, encode_position);
			else if (encode_position - start > chunkThreshold) {
				yield target.subarray(start, encode_position);
				restartEncoding();
			}
		}
		function* tryEncode(value, iterateProperties, key) {
			let restart = encode_position - start;
			try {
				encode(value);
				if (encode_position - start > chunkThreshold) {
					yield target.subarray(start, encode_position);
					restartEncoding();
				}
			} catch (error) {
				if (error.iteratorNotHandled) {
					iterateProperties[key] = {};
					encode_position = start + restart; // restart our position so we don't have partial data from last encode
					yield* encodeObjectAsIterable.call(this, value, iterateProperties[key]);
				} else throw error;
			}
		}
		function restartEncoding() {
			chunkThreshold = continuedChunkThreshold;
			encoder.encode(null, THROW_ON_ITERABLE); // restart encoding
		}
		function startEncoding(value, options, encodeIterable) {
			if (options && options.chunkThreshold) // explicitly specified chunk sizes
				chunkThreshold = continuedChunkThreshold = options.chunkThreshold;
			else // we start with a smaller threshold to get initial bytes sent quickly
				chunkThreshold = 100;
			if (value && typeof value === 'object') {
				encoder.encode(null, THROW_ON_ITERABLE); // start encoding
				return encodeIterable(value, encoder.iterateProperties || (encoder.iterateProperties = {}), true);
			}
			return [encoder.encode(value)];
		}

		async function* encodeObjectAsAsyncIterable(value, iterateProperties) {
			for (let encodedValue of encodeObjectAsIterable(value, iterateProperties, true)) {
				let constructor = encodedValue.constructor;
				if (constructor === ByteArray || constructor === Uint8Array)
					yield encodedValue;
				else if (isBlob(encodedValue)) {
					let reader = encodedValue.stream().getReader();
					let next;
					while (!(next = await reader.read()).done) {
						yield next.value;
					}
				} else if (encodedValue[Symbol.asyncIterator]) {
					for await (let asyncValue of encodedValue) {
						restartEncoding();
						if (asyncValue)
							yield* encodeObjectAsAsyncIterable(asyncValue, iterateProperties.async || (iterateProperties.async = {}));
						else yield encoder.encode(asyncValue);
					}
				} else {
					yield encodedValue;
				}
			}
		}
	}
	useBuffer(buffer) {
		// this means we are finished using our own buffer and we can write over it safely
		target = buffer
		targetView = new DataView(target.buffer, target.byteOffset, target.byteLength)
		encode_position = 0
	}
	clearSharedData() {
		if (this.structures)
			this.structures = []
		if (this.sharedValues)
			this.sharedValues = undefined
	}
	updateSharedData() {
		let lastVersion = this.sharedVersion || 0
		this.sharedVersion = lastVersion + 1
		let structuresCopy = this.structures.slice(0)
		let sharedData = new SharedData(structuresCopy, this.sharedValues, this.sharedVersion)
		let saveResults = this.saveShared(sharedData,
				existingShared => (existingShared && existingShared.version || 0) == lastVersion)
		if (saveResults === false) {
			// get updated structures and try again if the update failed
			sharedData = this.getShared() || {}
			this.structures = sharedData.structures || []
			this.sharedValues = sharedData.packedValues
			this.sharedVersion = sharedData.version
			this.structures.nextId = this.structures.length
		} else {
			// restore structures
			structuresCopy.forEach((structure, i) => this.structures[i] = structure)
		}
		// saveShared may fail to write and reload, or may have reloaded to check compatibility and overwrite saved data, either way load the correct shared data
		return saveResults
	}
}
function writeEntityLength(length, majorValue) {
	if (length < 0x18)
		target[encode_position++] = majorValue | length
	else if (length < 0x100) {
		target[encode_position++] = majorValue | 0x18
		target[encode_position++] = length
	} else if (length < 0x10000) {
		target[encode_position++] = majorValue | 0x19
		target[encode_position++] = length >> 8
		target[encode_position++] = length & 0xff
	} else {
		target[encode_position++] = majorValue | 0x1a
		targetView.setUint32(encode_position, length)
		encode_position += 4
	}

}
class SharedData {
	constructor(structures, values, version) {
		this.structures = structures
		this.packedValues = values
		this.version = version
	}
}

function writeArrayHeader(length) {
	if (length < 0x18)
		target[encode_position++] = 0x80 | length
	else if (length < 0x100) {
		target[encode_position++] = 0x98
		target[encode_position++] = length
	} else if (length < 0x10000) {
		target[encode_position++] = 0x99
		target[encode_position++] = length >> 8
		target[encode_position++] = length & 0xff
	} else {
		target[encode_position++] = 0x9a
		targetView.setUint32(encode_position, length)
		encode_position += 4
	}
}

const BlobConstructor = typeof Blob === 'undefined' ? function(){} : Blob;
function isBlob(object) {
	if (object instanceof BlobConstructor)
		return true;
	let tag = object[Symbol.toStringTag];
	return tag === 'Blob' || tag === 'File';
}
function findRepetitiveStrings(value, packedValues) {
	switch(typeof value) {
		case 'string':
			if (value.length > 3) {
				if (packedValues.objectMap[value] > -1 || packedValues.values.length >= packedValues.maxValues)
					return
				let packedStatus = packedValues.get(value)
				if (packedStatus) {
					if (++packedStatus.count == 2) {
						packedValues.values.push(value)
					}
				} else {
					packedValues.set(value, {
						count: 1,
					})
					if (packedValues.samplingPackedValues) {
						let status = packedValues.samplingPackedValues.get(value)
						if (status)
							status.count++
						else
							packedValues.samplingPackedValues.set(value, {
								count: 1,
							})
					}
				}
			}
			break
		case 'object':
			if (value) {
				if (value instanceof Array) {
					for (let i = 0, l = value.length; i < l; i++) {
						findRepetitiveStrings(value[i], packedValues)
					}

				} else {
					let includeKeys = !packedValues.encoder.useRecords
					for (var key in value) {
						if (value.hasOwnProperty(key)) {
							if (includeKeys)
								findRepetitiveStrings(key, packedValues)
							findRepetitiveStrings(value[key], packedValues)
						}
					}
				}
			}
			break
		case 'function': console.log(value)
	}
}
const encode_isLittleEndianMachine = new Uint8Array(new Uint16Array([1]).buffer)[0] == 1
extensionClasses = [ Date, Set, Error, RegExp, Tag, ArrayBuffer,
	Uint8Array, Uint8ClampedArray, Uint16Array, Uint32Array,
	typeof BigUint64Array == 'undefined' ? function() {} : BigUint64Array, Int8Array, Int16Array, Int32Array,
	typeof BigInt64Array == 'undefined' ? function() {} : BigInt64Array,
	Float32Array, Float64Array, SharedData ]

//Object.getPrototypeOf(Uint8Array.prototype).constructor /*TypedArray*/
extensions = [{ // Date
	tag: 1,
	encode(date, encode) {
		let seconds = date.getTime() / 1000
		if ((this.useTimestamp32 || date.getMilliseconds() === 0) && seconds >= 0 && seconds < 0x100000000) {
			// Timestamp 32
			target[encode_position++] = 0x1a
			targetView.setUint32(encode_position, seconds)
			encode_position += 4
		} else {
			// Timestamp float64
			target[encode_position++] = 0xfb
			targetView.setFloat64(encode_position, seconds)
			encode_position += 8
		}
	}
}, { // Set
	tag: 258, // https://github.com/input-output-hk/cbor-sets-spec/blob/master/CBOR_SETS.md
	encode(set, encode) {
		let array = Array.from(set)
		encode(array)
	}
}, { // Error
	tag: 27, // http://cbor.schmorp.de/generic-object
	encode(error, encode) {
		encode([ error.name, error.message ])
	}
}, { // RegExp
	tag: 27, // http://cbor.schmorp.de/generic-object
	encode(regex, encode) {
		encode([ 'RegExp', regex.source, regex.flags ])
	}
}, { // Tag
	getTag(tag) {
		return tag.tag
	},
	encode(tag, encode) {
		encode(tag.value)
	}
}, { // ArrayBuffer
	encode(arrayBuffer, encode, makeRoom) {
		writeBuffer(arrayBuffer, makeRoom)
	}
}, { // Uint8Array
	getTag(typedArray) {
		if (typedArray.constructor === Uint8Array) {
			if (this.tagUint8Array || hasNodeBuffer && this.tagUint8Array !== false)
				return 64;
		} // else no tag
	},
	encode(typedArray, encode, makeRoom) {
		writeBuffer(typedArray, makeRoom)
	}
},
	typedArrayEncoder(68, 1),
	typedArrayEncoder(69, 2),
	typedArrayEncoder(70, 4),
	typedArrayEncoder(71, 8),
	typedArrayEncoder(72, 1),
	typedArrayEncoder(77, 2),
	typedArrayEncoder(78, 4),
	typedArrayEncoder(79, 8),
	typedArrayEncoder(85, 4),
	typedArrayEncoder(86, 8),
{
	encode(sharedData, encode) { // write SharedData
		let packedValues = sharedData.packedValues || []
		let sharedStructures = sharedData.structures || []
		if (packedValues.values.length > 0) {
			target[encode_position++] = 0xd8 // one-byte tag
			target[encode_position++] = 51 // tag 51 for packed shared structures https://www.potaroo.net/ietf/ids/draft-ietf-cbor-packed-03.txt
			writeArrayHeader(4)
			let valuesArray = packedValues.values
			encode(valuesArray)
			writeArrayHeader(0) // prefixes
			writeArrayHeader(0) // suffixes
			packedObjectMap = Object.create(sharedPackedObjectMap || null)
			for (let i = 0, l = valuesArray.length; i < l; i++) {
				packedObjectMap[valuesArray[i]] = i
			}
		}
		if (sharedStructures) {
			targetView.setUint32(encode_position, 0xd9dffe00)
			encode_position += 3
			let definitions = sharedStructures.slice(0)
			definitions.unshift(0xe000)
			definitions.push(new Tag(sharedData.version, 0x53687264))
			encode(definitions)
		} else
			encode(new Tag(sharedData.version, 0x53687264))
		}
	}]
function typedArrayEncoder(tag, size) {
	if (!encode_isLittleEndianMachine && size > 1)
		tag -= 4 // the big endian equivalents are 4 less
	return {
		tag: tag,
		encode: function writeExtBuffer(typedArray, encode) {
			let length = typedArray.byteLength
			let offset = typedArray.byteOffset || 0
			let buffer = typedArray.buffer || typedArray
			encode(hasNodeBuffer ? encode_Buffer.from(buffer, offset, length) :
				new Uint8Array(buffer, offset, length))
		}
	}
}
function writeBuffer(buffer, makeRoom) {
	let length = buffer.byteLength
	if (length < 0x18) {
		target[encode_position++] = 0x40 + length
	} else if (length < 0x100) {
		target[encode_position++] = 0x58
		target[encode_position++] = length
	} else if (length < 0x10000) {
		target[encode_position++] = 0x59
		target[encode_position++] = length >> 8
		target[encode_position++] = length & 0xff
	} else {
		target[encode_position++] = 0x5a
		targetView.setUint32(encode_position, length)
		encode_position += 4
	}
	if (encode_position + length >= target.length) {
		makeRoom(encode_position + length)
	}
	// if it is already a typed array (has an ArrayBuffer), use that, but if it is an ArrayBuffer itself,
	// must wrap it to set it.
	target.set(buffer.buffer ? buffer : new Uint8Array(buffer), encode_position)
	encode_position += length
}

function insertIds(serialized, idsToInsert) {
	// insert the ids that need to be referenced for structured clones
	let nextId
	let distanceToMove = idsToInsert.length * 2
	let lastEnd = serialized.length - distanceToMove
	idsToInsert.sort((a, b) => a.offset > b.offset ? 1 : -1)
	for (let id = 0; id < idsToInsert.length; id++) {
		let referee = idsToInsert[id]
		referee.id = id
		for (let position of referee.references) {
			serialized[position++] = id >> 8
			serialized[position] = id & 0xff
		}
	}
	while (nextId = idsToInsert.pop()) {
		let offset = nextId.offset
		serialized.copyWithin(offset + distanceToMove, offset, lastEnd)
		distanceToMove -= 2
		let position = offset + distanceToMove
		serialized[position++] = 0xd8
		serialized[position++] = 28 // http://cbor.schmorp.de/value-sharing
		lastEnd = offset
	}
	return serialized
}
function writeBundles(start, encode) {
	targetView.setUint32(encode_bundledStrings.position + start, encode_position - encode_bundledStrings.position - start + 1) // the offset to bundle
	let writeStrings = encode_bundledStrings
	encode_bundledStrings = null
	encode(writeStrings[0])
	encode(writeStrings[1])
}

function encode_addExtension(extension) {
	if (extension.Class) {
		if (!extension.encode)
			throw new Error('Extension has no encode function')
		extensionClasses.unshift(extension.Class)
		extensions.unshift(extension)
	}
	addExtension(extension)
}
let defaultEncoder = new Encoder({ useRecords: false })
const encode = defaultEncoder.encode
const encodeAsIterable = defaultEncoder.encodeAsIterable
const encodeAsAsyncIterable = defaultEncoder.encodeAsAsyncIterable

;
const { NEVER, ALWAYS, DECIMAL_ROUND, DECIMAL_FIT } = FLOAT32_OPTIONS
const REUSE_BUFFER_MODE = 512
const RESET_BUFFER_MODE = 1024
const THROW_ON_ITERABLE = 2048



;// CONCATENATED MODULE: ./node_modules/cbor-x/iterators.js



/**
 * Given an Iterable first argument, returns an Iterable where each value is encoded as a Buffer
 * If the argument is only Async Iterable, the return value will be an Async Iterable.
 * @param {Iterable|Iterator|AsyncIterable|AsyncIterator} objectIterator - iterable source, like a Readable object stream, an array, Set, or custom object
 * @param {options} [options] - cbor-x Encoder options
 * @returns {IterableIterator|Promise.<AsyncIterableIterator>}
 */
function encodeIter (objectIterator, options = {}) {
  if (!objectIterator || typeof objectIterator !== 'object') {
    throw new Error('first argument must be an Iterable, Async Iterable, or a Promise for an Async Iterable')
  } else if (typeof objectIterator[Symbol.iterator] === 'function') {
    return encodeIterSync(objectIterator, options)
  } else if (typeof objectIterator.then === 'function' || typeof objectIterator[Symbol.asyncIterator] === 'function') {
    return encodeIterAsync(objectIterator, options)
  } else {
    throw new Error('first argument must be an Iterable, Async Iterable, Iterator, Async Iterator, or a Promise')
  }
}

function * encodeIterSync (objectIterator, options) {
  const encoder = new Encoder(options)
  for (const value of objectIterator) {
    yield encoder.encode(value)
  }
}

async function * encodeIterAsync (objectIterator, options) {
  const encoder = new Encoder(options)
  for await (const value of objectIterator) {
    yield encoder.encode(value)
  }
}

/**
 * Given an Iterable/Iterator input which yields buffers, returns an IterableIterator which yields sync decoded objects
 * Or, given an Async Iterable/Iterator which yields promises resolving in buffers, returns an AsyncIterableIterator.
 * @param {Iterable|Iterator|AsyncIterable|AsyncIterableIterator} bufferIterator
 * @param {object} [options] - Decoder options
 * @returns {IterableIterator|Promise.<AsyncIterableIterator}
 */
function decodeIter (bufferIterator, options = {}) {
  if (!bufferIterator || typeof bufferIterator !== 'object') {
    throw new Error('first argument must be an Iterable, Async Iterable, Iterator, Async Iterator, or a promise')
  }

  const decoder = new Decoder(options)
  let incomplete
  const parser = (chunk) => {
    let yields
    // if there's incomplete data from previous chunk, concatinate and try again
    if (incomplete) {
      chunk = Buffer.concat([incomplete, chunk])
      incomplete = undefined
    }

    try {
      yields = decoder.decodeMultiple(chunk)
    } catch (err) {
      if (err.incomplete) {
        incomplete = chunk.slice(err.lastPosition)
        yields = err.values
      } else {
        throw err
      }
    }
    return yields
  }

  if (typeof bufferIterator[Symbol.iterator] === 'function') {
    return (function * iter () {
      for (const value of bufferIterator) {
        yield * parser(value)
      }
    })()
  } else if (typeof bufferIterator[Symbol.asyncIterator] === 'function') {
    return (async function * iter () {
      for await (const value of bufferIterator) {
        yield * parser(value)
      }
    })()
  }
}

;// CONCATENATED MODULE: ./node_modules/cbor-x/index.js




// EXTERNAL MODULE: ./node_modules/buffer/index.js
var buffer = __webpack_require__(287);
// EXTERNAL MODULE: ./node_modules/events/events.js
var events = __webpack_require__(7);
;// CONCATENATED MODULE: ./lib/ooapi/OOAPI.Core.js
/*!
 * Open Ordinal API
 *
 * @author   Open Ordinal <https://openordinal.dev>
 * @license  MIT
 * @module   OOAPI
 */
/**
 * @module OOAPI
 */
//#region Imports and Exports
//Models - Base








//Models - Globals






//Models - Use Cases




// Loaders



//Imported Third-Party Modules



//#endregion
//#region Privates
let _baseUrl = "";
let _id = "";
let _collections = [];
let _variants = [];
let _compositions = [];
let _assets = [];
let _traits = [];
let _events = new events.EventEmitter();
let _type = OrdinalType.MULTI;
let _requestParams = new Map();
let _ready = false;
let _metadata = {};
let _currentVariant;
let _animationManager;
//#endregion
//#region Core Functionality - General
/**
 * Set the internal stored Ordinal Id.
 * @category Core
 * @param {string} id Ordinal Id
 */
function setId(id) { _id = id; _metadata = undefined; _type = OrdinalType.MULTI; }
/**
 * Get the internal stored Ordinal Id.
 * @category Core
 * @returns {string} Ordinal Id
 */
function getId() {
    if (_id == null || _id == "") {
        _id = getInscriptionIdFromUrl();
    }
    return _id;
}
/**
 * Set the internal stored Ordinal Type.
 * @category Core
 * @param {OrdinalType} type Ordinal Type
 */
function setType(type) { _type = type; }
/**
 * Get the internal stored Ordinal Type.
 * @category Core
 * @returns {OrdinalType} Ordinal Type
 */
function getType() { return _type; }
/**
 * Set the internal stored Metadata.
 * @category Core
 * @param {OOMD.Metadata} metadata Ordinal Metadata
 */
function setMetadata(metadata) {
    _metadata = metadata;
}
/**
 * Get the url parameters of the iframe.
 * @category Core
 * @returns A Map of all url parameters and it's values.
 */
function getRequestParams() { return _requestParams; }
//#endregion
//#region Core Functionality - Recursive
/**
 * Get the internal stored Metadata.
 * @category Core
 * @returns {Promise<OOMD.Metadata>} Ordinal Metadata
 */
async function getMetadata(id) {
    if (_metadata == undefined || id != undefined)
        _metadata = await getInscriptionMetadata(id);
    return _metadata;
}
/**
 * Get the Inscription info.
 * @category Core
 * @param {str4ing} inscriptionId The inscription Id
 * @param {string} baseUrl Optional base URL
 * @returns {Promise<any>} The Inscrption info
 */
async function getInscription(inscriptionId = getId(), baseUrl = _baseUrl) {
    try {
        const response = await fetch(`${baseUrl}/r/inscription/${inscriptionId}`);
        if (!response.ok) {
            return null;
        }
        const json = await response.json();
        return json;
    }
    catch (error) {
        throw error;
    }
}
;
/**
 * Fetches metadata information.
 * Defaults to using the ID obtained from `getId()` if an `inscriptionId` is not provided.
 * @category Core
 * @param {string} inscriptionId - Inscription to get metadata.
 *                                 Defaults to the ID of the page running it if none is given.
 * @param {string} baseUrl - Optional baseUrl
 * @returns {Promise<{OOMD.Metadata}>} A promise that resolves with the processed metadata or null if the metadata was not found.
 */
async function getInscriptionMetadata(inscriptionId = getId(), baseUrl = _baseUrl) {
    const response = await fetch(`${baseUrl}/r/metadata/${inscriptionId}`);
    if (!response.ok) {
        throw new Error("No inscription for Id");
    }
    const dataCBORasHexString = await response.json();
    const dataAsBuffer = buffer.Buffer.from(dataCBORasHexString, "hex");
    const data = decode(dataAsBuffer);
    return data;
}
;
/**
 * Fetches a single inscription on a sat based on index.
 * If index is not provided, it defaults to -1, which fetches the most recent inscription.
 * @category Core
 * @param {string} sat - The sat to fetch the inscription from.
 * @param {number} index - The index of the inscription to fetch. Defaults to -1.
 * @param {origin} baseUrl - Optinal baseUrl for the fetch.
 * @returns {Promise<{id: string}>} A promise that resolves with the fetched inscriptionId.
 */
async function getSatAt(sat, index = -1, baseUrl = _baseUrl) {
    const response = await fetch(`${baseUrl}/r/sat/${sat}/at/${index}`);
    return response.json();
}
;
/**
 * Fetches the page data for a specific SAT at a given page number.
 * @category Core
 * @param {string} sat - The SAT number to fetch the page data for.
 * @param {number} page - The page number to fetch. Defaults to 0.
 * @param {origin} baseUrl - Optional baseUrl for the fetch.
 * @returns {Promise<{ids: Array<string>, more: boolean, page: number}>}
 */
async function getSatPage(sat, page = 0, baseUrl = _baseUrl) {
    try {
        const response = await fetch(`${baseUrl}/r/sat/${sat}/${page}`);
        if (!response.ok) {
            throw new Error('Ord API call was unsuccesful');
        }
        const data = await response.json();
        const ids = data.ids;
        const more = data.more;
        const pageData = data.page;
        return { ids, more, page: pageData };
    }
    catch (error) {
        throw error;
    }
}
;
/**
 * Fetches all the inscriptions on a sat.
 * The function fetches the inscriptions in pages, and continues fetching until there are no more pages.
 * @category Core
 * @param {string} sat - The sat to fetch the inscriptions from.
 * @param {origin} baseUrl - Optional baseUrl for the fetch.
 * @returns {Promise<Array<string>>} A promise that resolves with an array of the IDs of the inscriptions.
 */
async function getSatAll(sat, baseUrl = _baseUrl) {
    let ids = [];
    let more = true;
    let page = 0;
    while (more) {
        await getSatPage(sat, page, baseUrl).then(data => {
            if (data != null) {
                ids = ids.concat(data.ids);
                more = data.more;
                page++;
            }
        }).catch(error => {
            more = false;
        });
    }
    return ids;
}
;
/**
 * Fetches the parents of a given inscription.
 * If no inscription ID is provided, it defaults to using the ID obtained from `getId()`.
 * @category Core
 * @param {string} inscriptionId - The ID of the inscription to get the parents of.
 *                                 Defaults to the ID of the page running it if none is given.
 * @param {number} page - The page number to fetch the parents from.
 * @param {origin} baseUrl - Optional baseUrl for the fetch.
 * @returns {Promise<{ids: Array<string>, more: boolean, page: number}>}
 */
async function getParentsPage(inscriptionId = getId(), page = 0, baseUrl = _baseUrl) {
    let ids = [];
    let more = true;
    try {
        const response = await fetch(`${baseUrl}/r/parents/${inscriptionId}/${page}`);
        if (!response.ok) {
            throw new Error('Ord API call was unsuccesful');
        }
        const data = await response.json();
        ids = ids.concat(data.ids);
        more = data.more;
        page = data.page;
    }
    catch (error) {
        more = false;
    }
    return { ids, more, page };
}
;
/**
 * Fetches all the parents of a given inscription.
 * @category Core
 * @param {string} inscriptionId - The ID of the inscription to get the parents of.
 *                                 Defaults to the ID obtained from `getId()`.
 * @param {origin} baseUrl - Optional baseUrl for the fetch.
 * @returns {Promise<Array<string>>} A promise that resolves with an array of the IDs of the parents.
 */
async function getParentsAll(inscriptionId = getId(), baseUrl = _baseUrl) {
    let ids = [];
    let more = true;
    let page = 0;
    while (more) {
        await getParentsPage(inscriptionId, page, baseUrl).then(data => {
            if (data != null) {
                ids = ids.concat(data.ids);
                more = data.more;
                page++;
            }
        }).catch(error => {
            more = false;
        });
    }
    return ids;
}
;
/**
 * Fetches the children of a given inscription.
 * If no inscription ID is provided, it defaults to using the ID obtained from `getId()`.
 * @category Core
 * @param {string} inscriptionId - The ID of the inscription to get the children of.
 *                                 Defaults to the ID of the page running it if none is given.
 * @param {number} page - The page number to fetch the children from.
 * @param {origin} baseUrl - Optional baseUrl for the fetch.
 * @returns {Promise<{ids: Array<string>, more: boolean, page: number}>}
 */
async function getChildrenPage(inscriptionId = getId(), page = 0, baseUrl = _baseUrl) {
    let ids = [];
    let more = true;
    try {
        const response = await fetch(`${baseUrl}/r/children/${inscriptionId}/${page}`);
        if (!response.ok) {
            throw new Error('Ord API call was unsuccesful');
        }
        const data = await response.json();
        ids = ids.concat(data.ids);
        more = data.more;
        page = data.page;
    }
    catch (error) {
        more = false;
    }
    return { ids, more, page };
}
;
/**
 * Fetches all the children of a given inscription.
 * @category Core
 * @param {string} inscriptionId - The ID of the inscription to get the children of.
 *                                 Defaults to the ID obtained from `getId()`.
 * @param {string} baseUrl - Optional baseUrl for the fetch.
 * @returns {Promise<Array<string>>} A promise that resolves with an array of the IDs of the children.
 */
async function getChildrenAll(inscriptionId = getId(), baseUrl = _baseUrl) {
    let ids = [];
    let more = true;
    let page = 0;
    while (more) {
        await getChildrenPage(inscriptionId, page, baseUrl).then(data => {
            if (data != null) {
                ids = ids.concat(data.ids);
                more = data.more;
                page++;
            }
        }).catch(error => {
            more = false;
        });
    }
    return ids;
}
;
/**
 * Fetches all information about an inscription, including children, sat inscriptions, metadata and its id.
 * Defaults to using the ID obtained from `getId()` if an `inscriptionId` is not provided.
 * @category Core
 * @param {string} inscriptionId - Inscription to get all information.
 *                                 Defaults to the ID of the page running it if none is given.
 * @param {string} baseUrl - Optional baseUrl for the fetch
 * @returns {Promise<{inscription: {charms: Array<string>, content_type: string, content_length: number, fee: number, height: number, number: number, output: string, sat: null | string, satpoint: string, timestamp: number, value: number} | null, children: Array<string>, satIds: Array<string>, metadata: Object | null, id: <string>}>} A promise that resolves with all the information about the inscription.
 */
async function getOOMD(inscriptionId = getId(), baseUrl = _baseUrl) {
    let res = {};
    try {
        //TODO: Read en project OOMD
        // const metadata = await getInscriptionMetadata(inscriptionId, baseUrl);
        // res.metadata = metadata;
        //res = OOMD.parse(metadata);
    }
    catch (error) {
    }
    res.id = inscriptionId;
    return res;
}
;
/**
 * Fetches all information about an inscription, including children, sat inscriptions, metadata and its id.
 * Defaults to using the ID obtained from `getId()` if an `inscriptionId` is not provided.
 * @category Core
 * @param {string} inscriptionId - Inscription to get all information.
 *                                 Defaults to the ID of the page running it if none is given.
 * @param {string} baseUrl - Optional baseUrl for the fetch
 * @returns {Promise<{inscription: {charms: Array<string>, content_type: string, content_length: number, fee: number, height: number, number: number, output: string, sat: null | string, satpoint: string, timestamp: number, value: number} | null, children: Array<string>, satIds: Array<string>, metadata: Object | null, id: <string>}>} A promise that resolves with all the information about the inscription.
 */
async function getAll(inscriptionId = getId(), baseUrl = _baseUrl) {
    let res = {};
    res.id = inscriptionId;
    try {
        const inscription = await getInscription(inscriptionId, baseUrl);
        res.inscription = inscription;
        const parents = await getParentsAll(inscriptionId, baseUrl);
        res.parents = parents;
        const children = await getChildrenAll(inscriptionId, baseUrl);
        res.children = children;
        const sat = await getSatAll(inscription.sat, baseUrl);
        res.satIds = sat;
        const metadata = await getInscriptionMetadata(inscriptionId, baseUrl);
        res.metadata = metadata;
    }
    catch (error) {
        throw error;
    }
    return res;
}
;
/**
 * Fetches information about a specific block by block height or block hash.
 * @category Core
 * @param {string} blockInfo - The block height or block hash to get information about.
 * @param {string} baseUrl - Optional baseUrl for the fetch.
 * @returns {Promise<{bits: number, chainwork: number, confirmations: number, difficulty: number, hash: string, height: number, median_time: number, merkle_root: string, next_block: string, nonce: number, previous_block: string, target: string, timestamp: number, transaction_count: number, version: number} | null>} A promise that resolves with the information about the block or null if not found.
 */
async function getBlockInfo(blockInfo, baseUrl = _baseUrl) {
    const url = `${baseUrl}/r/blockinfo/${blockInfo}`;
    const response = await fetch(url);
    if (!response.ok) {
        if (response.status === 404) {
            throw new Error('Ord API call returned no BlockInfo');
        }
        throw new Error('Ord API call was unsuccesful');
    }
    return response.json();
}
;
/**
 * Fetches the block hash at a given block height.
 * @category Core
 * @param {number} height - The height of the block to get the hash of.
 * @param {string} baseUrl - Optional baseUrl for the fetch.
 * @returns {Promise<string | null>} A promise that resolves with the hash of the block or null if 404.
 */
async function getBlockHash(height, baseUrl = _baseUrl) {
    const url = `${baseUrl}/r/blockhash/${height}`;
    const response = await fetch(url);
    if (!response.ok) {
        if (response.status === 404) {
            throw new Error('Ord API call returned no BlockHash');
        }
        throw new Error('Ord API call was unsuccesful');
    }
    const hash = await response.json();
    return hash;
}
;
/**
 * Fetches the latest block height.
 * @category Core
 * @param {string} baseUrl - The baseUrl for the fetch.
 * @returns {Promise<number>} A promise that resolves with the height of the latest block.
 */
async function getBlockHeight(baseUrl = _baseUrl) {
    try {
        const response = await fetch(`${baseUrl}/r/blockheight`);
        if (!response.ok) {
            throw new Error('Remote API call was unsuccesful');
        }
        const height = await response.text();
        return Number(height);
    }
    catch (error) {
        throw error;
    }
}
;
/**
 * Fetches the UNIX time stamp of the latest block.
 * @category Core
 * @param {string} baseUrl - The baseUrl for the fetch.
 * @returns {Promise<number>} A promise that resolves with the UNIX time stamp of the latest block.
 */
async function getBlockTime(baseUrl = _baseUrl) {
    try {
        const response = await fetch(`${baseUrl}/r/blocktime`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const time = await response.text();
        return Number(time);
    }
    catch (error) {
        throw error;
    }
}
;
/**
 * Get the latest Id for a supplied Id trough Sat endpoint.
 * @category Core
 * @param {string} id Inscription Id
 * @returns {string} Latest Id for Inscription
 */
async function getLatestId(id) {
    const inscription = await getInscription(id);
    if (inscription.sat !== null) {
        return (await getSatAt(inscription.sat)).id;
    }
    return id;
}
/**
 * Get the path for the latest inscription for a given path.
 * @category Core
 * @param {string} path Path to inscription
 * @returns {string} Path to inscription
 */
async function getLatestPath(path) {
    if (path.startsWith("/content/")) {
        let id = path.substring("/content/".length);
        id = await getLatestId(id);
        path = `/content/${id}`;
    }
    return path;
}
/**
 * Detects if Ordinal API Extensions is available in Origin
 * @category Core
 * @returns {bool} True/False
 */
async function isOrdinalAPIExtensionsAvailable() {
    const response = await fetch('/content/' + _id, {
        method: 'HEAD'
    });
    if (response.headers.get("X-Sagaverse-Ordinal-API") != undefined && response.headers.get("X-Sagaverse-Ordinal-API") == "true") {
        return true;
    }
    return false;
}
//#endregion
//#region Core Functionality - Iframe
/**
 * Detects and extract Open Ordinal API if present in an Iframe.
 * @category Core
 * @param iframe
 * @returns
 */
async function getOrdinalApiFromIFrame(iframe) {
    return new Promise((resolve, reject) => {
        if (typeof iframe === 'undefined') {
            reject("iframe is invalid");
            return;
        }
        function checkIframeLoaded() {
            // Get a handle to the iframe element
            var iframeDoc = iframe.contentDocument || iframe.contentWindow?.document;
            // Check if loading is complete
            if (typeof iframeDoc !== 'undefined' && iframeDoc.readyState == 'complete') {
                let ordinal = iframe.contentWindow;
                let whenLoaded = () => {
                    // TODO - Needed for Tiny Vikings hosted offchain that is not updated yet.
                    let ooAPi = ordinal.ooAPI;
                    if (typeof ooAPi !== 'undefined') {
                        if (ooAPi.isReady()) {
                            resolve(ooAPi);
                        }
                        else {
                            ooAPi.on('ready', () => {
                                resolve(ooAPi);
                            });
                        }
                    }
                    else {
                        reject("OOAPi not available.");
                    }
                };
                if (iframeDoc.readyState == "complete") {
                    whenLoaded();
                }
                else {
                    ordinal.onload = whenLoaded;
                }
                return;
            }
            window.setTimeout(checkIframeLoaded, 100);
        }
        checkIframeLoaded();
    });
}
//#endregion
//#region Core Functionality - Import and Fetch
/**
 * Imports a JavaScript module.
 * @category Core
 * @param {string }path Path to module to import
 * @returns {Promise<any>} The module imported
 */
async function importLatest(path) {
    return await import(/* webpackIgnore: true */ await getLatestPath(path));
}
/**
 * Fetch a path and return the response.
 * @category Core
 * @param {string} path The path to fetch
 * @returns {Promise<Response>} The response
 */
async function fetchLatest(path) {
    return await fetch(await getLatestPath(path));
}
//#endregion
//#region Core Functionality - Cache
/**
 * A cache helper to cache single functions and their return variable.
 * @category Core
 * @param func The function to cache
 * @returns A function which upon subsequent calls with the same id parameter returns the result from the first call.
 */
function cached(func) {
    let cache = {};
    return id => {
        var promise = cache[id];
        if (!promise) {
            promise = func(id);
            cache[id] = promise;
        }
        return promise;
    };
}
//#endregion
//#region Variants
/**
 * Add a Variant to memory model
 * @category Variants
 * @param {Variant} variant The Variant to add
 */
async function addVariant(variant) {
    var item = new Variant(variant);
    _variants.push(item);
    return item;
}
/**
 * Remove a Variant from memory model
 * @category Variants
 * @param {Variant} variant The Variant to remove
 */
async function removeVariant(variant) {
    _variants = _variants.filter(v => v !== variant);
}
/**
 * Get a Variant from memory model
 * @category Variants
 * @param {Variant} variant The Variant to get
 * @returns {Variant} The Variant
 */
async function getVariant(id) {
    return _variants.find(v => v.id === id);
}
/**
 * Get all Variants from memory model
 * @category Variants
 * @returns {Variant[]} The Variant
 */
async function getVariants() {
    return _variants;
}
/**
 * Clear all Variants from memory model
 * @category Variants
 */
async function clearVariants() { _variants = []; }
/**
 * Set which Variant should be visible.
 * @category Variants
 * @param {Variant | string | number} variant - The variant that should be visible. Could be the id of a Variant, an index or a particular Variant.
 */
async function setDisplayedVariant(variant) {
    // Requested to display a given variant.
    let nextVariant;
    if (!variant || variant === '') {
        // show first as default
        nextVariant = _variants[0];
    }
    else if (variant == 'none') {
        // nothing to show
    }
    else if (typeof variant === 'number') {
        // select by index
        let idx = Number(variant);
        nextVariant = _variants[idx] ?? _variants[0];
    }
    else if (typeof variant === 'string') {
        // select by id
        nextVariant = await getVariant(variant);
    }
    else if (variant instanceof Variant) {
        // select by id
        if (variant.id != null)
            nextVariant = await getVariant(variant.id);
    }
    if (nextVariant != _currentVariant) {
        await _currentVariant?.hide();
        _currentVariant = nextVariant;
        await _currentVariant?.show();
    }
}
/**
 * Get the currently visible Variant (if any).
 * @category Variants
 * @returns {Variant} The Variant that currently is visible.
 */
async function getDisplayedVariant() {
    return _currentVariant;
}
//#endregion
//#region Compositions
/**
 * Add a Composition to memory model
 * @category Compositions
 * @param {Composition} composition The Composition to add
 */
async function addComposition(composition) {
    var item = new Composition(composition);
    _compositions.push(item);
    return item;
}
/**
 * Remove a Composition to memory model
 * @category Compositions
 * @param {Composition} composition The Composition to remove
 */
async function removeComposition(composition) {
    _compositions = _compositions.filter(c => c !== composition);
}
/**
 * Get a Composition from memory model
 * @category Compositions
 * @param compositions The Composition to find
 * @returns {Composition} The Composition
 */
async function getComposition(id) {
    return _compositions.find(c => c.id === id);
}
/**
 * Get all Compositions from memory model
 * @category Compositions
 * @returns {Composition[]} The Compositions
 */
async function getCompositions() {
    return _compositions;
}
/**
 * Clear all Compositions from memory model
 * @category Compositions
 */
async function clearCompositions() { _compositions = []; }
//#endregion
//#region Assets
/**
 * Add an Asset to memory model
 * @category Assets
 * @param  {Asset} asset The Asset to add
 */
async function addAsset(asset) {
    var item = new Asset(asset);
    _assets.push(item);
    return item;
}
/**
 * Remove an Asset from memory model
 * @category Assets
 * @param {Asset} asset The addet to remove
 */
async function removeAsset(asset) {
    _assets = _assets.filter(a => a !== asset);
}
/**
 * Get an Asset from memory model
 * @category Assets
 * @param {string} id The Asset to find
 * @returns {Asset} The Asset
 */
async function getAsset(id) {
    return _assets.find(a => a.id === id);
}
/**
 * Get all Assets from memory model
 * @category Assets
 * @returns {Promise<Asset[]>} The Assets
 */
async function getAssets() {
    return _assets;
}
/**
 * Remove all Assets from memory model
 * @category Assets
 */
async function clearAssets() { _assets = []; }
//#endregion
//#region Traits
/**
 * Add a Trait to memory model
 * @category Traits
 * @param {Trait} trait The Trait to add
 */
async function addTrait(trait) {
    var item = new Trait(trait);
    _traits.push(item);
    return item;
}
/**
 * Remove a Trait from memory model
 * @category Traits
 * @param {Trait} trait The Trait to remove
 */
async function removeTrait(trait) {
    _traits = _traits.filter(t => t !== trait);
}
/**
 * Get a Trait from memory model
 * @category Traits
 * @param {Trait} trait The Trait to find
 * @returns The Trait
 */
async function getTrait(id) {
    return _traits.find(t => t.id === id);
}
/**
 * Get all Traits from memory model
 * @category Traits
 * @returns {Trait[]} The Traits
 */
async function getTraits() {
    return _traits;
}
/**
 * Remove all Traits from memory model
 * @category Traits
 */
async function clearTraits() { _traits = []; }
//#endregion
//#region Collections
/**
 * Add a Collection
 * @category Collections
 * @param {Collection} collection Add a Collection
 * @returns {Collection} The Collections
 */
async function addCollection(collection) {
    var item = new Collection(collection);
    _collections.push(item);
    return item;
}
/**
 * Get a Collection
 * @category Collections
 * @param {string} id The collection to get
 * @returns {Collection | undefined} The Collection
 */
async function getCollection(id) {
    return _collections.find(c => c.id === id);
}
/**
 * Get all Collections
 * @category Collections
 * @returns {Collection[]} The Collections
 */
async function getCollections() {
    return _collections;
}
/**
 * Remove a Collection
 * @category Collections
 * @param {Collection} collection The Collection to be removed
 */
async function removeCollection(collection) {
    _collections = _collections.filter(t => t !== collection);
}
/**
 * Remove all Collections
 * @category Collections
 */
async function clearCollections() {
    _collections = [];
}
//#endregion
//#region Animations
function setAnimationTemplate(animationTemplateMap) {
    if (!_animationManager) {
        _animationManager = new AnimationManager();
    }
    _animationManager.setAnimationTemplate(animationTemplateMap);
}
function getAnimationManager() {
    if (!_animationManager) {
        _animationManager = new AnimationManager();
    }
    return _animationManager;
}
//#endregion
//#region Events Wrap Helpers
function on(name, handler) {
    _events.addListener(name, handler);
}
function off(name, handler) {
    _events.removeListener(name, handler);
}
function isReady() {
    return _ready;
}
/**
 * Called by the Ordinal when it's setup is done.
 */
async function ready() {
    _ready = true;
    // TODO Review. This is to not load the default variant, but the one specified in the URL.
    let variantToShow = _requestParams.get('variant');
    if (variantToShow) {
        setDisplayedVariant(variantToShow);
    }
    else if (_variants.length > 0) {
        setDisplayedVariant(_variants[0]);
    }
    /* TODO
    if (_requestParams.has('animation')) {
    }
    */
    /* TODO Figure out this one.
    ** Display a given composition instead of a variant?
    if (_requestParams.has('composition')) {
    }
    */
    _events.emit("ready");
}
//#endregion
//#region General Helpers
function getInscriptionIdFromUrl() {
    const parts = window.location.pathname.split("/");
    if (parts.length >= 3 && (parts[1] === "content" || parts[1] === "preview" || parts[1] === "inscription")) {
        return parts[2];
    }
    else {
        console.error("URL does not contain a valid inscription ID.", parts);
        return "";
    }
}
function getURLParams() {
    try {
        const searchParams = new URLSearchParams(window.location.search);
        searchParams.forEach((value, key) => {
            _requestParams.set(key.toLowerCase(), value.toLowerCase());
        });
    }
    catch (error) {
        console.error("Error parsing URL parameters:", error);
    }
}
//#endregion
//#region On Load Triggers
_baseUrl = window.location.origin;
getURLParams();
//#endregion
//# sourceMappingURL=OOAPI.Core.js.map
;// CONCATENATED MODULE: ./lib/ooapi/OOAPI.js
/*!
 * Open Ordinal API
 *
 * @author   Open Ordinal <https://openordinal.dev>
 * @license  MIT
 * @module   OOAPI
 */


/**
 * Assign OOAPI to window
 */
window.ooAPI = OOAPI_Core_namespaceObject;
//# sourceMappingURL=OOAPI.js.map
var __webpack_exports__Artist = __webpack_exports__.Artist;
var __webpack_exports__Asset = __webpack_exports__.Asset;
var __webpack_exports__Audio = __webpack_exports__.Audio;
var __webpack_exports__Collection = __webpack_exports__.Collection;
var __webpack_exports__Composition = __webpack_exports__.Composition;
var __webpack_exports__Image = __webpack_exports__.Image;
var __webpack_exports__OOMD = __webpack_exports__.OOMD;
var __webpack_exports__Ordinal = __webpack_exports__.Ordinal;
var __webpack_exports__OrdinalType = __webpack_exports__.OrdinalType;
var __webpack_exports__Release = __webpack_exports__.Release;
var __webpack_exports__Sprite = __webpack_exports__.Sprite;
var __webpack_exports__SpriteAnimation = __webpack_exports__.SpriteAnimation;
var __webpack_exports__SpriteType = __webpack_exports__.SpriteType;
var __webpack_exports__Track = __webpack_exports__.Track;
var __webpack_exports__Trait = __webpack_exports__.Trait;
var __webpack_exports__Variant = __webpack_exports__.Variant;
var __webpack_exports__Video = __webpack_exports__.Video;
var __webpack_exports__addAsset = __webpack_exports__.addAsset;
var __webpack_exports__addCollection = __webpack_exports__.addCollection;
var __webpack_exports__addComposition = __webpack_exports__.addComposition;
var __webpack_exports__addTrait = __webpack_exports__.addTrait;
var __webpack_exports__addVariant = __webpack_exports__.addVariant;
var __webpack_exports__cached = __webpack_exports__.cached;
var __webpack_exports__clearAssets = __webpack_exports__.clearAssets;
var __webpack_exports__clearCollections = __webpack_exports__.clearCollections;
var __webpack_exports__clearCompositions = __webpack_exports__.clearCompositions;
var __webpack_exports__clearTraits = __webpack_exports__.clearTraits;
var __webpack_exports__clearVariants = __webpack_exports__.clearVariants;
var __webpack_exports__fetchLatest = __webpack_exports__.fetchLatest;
var __webpack_exports__getAll = __webpack_exports__.getAll;
var __webpack_exports__getAsset = __webpack_exports__.getAsset;
var __webpack_exports__getAssets = __webpack_exports__.getAssets;
var __webpack_exports__getBlockHash = __webpack_exports__.getBlockHash;
var __webpack_exports__getBlockHeight = __webpack_exports__.getBlockHeight;
var __webpack_exports__getBlockInfo = __webpack_exports__.getBlockInfo;
var __webpack_exports__getBlockTime = __webpack_exports__.getBlockTime;
var __webpack_exports__getChildrenAll = __webpack_exports__.getChildrenAll;
var __webpack_exports__getChildrenPage = __webpack_exports__.getChildrenPage;
var __webpack_exports__getCollection = __webpack_exports__.getCollection;
var __webpack_exports__getCollections = __webpack_exports__.getCollections;
var __webpack_exports__getComposition = __webpack_exports__.getComposition;
var __webpack_exports__getCompositions = __webpack_exports__.getCompositions;
var __webpack_exports__getDisplayedVariant = __webpack_exports__.getDisplayedVariant;
var __webpack_exports__getId = __webpack_exports__.getId;
var __webpack_exports__getInscription = __webpack_exports__.getInscription;
var __webpack_exports__getLatestId = __webpack_exports__.getLatestId;
var __webpack_exports__getLatestPath = __webpack_exports__.getLatestPath;
var __webpack_exports__getMetadata = __webpack_exports__.getMetadata;
var __webpack_exports__getOOMD = __webpack_exports__.getOOMD;
var __webpack_exports__getOrdinalApiFromIFrame = __webpack_exports__.getOrdinalApiFromIFrame;
var __webpack_exports__getParentsAll = __webpack_exports__.getParentsAll;
var __webpack_exports__getParentsPage = __webpack_exports__.getParentsPage;
var __webpack_exports__getRequestParams = __webpack_exports__.getRequestParams;
var __webpack_exports__getSatAll = __webpack_exports__.getSatAll;
var __webpack_exports__getSatAt = __webpack_exports__.getSatAt;
var __webpack_exports__getSatPage = __webpack_exports__.getSatPage;
var __webpack_exports__getTrait = __webpack_exports__.getTrait;
var __webpack_exports__getTraits = __webpack_exports__.getTraits;
var __webpack_exports__getType = __webpack_exports__.getType;
var __webpack_exports__getVariant = __webpack_exports__.getVariant;
var __webpack_exports__getVariants = __webpack_exports__.getVariants;
var __webpack_exports__importLatest = __webpack_exports__.importLatest;
var __webpack_exports__isOrdinalAPIExtensionsAvailable = __webpack_exports__.isOrdinalAPIExtensionsAvailable;
var __webpack_exports__removeAsset = __webpack_exports__.removeAsset;
var __webpack_exports__removeCollection = __webpack_exports__.removeCollection;
var __webpack_exports__removeComposition = __webpack_exports__.removeComposition;
var __webpack_exports__removeTrait = __webpack_exports__.removeTrait;
var __webpack_exports__removeVariant = __webpack_exports__.removeVariant;
var __webpack_exports__setDisplayedVariant = __webpack_exports__.setDisplayedVariant;
var __webpack_exports__setId = __webpack_exports__.setId;
var __webpack_exports__setMetadata = __webpack_exports__.setMetadata;
var __webpack_exports__setType = __webpack_exports__.setType;
export { __webpack_exports__Artist as Artist, __webpack_exports__Asset as Asset, __webpack_exports__Audio as Audio, __webpack_exports__Collection as Collection, __webpack_exports__Composition as Composition, __webpack_exports__Image as Image, __webpack_exports__OOMD as OOMD, __webpack_exports__Ordinal as Ordinal, __webpack_exports__OrdinalType as OrdinalType, __webpack_exports__Release as Release, __webpack_exports__Sprite as Sprite, __webpack_exports__SpriteAnimation as SpriteAnimation, __webpack_exports__SpriteType as SpriteType, __webpack_exports__Track as Track, __webpack_exports__Trait as Trait, __webpack_exports__Variant as Variant, __webpack_exports__Video as Video, __webpack_exports__addAsset as addAsset, __webpack_exports__addCollection as addCollection, __webpack_exports__addComposition as addComposition, __webpack_exports__addTrait as addTrait, __webpack_exports__addVariant as addVariant, __webpack_exports__cached as cached, __webpack_exports__clearAssets as clearAssets, __webpack_exports__clearCollections as clearCollections, __webpack_exports__clearCompositions as clearCompositions, __webpack_exports__clearTraits as clearTraits, __webpack_exports__clearVariants as clearVariants, __webpack_exports__fetchLatest as fetchLatest, __webpack_exports__getAll as getAll, __webpack_exports__getAsset as getAsset, __webpack_exports__getAssets as getAssets, __webpack_exports__getBlockHash as getBlockHash, __webpack_exports__getBlockHeight as getBlockHeight, __webpack_exports__getBlockInfo as getBlockInfo, __webpack_exports__getBlockTime as getBlockTime, __webpack_exports__getChildrenAll as getChildrenAll, __webpack_exports__getChildrenPage as getChildrenPage, __webpack_exports__getCollection as getCollection, __webpack_exports__getCollections as getCollections, __webpack_exports__getComposition as getComposition, __webpack_exports__getCompositions as getCompositions, __webpack_exports__getDisplayedVariant as getDisplayedVariant, __webpack_exports__getId as getId, __webpack_exports__getInscription as getInscription, __webpack_exports__getLatestId as getLatestId, __webpack_exports__getLatestPath as getLatestPath, __webpack_exports__getMetadata as getMetadata, __webpack_exports__getOOMD as getOOMD, __webpack_exports__getOrdinalApiFromIFrame as getOrdinalApiFromIFrame, __webpack_exports__getParentsAll as getParentsAll, __webpack_exports__getParentsPage as getParentsPage, __webpack_exports__getRequestParams as getRequestParams, __webpack_exports__getSatAll as getSatAll, __webpack_exports__getSatAt as getSatAt, __webpack_exports__getSatPage as getSatPage, __webpack_exports__getTrait as getTrait, __webpack_exports__getTraits as getTraits, __webpack_exports__getType as getType, __webpack_exports__getVariant as getVariant, __webpack_exports__getVariants as getVariants, __webpack_exports__importLatest as importLatest, __webpack_exports__isOrdinalAPIExtensionsAvailable as isOrdinalAPIExtensionsAvailable, __webpack_exports__removeAsset as removeAsset, __webpack_exports__removeCollection as removeCollection, __webpack_exports__removeComposition as removeComposition, __webpack_exports__removeTrait as removeTrait, __webpack_exports__removeVariant as removeVariant, __webpack_exports__setDisplayedVariant as setDisplayedVariant, __webpack_exports__setId as setId, __webpack_exports__setMetadata as setMetadata, __webpack_exports__setType as setType };

//# sourceMappingURL=open-ordinal-api.js.map