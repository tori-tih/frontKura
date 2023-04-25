import { Component } from '@angular/core';
import { AddrService } from 'src/app/services/addr.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  
  ngOnInit(): void {
    this.getAddr();
  }

  getAddr(): void {
    this.addrService.getAddr()
        .subscribe(addr => this.address = addr);
  }

  address: string[] = [];
  constructor(private addrService: AddrService) {}
}
