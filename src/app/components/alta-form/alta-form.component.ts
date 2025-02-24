import { Component, inject, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-alta-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './alta-form.component.html',
  styleUrl: './alta-form.component.css'
})
export class AltaFormComponent implements OnInit{


registrarUsuarios: FormGroup;
UserService = inject(UserService);
ruta = inject(Router);
isUpdate: boolean = false;


constructor(private route: ActivatedRoute) {

  this.registrarUsuarios = new FormGroup({
    id: new FormControl(null),
    first_name: new FormControl('', [Validators.required]),
    last_name: new FormControl('', [Validators.required]),
    username: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    image: new FormControl('', )
  });
}


ngOnInit(): void {
  this.registrarUsuarios.reset();
  
  this.route.params.subscribe((params) => {
    const userId = params['id'];
    if (userId) {
      this.isUpdate = true;
      this.UserService.getById(+userId).subscribe({
        next: (user) => {
          if(user) {
          this.registrarUsuarios.patchValue(user);
          }
        },
        error: (error) => {
          console.error('Error cargando usuario', error);
          alert('Error al cargar usuario para edición');
        }
      });
    }
  });
}








// ngOnInit(): void {
//   this.rutaActiva.params.subscribe(params => {
//     const userId = params['id'];
//     if (userId) {
//       this.isUpdate = true;
//       this.UserService.getById(userId).subscribe({
//         next: (user) => this.registrarUsuarios.patchValue(user),
//         error: (error) => console.error('Error cargando usuario', error)
//       });
//     }
//   });
// }




getDataForm(): void {
  if (this.registrarUsuarios.invalid) {
    alert('Completa los campos requeridos');
    return;
  }

  const formData = this.registrarUsuarios.value;
  
  if (this.isUpdate) {
    this.UserService.update(formData.id, formData).subscribe({
      next: () => this.handleSuccess('Usuario actualizado'),
      error: (error) => this.handleError(error, 'actualizar')
    });
  } else {
    this.UserService.create(formData).subscribe({
      next: () => this.handleSuccess('Usuario creado'),
      error: (error) => this.handleError(error, 'crear')
    });
  }
}


// getDataForm(): void {
//   if (this.registrarUsuarios.invalid) {
//     alert('Por favor completa todos los campos requeridos');
//     return;
//   }
//   const user = this.registrarUsuarios.value;
//   if(this.isUpdate) {
//     this.UserService.update(user.id, user).subscribe({
//     next: () => {
//       alert('Usuario Actualizado')
//       this.ruta.navigate(['/home']); 
//     },
//     error: (error) => console.error('Error al crear el user', error)
//   });
// } else {
// this.UserService.create(user).subscribe({
//   next: () => {
//     alert('User Creado');
//     this.ruta.navigate(['/home']);
//   }
// });
// }
// }

//errores detectores
private handleSuccess(message: string): void {
  alert(message);
  // Forzar recarga del componente de lista
  this.ruta.navigate(['/home']).then(() => {
    window.location.reload();
  });
}

private handleError(error: any, action: string): void {
  console.error(`Error al ${action}:`, error);
  alert(`Error al ${action}: ${error.message || 'Verifica la consola'}`);
}


}
