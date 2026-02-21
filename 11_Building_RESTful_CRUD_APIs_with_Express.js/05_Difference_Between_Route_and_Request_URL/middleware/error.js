const error = (err, req, res, next) => {
  // Error Handler Middlewares - 4 Params
  console.log({ err: err.message })
  console.log('Running Error Middleware')
  res.end(err.message)
}

export default error
