module.exports = function (app) {
  app.use(function (req, res, next) {
/*    if (req._parsedUrl.pathname !== '/login' && !req.isAuthenticated()) {
      return res.redirect('/login');
    }
    res.locals.login = req.isAuthenticated();*/
    next();
  });
  app.use('/', require('../routes/index'));
  app.use('/login', require('../routes/login'));
  app.use('/logout', require('../routes/logout'));
  app.use('/admin', require('../routes/admin'));
  app.use('/companies', require('../routes/companies'));
};