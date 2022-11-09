import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { LocalTreinamento } from 'src/app/models/local-treinamento.model';
import { LocalTreinamentoService } from '../local-treinamento.service';

@Component({
  selector: 'app-local-treinamento',
  templateUrl: './local-treinamento.component.html',
  styleUrls: ['./local-treinamento.component.scss'],
})
export class LocalTreinamentoComponent implements OnInit {
  form: FormGroup = new FormGroup({});

  constructor(
    private readonly router: Router,
    private readonly localTreinamentoService: LocalTreinamentoService,
    private readonly fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      nomeLocal: [],
      valor: [],
      hora: [],
      endereco: [],
      num: [],
      bairro: [],
      complemento: [],
      cep: [],
      cidade: [],
      estado: [],
    });
  }
  save(): void {
    const dados = this.form.value;
    const localTreinamento: LocalTreinamento = {
      ...dados,
      enderecos: [
        {
          rua: dados.endereco,
          num: parseInt(dados.num),
          bairro: dados.bairro,
          complemento: dados.complemento,
          cep: dados.cep,
          cidade: dados.cidade,
        },
      ],
    };
    this.localTreinamentoService.create(localTreinamento).subscribe((resp) => {
      this.localTreinamentoService.showMessage(
        'Local de Treinamento Cadastrado com Sucesso!'
      );
      this.router.navigate(['/home']);
    });
  }

  cancel(): void {
    this.router.navigate(['/']);
  }
}
