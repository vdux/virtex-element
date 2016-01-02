/**
 * Imports
 */

import element from '../src'
import test from 'tape'

/**
 * Tests
 */

test('style sugar: convert objects to strings', t => {
  const div = element('div', {
    style: {color: '#fff', backgroundColor: '#000'}
  })

  t.deepEqual(trim(div.props.style), 'color:#fff;background-color:#000')
  t.end()
})

function trim (str) {
  return str.replace(/ /g,'')
}
