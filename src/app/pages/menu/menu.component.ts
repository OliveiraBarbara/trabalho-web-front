import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  constructor(private readonly router: Router) {}

  ngOnInit(): void {}

  cliente(): void {
    this.router.navigate(['/cadastro-cli']);
  }

  instrutor(): void {
    this.router.navigate(['/cadastro-instrutor']);
  }
}