using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Wappies.Context;

namespace Wappies.Models
{
    public class SeedData
    {
        public static void Initialize(IServiceProvider serviceProvider)
        {
            using (var context = new DatabaseContext(serviceProvider.GetRequiredService<DbContextOptions<DatabaseContext>>()))
            {
                if (!context.Administrators.Any())
                {
                    context.Administrators.Add(new Administrator
                    {
                        Username = "Wappy",
                        Password = "1BlueTree",
                        Name = "Mr Wapperson",
                        LastLogin = DateTime.Now.AddDays(-1)
                    });
                }
                
                context.SaveChanges();

                if (!context.Reports.Any())
                {
                    for (int i = 0; i < 10; i++) {
                        context.Reports.Add(new Report
                        {
                            Created = DateTime.Now.AddDays(-1),
                            Completed = false
                        });
                    
                        context.SaveChanges();

                        int id = context.Reports.Last().ID;

                        if (!context.Locations.Any(l => l.ReportID == id))
                        {
                            for (int j = 0; j < 10; j++)
                            {
                                context.Locations.Add(new Location
                                {
                                    ReportID = id,
                                    DateTime = DateTime.Now.AddDays(-1).AddMinutes(-j),
                                    Longitude = (-2.23 + (j * Math.Sin(j*Math.Pow(j, -j)))).ToString(),
                                    Latitude = (53.46  + (j * Math.Cos(j*Math.Pow(j, j)))).ToString()
                                });
                            }
                        }
                        context.SaveChanges();
                    }
                    
                }
                context.SaveChanges();
            }
        }
    }
}
