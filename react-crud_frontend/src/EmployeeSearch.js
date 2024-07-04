import React, { useState } from 'react';
import AdvancedSearchForm from "./advanceSearch";
import { Container, Table, Button } from 'react-bootstrap';
import axios from 'axios';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const EmployeeSearch = () => {
    const [searchResults, setSearchResults] = useState([]);

    const handleSearch = (criteria) => {
        const query = new URLSearchParams(criteria).toString();
        axios.get(`https://localhost:7117/api/Employee/search?${query}`)
            .then(response => {
                setSearchResults(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the search results!', error);
                setSearchResults('Notfound');
            });
    };

    const getGenderLabel = (gender) => {
        if (gender === '1' || gender === 1) {
            return 'Male';
        } else if (gender === '2' || gender === 2) {
            return 'Female';
        } else {
            return 'Unknown';
        }
    };
    const handleExportExcel = () => {
        const ws = XLSX.utils.json_to_sheet(searchResults);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Employee Search Results");
        const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
        const data = new Blob([excelBuffer], { type: "application/octet-stream" });
        saveAs(data, "employee_search_results.xlsx");
    };

    const handleExportPDF = () => {
        const input = document.getElementById('search-results');
        html2canvas(input)
            .then((canvas) => {
                const imgData = canvas.toDataURL('image/png');
                const pdf = new jsPDF();
                const imgHeight = canvas.height * 208 / canvas.width;
                pdf.addImage(imgData, 'PNG', 0, 0, 208, imgHeight);
                pdf.save("employee_search_results.pdf");
            });
    };

    return (
        <Container>
            <h1 className="my-4">Advanced Search</h1>
            <AdvancedSearchForm handleSearch={handleSearch} />
            <h2 className="my-4">Search Results</h2>
            <div id="search-results">
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Birth Date</th>
                            <th>Gender</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            searchResults === 'Notfound' ?
                                <tr>
                                    <td colSpan="4" className="text-center">No results found</td>
                                </tr>
                                : searchResults.map((item, index) => (
                                    <tr key={index}>
                                        <td>{item.id}</td>
                                        <td>{item.name}</td>
                                        <td>{item.birthDate}</td>
                                        <td>{getGenderLabel(item.gender)}</td>
                                    </tr>
                                ))

                        }
                    </tbody>
                </Table>
            </div>
            <Button variant="success" className="me-2" onClick={handleExportExcel}>Export to Excel</Button>
            <Button variant="primary" onClick={handleExportPDF}>Export to PDF</Button>
        </Container>
    );
};

export default EmployeeSearch;
