const {
  getAuthorizationHeader,
  splitAuthorizationHeader,
} = require('../utility/jwt.utility');

const authorized = (req, res, next) => {
  /**
   * * check if authorization header exists
   * * if there is no authorization header send 403 forbidden
   */
  const authorization = getAuthorizationHeader(req);
  if (!authorization) {
    return res.status(403).json({
      success: false,
      message: 'Authorization header is not present',
      result: {},
    });
  }
  /**
   * * check if Bearer and Token header exists
   * * if the token format is not Bearer [token] format send 403 forbidden
   */
  const { bearer, token } = splitAuthorizationHeader(authorization);
  if (!bearer) {
    return res.status(403).json({
      success: false,
      message: 'Format for authorization: Bearer [token]',
      result: {},
    });
  }
  if (!token) {
    return res.status(403).json({
      success: false,
      message: 'Verification token was not provided',
      result: {},
    });
  }
  /**
   * * pass the token, need for verifying the token as res.locals
   * * res.locals are persistent throughout the request life cycle or simply to say until the request is resolved
   */
  res.locals.token = token;
  next();
};

module.exports = authorized;