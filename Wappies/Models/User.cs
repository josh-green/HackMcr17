using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Wappies.Models
{
    public class User
    {
        private int ID;

        [DataType(DataType.PhoneNumber)]
        private String PhoneNumber;
    }
}
