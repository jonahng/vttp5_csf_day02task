import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FormModel } from '../models';

@Component({
  selector: 'app-form',
  standalone: false,
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})
export class FormComponent implements OnInit{


  private fb = inject(FormBuilder)
  protected form!: FormGroup

  ngOnInit(): void {
    this.form = this.createForm()
  }


  protected processForm(){
    const values: FormModel = this.form.value
    console.log("Form Data:  ", values )
  }


  private createForm(): FormGroup{
    const form = this.fb.group({
     name: this.fb.control<string>(''),
     address: this.fb.control<string>(''),
     email: this.fb.control<string>(''),
    deliveryDate: this.fb.control<string>(''),
    urgency: this.fb.control<boolean>(false),

    })
    return form
  }

}
