import React, { Component } from "react";
import Counter from "./Counter";

class Product extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedProduct: {},
      quickViewProduct: {},
      isAdded: false
    };
  }
  addToCart(image, name, discount, price, id, quantity) {
    this.setState(
      {
        selectedProduct: {
          image: image,
          name: name,
          price: price,
          discount: discount,
          id: id,
          quantity: quantity
        }
      },
      function() {
        this.props.addToCart(this.state.selectedProduct);
      }
    );
    this.setState(
      {
        isAdded: true
      },
      function() {
        setTimeout(() => {
          this.setState({
            isAdded: false,
            selectedProduct: {}
          });
        }, 3500);
      }
    );
  }
  quickView(image, name, price, discount, id) {
    this.setState(
      {
        quickViewProduct: {
          image: image,
          name: name,
          price: price,
          id: id
        }
      },
      function() {
        this.props.openModal(this.state.quickViewProdcut);
      }
    );
  }
  render() {
    let image = this.props.image;
    let name = this.props.name;
    let price = this.props.price;
    let discount = this.props.discount
    let id = this.props.id;
    let quantity = this.props.productQuantity;
    return (
      <div className="product">
        <div className="product-image">
          <img
            src={image}
            alt={this.props.name}
            onClick={this.quickView.bind(
              this,
              image,
              name,
              price,
              discount,
              id,
              quantity
            )}
          />
        </div>
        <h4 className="product-name">{this.props.name}</h4>
        <div className="product-price-block">
          <p className="product-price">{this.props.price}</p>
          <p className="product-discount">{this.props.discount}%</p>
        </div>
        { this.props.cartPage && <Counter
          productId={id}
          productQuantity={quantity}
          updateQuantity={this.props.updateQuantity}
          resetQuantity={this.resetQuantity}
        /> }
        <div className="product-action">
        {!this.props.cartPage &&  <button
            type="button"
            onClick={this.addToCart.bind(
              this,
              image,
              name,
              price,
              discount,
              id,
              quantity
            )}
          >
          ADD TO CART
          </button>
  }
          {this.props.cartPage &&  <button
            type="button"
            onClick={e =>this.props.removeProduct(id, e)}
          >
          Remove Item
          </button>}
        </div>
      </div>
    );
  }
}

export default Product;
