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
      dataArray: []
    };
  }
addZero(i) {
      if (i < 10) {
          i = "0" + i;
      }
      return i;
  }
componentDidMount() {
  fetch('https://api.coinmarketcap.com/v1/ticker/?limit=20')
     .then(response => response.json())
     .then(dataArray => {

       let data = dataArray.map(currency => {
       let {id, name, price_usd, rank, symbol, max_supply, percent_change_7d, percent_change_24h, last_updated} = currency;
       return({id:id, name:name, price_usd:price_usd, rank:rank, symbol:symbol, max_supply:max_supply, percent_change_24h:percent_change_24h,
         percent_change_7d:percent_change_7d, last_updated:last_updated});
       });
       this.setState({dataArray:data})


 });
 }
abbreviateNumber(value) {
    if (!value) {return 'no info';}
    let newValue;
    value=parseInt(value);
    if (value >= 10000000) {
        newValue = (value/1000000).toFixed(1) + ' M';
    return newValue;}
    return value;
}

   componentDidUpdate(){


   }





render(){
 //{const images = importAll(require.context('./64x64', false, '/\.png/'));}
  return <div className='data'>

    <div className='nav'>
    <span>Logo</span>
    <span>Currency</span>
    <span>Price in $</span>
    <span>Rank</span>
    <span>Max supply</span>
    <span>Change 24h</span>
    <span>Change 7 days</span>
    <span>Last update</span>
    </div>
   {this.state.dataArray.map((el,i)=>{
     let date = new Date(this.state.dataArray[i].last_updated*1000);
     let price = parseFloat(this.state.dataArray[i].price_usd).toFixed(2);
     let supply = this.abbreviateNumber(this.state.dataArray[i].max_supply);
     let logo = this.state.dataArray[i].id;

     let logoImage;
     try {logoImage = require('./64x64/' + logo + '.png');}
     catch {console.log('No image for: ', logo)};
     return <div key={this.state.dataArray[i].symbol}>
    <span><img src={logoImage} alt='' /></span>
    <span>{this.state.dataArray[i].name}</span>
    <span>{price}</span>
    <span>{this.state.dataArray[i].rank}</span>
    <span>{supply}</span>
    <span>{this.state.dataArray[i].percent_change_24h + '%'}</span>
    <span>{this.state.dataArray[i].percent_change_7d+ '%'}</span>
    <span>{date.getDate()}/{date.getMonth()} {date.getHours()}:{this.addZero(date.getMinutes())}</span>
    </div>})}
  </div>
}
}

export default Data;

//
