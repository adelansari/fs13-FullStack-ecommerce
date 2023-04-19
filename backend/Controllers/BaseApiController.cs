using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    // ApiController attribute specifies that this class is an API controller
    [ApiController]
    // Route attribute specifies the URL path for this controller
    [Route("api/[controller]")]
    public class BaseApiController : ControllerBase
    {
        
    }
}