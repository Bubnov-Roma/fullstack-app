import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { MaterialInstance, MaterialSerice } from '../shared/classes/material.service';
import { OrderService } from './order.service';
import { Order, OrderPosition } from '../shared/interfaces';
import { OrdersService } from '../shared/services/orders.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-order-page',
  templateUrl: './order-page.component.html',
  styleUrls: ['./order-page.component.css'],
  providers: [OrderService]
})
export class OrderPageComponent implements OnInit, OnDestroy, AfterViewInit{

  @ViewChild('modal')modalRef: ElementRef
  modal: MaterialInstance
  oSub: Subscription
  isRoot: boolean
  pending = false

  constructor (
    private router: Router,
    public order: OrderService,
    private ordersService: OrdersService){
    }

  ngOnInit(): void {
    this.isRoot = this.router.url === '/order'
    this.router.events.subscribe( event => {
      if (event instanceof NavigationEnd) this.isRoot = this.router.url ==='/order'
    })
  }

  ngOnDestroy(): void {
    this.modal.destroy()
    if (this.oSub) {
      this.oSub.unsubscribe()
    }
  }

  ngAfterViewInit(): void {
    this.modal = MaterialSerice.initModal(this.modalRef)
  }

  removePosition(orderPosition: OrderPosition) {
    this.order.remove(orderPosition)
  }

  open() {
    this.modal.open()
  }

  cancel() {
    this.modal.close()
  }

  submit() {
    this.pending = true
    this.modal.close()

    const order: Order = {
      list: this.order.list.map(i => {
        delete i._id
        return i
      })
    }

    this.oSub = this.ordersService.create(order).subscribe(
      newOrder => {
        MaterialSerice.toast(`заказ №${newOrder.order} был добавлен.`)
        this.order.clear()
      },
      error => MaterialSerice.toast(error.error.message),
      () => {
        this.modal.close()
        this.pending = false
      }
    )
  }
}
