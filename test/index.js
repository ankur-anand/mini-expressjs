const miniExpress = require("../");
const app = miniExpress();

app.put("/", function(req, res) {
  res.send("put Hello World!");
});

app.get("/", function(req, res) {
  res.send("get Hello World!");
});

app.listen(3000, function() {
  console.log("Second Version of the miniExpress is running on PORT 3000");
});
