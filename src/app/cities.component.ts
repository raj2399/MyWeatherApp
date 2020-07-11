
import { Component, OnInit } from '@angular/core';
import { RouterModule, Routes, ActivatedRoute } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { Http, Response } from "@angular/http";
import { Chart } from 'chart.js';

import 'rxjs/add/operator/map';

@Component({
  selector: 'cities',
  templateUrl: './cities.component.html',
  styleUrls: ['./cities.component.css']
})
export class CitiesComponent {
  countryName; population; coordinates; dateTime; tempMax; tempMin; humidity; pressure; seaLevel; groundLevel; temp; chart = []; weather; weatherDesc; windDeg; windSpeed; date;



  private apiUrl = 'https://api.openweathermap.org/data/2.5/group?id=1279233,1275339,1277333,1275004,1273294&units=metric&appid=3af54b2f2fa82b7fc7d45808fc626c2e';
  data: any = {};

  private apiurl2='http://api.openweathermap.org/data/2.5/forecast?q=ahmedabad&appid=3af54b2f2fa82b7fc7d45808fc626c2e';

  constructor(private http: Http) {
    this.chartload();
    this.chartdata()
    this.getTest();
    this.getData();
  }


  chartload(){


    return this.http.get(this.apiurl2)
    .map((res: Response) => res.json())
  }

  chartdata()
  {

    this.chartload().subscribe(result => {

      console.log(result);
      let countryName = result["city"].name;
      let population = result["city"].population;
      let coordinates = `${result["city"].coord.lat} ${result["city"].coord.lon}`;
      let temp_max = result["list"].map(res => res.main.temp_max);
      let temp_min = result["list"].map(res => res.main.temp_min);
      let humidity = result["list"][0].main.humidity;
      let pressure = result["list"][0].main.pressure;
      let seaLevel = result["list"][0].main.sea_level;
      let groundLevel = result["list"][0].main.grnd_level;
      let temp = result["list"][0].main.temp;
      let weatherDates = result["list"].map(res => res.dt_txt);
      let date = result["list"][0].dt_txt;
      let weather = result["list"][0].weather[0].main;
      let weatherDesc = result["list"][0].weather[0].description;
      let windDeg = result["list"][0].wind.deg;
      let windSpeed = result["list"][0].wind.speed;

      this.chart = new Chart('canvas', {
        type: 'line',
        data: {
          labels: weatherDates,
          datasets: [
            {
              data: temp_max,
              borderColor: '#3cba9f',
              fill: false
              // blue color
            },
            {
              data: temp_min,
              borderColor: '#ffcc00',
              fill: false
            }
          ]
        },
        options: {
          legend: {
            display: false
          },
          scales: {
            xAxes: [{
              display: true
            }],
            yAxes: [{
              display: true
            }]
          }
        }
      })

    })

  }



  getData() {
    return this.http.get(this.apiUrl)
      .map((res: Response) => res.json())

  }

  getTest() {
    this.getData().subscribe(data => {
      console.log(data);
      this.data = data;
    })
  }
}

