using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Entities;

namespace backend.Extensions
{
    public static class ProductExtensions
    {
        public static IQueryable<Product> Sort(this IQueryable<Product> query, string orderBy)
        {
            if (string.IsNullOrWhiteSpace(orderBy))
                return query.OrderBy(p => p.Name);

            query = orderBy switch
            {
                "priceAsc" => query.OrderBy(p => p.Price), // add this case for ascending price
                "priceDesc" => query.OrderByDescending(p => p.Price),
                "nameAsc" => query.OrderBy(n => n.Name), // add this case for ascending name
                "nameDesc" => query.OrderByDescending(n => n.Name), // add this case for descending name
                _ => query.OrderBy(n => n.Name) // change the default case to ascending name
            };

            return query;
        }

        public static IQueryable<Product> Search(this IQueryable<Product> query, string searchTerm)
        {
            if (string.IsNullOrEmpty(searchTerm))
                return query;

            var lowerCaseSearchTerm = searchTerm.Trim().ToLower();

            return query.Where(p => p.Name.ToLower().Contains(lowerCaseSearchTerm));
        }

        public static IQueryable<Product> Filter(
            this IQueryable<Product> query,
            string company,
            string category
        )
        {
            var companyList = new List<string>();
            var categoryList = new List<string>();

            if (!string.IsNullOrEmpty(company))
                companyList.AddRange(company.ToLower().Split(",").ToList());

            if (!string.IsNullOrEmpty(category))
                categoryList.AddRange(category.ToLower().Split(",").ToList());

            query = query.Where(
                p => companyList.Count == 0 || companyList.Contains(p.Company.ToLower())
            );

            query = query.Where(
                p => categoryList.Count == 0 || categoryList.Contains(p.Category.ToLower())
            );

            return query;
        }
    }
}
