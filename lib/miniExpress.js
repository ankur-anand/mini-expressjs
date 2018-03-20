const app = require("./application");

// routing management. Each http request can be distinguished based
// on the policy
function createApplication() {
  return app;
}

module.exports = createApplication;
