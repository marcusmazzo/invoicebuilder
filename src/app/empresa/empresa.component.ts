import { Component, OnInit } from '@angular/core';
import { EmpresaService } from '../services/empresa.service';
import { User } from '../users/user';
import { Empresa } from '../models/empresa';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { AngularEditorConfig } from '@kolkov/angular-editor';

@Component({
  selector: 'app-empresa',
  templateUrl: './empresa.component.html',
  styleUrls: ['./empresa.component.css']
})
export class EmpresaComponent implements OnInit {

  loading: boolean
  empresa: Empresa;
  contato: Empresa;
  files: FileList;
  logotipo: SafeUrl;
  htmlContent: any = '';


  constructor(private service: EmpresaService, private sanitizer: DomSanitizer) { 
    this.empresa = new Empresa();
    this.contato = new Empresa();
    
    this.empresa.user = new User();
    this.contato.user = new User();
    
  }

  ngOnInit(): void {
    this.loading = true;
    this.find();
  }

  find() {
    this.service.findByToken().subscribe( response => {
      this.empresa = response;
      this.contato = response;
      this.logotipo = this.sanitizer.bypassSecurityTrustUrl('data:image/jpeg;base64,'+this.empresa.logotipoBase64 as string);
      this.htmlContent = this.empresa.informacoes;
      this.loading = false;
    })
  }

  saveContato() {
    this.service.save(this.contato).subscribe(response => this.ngOnInit());
  }

  onSubmit(){
    this.service.save(this.empresa).
      subscribe(response => {
        this.empresa = response
      } , errorResponse => {
        console.log(errorResponse);
      }
    );
  }

  prepareUpload(files: FileList){
    this.files = files;
  }

  upload() {
    this.service.upload(this.files).subscribe(
      event => {
          this.ngOnInit();
      }
    );
  }
  saveInformation() {
    this.service.saveInformation(this.htmlContent).subscribe(response => this.ngOnInit());
  }

  config: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    sanitize: false, 
    height: '15rem',
    minHeight: '5rem',
    placeholder: 'Insira a descrição aqui...',
    translate: 'no',
    defaultParagraphSeparator: 'p',
    defaultFontName: 'Arial',
    toolbarHiddenButtons: [
      ['bold']
      ],
    customClasses: [
      {
        name: "quote",
        class: "quote",
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: "titleText",
        class: "titleText",
        tag: "h1",
      },
    ]
  };

  ngAfterViewChecked() {
    this.replaceFontAwesomeIcons('fa-scissors',  'fa-cut');
    this.replaceFontAwesomeIcons('fa-files-o',  'fa-copy');
    this.replaceFontAwesomeIcons('fa-repeat',  'fa-redo');
    this.replaceFontAwesomeIcons('fa-picture-o',  'fa-image');
    this.replaceFontAwesomeIcons('fa-video-camera',  'fa-video');
    this.replaceFontAwesomeIcons('fa-remove',  'fa-times');
    this.replaceFontAwesomeIcons('fa-chain-broken',  'fa-unlink');
  }

private replaceFontAwesomeIcons(currentClassName: string, newClassName: string) {
    const icons = document.getElementsByClassName(currentClassName);
    for (let i = 0; i < icons.length; i++) {
      icons.item(i).classList.add(newClassName);
      icons.item(i).classList.remove(currentClassName);
    }
  }

}
