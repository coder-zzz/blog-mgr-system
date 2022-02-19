const auth = require('./auth');
const inviteCode = require('./inviteCode')

module.exports = (app) => {
  app.use(auth.routes());
  app.use(inviteCode.routes());
}