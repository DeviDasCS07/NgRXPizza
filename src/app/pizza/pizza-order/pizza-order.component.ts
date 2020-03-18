import { Component, OnInit } from '@angular/core';
import * as actions from '../pizza.actions';
import * as fromPizza from '../pizza.reducer';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
@Component({
  selector: 'app-pizz-order',
  templateUrl: './pizza-order.component.html',
  styleUrls: ['./pizza-order.component.scss']
})
export class PizzaOrderComponent implements OnInit {

  pizzas$: Observable<any>;
  constructor(private store: Store<fromPizza.State>) { }

  public ngOnInit(): void {
    this.pizzas$ = this.store.select(fromPizza.selectAll);
  }

  public createPizza(): void {
    const pizza: fromPizza.Pizza = {
      id: new Date().getUTCMilliseconds().toString(),
      size: 'small'
    };
    this.store.dispatch(new actions.Create(pizza));
  }

  updatePizza(id, size) {
    this.store.dispatch(new actions.Update(id, {size}));
  }

  deletePizza(id) {
    this.store.dispatch(new actions.Delete(id));
  }

}
