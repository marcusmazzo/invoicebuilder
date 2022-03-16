import { Component, Input, OnInit } from '@angular/core';
import { Empresa } from 'src/app/models/empresa';

@Component({
  selector: 'app-relatorio-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  constructor() { }

  @Input() empresa: Empresa;
  @Input() contato: Empresa;

  ngOnInit(): void {

  }

}
