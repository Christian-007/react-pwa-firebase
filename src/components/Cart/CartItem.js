import React, { Component } from 'react';
import './CartStyling.css';
import Ionicon from 'react-ionicons';

export default class CartItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      imgUrl: '',
      platform: '',
      quantity: 0,
      price: 0,
      id: '',
    };
  }

  componentDidMount() {
    this.setState({
      id: this.props.id,
      name: this.props.name,
      imgUrl: this.props.imgUrl,
      platform: this.props.platform,
      quantity: this.props.quantity,
      price: this.props.price
    })
  }

  addQty = (price) => {
    this.setState({
      quantity: this.state.quantity+1
    });

    this.props.changeTotalPrice(price);

    window.dataLayer.push({
      'event': 'addToCart',
      'ecommerce': {
        'currencyCode': 'USD',
        'add': {        
          'products': [{
            'name': this.state.name,
            'id': this.state.id,
            'price': this.state.price,
            'brand': this.state.platform,
            'variant': 'Full Version',
            'quantity': 1
           }]
        }
      }
    });
  }

  reduceQty = () => {
    if(this.state.quantity > 1) {
      this.setState({
        quantity: this.state.quantity-1
      });

      window.dataLayer.push({
        'event': 'removeFromCart',
        'ecommerce': {
          'currencyCode': 'USD',
          'remove': {        
            'products': [{
              'name': this.state.name,
              'id': this.state.id,
              'price': this.state.price,
              'brand': this.state.platform,
              'variant': 'Full Version',
              'quantity': 1
             }]
          }
        }
      });
    }
  }

  render() {
    return (
      <div className="col-xs-12 col-md-6">
        <div className="flexCard">
          <div className="card">
            <a href="#asd">
              <Ionicon icon="md-close" className="close-icon" fontSize="20px" color="#000"/>
            </a>
            <div className="left" style={{backgroundImage: 'url('+this.state.imgUrl+')'}}>
              <span className="price">$ {this.state.price.toLocaleString(navigator.language, { minimumFractionDigits: 2})}</span>
            </div>
            <div className="right">
              <p className="platform">Full version | {this.state.platform}</p>
              <p className="game-title">{this.state.name}</p>
              <span className="cart-buttons">
                <div className="btn btn-cart btn-default" onClick={this.reduceQty}>
                  <Ionicon icon="md-remove" fontSize="12px" color="#000"/>
                </div>
                <span>{this.state.quantity}</span>
                <div className="btn btn-cart btn-default" onClick={() => this.addQty(this.state.price)}>
                  <Ionicon icon="md-add" fontSize="12px" color="#000"/>
                </div>
              </span>
            </div>
          </div>
        </div>
        </div>
    )
  }
}
