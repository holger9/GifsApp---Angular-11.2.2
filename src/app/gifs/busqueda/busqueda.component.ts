import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {GifsService} from '../service/gifs.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styleUrls: ['./busqueda.component.css']
})
export class BusquedaComponent implements OnInit {

  @ViewChild('txtBuscar') txtBuscar!: ElementRef<HTMLInputElement>;

  constructor(private gifsService: GifsService) { }

  ngOnInit(): void { }

  buscar(): void {
    // Obtengo el valor del campo a buscar
    const valor = this.txtBuscar.nativeElement.value;
    // Inserto el valor haciendo uso del servicio
    this.gifsService.buscarGifs(valor);
    // Seteo el valor del campo a buscar
    this.txtBuscar.nativeElement.value = '';
  }

}
