/**
 * Imports
 */

import {element as _element} from 'virtex'
import toStyle from '@f/to-inline-style'
import capitalize from '@f/capitalize'
import focus from '@f/focus-element'
import classNames from 'classnames'
import isObject from '@f/is-object'
import keychord from '@f/keychord'
import events from '@f/dom-events'
import forEach from '@f/foreach'
import EvStore from 'ev-store'

/**
 * Constants
 */

const eventRegex = new RegExp('^on(?:' + events.join('|') + ')$', 'i')

/**
 * virtex-element
 */

function element (tag, attrs) {
  // Only apply sugar to native elements
  if (typeof tag === 'string' && attrs) {
    forEach((val, key) => attrs[key] = sugar(val, key), attrs)
  }

  return _element.apply(null, arguments)
}

function sugar (value, name) {
  switch (name) {
    case 'style':
      if (isObject(value)) value = toStyle(value)
      return value
    case 'class':
      return classNames(value)
    case 'focused':
      return value && (node => setTimeout(() => focus(node)))
    default:
      return eventRegex.test(name)
        ? bindEvent(name.slice(2).toLowerCase(), value)
        : value
  }
}

function bindEvent (name, fn) {
  return node => EvStore(node)[name] = createHandler(fn)
}

function createHandler (fn) {
  return e => {
    const f = isObject(fn) ? fn[keychord(e)] : fn

    if (f) {
      return Array.isArray(f)
        ? f.map(f => f(e))
        : f(e)
    }
  }
}

/**
 * Exports
 */

export default element
