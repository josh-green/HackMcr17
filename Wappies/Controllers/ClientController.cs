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
        public JsonResult CreateReport(string PhoneNumber, string Longitude, string Latitude) {
            Report report = new Report();
            Location location = new Location();
            ReportResult result;
            User user = UserUtility.CreateUser(PhoneNumber);

            using (DatabaseContext db = new DatabaseContext()) {
                report.Created = DateTime.Now;
                report.User = user;
                report.UserID = user.ID;
                db.Reports.Add(report);
                db.SaveChanges();

                location.ReportID = report.ID;
                location.Longitude = Longitude;
                location.Latitude = Latitude;
                db.Locations.Add(location);
                db.SaveChanges();

                result = new ReportResult(200, "Success", report.ID);
            }
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