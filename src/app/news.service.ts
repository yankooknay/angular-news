import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, asyncScheduler, scheduled } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

import { News } from './models/news';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  constructor(private http: HttpClient) { }

  baseUrl: string = 'https://ynewsapi.azurewebsites.net';

  getNews(filter: string, page: number, pageSize: number) {
    return this.http.get<News[]>(`${this.baseUrl}/hackernews?filter=${filter}&page=${page}&pageSize=${pageSize}`);;
  }

  getNewsTotal(filter: string) {
    return this.http.get<number>(`${this.baseUrl}/hackernews/total?filter=${filter}`);;
  }
}
