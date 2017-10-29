import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { Http } from '@angular/http';

@Injectable()
export class LocationService {

    private http: Http;

    constructor(http: Http) {
        this.http = http;
        let dt = new Date();
        console.log(`Location injected at ${dt.getMinutes() + ':' + dt.getSeconds()}!`);
    }

    getLocation(): Observable<any> {

        return new Observable<any>((responseObserver: Observer<any>) => {
                if (!this.isAvailable()) {
                    return responseObserver.error('Geolocation is not available on this device.');
                }

                this.getPosition(null).then(position => {
                    responseObserver.next(position);
                    responseObserver.complete();
                }).catch(err => {
                    responseObserver.error(err);
                });
            });
        
    };

    isAvailable(): boolean {
        return !!('geolocation' in navigator);
    };

    getPosition(options): Promise<any> {
        return new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject, options);
        });
    };

    sendLocation(): any {
        this.http.post('/', {}).subscribe((data) => {
            console.log('http post return: ' + data);
        });
    }
}