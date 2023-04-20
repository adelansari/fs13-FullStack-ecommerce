using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.RequestHelpers
{
    public class ProductParams : PaginationParams
    {
        public string OrderBy { get; set; }
        public string SearchTerm { get; set; }
        public string Categories { get; set; }
        public string Companies { get; set; }
    }
}