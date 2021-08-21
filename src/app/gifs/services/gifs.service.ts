import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SearchGifsResponse, Gif } from '../interfaces/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private _apiKey: string = '31eGRaf5mW32M2qpJ5cctd8Gcqy5WY4B'
  private servicioUrl:string = 'https://api.giphy.com/v1/gifs'
  private _historial: string[] = [];

  //TODO: Cambiar any por su tipo correspondiente
  public resultados: Gif[] = [];


  get historial() {
    return [...this._historial];
  }

  constructor(private http: HttpClient) {
    //En caso de ser null el valor en el local storage nos regresara un arreglo vacio en lugar de un nulls
    this._historial = JSON.parse(localStorage.getItem('historial')!) || [];
    this.resultados = JSON.parse(localStorage.getItem('ultimaBusqueda')!) || [];

  }
  //Metodo que nos permite consumir el servicio de la API de giphy
  //para obtener los giphy correspondientes al query
  buscarGifs(query: string = '') {
    query = query.trim().toLowerCase();
    //Si viene vacio el query lanza un return
    if (query.trim().length == 0) return;

    //Metodo para validar que no este se ingresen duplicados al historial
    if (!this._historial.includes(query)) this._historial.unshift(query);
    this._historial = this._historial.splice(0, 10);

    //Guardar los datos en LocalStorage
    localStorage.setItem('historial', JSON.stringify(this._historial));

    const params = new HttpParams()
      .set('api_key', this._apiKey).set('limit', '10').set('q', query);

    this.http.get<SearchGifsResponse>(`${this.servicioUrl}/search`,{params})
      .subscribe((resp) => {
        this.resultados = resp.data;
        localStorage.setItem('ultimaBusqueda', JSON.stringify(this.resultados));
      });


  }


}
