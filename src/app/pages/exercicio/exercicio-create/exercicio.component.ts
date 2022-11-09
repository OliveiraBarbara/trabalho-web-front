import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ExercicioService } from '../exercicio.service';

@Component({
  selector: 'app-exercicio',
  templateUrl: './exercicio.component.html',
  styleUrls: ['./exercicio.component.scss'],
})
export class ExercicioComponent implements OnInit {
  form: FormGroup = new FormGroup({});

  constructor(
    private readonly router: Router,
    private readonly exercicioService: ExercicioService,
    private readonly fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      tipo: [],
      tempo: [],
    });
  }

  save(): void {
    const exercicio = this.form.value;
    this.exercicioService.create(exercicio).subscribe((resp) => {
      this.exercicioService.showMessage('Exercício Cadastrado com Sucesso!');
      this.router.navigate(['/home']);
    });
  }

  cancel(): void {
    this.router.navigate(['/home']);
  }
}
