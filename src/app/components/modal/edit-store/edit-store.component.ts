import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Bookstore } from 'src/app/interfaces/Bookstore';
import { BookstoreService } from 'src/app/services/bookstore.service';

@Component({
  selector: 'app-edit-store',
  templateUrl: './edit-store.component.html',
  styleUrls: ['./edit-store.component.css']
})
export class EditStoreComponent {
  selectedStore!: number
  @Input() bookstors?: Bookstore[]
  form = this.fb.group({
    id: [NaN],
    address: ['', [Validators.required]],
    number: ['', [Validators.required]]
  })
  form2 = this.fb.group({
    id: [NaN],
    address: ['', [Validators.required]],
    number: ['', [Validators.required]]
  })
  selectBookstore?: Bookstore;
  mesILUHI=""
  mesnotILUHI=""

  @Output() closeEdit = new EventEmitter<Bookstore[]>();

  constructor(private fb: FormBuilder, private bSservice: BookstoreService) { }

  ngOnInit() {
    this.selectedStore = this.bookstors![0].id;
    this.emitSelected()
  }

  close() {
    this.closeEdit.emit(this.bookstors);
  }
  noStore(): boolean {
    return ((!this.bookstors?.length))
  }
  addStore() {
    let bs = this.form.getRawValue() as Bookstore

    if (this.form.controls.address.invalid) {
      this.mesnotILUHI = "Введите адрес корректно"
      return;
    }
    if (this.form.controls.number.invalid) {
      this.mesnotILUHI = "Введите номер корректно"
      return;
    }
    {
      this.bSservice.addBookstore(bs).subscribe({
        next: bookstore => {
          this.bookstors?.push(bookstore);
          this.form.reset();
          this.mesnotILUHI = "";
        },
        error: e => {
        }
      });
    }
  }
  updateStore() {
    let bs = this.form2.getRawValue() as Bookstore
    console.log(this.form2);

    if (this.form2.controls.address.invalid) {
      this.mesILUHI = "Введите адрес корректно"
      return;
    }
    if (this.form2.controls.number.invalid) {
      this.mesILUHI = "Введите номер корректно"
      return;
    }
    this.bSservice.updateBookstore(bs).subscribe({
      next: bookstore => {
        this.bookstors = this.bookstors!.map(x => x.id === bookstore.id ? bookstore : x);
        this.mesILUHI="";
      },
      error: e => {
      }
    });

  }
  confirm() {
  }
  emitSelected() {
    this.selectBookstore = this.bookstors?.find(st => st.id == this.selectedStore);
    this.form2.setValue({
      id: this.selectBookstore!.id,
      address: this.selectBookstore!.address,
      number: this.selectBookstore!.number
    })
  }
}
