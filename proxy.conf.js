const generateConfig = function (url) {
  const pathRewrite = {};
  pathRewrite["^/" + url] = "";
  return {
    "target": "https://" + url,
    "secure": false,
    "pathRewrite": pathRewrite,
    "changeOrigin": true,
    "bypass": function (req, res, proxyOptions) {
      if (req.headers.accept.indexOf("html") !== -1) {
        return "/index.html";
      }
      req.headers["X-Custom-Header"] = "yes";
    }
  }
};

const PROXY_CONFIG = {
  "/imdb": generateConfig("www.myapifilms.com"),
  "/trailerAddict/taapi": generateConfig("www.myapifilms.com"),
};

module.exports = PROXY_CONFIG;
