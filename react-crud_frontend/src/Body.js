
import React, { useState } from 'react';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Body = () => {
    return (
        <>
            <Container className="mt-5">
                <Row className="bg-light p-5 rounded">
                    <Col>
                        <h1>Welcome to the Employee Management Dashboard!</h1>
                        <p>
                            This is your one-stop solution for managing employee information. Use the search
                            feature to find specific employees by ID, gender, or birthday.
                        </p>
                        <p>
                            <Button variant="primary" as={Link} to="/employee-management">Go to Employee Management</Button>
                        </p>
                    </Col>
                </Row>
                <Row className="mt-5">
                    <Col md={4}>
                        <Card>
                            <Card.Body>
                                <Card.Title>Employee Records</Card.Title>
                                <Card.Text>
                                    Manage employee records, update information, and view detailed profiles.
                                </Card.Text>
                                <Button variant="primary" as={Link} to="/employee-management">Manage Employees</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={4}>
                        <Card>
                            <Card.Body>
                                <Card.Title>Reports</Card.Title>
                                <Card.Text>
                                    Generate and view reports on employee performance, attendance, and more.
                                </Card.Text>
                                <Button variant="primary" as={Link} to="/report">View Reports</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    );
}
export default Body;