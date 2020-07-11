
import { Component } from "@angular/core";
import { SearchService } from "./search.service";
import { Http, Response } from "@angular/http";
import { RouterModule, Routes, ActivatedRoute, Router } from '@angular/router';

import 'rxjs/add/operator/map';

@Component({
    selector: 'search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.css']
})
export class SearchComponent {
    private apiSearchCityUrl;
    dataSearchCity: any = {};

    constructor(
        private http: Http,
        private router: Router
    ) {

    }

    cityValue = '';

    onEnter(value: string) {
        this.cityValue = value;
        console.log(this.cityValue);
        this.router.navigate(['./city-name/'+this.cityValue]);
    }



}
