import ImageCompressor from 'image-compressor.js'
export function compressFile(file: any) {
  return new Promise((resolve, reject) => {
    const options: any = {
      success(result: any) {
        // 将压缩后的 Blob 转换为 File 对象（如果组件支持Blob则不用这一步）
        const compressedFile = new File([result], file.name, {
          type: file.type,
          lastModified: Date.now()
        })
        return resolve(compressedFile)
      },
      error(e: any) {
        return reject(e)
      }
    }
    // 200KB-3MB
    if (file.size > 0.2 * 1024 * 1024 && file.size <= 3 * 1024 * 1024) {
      options.quality = 0.15 // 压缩质量
      options.convertSize = false //不进行图像尺寸的调整
      options.checkOrientation = false // 图片翻转，默认为false
    }
    // 3-4MB
    if (file.size > 3 * 1024 * 1024 && file.size <= 4 * 1024 * 1024) {
      options.quality = 0.15 // 压缩质量
      options.convertSize = false //不进行图像尺寸的调整
      options.checkOrientation = false // 图片翻转，默认为false
    }
    // 5-6MB
    if (file.size > 5 * 1024 * 1024 && file.size <= 6 * 1024 * 1024) {
      options.quality = 0.2 // 压缩质量
      options.convertSize = false //不进行图像尺寸的调整
      options.checkOrientation = false // 图片翻转，默认为false
    }
    // 6-7MB
    if (file.size > 6 * 1024 * 1024 && file.size <= 7 * 1024 * 1024) {
      options.quality = 0.15 // 压缩质量
      options.convertSize = false //不进行图像尺寸的调整
      options.checkOrientation = false // 图片翻转，默认为false
    }
    // 7-9MB
    if (file.size > 7 * 1024 * 1024 && file.size <= 9 * 1024 * 1024) {
      options.quality = 0.1 // 压缩质量
      options.convertSize = false //不进行图像尺寸的调整
      options.checkOrientation = false // 图片翻转，默认为false
    }
    new ImageCompressor(file, options)
  })
}
