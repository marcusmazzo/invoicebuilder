import { Component, Input, OnInit } from '@angular/core';
import { Empresa } from 'src/app/models/empresa';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-relatorio-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor() { }

  @Input() empresa: Empresa;
  @Input() logotipo: SafeUrl;

  ngOnInit(): void {
    
  }

}
