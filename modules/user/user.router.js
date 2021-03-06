const express = require('express');
const apiAuth = require('../../middlewares/api_auth');
const viewAuth = require('../../middlewares/view_auth');
const UserApi = require('./user.api');
const UserController = require('./user.controller');
const apiRouter = express.Router();
const webRouter = express.Router();

// 用户注册
apiRouter.post('/signup', UserApi.signup);
// 用户登录
apiRouter.post('/login', UserApi.login);
// 用户详情
apiRouter.get('/users/:id', UserApi.get);
// 修改用户信息
apiRouter.put('/users/:id', apiAuth.userRequired, UserApi.update);
// 修改密码
apiRouter.put(
    '/users/:id/password',
    apiAuth.userRequired,
    UserApi.changePassword
);
// 用户列表
apiRouter.get(
    '/users',
    apiAuth.userRequired,
    apiAuth.adminRequired,
    UserApi.list
);
// 改变角色
apiRouter.put(
    '/users/:id/status',
    apiAuth.userRequired,
    apiAuth.adminRequired,
    UserApi.changeStatus
);
// 注销用户
apiRouter.delete('/users/:id', apiAuth.userRequired, UserApi.delete);

// 注册页
webRouter.get('/signup', UserController.signupPage);
// 登录页
webRouter.get('/login', UserController.loginPage);
// 提交登录
webRouter.post('/login', UserController.login);
// 安全退出
webRouter.get('/signout', UserController.signout);
// 用户列表管理页
webRouter.get(
    '/admin/users',
    viewAuth.adminRequired,
    UserController.userListPage
);

module.exports = {
    apiRouter,
    webRouter
};
