import React, { useState, useEffect } from 'react';
import './App.css';
import conditionerIcon from './img/air-conditioner.png';
import fanIcon from './img/fan.png';
import heaterIcon from './img/heater.png';
import { Navbar, Button, ButtonGroup, Container, Row, Col, Card, ListGroup, Form } from 'react-bootstrap';

const minNormal = 18;
const maxNormal = 24;
function App() {
  const [automatic, setAutomatic] = useState(true);
  const [tempOutside, setTempOutside] = useState(60);
  const [tempInside, setTempInside] = useState(65);

  const [conditioner, setConditioner] = useState(false);
  const [fan, setFan] = useState(false);
  const [heater, setHeater] = useState(true);

  useEffect(() => {
    if (automatic) {
      let outside = tempOutside - 40;
      let inside = tempInside - 40;
      if (outside > maxNormal && inside > maxNormal) {
        setConditioner(true);
        setFan(true);
        setHeater(false);
      } else if (outside <= minNormal && inside > maxNormal) {
        setConditioner(false);
        setFan(false);
        setHeater(false);
      } else if (outside <= maxNormal && outside >= minNormal && inside > maxNormal) {
        setConditioner(true);
        setFan(true);
        setHeater(false);
      }

      else if (outside > maxNormal && inside <= maxNormal && inside >= minNormal) {
        setConditioner(false);
        setFan(false);
        setHeater(false);
      } else if (outside <= minNormal && inside <= maxNormal && inside >= minNormal) {
        setConditioner(false);
        setFan(false);
        setHeater(false);
      } else if (outside <= maxNormal && outside >= minNormal && inside <= maxNormal && inside >= minNormal) {
        setConditioner(false);
        setFan(false);
        setHeater(false);
      }

      else if (outside > maxNormal && inside < minNormal) {
        setConditioner(false);
        setFan(false);
        setHeater(false);
      } else if (outside <= minNormal && inside < minNormal) {
        setConditioner(false);
        setFan(false);
        setHeater(true);
      } else if (outside <= maxNormal && outside >= minNormal && inside < minNormal) {
        setConditioner(false);
        setFan(false);
        setHeater(false);
      }
    }

  }, [tempOutside, tempInside, automatic]);

  return (
    <div>
      <Navbar bg="dark" variant="dark" sticky="top" >
        <Navbar.Brand href="#home">
          Розумний термостат
      </Navbar.Brand>
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            Розумний режим: &nbsp;
        </Navbar.Text>
          <ButtonGroup>
            <Button type="button"
              className={"btn " + (automatic ? "btn-primary" : "btn-light")}
              onClick={() => setAutomatic(true)}
            >Увімкнути</Button>
            <Button type="button"
              className={"btn " + (automatic ? "btn-light" : "btn-primary")}
              onClick={() => setAutomatic(false)}
            >Вимкнути</Button>
          </ButtonGroup>
        </Navbar.Collapse>
      </Navbar>
      <Container fluid>
        <Row>
          <Col>
            <Card className="text-center">
              <Card.Body>
                <h3>
                  Всередині:
                  &nbsp;
                  &#9728;
                  {tempInside - 40}
                  &#8451;
                  &nbsp;
                  &#9729;
                  60%
                </h3>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card className="text-center" >
              <Card.Body>
                <h3>
                  Ззовні:
                  &nbsp;
                  &#9728;
                  {tempOutside - 40}
                  &#8451;
                  &nbsp;
                  &#9729;
                  60%
                </h3>
              </Card.Body>
            </Card></Col>
        </Row>
        <Row>
          <Col>
            <Card className="text-center" bg='light'>
              <Card.Img variant="top" src={conditionerIcon} />
              <Card.Body>
                <Card.Title>Кондиціонер</Card.Title>
                <Button
                  type="button"
                  disabled={automatic}
                  className={"btn " + (conditioner ? "btn-primary" : "btn-light")}
                  onClick={() => setConditioner(true)}
                >
                  Увімкнути
                      </Button>
                <Button
                  type="button"
                  disabled={automatic}
                  className={"btn " + (!conditioner ? "btn-primary" : "btn-light")}
                  onClick={() => setConditioner(false)}
                >
                  Вимкнути
                      </Button>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card className="text-center" bg='light'>
              <Card.Img variant="top" src={heaterIcon} />
              <Card.Body>
                <Card.Title>Обігрівач</Card.Title>
                <Button
                  type="button"
                  disabled={automatic}
                  className={"btn " + (heater ? "btn-primary" : "btn-light")}
                  onClick={() => setHeater(true)}
                >
                  Увімкнути
                      </Button>
                <Button
                  type="button"
                  disabled={automatic}
                  className={"btn " + (!heater ? "btn-primary" : "btn-light")}
                  onClick={() => setHeater(false)}
                >
                  Вимкнути
                      </Button>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card className="text-center" bg='light'>
              <Card.Img variant="top" src={fanIcon} />
              <Card.Body>
                <Card.Title>Вентилятор</Card.Title>
                <Button
                  type="button"
                  disabled={automatic}
                  className={"btn " + (fan ? "btn-primary" : "btn-light")}
                  onClick={() => setFan(true)}
                >
                  Увімкнути
                      </Button>
                <Button
                  type="button"
                  disabled={automatic}
                  className={"btn " + (!fan ? "btn-primary" : "btn-light")}
                  onClick={() => setFan(false)}
                >
                  Вимкнути
                      </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col>
            <Card classname="text-center">
              <Card.Header as="h2">Симуляція</Card.Header>
              <Card.Body>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h3>
                    Всередині:
                    &nbsp;
                    &#9728;
                  {tempInside - 40}
                  &#8451;
                </h3>
                  <Form.Control value={tempInside} onChange={(e) => { setTempInside(e.target.value) }} type="range" custom />
                </ListGroup.Item>
                <ListGroup.Item>
                  <h3>
                    Ззовні:
                    &nbsp;
                    &#9728;
                  {tempOutside - 40}
                  &#8451;
                </h3>
                  <Form.Control value={tempOutside} onChange={(e) => { setTempOutside(e.target.value) }} type="range" custom />
                </ListGroup.Item>
              </ListGroup>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
