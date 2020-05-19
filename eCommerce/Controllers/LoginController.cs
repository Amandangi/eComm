using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using eCommerce.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Session;


namespace eCommerce.Controllers
{
    public class LoginController : Controller
    {
         [BindProperty]
        public string Username { get; set;  }

        [BindProperty]
        public string Password{ get; set; }


        public IActionResult Index()
        {
            return View();
        }
        [HttpGet]
        public ActionResult Login()
        {
            HttpContext.Session.Clear();

            //HttpContext.Session["username"] = null;
            return View();
        }
        [HttpPost]
        public ActionResult Login(Login login)
        {
            return View();
        }
    }
}