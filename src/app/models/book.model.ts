/**
 * Describes the Asset as it is returned by the API and stored in the session storage.
 */
export interface BooksModel {
  books: Book[];
}

export interface Book {
  isbn: string;
  title: string;
  subtitle: string;
  author: string;
  published: string;
  publisher: string;
  pages: number;
  categories: string [];
  description: string;
  website: string;
}
