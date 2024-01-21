import React from "react";
import "../assets/css/footer.css";

import {
  MDBFooter,
  MDBContainer,
  MDBCol,
  MDBRow,
  MDBInput,
} from "mdb-react-ui-kit";

const Footer = () => {
  return (
    <MDBFooter className="footer text-white text-center text-lg-left">
      <MDBContainer className="p-4">
        <MDBRow>
          <MDBCol
            md="6"
            lg="7"
            className="mb-4"
            style={{
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <h5 className="logo">SkinTerra.</h5>

            <p>
              Sign up for email updates on products, launches, and events.
              Unsubscribe anytime.
            </p>

            <form>
              <MDBRow className="subscribe">
                <MDBCol md="6" className="mb-3">
                  <MDBInput
                    type="text"
                    id="form"
                    placeholder="Email address"
                    className="inputBox"
                  />
                </MDBCol>
                <MDBCol md="6" className="mb-3">
                  <button className="submit">Submit</button>
                </MDBCol>
              </MDBRow>
            </form>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </MDBFooter>
  );
};

export default Footer;
