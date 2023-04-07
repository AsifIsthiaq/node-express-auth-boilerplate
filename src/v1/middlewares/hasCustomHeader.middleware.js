const {
  getXApiKeyHeader,
  getXAppIdHeader,
  getXAppVersionHeader,
} = require('../utility/header.utility');
const ForbiddenError = require('../errors/ForbiddenError');

const hasCustomHeader = (req, res, next) => {
  try {
    /**
     * * check if x-api-key header exists
     * * if there is no x-api-key header send 403 ForbiddenError
     * @param ForbiddenError(origin, message)
     */
    const xApiKey = getXApiKeyHeader(req);
    if (!xApiKey) {
      throw new ForbiddenError(
        'hasCustomHeader-no-x-api-key-header',
        'x-api-key header is not present',
      );
    }
    /**
     * * check if x-app-id header exists
     * * if there is no x-app-id header send 403 ForbiddenError
     * @param ForbiddenError(origin, message)
     */
    const xAppId = getXAppIdHeader(req);
    if (!xAppId) {
      throw new ForbiddenError(
        'hasCustomHeader-no-x-app-id-header',
        'x-app-id header is not present',
      );
    }
    /**
     * * check if x-app-version header exists
     * * if there is no x-app-version header send 403 ForbiddenError
     * @param ForbiddenError(origin, message)
     */
    const xAppVersion = getXAppVersionHeader(req);
    if (!xAppVersion) {
      throw new ForbiddenError(
        'hasCustomHeader-no-x-app-version-header',
        'x-app-version header is not present',
      );
    }
    res.locals.customHeaders = { xApiKey, xAppId, xAppVersion };
    next();
  } catch (error) {
    error.origin = error.origin ? error.origin : 'hasCustomHeader-base-error:';
    next(error);
  }
};

module.exports = hasCustomHeader;
