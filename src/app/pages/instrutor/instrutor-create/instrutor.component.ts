import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { EstadoService } from '../../estado/estado.service';
import { Cidade } from 'src/app/models/cidade.model';
import { Estado } from 'src/app/models/estado.model';
import { Instrutor } from 'src/app/models/instrutor.model';
import { CidadeService } from '../../cidade/cidade.service';
import { InstrutorService } from '../instrutor.service';

@Component({
  selector: 'app-instrutor',
  templateUrl: './instrutor.component.html',
  styleUrls: ['./instrutor.component.scss'],
})
export class InstrutorComponent implements OnInit {
  estados: Estado[] = [];
  cidades: Cidade[] = [];
  form: FormGroup = new FormGroup({});

  constructor(
    private readonly router: Router,
    private readonly estadoService: EstadoService,
    private readonly instrutorService: InstrutorService,
    private readonly cidadeService: CidadeService,
    private readonly fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.estadoService.list().subscribe((resp) => {
      this.estados = resp;
      this.estados.sort((a: Estado, b: Estado) =>
        a.sigla.localeCompare(b.sigla)
      );
    });
    this.cidadeService.list().subscribe((resp) => {
      this.cidades = resp;
      this.cidades.sort((a: Cidade, b: Cidade) => a.nome.localeCompare(b.nome));
    });
    this.form = this.fb.group({
      nome: [],
      cref: [],
      telefone: [],
      email: [],
      senha: [],
      endereco: [],
      num: [],
      bairro: [],
      complemento: [],
      cep: [],
      cidade: [],
      modalidade: [],
    });
  }

  save(): void {
    const dados = this.form.value;
    const instrutor: Instrutor = {
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
    this.instrutorService.create(instrutor).subscribe((resp) => {
      this.instrutorService.showMessage('Instrutor Cadastrado com Sucesso!');
      this.router.navigate(['/home']);
    });
  }

  cancel(): void {
    this.router.navigate(['/home']);
  }
}
