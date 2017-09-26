require('../index/css/global.css')
require('./css/add.css')
require('./css/rating.css')

function parent () {}
parent.prototype.log = () => 'log from parent'

function child () {}
child.prototype = new parent()
child.prototype.constructor = child
child.prototype.logChild = function() { return 'log from child ' + this.log() }

function grandChild () {}
grandChild.prototype = new child()
grandChild.prototype.constructor = grandChild
grandChild.prototype.logGrandChild = function() { console.log('log from grandChild: ' + this.logChild())}