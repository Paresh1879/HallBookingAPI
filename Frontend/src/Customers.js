import React from "react";
import axios from "axios";
import { Table, Button } from "react-bootstrap";

const API_URL = "https://hall-bookng.herokuapp.com/customers";

class Customers extends React.Component {
  constructor() {
    super();
    this.state = {
      customers: [],
      view: false,
    };
  }

  componentDidMount = () => this.getCustomers();

  getCustomers = async () => {
    // API Call to server and get all posts
    try {
      const { data } = await axios.get(API_URL);
      this.setState({ customers: data });
    } catch (err) {
      console.error(err);
    }
  };

  render() {
    return (
      <>
        {" "}
        <Table striped bordered hover className="table ">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Room</th>
              <th>Date</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody>
            {this.state.customers.map((customer, index) => {
              return (
                <tr>
                  <td>{index}</td>
                  <td>{customer.name}</td>
                  <td>{customer.room}</td>
                  <td>
                    {customer.date.map((d) => {
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
                    {customer.start} - {customer.end}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </>
    );
  }
}

export default Customers;
