using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Data;
using backend.Entities;
using Microsoft.AspNetCore.Mvc;

// This class inherits from ControllerBase
namespace backend.Controllers
{
    // ApiController attribute specifies that this class is an API controller
    [ApiController]
    // Route attribute specifies the URL path for this controller
    [Route("api/[controller]")]
    public class ProductsController : ControllerBase
    {
        // StoreContext object that will be used to access the database - using dependency injection
        private readonly StoreContext context;

        // Constructor that takes in a StoreContext object
        public ProductsController(StoreContext context)
        {
            this.context = context;
        }

        // GET api/products
        [HttpGet]
        // GetProducts method returns a list of all products in the database
        public ActionResult<List<Product>> GetProducts()
        {
            var products = context.Products.ToList();
            return Ok(products);
        }

        // GET api/products/{id}
        [HttpGet("{id}")]
        // GetProduct method returns a single product by its ID
        public ActionResult<Product> GetProduct(int id)
        {
            return context.Products.Find(id);
        }
    }
}
