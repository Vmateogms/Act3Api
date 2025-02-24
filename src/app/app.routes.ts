import { Routes } from '@angular/router';
import { ViewListComponent } from './pages/view-list/view-list.component';
import { ViewUserComponent } from './pages/view-user/view-user.component';
import { AltaFormComponent } from './components/alta-form/alta-form.component';
import { Page404Component } from './pages/page404/page404.component';




export const routes: Routes = [

    
    {path: '', pathMatch: 'full', redirectTo: 'home'},   
    {path: 'home', component: ViewListComponent},
    {path: 'user/:id', component: ViewUserComponent},
    {path: 'newuser', component: AltaFormComponent},
    {path: 'updateuser/:id', component: AltaFormComponent},
    {path: '**', component: Page404Component},
];
