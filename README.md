# Fullstack Project

![TypeScript](https://img.shields.io/badge/TypeScript-v.4-green)
![SASS](https://img.shields.io/badge/SASS-v.4-hotpink)
![React](https://img.shields.io/badge/React-v.18-blue)
![Redux toolkit](https://img.shields.io/badge/Redux-v.1.9-brown)
![.NET Core](https://img.shields.io/badge/.NET%20Core-v.7-purple)
![EF Core](https://img.shields.io/badge/EF%20Core-v.7-cyan)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-v.14-drakblue)

* Frontend: SASS, TypeScript, React, Redux Toolkit
* Backend: ASP .NET Core, Entity Framework Core, PostgreSQL

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

