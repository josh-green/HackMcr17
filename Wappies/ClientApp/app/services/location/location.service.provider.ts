import { LocationService } from './location.service';
import { Http } from '@angular/http';

let locationServiceFactory = (http: Http) => {
    return new LocationService(http);
};

export let locationServiceProvider =
{
    provide: LocationService,
    useFactory: locationServiceFactory,
    deps: [Http]
};
