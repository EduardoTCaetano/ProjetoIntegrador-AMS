import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './tela-login.component.html',
  styleUrls: ['./tela-login.component.css']
})
export class TelaLoginComponent implements OnInit {

  public loginForm !: FormGroup
  constructor(private router: Router, private formBuilder : FormBuilder, private http : HttpClient) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
    email:['', Validators.required],
    senha:['', Validators.required]
  })
  }
  login(){
    this.http.get<any>("http://localhost:5288/api/Client/")
    .subscribe(res=>{
      const user = res.find((a:any)=>{
        return a.email === this.loginForm.value.email && a.senha === this.loginForm.value.senha
      });
      if(user){
        alert("Login realizado com sucesso");
        this.loginForm.reset();
        this.router.navigate(['/'])
      }else{
        alert("Usúario ou Senha inválido");
      }
    }, err=>{
      alert("Não foi possivel realizar")
    })
  }

  
  cadastro(){
    this.router.navigate(["/cadastro"])
  }
}