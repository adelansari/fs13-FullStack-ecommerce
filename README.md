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
- Creating a solution file in the directory: `otnet new sln`
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
 - Creating backend controller


## Running application

### during development
`dotnet watch --no-hot-reload`

