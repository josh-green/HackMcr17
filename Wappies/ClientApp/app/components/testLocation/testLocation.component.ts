import { Component, OnInit } from '@angular/core';
import { LocationService } from '../../services/location/location.service';


@Component({
    selector: 'testLocation',
    templateUrl: './testLocation.component.html',
    styleUrls: ['./testLocation.component.scss']
})
/** testLocation component*/
export class TestLocationComponent implements OnInit {
    /** testLocation ctor */
    constructor(private locationServ: LocationService) {
        this.locationService = locationServ;
    }

    locationService: LocationService;
    locations: string[] = [];

    getLocation(): any {
        //if (!this.isAvailable()) {
        //    console.error('navigator.geolocation is unavailable');
        //    return;
        //}

        //navigator.geolocation.getCurrentPosition((position) => {
        //        this.locations.push(position.coords.latitude + ', ' + position.coords.longitude);

        //    },
        //    (err) => {
        //        console.error('A geolocation error occurred.', err);
        //    });  


        this.locationService.getLocation().subscribe(
            (position) => {
                this.locations.push(position.coords.latitude + ', ' + position.coords.longitude);
                console.log('from a service!');
            },
            (err) => {
                console.error(err);
            });
    };

    isAvailable(): boolean {
        return !!('geolocation' in navigator);
    }

    logLocation(): any {
        this.locationService.getPosition({}).then((position) => console.log(position)).catch(err => {
            console.error(err);
        });
    }

    /** Called by Angular after testLocation component initialized */
    ngOnInit(): void { }
}