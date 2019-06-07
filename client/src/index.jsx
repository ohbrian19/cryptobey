import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import Header from "./components/header.jsx";
import List from "./components/list.jsx";
import SelectBox from "./components/selectBox.jsx";
import Compare from "./components/compare.jsx";
import Coins from "./components/coins.jsx"

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    bithumb: [],
    coin: ''
    };
    
    this.onChangeCoin = this.onChangeCoin.bind(this);
  }

  componentDidMount() {
  }

  getBithumbData(id) {
    return axios
      .get(`/bithumb/${id}`)
      .then(data => {
        this.setState({
          bithumb: data.data
        })
      })
      .catch(err => {
        console.log(err);
      })
  }

  onChangeCoin() {
    let id = document.getElementById("coin").value;
    this.setState({
      coin: id
    }, () => {
      this.getBithumbData(id)
    })
  }

  render() {
    return (
      <div className="container">
        <div className="container-left">
          <Header/>
          <List />
          {/* <Compare bithumb={this.state.bithumb} coin={this.state.coin}/> */}
        </div>
        <div className="container-right">
          {/* <Coins /> */}
          {/* <SelectBox onChangeCoin={this.onChangeCoin}/> */}
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
