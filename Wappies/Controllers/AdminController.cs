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
using Microsoft.EntityFrameworkCore;

namespace Wappies.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    public class AdminController : Controller
    {
        private readonly DatabaseContext _context;

        public AdminController(DatabaseContext context)
        {
            _context = context;
        }

        [HttpGet("[action]")]
        public JsonResult ActiveReports() {
            List<GeoJson> Result = new List<GeoJson>();
            List<Report> Reports = _context.Reports.Include(r=>r.Locations).Where(r => r.Completed != true).ToList();

            foreach (Report rep in Reports) {
                Location location = rep.Locations.OrderByDescending(l => l.DateTime).FirstOrDefault();
                GeoJson geo = new GeoJson(location.Latitude, location.Longitude, location.DateTime.ToLongDateString());
                Result.Add(geo);
            }
            return Json(JsonConvert.SerializeObject(Result));
            
        }

        [HttpGet("[action]")]
        public JsonResult ReportLocations(int ReportID)
        {
            List<GeoJson> Result = new List<GeoJson>();
            Report Report = _context.Reports.Include(r => r.Locations).Where(r => r.ID == ReportID).FirstOrDefault();

            foreach (Location location in Report.Locations)
            {
                GeoJson geo = new GeoJson(location.Latitude, location.Longitude, location.DateTime.ToLongDateString());
                Result.Add(geo);
            }
            return Json(JsonConvert.SerializeObject(Result));
        }

        [HttpPost("[action]")]
        public JsonResult SetCompleted(int ReportID) {
            Report report = _context.Reports.Where(r => r.ID == ReportID).FirstOrDefault() ?? throw new RestException();
            report.Completed = true;
            _context.SaveChangesAsync();

            Result result = new Result(200, "Success");
            return Json(JsonConvert.SerializeObject(result));
        }
    }
}