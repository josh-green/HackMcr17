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

        [ForeignKey("Report")]
        public int ReportID;

        [DataType(DataType.DateTime)]
        public DateTime DateTime;

        public String Longitude;

        public String Latitude;
    }
}
