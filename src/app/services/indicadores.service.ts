import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',

})
export class IndicadoresService {



  constructor(
    private _http : HttpClient
  ) { }


  public listarIndicadores(): Observable<any[]> {
    const endopoint = `${environment.apiUrl}v1/indicadores`
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this._http.get<any[]>(endopoint,{headers})
  }

  public crearIndicador(indicador: any): Observable<any[]> {
    const endopoint = `${environment.apiUrl}v1/indicadores`
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this._http.post<any[]>(endopoint, indicador, {headers})
  }

  public elimininarIndicador(indicador: any): Observable<any> {
    const endopoint = `${environment.apiUrl}v1/indicadores`
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this._http.delete<any>(endopoint, {headers, body:{...indicador}})
  }



  public actualizarIndicador(indicador: any): Observable<any[]> {
    const endopoint = `${environment.apiUrl}v1/indicadores`
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this._http.put<any[]>(endopoint, indicador, {headers})
  }

  public listarUnidadesMedida(): Observable<any[]> {
    const endopoint = `${environment.apiUrl}v1/unidadesMedidas`
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this._http.get<any[]>(endopoint, {headers})
  }




}
