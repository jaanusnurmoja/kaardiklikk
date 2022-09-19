import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { KaartComponent } from './kaart/kaart.component';

const routes: Routes = [
  { path: '', component: KaartComponent },
  { path: ':kaart', component: KaartComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
