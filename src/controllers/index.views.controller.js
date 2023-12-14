export default class IndexViewsControllers {

    constructor() {}

    GETIndex = async (req, res, next) => {

        try {
            res.render("index", { pageTitle: 'index' });
        } catch (error) {
            next(error);
        }
    };

    GETLogin = async (req, res, next) => {

        try {
            res.render("login", { pageTitle: 'login' });
        } catch (error) {
            next(error);
        }
    };

    GETRegister = async (req, res, next) => {

        try {
            res.render("register", { pageTitle: 'register' });
        } catch (error) {
            next(error);
        }
    };

    GETProducts = async (req, res, next) => {

        try {
            res.render("home", { pageTitle: 'home' });
        } catch (error) {
            next(error);
        }
    }

    GETSwagger = async (req, res, next) => {

        try {
            res.render("swagger", { pageTitle: 'swagger' });
        } catch (error) {
            next(error);
        }
    }
}