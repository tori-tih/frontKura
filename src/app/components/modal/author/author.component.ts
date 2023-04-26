import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Author } from 'src/app/interfaces/Author';
import { AuthorService } from 'src/app/services/author.service';

@Component({
  selector: 'app-author',
  templateUrl: './author.component.html',
  styleUrls: ['./author.component.css']
})
export class AuthorComponent {
  @Input() author?: Author
  form = this.fb.group({
    id: [NaN],
    firstname: ['', [Validators.required]],
    lastname: ['', [Validators.required]],
  })
  @Input() title = ""

  mesnotILUHI = ""

  @Output() closeEdit = new EventEmitter<Author>();

  constructor(private fb: FormBuilder, private bSservice: AuthorService) { }

  ngOnInit() {
    if(!(this.title === "Добавить нового автора")){
      this.form.setValue({
        id: this.author!.id,
        firstname: this.author!.firstname,
        lastname: this.author!.lastname
      })
    }
  }

  close() {
    this.closeEdit.emit(this.author);
  }

  addBook() {
    let bs = this.form.getRawValue() as Author;

    if (this.form.invalid) {
      this.mesnotILUHI = "Введите данные корректно"
      return;
    }
    if(this.title = "Добавить нового автора")
    this.bSservice.addAuthor(bs).subscribe({
      next: date => {
        this.author = date;
        this.close();
      },
      error: e => {
        this.mesnotILUHI = "Ошибка!"
      }
    });
    else{
      this.bSservice.updateAuthor(bs).subscribe({
        next: date => {
          this.author = date;
          this.close();
        },
        error: e => {
          this.mesnotILUHI = "Ошибка!"
        }
      });
    }
  }
  confirm() {
  }
}
