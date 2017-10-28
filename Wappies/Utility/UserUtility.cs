using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Wappies.Models;
using Wappies.Context;

namespace Wappies.Utility
{
    public class UserUtility
    {
        public static User CreateUser(string Phone) {
            User user;
            using (DatabaseContext db = new DatabaseContext()) {
                try
                {
                    user = db.Users.Where(u => u.PhoneNumber == Phone).Single();
                }
                catch (System.InvalidOperationException) {
                    user = new User();
                    user.PhoneNumber = Phone;
                    db.Users.Add(user);
                    db.SaveChanges();
                }
            }
            return user;
        }
    }
}
