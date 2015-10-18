
# virtex-element

[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](https://github.com/feross/standard)

A slightly opinionated, higher-level JSX element creator for [virtex](https://github.com/ashaffer/virtex) that wraps it's native `element`.

## Installation

    $ npm install virtex-element

## Features

  * Adds [ev-store](https://github.com/Raynos/ev-store) delegated events via `onXxx` property names - where `Xxx` is an event name (e.g. `onClick`).  Use a library like [delegant](https://github.com/ashaffer/delegant) to process them.
  * Class sugar for arrays/objects.  `['nav', 'featured'] -> 'nav featured'`, `{nav: true, featured: true, small: false} -> 'nav featured'`.
  * `focused` property.  If you set the `focused` prop to true, the element will receive focus when it is rendered.
  * Stringifies `style` objects using [toStyle](https://github.com/radubrehar/toStyle).

## License

The MIT License

Copyright &copy; 2015, Weo.io &lt;info@weo.io&gt;

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
