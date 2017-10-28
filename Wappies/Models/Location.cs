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
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        int ID;

        [ForeignKey("Report")]
        int ReportID;

        [DataType(DataType.DateTime)]
        DateTime DateTime;

        String Longitude;

        String Latitude;
    }
}
