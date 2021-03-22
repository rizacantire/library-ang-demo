import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookAddComponent } from './components/book-add/book-add.component';
import { BookComponent } from './components/book/book.component';

const routes: Routes = [
  {path:"", component:BookComponent},
  {path:"books", component:BookComponent},
  {path:"book-add", component:BookAddComponent},
  {path:"books/category/:categoryId", component:BookComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
