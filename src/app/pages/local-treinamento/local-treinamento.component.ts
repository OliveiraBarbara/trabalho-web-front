import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-local-treinamento',
  templateUrl: './local-treinamento.component.html',
  styleUrls: ['./local-treinamento.component.scss'],
})
export class LocalTreinamentoComponent implements OnInit {
  constructor(private readonly router: Router) {}

  ngOnInit(): void {}

  cancel(): void {
    this.router.navigate(['/']);
  }
}
