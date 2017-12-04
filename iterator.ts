namespace IteratorPattern {
  interface Book {              // Aggregate interface
    pages: string[];
    createBookmark(): Bookmark;     // createIterator()
  }

  class GangOfFourBook implements Book {  // ConcreteAggregate
    public pages = ['Page 1', 'Page 2', 'Page 3'];

    createBookmark() {
      return new ColoredBookmark(this);
    }
  }

  interface Bookmark {
    first();
    next();
    isDone(): boolean;
    currentItem();
  }

  class ColoredBookmark implements Bookmark{
    private book: Book;
    private currentPage: number;
    private color: string;

    constructor(book) {
      this.book = book;
      this.currentPage = 0;
      this.color = '#'+(Math.random()*0xFFFFFF<<0).toString(16);  // random color, to distinguish bookmarks
    }

    first() {
      if (!this.isDone()) {
        return this.book.pages[0];
      }
    }

    next() {
      if (!this.isDone()) {
        this.currentPage += 1;  // turn the page
        return this.book.pages[this.currentPage];
      }
    }

    isDone() {
      return this.currentPage > this.book.pages.length - 1;
    }

    currentItem() {
      return this.book.pages[this.currentPage];
    }
  }

  // Client code
  // Two readers reading a single book in parallel

  // A single book
  const book = new GangOfFourBook();

  // Each reader has his own bookmarks
  const firstReaderBookmark = book.createBookmark();
  const secondReaderBookmark = book.createBookmark();

  console.log(firstReaderBookmark.first());         // 'Page 1'
  console.log(firstReaderBookmark.isDone());        // false

  console.log(secondReaderBookmark.first());        // 'Page 1'
  console.log(secondReaderBookmark.isDone());       // false

  console.log(firstReaderBookmark.next());          // 'Page 2'
  console.log(firstReaderBookmark.isDone());        // false

  console.log(firstReaderBookmark.next());          // 'Page 3'
  console.log(firstReaderBookmark.isDone());        // false

  console.log(firstReaderBookmark.next());          // undefined
  console.log(firstReaderBookmark.isDone());        // true

  console.log(firstReaderBookmark.next());          // undefined
  console.log(firstReaderBookmark.isDone());        // true

  console.log(secondReaderBookmark.next());         // 'Page 2'
  console.log(secondReaderBookmark.isDone());       // false

  console.log(secondReaderBookmark.next());         // 'Page 3'
  console.log(secondReaderBookmark.isDone());       // false

  console.log(secondReaderBookmark.currentItem());  // 'Page 3'
  console.log(secondReaderBookmark.isDone());       // false

  console.log(secondReaderBookmark.next());         // undefined
  console.log(secondReaderBookmark.isDone());       // true

  console.log(secondReaderBookmark.next());         // undefined
  console.log(secondReaderBookmark.isDone());       // true
}
