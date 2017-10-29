using System;
using System.ComponentModel.DataAnnotations;

namespace Wappies.Models
{
    public class Administrator
    {
        public int ID { get; set; }

        [DataType(DataType.EmailAddress)]
        public String Username;

        [DataType(DataType.Password)]
        public String Password;

        public String Name;

        [DataType(DataType.DateTime)]
        public DateTime LastLogin;
    }
}
