//Data for API

let data = [
  {
    rooms: [
      {
        name: "Room1",
        status: "booked",
        customer: "Customer1",
        date: ["11/9/21", "12/9/21"],
        start: "12.01 am",
        end: "11.59 pm",
        seats: 1000,
        id: 1,
      },
      {
        name: "Room2",
        status: "booked",
        customer: "Customer3",
        date: ["10/9/21"],
        start: "12.01 am",
        end: "11.59 pm",
        seats: 1000,
        id: 2,
      },
      {
        name: "Room3",
        status: "available",
        customer: "",
        date: [],
        start: "",
        end: "",
        seats: 1000,
        id: 3,
      },
      {
        name: "Room4",
        status: "booked",
        customer: "Customer2",
        date: ["11/9/21", "12/9/21", "13/9/21"],
        start: "12.01 am",
        end: "11.59 pm",
        seats: 1000,
        id: 4,
      },
    ],
  },
  {
    customer: [
      {
        name: "Customer1",
        room: "Room1",
        date: ["11/9/21", "12/9/21"],
        start: "12.01 am",
        end: "11.59 pm",
      },
      {
        name: "Customer2",
        room: "Room4",
        date: ["11/9/21", "12/9/21", "13/9/21"],
        start: "12.01 am",
        end: "11.59 pm",
      },
      {
        name: "Customer3",
        room: "Room2",
        date: ["10/9/21"],
        start: "12.01 am",
        end: "11.59 pm",
      },
    ],
  },
];

const service = {
  displayRooms() {
    return data[0].rooms;
  },
  displayCustomers() {
    return data[1].customer;
  },

  //To create room
  createRoom(newData) {
    let flag = true;

    //Checking if room already exists
    data[0].rooms.map((r) => {
      console.log(r);
      if (r.name == newData.name) {
        flag = false;
      }
    });

    //Pushing the new room to the
    if (flag) {
      let id = data[0].rooms.length + 1;
      let newRoom = {
        ...newData,
        date: [],
        start: "",
        end: "",
        id,
        customer: "",
        status: "available",
      };
      data[0].rooms.push(newRoom);
      return data[0].rooms;
    } else {
      return { error: "Already existing room name" };
    }
  },

  //Function to book room
  bookRoom(id, newData) {
    let flag = true;
    let output = {};
    let message = "";
    let selectedRoom = data[0].rooms.filter((r) => r.id == id);
    // console.log("new", newData);
    let selectedCustomer = data[1].customer.filter((c) => {
      return c.name == newData.customer;
    });

    //Checking if room already booked
    selectedRoom[0].date.forEach((d) => {
      if (d === newData.date) {
        flag = false;
        message = "Room already booked";
      }
    });

    //Checking if customer already booked another room at same time
    selectedCustomer[0].date.forEach((d) => {
      if (d === newData.date) {
        flag = false;
        message = "Customers cant book more than 1 room for the same day";
      }
    });

    if (flag) {
      for (let i in data[0].rooms) {
        // console.log(data[0].rooms[i]);
        if (data[0].rooms[i].name == newData.name) {
          console.log("inside if");
          data[0].rooms[i].date.push(newData.date);
          data[0].rooms[i].customer = newData.customer;
          data[0].rooms[i].status = "Booked";
          output = data[0].rooms[i];
        }
      }
      for (let i in data[1].customer) {
        if (data[1].customer[i].room == newData.name) {
          data[1].customer[i].date.push(newData.date);
          // output=data[1].customer[i]);
        }
      }
      console.log(output);
      return output;
    } else {
      return { error: message };
    }
  },
};

module.exports = service;
