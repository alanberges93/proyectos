import { Component } from '@angular/core';
import { UrlLocal } from './global/urlLocal';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular';
  urlLocal:UrlLocal;

  constructor(){
    this.urlLocal = new UrlLocal();
  }

  ngOnInit(){
    localStorage.setItem("sesion","");
  }

}
