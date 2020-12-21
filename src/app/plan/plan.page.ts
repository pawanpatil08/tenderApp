import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-plan',
  templateUrl: './plan.page.html',
  styleUrls: ['./plan.page.scss'],
})
export class PlanPage implements OnInit {

  constructor() { }
  option = {
    slidesPerView: 1.3,
    centeredSlides: true,
    loop: true,
    spaceBetween: 1,
    // autoplay:true,
  }
  data = [
    {
      "title": "Premium",
      "icon": "airplane",
      "desc": "Multi-line text that should wrap when it is too long to fit on one line in the item.",
      "price": "₹ 4999"
    },
    {
      "title": "Basic",
      "icon": "bulb-outline",
      "desc": "Multi-line text that should wrap when it is too long to fit on one line in the item.",
      "price": "₹ 2999"
    },
    {
      "title": "Ultimate",
      "icon": "rocket",
      "desc": "Multi-line text that should wrap when it is too long to fit on one line in the item.",
      "price": "₹ 9999"
    }
  ]

  ngOnInit() {
  }

}
