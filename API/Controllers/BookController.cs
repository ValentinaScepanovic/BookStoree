using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DataBase.Entities;
using API.DTOs;
using API.Services.Books;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class BookController : BaseAPIController
    {
         private readonly IBooksService _booksService;
        public BookController(IBooksService booksService)
        {
            _booksService=booksService;
        }

        [HttpGet ("allGenres")]
        public async Task<ActionResult<List<GenreDto>>> GetAllGenres (){
             try
             {
                var result= await _booksService.GetAllGenres();
                return Ok(result);
             }
             catch (System.Exception ex)
             {
                return BadRequest(ex.Message);
             }
        }

        [HttpGet ("getGenre/{GenreId}")]
         public async Task<IActionResult> GetGenre(int GenreId)
          {
             var genre = await _booksService.GetGenreById(GenreId);

              if (genre == null)
                   return NotFound();

            return Ok(genre);
          }


        [HttpGet ("allBooks")]
        public async Task<ActionResult<List<BookDto>>> GetAllBooks (){
             try
             {
                var result= await _booksService.GetAllBooks();
                return Ok(result);
             }
             catch (System.Exception ex)
             {
                return BadRequest(ex.Message);
             }
        }

      [HttpGet ("getBooksByPublishingDate")]
      public async Task<ActionResult<List<BookDto>>> GetBooksByPublishingDate (){
             try
             {
                var result= await _booksService.GetBooksByPublishingDate();
                return Ok(result);
             }
             catch (System.Exception ex)
             {
                return BadRequest(ex.Message);
             }
        }

      [HttpGet ("getBestSellerBooks")]
        public async Task<ActionResult<List<BookDto>>> GetBestSellerBooks(){
             try
             {
                var result= await _booksService.GetBestSellerBooks();
                return Ok(result);
             }
             catch (System.Exception ex)
             {
                return BadRequest(ex.Message);
             }
        }

    [HttpPost ("addNewBook")]
    public async Task<IActionResult> AddNewBook([FromBody] BookDto book)
    {
      if (!ModelState.IsValid)
        return BadRequest(ModelState);

      _booksService.AddBook(book);

      return Ok(book);
    }

    [HttpPut("editBook/{BookId}")]
     public async Task<IActionResult> EditBook(int BookId,[FromBody] BookDto editBook)
    {
      var book = await _booksService.GetBookById(BookId);

      if (book == null)
        return NotFound();

      _booksService.EditBook(BookId,editBook);

      return Ok(BookId);
    }

    [HttpGet ("getBook/{BookId}")]
    public async Task<IActionResult> GetBook(int BookId)
    {
      var book = await _booksService.GetBookById(BookId);

      if (book == null)
        return NotFound();

      return Ok(book);
    }


    [HttpDelete ("deleteBook/{BookId}")]
     public async Task<IActionResult> DeleteBook(int BookId)
    {
      var book = await _booksService.GetBookById(BookId);

      if (book == null)
        return NotFound();

      _booksService.RemoveBook(book);

      return Ok(BookId);
    }
        
    }
}