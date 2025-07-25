export interface Book {
  bookId?: number;
  bookName: string;
  author: string;
  genre: string;
  ISBN: string;
  yearPublished: number;
  availableCopies: number;
  bookImage?: string;
}
