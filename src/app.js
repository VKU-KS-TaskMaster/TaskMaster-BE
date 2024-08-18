const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const compression = require('compression');
const app = express();

app.use(morgan("dev"));

// strict transport security
const reqDuration = 2629746000;
app.use(
  helmet.frameguard({
    action: "deny",
  })
);
app.use(
  helmet.hsts({
    maxAge: reqDuration,
  })
);
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      scriptSrc: ["'self'"],
      styleSrc: ["'self'"],
    },
  })
);
app.use(helmet.noSniff());
app.use(helmet.xssFilter());
app.use(
  helmet.referrerPolicy({
    policy: "no-referrer",
  })
);

// downsize response
app.use(compression());



// init routes
app.use('', require('./routes'))

module.exports = app;
