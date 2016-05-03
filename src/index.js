/**
 * Imports
 */

import createHandler from '@f/event-handler'
import {element as _element} from 'virtex'
import capitalize from '@f/capitalize'
import focus from '@f/focus-element'
import classNames from 'classnames'
import isObject from '@f/is-object'
import keychord from '@f/keychord'
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

function bindEvent (name, fn) {
  return node => EvStore(node)[name] = createHandler(fn)
}

/**
 * Exports
 */

export default element
