const Layer = require("./layer.js");

const Route = function(path) {
  this.path = path;
  this.stack = [];

  this.methods = {};
};

Route.prototype._handles_method = function(method) {
  const name = method.toLowerCase();
  return Boolean(this.methods[name]);
};

Route.prototype.get = function(fn) {
  var layer = new Layer("/", fn);
  layer.method = "get";

  this.methods["get"] = true;
  this.stack.push(layer);
  return this;
};

Route.prototype.put = function(fn) {
  var layer = new Layer("/", fn);
  layer.method = "put";

  this.methods["put"] = true;
  this.stack.push(layer);
  return this;
};

Route.prototype.dispatch = function(req, res) {
  var self = this,
    method = req.method.toLowerCase();

  for (var i = 0, len = self.stack.length; i < len; i++) {
    if (method === self.stack[i].method) {
      return self.stack[i].handle_request(req, res);
    }
  }
};

exports = module.exports = Route;
