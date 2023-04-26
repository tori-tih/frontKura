import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Author } from 'src/app/interfaces/Author';
import { Book } from 'src/app/interfaces/Book';
import { Bookstore } from 'src/app/interfaces/Bookstore';
import { BookService } from 'src/app/services/book.service';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent {
  @Input() book?: Book
  check?: any
  form = this.fb.group({
    id: [NaN],
    barecode: ['', [Validators.required]],
    count: [NaN, [Validators.required]],
    price: [NaN, [Validators.required]],
    nameBook: ['', [Validators.required]],
    yearPublic: [NaN, [Validators.required]]
  });
  @Input() authors?: Author[];
  @Input() bookstore?: Bookstore;
  authorsSelect: Author[] = [];

  mesnotILUHI = "";
  @Input() title=""

  @Output() closeEdit = new EventEmitter<Book>();

  constructor(private fb: FormBuilder, private bSservice: BookService) { }

  ngOnInit() {
    this.form.reset();
    if(!(this.title=="Добавить новую книгу:")){
      this.form.setValue({
        id: this.book!.id,
        barecode: this.book!.barecode,
        count: this.book!.count,
        price: this.book!.price,
        nameBook: this.book!.nameBook,
        yearPublic: this.book!.yearPublic
      })
      console.log(this.book!.authors);
      
      for(let author of this.book!.authors){
        this.addauthor(author);
        console.log(this.authorsSelect);
        
      }
    }
  }

  close() {
    this.closeEdit.emit(this.book);
  }

  addBook() {
    let bs: Book = {
      id: this.form.value.id!,
      barecode: this.form.value.barecode!,
      count: this.form.value.count!,
      price: this.form.value.price!,
      nameBook: this.form.value.nameBook!,
      bookstore: this.bookstore!,
      image: '',
      yearPublic: this.form.value.yearPublic!,
      authors: this.authorsSelect,
    }

    if (this.form.invalid) {
      this.mesnotILUHI = "Введите данные корректно"
      return;
    }
    this.bSservice.addBook(bs).subscribe({
      next: book => {
        this.book = book;
        this.close();
      },
      error: e => {
        this.mesnotILUHI = "Ошибка!"
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
  isAut(a: Author){
    return (this.authorsSelect?.find(x => x.id == a.id))
  }
  confirm() {
  }
}
