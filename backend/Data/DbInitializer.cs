using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Entities;

namespace backend.Data
{
    public static class DbInitializer
    {
        // This method initializes the database with sample data
        public static void Initialize(StoreContext context)
        {
            // Check if there are any products in the context
            if (context.Products.Any())
                return;

            // Create a list of products
            var products = new List<Product>
            {
                // Add a new product to the list
                new Product
                {
                    Name = "Aalto Football Sphere",
                    Description =
                        "A custom made football ball made in a spherical shape and has Aalto logo.",
                    Price = 2000,
                    PictureUrl = "/images/products/sphere-aalto1.png",
                    Category = "Spheres",
                    Company = "Aalto",
                    QuantityRemains = 100
                },
                new Product
                {
                    Name = "Aalto Basketball Sphere",
                    Description =
                        "A custom made basketball ball made in a spherical shape and has Aalto logo.",
                    Price = 2500,
                    PictureUrl = "/images/products/sphere-aalto2.png",
                    Category = "Spheres",
                    Company = "Aalto",
                    QuantityRemains = 100
                },
                new Product
                {
                    Name = "Ubisoft StoneRock Sphere",
                    Description =
                        "An exclusive ubisoft ball made of rock and textured. Cracks are there because of the number of bugs in my code.",
                    Price = 3000,
                    PictureUrl = "/images/products/sphere-ubisoft1.png",
                    Category = "Spheres",
                    Company = "Ubisoft",
                    QuantityRemains = 100
                },
                new Product
                {
                    Name = "Switch Volleyball Sphere",
                    Description =
                        "I thought of making something unusual with a vollyball and adding nintendo switch logo. Now will will send their team to copyright strike me :P",
                    Price = 2500,
                    PictureUrl = "/images/products/sphere-switch1.png",
                    Category = "Spheres",
                    Company = "Switch",
                    QuantityRemains = 100
                },
                new Product
                {
                    Name = "Steam Wooden Sphere",
                    Description =
                        "You thought steam is just a game hosting company? Think again. They have been undertaking woodcraft for millennials.",
                    Price = 1400,
                    PictureUrl = "/images/products/sphere-steam1.png",
                    Category = "Spheres",
                    Company = "Steam",
                    QuantityRemains = 100
                },
                new Product
                {
                    Name = "Ubisoft White Cone",
                    Description =
                        "Ubisoft has abandoned their Assassin's creed game in order to make an artistic cone shaped structure. This is white and has a ubisoft stamp at the bottom.",
                    Price = 1000,
                    PictureUrl = "/images/products/cone-ubisoft1.png",
                    Category = "Cones",
                    Company = "Ubisoft",
                    QuantityRemains = 100
                },
                new Product
                {
                    Name = "Switch Dark Cone",
                    Description =
                        "In a world were nintendo is dominating the sells of fun platforming game, a dark cone appear. Now it is owned by nintendo.",
                    Price = 7900,
                    PictureUrl = "/images/products/cone-switch1.png",
                    Category = "Cones",
                    Company = "Switch",
                    QuantityRemains = 100
                },
                new Product
                {
                    Name = "Switch Blue Cone",
                    Description =
                        "You see that blue cone over there? Do not try to replicate the shape. It has been know for ages now that the blue cone is a property of nintendo and there is no way around it.",
                    Price = 16000,
                    PictureUrl = "/images/products/cone-switch2.png",
                    Category = "Cones",
                    Company = "Switch",
                    QuantityRemains = 100
                },
                new Product
                {
                    Name = "Epic Games Gray Cylinder",
                    Description =
                        "Just a random gray cylinder from epic games build in unreal engine. This 3D model has been build to not be used in any game. Just for showcase.",
                    Price = 2400,
                    PictureUrl = "/images/products/cylinder-epic1.png",
                    Category = "Cylinders",
                    Company = "Epic Games",
                    QuantityRemains = 100
                },
                new Product
                {
                    Name = "Epic Games Blue Cylinder",
                    Description =
                        "Epic games invented the art of making cylinderical shape. This blue cylinder has been crafted by a handy man named Adel.",
                    Price = 1500,
                    PictureUrl = "/images/products/cylinder-epic2.png",
                    Category = "Cylinders",
                    Company = "Epic Games",
                    QuantityRemains = 100
                },
                new Product
                {
                    Name = "Switch Wooden Cylinder",
                    Description =
                        "The infamous yet unique wooden cylinder that you may like. It has Switch logo on the side, carved into the wooden structure, forming a nice dent of I do not know what I am talking about.",
                    Price = 1300,
                    PictureUrl = "/images/products/cylinder-switch1.png",
                    Category = "Cylinders",
                    Company = "Switch",
                    QuantityRemains = 100
                },
                new Product
                {
                    Name = "Switch White Cylinder",
                    Description =
                        "Switch yet again made another cylinder but forgot to add colors. Maybe they wanted to put more emphises on their logo. The product may look high quality but you never know. Purchase at your own risk.",
                    Price = 1900,
                    PictureUrl = "/images/products/cylinder-switch2.png",
                    Category = "Cylinders",
                    Company = "Switch",
                    QuantityRemains = 100
                },
                new Product
                {
                    Name = "Xbox Black Cube",
                    Description =
                        "Xbox made this pandora box out of Black ceramic and forgot to put a handle or an openning to the box. Mostly used as aesthetics now.",
                    Price = 4500,
                    PictureUrl = "/images/products/cube-xbox1.png",
                    Category = "Cubes",
                    Company = "Xbox",
                    QuantityRemains = 100
                },
                new Product
                {
                    Name = "Ubisoft Blue Cube",
                    Description =
                        "Ubisoft started making this blue cube back when color was invented. It is a mystery when ubisoft was first cofunded.",
                    Price = 9999,
                    PictureUrl = "/images/products/cube-ubisoft1.png",
                    Category = "Cubes",
                    Company = "Ubisoft",
                    QuantityRemains = 100
                },
                new Product
                {
                    Name = "Ubisoft Wooden Cube",
                    Description =
                        "Ubisoft has made a nice looking wooden cube that is meant to be a treature box. Only people with mana can unlock the secret inside. ",
                    Price = 2250,
                    PictureUrl = "/images/products/cube-ubisoft2.png",
                    Category = "Cubes",
                    Company = "Ubisoft",
                    QuantityRemains = 100
                },
                new Product
                {
                    Name = "Aalto Red Dice Cube",
                    Description =
                        "Aalto dice cube made with a red color is the perfect example of a good tool for magiciens and gambling.",
                    Price = 800,
                    PictureUrl = "/images/products/cube-aalto1.png",
                    Category = "Cubes",
                    Company = "Aalto",
                    QuantityRemains = 100
                },
                new Product
                {
                    Name = "Aalto Green Wooden Cube",
                    Description =
                        "This splendid wooden cube made by aalto has the color green and the letter G engraved on it. Limited Edition",
                    Price = 2399,
                    PictureUrl = "/images/products/cube-aalto2.png",
                    Category = "Cubes",
                    Company = "Aalto",
                    QuantityRemains = 20
                },
            };

            // Add each product in the list to the context

            // AddRange method in C# lists allows for adding a whole collection of components at once
            context.Products.AddRange(products);

            // foreach (var product in products)
            // {
            //     context.Products.Add(product);
            // }

            context.SaveChanges();
        }
    }
}
