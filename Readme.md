
# virtex-element

[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](https://github.com/feross/standard)

A slightly opinionated, higher-level JSX element creator for [virtex](https://github.com/ashaffer/virtex) that wraps it's native `element`.

## Installation

    $ npm install virtex-element

## Features

This library provides a number of little bits of syntactic sugar to make your life easier when working with [virtex](https://github.com/ashaffer/virtex).

### Event handler registration

Adds [ev-store](https://github.com/Raynos/ev-store) delegated events via `onXxx` property names - where `Xxx` is an event name (e.g. `onClick`).  Use a library like [delegant](https://github.com/ashaffer/delegant) to process them. E.g.

```javascript
delegant(rootNode, store.dispatch)
```

When your app is bootstrapped. If you are using [vdux](https://github.com/ashaffer/vdux), this will be done for you.

### Class sugar

Object/array syntax for classnames.

`class={['nav', 'featured']}` -> `class="nav featured"`

`class={{nav: true, featured: true, small: false}}` -> `class="nav featured"`

### `focused` property

Setting the `focused` prop to true on an element will cause that element to receive focus on the next tick. E.g.

```javascript
function render ({props}) {
  return (
    <div class={{show: props.opened}}>
      <input type='text' focused={props.opened} />
    </div>
  )
}
```

### Style objects

Passing an object as the `style` prop to an element will cause that object to be stringified by [toStyle](https://github.com/radubrehar/toStyle). E.g.

```javascript
import colors from 'lib/colors'

function render ({props, children}) {
  return <button style={{color: props.primary ? colors.primary : colors.accent}}>{children}</button>
}
```

### Event sugar

All event handlers accept arrays, which will execute all of the handlers in the array. The `keyup/keydown/keypress` events have additional special syntax for selecting on keys or key combinations using [keychord](https://github.com/micro-js/keychord). E.g.

```javascript
function render () {
  return <input onKeyPress={{enter: submitEntry, esc: cancelEdit}} onInput={setText} />
}
```

The available events and their mappings are:

```
onBlur: 'blur',
onChange: 'change',
onClick: 'click',
onContextMenu: 'contextmenu',
onCopy: 'copy',
onCut: 'cut',
onDoubleClick: 'dblclick',
onDblClick: 'dblclick',
onDrag: 'drag',
onDragEnd: 'dragend',
onDragEnter: 'dragenter',
onDragExit: 'dragexit',
onDragLeave: 'dragleave',
onDragOver: 'dragover',
onDragStart: 'dragstart',
onDrop: 'drop',
onError: 'error',
onFocus: 'focus',
onInput: 'input',
onInvalid: 'invalid',
onKeyDown: 'keydown',
onKeyPress: 'keypress',
onKeyUp: 'keyup',
onMouseDown: 'mousedown',
onMouseEnter: 'mouseenter',
onMouseLeave: 'mouseleave',
onMouseMove: 'mousemove',
onMouseOut: 'mouseout',
onMouseOver: 'mouseover',
onMouseUp: 'mouseup',
onPaste: 'paste',
onReset: 'reset',
onScroll: 'scroll',
onSubmit: 'submit',
onTouchCancel: 'touchcancel',
onTouchEnd: 'touchend',
onTouchMove: 'touchmove',
onTouchStart: 'touchstart',
onWheel: 'wheel'
```

If you'd like to see something else added here, feel free to submit a pull request.



## License

The MIT License

Copyright &copy; 2015, Weo.io &lt;info@weo.io&gt;

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
