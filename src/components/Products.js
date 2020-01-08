import React, { Component } from "react";
import Product from "./Product";

class Products extends Component {
  constructor() {
    super();
  }
  render() {
    let productsData;
    let term = this.props.searchTerm;
    let x;

    function searchingFor(term) {
      return function(x) {
        return x.name.toLowerCase().includes(term.toLowerCase()) || !term;
      };
    }
    productsData = this.props.productsList
      .filter(searchingFor(term))
      .map(product => {
        return (
          <Product
            key={product.id}
            price={product.price}
            discount={product.discount}
            name={product.name}
            image={`${product.img_url}${product.id}`}
            id={product.id}
            addToCart={this.props.addToCart}
            productQuantity={this.props.productQuantity}
            updateQuantity={this.props.updateQuantity}
            openModal={this.props.openModal}
          />
        );
      });
   
    return <div  className="products"> {productsData}</div>;
  }
}

export default Products;
