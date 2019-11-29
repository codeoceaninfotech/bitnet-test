import { Component, OnInit } from '@angular/core';
import { RestService } from '../services/rest.service';
import { Router, NavigationExtras } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

import { AlertService } from 'ngx-alerts';
import {InvoiceEditComponent} from './invoice-edit/invoice-edit.component';
// import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.scss']
})
export class InvoiceComponent implements OnInit {

  mobileNumber = '9865326598';
  editEmailAddress ='exmaple@gmail.com';
  constructor(
    private rest: RestService,
    private router: Router,
    private formBuilder: FormBuilder,
    private alertService: AlertService,
    // public dialog: MatDialog
  ) {

  }

  ngOnInit() {
  }

  editMobileNumber(mobileNumber) {
    // const dialogRef = this.dialog.open(InvoiceEditComponent, {
    //   data: {
    //     mobileNumbers: mobileNumber
    //   }
    // });
    // // DialogContent
    // dialogRef.afterClosed().subscribe(result => {
    //   console.log(`Dialog result: ${result}`);
    // });
  }

}
