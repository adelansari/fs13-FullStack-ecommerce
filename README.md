# Fullstack Project

![TypeScript](https://img.shields.io/badge/TypeScript-v.4.9.5-green)
![CSS](https://img.shields.io/badge/CSS-hotpink)
![React](https://img.shields.io/badge/React-v.18.2-blue)
![Redux toolkit](https://img.shields.io/badge/Redux-v.1.9.5-brown)
![.NET Core](https://img.shields.io/badge/.NET%20Core-v.7-purple)
![EF Core](https://img.shields.io/badge/EF%20Core-v.7-cyan)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-v.15-drakblue)

* Frontend: TypeScript, React, Redux Toolkit, Material UI
* Backend: ASP .NET Core, Entity Framework Core, PostgreSQL

Deployed App: [fs13-fullstack.fly.dev](https://fs13-fullstack.fly.dev/)

## Steps in creating this project from scratch

### Backend

Setting up:

- Creating a solution file in the directory: `dotnet new sln`
- Creating the backend API: `dotnet new webapi -o backend`
- Adding the backend server into the solution (backend.csproj): `dotnet sln add backend`
- Creating Product class in Entities
- Adding entity framework to backend. Openning NuGet Gallery and installing:
 `Microsoft.EntityFrameworkCore.Sqlite`
 `Microsoft.EntityFrameworkCore.Sqlite`
 - Creating folder Data to store data related things and creating a `StoreContext` class and add it to service container in `Program` class.
 - Making sure I have installed dotnet-ef
 - Doing migration when the backend api is not running using: `dotnet ef migrations add InitialCreate -o Data/Migrations`
 - Creating the database: `dotnet ef database update`
 - Adding seed data for products into the database using `DbInitializer` class.
 - Migrate and seed the data on app startup using `Program` class by creating a scope (removing old db using `dotnet ef database drop`)
 - Creating product controller for api with the following end points: `api/products` and `api/products/{id}`
 - Creating the .gitignore using `dotnet new gitignore`
 - Add entity for basket/shopping cart creation and then `dotnet ef migrations add BasketEntityAdded`

Running the backend app:
- `dotnet run`
- `dotnet watch --no-hot-reload` during development

### Frontend
- Creating a react app: `npx create-react-app frontend --template typescript --use-npm`
- Creating react hooks and fetching product data + configuring CORS for backend
- Adding typescript interface for Product
- Folder organization by adding layout and models into `app` folder. Also adding all app features in `features` folder such as react components.
- Adding [Material UI](https://mui.com/material-ui/getting-started/installation/) styling framework
- Adding image assets to public folder + some styling with Material UI
- Adding product cards and styling
- Adding light and dark theme using Material UI
- Setting up react router: `npm install react-router-dom`
- Adding Nav Links to header and styling
- Fetching data with axios: `npm install axios` on component load
- Adding a product detail page + styling



### Creating a debugger
Here I will try to create a debugger and implement error handling

- Adding toast notification: `npm install --save react-toastify`


### Setting up identity
- Installing from NuGet Gallery: `Microsoft.AspNetCore.Authentication.JwtBearer` and `Microsoft.AspNetCore.Identity.EntityFrameworkCore`

## API endpoints

### Account
| HTTP Verb | Endpoint                    |
| :-------- | :-------------------------- |
| POST      | `/api/Account/login`        |
| POST      | `/api/Account/register`     |
| GET       | `/api/Account/currentUser`  |
| GET       | `/api/Account/savedAddress` |

### Basket
| HTTP Verb | Endpoint      |
| :-------- | :------------ |
| GET       | `/api/Basket` |
| POST      | `/api/Basket` |
| DELETE    | `/api/Basket` |

### Buggy
| HTTP Verb | Endpoint                      |
| :-------- | :---------------------------- |
| GET       | `/api/Buggy/not-found`        |
| GET       | `/api/Buggy/bad-request`      |
| GET       | `/api/Buggy/unauthorised`     |
| GET       | `/api/Buggy/validation-error` |
| GET       | `/api/Buggy/server-error`     |

### Orders
| HTTP Verb | Endpoint           |
| :-------- | :----------------- |
| GET       | `/api/Orders`      |
| POST      | `/api/Orders`      |
| GET       | `/api/Orders/{id}` |

### Products
| HTTP Verb | Endpoint                |
| :-------- | :---------------------- |
| GET       | `/api/Products`         |
| GET       | `/api/Products/{id}`    |
| GET       | `/api/Products/filters` |

### Payments
| HTTP Verb | Endpoint        |
| :-------- | :-------------- |
| GET       | `/api/Payments` |

## Payments submit and testing
Test cards: https://stripe.com/docs/testing#cards
`stripe listen -f http://localhost:5000/api/payments/webhook -e charge.succeeded`

## Setting-up user secrets
Using secret manager from dotnet
`dotnet user-secrets init`
`dotnet user-secrets set "StripeSettings:PublishableKey" "SectetCodeHERE"`

## Setting up docker
### creating the DB
`docker run --name dev -e POSTGRES_USER=EnterAUsernameHERE -e POSTGRES_PASSWORD=EnterAPAsswordHere -p 5432:5432 -d postgres:latest`

### building docker image
`docker build -t DockerUsernameHere/fs13-fullstack .`

### running docker image
`docker run --rm -it -p 8080:80 DockerUsernameHere/fs13-fullstack`

### pushing docker changes
`docker push DockerUsernameHere/fs13-fullstack:latest`