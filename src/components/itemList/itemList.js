import React, { Component } from "react";

import gotService from "../../services/gotService";
import Spinner from "../spinner/";
import ErrorMessage from "../errorMessage";

import "./itemList.css";

export default class ItemList extends Component {
  gotService = new gotService();

  state = {
    charList: null,
    error: false,
  };

  componentDidMount() {
    this.gotService
      .getAllCharacters()
      .then((charList) => {
        this.setState({
          charList,
        });
      })
      .catch(() => this.onError());
  }

  onError() {
    this.setState({
      charList: null,
      error: true,
    });
  }

  renderItems(arr) {
    return arr.map((item, i) => {
      const { id, name } = item;
      return (
        <li
          key={id}
          className="list-group-item"
          onClick={() => {
            this.props.onCharSelected(id);
          }}
        >
          {name}
        </li>
      );
    });
  }

  render() {
    const { charList, error } = this.state;

    if (error) return <ErrorMessage />;

    const items = charList ? this.renderItems(charList) : <Spinner />;

    return <ul className="item-list list-group">{items}</ul>;
  }
}
