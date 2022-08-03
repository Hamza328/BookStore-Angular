import { Component, OnInit } from '@angular/core';
import { PurchaseItem } from 'src/app/Modal/puchase-item.modal';
import { BookService } from 'src/app/shared/book.service';
import { Book } from '../../Modal/Book.modal';

@Component({
  selector: 'app-purchased-book',
  templateUrl: './purchased-book.component.html',
  styleUrls: ['./purchased-book.component.css']
})
export class PurchasedBookComponent implements OnInit {

  purchaseItemList:PurchaseItem[] =[];
  errorMessage ='';
  constructor(private bookService:BookService) { }

  ngOnInit(): void {
    this.bookService.getAllpuchaseOfUser().subscribe(books=>{
      this.purchaseItemList=books;
    },err =>{
      this.errorMessage =err;
      console.log(err);

    })
  }

}
