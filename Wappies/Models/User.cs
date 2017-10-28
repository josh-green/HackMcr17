using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Wappies.Models
{
    public class User
    {
        int ID;

        [DataType(DataType.PhoneNumber)]
        String PhoneNumber;
    }
}
