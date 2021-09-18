import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sobre-mi',
  templateUrl: './sobre-mi.component.html',
  styleUrls: ['./sobre-mi.component.css']
})
export class SobreMiComponent implements OnInit {
  public titulo ="";
  public subtitulo ="";
  public mail = "";

  constructor() { 
    this.titulo = "Alan Berges";
    this.subtitulo = "Analista de sistemas";
    this.mail ="alan.berges93@gmail.com"
  }

  ngOnInit(): void { 
  }

}
