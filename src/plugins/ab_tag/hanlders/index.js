const { parse } = require("url");

// const handler = app.getRequestHandler();
// getRequestHandler 是干嘛用的？

const nextHandlerWrapper = app => {
  const handler = app.getRequestHandler();
  return async ({ raw, url }, h) => {
    console.log("url---->", url);
    await handler(raw.req, raw.res, url);
    return h.close;
  };
};

const defaultHandler = app => async ({ raw: { req, res }, url }) => {
  const { pathname, query } = parse(url, true);
  console.log("pathname--->", pathname);
  return app.renderToHTML(req, res, "/c", query);
};

module.exports = {
  defaultHandler,
  nextHandlerWrapper
};
