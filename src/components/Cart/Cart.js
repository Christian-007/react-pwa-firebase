import React, { Component } from 'react';
import './CartStyling.css';
import { withRouter } from 'react-router-dom';
import Ionicon from 'react-ionicons';
import { database } from '../../modules/firebase/firebase';
import CartItem from './CartItem';

class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gameStores: [],
      loading: false,
      totalPrice: 0,
    };
  }

  componentDidMount() {
    console.log('firebase: ', database.app.name);
    this.setState({loading: true});
    let imagesObj = database.ref().child('games');
    imagesObj.once('value', (snapshot) => {
      this.setState({
        gameStores: Object.values(snapshot.val()),
        loading: false,
      }, () => {
        console.log(this.state);
      })
    });
  }

  onConfirmClick = () => {
    this.props.history.push('/checkout/payment');
  };

  changeTotalPrice = (price) => {
    this.setState({
      totalPrice: this.state.totalPrice + price
    }, () => { 
      console.log('this.state', this.state);
    });
  }

  renderData = () => {
    const data = this.state.gameStores.map((value, index) => {
      return (
        <CartItem 
          key={index}
          imgUrl={value.imgUrl} 
          price={value.price} 
          platform={value.platform} 
          name={value.name}
          quantity={value.quantity}
          id={index}
          changeTotalPrice={this.changeTotalPrice}
        />
      );
      
    })

    return data;
  }

  renderRecommended = () => {
    const data = this.state.gameStores.map((value, index) => {
      return (
        <div className="col-xs-12 col-sm-6 col-md-3" key={index}>
          <div className="window-card">
            <div className="game-img" style={{backgroundImage: 'url('+value.imgUrl+')'}}>
              <span className="price">$ {value.price.toLocaleString(navigator.language, { minimumFractionDigits: 2})}</span>
            </div>
            <div className="description">
              <p className="platform">Full version | {value.platform}</p>
              <p className="game-title">{value.name}</p>
              <p className="summary">The aspect ratio of an image describes the proportional relationship...</p>
              <div className="star">
                <div className="left">
                  <Ionicon icon="ios-star" className="star-icon" fontSize="15px" color="#ffd732"/>
                  <Ionicon icon="ios-star" className="star-icon" fontSize="15px" color="#ffd732"/>
                  <Ionicon icon="ios-star" className="star-icon" fontSize="15px" color="#ffd732"/>
                  <Ionicon icon="ios-star" className="star-icon" fontSize="15px" color="#ffd732"/>
                  <Ionicon icon="ios-star-half" className="star-icon" fontSize="15px" color="#ffd732"/>
                </div>
                <div className="right">
                  <p>{value.star}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    });

    return data;
  }

  render() {
    const totalPrice = this.state.totalPrice;

    return (
      <div id="checkout" className="componentWrapper">
        <div className="container">
          <h3>
            Your Cart
            <span className="badge">{this.state.gameStores.length}</span>
          </h3>
          <div className="row">
            {this.renderData()}
          </div>
          <div className="row bottom-details">
            <div className="col-xs-12 col-md-7">
              <p className="title">Estimated Delivery</p>
              <p className="sub-title">09.03.2018</p>
            </div>
            <div className="col-xs-12 col-md-2 shipping">
              <p className="title">Shipping</p>
              <p className="sub-title">Free</p>
            </div>
            <div className="col-xs-12 col-md-3 total">
              <p className="title">Total</p>
              <Total products={this.state.gameStores}/>
              {/* <p className="sub-title">$ {totalPrice}</p> */}
            </div>
          </div>
          <div className="text-right">
            <div className="btn btn-default back">
              CONTINUE SHOPPING
            </div>
            <div className="btn confirm" onClick={this.onConfirmClick}>
              CHECKOUT
            </div>
          </div>

          <h3>Other Recommendations</h3>
          <div className="row">
            {this.renderRecommended()}
          </div>
        </div>
      </div>
    )
  }
}

const Total = ({ products }) => {
  return (
    <p className="sub-title">
      $ {' '}
      {products.reduce((sum, product) => (
        sum += product.price
      ), 0)}
    </p>
  )
};

export default withRouter(Cart);