import { Component, OnInit, Inject  } from '@angular/core'; 
import { Http } from '@angular/http';
import * as mapboxgl from 'mapbox-gl';
import { GeoJson, FeatureCollection, GeoJsonLine } from './geoJSON'
import { Subject, Observable } from 'rxjs/Rx';

@Component({
    selector: 'map',
    templateUrl: './map.component.html',
    styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
    private baseUrl: string;
    private http: Http;
    private style: string = 'mapbox://styles/mapbox/dark-v9';
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

        this.map.on('click', this.onClickMap.bind(this));
    }

    private onLoadMap() {
        this.onLoadMap_ActiveReports();
        this.onLoadMap_ReportLocations();
        
        // periodically refresh the active reports store
        setInterval(() => {
            this.getActiveReports();
        }, 10000);
    }

    private onLoadMap_ActiveReports() {
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
        this.getActiveReports();

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
                'icon-color': '#F00'
            }
        });
    }

    private onLoadMap_ReportLocations() {
        this.map.addSource('reportLocations', {
            type: 'geojson',
            data: {
                type: 'FeatureCollection',
                features: []
            }
        });

        // get source
        this.reportLocationsSource = this.map.getSource('reportLocations');

        //add layer for active reports
        this.map.addLayer({
            id: 'reportLocations',
            source: 'reportLocations',
            type: 'line',
            "layout": {
                "line-join": "round",
                "line-cap": "butt"
            },
            "paint": {
                "line-color": "#F00",
                "line-width": 2
            }
        });}

    private onClickMap(e) {
        let bbox = [[e.point.x - 50, e.point.y - 50], [e.point.x + 50, e.point.y + 50]],
            activeReportsFeature = this.map.queryRenderedFeatures(bbox, { layers: ['activeReports'] })[0],
            reportLocationsSetIntervalId;

        if (activeReportsFeature) {
            this.map.setLayoutProperty('activeReports', 'visibility', 'none');
            this.map.setLayoutProperty('reportLocations', 'visibility', 'visible');
            this.getReportLocations(activeReportsFeature.properties.reportId);
            reportLocationsSetIntervalId = setInterval(() => {
                this.getReportLocations(activeReportsFeature.properties.reportId);
            }, 10000);            
        } else {
            this.map.setLayoutProperty('reportLocations', 'visibility', 'none');
            this.map.setLayoutProperty('activeReports', 'visibility', 'visible');
            clearInterval(reportLocationsSetIntervalId);
        }
    }

    private getActiveReports(): any {
        this.http.get(this.baseUrl + 'api/Admin/ActiveReports').subscribe(response => {
            let arrGeo: Array<GeoJson> = [];

            response.json().forEach(geoJson => {
                arrGeo.push(new GeoJson([geoJson['longitude'], geoJson['latitude']], { reportId: geoJson['reportID'] }));
            });

            this.activeReportsSource.setData(new FeatureCollection(arrGeo));
        });
    }
    
    private getReportLocations(reportId: number) {

        this.http.get(this.baseUrl + 'api/Admin/ReportLocations/' + reportId).subscribe(response => {
            let arrGeo: Array<GeoJson> = [],
                arrCoords: Array<Array<number>> = [];

            response.json().forEach(geoJson => {
                arrCoords.push([geoJson['longitude'], geoJson['latitude']]);
            });

            arrGeo.push(new GeoJsonLine(arrCoords));

            this.reportLocationsSource.setData(new FeatureCollection(arrGeo));
        });

    }
}
