import { LocationService } from './location.service';

let locationServiceFactory = () => {
    return new LocationService();
};

export let locationServiceProvider =
{
    provide: LocationService,
    useFactory: locationServiceFactory,
    deps: []
};
