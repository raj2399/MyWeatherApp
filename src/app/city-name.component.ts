
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location }                 from '@angular/common';
import { RouterModule, Routes } from "@angular/router";
import { Http, Response } from "@angular/http";

import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';

@Component({
  selector: 'city-name',
  templateUrl: './city-name.component.html',
  styleUrls: ['./city-name.component.css']
})
export class CityNameComponent {

    private apiCityUrl;
    dataCity: any = {};

    constructor(
        private http: Http,
        private location: Location,
        private route: ActivatedRoute
    ) {
        console.log('Sad ce city name data ...');
        this.route.params.subscribe( params =>  this.getCityForecast(params['name']));
        this.getCityTest();
        this.getCityData();
    }

    getCityForecast(cityName) {
        console.log(cityName);
        this.apiCityUrl = 'https://api.openweathermap.org/data/2.5/forecast?q=' + cityName + '&units=metric&appid=3af54b2f2fa82b7fc7d45808fc626c2e';
    }

    getCityData() {
        return this.http.get(this.apiCityUrl)
            .map((res: Response) => res.json())
    }

    getCityTest() {
        this.getCityData().subscribe(dataCity => {
            console.log(dataCity);
            this.dataCity = dataCity;
        })
    }


    goBack(): void {
        this.location.back();
    }

}


