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
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchUnitsAndClasses = async () => {
      try {
        const unitResponse = await fetch("/api/unit");
        const unitData = await unitResponse.json();
        // console.log("Units:", unitData); // Log the response
        if (Array.isArray(unitData)) {
          setUnits(unitData || []);
        } else {
          toast.error(
            "Invalid data format, please check your database connection"
          );
          setUnits([]);
        }

        const classResponse = await fetch("/api/class");
        const classData = await classResponse.json();
        // console.log("Classes:", classData); // Log the response
        if (Array.isArray(classData)) {
          setClasses(classData);
        } else {
          toast.error(
            "Invalid data format, please check your database connection"
          );
          setClasses([]);
        }
      } catch (err) {
        toast.error(err);
      }
    };

    fetchUnitsAndClasses();
  }, []);

  const filteredClasses = Array.isArray(classes)
    ? classes.filter((cls) => cls.unit_id === Number(selectedUnit))
    : [];

  const handleFormVisitor = async (e) => {
    e.preventDefault();

    if (!fullName || !selectedClass || !selectedUnit) {
      toast.error("Harap isi semua data terlebih dahulu");
      setTimeout(() => {
        setFullName("");
        setSelectedClass("");
        setSelectedClass("");
      }, 2000);
      return;
    }

    setIsSubmitting(true);
    const data = {
      fullName: fullName ?? null,
      selectedClass: selectedClass ?? null,
    };

    console.log(data);

    try {
      const response = await fetch("/api/insert-visitor", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      if (response.ok) {
        toast.success("Berhasil input data pengunjung");
        setTimeout(() => {
          setFullName("");
          setClasses("");
          setSelectedUnit("");
          setSelectedClass("");
        }, 1500);
      } else {
        toast.error(result.error);
      }
    } catch (e) {
      toast.error(e);
    } finally {
      setTimeout(() => {
        setIsSubmitting(false);
      }, 1500);
    }
  };

  return (
    <>
      {/* <ToastContainer autoClose={1000} /> */}
      <Row>
        <Col lg={6}>
          <h1>Form Pengunjung</h1>
          <Form onSubmit={handleFormVisitor}>
            <Form.Group className="mb-3">
              <Form.Label>Nama Lengkap</Form.Label>
              <Form.Control
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
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
            <Button type="submit" disabled={isSubmitting}>
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
    </>
  );
}
