
import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
})
export class SearchComponent {
  //El signo de ! es el not null assertion operator lo cual nos permitira decirle a
  //typescript que ese valor nunca sera null
  @ViewChild('txtBuscar') txtBuscar!: ElementRef<HTMLInputElement>;

  constructor(private gifsService :GifsService){

  }

  buscar() {
    const valor = this.txtBuscar.nativeElement.value;

    this.gifsService.buscarGifs(valor);
    this.txtBuscar.nativeElement.value='';
    
  }
}
