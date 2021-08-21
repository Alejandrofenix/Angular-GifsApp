import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SearchGifsResponse, Gif } from '../interfaces/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private _apiKey: string = '31eGRaf5mW32M2qpJ5cctd8Gcqy5WY4B'
 
  private _historial: string[]=[];

  //TODO: Cambiar any por su tipo correspondiente
  public resultados : Gif[]=[];


  get historial (){
    return [...this._historial];
  }
  
  constructor(private http:HttpClient){

  }
  buscarGifs(query:string=''){
    query=query.trim().toLowerCase();
    if(query.trim().length==0)return;
    
    if(!this._historial.includes(query)) this._historial.unshift(query);
    this._historial = this._historial.splice(0,10);

    this.http.get<SearchGifsResponse>(`https://api.giphy.com/v1/gifs/search?api_key=${this._apiKey}&q=${query}&limit=10`)
      .subscribe( (resp) =>{
        console.log(resp.data);
        this.resultados= resp.data;
      });
  

  }


}
