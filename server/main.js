const express = require("express");
const path = require("path");
const webpack = require("webpack");
const logger = require("../build/lib/logger");
const webpackConfig = require("../build/webpack.config");
const project = require("../project.config");
const compress = require("compression");
const crypto = require("crypto");
const app = express();
const bodyParser = require("body-parser");
app.use(compress());
app.use(bodyParser.json());
const users = [
  {
    _id: 1,
    username: "g4mewarrior",
    password: "Singh123@",
    email: "ankit.bitmsra@gmail.com",
    phone: 7050514771,
    rollno: "BE/10026/2014",
    type: "admin"
  }
];
var genRandomString = function(length) {
  return crypto
    .randomBytes(Math.ceil(length / 2))
    .toString("hex") /** convert to hexadecimal format */
    .slice(0, length); /** return required number of characters */
};
var sha512 = function(password, salt) {
  var hash = crypto.createHmac("sha512", salt); /** Hashing algorithm sha512 */
  hash.update(password);
  var value = hash.digest("hex");
  return {
    salt: salt,
    passwordHash: value
  };
};
var _id = function() {
  return crypto
    .createHash("md5")
    .update(Math.random().toString())
    .digest("hex")
    .substring(0, 24);
};
function saltHashPassword(userpassword) {
  var salt = genRandomString(16); /** Gives us salt of length 16 */
  var passwordData = sha512(userpassword, salt);
  var obj = {
    hash: passwordData.passwordHash,
    salt: passwordData.salt
  };
  return obj;
}
app.post("/api/login", (req, res) => {
  const newUser = req.body;
  console.log(req.body);
  var success = false;
  users.map(user => {
    if (
      user.username === newUser.username &&
      user.password === newUser.password
    ) {
      success = true;
    }
  });
  if (success)
    res.json({ username: newUser.username, message: "Successful Login" });
  else {
    res.json({ username: newUser.username, message: "Login Failed" });
  }
});

app.post("/api/register", (req, res) => {
  const newUser = req.body;
  let alreadyRegistered = false;
  newUser._id = _id();
  newUser.type = "user";
  users.map(user => {
    if (user.rollno === newUser.rollno || user.username === newUser.username)
      alreadyRegistered = true;
  });
  if (alreadyRegistered) {
    res.json({ username: newUser.username, message: "Already Registered" });
  } else {
    users.push(newUser);
    res.json({
      username: newUser.username,
      message: "Successfully Registered"
    });
  }
});
// ------------------------------------
// Apply Webpack HMR Middleware
// ------------------------------------
if (project.env === "development") {
  const compiler = webpack(webpackConfig);

  logger.info("Enabling webpack development and HMR middleware");
  app.use(
    require("webpack-dev-middleware")(compiler, {
      publicPath: webpackConfig.output.publicPath,
      contentBase: path.resolve(project.basePath, project.srcDir),
      hot: true,
      quiet: false,
      noInfo: false,
      lazy: false,
      stats: "normal"
    })
  );
  app.use(
    require("webpack-hot-middleware")(compiler, {
      path: "/__webpack_hmr"
    })
  );

  // Serve static assets from ~/public since Webpack is unaware of
  // these files. This middleware doesn't need to be enabled outside
  // of development since this directory will be copied into ~/dist
  // when the application is compiled.
  app.use(express.static(path.resolve(project.basePath, "public")));

  // This rewrites all routes requests to the root /index.html file
  // (ignoring file requests). If you want to implement universal
  // rendering, you'll want to remove this middleware.
  app.use("*", function(req, res, next) {
    const filename = path.join(compiler.outputPath, "index.html");
    compiler.outputFileSystem.readFile(filename, (err, result) => {
      if (err) {
        return next(err);
      }
      res.set("content-type", "text/html");
      res.send(result);
      res.end();
    });
  });
} else {
  logger.warn(
    "Server is being run outside of live development mode, meaning it will " +
      "only serve the compiled application bundle in ~/dist. Generally you " +
      "do not need an application server for this and can instead use a web " +
      'server such as nginx to serve your static files. See the "deployment" ' +
      "section in the README for more information on deployment strategies."
  );

  // Serving ~/dist by default. Ideally these files should be served by
  // the web server and not the app server, but this helps to demo the
  // server in production.
  app.use(express.static(path.resolve(project.basePath, project.outDir)));
}

module.exports = app;
