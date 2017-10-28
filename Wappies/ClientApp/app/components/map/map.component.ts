import { Component, OnInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { GeoJson, FeatureCollection } from './geoJSON'

@Component({
    selector: 'map',
    templateUrl: './map.component.html',
    styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
    private style: string = 'mapbox://styles/mapbox/streets-v9';
    private lat: number = 53.4808;
    private lng: number = 2.2426;
    private map: any; 

    private activeReportsStore: Array<GeoJson>;

    constructor() {
    }

    ngOnInit() {
        this.buildMap();
    }

    private buildMap() {
        mapboxgl.accessToken = 'pk.eyJ1IjoiYnJ1ZGRsZXMiLCJhIjoiY2lmOXA1M2hoMDAyaHVja25pYjBnbXl0aCJ9.CT8iLt0HbViwX6ktZhpIzQ';
        this.map = new mapboxgl.Map({
            container: 'mapbox-map',
            style: this.style,
            zoom: 5,
            center: [this.lng, this.lat]
        });
        
        this.map.on('load', function (e) {
            // register source
            this.map.addSource('activeReports', {
                type: 'geojson',
                data: {
                    type: 'FeatureCollection',
                    features: []
                }
            });

            // get source
            this.source = this.map.getSource('activeReports');

            // subscribe to any changes to the active reports
            this.activeReportsStore.subscribe(activeReportsStore => {
                let data = new FeatureCollection(activeReportsStore)
                this.source.setData(data)
            });

            //add layer for active reports
            this.map.addLayer({
                id: 'activeReports',
                source: 'activeReports',
                type: 'symbol'
            });

            // periodically refresh the active reports store
            setInterval(() => {
                this.activeReportsStore = this.getActiveReports();
            }, 10000);

        });
    }

    private getActiveReports(): Array<GeoJson> {
        //TODO: ajax call to Controller for active sos reports
        //TODO: Remove, test code
        let arrGeo: Array<GeoJson> = [];
        for (var i = 0; i < 20; i++) {
            arrGeo.push(new GeoJson([/*lng*/i,/*lat*/i]))
        }

        return arrGeo;
    }

    private plotMarker(geoJson: GeoJson) {
        //TODO: add geoJSON marker to map
    }

    private getReportLocations(userId: number, reportId: number) {
        //TODO: for a given user, get historic reports for the current incident
    }
}
