function Layer(path, fn) {
  this.handle = fn;
  this.name = fn.name || "<anonymous>";
  this.path = path;
}

Layer.prototype.handle_request = function(req, res) {
  var fn = this.handle;

  if (fn) {
    fn(req, res);
  }
};

Layer.prototype.match = function(path) {
  if (path === this.path || path === "*") {
    return true;
  }

  return false;
};

exports = module.exports = Layer;
