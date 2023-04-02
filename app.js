const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');

const compression = require("compression");
const RateLimit = require("express-rate-limit");

const indexRouter = require('./routes/index');
const apiRouter = require('./routes/api/ApiController');

const usersRouter = require('./routes/users/users');

const newsAdminRouter = require('./routes/newsletter/NewsletterAdmin');
const newsUserRouter = require('./routes/newsletter/NewsletterUser');
const newsUserUIRouter = require('./routes/newsletter/NewsletterUserUI');
const launcherUIRouter = require('./routes/newsletter/NewsletterLauncher');

const informationAdminRouter = require('./routes/info/InformationController');
const informationUserRouter = require('./routes/info/InformationUser');

const updatesAdminRouter = require('./routes/update/UpdateController');
const updatesUserRouter = require('./routes/update/UpdateUser');

const loginRouter = require('./routes/login/LoginController');
const adminRouter = require('./routes/admin/AdminController');
const logoutRouter = require('./routes/logout/logout');

const app = express();

/* Ограничитель: максимум двадцать запросов в минуту. */
const limiter = RateLimit({
    windowMs: 60 * 1000, // 1 minute
    max: 20,
});

app.use(limiter);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

/* Настройки сессии. */
const sessionOptions = {
    secret: 'dC10L3QuNC5CtCe0LksINGDINC70ZbRgdGWLCDQu9GW0YHRliwg0L', // Это строка-секрет для сессии.
    resave: false,
    saveUninitialized: true
};

app.use(session(sessionOptions));

/* Настройки для cookies. */
app.use(cookieParser());

/* Сжимаем все исходники. */
app.use(compression());

/* Шэрим public папку. */
app.use(express.static(path.join(__dirname, 'public')));
/* Устанавливаем в качестве шаблонизатора EJS. */
app.set('view engine', 'ejs');

/* Handle server errors. */
app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.status(500);
    res.render('error/500', { title: 'Server Error!' });
});

/* Новости, информация и главная страница должны быть досягаемыми всегда. */
app.use('/newsletter', newsUserRouter);
app.use('/newsletterUI', newsUserUIRouter);
app.use('/launcherUI', launcherUIRouter);

app.use('/information', informationUserRouter);
app.use('/updates', updatesUserRouter);

app.use('/', indexRouter);
app.use('/api', apiRouter);

/* Проверяем сессию. */
app.use((req, res, next) => {
    if (!req.session.user && req.originalUrl !== '/login') {
        return res.redirect('/login');
    }
    next();
});

/* Настраиваем маршруты. */
app.use('/login', loginRouter);
app.use('/logout', logoutRouter);

app.use('/admin', adminRouter);

app.use('/newsletter-admin', newsAdminRouter);
app.use('/information-admin', informationAdminRouter);
app.use('/updates-admin', updatesAdminRouter);
app.use('/users', usersRouter);


/* Handle 404 errors. */
app.use(function(req, res, next) {
    res.status(404);
    res.render('error/404', { title: 'Page Not Found!' });
});

module.exports = app;
