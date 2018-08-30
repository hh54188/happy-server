const { parse } = require("url");

// const handler = app.getRequestHandler();
// getRequestHandler 是干嘛用的？

const nextHandlerWrapper = app => {
  const handler = app.getRequestHandler();
  return async ({ raw, url }, h) => {
    await handler(raw.req, raw.res, url);
    return h.close;
  };
};

const defaultHandler = app => async ({ raw: { req, res }, url }) => {
  const { pathname, query } = parse(url, true);
  return app.renderToHTML(req, res, pathname, query);
};

module.exports = {
  defaultHandler,
  nextHandlerWrapper
};
