/**
* 动画函数
 * @param {object} ele 施加动画的DOM元素
 * @param {object} tJSON 目标属性JSON
 * @param {number} duration 执行时长
 * @param {string} tweenStr 缓冲动画 可选
 * @param {function} fn 回调函数 可选
 */
function animate(ele, tarJSON, duration, tweenStr, callback) {
  //处理输入参数
  if (
    arguments.length < 3 ||
    typeof ele !== 'object' ||
    typeof tarJSON !== 'object' ||
    typeof duration !== 'number'
  ) {
    throw new Error('请至少输入3个参数或者您输入的参数类型有误')
  } else if ( arguments.length === 3) {
    tweenStr = 'CubicEaseInOut' //设置默认动画类型
  } else if (arguments.length === 4) {
    switch (typeof arguments[3]) {
      case 'string': 
        callback = null
        break
      case 'function':
        callback = arguments[3]
        tweenStr = 'CubicEaseInOut'
        break
      default: 
        throw new Error('您输入的第四个参数有误，要么为动画类型字符串，要么为回调函数')
    }
  }

  var frameNum = 0,
      begJSON = {},
      delJSON = {},
      interval = 16, // 60帧动画
      maxFrame = parseInt(duration / 16) + 1,
      timer

  ele.isAnimated = true

  //得到动画起始位置对象与变化量对象
  for (var k in tarJSON) {
    begJSON[k] = parseFloat(fetchStyle(ele, k))
    delJSON[k] = tarJSON[k] - begJSON[k]
  }
  console.log(begJSON, delJSON);
  

  clearInterval(timer)

  timer = setInterval(function() {

    //判断动画是否完成
    if (frameNum === maxFrame) {
      clearInterval(timer)
      delete(ele.isAnimated)
      callback && callback()
      return
    }

    for (var k in tarJSON) {
      //处理opacity
      if (k === 'opacity') {
        ele.style[k] = Tween[tweenStr](frameNum, begJSON[k], delJSON[k], maxFrame)
      } else {
        ele.style[k] = Tween[tweenStr](frameNum, begJSON[k], delJSON[k], maxFrame) + 'px'
      }
    }

    frameNum++
  }, interval)

  var Tween = {
    Linear: function (t, b, c, d) {
      // t是当前帧编号
      // b是起始位置
      // c表示变化量
      // d表示总帧数
      return (c * t) / d + b
    },
    //二次的
    QuadEaseIn: function (t, b, c, d) {
      return c * (t /= d) * t + b
    },
    QuadEaseOut: function (t, b, c, d) {
      return -c * (t /= d) * (t - 2) + b
    },
    QuadEaseInOut: function (t, b, c, d) {
      if ((t /= d / 2) < 1) return (c / 2) * t * t + b
      return (-c / 2) * (--t * (t - 2) - 1) + b
    },
    //三次的
    CubicEaseIn: function (t, b, c, d) {
      return c * (t /= d) * t * t + b
    },
    CubicEaseOut: function (t, b, c, d) {
      return c * ((t = t / d - 1) * t * t + 1) + b
    },
    CubicEaseInOut: function (t, b, c, d) {
      if ((t /= d / 2) < 1) return (c / 2) * t * t * t + b
      return (c / 2) * ((t -= 2) * t * t + 2) + b
    },
    //四次的
    QuartEaseIn: function (t, b, c, d) {
      return c * (t /= d) * t * t * t + b
    },
    QuartEaseOut: function (t, b, c, d) {
      return -c * ((t = t / d - 1) * t * t * t - 1) + b
    },
    QuartEaseInOut: function (t, b, c, d) {
      if ((t /= d / 2) < 1) return (c / 2) * t * t * t * t + b
      return (-c / 2) * ((t -= 2) * t * t * t - 2) + b
    },
    QuartEaseIn: function (t, b, c, d) {
      return c * (t /= d) * t * t * t * t + b
    },
    QuartEaseOut: function (t, b, c, d) {
      return c * ((t = t / d - 1) * t * t * t * t + 1) + b
    },
    QuartEaseInOut: function (t, b, c, d) {
      if ((t /= d / 2) < 1) return (c / 2) * t * t * t * t * t + b
      return (c / 2) * ((t -= 2) * t * t * t * t + 2) + b
    },
    //正弦的
    SineEaseIn: function (t, b, c, d) {
      return -c * Math.cos((t / d) * (Math.PI / 2)) + c + b
    },
    SineEaseOut: function (t, b, c, d) {
      return c * Math.sin((t / d) * (Math.PI / 2)) + b
    },
    SineEaseInOut: function (t, b, c, d) {
      return (-c / 2) * (Math.cos((Math.PI * t) / d) - 1) + b
    },
    ExpoEaseIn: function (t, b, c, d) {
      return t == 0 ? b : c * Math.pow(2, 10 * (t / d - 1)) + b
    },
    ExpoEaseOut: function (t, b, c, d) {
      return t == d ? b + c : c * (-Math.pow(2, (-10 * t) / d) + 1) + b
    },
    ExpoEaseInOut: function (t, b, c, d) {
      if (t == 0) return b
      if (t == d) return b + c
      if ((t /= d / 2) < 1) return (c / 2) * Math.pow(2, 10 * (t - 1)) + b
      return (c / 2) * (-Math.pow(2, -10 * --t) + 2) + b
    },
    CircEaseIn: function (t, b, c, d) {
      return -c * (Math.sqrt(1 - (t /= d) * t) - 1) + b
    },
    CircEaseOut: function (t, b, c, d) {
      return c * Math.sqrt(1 - (t = t / d - 1) * t) + b
    },
    CircEaseInOut: function (t, b, c, d) {
      if ((t /= d / 2) < 1) return (-c / 2) * (Math.sqrt(1 - t * t) - 1) + b
      return (c / 2) * (Math.sqrt(1 - (t -= 2) * t) + 1) + b
    },


    ElasticEaseIn: function (t, b, c, d, a, p) {
      if (t == 0) return b
      if ((t /= d) == 1) return b + c
      if (!p) p = d * 0.3
      if (!a || a < Math.abs(c)) {
        a = c
        var s = p / 4
      } else var s = (p / (2 * Math.PI)) * Math.asin(c / a)
      return (
        -(
          a *
          Math.pow(2, 10 * (t -= 1)) *
          Math.sin(((t * d - s) * (2 * Math.PI)) / p)
        ) + b
      )
    },
    ElasticEaseOut: function (t, b, c, d, a, p) {
      if (t == 0) return b
      if ((t /= d) == 1) return b + c
      if (!p) p = d * 0.3
      if (!a || a < Math.abs(c)) {
        a = c
        var s = p / 4
      } else var s = (p / (2 * Math.PI)) * Math.asin(c / a)
      return (
        a * Math.pow(2, -10 * t) * Math.sin(((t * d - s) * (2 * Math.PI)) / p) +
        c +
        b
      )
    },
    ElasticEaseInOut: function (t, b, c, d, a, p) {
      if (t == 0) return b
      if ((t /= d / 2) == 2) return b + c
      if (!p) p = d * (0.3 * 1.5)
      if (!a || a < Math.abs(c)) {
        a = c
        var s = p / 4
      } else var s = (p / (2 * Math.PI)) * Math.asin(c / a)
      if (t < 1)
        return (
          -0.5 *
            (a *
              Math.pow(2, 10 * (t -= 1)) *
              Math.sin(((t * d - s) * (2 * Math.PI)) / p)) +
          b
        )
      return (
        a *
          Math.pow(2, -10 * (t -= 1)) *
          Math.sin(((t * d - s) * (2 * Math.PI)) / p) *
          0.5 +
        c +
        b
      )
    },


    //冲过头系列
    BackEaseIn: function (t, b, c, d, s) {
      if (s == undefined) s = 1.70158
      return c * (t /= d) * t * ((s + 1) * t - s) + b
    },
    BackEaseOut: function (t, b, c, d, s) {
      if (s == undefined) s = 1.70158
      return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b
    },
    BackEaseInOut: function (t, b, c, d, s) {
      if (s == undefined) s = 1.70158
      if ((t /= d / 2) < 1)
        return (c / 2) * (t * t * (((s *= 1.525) + 1) * t - s)) + b
      return (c / 2) * ((t -= 2) * t * (((s *= 1.525) + 1) * t + s) + 2) + b
    },
    //弹跳系列
    BounceEaseIn: function (t, b, c, d) {
      return c - Tween.BounceEaseOut(d - t, 0, c, d) + b
    },
    BounceEaseOut: function (t, b, c, d) {
      if ((t /= d) < 1 / 2.75) {
        return c * (7.5625 * t * t) + b
      } else if (t < 2 / 2.75) {
        return c * (7.5625 * (t -= 1.5 / 2.75) * t + 0.75) + b
      } else if (t < 2.5 / 2.75) {
        return c * (7.5625 * (t -= 2.25 / 2.75) * t + 0.9375) + b
      } else {
        return c * (7.5625 * (t -= 2.625 / 2.75) * t + 0.984375) + b
      }
    },
    BounceEaseInOut: function (t, b, c, d) {
      if (t < d / 2) return Tween.BounceEaseIn(t * 2, 0, c, d) * 0.5 + b
      else return Tween.BounceEaseOut(t * 2 - d, 0, c, d) * 0.5 + c * 0.5 + b
    }
  }

}