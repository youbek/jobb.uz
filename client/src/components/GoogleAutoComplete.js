import React from "react";
import PropTypes from "prop-types";
import Input from "./Form/Input";

// DON'T DELETE THE FOLLOWING COMMENT!
/* global google */

class GoogleAutoComplete extends React.Component {
  constructor(props) {
    super(props);
    this.autocompleteInput = React.createRef();
    this.autocomplete = null;
    this.handlePlaceChanged = this.handlePlaceChanged.bind(this);
  }

  componentDidMount() {
    this.autocomplete = new google.maps.places.Autocomplete(
      this.autocompleteInput.current,
      {
        types: ["address"],
        componentRestrictions: { country: "uz" },
      },
    );

    this.autocomplete.addListener("place_changed", this.handlePlaceChanged);
  }

  handlePlaceChanged() {
    const place = this.autocomplete.getPlace();
    this.props.handlePlaceChange(place);
  }

  render() {
    return (
      <Input
        right
        ref={this.autocompleteInput}
        id="autocomplete"
        placeholder="Введите адрес"
        type="text"
        disabled={this.props.fetching}
        autoComplete="off"
      />
    );
  }
}

export default GoogleAutoComplete;
