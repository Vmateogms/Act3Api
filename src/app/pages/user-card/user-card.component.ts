import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IUser } from '../../interfaces/iuser';

@Component({
  selector: 'app-user-card',
  standalone: true,
  imports: [],
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.css'
})
export class UserCardComponent {
@Input() user!: IUser;
@Output() verDetalleOut = new EventEmitter<IUser>();
@Output() actualizarOut = new EventEmitter<IUser>();
@Output() borrarUsuarioOut = new EventEmitter<IUser>();


verDetalle() :void {
  this.verDetalleOut.emit(this.user);
}

actualizar(): void {
  this.actualizarOut.emit(this.user);
}

borrarUsuario(): void{
  this.borrarUsuarioOut.emit(this.user);
}



}
