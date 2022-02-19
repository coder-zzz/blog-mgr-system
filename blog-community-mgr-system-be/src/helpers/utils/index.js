const getRequestBody = (ctx) => {
  return ctx.request.body || {};
}

module.exports = {
  getRequestBody,
}