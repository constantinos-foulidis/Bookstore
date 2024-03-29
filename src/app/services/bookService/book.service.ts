import { Injectable } from '@angular/core';
import { from, Observable, of, Subject} from 'rxjs';
import { Book } from '../../models/book.model';
import { HttpClient } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import {MapService} from '../mapService/map.service';


@Injectable({
  providedIn: 'root'
})
export class BookService {
  books: Book[] = [];
  search = new Subject<Book[]>()  ;
  constructor(private http: HttpClient, private mapService: MapService) { }
  /**
   * Handle Http request
   * Return all Books.
   * @param url - address of api you want to call
   */
  getBooks(url: string): Observable<Book[]> {
    return this.http.get<any>('http://localhost:3000/books')
      .pipe(
        map(data => {
          this.books = data;
          this.search?.next(this.books );
          return data;
        }),
        catchError(this.handleError<Book[]>('getBooks', [] ))
      );
  }
  /**
   *
   * Return all Books that contains pages lower than this number
   * @param nPage - number of pages
   */
  getSearchedBooksByPages(nPage: number): void  {
    if (this.books.length > 0){
      const temp = this.books.filter(books => books.pages > nPage);
      this.search?.next(temp);
    }
  }
  /**
   *
   * Return all Books that much with ISBN.
   * @param isbn - unique key to filter books by ISBN
   */
  getSearchedBooksByISBN(isbn: string): void  {
    if (this.books.length > 0){
      const temp = this.books.filter(books => books.isbn.includes(isbn));
      this.search?.next(temp);
    }
  }
  /**
   *
   * Return all Books that much with same Category.
   * @param categoryName - name of category you want to search with
   */
  getSearchedBooksByCategory(categoryName: string): void  {
    if (this.books.length > 0){
      const temp = this.books.filter(books => {
        return (books.categories as string []).find(category => category.toLowerCase().includes(categoryName.toLowerCase()));
       });
      this.search?.next(temp);
    }
  }
  /**
   *
   * Return all Books that match with specific year.
   * @param year - date
   */
  getSearchedBooksByYear(year: string): void  {
    if (this.books.length > 0){
      const temp = this.books.filter(books => {
        return  new Date(books.published).getFullYear().toString().includes(year);
      });
      this.search?.next(temp);
    }
  }
  /**
   * Handle Http request
   * Return all Books except id avoid duplicate.
   * @param url - address of api you want to call
   * @param key - string that can be either author|publisher|title
   */
  getSearchedBooks(url: string, key: string): void  {
    if (this.books.length > 0){
      const temp = this.books.filter(books => (books.title.toLowerCase().includes(key.toLowerCase())
          || books.author.toLowerCase().includes(key.toLowerCase())
          || books.publisher.toLowerCase().includes(key.toLowerCase())) );
      this.search?.next(temp);
    }
  }
  /**
   * Handle Http request
   * Return all Books except id avoid duplicate.
   * @param url - address of api you want to call
   * @param id - unique key to filter data
   */
  getSuggestionBooks(url: string, id: string): Observable<Book[]>  {
    if (this.books.length > 0){
       return from([this.books.filter(books => Number(books.isbn) !== Number(id))]);
    }else {
      return this.http.get<any>('./assets/dummyData/data.json')
        .pipe(
          map(data => {
            return data.books;
          }),
          catchError(this.handleError<Book[]>('getBooks', []))
        );
    }
  }
  /**
   * Handle Http request
   * add new Book on db
   * @param data - new book
   */
  addNewBook(data: Book): Observable<any>{
    const form = this.mapService.mapBooks(data);

    return this.http.post('http://localhost:3000/books', form).pipe(
      catchError(this.handleError('addBook', data))
   );
  }
  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  // tslint:disable-next-line:typedef
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.error(error); // log to console instead
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
