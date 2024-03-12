import React, { useState } from "react";
import ReactDOM from "react-dom";

const style = {
  table: {
    borderCollapse: "collapse",
    margin: 20,
  },
  tableCell: {
    border: "1px solid gray",
    margin: 0,
    padding: "5px 10px",
    width: "max-content",
    minWidth: "150px",
    backgroundColor: "white",
  },
  form: {
    container: {
      padding: "20px",
      border: "1px solid #F0F8FF",
      borderRadius: "15px",
      width: "max-content",
      marginBottom: "40px",
    },
    inputs: {
      marginBottom: "5px",
      display: "block",
      padding: 10,
      backgroundColor: "gray",
      color: "white",
      width: "100%",
    },
    submitBtn: {
      marginTop: "10px",
      padding: "10px 15px",
      border: "none",
      backgroundColor: "black",
      fontSize: "14px",
      borderRadius: "5px",
      color: "#fff",
    },
  },
};

const PhoneBookForm = (props) => {
  //initial state
  const initialUser = {
    id: null,
    firstName: "Jude",
    lastName: "Fabiano",
    phoneNumber: "0000",
  };

  const [userDetails, setUserDetails] = useState(initialUser);

  //chnage handler
  const changeHandler = (e) => {
    const { name, value } = e.target;
    setUserDetails({
      ...userDetails,
      [name]: value,
    });
  };

  //submit handler
  const submitData = (e) => {
    e.preventDefault();
    if (
      !userDetails.firstName ||
      !userDetails.lastName ||
      !userDetails.phoneNumber
    )
      return;

    props.addPhoneEntry(userDetails);
    setUserDetails(initialUser);
  };

  return (
    <form onSubmit={submitData} style={style.form.container}>
      <label>First Name </label>
      <br />
      <input
        style={style.form.inputs}
        className="firstName"
        name="firstName"
        type="text"
        value={userDetails.firstName}
        onChange={changeHandler}
      />
      <label>Last Name </label>
      <input
        style={style.form.inputs}
        className="lastName"
        name="lastName"
        type="text"
        value={userDetails.lastName}
        onChange={changeHandler}
      />
      <label>Phone Number </label>
      <input
        style={style.form.inputs}
        className="phoneNumber"
        name="phoneNumber"
        type="text"
        value={userDetails.phoneNumber}
        onChange={changeHandler}
      />

      {/* Submit Button */}
      <input
        style={style.form.submitBtn}
        className="submitButton"
        type="submit"
        value="Add User"
      />
    </form>
  );
};

const InformationTable = ({ users }) => {
  const sortedContacts = users.sort((a, b) =>
    a.lastName.localeCompare(b.lastName)
  );

  const display = sortedContacts.map((user, index) => (
    <tr key={index}>
      <td style={style.tableCell}>{user.firstName}</td>
      <td style={style.tableCell}>{user.lastName}</td>
      <td style={style.tableCell}>{user.phoneNumber}</td>
    </tr>
  ));

  return (
    <table style={style.table} className="informationTable">
      <thead>
        <tr>
          <th style={style.tableCell}>First name</th>
          <th style={style.tableCell}>Last name</th>
          <th style={style.tableCell}>Phone</th>
        </tr>
      </thead>
      <tbody>{display}</tbody>
    </table>
  );
};

const App = (props) => {
  //receive users and store in array
  const userListObject = [];
  const [users, setUsers] = useState(userListObject);

  const addPhoneEntry = (user) => {
    user.id = users.length + 1;
    setUsers([...users, user]);
    console.log("Users", users);
  };

  return (
    <section>
      <PhoneBookForm addPhoneEntry={addPhoneEntry} />
      <InformationTable users={users} />
    </section>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
