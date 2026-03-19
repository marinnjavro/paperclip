import React, { useEffect, useRef, useState } from 'react'
import QRCodeStyling from 'qr-code-styling'

const qrCode = new QRCodeStyling({
  width: 422,
  height: 422,
  image: '/assets/static/images/logo.png',
  dotsOptions: {
    color: 'white',
    type: 'rounded'
  },
  imageOptions: {
    crossOrigin: 'anonymous',
    margin: 0
  },
  cornersSquareOptions: {
    type: 'extra-rounded'
  },
  backgroundOptions: {
    colorType: 'single-color',
    color: '#2B2C3E'
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
    <div className="App">
      <div style={styles.inputWrapper}></div>
      <div ref={ref} />
    </div>
  )
}

const styles = {
  inputWrapper: {
    margin: '0',
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
