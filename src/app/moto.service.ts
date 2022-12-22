import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_PATH } from 'src/environment/environment';
import { IMoto } from './IMoto';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MotoService {

  constructor(private httpClient: HttpClient) { }

  obterTodas(): Observable<IMoto[]> {
    return this.httpClient.get<IMoto[]>(`${API_PATH}Motos`);
  }

  obterPorId(id: number): Observable<IMoto>{
    return this.httpClient.get<IMoto>(`${API_PATH}Motos/${id}`);
  }

  adicionar(moto: IMoto): Observable<IMoto>{
    return this.httpClient.post<IMoto>(`${API_PATH}Motos`, moto);
  }

  atualizar(moto: IMoto): Observable<IMoto>{
    return this.httpClient.put<IMoto>(`${API_PATH}Motos/${moto.id}`, moto);
  }

  delete(motoId: number){
    return this.httpClient.delete(`${API_PATH}motos/${motoId}`);
  }
}

