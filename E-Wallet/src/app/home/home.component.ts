import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { DataserviceService } from "./../dataservice.service";
import { delay } from 'q';
@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

	constructor(private service: DataserviceService, private router: Router, private toastr: ToastrService) { }
	form: FormGroup
	name: string
	email: string
	message: string
	subject: string
	ngOnInit(): void {

		this.form = new FormGroup({
			name: new FormControl('', Validators.required),
			subject: new FormControl('', Validators.required),
			email: new FormControl('', Validators.required),
			message: new FormControl('', Validators.required)
		});
		var slideIndex = 0;
		showSlides();

		function showSlides() {
			var i;
			var slides: any = document.getElementsByClassName("mySlides");
			var dots = document.getElementsByClassName("dot");
			for (i = 0; i < slides.length; i++) {
				slides[i].style.display = "none";
			}
			slideIndex++;
			if (slideIndex > slides.length) { slideIndex = 1 }
			for (i = 0; i < dots.length; i++) {
				dots[i].className = dots[i].className.replace(" active", "");
			}
			slides[slideIndex - 1].style.display = "block";
			dots[slideIndex - 1].className += " active";
			setTimeout(showSlides, 3000);
		}
		const boxes = document.querySelectorAll('.effect .box');
		const o = new IntersectionObserver((e, o) => {
			e.forEach(en => {
				if (en.isIntersecting) {
					en.target.classList.remove('hide');
				}
			})
		});
		boxes.forEach(box => {
			o.observe(box);
		});
		const counts: any = document.querySelectorAll('.count');
		const speed = 10;
		const val = [];
		counts.forEach(count => {
			val.push(+count.textContent);
		});


		counts.forEach((count, index) => {
			let start = 0;
			count.textContent = 0;

			let interval = setInterval(() => {
				if (+count.textContent >= val[index]) {
					clearInterval(interval);
					return
				}
				start += speed;
				count.textContent = start;
			}, 50)
		});
		var $message = 'WELCOME TO THE SAFE PAY'.split('').reverse();
		var outputSlowly = setInterval(function () {
			$('#target').append($message.pop());
			if ($message.length === 0) {
				clearInterval(outputSlowly);
			}
		}, 80);
	}

	send() {
		this.name = this.form.get('name').value
		this.subject = this.form.get('subject').value
		this.email = this.form.get('email').value
		this.message = this.form.get('message').value
		if (this.name == "") {
			this.toastr.warning('Name required.')
		}
		else if (this.email == "") {
			this.toastr.warning('Email required.')
		}
		else if (this.subject == "") {
			this.toastr.warning('Subject required.')
		}
		else if (this.message == "") {
			this.toastr.warning('Message required.')
		}
		else {
			this.toastr.success('Successfully Sended.', "Mail")
			this.service.issue(this.name, this.subject, this.message, this.email).subscribe(res => { })
			delay(3000)
			window.location.reload()
		}
	}
}
