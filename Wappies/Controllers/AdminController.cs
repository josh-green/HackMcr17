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
            List<GeoJson> result = new List<GeoJson>();
            List<Report> reports = _context.Reports
                .Include(r=>r.Locations)
                .Where(r => r.Completed != true && r.Locations != null)
                .ToList();

            foreach (Report rep in reports) {
                Location location = rep.Locations.OrderByDescending(l => l.DateTime).FirstOrDefault();
                GeoJson geo = new GeoJson(location.Latitude, location.Longitude, location.DateTime.ToLongDateString(), location.ReportID);
                result.Add(geo);
            }
            return Json(result);
            
        }

        [HttpGet("[action]/{reportID}")]
        public JsonResult ReportLocations(int reportID)
        {
            List<GeoJson> result = new List<GeoJson>();
            Report report = _context.Reports
                .Include(r => r.Locations)
                .Where(r => r.ID == reportID && r.Locations != null)
                .FirstOrDefault();

            foreach (Location location in report.Locations)
            {
                GeoJson geo = new GeoJson(location.Latitude, location.Longitude, location.DateTime.ToLongDateString(), location.ReportID);
                result.Add(geo);
            }
            return Json(result);
        }

        [HttpPost("[action]")]
        public JsonResult SetCompleted(int ReportID) {
            Report report = _context.Reports.Where(r => r.ID == ReportID).FirstOrDefault() ?? throw new RestException();
            report.Completed = true;
            _context.SaveChangesAsync();

            Result result = new Result(200, "Success");
            return Json(result);
        }
    }
}