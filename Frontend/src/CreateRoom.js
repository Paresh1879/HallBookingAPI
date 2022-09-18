import React from "react";
import axios from "axios";
import { Form } from "react-bootstrap";
import { withRouter } from "react-router-dom";

const API_URL = "https://hall-bookng.herokuapp.com/rooms";

class CreateRoom extends React.Component {
  constructor() {
    super();
    this.state = {
      rooms: [],
      name: "",
      seats: "",
      view: true,
      message: "",
    };
  }

  componentDidMount = () => this.getRooms();

  getRooms = async () => {
    try {
      const { data } = await axios.get(API_URL);
      this.setState({ rooms: data });
    } catch (err) {
      console.error(err);
    }
  };

  createRoom = async () => {
    const { name, seats } = this.state;
    var config = {
      method: "post",
      url: API_URL,
      headers: {
        "Content-Type": "application/json",
      },
      data: JSON.stringify({
        name: name,
        seats: seats,
      }),
    };

    axios(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        this.props.history.push("/rooms");
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.state.rooms.forEach((room) => {
      if (room.name == this.state.name) {
        this.setState({ view: false });
      }
    });
    if (this.state.view) this.createRoom();
    else this.setState({ message: "Room name already exists" });
  };

  render() {
    return (
      <>
        <h3>To add a new room enter the details: </h3>
        <Form onSubmit={this.handleSubmit}>
          <label> Name : </label>{" "}
          <input
            required
            type="text"
            name="name"
            value={this.state.name}
            onChange={this.handleChange}
          />{" "}
          {this.state.view ? "" : <span>{this.state.message}</span>}
          <br />
          <br /> <label> Seats : </label>{" "}
          <input
            required
            type="number"
            name="seats"
            value={this.state.seats}
            onChange={this.handleChange}
          />
          <br /> <br />
          <input type="Submit" />
        </Form>{" "}
      </>
    );
  }
}

export default withRouter(CreateRoom);
