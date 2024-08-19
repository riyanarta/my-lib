"use client";
import { useState, useEffect } from "react";
import { Button, Form, Col, Row } from "react-bootstrap";
import { toast } from "react-toastify";

export default function FormTemplate() {
  const [units, setUnits] = useState([]);
  const [classes, setClasses] = useState([]);
  const [selectedUnit, setSelectedUnit] = useState("");
  const [selectedClass, setSelectedClass] = useState("");
  const [fullName, setFullName] = useState("");
  const [bookTitle, setBookTitle] = useState("");
  const [formattedCurrentDate, setFormattedCurrentDate] = useState("");
  const [formattedReturnDate, setFormattedReturnDate] = useState("");

  // Fetch units and classes on component mount
  useEffect(() => {
    const fetchUnitsAndClasses = async () => {
      try {
        const unitResponse = await fetch("/api/unit");
        const unitData = await unitResponse.json();
        // console.log("Units:", unitData); // Log the response
        if (Array.isArray(unitData)) {
          setUnits(unitData || []);
        } else {
          toast.error("Invalid data format. Expected array.");
          setUnits([]);
        }

        const classResponse = await fetch("/api/class");
        const classData = await classResponse.json();
        // console.log("Classes:", classData); // Log the response
        if (Array.isArray(classData)) {
          setClasses(classData);
        } else {
          toast.error("Invalid data format. Expected array.");
          setClasses([]);
        }
      } catch (err) {
        toast.error(err);
      }
    };

    fetchUnitsAndClasses();
  }, []);

  useEffect(() => {
    const now = new Date();
    const day = now.getDate();
    const month = now.getMonth() + 1; // Month is 0-indexed
    const year = now.getFullYear();

    // Format the current date

    const formattedCurrentDate = `${day.toString().padStart(2, "0")}/${month
      .toString()
      .padStart(2, "0")}/${year}`;
    setFormattedCurrentDate(formattedCurrentDate);
    // console.log(formattedCurrentDate);

    // Format the next day Return date
    const returnDate = new Date(year, month, day + 7);
    const formattedReturnDate = `${returnDate
      .getDate()
      .toString()
      .padStart(2, "0")}/${returnDate
      .getMonth()
      .toString()
      .padStart(2, "0")}/${returnDate.getFullYear()}`;
    setFormattedReturnDate(formattedReturnDate);
    // console.log(formattedReturnDate);
  }, []);

  // Filter classes based on selected unit
  const filteredClasses = classes?.filter(
    (cls) => cls.unit_id === Number(selectedUnit)
  );

  const handleFormLoan = async (e) => {
    e.preventDefault();

    if (!fullName || !bookTitle || !selectedUnit || !selectedClass) {
      toast.error("Harap isi semua data terlebih dahulu");
      setTimeout(() => {
        setFullName("");
        setBookTitle("");
        setSelectedUnit("");
        setSelectedClass("");
      }, 2000);
      return;
    }

    const data = {
      fullName: fullName ?? null,
      bookTitle: bookTitle ?? null,
      selectedClass: selectedClass ?? null,
      formattedCurrentDate: formattedCurrentDate ?? null,
      formattedReturnDate: formattedReturnDate ?? null,
    };

    // console.log(data);

    try {
      const response = await fetch("/api/insert-loan", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      if (response.ok) {
        toast.success("Berhasil melakukan peminjaman");
        setTimeout(() => {
          setFullName("");
          setBookTitle("");
          setSelectedUnit("");
          setSelectedClass("");
        }, 2000);
      } else {
        toast.error(result.error);
      }
    } catch (e) {
      toast.error(e.message);
    }
  };

  return (
    <>
      <Row>
        <Col lg={6}>
          <h1>Form Peminjaman</h1>
          <Form onSubmit={handleFormLoan}>
            <Form.Group className="mb-3">
              <Form.Label>Nama Lengkap</Form.Label>
              <Form.Control
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Judul Buku</Form.Label>
              <Form.Control
                type="text"
                value={bookTitle}
                onChange={(e) => setBookTitle(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>UNIT</Form.Label>
              <Form.Select
                value={selectedUnit}
                onChange={(e) => setSelectedUnit(e.target.value)}
              >
                <option value="">Pilih Unit</option>
                {units.map((unit) => (
                  <option key={unit.unit_id} value={unit.unit_id}>
                    {unit.unit_name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>KELAS</Form.Label>
              <Form.Select
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value)}
              >
                <option value="">Pilih Kelas</option>
                {filteredClasses?.length ? (
                  filteredClasses.map((cls) => (
                    <option key={cls.class_id} value={cls.class_id}>
                      {cls.class_desc}
                    </option>
                  ))
                ) : (
                  <option>Kelas Tidak Tersedia</option>
                )}
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Waktu Saat ini</Form.Label>
              <Form.Control
                type="text"
                value={formattedCurrentDate}
                readOnly
              ></Form.Control>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Waktu Pengembalian</Form.Label>
              <Form.Control
                type="text"
                value={formattedReturnDate}
                readOnly
              ></Form.Control>
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
    </>
  );
}
