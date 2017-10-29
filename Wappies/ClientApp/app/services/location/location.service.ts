import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class LocationService {

    private baseUrl: string;
    private http: Http;
    private sending: boolean = false;
    private _sendingIntervalHandler: any;
    private reportId: number;

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
        this.getPosition(null).then(position => {
            let postData = {
                ReportID: this.reportId,
                Latitude: position.coords.latitude,
                Longitude: position.coords.longitude
            };
            this.http
                .post(this.baseUrl + 'api/Client/UpdateReport', postData)
                .subscribe((data) => {
                    console.log('http post return: ' + data);
            });
        });
    };

    startSendingLocation(baseUrl: string): any {

        this.baseUrl = baseUrl;
        this.sending = true;
        
        this._getReportId().then(
            (data) => {
                this.reportId = data;
                this._sendingIntervalHandler = setInterval(() => {
                        this.sendLocation();
                    },
                    10000);
            },
            (err) => {
                this.handleError(err);
            });

    };

    _getReportId(): Promise<any> {
        
        const url = this.baseUrl + 'api/Client/InitialiseReport';
        console.info(`Hitting url: ${url}`);

        return this.http
            .get(url)
            .toPromise()
            .then(res => {
                console.log(res.json().reportID);
                return res.json().reportID;
            }).catch(err => console.error(err));
    };

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    };

    stopSendingLocation(): any {
        clearInterval(this._sendingIntervalHandler);

        console.info(`Completing this report...`);
        const url = this.baseUrl + 'api/Client/CompleteReport';

        return this.http
            .get(url)
            .toPromise()
            .then(res => {
                console.log('Report completed');
            }).catch(err => console.error(err));
    };
}