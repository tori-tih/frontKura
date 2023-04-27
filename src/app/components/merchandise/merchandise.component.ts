import { Component, Input, SimpleChanges } from '@angular/core';
import { Subscription } from 'rxjs';
import { Book } from 'src/app/interfaces/Book';
import { Bookstore } from 'src/app/interfaces/Bookstore';
import { JointProduct } from 'src/app/interfaces/JointProduct';
import { AuthorService } from 'src/app/services/author.service';
import { BookService } from 'src/app/services/book.service';
import { BookstoreService } from 'src/app/services/bookstore.service';
import { JointProductService } from 'src/app/services/joint-product.service';
import { Author } from 'src/app/interfaces/Author';
import { PricefilterPipe } from 'src/app/pipes/pricefilter.pipe';
import { JProductComponent } from '../modal/j-product/j-product.component';
import { JProductFilterPipe } from 'src/app/pipes/j-product-filter.pipe';

@Component({
  selector: 'app-merchandise',
  templateUrl: './merchandise.component.html',
  styleUrls: ['./merchandise.component.css']
})
export class MerchandiseComponent {
  value: number = 0;
  sub?: Subscription;
  @Input()
  bookstore?: Bookstore;

  error: string = "";
  kategory: number = 1;
  books?: Book[];
  jproductS?: JointProduct[];
  addBook = false;
  addAuthor = false;
  edAuthor = false;
  addJP = false;
  edJp = false;
  edBook = false;
  errDelAut = false;
  selectJp?: JointProduct;
  selectB?: Book;
  author?: Author;
  authors?: Author[];
  authorsSelect?: Author[];
  found = ""
  priceStart: number = 0
  priveEnd: number = 9999

  start = false;
  constructor(private authorService: AuthorService,
    private bookstoreService: BookstoreService,
    private bookService: BookService,
    private jointProductService: JointProductService) {

  }

  ngOnInit() {
    this.emitSelected(3);
    this.sub = this.authorService.getAuthors().subscribe({
      next: data => {
        this.authors = data;
        this.authorsSelect = data;
      },
      error: e => {
        this.error = "e"
      }
    });

    if (this.bookstore) {
      this.sub = this.jointProductService.getJproductByStore(this.bookstore!).subscribe({
        next: data => {
          this.jproductS = data;
          this.founMaxPrice(data);
        },
        error: e => {
          this.error = "e"
        }
      });
      this.sub = this.bookService.getBookByStore(this.bookstore!).subscribe({
        next: data => {
          this.books = data;
          this.founMaxPrice(data);
        },
        error: e => {
          this.error = "e"
        }
      });
    }
  }
  founMaxPrice(data: any){
    let e = data.sort((x: { price: number; },y: { price: number; })=> y.price - x.price)[0].price
    if(this.priveEnd<e) this.priveEnd=e
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (this.start) this.ngOnInit(); else this.start = true
  }
  ngOnDestroy() {
    this.sub?.unsubscribe();
  }
  emitSelected(kat: number) {
    console.log(kat);
    this.kategory = kat;
    switch (kat) {
      case (1): {
        if (this.bookstore)
          this.bookService.getBookByStore(this.bookstore).subscribe({
            next: books => {
              this.books = books;
              this.jproductS = undefined;
            },
            error: e => {
              this.error = "e"
            }
          })
      } break;
      case (2): {
        if (this.bookstore)
          this.jointProductService.getJproductByStore(this.bookstore).subscribe({
            next: data => {
              this.jproductS = data;
              this.books = undefined;
            },
            error: e => {
              this.error = "e"
            }
          })
      } break;
      case (3): {
        if (this.bookstore) {
          this.bookService.getBookByStore(this.bookstore).subscribe({
            next: books => {
              this.books = books;
            },
            error: e => {
              this.error = "e"
            }
          })
          this.jointProductService.getJproductByStore(this.bookstore).subscribe({
            next: data => {
              this.jproductS = data;
            },
            error: e => {
              this.error = "e"
            }
          })
        } break;
      }
    }
  }

  closeAuthor(author: Author) {
    if (this.addAuthor) {
      this.authors?.push(author);
      this.addAuthor = false;
    } else {
      this.authors = this.authors?.map(x => x.id === author.id ? author : x);
      this.edAuthor = false;
    }
  }
  editAuthor(author: Author) {
    this.author = author;
    this.edAuthor = true;
    
  }
  deleteAuthor(author: Author) {
    this.sub = this.authorService.deleteAuthor(author.id).subscribe({
      next: data => {
        console.log("del");
        
        this.authors = this.authors?.filter(x => x.id !== author.id);
      },
      error: e => {
        this.error = e
        console.log(e);
        this.errDelAut=true;
      }
    });
  }

  closeBook(book: Book) {
    if (this.addBook) {
      this.addBook = false;
      let a = this.books;
      a!.push(book);
      this.books = new PricefilterPipe().transform(a!, this.priceStart, this.priveEnd, this.found)
    }
    if (this.edBook) {
      this.edBook = false;
      this.books = this.books?.map(x => x.id === book.id ? book : x);
    }
    this.founMaxPrice(this.books)
  }
  clickEdBook(book: Book) {
    this.edBook = true;
    this.selectB = book;
  }
  closeJP(jp: JointProduct) {
    if (this.addJP) {
      this.addJP = false;
      let a = this.jproductS;
      a?.push(jp)
      this.jproductS = new JProductFilterPipe().transform(a!, this.priceStart, this.priveEnd, this.found);
      // this.jproductS?.push(jp);
    } else {
      this.edJp = false;
      this.jproductS = this.jproductS?.map(x => x.id === jp.id ? jp : x);
    }
    this.founMaxPrice(this.jproductS)
  }
  clickEdJp(jp: JointProduct) {
    this.edJp = true;
    this.selectJp = jp;
  }
  lenAut(a: Author[]): boolean {

    return (a.length == 0)
  }

  deleteBook(b: Book) {
    console.log("del");
    this.sub = this.bookService.deleteBook(b.id).subscribe({
      next: data => {
        this.books = this.books?.filter(x => x.id !== b.id);
      },
      error: e => {
        this.error = "e"
      }
    });

  }
  deletJP(jp: JointProduct) {
    this.sub = this.jointProductService.deleteJproductk(jp.id).subscribe({
      next: data => {
        this.jproductS = this.jproductS?.filter(x => x.id !== jp.id);
      },
      error: e => {
        this.error = "e"
      }
    });
  }
  addauthor(a: Author) {
    if (this.authorsSelect?.find(x => x.id == a.id)) {
      this.authorsSelect = this.authorsSelect?.filter(x => x.id !== a.id);
    } else {
      this.authorsSelect?.push(a);
    }
    console.log(this.authorsSelect);

  }

  filterprice() {

  }
}

