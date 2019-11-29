import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { RestService } from '../services/rest.service';
import { filter } from 'rxjs/operators';
import { Location } from '@angular/common';
import { AlertService } from 'ngx-alerts';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

    public loggedUser: any;
    routePermission: any;

    constructor(
        private rest: RestService,
        private router: Router,
        private route: ActivatedRoute,
        private location: Location,
        private alertService: AlertService
    ) {

    }

    ngOnInit() {

    }

}
