const {withAuth} = require("../utils/auth");

const router = require("express").Router();

// landing page
router.get("/", async (req, res) => {
  res.render("home", { page: "home", loggedIn: req.session.loggedIn });
});

// App (protected route)
// router.get("/app", withAuth, async (req, res) => {
//     res.render('app', {page:'app'});
// });

// dashboard page
// router.get("/dashboard", withAuth, async (req, res) => {
//   res.render('dashboard', {page:'dashboard'});
// });

// login page
router.get("/login", async (req, res) => {
    res.render("login", { page: "login", loggedIn: req.session.loggedIn });
  });

module.exports = router;
