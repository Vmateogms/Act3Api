import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IUser } from '../interfaces/iuser';
import { map, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = 'https://peticiones.online/api/users';

  constructor(private httpClient: HttpClient) { }





    getAll(): Observable<IUser[]> {
      return this.httpClient.get<{results: IUser[]}>(this.apiUrl).pipe(
        map((response) => {
          console.log('Respuesta de la API:', response); 
          return response.results || []; //results
        })
      );
      }

    getById(id: number): Observable<IUser> {
      return this.httpClient.get<IUser>(`${this.apiUrl}/${id}`);
    }



  // getById(id: number): Observable<IUser> {
  //   return this.httpClient.get<{data: IUser}>(`${this.apiUrl}/${id}`).pipe(
  //   map(response => response.data) //response.results
  //   );
  //   }

  create(user: IUser): Observable<IUser> {
    const body = {
      first_name: user.first_name,
      last_name: user.last_name,
      username: user.username,
      email: user.email
    };
    console.log('Enviando datos:', body);
    return this.httpClient.post<IUser>(this.apiUrl, body);
  }

  update(id: number, user: IUser): Observable<IUser> {
    return this.httpClient.put<IUser>(`${this.apiUrl}/${id}`,user);
  }

  deleteById(id: number): Observable<void>{
    return this.httpClient.delete<void>(`${this.apiUrl}/${id}`);
  }


}
