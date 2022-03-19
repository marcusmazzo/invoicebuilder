import { Component, OnInit } from '@angular/core';
import { EmpresaService } from '../services/empresa.service';
import { User } from '../users/user';
import { Empresa } from '../models/empresa';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Pedido } from '../models/pedido';
import { Cliente } from '../models/cliente';
import { Item } from '../models/item';
import { Produto } from '../models/produto';
import * as Editor from '../editor/build/ckeditor';



@Component({
  selector: 'app-empresa',
  templateUrl: './empresa.component.html',
  styleUrls: ['./empresa.component.css']
})
export class EmpresaComponent implements OnInit {

  public Editor = Editor;

  loading: boolean
  pedido: Pedido;
  empresa: Empresa;
  contato: Empresa;
  files: FileList;
  logotipo: SafeUrl;
  htmlContent: any = '';
  htmlContentRecibo: any = ''
  now: Date
  information: any = '';
  


  constructor(private service: EmpresaService, private sanitizer: DomSanitizer) { 
    this.empresa = new Empresa();
    this.contato = new Empresa();
    
    this.empresa.user = new User();
    this.contato.user = new User();
    
  }

  ngOnInit(): void {
    this.loading = true;
    this.now = new Date();
    this.find();
    this.mock()
   
  }

  find() {
    this.service.findByToken().subscribe( response => {
      localStorage.setItem("empresa", JSON.stringify(response));
      this.empresa = response;
      this.contato = response;
      this.logotipo = this.sanitizer.bypassSecurityTrustUrl('data:image/jpeg;base64,'+this.empresa.logotipoBase64 as string);
      this.htmlContent = this.empresa.informacoes;
      this.htmlContentRecibo = this.empresa.textoRecibo;
      this.information = this.sanitizer.bypassSecurityTrustHtml(this.empresa.informacoes as string)
      this.loading = false;
    })
  }

  saveContato() {
    this.service.save(this.contato).subscribe(response => this.ngOnInit());
  }

  saveOutrasInformacoes() {
    this.service.save(this.empresa).subscribe(response => this.ngOnInit());
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

  saveRecibo() {
    this.service.saveRecibo(this.htmlContentRecibo).subscribe(response => this.ngOnInit());
  }

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

  mock() { 
    console.log("mock");
    
    this.pedido = new Pedido();
    this.pedido.cliente = new Cliente();
    this.pedido.cliente.nome = "Cliente Teste";
    this.pedido.cliente.endereco = "Endereço Teste"

    this.pedido.numeroPedido = new String("1/"+new Date().getFullYear().toString());
    let item: Item = new Item();
    let produto: Produto = new Produto(); 
    produto.descricao = "Janela"

    item.altura = 0.90;
    item.largura = 0.90;
    item.produto = produto.descricao;
    item.quantidade = 1;
    item.valorVenda = 10;
    item.totalItem = 100;

    this.pedido.itens = []
    this.pedido.itens.push(item);
    this.pedido.valorTotalPedido = 100;
    this.pedido.valorTotalIva = this.pedido.valorTotalPedido * (1+(this.empresa.percentualIva/100));
  }

  public config = {
    toolbar: {
      items: [
        'heading',
        '|',
        'removeFormat',
        '|',
        'fontSize',
        'fontBackgroundColor',
        'fontFamily',
        '|',
        'bold',
        'italic',
        'underline',
        'strikethrough',
        'superscript',
        'subscript',
        'specialCharacters',
        'alignment',
        '|',
        'bulletedList',
        'numberedList',
        'todoList',
        '|',
        'pageBreak',
        'horizontalLine',
        '|',
        'outdent',
        'indent',
        '|',
        'link',
        'imageInsert',
        'imageUpload',
        'blockQuote',
        'insertTable',
        'mediaEmbed',
        'undo',
        'redo',
        '|'
      ]
    },
    language: 'pt',
    image: {
      toolbar: [
        'imageTextAlternative',
        'imageStyle:inline',
        'imageStyle:block',
        'imageStyle:side'
      ]
    },
    table: {
      contentToolbar: [
        'tableColumn',
        'tableRow',
        'mergeTableCells',
        'tableCellProperties',
        'tableProperties'
      ]
    }
  };

}
