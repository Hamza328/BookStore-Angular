export class Book{
  constructor(
  public title:string,
  public description:string,
  public author:string,
  public price:number,
  public createTime?:Date,
  public id?:number
  ){}
}
