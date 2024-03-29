
import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import { Observable } from "rxjs/Observable";


import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';

@Injectable()
export class SearchService {
    /*baseUrl: string = 'https://maps.googleapis.com/maps/api/place/autocomplete/json';
    queryUrl: string = '?input=';
    endUrl: string = '&types=geocode&key=AIzaSyBVZG5wJkCc2VhaxrxAVBMPkqGPAxWouPg';*/

    baseUrl: string = 'https://api.openweathermap.org/data/2.5/weather';
    queryUrl: string = '?q=';
    endUrl: string = '&units=metric&appid=3af54b2f2fa82b7fc7d45808fc626c2e';
    apikey = '3af54b2f2fa82b7fc7d45808fc626c2e';
    constructor(private http: Http) {}

        search(terms: Observable<string>) {
            return terms.debounceTime(400)
                .distinctUntilChanged()
                .switchMap(term => this.searchEntries(term));
        }

        searchEntries(term) {
            return this.http
                .get(this.baseUrl + this.queryUrl + term + this.endUrl)
                .map(res => res.json());
        }


}

