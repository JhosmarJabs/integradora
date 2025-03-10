import React from "react";
import { Card, Button, Row, Col, Container } from "react-bootstrap";
import { colors } from "../styles/styles";

const Cards = ({ items }) => {
  return (
    <Container>
      <Row>
        {items.map((item, index) => (
          <Col md={4} key={index} className="mb-4">
            <Card className="shadow-sm">
              <Card.Img 
                variant="top" 
                src={item.image} 
                alt={item.title}
                style={{
                  height: "200px", 
                  objectFit: "cover", 
                  borderRadius: "10px 10px 0 0"
                }}
              />
              <Card.Body style={{ backgroundColor: colors.white }}>
                <Card.Title style={{ color: colors.primaryDark }}>{item.title}</Card.Title>
                <Card.Text style={{ color: colors.primaryMedium }}>{item.description}</Card.Text>
                <Button style={{ backgroundColor: colors.accent, borderColor: colors.accent }}>
                  Ver Más
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Cards;
