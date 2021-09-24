const withAuth = require("../utils/auth");

const router = require("express").Router();

// landing page
router.get("/", async (req, res) => {
  res.render("home", {page:'home'});
});

// App (protected route)
router.get("/app", withAuth, async (req, res) => {
    res.render('app', {page:'app'});
});

// login page
router.get("/login", async (req, res) => {
    res.render('login', {page:'login'});
  });

module.exports = router;
