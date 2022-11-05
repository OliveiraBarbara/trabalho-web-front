import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.scss'],
})
export class ClienteComponent implements OnInit {
  constructor(private readonly router: Router) {}

  ngOnInit(): void {}

  cancel(): void {
    this.router.navigate(['/']);
  }
}
