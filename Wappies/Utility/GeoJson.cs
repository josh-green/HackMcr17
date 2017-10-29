using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Wappies.Utility
{
    public class GeoJson
    {
        public string Latitude;
        public string Longitude;
        public string Message;
        public int ReportID;

        public GeoJson(string Lat, string Long, string Msg, int reportID) {
            Latitude = Lat;
            Longitude = Long;
            Message = Msg;
            ReportID = reportID;
        }
    }
}
