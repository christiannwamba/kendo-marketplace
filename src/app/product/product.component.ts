import { Component, Input, OnInit } from '@angular/core';
import { AddToCart, RemoveFromCart } from '../store/actions';
import { NgRedux } from '@angular-redux/store';
import { InitialState } from '../store/reducer';
import { NotificationService } from '@progress/kendo-angular-notification';

export interface Product {
  name: string;
  price: number;
  description: string;
  image: string;
}

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  constructor(
    private ngRedux: NgRedux<InitialState>,
    private notification: NotificationService
  ) {}

  inCart = false;
  @Input() product: Product;

  addToCart(item: Product) {
    this.showNotificiation(`${item.name} has been added to cart!`);
    this.ngRedux.dispatch(AddToCart(item));
    this.inCart = true;
  }

  removeFromCart(item: Product) {
    this.showNotificiation('This product has been removed from cart!');
    this.ngRedux.dispatch(RemoveFromCart(item));
    this.inCart = false;
  }

  showNotificiation(text) {
    this.notification.show({
      cssClass: 'toast',
      content: text,
      animation: { type: 'slide', duration: 400 },
      position: { horizontal: 'left', vertical: 'bottom' },
      type: { style: 'success', icon: false }
    });
  }
  ngOnInit() {}
}
