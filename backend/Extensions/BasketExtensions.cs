using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.DTOs;
using backend.Entities;
using Microsoft.EntityFrameworkCore;

namespace backend.Extensions
{
    public static class BasketExtensions
    {
        public static BasketDto MapBasketToDto(this Basket basket)
        {
            return new BasketDto
            {
                Id = basket.Id,
                BuyerId = basket.BuyerId,
                PaymentIntentId = basket.PaymentIntentId,
                ClientSecret = basket.ClientSecret,
                Items = basket.Items
                    .Select(
                        item =>
                            new BasketItemDto
                            {
                                ProductId = item.ProductId,
                                Name = item.Product.Name,
                                Price = item.Product.Price,
                                PictureUrl = item.Product.PictureUrl,
                                Category = item.Product.Category,
                                Company = item.Product.Company,
                                Quantity = item.Quantity
                            }
                    )
                    .ToList()
            };
        }
        public static IQueryable<Basket> RetrieveBasketWithItems(this IQueryable<Basket> query, string buyerId)
        {
            return query
                .Include(i => i.Items)
                .ThenInclude(p => p.Product)
                .Where(basket => basket.BuyerId == buyerId);
        }
    }
}
