! function() {
  var el
  var manifest = JSON.parse(localStorage.getItem('manifest') || '{}')
  var resource = manifest.load ?
    manifest.load.concat() : [
      'static/css/app.css',
      'static/js/manifest.js',
      'static/js/vendor.js',
      'static/js/app.js'
    ]
  var head = document.getElementsByTagName('head')[0]

  function loadResource() {
    var now = +new Date()
    var root = manifest.root || ''
    resource.forEach(function(src) {
      if (!src) return
        // Ensure the 'src' has no '/' (it's in the root already)
      if (src[0] === '/') src = src.substr(1)
      src = root + src

      if (src.substr(-3) === '.js') {
        el = document.createElement('script')
        el.charset = 'UTF-8'
        el.type = 'text/javascript'
        el.src = src + '?' + now
        el.async = false
      } else {
        el = document.createElement('link')
        el.rel = 'stylesheet'
        el.href = src + '?' + now
        el.type = 'text/css'
      }
      head.appendChild(el)
    })
  }

  // deviceready is cordova event
  document.addEventListener('deviceready', loadResource, false)

}()
