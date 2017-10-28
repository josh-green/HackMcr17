using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Wappies.Models
{
    public class Report
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        int ID;

        [DataType(DataType.DateTime)]
        DateTime Created;

        bool Completed;

        [ForeignKey("User")]
        int UserID;

        User User;

        List<Location> LocationList;
    }
}
