import React, { useState, useEffect, Fragment } from "react";
import { Container, Row, Col, Form, Button, Table, Alert } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'
import Modal from 'react-bootstrap/Modal';
import axios from "axios";

const CRUD = () => {
    // const emp = [{
    //     id: 'A001',
    //     name: 'Mike',
    //     birthDate: '22-02-1999',
    //     gender: 1
    // },
    // {
    //     id: 'A002',
    //     name: 'Jojo',
    //     birthDate: "30-01-2000",
    //     gender: 1
    // },
    // {
    //     id: "A003",
    //     name: "Vy",
    //     birthDate: "10-03-1980",
    //     gender: 2
    // }
    // ]
    const [data, setData] = useState([]);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [id, setId] = useState('')
    const [name, setName] = useState('')
    const [birthDate, setBirthDate] = useState('')
    const [gender, setGender] = useState(0)
    const [showModal, setShowModal] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    const [editID, setEditId] = useState('');
    const [editname, setEditName] = useState('')
    const [editbirthDate, setEditBirthDate] = useState('')
    const [editgender, setEditGender] = useState(null)

    useEffect(() => {
        // setData(emp);
        getData();
    }, [])

    const getData = () => {
        axios.get('https://localhost:7117/api/Employee')
            .then((result) => {
                setData(result.data)
            })
            .catch((error) => {
                console.log(error)
            })
    }
    const handleEdit = (id) => {
        handleShow();
        axios.get(`https://localhost:7117/api/Employee/${id}`)
            .then((result) => {
                setEditName(result.data.name);
                setEditBirthDate(result.data.birthDate);
                setEditGender(result.data.gender);
                setEditId(id);
            })
    }
    const handleDelete = (id) => {
        if (window.confirm("Are you sure to delete this employee") == true) {
            axios.delete(`https://localhost:7117/api/Employee/?id=${id}`)
                .then((result) => {
                    if (result.status === 200) {
                        console.log('Employee have been delete')
                        getData();
                    }
                }).catch((error) => {
                    console.log(error)
                })
        }

    }
    const handleUpdate = () => {
        const url = `https://localhost:7117/api/Employee/${editID}`;
        const data = {
            "id": editID,
            "name": editname,
            "birthDate": editbirthDate,
            "gender": editgender
        }
        axios.put(url, data)
            .then((result) => {
                handleClose();
                getData();
                clear();
            }).catch((error) => {
                console.log(error)
            })
    }
    const handleSave = () => {
        const url = 'https://localhost:7117/api/Employee'
        const data = {
            "id": id,
            "name": name,
            "birthDate": birthDate,
            "gender": gender
        }
        axios.post(url, data)
            .then((result) => {
                getData();
                setShowModal(true);
                setModalMessage('Employee added successfully!');
                //clear();
            })
            .catch((error) => {
                if (error.response && error.response.status === 409) {
                    setShowModal(true);
                    setModalMessage('Duplicate ID! Please input a new ID.');
                } else {
                    console.error('There was an error making the request:', error);
                }
            });

    }
    const handleCloseModal = () => {
        setShowModal(false);
    };

    const clear = () => {
        setId('')
        setName('')
        setBirthDate('')
        setGender('')
        setEditName('')
        setEditBirthDate('')
        setEditGender('')
        setEditId('')
    }

    const handleGenderChange = (e) => {
        setGender(e.target.value);
    }

    const handleEditGenderChange = (e) => {
        setEditGender(e.target.value);
    }
    const getGenderLabel = (gender) => {
        if (gender === '1' || gender === 1) {
            return 'Male';
        } else if (gender === '2' || gender === 2) {
            return 'Female';
        } else {
            return 'Unknown';
        }
    };
    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };
    const formatDateForApi = (dateString) => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        let month = (1 + date.getMonth()).toString().padStart(2, '0');
        let day = date.getDate().toString().padStart(2, '0');

        return `${year}-${month}-${day}`;
    };
    return (
        <Fragment>

            {/* <EmployeeSearch></EmployeeSearch> */}
            <Container className="mt-5">
                <Row className="mb-3">
                    {/* Add/Edit Form */}
                    <Col md={4}>
                        <Form onSubmit={handleSave}>
                            <Form.Group className="mb-3">
                                <Form.Label>ID</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter ID"
                                    value={id}
                                    onChange={(e) => setId(e.target.value)}
                                    required
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter Name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Birth Date</Form.Label>
                                <Form.Control
                                    type="date"
                                    placeholder="Enter Birth Date"
                                    value={birthDate}
                                    onChange={(e) => setBirthDate(e.target.value)}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Gender</Form.Label>
                                <div>
                                    <Form.Check
                                        inline
                                        label="Male"
                                        type="radio"
                                        name="gender"
                                        value="1"
                                        checked={gender === '1'}
                                        onChange={(e) => setGender(e.target.value)}
                                        required
                                    />
                                    <Form.Check
                                        inline
                                        label="Female"
                                        type="radio"
                                        name="gender"
                                        value="2"
                                        checked={gender === '2'}
                                        onChange={(e) => setGender(e.target.value)}
                                        required
                                    />
                                </div>
                            </Form.Group>
                            <Button variant="primary" type="submit" className="me-2">
                                Submit
                            </Button>
                            <Button variant="secondary" onClick={clear}>
                                Clear
                            </Button>
                        </Form>
                    </Col>

                    {/* Employee Table */}
                    <Col md={8}>
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Name</th>
                                    <th>Birth Date</th>
                                    <th>Gender</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data && data.length > 0 ? (
                                    data.map((item, index) => (
                                        <tr key={index}>
                                            <td>{item.id}</td>
                                            <td>{item.name}</td>
                                            <td>{formatDateForApi(item.birthDate)}</td>
                                            <td>{getGenderLabel(item.gender)}</td>
                                            <td>
                                                <Button variant="primary" onClick={() => handleEdit(item.id)} className="me-2">
                                                    Edit
                                                </Button>
                                                <Button variant="danger" onClick={() => handleDelete(item.id)}>
                                                    Delete
                                                </Button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="5" className="text-center">Loading...</td>
                                    </tr>
                                )}
                            </tbody>
                        </Table>
                    </Col>
                </Row>

                {/* Modal for Edit */}
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Modify Employee</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group className="mb-3">
                                <Form.Label>ID</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter ID"
                                    value={editID}
                                    onChange={(e) => setEditId(e.target.value)}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter Name"
                                    value={editname}
                                    onChange={(e) => setEditName(e.target.value)}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Birth Date</Form.Label>
                                <Form.Control
                                    type="date"
                                    placeholder="Enter Birth Date"
                                    value={formatDateForApi(editbirthDate)}
                                    onChange={(e) => setEditBirthDate(e.target.value)}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Gender</Form.Label>
                                <div>
                                    <Form.Check
                                        inline
                                        label="Male"
                                        type="radio"
                                        name="editGender"
                                        value="1"
                                        checked={editgender === '1' || editgender === 1}
                                        onChange={(e) => setEditGender(e.target.value)}
                                    />
                                    <Form.Check
                                        inline
                                        label="Female"
                                        type="radio"
                                        name="editGender"
                                        value="2"
                                        checked={editgender === '2' || editgender === 2}
                                        onChange={(e) => setEditGender(e.target.value)}
                                    />
                                </div>
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={handleUpdate}>
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </Modal>

                <Modal show={showModal} onHide={handleCloseModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Notification</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>{modalMessage}</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleCloseModal}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
            </Container>

        </Fragment>
    )
}

export default CRUD;