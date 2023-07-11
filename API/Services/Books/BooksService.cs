using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DataBase.Entities;
using API.DTOs;
using API.Repositories.Books;

namespace API.Services.Books
{
    public class BooksService : IBooksService
    {
        private readonly IBooksRepository _booksRepository;
        public BooksService(IBooksRepository booksRepository)
        {
            _booksRepository=booksRepository;
        }

        public async Task<List<Genre>> GetAllGenres()
        {
             try
            {
                return await _booksRepository.GetAllGenres();
            }
            catch (System.Exception)
            {
                
                throw new Exception("No books");
            }
        }
        public async Task<Genre> GetGenreById(int id){
            try
            {
                return await _booksRepository.GetGenreById(id);
            }
            catch (System.Exception)
            {
                
                throw new Exception("No id");
            }
        }
        public async Task<List<Book>> GetAllBooks()
        {
             try
            {
                return await _booksRepository.GetAllBooks();
            }
            catch (System.Exception)
            {
                
                throw new Exception("No books");
            }
        }
        public async Task<List<Book>> GetBooksByPublishingDate()
        {
             try
            {
                return await _booksRepository.GetBooksByPublishingDate();
            }
            catch (System.Exception)
            {
                
                throw new Exception("No books");
            }
        }
        public async Task<List<Book>> GetBestSellerBooks()
        {
             try
            {
                return await _booksRepository.GetBestSellerBooks();
            }
            catch (System.Exception)
            {
                
                throw new Exception("No books");
            }
        }

        public async Task<Book> GetBookById(int id){
            try
            {
                return await _booksRepository.GetBookById(id);
            }
            catch (System.Exception)
            {
                
                throw new Exception("No id");
            }
        }
        
        public void AddBook(BookDto book)
        {
            _booksRepository.AddBook(book);
        }

        public void EditBook(int bookId, BookDto book){
          _booksRepository.EditBook(bookId,book);
        }

        public void RemoveBook(Book book)
        {
           _booksRepository.RemoveBook(book);
        }


    }
}