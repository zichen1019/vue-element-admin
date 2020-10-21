export function loadAMap(ak, plugins) {
  return new Promise(function(resolve, reject) {
    if (typeof BMap !== 'undefined') {
      // eslint-disable-next-line no-undef
      resolve(AMap)
      return true
    }
    window.onAMapCallback = function() {
      // eslint-disable-next-line no-undef
      resolve(AMap)
    }
    const script = document.createElement('script')
    script.type = 'text/javascript'
    script.src =
      'https://webapi.amap.com/maps?v=2.0&key=' + ak + '&plugins=' + plugins.join(',') + '&callback=onAMapCallback'
    script.onerror = reject
    document.head.appendChild(script)
  })
}

export function loadBMap(ak) {
  return new Promise(function(resolve, reject) {
    if (typeof BMap !== 'undefined') {
      // eslint-disable-next-line no-undef
      resolve(BMap)
      return true
    }
    window.onBMapCallback = function() {
      // eslint-disable-next-line no-undef
      resolve(BMap)
    }
    const script = document.createElement('script')
    script.type = 'text/javascript'
    script.src =
      'http://api.map.baidu.com/api?v=3.0&ak=' + ak + '&callback=onBMapCallback'
    script.onerror = reject
    document.head.appendChild(script)
  })
}

export default { loadAMap, loadBMap }
