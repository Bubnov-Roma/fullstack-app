import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthService } from '../shared/services/auth.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MaterialSerice } from '../shared/classes/material.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})

export class LoginPageComponent implements OnInit, OnDestroy{
form: FormGroup
aSub: Subscription
 constructor(
  private auth: AuthService,
  private router: Router,
  private route: ActivatedRoute) {}

   ngOnInit(): void{
    this.form = new FormGroup ({
    email: new FormControl(null,[Validators.required, Validators.email]),
    password: new FormControl(null,[Validators.required, Validators.minLength(5)])
  })
  this.route.queryParams.subscribe((params: Params) => {
    if (params['registered']) {
      MaterialSerice.toast('You can now log in using your data')
      // теперь вы можете войти в систему используя свои данные
    } else if (params['accessDenied']) {
      MaterialSerice.toast('First,log in to the system')
      // для начала авторизуйтесь в системе
    } else if (params['sessionFailed']) {
      MaterialSerice.toast('Please log in again')
    }
  })
}

  ngOnDestroy() {
    if (this.aSub) this.aSub.unsubscribe()
  }

 onSubmit() {
  this.form.disable()

  this.aSub = this.auth.login(this.form.value).subscribe(
    () => this.router.navigate(['/overview']),
    error => {
      MaterialSerice.toast(error.error.message)
      this.form.enable()
    }
  )
 }
}
