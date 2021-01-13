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
    surname: ['', [Validators.required]],
    date: ['', [Validators.required]],
  });

  @ViewChildren(MatExpansionPanel) panels: QueryList<MatExpansionPanel>;
  checkForm(): void {
    let count = 0;
    this.panels.forEach((x) => {
      const fields = Array.from(x._body.nativeElement.children[0].children);
      const invalidField = fields.filter((field) =>
        field.classList.contains('ng-invalid')
      )[0];
      if (invalidField) {
        count += 1;
        this.form.markAllAsTouched();
        x.open();
        if (count === 1) {
          invalidField.scrollIntoView({ block: 'center', behavior: 'smooth' });
        }
      }
    });
  }
}
