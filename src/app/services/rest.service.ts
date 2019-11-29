import { Injectable } from '@angular/core';
import {
	HttpClient, HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpHeaders } from "@angular/common/http";
import { map } from 'rxjs/operators';
import { LocalStorageService, LocalStorage } from 'angular-web-storage';
import { catchError } from 'rxjs/operators';

@Injectable({
	providedIn: 'root'
})
export class RestService {

	public token: any;
	public apiUrl: any;

	// localStorage.clear();

	constructor(
		private http: HttpClient,
		public local: LocalStorageService
	) {
		// this.apiUrl = 'https://enggenius.in/doctor/backend/';
    this.apiUrl = 'http://localhost/doctor/';

		this.token = '';
	}

	// This is for login related apis

	public checkAuthentication() {
		return new Promise((resolve, reject) => {
			this.token = localStorage.getItem('token');
			if (this.token) {
				let headers = new HttpHeaders({ 'Authorization': this.token });

				this.http.get(this.apiUrl + 'loggedin', { headers: headers })
					.subscribe(res => {
						resolve(res);
					}, (err) => {
						reject(err);
					});
			} else {
				reject('Token not exist');
			}
		});
	}

	public login(credentials) {
		return new Promise((resolve, reject) => {
			let headers = new HttpHeaders({ 'Content-Type': 'application/json' });

			this.http.post(this.apiUrl + 'login', credentials, { headers: headers })
				.subscribe(res => {
					let data = res;
					localStorage.setItem('token', data['token']);
					// store token in localstorage
					resolve(data);
				}, (err) => {
					reject(err);
				});
		});
	}

	public forgot(data) {
		return new Promise((resolve, reject) => {
			let headers = new HttpHeaders({ 'Content-Type': 'application/json' });

			this.http.post(this.apiUrl + 'forgot-password', data, { headers: headers })
				.subscribe(res => {
					let data = res;
					resolve(data);
				}, (err) => {
					reject(err);
				});
		});
	}

	public register(data) {
		return new Promise((resolve, reject) => {
			let headers = new HttpHeaders();

			this.http.post(this.apiUrl + 'registeruser', data, { headers: headers })
				.subscribe(res => {
					let data = res;
					resolve(data);
				}, (err) => {
					reject(err);
				});
		});
	}

	getWithoutLogin(url) {
		return new Promise((resolve, reject) => {
			let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
			url = this.apiUrl + '' + url;

			this.http.get(url, { headers: headers })
				.subscribe(res => {
					let data = res;
					resolve(data);
				}, (err) => {
					reject(err);
				});
		});
	}

	logout() {
		return new Promise((resolve, reject) => {
			//Load token if exists
			this.token = localStorage.getItem('token');
			if (this.token) {
				let headers = new HttpHeaders({ 'Authorization': this.token, 'Content-Type': 'application/json' });

				this.http.get(this.apiUrl + 'logout', { headers: headers })
					.subscribe(resp => {
						if (resp['impersonator']) {
							this.token = resp['impersonator'];
							localStorage.setItem('token', resp['impersonator']);
							// this.$window.location.reload();
						} else {
							this.token = '';
							localStorage.setItem('token', '');
						}
						resolve(resp);
					}, (err) => {
						this.token = '';
						localStorage.setItem('token', '');
						resolve('Logout');
					});
			} else {
				this.token = '';
				localStorage.setItem('token', '');
				resolve('Logout');
			}
		});
	}

	impersonate($userId) {
		return new Promise((resolve, reject) => {
			this.token = localStorage.getItem('token');
			if (this.token) {
				let headers = new HttpHeaders({ 'Authorization': this.token, 'Content-Type': 'application/json' });

				this.http.post(this.apiUrl + 'impersonate', { userId: $userId }, { headers: headers })
					.subscribe(res => {
						let data = res;
						localStorage.setItem('token', data['token']);
						this.token = data['token'];
						resolve(data);
					}, (err) => {
						reject(err);
					});
			} else {
				reject('Token not exist');
			}
		});
	}

	// End of login related apis


	get(url) {
		return new Promise((resolve, reject) => {
			this.token = localStorage.getItem('token');
			if (this.token) {
				let headers = new HttpHeaders({ 'Authorization': this.token, 'Content-Type': 'application/json' });
				url = this.apiUrl + '' + url;

				this.http.get(url, { headers: headers })
					.subscribe(res => {
						let data = res;
						resolve(data);
					}, (err) => {
						reject(err);
					});
			} else {
				reject('Token not exist');
			}
		});
	}

	create(url, requestData) {
		return new Promise((resolve, reject) => {
			this.token = localStorage.getItem('token');
			if (this.token) {
				let headers = new HttpHeaders({ 'Authorization': this.token, 'Content-Type': 'application/json' });
				url = this.apiUrl + '' + url;

				this.http.post(url,
					requestData,
					{ headers: headers })
					.subscribe(res => {
						let data = res;
						resolve(data);
					}, (err) => {
						reject(err);
					});
			} else {
				reject('Token not exist');
			}
		});
	}

	edit(url) {
		return new Promise((resolve, reject) => {
			this.token = localStorage.getItem('token');
			if (this.token) {
				let headers = new HttpHeaders({ 'Authorization': this.token, 'Content-Type': 'application/json' });
				url = this.apiUrl + '' + url;

				this.http.get(url, { headers: headers })
					.subscribe(res => {
						let data = res;
						resolve(data);
					}, (err) => {
						reject(err);
					});
			} else {
				reject('Token not exist');
			}
		});
	}

	update(url, requestData) {
		return new Promise((resolve, reject) => {
			this.token = localStorage.getItem('token');
			if (this.token) {
				let headers = new HttpHeaders({ 'Authorization': this.token, 'Content-Type': 'application/json' });
				url = this.apiUrl + '' + url;

				this.http.patch(url,
					requestData,
					{ headers: headers })
					.subscribe(res => {
						let data = res;
						resolve(data);
					}, (err) => {
						reject(err);
					});
			} else {
				reject('Token not exist');
			}
		});
	}

	dataWithFile(url, requestData) {
		return new Promise((resolve, reject) => {
			this.token = localStorage.getItem('token');
			if (this.token) {
				let headers = new HttpHeaders({ 'Authorization': this.token });
				url = this.apiUrl + '' + url;

				this.http.post(url,
					requestData,
					{ headers: headers })
					.subscribe(res => {
						let data = res;
						resolve(data);
					}, (err) => {
						reject(err);
					});
			} else {
				reject('Token not exist');
			}
		});
	}

	delete(url) {
		return new Promise((resolve, reject) => {
			this.token = localStorage.getItem('token');
			if (this.token) {
				let headers = new HttpHeaders({ 'Authorization': this.token, 'Content-Type': 'application/json' });
				url = this.apiUrl + '' + url;

				this.http.delete(url, { headers: headers })
					.subscribe(res => {
						let data = res;
						resolve(data);
					}, (err) => {
						reject(err);
					});
			} else {
				reject('Token not exist');
			}
		});
	}
}
