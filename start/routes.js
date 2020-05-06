/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route');

Route.get('/files/:file', 'FileController.show');

Route.post('/sessions', 'SessionController.store').validator('Session');

Route.post('/forgot', 'ForgotPasswordController.store').validator(
  'ForgotPassword'
);

Route.post('/reset', 'ResetPasswordController.store').validator(
  'ResetPassword'
);

Route.group(() => {
  Route.get('/users', 'UserController.index');
  Route.get('/users/:id', 'UserController.show');

  Route.post('/users', 'UserController.store').validator('CreateUser');
  Route.put('/users', 'UserController.update').validator('UpdateUser');
}).middleware('auth');

Route.group(() => {
  Route.get('/customers', 'CustomerController.index');
  Route.get('/customers/:id', 'CustomerController.show');

  Route.post('/customers', 'CustomerController.store').validator(
    'CreateCustomer'
  );
  Route.put('/customers/:id', 'CustomerController.update');
}).middleware('auth');
