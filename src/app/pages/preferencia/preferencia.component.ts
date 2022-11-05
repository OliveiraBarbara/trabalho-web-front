import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-preferencia',
  templateUrl: './preferencia.component.html',
  styleUrls: ['./preferencia.component.scss'],
})
export class PreferenciaComponent implements OnInit {
  constructor(private readonly router: Router) {}

  ngOnInit(): void {}

  cancel(): void {
    this.router.navigate(['/']);
  }
}
