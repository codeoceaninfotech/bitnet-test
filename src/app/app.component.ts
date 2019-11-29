import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  	title = 'HMS';

	constructor( private router: Router, private route: ActivatedRoute, private titleService: Title ) { }

	ngOnInit() {
        this.router.events.pipe(
            filter(event => event instanceof NavigationEnd)
            ).subscribe(() => {
            	let route = this.route;
		        while (route.firstChild) route = route.firstChild;
		        route.data.subscribe(data => {
		        	if(data.title) {
		        		this.titleService.setTitle(data.title + ' | ' + this.title)
		        	} else {
		        		this.titleService.setTitle(this.title)
		        	}
		        });
            });
    }
}
