const withAuth = (req, res, next) => {
  // If the user is not logged in, redirect the user to the login page
  if (!req.session.loggedIn) {
    res.redirect("/login");
  } else {
    // If the user is logged in, execute the route function that will allow them to view the protected pages
    // We call next() if the user is authenticated
    next();
  }
};

const withAuthApi = (req, res, next) => {
  // If the user is not logged in, redirect the user to the login page
  if (!req.session.loggedIn) {
    res.status(401).json({ message: "Unauthorized - please log in" });
  } else {
    // If the user is logged in, execute the route function that will allow them to view the protected pages
    // We call next() if the user is authenticated
    next();
  }
};

module.exports = {withAuth, withAuthApi}
