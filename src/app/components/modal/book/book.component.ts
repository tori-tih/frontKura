import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Author } from 'src/app/interfaces/Author';
import { Book } from 'src/app/interfaces/Book';
import { BookService } from 'src/app/services/book.service';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent {
  @Input() book?: Book
  form = this.fb.group({
    id: [NaN],
    barecode: ['', [Validators.required]],
    count: [NaN, [Validators.required]],
    price: [NaN, [Validators.required]],
    image: ['', [Validators.required]],
authors: this.fb.array<Author>([], [Validators.required]),
    nameBook: ['', [Validators.required]],
    yearPublic: [NaN, [Validators.required]]
  })
  @Input()authors?: Author[]

  mesnotILUHI=""

  @Output() closeEdit = new EventEmitter<Book>();

  constructor(private fb: FormBuilder, private bSservice: BookService) { }

  ngOnInit() {
    this.form.reset();
  }

  close() {
    this.closeEdit.emit(this.book);
  }

  addBook() {
    let bs = this.form.getRawValue() as Book;

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
  confirm() {
  }
}
