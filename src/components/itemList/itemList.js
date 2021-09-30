import React, { Component } from "react";

import Spinner from "../spinner/";
import ErrorMessage from "../errorMessage";

import "./itemList.css";

export default class ItemList extends Component {
  state = {
    itemList: null,
    error: false,
  };

  componentDidMount() {
    const { getData } = this.props;

    getData()
      .then((itemList) => {
        this.setState({
          itemList,
        });
      })
      .catch(() => this.onError());
  }

  onError() {
    this.setState({
      itemList: null,
      error: true,
    });
  }

  renderItems(arr) {
    return arr.map((item) => {
      const { id } = item;

      const name = this.props.renderItem(item);

      return (
        <li
          key={id}
          className="list-group-item"
          onClick={() => {
            this.props.onItemSelected(id);
          }}
        >
          {name}
        </li>
      );
    });
  }

  render() {
    const { itemList, error } = this.state;

    if (error) return <ErrorMessage />;

    const items = itemList ? this.renderItems(itemList) : <Spinner />;

    return <ul className="item-list list-group">{items}</ul>;
  }
}
