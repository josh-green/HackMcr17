import { Component, OnInit, Inject } from '@angular/core';
import { LocationService } from '../../services/location/location.service';


@Component({
    selector: 'testLocation',
    templateUrl: './testLocation.component.html',
    styleUrls: ['./testLocation.component.scss']
})
/** testLocation component*/
export class TestLocationComponent implements OnInit {
    /** testLocation ctor */
    constructor(private locationServ: LocationService, @Inject("BASE_URL") baseUrl: string) {
        this.locationService = locationServ;
        this.baseUrl = baseUrl;
    }

    locationService: LocationService;
    baseUrl: string;
    locations: string[] = [];

    getLocation(): any {
        this.locationService.getLocation().subscribe(
            (position) => {
                this.locations.push(position.coords.latitude + ', ' + position.coords.longitude);
                console.log('from a service!');
            },
            (err) => {
                console.error(err);
            });
    };
    
    logLocation(): any {
        this.locationService.getPosition({})
            .then((position) => console.log(position))
            .catch(err => console.error(err));
    };

    startSending(): any {
        this.locationService.startSendingLocation(this.baseUrl);
        console.info('Sending location data!');
    };

    stopSending(): any {
        this.locationService.stopSendingLocation();
        console.info('No longer sending location data!');
    };

    /** Called by Angular after testLocation component initialized */
    ngOnInit(): void { }
}