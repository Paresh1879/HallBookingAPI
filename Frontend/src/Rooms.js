import React from "react";
import axios from "axios";
import { Table, Button } from "react-bootstrap";

const API_URL = "https://hall-bookng.herokuapp.com/rooms";

class Rooms extends React.Component {
  constructor() {
    super();
    this.state = {
      rooms: [],
      view: false,
    };
  }

  componentDidMount = () => this.getRooms();

  getRooms = async () => {
    // API Call to server and get all rooms
    try {
      const { data } = await axios.get(API_URL);
      this.setState({ rooms: data });
    } catch (err) {
      console.error(err);
    }
  };

  viewToggle = () => {
    this.setState({ view: !this.state.view });
  };

  render() {
    return (
      <>
        {" "}
        <Table striped bordered hover className="table ">
          <thead>
            <tr>
              <th>#</th>
              <th>Room</th>
              <th>Customer</th>
              <th>Date</th>
              <th>Start</th>
              <th>Seats</th>
            </tr>
          </thead>
          <tbody>
            {this.state.rooms.map((room) => {
              return (
                <tr key={room.id}>
                  <td>{room.id}</td>
                  <td>{room.name}</td>
                  <td>{room.customer}</td>
                  <td>
                    {room.date.map((d) => {
                      return (
                        <>
                          <ul>
                            <li>{d}</li>
                          </ul>
                        </>
                      );
                    })}
                  </td>
                  <td>
                    {room.start} - {room.end}
                  </td>
                  <td>{room.seats}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </>
    );
  }
}

export default Rooms;
