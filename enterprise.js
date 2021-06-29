import React, {
  useState,
  useEffect,
  useRef,
  useContext,
  createContext,
  useImperativeHandle,
  Component,
  createRef,
  useReducer,
  cloneElement,
  Fragment as Fragment$2,
  memo,
  useMemo,
  forwardRef,
} from 'react'
import ReactIs from 'react-is'
import shallow from 'zustand/shallow'
import mitt from 'mitt'
import {jsx, jsxs as jsxs$1, Fragment as Fragment$1} from 'react/jsx-runtime'
import _get from 'dlv'
import axios from 'axios'
import UAParser from 'ua-parser-js'
import _defineProperty from '@babel/runtime/helpers/defineProperty'
import useDimensions from 'react-cool-dimensions'
import {ResizeObserver} from '@juggle/resize-observer'
import {jsxs, jsx as jsx$1, Fragment} from '@emotion/react/jsx-runtime'
import {css, ClassNames, keyframes} from '@emotion/react'
import {cx} from '@emotion/css'
import {createPortal} from 'react-dom'
import classnames from 'classnames'
import create from 'zustand/vanilla'
import createHook from 'zustand'
import {devtools, redux} from 'zustand/middleware'
import useOnclickOutside from 'react-cool-onclickoutside'

const combineReducer = structure => {
  const props = Object.keys(structure)
  return (state, action) => {
    const newState = props.reduce((res, name) => {
      res[name] = structure[name](state[name], action)
      return res
    }, {})
    const isChange = props.some(name => state[name] !== newState[name])
    return isChange ? newState : state
  }
}

const queryString = object =>
  object &&
  typeof object === 'object' &&
  Object.getOwnPropertyNames(object)
    .map(name => `${name}=${encodeURIComponent(object[name])}`)
    .join('&')
const catchBy = error => func => (...args) => {
  try {
    return func.apply(undefined, args)
  } catch (e) {
    return error(e)
  }
}
function scope(min, value, max) {
  if (min > value) return min
  if (max < value) return max
  return value
}
function convertToTimeString(date, fmt) {
  return fmt
    .replace(/YYYY/g, `0000${date.getFullYear()}`.slice(-4))
    .replace(/MM/g, `00${date.getMonth() + 1}`.slice(-2))
    .replace(/DD/g, `00${date.getDate()}`.slice(-2))
    .replace(/HH/g, `00${date.getHours()}`.slice(-2))
    .replace(/mm/g, `00${date.getMinutes()}`.slice(-2))
    .replace(/SS/g, `00${date.getSeconds()}`.slice(-2))
}
function convertToSeconds(timeString) {
  const [hours, minutes, seconds] = timeString.split(':').map(parseFloat)
  return hours * 3600 + minutes * 60 + seconds
}
function isInScope(min, value, max) {
  return min <= value && value <= max
}
function getPopoverPosition(rect, target, boundary) {
  const rectX = rect.x || rect.left
  const boundaryX = boundary.x || boundary.left
  const maxLeft = boundary.width - rect.width
  const targetCenter = (target.left + target.right) / 2 - boundaryX
  const center = rectX + rect.width / 2 - boundaryX
  const alignLeft = rectX + (targetCenter - center) - boundaryX
  return {
    left: Math.max(0, Math.min(alignLeft, maxLeft)),
    top: target.top - rect.height,
  }
} // eslint-disable-next-line consistent-return
const debounce = (callback, ms) => {
  let lastTouchEnd = 0
  return event => {
    const now = new Date().getTime()

    if (now - lastTouchEnd <= ms) {
      event.preventDefault()
    } else {
      callback(event)
      lastTouchEnd = now
    }
  }
}

/* eslint-disable indent */
const FairplayKeySystem = {
  prepareContentId: contentUri => {
    const uriParts = contentUri.split('://')
    const contentId = uriParts[1] || ''
    return uriParts[0].slice(-3).toLowerCase() === 'skd' ? contentId : ''
  },
  prepareCertificate: cert => new Uint8Array(cert),
  prepareMessage: (keyMessageEvent, keySession) => {
    const spc = encodeURIComponent(keyMessageEvent.messageBase64Encoded)
    const assetId = encodeURIComponent(keySession.contentId)
    return `spc=${spc}&asset_id=${assetId}`
  },
  prepareLicense: license => {
    if (license.substr(0, 5) === '<ckc>' && license.substr(-6) === '</ckc>') {
      return license.slice(5, -6)
    }

    return license
  },
}
/**
 * @typedef {'HW_SECURE_ALL'|'HW_SECURE_DECODE'|'HW_SECURE_CRYPTO'|'SW_SECURE_DECODE'|'SW_SECURE_CRYPTO'|''} WidevineLevels
 * @description Check if device supports hardware widevine (Level 1)
 * @param {object}
 * @returns {Promise<WidevineLevels>}
 */

const getWidevineLevel = async () => {
  const levels = [
    'HW_SECURE_ALL',
    'HW_SECURE_DECODE',
    'HW_SECURE_CRYPTO',
    'SW_SECURE_DECODE',
    'SW_SECURE_CRYPTO',
  ]

  try {
    var _keySystem$getConfigu

    const keySystem = await navigator.requestMediaKeySystemAccess(
      'com.widevine.alpha',
      levels.map(robustness => ({
        videoCapabilities: [
          {
            contentType: 'video/mp4;codecs="avc1.4d401e"',
            robustness,
          },
        ],
      }))
    )
    return (
      ((_keySystem$getConfigu = keySystem.getConfiguration()) === null ||
      _keySystem$getConfigu === void 0
        ? void 0
        : _keySystem$getConfigu.videoCapabilities[0].robustness) || ''
    )
  } catch (e) {
    return ''
  }
}

const getDeviceLevel = level => {
  var _level$startsWith

  return level !== null &&
    level !== void 0 &&
    (_level$startsWith = level.startsWith) !== null &&
    _level$startsWith !== void 0 &&
    _level$startsWith.call(level, 'HW')
    ? 1
    : 3
}

const getRobustness = widevine => {
  const {level} = widevine
  const deviceLevel = getDeviceLevel(level)
  const policy = widevine.policy || 'device'
  const blocked = (widevine.blockedDevices || []).some(name =>
    navigator.userAgent.includes(name)
  )

  switch (policy) {
    case 'auto':
      return undefined

    case 'force-l3':
      return deviceLevel === 3 && level ? level : 'SW_SECURE_DECODE'

    case 'force-l1':
      return deviceLevel === 1 ? level : 'HW_SECURE_DECODE'

    default:
      // policy is 'device' by default
      return blocked ? 'SW_SECURE_DECODE' : level
  }
}

const getDrmConfig = (config, {host, widevine = {}, fairplay = {}}) => {
  const videoRobustness = getRobustness(widevine)
  const widevineHeaders = {
    ...config.headers,
    ...(widevine === null || widevine === void 0 ? void 0 : widevine.headers),
  }
  const fairplayHeaders = {
    ...config.headers,
    ...(fairplay === null || fairplay === void 0 ? void 0 : fairplay.headers),
  }
  return {
    widevine: {
      LA_URL: host.widevine,
      ...config,
      headers: widevineHeaders,
      ...(videoRobustness && {
        videoRobustness,
      }),
    },
    fairplay: {
      LA_URL: host.fairplay,
      ...config,
      headers: fairplayHeaders,
      certificateURL: `${host.fairplay.replace(/\/$/, '')}/fairplay_cert`,
      certificateHeaders: fairplay.certificateHeaders,
      ...FairplayKeySystem,
    },
    playready: {
      LA_URL: host.playready,
      ...config,
    },
  }
}
/**
 * @param {object}
 * @param {object} .host
 * @param {string} .host.widevine
 * @param {string} .host.fairplay
 * @param {string} .host.playready
 * @param {string} .token
 * @param {object} .headers
 * @param {object} .widevine
 * @param {WidevineLevels} .widevine.level
 * @param {string[]} .widevine.blockedDevices Some devices doesn't play well
 * with hardware based Widevine, so don't enforce it
 */

const getEnterpriseDrmConfig = ({host, token, headers = {}, widevine = {}}) => {
  const config = {
    withCredentials: false,
    headers: {
      'X-Custom-Data': `token_type=playback&token_value=${token}`,
      'X-Custom-Header': queryString(headers),
    },
  }
  const deviceLevel = getDeviceLevel(
    widevine === null || widevine === void 0 ? void 0 : widevine.level
  )
  return getDrmConfig(config, {
    host,
    widevine: {
      ...widevine,
      headers: {
        'X-Custom-Header': queryString({
          ...headers,
          widevine_security_level: `L${deviceLevel}`,
        }),
      },
    },
  })
}

const getDefaultDrmConfig = ({host, token, widevine = {}}) => {
  const config = {
    withCredentials: false,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const fairplay = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    certificateHeaders: {
      Authorization: `Bearer ${token}`,
    },
  }
  return getDrmConfig(config, {
    host,
    widevine,
    fairplay,
  })
}

function createCommonjsModule(fn) {
  var module = {exports: {}}
  return fn(module, module.exports), module.exports
}

/*
object-assign
(c) Sindre Sorhus
@license MIT
*/
/* eslint-disable no-unused-vars */
var getOwnPropertySymbols = Object.getOwnPropertySymbols
var hasOwnProperty = Object.prototype.hasOwnProperty
var propIsEnumerable = Object.prototype.propertyIsEnumerable

function toObject(val) {
  if (val === null || val === undefined) {
    throw new TypeError('Object.assign cannot be called with null or undefined')
  }

  return Object(val)
}

function shouldUseNative() {
  try {
    if (!Object.assign) {
      return false
    }

    // Detect buggy property enumeration order in older V8 versions.

    // https://bugs.chromium.org/p/v8/issues/detail?id=4118
    var test1 = new String('abc') // eslint-disable-line no-new-wrappers
    test1[5] = 'de'
    if (Object.getOwnPropertyNames(test1)[0] === '5') {
      return false
    }

    // https://bugs.chromium.org/p/v8/issues/detail?id=3056
    var test2 = {}
    for (var i = 0; i < 10; i++) {
      test2['_' + String.fromCharCode(i)] = i
    }
    var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
      return test2[n]
    })
    if (order2.join('') !== '0123456789') {
      return false
    }

    // https://bugs.chromium.org/p/v8/issues/detail?id=3056
    var test3 = {}
    'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
      test3[letter] = letter
    })
    if (
      Object.keys(Object.assign({}, test3)).join('') !== 'abcdefghijklmnopqrst'
    ) {
      return false
    }

    return true
  } catch (err) {
    // We don't expect any of the above to throw, but better to be safe.
    return false
  }
}

var objectAssign = shouldUseNative()
  ? Object.assign
  : function (target, source) {
      var from
      var to = toObject(target)
      var symbols

      for (var s = 1; s < arguments.length; s++) {
        from = Object(arguments[s])

        for (var key in from) {
          if (hasOwnProperty.call(from, key)) {
            to[key] = from[key]
          }
        }

        if (getOwnPropertySymbols) {
          symbols = getOwnPropertySymbols(from)
          for (var i = 0; i < symbols.length; i++) {
            if (propIsEnumerable.call(from, symbols[i])) {
              to[symbols[i]] = from[symbols[i]]
            }
          }
        }
      }

      return to
    }

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var ReactPropTypesSecret$1 = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED'

var ReactPropTypesSecret_1 = ReactPropTypesSecret$1

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var printWarning$1 = function () {}

if (process.env.NODE_ENV !== 'production') {
  var ReactPropTypesSecret = ReactPropTypesSecret_1
  var loggedTypeFailures = {}
  var has$1 = Function.call.bind(Object.prototype.hasOwnProperty)

  printWarning$1 = function (text) {
    var message = 'Warning: ' + text
    if (typeof console !== 'undefined') {
      console.error(message)
    }
    try {
      // --- Welcome to debugging React ---
      // This error was thrown as a convenience so that you can use this stack
      // to find the callsite that caused this warning to fire.
      throw new Error(message)
    } catch (x) {}
  }
}

/**
 * Assert that the values match with the type specs.
 * Error messages are memorized and will only be shown once.
 *
 * @param {object} typeSpecs Map of name to a ReactPropType
 * @param {object} values Runtime values that need to be type-checked
 * @param {string} location e.g. "prop", "context", "child context"
 * @param {string} componentName Name of the component for error messages.
 * @param {?Function} getStack Returns the component stack.
 * @private
 */
function checkPropTypes(typeSpecs, values, location, componentName, getStack) {
  if (process.env.NODE_ENV !== 'production') {
    for (var typeSpecName in typeSpecs) {
      if (has$1(typeSpecs, typeSpecName)) {
        var error
        // Prop type validation may throw. In case they do, we don't want to
        // fail the render phase where it didn't fail before. So we log it.
        // After these have been cleaned up, we'll let them throw.
        try {
          // This is intentionally an invariant that gets caught. It's the same
          // behavior as without this statement except with a better message.
          if (typeof typeSpecs[typeSpecName] !== 'function') {
            var err = Error(
              (componentName || 'React class') +
                ': ' +
                location +
                ' type `' +
                typeSpecName +
                '` is invalid; ' +
                'it must be a function, usually from the `prop-types` package, but received `' +
                typeof typeSpecs[typeSpecName] +
                '`.'
            )
            err.name = 'Invariant Violation'
            throw err
          }
          error = typeSpecs[typeSpecName](
            values,
            typeSpecName,
            componentName,
            location,
            null,
            ReactPropTypesSecret
          )
        } catch (ex) {
          error = ex
        }
        if (error && !(error instanceof Error)) {
          printWarning$1(
            (componentName || 'React class') +
              ': type specification of ' +
              location +
              ' `' +
              typeSpecName +
              '` is invalid; the type checker ' +
              'function must return `null` or an `Error` but returned a ' +
              typeof error +
              '. ' +
              'You may have forgotten to pass an argument to the type checker ' +
              'creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and ' +
              'shape all require an argument).'
          )
        }
        if (error instanceof Error && !(error.message in loggedTypeFailures)) {
          // Only monitor this failure once because there tends to be a lot of the
          // same error.
          loggedTypeFailures[error.message] = true

          var stack = getStack ? getStack() : ''

          printWarning$1(
            'Failed ' +
              location +
              ' type: ' +
              error.message +
              (stack != null ? stack : '')
          )
        }
      }
    }
  }
}

/**
 * Resets warning cache when testing.
 *
 * @private
 */
checkPropTypes.resetWarningCache = function () {
  if (process.env.NODE_ENV !== 'production') {
    loggedTypeFailures = {}
  }
}

var checkPropTypes_1 = checkPropTypes

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var has = Function.call.bind(Object.prototype.hasOwnProperty)
var printWarning = function () {}

if (process.env.NODE_ENV !== 'production') {
  printWarning = function (text) {
    var message = 'Warning: ' + text
    if (typeof console !== 'undefined') {
      console.error(message)
    }
    try {
      // --- Welcome to debugging React ---
      // This error was thrown as a convenience so that you can use this stack
      // to find the callsite that caused this warning to fire.
      throw new Error(message)
    } catch (x) {}
  }
}

function emptyFunctionThatReturnsNull() {
  return null
}

var factoryWithTypeCheckers = function (isValidElement, throwOnDirectAccess) {
  /* global Symbol */
  var ITERATOR_SYMBOL = typeof Symbol === 'function' && Symbol.iterator
  var FAUX_ITERATOR_SYMBOL = '@@iterator' // Before Symbol spec.

  /**
   * Returns the iterator method function contained on the iterable object.
   *
   * Be sure to invoke the function with the iterable as context:
   *
   *     var iteratorFn = getIteratorFn(myIterable);
   *     if (iteratorFn) {
   *       var iterator = iteratorFn.call(myIterable);
   *       ...
   *     }
   *
   * @param {?object} maybeIterable
   * @return {?function}
   */
  function getIteratorFn(maybeIterable) {
    var iteratorFn =
      maybeIterable &&
      ((ITERATOR_SYMBOL && maybeIterable[ITERATOR_SYMBOL]) ||
        maybeIterable[FAUX_ITERATOR_SYMBOL])
    if (typeof iteratorFn === 'function') {
      return iteratorFn
    }
  }

  /**
   * Collection of methods that allow declaration and validation of props that are
   * supplied to React components. Example usage:
   *
   *   var Props = require('ReactPropTypes');
   *   var MyArticle = React.createClass({
   *     propTypes: {
   *       // An optional string prop named "description".
   *       description: Props.string,
   *
   *       // A required enum prop named "category".
   *       category: Props.oneOf(['News','Photos']).isRequired,
   *
   *       // A prop named "dialog" that requires an instance of Dialog.
   *       dialog: Props.instanceOf(Dialog).isRequired
   *     },
   *     render: function() { ... }
   *   });
   *
   * A more formal specification of how these methods are used:
   *
   *   type := array|bool|func|object|number|string|oneOf([...])|instanceOf(...)
   *   decl := ReactPropTypes.{type}(.isRequired)?
   *
   * Each and every declaration produces a function with the same signature. This
   * allows the creation of custom validation functions. For example:
   *
   *  var MyLink = React.createClass({
   *    propTypes: {
   *      // An optional string or URI prop named "href".
   *      href: function(props, propName, componentName) {
   *        var propValue = props[propName];
   *        if (propValue != null && typeof propValue !== 'string' &&
   *            !(propValue instanceof URI)) {
   *          return new Error(
   *            'Expected a string or an URI for ' + propName + ' in ' +
   *            componentName
   *          );
   *        }
   *      }
   *    },
   *    render: function() {...}
   *  });
   *
   * @internal
   */

  var ANONYMOUS = '<<anonymous>>'

  // Important!
  // Keep this list in sync with production version in `./factoryWithThrowingShims.js`.
  var ReactPropTypes = {
    array: createPrimitiveTypeChecker('array'),
    bool: createPrimitiveTypeChecker('boolean'),
    func: createPrimitiveTypeChecker('function'),
    number: createPrimitiveTypeChecker('number'),
    object: createPrimitiveTypeChecker('object'),
    string: createPrimitiveTypeChecker('string'),
    symbol: createPrimitiveTypeChecker('symbol'),

    any: createAnyTypeChecker(),
    arrayOf: createArrayOfTypeChecker,
    element: createElementTypeChecker(),
    elementType: createElementTypeTypeChecker(),
    instanceOf: createInstanceTypeChecker,
    node: createNodeChecker(),
    objectOf: createObjectOfTypeChecker,
    oneOf: createEnumTypeChecker,
    oneOfType: createUnionTypeChecker,
    shape: createShapeTypeChecker,
    exact: createStrictShapeTypeChecker,
  }

  /**
   * inlined Object.is polyfill to avoid requiring consumers ship their own
   * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
   */
  /*eslint-disable no-self-compare*/
  function is(x, y) {
    // SameValue algorithm
    if (x === y) {
      // Steps 1-5, 7-10
      // Steps 6.b-6.e: +0 != -0
      return x !== 0 || 1 / x === 1 / y
    } else {
      // Step 6.a: NaN == NaN
      return x !== x && y !== y
    }
  }
  /*eslint-enable no-self-compare*/

  /**
   * We use an Error-like object for backward compatibility as people may call
   * PropTypes directly and inspect their output. However, we don't use real
   * Errors anymore. We don't inspect their stack anyway, and creating them
   * is prohibitively expensive if they are created too often, such as what
   * happens in oneOfType() for any type before the one that matched.
   */
  function PropTypeError(message) {
    this.message = message
    this.stack = ''
  }
  // Make `instanceof Error` still work for returned errors.
  PropTypeError.prototype = Error.prototype

  function createChainableTypeChecker(validate) {
    if (process.env.NODE_ENV !== 'production') {
      var manualPropTypeCallCache = {}
      var manualPropTypeWarningCount = 0
    }
    function checkType(
      isRequired,
      props,
      propName,
      componentName,
      location,
      propFullName,
      secret
    ) {
      componentName = componentName || ANONYMOUS
      propFullName = propFullName || propName

      if (secret !== ReactPropTypesSecret_1) {
        if (throwOnDirectAccess) {
          // New behavior only for users of `prop-types` package
          var err = new Error(
            'Calling PropTypes validators directly is not supported by the `prop-types` package. ' +
              'Use `PropTypes.checkPropTypes()` to call them. ' +
              'Read more at http://fb.me/use-check-prop-types'
          )
          err.name = 'Invariant Violation'
          throw err
        } else if (
          process.env.NODE_ENV !== 'production' &&
          typeof console !== 'undefined'
        ) {
          // Old behavior for people using React.PropTypes
          var cacheKey = componentName + ':' + propName
          if (
            !manualPropTypeCallCache[cacheKey] &&
            // Avoid spamming the console because they are often not actionable except for lib authors
            manualPropTypeWarningCount < 3
          ) {
            printWarning(
              'You are manually calling a React.PropTypes validation ' +
                'function for the `' +
                propFullName +
                '` prop on `' +
                componentName +
                '`. This is deprecated ' +
                'and will throw in the standalone `prop-types` package. ' +
                'You may be seeing this warning due to a third-party PropTypes ' +
                'library. See https://fb.me/react-warning-dont-call-proptypes ' +
                'for details.'
            )
            manualPropTypeCallCache[cacheKey] = true
            manualPropTypeWarningCount++
          }
        }
      }
      if (props[propName] == null) {
        if (isRequired) {
          if (props[propName] === null) {
            return new PropTypeError(
              'The ' +
                location +
                ' `' +
                propFullName +
                '` is marked as required ' +
                ('in `' + componentName + '`, but its value is `null`.')
            )
          }
          return new PropTypeError(
            'The ' +
              location +
              ' `' +
              propFullName +
              '` is marked as required in ' +
              ('`' + componentName + '`, but its value is `undefined`.')
          )
        }
        return null
      } else {
        return validate(props, propName, componentName, location, propFullName)
      }
    }

    var chainedCheckType = checkType.bind(null, false)
    chainedCheckType.isRequired = checkType.bind(null, true)

    return chainedCheckType
  }

  function createPrimitiveTypeChecker(expectedType) {
    function validate(
      props,
      propName,
      componentName,
      location,
      propFullName,
      secret
    ) {
      var propValue = props[propName]
      var propType = getPropType(propValue)
      if (propType !== expectedType) {
        // `propValue` being instance of, say, date/regexp, pass the 'object'
        // check, but we can offer a more precise error message here rather than
        // 'of type `object`'.
        var preciseType = getPreciseType(propValue)

        return new PropTypeError(
          'Invalid ' +
            location +
            ' `' +
            propFullName +
            '` of type ' +
            ('`' +
              preciseType +
              '` supplied to `' +
              componentName +
              '`, expected ') +
            ('`' + expectedType + '`.')
        )
      }
      return null
    }
    return createChainableTypeChecker(validate)
  }

  function createAnyTypeChecker() {
    return createChainableTypeChecker(emptyFunctionThatReturnsNull)
  }

  function createArrayOfTypeChecker(typeChecker) {
    function validate(props, propName, componentName, location, propFullName) {
      if (typeof typeChecker !== 'function') {
        return new PropTypeError(
          'Property `' +
            propFullName +
            '` of component `' +
            componentName +
            '` has invalid PropType notation inside arrayOf.'
        )
      }
      var propValue = props[propName]
      if (!Array.isArray(propValue)) {
        var propType = getPropType(propValue)
        return new PropTypeError(
          'Invalid ' +
            location +
            ' `' +
            propFullName +
            '` of type ' +
            ('`' +
              propType +
              '` supplied to `' +
              componentName +
              '`, expected an array.')
        )
      }
      for (var i = 0; i < propValue.length; i++) {
        var error = typeChecker(
          propValue,
          i,
          componentName,
          location,
          propFullName + '[' + i + ']',
          ReactPropTypesSecret_1
        )
        if (error instanceof Error) {
          return error
        }
      }
      return null
    }
    return createChainableTypeChecker(validate)
  }

  function createElementTypeChecker() {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName]
      if (!isValidElement(propValue)) {
        var propType = getPropType(propValue)
        return new PropTypeError(
          'Invalid ' +
            location +
            ' `' +
            propFullName +
            '` of type ' +
            ('`' +
              propType +
              '` supplied to `' +
              componentName +
              '`, expected a single ReactElement.')
        )
      }
      return null
    }
    return createChainableTypeChecker(validate)
  }

  function createElementTypeTypeChecker() {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName]
      if (!ReactIs.isValidElementType(propValue)) {
        var propType = getPropType(propValue)
        return new PropTypeError(
          'Invalid ' +
            location +
            ' `' +
            propFullName +
            '` of type ' +
            ('`' +
              propType +
              '` supplied to `' +
              componentName +
              '`, expected a single ReactElement type.')
        )
      }
      return null
    }
    return createChainableTypeChecker(validate)
  }

  function createInstanceTypeChecker(expectedClass) {
    function validate(props, propName, componentName, location, propFullName) {
      if (!(props[propName] instanceof expectedClass)) {
        var expectedClassName = expectedClass.name || ANONYMOUS
        var actualClassName = getClassName(props[propName])
        return new PropTypeError(
          'Invalid ' +
            location +
            ' `' +
            propFullName +
            '` of type ' +
            ('`' +
              actualClassName +
              '` supplied to `' +
              componentName +
              '`, expected ') +
            ('instance of `' + expectedClassName + '`.')
        )
      }
      return null
    }
    return createChainableTypeChecker(validate)
  }

  function createEnumTypeChecker(expectedValues) {
    if (!Array.isArray(expectedValues)) {
      if (process.env.NODE_ENV !== 'production') {
        if (arguments.length > 1) {
          printWarning(
            'Invalid arguments supplied to oneOf, expected an array, got ' +
              arguments.length +
              ' arguments. ' +
              'A common mistake is to write oneOf(x, y, z) instead of oneOf([x, y, z]).'
          )
        } else {
          printWarning('Invalid argument supplied to oneOf, expected an array.')
        }
      }
      return emptyFunctionThatReturnsNull
    }

    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName]
      for (var i = 0; i < expectedValues.length; i++) {
        if (is(propValue, expectedValues[i])) {
          return null
        }
      }

      var valuesString = JSON.stringify(
        expectedValues,
        function replacer(key, value) {
          var type = getPreciseType(value)
          if (type === 'symbol') {
            return String(value)
          }
          return value
        }
      )
      return new PropTypeError(
        'Invalid ' +
          location +
          ' `' +
          propFullName +
          '` of value `' +
          String(propValue) +
          '` ' +
          ('supplied to `' +
            componentName +
            '`, expected one of ' +
            valuesString +
            '.')
      )
    }
    return createChainableTypeChecker(validate)
  }

  function createObjectOfTypeChecker(typeChecker) {
    function validate(props, propName, componentName, location, propFullName) {
      if (typeof typeChecker !== 'function') {
        return new PropTypeError(
          'Property `' +
            propFullName +
            '` of component `' +
            componentName +
            '` has invalid PropType notation inside objectOf.'
        )
      }
      var propValue = props[propName]
      var propType = getPropType(propValue)
      if (propType !== 'object') {
        return new PropTypeError(
          'Invalid ' +
            location +
            ' `' +
            propFullName +
            '` of type ' +
            ('`' +
              propType +
              '` supplied to `' +
              componentName +
              '`, expected an object.')
        )
      }
      for (var key in propValue) {
        if (has(propValue, key)) {
          var error = typeChecker(
            propValue,
            key,
            componentName,
            location,
            propFullName + '.' + key,
            ReactPropTypesSecret_1
          )
          if (error instanceof Error) {
            return error
          }
        }
      }
      return null
    }
    return createChainableTypeChecker(validate)
  }

  function createUnionTypeChecker(arrayOfTypeCheckers) {
    if (!Array.isArray(arrayOfTypeCheckers)) {
      process.env.NODE_ENV !== 'production'
        ? printWarning(
            'Invalid argument supplied to oneOfType, expected an instance of array.'
          )
        : void 0
      return emptyFunctionThatReturnsNull
    }

    for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
      var checker = arrayOfTypeCheckers[i]
      if (typeof checker !== 'function') {
        printWarning(
          'Invalid argument supplied to oneOfType. Expected an array of check functions, but ' +
            'received ' +
            getPostfixForTypeWarning(checker) +
            ' at index ' +
            i +
            '.'
        )
        return emptyFunctionThatReturnsNull
      }
    }

    function validate(props, propName, componentName, location, propFullName) {
      for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
        var checker = arrayOfTypeCheckers[i]
        if (
          checker(
            props,
            propName,
            componentName,
            location,
            propFullName,
            ReactPropTypesSecret_1
          ) == null
        ) {
          return null
        }
      }

      return new PropTypeError(
        'Invalid ' +
          location +
          ' `' +
          propFullName +
          '` supplied to ' +
          ('`' + componentName + '`.')
      )
    }
    return createChainableTypeChecker(validate)
  }

  function createNodeChecker() {
    function validate(props, propName, componentName, location, propFullName) {
      if (!isNode(props[propName])) {
        return new PropTypeError(
          'Invalid ' +
            location +
            ' `' +
            propFullName +
            '` supplied to ' +
            ('`' + componentName + '`, expected a ReactNode.')
        )
      }
      return null
    }
    return createChainableTypeChecker(validate)
  }

  function createShapeTypeChecker(shapeTypes) {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName]
      var propType = getPropType(propValue)
      if (propType !== 'object') {
        return new PropTypeError(
          'Invalid ' +
            location +
            ' `' +
            propFullName +
            '` of type `' +
            propType +
            '` ' +
            ('supplied to `' + componentName + '`, expected `object`.')
        )
      }
      for (var key in shapeTypes) {
        var checker = shapeTypes[key]
        if (!checker) {
          continue
        }
        var error = checker(
          propValue,
          key,
          componentName,
          location,
          propFullName + '.' + key,
          ReactPropTypesSecret_1
        )
        if (error) {
          return error
        }
      }
      return null
    }
    return createChainableTypeChecker(validate)
  }

  function createStrictShapeTypeChecker(shapeTypes) {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName]
      var propType = getPropType(propValue)
      if (propType !== 'object') {
        return new PropTypeError(
          'Invalid ' +
            location +
            ' `' +
            propFullName +
            '` of type `' +
            propType +
            '` ' +
            ('supplied to `' + componentName + '`, expected `object`.')
        )
      }
      // We need to check all keys in case some are required but missing from
      // props.
      var allKeys = objectAssign({}, props[propName], shapeTypes)
      for (var key in allKeys) {
        var checker = shapeTypes[key]
        if (!checker) {
          return new PropTypeError(
            'Invalid ' +
              location +
              ' `' +
              propFullName +
              '` key `' +
              key +
              '` supplied to `' +
              componentName +
              '`.' +
              '\nBad object: ' +
              JSON.stringify(props[propName], null, '  ') +
              '\nValid keys: ' +
              JSON.stringify(Object.keys(shapeTypes), null, '  ')
          )
        }
        var error = checker(
          propValue,
          key,
          componentName,
          location,
          propFullName + '.' + key,
          ReactPropTypesSecret_1
        )
        if (error) {
          return error
        }
      }
      return null
    }

    return createChainableTypeChecker(validate)
  }

  function isNode(propValue) {
    switch (typeof propValue) {
      case 'number':
      case 'string':
      case 'undefined':
        return true
      case 'boolean':
        return !propValue
      case 'object':
        if (Array.isArray(propValue)) {
          return propValue.every(isNode)
        }
        if (propValue === null || isValidElement(propValue)) {
          return true
        }

        var iteratorFn = getIteratorFn(propValue)
        if (iteratorFn) {
          var iterator = iteratorFn.call(propValue)
          var step
          if (iteratorFn !== propValue.entries) {
            while (!(step = iterator.next()).done) {
              if (!isNode(step.value)) {
                return false
              }
            }
          } else {
            // Iterator will provide entry [k,v] tuples rather than values.
            while (!(step = iterator.next()).done) {
              var entry = step.value
              if (entry) {
                if (!isNode(entry[1])) {
                  return false
                }
              }
            }
          }
        } else {
          return false
        }

        return true
      default:
        return false
    }
  }

  function isSymbol(propType, propValue) {
    // Native Symbol.
    if (propType === 'symbol') {
      return true
    }

    // falsy value can't be a Symbol
    if (!propValue) {
      return false
    }

    // 19.4.3.5 Symbol.prototype[@@toStringTag] === 'Symbol'
    if (propValue['@@toStringTag'] === 'Symbol') {
      return true
    }

    // Fallback for non-spec compliant Symbols which are polyfilled.
    if (typeof Symbol === 'function' && propValue instanceof Symbol) {
      return true
    }

    return false
  }

  // Equivalent of `typeof` but with special handling for array and regexp.
  function getPropType(propValue) {
    var propType = typeof propValue
    if (Array.isArray(propValue)) {
      return 'array'
    }
    if (propValue instanceof RegExp) {
      // Old webkits (at least until Android 4.0) return 'function' rather than
      // 'object' for typeof a RegExp. We'll normalize this here so that /bla/
      // passes PropTypes.object.
      return 'object'
    }
    if (isSymbol(propType, propValue)) {
      return 'symbol'
    }
    return propType
  }

  // This handles more types than `getPropType`. Only used for error messages.
  // See `createPrimitiveTypeChecker`.
  function getPreciseType(propValue) {
    if (typeof propValue === 'undefined' || propValue === null) {
      return '' + propValue
    }
    var propType = getPropType(propValue)
    if (propType === 'object') {
      if (propValue instanceof Date) {
        return 'date'
      } else if (propValue instanceof RegExp) {
        return 'regexp'
      }
    }
    return propType
  }

  // Returns a string that is postfixed to a warning about an invalid type.
  // For example, "undefined" or "of type array"
  function getPostfixForTypeWarning(value) {
    var type = getPreciseType(value)
    switch (type) {
      case 'array':
      case 'object':
        return 'an ' + type
      case 'boolean':
      case 'date':
      case 'regexp':
        return 'a ' + type
      default:
        return type
    }
  }

  // Returns class name of the object, if any.
  function getClassName(propValue) {
    if (!propValue.constructor || !propValue.constructor.name) {
      return ANONYMOUS
    }
    return propValue.constructor.name
  }

  ReactPropTypes.checkPropTypes = checkPropTypes_1
  ReactPropTypes.resetWarningCache = checkPropTypes_1.resetWarningCache
  ReactPropTypes.PropTypes = ReactPropTypes

  return ReactPropTypes
}

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

function emptyFunction() {}
function emptyFunctionWithReset() {}
emptyFunctionWithReset.resetWarningCache = emptyFunction

var factoryWithThrowingShims = function () {
  function shim(
    props,
    propName,
    componentName,
    location,
    propFullName,
    secret
  ) {
    if (secret === ReactPropTypesSecret_1) {
      // It is still safe when called from React.
      return
    }
    var err = new Error(
      'Calling PropTypes validators directly is not supported by the `prop-types` package. ' +
        'Use PropTypes.checkPropTypes() to call them. ' +
        'Read more at http://fb.me/use-check-prop-types'
    )
    err.name = 'Invariant Violation'
    throw err
  }
  shim.isRequired = shim
  function getShim() {
    return shim
  } // Important!
  // Keep this list in sync with production version in `./factoryWithTypeCheckers.js`.
  var ReactPropTypes = {
    array: shim,
    bool: shim,
    func: shim,
    number: shim,
    object: shim,
    string: shim,
    symbol: shim,

    any: shim,
    arrayOf: getShim,
    element: shim,
    elementType: shim,
    instanceOf: getShim,
    node: shim,
    objectOf: getShim,
    oneOf: getShim,
    oneOfType: getShim,
    shape: getShim,
    exact: getShim,

    checkPropTypes: emptyFunctionWithReset,
    resetWarningCache: emptyFunction,
  }

  ReactPropTypes.PropTypes = ReactPropTypes

  return ReactPropTypes
}

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var propTypes = createCommonjsModule(function (module) {
  if (process.env.NODE_ENV !== 'production') {
    var ReactIs$1 = ReactIs

    // By explicitly using `prop-types` you are opting into new development behavior.
    // http://fb.me/prop-types-in-prod
    var throwOnDirectAccess = true
    module.exports = factoryWithTypeCheckers(
      ReactIs$1.isElement,
      throwOnDirectAccess
    )
  } else {
    // By explicitly using `prop-types` you are opting into new production behavior.
    // http://fb.me/prop-types-in-prod
    module.exports = factoryWithThrowingShims()
  }
})

var en = {
  'KKS.YES': 'Yes',
  'KKS.NO': 'No',
  'KKS.OK': 'OK',
  'KKS.CANCEL': 'Cancel',
  'KKS.TRYAGAIN': 'Try again',
  'KKS.LEAVE': 'Leave',
  'KKS.BACK': 'Back',
  'KKS.DELETE': 'Delete',
  'KKS.PLAY.WITH.QUALITY': 'Play this quality',
  'KKS.QUALITY': 'Quality',
  'KKS.SUBTITLES': 'Subtitles',
  'KKS.AUDIO': 'Audio',
  'KKS.SETTING.OFF': 'off',
  'KKS.SETTING': 'Setting',
  'KKS.SETTING.CONFLICT': 'Setting conflict',
  'KKS.CONFLICT.MESSAGE':
    'The video quality is higher than auto quality default setting',
  'KKS.SETTING.AUTOPLAY': 'Autoplay',
  'KKS.SETTING.VERSION': 'Version',
  'KKS.SETTING.SUBTITLE': 'Subtitle',
  'KKS.SETTING.DUBBED': 'Dubbed',
  'KKS.SETTING.SPEED': 'Speed',
  'KKS.PROGRAM.TITLE': 'Can’t play program',
  'KKS.PROGRAM.MESSAGE': 'No response or this program is not on air',
  'KKS.AUTOPLAY.NEXT.EPISODE': 'Auto-play next episode',
  'KKS.ENDROLL.COUNTDOWN': 'Next: in {timeLeft} seconds',
  'KKS.SSAI.LEARN.MORE': 'Learn more',
  'KKS.SSAI.SKIP.AD': 'Skip',
  'KKS.SSAI.SECONDS': 'seconds',
  'KKS.PLAYER.PLAY': 'Play',
  'KKS.PLAYER.PAUSE': 'Pause',
  'KKS.PLAYER.REPLAY': 'Replay',
  'KKS.PLAYER.REWIND': 'Rewind',
  'KKS.PLAYER.PREVIOUS': 'Previous Video',
  'KKS.PLAYER.NEXT': 'Next Video',
  'KKS.PLAYER.FORWARD': 'Forward',
  'KKS.PLAYER.MUTE': 'Mute',
  'KKS.PLAYER.UNMUTE': 'Unmute',
  'KKS.PLAYER.FULLSCREEN': 'Full Screen',
  'KKS.PLAYER.FULLSCREEN.EXIT': 'Exit Full Screen',
  'KKS.PLAYER.CAST': 'Chromecast',
  'KKS.PLAYER.CAST.DISCONNECT': 'Stop casting',
  'KKS.PLAYER.PLAY.NEXT': 'Play next video',
  'KKS.PLAYER.EXIT': 'Leave',
  'KKS.PROGRAM.ENDED':
    'The live event has ended.\nClick OK to back to previous page.',
  'KKS.CASTING': 'You are casting via Chromecast',
  'KKS.CAST.CONNTECTED': '[{CHROMECAST}] is connected. Now you can cast on it',
  'KKS.CAST.STATUS': '[{VIDEO}] is casting on [{CHROMECAST}]',
  'KKS.ERROR': 'Something went wrong. Please try again later.({code})',
  'KKS.ERROR.PLAYCRAFT.401': 'Please login to play this video.({CODE})',
  'KKS.ERROR.PLAYCRAFT.404': 'This video does not exist.({CODE})',
  'KKS.ERROR.PLAYCRAFT.429':
    'The user has sent too many requests in a given amount of time.({CODE})',
  'KKS.ERROR.PLAYCRAFT.503':
    'Service maintenance is in progress. Please try again later.({CODE})',
  'KKS.ERROR.PLAYCRAFT.1000':
    'You does not have valid permission to play this content.({CODE})',
  'KKS.ERROR.PLAYCRAFT.1001':
    'Sorry, download of this video is not permitted.({CODE})',
  'KKS.ERROR.PLAYCRAFT.1002':
    'You have reached the maximum number of simultaneously playback device. Please quit playback on other devices and try again.({CODE})',
  'KKS.ERROR.PLAYCRAFT.1003':
    'Sorry, the service is not available in your location.({CODE})',
  'KKS.ERROR.PLAYCRAFT.1004':
    'You have reached maximum allowed download limit. Please remove some downloaded video to proceed.({CODE})',
  'KKS.ERROR.NETWORK_ERROR':
    'There is something wrong with your internet connection. Please kindly check and try again.({code})',
  'KKS.ERROR.DRM_RESTRICTED_OUTPUT':
    'External display is not allowed in current DRM policy, please unplug external display and try again.({code}/{name})',
  'KKS.ERROR.NOT_SUPPORT_DEVICE':
    'This device is not supported. Please use {allowDevices} to enjoy this video.',
  'KKS.ERROR.NOT_SUPPORT_OS':
    'This os is not supported. Please use {allowOSs} to enjoy this video.',
  'KKS.ERROR.NOT_SUPPORT_OS_VERSION':
    'This os version is too low. Please upgrade to version {minVersion} or higher.',
  'KKS.ERROR.NOT_SUPPORT_BROWSER':
    'This browser is not supported. Please use {allowBrowsers} to enjoy this video.',
  'KKS.ERROR.NOT_SUPPORT_BROWSER_VERSION':
    'This browser version is too low. Please upgrade to version {minVersion} or higher.',
}

var ja = {
  'KKS.YES': 'はい',
  'KKS.NO': 'いいえ',
  'KKS.OK': 'OK',
  'KKS.CANCEL': 'キャンセル',
  'KKS.TRYAGAIN': '再生を再開する',
  'KKS.LEAVE': '戻る',
  'KKS.BACK': '戻る',
  'KKS.DELETE': '削除',
  'KKS.PLAY.WITH.QUALITY': 'この画質で再生されます',
  'KKS.QUALITY': '映像品質',
  'KKS.AUDIO': '音声',
  'KKS.SETTING.OFF': 'オフ',
  'KKS.SUBTITLES': '字幕',
  'KKS.SETTING': '再生設定',
  'KKS.SETTING.CONFLICT':
    'ご視聴する動画は、デフォルト画質設定に一致しません。',
  'KKS.CONFLICT.MESSAGE': 'このビデオの画質がデフォルト設定より高いです。',
  'KKS.SETTING.AUTOPLAY': '自動再生',
  'KKS.SETTING.VERSION': '字幕・吹替',
  'KKS.SETTING.SUBTITLE': '字幕',
  'KKS.SETTING.DUBBED': '吹替',
  'KKS.SETTING.SPEED': 'スピード',
  'KKS.AUTOPLAY.NEXT.EPISODE': '次のエピソードを自動で再生する。',
  'KKS.PROGRAM.TITLE': '番組を再生できません。',
  'KKS.PROGRAM.MESSAGE':
    '反応が有りません。もしくは、この番組はオンエアされていません。',
  'KKS.ENDROLL.COUNTDOWN': '{timeLeft} 秒後に再生します',
  'KKS.SSAI.LEARN.MORE': 'もっと見る',
  'KKS.SSAI.SKIP.AD': 'スキップ',
  'KKS.SSAI.SECONDS': '秒',
  'KKS.PLAYER.PLAY': '再生',
  'KKS.PLAYER.PAUSE': '一時停止',
  'KKS.PLAYER.REPLAY': '再生',
  'KKS.PLAYER.REWIND': '巻戻し',
  'KKS.PLAYER.PREVIOUS': '前話',
  'KKS.PLAYER.NEXT': '次話',
  'KKS.PLAYER.FORWARD': '早送り',
  'KKS.PLAYER.MUTE': 'ミュート',
  'KKS.PLAYER.UNMUTE': 'ミュート解除',
  'KKS.PLAYER.FULLSCREEN': '全画面',
  'KKS.PLAYER.FULLSCREEN.EXIT': '全画面終了',
  'KKS.PLAYER.CAST': 'クロームキャスト',
  'KKS.PLAYER.CAST.DISCONNECT': 'クロームキャスト解除',
  'KKS.PLAYER.PLAY.NEXT': '次話再生',
  'KKS.PROGRAM.ENDED':
    'このライブイベントはすでに終了しました。\nOKをクリックして前のページに戻ってください。',
  'KKS.PLAYER.EXIT': '終了',
  'KKS.CASTING': 'クロームキャストによって画面が表示されています',
  'KKS.CAST.CONNTECTED':
    '[{CHROMECAST}] に接続しました。今からキャストできます。',
  'KKS.CAST.STATUS': '[{VIDEO}]は [{CHROMECAST}]にキャストしています。',
  'KKS.ERROR': 'システムエラーが発生しました。({code})',
  'KKS.ERROR.PLAYCRAFT.401': '作品を視聴するには、ログインが必要です。({CODE})',
  'KKS.ERROR.PLAYCRAFT.404': 'ご指定の作品は見つかりませんでした。({CODE})',
  'KKS.ERROR.PLAYCRAFT.429':
    'The user has sent too many requests in a given amount of time.({CODE})',
  'KKS.ERROR.PLAYCRAFT.503':
    '現在システムメンテナンス中のためご利用いただけません。しばらく経ってから再度ご利用ください。({CODE})',
  'KKS.ERROR.PLAYCRAFT.1000': 'この動画を視聴する権限がありません。({CODE})',
  'KKS.ERROR.PLAYCRAFT.1001': 'ご指定の作品はダウンロードできません。({CODE})',
  'KKS.ERROR.PLAYCRAFT.1002':
    '同時に利用できる上限に達したため、現在ご利用いただけません。別のデバイスでの利用が終了後にご利用をお試しください。({CODE})',
  'KKS.ERROR.PLAYCRAFT.1003':
    'お客さまがご利用の地域ではご指定の作品は再生できません。({CODE})',
  'KKS.ERROR.PLAYCRAFT.1004':
    'ダウンロードできる上限数に達しました。\nご利用いただくためにはダウンロード済みの作品を削除してからお試しください。({CODE})',
  'KKS.ERROR.NETWORK_ERROR':
    'インターネットに接続できませんでした。設定を確認してください。({code})',
  'KKS.ERROR.DRM_RESTRICTED_OUTPUT':
    '一部外部出力についてはご利用いただけません。({code}/{name})',
  'KKS.ERROR.DEVICE_IS_NOT_SUPPORTED':
    'お使いのデバイスに対応していません。{allowDevices} でこの作品を見てください。',
  'KKS.ERROR.OS_IS_NOT_SUPPORTED':
    'お使いのOSに対応していません。 {allowOSs} でこの作品を見てください。',
  'KKS.ERROR.PLEASE_UPGRADE_OS':
    'お使いのOSが古いです。{minVersion} 以上にアップグレード してください。',
  'KKS.ERROR.BROWSER_IS_NOT_SUPPORTED':
    'お使いのブラウザに対応していません。 {allowBrowsers} でこの作品を見てください。',
  'KKS.ERROR.PLEASE_UPGRADE_BROWSER':
    'お使いのブラウザが古いです。 {minVersion} 以上にアップグレード してください。',
}

var zhTW = {
  'KKS.YES': '是',
  'KKS.NO': '否',
  'KKS.OK': 'ＯＫ',
  'KKS.CANCEL': '取消',
  'KKS.TRYAGAIN': '請再試一次',
  'KKS.LEAVE': '離開',
  'KKS.BACK': '返回',
  'KKS.DELETE': '刪除',
  'KKS.PLAY.WITH.QUALITY': '播放此畫質',
  'KKS.QUALITY': '畫質',
  'KKS.SUBTITLES': '字幕',
  'KKS.AUDIO': '音訊',
  'KKS.SETTING.OFF': '關閉',
  'KKS.SETTING': '設定',
  'KKS.SETTING.CONFLICT': '找不到此播放畫質',
  'KKS.CONFLICT.MESSAGE': '這部影片可選擇高於事先設定之畫質',
  'KKS.SETTING.AUTOPLAY': '自動播放',
  'KKS.SETTING.VERSION': 'Version',
  'KKS.SETTING.SUBTITLE': '字幕',
  'KKS.SETTING.DUBBED': '配音',
  'KKS.SETTING.SPEED': '播放速度',
  'KKS.AUTOPLAY.NEXT.EPISODE': '自動播放下一話',
  'KKS.PROGRAM.TITLE': '此節目已播放完畢',
  'KKS.PROGRAM.MESSAGE': '此節目已播放完畢',
  'KKS.ENDROLL.COUNTDOWN': '下一話將於 {timeLeft} 秒後播放',
  'KKS.SSAI.LEARN.MORE': '看更多',
  'KKS.SSAI.SKIP.AD': '略過廣告',
  'KKS.SSAI.SECONDS': '秒',
  'KKS.PLAYER.PLAY': '播放',
  'KKS.PLAYER.PAUSE': '暫停',
  'KKS.PLAYER.REPLAY': '重播',
  'KKS.PLAYER.REWIND': '前十秒',
  'KKS.PLAYER.PREVIOUS': '上一集',
  'KKS.PLAYER.NEXT': '下一集',
  'KKS.PLAYER.FORWARD': '後十秒',
  'KKS.PLAYER.MUTE': '靜音',
  'KKS.PLAYER.UNMUTE': '解除靜音',
  'KKS.PLAYER.FULLSCREEN': '全螢幕',
  'KKS.PLAYER.FULLSCREEN.EXIT': '離開全螢幕',
  'KKS.PLAYER.CAST': 'Chromecast',
  'KKS.PLAYER.CAST.DISCONNECT': '停止投放',
  'KKS.PLAYER.PLAY.NEXT': '播放下一集',
  'KKS.PROGRAM.ENDED': '直播已結束。\n按ok鍵回到前一頁。',
  'KKS.PLAYER.EXIT': '離開',
  'KKS.CASTING': '透過Chromecast播放中。',
  'KKS.CAST.CONNTECTED': '[{CHROMECAST}]已連結。現在可以開始投放。',
  'KKS.CAST.STATUS': '[{VIDEO}]正在[{CHROMECAST}]上播放。',
  'KKS.ERROR': '系統發生錯誤。請稍後再嘗試。({code})',
  'KKS.ERROR.PLAYCRAFT.401': '請登入再播放。({CODE})',
  'KKS.ERROR.PLAYCRAFT.404': '此影片不存在。({CODE})',
  'KKS.ERROR.PLAYCRAFT.503': '系統正在維護中，請稍後再嘗試。({CODE})',
  'KKS.ERROR.PLAYCRAFT.1000': '您沒有播放此影片的權限。({CODE})',
  'KKS.ERROR.PLAYCRAFT.1001': '您沒有下載此影片的權限。({CODE})',
  'KKS.ERROR.PLAYCRAFT.1002':
    '您超過同時播放上限。請關閉其他播放器後再嘗試播放。({CODE})',
  'KKS.ERROR.PLAYCRAFT.1003': '您所在地區無法播放此影片。({CODE})',
  'KKS.ERROR.PLAYCRAFT.1004':
    '您已經超過下載影片上線。請移除已下載影片後再嘗試。({CODE})',
  'KKS.ERROR.NETWORK_ERROR': '網路連線發生錯誤，請稍後再嘗試。({code})',
  'KKS.ERROR.DRM_RESTRICTED_OUTPUT':
    '此影片無法在外接螢幕上播放。請拔除外接螢幕再試一次。',
  'KKS.ERROR.DEVICE_IS_NOT_SUPPORTED':
    '此裝置並不支援。請用{allowDevices}再試一次',
  'KKS.ERROR.OS_IS_NOT_SUPPORTED': '此OS 並不支援。請用{allowOSs}再試一次。',
  'KKS.ERROR.PLEASE_UPGRADE_OS': '此OS 並不支援。請升版到{miniVersion}以上。',
  'KKS.ERROR.BROWSER_IS_NOT_SUPPORTED':
    '此瀏覽器並不支援。請使用{allowBrowsers}。',
  'KKS.ERROR.PLEASE_UPGRADE_BROWSER':
    '此瀏覽器並不支援。請升版到{minVersion}以上。',
}

var LANGS = {
  en,
  ja,
  'zh-tw': zhTW,
}

const LanguageCode$1 = {
  EN: 'en',
  JA: 'ja',
  ZHTW: 'zh-TW',
}
const ModuleState = {
  UNINITIALIZATION: 0,
  INITIALIZING: 1,
  INITIALIZED: 2,
  LOADING_CONTENT: 3,
  LOADING: 3.1,
  READY: 4,
  ERROR: Infinity,
}
const StorageKey = {
  VOLUME: 'KKSPlayback-volume',
  LIMIT_ONE_PLAYBACK: 'KKSPlayback-limitOnePlayback',
}
const PlayerState$1 = {
  UNMOUNTED: 0,
  MOUNTING: 1,
  MOUNTED: 2,
  LOADING: 3,
  LOADED: 4,
  READY: 5,
  STALLING: 5.1,
  PLAYING: 6,
  PAUSED: 7,
  ENDED: 8,
}
const PlayerViewMode = {
  FULLSCREEN: 'fullscreen',
  INLINE: 'inline',
  PICTURE_IN_PICTURE: 'pictureinpicture',
}
const APIState = {
  DISABLE: 0,
  ENABLE: 1,
  LOADING: 2,
  READY: 3,
}
const AgentCommand$1 = {
  AUTO: 'AUTO',
  PLAY: 'PLAY',
  PAUSE: 'PAUSE',
  UNMOUNT: 'UNMOUNT',
}
const EnvironmentErrorName = {
  NOT_SUPPORT_DEVICE: 'KKS.ERROR.DEVICE_IS_NOT_SUPPORTED',
  NOT_SUPPORT_OS: 'KKS.ERROR.OS_IS_NOT_SUPPORTED',
  NOT_SUPPORT_OS_VERSION: 'KKS.ERROR.PLEASE_UPGRADE_OS',
  NOT_SUPPORT_BROWSER: 'KKS.ERROR.BROWSER_IS_NOT_SUPPORTED',
  NOT_SUPPORT_BROWSER_VERSION: 'KKS.ERROR.PLEASE_UPGRADE_BROWSER',
}
const CastState = {
  NO_DEVICES_AVAILABLE: 'NO_DEVICES_AVAILABLE',
  CONNECTED: 'CONNECTED',
  CONNECTING: 'CONNECTING',
  NOT_CONNECTED: 'NOT_CONNECTED',
}
const ItemType$1 = {
  VIDEOS: 'videos',
  LIVES: 'lives',
}

const ID = propTypes.oneOfType([propTypes.number, propTypes.string])
const LanguageCode = propTypes.oneOf(Object.values(LanguageCode$1))
const SupportEnvironmentItem = propTypes.shape({
  device: propTypes.shape({
    type: propTypes.string,
  }),
  os: propTypes.shape({
    name: propTypes.string,
    version: propTypes.string,
  }),
  browser: propTypes.shape({
    name: propTypes.string,
    version: propTypes.string,
  }),
})
const ItemType = propTypes.oneOf(Object.values(ItemType$1))
const VideoInfo = propTypes.shape({
  contentId: ID,
  contentType: ItemType,
  licenseId: ID,
})
const PlayerState = propTypes.oneOf(Object.values(PlayerState$1))
const TextCode = propTypes.oneOf(
  Array.from(
    new Set(
      Object.entries(LANGS).reduce(
        (res, langItem) => res.concat(Object.keys(langItem[1])),
        []
      )
    )
  )
)
const AgentCommand = propTypes.oneOf(Object.values(AgentCommand$1))
var Types = {
  ID,
  LanguageCode,
  SupportEnvironmentItem,
  VideoInfo,
  PlayerState,
  TextCode,
  AgentCommand,
  ItemType,
}

var logs = {
  bitmovin: false,
  level: 'error',
}
var style$b = {
  width: '100%',
  height: '100%',
}
var ui = false
var BitmovinConfig = {
  logs: logs,
  style: style$b,
  ui: ui,
}

var desktop = [
  {
    device: {
      type: 'desktop',
    },
    os: {
      name: '*',
      version: '*',
    },
    browser: {
      name: 'Chrome',
      version: '60',
    },
  },
  {
    device: {
      type: 'desktop',
    },
    os: {
      name: '*',
      version: '*',
    },
    browser: {
      name: 'Safari',
      version: '11',
    },
  },
  {
    device: {
      type: 'desktop',
    },
    os: {
      name: '*',
      version: '*',
    },
    browser: {
      name: 'Firefox',
      version: '60',
    },
  },
  {
    device: {
      type: 'desktop',
    },
    os: {
      name: '*',
      version: '*',
    },
    browser: {
      name: 'Edge',
      version: '15',
    },
  },
  {
    device: {
      type: 'desktop',
    },
    os: {
      name: 'Windows',
      version: '8.1',
    },
    browser: {
      name: 'IE',
      version: '11',
    },
  },
]

var mobile = [
  {
    device: {
      type: 'mobile',
    },
    os: {
      name: 'Android',
      version: '5',
    },
    browser: {
      name: 'Chrome',
      version: '60',
    },
  },
  {
    device: {
      type: 'mobile',
    },
    os: {
      name: 'Android',
      version: '5',
    },
    browser: {
      name: 'Chrome WebView',
      version: '60',
    },
  },
  {
    device: {
      type: 'mobile',
    },
    os: {
      name: 'iOS',
      version: '11',
    },
    browser: {
      name: 'Mobile Safari',
      version: '11',
    },
  },
  {
    device: {
      type: 'tablet',
    },
    os: {
      name: 'Android',
      version: '5',
    },
    browser: {
      name: 'Chrome',
      version: '60',
    },
  },
  {
    device: {
      type: 'tablet',
    },
    os: {
      name: 'Android',
      version: '5',
    },
    browser: {
      name: 'Chrome WebView',
      version: '60',
    },
  },
  {
    device: {
      type: 'tablet',
    },
    os: {
      name: 'iOS',
      version: '11',
    },
    browser: {
      name: 'Mobile Safari',
      version: '11',
    },
  },
]

var defaultConfig = {
  BitmovinConfig,
  SupportEnvironment: {
    desktop,
    mobile,
  },
}

const linkPluginEvents = (plugins, handlers) => {
  const registered = plugins.map(plugin =>
    Object.entries(handlers).map(([eventName, handler]) => {
      var _plugin$on

      return (_plugin$on = plugin.on) === null || _plugin$on === void 0
        ? void 0
        : _plugin$on.call(plugin, eventName, event => handler(event, plugin))
    })
  )
  return () =>
    []
      .concat(...registered)
      .forEach(removeListener =>
        removeListener === null || removeListener === void 0
          ? void 0
          : removeListener()
      )
}

const getPlaycraftErrorMessage = code => {
  switch (+code) {
    // HTTP errors
    case 401:
      // please login
      return 'KKS.ERROR.PLAYCRAFT.401'

    case 404:
      // not found
      return 'KKS.ERROR.PLAYCRAFT.404'

    case 429:
      // too many requests in a given amount of time
      return 'KKS.ERROR.PLAYCRAFT.429'

    case 503:
      // system is in maintenance
      return 'KKS.ERROR.PLAYCRAFT.429'
    // 403 Forbidden sub types

    case 1000:
      // permission required to play
      return 'KKS.ERROR.PLAYCRAFT.1000'

    case 1003:
      // can't play in current location
      return 'KKS.ERROR.PLAYCRAFT.1003'

    case 1002: // playing on other devices, concurrent streaming device limit exceeded

    case 10021:
      // playing on other browser tab
      return 'KKS.ERROR.PLAYCRAFT.1002'

    case 1004:
      // delete downloaded video in another device to play
      return 'KKS.ERROR.PLAYCRAFT.1004'
    // web player doesn't have download feature. TODO: confirm is this safe to remove

    case 1001:
      // permission required to download
      return 'KKS.ERROR.PLAYCRAFT.1001'
    // bugs

    case 400: // check API request data

    case 403: // below are server bugs

    case 500:
    case 501:
    default:
      return 'KKS.ERROR'
  }
}

const getErrorInfo = (error = {}) => {
  var _error$response, _error$response$data, _error$response2

  if (
    /network/i.test(error.name + error.message) ||
    /ECONN/.test(error.name + error.code)
  ) {
    const code = [2, error.code].filter(Boolean).join('/')
    return {
      code,
      message: 'KKS.ERROR.NETWORK_ERROR',
    }
  }

  if (error.code) {
    return {...error, message: getPlaycraftErrorMessage(error.code)}
  }

  const data =
    (_error$response = error.response) === null || _error$response === void 0
      ? void 0
      : (_error$response$data = _error$response.data) === null ||
        _error$response$data === void 0
      ? void 0
      : _error$response$data.error

  if (data !== null && data !== void 0 && data.code) {
    return {...data, message: getPlaycraftErrorMessage(data.code)}
  }

  const httpStatus =
    (_error$response2 = error.response) === null || _error$response2 === void 0
      ? void 0
      : _error$response2.status

  if (httpStatus) {
    return {
      code: httpStatus,
      message: `KKS.ERROR.PLAYCRAFT.${httpStatus}`,
    }
  }

  return {
    code: '1',
    message: 'KKS.ERROR',
  }
}

const type$4 = {
  INITIALIZE: 'INITIALIZE',
  INITIALIZED: 'INITIALIZED',
  LOAD_CONTENT: 'LOAD_CONTENT',
  READY_TO_PLAY: 'READY_TO_PLAY',
  BACK: 'BACK',
  CAST_STATE_CHAGNE: 'CAST_STATE_CHAGNE',
  REPLAY: 'REPLAY',
  ERROR: 'ERROR',
}
var Action = {
  initialize: () => ({
    type: type$4.INITIALIZE,
  }),
  initialized: () => ({
    type: type$4.INITIALIZED,
  }),
  loadContent: () => ({
    type: type$4.LOAD_CONTENT,
  }),
  readyToPlay: () => ({
    type: type$4.READY_TO_PLAY,
  }),
  back: () => ({
    type: type$4.BACK,
  }),
  castStateChange: castState => ({
    type: type$4.CAST_STATE_CHAGNE,
    castState,
  }),
  replay: () => ({
    type: type$4.REPLAY,
  }),
  error: (from, error) => {
    console.error(error)
    return {
      type: type$4.ERROR,
      from,
      error: getErrorInfo(error || undefined),
    }
  },
}

const type$3 = {
  CHANGE_NEXT_EPISODE: 'UI_CHANGE_NEXT_EPISODE',
  CHANGE_PREVIOUS_EPISODE: 'UI_CHANGE_PREVIOUS_EPISODE',
  SELECT_QUALITY: 'UI_SELECT_QUALITY',
  SET_QUALITY_ITEMS: 'UI_SET_QUALITY_ITEMS',
  SELECT_MEDIA_SOURCE: 'UI_SELECT_MEDIA_SOURCE',
  SET_MEDIA_SOURCES: 'UI_SET_MEDIA_SOURCES',
  CHANGE_THUMBNAIL_SEEKING: 'CHANGE_THUMBNAIL_SEEKING',
  CHANGE_RECOMMENDATION_PANEL: 'CHANGE_RECOMMENDATION_PANEL',
  TOGGLE_RECOMMENDATION_PANEL: 'TOGGLE_RECOMMENDATION_PANEL',
  OPEN_PANEL: 'OPEN_PANEL',
  HIDE_PANEL: 'HIDE_PANEL',
  OFFER_AUTOPLAY: 'OFFER_AUTOPLAY',
  DISMISS_AUTOPLAY: 'DISMISS_AUTOPLAY',
  SHOW_MENU: 'UI_SHOW_MENU',
  HIDE_MENU: 'UI_HIDE_MENU',
  CHANGE_SETTINGS: 'UI_CHANGE_SETTINGS',
  ERROR: 'UI_ERROR',
  DRAG: 'UI_DRAG',
  DROP: 'UI_DROP',
  FOCUS_SEEK_BAR: 'UI_FOCUS_SEEK_BAR',
  DRAG_SEEK_BAR: 'UI_DRAG_SEEK_BAR',
  DROP_SEEK_BAR: 'UI_DROP_SEEK_BAR',
  LEAVE_SEEK_BAR: 'UI_LEAVE_SEEK_BAR',
  SET_AUTO_PLAY: 'UI_SET_AUTO_PLAY',
  RESET_END_ROLL: 'RESET_END_ROLL',
  STREAM_EVENTS_CHANGED: 'STREAM_EVENTS_CHANGED',
  AD_BREAK_STARTED: 'AD_BREAK_STARTED',
  AD_BREAK_ENDED: 'AD_BREAK_ENDED',
  VISIBILITY_CHANGE: 'VISIBILITY_CHANGE',
  UPDATE_SUBTITLES_CONTENT: 'UPDATE_SUBTITLES_CONTENT',
}
var UiAction = {
  changeNextEpisode: videoId => ({
    type: type$3.CHANGE_NEXT_EPISODE,
    videoId,
  }),
  changePreviousEpisode: videoId => ({
    type: type$3.CHANGE_PREVIOUS_EPISODE,
    videoId,
  }),
  selectQuality: (to, from) => ({
    type: type$3.SELECT_QUALITY,
    to,
    from,
  }),
  setQualityItems: items => ({
    type: type$3.SET_QUALITY_ITEMS,
    items,
  }),
  selectMediaSource: mediaSource => ({
    type: type$3.SELECT_MEDIA_SOURCE,
    mediaSource,
  }),
  setMediaSources: (items = []) => ({
    type: type$3.SET_MEDIA_SOURCES,
    items,
  }),
  enableRecommendationPanel: () => ({
    type: type$3.CHANGE_RECOMMENDATION_PANEL,
    enabled: true,
  }),
  disableRecommendationPanel: () => ({
    type: type$3.CHANGE_RECOMMENDATION_PANEL,
    enabled: false,
  }),
  toggleRecommendationPanel: () => ({
    type: type$3.TOGGLE_RECOMMENDATION_PANEL,
  }),
  openPanel: panel => ({
    type: type$3.OPEN_PANEL,
    panel,
  }),
  hidePanel: () => ({
    type: type$3.HIDE_PANEL,
  }),
  enableThumbnailSeeking: () => ({
    type: type$3.CHANGE_THUMBNAIL_SEEKING,
    enabled: true,
  }),
  disableThumbnailSeeking: () => ({
    type: type$3.CHANGE_THUMBNAIL_SEEKING,
    enabled: false,
  }),
  offerAutoplay: () => ({
    type: type$3.OFFER_AUTOPLAY,
  }),
  dismissAutoplay: () => ({
    type: type$3.DISMISS_AUTOPLAY,
  }),
  showTooltip: (id, border, message) => ({
    type: type$3.SHOW_TOOLTIP,
    message,
    border,
    id,
  }),
  updateTooltip: (id, message) => ({
    type: type$3.UPDATE_TOOLTIP,
    message,
    id,
  }),
  showMenu: () => ({
    type: type$3.SHOW_MENU,
  }),
  hideMenu: id => ({
    type: type$3.HIDE_MENU,
    id,
  }),
  changeSettings: ({id, section, value}) => ({
    type: type$3.CHANGE_SETTINGS,
    section,
    value,
    id,
  }),
  showThumbnail: (id, border, thumbnailTime) => ({
    type: type$3.SHOW_THUMBNAIL,
    thumbnailTime,
    border,
    id,
  }),
  focusSeekBar: seekTime => ({
    type: type$3.FOCUS_SEEK_BAR,
    seekTime,
  }),
  dragSeekBar: () => ({
    type: type$3.DRAG_SEEK_BAR,
  }),
  dropSeekBar: () => ({
    type: type$3.DROP_SEEK_BAR,
  }),
  leaveSeekBar: () => ({
    type: type$3.LEAVE_SEEK_BAR,
  }),
  drag: () => ({
    type: type$3.DRAG,
  }),
  drop: () => ({
    type: type$3.DROP,
  }),
  setAutoPlay: value => ({
    type: type$3.SET_AUTO_PLAY,
    autoPlay: value,
  }),
  streamEventsChanged: (streamEvents, playbackStatus) => ({
    type: type$3.STREAM_EVENTS_CHANGED,
    streamEvents,
    playbackStatus,
  }),
  adBreakStarted: (adProgressData, skipTimeOffset) => ({
    type: type$3.AD_BREAK_STARTED,
    adProgressData,
    skipTimeOffset,
  }),
  adBreakEnded: () => ({
    type: type$3.AD_BREAK_ENDED,
  }),
  visibilityChange: () => ({
    type: type$3.VISIBILITY_CHANGE,
  }),
  updateSubtitlesContent: value => ({
    type: type$3.UPDATE_SUBTITLES_CONTENT,
    content: value,
  }),
  error: error => Action.error('UI', error),
}

const useTimeout = () => {
  const timer = useRef({})
  useEffect(() => () => clearTimeout(timer.current.id), [])
  return [
    (callback, ms) => {
      clearTimeout(timer.current.id)
      timer.current.id = setTimeout(callback, ms)
    },
    () => clearTimeout(timer.current.id),
  ]
}
const useInterval = () => {
  const timer = useRef({})
  useEffect(() => () => clearInterval(timer.current.id), [])
  return [
    (callback, ms) => {
      clearInterval(timer.current.id)
      timer.current.id = setInterval(callback, ms)
    },
    () => clearInterval(timer.current.id),
  ]
}
const useCache = newState => {
  const [state, setState] = useState()
  useEffect(() => {
    if (!shallow(state, newState)) setState(newState)
  })
  return shallow(state, newState) ? state : newState
}

const useDebounce = ({value, delay}) => {
  const [state, dispatch] = useState(value)
  const waiting = useRef()
  useEffect(() => {
    if (waiting.current) {
      waiting.current.value = value
    } else {
      waiting.current = {}
      setTimeout(() => {
        if ('value' in waiting.current) {
          dispatch(waiting.current.value)
        }

        waiting.current = undefined
      }, delay)
      dispatch(value)
    }
  }, [value])
  return state
}

const useAutoHide = ({hideTimeMs = 3000, pinned, tapToHide, onHide} = {}) => {
  const timer = useRef()
  const [mode, setMode] = useState('hidden')

  const interact = () => {
    if (mode !== 'shown') {
      setMode('shown')
    }

    clearTimeout(timer.current)
    timer.current = setTimeout(() => setMode('hidden'), hideTimeMs)
  }

  const hide = () => {
    clearTimeout(timer.current)
    setMode('hidden')
    onHide === null || onHide === void 0 ? void 0 : onHide()
  }

  useEffect(() => {
    if (mode === 'shown') {
      interact()
    }
  }, [hideTimeMs])
  useEffect(() => {
    if (pinned) {
      clearTimeout(timer.current)
    } else {
      interact()
    }
  }, [pinned])
  useEffect(() => () => clearTimeout(timer.current), [])
  return {
    mode: pinned ? 'shown' : mode,
    show: interact,
    hide,
    onClick: event => {
      if (mode === 'hidden') {
        interact()
      } else if (tapToHide && event.target.tagName !== 'BUTTON') {
        // hide if tapping on elsewhere
        hide()
      }
    },
    onMouseMove: () => {
      // In mobile web, emulated clicks generate extra mouse move events
      if (!('ontouchstart' in window)) {
        interact()
      }
    },
  }
}

const on = (target, name, handler) => {
  target.addEventListener(name, handler)
  return () => target.removeEventListener(name, handler)
}

const once = (target, name, handler) => {
  const oneTime = (...args) => {
    handler(...args)
    target.removeEventListener(name, oneTime)
  }

  target.addEventListener(name, oneTime)
  return () => target.removeEventListener(name, oneTime)
}

/* eslint-disable no-bitwise */
const uuidv4 = () => {
  const crypto = window.crypto || window.msCrypto
  return '10000000-1000-4000-8000-100000000000'.replace(/[018]/g, c =>
    (
      c ^
      (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
    ).toString(16)
  )
}

const modes = {
  videos: 'video',
  lives: 'live',
}

const mapLogEvents = ({
  session,
  video,
  version,
  playerName,
  getPlaybackStatus = () => video,
}) => {
  const emitter = mitt()
  const state = {
    status: 'init',
    seeking: false,
    playerStartTime: Date.now(),
    moduleStartTime: Date.now(),
    content: session.getContent(),
  }

  const commonPropties = () => ({
    player_name: playerName,
    playback_module_version: version,
    playback_mode: modes[state.content.type],
    playback_session_id: state.sessionId,
    id: state.content.id,
    name: state.content.title,
    ...(state.content.type === 'videos' && {
      current_position: state.currentTime,
      video_total_duration: state.duration,
    }),
    ...(state.content.type === 'lives' && {
      section_id: state.content.section_id,
      name_2: state.content.channelName,
    }),
    SSAI: state.ssaiProvider || 'None',
  })

  const dispatchStart = () => {
    if (state.status === 'started') {
      return
    }

    state.status = 'started'
    state.lastStartTime = Date.now()
    const eventName = state.isPlayingAd
      ? 'adPlaybackStarted'
      : 'playbackStarted'
    emitter.emit(eventName, commonPropties())
  }

  const dispatchStop = () => {
    if (state.status !== 'started') {
      return
    }

    state.status = 'stopped'
    const played = (Date.now() - state.lastStartTime) / 1000

    if (state.isPlayingAd) {
      state.adPlayedDuration += played
    } else {
      state.playedDuration += played
    }

    const eventName = state.isPlayingAd
      ? 'adPlaybackStopped'
      : 'playbackStopped'
    emitter.emit(eventName, {
      ...commonPropties(),
      ...(state.isPlayingAd && {
        ad_played_duration: played,
      }),
    })
  }

  const registered = [
    on(session, 'error', error => {
      emitter.emit('playbackError', {
        module_error_code: error.code,
        ...commonPropties(),
      })
    }),
    once(session, 'playerStarted', () => {
      state.playerStartTime = Date.now()
    }),
    once(session, 'playbackBegan', event => {
      var _event$data

      state.sessionId = uuidv4()
      state.playedDuration = 0
      state.content = session.getContent()
      state.ssaiProvider =
        (_event$data = event.data) === null || _event$data === void 0
          ? void 0
          : _event$data.ssaiProvider
      state.adPlayedDuration = 0
    }),
    on(video, 'durationchange', () => {
      // duration may change when playing an ad stitched stream, take only initial value
      if (!state.duration) {
        state.duration = getPlaybackStatus().duration
      }
    }),
    once(video, 'canplay', () => {
      state.status = 'began'
      emitter.emit('playbackBegan', {
        player_startup_time:
          (state.playerStartTime - state.moduleStartTime) / 1000,
        video_startup_time: (Date.now() - state.moduleStartTime) / 1000,
        ...commonPropties(),
      })
    }),
    on(video, 'playing', dispatchStart),
    on(video, 'timeupdate', () => {
      state.currentTime = getPlaybackStatus().currentTime
    }),
    on(video, 'pause', dispatchStop),
    on(video, 'seeking', () => {
      state.seekingFrom = state.currentTime
    }),
    on(session, 'userSeeking', () => {
      state.seeking = true
    }),
    on(video, 'seeked', () => {
      if (state.seeking) {
        emitter.emit('seeked', {
          seeking_from: state.seekingFrom,
          seeking_to: video.currentTime,
          ...commonPropties(),
        })
      }

      state.seeking = false
    }),
    on(session, 'sectionChange', () => {
      dispatchStop()
      state.content = session.getContent()
      dispatchStart()
    }),
    once(session, 'playbackEnded', () => {
      if (state.status === 'started') {
        dispatchStop()
      }

      state.status = 'init'
      emitter.emit('playbackEnded', {
        video_playback_ended_at_percentage: state.currentTime / state.duration,
        video_total_played_duration: state.playedDuration,
        ...(state.ssaiProvider && {
          ad_total_played_duration: state.adPlayedDuration,
        }),
        ...commonPropties(),
      })
    }),
    on(session, 'adBreakStarted', () => {
      dispatchStop()
      state.isPlayingAd = true

      if (!state.seeking) {
        dispatchStart()
      }
    }),
    on(session, 'adBreakEnded', () => {
      dispatchStop()
      state.isPlayingAd = false

      if (!state.seeking) {
        dispatchStart()
      }
    }),
  ]
  return {
    addEventListener: (name, handler) => emitter.on(name, handler),
    all: handler => emitter.on('*', handler),
    reset: () => registered.forEach(off => off()),
  }
}

const createSession = () => {
  const state = {
    content: {},
  }
  const emitter = mitt()
  return {
    addEventListener: (name, handler) => emitter.on(name, handler),
    removeEventListener: (name, handler) => emitter.off(name, handler),
    dispatchEvent: event => {
      var _event$data

      if (
        (_event$data = event.data) !== null &&
        _event$data !== void 0 &&
        _event$data.content
      ) {
        state.content = {
          type: event.data.content.contentType,
          id: event.data.content.id,
          title: event.data.content.title,
        }
      }

      emitter.emit(event.type, event)
    },
    getContent: () => state.content,
    end: () => {
      emitter.emit('playbackEnded')
    },
  }
}

const playerContext = /*#__PURE__*/ createContext({})

const getPlaybackStatus$1 = (video, plugins) =>
  Object.assign(
    {
      currentTime: video.currentTime,
      duration: video.duration,
    },
    ...plugins.map(plugin => {
      var _plugin$getPlaybackSt

      return (_plugin$getPlaybackSt = plugin.getPlaybackStatus) === null ||
        _plugin$getPlaybackSt === void 0
        ? void 0
        : _plugin$getPlaybackSt.call(plugin)
    })
  )

const logEventNames = {
  playbackBegan: 'video_playback_began',
  playbackStarted: 'video_playback_started',
  playbackStopped: 'video_playback_stopped',
  playbackEnded: 'video_playback_ended',
  seeked: 'video_seeking_ended',
  error: 'video_playback_error_occurred',
  adPlaybackStarted: 'ad_playback_started',
  adPlaybackStopped: 'ad_playback_stopped',
}

const PlayerProvider = ({
  options,
  content,
  videoRef,
  uiRef,
  children,
  sendLog,
}) => {
  const instance = useRef({})
  instance.current.videoRef = videoRef
  instance.current.uiRef = uiRef
  instance.current.options = options
  useEffect(() => {
    instance.current.session = createSession()
    const logTarget = mapLogEvents({
      session: instance.current.session,
      playerName: 'bitmovin',
      version: '1.4.0-canary.0',
      video: videoRef.current,
      getPlaybackStatus: () =>
        getPlaybackStatus$1(videoRef.current, options.plugins),
    })

    if (typeof sendLog === 'function') {
      logTarget.all((type, data) => sendLog(logEventNames[type], data))
    }

    return () => {
      instance.current.session.end()
      logTarget.reset()
    }
  }, [content.contentType, content.contentId])
  return /*#__PURE__*/ jsx(playerContext.Provider, {
    value: instance.current,
    children: children,
  })
}

PlayerProvider.propTypes = {
  options: propTypes.object,
  content: propTypes.object,
  videoRef: propTypes.object,
  uiRef: propTypes.object,
  sendLog: propTypes.func,
  children: propTypes.node,
}

const useSetPlayer = () => {
  const ref = useContext(playerContext)
  return player => {
    ref.player = player
  }
}

const usePlayer = () => {
  const ref = useContext(playerContext)
  return ref.player
}

const useUiContainer = () => {
  var _ref$uiRef

  const ref = useContext(playerContext)
  return (_ref$uiRef = ref.uiRef) === null || _ref$uiRef === void 0
    ? void 0
    : _ref$uiRef.current
}

const useUiRef = () => {
  const ref = useContext(playerContext)
  return ref.uiRef
}

const useVideoRef = () => {
  const ref = useContext(playerContext)
  return ref.videoRef
}

const useOptions = () => useContext(playerContext).options

const useDispatchSessionEvent = () => {
  const ref = useContext(playerContext)
  return (type, data) =>
    ref.session.dispatchEvent({
      type,
      data,
    })
}

const Context = {
  Adapter: /*#__PURE__*/ React.createContext(),
  Full: /*#__PURE__*/ React.createContext(),
  Module: /*#__PURE__*/ React.createContext(),
  LocalStorage: /*#__PURE__*/ React.createContext(),
  Player: /*#__PURE__*/ React.createContext(),
  PlayerState: /*#__PURE__*/ React.createContext(),
  PlayerViewMode: /*#__PURE__*/ React.createContext(),
  PlayerProgress: /*#__PURE__*/ React.createContext(),
  PlayerVolume: /*#__PURE__*/ React.createContext(),
  API: /*#__PURE__*/ React.createContext(),
  UI: /*#__PURE__*/ React.createContext(),
}

const StoreProvider = ({store, options = {}, children = ''}) => {
  const [state, setState] = useState(() => {
    store.addChangedListener(store => setState(store.getState()))
    return store.getState()
  })
  const dispatch = store.dispatch
  const dispatchSessionEvent = useDispatchSessionEvent()
  useEffect(() => {
    const handleStart = event => {
      var _event$getAd

      dispatchSessionEvent('adBreakStarted')
      store.dispatch(
        UiAction.adBreakStarted(
          event.getStreamData().adProgressData,
          (_event$getAd = event.getAd()) === null || _event$getAd === void 0
            ? void 0
            : _event$getAd.getSkipTimeOffset()
        )
      )
    }

    return linkPluginEvents(options.plugins, {
      cuepointsChanged: (event, plugin) =>
        store.dispatch(
          UiAction.streamEventsChanged(
            event.getStreamData().cuepoints,
            plugin.getPlaybackStatus()
          )
        ),
      adBreakStarted: handleStart,
      adProgress: handleStart,
      adBreakEnded: () => {
        dispatchSessionEvent('adBreakEnded')
        store.dispatch(UiAction.adBreakEnded())
      },
    })
  }, [])
  return /*#__PURE__*/ jsx(React.Fragment, {
    children: /*#__PURE__*/ jsx(Context.Adapter.Provider, {
      value: store,
      children: /*#__PURE__*/ jsx(Context.Full.Provider, {
        value: useCache({
          state,
          dispatch,
        }),
        children: /*#__PURE__*/ jsx(Context.Module.Provider, {
          value: useCache({
            state: state.Module,
            options,
            dispatch,
          }),
          children: /*#__PURE__*/ jsx(Context.UI.Provider, {
            value: useCache({
              state: state.UI,
              dispatch,
            }),
            children: /*#__PURE__*/ jsx(Context.API.Provider, {
              value: useCache({
                state: state.API,
                dispatch,
              }),
              children: /*#__PURE__*/ jsx(Context.Player.Provider, {
                value: useCache({
                  state: state.Player,
                  dispatch,
                }),
                children: /*#__PURE__*/ jsx(Context.PlayerState.Provider, {
                  value: useCache({
                    state: state.Player.playerState,
                    dispatch,
                  }),
                  children: /*#__PURE__*/ jsx(Context.PlayerViewMode.Provider, {
                    value: useCache({
                      state: state.Player.viewMode,
                      dispatch,
                    }),
                    children: /*#__PURE__*/ jsx(
                      Context.PlayerProgress.Provider,
                      {
                        value: useCache({
                          state: state.Player.progress,
                          dispatch,
                        }),
                        children: /*#__PURE__*/ jsx(
                          Context.PlayerVolume.Provider,
                          {
                            value: useCache({
                              state: state.Player.volume,
                              dispatch,
                            }),
                            children: children,
                          }
                        ),
                      }
                    ),
                  }),
                }),
              }),
            }),
          }),
        }),
      }),
    }),
  })
}

StoreProvider.propTypes = {
  store: propTypes.object,
  options: propTypes.object,
  plugins: propTypes.array,
  children: propTypes.node,
}

const castContext = /*#__PURE__*/ createContext()
const defaultCastContext = {
  state: {},
  actions: {
    hasPrevious: () => false,
    hasNext: () => false,
  },
}

;({
  appId: propTypes.string,
  host: propTypes.string,
  accessToken: propTypes.string,
  deviceId: propTypes.string,
  customHeader: propTypes.object,
  lang: Types.LanguageCode,
  children: propTypes.node,
  onConnected: propTypes.func,
  onCasting: propTypes.func,
  onError: propTypes.func,
})

const useCastContext = () => useContext(castContext) || defaultCastContext

castContext.Consumer

const getMediaSource = (state, defaultMediaSource) => {
  const {
    UI: {selectedMediaSource, mediaSourcePrecedence},
  } = state
  return mediaSourcePrecedence === 'application'
    ? defaultMediaSource
    : selectedMediaSource
}

const type$2 = {
  MOUNT: 'PLAYER_MOUNT',
  MOUNTED: 'PLAYER_MOUNTED',
  LOAD: 'PLAYER_LOAD',
  LOADED: 'PLAYER_LOADED',
  UNLOAD: 'PLAYER_UNLOAD',
  UNLOADED: 'PLAYER_UNLOADED',
  READY: 'PLAYER_READY',
  FETCH_STATE: 'PLAYER_FETCH_STATE',
  SET_STATE: 'PLAYER_SET_STATE',
  UNMOUNT: 'PLAYER_UNMOUNT',
  PLAY: 'PLAYER_PLAY',
  PLAYING: 'PLAYER_PLAYING',
  PAUSE: 'PLAYER_PAUSE',
  PAUSED: 'PLAYER_PAUSED',
  ENDED: 'PLAYER_ENDED',
  UPDATE_CURRENT_TIME: 'PLAYER_UPDATE_CURRENT_TIME',
  SEEK: 'PLAYER_SEEK',
  SEEKED: 'PLAYER_SEEKED',
  UPDATE_VOLUME: 'PLAYER_UPDATE_VOLUME',
  SET_VOLUME: 'PLAYER_SET_VOLUME',
  MUTE: 'PLAYER_MUTE',
  MUTED: 'PLAYER_MUTED',
  UNMUTE: 'PLAYER_UNMUTE',
  UNMUTED: 'PLAYER_UNMUTED',
  ENTER_FULL_SCREEN: 'PLAYER_ENTER_FULL_SCREEN',
  LEAVE_FULL_SCREEN: 'PLAYER_LEAVE_FULL_SCREEN',
  UPDATE_VIEW_MODE: 'PLAYER_UPDATE_VIEW_MODE',
  UPDATE_BUFFER_TIME: 'PLAYER_UPDATE_BUFFER_TIME',
  STALLING: 'PLAYER_STALLING',
  STALLED: 'PLAYER_STALLED',
  CHANGE_DASH_QUALITY: 'PLAYER_CHANGE_DASH_QUALITY',
}
var PlayerAction = {
  mount: () => ({
    type: type$2.MOUNT,
  }),
  mounted: () => ({
    type: type$2.MOUNTED,
  }),
  load: () => ({
    type: type$2.LOAD,
  }),
  loaded: payload => ({
    type: type$2.LOADED,
    payload,
  }),
  unload: () => ({
    type: type$2.UNLOAD,
  }),
  unloaded: () => ({
    type: type$2.UNLOADED,
  }),
  ready: () => ({
    type: type$2.READY,
  }),
  fetchState: () => ({
    type: type$2.FETCH_STATE,
  }),
  setState: state => ({
    type: type$2.SET_STATE,
    state,
  }),
  unmount: () => ({
    type: type$2.UNMOUNT,
  }),
  play: () => ({
    type: type$2.PLAY,
  }),
  playing: () => ({
    type: type$2.PLAYING,
  }),
  pause: () => ({
    type: type$2.PAUSE,
  }),
  paused: () => ({
    type: type$2.PAUSED,
  }),
  ended: () => ({
    type: type$2.ENDED,
  }),
  updateCurrentTime: ({currentTime: time, adRemainingTime}) => ({
    type: type$2.UPDATE_CURRENT_TIME,
    time,
    adRemainingTime,
  }),
  seek: time => ({
    type: type$2.SEEK,
    time,
  }),
  seeked: time => ({
    type: type$2.SEEKED,
    time,
  }),
  setVolume: volume => ({
    type: type$2.SET_VOLUME,
    volume,
  }),
  updateVolume: volume => ({
    type: type$2.UPDATE_VOLUME,
    volume,
  }),
  mute: () => ({
    type: type$2.MUTE,
  }),
  muted: () => ({
    type: type$2.MUTED,
  }),
  unmute: () => ({
    type: type$2.UNMUTE,
  }),
  unmuted: () => ({
    type: type$2.UNMUTED,
  }),
  enterFullScreen: () => ({
    type: type$2.ENTER_FULL_SCREEN,
  }),
  leaveFullScreen: () => ({
    type: type$2.LEAVE_FULL_SCREEN,
  }),
  updateViewMode: mode => ({
    type: type$2.UPDATE_VIEW_MODE,
    mode,
  }),
  updateBufferTime: time => ({
    type: type$2.UPDATE_BUFFER_TIME,
    time,
  }),
  stalling: () => ({
    type: type$2.STALLING,
  }),
  stalled: () => ({
    type: type$2.STALLED,
  }),
  changeDashQuality: () => ({
    type: type$2.CHANGE_DASH_QUALITY,
  }),
  error: error => Action.error('Player', error),
}

const type$1 = {
  LOAD: 'LOCAL_STORAGE_LOAD',
  SAVE: 'LOCAL_STORAGE_SAVE',
}
const action = {
  load: key => ({
    type: type$1.LOAD,
    key,
  }),
  save: (key, value) => ({
    type: type$1.SAVE,
    key,
    value,
  }),
}

const getLocalStorageValue = (key, defaultValue) => {
  try {
    const source = localStorage.getItem(key)

    if (typeof source === 'string') {
      return JSON.parse(source)
    } // eslint-disable-next-line no-empty
  } catch (error) {}

  return defaultValue
}

const setLocalStorageValue = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value))
}

const _localStorage = () => next => action => {
  switch (action.type) {
    case type$1.LOAD:
      action.value = getLocalStorageValue(action.key)
      break

    case type$1.SAVE:
      setLocalStorageValue(action.key, action.value)
      break
  }

  return next(action)
}

const type = {
  CLEAN: 'API_CLEAN',
  DISABLE: 'API_DISABLE',
  ENABLE: 'API_ENABLE',
  PREVIEW_CONTENT: 'API_PREVIEW_CONTENT',
  PREPARE_PLAYBACK: 'API_PREPARE_PLAYBACK',
  PREPARE_THUMBNAIL: 'API_PREPARE_THUMBNAIL',
  SET_PLAYBACK: 'API_SET_PLAYBACK',
  SET_THUMBNAILS: 'API_SET_THUMBNAILS',
  READY: 'API_READY',
  REFRESH_PLAYBACK_TOKEN: 'API_REFRESH_PLAYBACK_TOKEN',
  UPDATE_LAST_PLAYED_TIME: 'API_UPDATE_LAST_PLAYED_TIME',
  UPDATE_PLAYED_END: 'API_UPDATE_PLAYED_END',
  REFRESH_CONTENT: 'API_REFRESH_CONTENT',
  SET_CONTENT: 'API_SET_CONTENT',
  END_PROGRAM: 'API_END_PROGRAM',
  CHANGE_PROGRAM: 'API_CHANGE_PROGRAM',
  END_SECTION: 'API_END_SECTION',
  CHANGE_SECTION: 'API_CHANGE_SECTION',
  CONTENT_CHANGE: 'API_CONTENT_CHANGE',
  END_LIVE_TYPE: 'API_END_LIVE_TYPE',
}
var APIAction = {
  contentChange: () => ({
    type: type.CONTENT_CHANGE,
  }),
  clean: () => ({
    type: type.CLEAN,
  }),
  disable: () => ({
    type: type.DISABLE,
  }),
  enable: (content, customHeader) => ({
    type: type.ENABLE,
    content,
    customHeader,
  }),
  previewContent: () => ({
    type: type.PREVIEW_CONTENT,
  }),
  preparePlayback: () => ({
    type: type.PREPARE_PLAYBACK,
  }),
  prepareThumbnail: () => ({
    type: type.PREPARE_THUMBNAIL,
  }),
  setPlayback: playbackInfo => ({
    type: type.SET_PLAYBACK,
    playbackInfo,
  }),
  setThumbnails: thumbnails => ({
    type: type.SET_THUMBNAILS,
    thumbnails,
  }),
  ready: () => ({
    type: type.READY,
  }),
  refreshPlaybackToken: sessionData => ({
    type: type.REFRESH_PLAYBACK_TOKEN,
    sessionData,
  }),
  updateLastPlayedTime: time => ({
    type: type.UPDATE_LAST_PLAYED_TIME,
    time,
  }),
  updatePlayedEnd: () => ({
    type: type.UPDATE_PLAYED_END,
  }),
  refreshContent: () => ({
    type: type.REFRESH_CONTENT,
  }),
  setContent: content => ({
    type: type.SET_CONTENT,
    content,
  }),
  endProgram: () => ({
    type: type.END_PROGRAM,
  }),
  changeProgram: (oldId, newId) => ({
    type: type.CHANGE_PROGRAM,
    oldId,
    newId,
  }),
  endSection: () => ({
    type: type.END_SECTION,
  }),
  changeSection: (oldId, newId) => ({
    type: type.CHANGE_SECTION,
    oldId,
    newId,
  }),
  endLiveType: () => ({
    type: type.END_LIVE_TYPE,
  }),
  error: error => Action.error('API', error),
}

const waitStateChange = (store, check) => {
  return new Promise(res => {
    if (check(store.getState())) return res()
    const removeListener = store.addChangedListener(store => {
      const state = store.getState()

      if (check(state)) {
        removeListener()
        res()
      }
    })
  })
}
const waitActionDispatch = (store, check) => {
  return new Promise(res => {
    const removeListener = store.addDispatchedListener((store, action) => {
      if (check(action)) {
        removeListener()
        res()
      }
    })
  })
}

const waitChainReaction = async (trigger, result) => {
  let _result = result()

  await trigger()
  await _result
}

const operator = {
  error: async store => {
    await operator.unload(store)
  },
  initialize: async store => {
    const {dispatch} = store
    dispatch(Action.initialize())
    Object.values(StorageKey).forEach(key => dispatch(action.load(key)))
    await waitChainReaction(
      () => dispatch(PlayerAction.mount()),
      () =>
        waitStateChange(
          store,
          ({Player: {playerState}}) => playerState === PlayerState$1.MOUNTED
        )
    )
    await waitChainReaction(
      () => dispatch(PlayerAction.fetchState()),
      () => waitActionDispatch(store, ({type}) => type === type$2.SET_STATE)
    )
    dispatch(Action.initialized())
  },
  loadContent: async store => {
    const {dispatch, getState} = store

    const getModuleState = () => getState().Module.state

    if (
      isInScope(ModuleState.INITIALIZED, getModuleState(), ModuleState.READY)
    ) {
      await waitStateChange(
        store,
        ({API: {apiState}}) => apiState !== APIState.DISABLE
      )
      dispatch(Action.loadContent())
      await waitChainReaction(
        () => dispatch(APIAction.previewContent()),
        () =>
          waitActionDispatch(
            store,
            ({type: type$1}) => type$1 === type.SET_CONTENT
          )
      )
      await waitChainReaction(
        () => dispatch(APIAction.preparePlayback()),
        () =>
          waitActionDispatch(
            store,
            ({type: type$1}) => type$1 === type.SET_PLAYBACK
          )
      )
      await waitChainReaction(
        () => dispatch(APIAction.prepareThumbnail()),
        () =>
          waitActionDispatch(store, ({type: type$1}) => type$1 === type.READY)
      )

      if (getState().Module.castState === CastState.CONNECTED) {
        // if connected to Cast, abort loading
        return operator.unload(store)
      }

      if (!_get(getState(), 'API.content.end')) {
        await waitChainReaction(
          () => dispatch(PlayerAction.load()),
          () => waitActionDispatch(store, ({type}) => type === type$2.READY)
        )
        const {
          Player: {streamType},
          API: {manifests, availableSources},
        } = getState()
        dispatch(
          UiAction.setQualityItems(
            manifests[streamType].resolutions.map(item => ({
              ...item,
              value: `${item.height}p`,
            }))
          )
        )
        dispatch(UiAction.setMediaSources(availableSources))
      }

      dispatch(Action.readyToPlay())
    } else {
      throw Error('The current state does not allow this action')
    }
  },
  changeQuality: (to, from) => async store => {
    const {dispatch, getState} = store
    const {
      Player: {playerState, streamType},
    } = getState()
    dispatch(UiAction.selectQuality(to, from))

    if (playerState !== PlayerState$1.ENDED) {
      if (streamType !== 'hls') {
        dispatch(PlayerAction.changeDashQuality())
        dispatch(PlayerAction.play())
      }

      waitActionDispatch(store, ({type}) => type === type$2.READY).then(() =>
        dispatch(PlayerAction.play())
      )
    }
  },
  changeMediaSource: mediaSource => async store => {
    const {dispatch, getState} = store
    const {
      API: {content, customHeader},
      Player: {
        playerState,
        progress: {progressTime},
      },
    } = getState()
    dispatch(APIAction.updateLastPlayedTime(progressTime))
    dispatch(UiAction.selectMediaSource(mediaSource))
    await waitChainReaction(
      // this will trigger loading selected media source
      () => dispatch(APIAction.enable(content, customHeader)),
      () => waitActionDispatch(store, ({type}) => type === type$2.READY)
    )
    if (playerState === PlayerState$1.ENDED) await operator.replay(store)
    else dispatch(PlayerAction.play())
  },
  replay: async store => {
    await operator.unload(store)
    await operator.loadContent(store)
    store.dispatch(PlayerAction.play())
    store.dispatch(Action.replay())
  },
  retry: async store => {
    await operator.unload(store)
    await operator.loadContent(store)
  },
  unload: async store => {
    const dispatch = store.dispatch
    dispatch(APIAction.clean())
    await waitChainReaction(
      () => dispatch(PlayerAction.unload()),
      () => waitActionDispatch(store, ({type}) => type === type$2.UNLOADED)
    )
  },
  prepareCast: async store => {
    const playerState = store.getState().Player.playerState // player mounting can't be cancelled

    if (playerState === PlayerState$1.MOUNTING) {
      await waitStateChange(
        store,
        ({Player: {playerState}}) => playerState === PlayerState$1.MOUNTED
      )
    } // mounted state is not playing video

    if (
      playerState !== PlayerState$1.MOUNTED &&
      playerState !== PlayerState$1.UNMOUNTED
    ) {
      await operator.unload(store)
    } else {
      store.dispatch(PlayerAction.unloaded())
    }
  },
  seek: time => async store => {
    if (_get(store.getState(), 'Player.playerState') === PlayerState$1.ENDED) {
      await operator.replay(store)
    } else {
      store.dispatch(PlayerAction.play())
    } //Player ignores seeking if target is too close to current position,
    //subsequent events won't fire, so don't seek to avoid gliches.

    if (Math.abs(time - store.getState().Player.progress.progressTime) > 1) {
      store.dispatch(PlayerAction.seek(time))
    }
  },
}

const contentEqual = (
  {contentType, contentId, licenseId, mediaSource},
  state
) =>
  _get(state, 'castingMedia.contentId') === contentId &&
  _get(state, 'customData.itemType') === contentType &&
  _get(state, 'customData.licenseId') === licenseId &&
  _get(state, 'customData.mediaSource') === mediaSource

const useDebounced = (value, {timeMs = 500} = {}) => {
  const [state, setState] = useState(value)
  const timer = useRef({})
  useEffect(() => {
    timer.current = setTimeout(() => setState(value), timeMs)
    return () => clearTimeout(timer.current)
  }, [value])
  return state
}

const CastAdapter = ({
  content = {},
  mediaSource: defaultMediaSource,
  customQuery,
}) => {
  const store = useContext(Context.Adapter)
  const {
    state,
    actions: {loadContent},
  } = useCastContext()
  const lastState = useRef()
  const [
    castState,
    contentType,
    contentId,
    mediaSource,
    licenseId,
  ] = useDebounced([
    state.castState,
    content.contentType,
    content.contentId,
    getMediaSource(store.getState(), defaultMediaSource),
    content.licenseId,
  ])
  useEffect(() => {
    store.dispatch(Action.castStateChange(castState))
  }, [castState])
  useEffect(() => {
    const contentIsLoaded = contentEqual(
      {
        contentId,
        contentType,
        licenseId,
        mediaSource,
      },
      state
    )

    switch (castState) {
      case CastState.CONNECTED:
        waitActionDispatch(store, ({type}) => {
          return type === type$2.UNLOADED
        }).then(() => {
          if (!contentIsLoaded) {
            // id, and mediaSource changes are dispatched separately
            // this means to batch these changes
            loadContent({
              contentId,
              mediaSource,
              customQuery,
              licenseId,
              contentType,
            })
          }
        })
        store.dispatch(operator.prepareCast)
        lastState.current = castState
        return

      case CastState.NOT_CONNECTED:
        if (lastState.current === CastState.CONNECTED) {
          store.dispatch(Action.initialized())
        }

        lastState.current = castState
        return
    }
  }, [castState, contentId, contentType, mediaSource, licenseId])
  return null
}

CastAdapter.propTypes = {
  content: Types.VideoInfo,
  mediaSource: propTypes.string,
  customQuery: propTypes.object,
}
CastAdapter.defaultProps = {
  content: null,
  mediaSource: null,
  customQuery: {},
}

const LIMIT_INFO_LIFE_MS = 10000
const CHECK_INTERVAL_MS = 3000

const getSavedAuthId = state => {
  const limitInfo = state.LocalStorage[StorageKey.LIMIT_ONE_PLAYBACK] || {}
  const {expiresAt} = limitInfo

  if (limitInfo.authId && /^\d+$/.test(expiresAt) && Date.now() <= expiresAt) {
    return limitInfo.authId
  }
}

const LimitOnePlayback = ({enabled}) => {
  const authRef = useRef()
  const {
    state: {state: moduleState},
  } = useContext(Context.Module)
  const store = useContext(Context.Adapter)
  const [startInterval, stopInterval] = useInterval()

  const checkOnePlayback = () => {
    store.dispatch(action.load(StorageKey.LIMIT_ONE_PLAYBACK))
    const savedAuthId = getSavedAuthId(store.getState())

    if (!savedAuthId || savedAuthId === authRef.current) {
      store.dispatch(
        action.save(StorageKey.LIMIT_ONE_PLAYBACK, {
          authId: authRef.current,
          expiresAt: Date.now() + LIMIT_INFO_LIFE_MS,
        })
      )
    } else {
      store.dispatch(
        Action.error('API', {
          code: 10021,
        })
      )
    }
  }

  const clearKey = () => {
    const savedAuthId = getSavedAuthId(store.getState())
    if (savedAuthId === authRef.current)
      store.dispatch(action.save(StorageKey.LIMIT_ONE_PLAYBACK, {}))
  }

  const addUnloadListeners = () => {
    window.addEventListener('beforeunload', clearKey)
    window.addEventListener('unload', clearKey)
  }

  const removeUnloadListeners = () => {
    window.removeEventListener('beforeunload', clearKey)
    window.removeEventListener('unload', clearKey)
  }

  useEffect(() => {
    authRef.current = uuidv4()

    if (enabled && moduleState !== ModuleState.ERROR) {
      checkOnePlayback()
      startInterval(() => checkOnePlayback(), CHECK_INTERVAL_MS)
      addUnloadListeners()
      return () => {
        stopInterval()
        removeUnloadListeners()
        clearKey()
      }
    }
  }, [enabled, moduleState !== ModuleState.ERROR])
  return null
}

const LocalStorage$1 = () => {
  const store = useContext(Context.Adapter)
  useEffect(() => {
    return store.addDispatchedListener((store, action$1) => {
      switch (action$1.type) {
        case type$2.UPDATE_VOLUME:
          return store.dispatch(
            action.save(StorageKey.VOLUME, {
              ...store.getState().Player.volume,
              volume: action$1.volume,
            })
          )

        case type$2.MUTED:
          return store.dispatch(
            action.save(StorageKey.VOLUME, {
              ...store.getState().Player.volume,
              muted: true,
            })
          )

        case type$2.UNMUTED:
          return store.dispatch(
            action.save(StorageKey.VOLUME, {
              ...store.getState().Player.volume,
              muted: false,
            })
          )
      }
    })
  }, [])
  return null
}

const parseVTT = data => {
  const lines = data.split(/\n\n/g).slice(1)
  return Promise.resolve(
    lines.map(line => {
      const [time, text] = line.split('\n')
      const [startTime, endTime] = time.split('-->').map(convertToSeconds)
      return {
        startTime,
        endTime,
        text,
      }
    })
  )
}

const replaceLast = (url, path) => url.replace(/\/[^/]+$/, `/${path}`)

const parseThumbnails = (data, url) =>
  parseVTT(data)
    .then(items =>
      items.map(item => {
        const [imagePath, , x, y, width, height] = item.text.split(/[#=,]/g)
        return {
          startTime: item.startTime,
          endTime: item.endTime,
          image: replaceLast(url, imagePath),
          position: {
            x: parseFloat(x),
            y: parseFloat(y),
            width: parseFloat(width),
            height: parseFloat(height),
          },
        }
      })
    )
    .then(items =>
      Promise.all([
        items,
        ...Object.entries(
          items.reduce(
            (res, {image}) => ({
              ...res,
              // TODO it's not necessary to block for downloading all images
              // replace commit a356628e with better preload approach
              [image]:
                res[image] ||
                axios.get(image, {
                  responseType: 'blob',
                }),
            }),
            {}
          )
        ).map(([key, req]) =>
          req.then(resp => [key, URL.createObjectURL(resp.data)])
        ),
      ])
    )
    .then(([items, ...blobUrls]) => {
      const mapSrcToBlobUrl = blobUrls.reduce(
        (res, [key, blobUrl]) => ({...res, [key]: blobUrl}),
        {}
      )
      return items.map(item => ({...item, image: mapSrcToBlobUrl[item.image]}))
    })

function getHeader({accessToken, deviceId, customHeader}) {
  return {
    'Cache-Control': 'no-cache',
    Authorization: accessToken || '',
    'X-Device-ID': deviceId || '',
    'Content-type': 'application/json',
    ...customHeader,
  }
}

const retry3 = (callback, time) => {
  const delay = time => new Promise(res => setTimeout(res, time))

  const PromiseRejectFilter = condition => callback => error =>
    condition(error) ? callback(error) : Promise.reject(error)

  const filterNetworkError = PromiseRejectFilter(
    ({message}) => message === 'Network Error'
  )
  return callback()
    .catch(filterNetworkError(() => delay(time).then(callback)))
    .catch(filterNetworkError(() => delay(time).then(callback)))
}

var Resource = ({host, accessToken, deviceId, customHeader, customQuery}) => {
  const headers = getHeader({
    accessToken,
    deviceId,
    customHeader,
  })

  const request = (method, url, query = {}) =>
    retry3(
      () =>
        axios(url, {
          method,
          headers,
          params: {...customQuery, ...query},
        }).then(({data}) => data),
      3000
    )

  const sessionPath = (id, type) =>
    `${host}/sessions/${type}/${id}/playback/${deviceId}`

  return {
    videos: ({id, query}) =>
      request('GET', `${host}/videos/${id}`, query).then(data => ({
        id: data.id,
        title: data.title,
        time: {
          last_played: data.time.last_position,
          endStart: data.time.end_start_position,
        },
        recommend: {
          previous: data.prev_video && {
            ...data.prev_video,
            images: [
              {
                url: data.prev_video.image_url,
              },
            ],
          },
          next: data.next_video && {
            ...data.next_video,
            images: [
              {
                url: data.next_video.image_url,
              },
            ],
          },
        },
      })),
    lives: ({id, query}) => request('GET', `${host}/lives/${id}`, query),
    playbackStart: ({id, type, query}) =>
      request('POST', `${sessionPath(id, type)}/start`, query),
    playbackInfo: ({id, type, query, token}) =>
      request('GET', `${sessionPath(id, type)}/info`, {
        ...query,
        playback_token: token,
      }),
    heartbeat: ({id, type, query, token}) =>
      request('POST', `${sessionPath(id, type)}/heartbeat`, {
        ...query,
        playback_token: token,
      }),
    playbackEnd: ({id, type, query, token}) =>
      request('POST', `${sessionPath(id, type)}/end`, {
        ...query,
        playback_token: token,
      }),
    updateLastPlayedTime: ({id, type, position, token, query}) =>
      request(
        'POST',
        `${sessionPath(id, type)}/position/${Math.floor(position)}`,
        {...query, playback_token: token}
      ),
    playbackTokenInfo: ({token, query}) =>
      request('POST', `${host}/playback/tokens/${token}`, query),
  }
}

class Session {
  constructor(resource, id, type, query) {
    this.resource = resource
    this.id = id
    this.type = type
    this.query = query
    this.resourceInfo = {
      id: this.id,
      type: this.type,
      query: {...this.query, type: this.type},
    }
    this.playbackToken = null
    this._startPromise = null
    this._endPromise = {}
  }

  start() {
    if (this._startPromise === null) {
      this._startPromise = this.resource
        .playbackStart(this.resourceInfo)
        .then(tokenInfo => {
          this.playbackToken = tokenInfo
          this._startPromise = null
          return tokenInfo
        })
    }

    return this._startPromise
  }

  info() {
    return (
      this.playbackToken &&
      this.resource.playbackInfo({
        ...this.resourceInfo,
        token: this.playbackToken.token,
      })
    )
  }

  heartbeat() {
    return (
      this.playbackToken &&
      this.resource.heartbeat({
        ...this.resourceInfo,
        token: this.playbackToken.token,
      })
    )
  }

  end() {
    const token = this.playbackToken && this.playbackToken.token

    if (token && !this._endPromise[token]) {
      this._endPromise[token] = this.resource
        .playbackEnd({...this.resourceInfo, token}) // token might be already expired
        .catch(() => {})
        .then(() => {
          this._endPromise[token] = null
        })

      if (this.playbackToken.token === token) {
        this.playbackToken = null
      }
    }

    return this._endPromise[token]
  }

  async restart() {
    await this.end()
    return this.start()
  }

  updateLastPlayedTime(time) {
    return (
      this.playbackToken &&
      this.resource.updateLastPlayedTime({
        ...this.resourceInfo,
        token: this.playbackToken.token,
        position: Math.floor(time),
      })
    )
  }
}

const HEARTBEAT_INTERVAL = 10000

const API$1 = ({
  host,
  accessToken,
  deviceId,
  content,
  customHeader,
  customQuery,
  preferredConfig: {preferredMediaSource},
}) => {
  const session = useRef(null)
  const dispatchSessionEvent = useDispatchSessionEvent()
  const [setInterval, clearInterval] = useInterval()
  const store = useContext(Context.Adapter)
  const isActivatable =
    host &&
    content &&
    content.contentId !== undefined &&
    content.contentType !== undefined
  useEffect(() => {
    if (isActivatable) {
      store.dispatch(APIAction.enable(content, customHeader))
    } else {
      store.dispatch(APIAction.disable())
    }

    if (session.current) {
      dispatchSessionEvent('playbackEnded')
      session.current.end()
    }

    session.current = null
  }, [host, content.contentId, content.contentType])
  useEffect(() => {
    const {contentId, contentType, ...query} = content
    const resource = Resource({
      host,
      accessToken,
      deviceId,
      customHeader,
      customQuery,
    })
    session.current = new Session(resource, contentId, contentType, query)

    const fetchContent = () =>
      ItemType$1.LIVES === contentType
        ? resource.lives({
            id: contentId,
            query: {...query, contentType},
          })
        : resource.videos({
            id: contentId,
            query: {...query, contentType},
          })

    const fetchFullPlayback = async () => {
      const state = store.getState()
      const targetSourceType = getMediaSource(state, preferredMediaSource)
      const [playbackToken, contentInfo] = await Promise.all([
        session.current.start(),
        fetchContent(),
      ])
      const playbackInfo = await session.current.info()
      const source =
        playbackInfo.sources.find(source => source.type === targetSourceType) ||
        playbackInfo.sources[0]
      return {
        drm: {
          drm__fairplay: {
            url: playbackToken.drm_portal_url,
          },
          drm__playready: {
            url: playbackToken.drm_portal_url,
          },
          drm__widevine: {
            url: playbackToken.drm_portal_url,
          },
        },
        playingSourceType: source.type,
        availableSources: playbackInfo.sources.map(source => source.type),
        manifests: source.manifests,
        playbackToken,
        customHeader,
        thumbnailSeekingsURL: source.thumbnail_seeking_url,
        ...contentInfo,
      }
    }

    const removeListener = store.addDispatchedListener(
      async (store, action) => {
        if (action && isActivatable) {
          try {
            switch (action.type) {
              case type.CLEAN:
              case type.DISABLE: {
                clearInterval()
                break
              }

              case type.PREVIEW_CONTENT: {
                const data = await fetchContent()
                store.dispatch(APIAction.setContent(data))
                break
              }

              case type.PREPARE_PLAYBACK: {
                const data = await fetchFullPlayback()
                store.dispatch(APIAction.setPlayback(data))
                break
              }

              case type.PREPARE_THUMBNAIL: {
                const thumbnailUrl = _get(
                  store.getState(),
                  'API.content.thumbnailSeekingsURL'
                )

                if (thumbnailUrl) {
                  await axios
                    .get(thumbnailUrl)
                    .then(result => parseThumbnails(result.data, thumbnailUrl))
                    .then(thumbnails =>
                      store.dispatch(APIAction.setThumbnails(thumbnails))
                    )
                    .catch(() => {})
                }

                store.dispatch(APIAction.ready())
                break
              }

              case type.READY: {
                if (
                  accessToken &&
                  _get(store.getState(), 'API.playback.heartbeat', false)
                ) {
                  clearInterval()
                  setInterval(() => {
                    if (session.current.heartbeatInProgress) {
                      return
                    }

                    session.current.heartbeatInProgress = true
                    session.current
                      .heartbeat()
                      .catch(async error => {
                        if (
                          (error === null || error === void 0
                            ? void 0
                            : error.response.status) === 400
                        ) {
                          const sessionData = await session.current.start()
                          store.dispatch(
                            APIAction.refreshPlaybackToken(sessionData)
                          )
                        } else {
                          clearInterval()
                          store.dispatch(APIAction.error(error))
                        }
                      })
                      .then(() => {
                        session.current.heartbeatInProgress = false
                      })
                  }, HEARTBEAT_INTERVAL)
                }

                break
              }

              case type.UPDATE_LAST_PLAYED_TIME: {
                // ignore updatePlaybackTime api error
                session.current.updateLastPlayedTime(action.time)
                break
              }

              case type.UPDATE_PLAYED_END: {
                clearInterval()
                await session.current.updateLastPlayedTime(0)
                dispatchSessionEvent('playbackEnded')
                await session.current.end()
                break
              }

              case type.REFRESH_CONTENT: {
                const newContent = await fetchContent()

                const oldSectionId = _get(
                  store.getState(),
                  'API.content.section_id'
                )

                const newSectionId = newContent.section_id

                if (
                  oldSectionId !== undefined &&
                  oldSectionId !== newSectionId
                ) {
                  store.dispatch(APIAction.endSection())
                  store.dispatch(APIAction.setContent(newContent))
                  dispatchSessionEvent('sectionChange')
                  store.dispatch(
                    APIAction.changeSection(oldSectionId, newSectionId)
                  )
                } else {
                  store.dispatch(APIAction.setContent(newContent))
                }

                if (_get(store.getState(), 'API.content.end')) {
                  store.dispatch(APIAction.endLiveType())
                }

                break
              }
            }
          } catch (error) {
            store.dispatch(APIAction.error(error))
          }
        }
      }
    )
    return () => {
      if (session.current && session.current.playbackToken) {
        dispatchSessionEvent('playbackEnded')
        session.current.end()
      }

      removeListener()
      clearInterval()
    }
  }, [host, accessToken, content.contentId, content.contentType])
  return null
}

API$1.propTypes = {
  host: propTypes.string,
  accessToken: propTypes.string,
  deviceId: propTypes.string,
  content: Types.VideoInfo,
  customHeader: propTypes.object,
  customQuery: propTypes.object,
  preferredConfig: propTypes.shape({
    preferredMediaSource: propTypes.string,
  }),
}
API$1.defaultProps = {
  host: null,
  accessToken: null,
  deviceId: null,
  content: {},
  customHeader: {},
  customQuery: {},
  preferredConfig: {
    preferredMediaSource: null,
  },
}

const Event$1 = ({
  content = {},
  onBack,
  onReplay,
  onError,
  onVideoQualityChanged,
  onMediaSourceChanged,
  onChangeVideo,
  onChangeToNextVideo,
  onChangeToPreviousVideo,
  onSectionChange,
}) => {
  const store = useContext(Context.Adapter)
  const dispatchSessionEvent = useDispatchSessionEvent()
  useEffect(() => {
    if (content.contentId && content.contentType) {
      store.dispatch(APIAction.contentChange())
    }
  }, [content.contentId, content.contentType])
  useEffect(
    () =>
      store.addDispatchedListener((store, action) => {
        const state = store.getState()

        switch (action.type) {
          case type$4.BACK:
            return onBack(_get(state, 'API.content.contentId'))

          case type$4.REPLAY:
            return onReplay()

          case type$4.ERROR:
            dispatchSessionEvent('error', action.error)
            return onError({...action, content: _get(state, 'API.content')})

          case type$3.SELECT_QUALITY:
            return onVideoQualityChanged(action.to, action.from)

          case type$3.SELECT_MEDIA_SOURCE:
            return onMediaSourceChanged(action.mediaSource)

          case type$3.CHANGE_NEXT_EPISODE:
            onChangeVideo(action)
            onChangeToNextVideo(action)
            break

          case type$3.CHANGE_PREVIOUS_EPISODE:
            onChangeVideo(action)
            onChangeToPreviousVideo(action)
            break

          case type.CHANGE_SECTION:
            onSectionChange(action)
            break
        }
      }),
    []
  )
  return null
}

Event$1.propTypes = {
  onBack: propTypes.func,
  onReplay: propTypes.func,
  onError: propTypes.func,
  onVideoQualityChanged: propTypes.func,
  onChangeVideo: propTypes.func,
  onChangeToNextVideo: propTypes.func,
  onChangeToPreviousVideo: propTypes.func,
  onSectionChange: propTypes.func,
}
Event$1.defaultProps = {
  onBack: () => {},
  onReplay: () => {},
  onError: () => {},
  onVideoQualityChanged: () => {},
  onMediaSourceChanged: () => {},
  onChangeVideo: () => {},
  onChangeToNextVideo: () => {},
  onChangeToPreviousVideo: () => {},
  onSectionChange: () => {},
}

const Agent = ({command, preload = 'auto', playerRef}) => {
  const store = useContext(Context.Adapter)
  useImperativeHandle(playerRef, () => ({
    load: () => store.dispatch(operator.loadContent),
  }))
  useEffect(() => {
    if (command === AgentCommand$1.AUTO)
      return store.addDispatchedListener((store, action) => {
        switch (action.type) {
          case type$4.ERROR:
            store.dispatch(operator.error)
            break

          case type$4.INITIALIZED:
            if (preload === 'auto') {
              store.dispatch(operator.loadContent)
            }

            break

          case type.ENABLE:
            store.dispatch(operator.retry)
            break

          case type$3.CHANGE_NEXT_EPISODE:
          case type$3.CHANGE_PREVIOUS_EPISODE:
            store.dispatch(UiAction.setAutoPlay(true))
            break

          case type$4.READY_TO_PLAY:
            if (store.getState().UI.autoPlayByUI) {
              store.dispatch(UiAction.setAutoPlay(false))
              store.dispatch(PlayerAction.play())
            }
        }
      })
  }, [])
  return null
}

Agent.propTypes = {
  command: Types.AgentCommand,
}
Agent.defaultProps = {
  command: AgentCommand$1.AUTO,
}

/* eslint-disable no-plusplus */
const parser = new UAParser()
function getOS() {
  return parser.getOS()
}
function getDevice() {
  const device = parser.getDevice()
  const osName = getOS().name
  if (device.type === undefined && osName === 'Android') device.type = 'tablet'
  return device
}
function getBrowser() {
  return parser.getBrowser()
}
function needNativeHls() {
  return document.createElement('video').canPlayType('video/mp4; codecs="hvc1"')
}

const isDesktop = () => !getDevice().type

function compareVersion(v1, v2) {
  if (!/\d+(\.\d+)*/.test(v1)) throw Error(`the version format ${v1} is wrong`)
  if (!/\d+(\.\d+)*/.test(v2)) throw Error(`the version format ${v2} is wrong`)
  const v1parts = v1.split('.').map(p => Number(p))
  const v2parts = v2.split('.').map(p => Number(p))

  for (let i = 0, I = Math.max(v1parts.length, v2parts.length); i < I; i++) {
    if (v1parts[i] !== v2parts[i]) {
      return (v1parts[i] || 0) - (v2parts[i] || 0)
    }
  }

  return 0
}
const checkEnvironment = supportEnvironmentList => {
  if (!supportEnvironmentList) {
    return true
  }

  const device = getDevice()
  const os = getOS()
  const browser = getBrowser()

  const toUnique = list => Array.from(new Set(list))

  const validators = [
    {
      filter: ({device: {name, type}}) =>
        name === '*' ||
        (type === 'desktop' && device.type === undefined) ||
        type === device.type,
      errorName: EnvironmentErrorName.NOT_SUPPORT_DEVICE,
      getErrorProps: list => ({
        allowDevices: toUnique(list.map(env => env.device.type)),
      }),
    },
    {
      filter: ({os: {name}}) => name === '*' || name === os.name,
      errorName: EnvironmentErrorName.NOT_SUPPORT_OS,
      getErrorProps: list => ({
        allowOSs: toUnique(list.map(env => env.os.name)),
      }),
    },
    {
      filter: ({os: {version}}) =>
        version === '*' || compareVersion(os.version, version) >= 0,
      errorName: EnvironmentErrorName.NOT_SUPPORT_OS_VERSION,
      getErrorProps: list => ({
        minVersion: list[0].os.version,
      }),
    },
    {
      filter: ({browser: {name}}) => name === browser.name,
      errorName: EnvironmentErrorName.NOT_SUPPORT_BROWSER,
      getErrorProps: list => ({
        allowBrowsers: toUnique(list.map(env => env.browser.name)),
      }),
    },
    {
      filter: ({browser: {version}}) =>
        compareVersion(browser.version, version) >= 0,
      errorName: EnvironmentErrorName.NOT_SUPPORT_BROWSER_VERSION,
      getErrorProps: list => ({
        minVersion: list[0].browser.version,
      }),
    },
  ]
  let scopes = supportEnvironmentList

  for (let i = 0; i < validators.length; i++) {
    const validator = validators[i]
    const newScopes = scopes.filter(validator.filter)

    if (newScopes.length === 0) {
      // eslint-disable-next-line no-throw-literal
      throw {
        name: validator.errorName,
        ...validator.getErrorProps(scopes),
      }
    }

    scopes = newScopes
  }

  return true
}

// eslint-disable-next-line no-unused-vars

const EnvironmentValidator = ({supportEnvironmentList}) => {
  const {
    state: {state: moduleState},
    dispatch,
  } = useContext(Context.Module)
  useEffect(() => {
    if (moduleState !== ModuleState.ERROR) {
      try {
        checkEnvironment(supportEnvironmentList)
      } catch (error) {
        dispatch(UiAction.error(error))
      }
    }
  }, [moduleState !== ModuleState.ERROR])
  return null
}

EnvironmentValidator.propTypes = {
  supportEnvironmentList: propTypes.arrayOf(Types.SupportEnvironmentItem),
}

// eslint-disable-next-line no-unused-vars

const MobileSafariPlugin = ({
  containerRef,
  onViewModeChange,
  onEnterFullscreen,
  onExitFullscreen,
}) => {
  const store = useContext(Context.Adapter)
  const {state: playerState, dispatch} = useContext(Context.PlayerState)
  useEffect(() => {
    if (playerState >= PlayerState$1.LOADED) {
      const videoEle = containerRef.current.querySelector('video')

      const syncToStore = ({target: {webkitPresentationMode}}) => {
        dispatch(PlayerAction.updateViewMode(webkitPresentationMode))
        onViewModeChange({
          to: webkitPresentationMode,
        })
        if (webkitPresentationMode === PlayerViewMode.FULLSCREEN)
          onEnterFullscreen()
        else onExitFullscreen()
      }

      videoEle.addEventListener('webkitpresentationmodechanged', syncToStore)
      return () =>
        videoEle.removeEventListener(
          'webkitpresentationmodechanged',
          syncToStore
        )
    }
  }, [playerState >= PlayerState$1.LOADED])
  useEffect(
    () =>
      store.addDispatchedListener((store, action) => {
        switch (action.type) {
          case type$2.LEAVE_FULL_SCREEN:
            if (
              store.getState().Player.viewMode === PlayerViewMode.FULLSCREEN
            ) {
              containerRef.current.querySelector('video').webkitExitFullScreen()
            }

            break
        }
      }),
    []
  )
  useEffect(() => {
    const abortMultiTouch = debounce(() => {}, 300)
    containerRef.current.addEventListener('touchend', abortMultiTouch)
    return () =>
      containerRef.current &&
      containerRef.current.removeEventListener('touchend', abortMultiTouch)
  }, [])
  return null
}

MobileSafariPlugin.propTypes = {
  containerRef: propTypes.element.isRequired,
  onViewModeChange: propTypes.func,
  onEnterFullscreen: propTypes.func,
  onExitFullscreen: propTypes.func,
}
MobileSafariPlugin.defaultProps = {
  onViewModeChange: () => {},
  onEnterFullscreen: () => {},
  onExitFullscreen: () => {},
}

// eslint-disable-next-line no-unused-vars

const OTP_1878 = () => {
  const store = useContext(Context.Adapter)
  useEffect(() => {
    return store.addDispatchedListener((store, action) => {
      const isMuted = _get(store.getState(), 'Player.volume.muted', false)

      switch (action.type) {
        case type$2.SET_VOLUME:
          if (action.volume === 0 && !isMuted) {
            store.dispatch(PlayerAction.mute())
          } else if (action.volume !== 0 && isMuted) {
            store.dispatch(PlayerAction.unmute())
          }

          break
      }
    })
  }, [])
  return null
}

const Provider = ({lang, langCustomCode, children}) => {
  const translations = Object.assign(
    {},
    LANGS[lang.toLowerCase()],
    langCustomCode
  )

  const getMessage = (code, property) => {
    return (
      translations[code] &&
      translations[code].replace(/{(\S+?)}/gi, (substring, name) => {
        const res = _get(property, name) || substring
        return res instanceof Array ? res.join(', ') : res
      })
    )
  }

  const translate = (code, property) => {
    return translations[code] ? getMessage(code, property) : code
  }

  return /*#__PURE__*/ jsx(context.Provider, {
    value: {
      translations,
      getMessage,
      translate,
    },
    children: children,
  })
}

Provider.propTypes = {
  lang: Types.LanguageCode,
  langCustomCode: propTypes.object,
  children: propTypes.node,
}
Provider.defaultProps = {
  lang: LanguageCode$1.EN,
  langCustomCode: {},
}

const Message = ({code, property, defaultValue, wrap: Wrap = 'span'}) => {
  const {getMessage, translate} = useContext(context)
  const message = getMessage(code, property) || translate(defaultValue)
  return Wrap
    ? /*#__PURE__*/ jsx(Wrap, {
        children: message,
      })
    : message
}

Message.propTypes = {
  code: Types.TextCode,
  property: propTypes.object,
  defaultValue: Types.TextCode,
  wrap: propTypes.elementType,
}

const context = /*#__PURE__*/ React.createContext()

const useTranslations = () => useContext(context).translations

const translate = (translations, {id, values, getDefault}) => {
  if (id in translations) {
    return translations[id].replace(/{(\S+?)}/gi, (_, key) => {
      const res = values[key] || ''
      return (res === null || res === void 0 ? void 0 : res.join(', ')) || res
    })
  }

  return (
    (getDefault === null || getDefault === void 0 ? void 0 : getDefault()) || id
  )
}

const FormattedMessage = ({id, values, getDefault}) => {
  const translations = useTranslations()
  return translate(translations, {
    id,
    values,
    getDefault,
  })
}

var I18n = {
  Context: context,
  Provider,
  Message,
}

const DeviceDetector = ({children}) => {
  const [device, setDevice] = useState()
  useEffect(() => {
    setDevice({
      browser: getBrowser(),
      os: getOS(),
      device: getDevice(),
      touchable: 'ontouchstart' in window,
    })
  }, [])
  return device ? children(device) : ''
}

DeviceDetector.propTypes = {
  children: propTypes.func,
}
DeviceDetector.defaultProps = {
  children: ({browser, os, device}) => [browser, os, device],
}

const blurPause = ({player}) => {
  const pause = async () => {
    let shouldPause = true
    player.pause()
    setTimeout(() => {
      shouldPause = false
    }, 50)
    player.getVideoElement().addEventListener(
      'play',
      () => {
        if (shouldPause) {
          player.pause()
        }
      },
      {
        once: true,
      }
    )
  }

  document.addEventListener('visibilitychange', pause)
  return () => document.removeEventListener('visibilitychange', pause)
}

/* eslint-disable consistent-return */
const activationTriggeringEvents = [
  'touchstart',
  'click',
  'dblclick',
  'mousedown',
  'mouseup',
  'keydown',
  'keypress',
  'keyup',
]

const addEventListener = (element, eventNames, handler, options) => {
  eventNames.forEach(name => element.addEventListener(name, handler, options))
  return () =>
    eventNames.forEach(name =>
      element.removeEventListener(name, handler, options)
    )
} // Workaround: Try to pass autoplay gate in Safari
// https://kkvideo.atlassian.net/l/c/k1UBH0ij

const autoUnlockAutoplay = () => {
  if (!needNativeHls()) {
    return
  }

  const videoElement = document.querySelector('video')
  const state = {
    /** @type {'gated'|'working'|'not gated'} */
    status: 'gated',
  }

  const unlock = event =>
    Promise.resolve()
      .then(() => {
        if (state.status === 'gated') {
          state.status = 'working'
          return videoElement.play().then(() => {
            setUnlocked()
            videoElement.pause()
          })
        }
      })
      .catch(() => {
        state.status = 'gated'
        console.error('Unable to unlock autoplay with', event.type)
      })

  const cleanup = [
    addEventListener(window, activationTriggeringEvents, unlock, {
      capture: true,
    }),
    addEventListener(videoElement, ['play'], () => {
      if (state.status !== 'gated') {
        return
      }

      state.status = 'working' // Call play again to ensure unlocked

      videoElement
        .play()
        .then(setUnlocked)
        .catch(e => {
          console.log(e)
          state.status = 'gated'
        })
    }),
  ]

  const setUnlocked = () => {
    cleanup.forEach(removeListeners => removeListeners())
    state.status = 'not gated'
  }
}

const preventLeaveFullscreenPause = () => {
  if (!needNativeHls()) {
    return
  }

  const videoElement = document.querySelector('video')
  const state = {
    lastLeave: 0,
  }
  const minInteractionDelay = 700

  const resumeSystemPause = () => {
    if (Math.abs(state.lastPause - state.lastLeave) <= minInteractionDelay) {
      videoElement.play()
    }
  }

  videoElement.addEventListener('pause', () => {
    state.lastPause = Date.now()
    resumeSystemPause()
  })
  videoElement.addEventListener('webkitpresentationmodechanged', event => {
    if (event.target.webkitPresentationMode !== 'fullscreen') {
      state.lastLeave = Date.now()
      resumeSystemPause()
    }
  })
  return function setUserPause() {
    state.lastLeave = 0
  }
}

const ISSUER = 'kks-adapter'

const handleSeek = (player, plugins, position) => {
  const seekHandler = plugins.find(
    plugin => typeof plugin.handleSeek === 'function'
  )

  if (seekHandler) {
    seekHandler.handleSeek(position, realPosition => {
      const videoElement = player.getVideoElement()

      if (Math.abs(videoElement.currentTime - realPosition) > 0.5) {
        videoElement.currentTime = realPosition
      }

      player.seek(realPosition, ISSUER)
    })
    return true
  }
}

const getPlaybackStatus = (player, plugins) =>
  Object.assign(
    {
      currentTime: player.getCurrentTime(),
      duration: player.getDuration(),
    },
    ...plugins.map(plugin => {
      var _plugin$getPlaybackSt

      return (_plugin$getPlaybackSt = plugin.getPlaybackStatus) === null ||
        _plugin$getPlaybackSt === void 0
        ? void 0
        : _plugin$getPlaybackSt.call(plugin)
    })
  )

const handleSafariStalledTooLong = (player, store, PlayerAction) => {
  if (player.getStreamType() !== 'hls') {
    return
  }

  setTimeout(async () => {
    if (player.isStalled()) {
      const {url} = store.getState().API.manifests.hls
      await axios
        .get(url, {
          timeout: 5000,
        })
        .catch(() => {
          store.dispatch(PlayerAction.error())
        })
    }
  }, 10000)
}

class BitmovinPlayer extends Component {
  constructor(...args) {
    super(...args)

    _defineProperty(this, 'player', null)

    _defineProperty(this, 'preferredStreaming', null)

    _defineProperty(this, 'playingQuality', null)

    _defineProperty(this, 'videoRef', /*#__PURE__*/ createRef())

    _defineProperty(this, 'removeListener', () => {})
  }

  componentDidMount() {
    autoUnlockAutoplay()
    this.setUserPause = preventLeaveFullscreenPause()
    this.removeListener = this.props.store.addDispatchedListener(
      async (store, action) => {
        var _this$setUserPause

        try {
          const container = this.props.containerRef.current

          switch (action.type) {
            case type$2.MOUNT:
              this.mount()
              return store.dispatch(PlayerAction.mounted())

            case type$2.FETCH_STATE:
              return store.dispatch(
                PlayerAction.setState(this.convertToPlayerState(this.player))
              )
            // TODO remove this action

            case type$2.LOAD:
              return
            // TODO !!

            case type.REFRESH_PLAYBACK_TOKEN:
              this.player.unload() // load stream

              this.player.pause()
              return

            case type$2.UNLOAD:
              this.changeQuality = undefined
              this.props.plugins.forEach(plugin => {
                var _plugin$reset

                return (_plugin$reset = plugin.reset) === null ||
                  _plugin$reset === void 0
                  ? void 0
                  : _plugin$reset.call(plugin)
              })
              return (
                this.player &&
                this.player
                  .unload()
                  .then(() => store.dispatch(PlayerAction.unloaded()))
              )

            case type$2.PLAY:
              //play might fail if autoplay is still gated, source is still loading
              //In Safari, some failed play calls does not pops immediately, rejection will happen
              //while garbage collection of <video>, like changing video
              //TODO: check if this still necessary after playback flow is refined
              return this.player
                .play(ISSUER)
                .catch(e => console.log('videoElement.play() failed', e))

            case type$2.PAUSE:
              ;(_this$setUserPause = this.setUserPause) === null ||
              _this$setUserPause === void 0
                ? void 0
                : _this$setUserPause.call(this)
              return this.player.pause(ISSUER)

            case type$2.SEEK:
              // TODO move seek handling to core
              //can't seek when video is ended, but doing this will trigger a reload, so no need to check
              if (handleSeek(this.player, this.props.plugins, action.time)) {
                return
              }

              if (
                Math.abs(
                  this.player.getVideoElement().currentTime - action.time
                ) > 0.5
              ) {
                this.player.getVideoElement().currentTime = action.time
              }

              return this.player.seek(Math.max(0, action.time), ISSUER)

            case type$2.SET_VOLUME:
              this.player.setVolume(action.volume)

              if (action.volume > 0 && this.player.isMuted()) {
                this.player.unmute()
              }

              return

            case type$2.MUTE:
              return this.player.mute()

            case type$2.UNMUTE:
              return this.player.unmute()

            case type$2.ENTER_FULL_SCREEN:
              if (container.requestFullscreen)
                container.requestFullscreen({
                  navigationUI: 'hide',
                })
              return this.player.setViewMode(PlayerViewMode.FULLSCREEN, {
                fullscreenElement: container,
              })

            case type$2.LEAVE_FULL_SCREEN:
              return this.player.setViewMode(PlayerViewMode.INLINE, {
                fullscreenElement: container,
              })

            case type$3.SELECT_QUALITY:
              if (!this.player.hasEnded()) {
                var _this$changeQuality

                ;(_this$changeQuality = this.changeQuality) === null ||
                _this$changeQuality === void 0
                  ? void 0
                  : _this$changeQuality.call(this)
              }

              return
          }
        } catch (error) {
          // wait for bitmovin error event to fire first
          await new Promise(resolve => setTimeout(resolve, 50))
          store.dispatch(PlayerAction.error(error))
        }
      }
    )
  }

  componentWillUnmount() {
    var _this$removeBlurListe

    ;(_this$removeBlurListe = this.removeBlurListener) === null ||
    _this$removeBlurListe === void 0
      ? void 0
      : _this$removeBlurListe.call(this)
    this.removeListener()
    const store = this.props.store
    store.dispatch(PlayerAction.unmount())
  }

  mount() {
    const store = this.props.store
    const player = this.props.playerRef.current

    if (!isDesktop()) {
      this.removeBlurListener = blurPause({
        player,
      })
    }

    this.props.setPlayer(player)
    this.preferredStreaming = player.getSupportedTech()[0].streaming
    const withErrorHandling = catchBy(error =>
      store.dispatch(PlayerAction.error(error))
    )
    import('bitmovin-player/modules/bitmovinplayer-core').then(
      ({PlayerEvent}) => {
        player.on(
          PlayerEvent.SourceLoaded,
          withErrorHandling(() => {
            player
              .getVideoElement()
              .setAttribute('disablePictureInPicture', true)
            this.workaround_ST_3009({
              PlayerEvent,
              player,
            })
            this.workaround_ST_4489({
              PlayerEvent,
              player,
            })
            store.dispatch(
              PlayerAction.setState(this.convertToPlayerState(this.player))
            )
            store.dispatch(PlayerAction.loaded())
            if (player.isLive()) store.dispatch(PlayerAction.ready())
            this.props.onSourceLoaded()
          })
        )
        player.on(
          PlayerEvent.Ready,
          withErrorHandling(() => {
            store.dispatch(
              PlayerAction.setState(this.convertToPlayerState(this.player))
            )
            store.dispatch(PlayerAction.ready())
            this.props.onReady()
          })
        )
        player.on(
          PlayerEvent.Play,
          withErrorHandling(() => {
            this.props.onPlay()
          })
        )
        player.on(
          PlayerEvent.Playing,
          withErrorHandling(() => {
            store.dispatch(PlayerAction.playing())
            this.props.onPlaying()
          })
        )
        player.on(
          PlayerEvent.Paused,
          withErrorHandling(() => {
            store.dispatch(PlayerAction.paused())
            this.props.onPaused()
          })
        )
        player.on(
          PlayerEvent.PlaybackFinished,
          withErrorHandling(() => {
            store.dispatch(PlayerAction.ended())
            this.props.onEnded()
          })
        )
        player.on(
          PlayerEvent.TimeChanged,
          withErrorHandling(() => {
            this.workaround_OTP_1783({
              PlayerEvent,
              player,
            })
            const {currentTime, adRemainingTime} = getPlaybackStatus(
              player,
              this.props.plugins
            )
            store.dispatch(
              PlayerAction.updateCurrentTime({
                currentTime,
                adRemainingTime,
              })
            )
            this.props.onTimeChanged(currentTime)
          })
        )
        let lastSeekEventIssuer
        player.on(
          PlayerEvent.Seek,
          withErrorHandling(({seekTarget, position, issuer}) => {
            this.props.dispatchSessionEvent('userSeeking')
            lastSeekEventIssuer = issuer

            if (issuer === ISSUER || issuer === 'internal') {
              this.props.onSeek(seekTarget, position)
            }
          })
        )
        player.on(
          PlayerEvent.Seeked,
          withErrorHandling(() => {
            if (
              lastSeekEventIssuer === ISSUER ||
              lastSeekEventIssuer === 'internal'
            ) {
              const {currentTime} = getPlaybackStatus(
                player,
                this.props.plugins
              )
              store.dispatch(PlayerAction.seeked(currentTime))
              this.props.onSeeked(currentTime)
            }
          })
        )
        player.on(
          PlayerEvent.VolumeChanged,
          withErrorHandling(({targetVolume, sourceVolume}) => {
            store.dispatch(PlayerAction.updateVolume(targetVolume))
            this.props.onVolumeChanged(targetVolume, sourceVolume)
          })
        )
        player.on(
          PlayerEvent.Muted,
          withErrorHandling(() => {
            store.dispatch(PlayerAction.muted())
            this.props.onMuted()
          })
        )
        player.on(
          PlayerEvent.Unmuted,
          withErrorHandling(() => {
            store.dispatch(PlayerAction.unmuted())
            this.props.onUnmuted()
          })
        )
        player.on(PlayerEvent.ViewModeChanged, viewModeEvent => {
          store.dispatch(PlayerAction.updateViewMode(viewModeEvent.to))
          this.props.onViewModeChange(viewModeEvent)

          if (viewModeEvent.to === 'fullscreen') {
            this.props.onEnterFullscreen()
            player.getContainer().setAttribute('data-fullscreen', false)
          } else if (viewModeEvent.from === 'fullscreen') {
            this.props.onExitFullscreen()
          }
        })
        player.on(PlayerEvent.SegmentRequestFinished, () => {
          const getBufferLength = () =>
            Math.min(
              player.getVideoBufferLength() || 0,
              player.getAudioBufferLength() || 0
            )

          store.dispatch(PlayerAction.updateBufferTime(getBufferLength()))
        })
        player.on(PlayerEvent.StallStarted, () => {
          this.props.onStallStarted()
          store.dispatch(PlayerAction.stalling())
          handleSafariStalledTooLong(player, store, PlayerAction)
        })
        player.on(PlayerEvent.StallEnded, () => {
          this.props.onStallEnded()
          store.dispatch(PlayerAction.stalled())
        })
        player.on(PlayerEvent.CueEnter, event => {
          const {text, start, end} = event
          store.dispatch(
            UiAction.updateSubtitlesContent({
              text,
              start,
              end,
            })
          )
        })
        player.on(PlayerEvent.CueExit, () =>
          store.dispatch(UiAction.updateSubtitlesContent({}))
        )
        player.on(PlayerEvent.Error, error =>
          store.dispatch(PlayerAction.error(error))
        )
      }
    )
    this.props.dispatchSessionEvent('playerStarted')
    return (this.player = player)
  }

  convertToPlayerState(player) {
    const {currentTime, duration} = getPlaybackStatus(
      player,
      this.props.plugins
    )
    return {
      viewMode: player.getViewMode(),
      streamType: player.getStreamType(),
      progress: {
        progressTime: currentTime,
        duration: isFinite(duration) && duration > 0 ? duration : 0,
        bufferTime: Math.min(
          player.getVideoBufferLength() || 0,
          player.getAudioBufferLength() || 0
        ),
      },
      volume: {
        volume: player.getVolume(),
        muted: player.isMuted(),
      },
      source: player.getSource(),
    }
  } // https://kkvideo.atlassian.net/browse/ST-3009

  workaround_ST_3009({PlayerEvent, player}) {
    if (player.getStreamType() === 'dash') {
      let timerId
      let lastTime

      const startDetect = () => {
        if (player.isPlaying()) {
          stopDetect()
          timerId = setInterval(() => {
            const currentTime = player.getCurrentTime() * 1000

            if (player.isPlaying()) {
              if (currentTime - lastTime === 0) {
                player.pause()
                player.play()
              }
            }

            lastTime = currentTime
          }, 4000)
        }
      }

      const stopDetect = () => {
        clearInterval(timerId)
        lastTime = 0
      }

      player.on(PlayerEvent.Playing, startDetect)
      player.on(PlayerEvent.Seeked, startDetect)
      player.on(PlayerEvent.StallEnded, startDetect)
      player.on(PlayerEvent.Paused, stopDetect)
      player.on(PlayerEvent.Seek, stopDetect)
      player.on(PlayerEvent.StallStarted, stopDetect)
      player.on(PlayerEvent.Error, stopDetect)
      player.on(PlayerEvent.PlaybackFinished, stopDetect)
      player.on(PlayerEvent.Destroy, stopDetect)
    }

    this.workaround_ST_3009 = () => {}
  } // https://kkvideo.atlassian.net/browse/ST-4489

  workaround_ST_4489({PlayerEvent, player}) {
    player.on(PlayerEvent.StallEnded, () => {
      const video = player.getVideoElement()
      video.currentTime = player.getCurrentTime()
    })
  }

  workaround_OTP_1783({PlayerEvent, player}) {
    if (player.isLive() && player.getStreamType() === 'dash') {
      player.on(PlayerEvent.Paused, () => {
        const videoElem = this.player.getVideoElement()

        if (!videoElem._play) {
          let fromExternalPlay = false
          videoElem._play = videoElem.play

          videoElem.play = function () {
            if (fromExternalPlay) {
              fromExternalPlay = false
              return videoElem._play()
            } else {
              return Promise.reject()
            }
          }

          player._play = player.play

          player.play = function () {
            fromExternalPlay = true
            return player._play()
          }
        }
      })
      player.on(PlayerEvent.Play, () => {
        const videoElem = this.player.getVideoElement()

        if (videoElem._play) {
          videoElem.play = videoElem._play
          videoElem._play = undefined
        }

        if (player._play) {
          player.play = player._play
          player._play = undefined
        }
      })
    }

    this.workaround_OTP_1783 = () => {}
  }

  render() {
    return ''
  }
}

_defineProperty(BitmovinPlayer, 'propTypes', {
  playerRef: propTypes.object,
  store: propTypes.object.isRequired,
  dispatchSessionEvent: propTypes.func,
  containerRef: propTypes.object,
  plugins: propTypes.array,
  setPlayer: propTypes.func,
  onSourceLoaded: propTypes.func,
  onReady: propTypes.func,
  onPlay: propTypes.func,
  onPlaying: propTypes.func,
  onPaused: propTypes.func,
  onEnded: propTypes.func,
  onError: propTypes.func,
  onTimeChanged: propTypes.func,
  onSeek: propTypes.func,
  onSeeked: propTypes.func,
  onVolumeChanged: propTypes.func,
  onMuted: propTypes.func,
  onUnmuted: propTypes.func,
  onViewModeChange: propTypes.func,
  onEnterFullscreen: propTypes.func,
  onExitFullscreen: propTypes.func,
  onStallStarted: propTypes.func,
  onStallEnded: propTypes.func,
})

_defineProperty(BitmovinPlayer, 'defaultProps', {
  onSourceLoaded: () => {},
  onReady: () => {},
  onPlay: () => {},
  onPlaying: () => {},
  onPaused: () => {},
  onEnded: () => {},
  onError: () => {},
  onTimeChanged: () => {},
  onSeek: () => {},
  onSeeked: () => {},
  onVolumeChanged: () => {},
  onMuted: () => {},
  onUnmuted: () => {},
  onViewModeChange: () => {},
  onEnterFullscreen: () => {},
  onExitFullscreen: () => {},
  onStallStarted: () => {},
  onStallEnded: () => {},
})

const PlayerVideo = props => {
  const store = useContext(Context.Adapter)
  const videoRef = useVideoRef()
  const setPlayer = useSetPlayer()
  const dispatchSessionEvent = useDispatchSessionEvent()
  return /*#__PURE__*/ jsx(BitmovinPlayer, {
    store: store,
    setPlayer: setPlayer,
    videoRef: videoRef,
    dispatchSessionEvent: dispatchSessionEvent,
    ...props,
  })
}

const loadBitmovin = async ({
  container,
  videoElement,
  autoplay,
  config = {},
}) => {
  // Don't move module paths to array or other variables! they need to be resolved by bundlers
  const {Player} = await import('bitmovin-player/modules/bitmovinplayer-core')
  const nativeHls = needNativeHls()
  const bitmovinModules = []
    .concat(
      await import('bitmovin-player/modules/bitmovinplayer-engine-bitmovin'),
      nativeHls &&
        (await import('bitmovin-player/modules/bitmovinplayer-engine-native')),
      await Promise.all([
        import('bitmovin-player/modules/bitmovinplayer-drm'),
        import('bitmovin-player/modules/bitmovinplayer-abr'),
        import('bitmovin-player/modules/bitmovinplayer-subtitles'),
        import('bitmovin-player/modules/bitmovinplayer-container-mp4'),
        import('bitmovin-player/modules/bitmovinplayer-style'),
      ]),
      nativeHls &&
        (await Promise.all([
          import('bitmovin-player/modules/bitmovinplayer-hls.js'),
          import('bitmovin-player/modules/bitmovinplayer-subtitles-native.js'),
        ])),
      !nativeHls &&
        (await import('bitmovin-player/modules/bitmovinplayer-subtitles-vtt')),
      !nativeHls &&
        (await import('bitmovin-player/modules/bitmovinplayer-xml')),
      !nativeHls &&
        (await Promise.all([
          import('bitmovin-player/modules/bitmovinplayer-dash'),
          import('bitmovin-player/modules/bitmovinplayer-mserenderer'),
          import('bitmovin-player/modules/bitmovinplayer-polyfill'),
        ]))
    )
    .filter(Boolean)
  bitmovinModules.forEach(module => Player.addModule(module.default))
  const configs = {
    tweaks: {
      stop_download_on_pause: true,
      native_hls_parsing: true,
    },
    ui: false,
    ...config,
    playback: {
      // TODO resume volume from localStorage
      ...config.playback,
      autoplay,
    },
  }
  const player = new Player(container, configs)
  player.setVideoElement(videoElement)
  return player
}

const loadPlayer = async (videoElement, {container, autoplay, bitmovin}) => {
  if (bitmovin) {
    const player = await loadBitmovin({
      container,
      videoElement,
      autoplay,
      config: bitmovin,
    })
    return player
  } // TODO load other players: shaka, dash.js, hls.js
}

/* eslint-disable no-param-reassign */

const getMediaElementState = (media, plugins) => {
  const overrides = plugins.map(plugin => {
    var _plugin$getPlaybackSt

    return (_plugin$getPlaybackSt = plugin.getPlaybackStatus) === null ||
      _plugin$getPlaybackSt === void 0
      ? void 0
      : _plugin$getPlaybackSt.call(plugin)
  })
  return Object.assign(
    {
      paused: media.paused,
      ended: media.ended,
      currentTime: media.currentTime,
      duration: media.duration,
    },
    ...overrides
  )
}

const subscribeMediaState = (media, updateState, plugins = []) => {
  let state = {
    playbackState: 'loading',
    waiting: true,
    ...getMediaElementState(media, plugins),
  }

  const syncState = update => {
    const videoElementState = getMediaElementState(media, plugins)
    const overrides =
      state.duration > 0
        ? {
            duration: state.duration,
          }
        : {}
    state = {...state, ...videoElementState, ...overrides, ...update} // TODO consider shallow equal?

    updateState(state)
  }

  const registered = [
    on(media, 'error', () =>
      syncState({
        playbackState: 'error',
      })
    ),
    on(media, 'play', syncState),
    on(media, 'paused', () =>
      syncState({
        playbackState: 'paused',
      })
    ),
    on(media, 'seeking', () =>
      syncState({
        waiting: true,
      })
    ),
    on(media, 'timeupdate', () =>
      syncState(
        !media.paused && {
          playbackState: 'playing',
          waiting: false,
        }
      )
    ),
    on(media, 'ended', () =>
      syncState({
        playbackState: 'ended',
      })
    ), // when playing SSAI stream,
    // sometimes duration changes to wrong value when playing an ad
    on(media, 'emptied', () =>
      syncState({
        seekEnabled: false,
        duration: 0,
        playbackState: 'loading',
        waiting: true,
      })
    ),
    on(media, 'durationchange', () => {
      syncState({
        seekEnabled: Number.isFinite(media.duration),
      })
    }),
  ]
  syncState()
  return () => registered.forEach(off => off())
}

const load = async (media, {player, plugins = []}, source) => {
  const streamFormat = player.getSupportedTech()[0].streaming
  const merged = await plugins.reduce(async (loadChain, plugin) => {
    var _plugin$load

    const currentSource = await loadChain
    const manifestItem = currentSource.manifests[streamFormat]
    const overrides = await ((_plugin$load = plugin.load) === null ||
    _plugin$load === void 0
      ? void 0
      : _plugin$load.call(plugin, manifestItem, {
          video: media,
          player,
        }))

    if (overrides) {
      const {url, startTime} = overrides
      return {
        ...currentSource,
        [streamFormat]: url,
        ...(startTime && {
          options: {...currentSource, startTime},
        }),
      }
    }

    return currentSource
  }, source)
  return player.load(merged)
}

const playOrPause = (media, {player}) => {
  if (media.ended) {
    player.seek(0)
  }

  if (media.paused) {
    return player.play()
  }

  return media.pause()
}

const seek = (media, {player, plugins = []}, time) => {
  const seekPlugin = plugins.find(
    plugin => typeof plugin.handleSeek === 'function'
  )

  const seekInternal = seekTime => {
    // when playing DASH, must call player.seek to make it work
    player.seek(seekTime) // player.seek sets time after adding segments,
    // set again to reflect instantly

    media.currentTime = seekTime
    media.dispatchEvent(new Event('seeking'))
  }

  if (seekPlugin) {
    seekPlugin.handleSeek(time, seekInternal)
  } else {
    seekInternal(time)
  }
}

function _EMOTION_STRINGIFIED_CSS_ERROR__$2() {
  return "You have tried to stringify object returned from `css` function. It isn't supposed to be used directly (e.g. as value of the `className` prop), but rather handed to emotion so it can handle it (e.g. as value of `css` prop)."
}

/* @jsxImportSource @emotion/react */

/* eslint-disable react/prop-types */
const expand = {
  margin: 0,
  flex: '1',
}
const containerStyle$2 = {
  width: '100%',
  height: '100%',
  boxSizing: 'border-box',
  display: 'flex',
  flexDirection: 'column',
  overflow: 'hidden',
  color: 'white',
  // prevent animation glich(afterimage) of descendant elements
  transform: 'translateX(0)',
  userSelect: 'none',
  h1: {
    margin: 0,
    fontSize: '1em',
    lineHeight: '1.5em',
  },
  'a, a:link, a:visited': {
    color: '#fff',
    opacity: 0.8,
    textDecoration: 'none',
  },
  button: {
    fontSize: 'inherit',
  },
}
const drop = {
  backgroundImage: `linear-gradient(
    0deg,
    rgba(0,0,0,0.5) 0,
    rgba(0,0,0,0) 8rem calc(100% - 8rem),
    rgba(0,0,0,0.5) 100%
  )`,
}
const dropTop = {
  backgroundImage: `linear-gradient(
    0deg,
    rgba(0,0,0,0) 0,
    rgba(0,0,0,0) 8rem calc(100% - 8rem),
    rgba(0,0,0,0.5) 100%
  )`,
}
const responsiveStyles = {
  desktop: {
    fontSize: '24px',
  }, // add if necessary: big-desktop
}
const rowStyle = {
  boxSizing: 'border-box',
  width: '100%',
  padding: 'calc(2em - 16px)',
  display: 'flex',
  alignItems: 'center',
  button: {
    flex: '0 0 1.5em',
    width: '1.5em',
    height: '1.5em',
  },
  '> button:not(:disabled) ~ button:not(:disabled), div ~ button:last-of-type': {
    marginLeft: '0.5rem',
  },
  '> button:not(:last-of-type)': {
    marginRight: '0.5rem',
  },
}
const displayStyles = {
  hidden: {
    '> div:not(.pinned), > button:not(.pinned), > h1:not(.pinned)': {
      opacity: 0,
      transform: 'translate(-100vw)',
      transition: 'opacity 0.5s ease-out, transform 0s 0.5s',
    },
  },
  shown: {
    '> div:not(.pinned), > button:not(.pinned), > h1:not(.pinned)': {
      transition: 'opacity 0.5s ease-out',
    },
  },
}
const controlsDisplayStyles = {
  hidden: {...displayStyles.hidden, '~ div:not(.pinned)': displayStyles.hidden},
  shown: {...displayStyles.display, '~ div': displayStyles.display},
}
const controlsStyle = {
  position: 'absolute',
  zIndex: '2',
  display: 'flex',
  alignItems: 'center',
  '> button': {
    margin: '1em',
    width: '1.75em',
    height: '1.75em',
    '&:disabled': {
      opacity: 0.3,
    },
    '&.play-button': {
      width: '3em',
      height: '3em',
    },
  },
}
const textEllipsis = {
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',
}
const infoStyle = {
  alignItems: 'flex-start',
  overflow: 'visible',
  h1: {
    height: '3em',
    fontWeight: '500',
    ...textEllipsis,
    '> div': textEllipsis,
  },
}
const backStyle = {
  position: 'absolute',
  zIndex: '-1',
  width: '100%',
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}
const skipStyle = {
  position: 'absolute',
  right: 0,
  bottom: '9rem',
  textAlign: 'right',
  button: {
    width: 'auto',
    height: 'auto',
  },
}
const dekstopStyle$1 = {
  '> div': {
    '> button:not(:disabled) ~ button:not(:disabled), button:last-of-type': {
      marginLeft: '0.75em',
    },
    '> button:not(:last-of-type), > button:first-of-type, > button ~ div': {
      marginRight: '0.75em',
    },
    '> button:first-of-type': {
      marginLeft: '0',
    },
  },
}
const desktopControls = {
  flexWrap: 'wrap',
  '> div:first-of-type': {
    flex: '100%',
    marginBottom: '0.88em',
  },
  'button[disabled]': {
    display: 'none',
  },
}

const ControlsBlock = ({
  order = 'mobile',
  playButton,
  rewindButton = '',
  forwardButton = '',
  previousEpisodeButton = '',
  nextEpisodeButton = '',
}) =>
  order === 'desktop'
    ? jsxs(Fragment, {
        children: [
          previousEpisodeButton,
          playButton,
          nextEpisodeButton,
          rewindButton,
          forwardButton,
        ],
      })
    : jsxs(Fragment, {
        children: [
          rewindButton,
          previousEpisodeButton,
          playButton,
          nextEpisodeButton,
          forwardButton,
        ],
      })

var _ref$2 =
  process.env.NODE_ENV === 'production'
    ? {
        name: '11g4mt0',
        styles: 'font-size:16px',
      }
    : {
        name: 'f6vg0o-DefaultLayout',
        styles: 'font-size:16px;label:DefaultLayout;',
        map:
          '/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkRlZmF1bHRMYXlvdXQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBMFE4QiIsImZpbGUiOiJEZWZhdWx0TGF5b3V0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyogQGpzeEltcG9ydFNvdXJjZSBAZW1vdGlvbi9yZWFjdCAqL1xuLyogZXNsaW50LWRpc2FibGUgcmVhY3QvcHJvcC10eXBlcyAqL1xuY29uc3QgZXhwYW5kID0ge1xuICBtYXJnaW46IDAsXG4gIGZsZXg6ICcxJyxcbn1cblxuY29uc3QgY29udGFpbmVyU3R5bGUgPSB7XG4gIHdpZHRoOiAnMTAwJScsXG4gIGhlaWdodDogJzEwMCUnLFxuICBib3hTaXppbmc6ICdib3JkZXItYm94JyxcbiAgZGlzcGxheTogJ2ZsZXgnLFxuICBmbGV4RGlyZWN0aW9uOiAnY29sdW1uJyxcbiAgb3ZlcmZsb3c6ICdoaWRkZW4nLFxuICBjb2xvcjogJ3doaXRlJyxcbiAgLy8gcHJldmVudCBhbmltYXRpb24gZ2xpY2goYWZ0ZXJpbWFnZSkgb2YgZGVzY2VuZGFudCBlbGVtZW50c1xuICB0cmFuc2Zvcm06ICd0cmFuc2xhdGVYKDApJyxcbiAgdXNlclNlbGVjdDogJ25vbmUnLFxuICBoMToge1xuICAgIG1hcmdpbjogMCxcbiAgICBmb250U2l6ZTogJzFlbScsXG4gICAgbGluZUhlaWdodDogJzEuNWVtJyxcbiAgfSxcbiAgJ2EsIGE6bGluaywgYTp2aXNpdGVkJzoge1xuICAgIGNvbG9yOiAnI2ZmZicsXG4gICAgb3BhY2l0eTogMC44LFxuICAgIHRleHREZWNvcmF0aW9uOiAnbm9uZScsXG4gIH0sXG4gIGJ1dHRvbjoge1xuICAgIGZvbnRTaXplOiAnaW5oZXJpdCcsXG4gIH0sXG59XG5cbmNvbnN0IGRyb3AgPSB7XG4gIGJhY2tncm91bmRJbWFnZTogYGxpbmVhci1ncmFkaWVudChcbiAgICAwZGVnLFxuICAgIHJnYmEoMCwwLDAsMC41KSAwLFxuICAgIHJnYmEoMCwwLDAsMCkgOHJlbSBjYWxjKDEwMCUgLSA4cmVtKSxcbiAgICByZ2JhKDAsMCwwLDAuNSkgMTAwJVxuICApYCxcbn1cblxuY29uc3QgZHJvcFRvcCA9IHtcbiAgYmFja2dyb3VuZEltYWdlOiBgbGluZWFyLWdyYWRpZW50KFxuICAgIDBkZWcsXG4gICAgcmdiYSgwLDAsMCwwKSAwLFxuICAgIHJnYmEoMCwwLDAsMCkgOHJlbSBjYWxjKDEwMCUgLSA4cmVtKSxcbiAgICByZ2JhKDAsMCwwLDAuNSkgMTAwJVxuICApYCxcbn1cblxuY29uc3QgcmVzcG9uc2l2ZVN0eWxlcyA9IHtcbiAgZGVza3RvcDoge1xuICAgIGZvbnRTaXplOiAnMjRweCcsXG4gIH0sIC8vIGFkZCBpZiBuZWNlc3Nhcnk6IGJpZy1kZXNrdG9wXG59XG5cbmNvbnN0IHJvd1N0eWxlID0ge1xuICBib3hTaXppbmc6ICdib3JkZXItYm94JyxcbiAgd2lkdGg6ICcxMDAlJyxcbiAgcGFkZGluZzogJ2NhbGMoMmVtIC0gMTZweCknLFxuICBkaXNwbGF5OiAnZmxleCcsXG4gIGFsaWduSXRlbXM6ICdjZW50ZXInLFxuICBidXR0b246IHtcbiAgICBmbGV4OiAnMCAwIDEuNWVtJyxcbiAgICB3aWR0aDogJzEuNWVtJyxcbiAgICBoZWlnaHQ6ICcxLjVlbScsXG4gIH0sXG4gICc+IGJ1dHRvbjpub3QoOmRpc2FibGVkKSB+IGJ1dHRvbjpub3QoOmRpc2FibGVkKSwgZGl2IH4gYnV0dG9uOmxhc3Qtb2YtdHlwZSc6IHtcbiAgICBtYXJnaW5MZWZ0OiAnMC41cmVtJyxcbiAgfSxcbiAgJz4gYnV0dG9uOm5vdCg6bGFzdC1vZi10eXBlKSc6IHtcbiAgICBtYXJnaW5SaWdodDogJzAuNXJlbScsXG4gIH0sXG59XG5cbmNvbnN0IGRpc3BsYXlTdHlsZXMgPSB7XG4gIGhpZGRlbjoge1xuICAgICc+IGRpdjpub3QoLnBpbm5lZCksID4gYnV0dG9uOm5vdCgucGlubmVkKSwgPiBoMTpub3QoLnBpbm5lZCknOiB7XG4gICAgICBvcGFjaXR5OiAwLFxuICAgICAgdHJhbnNmb3JtOiAndHJhbnNsYXRlKC0xMDB2dyknLFxuICAgICAgdHJhbnNpdGlvbjogJ29wYWNpdHkgMC41cyBlYXNlLW91dCwgdHJhbnNmb3JtIDBzIDAuNXMnLFxuICAgIH0sXG4gIH0sXG4gIHNob3duOiB7XG4gICAgJz4gZGl2Om5vdCgucGlubmVkKSwgPiBidXR0b246bm90KC5waW5uZWQpLCA+IGgxOm5vdCgucGlubmVkKSc6IHtcbiAgICAgIHRyYW5zaXRpb246ICdvcGFjaXR5IDAuNXMgZWFzZS1vdXQnLFxuICAgIH0sXG4gIH0sXG59XG5cbmNvbnN0IGNvbnRyb2xzRGlzcGxheVN0eWxlcyA9IHtcbiAgaGlkZGVuOiB7XG4gICAgLi4uZGlzcGxheVN0eWxlcy5oaWRkZW4sXG4gICAgJ34gZGl2Om5vdCgucGlubmVkKSc6IGRpc3BsYXlTdHlsZXMuaGlkZGVuLFxuICB9LFxuICBzaG93bjoge1xuICAgIC4uLmRpc3BsYXlTdHlsZXMuZGlzcGxheSxcbiAgICAnfiBkaXYnOiBkaXNwbGF5U3R5bGVzLmRpc3BsYXksXG4gIH0sXG59XG5cbmNvbnN0IGNvbnRyb2xzU3R5bGUgPSB7XG4gIHBvc2l0aW9uOiAnYWJzb2x1dGUnLFxuICB6SW5kZXg6ICcyJyxcbiAgZGlzcGxheTogJ2ZsZXgnLFxuICBhbGlnbkl0ZW1zOiAnY2VudGVyJyxcbiAgJz4gYnV0dG9uJzoge1xuICAgIG1hcmdpbjogJzFlbScsXG4gICAgd2lkdGg6ICcxLjc1ZW0nLFxuICAgIGhlaWdodDogJzEuNzVlbScsXG4gICAgJyY6ZGlzYWJsZWQnOiB7XG4gICAgICBvcGFjaXR5OiAwLjMsXG4gICAgfSxcbiAgICAnJi5wbGF5LWJ1dHRvbic6IHtcbiAgICAgIHdpZHRoOiAnM2VtJyxcbiAgICAgIGhlaWdodDogJzNlbScsXG4gICAgfSxcbiAgfSxcbn1cblxuY29uc3QgdGV4dEVsbGlwc2lzID0ge1xuICBvdmVyZmxvdzogJ2hpZGRlbicsXG4gIHdoaXRlU3BhY2U6ICdub3dyYXAnLFxuICB0ZXh0T3ZlcmZsb3c6ICdlbGxpcHNpcycsXG59XG5cbmNvbnN0IGluZm9TdHlsZSA9IHtcbiAgYWxpZ25JdGVtczogJ2ZsZXgtc3RhcnQnLFxuICBvdmVyZmxvdzogJ3Zpc2libGUnLFxuICBoMToge1xuICAgIGhlaWdodDogJzNlbScsXG4gICAgZm9udFdlaWdodDogJzUwMCcsXG4gICAgLi4udGV4dEVsbGlwc2lzLFxuICAgICc+IGRpdic6IHRleHRFbGxpcHNpcyxcbiAgfSxcbn1cblxuY29uc3QgYmFja1N0eWxlID0ge1xuICBwb3NpdGlvbjogJ2Fic29sdXRlJyxcbiAgekluZGV4OiAnLTEnLFxuICB3aWR0aDogJzEwMCUnLFxuICBoZWlnaHQ6ICcxMDAlJyxcbiAgZGlzcGxheTogJ2ZsZXgnLFxuICBhbGlnbkl0ZW1zOiAnY2VudGVyJyxcbiAganVzdGlmeUNvbnRlbnQ6ICdjZW50ZXInLFxufVxuXG5jb25zdCBza2lwU3R5bGUgPSB7XG4gIHBvc2l0aW9uOiAnYWJzb2x1dGUnLFxuICByaWdodDogMCxcbiAgYm90dG9tOiAnOXJlbScsXG4gIHRleHRBbGlnbjogJ3JpZ2h0JyxcbiAgYnV0dG9uOiB7XG4gICAgd2lkdGg6ICdhdXRvJyxcbiAgICBoZWlnaHQ6ICdhdXRvJyxcbiAgfSxcbn1cblxuY29uc3QgZGVrc3RvcFN0eWxlID0ge1xuICAnPiBkaXYnOiB7XG4gICAgJz4gYnV0dG9uOm5vdCg6ZGlzYWJsZWQpIH4gYnV0dG9uOm5vdCg6ZGlzYWJsZWQpLCBidXR0b246bGFzdC1vZi10eXBlJzoge1xuICAgICAgbWFyZ2luTGVmdDogJzAuNzVlbScsXG4gICAgfSxcbiAgICAnPiBidXR0b246bm90KDpsYXN0LW9mLXR5cGUpLCA+IGJ1dHRvbjpmaXJzdC1vZi10eXBlLCA+IGJ1dHRvbiB+IGRpdic6IHtcbiAgICAgIG1hcmdpblJpZ2h0OiAnMC43NWVtJyxcbiAgICB9LFxuICAgICc+IGJ1dHRvbjpmaXJzdC1vZi10eXBlJzoge1xuICAgICAgbWFyZ2luTGVmdDogJzAnLFxuICAgIH0sXG4gIH0sXG59XG5cbmNvbnN0IGRlc2t0b3BDb250cm9scyA9IHtcbiAgZmxleFdyYXA6ICd3cmFwJyxcbiAgJz4gZGl2OmZpcnN0LW9mLXR5cGUnOiB7XG4gICAgZmxleDogJzEwMCUnLFxuICAgIG1hcmdpbkJvdHRvbTogJzAuODhlbScsXG4gIH0sXG4gICdidXR0b25bZGlzYWJsZWRdJzoge1xuICAgIGRpc3BsYXk6ICdub25lJyxcbiAgfSxcbn1cblxuY29uc3QgQ29udHJvbHNCbG9jayA9ICh7XG4gIG9yZGVyID0gJ21vYmlsZScsXG4gIHBsYXlCdXR0b24sXG4gIHJld2luZEJ1dHRvbiA9ICcnLFxuICBmb3J3YXJkQnV0dG9uID0gJycsXG4gIHByZXZpb3VzRXBpc29kZUJ1dHRvbiA9ICcnLFxuICBuZXh0RXBpc29kZUJ1dHRvbiA9ICcnLFxufSkgPT5cbiAgb3JkZXIgPT09ICdkZXNrdG9wJyA/IChcbiAgICA8PlxuICAgICAge3ByZXZpb3VzRXBpc29kZUJ1dHRvbn1cbiAgICAgIHtwbGF5QnV0dG9ufVxuICAgICAge25leHRFcGlzb2RlQnV0dG9ufVxuICAgICAge3Jld2luZEJ1dHRvbn1cbiAgICAgIHtmb3J3YXJkQnV0dG9ufVxuICAgIDwvPlxuICApIDogKFxuICAgIDw+XG4gICAgICB7cmV3aW5kQnV0dG9ufVxuICAgICAge3ByZXZpb3VzRXBpc29kZUJ1dHRvbn1cbiAgICAgIHtwbGF5QnV0dG9ufVxuICAgICAge25leHRFcGlzb2RlQnV0dG9ufVxuICAgICAge2ZvcndhcmRCdXR0b259XG4gICAgPC8+XG4gIClcblxuY29uc3QgRGVmYXVsdExheW91dCA9ICh7XG4gIHR5cGUgPSAnbW9iaWxlJyxcbiAgc3R5bGUsXG4gIGRpc3BsYXksXG4gIGNvbnRyb2xzRGlzcGxheSA9IGRpc3BsYXksXG4gIHNpemUsXG4gIHRpdGxlID0gJycsXG4gIGNoYW5uZWxUaXRsZSA9ICcnLFxuICB2aWRlbyxcbiAgaGF2ZUJvdHRvbUl0ZW0sXG4gIHNlZWtiYXIgPSAnJyxcbiAgY29udHJvbEJ1dHRvbnMsXG4gIHZvbHVtZUNvbnRyb2wsXG4gIGZ1bmN0aW9uQnV0dG9ucyxcbiAgZnVsbHNjcmVlbkJ1dHRvbixcbiAgYmFja0J1dHRvbixcbiAgYWRTdGF0dXMgPSAnJyxcbiAgYWRMaW5rID0gJycsXG4gIGFkU2tpcEJ1dHRvbixcbiAgYmFja0l0ZW1zLFxuICBjaGlsZHJlbixcbiAgY29udGFpbmVyUmVmLFxuICBiYWNrUmVmLFxuICAuLi5yZXN0XG59KSA9PiAoXG4gIDxkaXZcbiAgICBjc3M9e1tcbiAgICAgIGNvbnRhaW5lclN0eWxlLFxuICAgICAgcmVzcG9uc2l2ZVN0eWxlc1tzaXplXSxcbiAgICAgIHR5cGUgPT09ICdkZXNrdG9wJyAmJiBkZWtzdG9wU3R5bGUsXG4gICAgXX1cbiAgICBzdHlsZT17c3R5bGV9XG4gICAgcmVmPXtjb250YWluZXJSZWZ9XG4gICAgey4uLnJlc3R9XG4gID5cbiAgICB7dmlkZW99XG4gICAgPGRpdlxuICAgICAgcmVmPXtiYWNrUmVmfVxuICAgICAgY3NzPXtbXG4gICAgICAgIGJhY2tTdHlsZSxcbiAgICAgICAgZGlzcGxheSAhPT0gJ2hpZGRlbicgJiYgKGhhdmVCb3R0b21JdGVtID8gZHJvcFRvcCA6IGRyb3ApLFxuICAgICAgXX1cbiAgICA+XG4gICAgICB7dHlwZSA9PT0gJ21vYmlsZScgPyAoXG4gICAgICAgIDxkaXYgY3NzPXtbY29udHJvbHNTdHlsZSwgZGlzcGxheVN0eWxlc1tjb250cm9sc0Rpc3BsYXldXX0+XG4gICAgICAgICAgPENvbnRyb2xzQmxvY2sgb3JkZXI9XCJtb2JpbGVcIiB7Li4uY29udHJvbEJ1dHRvbnN9IC8+XG4gICAgICAgIDwvZGl2PlxuICAgICAgKSA6IChcbiAgICAgICAgYmFja0l0ZW1zXG4gICAgICApfVxuICAgICAge2FkU2tpcEJ1dHRvbiAmJiA8ZGl2IGNzcz17c2tpcFN0eWxlfT57YWRTa2lwQnV0dG9ufTwvZGl2Pn1cbiAgICA8L2Rpdj5cbiAgICA8ZGl2IGNzcz17W3Jvd1N0eWxlLCBpbmZvU3R5bGUsIGRpc3BsYXlTdHlsZXNbZGlzcGxheV1dfT5cbiAgICAgIHtiYWNrQnV0dG9ufVxuICAgICAgPGgxPlxuICAgICAgICB7dGl0bGV9XG4gICAgICAgIHtjaGFubmVsVGl0bGUgJiYgPGRpdiBjc3M9e3tmb250U2l6ZTogJzE2cHgnfX0+e2NoYW5uZWxUaXRsZX08L2Rpdj59XG4gICAgICA8L2gxPlxuICAgICAgPGRpdiBjc3M9e2V4cGFuZH0gLz5cbiAgICAgIHt0eXBlID09PSAnbW9iaWxlJyAmJiBmdW5jdGlvbkJ1dHRvbnN9XG4gICAgICB7YWRMaW5rICYmIDxkaXYgY2xhc3NOYW1lPVwicGlubmVkXCI+e2FkTGlua308L2Rpdj59XG4gICAgPC9kaXY+XG4gICAgPGRpdlxuICAgICAgY3NzPXtbXG4gICAgICAgIHJvd1N0eWxlLFxuICAgICAgICB7bWFyZ2luVG9wOiAnYXV0byd9LFxuICAgICAgICB0eXBlID09PSAnZGVza3RvcCcgJiYgZGVza3RvcENvbnRyb2xzLFxuICAgICAgICBjb250cm9sc0Rpc3BsYXlTdHlsZXNbY29udHJvbHNEaXNwbGF5XSxcbiAgICAgIF19XG4gICAgPlxuICAgICAge3NlZWtiYXIgfHwgPGRpdiAvPn1cbiAgICAgIHt0eXBlID09PSAnZGVza3RvcCcgJiYgKFxuICAgICAgICA8Q29udHJvbHNCbG9jayBvcmRlcj1cImRlc2t0b3BcIiB7Li4uY29udHJvbEJ1dHRvbnN9IC8+XG4gICAgICApfVxuICAgICAge2FkU3RhdHVzICYmIChcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwaW5uZWRcIiBjc3M9e3tmbGV4OiAxLCB0ZXh0U2hhZG93OiAnMnB4IDJweCAxcHggIzAwMCd9fT5cbiAgICAgICAgICB7YWRTdGF0dXN9XG4gICAgICAgIDwvZGl2PlxuICAgICAgKX1cbiAgICAgIHt0eXBlID09PSAnZGVza3RvcCcgJiYgKFxuICAgICAgICA8PlxuICAgICAgICAgIDxkaXYgY3NzPXtleHBhbmR9IC8+XG4gICAgICAgICAge3ZvbHVtZUNvbnRyb2x9XG4gICAgICAgICAge2Z1bmN0aW9uQnV0dG9uc31cbiAgICAgICAgPC8+XG4gICAgICApfVxuICAgICAge2Z1bGxzY3JlZW5CdXR0b259XG4gICAgPC9kaXY+XG4gICAge2NoaWxkcmVufVxuICA8L2Rpdj5cbilcblxuZXhwb3J0IGRlZmF1bHQgRGVmYXVsdExheW91dFxuIl19 */',
        toString: _EMOTION_STRINGIFIED_CSS_ERROR__$2,
      }

var _ref2 =
  process.env.NODE_ENV === 'production'
    ? {
        name: '1n8d5lm',
        styles: 'flex:1;text-shadow:2px 2px 1px #000',
      }
    : {
        name: '1iusnql-DefaultLayout',
        styles: 'flex:1;text-shadow:2px 2px 1px #000;label:DefaultLayout;',
        map:
          '/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkRlZmF1bHRMYXlvdXQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBNlJnQyIsImZpbGUiOiJEZWZhdWx0TGF5b3V0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyogQGpzeEltcG9ydFNvdXJjZSBAZW1vdGlvbi9yZWFjdCAqL1xuLyogZXNsaW50LWRpc2FibGUgcmVhY3QvcHJvcC10eXBlcyAqL1xuY29uc3QgZXhwYW5kID0ge1xuICBtYXJnaW46IDAsXG4gIGZsZXg6ICcxJyxcbn1cblxuY29uc3QgY29udGFpbmVyU3R5bGUgPSB7XG4gIHdpZHRoOiAnMTAwJScsXG4gIGhlaWdodDogJzEwMCUnLFxuICBib3hTaXppbmc6ICdib3JkZXItYm94JyxcbiAgZGlzcGxheTogJ2ZsZXgnLFxuICBmbGV4RGlyZWN0aW9uOiAnY29sdW1uJyxcbiAgb3ZlcmZsb3c6ICdoaWRkZW4nLFxuICBjb2xvcjogJ3doaXRlJyxcbiAgLy8gcHJldmVudCBhbmltYXRpb24gZ2xpY2goYWZ0ZXJpbWFnZSkgb2YgZGVzY2VuZGFudCBlbGVtZW50c1xuICB0cmFuc2Zvcm06ICd0cmFuc2xhdGVYKDApJyxcbiAgdXNlclNlbGVjdDogJ25vbmUnLFxuICBoMToge1xuICAgIG1hcmdpbjogMCxcbiAgICBmb250U2l6ZTogJzFlbScsXG4gICAgbGluZUhlaWdodDogJzEuNWVtJyxcbiAgfSxcbiAgJ2EsIGE6bGluaywgYTp2aXNpdGVkJzoge1xuICAgIGNvbG9yOiAnI2ZmZicsXG4gICAgb3BhY2l0eTogMC44LFxuICAgIHRleHREZWNvcmF0aW9uOiAnbm9uZScsXG4gIH0sXG4gIGJ1dHRvbjoge1xuICAgIGZvbnRTaXplOiAnaW5oZXJpdCcsXG4gIH0sXG59XG5cbmNvbnN0IGRyb3AgPSB7XG4gIGJhY2tncm91bmRJbWFnZTogYGxpbmVhci1ncmFkaWVudChcbiAgICAwZGVnLFxuICAgIHJnYmEoMCwwLDAsMC41KSAwLFxuICAgIHJnYmEoMCwwLDAsMCkgOHJlbSBjYWxjKDEwMCUgLSA4cmVtKSxcbiAgICByZ2JhKDAsMCwwLDAuNSkgMTAwJVxuICApYCxcbn1cblxuY29uc3QgZHJvcFRvcCA9IHtcbiAgYmFja2dyb3VuZEltYWdlOiBgbGluZWFyLWdyYWRpZW50KFxuICAgIDBkZWcsXG4gICAgcmdiYSgwLDAsMCwwKSAwLFxuICAgIHJnYmEoMCwwLDAsMCkgOHJlbSBjYWxjKDEwMCUgLSA4cmVtKSxcbiAgICByZ2JhKDAsMCwwLDAuNSkgMTAwJVxuICApYCxcbn1cblxuY29uc3QgcmVzcG9uc2l2ZVN0eWxlcyA9IHtcbiAgZGVza3RvcDoge1xuICAgIGZvbnRTaXplOiAnMjRweCcsXG4gIH0sIC8vIGFkZCBpZiBuZWNlc3Nhcnk6IGJpZy1kZXNrdG9wXG59XG5cbmNvbnN0IHJvd1N0eWxlID0ge1xuICBib3hTaXppbmc6ICdib3JkZXItYm94JyxcbiAgd2lkdGg6ICcxMDAlJyxcbiAgcGFkZGluZzogJ2NhbGMoMmVtIC0gMTZweCknLFxuICBkaXNwbGF5OiAnZmxleCcsXG4gIGFsaWduSXRlbXM6ICdjZW50ZXInLFxuICBidXR0b246IHtcbiAgICBmbGV4OiAnMCAwIDEuNWVtJyxcbiAgICB3aWR0aDogJzEuNWVtJyxcbiAgICBoZWlnaHQ6ICcxLjVlbScsXG4gIH0sXG4gICc+IGJ1dHRvbjpub3QoOmRpc2FibGVkKSB+IGJ1dHRvbjpub3QoOmRpc2FibGVkKSwgZGl2IH4gYnV0dG9uOmxhc3Qtb2YtdHlwZSc6IHtcbiAgICBtYXJnaW5MZWZ0OiAnMC41cmVtJyxcbiAgfSxcbiAgJz4gYnV0dG9uOm5vdCg6bGFzdC1vZi10eXBlKSc6IHtcbiAgICBtYXJnaW5SaWdodDogJzAuNXJlbScsXG4gIH0sXG59XG5cbmNvbnN0IGRpc3BsYXlTdHlsZXMgPSB7XG4gIGhpZGRlbjoge1xuICAgICc+IGRpdjpub3QoLnBpbm5lZCksID4gYnV0dG9uOm5vdCgucGlubmVkKSwgPiBoMTpub3QoLnBpbm5lZCknOiB7XG4gICAgICBvcGFjaXR5OiAwLFxuICAgICAgdHJhbnNmb3JtOiAndHJhbnNsYXRlKC0xMDB2dyknLFxuICAgICAgdHJhbnNpdGlvbjogJ29wYWNpdHkgMC41cyBlYXNlLW91dCwgdHJhbnNmb3JtIDBzIDAuNXMnLFxuICAgIH0sXG4gIH0sXG4gIHNob3duOiB7XG4gICAgJz4gZGl2Om5vdCgucGlubmVkKSwgPiBidXR0b246bm90KC5waW5uZWQpLCA+IGgxOm5vdCgucGlubmVkKSc6IHtcbiAgICAgIHRyYW5zaXRpb246ICdvcGFjaXR5IDAuNXMgZWFzZS1vdXQnLFxuICAgIH0sXG4gIH0sXG59XG5cbmNvbnN0IGNvbnRyb2xzRGlzcGxheVN0eWxlcyA9IHtcbiAgaGlkZGVuOiB7XG4gICAgLi4uZGlzcGxheVN0eWxlcy5oaWRkZW4sXG4gICAgJ34gZGl2Om5vdCgucGlubmVkKSc6IGRpc3BsYXlTdHlsZXMuaGlkZGVuLFxuICB9LFxuICBzaG93bjoge1xuICAgIC4uLmRpc3BsYXlTdHlsZXMuZGlzcGxheSxcbiAgICAnfiBkaXYnOiBkaXNwbGF5U3R5bGVzLmRpc3BsYXksXG4gIH0sXG59XG5cbmNvbnN0IGNvbnRyb2xzU3R5bGUgPSB7XG4gIHBvc2l0aW9uOiAnYWJzb2x1dGUnLFxuICB6SW5kZXg6ICcyJyxcbiAgZGlzcGxheTogJ2ZsZXgnLFxuICBhbGlnbkl0ZW1zOiAnY2VudGVyJyxcbiAgJz4gYnV0dG9uJzoge1xuICAgIG1hcmdpbjogJzFlbScsXG4gICAgd2lkdGg6ICcxLjc1ZW0nLFxuICAgIGhlaWdodDogJzEuNzVlbScsXG4gICAgJyY6ZGlzYWJsZWQnOiB7XG4gICAgICBvcGFjaXR5OiAwLjMsXG4gICAgfSxcbiAgICAnJi5wbGF5LWJ1dHRvbic6IHtcbiAgICAgIHdpZHRoOiAnM2VtJyxcbiAgICAgIGhlaWdodDogJzNlbScsXG4gICAgfSxcbiAgfSxcbn1cblxuY29uc3QgdGV4dEVsbGlwc2lzID0ge1xuICBvdmVyZmxvdzogJ2hpZGRlbicsXG4gIHdoaXRlU3BhY2U6ICdub3dyYXAnLFxuICB0ZXh0T3ZlcmZsb3c6ICdlbGxpcHNpcycsXG59XG5cbmNvbnN0IGluZm9TdHlsZSA9IHtcbiAgYWxpZ25JdGVtczogJ2ZsZXgtc3RhcnQnLFxuICBvdmVyZmxvdzogJ3Zpc2libGUnLFxuICBoMToge1xuICAgIGhlaWdodDogJzNlbScsXG4gICAgZm9udFdlaWdodDogJzUwMCcsXG4gICAgLi4udGV4dEVsbGlwc2lzLFxuICAgICc+IGRpdic6IHRleHRFbGxpcHNpcyxcbiAgfSxcbn1cblxuY29uc3QgYmFja1N0eWxlID0ge1xuICBwb3NpdGlvbjogJ2Fic29sdXRlJyxcbiAgekluZGV4OiAnLTEnLFxuICB3aWR0aDogJzEwMCUnLFxuICBoZWlnaHQ6ICcxMDAlJyxcbiAgZGlzcGxheTogJ2ZsZXgnLFxuICBhbGlnbkl0ZW1zOiAnY2VudGVyJyxcbiAganVzdGlmeUNvbnRlbnQ6ICdjZW50ZXInLFxufVxuXG5jb25zdCBza2lwU3R5bGUgPSB7XG4gIHBvc2l0aW9uOiAnYWJzb2x1dGUnLFxuICByaWdodDogMCxcbiAgYm90dG9tOiAnOXJlbScsXG4gIHRleHRBbGlnbjogJ3JpZ2h0JyxcbiAgYnV0dG9uOiB7XG4gICAgd2lkdGg6ICdhdXRvJyxcbiAgICBoZWlnaHQ6ICdhdXRvJyxcbiAgfSxcbn1cblxuY29uc3QgZGVrc3RvcFN0eWxlID0ge1xuICAnPiBkaXYnOiB7XG4gICAgJz4gYnV0dG9uOm5vdCg6ZGlzYWJsZWQpIH4gYnV0dG9uOm5vdCg6ZGlzYWJsZWQpLCBidXR0b246bGFzdC1vZi10eXBlJzoge1xuICAgICAgbWFyZ2luTGVmdDogJzAuNzVlbScsXG4gICAgfSxcbiAgICAnPiBidXR0b246bm90KDpsYXN0LW9mLXR5cGUpLCA+IGJ1dHRvbjpmaXJzdC1vZi10eXBlLCA+IGJ1dHRvbiB+IGRpdic6IHtcbiAgICAgIG1hcmdpblJpZ2h0OiAnMC43NWVtJyxcbiAgICB9LFxuICAgICc+IGJ1dHRvbjpmaXJzdC1vZi10eXBlJzoge1xuICAgICAgbWFyZ2luTGVmdDogJzAnLFxuICAgIH0sXG4gIH0sXG59XG5cbmNvbnN0IGRlc2t0b3BDb250cm9scyA9IHtcbiAgZmxleFdyYXA6ICd3cmFwJyxcbiAgJz4gZGl2OmZpcnN0LW9mLXR5cGUnOiB7XG4gICAgZmxleDogJzEwMCUnLFxuICAgIG1hcmdpbkJvdHRvbTogJzAuODhlbScsXG4gIH0sXG4gICdidXR0b25bZGlzYWJsZWRdJzoge1xuICAgIGRpc3BsYXk6ICdub25lJyxcbiAgfSxcbn1cblxuY29uc3QgQ29udHJvbHNCbG9jayA9ICh7XG4gIG9yZGVyID0gJ21vYmlsZScsXG4gIHBsYXlCdXR0b24sXG4gIHJld2luZEJ1dHRvbiA9ICcnLFxuICBmb3J3YXJkQnV0dG9uID0gJycsXG4gIHByZXZpb3VzRXBpc29kZUJ1dHRvbiA9ICcnLFxuICBuZXh0RXBpc29kZUJ1dHRvbiA9ICcnLFxufSkgPT5cbiAgb3JkZXIgPT09ICdkZXNrdG9wJyA/IChcbiAgICA8PlxuICAgICAge3ByZXZpb3VzRXBpc29kZUJ1dHRvbn1cbiAgICAgIHtwbGF5QnV0dG9ufVxuICAgICAge25leHRFcGlzb2RlQnV0dG9ufVxuICAgICAge3Jld2luZEJ1dHRvbn1cbiAgICAgIHtmb3J3YXJkQnV0dG9ufVxuICAgIDwvPlxuICApIDogKFxuICAgIDw+XG4gICAgICB7cmV3aW5kQnV0dG9ufVxuICAgICAge3ByZXZpb3VzRXBpc29kZUJ1dHRvbn1cbiAgICAgIHtwbGF5QnV0dG9ufVxuICAgICAge25leHRFcGlzb2RlQnV0dG9ufVxuICAgICAge2ZvcndhcmRCdXR0b259XG4gICAgPC8+XG4gIClcblxuY29uc3QgRGVmYXVsdExheW91dCA9ICh7XG4gIHR5cGUgPSAnbW9iaWxlJyxcbiAgc3R5bGUsXG4gIGRpc3BsYXksXG4gIGNvbnRyb2xzRGlzcGxheSA9IGRpc3BsYXksXG4gIHNpemUsXG4gIHRpdGxlID0gJycsXG4gIGNoYW5uZWxUaXRsZSA9ICcnLFxuICB2aWRlbyxcbiAgaGF2ZUJvdHRvbUl0ZW0sXG4gIHNlZWtiYXIgPSAnJyxcbiAgY29udHJvbEJ1dHRvbnMsXG4gIHZvbHVtZUNvbnRyb2wsXG4gIGZ1bmN0aW9uQnV0dG9ucyxcbiAgZnVsbHNjcmVlbkJ1dHRvbixcbiAgYmFja0J1dHRvbixcbiAgYWRTdGF0dXMgPSAnJyxcbiAgYWRMaW5rID0gJycsXG4gIGFkU2tpcEJ1dHRvbixcbiAgYmFja0l0ZW1zLFxuICBjaGlsZHJlbixcbiAgY29udGFpbmVyUmVmLFxuICBiYWNrUmVmLFxuICAuLi5yZXN0XG59KSA9PiAoXG4gIDxkaXZcbiAgICBjc3M9e1tcbiAgICAgIGNvbnRhaW5lclN0eWxlLFxuICAgICAgcmVzcG9uc2l2ZVN0eWxlc1tzaXplXSxcbiAgICAgIHR5cGUgPT09ICdkZXNrdG9wJyAmJiBkZWtzdG9wU3R5bGUsXG4gICAgXX1cbiAgICBzdHlsZT17c3R5bGV9XG4gICAgcmVmPXtjb250YWluZXJSZWZ9XG4gICAgey4uLnJlc3R9XG4gID5cbiAgICB7dmlkZW99XG4gICAgPGRpdlxuICAgICAgcmVmPXtiYWNrUmVmfVxuICAgICAgY3NzPXtbXG4gICAgICAgIGJhY2tTdHlsZSxcbiAgICAgICAgZGlzcGxheSAhPT0gJ2hpZGRlbicgJiYgKGhhdmVCb3R0b21JdGVtID8gZHJvcFRvcCA6IGRyb3ApLFxuICAgICAgXX1cbiAgICA+XG4gICAgICB7dHlwZSA9PT0gJ21vYmlsZScgPyAoXG4gICAgICAgIDxkaXYgY3NzPXtbY29udHJvbHNTdHlsZSwgZGlzcGxheVN0eWxlc1tjb250cm9sc0Rpc3BsYXldXX0+XG4gICAgICAgICAgPENvbnRyb2xzQmxvY2sgb3JkZXI9XCJtb2JpbGVcIiB7Li4uY29udHJvbEJ1dHRvbnN9IC8+XG4gICAgICAgIDwvZGl2PlxuICAgICAgKSA6IChcbiAgICAgICAgYmFja0l0ZW1zXG4gICAgICApfVxuICAgICAge2FkU2tpcEJ1dHRvbiAmJiA8ZGl2IGNzcz17c2tpcFN0eWxlfT57YWRTa2lwQnV0dG9ufTwvZGl2Pn1cbiAgICA8L2Rpdj5cbiAgICA8ZGl2IGNzcz17W3Jvd1N0eWxlLCBpbmZvU3R5bGUsIGRpc3BsYXlTdHlsZXNbZGlzcGxheV1dfT5cbiAgICAgIHtiYWNrQnV0dG9ufVxuICAgICAgPGgxPlxuICAgICAgICB7dGl0bGV9XG4gICAgICAgIHtjaGFubmVsVGl0bGUgJiYgPGRpdiBjc3M9e3tmb250U2l6ZTogJzE2cHgnfX0+e2NoYW5uZWxUaXRsZX08L2Rpdj59XG4gICAgICA8L2gxPlxuICAgICAgPGRpdiBjc3M9e2V4cGFuZH0gLz5cbiAgICAgIHt0eXBlID09PSAnbW9iaWxlJyAmJiBmdW5jdGlvbkJ1dHRvbnN9XG4gICAgICB7YWRMaW5rICYmIDxkaXYgY2xhc3NOYW1lPVwicGlubmVkXCI+e2FkTGlua308L2Rpdj59XG4gICAgPC9kaXY+XG4gICAgPGRpdlxuICAgICAgY3NzPXtbXG4gICAgICAgIHJvd1N0eWxlLFxuICAgICAgICB7bWFyZ2luVG9wOiAnYXV0byd9LFxuICAgICAgICB0eXBlID09PSAnZGVza3RvcCcgJiYgZGVza3RvcENvbnRyb2xzLFxuICAgICAgICBjb250cm9sc0Rpc3BsYXlTdHlsZXNbY29udHJvbHNEaXNwbGF5XSxcbiAgICAgIF19XG4gICAgPlxuICAgICAge3NlZWtiYXIgfHwgPGRpdiAvPn1cbiAgICAgIHt0eXBlID09PSAnZGVza3RvcCcgJiYgKFxuICAgICAgICA8Q29udHJvbHNCbG9jayBvcmRlcj1cImRlc2t0b3BcIiB7Li4uY29udHJvbEJ1dHRvbnN9IC8+XG4gICAgICApfVxuICAgICAge2FkU3RhdHVzICYmIChcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwaW5uZWRcIiBjc3M9e3tmbGV4OiAxLCB0ZXh0U2hhZG93OiAnMnB4IDJweCAxcHggIzAwMCd9fT5cbiAgICAgICAgICB7YWRTdGF0dXN9XG4gICAgICAgIDwvZGl2PlxuICAgICAgKX1cbiAgICAgIHt0eXBlID09PSAnZGVza3RvcCcgJiYgKFxuICAgICAgICA8PlxuICAgICAgICAgIDxkaXYgY3NzPXtleHBhbmR9IC8+XG4gICAgICAgICAge3ZvbHVtZUNvbnRyb2x9XG4gICAgICAgICAge2Z1bmN0aW9uQnV0dG9uc31cbiAgICAgICAgPC8+XG4gICAgICApfVxuICAgICAge2Z1bGxzY3JlZW5CdXR0b259XG4gICAgPC9kaXY+XG4gICAge2NoaWxkcmVufVxuICA8L2Rpdj5cbilcblxuZXhwb3J0IGRlZmF1bHQgRGVmYXVsdExheW91dFxuIl19 */',
        toString: _EMOTION_STRINGIFIED_CSS_ERROR__$2,
      }

const DefaultLayout = ({
  type = 'mobile',
  style,
  display,
  controlsDisplay = display,
  size,
  title = '',
  channelTitle = '',
  video,
  haveBottomItem,
  seekbar = '',
  controlButtons,
  volumeControl,
  functionButtons,
  fullscreenButton,
  backButton,
  adStatus = '',
  adLink = '',
  adSkipButton,
  backItems,
  children,
  containerRef,
  backRef,
  ...rest
}) =>
  jsxs('div', {
    css: [
      containerStyle$2,
      responsiveStyles[size],
      type === 'desktop' && dekstopStyle$1,
      process.env.NODE_ENV === 'production' ? '' : ';label:DefaultLayout;',
      process.env.NODE_ENV === 'production'
        ? ''
        : '/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkRlZmF1bHRMYXlvdXQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBNE9JIiwiZmlsZSI6IkRlZmF1bHRMYXlvdXQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBAanN4SW1wb3J0U291cmNlIEBlbW90aW9uL3JlYWN0ICovXG4vKiBlc2xpbnQtZGlzYWJsZSByZWFjdC9wcm9wLXR5cGVzICovXG5jb25zdCBleHBhbmQgPSB7XG4gIG1hcmdpbjogMCxcbiAgZmxleDogJzEnLFxufVxuXG5jb25zdCBjb250YWluZXJTdHlsZSA9IHtcbiAgd2lkdGg6ICcxMDAlJyxcbiAgaGVpZ2h0OiAnMTAwJScsXG4gIGJveFNpemluZzogJ2JvcmRlci1ib3gnLFxuICBkaXNwbGF5OiAnZmxleCcsXG4gIGZsZXhEaXJlY3Rpb246ICdjb2x1bW4nLFxuICBvdmVyZmxvdzogJ2hpZGRlbicsXG4gIGNvbG9yOiAnd2hpdGUnLFxuICAvLyBwcmV2ZW50IGFuaW1hdGlvbiBnbGljaChhZnRlcmltYWdlKSBvZiBkZXNjZW5kYW50IGVsZW1lbnRzXG4gIHRyYW5zZm9ybTogJ3RyYW5zbGF0ZVgoMCknLFxuICB1c2VyU2VsZWN0OiAnbm9uZScsXG4gIGgxOiB7XG4gICAgbWFyZ2luOiAwLFxuICAgIGZvbnRTaXplOiAnMWVtJyxcbiAgICBsaW5lSGVpZ2h0OiAnMS41ZW0nLFxuICB9LFxuICAnYSwgYTpsaW5rLCBhOnZpc2l0ZWQnOiB7XG4gICAgY29sb3I6ICcjZmZmJyxcbiAgICBvcGFjaXR5OiAwLjgsXG4gICAgdGV4dERlY29yYXRpb246ICdub25lJyxcbiAgfSxcbiAgYnV0dG9uOiB7XG4gICAgZm9udFNpemU6ICdpbmhlcml0JyxcbiAgfSxcbn1cblxuY29uc3QgZHJvcCA9IHtcbiAgYmFja2dyb3VuZEltYWdlOiBgbGluZWFyLWdyYWRpZW50KFxuICAgIDBkZWcsXG4gICAgcmdiYSgwLDAsMCwwLjUpIDAsXG4gICAgcmdiYSgwLDAsMCwwKSA4cmVtIGNhbGMoMTAwJSAtIDhyZW0pLFxuICAgIHJnYmEoMCwwLDAsMC41KSAxMDAlXG4gIClgLFxufVxuXG5jb25zdCBkcm9wVG9wID0ge1xuICBiYWNrZ3JvdW5kSW1hZ2U6IGBsaW5lYXItZ3JhZGllbnQoXG4gICAgMGRlZyxcbiAgICByZ2JhKDAsMCwwLDApIDAsXG4gICAgcmdiYSgwLDAsMCwwKSA4cmVtIGNhbGMoMTAwJSAtIDhyZW0pLFxuICAgIHJnYmEoMCwwLDAsMC41KSAxMDAlXG4gIClgLFxufVxuXG5jb25zdCByZXNwb25zaXZlU3R5bGVzID0ge1xuICBkZXNrdG9wOiB7XG4gICAgZm9udFNpemU6ICcyNHB4JyxcbiAgfSwgLy8gYWRkIGlmIG5lY2Vzc2FyeTogYmlnLWRlc2t0b3Bcbn1cblxuY29uc3Qgcm93U3R5bGUgPSB7XG4gIGJveFNpemluZzogJ2JvcmRlci1ib3gnLFxuICB3aWR0aDogJzEwMCUnLFxuICBwYWRkaW5nOiAnY2FsYygyZW0gLSAxNnB4KScsXG4gIGRpc3BsYXk6ICdmbGV4JyxcbiAgYWxpZ25JdGVtczogJ2NlbnRlcicsXG4gIGJ1dHRvbjoge1xuICAgIGZsZXg6ICcwIDAgMS41ZW0nLFxuICAgIHdpZHRoOiAnMS41ZW0nLFxuICAgIGhlaWdodDogJzEuNWVtJyxcbiAgfSxcbiAgJz4gYnV0dG9uOm5vdCg6ZGlzYWJsZWQpIH4gYnV0dG9uOm5vdCg6ZGlzYWJsZWQpLCBkaXYgfiBidXR0b246bGFzdC1vZi10eXBlJzoge1xuICAgIG1hcmdpbkxlZnQ6ICcwLjVyZW0nLFxuICB9LFxuICAnPiBidXR0b246bm90KDpsYXN0LW9mLXR5cGUpJzoge1xuICAgIG1hcmdpblJpZ2h0OiAnMC41cmVtJyxcbiAgfSxcbn1cblxuY29uc3QgZGlzcGxheVN0eWxlcyA9IHtcbiAgaGlkZGVuOiB7XG4gICAgJz4gZGl2Om5vdCgucGlubmVkKSwgPiBidXR0b246bm90KC5waW5uZWQpLCA+IGgxOm5vdCgucGlubmVkKSc6IHtcbiAgICAgIG9wYWNpdHk6IDAsXG4gICAgICB0cmFuc2Zvcm06ICd0cmFuc2xhdGUoLTEwMHZ3KScsXG4gICAgICB0cmFuc2l0aW9uOiAnb3BhY2l0eSAwLjVzIGVhc2Utb3V0LCB0cmFuc2Zvcm0gMHMgMC41cycsXG4gICAgfSxcbiAgfSxcbiAgc2hvd246IHtcbiAgICAnPiBkaXY6bm90KC5waW5uZWQpLCA+IGJ1dHRvbjpub3QoLnBpbm5lZCksID4gaDE6bm90KC5waW5uZWQpJzoge1xuICAgICAgdHJhbnNpdGlvbjogJ29wYWNpdHkgMC41cyBlYXNlLW91dCcsXG4gICAgfSxcbiAgfSxcbn1cblxuY29uc3QgY29udHJvbHNEaXNwbGF5U3R5bGVzID0ge1xuICBoaWRkZW46IHtcbiAgICAuLi5kaXNwbGF5U3R5bGVzLmhpZGRlbixcbiAgICAnfiBkaXY6bm90KC5waW5uZWQpJzogZGlzcGxheVN0eWxlcy5oaWRkZW4sXG4gIH0sXG4gIHNob3duOiB7XG4gICAgLi4uZGlzcGxheVN0eWxlcy5kaXNwbGF5LFxuICAgICd+IGRpdic6IGRpc3BsYXlTdHlsZXMuZGlzcGxheSxcbiAgfSxcbn1cblxuY29uc3QgY29udHJvbHNTdHlsZSA9IHtcbiAgcG9zaXRpb246ICdhYnNvbHV0ZScsXG4gIHpJbmRleDogJzInLFxuICBkaXNwbGF5OiAnZmxleCcsXG4gIGFsaWduSXRlbXM6ICdjZW50ZXInLFxuICAnPiBidXR0b24nOiB7XG4gICAgbWFyZ2luOiAnMWVtJyxcbiAgICB3aWR0aDogJzEuNzVlbScsXG4gICAgaGVpZ2h0OiAnMS43NWVtJyxcbiAgICAnJjpkaXNhYmxlZCc6IHtcbiAgICAgIG9wYWNpdHk6IDAuMyxcbiAgICB9LFxuICAgICcmLnBsYXktYnV0dG9uJzoge1xuICAgICAgd2lkdGg6ICczZW0nLFxuICAgICAgaGVpZ2h0OiAnM2VtJyxcbiAgICB9LFxuICB9LFxufVxuXG5jb25zdCB0ZXh0RWxsaXBzaXMgPSB7XG4gIG92ZXJmbG93OiAnaGlkZGVuJyxcbiAgd2hpdGVTcGFjZTogJ25vd3JhcCcsXG4gIHRleHRPdmVyZmxvdzogJ2VsbGlwc2lzJyxcbn1cblxuY29uc3QgaW5mb1N0eWxlID0ge1xuICBhbGlnbkl0ZW1zOiAnZmxleC1zdGFydCcsXG4gIG92ZXJmbG93OiAndmlzaWJsZScsXG4gIGgxOiB7XG4gICAgaGVpZ2h0OiAnM2VtJyxcbiAgICBmb250V2VpZ2h0OiAnNTAwJyxcbiAgICAuLi50ZXh0RWxsaXBzaXMsXG4gICAgJz4gZGl2JzogdGV4dEVsbGlwc2lzLFxuICB9LFxufVxuXG5jb25zdCBiYWNrU3R5bGUgPSB7XG4gIHBvc2l0aW9uOiAnYWJzb2x1dGUnLFxuICB6SW5kZXg6ICctMScsXG4gIHdpZHRoOiAnMTAwJScsXG4gIGhlaWdodDogJzEwMCUnLFxuICBkaXNwbGF5OiAnZmxleCcsXG4gIGFsaWduSXRlbXM6ICdjZW50ZXInLFxuICBqdXN0aWZ5Q29udGVudDogJ2NlbnRlcicsXG59XG5cbmNvbnN0IHNraXBTdHlsZSA9IHtcbiAgcG9zaXRpb246ICdhYnNvbHV0ZScsXG4gIHJpZ2h0OiAwLFxuICBib3R0b206ICc5cmVtJyxcbiAgdGV4dEFsaWduOiAncmlnaHQnLFxuICBidXR0b246IHtcbiAgICB3aWR0aDogJ2F1dG8nLFxuICAgIGhlaWdodDogJ2F1dG8nLFxuICB9LFxufVxuXG5jb25zdCBkZWtzdG9wU3R5bGUgPSB7XG4gICc+IGRpdic6IHtcbiAgICAnPiBidXR0b246bm90KDpkaXNhYmxlZCkgfiBidXR0b246bm90KDpkaXNhYmxlZCksIGJ1dHRvbjpsYXN0LW9mLXR5cGUnOiB7XG4gICAgICBtYXJnaW5MZWZ0OiAnMC43NWVtJyxcbiAgICB9LFxuICAgICc+IGJ1dHRvbjpub3QoOmxhc3Qtb2YtdHlwZSksID4gYnV0dG9uOmZpcnN0LW9mLXR5cGUsID4gYnV0dG9uIH4gZGl2Jzoge1xuICAgICAgbWFyZ2luUmlnaHQ6ICcwLjc1ZW0nLFxuICAgIH0sXG4gICAgJz4gYnV0dG9uOmZpcnN0LW9mLXR5cGUnOiB7XG4gICAgICBtYXJnaW5MZWZ0OiAnMCcsXG4gICAgfSxcbiAgfSxcbn1cblxuY29uc3QgZGVza3RvcENvbnRyb2xzID0ge1xuICBmbGV4V3JhcDogJ3dyYXAnLFxuICAnPiBkaXY6Zmlyc3Qtb2YtdHlwZSc6IHtcbiAgICBmbGV4OiAnMTAwJScsXG4gICAgbWFyZ2luQm90dG9tOiAnMC44OGVtJyxcbiAgfSxcbiAgJ2J1dHRvbltkaXNhYmxlZF0nOiB7XG4gICAgZGlzcGxheTogJ25vbmUnLFxuICB9LFxufVxuXG5jb25zdCBDb250cm9sc0Jsb2NrID0gKHtcbiAgb3JkZXIgPSAnbW9iaWxlJyxcbiAgcGxheUJ1dHRvbixcbiAgcmV3aW5kQnV0dG9uID0gJycsXG4gIGZvcndhcmRCdXR0b24gPSAnJyxcbiAgcHJldmlvdXNFcGlzb2RlQnV0dG9uID0gJycsXG4gIG5leHRFcGlzb2RlQnV0dG9uID0gJycsXG59KSA9PlxuICBvcmRlciA9PT0gJ2Rlc2t0b3AnID8gKFxuICAgIDw+XG4gICAgICB7cHJldmlvdXNFcGlzb2RlQnV0dG9ufVxuICAgICAge3BsYXlCdXR0b259XG4gICAgICB7bmV4dEVwaXNvZGVCdXR0b259XG4gICAgICB7cmV3aW5kQnV0dG9ufVxuICAgICAge2ZvcndhcmRCdXR0b259XG4gICAgPC8+XG4gICkgOiAoXG4gICAgPD5cbiAgICAgIHtyZXdpbmRCdXR0b259XG4gICAgICB7cHJldmlvdXNFcGlzb2RlQnV0dG9ufVxuICAgICAge3BsYXlCdXR0b259XG4gICAgICB7bmV4dEVwaXNvZGVCdXR0b259XG4gICAgICB7Zm9yd2FyZEJ1dHRvbn1cbiAgICA8Lz5cbiAgKVxuXG5jb25zdCBEZWZhdWx0TGF5b3V0ID0gKHtcbiAgdHlwZSA9ICdtb2JpbGUnLFxuICBzdHlsZSxcbiAgZGlzcGxheSxcbiAgY29udHJvbHNEaXNwbGF5ID0gZGlzcGxheSxcbiAgc2l6ZSxcbiAgdGl0bGUgPSAnJyxcbiAgY2hhbm5lbFRpdGxlID0gJycsXG4gIHZpZGVvLFxuICBoYXZlQm90dG9tSXRlbSxcbiAgc2Vla2JhciA9ICcnLFxuICBjb250cm9sQnV0dG9ucyxcbiAgdm9sdW1lQ29udHJvbCxcbiAgZnVuY3Rpb25CdXR0b25zLFxuICBmdWxsc2NyZWVuQnV0dG9uLFxuICBiYWNrQnV0dG9uLFxuICBhZFN0YXR1cyA9ICcnLFxuICBhZExpbmsgPSAnJyxcbiAgYWRTa2lwQnV0dG9uLFxuICBiYWNrSXRlbXMsXG4gIGNoaWxkcmVuLFxuICBjb250YWluZXJSZWYsXG4gIGJhY2tSZWYsXG4gIC4uLnJlc3Rcbn0pID0+IChcbiAgPGRpdlxuICAgIGNzcz17W1xuICAgICAgY29udGFpbmVyU3R5bGUsXG4gICAgICByZXNwb25zaXZlU3R5bGVzW3NpemVdLFxuICAgICAgdHlwZSA9PT0gJ2Rlc2t0b3AnICYmIGRla3N0b3BTdHlsZSxcbiAgICBdfVxuICAgIHN0eWxlPXtzdHlsZX1cbiAgICByZWY9e2NvbnRhaW5lclJlZn1cbiAgICB7Li4ucmVzdH1cbiAgPlxuICAgIHt2aWRlb31cbiAgICA8ZGl2XG4gICAgICByZWY9e2JhY2tSZWZ9XG4gICAgICBjc3M9e1tcbiAgICAgICAgYmFja1N0eWxlLFxuICAgICAgICBkaXNwbGF5ICE9PSAnaGlkZGVuJyAmJiAoaGF2ZUJvdHRvbUl0ZW0gPyBkcm9wVG9wIDogZHJvcCksXG4gICAgICBdfVxuICAgID5cbiAgICAgIHt0eXBlID09PSAnbW9iaWxlJyA/IChcbiAgICAgICAgPGRpdiBjc3M9e1tjb250cm9sc1N0eWxlLCBkaXNwbGF5U3R5bGVzW2NvbnRyb2xzRGlzcGxheV1dfT5cbiAgICAgICAgICA8Q29udHJvbHNCbG9jayBvcmRlcj1cIm1vYmlsZVwiIHsuLi5jb250cm9sQnV0dG9uc30gLz5cbiAgICAgICAgPC9kaXY+XG4gICAgICApIDogKFxuICAgICAgICBiYWNrSXRlbXNcbiAgICAgICl9XG4gICAgICB7YWRTa2lwQnV0dG9uICYmIDxkaXYgY3NzPXtza2lwU3R5bGV9PnthZFNraXBCdXR0b259PC9kaXY+fVxuICAgIDwvZGl2PlxuICAgIDxkaXYgY3NzPXtbcm93U3R5bGUsIGluZm9TdHlsZSwgZGlzcGxheVN0eWxlc1tkaXNwbGF5XV19PlxuICAgICAge2JhY2tCdXR0b259XG4gICAgICA8aDE+XG4gICAgICAgIHt0aXRsZX1cbiAgICAgICAge2NoYW5uZWxUaXRsZSAmJiA8ZGl2IGNzcz17e2ZvbnRTaXplOiAnMTZweCd9fT57Y2hhbm5lbFRpdGxlfTwvZGl2Pn1cbiAgICAgIDwvaDE+XG4gICAgICA8ZGl2IGNzcz17ZXhwYW5kfSAvPlxuICAgICAge3R5cGUgPT09ICdtb2JpbGUnICYmIGZ1bmN0aW9uQnV0dG9uc31cbiAgICAgIHthZExpbmsgJiYgPGRpdiBjbGFzc05hbWU9XCJwaW5uZWRcIj57YWRMaW5rfTwvZGl2Pn1cbiAgICA8L2Rpdj5cbiAgICA8ZGl2XG4gICAgICBjc3M9e1tcbiAgICAgICAgcm93U3R5bGUsXG4gICAgICAgIHttYXJnaW5Ub3A6ICdhdXRvJ30sXG4gICAgICAgIHR5cGUgPT09ICdkZXNrdG9wJyAmJiBkZXNrdG9wQ29udHJvbHMsXG4gICAgICAgIGNvbnRyb2xzRGlzcGxheVN0eWxlc1tjb250cm9sc0Rpc3BsYXldLFxuICAgICAgXX1cbiAgICA+XG4gICAgICB7c2Vla2JhciB8fCA8ZGl2IC8+fVxuICAgICAge3R5cGUgPT09ICdkZXNrdG9wJyAmJiAoXG4gICAgICAgIDxDb250cm9sc0Jsb2NrIG9yZGVyPVwiZGVza3RvcFwiIHsuLi5jb250cm9sQnV0dG9uc30gLz5cbiAgICAgICl9XG4gICAgICB7YWRTdGF0dXMgJiYgKFxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInBpbm5lZFwiIGNzcz17e2ZsZXg6IDEsIHRleHRTaGFkb3c6ICcycHggMnB4IDFweCAjMDAwJ319PlxuICAgICAgICAgIHthZFN0YXR1c31cbiAgICAgICAgPC9kaXY+XG4gICAgICApfVxuICAgICAge3R5cGUgPT09ICdkZXNrdG9wJyAmJiAoXG4gICAgICAgIDw+XG4gICAgICAgICAgPGRpdiBjc3M9e2V4cGFuZH0gLz5cbiAgICAgICAgICB7dm9sdW1lQ29udHJvbH1cbiAgICAgICAgICB7ZnVuY3Rpb25CdXR0b25zfVxuICAgICAgICA8Lz5cbiAgICAgICl9XG4gICAgICB7ZnVsbHNjcmVlbkJ1dHRvbn1cbiAgICA8L2Rpdj5cbiAgICB7Y2hpbGRyZW59XG4gIDwvZGl2PlxuKVxuXG5leHBvcnQgZGVmYXVsdCBEZWZhdWx0TGF5b3V0XG4iXX0= */',
    ],
    style: style,
    ref: containerRef,
    ...rest,
    children: [
      video,
      jsxs('div', {
        ref: backRef,
        css: [
          backStyle,
          display !== 'hidden' && (haveBottomItem ? dropTop : drop),
          process.env.NODE_ENV === 'production' ? '' : ';label:DefaultLayout;',
          process.env.NODE_ENV === 'production'
            ? ''
            : '/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkRlZmF1bHRMYXlvdXQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBd1BNIiwiZmlsZSI6IkRlZmF1bHRMYXlvdXQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBAanN4SW1wb3J0U291cmNlIEBlbW90aW9uL3JlYWN0ICovXG4vKiBlc2xpbnQtZGlzYWJsZSByZWFjdC9wcm9wLXR5cGVzICovXG5jb25zdCBleHBhbmQgPSB7XG4gIG1hcmdpbjogMCxcbiAgZmxleDogJzEnLFxufVxuXG5jb25zdCBjb250YWluZXJTdHlsZSA9IHtcbiAgd2lkdGg6ICcxMDAlJyxcbiAgaGVpZ2h0OiAnMTAwJScsXG4gIGJveFNpemluZzogJ2JvcmRlci1ib3gnLFxuICBkaXNwbGF5OiAnZmxleCcsXG4gIGZsZXhEaXJlY3Rpb246ICdjb2x1bW4nLFxuICBvdmVyZmxvdzogJ2hpZGRlbicsXG4gIGNvbG9yOiAnd2hpdGUnLFxuICAvLyBwcmV2ZW50IGFuaW1hdGlvbiBnbGljaChhZnRlcmltYWdlKSBvZiBkZXNjZW5kYW50IGVsZW1lbnRzXG4gIHRyYW5zZm9ybTogJ3RyYW5zbGF0ZVgoMCknLFxuICB1c2VyU2VsZWN0OiAnbm9uZScsXG4gIGgxOiB7XG4gICAgbWFyZ2luOiAwLFxuICAgIGZvbnRTaXplOiAnMWVtJyxcbiAgICBsaW5lSGVpZ2h0OiAnMS41ZW0nLFxuICB9LFxuICAnYSwgYTpsaW5rLCBhOnZpc2l0ZWQnOiB7XG4gICAgY29sb3I6ICcjZmZmJyxcbiAgICBvcGFjaXR5OiAwLjgsXG4gICAgdGV4dERlY29yYXRpb246ICdub25lJyxcbiAgfSxcbiAgYnV0dG9uOiB7XG4gICAgZm9udFNpemU6ICdpbmhlcml0JyxcbiAgfSxcbn1cblxuY29uc3QgZHJvcCA9IHtcbiAgYmFja2dyb3VuZEltYWdlOiBgbGluZWFyLWdyYWRpZW50KFxuICAgIDBkZWcsXG4gICAgcmdiYSgwLDAsMCwwLjUpIDAsXG4gICAgcmdiYSgwLDAsMCwwKSA4cmVtIGNhbGMoMTAwJSAtIDhyZW0pLFxuICAgIHJnYmEoMCwwLDAsMC41KSAxMDAlXG4gIClgLFxufVxuXG5jb25zdCBkcm9wVG9wID0ge1xuICBiYWNrZ3JvdW5kSW1hZ2U6IGBsaW5lYXItZ3JhZGllbnQoXG4gICAgMGRlZyxcbiAgICByZ2JhKDAsMCwwLDApIDAsXG4gICAgcmdiYSgwLDAsMCwwKSA4cmVtIGNhbGMoMTAwJSAtIDhyZW0pLFxuICAgIHJnYmEoMCwwLDAsMC41KSAxMDAlXG4gIClgLFxufVxuXG5jb25zdCByZXNwb25zaXZlU3R5bGVzID0ge1xuICBkZXNrdG9wOiB7XG4gICAgZm9udFNpemU6ICcyNHB4JyxcbiAgfSwgLy8gYWRkIGlmIG5lY2Vzc2FyeTogYmlnLWRlc2t0b3Bcbn1cblxuY29uc3Qgcm93U3R5bGUgPSB7XG4gIGJveFNpemluZzogJ2JvcmRlci1ib3gnLFxuICB3aWR0aDogJzEwMCUnLFxuICBwYWRkaW5nOiAnY2FsYygyZW0gLSAxNnB4KScsXG4gIGRpc3BsYXk6ICdmbGV4JyxcbiAgYWxpZ25JdGVtczogJ2NlbnRlcicsXG4gIGJ1dHRvbjoge1xuICAgIGZsZXg6ICcwIDAgMS41ZW0nLFxuICAgIHdpZHRoOiAnMS41ZW0nLFxuICAgIGhlaWdodDogJzEuNWVtJyxcbiAgfSxcbiAgJz4gYnV0dG9uOm5vdCg6ZGlzYWJsZWQpIH4gYnV0dG9uOm5vdCg6ZGlzYWJsZWQpLCBkaXYgfiBidXR0b246bGFzdC1vZi10eXBlJzoge1xuICAgIG1hcmdpbkxlZnQ6ICcwLjVyZW0nLFxuICB9LFxuICAnPiBidXR0b246bm90KDpsYXN0LW9mLXR5cGUpJzoge1xuICAgIG1hcmdpblJpZ2h0OiAnMC41cmVtJyxcbiAgfSxcbn1cblxuY29uc3QgZGlzcGxheVN0eWxlcyA9IHtcbiAgaGlkZGVuOiB7XG4gICAgJz4gZGl2Om5vdCgucGlubmVkKSwgPiBidXR0b246bm90KC5waW5uZWQpLCA+IGgxOm5vdCgucGlubmVkKSc6IHtcbiAgICAgIG9wYWNpdHk6IDAsXG4gICAgICB0cmFuc2Zvcm06ICd0cmFuc2xhdGUoLTEwMHZ3KScsXG4gICAgICB0cmFuc2l0aW9uOiAnb3BhY2l0eSAwLjVzIGVhc2Utb3V0LCB0cmFuc2Zvcm0gMHMgMC41cycsXG4gICAgfSxcbiAgfSxcbiAgc2hvd246IHtcbiAgICAnPiBkaXY6bm90KC5waW5uZWQpLCA+IGJ1dHRvbjpub3QoLnBpbm5lZCksID4gaDE6bm90KC5waW5uZWQpJzoge1xuICAgICAgdHJhbnNpdGlvbjogJ29wYWNpdHkgMC41cyBlYXNlLW91dCcsXG4gICAgfSxcbiAgfSxcbn1cblxuY29uc3QgY29udHJvbHNEaXNwbGF5U3R5bGVzID0ge1xuICBoaWRkZW46IHtcbiAgICAuLi5kaXNwbGF5U3R5bGVzLmhpZGRlbixcbiAgICAnfiBkaXY6bm90KC5waW5uZWQpJzogZGlzcGxheVN0eWxlcy5oaWRkZW4sXG4gIH0sXG4gIHNob3duOiB7XG4gICAgLi4uZGlzcGxheVN0eWxlcy5kaXNwbGF5LFxuICAgICd+IGRpdic6IGRpc3BsYXlTdHlsZXMuZGlzcGxheSxcbiAgfSxcbn1cblxuY29uc3QgY29udHJvbHNTdHlsZSA9IHtcbiAgcG9zaXRpb246ICdhYnNvbHV0ZScsXG4gIHpJbmRleDogJzInLFxuICBkaXNwbGF5OiAnZmxleCcsXG4gIGFsaWduSXRlbXM6ICdjZW50ZXInLFxuICAnPiBidXR0b24nOiB7XG4gICAgbWFyZ2luOiAnMWVtJyxcbiAgICB3aWR0aDogJzEuNzVlbScsXG4gICAgaGVpZ2h0OiAnMS43NWVtJyxcbiAgICAnJjpkaXNhYmxlZCc6IHtcbiAgICAgIG9wYWNpdHk6IDAuMyxcbiAgICB9LFxuICAgICcmLnBsYXktYnV0dG9uJzoge1xuICAgICAgd2lkdGg6ICczZW0nLFxuICAgICAgaGVpZ2h0OiAnM2VtJyxcbiAgICB9LFxuICB9LFxufVxuXG5jb25zdCB0ZXh0RWxsaXBzaXMgPSB7XG4gIG92ZXJmbG93OiAnaGlkZGVuJyxcbiAgd2hpdGVTcGFjZTogJ25vd3JhcCcsXG4gIHRleHRPdmVyZmxvdzogJ2VsbGlwc2lzJyxcbn1cblxuY29uc3QgaW5mb1N0eWxlID0ge1xuICBhbGlnbkl0ZW1zOiAnZmxleC1zdGFydCcsXG4gIG92ZXJmbG93OiAndmlzaWJsZScsXG4gIGgxOiB7XG4gICAgaGVpZ2h0OiAnM2VtJyxcbiAgICBmb250V2VpZ2h0OiAnNTAwJyxcbiAgICAuLi50ZXh0RWxsaXBzaXMsXG4gICAgJz4gZGl2JzogdGV4dEVsbGlwc2lzLFxuICB9LFxufVxuXG5jb25zdCBiYWNrU3R5bGUgPSB7XG4gIHBvc2l0aW9uOiAnYWJzb2x1dGUnLFxuICB6SW5kZXg6ICctMScsXG4gIHdpZHRoOiAnMTAwJScsXG4gIGhlaWdodDogJzEwMCUnLFxuICBkaXNwbGF5OiAnZmxleCcsXG4gIGFsaWduSXRlbXM6ICdjZW50ZXInLFxuICBqdXN0aWZ5Q29udGVudDogJ2NlbnRlcicsXG59XG5cbmNvbnN0IHNraXBTdHlsZSA9IHtcbiAgcG9zaXRpb246ICdhYnNvbHV0ZScsXG4gIHJpZ2h0OiAwLFxuICBib3R0b206ICc5cmVtJyxcbiAgdGV4dEFsaWduOiAncmlnaHQnLFxuICBidXR0b246IHtcbiAgICB3aWR0aDogJ2F1dG8nLFxuICAgIGhlaWdodDogJ2F1dG8nLFxuICB9LFxufVxuXG5jb25zdCBkZWtzdG9wU3R5bGUgPSB7XG4gICc+IGRpdic6IHtcbiAgICAnPiBidXR0b246bm90KDpkaXNhYmxlZCkgfiBidXR0b246bm90KDpkaXNhYmxlZCksIGJ1dHRvbjpsYXN0LW9mLXR5cGUnOiB7XG4gICAgICBtYXJnaW5MZWZ0OiAnMC43NWVtJyxcbiAgICB9LFxuICAgICc+IGJ1dHRvbjpub3QoOmxhc3Qtb2YtdHlwZSksID4gYnV0dG9uOmZpcnN0LW9mLXR5cGUsID4gYnV0dG9uIH4gZGl2Jzoge1xuICAgICAgbWFyZ2luUmlnaHQ6ICcwLjc1ZW0nLFxuICAgIH0sXG4gICAgJz4gYnV0dG9uOmZpcnN0LW9mLXR5cGUnOiB7XG4gICAgICBtYXJnaW5MZWZ0OiAnMCcsXG4gICAgfSxcbiAgfSxcbn1cblxuY29uc3QgZGVza3RvcENvbnRyb2xzID0ge1xuICBmbGV4V3JhcDogJ3dyYXAnLFxuICAnPiBkaXY6Zmlyc3Qtb2YtdHlwZSc6IHtcbiAgICBmbGV4OiAnMTAwJScsXG4gICAgbWFyZ2luQm90dG9tOiAnMC44OGVtJyxcbiAgfSxcbiAgJ2J1dHRvbltkaXNhYmxlZF0nOiB7XG4gICAgZGlzcGxheTogJ25vbmUnLFxuICB9LFxufVxuXG5jb25zdCBDb250cm9sc0Jsb2NrID0gKHtcbiAgb3JkZXIgPSAnbW9iaWxlJyxcbiAgcGxheUJ1dHRvbixcbiAgcmV3aW5kQnV0dG9uID0gJycsXG4gIGZvcndhcmRCdXR0b24gPSAnJyxcbiAgcHJldmlvdXNFcGlzb2RlQnV0dG9uID0gJycsXG4gIG5leHRFcGlzb2RlQnV0dG9uID0gJycsXG59KSA9PlxuICBvcmRlciA9PT0gJ2Rlc2t0b3AnID8gKFxuICAgIDw+XG4gICAgICB7cHJldmlvdXNFcGlzb2RlQnV0dG9ufVxuICAgICAge3BsYXlCdXR0b259XG4gICAgICB7bmV4dEVwaXNvZGVCdXR0b259XG4gICAgICB7cmV3aW5kQnV0dG9ufVxuICAgICAge2ZvcndhcmRCdXR0b259XG4gICAgPC8+XG4gICkgOiAoXG4gICAgPD5cbiAgICAgIHtyZXdpbmRCdXR0b259XG4gICAgICB7cHJldmlvdXNFcGlzb2RlQnV0dG9ufVxuICAgICAge3BsYXlCdXR0b259XG4gICAgICB7bmV4dEVwaXNvZGVCdXR0b259XG4gICAgICB7Zm9yd2FyZEJ1dHRvbn1cbiAgICA8Lz5cbiAgKVxuXG5jb25zdCBEZWZhdWx0TGF5b3V0ID0gKHtcbiAgdHlwZSA9ICdtb2JpbGUnLFxuICBzdHlsZSxcbiAgZGlzcGxheSxcbiAgY29udHJvbHNEaXNwbGF5ID0gZGlzcGxheSxcbiAgc2l6ZSxcbiAgdGl0bGUgPSAnJyxcbiAgY2hhbm5lbFRpdGxlID0gJycsXG4gIHZpZGVvLFxuICBoYXZlQm90dG9tSXRlbSxcbiAgc2Vla2JhciA9ICcnLFxuICBjb250cm9sQnV0dG9ucyxcbiAgdm9sdW1lQ29udHJvbCxcbiAgZnVuY3Rpb25CdXR0b25zLFxuICBmdWxsc2NyZWVuQnV0dG9uLFxuICBiYWNrQnV0dG9uLFxuICBhZFN0YXR1cyA9ICcnLFxuICBhZExpbmsgPSAnJyxcbiAgYWRTa2lwQnV0dG9uLFxuICBiYWNrSXRlbXMsXG4gIGNoaWxkcmVuLFxuICBjb250YWluZXJSZWYsXG4gIGJhY2tSZWYsXG4gIC4uLnJlc3Rcbn0pID0+IChcbiAgPGRpdlxuICAgIGNzcz17W1xuICAgICAgY29udGFpbmVyU3R5bGUsXG4gICAgICByZXNwb25zaXZlU3R5bGVzW3NpemVdLFxuICAgICAgdHlwZSA9PT0gJ2Rlc2t0b3AnICYmIGRla3N0b3BTdHlsZSxcbiAgICBdfVxuICAgIHN0eWxlPXtzdHlsZX1cbiAgICByZWY9e2NvbnRhaW5lclJlZn1cbiAgICB7Li4ucmVzdH1cbiAgPlxuICAgIHt2aWRlb31cbiAgICA8ZGl2XG4gICAgICByZWY9e2JhY2tSZWZ9XG4gICAgICBjc3M9e1tcbiAgICAgICAgYmFja1N0eWxlLFxuICAgICAgICBkaXNwbGF5ICE9PSAnaGlkZGVuJyAmJiAoaGF2ZUJvdHRvbUl0ZW0gPyBkcm9wVG9wIDogZHJvcCksXG4gICAgICBdfVxuICAgID5cbiAgICAgIHt0eXBlID09PSAnbW9iaWxlJyA/IChcbiAgICAgICAgPGRpdiBjc3M9e1tjb250cm9sc1N0eWxlLCBkaXNwbGF5U3R5bGVzW2NvbnRyb2xzRGlzcGxheV1dfT5cbiAgICAgICAgICA8Q29udHJvbHNCbG9jayBvcmRlcj1cIm1vYmlsZVwiIHsuLi5jb250cm9sQnV0dG9uc30gLz5cbiAgICAgICAgPC9kaXY+XG4gICAgICApIDogKFxuICAgICAgICBiYWNrSXRlbXNcbiAgICAgICl9XG4gICAgICB7YWRTa2lwQnV0dG9uICYmIDxkaXYgY3NzPXtza2lwU3R5bGV9PnthZFNraXBCdXR0b259PC9kaXY+fVxuICAgIDwvZGl2PlxuICAgIDxkaXYgY3NzPXtbcm93U3R5bGUsIGluZm9TdHlsZSwgZGlzcGxheVN0eWxlc1tkaXNwbGF5XV19PlxuICAgICAge2JhY2tCdXR0b259XG4gICAgICA8aDE+XG4gICAgICAgIHt0aXRsZX1cbiAgICAgICAge2NoYW5uZWxUaXRsZSAmJiA8ZGl2IGNzcz17e2ZvbnRTaXplOiAnMTZweCd9fT57Y2hhbm5lbFRpdGxlfTwvZGl2Pn1cbiAgICAgIDwvaDE+XG4gICAgICA8ZGl2IGNzcz17ZXhwYW5kfSAvPlxuICAgICAge3R5cGUgPT09ICdtb2JpbGUnICYmIGZ1bmN0aW9uQnV0dG9uc31cbiAgICAgIHthZExpbmsgJiYgPGRpdiBjbGFzc05hbWU9XCJwaW5uZWRcIj57YWRMaW5rfTwvZGl2Pn1cbiAgICA8L2Rpdj5cbiAgICA8ZGl2XG4gICAgICBjc3M9e1tcbiAgICAgICAgcm93U3R5bGUsXG4gICAgICAgIHttYXJnaW5Ub3A6ICdhdXRvJ30sXG4gICAgICAgIHR5cGUgPT09ICdkZXNrdG9wJyAmJiBkZXNrdG9wQ29udHJvbHMsXG4gICAgICAgIGNvbnRyb2xzRGlzcGxheVN0eWxlc1tjb250cm9sc0Rpc3BsYXldLFxuICAgICAgXX1cbiAgICA+XG4gICAgICB7c2Vla2JhciB8fCA8ZGl2IC8+fVxuICAgICAge3R5cGUgPT09ICdkZXNrdG9wJyAmJiAoXG4gICAgICAgIDxDb250cm9sc0Jsb2NrIG9yZGVyPVwiZGVza3RvcFwiIHsuLi5jb250cm9sQnV0dG9uc30gLz5cbiAgICAgICl9XG4gICAgICB7YWRTdGF0dXMgJiYgKFxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInBpbm5lZFwiIGNzcz17e2ZsZXg6IDEsIHRleHRTaGFkb3c6ICcycHggMnB4IDFweCAjMDAwJ319PlxuICAgICAgICAgIHthZFN0YXR1c31cbiAgICAgICAgPC9kaXY+XG4gICAgICApfVxuICAgICAge3R5cGUgPT09ICdkZXNrdG9wJyAmJiAoXG4gICAgICAgIDw+XG4gICAgICAgICAgPGRpdiBjc3M9e2V4cGFuZH0gLz5cbiAgICAgICAgICB7dm9sdW1lQ29udHJvbH1cbiAgICAgICAgICB7ZnVuY3Rpb25CdXR0b25zfVxuICAgICAgICA8Lz5cbiAgICAgICl9XG4gICAgICB7ZnVsbHNjcmVlbkJ1dHRvbn1cbiAgICA8L2Rpdj5cbiAgICB7Y2hpbGRyZW59XG4gIDwvZGl2PlxuKVxuXG5leHBvcnQgZGVmYXVsdCBEZWZhdWx0TGF5b3V0XG4iXX0= */',
        ],
        children: [
          type === 'mobile'
            ? jsx$1('div', {
                css: [
                  controlsStyle,
                  displayStyles[controlsDisplay],
                  process.env.NODE_ENV === 'production'
                    ? ''
                    : ';label:DefaultLayout;',
                  process.env.NODE_ENV === 'production'
                    ? ''
                    : '/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkRlZmF1bHRMYXlvdXQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBOFBhIiwiZmlsZSI6IkRlZmF1bHRMYXlvdXQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBAanN4SW1wb3J0U291cmNlIEBlbW90aW9uL3JlYWN0ICovXG4vKiBlc2xpbnQtZGlzYWJsZSByZWFjdC9wcm9wLXR5cGVzICovXG5jb25zdCBleHBhbmQgPSB7XG4gIG1hcmdpbjogMCxcbiAgZmxleDogJzEnLFxufVxuXG5jb25zdCBjb250YWluZXJTdHlsZSA9IHtcbiAgd2lkdGg6ICcxMDAlJyxcbiAgaGVpZ2h0OiAnMTAwJScsXG4gIGJveFNpemluZzogJ2JvcmRlci1ib3gnLFxuICBkaXNwbGF5OiAnZmxleCcsXG4gIGZsZXhEaXJlY3Rpb246ICdjb2x1bW4nLFxuICBvdmVyZmxvdzogJ2hpZGRlbicsXG4gIGNvbG9yOiAnd2hpdGUnLFxuICAvLyBwcmV2ZW50IGFuaW1hdGlvbiBnbGljaChhZnRlcmltYWdlKSBvZiBkZXNjZW5kYW50IGVsZW1lbnRzXG4gIHRyYW5zZm9ybTogJ3RyYW5zbGF0ZVgoMCknLFxuICB1c2VyU2VsZWN0OiAnbm9uZScsXG4gIGgxOiB7XG4gICAgbWFyZ2luOiAwLFxuICAgIGZvbnRTaXplOiAnMWVtJyxcbiAgICBsaW5lSGVpZ2h0OiAnMS41ZW0nLFxuICB9LFxuICAnYSwgYTpsaW5rLCBhOnZpc2l0ZWQnOiB7XG4gICAgY29sb3I6ICcjZmZmJyxcbiAgICBvcGFjaXR5OiAwLjgsXG4gICAgdGV4dERlY29yYXRpb246ICdub25lJyxcbiAgfSxcbiAgYnV0dG9uOiB7XG4gICAgZm9udFNpemU6ICdpbmhlcml0JyxcbiAgfSxcbn1cblxuY29uc3QgZHJvcCA9IHtcbiAgYmFja2dyb3VuZEltYWdlOiBgbGluZWFyLWdyYWRpZW50KFxuICAgIDBkZWcsXG4gICAgcmdiYSgwLDAsMCwwLjUpIDAsXG4gICAgcmdiYSgwLDAsMCwwKSA4cmVtIGNhbGMoMTAwJSAtIDhyZW0pLFxuICAgIHJnYmEoMCwwLDAsMC41KSAxMDAlXG4gIClgLFxufVxuXG5jb25zdCBkcm9wVG9wID0ge1xuICBiYWNrZ3JvdW5kSW1hZ2U6IGBsaW5lYXItZ3JhZGllbnQoXG4gICAgMGRlZyxcbiAgICByZ2JhKDAsMCwwLDApIDAsXG4gICAgcmdiYSgwLDAsMCwwKSA4cmVtIGNhbGMoMTAwJSAtIDhyZW0pLFxuICAgIHJnYmEoMCwwLDAsMC41KSAxMDAlXG4gIClgLFxufVxuXG5jb25zdCByZXNwb25zaXZlU3R5bGVzID0ge1xuICBkZXNrdG9wOiB7XG4gICAgZm9udFNpemU6ICcyNHB4JyxcbiAgfSwgLy8gYWRkIGlmIG5lY2Vzc2FyeTogYmlnLWRlc2t0b3Bcbn1cblxuY29uc3Qgcm93U3R5bGUgPSB7XG4gIGJveFNpemluZzogJ2JvcmRlci1ib3gnLFxuICB3aWR0aDogJzEwMCUnLFxuICBwYWRkaW5nOiAnY2FsYygyZW0gLSAxNnB4KScsXG4gIGRpc3BsYXk6ICdmbGV4JyxcbiAgYWxpZ25JdGVtczogJ2NlbnRlcicsXG4gIGJ1dHRvbjoge1xuICAgIGZsZXg6ICcwIDAgMS41ZW0nLFxuICAgIHdpZHRoOiAnMS41ZW0nLFxuICAgIGhlaWdodDogJzEuNWVtJyxcbiAgfSxcbiAgJz4gYnV0dG9uOm5vdCg6ZGlzYWJsZWQpIH4gYnV0dG9uOm5vdCg6ZGlzYWJsZWQpLCBkaXYgfiBidXR0b246bGFzdC1vZi10eXBlJzoge1xuICAgIG1hcmdpbkxlZnQ6ICcwLjVyZW0nLFxuICB9LFxuICAnPiBidXR0b246bm90KDpsYXN0LW9mLXR5cGUpJzoge1xuICAgIG1hcmdpblJpZ2h0OiAnMC41cmVtJyxcbiAgfSxcbn1cblxuY29uc3QgZGlzcGxheVN0eWxlcyA9IHtcbiAgaGlkZGVuOiB7XG4gICAgJz4gZGl2Om5vdCgucGlubmVkKSwgPiBidXR0b246bm90KC5waW5uZWQpLCA+IGgxOm5vdCgucGlubmVkKSc6IHtcbiAgICAgIG9wYWNpdHk6IDAsXG4gICAgICB0cmFuc2Zvcm06ICd0cmFuc2xhdGUoLTEwMHZ3KScsXG4gICAgICB0cmFuc2l0aW9uOiAnb3BhY2l0eSAwLjVzIGVhc2Utb3V0LCB0cmFuc2Zvcm0gMHMgMC41cycsXG4gICAgfSxcbiAgfSxcbiAgc2hvd246IHtcbiAgICAnPiBkaXY6bm90KC5waW5uZWQpLCA+IGJ1dHRvbjpub3QoLnBpbm5lZCksID4gaDE6bm90KC5waW5uZWQpJzoge1xuICAgICAgdHJhbnNpdGlvbjogJ29wYWNpdHkgMC41cyBlYXNlLW91dCcsXG4gICAgfSxcbiAgfSxcbn1cblxuY29uc3QgY29udHJvbHNEaXNwbGF5U3R5bGVzID0ge1xuICBoaWRkZW46IHtcbiAgICAuLi5kaXNwbGF5U3R5bGVzLmhpZGRlbixcbiAgICAnfiBkaXY6bm90KC5waW5uZWQpJzogZGlzcGxheVN0eWxlcy5oaWRkZW4sXG4gIH0sXG4gIHNob3duOiB7XG4gICAgLi4uZGlzcGxheVN0eWxlcy5kaXNwbGF5LFxuICAgICd+IGRpdic6IGRpc3BsYXlTdHlsZXMuZGlzcGxheSxcbiAgfSxcbn1cblxuY29uc3QgY29udHJvbHNTdHlsZSA9IHtcbiAgcG9zaXRpb246ICdhYnNvbHV0ZScsXG4gIHpJbmRleDogJzInLFxuICBkaXNwbGF5OiAnZmxleCcsXG4gIGFsaWduSXRlbXM6ICdjZW50ZXInLFxuICAnPiBidXR0b24nOiB7XG4gICAgbWFyZ2luOiAnMWVtJyxcbiAgICB3aWR0aDogJzEuNzVlbScsXG4gICAgaGVpZ2h0OiAnMS43NWVtJyxcbiAgICAnJjpkaXNhYmxlZCc6IHtcbiAgICAgIG9wYWNpdHk6IDAuMyxcbiAgICB9LFxuICAgICcmLnBsYXktYnV0dG9uJzoge1xuICAgICAgd2lkdGg6ICczZW0nLFxuICAgICAgaGVpZ2h0OiAnM2VtJyxcbiAgICB9LFxuICB9LFxufVxuXG5jb25zdCB0ZXh0RWxsaXBzaXMgPSB7XG4gIG92ZXJmbG93OiAnaGlkZGVuJyxcbiAgd2hpdGVTcGFjZTogJ25vd3JhcCcsXG4gIHRleHRPdmVyZmxvdzogJ2VsbGlwc2lzJyxcbn1cblxuY29uc3QgaW5mb1N0eWxlID0ge1xuICBhbGlnbkl0ZW1zOiAnZmxleC1zdGFydCcsXG4gIG92ZXJmbG93OiAndmlzaWJsZScsXG4gIGgxOiB7XG4gICAgaGVpZ2h0OiAnM2VtJyxcbiAgICBmb250V2VpZ2h0OiAnNTAwJyxcbiAgICAuLi50ZXh0RWxsaXBzaXMsXG4gICAgJz4gZGl2JzogdGV4dEVsbGlwc2lzLFxuICB9LFxufVxuXG5jb25zdCBiYWNrU3R5bGUgPSB7XG4gIHBvc2l0aW9uOiAnYWJzb2x1dGUnLFxuICB6SW5kZXg6ICctMScsXG4gIHdpZHRoOiAnMTAwJScsXG4gIGhlaWdodDogJzEwMCUnLFxuICBkaXNwbGF5OiAnZmxleCcsXG4gIGFsaWduSXRlbXM6ICdjZW50ZXInLFxuICBqdXN0aWZ5Q29udGVudDogJ2NlbnRlcicsXG59XG5cbmNvbnN0IHNraXBTdHlsZSA9IHtcbiAgcG9zaXRpb246ICdhYnNvbHV0ZScsXG4gIHJpZ2h0OiAwLFxuICBib3R0b206ICc5cmVtJyxcbiAgdGV4dEFsaWduOiAncmlnaHQnLFxuICBidXR0b246IHtcbiAgICB3aWR0aDogJ2F1dG8nLFxuICAgIGhlaWdodDogJ2F1dG8nLFxuICB9LFxufVxuXG5jb25zdCBkZWtzdG9wU3R5bGUgPSB7XG4gICc+IGRpdic6IHtcbiAgICAnPiBidXR0b246bm90KDpkaXNhYmxlZCkgfiBidXR0b246bm90KDpkaXNhYmxlZCksIGJ1dHRvbjpsYXN0LW9mLXR5cGUnOiB7XG4gICAgICBtYXJnaW5MZWZ0OiAnMC43NWVtJyxcbiAgICB9LFxuICAgICc+IGJ1dHRvbjpub3QoOmxhc3Qtb2YtdHlwZSksID4gYnV0dG9uOmZpcnN0LW9mLXR5cGUsID4gYnV0dG9uIH4gZGl2Jzoge1xuICAgICAgbWFyZ2luUmlnaHQ6ICcwLjc1ZW0nLFxuICAgIH0sXG4gICAgJz4gYnV0dG9uOmZpcnN0LW9mLXR5cGUnOiB7XG4gICAgICBtYXJnaW5MZWZ0OiAnMCcsXG4gICAgfSxcbiAgfSxcbn1cblxuY29uc3QgZGVza3RvcENvbnRyb2xzID0ge1xuICBmbGV4V3JhcDogJ3dyYXAnLFxuICAnPiBkaXY6Zmlyc3Qtb2YtdHlwZSc6IHtcbiAgICBmbGV4OiAnMTAwJScsXG4gICAgbWFyZ2luQm90dG9tOiAnMC44OGVtJyxcbiAgfSxcbiAgJ2J1dHRvbltkaXNhYmxlZF0nOiB7XG4gICAgZGlzcGxheTogJ25vbmUnLFxuICB9LFxufVxuXG5jb25zdCBDb250cm9sc0Jsb2NrID0gKHtcbiAgb3JkZXIgPSAnbW9iaWxlJyxcbiAgcGxheUJ1dHRvbixcbiAgcmV3aW5kQnV0dG9uID0gJycsXG4gIGZvcndhcmRCdXR0b24gPSAnJyxcbiAgcHJldmlvdXNFcGlzb2RlQnV0dG9uID0gJycsXG4gIG5leHRFcGlzb2RlQnV0dG9uID0gJycsXG59KSA9PlxuICBvcmRlciA9PT0gJ2Rlc2t0b3AnID8gKFxuICAgIDw+XG4gICAgICB7cHJldmlvdXNFcGlzb2RlQnV0dG9ufVxuICAgICAge3BsYXlCdXR0b259XG4gICAgICB7bmV4dEVwaXNvZGVCdXR0b259XG4gICAgICB7cmV3aW5kQnV0dG9ufVxuICAgICAge2ZvcndhcmRCdXR0b259XG4gICAgPC8+XG4gICkgOiAoXG4gICAgPD5cbiAgICAgIHtyZXdpbmRCdXR0b259XG4gICAgICB7cHJldmlvdXNFcGlzb2RlQnV0dG9ufVxuICAgICAge3BsYXlCdXR0b259XG4gICAgICB7bmV4dEVwaXNvZGVCdXR0b259XG4gICAgICB7Zm9yd2FyZEJ1dHRvbn1cbiAgICA8Lz5cbiAgKVxuXG5jb25zdCBEZWZhdWx0TGF5b3V0ID0gKHtcbiAgdHlwZSA9ICdtb2JpbGUnLFxuICBzdHlsZSxcbiAgZGlzcGxheSxcbiAgY29udHJvbHNEaXNwbGF5ID0gZGlzcGxheSxcbiAgc2l6ZSxcbiAgdGl0bGUgPSAnJyxcbiAgY2hhbm5lbFRpdGxlID0gJycsXG4gIHZpZGVvLFxuICBoYXZlQm90dG9tSXRlbSxcbiAgc2Vla2JhciA9ICcnLFxuICBjb250cm9sQnV0dG9ucyxcbiAgdm9sdW1lQ29udHJvbCxcbiAgZnVuY3Rpb25CdXR0b25zLFxuICBmdWxsc2NyZWVuQnV0dG9uLFxuICBiYWNrQnV0dG9uLFxuICBhZFN0YXR1cyA9ICcnLFxuICBhZExpbmsgPSAnJyxcbiAgYWRTa2lwQnV0dG9uLFxuICBiYWNrSXRlbXMsXG4gIGNoaWxkcmVuLFxuICBjb250YWluZXJSZWYsXG4gIGJhY2tSZWYsXG4gIC4uLnJlc3Rcbn0pID0+IChcbiAgPGRpdlxuICAgIGNzcz17W1xuICAgICAgY29udGFpbmVyU3R5bGUsXG4gICAgICByZXNwb25zaXZlU3R5bGVzW3NpemVdLFxuICAgICAgdHlwZSA9PT0gJ2Rlc2t0b3AnICYmIGRla3N0b3BTdHlsZSxcbiAgICBdfVxuICAgIHN0eWxlPXtzdHlsZX1cbiAgICByZWY9e2NvbnRhaW5lclJlZn1cbiAgICB7Li4ucmVzdH1cbiAgPlxuICAgIHt2aWRlb31cbiAgICA8ZGl2XG4gICAgICByZWY9e2JhY2tSZWZ9XG4gICAgICBjc3M9e1tcbiAgICAgICAgYmFja1N0eWxlLFxuICAgICAgICBkaXNwbGF5ICE9PSAnaGlkZGVuJyAmJiAoaGF2ZUJvdHRvbUl0ZW0gPyBkcm9wVG9wIDogZHJvcCksXG4gICAgICBdfVxuICAgID5cbiAgICAgIHt0eXBlID09PSAnbW9iaWxlJyA/IChcbiAgICAgICAgPGRpdiBjc3M9e1tjb250cm9sc1N0eWxlLCBkaXNwbGF5U3R5bGVzW2NvbnRyb2xzRGlzcGxheV1dfT5cbiAgICAgICAgICA8Q29udHJvbHNCbG9jayBvcmRlcj1cIm1vYmlsZVwiIHsuLi5jb250cm9sQnV0dG9uc30gLz5cbiAgICAgICAgPC9kaXY+XG4gICAgICApIDogKFxuICAgICAgICBiYWNrSXRlbXNcbiAgICAgICl9XG4gICAgICB7YWRTa2lwQnV0dG9uICYmIDxkaXYgY3NzPXtza2lwU3R5bGV9PnthZFNraXBCdXR0b259PC9kaXY+fVxuICAgIDwvZGl2PlxuICAgIDxkaXYgY3NzPXtbcm93U3R5bGUsIGluZm9TdHlsZSwgZGlzcGxheVN0eWxlc1tkaXNwbGF5XV19PlxuICAgICAge2JhY2tCdXR0b259XG4gICAgICA8aDE+XG4gICAgICAgIHt0aXRsZX1cbiAgICAgICAge2NoYW5uZWxUaXRsZSAmJiA8ZGl2IGNzcz17e2ZvbnRTaXplOiAnMTZweCd9fT57Y2hhbm5lbFRpdGxlfTwvZGl2Pn1cbiAgICAgIDwvaDE+XG4gICAgICA8ZGl2IGNzcz17ZXhwYW5kfSAvPlxuICAgICAge3R5cGUgPT09ICdtb2JpbGUnICYmIGZ1bmN0aW9uQnV0dG9uc31cbiAgICAgIHthZExpbmsgJiYgPGRpdiBjbGFzc05hbWU9XCJwaW5uZWRcIj57YWRMaW5rfTwvZGl2Pn1cbiAgICA8L2Rpdj5cbiAgICA8ZGl2XG4gICAgICBjc3M9e1tcbiAgICAgICAgcm93U3R5bGUsXG4gICAgICAgIHttYXJnaW5Ub3A6ICdhdXRvJ30sXG4gICAgICAgIHR5cGUgPT09ICdkZXNrdG9wJyAmJiBkZXNrdG9wQ29udHJvbHMsXG4gICAgICAgIGNvbnRyb2xzRGlzcGxheVN0eWxlc1tjb250cm9sc0Rpc3BsYXldLFxuICAgICAgXX1cbiAgICA+XG4gICAgICB7c2Vla2JhciB8fCA8ZGl2IC8+fVxuICAgICAge3R5cGUgPT09ICdkZXNrdG9wJyAmJiAoXG4gICAgICAgIDxDb250cm9sc0Jsb2NrIG9yZGVyPVwiZGVza3RvcFwiIHsuLi5jb250cm9sQnV0dG9uc30gLz5cbiAgICAgICl9XG4gICAgICB7YWRTdGF0dXMgJiYgKFxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInBpbm5lZFwiIGNzcz17e2ZsZXg6IDEsIHRleHRTaGFkb3c6ICcycHggMnB4IDFweCAjMDAwJ319PlxuICAgICAgICAgIHthZFN0YXR1c31cbiAgICAgICAgPC9kaXY+XG4gICAgICApfVxuICAgICAge3R5cGUgPT09ICdkZXNrdG9wJyAmJiAoXG4gICAgICAgIDw+XG4gICAgICAgICAgPGRpdiBjc3M9e2V4cGFuZH0gLz5cbiAgICAgICAgICB7dm9sdW1lQ29udHJvbH1cbiAgICAgICAgICB7ZnVuY3Rpb25CdXR0b25zfVxuICAgICAgICA8Lz5cbiAgICAgICl9XG4gICAgICB7ZnVsbHNjcmVlbkJ1dHRvbn1cbiAgICA8L2Rpdj5cbiAgICB7Y2hpbGRyZW59XG4gIDwvZGl2PlxuKVxuXG5leHBvcnQgZGVmYXVsdCBEZWZhdWx0TGF5b3V0XG4iXX0= */',
                ],
                children: jsx$1(ControlsBlock, {
                  order: 'mobile',
                  ...controlButtons,
                }),
              })
            : backItems,
          adSkipButton &&
            jsx$1('div', {
              css: skipStyle,
              children: adSkipButton,
            }),
        ],
      }),
      jsxs('div', {
        css: [
          rowStyle,
          infoStyle,
          displayStyles[display],
          process.env.NODE_ENV === 'production' ? '' : ';label:DefaultLayout;',
          process.env.NODE_ENV === 'production'
            ? ''
            : '/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkRlZmF1bHRMYXlvdXQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBc1FTIiwiZmlsZSI6IkRlZmF1bHRMYXlvdXQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBAanN4SW1wb3J0U291cmNlIEBlbW90aW9uL3JlYWN0ICovXG4vKiBlc2xpbnQtZGlzYWJsZSByZWFjdC9wcm9wLXR5cGVzICovXG5jb25zdCBleHBhbmQgPSB7XG4gIG1hcmdpbjogMCxcbiAgZmxleDogJzEnLFxufVxuXG5jb25zdCBjb250YWluZXJTdHlsZSA9IHtcbiAgd2lkdGg6ICcxMDAlJyxcbiAgaGVpZ2h0OiAnMTAwJScsXG4gIGJveFNpemluZzogJ2JvcmRlci1ib3gnLFxuICBkaXNwbGF5OiAnZmxleCcsXG4gIGZsZXhEaXJlY3Rpb246ICdjb2x1bW4nLFxuICBvdmVyZmxvdzogJ2hpZGRlbicsXG4gIGNvbG9yOiAnd2hpdGUnLFxuICAvLyBwcmV2ZW50IGFuaW1hdGlvbiBnbGljaChhZnRlcmltYWdlKSBvZiBkZXNjZW5kYW50IGVsZW1lbnRzXG4gIHRyYW5zZm9ybTogJ3RyYW5zbGF0ZVgoMCknLFxuICB1c2VyU2VsZWN0OiAnbm9uZScsXG4gIGgxOiB7XG4gICAgbWFyZ2luOiAwLFxuICAgIGZvbnRTaXplOiAnMWVtJyxcbiAgICBsaW5lSGVpZ2h0OiAnMS41ZW0nLFxuICB9LFxuICAnYSwgYTpsaW5rLCBhOnZpc2l0ZWQnOiB7XG4gICAgY29sb3I6ICcjZmZmJyxcbiAgICBvcGFjaXR5OiAwLjgsXG4gICAgdGV4dERlY29yYXRpb246ICdub25lJyxcbiAgfSxcbiAgYnV0dG9uOiB7XG4gICAgZm9udFNpemU6ICdpbmhlcml0JyxcbiAgfSxcbn1cblxuY29uc3QgZHJvcCA9IHtcbiAgYmFja2dyb3VuZEltYWdlOiBgbGluZWFyLWdyYWRpZW50KFxuICAgIDBkZWcsXG4gICAgcmdiYSgwLDAsMCwwLjUpIDAsXG4gICAgcmdiYSgwLDAsMCwwKSA4cmVtIGNhbGMoMTAwJSAtIDhyZW0pLFxuICAgIHJnYmEoMCwwLDAsMC41KSAxMDAlXG4gIClgLFxufVxuXG5jb25zdCBkcm9wVG9wID0ge1xuICBiYWNrZ3JvdW5kSW1hZ2U6IGBsaW5lYXItZ3JhZGllbnQoXG4gICAgMGRlZyxcbiAgICByZ2JhKDAsMCwwLDApIDAsXG4gICAgcmdiYSgwLDAsMCwwKSA4cmVtIGNhbGMoMTAwJSAtIDhyZW0pLFxuICAgIHJnYmEoMCwwLDAsMC41KSAxMDAlXG4gIClgLFxufVxuXG5jb25zdCByZXNwb25zaXZlU3R5bGVzID0ge1xuICBkZXNrdG9wOiB7XG4gICAgZm9udFNpemU6ICcyNHB4JyxcbiAgfSwgLy8gYWRkIGlmIG5lY2Vzc2FyeTogYmlnLWRlc2t0b3Bcbn1cblxuY29uc3Qgcm93U3R5bGUgPSB7XG4gIGJveFNpemluZzogJ2JvcmRlci1ib3gnLFxuICB3aWR0aDogJzEwMCUnLFxuICBwYWRkaW5nOiAnY2FsYygyZW0gLSAxNnB4KScsXG4gIGRpc3BsYXk6ICdmbGV4JyxcbiAgYWxpZ25JdGVtczogJ2NlbnRlcicsXG4gIGJ1dHRvbjoge1xuICAgIGZsZXg6ICcwIDAgMS41ZW0nLFxuICAgIHdpZHRoOiAnMS41ZW0nLFxuICAgIGhlaWdodDogJzEuNWVtJyxcbiAgfSxcbiAgJz4gYnV0dG9uOm5vdCg6ZGlzYWJsZWQpIH4gYnV0dG9uOm5vdCg6ZGlzYWJsZWQpLCBkaXYgfiBidXR0b246bGFzdC1vZi10eXBlJzoge1xuICAgIG1hcmdpbkxlZnQ6ICcwLjVyZW0nLFxuICB9LFxuICAnPiBidXR0b246bm90KDpsYXN0LW9mLXR5cGUpJzoge1xuICAgIG1hcmdpblJpZ2h0OiAnMC41cmVtJyxcbiAgfSxcbn1cblxuY29uc3QgZGlzcGxheVN0eWxlcyA9IHtcbiAgaGlkZGVuOiB7XG4gICAgJz4gZGl2Om5vdCgucGlubmVkKSwgPiBidXR0b246bm90KC5waW5uZWQpLCA+IGgxOm5vdCgucGlubmVkKSc6IHtcbiAgICAgIG9wYWNpdHk6IDAsXG4gICAgICB0cmFuc2Zvcm06ICd0cmFuc2xhdGUoLTEwMHZ3KScsXG4gICAgICB0cmFuc2l0aW9uOiAnb3BhY2l0eSAwLjVzIGVhc2Utb3V0LCB0cmFuc2Zvcm0gMHMgMC41cycsXG4gICAgfSxcbiAgfSxcbiAgc2hvd246IHtcbiAgICAnPiBkaXY6bm90KC5waW5uZWQpLCA+IGJ1dHRvbjpub3QoLnBpbm5lZCksID4gaDE6bm90KC5waW5uZWQpJzoge1xuICAgICAgdHJhbnNpdGlvbjogJ29wYWNpdHkgMC41cyBlYXNlLW91dCcsXG4gICAgfSxcbiAgfSxcbn1cblxuY29uc3QgY29udHJvbHNEaXNwbGF5U3R5bGVzID0ge1xuICBoaWRkZW46IHtcbiAgICAuLi5kaXNwbGF5U3R5bGVzLmhpZGRlbixcbiAgICAnfiBkaXY6bm90KC5waW5uZWQpJzogZGlzcGxheVN0eWxlcy5oaWRkZW4sXG4gIH0sXG4gIHNob3duOiB7XG4gICAgLi4uZGlzcGxheVN0eWxlcy5kaXNwbGF5LFxuICAgICd+IGRpdic6IGRpc3BsYXlTdHlsZXMuZGlzcGxheSxcbiAgfSxcbn1cblxuY29uc3QgY29udHJvbHNTdHlsZSA9IHtcbiAgcG9zaXRpb246ICdhYnNvbHV0ZScsXG4gIHpJbmRleDogJzInLFxuICBkaXNwbGF5OiAnZmxleCcsXG4gIGFsaWduSXRlbXM6ICdjZW50ZXInLFxuICAnPiBidXR0b24nOiB7XG4gICAgbWFyZ2luOiAnMWVtJyxcbiAgICB3aWR0aDogJzEuNzVlbScsXG4gICAgaGVpZ2h0OiAnMS43NWVtJyxcbiAgICAnJjpkaXNhYmxlZCc6IHtcbiAgICAgIG9wYWNpdHk6IDAuMyxcbiAgICB9LFxuICAgICcmLnBsYXktYnV0dG9uJzoge1xuICAgICAgd2lkdGg6ICczZW0nLFxuICAgICAgaGVpZ2h0OiAnM2VtJyxcbiAgICB9LFxuICB9LFxufVxuXG5jb25zdCB0ZXh0RWxsaXBzaXMgPSB7XG4gIG92ZXJmbG93OiAnaGlkZGVuJyxcbiAgd2hpdGVTcGFjZTogJ25vd3JhcCcsXG4gIHRleHRPdmVyZmxvdzogJ2VsbGlwc2lzJyxcbn1cblxuY29uc3QgaW5mb1N0eWxlID0ge1xuICBhbGlnbkl0ZW1zOiAnZmxleC1zdGFydCcsXG4gIG92ZXJmbG93OiAndmlzaWJsZScsXG4gIGgxOiB7XG4gICAgaGVpZ2h0OiAnM2VtJyxcbiAgICBmb250V2VpZ2h0OiAnNTAwJyxcbiAgICAuLi50ZXh0RWxsaXBzaXMsXG4gICAgJz4gZGl2JzogdGV4dEVsbGlwc2lzLFxuICB9LFxufVxuXG5jb25zdCBiYWNrU3R5bGUgPSB7XG4gIHBvc2l0aW9uOiAnYWJzb2x1dGUnLFxuICB6SW5kZXg6ICctMScsXG4gIHdpZHRoOiAnMTAwJScsXG4gIGhlaWdodDogJzEwMCUnLFxuICBkaXNwbGF5OiAnZmxleCcsXG4gIGFsaWduSXRlbXM6ICdjZW50ZXInLFxuICBqdXN0aWZ5Q29udGVudDogJ2NlbnRlcicsXG59XG5cbmNvbnN0IHNraXBTdHlsZSA9IHtcbiAgcG9zaXRpb246ICdhYnNvbHV0ZScsXG4gIHJpZ2h0OiAwLFxuICBib3R0b206ICc5cmVtJyxcbiAgdGV4dEFsaWduOiAncmlnaHQnLFxuICBidXR0b246IHtcbiAgICB3aWR0aDogJ2F1dG8nLFxuICAgIGhlaWdodDogJ2F1dG8nLFxuICB9LFxufVxuXG5jb25zdCBkZWtzdG9wU3R5bGUgPSB7XG4gICc+IGRpdic6IHtcbiAgICAnPiBidXR0b246bm90KDpkaXNhYmxlZCkgfiBidXR0b246bm90KDpkaXNhYmxlZCksIGJ1dHRvbjpsYXN0LW9mLXR5cGUnOiB7XG4gICAgICBtYXJnaW5MZWZ0OiAnMC43NWVtJyxcbiAgICB9LFxuICAgICc+IGJ1dHRvbjpub3QoOmxhc3Qtb2YtdHlwZSksID4gYnV0dG9uOmZpcnN0LW9mLXR5cGUsID4gYnV0dG9uIH4gZGl2Jzoge1xuICAgICAgbWFyZ2luUmlnaHQ6ICcwLjc1ZW0nLFxuICAgIH0sXG4gICAgJz4gYnV0dG9uOmZpcnN0LW9mLXR5cGUnOiB7XG4gICAgICBtYXJnaW5MZWZ0OiAnMCcsXG4gICAgfSxcbiAgfSxcbn1cblxuY29uc3QgZGVza3RvcENvbnRyb2xzID0ge1xuICBmbGV4V3JhcDogJ3dyYXAnLFxuICAnPiBkaXY6Zmlyc3Qtb2YtdHlwZSc6IHtcbiAgICBmbGV4OiAnMTAwJScsXG4gICAgbWFyZ2luQm90dG9tOiAnMC44OGVtJyxcbiAgfSxcbiAgJ2J1dHRvbltkaXNhYmxlZF0nOiB7XG4gICAgZGlzcGxheTogJ25vbmUnLFxuICB9LFxufVxuXG5jb25zdCBDb250cm9sc0Jsb2NrID0gKHtcbiAgb3JkZXIgPSAnbW9iaWxlJyxcbiAgcGxheUJ1dHRvbixcbiAgcmV3aW5kQnV0dG9uID0gJycsXG4gIGZvcndhcmRCdXR0b24gPSAnJyxcbiAgcHJldmlvdXNFcGlzb2RlQnV0dG9uID0gJycsXG4gIG5leHRFcGlzb2RlQnV0dG9uID0gJycsXG59KSA9PlxuICBvcmRlciA9PT0gJ2Rlc2t0b3AnID8gKFxuICAgIDw+XG4gICAgICB7cHJldmlvdXNFcGlzb2RlQnV0dG9ufVxuICAgICAge3BsYXlCdXR0b259XG4gICAgICB7bmV4dEVwaXNvZGVCdXR0b259XG4gICAgICB7cmV3aW5kQnV0dG9ufVxuICAgICAge2ZvcndhcmRCdXR0b259XG4gICAgPC8+XG4gICkgOiAoXG4gICAgPD5cbiAgICAgIHtyZXdpbmRCdXR0b259XG4gICAgICB7cHJldmlvdXNFcGlzb2RlQnV0dG9ufVxuICAgICAge3BsYXlCdXR0b259XG4gICAgICB7bmV4dEVwaXNvZGVCdXR0b259XG4gICAgICB7Zm9yd2FyZEJ1dHRvbn1cbiAgICA8Lz5cbiAgKVxuXG5jb25zdCBEZWZhdWx0TGF5b3V0ID0gKHtcbiAgdHlwZSA9ICdtb2JpbGUnLFxuICBzdHlsZSxcbiAgZGlzcGxheSxcbiAgY29udHJvbHNEaXNwbGF5ID0gZGlzcGxheSxcbiAgc2l6ZSxcbiAgdGl0bGUgPSAnJyxcbiAgY2hhbm5lbFRpdGxlID0gJycsXG4gIHZpZGVvLFxuICBoYXZlQm90dG9tSXRlbSxcbiAgc2Vla2JhciA9ICcnLFxuICBjb250cm9sQnV0dG9ucyxcbiAgdm9sdW1lQ29udHJvbCxcbiAgZnVuY3Rpb25CdXR0b25zLFxuICBmdWxsc2NyZWVuQnV0dG9uLFxuICBiYWNrQnV0dG9uLFxuICBhZFN0YXR1cyA9ICcnLFxuICBhZExpbmsgPSAnJyxcbiAgYWRTa2lwQnV0dG9uLFxuICBiYWNrSXRlbXMsXG4gIGNoaWxkcmVuLFxuICBjb250YWluZXJSZWYsXG4gIGJhY2tSZWYsXG4gIC4uLnJlc3Rcbn0pID0+IChcbiAgPGRpdlxuICAgIGNzcz17W1xuICAgICAgY29udGFpbmVyU3R5bGUsXG4gICAgICByZXNwb25zaXZlU3R5bGVzW3NpemVdLFxuICAgICAgdHlwZSA9PT0gJ2Rlc2t0b3AnICYmIGRla3N0b3BTdHlsZSxcbiAgICBdfVxuICAgIHN0eWxlPXtzdHlsZX1cbiAgICByZWY9e2NvbnRhaW5lclJlZn1cbiAgICB7Li4ucmVzdH1cbiAgPlxuICAgIHt2aWRlb31cbiAgICA8ZGl2XG4gICAgICByZWY9e2JhY2tSZWZ9XG4gICAgICBjc3M9e1tcbiAgICAgICAgYmFja1N0eWxlLFxuICAgICAgICBkaXNwbGF5ICE9PSAnaGlkZGVuJyAmJiAoaGF2ZUJvdHRvbUl0ZW0gPyBkcm9wVG9wIDogZHJvcCksXG4gICAgICBdfVxuICAgID5cbiAgICAgIHt0eXBlID09PSAnbW9iaWxlJyA/IChcbiAgICAgICAgPGRpdiBjc3M9e1tjb250cm9sc1N0eWxlLCBkaXNwbGF5U3R5bGVzW2NvbnRyb2xzRGlzcGxheV1dfT5cbiAgICAgICAgICA8Q29udHJvbHNCbG9jayBvcmRlcj1cIm1vYmlsZVwiIHsuLi5jb250cm9sQnV0dG9uc30gLz5cbiAgICAgICAgPC9kaXY+XG4gICAgICApIDogKFxuICAgICAgICBiYWNrSXRlbXNcbiAgICAgICl9XG4gICAgICB7YWRTa2lwQnV0dG9uICYmIDxkaXYgY3NzPXtza2lwU3R5bGV9PnthZFNraXBCdXR0b259PC9kaXY+fVxuICAgIDwvZGl2PlxuICAgIDxkaXYgY3NzPXtbcm93U3R5bGUsIGluZm9TdHlsZSwgZGlzcGxheVN0eWxlc1tkaXNwbGF5XV19PlxuICAgICAge2JhY2tCdXR0b259XG4gICAgICA8aDE+XG4gICAgICAgIHt0aXRsZX1cbiAgICAgICAge2NoYW5uZWxUaXRsZSAmJiA8ZGl2IGNzcz17e2ZvbnRTaXplOiAnMTZweCd9fT57Y2hhbm5lbFRpdGxlfTwvZGl2Pn1cbiAgICAgIDwvaDE+XG4gICAgICA8ZGl2IGNzcz17ZXhwYW5kfSAvPlxuICAgICAge3R5cGUgPT09ICdtb2JpbGUnICYmIGZ1bmN0aW9uQnV0dG9uc31cbiAgICAgIHthZExpbmsgJiYgPGRpdiBjbGFzc05hbWU9XCJwaW5uZWRcIj57YWRMaW5rfTwvZGl2Pn1cbiAgICA8L2Rpdj5cbiAgICA8ZGl2XG4gICAgICBjc3M9e1tcbiAgICAgICAgcm93U3R5bGUsXG4gICAgICAgIHttYXJnaW5Ub3A6ICdhdXRvJ30sXG4gICAgICAgIHR5cGUgPT09ICdkZXNrdG9wJyAmJiBkZXNrdG9wQ29udHJvbHMsXG4gICAgICAgIGNvbnRyb2xzRGlzcGxheVN0eWxlc1tjb250cm9sc0Rpc3BsYXldLFxuICAgICAgXX1cbiAgICA+XG4gICAgICB7c2Vla2JhciB8fCA8ZGl2IC8+fVxuICAgICAge3R5cGUgPT09ICdkZXNrdG9wJyAmJiAoXG4gICAgICAgIDxDb250cm9sc0Jsb2NrIG9yZGVyPVwiZGVza3RvcFwiIHsuLi5jb250cm9sQnV0dG9uc30gLz5cbiAgICAgICl9XG4gICAgICB7YWRTdGF0dXMgJiYgKFxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInBpbm5lZFwiIGNzcz17e2ZsZXg6IDEsIHRleHRTaGFkb3c6ICcycHggMnB4IDFweCAjMDAwJ319PlxuICAgICAgICAgIHthZFN0YXR1c31cbiAgICAgICAgPC9kaXY+XG4gICAgICApfVxuICAgICAge3R5cGUgPT09ICdkZXNrdG9wJyAmJiAoXG4gICAgICAgIDw+XG4gICAgICAgICAgPGRpdiBjc3M9e2V4cGFuZH0gLz5cbiAgICAgICAgICB7dm9sdW1lQ29udHJvbH1cbiAgICAgICAgICB7ZnVuY3Rpb25CdXR0b25zfVxuICAgICAgICA8Lz5cbiAgICAgICl9XG4gICAgICB7ZnVsbHNjcmVlbkJ1dHRvbn1cbiAgICA8L2Rpdj5cbiAgICB7Y2hpbGRyZW59XG4gIDwvZGl2PlxuKVxuXG5leHBvcnQgZGVmYXVsdCBEZWZhdWx0TGF5b3V0XG4iXX0= */',
        ],
        children: [
          backButton,
          jsxs('h1', {
            children: [
              title,
              channelTitle &&
                jsx$1('div', {
                  css: _ref$2,
                  children: channelTitle,
                }),
            ],
          }),
          jsx$1('div', {
            css: expand,
          }),
          type === 'mobile' && functionButtons,
          adLink &&
            jsx$1('div', {
              className: 'pinned',
              children: adLink,
            }),
        ],
      }),
      jsxs('div', {
        css: [
          rowStyle,
          'margin-top:auto;',
          type === 'desktop' && desktopControls,
          controlsDisplayStyles[controlsDisplay],
          process.env.NODE_ENV === 'production' ? '' : ';label:DefaultLayout;',
          process.env.NODE_ENV === 'production'
            ? ''
            : '/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkRlZmF1bHRMYXlvdXQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBaVJNIiwiZmlsZSI6IkRlZmF1bHRMYXlvdXQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBAanN4SW1wb3J0U291cmNlIEBlbW90aW9uL3JlYWN0ICovXG4vKiBlc2xpbnQtZGlzYWJsZSByZWFjdC9wcm9wLXR5cGVzICovXG5jb25zdCBleHBhbmQgPSB7XG4gIG1hcmdpbjogMCxcbiAgZmxleDogJzEnLFxufVxuXG5jb25zdCBjb250YWluZXJTdHlsZSA9IHtcbiAgd2lkdGg6ICcxMDAlJyxcbiAgaGVpZ2h0OiAnMTAwJScsXG4gIGJveFNpemluZzogJ2JvcmRlci1ib3gnLFxuICBkaXNwbGF5OiAnZmxleCcsXG4gIGZsZXhEaXJlY3Rpb246ICdjb2x1bW4nLFxuICBvdmVyZmxvdzogJ2hpZGRlbicsXG4gIGNvbG9yOiAnd2hpdGUnLFxuICAvLyBwcmV2ZW50IGFuaW1hdGlvbiBnbGljaChhZnRlcmltYWdlKSBvZiBkZXNjZW5kYW50IGVsZW1lbnRzXG4gIHRyYW5zZm9ybTogJ3RyYW5zbGF0ZVgoMCknLFxuICB1c2VyU2VsZWN0OiAnbm9uZScsXG4gIGgxOiB7XG4gICAgbWFyZ2luOiAwLFxuICAgIGZvbnRTaXplOiAnMWVtJyxcbiAgICBsaW5lSGVpZ2h0OiAnMS41ZW0nLFxuICB9LFxuICAnYSwgYTpsaW5rLCBhOnZpc2l0ZWQnOiB7XG4gICAgY29sb3I6ICcjZmZmJyxcbiAgICBvcGFjaXR5OiAwLjgsXG4gICAgdGV4dERlY29yYXRpb246ICdub25lJyxcbiAgfSxcbiAgYnV0dG9uOiB7XG4gICAgZm9udFNpemU6ICdpbmhlcml0JyxcbiAgfSxcbn1cblxuY29uc3QgZHJvcCA9IHtcbiAgYmFja2dyb3VuZEltYWdlOiBgbGluZWFyLWdyYWRpZW50KFxuICAgIDBkZWcsXG4gICAgcmdiYSgwLDAsMCwwLjUpIDAsXG4gICAgcmdiYSgwLDAsMCwwKSA4cmVtIGNhbGMoMTAwJSAtIDhyZW0pLFxuICAgIHJnYmEoMCwwLDAsMC41KSAxMDAlXG4gIClgLFxufVxuXG5jb25zdCBkcm9wVG9wID0ge1xuICBiYWNrZ3JvdW5kSW1hZ2U6IGBsaW5lYXItZ3JhZGllbnQoXG4gICAgMGRlZyxcbiAgICByZ2JhKDAsMCwwLDApIDAsXG4gICAgcmdiYSgwLDAsMCwwKSA4cmVtIGNhbGMoMTAwJSAtIDhyZW0pLFxuICAgIHJnYmEoMCwwLDAsMC41KSAxMDAlXG4gIClgLFxufVxuXG5jb25zdCByZXNwb25zaXZlU3R5bGVzID0ge1xuICBkZXNrdG9wOiB7XG4gICAgZm9udFNpemU6ICcyNHB4JyxcbiAgfSwgLy8gYWRkIGlmIG5lY2Vzc2FyeTogYmlnLWRlc2t0b3Bcbn1cblxuY29uc3Qgcm93U3R5bGUgPSB7XG4gIGJveFNpemluZzogJ2JvcmRlci1ib3gnLFxuICB3aWR0aDogJzEwMCUnLFxuICBwYWRkaW5nOiAnY2FsYygyZW0gLSAxNnB4KScsXG4gIGRpc3BsYXk6ICdmbGV4JyxcbiAgYWxpZ25JdGVtczogJ2NlbnRlcicsXG4gIGJ1dHRvbjoge1xuICAgIGZsZXg6ICcwIDAgMS41ZW0nLFxuICAgIHdpZHRoOiAnMS41ZW0nLFxuICAgIGhlaWdodDogJzEuNWVtJyxcbiAgfSxcbiAgJz4gYnV0dG9uOm5vdCg6ZGlzYWJsZWQpIH4gYnV0dG9uOm5vdCg6ZGlzYWJsZWQpLCBkaXYgfiBidXR0b246bGFzdC1vZi10eXBlJzoge1xuICAgIG1hcmdpbkxlZnQ6ICcwLjVyZW0nLFxuICB9LFxuICAnPiBidXR0b246bm90KDpsYXN0LW9mLXR5cGUpJzoge1xuICAgIG1hcmdpblJpZ2h0OiAnMC41cmVtJyxcbiAgfSxcbn1cblxuY29uc3QgZGlzcGxheVN0eWxlcyA9IHtcbiAgaGlkZGVuOiB7XG4gICAgJz4gZGl2Om5vdCgucGlubmVkKSwgPiBidXR0b246bm90KC5waW5uZWQpLCA+IGgxOm5vdCgucGlubmVkKSc6IHtcbiAgICAgIG9wYWNpdHk6IDAsXG4gICAgICB0cmFuc2Zvcm06ICd0cmFuc2xhdGUoLTEwMHZ3KScsXG4gICAgICB0cmFuc2l0aW9uOiAnb3BhY2l0eSAwLjVzIGVhc2Utb3V0LCB0cmFuc2Zvcm0gMHMgMC41cycsXG4gICAgfSxcbiAgfSxcbiAgc2hvd246IHtcbiAgICAnPiBkaXY6bm90KC5waW5uZWQpLCA+IGJ1dHRvbjpub3QoLnBpbm5lZCksID4gaDE6bm90KC5waW5uZWQpJzoge1xuICAgICAgdHJhbnNpdGlvbjogJ29wYWNpdHkgMC41cyBlYXNlLW91dCcsXG4gICAgfSxcbiAgfSxcbn1cblxuY29uc3QgY29udHJvbHNEaXNwbGF5U3R5bGVzID0ge1xuICBoaWRkZW46IHtcbiAgICAuLi5kaXNwbGF5U3R5bGVzLmhpZGRlbixcbiAgICAnfiBkaXY6bm90KC5waW5uZWQpJzogZGlzcGxheVN0eWxlcy5oaWRkZW4sXG4gIH0sXG4gIHNob3duOiB7XG4gICAgLi4uZGlzcGxheVN0eWxlcy5kaXNwbGF5LFxuICAgICd+IGRpdic6IGRpc3BsYXlTdHlsZXMuZGlzcGxheSxcbiAgfSxcbn1cblxuY29uc3QgY29udHJvbHNTdHlsZSA9IHtcbiAgcG9zaXRpb246ICdhYnNvbHV0ZScsXG4gIHpJbmRleDogJzInLFxuICBkaXNwbGF5OiAnZmxleCcsXG4gIGFsaWduSXRlbXM6ICdjZW50ZXInLFxuICAnPiBidXR0b24nOiB7XG4gICAgbWFyZ2luOiAnMWVtJyxcbiAgICB3aWR0aDogJzEuNzVlbScsXG4gICAgaGVpZ2h0OiAnMS43NWVtJyxcbiAgICAnJjpkaXNhYmxlZCc6IHtcbiAgICAgIG9wYWNpdHk6IDAuMyxcbiAgICB9LFxuICAgICcmLnBsYXktYnV0dG9uJzoge1xuICAgICAgd2lkdGg6ICczZW0nLFxuICAgICAgaGVpZ2h0OiAnM2VtJyxcbiAgICB9LFxuICB9LFxufVxuXG5jb25zdCB0ZXh0RWxsaXBzaXMgPSB7XG4gIG92ZXJmbG93OiAnaGlkZGVuJyxcbiAgd2hpdGVTcGFjZTogJ25vd3JhcCcsXG4gIHRleHRPdmVyZmxvdzogJ2VsbGlwc2lzJyxcbn1cblxuY29uc3QgaW5mb1N0eWxlID0ge1xuICBhbGlnbkl0ZW1zOiAnZmxleC1zdGFydCcsXG4gIG92ZXJmbG93OiAndmlzaWJsZScsXG4gIGgxOiB7XG4gICAgaGVpZ2h0OiAnM2VtJyxcbiAgICBmb250V2VpZ2h0OiAnNTAwJyxcbiAgICAuLi50ZXh0RWxsaXBzaXMsXG4gICAgJz4gZGl2JzogdGV4dEVsbGlwc2lzLFxuICB9LFxufVxuXG5jb25zdCBiYWNrU3R5bGUgPSB7XG4gIHBvc2l0aW9uOiAnYWJzb2x1dGUnLFxuICB6SW5kZXg6ICctMScsXG4gIHdpZHRoOiAnMTAwJScsXG4gIGhlaWdodDogJzEwMCUnLFxuICBkaXNwbGF5OiAnZmxleCcsXG4gIGFsaWduSXRlbXM6ICdjZW50ZXInLFxuICBqdXN0aWZ5Q29udGVudDogJ2NlbnRlcicsXG59XG5cbmNvbnN0IHNraXBTdHlsZSA9IHtcbiAgcG9zaXRpb246ICdhYnNvbHV0ZScsXG4gIHJpZ2h0OiAwLFxuICBib3R0b206ICc5cmVtJyxcbiAgdGV4dEFsaWduOiAncmlnaHQnLFxuICBidXR0b246IHtcbiAgICB3aWR0aDogJ2F1dG8nLFxuICAgIGhlaWdodDogJ2F1dG8nLFxuICB9LFxufVxuXG5jb25zdCBkZWtzdG9wU3R5bGUgPSB7XG4gICc+IGRpdic6IHtcbiAgICAnPiBidXR0b246bm90KDpkaXNhYmxlZCkgfiBidXR0b246bm90KDpkaXNhYmxlZCksIGJ1dHRvbjpsYXN0LW9mLXR5cGUnOiB7XG4gICAgICBtYXJnaW5MZWZ0OiAnMC43NWVtJyxcbiAgICB9LFxuICAgICc+IGJ1dHRvbjpub3QoOmxhc3Qtb2YtdHlwZSksID4gYnV0dG9uOmZpcnN0LW9mLXR5cGUsID4gYnV0dG9uIH4gZGl2Jzoge1xuICAgICAgbWFyZ2luUmlnaHQ6ICcwLjc1ZW0nLFxuICAgIH0sXG4gICAgJz4gYnV0dG9uOmZpcnN0LW9mLXR5cGUnOiB7XG4gICAgICBtYXJnaW5MZWZ0OiAnMCcsXG4gICAgfSxcbiAgfSxcbn1cblxuY29uc3QgZGVza3RvcENvbnRyb2xzID0ge1xuICBmbGV4V3JhcDogJ3dyYXAnLFxuICAnPiBkaXY6Zmlyc3Qtb2YtdHlwZSc6IHtcbiAgICBmbGV4OiAnMTAwJScsXG4gICAgbWFyZ2luQm90dG9tOiAnMC44OGVtJyxcbiAgfSxcbiAgJ2J1dHRvbltkaXNhYmxlZF0nOiB7XG4gICAgZGlzcGxheTogJ25vbmUnLFxuICB9LFxufVxuXG5jb25zdCBDb250cm9sc0Jsb2NrID0gKHtcbiAgb3JkZXIgPSAnbW9iaWxlJyxcbiAgcGxheUJ1dHRvbixcbiAgcmV3aW5kQnV0dG9uID0gJycsXG4gIGZvcndhcmRCdXR0b24gPSAnJyxcbiAgcHJldmlvdXNFcGlzb2RlQnV0dG9uID0gJycsXG4gIG5leHRFcGlzb2RlQnV0dG9uID0gJycsXG59KSA9PlxuICBvcmRlciA9PT0gJ2Rlc2t0b3AnID8gKFxuICAgIDw+XG4gICAgICB7cHJldmlvdXNFcGlzb2RlQnV0dG9ufVxuICAgICAge3BsYXlCdXR0b259XG4gICAgICB7bmV4dEVwaXNvZGVCdXR0b259XG4gICAgICB7cmV3aW5kQnV0dG9ufVxuICAgICAge2ZvcndhcmRCdXR0b259XG4gICAgPC8+XG4gICkgOiAoXG4gICAgPD5cbiAgICAgIHtyZXdpbmRCdXR0b259XG4gICAgICB7cHJldmlvdXNFcGlzb2RlQnV0dG9ufVxuICAgICAge3BsYXlCdXR0b259XG4gICAgICB7bmV4dEVwaXNvZGVCdXR0b259XG4gICAgICB7Zm9yd2FyZEJ1dHRvbn1cbiAgICA8Lz5cbiAgKVxuXG5jb25zdCBEZWZhdWx0TGF5b3V0ID0gKHtcbiAgdHlwZSA9ICdtb2JpbGUnLFxuICBzdHlsZSxcbiAgZGlzcGxheSxcbiAgY29udHJvbHNEaXNwbGF5ID0gZGlzcGxheSxcbiAgc2l6ZSxcbiAgdGl0bGUgPSAnJyxcbiAgY2hhbm5lbFRpdGxlID0gJycsXG4gIHZpZGVvLFxuICBoYXZlQm90dG9tSXRlbSxcbiAgc2Vla2JhciA9ICcnLFxuICBjb250cm9sQnV0dG9ucyxcbiAgdm9sdW1lQ29udHJvbCxcbiAgZnVuY3Rpb25CdXR0b25zLFxuICBmdWxsc2NyZWVuQnV0dG9uLFxuICBiYWNrQnV0dG9uLFxuICBhZFN0YXR1cyA9ICcnLFxuICBhZExpbmsgPSAnJyxcbiAgYWRTa2lwQnV0dG9uLFxuICBiYWNrSXRlbXMsXG4gIGNoaWxkcmVuLFxuICBjb250YWluZXJSZWYsXG4gIGJhY2tSZWYsXG4gIC4uLnJlc3Rcbn0pID0+IChcbiAgPGRpdlxuICAgIGNzcz17W1xuICAgICAgY29udGFpbmVyU3R5bGUsXG4gICAgICByZXNwb25zaXZlU3R5bGVzW3NpemVdLFxuICAgICAgdHlwZSA9PT0gJ2Rlc2t0b3AnICYmIGRla3N0b3BTdHlsZSxcbiAgICBdfVxuICAgIHN0eWxlPXtzdHlsZX1cbiAgICByZWY9e2NvbnRhaW5lclJlZn1cbiAgICB7Li4ucmVzdH1cbiAgPlxuICAgIHt2aWRlb31cbiAgICA8ZGl2XG4gICAgICByZWY9e2JhY2tSZWZ9XG4gICAgICBjc3M9e1tcbiAgICAgICAgYmFja1N0eWxlLFxuICAgICAgICBkaXNwbGF5ICE9PSAnaGlkZGVuJyAmJiAoaGF2ZUJvdHRvbUl0ZW0gPyBkcm9wVG9wIDogZHJvcCksXG4gICAgICBdfVxuICAgID5cbiAgICAgIHt0eXBlID09PSAnbW9iaWxlJyA/IChcbiAgICAgICAgPGRpdiBjc3M9e1tjb250cm9sc1N0eWxlLCBkaXNwbGF5U3R5bGVzW2NvbnRyb2xzRGlzcGxheV1dfT5cbiAgICAgICAgICA8Q29udHJvbHNCbG9jayBvcmRlcj1cIm1vYmlsZVwiIHsuLi5jb250cm9sQnV0dG9uc30gLz5cbiAgICAgICAgPC9kaXY+XG4gICAgICApIDogKFxuICAgICAgICBiYWNrSXRlbXNcbiAgICAgICl9XG4gICAgICB7YWRTa2lwQnV0dG9uICYmIDxkaXYgY3NzPXtza2lwU3R5bGV9PnthZFNraXBCdXR0b259PC9kaXY+fVxuICAgIDwvZGl2PlxuICAgIDxkaXYgY3NzPXtbcm93U3R5bGUsIGluZm9TdHlsZSwgZGlzcGxheVN0eWxlc1tkaXNwbGF5XV19PlxuICAgICAge2JhY2tCdXR0b259XG4gICAgICA8aDE+XG4gICAgICAgIHt0aXRsZX1cbiAgICAgICAge2NoYW5uZWxUaXRsZSAmJiA8ZGl2IGNzcz17e2ZvbnRTaXplOiAnMTZweCd9fT57Y2hhbm5lbFRpdGxlfTwvZGl2Pn1cbiAgICAgIDwvaDE+XG4gICAgICA8ZGl2IGNzcz17ZXhwYW5kfSAvPlxuICAgICAge3R5cGUgPT09ICdtb2JpbGUnICYmIGZ1bmN0aW9uQnV0dG9uc31cbiAgICAgIHthZExpbmsgJiYgPGRpdiBjbGFzc05hbWU9XCJwaW5uZWRcIj57YWRMaW5rfTwvZGl2Pn1cbiAgICA8L2Rpdj5cbiAgICA8ZGl2XG4gICAgICBjc3M9e1tcbiAgICAgICAgcm93U3R5bGUsXG4gICAgICAgIHttYXJnaW5Ub3A6ICdhdXRvJ30sXG4gICAgICAgIHR5cGUgPT09ICdkZXNrdG9wJyAmJiBkZXNrdG9wQ29udHJvbHMsXG4gICAgICAgIGNvbnRyb2xzRGlzcGxheVN0eWxlc1tjb250cm9sc0Rpc3BsYXldLFxuICAgICAgXX1cbiAgICA+XG4gICAgICB7c2Vla2JhciB8fCA8ZGl2IC8+fVxuICAgICAge3R5cGUgPT09ICdkZXNrdG9wJyAmJiAoXG4gICAgICAgIDxDb250cm9sc0Jsb2NrIG9yZGVyPVwiZGVza3RvcFwiIHsuLi5jb250cm9sQnV0dG9uc30gLz5cbiAgICAgICl9XG4gICAgICB7YWRTdGF0dXMgJiYgKFxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInBpbm5lZFwiIGNzcz17e2ZsZXg6IDEsIHRleHRTaGFkb3c6ICcycHggMnB4IDFweCAjMDAwJ319PlxuICAgICAgICAgIHthZFN0YXR1c31cbiAgICAgICAgPC9kaXY+XG4gICAgICApfVxuICAgICAge3R5cGUgPT09ICdkZXNrdG9wJyAmJiAoXG4gICAgICAgIDw+XG4gICAgICAgICAgPGRpdiBjc3M9e2V4cGFuZH0gLz5cbiAgICAgICAgICB7dm9sdW1lQ29udHJvbH1cbiAgICAgICAgICB7ZnVuY3Rpb25CdXR0b25zfVxuICAgICAgICA8Lz5cbiAgICAgICl9XG4gICAgICB7ZnVsbHNjcmVlbkJ1dHRvbn1cbiAgICA8L2Rpdj5cbiAgICB7Y2hpbGRyZW59XG4gIDwvZGl2PlxuKVxuXG5leHBvcnQgZGVmYXVsdCBEZWZhdWx0TGF5b3V0XG4iXX0= */',
        ],
        children: [
          seekbar || jsx$1('div', {}),
          type === 'desktop' &&
            jsx$1(ControlsBlock, {
              order: 'desktop',
              ...controlButtons,
            }),
          adStatus &&
            jsx$1('div', {
              className: 'pinned',
              css: _ref2,
              children: adStatus,
            }),
          type === 'desktop' &&
            jsxs(Fragment, {
              children: [
                jsx$1('div', {
                  css: expand,
                }),
                volumeControl,
                functionButtons,
              ],
            }),
          fullscreenButton,
        ],
      }),
      children,
    ],
  })

var icon = {
  pause:
    'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0OCIgaGVpZ2h0PSI0OCI+PGRlZnM+PGZpbHRlciBpZD0iYSIgaGVpZ2h0PSIxNTAlIj48ZmVHYXVzc2lhbkJsdXIgaW49IlNvdXJjZUFscGhhIiBzdGREZXZpYXRpb249IjMiLz48ZmVPZmZzZXQgZHg9IjIiIGR5PSIyIiByZXN1bHQ9Im9mZnNldGJsdXIiLz48ZmVDb21wb25lbnRUcmFuc2Zlcj48ZmVGdW5jQSB0eXBlPSJsaW5lYXIiIHNsb3BlPSIuNyIvPjwvZmVDb21wb25lbnRUcmFuc2Zlcj48ZmVNZXJnZT48ZmVNZXJnZU5vZGUvPjxmZU1lcmdlTm9kZSBpbj0iU291cmNlR3JhcGhpYyIvPjwvZmVNZXJnZT48L2ZpbHRlcj48L2RlZnM+PGcgZmlsbD0iI0ZGRiIgZmlsbC1ydWxlPSJldmVub2RkIiBmaWx0ZXI9InVybCgjYSkiPjxyZWN0IHdpZHRoPSIxMiIgaGVpZ2h0PSI0MiIgeD0iNiIgeT0iMyIgcng9IjIiLz48cmVjdCB3aWR0aD0iMTIiIGhlaWdodD0iNDIiIHg9IjMwIiB5PSIzIiByeD0iMiIvPjwvZz48L3N2Zz4=',
  play:
    'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0OCIgaGVpZ2h0PSI0OCI+PGRlZnM+PGZpbHRlciBpZD0iYSIgaGVpZ2h0PSIxNTAlIj48ZmVHYXVzc2lhbkJsdXIgaW49IlNvdXJjZUFscGhhIiBzdGREZXZpYXRpb249IjMiLz48ZmVPZmZzZXQgZHg9IjIiIGR5PSIyIiByZXN1bHQ9Im9mZnNldGJsdXIiLz48ZmVDb21wb25lbnRUcmFuc2Zlcj48ZmVGdW5jQSB0eXBlPSJsaW5lYXIiIHNsb3BlPSIuNyIvPjwvZmVDb21wb25lbnRUcmFuc2Zlcj48ZmVNZXJnZT48ZmVNZXJnZU5vZGUvPjxmZU1lcmdlTm9kZSBpbj0iU291cmNlR3JhcGhpYyIvPjwvZmVNZXJnZT48L2ZpbHRlcj48L2RlZnM+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIiBmaWx0ZXI9InVybCgjYSkiPjxwYXRoIGZpbGw9IiNGRkYiIGQ9Ik01IDR2NDBsMzgtMjB6Ii8+PC9nPjwvc3ZnPg==',
  replay:
    'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4MCIgaGVpZ2h0PSI4MCI+PGRlZnM+PGZpbHRlciBpZD0iYSIgaGVpZ2h0PSIxNTAlIj48ZmVHYXVzc2lhbkJsdXIgaW49IlNvdXJjZUFscGhhIiBzdGREZXZpYXRpb249IjMiLz48ZmVPZmZzZXQgZHg9IjIiIGR5PSIyIiByZXN1bHQ9Im9mZnNldGJsdXIiLz48ZmVDb21wb25lbnRUcmFuc2Zlcj48ZmVGdW5jQSB0eXBlPSJsaW5lYXIiIHNsb3BlPSIuNyIvPjwvZmVDb21wb25lbnRUcmFuc2Zlcj48ZmVNZXJnZT48ZmVNZXJnZU5vZGUvPjxmZU1lcmdlTm9kZSBpbj0iU291cmNlR3JhcGhpYyIvPjwvZmVNZXJnZT48L2ZpbHRlcj48L2RlZnM+PGcgZmlsbD0iI0ZGRiIgZmlsbC1ydWxlPSJub256ZXJvIiBmaWx0ZXI9InVybCgjYSkiPjxwYXRoIGQ9Ik00MC41IDl2OC45YTI1LjYgMjUuNiAwIDEgMS0yNS42IDI0LjVINnYxLjFBMzQuNSAzNC41IDAgMSAwIDQwLjUgOXoiLz48cGF0aCBkPSJNNDAgMHYyN0wyMCAxMy41eiIvPjwvZz48L3N2Zz4=',
  back:
    'data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHdpZHRoPSczNicgaGVpZ2h0PSczNicgdmlld0JveD0nMCAwIDM2IDM2Jz48ZyBmaWxsPSdub25lJyBmaWxsLXJ1bGU9J2V2ZW5vZGQnPjxwYXRoIGQ9J00wIDBoMzZ2MzZIMHonIG9wYWNpdHk9Jy41Jy8+PHBhdGggc3Ryb2tlPScjRkZGJyBzdHJva2Utd2lkdGg9JzQnIGQ9J00yMCAyTDQgMThsMTYgMTZNNSAxOGgzMC4wMDcnLz48L2c+PC9zdmc+Cg==',
  forward10:
    'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzNiIgaGVpZ2h0PSIzNiI+PGRlZnM+PGZpbHRlciBpZD0iYSIgaGVpZ2h0PSIxNTAlIj48ZmVHYXVzc2lhbkJsdXIgaW49IlNvdXJjZUFscGhhIiBzdGREZXZpYXRpb249IjMiLz48ZmVPZmZzZXQgZHg9IjIiIGR5PSIyIiByZXN1bHQ9Im9mZnNldGJsdXIiLz48ZmVDb21wb25lbnRUcmFuc2Zlcj48ZmVGdW5jQSB0eXBlPSJsaW5lYXIiIHNsb3BlPSIuNyIvPjwvZmVDb21wb25lbnRUcmFuc2Zlcj48ZmVNZXJnZT48ZmVNZXJnZU5vZGUvPjxmZU1lcmdlTm9kZSBpbj0iU291cmNlR3JhcGhpYyIvPjwvZmVNZXJnZT48L2ZpbHRlcj48L2RlZnM+PGcgZmlsbD0iI0ZGRiIgZmlsbC1ydWxlPSJldmVub2RkIiBmaWx0ZXI9InVybCgjYSkiPjxwYXRoIGQ9Ik0xOCA0djRhMTEuNSAxMS41IDAgMSAwIDExLjQ5IDExaDRsLjAxLjVBMTUuNSAxNS41IDAgMSAxIDE4IDR6Ii8+PHBhdGggZD0iTTE4IDB2MTJsOS02em0tNC44NCAyNXYtNy45N2gtLjA0bC0yLjUxIDEuNzRWMTYuOWwyLjU1LTEuNzdoMi4wNVYyNWgtMi4wNXptOC4xMi4yMmMtMi40OCAwLTQtMS45OC00LTUuMTcgMC0zLjE4IDEuNTMtNS4xNCA0LTUuMTQgMi40NyAwIDMuOTggMS45NSAzLjk4IDUuMTMgMCAzLjE5LTEuNSA1LjE4LTMuOTggNS4xOHptMC0xLjY2YzEuMTcgMCAxLjg5LTEuMjYgMS44OS0zLjVzLS43Mi0zLjUtMS45LTMuNWMtMS4xNSAwLTEuODggMS4yNy0xLjg4IDMuNXMuNzEgMy41IDEuODkgMy41eiIvPjwvZz48L3N2Zz4=',
  rewind10:
    'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzNiIgaGVpZ2h0PSIzNiI+PGRlZnM+PGZpbHRlciBpZD0iYSIgaGVpZ2h0PSIxNTAlIj48ZmVHYXVzc2lhbkJsdXIgaW49IlNvdXJjZUFscGhhIiBzdGREZXZpYXRpb249IjMiLz48ZmVPZmZzZXQgZHg9IjIiIGR5PSIyIiByZXN1bHQ9Im9mZnNldGJsdXIiLz48ZmVDb21wb25lbnRUcmFuc2Zlcj48ZmVGdW5jQSB0eXBlPSJsaW5lYXIiIHNsb3BlPSIuNyIvPjwvZmVDb21wb25lbnRUcmFuc2Zlcj48ZmVNZXJnZT48ZmVNZXJnZU5vZGUvPjxmZU1lcmdlTm9kZSBpbj0iU291cmNlR3JhcGhpYyIvPjwvZmVNZXJnZT48L2ZpbHRlcj48L2RlZnM+PGcgZmlsbD0iI0ZGRiIgZmlsbC1ydWxlPSJldmVub2RkIiBmaWx0ZXI9InVybCgjYSkiPjxwYXRoIGQ9Ik0xOCA0djRBMTEuNSAxMS41IDAgMSAxIDYuNTEgMTloLTR2LjVBMTUuNSAxNS41IDAgMSAwIDE4IDR6Ii8+PHBhdGggZD0iTTE4IDB2MTJMOSA2em0tNC44NCAyNXYtNy45N2gtLjA0bC0yLjUxIDEuNzRWMTYuOWwyLjU1LTEuNzdoMi4wNVYyNWgtMi4wNXptOC4xMi4yMmMtMi40OCAwLTQtMS45OC00LTUuMTcgMC0zLjE4IDEuNTMtNS4xNCA0LTUuMTQgMi40NyAwIDMuOTggMS45NSAzLjk4IDUuMTMgMCAzLjE5LTEuNSA1LjE4LTMuOTggNS4xOHptMC0xLjY2YzEuMTcgMCAxLjg5LTEuMjYgMS44OS0zLjVzLS43Mi0zLjUtMS45LTMuNWMtMS4xNSAwLTEuODggMS4yNy0xLjg4IDMuNXMuNzEgMy41IDEuODkgMy41eiIvPjwvZz48L3N2Zz4=',
  volumeHight:
    'data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHdpZHRoPSczNicgaGVpZ2h0PSczNicgdmlld0JveD0nMCAwIDM2IDM2Jz4gPGcgZmlsbD0nbm9uZScgZmlsbC1ydWxlPSdldmVub2RkJz4gPHBhdGggZD0nTTAgMGgzNnYzNkgweicgb3BhY2l0eT0nLjUnLz4gPHBhdGggZmlsbD0nI0ZGRicgZD0nTTIxLjgwOCAxYTE2LjI2NSAxNi4yNjUgMCAwIDEgNi43NzcgMy4yMTkgMTYuOTEgMTYuOTEgMCAwIDEgNC42OTIgNS44MDJBMTYuOTYgMTYuOTYgMCAwIDEgMzUgMTcuNTQ3YzAgMi42Ni0uNTc0IDUuMTY4LTEuNzIzIDcuNTI1YTE2LjkxIDE2LjkxIDAgMCAxLTQuNjkyIDUuODAzIDE2LjI2NSAxNi4yNjUgMCAwIDEtNi43NzcgMy4yMTh2LTMuODk4YTEyLjQ1NiAxMi40NTYgMCAwIDAgNC44NS0yLjYzIDEzLjE2OCAxMy4xNjggMCAwIDAgMy4zMzMtNC40NjUgMTMuMTA5IDEzLjEwOSAwIDAgMCAxLjIwMS01LjU1M2MwLTEuOTY1LS40LTMuODE2LTEuMjAxLTUuNTU0YTEzLjE2OCAxMy4xNjggMCAwIDAtMy4zMzItNC40NjUgMTIuNDU2IDEyLjQ1NiAwIDAgMC00Ljg1MS0yLjYzVjF6Jy8+IDxwYXRoIGZpbGw9JyNGRkYnIGQ9J00yNi41MjMgMTcuNTQ3YzAgMS42NjItLjQyMyAzLjE2NS0xLjI3IDQuNTFhOC40NTMgOC40NTMgMCAwIDEtMy40NDUgMy4xMDZWOS45M2MxLjQ1LjcyNSAyLjYgMS43NiAzLjQ0NSAzLjEwNS44NDcgMS4zNDUgMS4yNyAyLjg0OCAxLjI3IDQuNTF6TTEgMTEuODhoNy41MjVMMTggMi40MDV2MzAuMjgzbC05LjQ3NS05LjQ3NUgxeicvPiA8L2c+IDwvc3ZnPg==',
  volumeLow:
    'data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHdpZHRoPSczNicgaGVpZ2h0PSczNicgdmlld0JveD0nMCAwIDM2IDM2Jz4gPGcgZmlsbD0nbm9uZScgZmlsbC1ydWxlPSdldmVub2RkJz4gPHBhdGggZD0nTTAgMGgzNnYzNkgweicgb3BhY2l0eT0nLjUnLz4gPHBhdGggZmlsbD0nI0ZGRicgZD0nTTI2LjUyMyAxNy41NDdjMCAxLjY2Mi0uNDIzIDMuMTY1LTEuMjcgNC41MWE4LjQ1MyA4LjQ1MyAwIDAgMS0zLjQ0NSAzLjEwNlY5LjkzYzEuNDUuNzI1IDIuNiAxLjc2IDMuNDQ1IDMuMTA1Ljg0NyAxLjM0NSAxLjI3IDIuODQ4IDEuMjcgNC41MXpNMSAxMS44OGg3LjUyNUwxOCAyLjQwNXYzMC4yODNsLTkuNDc1LTkuNDc1SDF6Jy8+IDwvZz4gPC9zdmc+',
  mute:
    'data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHdpZHRoPSczNicgaGVpZ2h0PSczNicgdmlld0JveD0nMCAwIDM2IDM2Jz4gPGcgZmlsbD0nbm9uZScgZmlsbC1ydWxlPSdldmVub2RkJz4gPHBhdGggZD0nTTAgMGgzNnYzNkgweicgb3BhY2l0eT0nLjUnLz4gPHBhdGggZmlsbD0nI0ZGRicgZD0nTTEgMTEuODhoNy41MjVMMTggMi40MDV2MzAuMjgzbC05LjQ3NS05LjQ3NUgxeicvPiA8ZyBmaWxsLXJ1bGU9J25vbnplcm8nPiA8cGF0aCBkPSdNMjAgMTFoMTR2MTRIMjB6Jy8+IDxwYXRoIGZpbGw9JyNGRkYnIGQ9J00zMS45NCAxMC45NGwyLjEyIDIuMTItMTIgMTItMi4xMi0yLjEyeicvPiA8cGF0aCBmaWxsPScjRkZGJyBkPSdNMTkuOTQgMTMuMDZsMi4xMi0yLjEyIDEyIDEyLTIuMTIgMi4xMnonLz4gPC9nPiA8L2c+IDwvc3ZnPg==',
  setting:
    'data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHdpZHRoPSczNicgaGVpZ2h0PSczNicgdmlld0JveD0nMCAwIDM2IDM2Jz4gPGcgZmlsbD0nbm9uZScgZmlsbC1ydWxlPSdldmVub2RkJz4gPHBhdGggZD0nTTAgMGgzNnYzNkgweicgb3BhY2l0eT0nLjgnLz4gPHBhdGggZmlsbD0nI0ZGRicgZmlsbC1ydWxlPSdub256ZXJvJyBkPSdNMjMuMzA4IDMxLjQ3M2wtLjI2MyAyLjI3QTEuNDM0IDEuNDM0IDAgMCAxIDIxLjYxMSAzNWgtNy4yMjJjLS43MzQgMC0xLjM1MS0uNTQtMS40MzQtMS4yNTdsLS4yNjMtMi4yN2ExNS4xMzQgMTUuMTM0IDAgMCAxLTQuMDA3LTIuMTlsLTIuMDU0Ljg3N2ExLjQ1NyAxLjQ1NyAwIDAgMS0xLjgyNi0uNTlsLTMuNjExLTYuMTRhMS40IDEuNCAwIDAgMSAuMzkxLTEuODQ3bDEuNjM3LTEuMTg3YTEzLjk0MiAxMy45NDIgMCAwIDEgMC00Ljc5MmwtMS42MzctMS4xODdhMS40IDEuNCAwIDAgMS0uMzkxLTEuODQ4bDMuNjEtNi4xMzhhMS40NTcgMS40NTcgMCAwIDEgMS44MjctLjU5bDIuMDU0Ljg3NmExNS4xMzQgMTUuMTM0IDAgMCAxIDQuMDA3LTIuMTlsLjI2My0yLjI3Yy4wODMtLjcxNi43LTEuMjU3IDEuNDM0LTEuMjU3aDcuMjIyYy43MzQgMCAxLjM1MS41NCAxLjQzNCAxLjI1N2wuMjYzIDIuMjdhMTUuMTM0IDE1LjEzNCAwIDAgMSA0LjAwNyAyLjE5bDIuMDU0LS44NzdhMS40NTcgMS40NTcgMCAwIDEgMS44MjYuNTlsMy42MTEgNi4xNGExLjQgMS40IDAgMCAxLS4zOTEgMS44NDdsLTEuNjM3IDEuMTg3YTEzLjk0MyAxMy45NDMgMCAwIDEgMCA0Ljc5MmwxLjYzNyAxLjE4N2ExLjQgMS40IDAgMCAxIC4zOTEgMS44NDhsLTMuNjEgNi4xMzhhMS40NTcgMS40NTcgMCAwIDEtMS44MjcuNTlsLTIuMDU0LS44NzZhMTUuMTM0IDE1LjEzNCAwIDAgMS00LjAwNyAyLjE5ek0xOCAyNmE4IDggMCAxIDAgMC0xNiA4IDggMCAwIDAgMCAxNnonLz4gPC9nPiA8L3N2Zz4=',
  check:
    'data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHdpZHRoPScyMCcgaGVpZ2h0PScyMCcgdmlld0JveD0nMCAwIDIwIDIwJz48cGF0aCBmaWxsPScjRkZGJyBmaWxsLXJ1bGU9J25vbnplcm8nIGQ9J00yLjkwMiA5LjI2MWExLjA4NyAxLjA4NyAwIDAgMC0xLjU3NiAwIDEuMTgzIDEuMTgzIDAgMCAwIDAgMS42MzJsNS41NzEgNS43NjljLjQzNS40NSAxLjE0LjQ1IDEuNTc2IDBsMTEuMi0xMS42OTJhMS4xODMgMS4xODMgMCAwIDAgMC0xLjYzMiAxLjA4NyAxLjA4NyAwIDAgMC0xLjU3NSAwTDcuNjg1IDE0LjIxNCAyLjkwMiA5LjI2MXonLz48L3N2Zz4K',
  enterFullScreen:
    'data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHdpZHRoPSczNicgaGVpZ2h0PSczNicgdmlld0JveD0nMCAwIDM2IDM2Jz4gPGcgZmlsbD0nbm9uZScgZmlsbC1ydWxlPSdldmVub2RkJz4gPHBhdGggZD0nTTAgMGgzNnYzNkgweicgb3BhY2l0eT0nLjUnLz4gPHBhdGggZmlsbD0nI0ZGRicgZD0nTTMwIDMwdi05aDR2MTNIMjF2LTRoOXptNC0yNHY5aC00VjZoLTlWMmgxM3Y0ek02IDMwaDl2NEgyVjIxaDR2OXpNNiAyaDl2NEg2djlIMlYyaDR6Jy8+IDwvZz4gPC9zdmc+',
  leaveFullScreen:
    'data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHdpZHRoPSczNicgaGVpZ2h0PSczNicgdmlld0JveD0nMCAwIDM2IDM2Jz4gPGcgZmlsbD0nbm9uZScgZmlsbC1ydWxlPSdldmVub2RkJz4gPHBhdGggZD0nTTAgMGgzNnYzNkgweicgb3BhY2l0eT0nLjUnLz4gPHBhdGggZmlsbD0nI0ZGRicgZD0nTTExIDJoNHYxM2gtNHonLz4gPHBhdGggZmlsbD0nI0ZGRicgZD0nTTIgMTFoMTN2NEgyek0xMSAzNGg0VjIxaC00eicvPiA8cGF0aCBmaWxsPScjRkZGJyBkPSdNMiAyNWgxM3YtNEgyek0zNCAxMXY0SDIxdi00eicvPiA8cGF0aCBmaWxsPScjRkZGJyBkPSdNMjUgMnYxM2gtNFYyek0zNCAyNXYtNEgyMXY0eicvPiA8cGF0aCBmaWxsPScjRkZGJyBkPSdNMjUgMzRWMjFoLTR2MTN6Jy8+IDwvZz4gPC9zdmc+',
  previousEpisode:
    'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzNiIgaGVpZ2h0PSIzNiI+PGRlZnM+PGZpbHRlciBpZD0iYSIgaGVpZ2h0PSIxNTAlIj48ZmVHYXVzc2lhbkJsdXIgaW49IlNvdXJjZUFscGhhIiBzdGREZXZpYXRpb249IjMiLz48ZmVPZmZzZXQgZHg9IjIiIGR5PSIyIiByZXN1bHQ9Im9mZnNldGJsdXIiLz48ZmVDb21wb25lbnRUcmFuc2Zlcj48ZmVGdW5jQSB0eXBlPSJsaW5lYXIiIHNsb3BlPSIuNyIvPjwvZmVDb21wb25lbnRUcmFuc2Zlcj48ZmVNZXJnZT48ZmVNZXJnZU5vZGUvPjxmZU1lcmdlTm9kZSBpbj0iU291cmNlR3JhcGhpYyIvPjwvZmVNZXJnZT48L2ZpbHRlcj48L2RlZnM+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIiBmaWx0ZXI9InVybCgjYSkiPjxwYXRoIGZpbGw9IiNGRkYiIGQ9Ik0zMiAzMlY0TDExIDE4em0tMjEgMFY0SDR2Mjh6Ii8+PC9nPjwvc3ZnPg==',
  nextEpisode:
    'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzNiIgaGVpZ2h0PSIzNiI+PGRlZnM+PGZpbHRlciBpZD0iYSIgaGVpZ2h0PSIxNTAlIj48ZmVHYXVzc2lhbkJsdXIgaW49IlNvdXJjZUFscGhhIiBzdGREZXZpYXRpb249IjMiLz48ZmVPZmZzZXQgZHg9IjIiIGR5PSIyIiByZXN1bHQ9Im9mZnNldGJsdXIiLz48ZmVDb21wb25lbnRUcmFuc2Zlcj48ZmVGdW5jQSB0eXBlPSJsaW5lYXIiIHNsb3BlPSIuNyIvPjwvZmVDb21wb25lbnRUcmFuc2Zlcj48ZmVNZXJnZT48ZmVNZXJnZU5vZGUvPjxmZU1lcmdlTm9kZSBpbj0iU291cmNlR3JhcGhpYyIvPjwvZmVNZXJnZT48L2ZpbHRlcj48L2RlZnM+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIiBmaWx0ZXI9InVybCgjYSkiPjxwYXRoIGZpbGw9IiNGRkYiIGQ9Ik00IDMyVjRsMjEgMTR6bTIxIDBWNGg3djI4eiIvPjwvZz48L3N2Zz4=',
  pauseCircle:
    'data:image/png;base64,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',
  playCircle:
    'data:image/png;base64,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',
  playCircleBorder:
    'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCI+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj48Y2lyY2xlIGN4PSIzMCIgY3k9IjMwIiByPSIyOSIgc3Ryb2tlPSIjRkZGIiBzdHJva2Utd2lkdGg9IjIiLz48cGF0aCBmaWxsPSIjRkZGIiBkPSJNMjIgMTcuMTJ2MjYuM2ExIDEgMCAwMDEuNTQuODRsMjAuNy0xMy4xNWExIDEgMCAwMDAtMS42OWwtMjAuNy0xMy4xNWExIDEgMCAwMC0xLjU0Ljg1eiIvPjwvZz48L3N2Zz4=',
  arrowTop:
    'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNiIgaGVpZ2h0PSIxNiI+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj48cGF0aCBkPSJNMCAwdjE2aDE2VjB6IiBvcGFjaXR5PSIuNSIvPjxwYXRoIGZpbGw9IiNDQ0MiIGZpbGwtcnVsZT0ibm9uemVybyIgZD0iTTIuNTcgMTAuMjdhLjgzLjgzIDAgMDEtMS4xNC0xLjJsNi01LjY4Yy4zMi0uMy44Mi0uMyAxLjE0IDBsNiA1LjY3YS44My44MyAwIDExLTEuMTQgMS4yMUw4IDUuMTVsLTUuNDMgNS4xMnoiLz48L2c+PC9zdmc+',
  close:
    'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMiIgaGVpZ2h0PSIzMiI+PHBhdGggZmlsbD0iI2ZmZiIgZD0iTTI5LjY1IDQuMDVhMS4yIDEuMiAwIDEwLTEuNy0xLjdsLTI1LjYgMjUuNmExLjIgMS4yIDAgMDAxLjcgMS43bDI1LjYtMjUuNnoiLz48cGF0aCBmaWxsPSIjZmZmIiBkPSJNMi4zNSA0LjA1YTEuMiAxLjIgMCAxMTEuNy0xLjdsMjUuNiAyNS42YTEuMiAxLjIgMCAwMS0xLjcgMS43TDIuMzUgNC4wNXoiLz48L3N2Zz4=',
  castNotConnected:
    'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzYiIGhlaWdodD0iMzYiIHZpZXdCb3g9IjAgMCAyNCAyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0xIDE4djNoM2EzIDMgMCAwMC0zLTN6bTAtNHYyYTUgNSAwIDAxNSA1aDJhNyA3IDAgMDAtNy03em0wLTR2MmE5IDkgMCAwMTkgOWgyQTExIDExIDAgMDAxIDEwem0yMC03SDNhMiAyIDAgMDAtMiAydjNoMlY1aDE4djE0aC03djJoN2EyIDIgMCAwMDItMlY1YTIgMiAwIDAwLTItMnoiIGZpbGw9IiMwMDAiLz48cGF0aCBkPSJNMCAwaDI0djI0SDB6Ii8+PC9nPjwvc3ZnPg==',
  castConnected:
    'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzYiIGhlaWdodD0iMzYiIHZpZXdCb3g9IjAgMCAyNCAyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0xIDE4djNoM2EzIDMgMCAwMC0zLTN6bTAtNHYyYTUgNSAwIDAxNSA1aDJhNyA3IDAgMDAtNy03em0xOC03SDV2MS42M0ExMy4wMyAxMy4wMyAwIDAxMTMuMzcgMTdIMTlWN3pNMSAxMHYyYTkgOSAwIDAxOSA5aDJBMTEgMTEgMCAwMDEgMTB6bTIwLTdIM2EyIDIgMCAwMC0yIDJ2M2gyVjVoMTh2MTRoLTd2Mmg3YTIgMiAwIDAwMi0yVjVhMiAyIDAgMDAtMi0yeiIgZmlsbD0iIzAwMCIvPjxwYXRoIGQ9Ik0wIDBoMjR2MjRIMHoiLz48L2c+PC9zdmc+',
  castConntecting0:
    'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzYiIGhlaWdodD0iMzYiIHZpZXdCb3g9IjAgMCAyNCAyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0xIDE4djNoM2EzIDMgMCAwMC0zLTN6IiBmaWxsPSIjMDAwIi8+PHBhdGggZD0iTTEgMTR2MmE1IDUgMCAwMTUgNWgyYTcgNyAwIDAwLTctN3oiIG9wYWNpdHk9Ii4zIiBmaWxsPSIjMDAwIi8+PHBhdGggZD0iTTEgMTB2MmE5IDkgMCAwMTkgOWgyQTExIDExIDAgMDAxIDEweiIgb3BhY2l0eT0iLjMiIGZpbGw9IiMwMDAiLz48cGF0aCBkPSJNMjEgM0gzYTIgMiAwIDAwLTIgMnYzaDJWNWgxOHYxNGgtN3YyaDdhMiAyIDAgMDAyLTJWNWEyIDIgMCAwMC0yLTJ6IiBmaWxsPSIjMDAwIi8+PHBhdGggZD0iTTAgMGgyNHYyNEgweiIvPjwvZz48L3N2Zz4=',
  castConntecting1:
    'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzYiIGhlaWdodD0iMzYiIHZpZXdCb3g9IjAgMCAyNCAyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0xIDE4djNoM2EzIDMgMCAwMC0zLTN6IiBvcGFjaXR5PSIuMyIgZmlsbD0iIzAwMCIvPjxwYXRoIGQ9Ik0xIDE0djJhNSA1IDAgMDE1IDVoMmE3IDcgMCAwMC03LTd6IiBmaWxsPSIjMDAwIi8+PHBhdGggZD0iTTEgMTB2MmE5IDkgMCAwMTkgOWgyQTExIDExIDAgMDAxIDEweiIgb3BhY2l0eT0iLjMiIGZpbGw9IiMwMDAiLz48cGF0aCBkPSJNMjEgM0gzYTIgMiAwIDAwLTIgMnYzaDJWNWgxOHYxNGgtN3YyaDdhMiAyIDAgMDAyLTJWNWEyIDIgMCAwMC0yLTJ6IiBmaWxsPSIjMDAwIi8+PHBhdGggZD0iTTAgMGgyNHYyNEgweiIvPjwvZz48L3N2Zz4=',
  castConntecting2:
    'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzYiIGhlaWdodD0iMzYiIHZpZXdCb3g9IjAgMCAyNCAyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0xIDE4djNoM2EzIDMgMCAwMC0zLTN6TTEgMTR2MmE1IDUgMCAwMTUgNWgyYTcgNyAwIDAwLTctN3oiIG9wYWNpdHk9Ii4zIiBmaWxsPSIjMDAwIi8+PHBhdGggZD0iTTEgMTB2MmE5IDkgMCAwMTkgOWgyQTExIDExIDAgMDAxIDEweiIgZmlsbD0iIzAwMCIvPjxwYXRoIGQ9Ik0yMSAzSDNhMiAyIDAgMDAtMiAydjNoMlY1aDE4djE0aC03djJoN2EyIDIgMCAwMDItMlY1YTIgMiAwIDAwLTItMnoiIGZpbGw9IiMwMDAiLz48cGF0aCBkPSJNMCAwaDI0djI0SDB6Ii8+PC9nPjwvc3ZnPg==',
  warning:
    'data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHdpZHRoPSc4MCcgaGVpZ2h0PSc4MCcgdmlld0JveD0nMCAwIDgwIDgwJz48cGF0aCBmaWxsPScjRkZGJyBmaWxsLXJ1bGU9J25vbnplcm8nIGQ9J003OS40MDkgNzAuMDQ0TDQ0LjUxNCA0LjY2MUE1LjAyMyA1LjAyMyAwIDAgMCA0MC4wODMgMmgtLjAwNWE1LjAyNCA1LjAyNCAwIDAgMC00LjQzMSAyLjY1NkwuNTk3IDcwLjAzOUE1LjAzNyA1LjAzNyAwIDAgMCAuNzExIDc1YTUuMDQyIDUuMDQyIDAgMCAwIDQuMzE1IDIuNDQ0aDY5Ljk0YzEuNzcxIDAgMy40MDYtLjkyNiA0LjMxNi0yLjQ0NWE1LjAyOSA1LjAyOSAwIDAgMCAuMTI2LTQuOTU0em0tMzkuMzMxLTIuNjZhNS4wMzEgNS4wMzEgMCAwIDEtNS4wMy01LjAzIDUuMDMxIDUuMDMxIDAgMCAxIDUuMDMtNS4wMyA1LjAzNSA1LjAzNSAwIDAgMSA1LjAzIDUuMDMgNS4wMzEgNS4wMzEgMCAwIDEtNS4wMyA1LjAzem01LjAzNC0yMC4wMzhhNS4wMzEgNS4wMzEgMCAwIDEtNS4wMjkgNS4wMyA1LjAyOCA1LjAyOCAwIDAgMS01LjAzLTUuMDNWMjcuMjI4YTUuMDMxIDUuMDMxIDAgMCAxIDUuMDMtNS4wMyA1LjAzNSA1LjAzNSAwIDAgMSA1LjAzIDUuMDN2MjAuMTE4eicvPjwvc3ZnPgo=',
  cancel:
    'data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHdpZHRoPSczNicgaGVpZ2h0PSczNic+PGcgZmlsbD0nbm9uZScgZmlsbC1ydWxlPSdldmVub2RkJz48cGF0aCBkPSdNMCAwaDM2djM2SDB6JyBvcGFjaXR5PScuNScvPjxwYXRoIGQ9J00zMS41MzMgNC45MDNMNC40NjcgMzAuNjQ1bTI3LjA2Ni40NTJMNC45MzMgNC45MDMnIGZpbGwtcnVsZT0nbm9uemVybycgc3Ryb2tlPScjRkZGJyBzdHJva2Utd2lkdGg9JzQnLz48L2c+PC9zdmc+',
}

const Icon$1 = ({type}) =>
  jsx$1('div', {
    css: /*#__PURE__*/ css(
      {
        width: 'inherit',
        height: 'inherit',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundImage: `url(${icon[type]})`,
        pointerEvents: 'none',
        touchAction: 'none',
      },
      process.env.NODE_ENV === 'production' ? '' : ';label:Icon;',
      process.env.NODE_ENV === 'production'
        ? ''
        : '/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkljb24uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBTUkiLCJmaWxlIjoiSWNvbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qIEBqc3hJbXBvcnRTb3VyY2UgQGVtb3Rpb24vcmVhY3QgKi9cbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcydcbmltcG9ydCBpY29uIGZyb20gJ3N0eWxlL2ljb24nXG5cbmNvbnN0IEljb24gPSAoe3R5cGV9KSA9PiAoXG4gIDxkaXZcbiAgICBjc3M9e3tcbiAgICAgIHdpZHRoOiAnaW5oZXJpdCcsXG4gICAgICBoZWlnaHQ6ICdpbmhlcml0JyxcbiAgICAgIGJhY2tncm91bmRQb3NpdGlvbjogJ2NlbnRlcicsXG4gICAgICBiYWNrZ3JvdW5kU2l6ZTogJ2NvdmVyJyxcbiAgICAgIGJhY2tncm91bmRJbWFnZTogYHVybCgke2ljb25bdHlwZV19KWAsXG4gICAgICBwb2ludGVyRXZlbnRzOiAnbm9uZScsXG4gICAgICB0b3VjaEFjdGlvbjogJ25vbmUnLFxuICAgIH19XG4gIC8+XG4pXG5cbkljb24ucHJvcFR5cGVzID0ge1xuICB0eXBlOiBQcm9wVHlwZXMuc3RyaW5nLFxufVxuXG5leHBvcnQgZGVmYXVsdCBJY29uXG4iXX0= */'
    ),
  })

Icon$1.propTypes = {
  type: propTypes.string,
}

/* @jsxImportSource @emotion/react */
const styles$2 = {
  // TODO keep only necessary
  border: 'none',
  outline: 'none',
  cursor: 'pointer',
  padding: 0,
  flexShrink: 0,
  backgroundColor: 'transparent',
  userSelect: 'none',
  '> span': {
    width: '100%',
    height: '100%',
  },
}

const Button = ({startIcon, children, ...rest}) =>
  jsxs('button', {
    type: 'button',
    css: styles$2,
    ...rest,
    children: [startIcon, children],
  })

Button.propTypes = {
  startIcon: propTypes.node,
  children: propTypes.node,
}

const PlayButton$1 = ({
  ended,
  paused,
  waiting,
  waitingStyle = 'spin',
  onClick,
}) =>
  waiting && waitingStyle === 'spin'
    ? 'waiting'
    : jsx$1(Button, {
        startIcon: jsx$1(Icon$1, {
          type: ended ? 'replay' : paused ? 'play' : 'pause',
        }),
        disabled: waiting && waitingStyle === 'disabled',
        onClick: onClick,
      })

PlayButton$1.propTypes = {
  ended: propTypes.bool,
  paused: propTypes.bool,
  waiting: propTypes.bool,
  waitingStyle: propTypes.string,
  onClick: propTypes.func,
}

function _EMOTION_STRINGIFIED_CSS_ERROR__$1() {
  return "You have tried to stringify object returned from `css` function. It isn't supposed to be used directly (e.g. as value of the `className` prop), but rather handed to emotion so it can handle it (e.g. as value of `css` prop)."
}
const queryMouse =
  '(hover: hover), screen and (-ms-high-contrast: active), (-ms-high-contrast: none)'
const style$a = {
  position: 'relative',
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  cursor: 'pointer',
  userSelect: 'none',
  touchAction: 'none',
}
const railStyle = {
  position: 'relative',
  flex: '100%',
  height: '4px',
  overflow: 'hidden',
  background: 'rgba(255, 255, 255, 0.3)',
  '> div': {
    position: 'absolute',
    top: '0',
    left: '0',
    width: '100%',
    height: '100%',
  },
}
const markStyle = {
  position: 'absolute',
  height: railStyle.height,
  width: '4px',
  transform: 'translateX(-50%)',
  backgroundColor: '#ff9835',
}
const thumbStyle = {
  position: 'absolute',
  top: '50%',
  height: '14px',
  width: '14px',
  borderRadius: '100%',
  backgroundColor: '#fff',
  boxShadow: '0 2px 2px 0 rgba(0, 0, 0, 0.5)',
  transform: 'translate(-50%, -50%)',
}

const getPointerData = event => {
  var _event$touches, _event$changedTouches

  const {pageX: x, pageY: y} =
    ((_event$touches = event.touches) === null || _event$touches === void 0
      ? void 0
      : _event$touches[0]) ||
    ((_event$changedTouches = event.changedTouches) === null ||
    _event$changedTouches === void 0
      ? void 0
      : _event$changedTouches[0]) ||
    event
  const {width, left} = event.currentTarget.getBoundingClientRect()
  return {
    x,
    y,
    width,
    left,
  }
}

const getSliderValue = ({x, left, width}) =>
  Math.max(0, Math.min((x - left) / width, 1))

const debouncedPointerHandlers = ({state, onMove, onLeave}) => {
  const emit = () => {
    if (!state.scheduled) {
      return
    }

    if (state.type === 'leave') {
      onLeave === null || onLeave === void 0
        ? void 0
        : onLeave(state.event, state)
    } else {
      onMove(state.event, state)
    }

    state.scheduled = false
  }

  const schedule = () => {
    if (state.scheduled) {
      return
    }

    state.scheduled = true
    requestAnimationFrame(emit)
  }

  return {
    onPointerMove: event => {
      var _event$touches2

      const type =
        event.buttons > 0 ||
        ((_event$touches2 = event.touches) === null ||
        _event$touches2 === void 0
          ? void 0
          : _event$touches2.length) > 0
          ? 'change'
          : 'move'
      Object.assign(state, {
        event,
        type,
        ...getPointerData(event),
      })
      schedule()
    },
    onPointerLeave: event => {
      const type = 'leave'
      Object.assign(state, {
        event,
        type,
      })
      schedule()
    },
    emit,
  }
}

const eventHandlers = ({
  onPointerDown,
  onPointerMove,
  onPointerLeave,
  onPointerUp,
}) =>
  typeof window !== 'undefined' && window.matchMedia(queryMouse).matches
    ? {
        onPointerDown,
        onPointerMove,
        onPointerLeave,
        onPointerUp,
      }
    : {
        onTouchStart: onPointerDown,
        onTouchMove: onPointerMove,
        onTouchEnd: event => {
          onPointerLeave(event)
          onPointerUp(event)
        },
      } // TODO align with material ui more, move special handling of pointer events

var _ref$1 =
  process.env.NODE_ENV === 'production'
    ? {
        name: 'dfjll8',
        styles: 'background-color:#fff',
      }
    : {
        name: 'mlfwmi-SimpleSlider',
        styles: 'background-color:#fff;label:SimpleSlider;',
        map:
          '/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlNpbXBsZVNsaWRlci5qc3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBOEtVIiwiZmlsZSI6IlNpbXBsZVNsaWRlci5qc3giLCJzb3VyY2VzQ29udGVudCI6WyIvKiBlc2xpbnQtZGlzYWJsZSBuby1wYXJhbS1yZWFzc2lnbiAqL1xuLyogZXNsaW50LWRpc2FibGUganN4LWExMXkvbm8tc3RhdGljLWVsZW1lbnQtaW50ZXJhY3Rpb25zICovXG4vKiBlc2xpbnQtZGlzYWJsZSBqc3gtYTExeS9jbGljay1ldmVudHMtaGF2ZS1rZXktZXZlbnRzICovXG4vKiBAanN4SW1wb3J0U291cmNlIEBlbW90aW9uL3JlYWN0ICovXG5pbXBvcnQge3VzZVN0YXRlLCB1c2VSZWZ9IGZyb20gJ3JlYWN0J1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJ1xuXG5jb25zdCBxdWVyeU1vdXNlID1cbiAgJyhob3ZlcjogaG92ZXIpLCBzY3JlZW4gYW5kICgtbXMtaGlnaC1jb250cmFzdDogYWN0aXZlKSwgKC1tcy1oaWdoLWNvbnRyYXN0OiBub25lKSdcblxuY29uc3Qgc3R5bGUgPSB7XG4gIHBvc2l0aW9uOiAncmVsYXRpdmUnLFxuICBoZWlnaHQ6ICcxMDAlJyxcbiAgZGlzcGxheTogJ2ZsZXgnLFxuICBhbGlnbkl0ZW1zOiAnY2VudGVyJyxcbiAgY3Vyc29yOiAncG9pbnRlcicsXG4gIHVzZXJTZWxlY3Q6ICdub25lJyxcbiAgdG91Y2hBY3Rpb246ICdub25lJyxcbn1cblxuY29uc3QgcmFpbFN0eWxlID0ge1xuICBwb3NpdGlvbjogJ3JlbGF0aXZlJyxcbiAgZmxleDogJzEwMCUnLFxuICBoZWlnaHQ6ICc0cHgnLFxuICBvdmVyZmxvdzogJ2hpZGRlbicsXG4gIGJhY2tncm91bmQ6ICdyZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMyknLFxuICAnPiBkaXYnOiB7XG4gICAgcG9zaXRpb246ICdhYnNvbHV0ZScsXG4gICAgdG9wOiAnMCcsXG4gICAgbGVmdDogJzAnLFxuICAgIHdpZHRoOiAnMTAwJScsXG4gICAgaGVpZ2h0OiAnMTAwJScsXG4gIH0sXG59XG5cbmNvbnN0IG1hcmtTdHlsZSA9IHtcbiAgcG9zaXRpb246ICdhYnNvbHV0ZScsXG4gIGhlaWdodDogcmFpbFN0eWxlLmhlaWdodCxcbiAgd2lkdGg6ICc0cHgnLFxuICB0cmFuc2Zvcm06ICd0cmFuc2xhdGVYKC01MCUpJyxcbiAgYmFja2dyb3VuZENvbG9yOiAnI2ZmOTgzNScsXG59XG5cbmNvbnN0IHRodW1iU3R5bGUgPSB7XG4gIHBvc2l0aW9uOiAnYWJzb2x1dGUnLFxuICB0b3A6ICc1MCUnLFxuICBoZWlnaHQ6ICcxNHB4JyxcbiAgd2lkdGg6ICcxNHB4JyxcbiAgYm9yZGVyUmFkaXVzOiAnMTAwJScsXG4gIGJhY2tncm91bmRDb2xvcjogJyNmZmYnLFxuICBib3hTaGFkb3c6ICcwIDJweCAycHggMCByZ2JhKDAsIDAsIDAsIDAuNSknLFxuICB0cmFuc2Zvcm06ICd0cmFuc2xhdGUoLTUwJSwgLTUwJSknLFxufVxuXG5jb25zdCBnZXRQb2ludGVyRGF0YSA9IGV2ZW50ID0+IHtcbiAgY29uc3Qge3BhZ2VYOiB4LCBwYWdlWTogeX0gPVxuICAgIGV2ZW50LnRvdWNoZXM/LlswXSB8fCBldmVudC5jaGFuZ2VkVG91Y2hlcz8uWzBdIHx8IGV2ZW50XG4gIGNvbnN0IHt3aWR0aCwgbGVmdH0gPSBldmVudC5jdXJyZW50VGFyZ2V0LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpXG4gIHJldHVybiB7eCwgeSwgd2lkdGgsIGxlZnR9XG59XG5cbmNvbnN0IGdldFNsaWRlclZhbHVlID0gKHt4LCBsZWZ0LCB3aWR0aH0pID0+XG4gIE1hdGgubWF4KDAsIE1hdGgubWluKCh4IC0gbGVmdCkgLyB3aWR0aCwgMSkpXG5cbmNvbnN0IGRlYm91bmNlZFBvaW50ZXJIYW5kbGVycyA9ICh7c3RhdGUsIG9uTW92ZSwgb25MZWF2ZX0pID0+IHtcbiAgY29uc3QgZW1pdCA9ICgpID0+IHtcbiAgICBpZiAoIXN0YXRlLnNjaGVkdWxlZCkge1xuICAgICAgcmV0dXJuXG4gICAgfVxuICAgIGlmIChzdGF0ZS50eXBlID09PSAnbGVhdmUnKSB7XG4gICAgICBvbkxlYXZlPy4oc3RhdGUuZXZlbnQsIHN0YXRlKVxuICAgIH0gZWxzZSB7XG4gICAgICBvbk1vdmUoc3RhdGUuZXZlbnQsIHN0YXRlKVxuICAgIH1cbiAgICBzdGF0ZS5zY2hlZHVsZWQgPSBmYWxzZVxuICB9XG4gIGNvbnN0IHNjaGVkdWxlID0gKCkgPT4ge1xuICAgIGlmIChzdGF0ZS5zY2hlZHVsZWQpIHtcbiAgICAgIHJldHVyblxuICAgIH1cbiAgICBzdGF0ZS5zY2hlZHVsZWQgPSB0cnVlXG4gICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKGVtaXQpXG4gIH1cblxuICByZXR1cm4ge1xuICAgIG9uUG9pbnRlck1vdmU6IGV2ZW50ID0+IHtcbiAgICAgIGNvbnN0IHR5cGUgPVxuICAgICAgICBldmVudC5idXR0b25zID4gMCB8fCBldmVudC50b3VjaGVzPy5sZW5ndGggPiAwID8gJ2NoYW5nZScgOiAnbW92ZSdcbiAgICAgIE9iamVjdC5hc3NpZ24oc3RhdGUsIHtldmVudCwgdHlwZSwgLi4uZ2V0UG9pbnRlckRhdGEoZXZlbnQpfSlcbiAgICAgIHNjaGVkdWxlKClcbiAgICB9LFxuICAgIG9uUG9pbnRlckxlYXZlOiBldmVudCA9PiB7XG4gICAgICBjb25zdCB0eXBlID0gJ2xlYXZlJ1xuICAgICAgT2JqZWN0LmFzc2lnbihzdGF0ZSwge2V2ZW50LCB0eXBlfSlcbiAgICAgIHNjaGVkdWxlKClcbiAgICB9LFxuICAgIGVtaXQsXG4gIH1cbn1cblxuY29uc3QgZXZlbnRIYW5kbGVycyA9ICh7XG4gIG9uUG9pbnRlckRvd24sXG4gIG9uUG9pbnRlck1vdmUsXG4gIG9uUG9pbnRlckxlYXZlLFxuICBvblBvaW50ZXJVcCxcbn0pID0+XG4gIHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnICYmIHdpbmRvdy5tYXRjaE1lZGlhKHF1ZXJ5TW91c2UpLm1hdGNoZXNcbiAgICA/IHtvblBvaW50ZXJEb3duLCBvblBvaW50ZXJNb3ZlLCBvblBvaW50ZXJMZWF2ZSwgb25Qb2ludGVyVXB9XG4gICAgOiB7XG4gICAgICAgIG9uVG91Y2hTdGFydDogb25Qb2ludGVyRG93bixcbiAgICAgICAgb25Ub3VjaE1vdmU6IG9uUG9pbnRlck1vdmUsXG4gICAgICAgIG9uVG91Y2hFbmQ6IGV2ZW50ID0+IHtcbiAgICAgICAgICBvblBvaW50ZXJMZWF2ZShldmVudClcbiAgICAgICAgICBvblBvaW50ZXJVcChldmVudClcbiAgICAgICAgfSxcbiAgICAgIH1cblxuLy8gVE9ETyBhbGlnbiB3aXRoIG1hdGVyaWFsIHVpIG1vcmUsIG1vdmUgc3BlY2lhbCBoYW5kbGluZyBvZiBwb2ludGVyIGV2ZW50c1xuY29uc3QgU2ltcGxlU2xpZGVyID0gKHtcbiAgbWluID0gMCxcbiAgbWF4ID0gMTAwLFxuICB2YWx1ZSxcbiAgbWFya3MgPSBbXSxcbiAgY2xhc3NOYW1lID0gJycsXG4gIGNsYXNzZXMgPSB7fSxcbiAgb25Qb2ludGVyTW92ZSxcbiAgb25Qb2ludGVyTGVhdmUsXG4gIG9uQ2hhbmdlLFxuICBvbkNoYW5nZUNvbW1pdHRlZCxcbn0pID0+IHtcbiAgY29uc3QgcG9pbnRlclN0YXRlID0gdXNlUmVmKHt9KVxuICBjb25zdCBbZm9jdXNWYWx1ZSwgc2V0Rm9jdXNWYWx1ZV0gPSB1c2VTdGF0ZSgtMSlcbiAgY29uc3QgY3VycmVudFBvc2l0aW9uID1cbiAgICAoKGZvY3VzVmFsdWUgPj0gMCA/IGZvY3VzVmFsdWUgOiB2YWx1ZSkgLSBtaW4pIC8gKG1heCAtIG1pbilcbiAgY29uc3QgcG9pbnRlckhhbmRsZXJzID0gZGVib3VuY2VkUG9pbnRlckhhbmRsZXJzKHtcbiAgICBzdGF0ZTogcG9pbnRlclN0YXRlLmN1cnJlbnQsXG4gICAgb25Nb3ZlOiAoZXZlbnQsIHt0eXBlLCB4LCB5LCB3aWR0aCwgbGVmdH0pID0+IHtcbiAgICAgIGNvbnN0IHBvaW50ZXJWYWx1ZSA9IG1pbiArIG1heCAqIGdldFNsaWRlclZhbHVlKHt4LCB3aWR0aCwgbGVmdH0pXG4gICAgICBvblBvaW50ZXJNb3ZlPy4oZXZlbnQsIHt2YWx1ZTogcG9pbnRlclZhbHVlLCB4LCB5fSlcbiAgICAgIGlmICh0eXBlID09PSAnY2hhbmdlJykge1xuICAgICAgICBzZXRGb2N1c1ZhbHVlKHBvaW50ZXJWYWx1ZSlcbiAgICAgICAgb25DaGFuZ2U/LihldmVudCwge3ZhbHVlOiBwb2ludGVyVmFsdWUsIHgsIHl9KVxuICAgICAgfVxuICAgIH0sXG4gICAgb25MZWF2ZTogKCkgPT4gb25Qb2ludGVyTGVhdmU/LigpLFxuICB9KVxuICBjb25zdCBoYW5kbGVQb2ludGVyVXAgPSBldmVudCA9PiB7XG4gICAgaWYgKGV2ZW50LnBvaW50ZXJJZCkge1xuICAgICAgZXZlbnQuY3VycmVudFRhcmdldC5yZWxlYXNlUG9pbnRlckNhcHR1cmUoZXZlbnQucG9pbnRlcklkKVxuICAgIH1cbiAgICBjb25zdCBwb2ludGVyVmFsdWUgPSBtaW4gKyBtYXggKiBnZXRTbGlkZXJWYWx1ZShnZXRQb2ludGVyRGF0YShldmVudCkpXG4gICAgcG9pbnRlckhhbmRsZXJzLmVtaXQoKVxuICAgIG9uQ2hhbmdlQ29tbWl0dGVkPy4oZXZlbnQsIHt2YWx1ZTogcG9pbnRlclZhbHVlfSlcbiAgICBzZXRGb2N1c1ZhbHVlKClcbiAgfVxuXG4gIHJldHVybiAoXG4gICAgPGRpdlxuICAgICAgY2xhc3NOYW1lPXtjbGFzc05hbWV9XG4gICAgICBjc3M9e3N0eWxlfVxuICAgICAgb25DbGljaz17ZXZlbnQgPT4gZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCl9XG4gICAgICB7Li4uZXZlbnRIYW5kbGVycyh7XG4gICAgICAgIG9uUG9pbnRlckRvd246IGV2ZW50ID0+IHtcbiAgICAgICAgICBpZiAoZXZlbnQudHlwZSA9PT0gJ3BvaW50ZXJkb3duJykge1xuICAgICAgICAgICAgZXZlbnQuY3VycmVudFRhcmdldC5zZXRQb2ludGVyQ2FwdHVyZShldmVudC5wb2ludGVySWQpXG4gICAgICAgICAgfVxuICAgICAgICAgIHBvaW50ZXJIYW5kbGVycy5vblBvaW50ZXJNb3ZlKGV2ZW50KVxuICAgICAgICB9LFxuICAgICAgICAuLi5wb2ludGVySGFuZGxlcnMsXG4gICAgICAgIG9uUG9pbnRlclVwOiBoYW5kbGVQb2ludGVyVXAsXG4gICAgICB9KX1cbiAgICA+XG4gICAgICA8ZGl2IGNsYXNzTmFtZT17Y2xhc3Nlcy5yYWlsfSBjc3M9e3JhaWxTdHlsZX0+XG4gICAgICAgIDxkaXZcbiAgICAgICAgICBjc3M9e3tiYWNrZ3JvdW5kQ29sb3I6ICcjZmZmJ319XG4gICAgICAgICAgY2xhc3NOYW1lPXtjbGFzc2VzLnRyYWNrfVxuICAgICAgICAgIHN0eWxlPXt7dHJhbnNmb3JtOiBgdHJhbnNsYXRlWCgke2N1cnJlbnRQb3NpdGlvbiAqIDEwMCAtIDEwMH0lKWB9fVxuICAgICAgICAvPlxuICAgICAgPC9kaXY+XG4gICAgICB7bWFya3MubWFwKHBvc2l0aW9uID0+IChcbiAgICAgICAgPGRpdlxuICAgICAgICAgIGtleT17cG9zaXRpb259XG4gICAgICAgICAgY3NzPXttYXJrU3R5bGV9XG4gICAgICAgICAgY2xhc3NOYW1lPXtjbGFzc2VzLm1hcmtlZH1cbiAgICAgICAgICBzdHlsZT17e2xlZnQ6IGAkeyhwb3NpdGlvbiAvIG1heCkgKiAxMDB9JWB9fVxuICAgICAgICAvPlxuICAgICAgKSl9XG4gICAgICB7b25DaGFuZ2UgPyAoXG4gICAgICAgIDxkaXZcbiAgICAgICAgICBjc3M9e3RodW1iU3R5bGV9XG4gICAgICAgICAgY2xhc3NOYW1lPXtjbGFzc2VzLnRodW1ifVxuICAgICAgICAgIHN0eWxlPXt7bGVmdDogYGNhbGMoJHtjdXJyZW50UG9zaXRpb24gKiAxMDB9JSlgfX1cbiAgICAgICAgLz5cbiAgICAgICkgOiAoXG4gICAgICAgIDxkaXYgLz5cbiAgICAgICl9XG4gICAgPC9kaXY+XG4gIClcbn1cblxuU2ltcGxlU2xpZGVyLnByb3BUeXBlcyA9IHtcbiAgbWluOiBQcm9wVHlwZXMubnVtYmVyLFxuICBtYXg6IFByb3BUeXBlcy5udW1iZXIsXG4gIHZhbHVlOiBQcm9wVHlwZXMubnVtYmVyLFxuICBtYXJrczogUHJvcFR5cGVzLmFycmF5LFxuICBjbGFzc05hbWU6IFByb3BUeXBlcy5zdHJpbmcsXG4gIGNsYXNzZXM6IFByb3BUeXBlcy5vYmplY3QsXG4gIG9uUG9pbnRlck1vdmU6IFByb3BUeXBlcy5mdW5jLFxuICBvblBvaW50ZXJMZWF2ZTogUHJvcFR5cGVzLmZ1bmMsXG4gIG9uQ2hhbmdlOiBQcm9wVHlwZXMuZnVuYyxcbiAgb25DaGFuZ2VDb21taXR0ZWQ6IFByb3BUeXBlcy5mdW5jLFxufVxuXG5leHBvcnQgZGVmYXVsdCBTaW1wbGVTbGlkZXJcbiJdfQ== */',
        toString: _EMOTION_STRINGIFIED_CSS_ERROR__$1,
      }

const SimpleSlider = ({
  min = 0,
  max = 100,
  value,
  marks = [],
  className = '',
  classes = {},
  onPointerMove,
  onPointerLeave,
  onChange,
  onChangeCommitted,
}) => {
  const pointerState = useRef({})
  const [focusValue, setFocusValue] = useState(-1)
  const currentPosition =
    ((focusValue >= 0 ? focusValue : value) - min) / (max - min)
  const pointerHandlers = debouncedPointerHandlers({
    state: pointerState.current,
    onMove: (event, {type, x, y, width, left}) => {
      const pointerValue =
        min +
        max *
          getSliderValue({
            x,
            width,
            left,
          })
      onPointerMove === null || onPointerMove === void 0
        ? void 0
        : onPointerMove(event, {
            value: pointerValue,
            x,
            y,
          })

      if (type === 'change') {
        setFocusValue(pointerValue)
        onChange === null || onChange === void 0
          ? void 0
          : onChange(event, {
              value: pointerValue,
              x,
              y,
            })
      }
    },
    onLeave: () =>
      onPointerLeave === null || onPointerLeave === void 0
        ? void 0
        : onPointerLeave(),
  })

  const handlePointerUp = event => {
    if (event.pointerId) {
      event.currentTarget.releasePointerCapture(event.pointerId)
    }

    const pointerValue = min + max * getSliderValue(getPointerData(event))
    pointerHandlers.emit()
    onChangeCommitted === null || onChangeCommitted === void 0
      ? void 0
      : onChangeCommitted(event, {
          value: pointerValue,
        })
    setFocusValue()
  }

  return jsxs('div', {
    className: className,
    css: style$a,
    onClick: event => event.stopPropagation(),
    ...eventHandlers({
      onPointerDown: event => {
        if (event.type === 'pointerdown') {
          event.currentTarget.setPointerCapture(event.pointerId)
        }

        pointerHandlers.onPointerMove(event)
      },
      ...pointerHandlers,
      onPointerUp: handlePointerUp,
    }),
    children: [
      jsx$1('div', {
        className: classes.rail,
        css: railStyle,
        children: jsx$1('div', {
          css: _ref$1,
          className: classes.track,
          style: {
            transform: `translateX(${currentPosition * 100 - 100}%)`,
          },
        }),
      }),
      marks.map(position =>
        jsx$1(
          'div',
          {
            css: markStyle,
            className: classes.marked,
            style: {
              left: `${(position / max) * 100}%`,
            },
          },
          position
        )
      ),
      onChange
        ? jsx$1('div', {
            css: thumbStyle,
            className: classes.thumb,
            style: {
              left: `calc(${currentPosition * 100}%)`,
            },
          })
        : jsx$1('div', {}),
    ],
  })
}

SimpleSlider.propTypes = {
  min: propTypes.number,
  max: propTypes.number,
  value: propTypes.number,
  marks: propTypes.array,
  className: propTypes.string,
  classes: propTypes.object,
  onPointerMove: propTypes.func,
  onPointerLeave: propTypes.func,
  onChange: propTypes.func,
  onChangeCommitted: propTypes.func,
}

const formattedTime = sourceTime => {
  const time = sourceTime >= 0 ? sourceTime : 0
  const seconds = Math.floor(time % 60)
    .toString()
    .padStart(2, '0')
  const minutes = Math.floor((time / 60) % 60)
    .toString()
    .padStart(2, '0')
  const hours = time >= 3600 && Math.floor((time / 60 / 60) % 60).toString()
  return [hours, minutes, seconds].filter(Boolean).join(':')
}

/* @jsxImportSource @emotion/react */
const seekbarStyle = {
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  width: '100%',
  height: '24px',
  fontSize: '75%',
  letterSpacing: '1px',
  color: '#fff',
}
const sliderStyle = {
  flex: 1,
  margin: '0 1em',
  '@media (hover: hover), screen and (-ms-high-contrast: active), (-ms-high-contrast: none)': {
    '> div:last-of-type': {
      opacity: 0,
      transition: 'opacity 0.2s ease-out',
    },
  },
  '&:hover > div:last-of-type': {
    opacity: 1,
  },
}

const getSliderStyle = css => ({
  rail: css({
    height: '0.33em',
  }),
  marked: css({
    height: '0.33em',
  }),
  thumb: css({
    width: '1.33em',
    height: '1.33em',
  }),
})

const reducePointer = (state, {type, value, x}) => {
  switch (type) {
    case 'move':
      return {...state, hover: true, value, x}

    case 'change':
      return {...state, focused: true, value}

    case 'release':
      return {...state, focused: false, value}

    case 'leave':
      return {...state, hover: false}

    default:
      return state
  }
} // TODO use className instead of classes ?

const Seekbar = ({
  style,
  classes,
  currentTime,
  bufferTime,
  duration,
  marks,
  addons = [],
  play,
  pause,
  seek,
}) => {
  var _ref$current

  const [pointerState, dispatchPointer] = useReducer(reducePointer, {})
  const pointerActive = pointerState.hover || pointerState.focused
  const displayTime = pointerActive ? pointerState.value : currentTime // to reflect boundary when container resized

  const {ref} = useDimensions()
  const rect =
    (_ref$current = ref.current) === null || _ref$current === void 0
      ? void 0
      : _ref$current.getBoundingClientRect()
  const handlers = seek && {
    onPointerMove: (_, {value, x}) =>
      dispatchPointer({
        type: 'move',
        value,
        x,
      }),
    onPointerLeave: () =>
      dispatchPointer({
        type: 'leave',
      }),
    onChange: (_, {value}) => {
      pause()
      dispatchPointer({
        type: 'change',
        value,
      })
    },
    // play will be triggered in operator.seek
    onChangeCommitted: (_, {value}) => {
      dispatchPointer({
        type: 'release',
        value,
      })
      seek(value)
      play()
    },
  }
  return jsxs('div', {
    ref: ref,
    className: 'kks-player__seek-bar',
    css: [
      seekbarStyle,
      style,
      process.env.NODE_ENV === 'production' ? '' : ';label:Seekbar;',
      process.env.NODE_ENV === 'production'
        ? ''
        : '/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlNlZWtiYXIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBNkZNIiwiZmlsZSI6IlNlZWtiYXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBAanN4SW1wb3J0U291cmNlIEBlbW90aW9uL3JlYWN0ICovXG5pbXBvcnQge0NsYXNzTmFtZXN9IGZyb20gJ0BlbW90aW9uL3JlYWN0J1xuaW1wb3J0IHt1c2VSZWR1Y2VyfSBmcm9tICdyZWFjdCdcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcydcbmltcG9ydCB1c2VEaW1lbnNpb25zIGZyb20gJ3JlYWN0LWNvb2wtZGltZW5zaW9ucydcblxuaW1wb3J0IFNpbXBsZVNsaWRlciBmcm9tICdwbGF5ZXJVaS9TaW1wbGVTbGlkZXInXG5pbXBvcnQgZm9ybWF0dGVkVGltZSBmcm9tICd1dGlsL2Zvcm1hdHRlZFRpbWUnXG5cbmNvbnN0IHNlZWtiYXJTdHlsZSA9IHtcbiAgcG9zaXRpb246ICdyZWxhdGl2ZScsXG4gIGRpc3BsYXk6ICdmbGV4JyxcbiAgYWxpZ25JdGVtczogJ2NlbnRlcicsXG4gIHdpZHRoOiAnMTAwJScsXG4gIGhlaWdodDogJzI0cHgnLFxuICBmb250U2l6ZTogJzc1JScsXG4gIGxldHRlclNwYWNpbmc6ICcxcHgnLFxuICBjb2xvcjogJyNmZmYnLFxufVxuXG5jb25zdCBzbGlkZXJTdHlsZSA9IHtcbiAgZmxleDogMSxcbiAgbWFyZ2luOiAnMCAxZW0nLFxuICAnQG1lZGlhIChob3ZlcjogaG92ZXIpLCBzY3JlZW4gYW5kICgtbXMtaGlnaC1jb250cmFzdDogYWN0aXZlKSwgKC1tcy1oaWdoLWNvbnRyYXN0OiBub25lKSc6IHtcbiAgICAnPiBkaXY6bGFzdC1vZi10eXBlJzoge1xuICAgICAgb3BhY2l0eTogMCxcbiAgICAgIHRyYW5zaXRpb246ICdvcGFjaXR5IDAuMnMgZWFzZS1vdXQnLFxuICAgIH0sXG4gIH0sXG4gICcmOmhvdmVyID4gZGl2Omxhc3Qtb2YtdHlwZSc6IHtcbiAgICBvcGFjaXR5OiAxLFxuICB9LFxufVxuXG5jb25zdCBnZXRTbGlkZXJTdHlsZSA9IGNzcyA9PiAoe1xuICByYWlsOiBjc3Moe2hlaWdodDogJzAuMzNlbSd9KSxcbiAgbWFya2VkOiBjc3Moe2hlaWdodDogJzAuMzNlbSd9KSxcbiAgdGh1bWI6IGNzcyh7d2lkdGg6ICcxLjMzZW0nLCBoZWlnaHQ6ICcxLjMzZW0nfSksXG59KVxuXG5jb25zdCByZWR1Y2VQb2ludGVyID0gKHN0YXRlLCB7dHlwZSwgdmFsdWUsIHh9KSA9PiB7XG4gIHN3aXRjaCAodHlwZSkge1xuICAgIGNhc2UgJ21vdmUnOlxuICAgICAgcmV0dXJuIHsuLi5zdGF0ZSwgaG92ZXI6IHRydWUsIHZhbHVlLCB4fVxuICAgIGNhc2UgJ2NoYW5nZSc6XG4gICAgICByZXR1cm4gey4uLnN0YXRlLCBmb2N1c2VkOiB0cnVlLCB2YWx1ZX1cbiAgICBjYXNlICdyZWxlYXNlJzpcbiAgICAgIHJldHVybiB7Li4uc3RhdGUsIGZvY3VzZWQ6IGZhbHNlLCB2YWx1ZX1cbiAgICBjYXNlICdsZWF2ZSc6XG4gICAgICByZXR1cm4gey4uLnN0YXRlLCBob3ZlcjogZmFsc2V9XG4gICAgZGVmYXVsdDpcbiAgICAgIHJldHVybiBzdGF0ZVxuICB9XG59XG5cbi8vIFRPRE8gdXNlIGNsYXNzTmFtZSBpbnN0ZWFkIG9mIGNsYXNzZXMgP1xuY29uc3QgU2Vla2JhciA9ICh7XG4gIHN0eWxlLFxuICBjbGFzc2VzLFxuICBjdXJyZW50VGltZSxcbiAgYnVmZmVyVGltZSxcbiAgZHVyYXRpb24sXG4gIG1hcmtzLFxuICBhZGRvbnMgPSBbXSxcbiAgcGxheSxcbiAgcGF1c2UsXG4gIHNlZWssXG59KSA9PiB7XG4gIGNvbnN0IFtwb2ludGVyU3RhdGUsIGRpc3BhdGNoUG9pbnRlcl0gPSB1c2VSZWR1Y2VyKHJlZHVjZVBvaW50ZXIsIHt9KVxuICBjb25zdCBwb2ludGVyQWN0aXZlID0gcG9pbnRlclN0YXRlLmhvdmVyIHx8IHBvaW50ZXJTdGF0ZS5mb2N1c2VkXG4gIGNvbnN0IGRpc3BsYXlUaW1lID0gcG9pbnRlckFjdGl2ZSA/IHBvaW50ZXJTdGF0ZS52YWx1ZSA6IGN1cnJlbnRUaW1lXG4gIC8vIHRvIHJlZmxlY3QgYm91bmRhcnkgd2hlbiBjb250YWluZXIgcmVzaXplZFxuICBjb25zdCB7cmVmfSA9IHVzZURpbWVuc2lvbnMoKVxuICBjb25zdCByZWN0ID0gcmVmLmN1cnJlbnQ/LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpXG4gIGNvbnN0IGhhbmRsZXJzID0gc2VlayAmJiB7XG4gICAgb25Qb2ludGVyTW92ZTogKF8sIHt2YWx1ZSwgeH0pID0+IGRpc3BhdGNoUG9pbnRlcih7dHlwZTogJ21vdmUnLCB2YWx1ZSwgeH0pLFxuICAgIG9uUG9pbnRlckxlYXZlOiAoKSA9PiBkaXNwYXRjaFBvaW50ZXIoe3R5cGU6ICdsZWF2ZSd9KSxcbiAgICBvbkNoYW5nZTogKF8sIHt2YWx1ZX0pID0+IHtcbiAgICAgIHBhdXNlKClcbiAgICAgIGRpc3BhdGNoUG9pbnRlcih7dHlwZTogJ2NoYW5nZScsIHZhbHVlfSlcbiAgICB9LFxuICAgIC8vIHBsYXkgd2lsbCBiZSB0cmlnZ2VyZWQgaW4gb3BlcmF0b3Iuc2Vla1xuICAgIG9uQ2hhbmdlQ29tbWl0dGVkOiAoXywge3ZhbHVlfSkgPT4ge1xuICAgICAgZGlzcGF0Y2hQb2ludGVyKHt0eXBlOiAncmVsZWFzZScsIHZhbHVlfSlcbiAgICAgIHNlZWsodmFsdWUpXG4gICAgICBwbGF5KClcbiAgICB9LFxuICB9XG5cbiAgcmV0dXJuIChcbiAgICA8ZGl2XG4gICAgICByZWY9e3JlZn1cbiAgICAgIGNsYXNzTmFtZT1cImtrcy1wbGF5ZXJfX3NlZWstYmFyXCJcbiAgICAgIGNzcz17W3NlZWtiYXJTdHlsZSwgc3R5bGVdfVxuICAgICAgc3R5bGU9e1xuICAgICAgICByZWN0ICYmIHtcbiAgICAgICAgICAnLS1zZWVrYmFyLWxlZnQnOiBgJHtyZWN0LmxlZnR9cHhgLFxuICAgICAgICAgICctLXNlZWtiYXItcmlnaHQnOiBgJHtyZWN0LnJpZ2h0fXB4YCxcbiAgICAgICAgICAnLS1wb2ludGVyLXgnOiBgJHtwb2ludGVyU3RhdGUueH1weGAsXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICA+XG4gICAgICB7Zm9ybWF0dGVkVGltZShkaXNwbGF5VGltZSl9XG4gICAgICA8Q2xhc3NOYW1lcz5cbiAgICAgICAgeyh7Y3NzfSkgPT4gKFxuICAgICAgICAgIDxTaW1wbGVTbGlkZXJcbiAgICAgICAgICAgIGNzcz17c2xpZGVyU3R5bGV9XG4gICAgICAgICAgICBjbGFzc2VzPXt7XG4gICAgICAgICAgICAgIHRyYWNrOiBjc3Moe2JhY2tncm91bmRDb2xvcjogJ3JlZCd9KSxcbiAgICAgICAgICAgICAgLi4uZ2V0U2xpZGVyU3R5bGUoY3NzKSxcbiAgICAgICAgICAgICAgLi4uY2xhc3NlcyxcbiAgICAgICAgICAgIH19XG4gICAgICAgICAgICBzZWNvbmRhcnlUcmFja1ZhbHVlPXtidWZmZXJUaW1lfVxuICAgICAgICAgICAgdmFsdWU9e2N1cnJlbnRUaW1lfVxuICAgICAgICAgICAgbWF4PXtkdXJhdGlvbn1cbiAgICAgICAgICAgIG1hcmtzPXttYXJrc31cbiAgICAgICAgICAgIHsuLi5oYW5kbGVyc31cbiAgICAgICAgICAvPlxuICAgICAgICApfVxuICAgICAgPC9DbGFzc05hbWVzPlxuICAgICAge2Zvcm1hdHRlZFRpbWUoZHVyYXRpb24pfVxuICAgICAge3BvaW50ZXJBY3RpdmUgJiZcbiAgICAgICAgYWRkb25zLm1hcChDb21wb25lbnQgPT4gPENvbXBvbmVudCB0aW1lPXtwb2ludGVyU3RhdGUudmFsdWV9IC8+KX1cbiAgICA8L2Rpdj5cbiAgKVxufVxuXG5TZWVrYmFyLnByb3BUeXBlcyA9IHtcbiAgc3R5bGU6IFByb3BUeXBlcy5vYmplY3QsXG4gIGNsYXNzZXM6IFByb3BUeXBlcy5vYmplY3QsXG4gIGN1cnJlbnRUaW1lOiBQcm9wVHlwZXMubnVtYmVyLFxuICBidWZmZXJUaW1lOiBQcm9wVHlwZXMubnVtYmVyLFxuICBkdXJhdGlvbjogUHJvcFR5cGVzLm51bWJlcixcbiAgbWFya3M6IFByb3BUeXBlcy5hcnJheSxcbiAgYWRkb25zOiBQcm9wVHlwZXMuYXJyYXksXG4gIHBsYXk6IFByb3BUeXBlcy5mdW5jLFxuICBwYXVzZTogUHJvcFR5cGVzLmZ1bmMsXG4gIHNlZWs6IFByb3BUeXBlcy5mdW5jLFxufVxuXG5leHBvcnQgZGVmYXVsdCBTZWVrYmFyXG4iXX0= */',
    ],
    style: rect && {
      '--seekbar-left': `${rect.left}px`,
      '--seekbar-right': `${rect.right}px`,
      '--pointer-x': `${pointerState.x}px`,
    },
    children: [
      formattedTime(displayTime),
      jsx$1(ClassNames, {
        children: ({css}) =>
          jsx$1(SimpleSlider, {
            css: sliderStyle,
            classes: {
              track: css({
                backgroundColor: 'red',
              }),
              ...getSliderStyle(css),
              ...classes,
            },
            secondaryTrackValue: bufferTime,
            value: currentTime,
            max: duration,
            marks: marks,
            ...handlers,
          }),
      }),
      formattedTime(duration),
      pointerActive &&
        addons.map(Component =>
          jsx$1(Component, {
            time: pointerState.value,
          })
        ),
    ],
  })
}

Seekbar.propTypes = {
  style: propTypes.object,
  classes: propTypes.object,
  currentTime: propTypes.number,
  bufferTime: propTypes.number,
  duration: propTypes.number,
  marks: propTypes.array,
  addons: propTypes.array,
  play: propTypes.func,
  pause: propTypes.func,
  seek: propTypes.func,
}

/* @jsxImportSource @emotion/react */
const rotateInfinite$1 = keyframes`
  0% {
    transform: translate(-50%, -50%) rotate(0deg);
  }
  100%  {
    transform: translate(-50%, -50%) rotate(360deg); 
  }
`
const style$9 = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  display: 'block',
  height: '3em',
  width: '3em',
  border: '0.25em solid #f22e05',
  borderRightColor: 'transparent',
  borderRadius: '50%',
  animation: `${rotateInfinite$1} 1.2s linear infinite`,
}

const LoadingSpinner = () =>
  jsx$1('div', {
    className: 'kks-player__loading',
    css: style$9,
  })

/* eslint-disable no-param-reassign */
const sizes$2 = {
  'small-embed': 200,
  embed: 400,
  'tablet-portrait': 600,
  'tablet-landscape': 900,
  desktop: 1200,
}

const useLinkState = subscribe => {
  const [state, setState] = useState({})
  useEffect(() => {
    const unsubscribe = subscribe(setState)
    return () => unsubscribe()
  }, [])
  return state
}

const VideoPlayer = ({
  style,
  source,
  autoplay,
  startTime,
  autohide,
  seekbar = {},
  plugins,
  bitmovin,
  children,
  videoRef,
  playerRef,
  getLayoutProps,
  onPlayerLoaded,
  // TODO custom Layout
  Layout = DefaultLayout,
  ...videoAttributes
}) => {
  const videoContainer = useRef()
  const videoElement = useRef()
  const [player, setPlayer] = useState()
  useEffect(() => {
    loadPlayer(videoElement.current, {
      container: videoContainer.current,
      autoplay,
      bitmovin,
    }).then(bitmovinPlayer => {
      setPlayer(bitmovinPlayer)
      onPlayerLoaded === null || onPlayerLoaded === void 0
        ? void 0
        : onPlayerLoaded(bitmovinPlayer)

      if (playerRef) {
        playerRef.curret = bitmovinPlayer
      }
    })
    return () =>
      player === null || player === void 0 ? void 0 : player.destroy()
  }, [])
  useEffect(() => {
    if (source && player) {
      load(
        videoElement.current,
        {
          player,
          plugins,
        },
        source
      )
    }
  }, [player, source])
  const uiType = isDesktop() ? 'desktop' : 'mobile'
  const {
    paused,
    ended,
    waiting,
    currentTime,
    duration,
    bufferTime,
    seekEnabled,
  } = useLinkState(setState =>
    subscribeMediaState(videoElement.current, setState, plugins)
  )
  const {mode, onClick, onMouseMove} = useAutoHide({
    pinned: !autohide || paused || waiting,
    tapToHide: uiType === 'mobile',
  })
  const {width, currentBreakpoint: size, ref: containerRef} = useDimensions({
    polyfill: ResizeObserver,
    breakpoints: sizes$2,
  })
  const layoutProps =
    (getLayoutProps === null || getLayoutProps === void 0
      ? void 0
      : getLayoutProps({
          type: uiType,
          mode,
          width,
          size,
        })) || {}
  return /*#__PURE__*/ jsx(Layout, {
    style: style,
    type: uiType,
    display: mode,
    size: size,
    video: /*#__PURE__*/ jsx('div', {
      style: {
        position: 'absolute',
        zIndex: '-1',
        height: '100%',
      },
      ref: videoContainer,
      children: /*#__PURE__*/ jsx('video', {
        data: 'playcraft-video',
        ref: element => {
          if (videoRef) {
            videoRef.current = element
          }

          videoElement.current = element
        },
        muted: true,
        ...videoAttributes,
      }),
    }),
    containerRef: containerRef,
    seekbar:
      Number.isFinite(duration) &&
      /*#__PURE__*/ jsx(Seekbar, {
        currentTime: currentTime,
        bufferTime: bufferTime,
        duration: duration,
        marks: seekbar.marks,
        addons: seekbar.addons,
        ...(seekEnabled && {
          play: () => player.play(),
          pause: () => videoElement.current.pause(),
          seek: time =>
            seek(
              videoElement.current,
              {
                player,
                plugins,
              },
              time
            ),
        }),
      }),
    ...layoutProps,
    controlButtons: {
      playButton: /*#__PURE__*/ jsx(PlayButton$1, {
        ended: ended,
        paused: paused,
        onClick: () =>
          playOrPause(videoElement.current, {
            player,
          }),
      }),
      // TOOD add support for preload
      ...layoutProps.controlButtons,
    },
    backItems: waiting
      ? /*#__PURE__*/ jsx(LoadingSpinner, {})
      : layoutProps.backItems,
    onClick: onClick,
    onMouseMove: onMouseMove,
    children: children,
  })
}

VideoPlayer.propTypes = {
  style: propTypes.object,
  source: propTypes.object,
  autoplay: propTypes.bool,
  startTime: propTypes.number,
  autohide: propTypes.bool,
  seekbar: propTypes.object,
  plugins: propTypes.array,
  bitmovin: propTypes.object,
  children: propTypes.node,
  getLayoutProps: propTypes.func,
  onPlayerLoaded: propTypes.func,
  videoRef: propTypes.object,
  playerRef: propTypes.object,
  Layout: propTypes.elementType,
}

const useStore = (...args) => {
  const store = useContext(Context.Adapter)
  return store.useStore(...args)
}

const getAutoplayNextActive = ({Player, API, UI}) => {
  var _API$content,
    _API$content$time,
    _Player$process,
    _Player$progress,
    _API$content2,
    _API$content2$recomme

  const endStartSeconds =
    ((_API$content = API.content) === null || _API$content === void 0
      ? void 0
      : (_API$content$time = _API$content.time) === null ||
        _API$content$time === void 0
      ? void 0
      : _API$content$time.endStart) ||
    ((_Player$process = Player.process) === null || _Player$process === void 0
      ? void 0
      : _Player$process.duration) - 10
  const endStatus = Player.ended
    ? 'ended'
    : ((_Player$progress = Player.progress) === null ||
      _Player$progress === void 0
        ? void 0
        : _Player$progress.progressTime) >= endStartSeconds
    ? 'endroll'
    : 'none'
  return (
    Boolean(
      (_API$content2 = API.content) === null || _API$content2 === void 0
        ? void 0
        : (_API$content2$recomme = _API$content2.recommend) === null ||
          _API$content2$recomme === void 0
        ? void 0
        : _API$content2$recomme.next
    ) &&
    endStatus === UI.offerAutoplayWhen &&
    UI.streamEvents.length === 0
  )
}

/* eslint-disable indent */

const getPlaybackInfo = ({Module, API, Player, UI}, options) => {
  var _UI$streamEvents, _API$content, _UI$ad

  const {
    contentType,
    title,
    subtitle,
    end,
    start_time: startTime,
    end_time: endTime,
  } = API.content || {}
  const {seeking, seekbarFocused, isSettingsOpen, activePanel, ad} = UI
  const status =
    Module.state === ModuleState.ERROR
      ? 'error'
      : Module.castState === CastState.CONNECTED
      ? 'casting'
      : end
      ? 'linearEnded'
      : Module.state !== ModuleState.READY &&
        Module.state !== ModuleState.INITIALIZED
      ? 'loading'
      : Player.playerState === PlayerState$1.PLAYING
      ? 'playing'
      : Player.playerState === PlayerState$1.STALLING
      ? 'buffering'
      : 'paused'
  const ready = Module.state === ModuleState.READY
  const focused =
    seekbarFocused || seeking || isSettingsOpen || activePanel != null
  const controlsDisplay =
    options.autoplayNext &&
    getAutoplayNextActive({
      Player,
      API,
      UI,
    })
      ? 'hidden'
      : undefined
  const programTime = startTime
    ? `${convertToTimeString(
        new Date(startTime * 1000),
        'HH:mm'
      )} - ${convertToTimeString(new Date(endTime * 1000), 'HH:mm')}`
    : ''
  const channelTitle = subtitle && `${programTime} ${subtitle}`
  const adMarks =
    (_UI$streamEvents = UI.streamEvents) === null || _UI$streamEvents === void 0
      ? void 0
      : _UI$streamEvents.map(event => event.start)
  const adRemainingTime = formattedTime(
    Math.ceil(Player.progress.adRemainingTime)
  )
  const adStatus =
    ad.total > 0 && `Ad ${ad.position} of ${ad.total}・${adRemainingTime}`
  const adUrl = ad.clickThroughUrl
  const adSkipTimeOffset =
    ((_API$content = API.content) === null || _API$content === void 0
      ? void 0
      : _API$content.contentType) === 'lives'
      ? -1
      : (_UI$ad = UI.ad) === null || _UI$ad === void 0
      ? void 0
      : _UI$ad.skipTimeOffset
  const seekable = contentType === 'videos' && !(ad.total > 0)
  const subtitlesContent = UI.subtitlesContent
  return {
    status,
    ready,
    seekable,
    focused,
    controlsDisplay,
    title,
    channelTitle,
    activePanel: !isSettingsOpen && activePanel,
    adMarks,
    adStatus,
    adUrl,
    adSkipTimeOffset,
    subtitlesContent,
  }
}

const useUiActions = () => {
  const {dispatch} = useContext(Context.Module)
  return {
    toggleRecommendationPanel: () =>
      dispatch(UiAction.toggleRecommendationPanel()),
    hidePanel: () => dispatch(UiAction.hidePanel()),
    offerAutoplay: () => dispatch(UiAction.offerAutoplay()),
  }
}

/* @jsxImportSource @emotion/react */
const imageStyle$1 = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  width: '100%',
  height: '100%',
  objectFit: 'contain',
  transform: 'translate(-50%, -50%)',
}

const CoverImageWrap = ({url, children}) => {
  const {
    state: {state: moduleState},
  } = useContext(Context.Module)
  return url &&
    [
      ModuleState.UNINITIALIZATION,
      ModuleState.INITIALIZING,
      ModuleState.INITIALIZED,
    ].includes(moduleState)
    ? jsx$1('img', {
        css: imageStyle$1,
        src: url,
      })
    : children
}

CoverImageWrap.propTypes = {
  url: propTypes.string,
  children: propTypes.node,
}

/* eslint-disable indent */

const getPlaybackState = ({Module, Player}) => ({
  status:
    Module.state === ModuleState.INITIALIZED
      ? 'init'
      : Module.state === ModuleState.LOADING
      ? 'loading'
      : Player.playerState === PlayerState$1.PLAYING
      ? 'playing'
      : Player.playerState === PlayerState$1.ENDED
      ? 'replay'
      : 'paused',
  loading:
    Module.state !== ModuleState.READY &&
    Module.state !== ModuleState.INITIALIZED,
})

/* @jsxImportSource @emotion/react */
const style$8 = {
  zIndex: 7,
  position: 'fixed',
  padding: '8px 12px',
  borderRadius: 4,
  textAlign: 'center',
  color: 'white',
  backgroundColor: 'rgba(51, 51, 51, 0.625)',
}

const isOverflowing = element => element.scrollWidth > element.clientWidth

const Tooltip = ({
  title,
  bottom = '0px',
  overflowOnly,
  children,
  container = document.body,
}) => {
  const tooltipRef = useRef()
  const boxes = useRef()
  const [open, setOpen] = useState(false)
  const [position, setPosition] = useState(() => ({
    left: '100%',
  }))
  const childProps = {
    onMouseEnter: event => {
      if (!overflowOnly || isOverflowing(event.currentTarget)) {
        boxes.current = [
          event.currentTarget.getBoundingClientRect(),
          document.body.getBoundingClientRect(),
        ]
        setOpen(true)
      }
    },
    onMouseLeave: () => {
      setPosition({
        left: '100%',
      })
      setOpen(false)
    },
  }
  useEffect(() => {
    if (open) {
      const targetPosition = getPopoverPosition(
        tooltipRef.current.getBoundingClientRect(),
        ...boxes.current
      )
      targetPosition.left !== position.left && setPosition(targetPosition)
    }
  }, [open, position.left])
  return !isDesktop() && window.matchMedia('(any-hover: none)').matches
    ? children
    : jsxs(Fragment, {
        children: [
          /*#__PURE__*/ cloneElement(children, childProps),
          open &&
            /*#__PURE__*/ createPortal(
              jsx$1('div', {
                style: {
                  ...style$8,
                  ...position,
                  top: `calc(${position.top}px - ${bottom})`,
                },
                ref: tooltipRef,
                children: title,
              }),
              container
            ),
        ],
      })
}

Tooltip.propTypes = {
  title: propTypes.node,
  bottom: propTypes.string,
  overflowOnly: propTypes.bool,
  children: propTypes.node,
  container: propTypes.object,
}

const ControlsTooltip = ({children, ...props}) => {
  const {state = {}} = useContext(Context.UI) || {}
  const uiContainer = useUiContainer() // follows YouTube UX, tooltips are not shown while settings open

  return state.isSettingsOpen
    ? children
    : /*#__PURE__*/ jsx(Tooltip, {
        ...props,
        container: uiContainer,
        children: children,
      })
}

ControlsTooltip.propTypes = {
  children: propTypes.node,
}

/* eslint-disable indent */

const playAction = status =>
  status === 'init'
    ? operator.loadContent
    : status === 'playing'
    ? PlayerAction.pause()
    : status === 'replay'
    ? operator.seek(0)
    : PlayerAction.play()

const layer = {
  position: 'absolute',
  display: 'block',
  width: '100%',
  height: '100%',
  top: 0,
  left: 0,
}
const center = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}
const mask = {
  ...layer,
  ...center,
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  flexDirection: 'column',
  whiteSpace: 'pre-wrap',
  textAlign: 'center',
  color: 'white',
  userSelect: 'text',
}

/* @jsxImportSource @emotion/react */
const _style = {
  border: 'none',
  outline: 'none',
  cursor: 'pointer',
  padding: 0,
  flexShrink: 0,
  backgroundColor: 'transparent',
  userSelect: 'none',
}

const SquareButton = ({name, style, children, ...others}) =>
  jsx$1('button', {
    className: classnames('kks-player__square-button', name),
    css: [
      _style,
      center,
      style,
      process.env.NODE_ENV === 'production' ? '' : ';label:SquareButton;',
      process.env.NODE_ENV === 'production'
        ? ''
        : '/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlNxdWFyZUJ1dHRvbi5qc3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBa0JJIiwiZmlsZSI6IlNxdWFyZUJ1dHRvbi5qc3giLCJzb3VyY2VzQ29udGVudCI6WyIvKiBAanN4SW1wb3J0U291cmNlIEBlbW90aW9uL3JlYWN0ICovXG5pbXBvcnQgY2xhc3NuYW1lcyBmcm9tICdjbGFzc25hbWVzJ1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJ1xuaW1wb3J0IHtjZW50ZXJ9IGZyb20gJ3N0eWxlJ1xuXG5jb25zdCBfc3R5bGUgPSB7XG4gIGJvcmRlcjogJ25vbmUnLFxuICBvdXRsaW5lOiAnbm9uZScsXG4gIGN1cnNvcjogJ3BvaW50ZXInLFxuICBwYWRkaW5nOiAwLFxuICBmbGV4U2hyaW5rOiAwLFxuICBiYWNrZ3JvdW5kQ29sb3I6ICd0cmFuc3BhcmVudCcsXG4gIHVzZXJTZWxlY3Q6ICdub25lJyxcbn1cblxuY29uc3QgU3F1YXJlQnV0dG9uID0gKHtuYW1lLCBzdHlsZSwgY2hpbGRyZW4sIC4uLm90aGVyc30pID0+IChcbiAgPGJ1dHRvblxuICAgIGNsYXNzTmFtZT17Y2xhc3NuYW1lcygna2tzLXBsYXllcl9fc3F1YXJlLWJ1dHRvbicsIG5hbWUpfVxuICAgIGNzcz17W19zdHlsZSwgY2VudGVyLCBzdHlsZV19XG4gICAgey4uLm90aGVyc31cbiAgPlxuICAgIHtjaGlsZHJlbn1cbiAgPC9idXR0b24+XG4pXG5cblNxdWFyZUJ1dHRvbi5wcm9wVHlwZXMgPSB7XG4gIG5hbWU6IFByb3BUeXBlcy5zdHJpbmcsXG4gIHN0eWxlOiBQcm9wVHlwZXMub2JqZWN0LFxuICBjaGlsZHJlbjogUHJvcFR5cGVzLm5vZGUsXG59XG5cbmV4cG9ydCBkZWZhdWx0IFNxdWFyZUJ1dHRvblxuIl19 */',
    ],
    ...others,
    children: children,
  })

SquareButton.propTypes = {
  name: propTypes.string,
  style: propTypes.object,
  children: propTypes.node,
}

const Icon = ({style, src}) =>
  jsx$1('span', {
    className: 'kks-player__icon',
    css: /*#__PURE__*/ css(
      {
        width: 'inherit',
        height: 'inherit',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundImage: `url(${src})`,
        pointerEvents: 'none',
        touchAction: 'none',
        ...style,
      },
      process.env.NODE_ENV === 'production' ? '' : ';label:Icon;',
      process.env.NODE_ENV === 'production'
        ? ''
        : '/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkljb24uanN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQU1JIiwiZmlsZSI6Ikljb24uanN4Iiwic291cmNlc0NvbnRlbnQiOlsiLyogQGpzeEltcG9ydFNvdXJjZSBAZW1vdGlvbi9yZWFjdCAqL1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJ1xuXG5jb25zdCBJY29uID0gKHtzdHlsZSwgc3JjfSkgPT4gKFxuICA8c3BhblxuICAgIGNsYXNzTmFtZT1cImtrcy1wbGF5ZXJfX2ljb25cIlxuICAgIGNzcz17e1xuICAgICAgd2lkdGg6ICdpbmhlcml0JyxcbiAgICAgIGhlaWdodDogJ2luaGVyaXQnLFxuICAgICAgYmFja2dyb3VuZFBvc2l0aW9uOiAnY2VudGVyJyxcbiAgICAgIGJhY2tncm91bmRTaXplOiAnY292ZXInLFxuICAgICAgYmFja2dyb3VuZEltYWdlOiBgdXJsKCR7c3JjfSlgLFxuICAgICAgcG9pbnRlckV2ZW50czogJ25vbmUnLFxuICAgICAgdG91Y2hBY3Rpb246ICdub25lJyxcbiAgICAgIC4uLnN0eWxlLFxuICAgIH19XG4gIC8+XG4pXG5cbkljb24ucHJvcFR5cGVzID0ge1xuICBzdHlsZTogUHJvcFR5cGVzLm9iamVjdCxcbiAgc3JjOiBQcm9wVHlwZXMuc3RyaW5nLFxufVxuSWNvbi5kZWZhdWx0UHJvcHMgPSB7XG4gIHN0eWxlOiB7fSxcbn1cblxuZXhwb3J0IGRlZmF1bHQgSWNvblxuIl19 */'
    ),
  })

Icon.propTypes = {
  style: propTypes.object,
  src: propTypes.string,
}
Icon.defaultProps = {
  style: {},
}

const IconButton = ({
  name = '',
  src,
  style = {},
  onClick = () => {},
  ...others
}) =>
  /*#__PURE__*/ jsx(SquareButton, {
    style: style,
    name: name,
    onClick: onClick,
    ...others,
    children: /*#__PURE__*/ jsx(Icon, {
      src: src,
      style: style.icon,
    }),
  })

IconButton.propTypes = {
  src: propTypes.string.isRequired,
  name: propTypes.string,
  tooltip: propTypes.string,
  onClick: propTypes.func,
  style: propTypes.shape({
    icon: propTypes.object,
  }),
}

/* eslint-disable indent */

const PlayButton = () => {
  const playbackState = useStore(getPlaybackState, shallow)
  const disabled = !isDesktop() && playbackState.loading
  const status = useDebounce({
    delay: 200,
    value: playbackState.status,
  })
  const {dispatch} = useContext(Context.PlayerState)

  const buttonProps = (() => {
    switch (status) {
      case 'playing':
        return {
          src: icon.pause,
          tooltip: 'KKS.PLAYER.PAUSE',
        }

      case 'replay':
        return {
          src: icon.replay,
          tooltip: 'KKS.PLAYER.REPLAY',
        }

      default:
        return {
          src: icon.play,
          tooltip: 'KKS.PLAYER.PLAY',
        }
    }
  })()

  return /*#__PURE__*/ jsx(ControlsTooltip, {
    title: /*#__PURE__*/ jsx(Message, {
      code: buttonProps.tooltip,
    }),
    bottom: '48px',
    children: /*#__PURE__*/ jsx(IconButton, {
      name: cx(
        'play-button',
        'kks-player__play-button',
        `kks-player__play-button--${status}`
      ),
      disabled: disabled,
      ...buttonProps,
      onClick: () => dispatch(playAction(status)),
    }),
  })
}

const RewindButton = ({style}) => {
  const {
    state: {progressTime, seekTime},
    dispatch,
  } = useContext(Context.PlayerProgress)
  const {state} = useContext(Context.PlayerState)
  return (
    state !== PlayerState$1.ENDED &&
    /*#__PURE__*/ jsx(ControlsTooltip, {
      title: /*#__PURE__*/ jsx(Message, {
        code: 'KKS.PLAYER.REWIND',
      }),
      bottom: '48px',
      children: /*#__PURE__*/ jsx(IconButton, {
        style: style,
        name: 'kks-player__rewind-button',
        src: icon.rewind10,
        onClick: () =>
          dispatch(
            PlayerAction.seek(
              (seekTime !== undefined ? seekTime : progressTime) - 10
            )
          ),
      }),
    })
  )
}

RewindButton.propTypes = {
  style: propTypes.object,
}

const ForwardButton = ({style}) => {
  const {
    state: {progressTime, seekTime},
    dispatch,
  } = useContext(Context.PlayerProgress)
  const {state} = useContext(Context.PlayerState)
  return (
    state !== PlayerState$1.ENDED &&
    /*#__PURE__*/ jsx(ControlsTooltip, {
      title: /*#__PURE__*/ jsx(Message, {
        code: 'KKS.PLAYER.FORWARD',
      }),
      bottom: '48px',
      children: /*#__PURE__*/ jsx(IconButton, {
        style: style,
        name: 'kks-player__forward-button',
        src: icon.forward10,
        onClick: () =>
          dispatch(
            PlayerAction.seek(
              (seekTime !== undefined ? seekTime : progressTime) + 10
            )
          ),
      }),
    })
  )
}

ForwardButton.propTypes = {
  style: propTypes.object,
}

function _EMOTION_STRINGIFIED_CSS_ERROR__() {
  return "You have tried to stringify object returned from `css` function. It isn't supposed to be used directly (e.g. as value of the `className` prop), but rather handed to emotion so it can handle it (e.g. as value of `css` prop)."
}
const style$7 = {
  display: 'inline-flex',
  alignItems: 'center',
}
/* eslint-disable react/prop-types */

var _ref =
  process.env.NODE_ENV === 'production'
    ? {
        name: '1vats5l',
        styles: 'margin-left:0.8rem;width:4em',
      }
    : {
        name: '1vofojj-VolumeControl',
        styles: 'margin-left:0.8rem;width:4em;label:VolumeControl;',
        map:
          '/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlZvbHVtZUNvbnRyb2wuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBZ0RVIiwiZmlsZSI6IlZvbHVtZUNvbnRyb2wuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBlc2xpbnQtZGlzYWJsZSBpbmRlbnQgKi9cbi8qIEBqc3hJbXBvcnRTb3VyY2UgQGVtb3Rpb24vcmVhY3QgKi9cbmltcG9ydCBpY29uIGZyb20gJ3N0eWxlL2ljb24nXG5pbXBvcnQgVG9vbHRpcCBmcm9tICdjb21wb25lbnQvVG9vbHRpcCdcbmltcG9ydCBNZXNzYWdlIGZyb20gJ2NvbnRleHQvSTE4bi9NZXNzYWdlJ1xuaW1wb3J0IFNpbXBsZVNsaWRlciBmcm9tICdwbGF5ZXJVaS9TaW1wbGVTbGlkZXInXG5pbXBvcnQgSWNvbiBmcm9tICcuL0ljb24nXG5pbXBvcnQgQnV0dG9uIGZyb20gJy4vQnV0dG9uL1NxdWFyZUJ1dHRvbidcblxuY29uc3Qgc3R5bGUgPSB7XG4gIGRpc3BsYXk6ICdpbmxpbmUtZmxleCcsXG4gIGFsaWduSXRlbXM6ICdjZW50ZXInLFxufVxuXG4vKiBlc2xpbnQtZGlzYWJsZSByZWFjdC9wcm9wLXR5cGVzICovXG5jb25zdCBWb2x1bWVDb250cm9sID0gKHtcbiAgdXNlVm9sdW1lU3RhdGUsXG4gIGRpc3BsYXlTbGlkZXIgPSBmYWxzZSxcbiAgbWF4ID0gMSxcbiAgVG9vbHRpcENvbXBvbmVudCA9IFRvb2x0aXAsXG4gIC8qIGVzbGludC1kaXNhYmxlIHJlYWN0L3Byb3AtdHlwZXMgKi9cbn0pID0+IHtcbiAgY29uc3Qge3ZvbHVtZSwgbXV0ZWQsIGNoYW5nZVZvbHVtZSwgdG9nZ2xlTXV0ZWR9ID0gdXNlVm9sdW1lU3RhdGUoKVxuICBjb25zdCBpY29uTmFtZSA9XG4gICAgbXV0ZWQgfHwgdm9sdW1lID09PSAwXG4gICAgICA/IGljb24ubXV0ZVxuICAgICAgOiB2b2x1bWUgPCBtYXggLyAyXG4gICAgICA/IGljb24udm9sdW1lTG93XG4gICAgICA6IGljb24udm9sdW1lSGlnaHRcblxuICByZXR1cm4gKFxuICAgIDxkaXYgY2xhc3NOYW1lPVwia2tzLXBsYXllcl9fdm9sdW1lXCIgY3NzPXtzdHlsZX0+XG4gICAgICA8VG9vbHRpcENvbXBvbmVudFxuICAgICAgICB0aXRsZT17XG4gICAgICAgICAgPE1lc3NhZ2UgY29kZT17bXV0ZWQgPyAnS0tTLlBMQVlFUi5VTk1VVEUnIDogJ0tLUy5QTEFZRVIuTVVURSd9IC8+XG4gICAgICAgIH1cbiAgICAgICAgYm90dG9tPVwiNDhweFwiXG4gICAgICA+XG4gICAgICAgIDxCdXR0b25cbiAgICAgICAgICBuYW1lPVwia2tzLXBsYXllcl9fdm9sdW1lLWJ1dHRvblwiXG4gICAgICAgICAgdG9vbHRpcD17bXV0ZWQgPyAnS0tTLlBMQVlFUi5VTk1VVEUnIDogJ0tLUy5QTEFZRVIuTVVURSd9XG4gICAgICAgICAgb25DbGljaz17dG9nZ2xlTXV0ZWR9XG4gICAgICAgID5cbiAgICAgICAgICA8SWNvbiBzcmM9e2ljb25OYW1lfSAvPlxuICAgICAgICA8L0J1dHRvbj5cbiAgICAgIDwvVG9vbHRpcENvbXBvbmVudD5cbiAgICAgIHtkaXNwbGF5U2xpZGVyICYmIChcbiAgICAgICAgPFNpbXBsZVNsaWRlclxuICAgICAgICAgIGNzcz17e1xuICAgICAgICAgICAgbWFyZ2luTGVmdDogJzAuOHJlbScsXG4gICAgICAgICAgICB3aWR0aDogJzRlbScsXG4gICAgICAgICAgfX1cbiAgICAgICAgICB2YWx1ZT17bXV0ZWQgPyAwIDogdm9sdW1lfVxuICAgICAgICAgIG1heD17bWF4fVxuICAgICAgICAgIG9uQ2hhbmdlPXsoXywge3ZhbHVlfSkgPT4gY2hhbmdlVm9sdW1lKHZhbHVlKX1cbiAgICAgICAgLz5cbiAgICAgICl9XG4gICAgPC9kaXY+XG4gIClcbn1cblxuZXhwb3J0IGRlZmF1bHQgVm9sdW1lQ29udHJvbFxuIl19 */',
        toString: _EMOTION_STRINGIFIED_CSS_ERROR__,
      }

const VolumeControl$1 = ({
  useVolumeState,
  displaySlider = false,
  max = 1,
  TooltipComponent = Tooltip,
  /* eslint-disable react/prop-types */
}) => {
  const {volume, muted, changeVolume, toggleMuted} = useVolumeState()
  const iconName =
    muted || volume === 0
      ? icon.mute
      : volume < max / 2
      ? icon.volumeLow
      : icon.volumeHight
  return jsxs('div', {
    className: 'kks-player__volume',
    css: style$7,
    children: [
      jsx$1(TooltipComponent, {
        title: jsx$1(Message, {
          code: muted ? 'KKS.PLAYER.UNMUTE' : 'KKS.PLAYER.MUTE',
        }),
        bottom: '48px',
        children: jsx$1(SquareButton, {
          name: 'kks-player__volume-button',
          tooltip: muted ? 'KKS.PLAYER.UNMUTE' : 'KKS.PLAYER.MUTE',
          onClick: toggleMuted,
          children: jsx$1(Icon, {
            src: iconName,
          }),
        }),
      }),
      displaySlider &&
        jsx$1(SimpleSlider, {
          css: _ref,
          value: muted ? 0 : volume,
          max: max,
          onChange: (_, {value}) => changeVolume(value),
        }),
    ],
  })
}

const usePlayerVolume = () => {
  const {
    state: {volume, muted},
    dispatch,
  } = useContext(Context.PlayerVolume)
  return {
    volume,
    muted,
    //TODO: also unmute
    changeVolume: value => dispatch(PlayerAction.setVolume(value)),
    toggleMuted: () =>
      dispatch(muted ? PlayerAction.unmute() : PlayerAction.mute()),
  }
}

const VolumeControl = props =>
  /*#__PURE__*/ jsx(VolumeControl$1, {
    max: 100,
    TooltipComponent: ControlsTooltip,
    useVolumeState: usePlayerVolume,
    ...props,
  })

const logger = store => next => action => {
  const flag =
    action.type !== type$2.UPDATE_CURRENT_TIME &&
    action.type !== type$2.UPDATE_BUFFER_TIME &&
    action.type !== type$3.SHOW_THUMBNAIL &&
    action.type !== type$3.FOCUS_SEEK_BAR // eslint-disable-next-line no-undef

  if (process.env.NODE_ENV === 'development') {
    flag && console.debug(action.type)
    flag && console.debug('dispatching', action)
  }

  let result = next(action) // eslint-disable-next-line no-undef

  if (process.env.NODE_ENV === 'development') {
    flag && console.debug('next state', store.getState())
    flag && console.groupEnd()
  }

  return result
}

const thunk = store => next => action => {
  return typeof action === 'function' ? action(store) : next(action)
}

const createGate = check => store => next => action => {
  return check(store.getState(), action) ? next(action) : null
}

const initState$4 = {
  apiState: APIState.DISABLE,
  customHeader: null,
  drm: null,
  playbackToken: null,
  manifests: null,
  content: null,
  contentChangedTimes: 0,
  thumbnailSeekings: null,
  playback: {
    internalSync: false,
    heartbeat: true,
    updateTime: 0,
  },
}

const convertDRMToNameMap = drm => {
  return {
    playready: drm.drm__playready.url,
    widevine: drm.drm__widevine.url,
    fairplay: drm.drm__fairplay.url,
  }
}

const convertManifestToNameMap = manifests => {
  return manifests.reduce((res, item) => {
    res[item.protocol] = item
    return res
  }, {})
}

var API = (state = initState$4, action) => {
  switch (action.type) {
    case type.DISABLE:
      return initState$4

    case type.ENABLE:
      return {
        ...initState$4,
        apiState: APIState.ENABLE,
        content: action.content,
        customHeader: action.customHeader,
        contentChangedTimes: state.contentChangedTimes,
      }

    case type.CLEAN:
      return {
        ...state,
        content: {...state.content},
        playback: {...initState$4.playback},
      }

    case type.PREPARE_PLAYBACK:
      return {...state, apiState: APIState.LOADING}

    case type.SET_PLAYBACK:
      return (playbackInfo => ({
        ...state,
        drm: convertDRMToNameMap(playbackInfo.drm),
        playbackToken: playbackInfo.playbackToken,
        playingSourceType: playbackInfo.playingSourceType,
        availableSources: playbackInfo.availableSources,
        manifests: convertManifestToNameMap(playbackInfo.manifests),
        content: {...state.content, ...playbackInfo},
        thumbnailSeekings: [],
        playback: {
          heartbeat: true,
          internalSync: ItemType$1.LIVES === state.content.contentType,
          updateTime: _get(playbackInfo, 'time.last_played') || 0,
        },
      }))(action.playbackInfo)

    case type.CONTENT_CHANGE:
      return {...state, contentChangedTimes: state.contentChangedTimes + 1}

    case type.SET_THUMBNAILS:
      return {...state, thumbnailSeekings: action.thumbnails}

    case type.SET_CONTENT:
      return {...state, content: {...state.content, ...action.content}}

    case type.READY:
      return {...state, apiState: APIState.READY}

    case type.REFRESH_PLAYBACK_TOKEN:
      return action.sessionData
        ? {...state, playbackToken: action.sessionData}
        : state

    case type.UPDATE_LAST_PLAYED_TIME:
      return {...state, playback: {...state.playback, updateTime: action.time}}

    default:
      return state
  }
}

const initState$3 = {
  playerState: PlayerState$1.UNMOUNTED,
  progress: {
    progressTime: 0,
    duration: 0,
    bufferTime: 0,
  },
  volume: {
    volume: 100,
    muted: false,
  },
  viewMode: PlayerViewMode.INLINE,
  streamType: null,
  source: null,
  userAction: 'pause',
  isPlaying: false,
  seeking: false,
  ended: false,
  playingQuality: null,
}

const mergePlayerState = (state, playerState, other) => ({
  ...state,
  playerState,
  ...other,
})

const mergeProgress = (state, progress, other) => ({
  ...state,
  progress: {...state.progress, ...progress},
  ...other,
})

const mergeVolume = (state, volume, other) => ({
  ...state,
  volume: {...state.volume, ...volume},
  ...other,
})

const mergeViewMode = (state, viewMode, other) => ({
  ...state,
  viewMode,
  ...other,
})

var Player$1 = (state = initState$3, action) => {
  switch (action.type) {
    case type$2.MOUNT:
      return mergePlayerState(initState$3, PlayerState$1.MOUNTING)

    case type$2.MOUNTED:
      return mergePlayerState(state, PlayerState$1.MOUNTED)

    case type$2.UNLOAD:
      return mergePlayerState(state, PlayerState$1.LOADING, {
        ended: false,
        progress: initState$3.progress,
      })

    case type$2.UNLOADED:
      return mergePlayerState(state, PlayerState$1.MOUNTED, {
        source: null,
      })

    case type$2.READY:
      if (state.playerState === PlayerState$1.PLAYING) return state
      return mergePlayerState(state, PlayerState$1.READY)

    case type$2.SET_STATE:
      return {...state, ...action.state}

    case type$2.PLAY:
      return state.isPlaying
        ? state
        : {
            ...state,
            ...(state.ended && {
              progress: {...state.progress, progressTime: 0},
              ended: false,
            }),
            userAction: 'play',
            playerState: PlayerState$1.STALLING,
          }

    case type$2.PAUSE:
      return {...state, userAction: 'pause'}

    case type$2.PAUSED:
      return {
        ...state,
        ...(state.playerState !== PlayerState$1.STALLING && {
          playerState: PlayerState$1.PAUSED,
        }),
        isPlaying: false,
      }

    case type$2.ENDED:
      return mergePlayerState(state, PlayerState$1.ENDED, {
        isPlaying: false,
        ended: true,
      })

    case type$2.SEEK:
      return mergeProgress(
        state,
        {
          seekTime: scope(0, action.time, state.progress.duration),
        },
        {
          playerState: PlayerState$1.STALLING,
          seeking: true,
        }
      )

    case type$2.SEEKED:
      return mergeProgress(
        state,
        {
          seekTime: undefined,
          progressTime: action.time,
        },
        {
          ...(state.userAction === 'pause' && {
            playerState: PlayerState$1.PAUSED,
          }),
          seeking: false,
        }
      )

    case type$2.UPDATE_CURRENT_TIME:
      return mergeProgress(
        state,
        {
          seekTime: undefined,
          progressTime: action.time,
          adRemainingTime: action.adRemainingTime,
        },
        {
          playerState: PlayerState$1.PLAYING,
          userAction: 'play',
          isPlaying: true,
          seeking: false,
        }
      )

    case type$3.VISIBILITY_CHANGE:
      return mergePlayerState(state, PlayerState$1.STALLING)

    case type$2.UPDATE_BUFFER_TIME:
      return mergeProgress(state, {
        bufferTime: action.time,
      })

    case type$2.UPDATE_VOLUME:
      return mergeVolume(state, {
        volume: action.volume,
      })

    case type$2.MUTED:
      return mergeVolume(state, {
        muted: true,
      })

    case type$2.UNMUTED:
      return mergeVolume(state, {
        muted: false,
      })

    case type$2.UPDATE_VIEW_MODE:
      return mergeViewMode(state, action.mode)

    case type$2.STALLING:
      return mergePlayerState(state, PlayerState$1.STALLING)

    case type$2.STALLED:
      return mergePlayerState(
        state,
        state.isPlaying ? PlayerState$1.PLAYING : PlayerState$1.PAUSED
      )

    default:
      return state
  }
}

const initState$2 = {
  qualityItems: [],
  selectedQualityName: undefined,
  qualityPrecedence: 'application',
  mediaSources: [],
  selectedMediaSource: null,
  mediaSourcePrecedence: 'application',
  seekbarFocused: false,
  seeking: false,
  seekTime: 0,
  isSettingsOpen: false,
  thumbnailSeeking: true,
  recommendationPanel: {
    enabled: false,
    opening: false,
  },
  autoPlayByUI: false,
  offerAutoplayWhen: 'endroll',
  ad: {},
  subtitlesContent: {},
  error: null,
}

const getAdStatus = action => {
  const {adPosition, totalAds, clickThroughUrl} = action.adProgressData
  return {
    position: adPosition,
    total: totalAds,
    skipTimeOffset: action.skipTimeOffset,
    clickThroughUrl,
  }
}

var UI = (state = initState$2, action) => {
  switch (action.type) {
    case type$3.SELECT_QUALITY:
      return {
        ...state,
        qualityPrecedence: 'user',
        selectedQualityName: action.to,
      }

    case type$3.SET_QUALITY_ITEMS:
      return {...state, qualityItems: action.items}

    case type$3.SELECT_MEDIA_SOURCE:
      return {
        ...state,
        mediaSourcePrecedence: 'user',
        selectedMediaSource: action.mediaSource,
      }

    case type$3.SET_MEDIA_SOURCES:
      return {...state, mediaSources: action.items}

    case type$3.CHANGE_THUMBNAIL_SEEKING:
      return {...state, thumbnailSeeking: action.enabled}

    case type$3.CHANGE_RECOMMENDATION_PANEL:
      return {
        ...state,
        recommendationPanel: {
          enabled: action.enabled,
          opening: action.enabled && state.recommendationPanel.opening,
        },
        activePanel:
          action.enabled && state.recommendationPanel.opening
            ? 'recommendation'
            : undefined,
      }

    case type$3.TOGGLE_RECOMMENDATION_PANEL:
      return {
        ...state,
        ...(state.recommendationPanel.enabled && {
          recommendationPanel: {
            ...state.recommendationPanel,
            opening: !state.recommendationPanel.opening,
          },
          activePanel: state.recommendationPanel.opening
            ? undefined
            : 'recommendation',
        }),
      }

    case type$3.OPEN_PANEL:
      return {...state, activePanel: action.panel}

    case type$3.HIDE_PANEL:
      return {...state, activePanel: undefined}

    case type$3.OFFER_AUTOPLAY:
      return {
        ...state,
        isSettingsOpen: false,
        activePanel: undefined,
        recommendationPanel: {...state.recommendationPanel, opening: false},
      }

    case type$3.DISMISS_AUTOPLAY:
      return {
        ...state,
        offerAutoplayWhen:
          state.offerAutoplayWhen === 'ended' ? 'endroll' : 'ended',
        openRecommendationAfterEnd: false,
        ...(state.openRecommendationAfterEnd &&
          state.recommendationPanel.enabled && {
            activePanel: 'recommendation',
            recommendationPanel: {
              enabled: true,
              opening: true,
            },
          }),
      }

    case type$3.SHOW_MENU:
      return {...state, isSettingsOpen: true}

    case type$3.CHANGE_SETTINGS:
      return {...state, isSettingsOpen: false}

    case type$3.HIDE_MENU:
      return {...state, isSettingsOpen: false}

    case type$3.SET_AUTO_PLAY:
      return {...state, autoPlayByUI: action.autoPlay}

    case type$3.ERROR:
      return {...state, isSettingsOpen: false, error: action.error}

    case type$3.FOCUS_SEEK_BAR:
      return {...state, seekbarFocused: true, seekTime: action.seekTime}

    case type$3.DRAG:
    case type$3.DRAG_SEEK_BAR:
      return {...state, seeking: true}

    case type$3.DROP:
    case type$3.DROP_SEEK_BAR:
      return {...state, seeking: false}

    case type$3.LEAVE_SEEK_BAR:
      return {...state, seekbarFocused: false}

    case type$3.CHANGE_NEXT_EPISODE:
      return {
        ...state,
        openRecommendationAfterEnd: false,
        offerAutoplayWhen: 'endroll',
      }

    case type.CONTENT_CHANGE:
      return {
        ...state,
        ad: {},
        streamEvents: [],
        openRecommendationAfterEnd: false,
        activePanel: undefined,
        recommendationPanel: {...state.recommendationPanel, opening: false},
      }

    case type$2.ENDED:
      return {
        ...state,
        openRecommendationAfterEnd: true,
        ...(state.offerAutoplayWhen === 'endroll' &&
          state.recommendationPanel.enabled && {
            activePanel: 'recommendation',
            recommendationPanel: {
              enabled: true,
              opening: true,
            },
          }),
      }

    case type$3.STREAM_EVENTS_CHANGED:
      return {...state, streamEvents: action.streamEvents}

    case type$3.AD_BREAK_STARTED:
      return {...state, ad: getAdStatus(action)}

    case type$3.AD_BREAK_ENDED:
      return {
        ...state,
        ad: {
          total: 0,
        },
      }

    case type$3.UPDATE_SUBTITLES_CONTENT:
      return {...state, subtitlesContent: action.content}

    default:
      return state
  }
}

const initState$1 = {
  [StorageKey.VOLUME]: {
    volume: 100,
    muted: false,
  },
}
var LocalStorage = (state = initState$1, action) => {
  switch (action.type) {
    case type$1.LOAD:
      return {...state, [action.key]: action.value}

    case type$1.SAVE:
      return {...state, [action.key]: action.value}
  }

  return state
}

const initState = {
  state: ModuleState.UNINITIALIZATION,
  castState: CastState.NOT_CONNECTED,
  error: [],
}

const Module = (state = initState, action) => {
  switch (action.type) {
    case type$4.INITIALIZE:
      return {...state, state: ModuleState.INITIALIZING}

    case type$4.INITIALIZED:
      return {...state, state: ModuleState.INITIALIZED}

    case type$4.LOAD_CONTENT:
      return {...state, state: ModuleState.LOADING}

    case type$4.READY_TO_PLAY:
      return {...state, state: ModuleState.READY}

    case type$4.CAST_STATE_CHAGNE:
      return {...state, castState: action.castState}

    case type$4.ERROR:
      return {
        state: ModuleState.ERROR,
        error: state.error.concat(action),
      }

    default:
      return state
  }
}

var reducer = combineReducer({
  Module,
  LocalStorage,
  API,
  Player: Player$1,
  UI,
})

var createStore = () => {
  let state = reducer(
    {},
    {
      type: 'DEFAULT_VALUE',
    }
  )
  let changeListeners = []
  let dispatchListeners = []
  const store = {}
  const errorGate = createGate(
    (state, action) =>
      state.Module.state !== ModuleState.ERROR ||
      action === operator.error ||
      action.type === type.CLEAN ||
      action.type === type$2.UNLOAD ||
      action.type === type$2.UNLOADED ||
      action.type === type$2.LEAVE_FULL_SCREEN ||
      action.type === type$4.BACK
  )
  const middlewares = [_localStorage, errorGate, thunk, logger]
  const applyMiddlewares = middlewares
    .map(middleware => middleware(store))
    .concat(action => action)
    .reduceRight((a, b) => b(a))

  const createRegister = listeners => callback => {
    listeners.push(callback)
    return () => {
      const index = listeners.indexOf(callback)
      if (index >= 0) listeners.splice(index, 1)
    }
  }

  const zustand = create(
    devtools(
      redux(
        reducer,
        reducer(
          {},
          {
            type: 'DEFAULT_VALUE',
          }
        )
      )
    )
  )
  return Object.assign(store, {
    zustand,
    useStore: createHook(zustand),
    dispatch: action => {
      const oldState = state
      const finalAction = applyMiddlewares(action) || action
      state = reducer(state, finalAction)
      dispatchListeners
        .slice()
        .forEach(callback => callback(store, finalAction))

      if (state !== oldState) {
        changeListeners.slice().forEach(callback => callback(store, action))
      }

      zustand.getState().dispatch(finalAction)
      return state
    },
    getState: () => state,
    addChangedListener: createRegister(changeListeners),
    addDispatchedListener: createRegister(dispatchListeners),
  })
}

const useMenu = () => {
  const {dispatch} = useContext(Context.UI)

  const show = () => {
    if (!isDesktop()) {
      dispatch(PlayerAction.pause())
    }

    dispatch(UiAction.showMenu())
  }

  return [show]
}

const getTargetQuality = (items, suggested) => {
  const sorted = items.sort((a, b) => b - a)

  if (!suggested) {
    return sorted[0]
  }

  return sorted.find(value => value <= suggested) || sorted.slice(-1)[0]
}

const filterHlsManifestQualities = (data, {sourceUrl, maxHeight}) => {
  if (RegExp(`RESOLUTION=\\d+x${maxHeight}\\W`).test(data)) {
    return data
      .replace(
        /(#EXT-X-STREAM-INF:.*RESOLUTION=\d+x)(\d+)(.*\n)(.*)(\n)/g,
        (match, part1, height, part2, fileName, line) =>
          height <= maxHeight
            ? [part1, height, part2, new URL(fileName, sourceUrl), line].join(
                ''
              )
            : ''
      )
      .replace(
        /(#EXT-X-MEDIA:.*URI=")(.*)(")/g,
        (match, part, fileName, line) =>
          [part, new URL(fileName, sourceUrl), line].join('')
      )
  }
}

const getMaxQuality = (
  {selectedQualityName, qualityItems, qualityPrecedence},
  manifests,
  {manifestType = 'hls', quality = ''}
) => {
  const {resolutions = []} = manifests[manifestType]
  const height =
    qualityPrecedence === 'application'
      ? parseInt(quality.default || quality, 10)
      : (
          qualityItems.find(item => item.value === selectedQualityName) ||
          qualityItems[0]
        ).height
  return resolutions.find(item => item.height === height) || resolutions[0]
}

const getAdaptiveHlsUrl = async (manifests, defaultQuality, getState) => {
  const manifestUrl = manifests.hls.url
  if (!needNativeHls()) return manifestUrl
  const {data: manifest} = await axios.get(manifestUrl)
  const {
    UI: {selectedQualityName, qualityItems, qualityPrecedence},
  } = getState()

  const getFilteredManifest = () => {
    const maxQuality = getMaxQuality(
      {
        selectedQualityName,
        qualityItems,
        qualityPrecedence,
      },
      manifests,
      {
        quality: defaultQuality,
      }
    )
    const filtered = filterHlsManifestQualities(manifest, {
      sourceUrl: manifestUrl,
      maxHeight: maxQuality.height,
    })
    return filtered
      ? URL.createObjectURL(
          new Blob([filtered], {
            type: 'application/x-mpegURL',
          })
        )
      : manifestUrl
  }

  return getFilteredManifest()
}

/* eslint-disable indent */

const shouldShowVersions = mediaSources =>
  mediaSources.length > 1 || mediaSources[0]

const shouldShowQuality = (qualities, {nativeHls, qualitySelectionHack}) => {
  return (
    (!nativeHls || qualitySelectionHack) &&
    (qualities.length > 1 || qualities[0])
  )
}

const shouldShowSubtitles = subtitlesMenu =>
  subtitlesMenu.length > 0 || subtitlesMenu[0]

const shouldShowAudio = audioMenu => audioMenu.length > 1 || audioMenu[0]

const defaultQualityName = (items, quality = '') => {
  var _items$find

  const targetHeight = getTargetQuality(
    items.map(it => it.height),
    parseInt(quality.default || quality, 10)
  )
  return (_items$find = items.find(it => it.height === targetHeight)) ===
    null || _items$find === void 0
    ? void 0
    : _items$find.value
}

const speedItems = [0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2].map(value => ({
  label: `${value}x`,
  value,
}))

const getSettingSections = ({
  contentType,
  mediaSources = [],
  playingSourceType,
  qualityItems = [],
  env = {
    nativeHls: false,
    qualitySelectionHack: false,
  },
  selectedQualityName,
  subtitleItems = [],
  selectedSubtitleName,
  audioItems = [],
  selectedAudioName,
  playbackRate,
}) =>
  [
    shouldShowVersions(mediaSources) && {
      section: 'mediaSource',
      title: 'KKS.SETTING.VERSION',
      selectedValue: playingSourceType,
      items: mediaSources.map(value => ({
        value,
      })),
    },
    shouldShowQuality(qualityItems, env) && {
      section: 'quality',
      title: 'KKS.QUALITY',
      selectedValue: selectedQualityName,
      items: qualityItems,
    },
    shouldShowSubtitles(subtitleItems) && {
      section: 'subtitles',
      title: 'KKS.SUBTITLES',
      selectedValue: selectedSubtitleName,
      items: [
        ...subtitleItems,
        {
          label: 'OFF',
          value: 'off',
        },
      ],
    },
    shouldShowAudio(audioItems) && {
      section: 'audio',
      title: 'KKS.AUDIO',
      selectedValue: selectedAudioName,
      items: audioItems,
    },
    contentType !== 'lives' && {
      section: 'speed',
      title: 'KKS.SETTING.SPEED',
      selectedValue: playbackRate,
      items: speedItems,
    },
  ].filter(Boolean)

const useSettings = () => {
  var _ref,
    _player$subtitles,
    _player$subtitles2,
    _player$subtitles2$li,
    _options$quality,
    _options$quality2,
    _player$getAudio

  const {options} = useContext(Context.Module)
  const {content, playingSourceType} = useContext(Context.API).state
  const {
    qualityItems,
    mediaSources,
    selectedQualityName: defaultQuality = defaultQualityName(
      qualityItems,
      options.quality
    ),
  } = useContext(Context.UI).state
  const player = usePlayer()
  const selectedQualityName =
    (_ref =
      qualityItems.find(item => item.value === defaultQuality) ||
      qualityItems[0]) === null || _ref === void 0
      ? void 0
      : _ref.value
  const subtitleItems =
    player === null || player === void 0
      ? void 0
      : (_player$subtitles = player.subtitles) === null ||
        _player$subtitles === void 0
      ? void 0
      : _player$subtitles
          .list() // For missing tag CLOSED-CAPTIONS=NONE in .m3u8
          .filter(track => track.lang !== 'unknown')
          .map(track => ({
            label: track.label,
            value: track.lang,
          }))
  let selectedSubtitleName =
    player === null || player === void 0
      ? void 0
      : (_player$subtitles2 = player.subtitles) === null ||
        _player$subtitles2 === void 0
      ? void 0
      : (_player$subtitles2$li = _player$subtitles2
          .list()
          .find(track => track.enabled === true)) === null ||
        _player$subtitles2$li === void 0
      ? void 0
      : _player$subtitles2$li.lang
  if (!selectedSubtitleName) selectedSubtitleName = 'off'
  const audioItems =
    player === null || player === void 0
      ? void 0
      : player
          .getAvailableAudio()
          .filter(track => track.lang && track.lang !== 'und')
          .map(track => ({
            label: track.label,
            value: track.lang,
          }))
  const env = {
    nativeHls: needNativeHls(),
    qualitySelectionHack:
      (_options$quality = options.quality) === null ||
      _options$quality === void 0
        ? void 0
        : _options$quality.qualitySelectionHack,
  }
  return getSettingSections({
    contentType:
      content === null || content === void 0 ? void 0 : content.contentType,
    mediaSources,
    playingSourceType,
    qualityItems:
      (_options$quality2 = options.quality) !== null &&
      _options$quality2 !== void 0 &&
      _options$quality2.getQualityText
        ? qualityItems.map(item => ({
            ...item,
            label: options.quality.getQualityText(item),
          }))
        : qualityItems,
    env,
    selectedQualityName,
    subtitleItems,
    selectedSubtitleName,
    audioItems,
    selectedAudioName:
      player === null || player === void 0
        ? void 0
        : (_player$getAudio = player.getAudio()) === null ||
          _player$getAudio === void 0
        ? void 0
        : _player$getAudio.lang,
    playbackRate:
      player === null || player === void 0 ? void 0 : player.getPlaybackSpeed(),
  })
}

const useChangeSettings = () => {
  const {dispatch} = useContext(Context.Module)
  const player = usePlayer()
  return ({section, value}) => {
    if (section === 'mediaSource' || !player.hasEnded()) {
      player.play()
    }

    if (section === 'quality') {
      dispatch(operator.changeQuality(value))
    }

    if (section === 'mediaSource') {
      dispatch(operator.changeMediaSource(value))
    }

    if (section === 'speed') {
      player.setPlaybackSpeed(value)
    }

    if (section === 'subtitles') {
      const subtitles = player.subtitles
      subtitles.list().forEach(track => {
        const setter =
          value !== track.lang ? subtitles.disable : subtitles.enable
        setter(track.id) // Safari need to fire cueExit manually.

        if (value === 'off') subtitles.cueExit()
      })
    }

    if (section === 'audio') {
      const {id} = player
        .getAvailableAudio()
        .find(track => track.lang === value)
      player.setAudio(id)
    }
  }
}

const SettingButton = ({style}) => {
  const [showMenu] = useMenu()
  const haveSettings = useSettings().length > 0
  return (
    haveSettings &&
    /*#__PURE__*/ jsx(ControlsTooltip, {
      title: /*#__PURE__*/ jsx(Message, {
        code: 'KKS.SETTING',
      }),
      bottom: '48px',
      children: /*#__PURE__*/ jsx(IconButton, {
        style: style,
        name: 'kks-player__setting-button',
        src: icon.setting,
        onClick: event => showMenu(event),
      }),
    })
  )
}

SettingButton.propTypes = {
  style: propTypes.object,
}

/* @jsxImportSource @emotion/react */
const connectingAnimation = keyframes`
  0% {
    background-image: url("${icon.castConntecting0}");
  }
  33% {
    background-image: url("${icon.castConntecting1}");
  }
  66% {
    background-image: url("${icon.castConntecting2}");
  }
  100% {
    background-image: url("${icon.castConntecting0}");
  }
`
const styles$1 = {
  button: {
    display: 'none',
    '&:empty': {
      padding: 0,
      flexShrink: 0,
      border: 'none',
      outline: 'none',
      backgroundColor: 'transparent',
      cursor: 'pointer',
      '&:after': {
        content: '""',
        display: 'block',
        width: '100%',
        height: '100%',
        backgroundSize: 'cover',
        opacity: '.8',
        filter: 'invert(100%)',
      },
    },
  },
  [CastState.NOT_CONNECTED]: {
    display: 'inline-flex',
    '&:empty::after': {
      backgroundImage: `url("${icon.castNotConnected}")`,
    },
  },
  [CastState.CONNECTING]: {
    display: 'inline-flex',
    '&:empty::after': {
      animation: `${connectingAnimation} 3s infinite`,
    },
  },
  [CastState.CONNECTED]: {
    display: 'inline-flex',
    '&:empty::after': {
      backgroundImage: `url("${icon.castConnected}")`,
    },
  },
}

const CastButton = ({castState, children, style, ...props}) =>
  jsx$1('button', {
    className: classnames(
      'kks-player__castbtn',
      castState && `kks-player__castbtn--${castState.toLocaleLowerCase()}`
    ),
    css: [
      styles$1.button,
      styles$1[castState],
      style,
      process.env.NODE_ENV === 'production' ? '' : ';label:CastButton;',
      process.env.NODE_ENV === 'production'
        ? ''
        : '/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkNhc3RCdXR0b24uanN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQXNFSSIsImZpbGUiOiJDYXN0QnV0dG9uLmpzeCIsInNvdXJjZXNDb250ZW50IjpbIi8qIEBqc3hJbXBvcnRTb3VyY2UgQGVtb3Rpb24vcmVhY3QgKi9cbmltcG9ydCB7a2V5ZnJhbWVzfSBmcm9tICdAZW1vdGlvbi9yZWFjdCdcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcydcbmltcG9ydCBjbGFzc25hbWVzIGZyb20gJ2NsYXNzbmFtZXMnXG5cbmltcG9ydCB7Q2FzdFN0YXRlfSBmcm9tICdFbnVtJ1xuaW1wb3J0IGljb24gZnJvbSAnc3R5bGUvaWNvbidcblxuY29uc3QgY29ubmVjdGluZ0FuaW1hdGlvbiA9IGtleWZyYW1lc2BcbiAgMCUge1xuICAgIGJhY2tncm91bmQtaW1hZ2U6IHVybChcIiR7aWNvbi5jYXN0Q29ubnRlY3RpbmcwfVwiKTtcbiAgfVxuICAzMyUge1xuICAgIGJhY2tncm91bmQtaW1hZ2U6IHVybChcIiR7aWNvbi5jYXN0Q29ubnRlY3RpbmcxfVwiKTtcbiAgfVxuICA2NiUge1xuICAgIGJhY2tncm91bmQtaW1hZ2U6IHVybChcIiR7aWNvbi5jYXN0Q29ubnRlY3RpbmcyfVwiKTtcbiAgfVxuICAxMDAlIHtcbiAgICBiYWNrZ3JvdW5kLWltYWdlOiB1cmwoXCIke2ljb24uY2FzdENvbm50ZWN0aW5nMH1cIik7XG4gIH1cbmBcblxuY29uc3Qgc3R5bGVzID0ge1xuICBidXR0b246IHtcbiAgICBkaXNwbGF5OiAnbm9uZScsXG4gICAgJyY6ZW1wdHknOiB7XG4gICAgICBwYWRkaW5nOiAwLFxuICAgICAgZmxleFNocmluazogMCxcbiAgICAgIGJvcmRlcjogJ25vbmUnLFxuICAgICAgb3V0bGluZTogJ25vbmUnLFxuICAgICAgYmFja2dyb3VuZENvbG9yOiAndHJhbnNwYXJlbnQnLFxuICAgICAgY3Vyc29yOiAncG9pbnRlcicsXG4gICAgICAnJjphZnRlcic6IHtcbiAgICAgICAgY29udGVudDogJ1wiXCInLFxuICAgICAgICBkaXNwbGF5OiAnYmxvY2snLFxuICAgICAgICB3aWR0aDogJzEwMCUnLFxuICAgICAgICBoZWlnaHQ6ICcxMDAlJyxcbiAgICAgICAgYmFja2dyb3VuZFNpemU6ICdjb3ZlcicsXG4gICAgICAgIG9wYWNpdHk6ICcuOCcsXG4gICAgICAgIGZpbHRlcjogJ2ludmVydCgxMDAlKScsXG4gICAgICB9LFxuICAgIH0sXG4gIH0sXG4gIFtDYXN0U3RhdGUuTk9UX0NPTk5FQ1RFRF06IHtcbiAgICBkaXNwbGF5OiAnaW5saW5lLWZsZXgnLFxuICAgICcmOmVtcHR5OjphZnRlcic6IHtcbiAgICAgIGJhY2tncm91bmRJbWFnZTogYHVybChcIiR7aWNvbi5jYXN0Tm90Q29ubmVjdGVkfVwiKWAsXG4gICAgfSxcbiAgfSxcbiAgW0Nhc3RTdGF0ZS5DT05ORUNUSU5HXToge1xuICAgIGRpc3BsYXk6ICdpbmxpbmUtZmxleCcsXG4gICAgJyY6ZW1wdHk6OmFmdGVyJzoge1xuICAgICAgYW5pbWF0aW9uOiBgJHtjb25uZWN0aW5nQW5pbWF0aW9ufSAzcyBpbmZpbml0ZWAsXG4gICAgfSxcbiAgfSxcbiAgW0Nhc3RTdGF0ZS5DT05ORUNURURdOiB7XG4gICAgZGlzcGxheTogJ2lubGluZS1mbGV4JyxcbiAgICAnJjplbXB0eTo6YWZ0ZXInOiB7XG4gICAgICBiYWNrZ3JvdW5kSW1hZ2U6IGB1cmwoXCIke2ljb24uY2FzdENvbm5lY3RlZH1cIilgLFxuICAgIH0sXG4gIH0sXG59XG5cbmNvbnN0IENhc3RCdXR0b24gPSAoe2Nhc3RTdGF0ZSwgY2hpbGRyZW4sIHN0eWxlLCAuLi5wcm9wc30pID0+IChcbiAgPGJ1dHRvblxuICAgIGNsYXNzTmFtZT17Y2xhc3NuYW1lcyhcbiAgICAgICdra3MtcGxheWVyX19jYXN0YnRuJyxcbiAgICAgIGNhc3RTdGF0ZSAmJiBga2tzLXBsYXllcl9fY2FzdGJ0bi0tJHtjYXN0U3RhdGUudG9Mb2NhbGVMb3dlckNhc2UoKX1gXG4gICAgKX1cbiAgICBjc3M9e1tzdHlsZXMuYnV0dG9uLCBzdHlsZXNbY2FzdFN0YXRlXSwgc3R5bGVdfVxuICAgIHsuLi5wcm9wc31cbiAgPlxuICAgIHtjaGlsZHJlbn1cbiAgPC9idXR0b24+XG4pXG5cbkNhc3RCdXR0b24ucHJvcFR5cGVzID0ge1xuICBjYXN0U3RhdGU6IFByb3BUeXBlcy5zdHJpbmcsXG4gIGNoaWxkcmVuOiBQcm9wVHlwZXMubm9kZSxcbiAgc3R5bGU6IFByb3BUeXBlcy5vYmplY3QsXG59XG5cbmV4cG9ydCBkZWZhdWx0IENhc3RCdXR0b25cbiJdfQ== */',
    ],
    ...props,
    children: children,
  })

CastButton.propTypes = {
  castState: propTypes.string,
  children: propTypes.node,
  style: propTypes.object,
}

const CastVideoButton = ({contentId, contentType, mediaSource, ...props}) => {
  const {
    state: {castState},
    actions: {connect, loadContent, stopCasting},
  } = useCastContext()
  const tooltip =
    castState === CastState.CONNECTED
      ? 'KKS.PLAYER.CAST.DISCONNECT'
      : 'KKS.PLAYER.CAST'

  const handleCast = () => {
    if (castState === CastState.CONNECTED) {
      stopCasting()
    } else if (contentId && contentType) {
      loadContent({
        contentId,
        contentType,
        mediaSource,
      })
    } else {
      connect()
    }
  }

  return /*#__PURE__*/ jsx(ControlsTooltip, {
    title: /*#__PURE__*/ jsx(Message, {
      code: tooltip,
    }),
    bottom: '48px',
    children: /*#__PURE__*/ jsx(CastButton, {
      castState: castState,
      onClick: handleCast,
      ...props,
    }),
  })
}

CastVideoButton.propTypes = {
  contentId: propTypes.string,
  contentType: Types.ItemType,
  mediaSource: propTypes.string,
}

const FunctionButtons = ({full = true}) => {
  const {toolPanels = []} = useOptions()
  const {dispatch} = useContext(Context.Module)
  return /*#__PURE__*/ jsxs$1(Fragment$1, {
    children: [
      full &&
        /*#__PURE__*/ jsxs$1(Fragment$1, {
          children: [
            /*#__PURE__*/ jsx(CastVideoButton, {}),
            toolPanels.map((item, index) =>
              /*#__PURE__*/ cloneElement(item.button, {
                key: index,
                onClick: () => {
                  dispatch(UiAction.openPanel(index))
                },
              })
            ),
          ],
        }),
      /*#__PURE__*/ jsx(SettingButton, {}),
    ],
  })
}

FunctionButtons.propTypes = {
  full: propTypes.bool,
}

const FullScreenButton = ({style}) => {
  const {state, dispatch} = useContext(Context.PlayerViewMode)
  const src =
    state === PlayerViewMode.INLINE
      ? icon.enterFullScreen
      : icon.leaveFullScreen
  const tooltip =
    state === PlayerViewMode.INLINE
      ? 'KKS.PLAYER.FULLSCREEN'
      : 'KKS.PLAYER.FULLSCREEN.EXIT'

  const onClick = () => {
    dispatch(
      state === PlayerViewMode.INLINE
        ? PlayerAction.enterFullScreen()
        : PlayerAction.leaveFullScreen()
    )
  }

  return /*#__PURE__*/ jsx(ControlsTooltip, {
    title: /*#__PURE__*/ jsx(Message, {
      code: tooltip,
    }),
    bottom: '48px',
    children: /*#__PURE__*/ jsx(IconButton, {
      name: classnames(
        'kks-player__full-screen-button',
        `kks-player__full-screen-button--${
          state === PlayerViewMode.INLINE ? 'inline' : 'fullscreen'
        }`
      ),
      src: src,
      onClick: onClick,
      style: style,
    }),
  })
}

FullScreenButton.propTypes = {
  style: propTypes.object,
}

const PreEpisodeButton = ({style}) => {
  const {
    state: {content},
    dispatch,
  } = useContext(Context.API)

  const preEpisode = _get(content, 'recommend.previous.id', null)

  return /*#__PURE__*/ jsx(ControlsTooltip, {
    title: /*#__PURE__*/ jsx(Message, {
      code: 'KKS.PLAYER.PREVIOUS',
    }),
    bottom: '48px',
    children: /*#__PURE__*/ jsx(IconButton, {
      style: style,
      name: 'kks-player__previous-episode-button',
      src: icon.previousEpisode,
      disabled: !preEpisode,
      onClick: () =>
        preEpisode && dispatch(UiAction.changePreviousEpisode(preEpisode)),
    }),
  })
}

PreEpisodeButton.propTypes = {
  keep: propTypes.bool,
  style: propTypes.object,
}

const NextEpisodeButton = ({style}) => {
  const {
    state: {content},
    dispatch,
  } = useContext(Context.API)

  const nextEpisode = _get(content, 'recommend.next.id', null)

  return /*#__PURE__*/ jsx(ControlsTooltip, {
    title: /*#__PURE__*/ jsx(Message, {
      code: 'KKS.PLAYER.NEXT',
    }),
    bottom: '48px',
    children: /*#__PURE__*/ jsx(IconButton, {
      style: style,
      name: 'kks-player__next-episode-button',
      src: icon.nextEpisode,
      disabled: !nextEpisode,
      onClick: () =>
        nextEpisode && dispatch(UiAction.changeNextEpisode(nextEpisode)),
    }),
  })
}

NextEpisodeButton.propTypes = {
  keep: propTypes.bool,
  style: propTypes.object,
}

const BackButton = ({style}) => {
  const {dispatch} = useContext(Context.Module)
  return /*#__PURE__*/ jsx(IconButton, {
    style: style,
    name: 'kks-player__back-button',
    src: icon.back,
    onClick: () => dispatch(Action.back()),
  })
}

BackButton.propTypes = {
  style: propTypes.object,
}

const ErrorMessage = ({errorAction}) => {
  const {error} = errorAction
  const {getMessage} = useContext(I18n.Context)
  const code = error.code || 0
  const data = {...error, code, CODE: code}
  const errorMessage =
    getMessage(error.message, data) ||
    getMessage(error.name, data) ||
    getMessage(`KKS.ERROR.${error.name}`, data) ||
    getMessage(`KKS.ERROR.${error.code}`, data) ||
    error.message
  return /*#__PURE__*/ jsx('div', {
    className: 'kks-player__error-message',
    children: errorMessage,
  })
}

ErrorMessage.propTypes = {
  errorAction: propTypes.object.isRequired,
}

/* @jsxImportSource @emotion/react */
const style$6 = {
  width: '200px',
  height: '40px',
  borderRadius: '4px',
  background: 'transparent',
  border: '1px solid',
  color: 'white',
  fontSize: '16px',
  opacity: 0.8,
  cursor: 'pointer',
  outline: 'none',
  userSelect: 'none',
}

const TextButton = ({name, onClick, text, defaultValue}) =>
  jsx$1('button', {
    className: classnames('kks-player__text-button', name),
    css: [
      style$6,
      center,
      'display:inline-block;' +
        (process.env.NODE_ENV === 'production' ? '' : ';label:TextButton;'),
      process.env.NODE_ENV === 'production'
        ? ''
        : '/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlRleHRCdXR0b24uanN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQXVCSSIsImZpbGUiOiJUZXh0QnV0dG9uLmpzeCIsInNvdXJjZXNDb250ZW50IjpbIi8qIEBqc3hJbXBvcnRTb3VyY2UgQGVtb3Rpb24vcmVhY3QgKi9cbmltcG9ydCBjbGFzc25hbWVzIGZyb20gJ2NsYXNzbmFtZXMnXG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnXG5pbXBvcnQge2NlbnRlcn0gZnJvbSAnc3R5bGUnXG5pbXBvcnQgSTE4biBmcm9tICdjb250ZXh0L0kxOG4nXG5cbmNvbnN0IHN0eWxlID0ge1xuICB3aWR0aDogJzIwMHB4JyxcbiAgaGVpZ2h0OiAnNDBweCcsXG4gIGJvcmRlclJhZGl1czogJzRweCcsXG4gIGJhY2tncm91bmQ6ICd0cmFuc3BhcmVudCcsXG4gIGJvcmRlcjogJzFweCBzb2xpZCcsXG4gIGNvbG9yOiAnd2hpdGUnLFxuICBmb250U2l6ZTogJzE2cHgnLFxuICBvcGFjaXR5OiAwLjgsXG4gIGN1cnNvcjogJ3BvaW50ZXInLFxuICBvdXRsaW5lOiAnbm9uZScsXG4gIHVzZXJTZWxlY3Q6ICdub25lJyxcbn1cblxuY29uc3QgVGV4dEJ1dHRvbiA9ICh7bmFtZSwgb25DbGljaywgdGV4dCwgZGVmYXVsdFZhbHVlfSkgPT4gKFxuICA8YnV0dG9uXG4gICAgY2xhc3NOYW1lPXtjbGFzc25hbWVzKCdra3MtcGxheWVyX190ZXh0LWJ1dHRvbicsIG5hbWUpfVxuICAgIGNzcz17W3N0eWxlLCBjZW50ZXIsIHtkaXNwbGF5OiAnaW5saW5lLWJsb2NrJ31dfVxuICAgIG9uQ2xpY2s9e29uQ2xpY2t9XG4gID5cbiAgICA8STE4bi5NZXNzYWdlIGNvZGU9e3RleHR9IGRlZmF1bHRWYWx1ZT17ZGVmYXVsdFZhbHVlfSAvPlxuICA8L2J1dHRvbj5cbilcblxuVGV4dEJ1dHRvbi5wcm9wVHlwZXMgPSB7XG4gIG5hbWU6IFByb3BUeXBlcy5zdHJpbmcsXG4gIG9uQ2xpY2s6IFByb3BUeXBlcy5mdW5jLFxuICB0ZXh0OiBQcm9wVHlwZXMuc3RyaW5nLFxuICBkZWZhdWx0VmFsdWU6IFByb3BUeXBlcy5zdHJpbmcsXG59XG5cbmV4cG9ydCBkZWZhdWx0IFRleHRCdXR0b25cbiJdfQ== */',
    ],
    onClick: onClick,
    children: jsx$1(I18n.Message, {
      code: text,
      defaultValue: defaultValue,
    }),
  })

TextButton.propTypes = {
  name: propTypes.string,
  onClick: propTypes.func,
  text: propTypes.string,
  defaultValue: propTypes.string,
}

/* @jsxImportSource @emotion/react */
const _css$2 = {
  icon: {
    width: '78px',
    height: '78px',
  },
}

const Error$1 = ({error, style, onBack}) =>
  jsxs('div', {
    className: 'kks-player__error',
    css: [
      mask,
      style,
      process.env.NODE_ENV === 'production' ? '' : ';label:Error;',
      process.env.NODE_ENV === 'production'
        ? ''
        : '/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkVycm9yLmpzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFnQnFDIiwiZmlsZSI6IkVycm9yLmpzeCIsInNvdXJjZXNDb250ZW50IjpbIi8qIEBqc3hJbXBvcnRTb3VyY2UgQGVtb3Rpb24vcmVhY3QgKi9cbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcydcbmltcG9ydCB7bWFza30gZnJvbSAnc3R5bGUnXG5pbXBvcnQgaWNvbiBmcm9tICdzdHlsZS9pY29uJ1xuaW1wb3J0IEljb24gZnJvbSAnY29tcG9uZW50L0ljb24nXG5pbXBvcnQgRXJyb3JNZXNzYWdlIGZyb20gJ2NvbXBvbmVudC9FcnJvck1lc3NhZ2UnXG5pbXBvcnQgVGV4dEJ1dHRvbiBmcm9tICdjb21wb25lbnQvQnV0dG9uL1RleHRCdXR0b24nXG5cbmNvbnN0IF9jc3MgPSB7XG4gIGljb246IHtcbiAgICB3aWR0aDogJzc4cHgnLFxuICAgIGhlaWdodDogJzc4cHgnLFxuICB9LFxufVxuXG5jb25zdCBFcnJvciA9ICh7ZXJyb3IsIHN0eWxlLCBvbkJhY2t9KSA9PiAoXG4gIDxkaXYgY2xhc3NOYW1lPVwia2tzLXBsYXllcl9fZXJyb3JcIiBjc3M9e1ttYXNrLCBzdHlsZV19PlxuICAgIDxJY29uIHN0eWxlPXtfY3NzLmljb259IHNyYz17aWNvbi53YXJuaW5nfSAvPlxuICAgIDxFcnJvck1lc3NhZ2UgZXJyb3JBY3Rpb249e2Vycm9yW2Vycm9yLmxlbmd0aCAtIDFdfSAvPlxuICAgIDxUZXh0QnV0dG9uXG4gICAgICBuYW1lPVwia2tzLXBsYXllcl9fZXJyb3JfX2JhY2stYnV0dG9uXCJcbiAgICAgIHRleHQ9XCJLS1MuQkFDS1wiXG4gICAgICBkZWZhdWx0VmFsdWU9XCJCQUNLXCJcbiAgICAgIG9uQ2xpY2s9e29uQmFja31cbiAgICAvPlxuICA8L2Rpdj5cbilcbkVycm9yLnByb3BUeXBlcyA9IHtcbiAgZXJyb3I6IFByb3BUeXBlcy5hcnJheSxcbiAgc3R5bGU6IFByb3BUeXBlcy5vYmplY3QsXG4gIG9uQmFjazogUHJvcFR5cGVzLmZ1bmMsXG59XG5FcnJvci5kZWZhdWx0UHJvcHMgPSB7XG4gIGVycm9yOiBbXSxcbiAgc3R5bGU6IHt9LFxuICBvbkJhY2s6ICgpID0+IHt9LFxufVxuXG5leHBvcnQgZGVmYXVsdCBFcnJvclxuIl19 */',
    ],
    children: [
      jsx$1(Icon, {
        style: _css$2.icon,
        src: icon.warning,
      }),
      jsx$1(ErrorMessage, {
        errorAction: error[error.length - 1],
      }),
      jsx$1(TextButton, {
        name: 'kks-player__error__back-button',
        text: 'KKS.BACK',
        defaultValue: 'BACK',
        onClick: onBack,
      }),
    ],
  })

Error$1.propTypes = {
  error: propTypes.array,
  style: propTypes.object,
  onBack: propTypes.func,
}
Error$1.defaultProps = {
  error: [],
  style: {},
  onBack: () => {},
}

/* @jsxImportSource @emotion/react */
const rotateInfinite = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100%  {
    transform: rotate(360deg); 
  }
`
const style$5 = {
  display: 'block',
  animation: `${rotateInfinite} 1.2s linear infinite`,
  border: '0.25em solid #f22e05',
  borderRightColor: 'transparent',
  borderRadius: '50%',
  height: '3em',
  width: '3em',
}

const Loading = ({css, styles}) =>
  jsx$1('div', {
    css: [
      mask,
      css,
      styles,
      process.env.NODE_ENV === 'production' ? '' : ';label:Loading;',
      process.env.NODE_ENV === 'production'
        ? ''
        : '/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkxvYWRpbmcuanN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQXlCTyIsImZpbGUiOiJMb2FkaW5nLmpzeCIsInNvdXJjZXNDb250ZW50IjpbIi8qIEBqc3hJbXBvcnRTb3VyY2UgQGVtb3Rpb24vcmVhY3QgKi9cbmltcG9ydCB7a2V5ZnJhbWVzfSBmcm9tICdAZW1vdGlvbi9yZWFjdCdcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcydcbmltcG9ydCB7bWFza30gZnJvbSAnc3R5bGUnXG5cbmNvbnN0IHJvdGF0ZUluZmluaXRlID0ga2V5ZnJhbWVzYFxuICAwJSB7XG4gICAgdHJhbnNmb3JtOiByb3RhdGUoMGRlZyk7XG4gIH1cbiAgMTAwJSAge1xuICAgIHRyYW5zZm9ybTogcm90YXRlKDM2MGRlZyk7IFxuICB9XG5gXG5cbmNvbnN0IHN0eWxlID0ge1xuICBkaXNwbGF5OiAnYmxvY2snLFxuICBhbmltYXRpb246IGAke3JvdGF0ZUluZmluaXRlfSAxLjJzIGxpbmVhciBpbmZpbml0ZWAsXG4gIGJvcmRlcjogJzAuMjVlbSBzb2xpZCAjZjIyZTA1JyxcbiAgYm9yZGVyUmlnaHRDb2xvcjogJ3RyYW5zcGFyZW50JyxcbiAgYm9yZGVyUmFkaXVzOiAnNTAlJyxcbiAgaGVpZ2h0OiAnM2VtJyxcbiAgd2lkdGg6ICczZW0nLFxufVxuXG5jb25zdCBMb2FkaW5nID0gKHtjc3MsIHN0eWxlc30pID0+IChcbiAgPGRpdiBjc3M9e1ttYXNrLCBjc3MsIHN0eWxlc119PlxuICAgIDxkaXYgY2xhc3NOYW1lPVwia2tzLXBsYXllcl9fbG9hZGluZ1wiIGNzcz17c3R5bGV9IC8+XG4gIDwvZGl2PlxuKVxuTG9hZGluZy5wcm9wVHlwZXMgPSB7XG4gIGNzczogUHJvcFR5cGVzLm9iamVjdCxcbiAgc3R5bGVzOiBQcm9wVHlwZXMub2JqZWN0LFxufVxuXG5leHBvcnQgZGVmYXVsdCBMb2FkaW5nXG4iXX0= */',
    ],
    children: jsx$1('div', {
      className: 'kks-player__loading',
      css: style$5,
    }),
  })

Loading.propTypes = {
  css: propTypes.object,
  styles: propTypes.object,
}

/* @jsxImportSource @emotion/react */
const fadeout = keyframes`
  0% {
    background-size: 140px 140px;
    opacity:1;
  }
  100% {
    background-size: 160px 160px;
    opacity:0;
  }
`

const _css$1 = (animating, src) => ({
  ...(animating && {
    animationName: fadeout,
  }),
  backgroundSize: '140px 140px',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  animationFillMode: 'forwards',
  animationDelay: '0.3s',
  animationDuration: '300ms',
  backgroundImage: `url(${src})`,
  opacity: 0,
})

const PlayPanel = ({isPlaying, href, onClick}) => {
  const [animating, setAnimating] = useState(false)
  return href
    ? jsx$1('a', {
        href: href,
        target: '_blank',
        rel: 'noreferrer',
        css: layer,
      })
    : jsx$1('div', {
        className: classnames('kks-player__play-panel', {
          [`kks-player__play-panel--${
            isPlaying ? 'play' : 'pause'
          }`]: animating,
        }),
        css: [
          layer,
          _css$1(animating, isPlaying ? icon.playCircle : icon.pauseCircle),
          process.env.NODE_ENV === 'production' ? '' : ';label:PlayPanel;',
          process.env.NODE_ENV === 'production'
            ? ''
            : '/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlBsYXlQYW5lbC5qc3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBMkNNIiwiZmlsZSI6IlBsYXlQYW5lbC5qc3giLCJzb3VyY2VzQ29udGVudCI6WyIvKiBAanN4SW1wb3J0U291cmNlIEBlbW90aW9uL3JlYWN0ICovXG5pbXBvcnQge2tleWZyYW1lc30gZnJvbSAnQGVtb3Rpb24vcmVhY3QnXG5pbXBvcnQge3VzZVN0YXRlfSBmcm9tICdyZWFjdCdcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcydcbmltcG9ydCBjbGFzc25hbWVzIGZyb20gJ2NsYXNzbmFtZXMnXG5pbXBvcnQge2xheWVyfSBmcm9tICdzdHlsZSdcbmltcG9ydCBpY29uIGZyb20gJ3N0eWxlL2ljb24nXG5cbmNvbnN0IGZhZGVvdXQgPSBrZXlmcmFtZXNgXG4gIDAlIHtcbiAgICBiYWNrZ3JvdW5kLXNpemU6IDE0MHB4IDE0MHB4O1xuICAgIG9wYWNpdHk6MTtcbiAgfVxuICAxMDAlIHtcbiAgICBiYWNrZ3JvdW5kLXNpemU6IDE2MHB4IDE2MHB4O1xuICAgIG9wYWNpdHk6MDtcbiAgfVxuYFxuXG5jb25zdCBfY3NzID0gKGFuaW1hdGluZywgc3JjKSA9PiAoe1xuICAuLi4oYW5pbWF0aW5nICYmIHtcbiAgICBhbmltYXRpb25OYW1lOiBmYWRlb3V0LFxuICB9KSxcbiAgYmFja2dyb3VuZFNpemU6ICcxNDBweCAxNDBweCcsXG4gIGJhY2tncm91bmRQb3NpdGlvbjogJ2NlbnRlcicsXG4gIGJhY2tncm91bmRSZXBlYXQ6ICduby1yZXBlYXQnLFxuICBhbmltYXRpb25GaWxsTW9kZTogJ2ZvcndhcmRzJyxcbiAgYW5pbWF0aW9uRGVsYXk6ICcwLjNzJyxcbiAgYW5pbWF0aW9uRHVyYXRpb246ICczMDBtcycsXG4gIGJhY2tncm91bmRJbWFnZTogYHVybCgke3NyY30pYCxcbiAgb3BhY2l0eTogMCxcbn0pXG5cbmNvbnN0IFBsYXlQYW5lbCA9ICh7aXNQbGF5aW5nLCBocmVmLCBvbkNsaWNrfSkgPT4ge1xuICBjb25zdCBbYW5pbWF0aW5nLCBzZXRBbmltYXRpbmddID0gdXNlU3RhdGUoZmFsc2UpXG5cbiAgcmV0dXJuIGhyZWYgPyAoXG4gICAgPGEgaHJlZj17aHJlZn0gdGFyZ2V0PVwiX2JsYW5rXCIgcmVsPVwibm9yZWZlcnJlclwiIGNzcz17bGF5ZXJ9IC8+XG4gICkgOiAoXG4gICAgPGRpdlxuICAgICAgY2xhc3NOYW1lPXtjbGFzc25hbWVzKCdra3MtcGxheWVyX19wbGF5LXBhbmVsJywge1xuICAgICAgICBbYGtrcy1wbGF5ZXJfX3BsYXktcGFuZWwtLSR7aXNQbGF5aW5nID8gJ3BsYXknIDogJ3BhdXNlJ31gXTogYW5pbWF0aW5nLFxuICAgICAgfSl9XG4gICAgICBjc3M9e1tcbiAgICAgICAgbGF5ZXIsXG4gICAgICAgIF9jc3MoYW5pbWF0aW5nLCBpc1BsYXlpbmcgPyBpY29uLnBsYXlDaXJjbGUgOiBpY29uLnBhdXNlQ2lyY2xlKSxcbiAgICAgIF19XG4gICAgICBvbkFuaW1hdGlvbkVuZD17KCkgPT4gc2V0QW5pbWF0aW5nKGZhbHNlKX1cbiAgICAgIG9uQ2xpY2s9eygpID0+IHtcbiAgICAgICAgc2V0QW5pbWF0aW5nKHRydWUpXG4gICAgICAgIG9uQ2xpY2soKVxuICAgICAgfX1cbiAgICAvPlxuICApXG59XG5cblBsYXlQYW5lbC5wcm9wVHlwZXMgPSB7XG4gIGlzUGxheWluZzogUHJvcFR5cGVzLmJvb2wsXG4gIGhyZWY6IFByb3BUeXBlcy5zdHJpbmcsXG4gIG9uQ2xpY2s6IFByb3BUeXBlcy5mdW5jLFxufVxuXG5leHBvcnQgZGVmYXVsdCBQbGF5UGFuZWxcbiJdfQ== */',
        ],
        onAnimationEnd: () => setAnimating(false),
        onClick: () => {
          setAnimating(true)
          onClick()
        },
      })
}

PlayPanel.propTypes = {
  isPlaying: propTypes.bool,
  href: propTypes.string,
  onClick: propTypes.func,
}

/* @jsxImportSource @emotion/react */
const style$4 = {
  border: 'none',
  outline: 'none',
  cursor: 'pointer',
  padding: 0,
  flexShrink: 0,
  fontSize: 14,
  width: 'auto',
  height: 'auto',
  userSelect: 'none',
}

const Link = ({name, onClick, text, defaultValue}) =>
  jsx$1('a', {
    className: classnames('kks-player__link', name),
    css: [
      style$4,
      center,
      process.env.NODE_ENV === 'production' ? '' : ';label:Link;',
      process.env.NODE_ENV === 'production'
        ? ''
        : '/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkxpbmsuanN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQXFCSSIsImZpbGUiOiJMaW5rLmpzeCIsInNvdXJjZXNDb250ZW50IjpbIi8qIEBqc3hJbXBvcnRTb3VyY2UgQGVtb3Rpb24vcmVhY3QgKi9cbmltcG9ydCBjbGFzc25hbWVzIGZyb20gJ2NsYXNzbmFtZXMnXG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnXG5pbXBvcnQge2NlbnRlcn0gZnJvbSAnc3R5bGUnXG5pbXBvcnQgSTE4biBmcm9tICdjb250ZXh0L0kxOG4nXG5cbmNvbnN0IHN0eWxlID0ge1xuICBib3JkZXI6ICdub25lJyxcbiAgb3V0bGluZTogJ25vbmUnLFxuICBjdXJzb3I6ICdwb2ludGVyJyxcbiAgcGFkZGluZzogMCxcbiAgZmxleFNocmluazogMCxcbiAgZm9udFNpemU6IDE0LFxuICB3aWR0aDogJ2F1dG8nLFxuICBoZWlnaHQ6ICdhdXRvJyxcbiAgdXNlclNlbGVjdDogJ25vbmUnLFxufVxuXG5jb25zdCBMaW5rID0gKHtuYW1lLCBvbkNsaWNrLCB0ZXh0LCBkZWZhdWx0VmFsdWV9KSA9PiAoXG4gIDxhXG4gICAgY2xhc3NOYW1lPXtjbGFzc25hbWVzKCdra3MtcGxheWVyX19saW5rJywgbmFtZSl9XG4gICAgY3NzPXtbc3R5bGUsIGNlbnRlcl19XG4gICAgb25DbGljaz17b25DbGlja31cbiAgPlxuICAgIDxJMThuLk1lc3NhZ2UgY29kZT17dGV4dH0gZGVmYXVsdFZhbHVlPXtkZWZhdWx0VmFsdWV9IC8+XG4gIDwvYT5cbilcblxuTGluay5wcm9wVHlwZXMgPSB7XG4gIG5hbWU6IFByb3BUeXBlcy5zdHJpbmcsXG4gIG9uQ2xpY2s6IFByb3BUeXBlcy5mdW5jLFxuICB0ZXh0OiBQcm9wVHlwZXMuc3RyaW5nLFxuICBkZWZhdWx0VmFsdWU6IFByb3BUeXBlcy5zdHJpbmcsXG59XG5cbmV4cG9ydCBkZWZhdWx0IExpbmtcbiJdfQ== */',
    ],
    onClick: onClick,
    children: jsx$1(I18n.Message, {
      code: text,
      defaultValue: defaultValue,
    }),
  })

Link.propTypes = {
  name: propTypes.string,
  onClick: propTypes.func,
  text: propTypes.string,
  defaultValue: propTypes.string,
}

/* @jsxImportSource @emotion/react */
const _css = {
  title: {
    maxWidth: '416px',
    textAlign: 'center',
    fontSize: '20px',
    fontWeight: 'bold',
  },
  message: {
    maxWidth: '416px',
    fontSize: '16px',
  },
}

const LinearEnd = ({onRetry, onLeave}) =>
  jsxs('div', {
    className: 'kks-player__linear-end',
    css: [
      mask,
      process.env.NODE_ENV === 'production' ? '' : ';label:LinearEnd;',
      process.env.NODE_ENV === 'production'
        ? ''
        : '/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkxpbmVhckVuZC5qc3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBcUIwQyIsImZpbGUiOiJMaW5lYXJFbmQuanN4Iiwic291cmNlc0NvbnRlbnQiOlsiLyogQGpzeEltcG9ydFNvdXJjZSBAZW1vdGlvbi9yZWFjdCAqL1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJ1xuaW1wb3J0IHttYXNrfSBmcm9tICdzdHlsZSdcbmltcG9ydCBJMThuIGZyb20gJ2NvbnRleHQvSTE4bidcbmltcG9ydCBUZXh0QnV0dG9uIGZyb20gJ2NvbXBvbmVudC9CdXR0b24vVGV4dEJ1dHRvbidcbmltcG9ydCBMaW5rIGZyb20gJ2NvbXBvbmVudC9CdXR0b24vTGluaydcblxuY29uc3QgX2NzcyA9IHtcbiAgdGl0bGU6IHtcbiAgICBtYXhXaWR0aDogJzQxNnB4JyxcbiAgICB0ZXh0QWxpZ246ICdjZW50ZXInLFxuICAgIGZvbnRTaXplOiAnMjBweCcsXG4gICAgZm9udFdlaWdodDogJ2JvbGQnLFxuICB9LFxuICBtZXNzYWdlOiB7XG4gICAgbWF4V2lkdGg6ICc0MTZweCcsXG4gICAgZm9udFNpemU6ICcxNnB4JyxcbiAgfSxcbn1cblxuY29uc3QgTGluZWFyRW5kID0gKHtvblJldHJ5LCBvbkxlYXZlfSkgPT4gKFxuICA8ZGl2IGNsYXNzTmFtZT1cImtrcy1wbGF5ZXJfX2xpbmVhci1lbmRcIiBjc3M9e1ttYXNrXX0+XG4gICAgPGRpdiBjbGFzc05hbWU9XCJra3MtcGxheWVyX19saW5lYXItZW5kX190aXRsZVwiIGNzcz17X2Nzcy50aXRsZX0+XG4gICAgICA8STE4bi5NZXNzYWdlIGNvZGU9XCJLS1MuUFJPR1JBTS5USVRMRVwiIC8+XG4gICAgPC9kaXY+XG4gICAgPGRpdiBjbGFzc05hbWU9XCJra3MtcGxheWVyX19saW5lYXItZW5kX19tZXNzYWdlXCIgY3NzPXtfY3NzLm1lc3NhZ2V9PlxuICAgICAgPEkxOG4uTWVzc2FnZSBjb2RlPVwiS0tTLlBST0dSQU0uTUVTU0FHRVwiIC8+XG4gICAgPC9kaXY+XG4gICAgPFRleHRCdXR0b25cbiAgICAgIG5hbWU9XCJra3MtcGxheWVyX19yZXRyeS1idXR0b25cIlxuICAgICAgdGV4dD1cIktLUy5UUllBR0FJTlwiXG4gICAgICBvbkNsaWNrPXtvblJldHJ5fVxuICAgIC8+XG4gICAgPExpbmtcbiAgICAgIG5hbWU9XCJra3MtcGxheWVyX19sZWF2ZS1idXR0b25cIlxuICAgICAgdGV4dD1cIktLUy5QTEFZRVIuRVhJVFwiXG4gICAgICBvbkNsaWNrPXtvbkxlYXZlfVxuICAgIC8+XG4gIDwvZGl2PlxuKVxuTGluZWFyRW5kLnByb3BUeXBlcyA9IHtcbiAgb25SZXRyeTogUHJvcFR5cGVzLmZ1bmMsXG4gIG9uTGVhdmU6IFByb3BUeXBlcy5mdW5jLFxufVxuZXhwb3J0IGRlZmF1bHQgTGluZWFyRW5kXG4iXX0= */',
    ],
    children: [
      jsx$1('div', {
        className: 'kks-player__linear-end__title',
        css: _css.title,
        children: jsx$1(I18n.Message, {
          code: 'KKS.PROGRAM.TITLE',
        }),
      }),
      jsx$1('div', {
        className: 'kks-player__linear-end__message',
        css: _css.message,
        children: jsx$1(I18n.Message, {
          code: 'KKS.PROGRAM.MESSAGE',
        }),
      }),
      jsx$1(TextButton, {
        name: 'kks-player__retry-button',
        text: 'KKS.TRYAGAIN',
        onClick: onRetry,
      }),
      jsx$1(Link, {
        name: 'kks-player__leave-button',
        text: 'KKS.PLAYER.EXIT',
        onClick: onLeave,
      }),
    ],
  })

LinearEnd.propTypes = {
  onRetry: propTypes.func,
  onLeave: propTypes.func,
}

/* @jsxImportSource @emotion/react */
const style$3 = {
  backgroundColor: '#000',
  button: {
    position: 'absolute',
    top: '36px',
    left: '36px',
  },
}
const iconStyle = {
  width: '78px',
  height: '78px',
  filter: 'invert(100%)',
}

const CastMask = ({onBack}) =>
  jsxs('div', {
    className: 'kks-player__cast-mask',
    css: [
      mask,
      style$3,
      process.env.NODE_ENV === 'production' ? '' : ';label:CastMask;',
      process.env.NODE_ENV === 'production'
        ? ''
        : '/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkNhc3QuanN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQXlCeUMiLCJmaWxlIjoiQ2FzdC5qc3giLCJzb3VyY2VzQ29udGVudCI6WyIvKiBAanN4SW1wb3J0U291cmNlIEBlbW90aW9uL3JlYWN0ICovXG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnXG5cbmltcG9ydCB7bWFza30gZnJvbSAnc3R5bGUnXG5pbXBvcnQgaWNvbiBmcm9tICdzdHlsZS9pY29uJ1xuaW1wb3J0IEkxOG4gZnJvbSAnY29udGV4dC9JMThuJ1xuaW1wb3J0IEJ1dHRvbiBmcm9tICdjb21wb25lbnQvQnV0dG9uL1NxdWFyZUJ1dHRvbidcbmltcG9ydCBJY29uIGZyb20gJ2NvbXBvbmVudC9JY29uJ1xuXG5jb25zdCBzdHlsZSA9IHtcbiAgYmFja2dyb3VuZENvbG9yOiAnIzAwMCcsXG4gIGJ1dHRvbjoge1xuICAgIHBvc2l0aW9uOiAnYWJzb2x1dGUnLFxuICAgIHRvcDogJzM2cHgnLFxuICAgIGxlZnQ6ICczNnB4JyxcbiAgfSxcbn1cblxuY29uc3QgaWNvblN0eWxlID0ge1xuICB3aWR0aDogJzc4cHgnLFxuICBoZWlnaHQ6ICc3OHB4JyxcbiAgZmlsdGVyOiAnaW52ZXJ0KDEwMCUpJyxcbn1cblxuY29uc3QgQ2FzdE1hc2sgPSAoe29uQmFja30pID0+IChcbiAgPGRpdiBjbGFzc05hbWU9XCJra3MtcGxheWVyX19jYXN0LW1hc2tcIiBjc3M9e1ttYXNrLCBzdHlsZV19PlxuICAgIDxCdXR0b24gbmFtZT1cImtrcy1wbGF5ZXJfX2N0cmxidG4ga2tzLXBsYXllcl9fYmFjay1idXR0b25cIiBvbkNsaWNrPXtvbkJhY2t9PlxuICAgICAgPEljb24gc3JjPXtpY29uLmJhY2t9IC8+XG4gICAgPC9CdXR0b24+XG4gICAgPEljb24gc3JjPXtpY29uLmNhc3RDb25uZWN0ZWR9IHN0eWxlPXtpY29uU3R5bGV9IC8+XG4gICAgPGRpdiBjbGFzc05hbWU9XCJra3MtcGxheWVyX19jYXN0LW1hc2tfX21lc3NhZ2VcIj5cbiAgICAgIDxJMThuLk1lc3NhZ2UgY29kZT1cIktLUy5DQVNUSU5HXCIgLz5cbiAgICA8L2Rpdj5cbiAgPC9kaXY+XG4pXG5cbkNhc3RNYXNrLnByb3BUeXBlcyA9IHtcbiAgb25CYWNrOiBQcm9wVHlwZXMuZnVuYyxcbn1cblxuZXhwb3J0IGRlZmF1bHQgQ2FzdE1hc2tcbiJdfQ== */',
    ],
    children: [
      jsx$1(SquareButton, {
        name: 'kks-player__ctrlbtn kks-player__back-button',
        onClick: onBack,
        children: jsx$1(Icon, {
          src: icon.back,
        }),
      }),
      jsx$1(Icon, {
        src: icon.castConnected,
        style: iconStyle,
      }),
      jsx$1('div', {
        className: 'kks-player__cast-mask__message',
        children: jsx$1(I18n.Message, {
          code: 'KKS.CASTING',
        }),
      }),
    ],
  })

CastMask.propTypes = {
  onBack: propTypes.func,
}

/* @jsxImportSource @emotion/react */
const styles = {
  padding: '0.5rem',
  border: '1px solid #fff',
  color: '#fff',
  background: 'rgba(0, 0, 0, 0.4)',
  fontSize: '24px',
  opacity: 0.8,
  'span:last-of-type': {
    marginLeft: '1rem',
    width: '16px',
    height: '16px',
    display: 'inline-block',
  },
}

const SkipButton = ({remainingTime, onClick}) =>
  jsx$1('button', {
    css: styles,
    disabled: remainingTime > 0,
    onClick: onClick,
    children:
      remainingTime > 0
        ? jsxs(Fragment, {
            children: [
              Math.ceil(remainingTime),
              ' ',
              jsx$1(Message, {
                code: 'KKS.SSAI.SECONDS',
              }),
              jsx$1(Icon, {
                src: icon.nextEpisode,
                style: {
                  opacity: 0.24,
                },
              }),
            ],
          })
        : jsxs(Fragment, {
            children: [
              jsx$1(Message, {
                code: 'KKS.SSAI.SKIP.AD',
              }),
              jsx$1(Icon, {
                src: icon.nextEpisode,
              }),
            ],
          }),
  })

SkipButton.propTypes = {
  remainingTime: propTypes.number,
  onClick: propTypes.func,
}

/* eslint-disable indent */

const PlayPane = () => {
  const {status} = useStore(getPlaybackState, shallow)
  const type = useStore(({UI: state}) =>
    state.activePanel === 'recommendation' ? 'dismiss' : 'play'
  )
  const adUrl = useStore(({UI: state}) => {
    var _state$ad

    return (_state$ad = state.ad) === null || _state$ad === void 0
      ? void 0
      : _state$ad.clickThroughUrl
  })
  const {dispatch} = useContext(Context.PlayerState)
  return type === 'dismiss'
    ? /*#__PURE__*/ jsx('div', {
        style: {
          height: '100%',
          width: '100%',
          background: 'rgba(0, 0, 0, 0.6)',
        },
        onClick: () => dispatch(UiAction.hidePanel()),
      })
    : type === 'play' &&
        /*#__PURE__*/ jsx(PlayPanel, {
          isPlaying: /playing|loading/.test(status),
          href: adUrl,
          onClick: () => dispatch(playAction(status)),
        })
}

const ErrorOverlay = () => {
  const {dispatch} = useContext(Context.Module)
  const {error} = useContext(Context.Module).state
  return /*#__PURE__*/ jsx(Error$1, {
    error: error,
    onBack: () => dispatch(Action.back()),
  })
}

const CastingOverlay = () => {
  const {dispatch} = useContext(Context.Module)
  return /*#__PURE__*/ jsx(CastMask, {
    onBack: () => dispatch(Action.back()),
  })
}

const LinearEndedOverlay = () => {
  const {dispatch} = useContext(Context.Module)
  return /*#__PURE__*/ jsx(LinearEnd, {
    onRetry: () => dispatch(operator.retry),
    onLeave: () => dispatch(Action.back()),
  })
}

const getAdSkipTimeOffset = ({API, UI}) => {
  var _API$content, _UI$ad

  return ((_API$content = API.content) === null || _API$content === void 0
    ? void 0
    : _API$content.contentType) === 'lives'
    ? -1
    : (_UI$ad = UI.ad) === null || _UI$ad === void 0
    ? void 0
    : _UI$ad.skipTimeOffset
}

const AdSkipButton = () => {
  const {plugins} = useOptions()
  const skipTimeOffset = useStore(getAdSkipTimeOffset)
  const [streamTime, setStreamTime] = useState(0)
  useEffect(() => {
    const video = document.querySelector('video')

    const upadteTime = () => setStreamTime(() => video.currentTime)

    video.addEventListener('timeupdate', upadteTime)
    return () => video.removeEventListener('timeupdate', upadteTime)
  }, [])
  return (
    skipTimeOffset >= 0 &&
    /*#__PURE__*/ jsx(SkipButton, {
      remainingTime: skipTimeOffset - streamTime,
      onClick: () =>
        plugins.forEach(plugin => {
          var _plugin$skipAd

          return (_plugin$skipAd = plugin.skipAd) === null ||
            _plugin$skipAd === void 0
            ? void 0
            : _plugin$skipAd.call(plugin)
        }),
    })
  )
}

const getComponents = () => ({
  PlayButton,
  RewindButton,
  ForwardButton,
  VolumeControl,
  FunctionButtons,
  FullScreenButton,
  PreviousEpisodeButton: PreEpisodeButton,
  NextEpisodeButton,
  BackButton,
  Loading,
  PlayPane,
  ErrorOverlay,
  LinearEndedOverlay,
  CastingOverlay,
  AdSkipButton,
  CastButton: CastVideoButton,
  Translate: Message,
})

/* @jsxImportSource @emotion/react */
const sizes$1 = {
  normal: {
    bottom: '1rem',
    padding: '0.5rem',
    width: '18.5rem',
    height: '5.25rem',
    fontSize: '12px',
    '--spacing': '0rem',
  },
  big: {
    bottom: '5rem',
    padding: '0.75rem',
    width: '32rem',
    height: '10rem',
    fontSize: '20px',
    '--spacing': '0.5rem',
  },
}
const style$2 = {
  container: {
    position: 'absolute',
    zIndex: '-1',
    right: '0',
    display: 'flex',
    borderRadius: '4px',
    color: '#fff',
    backgroundColor: 'rgba(20, 20, 20, 0.8)',
    opacity: '0',
    transition: 'opacity 1s ease',
  },
  opening: {
    zIndex: 'inherit',
    opacity: '1',
  },
  cover: imageUrl => ({
    flex: '0 40%',
    border: 'none',
    borderRadius: '4px',
    background: `
      center / 33% no-repeat url(${icon.playCircleBorder}),
      ${imageUrl ? `center / cover url(${imageUrl}),` : ''} 
      #ccc
    `,
  }),
  info: {
    marginLeft: '0.5rem',
    flex: '1',
  },
  message: {
    marginBottom: ['1rem', 'var(--spacing)'],
    display: 'flex',
  },
  dismiss: {
    marginLeft: 'auto',
    width: ['2rem', 'calc(1.5rem + var(--spacing))'],
    height: ['2rem', 'calc(1.5rem + var(--spacing))'],
    border: 'none',
    background: `center / 1rem no-repeat url(${icon.close}), transparent`,
  },
}

const PlayDialog = ({
  opening,
  coverImageUrl,
  message,
  title,
  size,
  containerRef,
  play,
  dismiss,
  ...rest
}) =>
  jsxs('div', {
    css: [
      style$2.container,
      sizes$1[size],
      opening && style$2.opening,
      process.env.NODE_ENV === 'production' ? '' : ';label:PlayDialog;',
      process.env.NODE_ENV === 'production'
        ? ''
        : '/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlBsYXlEaWFsb2cuanN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQStFSSIsImZpbGUiOiJQbGF5RGlhbG9nLmpzeCIsInNvdXJjZXNDb250ZW50IjpbIi8qIEBqc3hJbXBvcnRTb3VyY2UgQGVtb3Rpb24vcmVhY3QgKi9cbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcydcblxuaW1wb3J0IGljb24gZnJvbSAnc3R5bGUvaWNvbidcblxuY29uc3Qgc2l6ZXMgPSB7XG4gIG5vcm1hbDoge1xuICAgIGJvdHRvbTogJzFyZW0nLFxuICAgIHBhZGRpbmc6ICcwLjVyZW0nLFxuICAgIHdpZHRoOiAnMTguNXJlbScsXG4gICAgaGVpZ2h0OiAnNS4yNXJlbScsXG4gICAgZm9udFNpemU6ICcxMnB4JyxcbiAgICAnLS1zcGFjaW5nJzogJzByZW0nLFxuICB9LFxuICBiaWc6IHtcbiAgICBib3R0b206ICc1cmVtJyxcbiAgICBwYWRkaW5nOiAnMC43NXJlbScsXG4gICAgd2lkdGg6ICczMnJlbScsXG4gICAgaGVpZ2h0OiAnMTByZW0nLFxuICAgIGZvbnRTaXplOiAnMjBweCcsXG4gICAgJy0tc3BhY2luZyc6ICcwLjVyZW0nLFxuICB9LFxufVxuXG5jb25zdCBzdHlsZSA9IHtcbiAgY29udGFpbmVyOiB7XG4gICAgcG9zaXRpb246ICdhYnNvbHV0ZScsXG4gICAgekluZGV4OiAnLTEnLFxuICAgIHJpZ2h0OiAnMCcsXG4gICAgZGlzcGxheTogJ2ZsZXgnLFxuICAgIGJvcmRlclJhZGl1czogJzRweCcsXG4gICAgY29sb3I6ICcjZmZmJyxcbiAgICBiYWNrZ3JvdW5kQ29sb3I6ICdyZ2JhKDIwLCAyMCwgMjAsIDAuOCknLFxuICAgIG9wYWNpdHk6ICcwJyxcbiAgICB0cmFuc2l0aW9uOiAnb3BhY2l0eSAxcyBlYXNlJyxcbiAgfSxcbiAgb3BlbmluZzoge1xuICAgIHpJbmRleDogJ2luaGVyaXQnLFxuICAgIG9wYWNpdHk6ICcxJyxcbiAgfSxcbiAgY292ZXI6IGltYWdlVXJsID0+ICh7XG4gICAgZmxleDogJzAgNDAlJyxcbiAgICBib3JkZXI6ICdub25lJyxcbiAgICBib3JkZXJSYWRpdXM6ICc0cHgnLFxuICAgIGJhY2tncm91bmQ6IGBcbiAgICAgIGNlbnRlciAvIDMzJSBuby1yZXBlYXQgdXJsKCR7aWNvbi5wbGF5Q2lyY2xlQm9yZGVyfSksXG4gICAgICAke2ltYWdlVXJsID8gYGNlbnRlciAvIGNvdmVyIHVybCgke2ltYWdlVXJsfSksYCA6ICcnfSBcbiAgICAgICNjY2NcbiAgICBgLFxuICB9KSxcbiAgaW5mbzoge1xuICAgIG1hcmdpbkxlZnQ6ICcwLjVyZW0nLFxuICAgIGZsZXg6ICcxJyxcbiAgfSxcbiAgbWVzc2FnZToge1xuICAgIG1hcmdpbkJvdHRvbTogWycxcmVtJywgJ3ZhcigtLXNwYWNpbmcpJ10sXG4gICAgZGlzcGxheTogJ2ZsZXgnLFxuICB9LFxuICBkaXNtaXNzOiB7XG4gICAgbWFyZ2luTGVmdDogJ2F1dG8nLFxuICAgIHdpZHRoOiBbJzJyZW0nLCAnY2FsYygxLjVyZW0gKyB2YXIoLS1zcGFjaW5nKSknXSxcbiAgICBoZWlnaHQ6IFsnMnJlbScsICdjYWxjKDEuNXJlbSArIHZhcigtLXNwYWNpbmcpKSddLFxuICAgIGJvcmRlcjogJ25vbmUnLFxuICAgIGJhY2tncm91bmQ6IGBjZW50ZXIgLyAxcmVtIG5vLXJlcGVhdCB1cmwoJHtpY29uLmNsb3NlfSksIHRyYW5zcGFyZW50YCxcbiAgfSxcbn1cblxuY29uc3QgUGxheURpYWxvZyA9ICh7XG4gIG9wZW5pbmcsXG4gIGNvdmVySW1hZ2VVcmwsXG4gIG1lc3NhZ2UsXG4gIHRpdGxlLFxuICBzaXplLFxuICBjb250YWluZXJSZWYsXG4gIHBsYXksXG4gIGRpc21pc3MsXG4gIC4uLnJlc3Rcbn0pID0+IChcbiAgPGRpdlxuICAgIGNzcz17W3N0eWxlLmNvbnRhaW5lciwgc2l6ZXNbc2l6ZV0sIG9wZW5pbmcgJiYgc3R5bGUub3BlbmluZ119XG4gICAgcmVmPXtjb250YWluZXJSZWZ9XG4gICAgey4uLnJlc3R9XG4gID5cbiAgICA8YnV0dG9uXG4gICAgICBjc3M9e3N0eWxlLmNvdmVyKGNvdmVySW1hZ2VVcmwpfVxuICAgICAgb25DbGljaz17cGxheX1cbiAgICAgIGNsYXNzTmFtZT1cImtrcy1wbGF5ZXJfX25leHQtZXBpc29kZS1idXR0b25cIlxuICAgIC8+XG4gICAgPGRpdiBjc3M9e3N0eWxlLmluZm99PlxuICAgICAgPGRpdiBjc3M9e3N0eWxlLm1lc3NhZ2V9PlxuICAgICAgICB7bWVzc2FnZX1cbiAgICAgICAgPGJ1dHRvblxuICAgICAgICAgIGNzcz17c3R5bGUuZGlzbWlzc31cbiAgICAgICAgICBvbkNsaWNrPXtkaXNtaXNzfVxuICAgICAgICAgIGNsYXNzTmFtZT1cImtrcy1wbGF5ZXJfX2NhbmNlbC1hdXRvcGxheS1idXR0b25cIlxuICAgICAgICAvPlxuICAgICAgPC9kaXY+XG4gICAgICB7dGl0bGV9XG4gICAgPC9kaXY+XG4gIDwvZGl2PlxuKVxuXG5QbGF5RGlhbG9nLnByb3BUeXBlcyA9IHtcbiAgb3BlbmluZzogUHJvcFR5cGVzLmJvb2wsXG4gIGNvdmVySW1hZ2VVcmw6IFByb3BUeXBlcy5zdHJpbmcsXG4gIG1lc3NhZ2U6IFByb3BUeXBlcy5ub2RlLFxuICB0aXRsZTogUHJvcFR5cGVzLm5vZGUsXG4gIHNpemU6IFByb3BUeXBlcy5zdHJpbmcsXG4gIGNvbnRhaW5lclJlZjogUHJvcFR5cGVzLm9iamVjdCxcbiAgcGxheTogUHJvcFR5cGVzLmZ1bmMsXG4gIGRpc21pc3M6IFByb3BUeXBlcy5mdW5jLFxufVxuXG5leHBvcnQgZGVmYXVsdCBQbGF5RGlhbG9nXG4iXX0= */',
    ],
    ref: containerRef,
    ...rest,
    children: [
      jsx$1('button', {
        css: style$2.cover(coverImageUrl),
        onClick: play,
        className: 'kks-player__next-episode-button',
      }),
      jsxs('div', {
        css: style$2.info,
        children: [
          jsxs('div', {
            css: style$2.message,
            children: [
              message,
              jsx$1('button', {
                css: style$2.dismiss,
                onClick: dismiss,
                className: 'kks-player__cancel-autoplay-button',
              }),
            ],
          }),
          title,
        ],
      }),
    ],
  })

PlayDialog.propTypes = {
  opening: propTypes.bool,
  coverImageUrl: propTypes.string,
  message: propTypes.node,
  title: propTypes.node,
  size: propTypes.string,
  containerRef: propTypes.object,
  play: propTypes.func,
  dismiss: propTypes.func,
}

const useCountdownSecond = ({time, enabled}) => {
  const [timeLeft, setTimeLeft] = useState()
  useEffect(() => {
    if (!enabled) return
    setTimeLeft(time)
    const intervalId = setInterval(
      () => setTimeLeft(current => current - 1),
      1000
    )
    return () => clearInterval(intervalId)
  }, [time, enabled])
  return timeLeft
}

const AutoplayDialog = () => {
  const {currentBreakpoint} = useDimensions({
    ref: useUiRef(),
    polyfill: ResizeObserver,
    breakpoints: {
      normal: 0,
      big: 600,
    },
  })
  const options = useOptions()
  const opening = useStore(getAutoplayNextActive) && options.autoplayNext
  const {
    state: {content},
    dispatch,
  } = useContext(Context.API)
  const {
    id,
    title,
    images: [{url: coverImageUrl}],
  } = _get(content, 'recommend.next') || {
    images: [{}],
  }

  const playNext = () => {
    dispatch(UiAction.changeNextEpisode(id))
  }

  const timeLeft = useCountdownSecond({
    time: 10,
    enabled: opening,
  })
  useEffect(() => {
    if (timeLeft <= 0) playNext()
  }, [timeLeft > 0])
  useEffect(() => {
    if (opening) {
      dispatch(UiAction.offerAutoplay())
    }
  }, [opening])
  return /*#__PURE__*/ jsx(PlayDialog, {
    className: 'kks-player__autoplay pinned',
    opening: opening,
    message: /*#__PURE__*/ jsx(I18n.Message, {
      code: 'KKS.ENDROLL.COUNTDOWN',
      property: {
        timeLeft,
      },
    }),
    title: title,
    coverImageUrl: coverImageUrl,
    size: currentBreakpoint,
    play: playNext,
    dismiss: () => dispatch(UiAction.dismissAutoplay()),
  })
}

/* @jsxImportSource @emotion/react */
const style$1 = {
  head: {
    position: 'sticky',
    zIndex: '1',
    top: '0',
    display: 'flex',
    alignItems: 'center',
    padding: '1rem 1.5rem',
    color: 'white',
    backgroundColor: 'inherit',
    fontSize: '16px',
    fontWeight: 'bold',
    button: {
      marginRight: '1rem',
      padding: '0',
      width: '1rem',
      height: '1rem',
      border: 'none',
    },
  },
  overlay: {
    position: 'absolute',
    zIndex: '-2',
    top: '0',
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    opacity: '0',
    transition: 'opacity 0.2s ease, transform 0s ease 0.2s',
  },
  container: {
    flex: '0 18rem',
    maxHeight: 'calc(100% - 2rem)',
    color: '#ccc',
    background: '#333333',
    whiteSpace: 'nowrap',
    borderRadius: '4px',
    userSelect: 'none',
    overflow: 'auto',
  },
  opening: {
    zIndex: '0',
    opacity: '1',
    transform: 'translateY(0)',
    transition: 'opacity 0.2s ease',
  },
  title: {
    padding: '12px 18px',
  },
  dismiss: {
    background: `center / 1rem no-repeat url(${icon.close}), transparent`,
  },
  back: {
    background: `center / 1rem no-repeat url(${icon.back}), transparent`,
  },
  row: {
    cursor: 'pointer',
    display: 'flex',
    padding: '1rem 1.5rem',
    fontSize: '16px',
    '::after': {
      content: '" "',
      marginLeft: '1rem',
      width: '20px',
      height: '20px',
      display: 'inline-block',
      color: 'white',
      backgroundPosition: 'center',
      backgroundSize: 'cover',
    },
  },
  space: {
    flex: '1',
  },
  hasOptions: {
    '::after': {
      backgroundImage: `url(${icon.arrowTop})`,
      transform: 'rotate(90deg)',
    },
  },
  selected: {
    '::after': {
      backgroundImage: `url(${icon.check})`,
    },
  },
}
const dekstopStyle = {
  overlay: {
    position: 'absolute',
    bottom: '5em',
    right: '3rem',
    display: 'flex',
    alignItems: 'flex-end',
    width: '15rem',
    height: 'calc(100% - 8rem)',
    opacity: '0',
    transform: 'translateY(-100vh)',
  },
  container: {
    ...style$1.container,
    maxHeight: '100%',
    background: 'rgba(0, 0, 0, 0.7)',
  },
  head: {...style$1.head, background: '#000'},
  row: {
    ...style$1.row,
    '::after': {},
    '::before': {
      ...style$1.row['::after'],
      marginLeft: '0',
      marginRight: '4px',
    },
  },
  hasOptions: {
    '::before': {
      backgroundImage: `url(${icon.arrowTop})`,
      transform: 'rotate(90deg)',
    },
  },
  selected: {
    '::before': {
      backgroundImage: `url(${icon.check})`,
    },
  },
}

const MenuItemText = ({text}) =>
  jsx$1(FormattedMessage, {
    id: `KKS.SETTING.${text}`,
    getDefault: () => text,
  })

MenuItemText.propTypes = {
  text: propTypes.string,
}

const MenuSection = ({sharedStyle, items = [], selectedValue, onSelect}) =>
  jsx$1('div', {
    className: 'kks-player__menu-content',
    children: items.map(({value, label}) =>
      jsxs(
        'div',
        {
          className: classnames('kks-player__menu-item', {
            'kks-player__menu-item--selected': selectedValue === value,
          }),
          css: [
            sharedStyle.row,
            selectedValue === value && sharedStyle.selected,
            process.env.NODE_ENV === 'production' ? '' : ';label:MenuSection;',
            process.env.NODE_ENV === 'production'
              ? ''
              : '/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlBsYXllclNldHRpbmdzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQWlLUSIsImZpbGUiOiJQbGF5ZXJTZXR0aW5ncy5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qIEBqc3hJbXBvcnRTb3VyY2UgQGVtb3Rpb24vcmVhY3QgKi9cbmltcG9ydCB7dXNlU3RhdGUsIHVzZUVmZmVjdCwgdXNlQ29udGV4dCwgdXNlUmVmLCBGcmFnbWVudH0gZnJvbSAncmVhY3QnXG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnXG5pbXBvcnQgY2xhc3NuYW1lcyBmcm9tICdjbGFzc25hbWVzJ1xuaW1wb3J0IHVzZU9uY2xpY2tPdXRzaWRlIGZyb20gJ3JlYWN0LWNvb2wtb25jbGlja291dHNpZGUnXG5cbmltcG9ydCB7dXNlQ2hhbmdlU2V0dGluZ3MsIHVzZVNldHRpbmdzfSBmcm9tICdwbGF5ZXIvc2V0dGluZ3MnXG5pbXBvcnQge0NvbnRleHR9IGZyb20gJ3BsYXllci9zdG9yZSdcbmltcG9ydCBBY3Rpb24gZnJvbSAncGxheWVyL3N0b3JlL2FjdGlvbi9VSSdcbmltcG9ydCBpY29uIGZyb20gJ3N0eWxlL2ljb24nXG5pbXBvcnQge0Zvcm1hdHRlZE1lc3NhZ2V9IGZyb20gJ2NvbnRleHQvSTE4bidcblxuY29uc3Qgc3R5bGUgPSB7XG4gIGhlYWQ6IHtcbiAgICBwb3NpdGlvbjogJ3N0aWNreScsXG4gICAgekluZGV4OiAnMScsXG4gICAgdG9wOiAnMCcsXG4gICAgZGlzcGxheTogJ2ZsZXgnLFxuICAgIGFsaWduSXRlbXM6ICdjZW50ZXInLFxuICAgIHBhZGRpbmc6ICcxcmVtIDEuNXJlbScsXG4gICAgY29sb3I6ICd3aGl0ZScsXG4gICAgYmFja2dyb3VuZENvbG9yOiAnaW5oZXJpdCcsXG4gICAgZm9udFNpemU6ICcxNnB4JyxcbiAgICBmb250V2VpZ2h0OiAnYm9sZCcsXG4gICAgYnV0dG9uOiB7XG4gICAgICBtYXJnaW5SaWdodDogJzFyZW0nLFxuICAgICAgcGFkZGluZzogJzAnLFxuICAgICAgd2lkdGg6ICcxcmVtJyxcbiAgICAgIGhlaWdodDogJzFyZW0nLFxuICAgICAgYm9yZGVyOiAnbm9uZScsXG4gICAgfSxcbiAgfSxcbiAgb3ZlcmxheToge1xuICAgIHBvc2l0aW9uOiAnYWJzb2x1dGUnLFxuICAgIHpJbmRleDogJy0yJyxcbiAgICB0b3A6ICcwJyxcbiAgICB3aWR0aDogJzEwMCUnLFxuICAgIGhlaWdodDogJzEwMCUnLFxuICAgIGRpc3BsYXk6ICdmbGV4JyxcbiAgICBhbGlnbkl0ZW1zOiAnY2VudGVyJyxcbiAgICBqdXN0aWZ5Q29udGVudDogJ2NlbnRlcicsXG4gICAgYmFja2dyb3VuZENvbG9yOiAncmdiYSgwLCAwLCAwLCAwLjYpJyxcbiAgICBvcGFjaXR5OiAnMCcsXG4gICAgdHJhbnNpdGlvbjogJ29wYWNpdHkgMC4ycyBlYXNlLCB0cmFuc2Zvcm0gMHMgZWFzZSAwLjJzJyxcbiAgfSxcbiAgY29udGFpbmVyOiB7XG4gICAgZmxleDogJzAgMThyZW0nLFxuICAgIG1heEhlaWdodDogJ2NhbGMoMTAwJSAtIDJyZW0pJyxcbiAgICBjb2xvcjogJyNjY2MnLFxuICAgIGJhY2tncm91bmQ6ICcjMzMzMzMzJyxcbiAgICB3aGl0ZVNwYWNlOiAnbm93cmFwJyxcbiAgICBib3JkZXJSYWRpdXM6ICc0cHgnLFxuICAgIHVzZXJTZWxlY3Q6ICdub25lJyxcbiAgICBvdmVyZmxvdzogJ2F1dG8nLFxuICB9LFxuICBvcGVuaW5nOiB7XG4gICAgekluZGV4OiAnMCcsXG4gICAgb3BhY2l0eTogJzEnLFxuICAgIHRyYW5zZm9ybTogJ3RyYW5zbGF0ZVkoMCknLFxuICAgIHRyYW5zaXRpb246ICdvcGFjaXR5IDAuMnMgZWFzZScsXG4gIH0sXG4gIHRpdGxlOiB7XG4gICAgcGFkZGluZzogJzEycHggMThweCcsXG4gIH0sXG4gIGRpc21pc3M6IHtcbiAgICBiYWNrZ3JvdW5kOiBgY2VudGVyIC8gMXJlbSBuby1yZXBlYXQgdXJsKCR7aWNvbi5jbG9zZX0pLCB0cmFuc3BhcmVudGAsXG4gIH0sXG4gIGJhY2s6IHtcbiAgICBiYWNrZ3JvdW5kOiBgY2VudGVyIC8gMXJlbSBuby1yZXBlYXQgdXJsKCR7aWNvbi5iYWNrfSksIHRyYW5zcGFyZW50YCxcbiAgfSxcbiAgcm93OiB7XG4gICAgY3Vyc29yOiAncG9pbnRlcicsXG4gICAgZGlzcGxheTogJ2ZsZXgnLFxuICAgIHBhZGRpbmc6ICcxcmVtIDEuNXJlbScsXG4gICAgZm9udFNpemU6ICcxNnB4JyxcbiAgICAnOjphZnRlcic6IHtcbiAgICAgIGNvbnRlbnQ6ICdcIiBcIicsXG4gICAgICBtYXJnaW5MZWZ0OiAnMXJlbScsXG4gICAgICB3aWR0aDogJzIwcHgnLFxuICAgICAgaGVpZ2h0OiAnMjBweCcsXG4gICAgICBkaXNwbGF5OiAnaW5saW5lLWJsb2NrJyxcbiAgICAgIGNvbG9yOiAnd2hpdGUnLFxuICAgICAgYmFja2dyb3VuZFBvc2l0aW9uOiAnY2VudGVyJyxcbiAgICAgIGJhY2tncm91bmRTaXplOiAnY292ZXInLFxuICAgIH0sXG4gIH0sXG4gIHNwYWNlOiB7XG4gICAgZmxleDogJzEnLFxuICB9LFxuICBoYXNPcHRpb25zOiB7XG4gICAgJzo6YWZ0ZXInOiB7XG4gICAgICBiYWNrZ3JvdW5kSW1hZ2U6IGB1cmwoJHtpY29uLmFycm93VG9wfSlgLFxuICAgICAgdHJhbnNmb3JtOiAncm90YXRlKDkwZGVnKScsXG4gICAgfSxcbiAgfSxcbiAgc2VsZWN0ZWQ6IHtcbiAgICAnOjphZnRlcic6IHtcbiAgICAgIGJhY2tncm91bmRJbWFnZTogYHVybCgke2ljb24uY2hlY2t9KWAsXG4gICAgfSxcbiAgfSxcbn1cblxuY29uc3QgZGVrc3RvcFN0eWxlID0ge1xuICBvdmVybGF5OiB7XG4gICAgcG9zaXRpb246ICdhYnNvbHV0ZScsXG4gICAgYm90dG9tOiAnNWVtJyxcbiAgICByaWdodDogJzNyZW0nLFxuICAgIGRpc3BsYXk6ICdmbGV4JyxcbiAgICBhbGlnbkl0ZW1zOiAnZmxleC1lbmQnLFxuICAgIHdpZHRoOiAnMTVyZW0nLFxuICAgIGhlaWdodDogJ2NhbGMoMTAwJSAtIDhyZW0pJyxcbiAgICBvcGFjaXR5OiAnMCcsXG4gICAgdHJhbnNmb3JtOiAndHJhbnNsYXRlWSgtMTAwdmgpJyxcbiAgfSxcbiAgY29udGFpbmVyOiB7XG4gICAgLi4uc3R5bGUuY29udGFpbmVyLFxuICAgIG1heEhlaWdodDogJzEwMCUnLFxuICAgIGJhY2tncm91bmQ6ICdyZ2JhKDAsIDAsIDAsIDAuNyknLFxuICB9LFxuICBoZWFkOiB7XG4gICAgLi4uc3R5bGUuaGVhZCxcbiAgICBiYWNrZ3JvdW5kOiAnIzAwMCcsXG4gIH0sXG4gIHJvdzoge1xuICAgIC4uLnN0eWxlLnJvdyxcbiAgICAnOjphZnRlcic6IHt9LFxuICAgICc6OmJlZm9yZSc6IHtcbiAgICAgIC4uLnN0eWxlLnJvd1snOjphZnRlciddLFxuICAgICAgbWFyZ2luTGVmdDogJzAnLFxuICAgICAgbWFyZ2luUmlnaHQ6ICc0cHgnLFxuICAgIH0sXG4gIH0sXG4gIGhhc09wdGlvbnM6IHtcbiAgICAnOjpiZWZvcmUnOiB7XG4gICAgICBiYWNrZ3JvdW5kSW1hZ2U6IGB1cmwoJHtpY29uLmFycm93VG9wfSlgLFxuICAgICAgdHJhbnNmb3JtOiAncm90YXRlKDkwZGVnKScsXG4gICAgfSxcbiAgfSxcbiAgc2VsZWN0ZWQ6IHtcbiAgICAnOjpiZWZvcmUnOiB7XG4gICAgICBiYWNrZ3JvdW5kSW1hZ2U6IGB1cmwoJHtpY29uLmNoZWNrfSlgLFxuICAgIH0sXG4gIH0sXG59XG5cbmNvbnN0IE1lbnVJdGVtVGV4dCA9ICh7dGV4dH0pID0+IChcbiAgPEZvcm1hdHRlZE1lc3NhZ2UgaWQ9e2BLS1MuU0VUVElORy4ke3RleHR9YH0gZ2V0RGVmYXVsdD17KCkgPT4gdGV4dH0gLz5cbilcblxuTWVudUl0ZW1UZXh0LnByb3BUeXBlcyA9IHtcbiAgdGV4dDogUHJvcFR5cGVzLnN0cmluZyxcbn1cblxuY29uc3QgTWVudVNlY3Rpb24gPSAoe3NoYXJlZFN0eWxlLCBpdGVtcyA9IFtdLCBzZWxlY3RlZFZhbHVlLCBvblNlbGVjdH0pID0+IChcbiAgPGRpdiBjbGFzc05hbWU9XCJra3MtcGxheWVyX19tZW51LWNvbnRlbnRcIj5cbiAgICB7aXRlbXMubWFwKCh7dmFsdWUsIGxhYmVsfSkgPT4gKFxuICAgICAgPGRpdlxuICAgICAgICBrZXk9e3ZhbHVlfVxuICAgICAgICBjbGFzc05hbWU9e2NsYXNzbmFtZXMoJ2trcy1wbGF5ZXJfX21lbnUtaXRlbScsIHtcbiAgICAgICAgICAna2tzLXBsYXllcl9fbWVudS1pdGVtLS1zZWxlY3RlZCc6IHNlbGVjdGVkVmFsdWUgPT09IHZhbHVlLFxuICAgICAgICB9KX1cbiAgICAgICAgY3NzPXtbc2hhcmVkU3R5bGUucm93LCBzZWxlY3RlZFZhbHVlID09PSB2YWx1ZSAmJiBzaGFyZWRTdHlsZS5zZWxlY3RlZF19XG4gICAgICAgIG9uQ2xpY2s9eygpID0+IG9uU2VsZWN0KHZhbHVlKX1cbiAgICAgID5cbiAgICAgICAgPE1lbnVJdGVtVGV4dCB0ZXh0PXtsYWJlbCB8fCB2YWx1ZX0gLz5cbiAgICAgICAgPGRpdiBjc3M9e1tzdHlsZS5zcGFjZV19IC8+XG4gICAgICA8L2Rpdj5cbiAgICApKX1cbiAgPC9kaXY+XG4pXG5cbk1lbnVTZWN0aW9uLnByb3BUeXBlcyA9IHtcbiAgc2hhcmVkU3R5bGU6IFByb3BUeXBlcy5vYmplY3QsXG4gIGl0ZW1zOiBQcm9wVHlwZXMuYXJyYXksXG4gIHNlbGVjdGVkVmFsdWU6IFByb3BUeXBlcy5zdHJpbmcsXG4gIE1lbnVJdGVtOiBQcm9wVHlwZXMuZWxlbWVudFR5cGUsXG4gIG9uU2VsZWN0OiBQcm9wVHlwZXMuZnVuYyxcbn1cblxuY29uc3QgUGxheWVyU2V0dGluZ3MgPSAoe2Rlc2t0b3AsIGhhc0JvdHRvbVBhbmVsfSkgPT4ge1xuICBjb25zdCBzaGFyZWRTdHlsZSA9IGRlc2t0b3AgPyBkZWtzdG9wU3R5bGUgOiBzdHlsZVxuICBjb25zdCB7XG4gICAgc3RhdGU6IHtpc1NldHRpbmdzT3Blbn0sXG4gICAgZGlzcGF0Y2gsXG4gIH0gPSB1c2VDb250ZXh0KENvbnRleHQuVUkpXG4gIGNvbnN0IFtwYXRoLCBzZXRQYXRoXSA9IHVzZVN0YXRlKCcvJylcbiAgY29uc3QgbWVudVNlY3Rpb25zID0gdXNlU2V0dGluZ3MoKVxuICBjb25zdCBjaGFuZ2VTZXR0aW5ncyA9IHVzZUNoYW5nZVNldHRpbmdzKClcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGlmICghaXNTZXR0aW5nc09wZW4pIHtcbiAgICAgIHNldFBhdGgoJy8nKVxuICAgIH1cbiAgfSwgW2lzU2V0dGluZ3NPcGVuXSlcblxuICBjb25zdCByZWYgPSB1c2VSZWYoKVxuICB1c2VPbmNsaWNrT3V0c2lkZShcbiAgICAoKSA9PiB7XG4gICAgICBpZiAoaXNTZXR0aW5nc09wZW4pIHtcbiAgICAgICAgZGlzcGF0Y2goQWN0aW9uLmhpZGVNZW51KCkpXG4gICAgICB9XG4gICAgfSxcbiAgICB7XG4gICAgICByZWZzOiBbcmVmXSxcbiAgICAgIGV2ZW50VHlwZXM6IFsnY2xpY2snXSxcbiAgICB9XG4gIClcblxuICByZXR1cm4gKFxuICAgIDxkaXZcbiAgICAgIGNzcz17W1xuICAgICAgICBzaGFyZWRTdHlsZS5vdmVybGF5LFxuICAgICAgICBpc1NldHRpbmdzT3BlbiAmJiBzdHlsZS5vcGVuaW5nLFxuICAgICAgICBoYXNCb3R0b21QYW5lbCAmJiB7XG4gICAgICAgICAgYm90dG9tOiAnOGVtJyxcbiAgICAgICAgfSxcbiAgICAgIF19XG4gICAgPlxuICAgICAgPGRpdiByZWY9e3JlZn0gY2xhc3NOYW1lPVwia2tzLXBsYXllcl9fbWVudVwiIGNzcz17c2hhcmVkU3R5bGUuY29udGFpbmVyfT5cbiAgICAgICAge3BhdGggPT09ICcvJyAmJiAoXG4gICAgICAgICAgPEZyYWdtZW50PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJra3MtcGxheWVyX19tZW51LWhlYWRcIiBjc3M9e3NoYXJlZFN0eWxlLmhlYWR9PlxuICAgICAgICAgICAgICB7IWRlc2t0b3AgJiYgKFxuICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgIGNzcz17c3R5bGUuZGlzbWlzc31cbiAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IGRpc3BhdGNoKEFjdGlvbi5oaWRlTWVudSgpKX1cbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICA8Rm9ybWF0dGVkTWVzc2FnZSBpZD1cIktLUy5TRVRUSU5HXCIgLz5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAge21lbnVTZWN0aW9ucy5tYXAoKHtzZWN0aW9uLCB0aXRsZSwgaXRlbXMsIHNlbGVjdGVkVmFsdWV9KSA9PiB7XG4gICAgICAgICAgICAgIGNvbnN0IHNlbGVjdGVkTmFtZSA9XG4gICAgICAgICAgICAgICAgaXRlbXMuZmluZChpdGVtID0+IGl0ZW0udmFsdWUgPT09IHNlbGVjdGVkVmFsdWUpPy5sYWJlbCB8fFxuICAgICAgICAgICAgICAgIHNlbGVjdGVkVmFsdWVcblxuICAgICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICAgIGNzcz17W3N0eWxlLnJvdywgc3R5bGUuaGFzT3B0aW9uc119XG4gICAgICAgICAgICAgICAgICBrZXk9e3NlY3Rpb259XG4gICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBzZXRUaW1lb3V0KCgpID0+IHNldFBhdGgoYC8ke3NlY3Rpb259YCksIDEpfVxuICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgIDxGb3JtYXR0ZWRNZXNzYWdlIGlkPXt0aXRsZX0gLz5cbiAgICAgICAgICAgICAgICAgIDxkaXYgY3NzPXtbc3R5bGUuc3BhY2VdfSAvPlxuICAgICAgICAgICAgICAgICAgPE1lbnVJdGVtVGV4dCB0ZXh0PXtzZWxlY3RlZE5hbWV9IC8+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIClcbiAgICAgICAgICAgIH0pfVxuICAgICAgICAgIDwvRnJhZ21lbnQ+XG4gICAgICAgICl9XG4gICAgICAgIHttZW51U2VjdGlvbnMubWFwKFxuICAgICAgICAgICh7c2VjdGlvbiwgdGl0bGUsIGl0ZW1zLCBzZWxlY3RlZFZhbHVlfSkgPT5cbiAgICAgICAgICAgIHBhdGggPT09IGAvJHtzZWN0aW9ufWAgJiYgKFxuICAgICAgICAgICAgICA8RnJhZ21lbnQga2V5PXtzZWN0aW9ufT5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImtrcy1wbGF5ZXJfX21lbnUtaGVhZFwiIGNzcz17c2hhcmVkU3R5bGUuaGVhZH0+XG4gICAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICAgIGNzcz17c3R5bGUuYmFja31cbiAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gc2V0VGltZW91dCgoKSA9PiBzZXRQYXRoKCcvJyksIDEpfVxuICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgIDxGb3JtYXR0ZWRNZXNzYWdlIGlkPXt0aXRsZX0gLz5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8TWVudVNlY3Rpb25cbiAgICAgICAgICAgICAgICAgIGtleT17c2VjdGlvbn1cbiAgICAgICAgICAgICAgICAgIHNoYXJlZFN0eWxlPXtzaGFyZWRTdHlsZX1cbiAgICAgICAgICAgICAgICAgIHsuLi57aXRlbXMsIHNlbGVjdGVkVmFsdWV9fVxuICAgICAgICAgICAgICAgICAgb25TZWxlY3Q9e3ZhbHVlID0+IHtcbiAgICAgICAgICAgICAgICAgICAgZGlzcGF0Y2goQWN0aW9uLmhpZGVNZW51KCkpXG4gICAgICAgICAgICAgICAgICAgIGlmICh2YWx1ZSAhPT0gc2VsZWN0ZWRWYWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICAgIGNoYW5nZVNldHRpbmdzKHtzZWN0aW9uLCB2YWx1ZX0pXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgPC9GcmFnbWVudD5cbiAgICAgICAgICAgIClcbiAgICAgICAgKX1cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICApXG59XG5cblBsYXllclNldHRpbmdzLnByb3BUeXBlcyA9IHtcbiAgZGVza3RvcDogUHJvcFR5cGVzLmJvb2wsXG4gIGhhc0JvdHRvbVBhbmVsOiBQcm9wVHlwZXMuYm9vbCxcbn1cblxuZXhwb3J0IGRlZmF1bHQgUGxheWVyU2V0dGluZ3NcbiJdfQ== */',
          ],
          onClick: () => onSelect(value),
          children: [
            jsx$1(MenuItemText, {
              text: label || value,
            }),
            jsx$1('div', {
              css: [
                style$1.space,
                process.env.NODE_ENV === 'production'
                  ? ''
                  : ';label:MenuSection;',
                process.env.NODE_ENV === 'production'
                  ? ''
                  : '/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlBsYXllclNldHRpbmdzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQXFLYSIsImZpbGUiOiJQbGF5ZXJTZXR0aW5ncy5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qIEBqc3hJbXBvcnRTb3VyY2UgQGVtb3Rpb24vcmVhY3QgKi9cbmltcG9ydCB7dXNlU3RhdGUsIHVzZUVmZmVjdCwgdXNlQ29udGV4dCwgdXNlUmVmLCBGcmFnbWVudH0gZnJvbSAncmVhY3QnXG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnXG5pbXBvcnQgY2xhc3NuYW1lcyBmcm9tICdjbGFzc25hbWVzJ1xuaW1wb3J0IHVzZU9uY2xpY2tPdXRzaWRlIGZyb20gJ3JlYWN0LWNvb2wtb25jbGlja291dHNpZGUnXG5cbmltcG9ydCB7dXNlQ2hhbmdlU2V0dGluZ3MsIHVzZVNldHRpbmdzfSBmcm9tICdwbGF5ZXIvc2V0dGluZ3MnXG5pbXBvcnQge0NvbnRleHR9IGZyb20gJ3BsYXllci9zdG9yZSdcbmltcG9ydCBBY3Rpb24gZnJvbSAncGxheWVyL3N0b3JlL2FjdGlvbi9VSSdcbmltcG9ydCBpY29uIGZyb20gJ3N0eWxlL2ljb24nXG5pbXBvcnQge0Zvcm1hdHRlZE1lc3NhZ2V9IGZyb20gJ2NvbnRleHQvSTE4bidcblxuY29uc3Qgc3R5bGUgPSB7XG4gIGhlYWQ6IHtcbiAgICBwb3NpdGlvbjogJ3N0aWNreScsXG4gICAgekluZGV4OiAnMScsXG4gICAgdG9wOiAnMCcsXG4gICAgZGlzcGxheTogJ2ZsZXgnLFxuICAgIGFsaWduSXRlbXM6ICdjZW50ZXInLFxuICAgIHBhZGRpbmc6ICcxcmVtIDEuNXJlbScsXG4gICAgY29sb3I6ICd3aGl0ZScsXG4gICAgYmFja2dyb3VuZENvbG9yOiAnaW5oZXJpdCcsXG4gICAgZm9udFNpemU6ICcxNnB4JyxcbiAgICBmb250V2VpZ2h0OiAnYm9sZCcsXG4gICAgYnV0dG9uOiB7XG4gICAgICBtYXJnaW5SaWdodDogJzFyZW0nLFxuICAgICAgcGFkZGluZzogJzAnLFxuICAgICAgd2lkdGg6ICcxcmVtJyxcbiAgICAgIGhlaWdodDogJzFyZW0nLFxuICAgICAgYm9yZGVyOiAnbm9uZScsXG4gICAgfSxcbiAgfSxcbiAgb3ZlcmxheToge1xuICAgIHBvc2l0aW9uOiAnYWJzb2x1dGUnLFxuICAgIHpJbmRleDogJy0yJyxcbiAgICB0b3A6ICcwJyxcbiAgICB3aWR0aDogJzEwMCUnLFxuICAgIGhlaWdodDogJzEwMCUnLFxuICAgIGRpc3BsYXk6ICdmbGV4JyxcbiAgICBhbGlnbkl0ZW1zOiAnY2VudGVyJyxcbiAgICBqdXN0aWZ5Q29udGVudDogJ2NlbnRlcicsXG4gICAgYmFja2dyb3VuZENvbG9yOiAncmdiYSgwLCAwLCAwLCAwLjYpJyxcbiAgICBvcGFjaXR5OiAnMCcsXG4gICAgdHJhbnNpdGlvbjogJ29wYWNpdHkgMC4ycyBlYXNlLCB0cmFuc2Zvcm0gMHMgZWFzZSAwLjJzJyxcbiAgfSxcbiAgY29udGFpbmVyOiB7XG4gICAgZmxleDogJzAgMThyZW0nLFxuICAgIG1heEhlaWdodDogJ2NhbGMoMTAwJSAtIDJyZW0pJyxcbiAgICBjb2xvcjogJyNjY2MnLFxuICAgIGJhY2tncm91bmQ6ICcjMzMzMzMzJyxcbiAgICB3aGl0ZVNwYWNlOiAnbm93cmFwJyxcbiAgICBib3JkZXJSYWRpdXM6ICc0cHgnLFxuICAgIHVzZXJTZWxlY3Q6ICdub25lJyxcbiAgICBvdmVyZmxvdzogJ2F1dG8nLFxuICB9LFxuICBvcGVuaW5nOiB7XG4gICAgekluZGV4OiAnMCcsXG4gICAgb3BhY2l0eTogJzEnLFxuICAgIHRyYW5zZm9ybTogJ3RyYW5zbGF0ZVkoMCknLFxuICAgIHRyYW5zaXRpb246ICdvcGFjaXR5IDAuMnMgZWFzZScsXG4gIH0sXG4gIHRpdGxlOiB7XG4gICAgcGFkZGluZzogJzEycHggMThweCcsXG4gIH0sXG4gIGRpc21pc3M6IHtcbiAgICBiYWNrZ3JvdW5kOiBgY2VudGVyIC8gMXJlbSBuby1yZXBlYXQgdXJsKCR7aWNvbi5jbG9zZX0pLCB0cmFuc3BhcmVudGAsXG4gIH0sXG4gIGJhY2s6IHtcbiAgICBiYWNrZ3JvdW5kOiBgY2VudGVyIC8gMXJlbSBuby1yZXBlYXQgdXJsKCR7aWNvbi5iYWNrfSksIHRyYW5zcGFyZW50YCxcbiAgfSxcbiAgcm93OiB7XG4gICAgY3Vyc29yOiAncG9pbnRlcicsXG4gICAgZGlzcGxheTogJ2ZsZXgnLFxuICAgIHBhZGRpbmc6ICcxcmVtIDEuNXJlbScsXG4gICAgZm9udFNpemU6ICcxNnB4JyxcbiAgICAnOjphZnRlcic6IHtcbiAgICAgIGNvbnRlbnQ6ICdcIiBcIicsXG4gICAgICBtYXJnaW5MZWZ0OiAnMXJlbScsXG4gICAgICB3aWR0aDogJzIwcHgnLFxuICAgICAgaGVpZ2h0OiAnMjBweCcsXG4gICAgICBkaXNwbGF5OiAnaW5saW5lLWJsb2NrJyxcbiAgICAgIGNvbG9yOiAnd2hpdGUnLFxuICAgICAgYmFja2dyb3VuZFBvc2l0aW9uOiAnY2VudGVyJyxcbiAgICAgIGJhY2tncm91bmRTaXplOiAnY292ZXInLFxuICAgIH0sXG4gIH0sXG4gIHNwYWNlOiB7XG4gICAgZmxleDogJzEnLFxuICB9LFxuICBoYXNPcHRpb25zOiB7XG4gICAgJzo6YWZ0ZXInOiB7XG4gICAgICBiYWNrZ3JvdW5kSW1hZ2U6IGB1cmwoJHtpY29uLmFycm93VG9wfSlgLFxuICAgICAgdHJhbnNmb3JtOiAncm90YXRlKDkwZGVnKScsXG4gICAgfSxcbiAgfSxcbiAgc2VsZWN0ZWQ6IHtcbiAgICAnOjphZnRlcic6IHtcbiAgICAgIGJhY2tncm91bmRJbWFnZTogYHVybCgke2ljb24uY2hlY2t9KWAsXG4gICAgfSxcbiAgfSxcbn1cblxuY29uc3QgZGVrc3RvcFN0eWxlID0ge1xuICBvdmVybGF5OiB7XG4gICAgcG9zaXRpb246ICdhYnNvbHV0ZScsXG4gICAgYm90dG9tOiAnNWVtJyxcbiAgICByaWdodDogJzNyZW0nLFxuICAgIGRpc3BsYXk6ICdmbGV4JyxcbiAgICBhbGlnbkl0ZW1zOiAnZmxleC1lbmQnLFxuICAgIHdpZHRoOiAnMTVyZW0nLFxuICAgIGhlaWdodDogJ2NhbGMoMTAwJSAtIDhyZW0pJyxcbiAgICBvcGFjaXR5OiAnMCcsXG4gICAgdHJhbnNmb3JtOiAndHJhbnNsYXRlWSgtMTAwdmgpJyxcbiAgfSxcbiAgY29udGFpbmVyOiB7XG4gICAgLi4uc3R5bGUuY29udGFpbmVyLFxuICAgIG1heEhlaWdodDogJzEwMCUnLFxuICAgIGJhY2tncm91bmQ6ICdyZ2JhKDAsIDAsIDAsIDAuNyknLFxuICB9LFxuICBoZWFkOiB7XG4gICAgLi4uc3R5bGUuaGVhZCxcbiAgICBiYWNrZ3JvdW5kOiAnIzAwMCcsXG4gIH0sXG4gIHJvdzoge1xuICAgIC4uLnN0eWxlLnJvdyxcbiAgICAnOjphZnRlcic6IHt9LFxuICAgICc6OmJlZm9yZSc6IHtcbiAgICAgIC4uLnN0eWxlLnJvd1snOjphZnRlciddLFxuICAgICAgbWFyZ2luTGVmdDogJzAnLFxuICAgICAgbWFyZ2luUmlnaHQ6ICc0cHgnLFxuICAgIH0sXG4gIH0sXG4gIGhhc09wdGlvbnM6IHtcbiAgICAnOjpiZWZvcmUnOiB7XG4gICAgICBiYWNrZ3JvdW5kSW1hZ2U6IGB1cmwoJHtpY29uLmFycm93VG9wfSlgLFxuICAgICAgdHJhbnNmb3JtOiAncm90YXRlKDkwZGVnKScsXG4gICAgfSxcbiAgfSxcbiAgc2VsZWN0ZWQ6IHtcbiAgICAnOjpiZWZvcmUnOiB7XG4gICAgICBiYWNrZ3JvdW5kSW1hZ2U6IGB1cmwoJHtpY29uLmNoZWNrfSlgLFxuICAgIH0sXG4gIH0sXG59XG5cbmNvbnN0IE1lbnVJdGVtVGV4dCA9ICh7dGV4dH0pID0+IChcbiAgPEZvcm1hdHRlZE1lc3NhZ2UgaWQ9e2BLS1MuU0VUVElORy4ke3RleHR9YH0gZ2V0RGVmYXVsdD17KCkgPT4gdGV4dH0gLz5cbilcblxuTWVudUl0ZW1UZXh0LnByb3BUeXBlcyA9IHtcbiAgdGV4dDogUHJvcFR5cGVzLnN0cmluZyxcbn1cblxuY29uc3QgTWVudVNlY3Rpb24gPSAoe3NoYXJlZFN0eWxlLCBpdGVtcyA9IFtdLCBzZWxlY3RlZFZhbHVlLCBvblNlbGVjdH0pID0+IChcbiAgPGRpdiBjbGFzc05hbWU9XCJra3MtcGxheWVyX19tZW51LWNvbnRlbnRcIj5cbiAgICB7aXRlbXMubWFwKCh7dmFsdWUsIGxhYmVsfSkgPT4gKFxuICAgICAgPGRpdlxuICAgICAgICBrZXk9e3ZhbHVlfVxuICAgICAgICBjbGFzc05hbWU9e2NsYXNzbmFtZXMoJ2trcy1wbGF5ZXJfX21lbnUtaXRlbScsIHtcbiAgICAgICAgICAna2tzLXBsYXllcl9fbWVudS1pdGVtLS1zZWxlY3RlZCc6IHNlbGVjdGVkVmFsdWUgPT09IHZhbHVlLFxuICAgICAgICB9KX1cbiAgICAgICAgY3NzPXtbc2hhcmVkU3R5bGUucm93LCBzZWxlY3RlZFZhbHVlID09PSB2YWx1ZSAmJiBzaGFyZWRTdHlsZS5zZWxlY3RlZF19XG4gICAgICAgIG9uQ2xpY2s9eygpID0+IG9uU2VsZWN0KHZhbHVlKX1cbiAgICAgID5cbiAgICAgICAgPE1lbnVJdGVtVGV4dCB0ZXh0PXtsYWJlbCB8fCB2YWx1ZX0gLz5cbiAgICAgICAgPGRpdiBjc3M9e1tzdHlsZS5zcGFjZV19IC8+XG4gICAgICA8L2Rpdj5cbiAgICApKX1cbiAgPC9kaXY+XG4pXG5cbk1lbnVTZWN0aW9uLnByb3BUeXBlcyA9IHtcbiAgc2hhcmVkU3R5bGU6IFByb3BUeXBlcy5vYmplY3QsXG4gIGl0ZW1zOiBQcm9wVHlwZXMuYXJyYXksXG4gIHNlbGVjdGVkVmFsdWU6IFByb3BUeXBlcy5zdHJpbmcsXG4gIE1lbnVJdGVtOiBQcm9wVHlwZXMuZWxlbWVudFR5cGUsXG4gIG9uU2VsZWN0OiBQcm9wVHlwZXMuZnVuYyxcbn1cblxuY29uc3QgUGxheWVyU2V0dGluZ3MgPSAoe2Rlc2t0b3AsIGhhc0JvdHRvbVBhbmVsfSkgPT4ge1xuICBjb25zdCBzaGFyZWRTdHlsZSA9IGRlc2t0b3AgPyBkZWtzdG9wU3R5bGUgOiBzdHlsZVxuICBjb25zdCB7XG4gICAgc3RhdGU6IHtpc1NldHRpbmdzT3Blbn0sXG4gICAgZGlzcGF0Y2gsXG4gIH0gPSB1c2VDb250ZXh0KENvbnRleHQuVUkpXG4gIGNvbnN0IFtwYXRoLCBzZXRQYXRoXSA9IHVzZVN0YXRlKCcvJylcbiAgY29uc3QgbWVudVNlY3Rpb25zID0gdXNlU2V0dGluZ3MoKVxuICBjb25zdCBjaGFuZ2VTZXR0aW5ncyA9IHVzZUNoYW5nZVNldHRpbmdzKClcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGlmICghaXNTZXR0aW5nc09wZW4pIHtcbiAgICAgIHNldFBhdGgoJy8nKVxuICAgIH1cbiAgfSwgW2lzU2V0dGluZ3NPcGVuXSlcblxuICBjb25zdCByZWYgPSB1c2VSZWYoKVxuICB1c2VPbmNsaWNrT3V0c2lkZShcbiAgICAoKSA9PiB7XG4gICAgICBpZiAoaXNTZXR0aW5nc09wZW4pIHtcbiAgICAgICAgZGlzcGF0Y2goQWN0aW9uLmhpZGVNZW51KCkpXG4gICAgICB9XG4gICAgfSxcbiAgICB7XG4gICAgICByZWZzOiBbcmVmXSxcbiAgICAgIGV2ZW50VHlwZXM6IFsnY2xpY2snXSxcbiAgICB9XG4gIClcblxuICByZXR1cm4gKFxuICAgIDxkaXZcbiAgICAgIGNzcz17W1xuICAgICAgICBzaGFyZWRTdHlsZS5vdmVybGF5LFxuICAgICAgICBpc1NldHRpbmdzT3BlbiAmJiBzdHlsZS5vcGVuaW5nLFxuICAgICAgICBoYXNCb3R0b21QYW5lbCAmJiB7XG4gICAgICAgICAgYm90dG9tOiAnOGVtJyxcbiAgICAgICAgfSxcbiAgICAgIF19XG4gICAgPlxuICAgICAgPGRpdiByZWY9e3JlZn0gY2xhc3NOYW1lPVwia2tzLXBsYXllcl9fbWVudVwiIGNzcz17c2hhcmVkU3R5bGUuY29udGFpbmVyfT5cbiAgICAgICAge3BhdGggPT09ICcvJyAmJiAoXG4gICAgICAgICAgPEZyYWdtZW50PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJra3MtcGxheWVyX19tZW51LWhlYWRcIiBjc3M9e3NoYXJlZFN0eWxlLmhlYWR9PlxuICAgICAgICAgICAgICB7IWRlc2t0b3AgJiYgKFxuICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgIGNzcz17c3R5bGUuZGlzbWlzc31cbiAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IGRpc3BhdGNoKEFjdGlvbi5oaWRlTWVudSgpKX1cbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICA8Rm9ybWF0dGVkTWVzc2FnZSBpZD1cIktLUy5TRVRUSU5HXCIgLz5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAge21lbnVTZWN0aW9ucy5tYXAoKHtzZWN0aW9uLCB0aXRsZSwgaXRlbXMsIHNlbGVjdGVkVmFsdWV9KSA9PiB7XG4gICAgICAgICAgICAgIGNvbnN0IHNlbGVjdGVkTmFtZSA9XG4gICAgICAgICAgICAgICAgaXRlbXMuZmluZChpdGVtID0+IGl0ZW0udmFsdWUgPT09IHNlbGVjdGVkVmFsdWUpPy5sYWJlbCB8fFxuICAgICAgICAgICAgICAgIHNlbGVjdGVkVmFsdWVcblxuICAgICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICAgIGNzcz17W3N0eWxlLnJvdywgc3R5bGUuaGFzT3B0aW9uc119XG4gICAgICAgICAgICAgICAgICBrZXk9e3NlY3Rpb259XG4gICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBzZXRUaW1lb3V0KCgpID0+IHNldFBhdGgoYC8ke3NlY3Rpb259YCksIDEpfVxuICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgIDxGb3JtYXR0ZWRNZXNzYWdlIGlkPXt0aXRsZX0gLz5cbiAgICAgICAgICAgICAgICAgIDxkaXYgY3NzPXtbc3R5bGUuc3BhY2VdfSAvPlxuICAgICAgICAgICAgICAgICAgPE1lbnVJdGVtVGV4dCB0ZXh0PXtzZWxlY3RlZE5hbWV9IC8+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIClcbiAgICAgICAgICAgIH0pfVxuICAgICAgICAgIDwvRnJhZ21lbnQ+XG4gICAgICAgICl9XG4gICAgICAgIHttZW51U2VjdGlvbnMubWFwKFxuICAgICAgICAgICh7c2VjdGlvbiwgdGl0bGUsIGl0ZW1zLCBzZWxlY3RlZFZhbHVlfSkgPT5cbiAgICAgICAgICAgIHBhdGggPT09IGAvJHtzZWN0aW9ufWAgJiYgKFxuICAgICAgICAgICAgICA8RnJhZ21lbnQga2V5PXtzZWN0aW9ufT5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImtrcy1wbGF5ZXJfX21lbnUtaGVhZFwiIGNzcz17c2hhcmVkU3R5bGUuaGVhZH0+XG4gICAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICAgIGNzcz17c3R5bGUuYmFja31cbiAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gc2V0VGltZW91dCgoKSA9PiBzZXRQYXRoKCcvJyksIDEpfVxuICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgIDxGb3JtYXR0ZWRNZXNzYWdlIGlkPXt0aXRsZX0gLz5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8TWVudVNlY3Rpb25cbiAgICAgICAgICAgICAgICAgIGtleT17c2VjdGlvbn1cbiAgICAgICAgICAgICAgICAgIHNoYXJlZFN0eWxlPXtzaGFyZWRTdHlsZX1cbiAgICAgICAgICAgICAgICAgIHsuLi57aXRlbXMsIHNlbGVjdGVkVmFsdWV9fVxuICAgICAgICAgICAgICAgICAgb25TZWxlY3Q9e3ZhbHVlID0+IHtcbiAgICAgICAgICAgICAgICAgICAgZGlzcGF0Y2goQWN0aW9uLmhpZGVNZW51KCkpXG4gICAgICAgICAgICAgICAgICAgIGlmICh2YWx1ZSAhPT0gc2VsZWN0ZWRWYWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICAgIGNoYW5nZVNldHRpbmdzKHtzZWN0aW9uLCB2YWx1ZX0pXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgPC9GcmFnbWVudD5cbiAgICAgICAgICAgIClcbiAgICAgICAgKX1cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICApXG59XG5cblBsYXllclNldHRpbmdzLnByb3BUeXBlcyA9IHtcbiAgZGVza3RvcDogUHJvcFR5cGVzLmJvb2wsXG4gIGhhc0JvdHRvbVBhbmVsOiBQcm9wVHlwZXMuYm9vbCxcbn1cblxuZXhwb3J0IGRlZmF1bHQgUGxheWVyU2V0dGluZ3NcbiJdfQ== */',
              ],
            }),
          ],
        },
        value
      )
    ),
  })

MenuSection.propTypes = {
  sharedStyle: propTypes.object,
  items: propTypes.array,
  selectedValue: propTypes.string,
  MenuItem: propTypes.elementType,
  onSelect: propTypes.func,
}

const PlayerSettings = ({desktop, hasBottomPanel}) => {
  const sharedStyle = desktop ? dekstopStyle : style$1
  const {
    state: {isSettingsOpen},
    dispatch,
  } = useContext(Context.UI)
  const [path, setPath] = useState('/')
  const menuSections = useSettings()
  const changeSettings = useChangeSettings()
  useEffect(() => {
    if (!isSettingsOpen) {
      setPath('/')
    }
  }, [isSettingsOpen])
  const ref = useRef()
  useOnclickOutside(
    () => {
      if (isSettingsOpen) {
        dispatch(UiAction.hideMenu())
      }
    },
    {
      refs: [ref],
      eventTypes: ['click'],
    }
  )
  return jsx$1('div', {
    css: [
      sharedStyle.overlay,
      isSettingsOpen && style$1.opening,
      hasBottomPanel && {
        bottom: '8em',
      },
      process.env.NODE_ENV === 'production' ? '' : ';label:PlayerSettings;',
      process.env.NODE_ENV === 'production'
        ? ''
        : '/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlBsYXllclNldHRpbmdzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQWtOTSIsImZpbGUiOiJQbGF5ZXJTZXR0aW5ncy5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qIEBqc3hJbXBvcnRTb3VyY2UgQGVtb3Rpb24vcmVhY3QgKi9cbmltcG9ydCB7dXNlU3RhdGUsIHVzZUVmZmVjdCwgdXNlQ29udGV4dCwgdXNlUmVmLCBGcmFnbWVudH0gZnJvbSAncmVhY3QnXG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnXG5pbXBvcnQgY2xhc3NuYW1lcyBmcm9tICdjbGFzc25hbWVzJ1xuaW1wb3J0IHVzZU9uY2xpY2tPdXRzaWRlIGZyb20gJ3JlYWN0LWNvb2wtb25jbGlja291dHNpZGUnXG5cbmltcG9ydCB7dXNlQ2hhbmdlU2V0dGluZ3MsIHVzZVNldHRpbmdzfSBmcm9tICdwbGF5ZXIvc2V0dGluZ3MnXG5pbXBvcnQge0NvbnRleHR9IGZyb20gJ3BsYXllci9zdG9yZSdcbmltcG9ydCBBY3Rpb24gZnJvbSAncGxheWVyL3N0b3JlL2FjdGlvbi9VSSdcbmltcG9ydCBpY29uIGZyb20gJ3N0eWxlL2ljb24nXG5pbXBvcnQge0Zvcm1hdHRlZE1lc3NhZ2V9IGZyb20gJ2NvbnRleHQvSTE4bidcblxuY29uc3Qgc3R5bGUgPSB7XG4gIGhlYWQ6IHtcbiAgICBwb3NpdGlvbjogJ3N0aWNreScsXG4gICAgekluZGV4OiAnMScsXG4gICAgdG9wOiAnMCcsXG4gICAgZGlzcGxheTogJ2ZsZXgnLFxuICAgIGFsaWduSXRlbXM6ICdjZW50ZXInLFxuICAgIHBhZGRpbmc6ICcxcmVtIDEuNXJlbScsXG4gICAgY29sb3I6ICd3aGl0ZScsXG4gICAgYmFja2dyb3VuZENvbG9yOiAnaW5oZXJpdCcsXG4gICAgZm9udFNpemU6ICcxNnB4JyxcbiAgICBmb250V2VpZ2h0OiAnYm9sZCcsXG4gICAgYnV0dG9uOiB7XG4gICAgICBtYXJnaW5SaWdodDogJzFyZW0nLFxuICAgICAgcGFkZGluZzogJzAnLFxuICAgICAgd2lkdGg6ICcxcmVtJyxcbiAgICAgIGhlaWdodDogJzFyZW0nLFxuICAgICAgYm9yZGVyOiAnbm9uZScsXG4gICAgfSxcbiAgfSxcbiAgb3ZlcmxheToge1xuICAgIHBvc2l0aW9uOiAnYWJzb2x1dGUnLFxuICAgIHpJbmRleDogJy0yJyxcbiAgICB0b3A6ICcwJyxcbiAgICB3aWR0aDogJzEwMCUnLFxuICAgIGhlaWdodDogJzEwMCUnLFxuICAgIGRpc3BsYXk6ICdmbGV4JyxcbiAgICBhbGlnbkl0ZW1zOiAnY2VudGVyJyxcbiAgICBqdXN0aWZ5Q29udGVudDogJ2NlbnRlcicsXG4gICAgYmFja2dyb3VuZENvbG9yOiAncmdiYSgwLCAwLCAwLCAwLjYpJyxcbiAgICBvcGFjaXR5OiAnMCcsXG4gICAgdHJhbnNpdGlvbjogJ29wYWNpdHkgMC4ycyBlYXNlLCB0cmFuc2Zvcm0gMHMgZWFzZSAwLjJzJyxcbiAgfSxcbiAgY29udGFpbmVyOiB7XG4gICAgZmxleDogJzAgMThyZW0nLFxuICAgIG1heEhlaWdodDogJ2NhbGMoMTAwJSAtIDJyZW0pJyxcbiAgICBjb2xvcjogJyNjY2MnLFxuICAgIGJhY2tncm91bmQ6ICcjMzMzMzMzJyxcbiAgICB3aGl0ZVNwYWNlOiAnbm93cmFwJyxcbiAgICBib3JkZXJSYWRpdXM6ICc0cHgnLFxuICAgIHVzZXJTZWxlY3Q6ICdub25lJyxcbiAgICBvdmVyZmxvdzogJ2F1dG8nLFxuICB9LFxuICBvcGVuaW5nOiB7XG4gICAgekluZGV4OiAnMCcsXG4gICAgb3BhY2l0eTogJzEnLFxuICAgIHRyYW5zZm9ybTogJ3RyYW5zbGF0ZVkoMCknLFxuICAgIHRyYW5zaXRpb246ICdvcGFjaXR5IDAuMnMgZWFzZScsXG4gIH0sXG4gIHRpdGxlOiB7XG4gICAgcGFkZGluZzogJzEycHggMThweCcsXG4gIH0sXG4gIGRpc21pc3M6IHtcbiAgICBiYWNrZ3JvdW5kOiBgY2VudGVyIC8gMXJlbSBuby1yZXBlYXQgdXJsKCR7aWNvbi5jbG9zZX0pLCB0cmFuc3BhcmVudGAsXG4gIH0sXG4gIGJhY2s6IHtcbiAgICBiYWNrZ3JvdW5kOiBgY2VudGVyIC8gMXJlbSBuby1yZXBlYXQgdXJsKCR7aWNvbi5iYWNrfSksIHRyYW5zcGFyZW50YCxcbiAgfSxcbiAgcm93OiB7XG4gICAgY3Vyc29yOiAncG9pbnRlcicsXG4gICAgZGlzcGxheTogJ2ZsZXgnLFxuICAgIHBhZGRpbmc6ICcxcmVtIDEuNXJlbScsXG4gICAgZm9udFNpemU6ICcxNnB4JyxcbiAgICAnOjphZnRlcic6IHtcbiAgICAgIGNvbnRlbnQ6ICdcIiBcIicsXG4gICAgICBtYXJnaW5MZWZ0OiAnMXJlbScsXG4gICAgICB3aWR0aDogJzIwcHgnLFxuICAgICAgaGVpZ2h0OiAnMjBweCcsXG4gICAgICBkaXNwbGF5OiAnaW5saW5lLWJsb2NrJyxcbiAgICAgIGNvbG9yOiAnd2hpdGUnLFxuICAgICAgYmFja2dyb3VuZFBvc2l0aW9uOiAnY2VudGVyJyxcbiAgICAgIGJhY2tncm91bmRTaXplOiAnY292ZXInLFxuICAgIH0sXG4gIH0sXG4gIHNwYWNlOiB7XG4gICAgZmxleDogJzEnLFxuICB9LFxuICBoYXNPcHRpb25zOiB7XG4gICAgJzo6YWZ0ZXInOiB7XG4gICAgICBiYWNrZ3JvdW5kSW1hZ2U6IGB1cmwoJHtpY29uLmFycm93VG9wfSlgLFxuICAgICAgdHJhbnNmb3JtOiAncm90YXRlKDkwZGVnKScsXG4gICAgfSxcbiAgfSxcbiAgc2VsZWN0ZWQ6IHtcbiAgICAnOjphZnRlcic6IHtcbiAgICAgIGJhY2tncm91bmRJbWFnZTogYHVybCgke2ljb24uY2hlY2t9KWAsXG4gICAgfSxcbiAgfSxcbn1cblxuY29uc3QgZGVrc3RvcFN0eWxlID0ge1xuICBvdmVybGF5OiB7XG4gICAgcG9zaXRpb246ICdhYnNvbHV0ZScsXG4gICAgYm90dG9tOiAnNWVtJyxcbiAgICByaWdodDogJzNyZW0nLFxuICAgIGRpc3BsYXk6ICdmbGV4JyxcbiAgICBhbGlnbkl0ZW1zOiAnZmxleC1lbmQnLFxuICAgIHdpZHRoOiAnMTVyZW0nLFxuICAgIGhlaWdodDogJ2NhbGMoMTAwJSAtIDhyZW0pJyxcbiAgICBvcGFjaXR5OiAnMCcsXG4gICAgdHJhbnNmb3JtOiAndHJhbnNsYXRlWSgtMTAwdmgpJyxcbiAgfSxcbiAgY29udGFpbmVyOiB7XG4gICAgLi4uc3R5bGUuY29udGFpbmVyLFxuICAgIG1heEhlaWdodDogJzEwMCUnLFxuICAgIGJhY2tncm91bmQ6ICdyZ2JhKDAsIDAsIDAsIDAuNyknLFxuICB9LFxuICBoZWFkOiB7XG4gICAgLi4uc3R5bGUuaGVhZCxcbiAgICBiYWNrZ3JvdW5kOiAnIzAwMCcsXG4gIH0sXG4gIHJvdzoge1xuICAgIC4uLnN0eWxlLnJvdyxcbiAgICAnOjphZnRlcic6IHt9LFxuICAgICc6OmJlZm9yZSc6IHtcbiAgICAgIC4uLnN0eWxlLnJvd1snOjphZnRlciddLFxuICAgICAgbWFyZ2luTGVmdDogJzAnLFxuICAgICAgbWFyZ2luUmlnaHQ6ICc0cHgnLFxuICAgIH0sXG4gIH0sXG4gIGhhc09wdGlvbnM6IHtcbiAgICAnOjpiZWZvcmUnOiB7XG4gICAgICBiYWNrZ3JvdW5kSW1hZ2U6IGB1cmwoJHtpY29uLmFycm93VG9wfSlgLFxuICAgICAgdHJhbnNmb3JtOiAncm90YXRlKDkwZGVnKScsXG4gICAgfSxcbiAgfSxcbiAgc2VsZWN0ZWQ6IHtcbiAgICAnOjpiZWZvcmUnOiB7XG4gICAgICBiYWNrZ3JvdW5kSW1hZ2U6IGB1cmwoJHtpY29uLmNoZWNrfSlgLFxuICAgIH0sXG4gIH0sXG59XG5cbmNvbnN0IE1lbnVJdGVtVGV4dCA9ICh7dGV4dH0pID0+IChcbiAgPEZvcm1hdHRlZE1lc3NhZ2UgaWQ9e2BLS1MuU0VUVElORy4ke3RleHR9YH0gZ2V0RGVmYXVsdD17KCkgPT4gdGV4dH0gLz5cbilcblxuTWVudUl0ZW1UZXh0LnByb3BUeXBlcyA9IHtcbiAgdGV4dDogUHJvcFR5cGVzLnN0cmluZyxcbn1cblxuY29uc3QgTWVudVNlY3Rpb24gPSAoe3NoYXJlZFN0eWxlLCBpdGVtcyA9IFtdLCBzZWxlY3RlZFZhbHVlLCBvblNlbGVjdH0pID0+IChcbiAgPGRpdiBjbGFzc05hbWU9XCJra3MtcGxheWVyX19tZW51LWNvbnRlbnRcIj5cbiAgICB7aXRlbXMubWFwKCh7dmFsdWUsIGxhYmVsfSkgPT4gKFxuICAgICAgPGRpdlxuICAgICAgICBrZXk9e3ZhbHVlfVxuICAgICAgICBjbGFzc05hbWU9e2NsYXNzbmFtZXMoJ2trcy1wbGF5ZXJfX21lbnUtaXRlbScsIHtcbiAgICAgICAgICAna2tzLXBsYXllcl9fbWVudS1pdGVtLS1zZWxlY3RlZCc6IHNlbGVjdGVkVmFsdWUgPT09IHZhbHVlLFxuICAgICAgICB9KX1cbiAgICAgICAgY3NzPXtbc2hhcmVkU3R5bGUucm93LCBzZWxlY3RlZFZhbHVlID09PSB2YWx1ZSAmJiBzaGFyZWRTdHlsZS5zZWxlY3RlZF19XG4gICAgICAgIG9uQ2xpY2s9eygpID0+IG9uU2VsZWN0KHZhbHVlKX1cbiAgICAgID5cbiAgICAgICAgPE1lbnVJdGVtVGV4dCB0ZXh0PXtsYWJlbCB8fCB2YWx1ZX0gLz5cbiAgICAgICAgPGRpdiBjc3M9e1tzdHlsZS5zcGFjZV19IC8+XG4gICAgICA8L2Rpdj5cbiAgICApKX1cbiAgPC9kaXY+XG4pXG5cbk1lbnVTZWN0aW9uLnByb3BUeXBlcyA9IHtcbiAgc2hhcmVkU3R5bGU6IFByb3BUeXBlcy5vYmplY3QsXG4gIGl0ZW1zOiBQcm9wVHlwZXMuYXJyYXksXG4gIHNlbGVjdGVkVmFsdWU6IFByb3BUeXBlcy5zdHJpbmcsXG4gIE1lbnVJdGVtOiBQcm9wVHlwZXMuZWxlbWVudFR5cGUsXG4gIG9uU2VsZWN0OiBQcm9wVHlwZXMuZnVuYyxcbn1cblxuY29uc3QgUGxheWVyU2V0dGluZ3MgPSAoe2Rlc2t0b3AsIGhhc0JvdHRvbVBhbmVsfSkgPT4ge1xuICBjb25zdCBzaGFyZWRTdHlsZSA9IGRlc2t0b3AgPyBkZWtzdG9wU3R5bGUgOiBzdHlsZVxuICBjb25zdCB7XG4gICAgc3RhdGU6IHtpc1NldHRpbmdzT3Blbn0sXG4gICAgZGlzcGF0Y2gsXG4gIH0gPSB1c2VDb250ZXh0KENvbnRleHQuVUkpXG4gIGNvbnN0IFtwYXRoLCBzZXRQYXRoXSA9IHVzZVN0YXRlKCcvJylcbiAgY29uc3QgbWVudVNlY3Rpb25zID0gdXNlU2V0dGluZ3MoKVxuICBjb25zdCBjaGFuZ2VTZXR0aW5ncyA9IHVzZUNoYW5nZVNldHRpbmdzKClcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGlmICghaXNTZXR0aW5nc09wZW4pIHtcbiAgICAgIHNldFBhdGgoJy8nKVxuICAgIH1cbiAgfSwgW2lzU2V0dGluZ3NPcGVuXSlcblxuICBjb25zdCByZWYgPSB1c2VSZWYoKVxuICB1c2VPbmNsaWNrT3V0c2lkZShcbiAgICAoKSA9PiB7XG4gICAgICBpZiAoaXNTZXR0aW5nc09wZW4pIHtcbiAgICAgICAgZGlzcGF0Y2goQWN0aW9uLmhpZGVNZW51KCkpXG4gICAgICB9XG4gICAgfSxcbiAgICB7XG4gICAgICByZWZzOiBbcmVmXSxcbiAgICAgIGV2ZW50VHlwZXM6IFsnY2xpY2snXSxcbiAgICB9XG4gIClcblxuICByZXR1cm4gKFxuICAgIDxkaXZcbiAgICAgIGNzcz17W1xuICAgICAgICBzaGFyZWRTdHlsZS5vdmVybGF5LFxuICAgICAgICBpc1NldHRpbmdzT3BlbiAmJiBzdHlsZS5vcGVuaW5nLFxuICAgICAgICBoYXNCb3R0b21QYW5lbCAmJiB7XG4gICAgICAgICAgYm90dG9tOiAnOGVtJyxcbiAgICAgICAgfSxcbiAgICAgIF19XG4gICAgPlxuICAgICAgPGRpdiByZWY9e3JlZn0gY2xhc3NOYW1lPVwia2tzLXBsYXllcl9fbWVudVwiIGNzcz17c2hhcmVkU3R5bGUuY29udGFpbmVyfT5cbiAgICAgICAge3BhdGggPT09ICcvJyAmJiAoXG4gICAgICAgICAgPEZyYWdtZW50PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJra3MtcGxheWVyX19tZW51LWhlYWRcIiBjc3M9e3NoYXJlZFN0eWxlLmhlYWR9PlxuICAgICAgICAgICAgICB7IWRlc2t0b3AgJiYgKFxuICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgIGNzcz17c3R5bGUuZGlzbWlzc31cbiAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IGRpc3BhdGNoKEFjdGlvbi5oaWRlTWVudSgpKX1cbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICA8Rm9ybWF0dGVkTWVzc2FnZSBpZD1cIktLUy5TRVRUSU5HXCIgLz5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAge21lbnVTZWN0aW9ucy5tYXAoKHtzZWN0aW9uLCB0aXRsZSwgaXRlbXMsIHNlbGVjdGVkVmFsdWV9KSA9PiB7XG4gICAgICAgICAgICAgIGNvbnN0IHNlbGVjdGVkTmFtZSA9XG4gICAgICAgICAgICAgICAgaXRlbXMuZmluZChpdGVtID0+IGl0ZW0udmFsdWUgPT09IHNlbGVjdGVkVmFsdWUpPy5sYWJlbCB8fFxuICAgICAgICAgICAgICAgIHNlbGVjdGVkVmFsdWVcblxuICAgICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICAgIGNzcz17W3N0eWxlLnJvdywgc3R5bGUuaGFzT3B0aW9uc119XG4gICAgICAgICAgICAgICAgICBrZXk9e3NlY3Rpb259XG4gICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBzZXRUaW1lb3V0KCgpID0+IHNldFBhdGgoYC8ke3NlY3Rpb259YCksIDEpfVxuICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgIDxGb3JtYXR0ZWRNZXNzYWdlIGlkPXt0aXRsZX0gLz5cbiAgICAgICAgICAgICAgICAgIDxkaXYgY3NzPXtbc3R5bGUuc3BhY2VdfSAvPlxuICAgICAgICAgICAgICAgICAgPE1lbnVJdGVtVGV4dCB0ZXh0PXtzZWxlY3RlZE5hbWV9IC8+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIClcbiAgICAgICAgICAgIH0pfVxuICAgICAgICAgIDwvRnJhZ21lbnQ+XG4gICAgICAgICl9XG4gICAgICAgIHttZW51U2VjdGlvbnMubWFwKFxuICAgICAgICAgICh7c2VjdGlvbiwgdGl0bGUsIGl0ZW1zLCBzZWxlY3RlZFZhbHVlfSkgPT5cbiAgICAgICAgICAgIHBhdGggPT09IGAvJHtzZWN0aW9ufWAgJiYgKFxuICAgICAgICAgICAgICA8RnJhZ21lbnQga2V5PXtzZWN0aW9ufT5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImtrcy1wbGF5ZXJfX21lbnUtaGVhZFwiIGNzcz17c2hhcmVkU3R5bGUuaGVhZH0+XG4gICAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICAgIGNzcz17c3R5bGUuYmFja31cbiAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gc2V0VGltZW91dCgoKSA9PiBzZXRQYXRoKCcvJyksIDEpfVxuICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgIDxGb3JtYXR0ZWRNZXNzYWdlIGlkPXt0aXRsZX0gLz5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8TWVudVNlY3Rpb25cbiAgICAgICAgICAgICAgICAgIGtleT17c2VjdGlvbn1cbiAgICAgICAgICAgICAgICAgIHNoYXJlZFN0eWxlPXtzaGFyZWRTdHlsZX1cbiAgICAgICAgICAgICAgICAgIHsuLi57aXRlbXMsIHNlbGVjdGVkVmFsdWV9fVxuICAgICAgICAgICAgICAgICAgb25TZWxlY3Q9e3ZhbHVlID0+IHtcbiAgICAgICAgICAgICAgICAgICAgZGlzcGF0Y2goQWN0aW9uLmhpZGVNZW51KCkpXG4gICAgICAgICAgICAgICAgICAgIGlmICh2YWx1ZSAhPT0gc2VsZWN0ZWRWYWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICAgIGNoYW5nZVNldHRpbmdzKHtzZWN0aW9uLCB2YWx1ZX0pXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgPC9GcmFnbWVudD5cbiAgICAgICAgICAgIClcbiAgICAgICAgKX1cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICApXG59XG5cblBsYXllclNldHRpbmdzLnByb3BUeXBlcyA9IHtcbiAgZGVza3RvcDogUHJvcFR5cGVzLmJvb2wsXG4gIGhhc0JvdHRvbVBhbmVsOiBQcm9wVHlwZXMuYm9vbCxcbn1cblxuZXhwb3J0IGRlZmF1bHQgUGxheWVyU2V0dGluZ3NcbiJdfQ== */',
    ],
    children: jsxs('div', {
      ref: ref,
      className: 'kks-player__menu',
      css: sharedStyle.container,
      children: [
        path === '/' &&
          jsxs(Fragment$2, {
            children: [
              jsxs('div', {
                className: 'kks-player__menu-head',
                css: sharedStyle.head,
                children: [
                  !desktop &&
                    jsx$1('button', {
                      css: style$1.dismiss,
                      onClick: () => dispatch(UiAction.hideMenu()),
                    }),
                  jsx$1(FormattedMessage, {
                    id: 'KKS.SETTING',
                  }),
                ],
              }),
              menuSections.map(({section, title, items, selectedValue}) => {
                var _items$find

                const selectedName =
                  ((_items$find = items.find(
                    item => item.value === selectedValue
                  )) === null || _items$find === void 0
                    ? void 0
                    : _items$find.label) || selectedValue
                return jsxs(
                  'div',
                  {
                    css: [
                      style$1.row,
                      style$1.hasOptions,
                      process.env.NODE_ENV === 'production'
                        ? ''
                        : ';label:PlayerSettings;',
                      process.env.NODE_ENV === 'production'
                        ? ''
                        : '/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlBsYXllclNldHRpbmdzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQTZPa0IiLCJmaWxlIjoiUGxheWVyU2V0dGluZ3MuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBAanN4SW1wb3J0U291cmNlIEBlbW90aW9uL3JlYWN0ICovXG5pbXBvcnQge3VzZVN0YXRlLCB1c2VFZmZlY3QsIHVzZUNvbnRleHQsIHVzZVJlZiwgRnJhZ21lbnR9IGZyb20gJ3JlYWN0J1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJ1xuaW1wb3J0IGNsYXNzbmFtZXMgZnJvbSAnY2xhc3NuYW1lcydcbmltcG9ydCB1c2VPbmNsaWNrT3V0c2lkZSBmcm9tICdyZWFjdC1jb29sLW9uY2xpY2tvdXRzaWRlJ1xuXG5pbXBvcnQge3VzZUNoYW5nZVNldHRpbmdzLCB1c2VTZXR0aW5nc30gZnJvbSAncGxheWVyL3NldHRpbmdzJ1xuaW1wb3J0IHtDb250ZXh0fSBmcm9tICdwbGF5ZXIvc3RvcmUnXG5pbXBvcnQgQWN0aW9uIGZyb20gJ3BsYXllci9zdG9yZS9hY3Rpb24vVUknXG5pbXBvcnQgaWNvbiBmcm9tICdzdHlsZS9pY29uJ1xuaW1wb3J0IHtGb3JtYXR0ZWRNZXNzYWdlfSBmcm9tICdjb250ZXh0L0kxOG4nXG5cbmNvbnN0IHN0eWxlID0ge1xuICBoZWFkOiB7XG4gICAgcG9zaXRpb246ICdzdGlja3knLFxuICAgIHpJbmRleDogJzEnLFxuICAgIHRvcDogJzAnLFxuICAgIGRpc3BsYXk6ICdmbGV4JyxcbiAgICBhbGlnbkl0ZW1zOiAnY2VudGVyJyxcbiAgICBwYWRkaW5nOiAnMXJlbSAxLjVyZW0nLFxuICAgIGNvbG9yOiAnd2hpdGUnLFxuICAgIGJhY2tncm91bmRDb2xvcjogJ2luaGVyaXQnLFxuICAgIGZvbnRTaXplOiAnMTZweCcsXG4gICAgZm9udFdlaWdodDogJ2JvbGQnLFxuICAgIGJ1dHRvbjoge1xuICAgICAgbWFyZ2luUmlnaHQ6ICcxcmVtJyxcbiAgICAgIHBhZGRpbmc6ICcwJyxcbiAgICAgIHdpZHRoOiAnMXJlbScsXG4gICAgICBoZWlnaHQ6ICcxcmVtJyxcbiAgICAgIGJvcmRlcjogJ25vbmUnLFxuICAgIH0sXG4gIH0sXG4gIG92ZXJsYXk6IHtcbiAgICBwb3NpdGlvbjogJ2Fic29sdXRlJyxcbiAgICB6SW5kZXg6ICctMicsXG4gICAgdG9wOiAnMCcsXG4gICAgd2lkdGg6ICcxMDAlJyxcbiAgICBoZWlnaHQ6ICcxMDAlJyxcbiAgICBkaXNwbGF5OiAnZmxleCcsXG4gICAgYWxpZ25JdGVtczogJ2NlbnRlcicsXG4gICAganVzdGlmeUNvbnRlbnQ6ICdjZW50ZXInLFxuICAgIGJhY2tncm91bmRDb2xvcjogJ3JnYmEoMCwgMCwgMCwgMC42KScsXG4gICAgb3BhY2l0eTogJzAnLFxuICAgIHRyYW5zaXRpb246ICdvcGFjaXR5IDAuMnMgZWFzZSwgdHJhbnNmb3JtIDBzIGVhc2UgMC4ycycsXG4gIH0sXG4gIGNvbnRhaW5lcjoge1xuICAgIGZsZXg6ICcwIDE4cmVtJyxcbiAgICBtYXhIZWlnaHQ6ICdjYWxjKDEwMCUgLSAycmVtKScsXG4gICAgY29sb3I6ICcjY2NjJyxcbiAgICBiYWNrZ3JvdW5kOiAnIzMzMzMzMycsXG4gICAgd2hpdGVTcGFjZTogJ25vd3JhcCcsXG4gICAgYm9yZGVyUmFkaXVzOiAnNHB4JyxcbiAgICB1c2VyU2VsZWN0OiAnbm9uZScsXG4gICAgb3ZlcmZsb3c6ICdhdXRvJyxcbiAgfSxcbiAgb3BlbmluZzoge1xuICAgIHpJbmRleDogJzAnLFxuICAgIG9wYWNpdHk6ICcxJyxcbiAgICB0cmFuc2Zvcm06ICd0cmFuc2xhdGVZKDApJyxcbiAgICB0cmFuc2l0aW9uOiAnb3BhY2l0eSAwLjJzIGVhc2UnLFxuICB9LFxuICB0aXRsZToge1xuICAgIHBhZGRpbmc6ICcxMnB4IDE4cHgnLFxuICB9LFxuICBkaXNtaXNzOiB7XG4gICAgYmFja2dyb3VuZDogYGNlbnRlciAvIDFyZW0gbm8tcmVwZWF0IHVybCgke2ljb24uY2xvc2V9KSwgdHJhbnNwYXJlbnRgLFxuICB9LFxuICBiYWNrOiB7XG4gICAgYmFja2dyb3VuZDogYGNlbnRlciAvIDFyZW0gbm8tcmVwZWF0IHVybCgke2ljb24uYmFja30pLCB0cmFuc3BhcmVudGAsXG4gIH0sXG4gIHJvdzoge1xuICAgIGN1cnNvcjogJ3BvaW50ZXInLFxuICAgIGRpc3BsYXk6ICdmbGV4JyxcbiAgICBwYWRkaW5nOiAnMXJlbSAxLjVyZW0nLFxuICAgIGZvbnRTaXplOiAnMTZweCcsXG4gICAgJzo6YWZ0ZXInOiB7XG4gICAgICBjb250ZW50OiAnXCIgXCInLFxuICAgICAgbWFyZ2luTGVmdDogJzFyZW0nLFxuICAgICAgd2lkdGg6ICcyMHB4JyxcbiAgICAgIGhlaWdodDogJzIwcHgnLFxuICAgICAgZGlzcGxheTogJ2lubGluZS1ibG9jaycsXG4gICAgICBjb2xvcjogJ3doaXRlJyxcbiAgICAgIGJhY2tncm91bmRQb3NpdGlvbjogJ2NlbnRlcicsXG4gICAgICBiYWNrZ3JvdW5kU2l6ZTogJ2NvdmVyJyxcbiAgICB9LFxuICB9LFxuICBzcGFjZToge1xuICAgIGZsZXg6ICcxJyxcbiAgfSxcbiAgaGFzT3B0aW9uczoge1xuICAgICc6OmFmdGVyJzoge1xuICAgICAgYmFja2dyb3VuZEltYWdlOiBgdXJsKCR7aWNvbi5hcnJvd1RvcH0pYCxcbiAgICAgIHRyYW5zZm9ybTogJ3JvdGF0ZSg5MGRlZyknLFxuICAgIH0sXG4gIH0sXG4gIHNlbGVjdGVkOiB7XG4gICAgJzo6YWZ0ZXInOiB7XG4gICAgICBiYWNrZ3JvdW5kSW1hZ2U6IGB1cmwoJHtpY29uLmNoZWNrfSlgLFxuICAgIH0sXG4gIH0sXG59XG5cbmNvbnN0IGRla3N0b3BTdHlsZSA9IHtcbiAgb3ZlcmxheToge1xuICAgIHBvc2l0aW9uOiAnYWJzb2x1dGUnLFxuICAgIGJvdHRvbTogJzVlbScsXG4gICAgcmlnaHQ6ICczcmVtJyxcbiAgICBkaXNwbGF5OiAnZmxleCcsXG4gICAgYWxpZ25JdGVtczogJ2ZsZXgtZW5kJyxcbiAgICB3aWR0aDogJzE1cmVtJyxcbiAgICBoZWlnaHQ6ICdjYWxjKDEwMCUgLSA4cmVtKScsXG4gICAgb3BhY2l0eTogJzAnLFxuICAgIHRyYW5zZm9ybTogJ3RyYW5zbGF0ZVkoLTEwMHZoKScsXG4gIH0sXG4gIGNvbnRhaW5lcjoge1xuICAgIC4uLnN0eWxlLmNvbnRhaW5lcixcbiAgICBtYXhIZWlnaHQ6ICcxMDAlJyxcbiAgICBiYWNrZ3JvdW5kOiAncmdiYSgwLCAwLCAwLCAwLjcpJyxcbiAgfSxcbiAgaGVhZDoge1xuICAgIC4uLnN0eWxlLmhlYWQsXG4gICAgYmFja2dyb3VuZDogJyMwMDAnLFxuICB9LFxuICByb3c6IHtcbiAgICAuLi5zdHlsZS5yb3csXG4gICAgJzo6YWZ0ZXInOiB7fSxcbiAgICAnOjpiZWZvcmUnOiB7XG4gICAgICAuLi5zdHlsZS5yb3dbJzo6YWZ0ZXInXSxcbiAgICAgIG1hcmdpbkxlZnQ6ICcwJyxcbiAgICAgIG1hcmdpblJpZ2h0OiAnNHB4JyxcbiAgICB9LFxuICB9LFxuICBoYXNPcHRpb25zOiB7XG4gICAgJzo6YmVmb3JlJzoge1xuICAgICAgYmFja2dyb3VuZEltYWdlOiBgdXJsKCR7aWNvbi5hcnJvd1RvcH0pYCxcbiAgICAgIHRyYW5zZm9ybTogJ3JvdGF0ZSg5MGRlZyknLFxuICAgIH0sXG4gIH0sXG4gIHNlbGVjdGVkOiB7XG4gICAgJzo6YmVmb3JlJzoge1xuICAgICAgYmFja2dyb3VuZEltYWdlOiBgdXJsKCR7aWNvbi5jaGVja30pYCxcbiAgICB9LFxuICB9LFxufVxuXG5jb25zdCBNZW51SXRlbVRleHQgPSAoe3RleHR9KSA9PiAoXG4gIDxGb3JtYXR0ZWRNZXNzYWdlIGlkPXtgS0tTLlNFVFRJTkcuJHt0ZXh0fWB9IGdldERlZmF1bHQ9eygpID0+IHRleHR9IC8+XG4pXG5cbk1lbnVJdGVtVGV4dC5wcm9wVHlwZXMgPSB7XG4gIHRleHQ6IFByb3BUeXBlcy5zdHJpbmcsXG59XG5cbmNvbnN0IE1lbnVTZWN0aW9uID0gKHtzaGFyZWRTdHlsZSwgaXRlbXMgPSBbXSwgc2VsZWN0ZWRWYWx1ZSwgb25TZWxlY3R9KSA9PiAoXG4gIDxkaXYgY2xhc3NOYW1lPVwia2tzLXBsYXllcl9fbWVudS1jb250ZW50XCI+XG4gICAge2l0ZW1zLm1hcCgoe3ZhbHVlLCBsYWJlbH0pID0+IChcbiAgICAgIDxkaXZcbiAgICAgICAga2V5PXt2YWx1ZX1cbiAgICAgICAgY2xhc3NOYW1lPXtjbGFzc25hbWVzKCdra3MtcGxheWVyX19tZW51LWl0ZW0nLCB7XG4gICAgICAgICAgJ2trcy1wbGF5ZXJfX21lbnUtaXRlbS0tc2VsZWN0ZWQnOiBzZWxlY3RlZFZhbHVlID09PSB2YWx1ZSxcbiAgICAgICAgfSl9XG4gICAgICAgIGNzcz17W3NoYXJlZFN0eWxlLnJvdywgc2VsZWN0ZWRWYWx1ZSA9PT0gdmFsdWUgJiYgc2hhcmVkU3R5bGUuc2VsZWN0ZWRdfVxuICAgICAgICBvbkNsaWNrPXsoKSA9PiBvblNlbGVjdCh2YWx1ZSl9XG4gICAgICA+XG4gICAgICAgIDxNZW51SXRlbVRleHQgdGV4dD17bGFiZWwgfHwgdmFsdWV9IC8+XG4gICAgICAgIDxkaXYgY3NzPXtbc3R5bGUuc3BhY2VdfSAvPlxuICAgICAgPC9kaXY+XG4gICAgKSl9XG4gIDwvZGl2PlxuKVxuXG5NZW51U2VjdGlvbi5wcm9wVHlwZXMgPSB7XG4gIHNoYXJlZFN0eWxlOiBQcm9wVHlwZXMub2JqZWN0LFxuICBpdGVtczogUHJvcFR5cGVzLmFycmF5LFxuICBzZWxlY3RlZFZhbHVlOiBQcm9wVHlwZXMuc3RyaW5nLFxuICBNZW51SXRlbTogUHJvcFR5cGVzLmVsZW1lbnRUeXBlLFxuICBvblNlbGVjdDogUHJvcFR5cGVzLmZ1bmMsXG59XG5cbmNvbnN0IFBsYXllclNldHRpbmdzID0gKHtkZXNrdG9wLCBoYXNCb3R0b21QYW5lbH0pID0+IHtcbiAgY29uc3Qgc2hhcmVkU3R5bGUgPSBkZXNrdG9wID8gZGVrc3RvcFN0eWxlIDogc3R5bGVcbiAgY29uc3Qge1xuICAgIHN0YXRlOiB7aXNTZXR0aW5nc09wZW59LFxuICAgIGRpc3BhdGNoLFxuICB9ID0gdXNlQ29udGV4dChDb250ZXh0LlVJKVxuICBjb25zdCBbcGF0aCwgc2V0UGF0aF0gPSB1c2VTdGF0ZSgnLycpXG4gIGNvbnN0IG1lbnVTZWN0aW9ucyA9IHVzZVNldHRpbmdzKClcbiAgY29uc3QgY2hhbmdlU2V0dGluZ3MgPSB1c2VDaGFuZ2VTZXR0aW5ncygpXG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBpZiAoIWlzU2V0dGluZ3NPcGVuKSB7XG4gICAgICBzZXRQYXRoKCcvJylcbiAgICB9XG4gIH0sIFtpc1NldHRpbmdzT3Blbl0pXG5cbiAgY29uc3QgcmVmID0gdXNlUmVmKClcbiAgdXNlT25jbGlja091dHNpZGUoXG4gICAgKCkgPT4ge1xuICAgICAgaWYgKGlzU2V0dGluZ3NPcGVuKSB7XG4gICAgICAgIGRpc3BhdGNoKEFjdGlvbi5oaWRlTWVudSgpKVxuICAgICAgfVxuICAgIH0sXG4gICAge1xuICAgICAgcmVmczogW3JlZl0sXG4gICAgICBldmVudFR5cGVzOiBbJ2NsaWNrJ10sXG4gICAgfVxuICApXG5cbiAgcmV0dXJuIChcbiAgICA8ZGl2XG4gICAgICBjc3M9e1tcbiAgICAgICAgc2hhcmVkU3R5bGUub3ZlcmxheSxcbiAgICAgICAgaXNTZXR0aW5nc09wZW4gJiYgc3R5bGUub3BlbmluZyxcbiAgICAgICAgaGFzQm90dG9tUGFuZWwgJiYge1xuICAgICAgICAgIGJvdHRvbTogJzhlbScsXG4gICAgICAgIH0sXG4gICAgICBdfVxuICAgID5cbiAgICAgIDxkaXYgcmVmPXtyZWZ9IGNsYXNzTmFtZT1cImtrcy1wbGF5ZXJfX21lbnVcIiBjc3M9e3NoYXJlZFN0eWxlLmNvbnRhaW5lcn0+XG4gICAgICAgIHtwYXRoID09PSAnLycgJiYgKFxuICAgICAgICAgIDxGcmFnbWVudD5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwia2tzLXBsYXllcl9fbWVudS1oZWFkXCIgY3NzPXtzaGFyZWRTdHlsZS5oZWFkfT5cbiAgICAgICAgICAgICAgeyFkZXNrdG9wICYmIChcbiAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICBjc3M9e3N0eWxlLmRpc21pc3N9XG4gICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBkaXNwYXRjaChBY3Rpb24uaGlkZU1lbnUoKSl9XG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgPEZvcm1hdHRlZE1lc3NhZ2UgaWQ9XCJLS1MuU0VUVElOR1wiIC8+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIHttZW51U2VjdGlvbnMubWFwKCh7c2VjdGlvbiwgdGl0bGUsIGl0ZW1zLCBzZWxlY3RlZFZhbHVlfSkgPT4ge1xuICAgICAgICAgICAgICBjb25zdCBzZWxlY3RlZE5hbWUgPVxuICAgICAgICAgICAgICAgIGl0ZW1zLmZpbmQoaXRlbSA9PiBpdGVtLnZhbHVlID09PSBzZWxlY3RlZFZhbHVlKT8ubGFiZWwgfHxcbiAgICAgICAgICAgICAgICBzZWxlY3RlZFZhbHVlXG5cbiAgICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAgICBjc3M9e1tzdHlsZS5yb3csIHN0eWxlLmhhc09wdGlvbnNdfVxuICAgICAgICAgICAgICAgICAga2V5PXtzZWN0aW9ufVxuICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gc2V0VGltZW91dCgoKSA9PiBzZXRQYXRoKGAvJHtzZWN0aW9ufWApLCAxKX1cbiAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICA8Rm9ybWF0dGVkTWVzc2FnZSBpZD17dGl0bGV9IC8+XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNzcz17W3N0eWxlLnNwYWNlXX0gLz5cbiAgICAgICAgICAgICAgICAgIDxNZW51SXRlbVRleHQgdGV4dD17c2VsZWN0ZWROYW1lfSAvPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICApXG4gICAgICAgICAgICB9KX1cbiAgICAgICAgICA8L0ZyYWdtZW50PlxuICAgICAgICApfVxuICAgICAgICB7bWVudVNlY3Rpb25zLm1hcChcbiAgICAgICAgICAoe3NlY3Rpb24sIHRpdGxlLCBpdGVtcywgc2VsZWN0ZWRWYWx1ZX0pID0+XG4gICAgICAgICAgICBwYXRoID09PSBgLyR7c2VjdGlvbn1gICYmIChcbiAgICAgICAgICAgICAgPEZyYWdtZW50IGtleT17c2VjdGlvbn0+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJra3MtcGxheWVyX19tZW51LWhlYWRcIiBjc3M9e3NoYXJlZFN0eWxlLmhlYWR9PlxuICAgICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgICBjc3M9e3N0eWxlLmJhY2t9XG4gICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHNldFRpbWVvdXQoKCkgPT4gc2V0UGF0aCgnLycpLCAxKX1cbiAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICA8Rm9ybWF0dGVkTWVzc2FnZSBpZD17dGl0bGV9IC8+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPE1lbnVTZWN0aW9uXG4gICAgICAgICAgICAgICAgICBrZXk9e3NlY3Rpb259XG4gICAgICAgICAgICAgICAgICBzaGFyZWRTdHlsZT17c2hhcmVkU3R5bGV9XG4gICAgICAgICAgICAgICAgICB7Li4ue2l0ZW1zLCBzZWxlY3RlZFZhbHVlfX1cbiAgICAgICAgICAgICAgICAgIG9uU2VsZWN0PXt2YWx1ZSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGRpc3BhdGNoKEFjdGlvbi5oaWRlTWVudSgpKVxuICAgICAgICAgICAgICAgICAgICBpZiAodmFsdWUgIT09IHNlbGVjdGVkVmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICBjaGFuZ2VTZXR0aW5ncyh7c2VjdGlvbiwgdmFsdWV9KVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgIDwvRnJhZ21lbnQ+XG4gICAgICAgICAgICApXG4gICAgICAgICl9XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgKVxufVxuXG5QbGF5ZXJTZXR0aW5ncy5wcm9wVHlwZXMgPSB7XG4gIGRlc2t0b3A6IFByb3BUeXBlcy5ib29sLFxuICBoYXNCb3R0b21QYW5lbDogUHJvcFR5cGVzLmJvb2wsXG59XG5cbmV4cG9ydCBkZWZhdWx0IFBsYXllclNldHRpbmdzXG4iXX0= */',
                    ],
                    onClick: () => setTimeout(() => setPath(`/${section}`), 1),
                    children: [
                      jsx$1(FormattedMessage, {
                        id: title,
                      }),
                      jsx$1('div', {
                        css: [
                          style$1.space,
                          process.env.NODE_ENV === 'production'
                            ? ''
                            : ';label:PlayerSettings;',
                          process.env.NODE_ENV === 'production'
                            ? ''
                            : '/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlBsYXllclNldHRpbmdzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQWtQdUIiLCJmaWxlIjoiUGxheWVyU2V0dGluZ3MuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBAanN4SW1wb3J0U291cmNlIEBlbW90aW9uL3JlYWN0ICovXG5pbXBvcnQge3VzZVN0YXRlLCB1c2VFZmZlY3QsIHVzZUNvbnRleHQsIHVzZVJlZiwgRnJhZ21lbnR9IGZyb20gJ3JlYWN0J1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJ1xuaW1wb3J0IGNsYXNzbmFtZXMgZnJvbSAnY2xhc3NuYW1lcydcbmltcG9ydCB1c2VPbmNsaWNrT3V0c2lkZSBmcm9tICdyZWFjdC1jb29sLW9uY2xpY2tvdXRzaWRlJ1xuXG5pbXBvcnQge3VzZUNoYW5nZVNldHRpbmdzLCB1c2VTZXR0aW5nc30gZnJvbSAncGxheWVyL3NldHRpbmdzJ1xuaW1wb3J0IHtDb250ZXh0fSBmcm9tICdwbGF5ZXIvc3RvcmUnXG5pbXBvcnQgQWN0aW9uIGZyb20gJ3BsYXllci9zdG9yZS9hY3Rpb24vVUknXG5pbXBvcnQgaWNvbiBmcm9tICdzdHlsZS9pY29uJ1xuaW1wb3J0IHtGb3JtYXR0ZWRNZXNzYWdlfSBmcm9tICdjb250ZXh0L0kxOG4nXG5cbmNvbnN0IHN0eWxlID0ge1xuICBoZWFkOiB7XG4gICAgcG9zaXRpb246ICdzdGlja3knLFxuICAgIHpJbmRleDogJzEnLFxuICAgIHRvcDogJzAnLFxuICAgIGRpc3BsYXk6ICdmbGV4JyxcbiAgICBhbGlnbkl0ZW1zOiAnY2VudGVyJyxcbiAgICBwYWRkaW5nOiAnMXJlbSAxLjVyZW0nLFxuICAgIGNvbG9yOiAnd2hpdGUnLFxuICAgIGJhY2tncm91bmRDb2xvcjogJ2luaGVyaXQnLFxuICAgIGZvbnRTaXplOiAnMTZweCcsXG4gICAgZm9udFdlaWdodDogJ2JvbGQnLFxuICAgIGJ1dHRvbjoge1xuICAgICAgbWFyZ2luUmlnaHQ6ICcxcmVtJyxcbiAgICAgIHBhZGRpbmc6ICcwJyxcbiAgICAgIHdpZHRoOiAnMXJlbScsXG4gICAgICBoZWlnaHQ6ICcxcmVtJyxcbiAgICAgIGJvcmRlcjogJ25vbmUnLFxuICAgIH0sXG4gIH0sXG4gIG92ZXJsYXk6IHtcbiAgICBwb3NpdGlvbjogJ2Fic29sdXRlJyxcbiAgICB6SW5kZXg6ICctMicsXG4gICAgdG9wOiAnMCcsXG4gICAgd2lkdGg6ICcxMDAlJyxcbiAgICBoZWlnaHQ6ICcxMDAlJyxcbiAgICBkaXNwbGF5OiAnZmxleCcsXG4gICAgYWxpZ25JdGVtczogJ2NlbnRlcicsXG4gICAganVzdGlmeUNvbnRlbnQ6ICdjZW50ZXInLFxuICAgIGJhY2tncm91bmRDb2xvcjogJ3JnYmEoMCwgMCwgMCwgMC42KScsXG4gICAgb3BhY2l0eTogJzAnLFxuICAgIHRyYW5zaXRpb246ICdvcGFjaXR5IDAuMnMgZWFzZSwgdHJhbnNmb3JtIDBzIGVhc2UgMC4ycycsXG4gIH0sXG4gIGNvbnRhaW5lcjoge1xuICAgIGZsZXg6ICcwIDE4cmVtJyxcbiAgICBtYXhIZWlnaHQ6ICdjYWxjKDEwMCUgLSAycmVtKScsXG4gICAgY29sb3I6ICcjY2NjJyxcbiAgICBiYWNrZ3JvdW5kOiAnIzMzMzMzMycsXG4gICAgd2hpdGVTcGFjZTogJ25vd3JhcCcsXG4gICAgYm9yZGVyUmFkaXVzOiAnNHB4JyxcbiAgICB1c2VyU2VsZWN0OiAnbm9uZScsXG4gICAgb3ZlcmZsb3c6ICdhdXRvJyxcbiAgfSxcbiAgb3BlbmluZzoge1xuICAgIHpJbmRleDogJzAnLFxuICAgIG9wYWNpdHk6ICcxJyxcbiAgICB0cmFuc2Zvcm06ICd0cmFuc2xhdGVZKDApJyxcbiAgICB0cmFuc2l0aW9uOiAnb3BhY2l0eSAwLjJzIGVhc2UnLFxuICB9LFxuICB0aXRsZToge1xuICAgIHBhZGRpbmc6ICcxMnB4IDE4cHgnLFxuICB9LFxuICBkaXNtaXNzOiB7XG4gICAgYmFja2dyb3VuZDogYGNlbnRlciAvIDFyZW0gbm8tcmVwZWF0IHVybCgke2ljb24uY2xvc2V9KSwgdHJhbnNwYXJlbnRgLFxuICB9LFxuICBiYWNrOiB7XG4gICAgYmFja2dyb3VuZDogYGNlbnRlciAvIDFyZW0gbm8tcmVwZWF0IHVybCgke2ljb24uYmFja30pLCB0cmFuc3BhcmVudGAsXG4gIH0sXG4gIHJvdzoge1xuICAgIGN1cnNvcjogJ3BvaW50ZXInLFxuICAgIGRpc3BsYXk6ICdmbGV4JyxcbiAgICBwYWRkaW5nOiAnMXJlbSAxLjVyZW0nLFxuICAgIGZvbnRTaXplOiAnMTZweCcsXG4gICAgJzo6YWZ0ZXInOiB7XG4gICAgICBjb250ZW50OiAnXCIgXCInLFxuICAgICAgbWFyZ2luTGVmdDogJzFyZW0nLFxuICAgICAgd2lkdGg6ICcyMHB4JyxcbiAgICAgIGhlaWdodDogJzIwcHgnLFxuICAgICAgZGlzcGxheTogJ2lubGluZS1ibG9jaycsXG4gICAgICBjb2xvcjogJ3doaXRlJyxcbiAgICAgIGJhY2tncm91bmRQb3NpdGlvbjogJ2NlbnRlcicsXG4gICAgICBiYWNrZ3JvdW5kU2l6ZTogJ2NvdmVyJyxcbiAgICB9LFxuICB9LFxuICBzcGFjZToge1xuICAgIGZsZXg6ICcxJyxcbiAgfSxcbiAgaGFzT3B0aW9uczoge1xuICAgICc6OmFmdGVyJzoge1xuICAgICAgYmFja2dyb3VuZEltYWdlOiBgdXJsKCR7aWNvbi5hcnJvd1RvcH0pYCxcbiAgICAgIHRyYW5zZm9ybTogJ3JvdGF0ZSg5MGRlZyknLFxuICAgIH0sXG4gIH0sXG4gIHNlbGVjdGVkOiB7XG4gICAgJzo6YWZ0ZXInOiB7XG4gICAgICBiYWNrZ3JvdW5kSW1hZ2U6IGB1cmwoJHtpY29uLmNoZWNrfSlgLFxuICAgIH0sXG4gIH0sXG59XG5cbmNvbnN0IGRla3N0b3BTdHlsZSA9IHtcbiAgb3ZlcmxheToge1xuICAgIHBvc2l0aW9uOiAnYWJzb2x1dGUnLFxuICAgIGJvdHRvbTogJzVlbScsXG4gICAgcmlnaHQ6ICczcmVtJyxcbiAgICBkaXNwbGF5OiAnZmxleCcsXG4gICAgYWxpZ25JdGVtczogJ2ZsZXgtZW5kJyxcbiAgICB3aWR0aDogJzE1cmVtJyxcbiAgICBoZWlnaHQ6ICdjYWxjKDEwMCUgLSA4cmVtKScsXG4gICAgb3BhY2l0eTogJzAnLFxuICAgIHRyYW5zZm9ybTogJ3RyYW5zbGF0ZVkoLTEwMHZoKScsXG4gIH0sXG4gIGNvbnRhaW5lcjoge1xuICAgIC4uLnN0eWxlLmNvbnRhaW5lcixcbiAgICBtYXhIZWlnaHQ6ICcxMDAlJyxcbiAgICBiYWNrZ3JvdW5kOiAncmdiYSgwLCAwLCAwLCAwLjcpJyxcbiAgfSxcbiAgaGVhZDoge1xuICAgIC4uLnN0eWxlLmhlYWQsXG4gICAgYmFja2dyb3VuZDogJyMwMDAnLFxuICB9LFxuICByb3c6IHtcbiAgICAuLi5zdHlsZS5yb3csXG4gICAgJzo6YWZ0ZXInOiB7fSxcbiAgICAnOjpiZWZvcmUnOiB7XG4gICAgICAuLi5zdHlsZS5yb3dbJzo6YWZ0ZXInXSxcbiAgICAgIG1hcmdpbkxlZnQ6ICcwJyxcbiAgICAgIG1hcmdpblJpZ2h0OiAnNHB4JyxcbiAgICB9LFxuICB9LFxuICBoYXNPcHRpb25zOiB7XG4gICAgJzo6YmVmb3JlJzoge1xuICAgICAgYmFja2dyb3VuZEltYWdlOiBgdXJsKCR7aWNvbi5hcnJvd1RvcH0pYCxcbiAgICAgIHRyYW5zZm9ybTogJ3JvdGF0ZSg5MGRlZyknLFxuICAgIH0sXG4gIH0sXG4gIHNlbGVjdGVkOiB7XG4gICAgJzo6YmVmb3JlJzoge1xuICAgICAgYmFja2dyb3VuZEltYWdlOiBgdXJsKCR7aWNvbi5jaGVja30pYCxcbiAgICB9LFxuICB9LFxufVxuXG5jb25zdCBNZW51SXRlbVRleHQgPSAoe3RleHR9KSA9PiAoXG4gIDxGb3JtYXR0ZWRNZXNzYWdlIGlkPXtgS0tTLlNFVFRJTkcuJHt0ZXh0fWB9IGdldERlZmF1bHQ9eygpID0+IHRleHR9IC8+XG4pXG5cbk1lbnVJdGVtVGV4dC5wcm9wVHlwZXMgPSB7XG4gIHRleHQ6IFByb3BUeXBlcy5zdHJpbmcsXG59XG5cbmNvbnN0IE1lbnVTZWN0aW9uID0gKHtzaGFyZWRTdHlsZSwgaXRlbXMgPSBbXSwgc2VsZWN0ZWRWYWx1ZSwgb25TZWxlY3R9KSA9PiAoXG4gIDxkaXYgY2xhc3NOYW1lPVwia2tzLXBsYXllcl9fbWVudS1jb250ZW50XCI+XG4gICAge2l0ZW1zLm1hcCgoe3ZhbHVlLCBsYWJlbH0pID0+IChcbiAgICAgIDxkaXZcbiAgICAgICAga2V5PXt2YWx1ZX1cbiAgICAgICAgY2xhc3NOYW1lPXtjbGFzc25hbWVzKCdra3MtcGxheWVyX19tZW51LWl0ZW0nLCB7XG4gICAgICAgICAgJ2trcy1wbGF5ZXJfX21lbnUtaXRlbS0tc2VsZWN0ZWQnOiBzZWxlY3RlZFZhbHVlID09PSB2YWx1ZSxcbiAgICAgICAgfSl9XG4gICAgICAgIGNzcz17W3NoYXJlZFN0eWxlLnJvdywgc2VsZWN0ZWRWYWx1ZSA9PT0gdmFsdWUgJiYgc2hhcmVkU3R5bGUuc2VsZWN0ZWRdfVxuICAgICAgICBvbkNsaWNrPXsoKSA9PiBvblNlbGVjdCh2YWx1ZSl9XG4gICAgICA+XG4gICAgICAgIDxNZW51SXRlbVRleHQgdGV4dD17bGFiZWwgfHwgdmFsdWV9IC8+XG4gICAgICAgIDxkaXYgY3NzPXtbc3R5bGUuc3BhY2VdfSAvPlxuICAgICAgPC9kaXY+XG4gICAgKSl9XG4gIDwvZGl2PlxuKVxuXG5NZW51U2VjdGlvbi5wcm9wVHlwZXMgPSB7XG4gIHNoYXJlZFN0eWxlOiBQcm9wVHlwZXMub2JqZWN0LFxuICBpdGVtczogUHJvcFR5cGVzLmFycmF5LFxuICBzZWxlY3RlZFZhbHVlOiBQcm9wVHlwZXMuc3RyaW5nLFxuICBNZW51SXRlbTogUHJvcFR5cGVzLmVsZW1lbnRUeXBlLFxuICBvblNlbGVjdDogUHJvcFR5cGVzLmZ1bmMsXG59XG5cbmNvbnN0IFBsYXllclNldHRpbmdzID0gKHtkZXNrdG9wLCBoYXNCb3R0b21QYW5lbH0pID0+IHtcbiAgY29uc3Qgc2hhcmVkU3R5bGUgPSBkZXNrdG9wID8gZGVrc3RvcFN0eWxlIDogc3R5bGVcbiAgY29uc3Qge1xuICAgIHN0YXRlOiB7aXNTZXR0aW5nc09wZW59LFxuICAgIGRpc3BhdGNoLFxuICB9ID0gdXNlQ29udGV4dChDb250ZXh0LlVJKVxuICBjb25zdCBbcGF0aCwgc2V0UGF0aF0gPSB1c2VTdGF0ZSgnLycpXG4gIGNvbnN0IG1lbnVTZWN0aW9ucyA9IHVzZVNldHRpbmdzKClcbiAgY29uc3QgY2hhbmdlU2V0dGluZ3MgPSB1c2VDaGFuZ2VTZXR0aW5ncygpXG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBpZiAoIWlzU2V0dGluZ3NPcGVuKSB7XG4gICAgICBzZXRQYXRoKCcvJylcbiAgICB9XG4gIH0sIFtpc1NldHRpbmdzT3Blbl0pXG5cbiAgY29uc3QgcmVmID0gdXNlUmVmKClcbiAgdXNlT25jbGlja091dHNpZGUoXG4gICAgKCkgPT4ge1xuICAgICAgaWYgKGlzU2V0dGluZ3NPcGVuKSB7XG4gICAgICAgIGRpc3BhdGNoKEFjdGlvbi5oaWRlTWVudSgpKVxuICAgICAgfVxuICAgIH0sXG4gICAge1xuICAgICAgcmVmczogW3JlZl0sXG4gICAgICBldmVudFR5cGVzOiBbJ2NsaWNrJ10sXG4gICAgfVxuICApXG5cbiAgcmV0dXJuIChcbiAgICA8ZGl2XG4gICAgICBjc3M9e1tcbiAgICAgICAgc2hhcmVkU3R5bGUub3ZlcmxheSxcbiAgICAgICAgaXNTZXR0aW5nc09wZW4gJiYgc3R5bGUub3BlbmluZyxcbiAgICAgICAgaGFzQm90dG9tUGFuZWwgJiYge1xuICAgICAgICAgIGJvdHRvbTogJzhlbScsXG4gICAgICAgIH0sXG4gICAgICBdfVxuICAgID5cbiAgICAgIDxkaXYgcmVmPXtyZWZ9IGNsYXNzTmFtZT1cImtrcy1wbGF5ZXJfX21lbnVcIiBjc3M9e3NoYXJlZFN0eWxlLmNvbnRhaW5lcn0+XG4gICAgICAgIHtwYXRoID09PSAnLycgJiYgKFxuICAgICAgICAgIDxGcmFnbWVudD5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwia2tzLXBsYXllcl9fbWVudS1oZWFkXCIgY3NzPXtzaGFyZWRTdHlsZS5oZWFkfT5cbiAgICAgICAgICAgICAgeyFkZXNrdG9wICYmIChcbiAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICBjc3M9e3N0eWxlLmRpc21pc3N9XG4gICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBkaXNwYXRjaChBY3Rpb24uaGlkZU1lbnUoKSl9XG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgPEZvcm1hdHRlZE1lc3NhZ2UgaWQ9XCJLS1MuU0VUVElOR1wiIC8+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIHttZW51U2VjdGlvbnMubWFwKCh7c2VjdGlvbiwgdGl0bGUsIGl0ZW1zLCBzZWxlY3RlZFZhbHVlfSkgPT4ge1xuICAgICAgICAgICAgICBjb25zdCBzZWxlY3RlZE5hbWUgPVxuICAgICAgICAgICAgICAgIGl0ZW1zLmZpbmQoaXRlbSA9PiBpdGVtLnZhbHVlID09PSBzZWxlY3RlZFZhbHVlKT8ubGFiZWwgfHxcbiAgICAgICAgICAgICAgICBzZWxlY3RlZFZhbHVlXG5cbiAgICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAgICBjc3M9e1tzdHlsZS5yb3csIHN0eWxlLmhhc09wdGlvbnNdfVxuICAgICAgICAgICAgICAgICAga2V5PXtzZWN0aW9ufVxuICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gc2V0VGltZW91dCgoKSA9PiBzZXRQYXRoKGAvJHtzZWN0aW9ufWApLCAxKX1cbiAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICA8Rm9ybWF0dGVkTWVzc2FnZSBpZD17dGl0bGV9IC8+XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNzcz17W3N0eWxlLnNwYWNlXX0gLz5cbiAgICAgICAgICAgICAgICAgIDxNZW51SXRlbVRleHQgdGV4dD17c2VsZWN0ZWROYW1lfSAvPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICApXG4gICAgICAgICAgICB9KX1cbiAgICAgICAgICA8L0ZyYWdtZW50PlxuICAgICAgICApfVxuICAgICAgICB7bWVudVNlY3Rpb25zLm1hcChcbiAgICAgICAgICAoe3NlY3Rpb24sIHRpdGxlLCBpdGVtcywgc2VsZWN0ZWRWYWx1ZX0pID0+XG4gICAgICAgICAgICBwYXRoID09PSBgLyR7c2VjdGlvbn1gICYmIChcbiAgICAgICAgICAgICAgPEZyYWdtZW50IGtleT17c2VjdGlvbn0+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJra3MtcGxheWVyX19tZW51LWhlYWRcIiBjc3M9e3NoYXJlZFN0eWxlLmhlYWR9PlxuICAgICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgICBjc3M9e3N0eWxlLmJhY2t9XG4gICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHNldFRpbWVvdXQoKCkgPT4gc2V0UGF0aCgnLycpLCAxKX1cbiAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICA8Rm9ybWF0dGVkTWVzc2FnZSBpZD17dGl0bGV9IC8+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPE1lbnVTZWN0aW9uXG4gICAgICAgICAgICAgICAgICBrZXk9e3NlY3Rpb259XG4gICAgICAgICAgICAgICAgICBzaGFyZWRTdHlsZT17c2hhcmVkU3R5bGV9XG4gICAgICAgICAgICAgICAgICB7Li4ue2l0ZW1zLCBzZWxlY3RlZFZhbHVlfX1cbiAgICAgICAgICAgICAgICAgIG9uU2VsZWN0PXt2YWx1ZSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGRpc3BhdGNoKEFjdGlvbi5oaWRlTWVudSgpKVxuICAgICAgICAgICAgICAgICAgICBpZiAodmFsdWUgIT09IHNlbGVjdGVkVmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICBjaGFuZ2VTZXR0aW5ncyh7c2VjdGlvbiwgdmFsdWV9KVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgIDwvRnJhZ21lbnQ+XG4gICAgICAgICAgICApXG4gICAgICAgICl9XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgKVxufVxuXG5QbGF5ZXJTZXR0aW5ncy5wcm9wVHlwZXMgPSB7XG4gIGRlc2t0b3A6IFByb3BUeXBlcy5ib29sLFxuICBoYXNCb3R0b21QYW5lbDogUHJvcFR5cGVzLmJvb2wsXG59XG5cbmV4cG9ydCBkZWZhdWx0IFBsYXllclNldHRpbmdzXG4iXX0= */',
                        ],
                      }),
                      jsx$1(MenuItemText, {
                        text: selectedName,
                      }),
                    ],
                  },
                  section
                )
              }),
            ],
          }),
        menuSections.map(
          ({section, title, items, selectedValue}) =>
            path === `/${section}` &&
            jsxs(
              Fragment$2,
              {
                children: [
                  jsxs('div', {
                    className: 'kks-player__menu-head',
                    css: sharedStyle.head,
                    children: [
                      jsx$1('button', {
                        css: style$1.back,
                        onClick: () => setTimeout(() => setPath('/'), 1),
                      }),
                      jsx$1(FormattedMessage, {
                        id: title,
                      }),
                    ],
                  }),
                  jsx$1(
                    MenuSection,
                    {
                      sharedStyle: sharedStyle,
                      items,
                      selectedValue,
                      onSelect: value => {
                        dispatch(UiAction.hideMenu())

                        if (value !== selectedValue) {
                          changeSettings({
                            section,
                            value,
                          })
                        }
                      },
                    },
                    section
                  ),
                ],
              },
              section
            )
        ),
      ],
    }),
  })
}

PlayerSettings.propTypes = {
  desktop: propTypes.bool,
  hasBottomPanel: propTypes.bool,
}

/* @jsxImportSource @emotion/react */
const subtitlesStyle = {
  alignSelf: 'center',
  display: 'flex',
  flexDirection: 'column',
  overflow: 'visible',
  maxWidth: '100%',
  position: 'absolute',
  bottom: '6em',
  color: '#e8e6e3',
  textShadow: `#000 -1px -1px 0px, #000 1px -1px 0px, #000 -1px 1px 0px, #000 1px 1px 0px`,
  whiteSpace: 'pre-line',
  textAlign: 'center',
}

const Subtitles = ({text}) =>
  jsx$1('div', {
    css: subtitlesStyle,
    children: jsx$1('span', {
      children: text,
    }),
  })

Subtitles.propTypes = {
  text: propTypes.string,
}

/* @jsxImportSource @emotion/react */
const openIcon = {
  width: '1rem',
  height: '1rem',
  margin: '0 0.5rem',
  fontWeight: 'bold',
  backgroundImage: `url(${icon.arrowTop})`,
  transition: 'transform 0.5s',
}
const closeIcon = {...openIcon, transform: 'rotateX(180deg)'}
const titleStyle = {
  padding: '0.5rem 2.5rem',
  display: 'flex',
  alignItems: 'center',
  color: '#ccc',
  fontSize: '20px',
  cursor: 'pointer',
}
const contentStyle = {
  overflow: 'auto',
}
const contentHiddenStyle = {
  overflow: 'hidden',
  pointerEvents: 'none',
  touchAction: 'none',
}

const RecommendationBox = ({opening, title, children = '', toggle}) =>
  jsxs(Fragment, {
    children: [
      jsxs('div', {
        css: titleStyle,
        onClick: opening && toggle,
        children: [
          title,
          jsx$1('div', {
            css: [
              opening ? closeIcon : openIcon,
              process.env.NODE_ENV === 'production'
                ? ''
                : ';label:RecommendationBox;',
              process.env.NODE_ENV === 'production'
                ? ''
                : '/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlJlY29tbWVuZGF0aW9uUGFuZWwuanN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQTJDVyIsImZpbGUiOiJSZWNvbW1lbmRhdGlvblBhbmVsLmpzeCIsInNvdXJjZXNDb250ZW50IjpbIi8qIEBqc3hJbXBvcnRTb3VyY2UgQGVtb3Rpb24vcmVhY3QgKi9cbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJ1xuXG5pbXBvcnQgaWNvbiBmcm9tICdzdHlsZS9pY29uJ1xuXG5jb25zdCBvcGVuSWNvbiA9IHtcbiAgd2lkdGg6ICcxcmVtJyxcbiAgaGVpZ2h0OiAnMXJlbScsXG4gIG1hcmdpbjogJzAgMC41cmVtJyxcbiAgZm9udFdlaWdodDogJ2JvbGQnLFxuICBiYWNrZ3JvdW5kSW1hZ2U6IGB1cmwoJHtpY29uLmFycm93VG9wfSlgLFxuICB0cmFuc2l0aW9uOiAndHJhbnNmb3JtIDAuNXMnLFxufVxuXG5jb25zdCBjbG9zZUljb24gPSB7XG4gIC4uLm9wZW5JY29uLFxuICB0cmFuc2Zvcm06ICdyb3RhdGVYKDE4MGRlZyknLFxufVxuXG5jb25zdCB0aXRsZVN0eWxlID0ge1xuICBwYWRkaW5nOiAnMC41cmVtIDIuNXJlbScsXG4gIGRpc3BsYXk6ICdmbGV4JyxcbiAgYWxpZ25JdGVtczogJ2NlbnRlcicsXG4gIGNvbG9yOiAnI2NjYycsXG4gIGZvbnRTaXplOiAnMjBweCcsXG4gIGN1cnNvcjogJ3BvaW50ZXInLFxufVxuXG5jb25zdCBjb250ZW50U3R5bGUgPSB7XG4gIG92ZXJmbG93OiAnYXV0bycsXG59XG5cbmNvbnN0IGNvbnRlbnRIaWRkZW5TdHlsZSA9IHtcbiAgb3ZlcmZsb3c6ICdoaWRkZW4nLFxuICBwb2ludGVyRXZlbnRzOiAnbm9uZScsXG4gIHRvdWNoQWN0aW9uOiAnbm9uZScsXG59XG5cbmNvbnN0IFJlY29tbWVuZGF0aW9uQm94ID0gKHtvcGVuaW5nLCB0aXRsZSwgY2hpbGRyZW4gPSAnJywgdG9nZ2xlfSkgPT4gKFxuICA8PlxuICAgIDxkaXYgY3NzPXt0aXRsZVN0eWxlfSBvbkNsaWNrPXtvcGVuaW5nICYmIHRvZ2dsZX0+XG4gICAgICB7dGl0bGV9XG4gICAgICA8ZGl2IGNzcz17W29wZW5pbmcgPyBjbG9zZUljb24gOiBvcGVuSWNvbl19IC8+XG4gICAgPC9kaXY+XG4gICAgPGRpdiBjc3M9e1tjb250ZW50U3R5bGUsICFvcGVuaW5nICYmIGNvbnRlbnRIaWRkZW5TdHlsZV19PntjaGlsZHJlbn08L2Rpdj5cbiAgPC8+XG4pXG5cblJlY29tbWVuZGF0aW9uQm94LnByb3BUeXBlcyA9IHtcbiAgb3BlbmluZzogUHJvcFR5cGVzLmJvb2wsXG4gIHRvZ2dsZTogUHJvcFR5cGVzLmZ1bmMsXG4gIHRpdGxlOiBQcm9wVHlwZXMubm9kZSxcbiAgY2hpbGRyZW46IFByb3BUeXBlcy5ub2RlLFxufVxuXG5jb25zdCBmb2xkZWRIZWlnaHQgPSAnNXJlbSdcblxuY29uc3Qgc3R5bGUgPSB7XG4gIGNvbnRhaW5lcjoge1xuICAgIHBvc2l0aW9uOiAnYWJzb2x1dGUnLFxuICAgIGJvdHRvbTogJzAnLFxuICAgIHdpZHRoOiAnMTAwJScsXG4gICAgb3ZlcmZsb3c6ICdoaWRkZW4nLFxuICAgIHRyYW5zaXRpb246ICd0cmFuc2Zvcm0gMC41cyBlYXNlJyxcbiAgICB0cmFuc2Zvcm06ICd0cmFuc2xhdGVZKDApJyxcbiAgfSxcbiAgZm9sZGVkOiB7XG4gICAgdHJhbnNmb3JtOiBgdHJhbnNsYXRlWSgxMDAlKSB0cmFuc2xhdGVZKC0ke2ZvbGRlZEhlaWdodH0pYCxcbiAgfSxcbn1cblxuY29uc3QgUmVjb21tZW5kYXRpb25QYW5lbCA9ICh7b3BlbmluZywgdG9nZ2xlLCB0aXRsZSwgY2hpbGRyZW4gPSBudWxsfSkgPT4ge1xuICByZXR1cm4gKFxuICAgIGNoaWxkcmVuICYmIChcbiAgICAgIDxkaXZcbiAgICAgICAgY2xhc3NOYW1lPVwia2tzLXBsYXllcl9fcmVjb21tZW5kYXRpb25cIlxuICAgICAgICBjc3M9e1tzdHlsZS5jb250YWluZXIsICFvcGVuaW5nICYmIHN0eWxlLmZvbGRlZF19XG4gICAgICAgIG9uQ2xpY2s9eygpID0+IHtcbiAgICAgICAgICBpZiAoIW9wZW5pbmcpIHtcbiAgICAgICAgICAgIHRvZ2dsZSgpXG4gICAgICAgICAgfVxuICAgICAgICB9fVxuICAgICAgPlxuICAgICAgICA8UmVjb21tZW5kYXRpb25Cb3ggb3BlbmluZz17b3BlbmluZ30gdGl0bGU9e3RpdGxlfSB0b2dnbGU9e3RvZ2dsZX0+XG4gICAgICAgICAge2NoaWxkcmVufVxuICAgICAgICA8L1JlY29tbWVuZGF0aW9uQm94PlxuICAgICAgPC9kaXY+XG4gICAgKVxuICApXG59XG5cblJlY29tbWVuZGF0aW9uUGFuZWwucHJvcFR5cGVzID0ge1xuICBvcGVuaW5nOiBQcm9wVHlwZXMuYm9vbCxcbiAgdG9nZ2xlOiBQcm9wVHlwZXMuZnVuYyxcbiAgdGl0bGU6IFByb3BUeXBlcy5ub2RlLFxuICBjaGlsZHJlbjogUHJvcFR5cGVzLm5vZGUsXG59XG5cbmV4cG9ydCBkZWZhdWx0IFJlY29tbWVuZGF0aW9uUGFuZWxcbiJdfQ== */',
            ],
          }),
        ],
      }),
      jsx$1('div', {
        css: [
          contentStyle,
          !opening && contentHiddenStyle,
          process.env.NODE_ENV === 'production'
            ? ''
            : ';label:RecommendationBox;',
          process.env.NODE_ENV === 'production'
            ? ''
            : '/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlJlY29tbWVuZGF0aW9uUGFuZWwuanN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQTZDUyIsImZpbGUiOiJSZWNvbW1lbmRhdGlvblBhbmVsLmpzeCIsInNvdXJjZXNDb250ZW50IjpbIi8qIEBqc3hJbXBvcnRTb3VyY2UgQGVtb3Rpb24vcmVhY3QgKi9cbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJ1xuXG5pbXBvcnQgaWNvbiBmcm9tICdzdHlsZS9pY29uJ1xuXG5jb25zdCBvcGVuSWNvbiA9IHtcbiAgd2lkdGg6ICcxcmVtJyxcbiAgaGVpZ2h0OiAnMXJlbScsXG4gIG1hcmdpbjogJzAgMC41cmVtJyxcbiAgZm9udFdlaWdodDogJ2JvbGQnLFxuICBiYWNrZ3JvdW5kSW1hZ2U6IGB1cmwoJHtpY29uLmFycm93VG9wfSlgLFxuICB0cmFuc2l0aW9uOiAndHJhbnNmb3JtIDAuNXMnLFxufVxuXG5jb25zdCBjbG9zZUljb24gPSB7XG4gIC4uLm9wZW5JY29uLFxuICB0cmFuc2Zvcm06ICdyb3RhdGVYKDE4MGRlZyknLFxufVxuXG5jb25zdCB0aXRsZVN0eWxlID0ge1xuICBwYWRkaW5nOiAnMC41cmVtIDIuNXJlbScsXG4gIGRpc3BsYXk6ICdmbGV4JyxcbiAgYWxpZ25JdGVtczogJ2NlbnRlcicsXG4gIGNvbG9yOiAnI2NjYycsXG4gIGZvbnRTaXplOiAnMjBweCcsXG4gIGN1cnNvcjogJ3BvaW50ZXInLFxufVxuXG5jb25zdCBjb250ZW50U3R5bGUgPSB7XG4gIG92ZXJmbG93OiAnYXV0bycsXG59XG5cbmNvbnN0IGNvbnRlbnRIaWRkZW5TdHlsZSA9IHtcbiAgb3ZlcmZsb3c6ICdoaWRkZW4nLFxuICBwb2ludGVyRXZlbnRzOiAnbm9uZScsXG4gIHRvdWNoQWN0aW9uOiAnbm9uZScsXG59XG5cbmNvbnN0IFJlY29tbWVuZGF0aW9uQm94ID0gKHtvcGVuaW5nLCB0aXRsZSwgY2hpbGRyZW4gPSAnJywgdG9nZ2xlfSkgPT4gKFxuICA8PlxuICAgIDxkaXYgY3NzPXt0aXRsZVN0eWxlfSBvbkNsaWNrPXtvcGVuaW5nICYmIHRvZ2dsZX0+XG4gICAgICB7dGl0bGV9XG4gICAgICA8ZGl2IGNzcz17W29wZW5pbmcgPyBjbG9zZUljb24gOiBvcGVuSWNvbl19IC8+XG4gICAgPC9kaXY+XG4gICAgPGRpdiBjc3M9e1tjb250ZW50U3R5bGUsICFvcGVuaW5nICYmIGNvbnRlbnRIaWRkZW5TdHlsZV19PntjaGlsZHJlbn08L2Rpdj5cbiAgPC8+XG4pXG5cblJlY29tbWVuZGF0aW9uQm94LnByb3BUeXBlcyA9IHtcbiAgb3BlbmluZzogUHJvcFR5cGVzLmJvb2wsXG4gIHRvZ2dsZTogUHJvcFR5cGVzLmZ1bmMsXG4gIHRpdGxlOiBQcm9wVHlwZXMubm9kZSxcbiAgY2hpbGRyZW46IFByb3BUeXBlcy5ub2RlLFxufVxuXG5jb25zdCBmb2xkZWRIZWlnaHQgPSAnNXJlbSdcblxuY29uc3Qgc3R5bGUgPSB7XG4gIGNvbnRhaW5lcjoge1xuICAgIHBvc2l0aW9uOiAnYWJzb2x1dGUnLFxuICAgIGJvdHRvbTogJzAnLFxuICAgIHdpZHRoOiAnMTAwJScsXG4gICAgb3ZlcmZsb3c6ICdoaWRkZW4nLFxuICAgIHRyYW5zaXRpb246ICd0cmFuc2Zvcm0gMC41cyBlYXNlJyxcbiAgICB0cmFuc2Zvcm06ICd0cmFuc2xhdGVZKDApJyxcbiAgfSxcbiAgZm9sZGVkOiB7XG4gICAgdHJhbnNmb3JtOiBgdHJhbnNsYXRlWSgxMDAlKSB0cmFuc2xhdGVZKC0ke2ZvbGRlZEhlaWdodH0pYCxcbiAgfSxcbn1cblxuY29uc3QgUmVjb21tZW5kYXRpb25QYW5lbCA9ICh7b3BlbmluZywgdG9nZ2xlLCB0aXRsZSwgY2hpbGRyZW4gPSBudWxsfSkgPT4ge1xuICByZXR1cm4gKFxuICAgIGNoaWxkcmVuICYmIChcbiAgICAgIDxkaXZcbiAgICAgICAgY2xhc3NOYW1lPVwia2tzLXBsYXllcl9fcmVjb21tZW5kYXRpb25cIlxuICAgICAgICBjc3M9e1tzdHlsZS5jb250YWluZXIsICFvcGVuaW5nICYmIHN0eWxlLmZvbGRlZF19XG4gICAgICAgIG9uQ2xpY2s9eygpID0+IHtcbiAgICAgICAgICBpZiAoIW9wZW5pbmcpIHtcbiAgICAgICAgICAgIHRvZ2dsZSgpXG4gICAgICAgICAgfVxuICAgICAgICB9fVxuICAgICAgPlxuICAgICAgICA8UmVjb21tZW5kYXRpb25Cb3ggb3BlbmluZz17b3BlbmluZ30gdGl0bGU9e3RpdGxlfSB0b2dnbGU9e3RvZ2dsZX0+XG4gICAgICAgICAge2NoaWxkcmVufVxuICAgICAgICA8L1JlY29tbWVuZGF0aW9uQm94PlxuICAgICAgPC9kaXY+XG4gICAgKVxuICApXG59XG5cblJlY29tbWVuZGF0aW9uUGFuZWwucHJvcFR5cGVzID0ge1xuICBvcGVuaW5nOiBQcm9wVHlwZXMuYm9vbCxcbiAgdG9nZ2xlOiBQcm9wVHlwZXMuZnVuYyxcbiAgdGl0bGU6IFByb3BUeXBlcy5ub2RlLFxuICBjaGlsZHJlbjogUHJvcFR5cGVzLm5vZGUsXG59XG5cbmV4cG9ydCBkZWZhdWx0IFJlY29tbWVuZGF0aW9uUGFuZWxcbiJdfQ== */',
        ],
        children: children,
      }),
    ],
  })

RecommendationBox.propTypes = {
  opening: propTypes.bool,
  toggle: propTypes.func,
  title: propTypes.node,
  children: propTypes.node,
}
const foldedHeight = '5rem'
const style = {
  container: {
    position: 'absolute',
    bottom: '0',
    width: '100%',
    overflow: 'hidden',
    transition: 'transform 0.5s ease',
    transform: 'translateY(0)',
  },
  folded: {
    transform: `translateY(100%) translateY(-${foldedHeight})`,
  },
}

const RecommendationPanel = ({opening, toggle, title, children = null}) => {
  return (
    children &&
    jsx$1('div', {
      className: 'kks-player__recommendation',
      css: [
        style.container,
        !opening && style.folded,
        process.env.NODE_ENV === 'production'
          ? ''
          : ';label:RecommendationPanel;',
        process.env.NODE_ENV === 'production'
          ? ''
          : '/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlJlY29tbWVuZGF0aW9uUGFuZWwuanN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQTZFUSIsImZpbGUiOiJSZWNvbW1lbmRhdGlvblBhbmVsLmpzeCIsInNvdXJjZXNDb250ZW50IjpbIi8qIEBqc3hJbXBvcnRTb3VyY2UgQGVtb3Rpb24vcmVhY3QgKi9cbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJ1xuXG5pbXBvcnQgaWNvbiBmcm9tICdzdHlsZS9pY29uJ1xuXG5jb25zdCBvcGVuSWNvbiA9IHtcbiAgd2lkdGg6ICcxcmVtJyxcbiAgaGVpZ2h0OiAnMXJlbScsXG4gIG1hcmdpbjogJzAgMC41cmVtJyxcbiAgZm9udFdlaWdodDogJ2JvbGQnLFxuICBiYWNrZ3JvdW5kSW1hZ2U6IGB1cmwoJHtpY29uLmFycm93VG9wfSlgLFxuICB0cmFuc2l0aW9uOiAndHJhbnNmb3JtIDAuNXMnLFxufVxuXG5jb25zdCBjbG9zZUljb24gPSB7XG4gIC4uLm9wZW5JY29uLFxuICB0cmFuc2Zvcm06ICdyb3RhdGVYKDE4MGRlZyknLFxufVxuXG5jb25zdCB0aXRsZVN0eWxlID0ge1xuICBwYWRkaW5nOiAnMC41cmVtIDIuNXJlbScsXG4gIGRpc3BsYXk6ICdmbGV4JyxcbiAgYWxpZ25JdGVtczogJ2NlbnRlcicsXG4gIGNvbG9yOiAnI2NjYycsXG4gIGZvbnRTaXplOiAnMjBweCcsXG4gIGN1cnNvcjogJ3BvaW50ZXInLFxufVxuXG5jb25zdCBjb250ZW50U3R5bGUgPSB7XG4gIG92ZXJmbG93OiAnYXV0bycsXG59XG5cbmNvbnN0IGNvbnRlbnRIaWRkZW5TdHlsZSA9IHtcbiAgb3ZlcmZsb3c6ICdoaWRkZW4nLFxuICBwb2ludGVyRXZlbnRzOiAnbm9uZScsXG4gIHRvdWNoQWN0aW9uOiAnbm9uZScsXG59XG5cbmNvbnN0IFJlY29tbWVuZGF0aW9uQm94ID0gKHtvcGVuaW5nLCB0aXRsZSwgY2hpbGRyZW4gPSAnJywgdG9nZ2xlfSkgPT4gKFxuICA8PlxuICAgIDxkaXYgY3NzPXt0aXRsZVN0eWxlfSBvbkNsaWNrPXtvcGVuaW5nICYmIHRvZ2dsZX0+XG4gICAgICB7dGl0bGV9XG4gICAgICA8ZGl2IGNzcz17W29wZW5pbmcgPyBjbG9zZUljb24gOiBvcGVuSWNvbl19IC8+XG4gICAgPC9kaXY+XG4gICAgPGRpdiBjc3M9e1tjb250ZW50U3R5bGUsICFvcGVuaW5nICYmIGNvbnRlbnRIaWRkZW5TdHlsZV19PntjaGlsZHJlbn08L2Rpdj5cbiAgPC8+XG4pXG5cblJlY29tbWVuZGF0aW9uQm94LnByb3BUeXBlcyA9IHtcbiAgb3BlbmluZzogUHJvcFR5cGVzLmJvb2wsXG4gIHRvZ2dsZTogUHJvcFR5cGVzLmZ1bmMsXG4gIHRpdGxlOiBQcm9wVHlwZXMubm9kZSxcbiAgY2hpbGRyZW46IFByb3BUeXBlcy5ub2RlLFxufVxuXG5jb25zdCBmb2xkZWRIZWlnaHQgPSAnNXJlbSdcblxuY29uc3Qgc3R5bGUgPSB7XG4gIGNvbnRhaW5lcjoge1xuICAgIHBvc2l0aW9uOiAnYWJzb2x1dGUnLFxuICAgIGJvdHRvbTogJzAnLFxuICAgIHdpZHRoOiAnMTAwJScsXG4gICAgb3ZlcmZsb3c6ICdoaWRkZW4nLFxuICAgIHRyYW5zaXRpb246ICd0cmFuc2Zvcm0gMC41cyBlYXNlJyxcbiAgICB0cmFuc2Zvcm06ICd0cmFuc2xhdGVZKDApJyxcbiAgfSxcbiAgZm9sZGVkOiB7XG4gICAgdHJhbnNmb3JtOiBgdHJhbnNsYXRlWSgxMDAlKSB0cmFuc2xhdGVZKC0ke2ZvbGRlZEhlaWdodH0pYCxcbiAgfSxcbn1cblxuY29uc3QgUmVjb21tZW5kYXRpb25QYW5lbCA9ICh7b3BlbmluZywgdG9nZ2xlLCB0aXRsZSwgY2hpbGRyZW4gPSBudWxsfSkgPT4ge1xuICByZXR1cm4gKFxuICAgIGNoaWxkcmVuICYmIChcbiAgICAgIDxkaXZcbiAgICAgICAgY2xhc3NOYW1lPVwia2tzLXBsYXllcl9fcmVjb21tZW5kYXRpb25cIlxuICAgICAgICBjc3M9e1tzdHlsZS5jb250YWluZXIsICFvcGVuaW5nICYmIHN0eWxlLmZvbGRlZF19XG4gICAgICAgIG9uQ2xpY2s9eygpID0+IHtcbiAgICAgICAgICBpZiAoIW9wZW5pbmcpIHtcbiAgICAgICAgICAgIHRvZ2dsZSgpXG4gICAgICAgICAgfVxuICAgICAgICB9fVxuICAgICAgPlxuICAgICAgICA8UmVjb21tZW5kYXRpb25Cb3ggb3BlbmluZz17b3BlbmluZ30gdGl0bGU9e3RpdGxlfSB0b2dnbGU9e3RvZ2dsZX0+XG4gICAgICAgICAge2NoaWxkcmVufVxuICAgICAgICA8L1JlY29tbWVuZGF0aW9uQm94PlxuICAgICAgPC9kaXY+XG4gICAgKVxuICApXG59XG5cblJlY29tbWVuZGF0aW9uUGFuZWwucHJvcFR5cGVzID0ge1xuICBvcGVuaW5nOiBQcm9wVHlwZXMuYm9vbCxcbiAgdG9nZ2xlOiBQcm9wVHlwZXMuZnVuYyxcbiAgdGl0bGU6IFByb3BUeXBlcy5ub2RlLFxuICBjaGlsZHJlbjogUHJvcFR5cGVzLm5vZGUsXG59XG5cbmV4cG9ydCBkZWZhdWx0IFJlY29tbWVuZGF0aW9uUGFuZWxcbiJdfQ== */',
      ],
      onClick: () => {
        if (!opening) {
          toggle()
        }
      },
      children: jsx$1(RecommendationBox, {
        opening: opening,
        title: title,
        toggle: toggle,
        children: children,
      }),
    })
  )
}

RecommendationPanel.propTypes = {
  opening: propTypes.bool,
  toggle: propTypes.func,
  title: propTypes.node,
  children: propTypes.node,
}

/* @jsxImportSource @emotion/react */
const panelStyle = {
  alignSelf: 'center',
  display: 'flex',
  flexDirection: 'column',
  overflow: 'visible',
  maxWidth: '100%',
  position: 'absolute',
  bottom: '0',
  transition: 'transform 0s 0.5s',
  transform: 'translateY(100%)',
  '> *:last-of-type': {
    flex: '0 auto',
    transition: 'transform 0.5s ease, opacity 0.5s ease',
    transform: 'translateY(100%)',
    opacity: '0',
  },
}
const panelOpenStyle = {
  transition: 'transform 0s 0s',
  transform: 'translateY(0)',
  '> *:last-of-type': {
    transform: 'translateY(0)',
    opacity: '1',
  },
} // this is for replacing recommendation panel in future

const panelClosedStyle = height =>
  height && {
    '> *:last-of-type': {
      // workaround IE 11 CSS calc() bug
      transform: `translateY(100%) translateY(-${height})`,
    },
  }

const backdropStyle = {
  height: '100%',
  backgroundColor: 'rgba(0, 0, 0, 0)',
  transition: 'background-color 0.5s ease, transform 0s 0.5s',
}
const backdropOpenStyle = {
  backgroundColor: 'rgba(0, 0, 0, 0.6)',
  transition: 'background-color 0.5s ease',
}

const BottomPanels = ({
  type = 'mobile',
  recommendation,
  toolPanels,
  activePanel,
  hidePanel,
  toggleRecommendationPanel,
}) =>
  jsxs(Fragment, {
    children: [
      recommendation &&
        type === 'desktop' &&
        jsxs(Fragment, {
          children: [
            jsx$1('div', {
              style: {
                height: '4rem',
              },
            }),
            jsx$1(RecommendationPanel, {
              title: recommendation.title,
              opening: activePanel === 'recommendation',
              toggle: toggleRecommendationPanel,
              children: recommendation.content,
            }),
          ],
        }),
      toolPanels.map(
        (
          {
            content,
            open,
            style,
            hasBackdrop = true,
            pinned = false,
            foldedHeight = 0,
          },
          index
        ) => {
          const panelOpen = open || index === activePanel
          return jsxs('div', {
            css: [
              panelStyle,
              panelOpen ? panelOpenStyle : panelClosedStyle(foldedHeight),
              hasBackdrop && [backdropStyle, panelOpen && backdropOpenStyle],
              panelOpen && style,
              process.env.NODE_ENV === 'production'
                ? ''
                : ';label:BottomPanels;',
              process.env.NODE_ENV === 'production'
                ? ''
                : '/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkJvdHRvbVBhbmVscy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUEyRlkiLCJmaWxlIjoiQm90dG9tUGFuZWxzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyogQGpzeEltcG9ydFNvdXJjZSBAZW1vdGlvbi9yZWFjdCAqL1xuLyogZXNsaW50LWRpc2FibGUganN4LWExMXkvbm8tc3RhdGljLWVsZW1lbnQtaW50ZXJhY3Rpb25zICovXG5pbXBvcnQge2Nsb25lRWxlbWVudH0gZnJvbSAncmVhY3QnXG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnXG5cbmltcG9ydCBSZWNvbW1lbmRhdGlvblBhbmVsIGZyb20gJ2NvbXBvbmVudC9QYW5lbC9SZWNvbW1lbmRhdGlvblBhbmVsJ1xuXG5jb25zdCBwYW5lbFN0eWxlID0ge1xuICBhbGlnblNlbGY6ICdjZW50ZXInLFxuICBkaXNwbGF5OiAnZmxleCcsXG4gIGZsZXhEaXJlY3Rpb246ICdjb2x1bW4nLFxuICBvdmVyZmxvdzogJ3Zpc2libGUnLFxuICBtYXhXaWR0aDogJzEwMCUnLFxuICBwb3NpdGlvbjogJ2Fic29sdXRlJyxcbiAgYm90dG9tOiAnMCcsXG4gIHRyYW5zaXRpb246ICd0cmFuc2Zvcm0gMHMgMC41cycsXG4gIHRyYW5zZm9ybTogJ3RyYW5zbGF0ZVkoMTAwJSknLFxuICAnPiAqOmxhc3Qtb2YtdHlwZSc6IHtcbiAgICBmbGV4OiAnMCBhdXRvJyxcbiAgICB0cmFuc2l0aW9uOiAndHJhbnNmb3JtIDAuNXMgZWFzZSwgb3BhY2l0eSAwLjVzIGVhc2UnLFxuICAgIHRyYW5zZm9ybTogJ3RyYW5zbGF0ZVkoMTAwJSknLFxuICAgIG9wYWNpdHk6ICcwJyxcbiAgfSxcbn1cblxuY29uc3QgcGFuZWxPcGVuU3R5bGUgPSB7XG4gIHRyYW5zaXRpb246ICd0cmFuc2Zvcm0gMHMgMHMnLFxuICB0cmFuc2Zvcm06ICd0cmFuc2xhdGVZKDApJyxcbiAgJz4gKjpsYXN0LW9mLXR5cGUnOiB7XG4gICAgdHJhbnNmb3JtOiAndHJhbnNsYXRlWSgwKScsXG4gICAgb3BhY2l0eTogJzEnLFxuICB9LFxufVxuXG4vLyB0aGlzIGlzIGZvciByZXBsYWNpbmcgcmVjb21tZW5kYXRpb24gcGFuZWwgaW4gZnV0dXJlXG5jb25zdCBwYW5lbENsb3NlZFN0eWxlID0gaGVpZ2h0ID0+XG4gIGhlaWdodCAmJiB7XG4gICAgJz4gKjpsYXN0LW9mLXR5cGUnOiB7XG4gICAgICAvLyB3b3JrYXJvdW5kIElFIDExIENTUyBjYWxjKCkgYnVnXG4gICAgICB0cmFuc2Zvcm06IGB0cmFuc2xhdGVZKDEwMCUpIHRyYW5zbGF0ZVkoLSR7aGVpZ2h0fSlgLFxuICAgIH0sXG4gIH1cblxuY29uc3QgYmFja2Ryb3BTdHlsZSA9IHtcbiAgaGVpZ2h0OiAnMTAwJScsXG4gIGJhY2tncm91bmRDb2xvcjogJ3JnYmEoMCwgMCwgMCwgMCknLFxuICB0cmFuc2l0aW9uOiAnYmFja2dyb3VuZC1jb2xvciAwLjVzIGVhc2UsIHRyYW5zZm9ybSAwcyAwLjVzJyxcbn1cblxuY29uc3QgYmFja2Ryb3BPcGVuU3R5bGUgPSB7XG4gIGJhY2tncm91bmRDb2xvcjogJ3JnYmEoMCwgMCwgMCwgMC42KScsXG4gIHRyYW5zaXRpb246ICdiYWNrZ3JvdW5kLWNvbG9yIDAuNXMgZWFzZScsXG59XG5cbmNvbnN0IEJvdHRvbVBhbmVscyA9ICh7XG4gIHR5cGUgPSAnbW9iaWxlJyxcbiAgcmVjb21tZW5kYXRpb24sXG4gIHRvb2xQYW5lbHMsXG4gIGFjdGl2ZVBhbmVsLFxuICBoaWRlUGFuZWwsXG4gIHRvZ2dsZVJlY29tbWVuZGF0aW9uUGFuZWwsXG59KSA9PiAoXG4gIDw+XG4gICAge3JlY29tbWVuZGF0aW9uICYmIHR5cGUgPT09ICdkZXNrdG9wJyAmJiAoXG4gICAgICA8PlxuICAgICAgICA8ZGl2IHN0eWxlPXt7aGVpZ2h0OiAnNHJlbSd9fSAvPlxuICAgICAgICA8UmVjb21tZW5kYXRpb25QYW5lbFxuICAgICAgICAgIHRpdGxlPXtyZWNvbW1lbmRhdGlvbi50aXRsZX1cbiAgICAgICAgICBvcGVuaW5nPXthY3RpdmVQYW5lbCA9PT0gJ3JlY29tbWVuZGF0aW9uJ31cbiAgICAgICAgICB0b2dnbGU9e3RvZ2dsZVJlY29tbWVuZGF0aW9uUGFuZWx9XG4gICAgICAgID5cbiAgICAgICAgICB7cmVjb21tZW5kYXRpb24uY29udGVudH1cbiAgICAgICAgPC9SZWNvbW1lbmRhdGlvblBhbmVsPlxuICAgICAgPC8+XG4gICAgKX1cbiAgICB7dG9vbFBhbmVscy5tYXAoXG4gICAgICAoXG4gICAgICAgIHtcbiAgICAgICAgICBjb250ZW50LFxuICAgICAgICAgIG9wZW4sXG4gICAgICAgICAgc3R5bGUsXG4gICAgICAgICAgaGFzQmFja2Ryb3AgPSB0cnVlLFxuICAgICAgICAgIHBpbm5lZCA9IGZhbHNlLFxuICAgICAgICAgIGZvbGRlZEhlaWdodCA9IDAsXG4gICAgICAgIH0sXG4gICAgICAgIGluZGV4XG4gICAgICApID0+IHtcbiAgICAgICAgY29uc3QgcGFuZWxPcGVuID0gb3BlbiB8fCBpbmRleCA9PT0gYWN0aXZlUGFuZWxcblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgIGNzcz17W1xuICAgICAgICAgICAgICBwYW5lbFN0eWxlLFxuICAgICAgICAgICAgICBwYW5lbE9wZW4gPyBwYW5lbE9wZW5TdHlsZSA6IHBhbmVsQ2xvc2VkU3R5bGUoZm9sZGVkSGVpZ2h0KSxcbiAgICAgICAgICAgICAgaGFzQmFja2Ryb3AgJiYgW2JhY2tkcm9wU3R5bGUsIHBhbmVsT3BlbiAmJiBiYWNrZHJvcE9wZW5TdHlsZV0sXG4gICAgICAgICAgICAgIHBhbmVsT3BlbiAmJiBzdHlsZSxcbiAgICAgICAgICAgIF19XG4gICAgICAgICAgICBjbGFzc05hbWU9e3Bpbm5lZCAmJiAncGlubmVkJ31cbiAgICAgICAgICA+XG4gICAgICAgICAgICB7aGFzQmFja2Ryb3AgJiYgKFxuICAgICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAgc3R5bGU9e3tmbGV4OiAxfX1cbiAgICAgICAgICAgICAgICBvbkNsaWNrPXtldmVudCA9PiB7XG4gICAgICAgICAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKVxuICAgICAgICAgICAgICAgICAgaGlkZVBhbmVsKGV2ZW50KVxuICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICApfVxuICAgICAgICAgICAge2Nsb25lRWxlbWVudChjb250ZW50WzBdIHx8IGNvbnRlbnQsIHtcbiAgICAgICAgICAgICAgYWN0aXZlOiBwYW5lbE9wZW4sXG4gICAgICAgICAgICAgIGNsb3NlOiBoaWRlUGFuZWwsXG4gICAgICAgICAgICB9KX1cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKVxuICAgICAgfVxuICAgICl9XG4gIDwvPlxuKVxuXG5Cb3R0b21QYW5lbHMucHJvcFR5cGVzID0ge1xuICB0eXBlOiBQcm9wVHlwZXMub25lT2YoWydtb2JpbGUnLCAnZGVza3RvcCddKSxcbiAgcmVjb21tZW5kYXRpb246IFByb3BUeXBlcy5vYmplY3QsXG4gIHRvb2xQYW5lbHM6IFByb3BUeXBlcy5hcnJheSxcbiAgYWN0aXZlUGFuZWw6IFByb3BUeXBlcy5zdHJpbmcsXG4gIGhpZGVQYW5lbDogUHJvcFR5cGVzLmZ1bmMsXG4gIHRvZ2dsZVJlY29tbWVuZGF0aW9uUGFuZWw6IFByb3BUeXBlcy5mdW5jLFxufVxuXG5leHBvcnQgZGVmYXVsdCBCb3R0b21QYW5lbHNcbiJdfQ== */',
            ],
            className: pinned && 'pinned',
            children: [
              hasBackdrop &&
                jsx$1('div', {
                  style: {
                    flex: 1,
                  },
                  onClick: event => {
                    event.stopPropagation()
                    hidePanel(event)
                  },
                }),
              /*#__PURE__*/ cloneElement(content[0] || content, {
                active: panelOpen,
                close: hidePanel,
              }),
            ],
          })
        }
      ),
    ],
  })

BottomPanels.propTypes = {
  type: propTypes.oneOf(['mobile', 'desktop']),
  recommendation: propTypes.object,
  toolPanels: propTypes.array,
  activePanel: propTypes.string,
  hidePanel: propTypes.func,
  toggleRecommendationPanel: propTypes.func,
}

const getBitmovinConfig = ({
  bitmovin: config,
  defaultQuality,
  getPlayer,
  getState,
}) => ({
  ...config,
  playback: {
    // TODO restore volume
    ...config.playback,
  },
  adaptation: {
    // TODO move this to core/adaptation
    onVideoAdaptation: data => {
      const {
        UI: {selectedQualityName, qualityItems, qualityPrecedence},
        API: {manifests},
      } = getState()
      const maxQuality = getMaxQuality(
        {
          selectedQualityName,
          qualityItems,
          qualityPrecedence,
        },
        manifests,
        {
          quality: defaultQuality,
        }
      )

      if (maxQuality) {
        const qualities = getPlayer().getAvailableVideoQualities() // when playing a MediaTailor stream, suggested id doesn't match quality items

        const currentQuality =
          qualities.find(quality => quality.id === data.suggested) ||
          qualities[0]
        const qualityBoundary = [
          qualities
            .filter(quality => maxQuality.height >= quality.height)
            .reduce((res, cur) => {
              return !res ||
                cur.height > res.height ||
                cur.bitrate > res.bitrate
                ? cur
                : res
            }, undefined),
          qualities
            .filter(quality => maxQuality.height < quality.height)
            .reduce((res, cur) => {
              return !res ||
                cur.height < res.height ||
                cur.bitrate < res.bitrate
                ? cur
                : res
            }, undefined),
        ]

        if (maxQuality.height < currentQuality.height) {
          return (qualityBoundary[0] || qualityBoundary[1]).id
        }
      }

      return data
    },
  },
})

/* @jsxImportSource @emotion/react */
const containerStyle$1 = {
  position: 'absolute',
  textAlign: 'center',
}
const imageStyle = {
  border: '1px solid white',
  boxShadow: '0 0 5px 2px rgba(0, 0, 0, 0.3)',
  backgroundColor: '#000',
}

const VideoThumbnail = ({className, style, time, image, x, y, width, height}) =>
  jsxs('div', {
    css: containerStyle$1,
    className: className,
    style: style,
    children: [
      jsx$1('div', {
        css: imageStyle,
        style: {
          width: `${width}px`,
          height: `${height}px`,
          backgroundImage: `url(${image})`,
          backgroundPosition: `-${x}px -${y}px`,
        },
      }),
      formattedTime(time),
    ],
  })

VideoThumbnail.propTypes = {
  className: propTypes.string,
  style: propTypes.object,
  time: propTypes.number,
  image: propTypes.string,
  x: propTypes.number,
  y: propTypes.number,
  width: propTypes.number,
  height: propTypes.number,
}
var VideoThumbnail$1 = /*#__PURE__*/ memo(VideoThumbnail)

/* @jsxImportSource @emotion/react */
const thumbnailStyle = {
  left: '0',
  bottom: '28px',
  transform: `translateX(
    max(
      0px,
      min(
        calc(var(--pointer-x) - var(--seekbar-left) - 50%),
        calc(var(--seekbar-right) - 100% - 2em)
      )
    )
  )`,
}

const SeekPreview = ({time}) => {
  const {thumbnailSeeking} = useOptions()
  const thumbnails = useStore(({API}) => API.thumbnailSeekings) || []
  const enabled = useStore(({UI}) => thumbnailSeeking && !UI.isSettingsOpen)
  const displayThumbnail = enabled && time >= 0
  const thumbnail =
    thumbnails.find(t => t.startTime <= time && time <= t.endTime) ||
    thumbnails.slice(-1)[0] ||
    ''
  return displayThumbnail
    ? jsx$1(VideoThumbnail$1, {
        css: thumbnailStyle,
        time: time,
        image: thumbnail.image,
        ...thumbnail.position,
      })
    : ''
}

SeekPreview.propTypes = {
  time: propTypes.number,
}

const SYNC_INTERVAL = 10000

const useSyncLivesInfo = () => {
  const {
    state: {apiState, content},
    dispatch,
  } = useContext(Context.API)
  const [setTimeout, clearTimer] = useTimeout()
  useEffect(() => {
    if (apiState === APIState.READY && content.contentType === 'lives') {
      if (_get(content, 'end')) {
        dispatch(PlayerAction.pause())
      } else {
        setTimeout(() => dispatch(APIAction.refreshContent()), SYNC_INTERVAL)
        return clearTimer
      }
    }
  }, [content, apiState])
}

const getLivesInfo = ({startTime, endTime}) => {
  const duration = endTime - startTime
  const nowSecond = Math.floor(Date.now() / 1000)
  const currentTime = Math.max(0, Math.min(nowSecond - startTime, duration))
  return {
    currentTime,
    duration,
  }
}

const LinearTimeRewrite = () => {
  const state = {}
  return {
    getPlaybackStatus: () => {
      const info = getLivesInfo(state)
      return (
        (info === null || info === void 0 ? void 0 : info.duration) > 0 && info
      )
    },
    handleContentChange: content => Object.assign(state, content),
  }
}

/* @jsxImportSource @emotion/react */
const sizes = {
  'small-embed': 200,
  embed: 400,
  'tablet-portrait': 600,
  'tablet-landscape': 900,
  desktop: 1200,
}

const getUiElements = (
  {type, mode, width},
  {
    status,
    ready,
    seekable,
    title,
    channelTitle,
    controlsDisplay,
    haveBottomItem,
    adStatus,
    adUrl,
  },
  {backRef}
) => {
  const {
    PlayButton,
    RewindButton,
    ForwardButton,
    VolumeControl,
    FunctionButtons,
    FullScreenButton,
    PreviousEpisodeButton,
    NextEpisodeButton,
    BackButton,
    Loading,
    PlayPane,
    AdSkipButton,
    Translate,
  } = getComponents()
  const controlButtons = {
    playButton:
      type === 'mobile' && status === 'buffering'
        ? jsx$1(Loading, {
            styles: {
              position: 'static',
              width: '3em',
              margin: '1em',
              backgroundColor: 'transparent',
            },
          })
        : jsx$1(PlayButton, {}),
    ...(!adStatus &&
      seekable &&
      ready &&
      (type === 'mobile' || width >= sizes['tablet-portrait']) && {
        previousEpisodeButton: jsx$1(PreviousEpisodeButton, {}),
        nextEpisodeButton: jsx$1(NextEpisodeButton, {}),
        rewindButton: jsx$1(RewindButton, {}),
        forwardButton: jsx$1(ForwardButton, {}),
      }),
  }

  const backItems =
    status !== 'buffering' &&
    controlsDisplay !== 'hidden' &&
    jsx$1(PlayPane, {})

  const uiElements = adStatus
    ? {
        adLink:
          adUrl &&
          jsx$1('a', {
            href: adUrl,
            rel: 'noreferrer',
            target: '_blank',
            children: jsx$1(Translate, {
              code: 'KKS.SSAI.LEARN.MORE',
            }),
          }),
        adStatus,
        adSkipButton: jsx$1(AdSkipButton, {}),
        seekbar: '',
      }
    : {
        title,
        channelTitle,
        functionButtons:
          ready &&
          (type === 'mobile' || width >= sizes['small-embed']) &&
          jsx$1(FunctionButtons, {
            full: type === 'mobile' || width >= sizes.embed,
          }),
      }
  return {
    controlsDisplay: controlsDisplay || mode,
    haveBottomItem: haveBottomItem && !adStatus,
    ...uiElements,
    controlButtons,
    volumeControl:
      width >= sizes['small-embed'] &&
      jsx$1(VolumeControl, {
        displaySlider: width >= 300,
      }),
    fullscreenButton: ready && jsx$1(FullScreenButton, {}),
    backButton: jsx$1(BackButton, {}),
    backItems,
    backRef,
  }
}

const getSourceState = ({API}) => {
  const {manifests, playback: lastPlayback} = API
  const {updateTime: lastPlaybackTime} = lastPlayback || {}
  return {
    manifests,
    lastPlaybackTime,
  }
}

const getSelectedQuailty = ({UI}) => {
  return UI.selectedQualityName
}

const getLivesMeta = content => {
  const data = content || {}
  const startTime = data.start_time || data.startTime
  const endTime = data.end_time || data.endTime
  return {
    name: data.subtitle,
    startTime,
    endTime,
  }
}

const PlayerUi = ({options, coverImageUrl, backRef, videoRef, playerRef}) => {
  var _options$quality

  const {manifests, lastPlaybackTime} = useStore(getSourceState, shallow)
  const {autoplayNext, recommendation, toolPanels} = useOptions()
  const uiType = isDesktop() ? 'desktop' : 'mobile'
  const livesMeta = useStore(({API}) => getLivesMeta(API.content), shallow)
  const playbackInfo = useStore(
    state =>
      getPlaybackInfo(state, {
        autoplayNext,
      }),
    shallow
  )
  const {
    status,
    focused,
    subtitlesContent,
    adMarks,
    adStatus,
    activePanel,
  } = playbackInfo
  const {ErrorOverlay, LinearEndedOverlay, CastingOverlay} = getComponents()
  const {toggleRecommendationPanel, hidePanel} = useUiActions()
  const {getState, dispatch} = useContext(Context.Adapter)
  const selectedQualityName = useStore(getSelectedQuailty)
  const defaultQuality =
    ((_options$quality = options.quality) === null ||
    _options$quality === void 0
      ? void 0
      : _options$quality.default) || options.quality
  const [hlsOverride, setHlsOverride] = useState()
  const [widevineLevel, setWidevineLevel] = useState()
  useEffect(async () => {
    if (manifests) {
      var _options$quality2

      // Quality selection is disabled in Safari.
      // Users open qualitySelectionHack flag to make us do workaround.
      const url =
        (_options$quality2 = options.quality) !== null &&
        _options$quality2 !== void 0 &&
        _options$quality2.qualitySelectionHack
          ? await getAdaptiveHlsUrl(manifests, defaultQuality, getState)
          : manifests.hls.url
      setHlsOverride(url)
    }
  }, [
    manifests === null || manifests === void 0 ? void 0 : manifests.hls.url,
    selectedQualityName,
  ])
  useEffect(() => {
    getWidevineLevel().then(setWidevineLevel)
  }, [])
  const drm = useStore(state => {
    var _options$drm

    const {
      playbackToken: playbackInfo,
      drm: host,
      customHeader: headers,
    } = state.API
    const {token, widevine_blacklist: blockedDevices} = playbackInfo || {}
    return (
      host &&
      ((_options$drm = options.drm) === null || _options$drm === void 0
        ? void 0
        : _options$drm.call(options, {
            host,
            token,
            headers,
            widevine: {
              policy: options.widevine,
              level: widevineLevel,
              blockedDevices,
            },
          }))
    )
  }, shallow)
  const source = useMemo(
    () =>
      manifests &&
      hlsOverride && {
        hls: hlsOverride,
        dash: manifests.dash.url,
        drm,
        options: {
          // TODO ignore startTime from app if changed to another episode
          startTime: options.startTime || lastPlaybackTime,
        },
        manifests,
      },
    [manifests, hlsOverride]
  )
  const linearTimeRewrite = useMemo(() => LinearTimeRewrite(), [])
  useEffect(() => {
    linearTimeRewrite.handleContentChange(livesMeta)
  }, [livesMeta.startTime, livesMeta.endTime])
  return jsxs(CoverImageWrap, {
    url: coverImageUrl,
    children: [
      jsxs(VideoPlayer, {
        source: source,
        getLayoutProps: s =>
          getUiElements(s, playbackInfo, {
            backRef,
          }),
        videoRef: videoRef,
        autoplay: options.autoplay,
        autohide: !focused,
        seekbar: {
          marks: adMarks,
          addons: [SeekPreview],
        },
        plugins: options.plugins.concat(linearTimeRewrite),
        bitmovin: getBitmovinConfig({
          bitmovin: options.bitmovin,
          defaultQuality,
          getState,
          getPlayer: () => playerRef.current,
        }),
        onPlayerLoaded: player => {
          playerRef.current = player
          dispatch(operator.initialize)
        },
        children: [
          jsx$1(Subtitles, {
            text:
              subtitlesContent === null || subtitlesContent === void 0
                ? void 0
                : subtitlesContent.text,
          }),
          !adStatus &&
            jsx$1(BottomPanels, {
              type: uiType,
              toolPanels: toolPanels,
              recommendation: recommendation,
              activePanel: activePanel,
              hidePanel: hidePanel,
              toggleRecommendationPanel: toggleRecommendationPanel,
            }),
          status === 'error'
            ? jsx$1(ErrorOverlay, {})
            : status === 'casting'
            ? jsx$1(CastingOverlay, {})
            : status === 'linearEnded'
            ? jsx$1(LinearEndedOverlay, {})
            : '',
          jsx$1(PlayerSettings, {
            desktop: isDesktop(),
            hasBottomPanel: Boolean(recommendation),
          }),
        ],
      }),
      jsx$1(AutoplayDialog, {}),
    ],
  })
}

PlayerUi.propTypes = {
  options: propTypes.object,
  coverImageUrl: propTypes.string,
  backRef: propTypes.object,
  videoRef: propTypes.object,
  playerRef: propTypes.object,
}

const getCurrentTime = ({Player}) => {
  var _Player$progress

  return (_Player$progress = Player.progress) === null ||
    _Player$progress === void 0
    ? void 0
    : _Player$progress.progressTime
}

const useUpdateLastPlayed = () => {
  const playStatus = useStore(({Player}) =>
    Player.seeking ? 'seeking' : Player.isPlaying ? 'playing' : 'paused'
  )
  const progressTime = useStore(state => Math.floor(getCurrentTime(state) / 10))
  const isVod = useStore(({API}) => {
    var _API$content

    return (
      ((_API$content = API.content) === null || _API$content === void 0
        ? void 0
        : _API$content.contentType) === 'videos'
    )
  })
  const store = useContext(Context.Adapter)
  useEffect(() => {
    if (isVod && playStatus !== 'seeking') {
      store.dispatch(
        APIAction.updateLastPlayedTime(
          getCurrentTime(store.useStore.getState())
        )
      )
    }
  }, [playStatus, progressTime])
}

const useUpdateEnded = () => {
  const ended = useStore(state => state.Player.ended)
  const store = useContext(Context.Adapter)
  useEffect(() => {
    if (ended) {
      store.dispatch(APIAction.updatePlayedEnd())
    }
  }, [ended])
}

const useVideosHandlers = () => {
  useUpdateLastPlayed()
  useUpdateEnded()
}

/* eslint-disable react/prop-types */
const containerStyle = {
  userSelect: 'none',
  position: 'relative',
  display: 'block',
  width: '100%',
  height: '100%',
  fontSize: '16px',
} // TODO: these are totally nothing to do with UI structures
// and should be refactored into custom hooks

const PlaybackHooks = ({
  host,
  accessToken,
  deviceId,
  content,
  customHeader,
  customQuery,
  preload,
  autoplayNext,
  mediaSource,
  thumbnailSeeking,
  supportEnvironmentList,
  limitOnePlaybackAtSameTime,
  recommendation,
  playerRef,
  containerRef,
  onError,
  onBack,
  onVideoQualityChanged,
  onMediaSourceChanged,
  onViewModeChange,
  onEnterFullscreen,
  onExitFullscreen,
  onReplay,
  onChangeVideo,
  onChangeToNextVideo,
  onChangeToPreviousVideo,
  onSectionChange,
}) => {
  const {castState} = useCastContext().state
  const {dispatch} = useContext(Context.Module)
  useSyncLivesInfo()
  useVideosHandlers()
  useEffect(() => {
    if (recommendation) {
      dispatch(UiAction.enableRecommendationPanel())
    } else {
      dispatch(UiAction.disableRecommendationPanel())
    }
  }, [Boolean(recommendation)])
  useEffect(() => {
    if (thumbnailSeeking) {
      dispatch(UiAction.enableThumbnailSeeking())
    } else {
      dispatch(UiAction.disableThumbnailSeeking())
    }
  }, [Boolean(thumbnailSeeking)])
  return jsxs(Fragment$2, {
    children: [
      castState !== CastState.CONNECTED &&
        jsx$1(API$1, {
          host: host,
          accessToken: accessToken,
          deviceId: deviceId,
          content: content,
          customHeader: customHeader,
          customQuery: customQuery,
          preferredConfig: {
            needThumbnailSeeking: thumbnailSeeking,
            preferredMediaSource: mediaSource,
          },
        }),
      jsx$1(LocalStorage$1, {}),
      jsx$1(LimitOnePlayback, {
        enabled: limitOnePlaybackAtSameTime,
      }),
      jsx$1(Event$1, {
        content: content,
        onError: onError,
        onBack: onBack,
        onReplay: onReplay,
        onVideoQualityChanged: onVideoQualityChanged,
        onMediaSourceChanged: onMediaSourceChanged,
        onChangeVideo: onChangeVideo,
        onChangeToNextVideo: onChangeToNextVideo,
        onChangeToPreviousVideo: onChangeToPreviousVideo,
        onSectionChange: onSectionChange,
      }),
      castState !== CastState.CONNECTED &&
        jsx$1(Agent, {
          preload: preload,
          playerRef: playerRef,
        }),
      jsx$1(EnvironmentValidator, {
        supportEnvironmentList: supportEnvironmentList,
      }),
      jsx$1(CastAdapter, {
        content: content,
        mediaSource: mediaSource,
        customQuery: customQuery,
      }),
      jsx$1(DeviceDetector, {
        children: ({os: {name}}) =>
          name === 'iOS' &&
          jsx$1(MobileSafariPlugin, {
            containerRef: containerRef,
            onViewModeChange: onViewModeChange,
            onEnterFullscreen: onEnterFullscreen,
            onExitFullscreen: onExitFullscreen,
          }),
      }),
      jsx$1(DeviceDetector, {
        children: ({os: {name}, touchable}) =>
          name === 'Mac OS' && touchable && jsx$1(OTP_1878, {}),
      }),
    ],
  })
} // eslint-disable-next-line react/display-name

const Player = /*#__PURE__*/ forwardRef(
  (
    {
      licenseKey,
      config = defaultConfig.BitmovinConfig,
      host,
      accessToken,
      deviceId,
      content,
      customHeader = {},
      customQuery = {},
      lang = LanguageCode$1.EN,
      langCustomCode = {},
      preload = 'auto',
      autoPlay,
      autoPlayNext,
      autoplay = autoPlay,
      autoplayNext = autoPlayNext,
      startTime,
      quality,
      mediaSource,
      thumbnailSeeking,
      supportEnvironmentList,
      limitOnePlaybackAtSameTime,
      recommendation,
      toolPanels = [],
      coverImageUrl,
      widevine,
      plugins = [],
      drm = getDefaultDrmConfig,
      onSourceLoaded,
      onReady,
      onPlay,
      onPaused,
      onPlaying,
      onEnded,
      onError,
      onBack,
      onTimeChanged,
      onSeek,
      onSeeked,
      onVolumeChanged,
      onMuted,
      onUnmuted,
      onVideoQualityChanged,
      onMediaSourceChanged,
      onViewModeChange,
      onEnterFullscreen,
      onExitFullscreen,
      onStallStarted,
      onStallEnded,
      onReplay,
      onChangeVideo,
      onChangeToNextVideo,
      onChangeToPreviousVideo,
      onLogging,
      onSectionChange,
    },
    ref
  ) => {
    const playerRef = useRef()
    const videoRef = useRef()
    const containerRef = useRef()
    const adContainerRef = useRef()
    const options = {
      host,
      accessToken,
      deviceId,
      content,
      customHeader,
      customQuery,
      lang,
      langCustomCode,
      preload,
      autoplay,
      autoplayNext,
      quality,
      mediaSource,
      thumbnailSeeking,
      supportEnvironmentList,
      limitOnePlaybackAtSameTime,
      recommendation,
      toolPanels,
      plugins,
    }
    const store = useMemo(() => createStore(), [])
    return jsx$1('div', {
      className: 'kks-player',
      css: containerStyle,
      ref: containerRef,
      children: jsx$1(PlayerProvider, {
        videoRef: videoRef,
        content: content,
        options: options,
        uiRef: containerRef,
        sendLog: onLogging,
        children: jsxs(StoreProvider, {
          store: store,
          options: options,
          children: [
            jsx$1(
              PlayerVideo, // for bitmovin bindings, previously <PlayerVideo>, no longer renders video now
              {
                plugins: plugins,
                onSourceLoaded: onSourceLoaded,
                onReady: onReady,
                onPlay: onPlay,
                onPaused: onPaused,
                onPlaying: onPlaying,
                onEnded: onEnded,
                onTimeChanged: onTimeChanged,
                onSeek: onSeek,
                onSeeked: onSeeked,
                onVolumeChanged: onVolumeChanged,
                onMuted: onMuted,
                onUnmuted: onUnmuted,
                onViewModeChange: onViewModeChange,
                onEnterFullscreen: onEnterFullscreen,
                onExitFullscreen: onExitFullscreen,
                onStallStarted: onStallStarted,
                onStallEnded: onStallEnded,
                playerRef: playerRef,
                containerRef: containerRef,
                adContainerRef: adContainerRef,
              }
            ),
            jsx$1(I18n.Provider, {
              lang: lang,
              langCustomCode: langCustomCode,
              children: jsx$1(PlayerUi, {
                videoRef: videoRef,
                playerRef: playerRef,
                coverImageUrl: coverImageUrl,
                backRef: adContainerRef,
                options: {
                  startTime,
                  autoplay,
                  quality,
                  drm,
                  widevine,
                  plugins,
                  bitmovin: {
                    key: licenseKey,
                    ...config,
                  },
                },
              }),
            }),
            jsx$1(PlaybackHooks, {
              ...options,
              playerRef: ref,
              containerRef,
              onError,
              onBack,
              onVideoQualityChanged,
              onMediaSourceChanged,
              onViewModeChange,
              onEnterFullscreen,
              onExitFullscreen,
              onReplay,
              onChangeVideo,
              onChangeToNextVideo,
              onChangeToPreviousVideo,
              onSectionChange,
            }),
          ],
        }),
      }),
    })
  }
)
Player.propTypes = {
  licenseKey: propTypes.string.isRequired,
  host: propTypes.string,
  accessToken: propTypes.string,
  deviceId: propTypes.string,
  content: Types.VideoInfo,
  lang: Types.LanguageCode,
  langCustomCode: propTypes.object,
  customHeader: propTypes.object,
  customQuery: propTypes.object,
  thumbnailSeeking: propTypes.bool,
  limitOnePlaybackAtSameTime: propTypes.bool,
  preload: propTypes.oneOf(['auto', 'none']),
  autoplay: propTypes.bool,
  autoplayNext: propTypes.bool,
  startTime: propTypes.number,
  quality: propTypes.object,
  mediaSource: propTypes.string,
  supportEnvironmentList: propTypes.arrayOf(Types.SupportEnvironmentItem),
  config: propTypes.object,
  toolPanels: propTypes.array,
  recommendation: propTypes.oneOfType([propTypes.object, propTypes.bool]),
  coverImageUrl: propTypes.string,
  widevine: propTypes.string,
  plugins: propTypes.array,
  onError: propTypes.func,
  onSourceLoaded: propTypes.func,
  onReady: propTypes.func,
  onPlay: propTypes.func,
  onPlaying: propTypes.func,
  onSeek: propTypes.func,
  onSeeked: propTypes.func,
  onPaused: propTypes.func,
  onTimeChanged: propTypes.func,
  onVolumeChanged: propTypes.func,
  onMuted: propTypes.func,
  onUnmuted: propTypes.func,
  onStallStarted: propTypes.func,
  onStallEnded: propTypes.func,
  onReplay: propTypes.func,
  onVideoQualityChanged: propTypes.func,
  onMediaSourceChanged: propTypes.func,
  onEnded: propTypes.func,
  onEnterFullscreen: propTypes.func,
  onExitFullscreen: propTypes.func,
  onViewModeChange: propTypes.func,
  onChangeVideo: propTypes.func,
  onChangeToNextVideo: propTypes.func,
  onChangeToPreviousVideo: propTypes.func,
  onBack: propTypes.func,
  onSectionChange: propTypes.func,
  onSourceUnloaded: propTypes.func,
  onLogging: propTypes.func,
}

const EnterprisePlayer = /*#__PURE__*/ forwardRef((props, ref) =>
  /*#__PURE__*/ jsx(Player, {
    drm: getEnterpriseDrmConfig,
    ...props,
    ref: ref,
  })
)

export {EnterprisePlayer as Player}