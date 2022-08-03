import { Component, OnInit } from '@angular/core';
import { Book } from 'src/app/Modal/Book.modal';
import { bookResponse, BookService } from '../../shared/book.service';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css'],
})
export class BookComponent implements OnInit {

  infoMessage='';
  errorMessage='';
  Books: Book[] = [];

  constructor(private bookservice: BookService) {}

  ngOnInit(): void {
    this.bookservice.getAllBooks();
    this.bookservice.bookSubject.subscribe(
      (response) => {
        this.Books = response;

      },
      (error) => {
        console.log(error);
      }
    );
  }

  BuyBook(bookprice:number,bookid?:number){
     this.bookservice.Buybook(bookid!,bookprice).subscribe(data => {
      this.infoMessage = 'Mission is completed';
    }, err => {
      this.errorMessage = 'Unexpected error occurred.';
      console.log(err);
    });

  }
}
