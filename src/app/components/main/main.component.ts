import { Component } from '@angular/core';
import { Bookstore } from 'src/app/interfaces/Bookstore';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent {
 bookstore?: Bookstore;
}
