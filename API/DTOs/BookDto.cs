using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs
{
    public class BookDto
    {
        public string BookName { get; set; }

        public string Author { get; set; }

        public float Price { get; set; }

        public int GenreId { get; set; }

        public string Description {get; set;}

        public bool IsBestseller {get; set;}

        public DateTime PublishingDate { get; set; }

        public string? Picture {get; set;}
    }
}