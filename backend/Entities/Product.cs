using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Entities
{
    public class Product
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public long Price { get; set; }
        public string PictureUrl  { get; set; }
        public string Category { get; set; }
        public string Company  { get; set; }
        public int QuantityRemains { get; set; }

    }
}