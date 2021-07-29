import React, { Component } from "react";
export default class Fetch extends React.Component {
  constructor(props) {
    super(props);
  }
  state = {
    loading: true,
    device: null,
  };
  async componentDidMount() {
    const url = "/api/all";
    const response = await fetch(url);
    const data = await response.json();
    this.setState({ device: data[0], loading: false });
    console.log(data);
  } 
  render() {
      return (
        <div>
          {this.state.loading || !this.state.device ? (
            <div>Loading...</div>
          ) : (
            <div>
              <div>Seriennummer: {this.state.device.serialnumber}</div>
              <div>Modell: iPhone {this.state.device.model}</div>
              <div>Batterie: {this.state.device.batterylife}%</div>
              <div>Speicher: {this.state.device.capacity}GB</div>
            </div>
          )}
        </div>
      );
    }
  }

