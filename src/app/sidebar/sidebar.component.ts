import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { Location } from '@angular/common';
import { RestService } from '../services/rest.service';
import { filter } from 'rxjs/operators';
@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss']
})

export class SidebarComponent implements OnInit {

    currentUrl: string;
    public loggedUser: any;

    constructor(
        private rest: RestService,
        private router: Router,
        private location: Location,
        private route: ActivatedRoute
    ) {

        this.rest.checkAuthentication().then((res) => {
            this.loggedUser = res;
        }, (err) => {
            this.router.navigateByUrl('/login');
        });

        this.currentUrl = '/'
        this.router.events.pipe(
            filter(event => event instanceof NavigationEnd)
        ).subscribe(() => {
            this.currentUrl = '/'
            if (this.location.path()) {
                if (this.location.path().includes('/users') || this.location.path().includes('/user/create') || this.location.path().includes('/user/edit')) {
                    this.currentUrl = '/users'
                } else if (this.location.path().includes('/opd-create')) {
                    this.currentUrl = '/opd-list'
                }  else if (this.location.path().includes('/opd-list')) {
                    this.currentUrl = '/opd-list'
                } else if (this.location.path().includes('/opd-edit')) {
                    this.currentUrl = '/opd-list'
                } else if (this.location.path().includes('/opd-old')) {
                    this.currentUrl = '/opd-list'
                }else if (this.location.path().includes('/ipd-create')) {
                    this.currentUrl = '/ipd-create'
                } else if (this.location.path().includes('/department-create')) {
                    this.currentUrl = '/department-list'
                } else if (this.location.path().includes('/department-edit')) {
                    this.currentUrl = '/department-list'
                } else if (this.location.path().includes('/department-list')) {
                    this.currentUrl = '/department-list'
                } else if (this.location.path().includes('/disease-department/list')) {
                    this.currentUrl = '/disease-department/list'
                } else if (this.location.path().includes('/disease-department/create')) {
                    this.currentUrl = '/disease-department/list'
                } else if (this.location.path().includes('/disease-department/edit')) {
                    this.currentUrl = '/disease-department/list'
                } else if (this.location.path().includes('/medicine-inward-create')) {
                    this.currentUrl = '/medicine-inward/list'
                } else if (this.location.path().includes('/medicine-inward/list')) {
                    this.currentUrl = '/medicine-inward/list'
                } else if (this.location.path().includes('/medicine-inward/edit')) {
                    this.currentUrl = '/medicine-inward/list'
                }else if (this.location.path().includes('/ward-create')) {
                    this.currentUrl = '/ward-create'
                } else if (this.location.path().includes('/diet-create')) {
                    this.currentUrl = '/diet-create'
                } else if (this.location.path().includes('/treating-doctor-create')) {
                    this.currentUrl = '/treating-doctor-list'
                }  else if (this.location.path().includes('/treating-doctor-list')) {
                    this.currentUrl = '/treating-doctor-list'
                } else if (this.location.path().includes('/treating-doctor-edit')) {
                    this.currentUrl = '/treating-doctor-list'
                }else if (this.location.path().includes('/disease-create')) {
                    this.currentUrl = '/disease-create'
                } else if (this.location.path().includes('/medicine-create')) {
                    this.currentUrl = '/medicine-list'
                }  else if (this.location.path().includes('/medicine-list')) {
                    this.currentUrl = '/medicine-list'
                }  else if (this.location.path().includes('/medicine-edit')) {
                    this.currentUrl = '/medicine-list'
                } else {
                    this.currentUrl = '/'
                }

            }
        });
    }

    ngOnInit() {

    }
}