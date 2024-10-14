import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',

})
export class IndicadoresService {



  constructor(
    private _http : HttpClient
  ) { }


  public listarIndicadores(): Observable<any[]> {
    const endopoint = `v1/indicadores`
    return this._http.get<any[]>(endopoint)
  }

  public crearIndicador(indicador: any): Observable<any[]> {
    const endopoint = `v1/indicadores`
    return this._http.post<any[]>(endopoint, indicador)
  }

  public elimininarIndicador(indicador: any): Observable<any> {
    const endopoint = `v1/indicadores`
    return this._http.delete<any>(endopoint, indicador)
  }

  public actualizarIndicador(indicador: any): Observable<any[]> {
    const endopoint = `v1/indicadores`
    return this._http.put<any[]>(endopoint, indicador)
  }

  public listarUnidadesMedida(): Observable<any[]> {
    const endopoint = `v1/unidadesMedidas`
    return this._http.get<any[]>(endopoint)
  }




}
