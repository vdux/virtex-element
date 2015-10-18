/**
 * Imports
 */

import {element as _element} from 'virtex'
import EvStore from 'ev-store'
import events from './events'
import {string as toStyle} from 'to-style'
import forEach from './forEach'

/**
 * virtex-element
 */

function element (tag, attrs, ...children) {
  // Only apply sugar to native elements
  if (typeof tag === 'string' && attrs) {
    forEach(attrs, (val, key) => attrs[key] = sugar(key, val))
  }

  return _element(tag, attrs, ...children)
}

function sugar (name, value) {
  return styleSugar(name, eventSugar(name, focusSugar(name, classSugar(name, value))))
}

function styleSugar (name, value) {
  if (name === 'style' && typeof value === 'object') {
    return toStyle(value)
  }

  return value
}

function eventSugar (name, value) {
  return events.hasOwnProperty(name)
    ? bindEvent(events[name], value)
    : value
}

function focusSugar (name, value) {
  return name === 'focused'
    ? focusElement
    : value
}

function classSugar (name, value) {
  if (name === 'class') {
    if (Array.isArray(value)) {
      return value.join(' ')
    } else if (typeof value === 'object') {
      let str = ''

      forEach(value, (val, key) => {
        if (val) {
          if (str) str += ' '
          str += key
        }
      })

      return str
    }
  }

  return value
}

function bindEvent (eventName, fn) {
  return node => {
    EvStore(node)[eventName] = fn
  }
}

function focusElement (node) {
  setTimeout(() => {
    if (node.ownerDocument.activeElement !== node) {
      node.focus()
    }
  })
}

/**
 * Exports
 */

export default element
