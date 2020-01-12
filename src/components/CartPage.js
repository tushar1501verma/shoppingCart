import React, { Component } from "react";
import Product from "./Product";

class CartPage extends Component {
  constructor() {
    super();
    
  }

  get totalPrice(){
    return this.props.cart.reduce(
      (accumulator, product) => accumulator + product.price * product.quantity,
      0
    );
  }

  get totalItem(){
    return this.props.cart.reduce(
        (accumulator, product) => accumulator + product.quantity,
        0
      );
  }

  render() {
    const cart = this.props.cart.map(product => {
      return (
        <Product
          key={product.id}
          price={product.price}
          discount={product.discount}
          name={product.name}
          image={`${product.img_url}${product.id}`}
          id={product.id}
          productQuantity={product.quantity}
          updateQuantity={this.props.updateQuantity}
          cartPage="true"
          removeProduct={this.props.removeProduct}
        />
      );
    });
    return (
      <div className="cart-page">
        <div className="cart-wrapper">{cart}</div>

        <div className="cart-info">
          <table>
            <tbody>
              <tr>
                <td>No. of items</td>
                <td>:</td>
                <td>
                  <strong>{this.totalItem}</strong>
                </td>
              </tr>
              <tr>
                <td>Sub Total</td>
                <td>:</td>
                <td>
                  <strong>{this.totalPrice}</strong>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default CartPage;
