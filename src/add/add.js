'use strict'
;(function() {
  controller.init()
  
  // catch form input
  if(helpers.getQueryVariable('mode')) {
    controller.editItems(helpers.getQueryVariable('id'))
  }
  controller.createItems()
})()
