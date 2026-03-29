import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http'; // ✅ ADD

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule], // ✅ ADD
  templateUrl: './register.html'
})
export class RegisterComponent {

  registerForm: FormGroup;
  users: any[] = []; // ✅ ADD THIS

  constructor(private fb: FormBuilder, private http: HttpClient) { // ✅ ADD http
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit() {
    if (this.registerForm.valid) {
      fetch('http://localhost:8082/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(this.registerForm.value)
      })
      .then(res => res.json())
      .then(data => console.log(data));
    }
  }

  // ✅ ADD THIS METHOD
  loadUsers() {
    this.http.get<any[]>('http://localhost:8082/api/users')
      .subscribe(data => {
        this.users = data;
        console.log(this.users);
      });
  }
}