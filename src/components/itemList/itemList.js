import React, { Component } from "react";

import "./itemList.css";

export default class ItemList extends Component {
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
    const { data } = this.props;
    const items = this.renderItems(data);

    return <ul className="item-list list-group">{items}</ul>;
  }
}
