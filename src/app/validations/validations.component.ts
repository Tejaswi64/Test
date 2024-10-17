import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule} from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-validations',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './validations.component.html',
  styleUrl: './validations.component.css'
})
export class ValidationsComponent {
  form: FormGroup;
  options: string[] = ['Male, Female'];
  radioOptions: string[] =['Option1, Option2']

  constructor(private fb:FormBuilder){
    this.form = this.fb.group({
      inputField: ['', [Validators.required]],
      description: ['', [Validators.required]],
      selectedOption: ['', [Validators.required]],
      radioOption: ['', [Validators.required]],
      checkbox: [false, [Validators.requiredTrue]],

  });

  }
  ngOnInit(): void {}
  OnSubmit(){
    if(this.form.valid){
      console.log('Form Submitted:', this.form.value);
    }
    else {
      console.error('Form is invalid');
    }
  }

}
