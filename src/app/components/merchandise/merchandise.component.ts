import { Component, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { Book } from 'src/app/interfaces/Book';
import { Bookstore } from 'src/app/interfaces/Bookstore';
import { JointProduct } from 'src/app/interfaces/JointProduct';
import { AuthorService } from 'src/app/services/author.service';
import { BookService } from 'src/app/services/book.service';
import { BookstoreService } from 'src/app/services/bookstore.service';
import { JointProductService } from 'src/app/services/joint-product.service';
import { Author } from 'src/app/interfaces/Author';

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
  author?: Author;
  authors?: Author[];


  constructor(private authorService: AuthorService,
    private bookstoreService: BookstoreService,
    private bookService: BookService,
    private jointProductService: JointProductService) {
    this.sub = this.authorService.getAuthors().subscribe({
      next: data => {
        this.authors = data;
      },
      error: e => {
        this.error = "e"
      }
    });
  }

  ngOnInit() {
    this.emitSelected(1);
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
    }else{
      this.authors = this.authors?.map(x => x.id === author.id ? author : x);
    this.edAuthor = false;}
  }
  editAuthor(author: Author) {
    this.author = author;
    this.edAuthor = true;
  }
  deleteAuthor(author: Author){
    this.sub = this.authorService.deleteAuthor(author.id).subscribe({
      next: data => {
        this.authors = this.authors?.filter(x=>x.id !== author.id);
      },
      error: e => {
        this.error = "e"
      }
    });
  }

  closeBook(book: Book){
    this.addBook=false;
  }

  closeJP(jp: JointProduct){
this.addJP=false;
  }
}

