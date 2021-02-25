import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Gif, SearchGifsResponse} from '../interface/gifs.interface';
import {ServiceInterface} from '../interface/service.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private servicioInterface: ServiceInterface = {
    url: 'https://api.giphy.com/v1/gifs/',
    apiKey: 'svL0gL5yjz0F17dZmAhnQ6P2xM9UXnvL',
    limit: '10'
  };
  private _historial: string[] = [];
  public resultados: Gif[] = [];

  // Obtengo el historial de gifs que digite el usuario
  get historial(): string[] {
    // Redusco el array a 10 valores
    this._historial = this._historial.splice(0, 10);
    // Retorno los valores de los gifs
    return [...this._historial];
  }

  // Inserta los gif a buscar
  buscarGifs(search: string): void {
    search = search.trim().toLowerCase();
    if (search !== '' && !this._historial.includes(search)) {
      this._historial.unshift(search);
      //guardo en el local storage los gif que he buscado
      localStorage.setItem('historial', JSON.stringify(this._historial));
    }

    const params = new HttpParams()
      .set('api_key', this.servicioInterface.apiKey)
      .set('limit', this.servicioInterface.limit)
      .set('q', search);

    // Obtengo la respuesta de la API
    this.http.get<SearchGifsResponse>(`${ this.servicioInterface.url }search`, { params })
      .subscribe((resp: any) => {
        //console.log(resp.data);
        this.resultados = resp.data;
        localStorage.setItem('resultados', JSON.stringify(this.resultados));
      });
  }

  constructor(private http: HttpClient) {
    //console.log('Gifs service inicializado');
    //si existe en el localStorage la llave me almacenara los valores almacenados en la misma sino almacenara vacio
    this._historial = JSON.parse(localStorage.getItem('historial')!) || [];
    this.resultados = JSON.parse(localStorage.getItem('resultados')!) || [];
  }
}
