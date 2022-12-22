import { IMoto } from './IMoto';
import { MotoService } from './moto.service';
import { Component, OnInit } from '@angular/core';
import { finalize, map } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'ApiRequest';

  motos!: IMoto[];
  moto!: IMoto;
  existeId: boolean = false;

  constructor(private motoService: MotoService) {}

  ngOnInit(): void {
    this.obterTodasMotos();
  }

  obterTodasMotos() {
    this.motoService
      .obterTodas()
      .subscribe((response) => (this.motos = response));
  }
  obterSomenteUm() {
    this.motoService
      .obterPorId(8)
      .pipe(finalize(() => (this.existeId = true)))
      .subscribe((response) => {
        this.moto = response;
      });
  }

  adicionarMoto() {
    const moto: IMoto = {
      nome: 'TSW',
      marca: 'Honda',
      id: 0,
    };

    this.motoService
      .adicionar(moto)
      .subscribe((dados:IMoto) => {
        this.motos.push(dados)
        console.log('Adicionou', dados);
      });
  }

  atualizar() {
    const moto: IMoto = {
      id: 1,
      nome: 'Factor-150',
      marca: 'Yamara',
    };

    this.motoService.atualizar(moto)
      .subscribe(
        (response) => {
          console.log(response.id)
          const motoFiltradasId = this.motos.filter((elemento) => elemento.id !== response.id)
          this.motos.push(...motoFiltradasId)
          console.log(this.motos)
        }
      )
  }

  remover() {
    this.motoService.delete(11)
      .subscribe();
  }
}
