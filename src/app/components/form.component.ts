import { Component, inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  protected orders!: FormArray
  protected toShow = true

  ngOnInit(): void {
    this.form = this.createForm()
  }


  protected processForm(){
    const values: FormModel = this.form.value
    console.log("Form Data:  ", values )
  }

  protected addOrder(){
    const order = this.createOrder()
    this.orders.push(order)
  }

  protected removeOrder(idx: number){
    this.orders.removeAt(idx)
  }

  protected isValid(ctrlName:string): boolean{
    return !!this.form.get(ctrlName)?.valid
  }

  protected isCtrlInvalid(ctrlName:string): boolean{
    return !!this.form.get(ctrlName)?.invalid
  }


  private createForm(): FormGroup{
    this.orders=this.fb.array([])
    const form = this.fb.group({
     name: this.fb.control<string>('',[Validators.required, Validators.minLength(3)]),
     address: this.fb.control<string>('',[Validators.required,Validators.minLength(3)]),
     email: this.fb.control<string>('',[Validators.required, Validators.email]),
    deliveryDate: this.fb.control<string>(''),
    urgency: this.fb.control<boolean>(false),
    orders: this.orders

    })
    return form
  }

  urgencyClicked(){
    this.toShow = !this.toShow
  }


  private createOrder(): FormGroup{
    return this.fb.group({
      item: this.fb.control<string>(''),
      quantity: this.fb.control<string>(''),
      unitPrice: this.fb.control<string>('')
    })
  }

}
