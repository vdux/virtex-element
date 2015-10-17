/**
 * Imports
 */

import {element as _element} from 'virtex'
import evStore from 'ev-store'
import events from './events'

/**
 * virtex-element
 */

function element (tag, attrs = {}, ...children) {
  for (let key in attrs) {
    attrs[key] = eventSugar(focusSugar(classSugar(key, attrs[key])))
  }

  return _element(tag, attrs, ...children)
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

      for (let key in value) {
        if (value.hasOwnProperty(key) && value[key]) {
          if (str) str += ' '
          str += key
        }
      }

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
