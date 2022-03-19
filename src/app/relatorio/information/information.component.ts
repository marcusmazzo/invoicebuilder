import { Component, Input, OnInit } from '@angular/core';
import { Item } from 'src/app/models/item';

@Component({
  selector: 'app-relatorio-information',
  templateUrl: './information.component.html',
  styleUrls: ['./information.component.css']
})
export class InformationComponent implements OnInit {

  @Input() information: any = '';
  @Input() itens:  Item[];

  constructor() { }

  ngOnInit(): void {
    

  }

}
