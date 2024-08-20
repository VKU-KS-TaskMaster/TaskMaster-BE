import morgan from "morgan";
import helmet from "helmet";
import compression from "compression";
import express from "express";
import router from './routes'

const app = express();
app.use(morgan("dev"));

app.use(express.json())

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
app.use('', router)

module.exports = app;
