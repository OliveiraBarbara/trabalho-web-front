import { Endereco } from './../../../models/endereco.model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmailValidator, FormBuilder, FormGroup } from '@angular/forms';
import { Cidade } from 'src/app/models/cidade.model';
import { Cliente } from 'src/app/models/cliente.model';
import { Estado } from 'src/app/models/estado.model';
import { CidadeService } from '../../cidade/cidade.service';
import { EstadoService } from '../../estado/estado.service';
import { ClienteService } from '../cliente.service';
import { catchError } from 'rxjs';

@Component({
  selector: 'app-cliente-edit',
  templateUrl: './cliente-edit.component.html',
  styleUrls: ['./cliente-edit.component.scss'],
})
export class ClienteEditComponent implements OnInit {
  id!: number;
  estados: Estado[] = [];
  cidades: Cidade[] = [];
  form: FormGroup = new FormGroup({});
  cliente!: Cliente;
  endereco!: Endereco;

  constructor(
    private readonly router: Router,
    private readonly clienteService: ClienteService,
    private readonly cidadeService: CidadeService,
    private readonly fb: FormBuilder,
    private readonly route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.id = +this.route.snapshot.paramMap.get('id')!;
    this.cidadeService.list().subscribe((resp) => {
      this.cidades = resp;
      this.cidades.sort((a: Cidade, b: Cidade) => a.nome.localeCompare(b.nome));
    });
    this.form = this.fb.group({
      nome: [],
      cpf: [],
      telefone: [],
      email: [],
      endereco: this.fb.group({
        rua: [],
        num: [],
        bairro: [],
        complemento: [],
        cep: [],
        cidade: [],
      }),
    });

    this.clienteService.findById(this.id).subscribe((resp) => {
      this.cliente = resp;

      this.form.patchValue(this.cliente);

      if (this.cliente.enderecos && this.cliente.enderecos[0]) {
        this.form.patchValue({
          endereco: this.cliente.enderecos[0],
        });
      }
    });
  }

  save(): void {
    /*const dados = this.form.value;
    const cliente: Cliente = {
      ...dados,
      enderecos: [
        {
          rua: dados.rua,
          num: parseInt(dados.num),
          bairro: dados.bairro,
          complemento: dados.complemento,
          cep: dados.cep,
          cidade: dados.cidade,
        },
      ],
    };
    this.clienteService.update(this.id, cliente).subscribe((resp) => {
      this.clienteService.showMessage('Cliente Atualizado com Sucesso!');
      this.router.navigate(['/cliente']);
    });*/

    this.form.markAllAsTouched();
    if (this.form.valid) {
      const { endereco, ...dados } = this.form.value;
      const cliente: Cliente = {
        ...dados,
        enderecos: [
          {
            ...endereco,
            num: parseInt(endereco.num),
          },
        ],
      };
      this.clienteService
        .update(this.id, cliente)
        .pipe(
          catchError((err) => {
            this.clienteService.showMessage(
              'Cliente não pode ser atualizado!',
              true
            );
            return err;
          })
        )
        .subscribe((resp) => {
          this.clienteService.showMessage('Cliente Atualizado com Sucesso!');
          this.router.navigate(['/cliente']);
        });
    } else {
      this.clienteService.showMessage(
        'Há campos inválidos no formulário!',
        true
      );
    }
  }

  cancel(): void {
    this.router.navigate(['/cliente']);
  }
}
