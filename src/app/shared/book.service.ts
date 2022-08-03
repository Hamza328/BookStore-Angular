import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { exhaustMap, map, switchMap, take, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AuthService } from '../Auth/auth.service';
import {AuthResponse} from '../Auth/auth.service';
import { Book } from '../Modal/Book.modal';
import { PurchaseItem } from '../Modal/puchase-item.modal';

const Api_url =`${environment.Base_Url}`;

export interface bookResponse{
   title:string,
   description:string,
   author:string,
   price:number,
   createTime:Date,
   id:number
}

@Injectable({
  providedIn: 'root'
})
export class BookService {

  bookSubject = new Subject<Book[]>();

  private Books:Book[]=[];

  constructor(private http:HttpClient,private authservice:AuthService) { }

  getAllBooks(){
    this.http.get<bookResponse[]>(Api_url+'/api/book').subscribe(
      response =>{
        this.bookSubject.next(response);
        this.Books =response;
      },err =>{
        console.log(err);
      }
    )
  }

  Buybook(bookprice:number,bookId?:number):Observable<any>{
    return this.authservice.user.pipe(take(1),switchMap(user=>{
      return this.http.post(Api_url+'/api/purchase-history',
      {
        userId:user!.id,
        bookId:bookId,
        price:bookprice
      }).pipe(map(response=>{
        return response;
      }))
    }));
  }

  getAllpuchaseOfUser(){
    return this.http.get<PurchaseItem[]>(Api_url+'/api/purchase-history');
  }

  addBook(book:Book){
      return this.http.post<Book>(Api_url+'/api/book',book);
  }
  updateBook(id:number, objbook:Book){
    let book = this.Books.find(book =>{
      return book.id == id;
    })
    book ={
      ...book,
      ...objbook,
    }

    return this.http.put<Book>(Api_url+'/api/book',book);

  }

  deletebook(bookId?:number){
    console.log(bookId);
    return this.http.delete<any>(Api_url+'/api/book/'+bookId).pipe(
      tap(response =>{
        this.Books=this.Books.filter(book =>{
            return book.id !=bookId;
          })
         this.bookSubject.next(this.Books);
      })
    );
  }

  getbook(id:number){
    return this.Books.find(book =>{
      return book.id == id;
    })
  }


}
