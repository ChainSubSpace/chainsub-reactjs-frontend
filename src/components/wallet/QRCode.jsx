import React, { useRef, useEffect } from 'react'
import qr from 'qr.js'

export default ({ text, width, height }) => {
  const qrCanvas = useRef()

  useEffect(() => {
    const qrCode  = qr(text, {errorCorrectLevel:1})

    const canvas = qrCanvas.current

    canvas.width = width
    canvas.height = height

    const ctx = canvas.getContext('2d')

    const cells = qrCode.modules

    const tileW = width / cells.length
    const tileH = height / cells.length

    for (let r = 0; r < cells.length; r += 1) {
      const row = cells[r]
      for (let c = 0; c < row.length; c += 1) {
        ctx.fillStyle = row[c] ? '#00853D' : '#fff'
        const w = Math.ceil((c + 1) * tileW) - Math.floor(c * tileW)
        const h = Math.ceil((r + 1) * tileH) - Math.floor(r * tileH)
        ctx.fillRect(Math.round(c * tileW), Math.round(r * tileH), w, h)
      }
    }
  })
  return <canvas ref={qrCanvas} />
}
