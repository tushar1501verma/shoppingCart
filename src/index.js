import React, { Component } from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import Header from "./components/Header";
import Products from "./components/Products";
import CartPage from "./components/CartPage";
import "./scss/style.scss";
import Filter from "./components/Filter";

class App extends Component {
  constructor() {
    super();
    this.state = {
      products: [],
      cart: [],
      totalItems: 0,
      totalAmount: 0,
      term: "",
      category: "",
      cartBounce: false,
      quantity: 1,
      quickViewProduct: {},
      modalActive: false,
      showCart: false
    };
    this.handleSearch = this.handleSearch.bind(this);
    this.handleMobileSearch = this.handleMobileSearch.bind(this);
    this.handleCategory = this.handleCategory.bind(this);
    this.handleAddToCart = this.handleAddToCart.bind(this);
    this.sumTotalItems = this.sumTotalItems.bind(this);
    this.sumTotalAmount = this.sumTotalAmount.bind(this);
    this.checkProduct = this.checkProduct.bind(this);
    this.updateQuantity = this.updateQuantity.bind(this);
    this.handleRemoveProduct = this.handleRemoveProduct.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.showCart = this.showCart.bind(this);
    this.sort = this.sort.bind(this);
    this.filter = this.filter.bind(this);
  }

  sort(order) {
    const { products } = this.state;
    const _products = order === 'asc' ?
      products.sort((a, b) => a.price - b.price)
      : products.sort((a, b) => b.price - a.price);
    this.setState({
      products: _products
    });
  }

  filter(value) {
    const { productOrg } =  this.state;
    
    const _products = productOrg.filter(product => product.price >= value.min && product.price <= value.max)
    this.setState({
      products: _products
    });
  }
    getProducts() {
      let url = "https://api.myjson.com/bins/qzuzi";
      axios.get(url).then(response => {
        this.setState({
          products: response.data,
          productOrg: response.data
        });
      });
    }
    componentWillMount() {
      this.getProducts();
    }

    handleSearch(event) {
      this.setState({ term: event.target.value });
    }
    handleMobileSearch() {
      this.setState({ term: "" });
    }
    handleCategory(event) {
      this.setState({ category: event.target.value });
    }
    handleAddToCart(selectedProducts) {
      let cartItem = this.state.cart;
      let productID = selectedProducts.id;
      let productQty = selectedProducts.quantity;
      if (this.checkProduct(productID)) {
        let index = cartItem.findIndex(x => x.id == productID);
        cartItem[index].quantity =
          Number(cartItem[index].quantity) + Number(productQty);
        this.setState({
          cart: cartItem
        });
      } else {
        cartItem.push(selectedProducts);
      }
      this.setState({
        cart: cartItem
      });
      setTimeout(
        function () {
          this.setState({
            quantity: 1
          });

        }.bind(this),
        1000
      );
      this.sumTotalItems(this.state.cart);
      this.sumTotalAmount(this.state.cart);
    }
    handleRemoveProduct(id, e) {
      let cart = this.state.cart;
      let index = cart.findIndex(x => x.id == id);
      cart.splice(index, 1);
      this.setState({
        cart: cart
      });
      this.sumTotalItems(this.state.cart);
      this.sumTotalAmount(this.state.cart);
      e.preventDefault();
    }
    checkProduct(productID) {
      let cart = this.state.cart;
      return cart.some(function (item) {
        return item.id === productID;
      });
    }
    sumTotalItems() {
      let total = 0;
      let cart = this.state.cart;
      total = cart.length;
      this.setState({
        totalItems: total
      });
    }
    sumTotalAmount() {
      let total = 0;
      let cart = this.state.cart;
      for (var i = 0; i < cart.length; i++) {
        total += cart[i].price * parseInt(cart[i].quantity);
      }
      this.setState({
        totalAmount: total
      });
    }

    updateQuantity(id, qty) { 
      const cart = this.state.cart;
      const product = cart.filter(c => c.id === id);
      if (product.length) {
        product[0].quantity = qty;
        this.setState({
          cart
        });
      }

    }
    openModal(product) {
      this.setState({
        modalActive: true
      });
    }
    closeModal() {
      this.setState({
        modalActive: false
      });
    }

    showCart() {
      this.setState({ showCart: true });
    }

    render() {
      return (
        <div>
          <div className="container">
            <Header
              total={this.state.totalAmount}
              totalItems={this.state.totalItems}
              cartItems={this.state.cart}
              removeProduct={this.handleRemoveProduct}
              handleSearch={this.handleSearch}
              handleMobileSearch={this.handleMobileSearch}
              handleCategory={this.handleCategory}
              categoryTerm={this.state.category}
              productQuantity={this.state.moq}
              showCart={this.showCart}
            />

            {!this.state.showCart &&
              <div className="products-wrapper">
                <div className="sort-wrapper">
                  <span><strong>Sort By</strong></span>
                  <a className="sort-price" href="#" onClick={() => this.sort('asc')}> Price -- Low High</a>
                  <a className="sort-price" href="#" onClick={() => this.sort('desc')}> Price -- High Low</a>
                  <div className="filter">
                  <Filter handleChange={this.filter} />
                  </div>
                </div>
                <Products
                  productsList={this.state.products}
                  searchTerm={this.state.term}
                  addToCart={this.handleAddToCart}
                  productQuantity={this.state.quantity}
                  openModal={this.openModal}
                />
               
              </div>
            }
            {this.state.showCart &&
              <CartPage
                cart={this.state.cart}
                removeProduct={this.handleRemoveProduct}
                updateQuantity={this.updateQuantity}
              />
            }
          </div>
        </div>
      );
    }
  }

  ReactDOM.render(<App />, document.getElementById("root"));
