import React, { Component } from "react";

import { ItemListBooks } from "../itemList";
import ErrorMessage from "../errorMessage";
import { withRouter } from "react-router-dom";

import gotService from "../../services/gotService";

class BooksPage extends Component {
  gotService = new gotService();

  state = {
    error: false,
  };

  componentDidCatch() {
    this.setState({
      error: true,
    });
  }

  render() {
    if (this.state.error) {
      return <ErrorMessage />;
    }

    return (
      <ItemListBooks
        onItemSelected={(itemId) => {
          this.props.history.push(itemId);
        }}
        getData={this.gotService.getAllBooks}
        renderItem={(item) => item.name}
      />
    );
  }
}
export default withRouter(BooksPage);
