/**
 * Imports
 */

import createHandler from '@f/event-handler'
import {element as _element} from 'virtex'
import classNames from 'classnames'
import events from '@f/dom-events'
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
    for (let key in attrs) {
      attrs[key] = sugar(attrs[key], key)
    }
  }

  return _element.apply(null, arguments)
}

function sugar (value, name) {
  switch (name) {
    case 'class':
      return classNames(value)
    default:
      return eventRegex.test(name)
        ? bindEvent(name.slice(2).toLowerCase(), value)
        : value
  }
}

function bindEvent (name, handler) {
  if (!handler) return
  if (typeof handler === 'function' && !handler.$$fn) {
    throw new Error('vdux: illegal use of function as event handler')
  }

  const fn = createHandler(handler)
  fn.$$vduxAllowedHandler = true

  return (node, _name, removing) => removing
    ? EvStore(node)[name] = null
    : EvStore(node)[name] = fn
}

/**
 * Exports
 */

export default element
