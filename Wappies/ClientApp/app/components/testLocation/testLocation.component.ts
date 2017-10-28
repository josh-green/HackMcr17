import { Component, OnInit } from '@angular/core';


@Component({
    selector: 'testLocation',
    templateUrl: './testLocation.component.html',
    styleUrls: ['./testLocation.component.scss']
})
/** testLocation component*/
export class TestLocationComponent implements OnInit {
    /** testLocation ctor */
    constructor() { }

    locations: string[] = [];

    getLocation(): any {
        if (!this.isAvailable()) {
            console.error('navigator.geolocation is unavailable');
            return;
        }

        navigator.geolocation.getCurrentPosition((position) => {
                this.locations.push(position.coords.latitude + ', ' + position.coords.longitude);

            },
            (err) => {
                console.error('A geolocation error occurred.', err);
            });  
    };

    isAvailable(): boolean {
        return !!('geolocation' in navigator);
    }

    /** Called by Angular after testLocation component initialized */
    ngOnInit(): void { }
}