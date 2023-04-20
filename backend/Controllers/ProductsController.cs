using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Data;
using backend.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Text.Json;
using backend.Extensions;
using backend.RequestHelpers;

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

        [HttpGet]
        public async Task<ActionResult<PagedList<Product>>> GetProducts(
            [FromQuery] ProductParams productParams
        )
        {
            // Construct a query to retrieve products from the database
            var query = _context.Products
                .Sort(productParams.OrderBy) // Sort the products based on the specified order
                .Search(productParams.SearchTerm) // Search for products based on the specified search term
                .Filter(productParams.Brands, productParams.Types) // Filter products based on the specified brands and types
                .AsQueryable();

            // Create a paginated list of products using the constructed query
            var products = await PagedList<Product>.ToPagedList(
                query,
                productParams.PageNumber,
                productParams.PageSize
            );

            // Add pagination information to the response headers
            Response.AddPaginationHeader(products.MetaData);

            // Return the paginated list of products as the result of the action method
            return products;
        }

        // GET api/products

        // initial approuch:
        // [HttpGet]
        // // GetProducts method returns a list of all products in the database
        // // Async
        // public async Task<ActionResult<List<Product>>> GetProducts()
        // {
        //     // listing all products
        //     var products = await _context.Products.ToListAsync();
        //     // Return a 200 OK HTTP response with the list of products
        //     return Ok(products);
        // }


        [HttpGet("{id}")]
        public async Task<ActionResult<Product>> GetProduct(int id)
        {
            var product = await _context.Products.FindAsync(id);

            if (product == null)
                return NotFound();

            return product;
        }

        [HttpGet("filters")]
        public async Task<IActionResult> GetFilters()
        {
            var brands = await _context.Products.Select(p => p.Company).Distinct().ToListAsync();
            var types = await _context.Products.Select(p => p.Category).Distinct().ToListAsync();

            return Ok(new { brands, types });
        }

        // Initial code:
        // // GET api/products/{id}
        // [HttpGet("{id}")]
        // // GetProduct method returns a single product by its ID
        // public async Task<ActionResult<Product>> GetProduct(int id)
        // {
        //     var product = await _context.Products.FindAsync(id);

        //     if (product == null)
        //         return NotFound();

        //     return product;
        // }
    }
}
