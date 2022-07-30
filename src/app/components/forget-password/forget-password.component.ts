import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss']
})
export class ForgetPasswordComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
  }

  alertMessage(item:string){
    if(item.trim()){
      alert(`Reset password Link sent to ${item}`);
      this.router.navigate(['./login']);
    }
  }

}
