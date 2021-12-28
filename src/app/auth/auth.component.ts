import { Component, ComponentFactoryResolver, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { AlertComponent } from './../shared/alert/alert.component';
import { PlaceholderDirective } from './../shared/placeholder.directive';
import { AuthResponseData, AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit, OnDestroy{
  @ViewChild(PlaceholderDirective, {static: false}) public alertHost: PlaceholderDirective;
  public isLoginMode:boolean = true;
  public isLoading: boolean = false;
  public error:string = null;

  private closeSubscription: Subscription;
  constructor(private authService: AuthService, private router: Router, private componentFactoryResolver: ComponentFactoryResolver) { }


  public ngOnInit(): void {
  }

  public ngOnDestroy(): void {
    if(this.closeSubscription) {
      this.closeSubscription.unsubscribe();
    }
  }

  public onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  public onSubmit(authForm: NgForm){
    if(!authForm.valid) {
      return
    }
    const email = authForm.value.email;
    const password = authForm.value.password;

    let authObservable: Observable<AuthResponseData>;
    this.isLoading = true;
    if(this.isLoginMode) {
      authObservable = this.authService.login(email, password);
    } else {
      authObservable = this.authService.signUp(email, password);
    }

    authObservable.subscribe(
      resData => {
        this.isLoading = false;
        this.router.navigate(['/recipes'])
      },
      errorMessage => {
        this.error = errorMessage
        this.isLoading = false;
        this.showErrorAlert(errorMessage)
      }
    );
    authForm.reset();
  }

  public onHandleError(): void{
    this.error = null;
  }

  public showErrorAlert(message: string){
    const alertComponentFactory = this.componentFactoryResolver.resolveComponentFactory(AlertComponent);
    const hostViewContainerRef = this.alertHost.viewContainerRef;
    hostViewContainerRef.clear();
    const componentRef = hostViewContainerRef.createComponent(alertComponentFactory);

    componentRef.instance.message = message;
    this.closeSubscription = componentRef.instance.close.subscribe(() => {
      this.closeSubscription.unsubscribe();
      hostViewContainerRef.clear()
    })
  }

}
