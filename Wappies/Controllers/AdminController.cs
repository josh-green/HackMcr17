using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Wappies.Context;
using Wappies.Models;
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
            var result = new List<GeoJson>();
            List<Report> reports = _context.Reports
                .Include(r=>r.Locations)
                .Where(r => 
                    r.Completed != true 
                    && r.Locations != null
                    && r.Locations.Any(l => l != null))
                .ToList();

            foreach (Report rep in reports) {
                Location location = rep.Locations.OrderByDescending(l => l.DateTime).FirstOrDefault();
                if (location == null)
                    continue;
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
                .FirstOrDefault(r => 
                    r.ID == reportID 
                    && r.Locations != null
                    && r.Locations.Any(l => l != null));

            foreach (Location location in report.Locations)
            {
                if (location == null)
                    continue;
                GeoJson geo = new GeoJson(location.Latitude, location.Longitude, location.DateTime.ToLongDateString(), location.ReportID);
                result.Add(geo);
            }
            return Json(result);
        }

        [HttpPost("[action]")]
        public async Task<JsonResult> SetCompleted(int reportID) {
            Report report = _context.Reports.FirstOrDefault(r => r.ID == reportID) ?? throw new RestException();
            report.Completed = true;
            await _context.SaveChangesAsync();

            Result result = new Result(200, "Success");
            return Json(result);
        }
    }
}