using System;
using System.ComponentModel.DataAnnotations;

namespace Wappies.Models
{
    public class Administrator
    {
        public int ID { get; set; }

        [DataType(DataType.EmailAddress)]
        public String Username { get; set; }

        [DataType(DataType.Password)]
        public String Password { get; set; }

        public String Name { get; set; }

        [DataType(DataType.DateTime)]
        public DateTime LastLogin { get; set; }
    }
}
