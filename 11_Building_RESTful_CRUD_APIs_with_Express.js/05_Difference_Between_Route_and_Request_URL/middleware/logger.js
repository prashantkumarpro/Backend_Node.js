// logger.js

const logger = (req, res, next) => {
  console.log('----- New Request -----')
  console.log('Method:', req.method)
  console.log('URL:', req.url)
  console.log('Time:', new Date().toISOString())
  console.log('------------------------')

  next() // move to next middleware or route
}

export default logger
