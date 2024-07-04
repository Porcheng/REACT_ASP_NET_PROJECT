import React, { useState } from 'react';
import { Container,Row, Col, Button, Card } from 'react-bootstrap';
import Header from './Header';
import { Link } from 'react-router-dom';

const Dashboard = () => {
    return (
        <>
            <Header></Header>
            {/* <Container className="mt-5">
        <h1>Employee Management Dashboard</h1>
        <Form onSubmit={handleSubmit}>
          <Row className="mb-3 align-items-end">
            <Col md={3}>
              <Form.Group>
                <Form.Label>Select Criteria</Form.Label>
                <Form.Control as="select" value={selectedCriteria} onChange={handleCriteriaChange}>
                  <option value="">Select Criteria</option>
                  <option value="id">ID</option>
                  <option value="gender">Gender</option>
                  <option value="birthday">Birthday</option>
                </Form.Control>
              </Form.Group>
            </Col>
            {selectedCriteria === 'id' && (
              <Col md={3}>
                <Form.Group>
                  <Form.Label>ID</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter ID"
                    value={searchID}
                    onChange={(e) => setSearchID(e.target.value)}
                  />
                </Form.Group>
              </Col>
            )}
            {selectedCriteria === 'gender' && (
              <Col md={3}>
                <Form.Group>
                  <Form.Label>Gender</Form.Label>
                  <div>
                    <Form.Check
                      inline
                      label="Male"
                      type="radio"
                      name="gender"
                      value="1"
                      checked={searchGender === '1'}
                      onChange={(e) => setSearchGender(e.target.value)}
                    />
                    <Form.Check
                      inline
                      label="Female"
                      type="radio"
                      name="gender"
                      value="2"
                      checked={searchGender === '2'}
                      onChange={(e) => setSearchGender(e.target.value)}
                    />
                    <Form.Check
                      inline
                      label="Any"
                      type="radio"
                      name="gender"
                      value=""
                      checked={searchGender === ''}
                      onChange={(e) => setSearchGender('')}
                    />
                  </div>
                </Form.Group>
              </Col>
            )}
            {selectedCriteria === 'birthday' && (
              <>
                <Col md={3}>
                  <Form.Group>
                    <Form.Label>From Date</Form.Label>
                    <Form.Control
                      type="date"
                      value={searchFromDate}
                      onChange={(e) => setSearchFromDate(e.target.value)}
                    />
                  </Form.Group>
                </Col>
                <Col md={3}>
                  <Form.Group>
                    <Form.Label>To Date</Form.Label>
                    <Form.Control
                      type="date"
                      value={searchToDate}
                      onChange={(e) => setSearchToDate(e.target.value)}
                    />
                  </Form.Group>
                </Col>
              </>
            )}
            <Col md={3} className="text-md-start text-end mt-md-0 mt-3">
              <Button variant="primary" type="submit">
                Search
              </Button>
            </Col>
          </Row>
        </Form>
      </Container> */}
        </>
    );
};

export default Dashboard;
