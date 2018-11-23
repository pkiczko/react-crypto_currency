import React, { Component } from 'react';
import bitcoin from './64x64/bitcoin.png';

// function importAll(r) {
//        let images = {};
//        r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
//        return images;
//    }


class Data extends Component {
  constructor() {
    super();
    this.state = {
      dataArray: [],
      forgetMeNot: '',
      result: []
    };
  }
addZero(i) {
      if (i < 10) {
          i = "0" + i;
      }
      return i;
  }
componentDidMount() {
  fetch('https://api.coinmarketcap.com/v1/ticker/?limit=100')
     .then(response => response.json())
     .then(dataArray => {

       let data = dataArray.map(currency => {
       let {id, name, price_usd, rank, symbol, max_supply, percent_change_7d, percent_change_24h, last_updated} = currency;
       return({id:id, name:name, price_usd:price_usd, rank:rank, symbol:symbol, max_supply:max_supply, percent_change_24h:percent_change_24h,
         percent_change_7d:percent_change_7d, last_updated:last_updated});
       });
       this.setState({dataArray:data, result:data})


 });
 }
compare(num) {      //for comparing strings
     return function(o, p){
       let a = o[num];
       let b = p[num];
    if (a< b) return -1;
    if (a> b) return 1;
    return 0;}
  }
compareNum(num) {  //for comparing numbers
   return function(o, p){
     let a = o[num];
     let b = p[num];
   return (a-b);}
 }
abbreviateNumber(value) {
    if (!value) {return 'no info';}
    let newValue;
    newValue=parseInt(value);
    if (newValue >= 10000000000) {
        newValue = (newValue/1000000000);
        if (newValue<100) {newValue = newValue.toFixed(1) + 'B';}
        else newValue = newValue.toFixed(0) + 'B';
    return newValue;}
    else if (newValue >= 10000000) {
        newValue = (newValue/1000000);
        if (newValue<100) {newValue = newValue.toFixed(1) + 'M';}
        else newValue = newValue.toFixed(0) + 'M';
    return newValue;}
    return value;
}
orderNumber(cat) {
  if (cat === this.state.forgetMeNot)
  {
    let data2 = this.state.result.reverse();
    this.setState({result:data2})
  }
  else {
    let data2 = this.state.result;
    data2.sort(this.compareNum(cat));
    this.setState({result:data2});
    this.setState({forgetMeNot:cat});
  }
}
orderString(cat) {

    if (cat === this.state.forgetMeNot)
    {
      let data2 = this.state.result.reverse();
      this.setState({result:data2})
    }
    else {
      let data2 = this.state.result;
      data2.sort(this.compare(cat));
      this.setState({result:data2});
      this.setState({forgetMeNot:cat});
    }
}

   componentDidUpdate(){


   }
  handleChange = e => {

     this.setState ({
       result: this.state.dataArray.filter(currency => currency.name.toLowerCase().includes(e.target.value.toLowerCase())),
       forgetMeNot: ''
     });
   }




render(){
 //{const images = importAll(require.context('./64x64', false, '/\.png/'));}
  return <div className='data'>
    <h2>Crypto currencies search engine</h2>
    <input onChange={this.handleChange} type="text" />
    <div className='nav'>
    <span>Logo</span>
    <span><button onClick={ () => this.orderString('name')}>Currency &#8645;</button></span>
    <span><button onClick={ () => this.orderNumber('price_usd')}>Price in $ &#8645;</button></span>
    <span><button onClick={ () => this.orderNumber('rank')}>Rank &#8645;</button></span>
    <span>Max supply</span>
    <span><button onClick={ () => this.orderNumber('percent_change_24h')}>Change 24h &#8645;</button></span>
    <span><button onClick={ () => this.orderNumber('percent_change_7d')}>Change 7 days &#8645;</button></span>
    <span>Last update</span>
    </div>
   {this.state.result.map((el,i)=>{
     let date = new Date(el.last_updated*1000);
     let price = parseFloat(el.price_usd).toFixed(2);
     let supply = this.abbreviateNumber(el.max_supply);
     let logo = el.id;

     let logoImage;
     try {logoImage = require('./64x64/' + logo + '.png');}
     catch {console.log('No image for: ', logo)};
     return <div key={el.symbol}>
    <span><img src={logoImage} alt='' /></span>
    <span>{el.name}</span>
    <span>{price}</span>
    <span>{el.rank}</span>
    <span>{supply}</span>
    <span>{el.percent_change_24h + '%'}</span>
    <span>{el.percent_change_7d+ '%'}</span>
    <span>{date.getDate()}/{date.getMonth()} {date.getHours()}:{this.addZero(date.getMinutes())}</span>
    </div>})}
  </div>
}
}

export default Data;

//
