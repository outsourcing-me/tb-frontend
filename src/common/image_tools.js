// 用canvas压缩图片，可以根据cropInfo做比例转换
export function compressImage(img, cropInfo) {
  let canvas = document.createElement('canvas')
  let ctx = canvas.getContext('2d')
  /*drawimg 的各个参数*/
  let nw = img.naturalWidth
  let nh = img.naturalHeight
  let sw = nw
  let sh = nh
  let imgLeft = 0 // sx
  let imgTop = 0 // sy
  let dx = 0 //canvas 起始x坐标
  let dy = 0 //canvas 起始y坐标
  let dw = 600 // 默认 600像素
  let dh = cropInfo ? parseInt(cropInfo.h / cropInfo.w * dw, 10) : parseInt(sh / nw * dw, 10) // 默认是图片的比例
  // 压缩比例已经确定 设置canvas尺寸
  canvas.width = dw
  canvas.height = dh

  if (cropInfo) {
    // 换成截图的比列

    imgLeft = parseInt(cropInfo.l * nw / cropInfo.cw, 10) // 以下转换成自然尺寸
    imgTop = parseInt(cropInfo.t * nh / cropInfo.ch, 10)
    sw = parseInt(cropInfo.w * nw / cropInfo.cw, 10)
    sh = parseInt(cropInfo.h * nh / cropInfo.ch, 10)

    // ***@iOS canvas 的 sx sy 不支持负值，只能附加到dx 和dy上
    if (imgLeft < 0) {
      dx -= parseInt(imgLeft * dw / sw, 10)
      imgLeft = 0
    }

    if (imgTop < 0) {
      dy -= parseInt(imgTop * dh / sh, 10)
      imgTop = 0
    }

    // ***@iOS 上面, sw 和 sh 超出不兼容的问题，
    if (sw > nw - imgLeft) {
      dw = parseInt(dw * (nw - imgLeft) / sw, 10) // 百分比的更改dw
      sw = nw - imgLeft
    }

    if (sh > nh - imgTop) {
      dh = parseInt(dh * (nh - imgTop) / sh, 10) // 百分比的更改dh
      sh = nh - imgTop
    }
  }

  // console.log(imgLeft, imgTop, w, h)

  /*if (exifTags) {
    console.log(exifTags, w, h)
    switch (exifTags.Orientation) {
      case 8:
        ctx.rotate(90 * Math.PI / 180)
        break
      case 3:
        ctx.rotate(180 * Math.PI / 180)
        break
      case 6:
        ctx.rotate(-90 * Math.PI / 180)
        break
      case 1:
        ctx.rotate(-90 * Math.PI / 180)
        break
    }
  }*/

  ctx.drawImage(img, imgLeft, imgTop, sw, sh, dx, dy, dw, dh)

  let data = canvas.toDataURL('image/jpeg')
  data = data.split(',')[1]
  data = window.atob(data) // 二进制
  let ia = new Uint8Array(data.length)
  for (let i = 0; i < data.length; i++) {
    ia[i] = data.charCodeAt(i)
  }

  //canvas.toDataURL 返回的默认格式就是 image/png
  return new Blob([ia], {
    type: 'image/jpeg'
  })
}

// 获取图片信息
export function getImageInfo(url) {
  return new Promise((resolve, reject) => {
    let img = new Image()

    img.onload = function() {
      let imgW = img.naturalWidth
      let imgH = img.naturalHeight
      let longSide = Math.max(imgW, imgH)
      let shortSide = Math.min(imgW, imgH)

      resolve({
        direction: img.naturalHeight >= img.naturalWidth ? 'portrait' : 'landscape',
        width: img.naturalWidth,
        height: img.naturalHeight,
        widthHeightDiffPercent: (longSide - shortSide) / longSide
      })
    }

    img.onerror = function() {
      reject('图片加载失败！')
    }

    img.src = url
  })
}
