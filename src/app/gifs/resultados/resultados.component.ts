import { Component, OnInit } from '@angular/core';
import {GifsService} from '../service/gifs.service';
import {Gif} from '../interface/gifs.interface';

@Component({
  selector: 'app-resultados',
  templateUrl: './resultados.component.html',
  styleUrls: ['./resultados.component.css']
})
export class ResultadosComponent implements OnInit {

  get resultados(): Gif[] {
    return this.gifsService.resultados;
  }

  constructor(private gifsService: GifsService) { }

  ngOnInit(): void {
  }

}
