import { Container, Form, Button } from "react-bootstrap";
import "./Contact.css";
import { useRef, useState } from "react";

const Contact = () => {
  const [saveUser, setSaveUser] = useState(false);
  const emailRef = useRef("");
  const nameRef = useRef("");

  const addUserHandler = async (user) => {
    const response = await fetch(
      "https://react-pra-eco-default-rtdb.firebaseio.com//users.json",
      {
        method: "POST",
        body: JSON.stringify(user),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (!response.ok) {
      throw new Error("SomeThing went Wrong..");
    }
    else {
      setSaveUser(true);
    }
  };

  const saveUserDetailsHandler = (e) => {
    e.preventDefault();
    const user = {
        name: nameRef.current.value,
      email: emailRef.current.value,
    };
    addUserHandler(user);
  };

  return (
    <section>
      <Container>
        <h1>Contact US</h1>
        {saveUser && <div className="saveUser-wrap"><h5>ThankYou for Contacting Us!!!</h5><p>We Saved your Contact...</p></div>}
        {!saveUser && <Form className="form-wrap" onSubmit={saveUserDetailsHandler}> 
        <Form.Group className="mb-3" controlId="formGroupname">
            <Form.Label>Enter Name</Form.Label>
            <Form.Control type="text" placeholder="Enter name" ref={nameRef} />
          </Form.Group>       
          <Form.Group className="mb-3" controlId="formGroupEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" ref={emailRef} />
          </Form.Group>
          <Button variant="primary" type="submit">
            SUBMIT
          </Button>
        </Form>}
      </Container>
    </section>
  );
};

export default Contact;