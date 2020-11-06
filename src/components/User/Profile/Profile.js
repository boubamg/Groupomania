import React, {Fragment} from 'react'
import { Card, Container, Row, Col } from "reactstrap";
import Button from '@material-ui/core/Button';
import './Profile.css'

const Profile = ({profilePicture, lastname, firstname, email, biography, component, handleDelete}) => {
    return (

        <Fragment>
       
        <main className="profile-page mb-5" >
          <section className="section">
            <Container>
              <Card className="card-profile shadow mt--300">
                <div className="px-4">
                  <Row className="justify-content-center">
                    <Col className="order-lg-2" lg="3">
                      <div className="card-profile-image">

                        {profilePicture ?  <img
                            className="rounded-circle"
                            src={profilePicture}
                          /> : null}
                         
                      </div>
                    </Col>
                    
                  </Row>
                  <div className="text-center mt-5">
                    <h3>
                      {lastname}  {' '}  {firstname}
                    </h3>
            
                    <div className="h6 mt-4">
                      <i className="ni business_briefcase-24 mr-2" />
                      {email}
                    </div>
                  </div>
                  <div className="mt-5 py-5 border-top text-center">
                    <Row className="justify-content-center">
                      <Col lg="9">
                        <p>
                         {biography}
                        </p>
                      </Col>
                    </Row>
                  </div>
                </div>
                {component}
                <Button variant="contained" color="secondary" onClick={handleDelete}>
                  Supprimer le compte
                </Button>
              </Card>
            </Container>
          </section>
          
        </main>
      </Fragment>
    )
}

export default Profile