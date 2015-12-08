/**
 * Imports
 */

import {element as _element} from 'virtex'
import EvStore from 'ev-store'
import events from './events'
import {string as toStyle} from 'to-style'
import forEach from '@micro-js/foreach'
import isObject from '@micro-js/is-object'
import keychord from '@micro-js/keychord'

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
  return styleSugar(eventSugar(focusSugar(classSugar(value, name), name), name), name)
}

function styleSugar (value, name) {
  if (name === 'style' && isObject(value)) {
    return toStyle(value)
  }

  return value
}

function eventSugar (value, name) {
  return events.hasOwnProperty(name)
    ? bindEvent(events[name], value)
    : value
}

function focusSugar (value, name) {
  return name === 'focused'
    ? focusElement
    : value
}

function classSugar (value, name) {
  if (name === 'class') {
    if (Array.isArray(value)) {
      return value.join(' ')
    } else if (isObject(value)) {
      let str = ''

      forEach((val, key) => {
        if (val) {
          if (str) str += ' '
          str += key
        }
      }, value)

      return str
    }
  }

  return value
}

function bindEvent (eventName, fn) {
  return node => EvStore(node)[eventName] = createHandler(eventName, fn)
}

function createHandler (eventName, fn) {
  if (isObject(fn) && isKeyboardEvent(eventName)) {
    return e => {
      var chord = keychord(e)
      if (fn[chord]) {
        var f = fn[chord]
        return Array.isArray(f) ? f.map(f => f(e)) : f(e)
      }
    }
  } else if (Array.isArray(fn)) {
    return e => fn.map(f => f(e))
  } else {
    return fn
  }
}

function isKeyboardEvent (eventName) {
  return ['keydown', 'keypress', 'keyup'].indexOf(eventName) !== -1
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
