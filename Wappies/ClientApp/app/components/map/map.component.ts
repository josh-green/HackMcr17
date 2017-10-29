import { Component, OnInit, Inject } from '@angular/core'; 
import { Http } from '@angular/http';
import * as mapboxgl from 'mapbox-gl';
import { GeoJson, FeatureCollection } from './geoJSON'
import { Subject } from 'rxjs/Rx';

@Component({
    selector: 'map',
    templateUrl: './map.component.html',
    styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
    private baseUrl: string;
    private http: Http;
    private style: string = 'mapbox://styles/mapbox/streets-v9';
    private lat: number = 53.46;
    private lng: number = -2.23;
    private map: any; 
    
    public activeReportsSource;
    public reportLocationsSource;

    constructor(http: Http, @Inject('BASE_URL') baseUrl: string) {
        this.http = http;
        this.baseUrl = baseUrl;
    }

    ngOnInit() {
        this.buildMap();
    }

    private buildMap() {
        let _this = this;

        mapboxgl.accessToken = 'pk.eyJ1IjoiYnJ1ZGRsZXMiLCJhIjoiY2lmOXA1M2hoMDAyaHVja25pYjBnbXl0aCJ9.CT8iLt0HbViwX6ktZhpIzQ';
        this.map = new mapboxgl.Map({
            container: 'mapbox-map',
            style: this.style,
            zoom: 5,
            center: [this.lng, this.lat]
        });

        this.map.on('load', this.onLoadMap.bind(this));

        this.map.on('click', this.onClickMap.bind(this, event))
    }

    private onLoadMap() {
        // register source
        this.map.addSource('activeReports', {
            type: 'geojson',
            data: {
                type: 'FeatureCollection',
                features: [
                    new GeoJson([this.lng, this.lat])]
            }
        });

        // get source
        this.activeReportsSource = this.map.getSource('activeReports');
        this.activeReportsSource.setData(new FeatureCollection(this.getActiveReports()));

        //add layer for active reports
        this.map.addLayer({
            id: 'activeReports',
            source: 'activeReports',
            type: 'symbol',
            layout: {
                'icon-image': 'circle-15',
                'icon-allow-overlap': true
            },
            paint: {
                'icon-color': '#990000'
            }
        });

        this.map.addSource('activeReports', {
            type: 'geojson',
            data: {
                type: 'FeatureCollection',
                features: [
                    new GeoJson([this.lng, this.lat])]
            }
        });

        // get source
        this.reportLocationsSource = this.map.getSource('reportLocations');
        this.reportLocationsSource.setData(new FeatureCollection(this.getActiveReports()));

        //add layer for active reports
        this.map.addLayer({
            id: 'reportLocations',
            source: 'reportLocations',
            type: 'symbol',
            layout: {
                'icon-image': 'circle-15',
                'icon-allow-overlap': true
            },
            paint: {
                'icon-color': '#990000'
            }
        });

        // periodically refresh the active reports store
        setInterval(() => {
            this.activeReportsSource.setData(new FeatureCollection(this.getActiveReports()));
        }, 10000);
    }

    private onClickMap(e) {
        let bbox = [[e.point.x - 5, e.point.y - 5], [e.point.x + 5, e.point.y + 5]],
            activeReportsFeature = this.map.queryRenderedFeatures(bbox, { layers: ['activeReports'] })[0],
            reportLocationsSetIntervalId;

        if (activeReportsFeature) {
            this.map.setLayerProperty('activeReports', 'visibility', 'none');
            //TODO: get data for report locations of clicked feature
            this.activeReportsSource.setData(new FeatureCollection(this.getReportLocations(activeReportsFeature.reportId)));
            reportLocationsSetIntervalId = setInterval(() => {
                this.activeReportsSource.setData(new FeatureCollection(this.getReportLocations(activeReportsFeature.reportId)));
            }, 10000);            
        } else {
            this.map.setLayerProperty('reportLocations', 'visibility', 'none');
            this.map.setLayerProperty('activeReports', 'visibility', 'visible');
            clearInterval(reportLocationsSetIntervalId);
        }
    }

    private getActiveReports(): Array<GeoJson> {
        //TODO: ajax call to Controller for active sos reports
        //TODO: Remove, test code
        let arrGeo: Array<GeoJson> = [];
        for (var i = 0; i < 20; i++) {
            arrGeo.push(new GeoJson([/*lng*/i,/*lat*/i], {reportID: i}))
        }

        //this.http.get(this.baseUrl + 'api/Admin/ActiveReports').subscribe(response => {
        //    JSON.parse(response.json()).forEach(geoJson => {
        //        arrGeo.push(new GeoJson([geoJson['Longitude'], geoJson['Latitude']]));
        //    });
        //});

        return arrGeo;
    }
    
    private getReportLocations(reportId: number) {
        //TODO: for a given user, get historic reports for the current incident

        let arrGeo: Array<GeoJson> = [];
        for (var i = 0; i < 20; i++) {
            arrGeo.push(new GeoJson([/*lng*/-i,/*lat*/i], { reportID: i }))
        }

        //this.http.get(this.baseUrl + 'api/Admin/ReportLocations', {reportID: reportId}).subscribe(response => {
        //    JSON.parse(response.json()).forEach(geoJson => {
        //        arrGeo.push(new GeoJson([geoJson['Longitude'], geoJson['Latitude']]));
        //    });
        //});

        return arrGeo;
    }
}
