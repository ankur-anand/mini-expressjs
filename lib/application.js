const http = require("http");

// routing management. Each http request can be distinguished based
// on the policy
const router = [
  {
    path: "*",
    method: "*",
    handle: function(req, res) {
      res.writeHead(200, { "Content-Type": "text/plain" });
      res.end("404");
    }
  }
];

const app = {
  /**
   * getmethod Simply add the get route request information to the
   * router array.
   *
   */
  get(path, fn) {
    router.push({
      path: path,
      method: "GET",
      handle: fn
    });
  },
  /**
   * listen functions, intercept all http request. So that our mini-expressjs
   * can analyze each HTTP request and handle different business logic according
   * to the different HTTP request.
   * @param {number} port
   * @param {function} cb
   */
  listen(port, cb) {
    const server = http.createServer((req, res) => {
      //lets add the send function
      if (!res.send) {
        res.send = function(body) {
          res.writeHead(200, {
            "Content-Type": "text/plain"
          });
          res.end(body);
        };
      }

      for (let i = 1; i < router.length; i += 1) {
        if (
          (req.url === router[i].path || router[i].path === "*") &&
          (req.method === router[i].method || router[i].method === "*")
        ) {
          return router[i].handle && router[i].handle(req, res);
        }
      }
      // if none of the route match return 404.
      return router[0].handle && router[0].handle(req, res);
    });

    return server.listen.apply(server, arguments);
  }
};

module.exports = app;
