import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeLayoutComponent } from './layouts/home-layout/home-layout.component';

import {InvoiceComponent} from './invoice/invoice.component';
const routes: Routes = [
    //Site routes goes here
    {
        path: '',
        component: HomeLayoutComponent,
        children: [
        ]
    },
    { path: 'login', component: InvoiceComponent, data: { title: "Invoice" } },


];


@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
