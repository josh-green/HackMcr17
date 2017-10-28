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
        public int ID;

        [DataType(DataType.EmailAddress)]
        public String Username;

        [DataType(DataType.Password)]
        public String Password;

        public String Name;

        [DataType(DataType.DateTime)]
        public DateTime LastLogin;
    }
}
