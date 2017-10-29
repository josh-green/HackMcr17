using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Wappies.Models
{
    public class Location
    {
        public int ID { get; set; }
        
        public int ReportID { get; set; }

        public Report Report { get; set; }

        [DataType(DataType.DateTime)]
        public DateTime DateTime { get; set; }

        public String Longitude { get; set; }

        public String Latitude { get; set; }
    }
}
