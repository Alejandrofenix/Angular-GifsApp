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
    //En caso de ser null el valor en el local storage nos regresara un arreglo vacio en lugar de un nulls
    this._historial=JSON.parse(localStorage.getItem('historial')!)|| [];
    this.resultados=JSON.parse(localStorage.getItem('ultimaBusqueda')!)|| [];
    
  }
  //Metodo que nos permite consumir el servicio de la API de giphy
  //para obtener los giphy correspondientes al query
  buscarGifs(query:string=''){
    query=query.trim().toLowerCase();
    //Si viene vacio el query lanza un return
    if(query.trim().length==0)return;
    
    //Metodo para validar que no este se ingresen duplicados al historial
    if(!this._historial.includes(query)) this._historial.unshift(query);
    this._historial = this._historial.splice(0,10);

    //Guardar los datos en LocalStorage
    localStorage.setItem('historial', JSON.stringify(this._historial));
    
    this.http.get<SearchGifsResponse>(`https://api.giphy.com/v1/gifs/search?api_key=${this._apiKey}&q=${query}&limit=10`)
    .subscribe( (resp) =>{
      console.log(resp.data);
      this.resultados= resp.data;
      localStorage.setItem('ultimaBusqueda', JSON.stringify(this.resultados));
    });
    

  }


}
