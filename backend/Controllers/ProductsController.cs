using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Data;
using backend.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

// This class inherits from ControllerBase
namespace backend.Controllers
{
    public class ProductsController : BaseApiController
    {
        // Constructor that takes in a StoreContext object --dependency injection
        private readonly StoreContext _context;

        public ProductsController(StoreContext context)
        {
            _context = context;
        }

        // GET api/products
        [HttpGet]
        // GetProducts method returns a list of all products in the database
        // Async
        public async Task<ActionResult<List<Product>>> GetProducts()
        {
            var products = await _context.Products.ToListAsync();
            // Return a 200 OK HTTP response with the list of products
            return Ok(products);
        }

        // Synchronous
        // public ActionResult<List<Product>> GetProducts()
        // {
        //     var products = context.Products.ToList();
        //     return Ok(products);
        // }

        // GET api/products/{id}
        [HttpGet("{id}")]
        // GetProduct method returns a single product by its ID
        public async Task<ActionResult<Product>> GetProduct(int id)
        {
            return await _context.Products.FindAsync(id);
        }
    }
}
