import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-err-del-aut',
  templateUrl: './err-del-aut.component.html',
  styleUrls: ['./err-del-aut.component.css']
})
export class ErrDelAutComponent {
  @Output() closeEdit = new EventEmitter<void>();
  close() {
    this.closeEdit.emit();
  }
}
