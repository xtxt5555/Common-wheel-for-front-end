function fetchStyle(ele, attr) {
  if (window.getComputedStyle) {
    attr = attr.replace(/([A-Z])/, function(match, $1) {
      return '-' + $1.toLowerCase()
    })
    return getComputedStyle(ele)[attr]
  } else {
    attr = attr.replace(/-(\w)/), function(match, $1) {
      return $1.toUpperCase()
    }
    return ele.currentStyle[attr]
  }
}