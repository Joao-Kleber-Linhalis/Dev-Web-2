import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Titulo } from '../models/titulo';
import { API_CONFIG } from '../config/api.config';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TituloService {


  

  constructor(private http: HttpClient) { }

  findAll(ativo: Boolean){
    if(ativo){
      return this.http.get<Titulo[]>(`${API_CONFIG.baseUrl}/titulos/?status=ativos`)
    }
    else{
      return this.http.get<Titulo[]>(`${API_CONFIG.baseUrl}/titulos/?status=inativos`)
    }
  }

  create(titulo: Titulo):Observable<Titulo> {
    return this.http.post<Titulo>(`${API_CONFIG.baseUrl}/titulos`,titulo)
  }
}