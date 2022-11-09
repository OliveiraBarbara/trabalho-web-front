import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Instrutor } from 'src/app/models/instrutor.model';

@Component({
  selector: 'app-instrutor-delete',
  templateUrl: './instrutor-delete.component.html',
  styleUrls: ['./instrutor-delete.component.scss'],
})
export class InstrutorDeleteComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public data: Instrutor) {}

  ngOnInit(): void {}
}
