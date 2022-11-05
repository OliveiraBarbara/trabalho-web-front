import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-instrutor',
  templateUrl: './instrutor.component.html',
  styleUrls: ['./instrutor.component.scss'],
})
export class InstrutorComponent implements OnInit {
  constructor(private readonly router: Router) {}

  ngOnInit(): void {}

  cancel(): void {
    this.router.navigate(['/']);
  }
}
