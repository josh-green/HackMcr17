import { Component } from '@angular/core';
import { mapboxgl } from 'mapbox-gl';

@Component({
    selector: 'map',
    templateUrl: './map.component.html'
})
export class MapComponent {
    public static map: any; 

    constructor() {
        mapboxgl.accessToken = 'pk.eyJ1IjoiYnJ1ZGRsZXMiLCJhIjoiY2lmOXA1M2hoMDAyaHVja25pYjBnbXl0aCJ9.CT8iLt0HbViwX6ktZhpIzQ';
        MapComponent.map = new mapboxgl.Map({
            container: 'mapbox-map',
            style: 'mapbox://styles/mapbox/streets-v9'
        });

    }
}
