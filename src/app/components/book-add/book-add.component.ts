import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { BookService } from 'src/app/services/book.service';
import { ToastrService } from 'ngx-toastr';
import { CategoryService } from 'src/app/services/category.service';
import { Category } from 'src/app/models/category';

@Component({
  selector: 'app-book-add',
  templateUrl: './book-add.component.html',
  styleUrls: ['./book-add.component.css'],
})
export class BookAddComponent implements OnInit {
  bookAddForm: FormGroup;
  categories:Category[] = [];
  constructor(
    private formBuilder: FormBuilder,
    private bookService: BookService,
    private toastrService: ToastrService,
    private categoryService:CategoryService
  ) {}

  ngOnInit(): void {
    this.createBookAddForm();
    this.categoryService.getCategories().subscribe(response=>{
      this.categories = response.data
    });

  }

  createBookAddForm() {
    this.bookAddForm = this.formBuilder.group({
      Id: ['', Validators.required],
      AuthorId: ['', Validators.required],
      CategoryId: ['', Validators.required],
      Name: ['', Validators.required],
      Page: ['', Validators.required],
      Description: ['', Validators.required],
    });
  }

  add() {
    if (this.bookAddForm.valid) {
      let bookModel = Object.assign({}, this.bookAddForm.value);
      this.bookService.add(bookModel).subscribe(
        (response) => {
          this.toastrService.success(response.message);
        },
        (responseError) => {
          if (responseError.error.Errors.length > 0) {
            console.log(responseError.error.Errors);
            for (let i = 0; i < responseError.error.Errors.length; i++) {
              this.toastrService.error(
                responseError.error.Errors[i].ErrorMessage,
                'Doğrulama hatası'
              );
            }
          }
        }
      );
    } else {
      this.toastrService.error('Formunuz eksik');
    }
  }

  consoleLook(form:FormGroup){
    console.log(form.value);
  }
}
