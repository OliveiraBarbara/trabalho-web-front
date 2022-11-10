import { AdminService } from './../admin.service';
import { Admin } from './../../../models/admin.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Cidade } from 'src/app/models/cidade.model';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CidadeService } from '../../cidade/cidade.service';

@Component({
  selector: 'app-admin-create',
  templateUrl: './admin-create.component.html',
  styleUrls: ['./admin-create.component.scss'],
})
export class AdminCreateComponent implements OnInit {
  cidades: Cidade[] = [];
  form: FormGroup = new FormGroup({});

  constructor(
    private readonly router: Router,
    private readonly adminService: AdminService,
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
      numReg: [null, [Validators.required]],
      telefone: [null, [Validators.required]],
      email: [null, [Validators.required]],
      senha: [null, [Validators.required]],
      cargo: [null, [Validators.required]],
      formacao: [null, [Validators.required]],
      horaTrabalho: [null, [Validators.required]],
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
    const admin: Admin = {
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
    this.adminService.create(admin).subscribe((resp) => {
      this.adminService.showMessage('Administrador Cadastrado com Sucesso!');
      this.router.navigate(['/admin']);
    });
  }

  cancel(): void {
    this.router.navigate(['/admin']);
  }
}
