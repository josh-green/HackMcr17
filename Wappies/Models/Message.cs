using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Wappies.Models
{
    public class Message
    {
        public int ID { get; set; }
        public int ReportID { get; set; }
        public Report Report { get; set; }
        public string Text { get; set; }

        [DataType(DataType.DateTime)]
        public DateTime DateTime { get; set; }
    }
}
