using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Wappies.Models
{
    public class Location
    {
        [DataType(DataType.DateTime)]
        DateTime DateTime;

        String Longitude;

        String Latitude;
    }
}
