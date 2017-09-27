;(function() {
  const body = document.getElementsByTagName('body')[0]
  const styleChanger = document.getElementById('select-style')

  window.addEventListener('load', function() {
    const style = JSON.parse(localStorage.getItem('style'))
    body.className = style
    if (styleChanger) styleChanger.value = style
  })
})()
