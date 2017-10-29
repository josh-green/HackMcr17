using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Rest;
using Wappies.Context;
using Wappies.Models;
using Wappies.Utility;
using Newtonsoft.Json;

namespace Wappies.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    public class ClientController : Controller
    {
        private readonly DatabaseContext _context;

        public ClientController(DatabaseContext context)
        {
            _context = context;
        }

        [HttpGet("[action]")]
        public JsonResult InitialiseReport()
        {
            Report report = new Report();
            report.Created = DateTime.Now;
            _context.Reports.Add(report);
            _context.SaveChanges();

            ReportResult result = new ReportResult(200, "Success", report.ID);
            return Json(result);
        }

        [HttpPost("[action]")]
        public JsonResult UpdateReport([FromBody]ReportObj reportObj)
        {
            var report = _context.Reports.FirstOrDefault(r => r.ID == reportObj.ReportID);

            if (report == null)
            {
                report = new Report();
                _context.Reports.Add(report);
                _context.SaveChanges();
            }

            report.Updated = DateTime.Now;

            Location location = new Location
            {
                ReportID = report.ID,
                Longitude = reportObj.Longitude,
                Latitude = reportObj.Latitude,
                DateTime = DateTime.Now
            };

            _context.Locations.Add(location);
            _context.SaveChanges();

            var result = new ReportResult(200, "Success", report.ID);
            
            return Json(result);
        }
        
        [HttpPost("[action]")]
        public JsonResult CompleteReport(int reportID)
        {
            Report report = _context.Reports.FirstOrDefault(r => r.ID == reportID) ?? throw new RestException();
            report.Completed = true;
            _context.SaveChangesAsync();

            Result result = new Result(200, "Success");
            return Json(result);
        }

        [HttpPost("[action]")]
        public JsonResult CreateMessage(MessageObj messageObj)
        {
            Message message = new Message();
            message.ReportID = messageObj.ReportID;
            message.Text = messageObj.MessageText;
            message.DateTime = DateTime.Now;
            _context.Messages.Add(message);
            _context.SaveChanges();

            ReportResult result = new ReportResult(200, "Success", message.ReportID);
            return Json(result);
        }

        public class ReportResult {
            public int Code;
            public String Message;
            public int ReportID;

            public ReportResult(int ResultCode, String ResultMessage, int? ID) {
                Code = ResultCode;
                Message = ResultMessage;
                ReportID = ID ?? 0;
            }
        }

        public class MessageResult {
            public string MessageText;
            public DateTime DateTime;
        }

        public class ReportObj
        {
            public string Longitude;
            public string Latitude;
            public int ReportID;
        }

        public class MessageObj {
            public int ReportID;
            public string MessageText;
        }
    }
}