using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Data;
using backend.DTOs;
using backend.Entities.OrderAggregate;
using backend.Extensions;
using backend.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Stripe;

namespace backend.Controllers
{
    public class PaymentsController : BaseApiController
    {
        private readonly PaymentService _paymentService;
        private readonly StoreContext _context;
        private readonly IConfiguration _config;
        public PaymentsController(
            PaymentService paymentService,
            StoreContext context,
            IConfiguration config
        )
        {
            _config = config;
            _context = context;
            _paymentService = paymentService;
        }

        [Authorize]
        [HttpPost]
        public async Task<ActionResult<BasketDto>> CreateOrUpdatePaymentIntent()
        {
            // This retrieves the basket for the current user from the database
            var basket = await _context.Baskets
                .RetrieveBasketWithItems(User.Identity.Name)
                .FirstOrDefaultAsync();

            // This checks if the basket exists and returns a not found error if not
            if (basket == null)
                return NotFound();

            // This calls the payment service to create or update a payment intent for the basket
            var intent = await _paymentService.CreateOrUpdatePaymentIntent(basket);

            // This checks if the intent was created successfully and returns a bad request error if not
            if (intent == null)
                return BadRequest(new ProblemDetails { Title = "Problem creating payment intent" });

            // This updates the basket with the payment intent id and client secret if they are not already set
            basket.PaymentIntentId = basket.PaymentIntentId ?? intent.Id;
            basket.ClientSecret = basket.ClientSecret ?? intent.ClientSecret;

            // This saves the changes to the database
            _context.Update(basket);

            var result = await _context.SaveChangesAsync() > 0;

            // This checks if the save was successful and returns a bad request error if not
            if (!result)
                return BadRequest(
                    new ProblemDetails { Title = "Problem updating basket with intent" }
                );

            // This returns the basket as a data transfer object
            return basket.MapBasketToDto();
        }

        
    }
}
