"use client";
import { useState } from "react";
import { Table, Button, Form, Row, Col } from "react-bootstrap";
import { toast } from "react-toastify";

export default function Page() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResult, setSearchResult] = useState([]);

  const handleSearchBtn = async (e) => {
    // Prevent the Reload
    e.preventDefault();

    // Fetch data from API

    console.log(searchQuery);

    const data = {
      fullName: searchQuery,
    };

    try {
      const response = await fetch("/api/search-loan", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      if (response.ok) {
        // toast.success("Berhasil input data pengunjung");
        setSearchResult(result);
        console.log(searchResult);
      } else {
        toast.error(result.error);
      }
    } catch (e) {
      toast.error(e);
    }
  };
  return (
    <>
      <Row>
        <Col lg={6}>
          <h1>Form Pengembalian</h1>
          <Form className="d-flex my-5" onSubmit={handleSearchBtn}>
            <Form.Group>
              <Form.Control
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Button className="mx-2" variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
      <hr></hr>
      <Table responsive striped bordered hover>
        <thead>
          <tr>
            <th>Nama Lengkap</th>
            <th>Judul Buku</th>
            <th>Unit</th>
            <th>Kelas</th>
            <th>Waktu Peminjaman</th>
            <th>Waktu Pengembalian</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          {searchResult.length > 0 ? (
            searchResult.map((result, index) => {
              <tr key={index}>
                <td>{result.loan_name}</td>
                <td>{result.loan_book}</td>
                <td>{result.unit_name}</td>
                <td>{result.class_desc}</td>
                <td>{result.loan_start_date}</td>
                <td>{result.loan_end_date}</td>
                <td>
                  <Button variant="warning">Edit</Button>
                </td>
              </tr>;
            })
          ) : (
            <tr>
              <td colSpan="7">No results found</td>
            </tr>
          )}
        </tbody>
      </Table>
    </>
  );
}
