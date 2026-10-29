// ============================================================
// Vercel Serverless Function Handler
// Forwards /api/* requests to the application request handler
// ============================================================
const { handler } = require('../server.js');

module.exports = (req, res) => {
  return handler(req, res);
};
