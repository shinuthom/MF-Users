import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home/home.component';
import { loadRemoteModule } from '@angular-architects/module-federation-runtime';
import { OktaCallbackComponent } from '@okta/okta-angular';

const routes: Routes = [
  { path: '', component: HomeComponent }, 
  { 
    path: 'users', loadChildren: () => 
    import('./users/users.module').then(m => m.UsersModule) 

    // path: 'users',
    // loadChildren: () =>
    //   loadRemoteModule({
    //     remoteEntry: 'http://localhost:4200/remoteEntry.js',
    //     remoteName: 'mfe1',
    //     exposedModule: './Module',
    //   }).then((m) => {
    //     return m.MicrofrontendModule;
    //   }),
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
