import { Component, QueryList, ViewChildren } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatExpansionPanel } from '@angular/material/expansion';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'expansion-panel';
  constructor(private readonly formBuilder: FormBuilder) {}
  form = this.formBuilder.group({
    name: ['', [Validators.required]],
    age: ['', [Validators.required]],
    surname: [''],
    date: [''],
  });

  @ViewChildren(MatExpansionPanel) panels: QueryList<MatExpansionPanel>;
  checkForm(): void {
    this.panels.forEach((x, index) => {
      if (index === 0 && this.form.get('name').invalid) {
        x.open();
        const formInvalid = document.getElementsByClassName('ng-invalid')[1];
        formInvalid.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }
}
