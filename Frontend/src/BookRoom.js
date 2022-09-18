import React from "react";
import axios from "axios";
import { Button, Form } from "react-bootstrap";
import { withRouter } from "react-router-dom";

const API_URL = "https://hall-bookng.herokuapp.com/rooms";

class BookRoom extends React.Component {
  constructor() {
    super();
    this.state = {
      rooms: [],
      name: "",
      customer: "",
      date: "",
      id: null,
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

  BookRoom = async () => {
    const { name, customer, date, id, rooms } = this.state;
    console.log(id, date);

    var config = {
      method: "put",
      url: `${API_URL}/${id}`,
      headers: {
        "Content-Type": "application/json",
      },
      data: JSON.stringify({
        name,
        customer,
        date,
        id,
      }),
    };

    axios(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        if (!response.data.error) this.props.history.push("/rooms");
        else alert(response.data.error);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  selectRoom = (room) =>
    this.setState({ id: room.id, name: room.name, customer: room.customer });

  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.BookRoom();
  };

  render() {
    return (
      <>
        <h3>Select room</h3>
        <Form onSubmit={this.handleSubmit}>
          <label> Name : </label>{" "}
          <input
            disabled
            required
            type="text"
            name="name"
            placeholder="choose room"
            value={this.state.name}
            onChange={this.handleChange}
          />{" "}
          <label> ID : </label>{" "}
          <input
            disabled
            type="number"
            name="id"
            placeholder="choose room"
            value={this.state.id}
            onChange={this.handleChange}
          />{" "}
          <br /> <br />
          <label> Customer : </label>{" "}
          <input
            disabled
            required
            type="text"
            name="customer"
            placeholder="choose room"
            value={this.state.customer}
            onChange={this.handleChange}
          />{" "}
          <label> Date : </label>{" "}
          <input
            required
            type="text"
            name="date"
            value={this.state.date}
            onChange={this.handleChange}
          />
          <br />
          <br />
          {this.state.rooms.map((room) => {
            return (
              <>
                <li>
                  <Button
                    onClick={() => {
                      this.selectRoom(room);
                    }}
                  >
                    {room.name}
                  </Button>
                </li>
                <br />
              </>
            );
          })}
          <br />
          <input type="Submit" />
        </Form>{" "}
      </>
    );
  }
}

export default withRouter(BookRoom);
