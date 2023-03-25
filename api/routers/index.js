const router = require("express").Router();
const protectedRouter = require("./protected-router");
const authRouter = require("./auth-router");
// set up routes
const routes = [
  {
    url: "/api/protected",
    router: protectedRouter,
  },
  {
    url: "/api/auth",
    router: authRouter,
  },
];

// routes.forEach(({ url, router }) => {
//   router.use(url, router);
// });

// router.get("/", (req, res) => {
//   return res.status(200).json({
//     endpoints: routes.map((route) => route.url),
//   });
// });

module.exports = routes;
