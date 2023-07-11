using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DataBase.Entities
{
    public class Book
    {
        public int BookId { get; set; }

        public string BookName { get; set; }

        public string Author { get; set; }

        public string Description { get; set; }

        public bool IsBestseller { get; set; }

        public float Price { get; set; }

        public int GenreId { get; set; }

        public Genre Genre { get; set; }

        public DateTime PublishingDate { get; set; }
        
        public string? Picture { get; set; }

    }
}