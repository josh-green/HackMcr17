import { Component, OnInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

@Component({
    selector: 'map',
    templateUrl: './map.component.html'
})
export class MapComponent implements OnInit {
    private style: string = 'mapbox://styles/mapbox/streets-v9';
    private lat: number = 53.4808;
    private lng: number = 2.2426;

    public map: any; 

    constructor() {}

    ngOnInit() {
        mapboxgl.accessToken = 'pk.eyJ1IjoiYnJ1ZGRsZXMiLCJhIjoiY2lmOXA1M2hoMDAyaHVja25pYjBnbXl0aCJ9.CT8iLt0HbViwX6ktZhpIzQ';
        this.map = new mapboxgl.Map({
            container: 'mapbox-map',
            style: this.style,
            zoom: 13,
            centre: [this.lng, this.lat]
        });
    }
}
