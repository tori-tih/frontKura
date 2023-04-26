import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Bookstore } from 'src/app/interfaces/Bookstore';
import { JointProduct } from 'src/app/interfaces/JointProduct';
import { BookstoreService } from 'src/app/services/bookstore.service';
import { JointProductService } from 'src/app/services/joint-product.service';

@Component({
  selector: 'app-j-product',
  templateUrl: './j-product.component.html',
  styleUrls: ['./j-product.component.css']
})
export class JProductComponent {
  @Input() jp?: JointProduct;
  @Input() bookstore?: Bookstore;
  @Input() title = ""
  form = this.fb.group({
      id: [NaN],
      barecode: ['', [Validators.required]],
      count: [NaN, [Validators.required]],
      price: [NaN],
      nameProduct: ['', [Validators.required]],
  });

  mesnotILUHI = "";

  @Output() closeEdit = new EventEmitter<JointProduct>();

  constructor(private fb: FormBuilder, private bSservice: JointProductService) { }

  ngOnInit() {
    this.form.reset();
    if(this.title==="Изменить канцелярию"){
      this.form.setValue({
        id: this.jp!.id,
        barecode: this.jp!.barecode,
        count: this.jp!.count,
        price: this.jp!.price,
        nameProduct: this.jp!.nameProduct,
      })
    }
  }

  close() {
    this.closeEdit.emit(this.jp);
  }

  addJP() {

    let jp: JointProduct = {
      id: this.form.value.id!,
      barecode: this.form.value.barecode!,
      count: this.form.value.count!,
      price: this.form.value.price!,
      nameProduct: this.form.value.nameProduct!,
      bookstore: this.bookstore!,
      image: ''
    }

    // let jp = this.form.getValue() as JointProduct;


  
    if (this.form.invalid) {
      this.mesnotILUHI = "Введите данные корректно"
      console.log(false);
      return;
    }

    
    this.bSservice.addJproduct(jp).subscribe({
      next: x => {
        this.jp = x;
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
