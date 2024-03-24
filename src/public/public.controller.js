const config = require('config');
const axios = require('axios');
const { verifyToken } = require('../utils/helpers');

const baseUrl = `${config.baseUrl}/api`;

const instance = axios.create({});

axios.defaults.withCredentials = true;
// const setTokenInAxios = (token) => {
//   instance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
// };
// console.log(axios);
class PublicController {
  async renderMainPage(req, res) {
    try {
      const response = await axios.get(`${baseUrl}/posts`, {
        withCredentials: true
      });

      // console.log('PUBLIC getPosts', req.user);
      let posts = [];

      if (response.statusText === 'OK') {
        posts = response.data;
      }

      res.render('index', { posts });
    } catch (error) {}
  }

  async renderLoginPage(req, res) {
    try {
      res.render('login');
    } catch (error) {}
  }

  async renderSignPage(req, res) {
    try {
      res.render('signup');
    } catch (error) {}
  }

  async loginUser(req, res, next) {
    try {
      const response = await axios.post(`${baseUrl}/users/login`, req.body);

      const token = response.data;

      console.log('public login', token);

      const user = verifyToken(token);

      console.log(user);
      res.cookie('token', token, { ...config.cookies, secure: true });
      // req.user = user;
      res.redirect('/');
      // next();
      // const response = await axios.post(`${baseUrl}/users/login`, req.body);
      // // const response = await axios.post(`${baseUrl}/users/login`, req.body);

      // let token = '';

      // if (response.status === 200) {
      //   token = response.data;
      //   // setTokenInAxios(token);
      // }

      // const user = verifyToken(token);

      // console.log('PUBLIC LOGIN', user);
      // req.user = user;

      // next();
      // res.redirect('/');
    } catch (error) {}
  }

  async logout(req, res) {
    try {
      await axios.post(`${baseUrl}/users/logout`, req);
      res.clearCookie('token');
      res.redirect('/');
    } catch (error) {}
  }

  async signupUser(req, res, next) {
    try {
      // const response = await axios.post(`${baseUrl}/users/signup`, req.body);

      // let token = '';

      // if (response.status >= 200 && response.status < 400) {
      //   token = response.data;

      //   // setTokenInAxios(token);
      // }

      await axios.post(`${baseUrl}/users/signup`, req.body);
      res.redirect('/');

      // const user = verifyToken(token);

      // req.user = user;
      // console.log('PUBLIC LOGIN', req.user);

      // next();
    } catch (error) {}
  }

  async createPost(req, res) {
    console.log('PUBLIC createPost');

    try {
      const { user, body } = req;

      const data = {
        ...body,
        user
      };

      const { token } = req.cookies;

      console.log('[DATA]', data);

      await axios.post(`${baseUrl}/posts`, req.body, {
        withCredentials: true,
        'Content-Type': 'application/json',
        headers: {
          Authorization: `Bearer ${token}`
        },
        session: req.session,
        cookies: req.cookies,
        token: token
      });

      res.redirect('/');
    } catch (error) {}
  }
}

const publicController = new PublicController();

module.exports = publicController;
