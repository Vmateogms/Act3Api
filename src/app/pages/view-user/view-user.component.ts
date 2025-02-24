import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { IUser } from '../../interfaces/iuser';

@Component({
  selector: 'app-view-user',
  standalone: true,
  imports: [],
  templateUrl: './view-user.component.html',
  styleUrl: './view-user.component.css'
})
export class ViewUserComponent {

  user: IUser | undefined;

  constructor (
    private route: ActivatedRoute,
    private userService: UserService,
    private router: Router,
   ) {}


   ngOnInit(): void {
    const idDelUsuario = this.route.snapshot.params['id'];

    this.userService.getById(+idDelUsuario).subscribe({
      next: (userData) => {
        if(userData) {
          this.user = userData;
        } else {
          console.error('Usuario no encontrado');
          alert('El usuario no existe o no se puedo encontrar')
          this.router.navigate(['home']);
        }
      }, 
      error: (error) => {
        console.error('Error cargando al usuario', error);
        alert('Error al cargar los detalles de ' + this.user?.username)
        this.router.navigate(['home']);
      }
    });
   }

   volverAlaLista(): void{
    this.router.navigate(['home']);
   }


   editarUser(): void {
    if (this.user) {
      this.router.navigate(['/updateuser', this.user.id]);
    }
  }

   eliminarUser(): void {
    if (this.user) {
      const confimacion = confirm(
        `¿Estas seguro de que deseas eliminar al usuario ${this.user.username}?`
      );

      if(confimacion) {
        this.userService.deleteById(this.user.id).subscribe({
          next: () => {
            alert(`Usuario ${this.user?.username} eliminado correctamente`);
            this.router.navigate(['home'])
          },
          error: (error) => {
            console.error('Error eliminando usuario: ', error);
            alert('Error al eliminar al usuario ' + this.user?.username)
          }
        })
      }

    }
   }



}
