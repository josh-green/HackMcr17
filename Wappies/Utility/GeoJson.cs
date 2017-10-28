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

        public GeoJson(string Lat, string Long, string Msg) {
            Latitude = Lat;
            Longitude = Long;
            Message = Msg;
        }
    }
}
