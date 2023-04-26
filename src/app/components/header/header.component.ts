import { Component, EventEmitter, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { Bookstore } from 'src/app/interfaces/Bookstore';
import { AddrService } from 'src/app/services/addr.service';
import { BookstoreService } from 'src/app/services/bookstore.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  sub?: Subscription;
  bookstores?: Bookstore[];
  bookstore?: Bookstore;
  error: string ="";
  selectedStore!: number;
  @Output() outputStore = new EventEmitter<Bookstore>();
  edit = false;

  constructor( private bookstoreService: BookstoreService) { }

  ngOnInit(){
    this.sub = this.bookstoreService.getBookstore().subscribe({
      next: bookstores =>{
        this.bookstores = bookstores;
        this.selectedStore = bookstores[0].id;
        this.emitSelected(this.selectedStore);
      },        
      error: e => {
        this.error = "e"
      }
    });
  
  }
  ngOnDestroy() {
    this.sub?.unsubscribe();
  }

  isStore(): boolean {
    return (this.bookstores?.length === 0)
  }

  emitSelected(id: number){
    
    if(this.bookstores){
    this.bookstore = this.bookstores.find(st => st.id == this.selectedStore);
    console.log("букстор с хидера:");
    console.log(this.bookstore);

    
    this.outputStore.emit(this.bookstore);}
  }

  close(bookstore: Bookstore[]){
    this.edit=false;
    this.bookstores = bookstore;
  }

  delete(){
    this.bookstoreService.deleteBookstore(this.selectedStore).subscribe({
      next: bookstore => {
        this.bookstores = this.bookstores?.filter(x=>x.id !== this.selectedStore);
        if(this.bookstores)
        this.selectedStore = this.bookstores[0].id;
      },
      error: e => {
      }
    });
  }
}
