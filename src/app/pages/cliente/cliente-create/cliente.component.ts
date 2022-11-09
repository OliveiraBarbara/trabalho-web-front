import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Cidade } from 'src/app/models/cidade.model';
import { Cliente } from 'src/app/models/cliente.model';
import { Estado } from 'src/app/models/estado.model';
import { CidadeService } from '../../cidade/cidade.service';
import { EstadoService } from '../../estado/estado.service';
import { ClienteService } from '../cliente.service';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.scss'],
})
export class ClienteComponent implements OnInit {
  cidades: Cidade[] = [];
  form: FormGroup = new FormGroup({});

  constructor(
    private readonly router: Router,
    private readonly clienteService: ClienteService,
    private readonly cidadeService: CidadeService,
    private readonly fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.cidadeService.list().subscribe((resp) => {
      this.cidades = resp;
      this.cidades.sort((a: Cidade, b: Cidade) => a.nome.localeCompare(b.nome));
    });
    this.form = this.fb.group({
      nome: [null, [Validators.required]],
      cpf: [null, [Validators.required]],
      telefone: [null, [Validators.required]],
      email: [null, [Validators.required]],
      senha: [null, [Validators.required]],
      endereco: [null, [Validators.required]],
      num: [null, [Validators.required]],
      bairro: [null, [Validators.required]],
      complemento: [],
      cep: [null, [Validators.required]],
      cidade: [null, [Validators.required]],
    });
  }

  save(): void {
    const dados = this.form.value;
    const cliente: Cliente = {
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
    this.clienteService.create(cliente).subscribe((resp) => {
      this.clienteService.showMessage('Cliente Cadastrado com Sucesso!');
      this.router.navigate(['/home']);
    });
  }

  cancel(): void {
    this.router.navigate(['/home']);
  }
}
