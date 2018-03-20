const miniExpress = require("../");
const app = miniExpress();

app.get("/", function(req, res) {
  res.send("Hello World");
});

app.listen(3000, function() {
  console.log("First Version of the miniExpress is running on PORT 3000");
});
