using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DataBase.Entities;
using Microsoft.EntityFrameworkCore;

namespace API.DataBase
{
    public class DBContext : DbContext
    {
        public DBContext(DbContextOptions<DBContext> options):base(options)
        {
            
        }
        public DbSet<User> Users { get; set; }  
        public DbSet<Book> Books {get; set;}
        public DbSet<Genre> Genres { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
      {
         base.OnModelCreating(builder);
         
          builder.Entity<User>()
              .HasIndex(u => u.Id)
              .IsUnique();

          builder.Entity<Book>()
              .HasIndex(b => b.BookId)
              .IsUnique();

         builder.Entity<Book>()
                .HasOne(b => b.Genre)
                .WithMany(g => g.Books)
                .HasForeignKey(b => b.GenreId);
      }
    }
    
}