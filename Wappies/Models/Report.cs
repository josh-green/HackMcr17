using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Wappies.Models
{
    public class Report
    {
        int ID;

        [DataType(DataType.DateTime)]
        DateTime Created;

        bool Completed;

        User User;

        List<Location> LocationList;
    }
}
