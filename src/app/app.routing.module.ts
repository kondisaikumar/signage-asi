import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { Routes, RouterModule, ExtraOptions } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { PreviewComponent } from './preview/preview.component';
const routes: Routes = [
  {path: '', component: LoginComponent},
   { path: 'preview', component: PreviewComponent}
];
@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true}), HttpClientModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
