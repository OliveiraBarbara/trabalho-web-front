import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(private readonly router: Router) {}

  ngOnInit(): void {}

  menu(): void {
    this.router.navigate(['/home/menu']);
  }

  local(): void {
    this.router.navigate(['/local']);
  }

  pref(): void {
    this.router.navigate(['/preferencia']);
  }

  pessoa(): void {
    this.router.navigate(['/cadastro-cli']);
  }

  exercicio(): void {
    this.router.navigate(['/exercicio']);
  }
}
