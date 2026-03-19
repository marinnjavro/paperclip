import React, { useEffect, useRef, useState } from 'react'
import QRCodeStyling from 'qr-code-styling'

const qrCode = new QRCodeStyling({
  width: 250,
  height: 250,
  image: '/assets/static/images/logo.png',
  dotsOptions: {
    color: 'white',
    type: 'rounded'
  },
  imageOptions: {
    crossOrigin: 'anonymous',
    margin: 2
  },
  cornersSquareOptions: {
    type: 'extra-rounded'
  },
  backgroundOptions: {
    colorType: 'single-color',
    color: '#2f3048'
  }
})

const QrCode = ({ url }) => {
  const [fileExt, setFileExt] = useState('png')
  const ref = useRef(null)

  useEffect(() => {
    qrCode.append(ref.current)
  }, [])

  useEffect(() => {
    qrCode.update({
      data: url
    })
  }, [url])

  const onDownloadClick = () => {
    qrCode.download({
      extension: fileExt
    })
  }

  return (
    <div>
      <div style={styles.inputWrapper}></div>
      <div ref={ref} />
    </div>
  )
}

const styles = {
  inputWrapper: {
    margin: '20px 0',
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%'
  },
  inputBox: {
    flexGrow: 1,
    marginRight: 20
  }
}

export default QrCode
