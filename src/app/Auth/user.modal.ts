import { Role } from "./role.enum";

export class User{

  constructor(public id:number,
    public username:string,
    public password:string,
    public role:Role,
    private token: string,
    private tokenExpirationDate: Date){}

    get _token() {
      if (!this.tokenExpirationDate || new Date() > this.tokenExpirationDate) {
        return null;
      }
      return this.token;
    }

}
