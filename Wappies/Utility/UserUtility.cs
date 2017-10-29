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
        private readonly DatabaseContext _context;

        public UserUtility(DatabaseContext context)
        {
            _context = context;
        }

        public User CreateUser(string Phone) {
            User user;
            try
            {
                user = _context.Users.Where(u => u.PhoneNumber == Phone).Single();
            }
            catch (System.InvalidOperationException) {
                user = new User();
                user.PhoneNumber = Phone;
                _context.Users.Add(user);
                _context.SaveChanges();
            }
            return user;
        }
    }
}
