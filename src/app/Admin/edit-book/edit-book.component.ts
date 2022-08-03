import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Book } from 'src/app/Modal/Book.modal';
import { BookService } from 'src/app/shared/book.service';

@Component({
  selector: 'app-edit-book',
  templateUrl: './edit-book.component.html',
  styleUrls: ['./edit-book.component.css'],
})
export class EditBookComponent implements OnInit,AfterViewInit{
  @ViewChild('bookForm') bform!:NgForm;
  id!: number;
  editMode = false;
  book: Book = new Book('','','',0);
  errorMessage = '';
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private bookService:BookService

    ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.editMode = params['id'] != null;
      // if(this.editMode){
      // let book= this.bookService.getbook(this.id);
      // this.book =new Book(book!.title,book!.description,book!.author,book!.price);
      // }
      // this.initForm();
    });
  }

  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    setTimeout(() => {
      if(this.editMode){
        let book= this.bookService.getbook(this.id);

        this.bform.setValue({
          title:book?.title,
          author: book?.author,
          price:book?.price,
          description:book?.description
        });

      }
    }, 100);

  }

  onSubmit(authForm: NgForm) {
    if(this.editMode){
      this.bookService.updateBook(this.id,authForm.value).subscribe(
        response =>{
          this.router.navigate(['/book']);
        },err =>{
          console.log(err);
        }
      )

    }else{
      this.bookService.addBook(authForm.value).subscribe(
        response =>{
          console.log(response);
          this.router.navigate(['/book']);
        },err =>{
          console.log(err);
        }
      )
    }

  }
  goBack() {
    this.router.navigate(['/book']);
  }

}
