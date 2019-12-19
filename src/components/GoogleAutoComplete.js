import React from "react";
import PropTypes from "prop-types";

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
        types: this.props.fullAddress ? ["address"] : ["(cities)"],
        componentRestrictions: { country: "us" },
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
      <input
        className="form-control"
        ref={this.autocompleteInput}
        id="autocomplete"
        placeholder="Enter location"
        type="text"
        disabled={this.props.fetching}
        autoComplete="off"
      />
    );
  }
}

export default GoogleAutoComplete;
