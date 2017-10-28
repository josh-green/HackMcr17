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
using Wappies.Utility;

namespace Wappies.Controllers
{
    [Produces("application/json")]
    [Route("api/Admin")]
    public class AdminController : Controller
    {
        public JsonResult ActiveReports() {
            using (DatabaseContext db = new DatabaseContext()) {
                List<GeoJson> Result = new List<GeoJson>;
                List<Report> Reports = db.Reports.Where(r => r.Completed != true).ToList();

                foreach (Report rep in Reports) {
                    Location location = rep.LocationList.OrderByDescending(l => l.DateTime).SingleOrDefault();
                    GeoJson geo = new GeoJson(location.Latitude, location.Longitude, location.DateTime.ToLongDateString());
                    Result.Add(geo);
                }
                return Json(JsonConvert.SerializeObject(Result));
            }
        }

        public JsonResult SetCompleted(int ReportID) {
            using (DatabaseContext db = new DatabaseContext()) {
                Report report = db.Reports.Where(r => r.ID == ReportID).SingleOrDefault() ?? throw new RestException();
                report.Completed = true;
                db.SaveChangesAsync();
            }

            Result result = new Result(200, "Success");
            return Json(JsonConvert.SerializeObject(result));
        }
    }
}