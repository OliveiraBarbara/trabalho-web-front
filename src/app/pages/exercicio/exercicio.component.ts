import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-exercicio',
  templateUrl: './exercicio.component.html',
  styleUrls: ['./exercicio.component.scss'],
})
export class ExercicioComponent implements OnInit {
  constructor(private readonly router: Router) {}

  ngOnInit(): void {}

  cancel(): void {
    this.router.navigate(['/']);
  }
}
