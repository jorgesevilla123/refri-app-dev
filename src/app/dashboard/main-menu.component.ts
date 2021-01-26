import { Component } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { InventoryService } from "../services/inventory.service";

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.css']
})
export class MainMenuComponent {
  response: string
  /** Based on the screen size, switch from standard to one column per row */
  cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return [
          { title: 'Inventario', subtitle: 'Costo de productos y panel de control para los productos', 
          cols: 2, rows: 1, id: "inventario", route: 'inventory', icon_1: 'create', icon_2: 'store',  button_1: 'Editar inventario', button_2: 'Ver inventario'  },

          { title: 'Punto de venta', subtitle: 'Productos, precios unitarios y todos los datos sobre productos', 
          cols: 2, rows: 1, id: "pos", route: 'point-of-sale', icon_1: 'payment', icon_2: 'shopping_basket',  button_1: 'Punto de ventas', button_2: 'Ver ventas' },

          { title: 'Busqueda', subtitle:'Busqueda de productos', cols: 2, rows: 1,
           id: "busqueda", route: 'products-search', icon_1: 'search', icon_2: 'search menu_book',  button_1: 'Busqueda especifica', button_2: 'Busqueda por nombre' },

          { title: 'Configuraciones', subtitle: 'Cotizacion del dolar y otras configuraciones', cols: 2, rows: 1, 
          id: "config", route: 'configurations', icon_1: 'settings', icon_2: 'settings flash_on', button_1: 'Configurar negocio', button_2: 'configuracion rapida' }
        ];
      }

      return [
        { title: 'Inventario', subtitle: 'Costo de productos y panel de control para los productos', cols: 1, rows: 1,
         id: "inventario", route_1: 'inventory', route_2: 'edit-inventory', button_1: 'Editar inventario', button_2: 'Ver inventario', icon_1: 'create', icon_2: 'store' },

        { title: 'Punto de ventas', subtitle: 'Productos, precios unitarios y todos los datos sobre productos', cols: 1, rows: 1, 
        id: "pos", route_1: 'point-of-sale', route_2: 'sales', button_1: 'Ingresar al punto de ventas', button_2: 'Ver ventas', icon_1: 'payment', icon_2: 'shopping_basket' },

        { title: 'Busqueda', cols: 1, subtitle:'Busqueda de productos', rows: 1, id: "busqueda",  route_1: 'products-search',
        route_2: 'search-by-specification', button_1: 'Busqueda especifica', button_2: 'Busqueda por nombre', icon_1: 'search', icon_2: 'search menu_book' },

        { title: 'Configuraciones', subtitle: 'Cotizacion del dolar y otras configuraciones', cols: 1, rows: 1,
         id: "config", route_1: 'configurations', route_2: 'quick-configurations', button_1: 'Configuracion del negocio', button_2: 'configuracion rapida', icon_1: 'settings', icon_2: 'settings flash_on'  }
      ];
    })
  );

  constructor(private breakpointObserver: BreakpointObserver,
            public inventoryService: InventoryService
    ) {}


  getApi() {
    this.inventoryService.testToApi().subscribe(
      res => this.response = res.message
    )
  }
}
