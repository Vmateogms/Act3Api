import { HttpClient, HttpParams } from '@angular/common/http';
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
  private users: IUser[] = [];


  constructor(private httpClient: HttpClient) { }





  getAll(page: number, perPage: number): Observable<any> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('per_page', perPage.toString());
  
    return this.httpClient.get<any>(this.apiUrl, { params }).pipe(
      map(response => {
        this.users = [...this.users, ...response.results]; //lo que mantiene los datos en el form cuando actualizamos
        console.log('Respuesta de la API:', response); 
        return {
          data: response.results, 
          total: response.total
        };
      }),
      catchError(error => {
        console.error('Error obteniendo usuarios:', error);
        return of({ data: [], total: 0 });
      })
    );
  }

    // getAll(): Observable<IUser[]> {
    //   return this.httpClient.get<{results: IUser[]}>(this.apiUrl).pipe(
    //     map((response) => {
    //       this.users = response.results ||  [];
    //         console.log('Usuarios cargados:', this.users);
    //         return this.users;
    //     }),
    //     catchError((error) => {
    //       console.log('Error al cargar el user', error);
    //       return of ([]); // si hay error , array vacio
    //     })
    //   );
    //   }




      getById(id: number): Observable<IUser | undefined> {
        const user = this.users.find((u) => u.id === id);
        return of (user);
        }

    // getById(id: number): Observable<IUser | undefined> {
    //   return this.httpClient.get<IUser>(`${this.apiUrl}/${id}`);
    // }



    create(user: IUser): Observable<IUser> {
      console.log('Creando al usuario:', user);
      return this.httpClient.post<IUser>(this.apiUrl, user).pipe(
        map(() => {
          const usuarioNuevo = {...user, id: Date.now()};
          this.users.push(usuarioNuevo);
          return usuarioNuevo;
        })
      )
    }


  // create(user: IUser): Observable<IUser> {
  //   const body = {
  //     first_name: user.first_name,
  //     last_name: user.last_name,
  //     username: user.username,
  //     email: user.email
  //   };
  //   console.log('Enviando datos:', body);
  //   return this.httpClient.post<IUser>(this.apiUrl, body);
  // }

  update(id: number, user: IUser): Observable<IUser> {
    console.log('Actualizando al user', user);
    return this.httpClient.put<IUser>(`${this.apiUrl}/${id}`,user).pipe(
      map(() => {
        const indice = this.users.findIndex((u)=> u.id === id); //busca el indice del usuario en el array this.users buscando que coincida el id user con el id proporcionado
        if (indice !==1) {   //verifica si el indice encontrado es diferente de -1 
          this.users[indice] = {...user, id};  //spread operator ... crea una copia del objeto user y asegura que id este presente ene l nuevo objeto
        }//actualiza el usuario en el array this.users 
        return user;
      })
    );
  }

  deleteById(id: number): Observable<void>{
    return this.httpClient.delete<void>(`${this.apiUrl}/${id}`);
  }


}
