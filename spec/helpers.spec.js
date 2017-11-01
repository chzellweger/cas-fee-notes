/* global describe it expect beforeEach spyOn */

const formatDay = require('../public/js/lib/helpers.js').formatDay

describe('format day', function() {
  beforeEach(function() {
    spyOn(Date.prototype, 'getDay').and.returnValue(0)
  })
  it('should return the right day', function() {
    expect(formatDay(new Date().getDay())).toEqual(' Sonntag ')
  })

  it('should attach the pre-/postfix correctly', function() {
    expect(formatDay(new Date().getDay(), 'nächsten', 'Vormittag'))
      .toEqual('nächsten Sonntag Vormittag')
  })
})