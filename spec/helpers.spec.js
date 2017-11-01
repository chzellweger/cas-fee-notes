/* global describe it expect beforeEach spyOn */

const formatDay = require('../public/js/lib/helpers.js').formatDay

describe('format day', function() {
  beforeEach(function() {
    spyOn(Date, 'getDay').and.returnValue(0)
    
    this.day = new Date().getDay()
  })
  it('should return the right day', function() {
    expect(formatDay(new Date().getDay())).toEqual('Sonntag')
  })
})