import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './components/header/header.component';
import { MerchandiseComponent } from './components/merchandise/merchandise.component';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { MainComponent } from './components/main/main.component';
import { EditStoreComponent } from './components/modal/edit-store/edit-store.component';
import { StoreSortPipe } from './pipes/store-sort.pipe';
import { BookComponent } from './components/modal/book/book.component';
import { AuthorComponent } from './components/modal/author/author.component';
import { JProductComponent } from './components/modal/j-product/j-product.component';


@NgModule({
  declarations: [
    AppComponent,
    MerchandiseComponent,
    HeaderComponent,
    MainComponent,
    EditStoreComponent,
    StoreSortPipe,
    BookComponent,
    AuthorComponent,
    JProductComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    CommonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
