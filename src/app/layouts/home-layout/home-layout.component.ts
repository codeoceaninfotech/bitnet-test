import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { RestService } from '../../services/rest.service';
import { filter } from 'rxjs/operators';
import { Location } from '@angular/common';
import { AlertService } from 'ngx-alerts';

@Component({
  selector: 'app-home-layout',
  templateUrl: './home-layout.component.html',
  styleUrls: ['./home-layout.component.scss']
})
export class HomeLayoutComponent implements OnInit {

  constructor(
    private rest: RestService,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location,
    private alertService: AlertService) {
}


  ngOnInit() {
    this.rest.checkAuthentication().then((res) => {
    }, (err) => {
      this.router.navigateByUrl('/login');
    });
  }

}
