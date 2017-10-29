using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Wappies.Context;
using Wappies.Models;
using Wappies.Utility;
using Newtonsoft.Json;

namespace Wappies.Controllers
{
    [Produces("application/json")]
    [Route("api/Client")]
    public class ClientController : Controller
    {
        private readonly DatabaseContext _context;

        public ClientController(DatabaseContext context)
        {
            _context = context;
        }

        public JsonResult CreateReport(string PhoneNumber, string Longitude, string Latitude) {
            Report report = new Report();
            Location location = new Location();
            ReportResult result;
            
            report.Created = DateTime.Now;
            _context.Reports.Add(report);

            location.ReportID = report.ID;
            location.Longitude = Longitude;
            location.Latitude = Latitude;
            _context.Locations.Add(location);

            _context.SaveChanges();

            result = new ReportResult(200, "Success", report.ID);
            
            return Json(JsonConvert.SerializeObject(result));
        }

        public class ReportResult {
            public int Code;
            public String Message;
            public int ReportID;

            public ReportResult(int ResultCode, String ResultMessage, int? ID) {
                Code = ResultCode;
                Message = ResultMessage;
                ReportID = (ID.HasValue) ? 0 : ID.Value;
            }
        }
    }
}