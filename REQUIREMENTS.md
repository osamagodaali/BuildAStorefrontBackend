# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 


## API Endpoints
#### Users
- Authenticate User [token required]: `'localhost/3000/api/users/authentacate' [POST] (token)`
- Create New User [token required]: `'localhost/3000/api/users/' [POST] (token)`
- Get All Users [token required]: `'localhost/3000/api/users/' [GET] (token)`
- Get One User [token required]: `'localhost/3000/api/users/{id}' [GET] (token)`
- Update One User [token required]: `'localhost/3000/api/users/{id}' [PATCH] (token)`
- DELETE One User [token required]: `'localhost/3000/api/users/{id}' [DELETE] (token)`

#### Products
- Create New Product [token required]: `'localhost/3000/api/products/' [POST] (token)`
- Get All Products [token required]: `'localhost/3000/api/products/' [GET] (token)`
- Get All Products By Category name [token required]: `'localhost/3000/api/products/category/{category_name}' [GET] (token)`
- Get One Product [token required]: `'localhost/3000/api/products/{id}' [GET] (token)`
- Update One Product [token required]: `'localhost/3000/api/products/{id}' [PATCH] (token)`
- DELETE One Product [token required]: `'localhost/3000/api/products/{id}' [DELETE] (token)`

#### Orders
- Create New Order [token required]: `'localhost/3000/api/orders/' [POST] (token)`
- Get All Orders [token required]: `'localhost/3000/api/orders/' [GET] (token)`
- Get All Orders For User Id [token required]: `'localhost/3000/api/orders/user/{userid}' [GET] (token)`
- Get All Orders For Product Id [token required]: `'localhost/3000/api/orders/product/{productid}' [GET] (token)`
- Get One Order [token required]: `'localhost/3000/api/orders/{id}' [GET] (token)`
- Update One Order [token required]: `'localhost/3000/api/orders/{id}' [PATCH] (token)`
- DELETE One Order [token required]: `'localhost/3000/api/orders/{id}' [DELETE] (token)`

## Unit Test Endpoint
#### Users Models

###### Test Authentication Module
- check if function authentacate is exist
- Test if return authenticated user data
- test add wrong user login data
###### Test Authentication Routes
- check if get token
- check if add wrong user data

###### Test User Module
- check if function get all users is exist
- check if function create new user is exist
- check if function get one user is exist
- check if function update user is exist
- check if function delete user is exist
- Test if return new user data
- Test function get all users return 2 users
- Test function get one user
- Test function update user
- Test function delete user return  user id

###### Test User Routes
- Test Create New User Route
- Test Get All Users Route
- Test Get One User Route
- Test Update User Route
- Test DELETE User Route

#### Products Models
###### Test Products Module
- check if function get all products is exist
- check if function get all products by category is exist
- check if function create new Product is exist
- check if function get one product is exist
- check if function update product is exist
- check if function delete product is exist
- Test if return create new product
- Test function get all products return 2 product
- Test function get all products by category return 2 product
- Test function get one product
- Test function update product 
- Test function delete product return  product id

###### Test Products Routes
- Test Create New Product Route
- Test Get All Products Route
- Test Get All Products By Category Route
- Test Get One product Route
- Test Update Product Route
- Test DELETE Product Route

#### Orders Models
###### Test Orders Module
- check if function get all orders is exist
- check if function get all orders for user is exist
- check if function get all orders for product is exist
- check if function create new order is exist
- check if function get one order is exist
- check if function update order is exist
- check if function delete order is exist
- Test if return create new order
- Test function get all orders return 2 order
- Test function get all orders for user return 2 order
- Test function get all orders for product return 1 order
- Test function get one order
- Test function update order
- Test function delete order return  order id

###### Test Orders Routes
- Test Create New Order Route
- Test Get All Orders Route
- Test Get All Orders For user Route
- Test Get All Orders for product Route
- Test Get One Order Route
- Test Update Order Route
- Test DELETE Order Route

### Users Schema
```sql 
CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    firstname VARCHAR(50) NOT NULL,
    lastname VARCHAR(50) NOT NULL,
    email VARCHAR(50) UNIQUE,
    password VARCHAR(255) NOT NULL
);
```
### Products Schema
```sql 
CREATE TABLE products(
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    details TEXT NOT NULL,
    category VARCHAR(100) NOT NULL,
    price INTEGER NOT NULL
);
```

### Orders Schema
```sql 
CREATE TABLE orders(
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) NOT NULL,
    product_id INTEGER REFERENCES products(id) NOT NULL,
    quantity INTEGER NOT NULL,
    status VARCHAR(50)
);
```