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

        [HttpGet("[action]")]
        public JsonResult GetMessages(GetMessageObj getMessageObj)
        {
            //Default the number of message returned to 100
            int NumberOfMessages = !getMessageObj.NumberOfMessages.HasValue ? 100 : getMessageObj.NumberOfMessages.Value;

            var messages = _context.Messages;

            if (getMessageObj.ReportID.HasValue) {
                messages.Where(m => m.ReportID == getMessageObj.ReportID.Value);
            }

            List<GetMessageResult> result = messages                
                .Take(NumberOfMessages)
                .Select(m => new GetMessageResult()
                {
                    ReportID = m.ReportID,
                    MessageText = m.Text,
                    DateTime = m.DateTime
                })
                .OrderByDescending(m => m.DateTime)
                .ToList();

            return Json(result);
        }

        public class GetMessageObj {
            public int? ReportID;
            public int? NumberOfMessages;
        }

        public class GetMessageResult {
            public int ReportID;
            public string MessageText;
            public DateTime DateTime;
        }
    }
}