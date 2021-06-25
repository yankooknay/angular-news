import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { News } from '../models/news';
import { NewsService } from '../news.service';

@Component({
  selector: 'app-hacker-news',
  templateUrl: './hacker-news.component.html',
  styleUrls: ['./hacker-news.component.css']
})
export class HackerNewsComponent implements OnInit {

  @ViewChild('virtualscroll') virtualscroll: any | undefined;

  constructor(private newsService: NewsService) { }

  filter: string = '';
  page: number = 1;
  pageSize: number = 10;

  news: News[] = [];
  newsTotal: number = 0;

  ngOnInit(): void {
    this.load();
    this.getNewsTotal();
  }

  // TODO: cover all cases, so the we dont make unnecessary call to the api

  load(): void {
    this.newsService.getNews(this.filter, this.page, this.pageSize).subscribe(news => this.news = [...this.news, ...news]);
  }

  getNewsTotal(): void {
    this.newsService.getNewsTotal(this.filter).subscribe(total => this.newsTotal = total);
  }

  search(): void {
    this.news = [];
    this.page = 1;
    this.getNewsTotal();
    this.load();
  }

  clear(): void {
    this.filter = '';
    this.search();
  }

  onScroll(event: any): void {
    if (this.virtualscroll.getRenderedRange().end == this.pageSize * this.page) {
      this.page++;
      this.load();
      console.log('load');
    }
  }
}
