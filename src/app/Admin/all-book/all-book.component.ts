import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { Book } from 'src/app/Modal/Book.modal';
import { BookService } from 'src/app/shared/book.service';
import { EditBookComponent } from '../edit-book/edit-book.component';

@Component({
  selector: 'app-all-book',
  templateUrl: './all-book.component.html',
  styleUrls: ['./all-book.component.css']
})
export class AllBookComponent implements OnInit,OnDestroy{

  bookList:Book[] =[];
  errorMessage='';
  subscription!:Subscription;

  @ViewChild(EditBookComponent) edit:any|undefined;

  constructor(private bookService:BookService) { }

  ngOnInit(): void {
    this.bookService.getAllBooks();
    this.subscription=  this.bookService.bookSubject.subscribe(response =>{
      this.bookList =response;
    });
  }


  deleteBook(ind:number|undefined){
    this.bookService.deletebook(ind).subscribe(
      response =>{
        console.log(response);
      },err =>{
        console.log(err);
      }
    )
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.subscription.unsubscribe();
  }

}
