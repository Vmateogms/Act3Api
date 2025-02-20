import { Component, inject, OnInit } from '@angular/core';
import { IUser } from '../../interfaces/iuser';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { UserCardComponent } from '../user-card/user-card.component';

@Component({
  selector: 'app-view-list',
  standalone: true,
  imports: [UserCardComponent],
  templateUrl: './view-list.component.html',
  styleUrl: './view-list.component.css'
})
export class ViewListComponent implements OnInit {
ruta = inject(Router);
userService = inject (UserService);
users: IUser[] = [];


ngOnInit(): void {
  this.cargarUsuarios();
}


cargarUsuarios(): void {
  this.userService.getAll().subscribe({
    next: (users) => {
      console.log('Usuarios recibidos:', users);
      this.users = users;
    },
    error: (error) => {
      console.error('Error cargando usuarios:', error);
      alert('Error al cargar usuarios. Ver consola para detalles.');
    }
  });
}

// cargarUsuarios(): void{
//   this.userService.getAll().subscribe({
//     next: (data) => {
//       console.log('Usuarios cargados:', data); 
//       this.users = data;
//     },
//     error: (error) => console.error('Error cargando users', error),
//   });
// }

verDetalle(user: IUser): void {
  this.ruta.navigate(['/user', user.id]) 
}


actualizar(user: IUser): void {
  this.ruta.navigate(['/updateuser', user.id]);
}


borrarUsuario(user: IUser): void {
  if (confirm(`¿Esta seguro de que desea eliminar a ${user.first_name} ${user.last_name} cuyo usuario es ${user.username}?`)) {
    this.userService.deleteById(user.id).subscribe({
      next: () => this.users = this.users.filter(u => u.id !== user.id),
      error: (error) => console.error(`Error borrando al usuario ${user.username}`, error)
   });
  }
  
}



}
