import React, { Component } from "react";

import Spinner from "../spinner/";
import ErrorMessage from "../errorMessage";

const WithData = (View, getData) => {
  return class extends Component {
    state = {
      data: null,
      error: false,
    };

    componentDidMount() {
      getData()
        .then((data) => {
          this.setState({
            data,
          });
        })
        .catch(() => this.onError());
    }
    render() {
      const { data, error } = this.state;
      if (!data) return <Spinner />;
      if (error) return <ErrorMessage />;

      return <View {...this.props} data={data} />;
    }
  };
};

export default WithData;
