using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DataBase.Entities;
using API.DTOs;

namespace API.Services.Books
{
    public interface IBooksService
    {
        Task<List<Genre>>GetAllGenres();
        Task<Genre> GetGenreById(int id);
        Task<List<Book>> GetAllBooks ();
        Task<List<Book>> GetBooksByPublishingDate();
        Task<List<Book>> GetBestSellerBooks();
        Task<Book> GetBookById(int id);
        void AddBook(BookDto book);
        void EditBook(int bookId, BookDto book);
        void RemoveBook(Book book);
    }
}