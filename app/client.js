const express = require("express");
const httpProxy = require("http-proxy");

var app = express();
var apiEndpoint = "http://127.0.0.1:3001/api";
var proxy = httpProxy.createProxyServer({
  target: apiEndpoint
});

app.use("/", express.static("client/build"));
app.use("/api", (req, res) => {
  proxy.web(req, res, { target: apiEndpoint });
});

// Always return index.html, so pre-specified URL can be rendered in client
app.get("*", (req, res) => {
  res.sendFile("client/build/index.html");
});

app.listen(3000, () => {
  console.log(`Client server running on: http://127.0.0.1:3000/`); // eslint-disable-line no-console
});
