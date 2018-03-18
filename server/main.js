const express = require("express");
var mongoose = require("mongoose");
var User = require("../src/models/user");
const path = require("path");
const webpack = require("webpack");
const logger = require("../build/lib/logger");
const webpackConfig = require("../build/webpack.config");
const project = require("../project.config");
const compress = require("compression");
const crypto = require("crypto");
const app = express();
const bodyParser = require("body-parser");
mongoose.connect("mongodb://localhost:27017/playground");
app.use(compress());
app.use(bodyParser.json());
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
function verifySaltPassword(userpassword, salt) {
  var passwordData = sha512(userpassword, salt);
  return passwordData.passwordHash;
}
app.post("/api/login", (req, res) => {
  const newUser = req.body;
  var obj = {};
  var exists = false;
  console.log("api called");
  User.find({ username: newUser.username }, function(err, storeduser) {
    if (err) {
      res.json(err);
    } else if (storeduser.length === 1) {
      console.log("user found", storeduser);
      if (
        verifySaltPassword(newUser.password, storeduser[0].salt) ===
        storeduser[0].hash
      ) {
        console.log("correct password");
        res.json({
          user: storeduser[0],
          message: "Successful Login",
          code: 200
        });
      } else {
        console.log("wrong password");
        res.json({
          message: "Wrong Username and Password Combination",
          code: 201
        });
      }
    } else {
      console.log("wrong user");
      res.json({
        message: "Username doesn't exist",
        code: 202
      });
    }
  });
});

app.post("/api/register", (req, res) => {
  const newUser = req.body;
  User.find(
    { $or: [{ username: newUser.username }, { rollno: newUser.rollno }] },
    function(err, user) {
      if (err) {
        res.json(err);
      } else if (user.length === 0) {
        var password = newUser.password;
        var salthash = saltHashPassword(password);
        var nuser = new User({
          _id: _id(),
          username: newUser.username,
          salt: salthash.salt,
          hash: salthash.hash,
          email: newUser.email,
          phone: newUser.phone,
          rollno: newUser.rollno,
          admin: false,
          created_at: new Date()
        });
        nuser.save(function(error) {
          if (err) throw err;
          console.log(newUser.username, " Registered Successfully");
        });
        res.json({
          username: newUser.username,
          message: "Successfully Registered",
          code: 400
        });
      } else {
        res.json({
          username: newUser.username,
          message: " Already exists",
          code: 401
        });
      }
    }
  );
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
