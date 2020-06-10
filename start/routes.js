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

Route.get('/home', 'HomeController.index').middleware('auth');

Route.group(() => {
  Route.get('/users', 'UserController.index');
  Route.get('/users/:id', 'UserController.show');

  Route.post('/users', 'UserController.store').validator('CreateUser');
}).middleware('auth');

Route.group(() => {
  Route.get('/customers', 'CustomerController.index');
  Route.get('/customers/:id', 'CustomerController.show');

  Route.post('/customers', 'CustomerController.store').validator(
    'CreateCustomer'
  );
  Route.put('/customers/:id', 'CustomerController.update');
}).middleware('auth');

Route.group(() => {
  Route.get('/categories', 'CategoryController.index');
  Route.get('/categories/:id', 'CategoryController.show');

  Route.post('/categories', 'CategoryController.store').validator(
    'CreateCategory'
  );
  Route.put('/categories/:id', 'CategoryController.update');
}).middleware('auth');

Route.group(() => {
  Route.get('/products', 'ProductController.index');
  Route.get('/products/:id', 'ProductController.show');

  Route.post('/products', 'ProductController.store').validator('CreateProduct');
  Route.put('/products/:id', 'ProductController.update').validator(
    'UpdateProduct'
  );
}).middleware('auth');

Route.group(() => {
  Route.get('/orders', 'OrderController.index');
  Route.get('/orders/:id', 'OrderController.show');

  Route.post('/orders', 'OrderController.store').validator('CreateOrder');
  Route.put('/orders/:id', 'OrderController.update').validator('UpdateOrder');
}).middleware('auth');

Route.group(() => {
  Route.get('/me', 'ProfileController.show');
  Route.put('/me', 'ProfileController.update').validator('UpdateProfile');
}).middleware('auth');
