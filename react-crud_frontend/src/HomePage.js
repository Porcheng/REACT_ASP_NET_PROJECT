import React from 'react';
import { Container, Button, Row, Col } from 'react-bootstrap';

const HomePage = () => {
    return (
        <Container className="mt-5">
            <h1 className="text-center mb-4">Employee Management System Dashboard</h1>
            <Row className="justify-content-center">
                <Col xs="auto" className="mb-3">
                    <a href="/advanced-search" className="btn btn-primary btn-lg">Advanced Search</a>
                </Col>
                <Col xs="auto" className="mb-3">
                    <a href="/crud-form" className="btn btn-success btn-lg">CRUD Form</a>
                </Col>
            </Row>
        </Container>
    );
}

export default HomePage;
