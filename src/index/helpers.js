;(function() {
  const styleChanger = document.getElementById('select-style')

  window.addEventListener('DOMContentLoaded', function() {
    const style = JSON.parse(localStorage.getItem('style'))
    document.body.className = style
    if (styleChanger) styleChanger.value = style
  })
})()
