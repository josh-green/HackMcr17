using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Wappies.Models
{
    public class User
    {
        public int ID { get; set; }

        [DataType(DataType.PhoneNumber)]
        public String PhoneNumber { get; set; }
    }
}
