using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Wappies.Models
{
    public class Administrator
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        int ID;

        [DataType(DataType.EmailAddress)]
        String Username;

        [DataType(DataType.Password)]
        String Password;

        String Name;

        [DataType(DataType.DateTime)]
        DateTime LastLogin;
    }
}
