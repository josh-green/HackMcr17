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
                // Clear out old test data
                context.Administrators.RemoveRange(context.Administrators);
                context.Reports.RemoveRange(context.Reports);
                context.Locations.RemoveRange(context.Locations);
                context.SaveChanges();

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
                    Random random = new Random();
                    double latitude;
                    double longitude;
                    for (int i = 0; i < 10; i++) {
                        latitude = 51.46 + (random.NextDouble() * 4);
                        longitude = -4.23 + (random.NextDouble() * 4);
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
                                    Longitude = longitude.ToString(),
                                    Latitude = latitude.ToString()
                                });
                                latitude += random.NextDouble() - 0.5;
                                longitude += random.NextDouble() - 0.5;
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
