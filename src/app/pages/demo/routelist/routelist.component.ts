import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { RouteService } from '../../../shared/service/route.service';

@Component({
  selector: 'app-routelist',
  templateUrl: './routelist.component.html',
  styleUrl: './routelist.component.scss'
})
export class RoutelistComponent {
  routes: Routes = [];

  constructor(private routeService: RouteService) {}

  ngOnInit(): void {
    this.routes = this.routeService.getRoutes();
  }
}
