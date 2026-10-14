const app = require("./app");

const port = process.env.PORT || 3000;

app.listen(port, "127.0.0.1", () => {
  console.log(`Lab server listening on port ${port}`);
});
