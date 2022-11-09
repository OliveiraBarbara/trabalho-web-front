import { Cliente } from 'src/app/models/cliente.model';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-cliente-delete',
  templateUrl: './cliente-delete.component.html',
  styleUrls: ['./cliente-delete.component.scss'],
})
export class ClienteDeleteComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public data: Cliente) {}

  ngOnInit(): void {}
}
