using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Wappies.Context;
using Wappies.Models;
using Newtonsoft.Json;
using Microsoft.Rest;

namespace Wappies.Controllers
{
    [Produces("application/json")]
    [Route("api/Admin")]
    public class AdminController : Controller
    {
        public JsonResult ActiveReports() {
            using (DatabaseContext db = new DatabaseContext()) {
                List<Report> Reports = db.Reports.Where(r => r.Completed != true).ToList();
                return Json(Reports);
            }
        }

        public JsonResult SetCompleted(int ReportID) {
            using (DatabaseContext db = new DatabaseContext()) {
                Report report = db.Reports.Where(r => r.ID == ReportID).SingleOrDefault() ?? throw new RestException();
                report.Completed = true;
                db.SaveChangesAsync();
            }
            return new JsonResult(new {
                status = 200,
                message = "success"
            });
        }
    }
}