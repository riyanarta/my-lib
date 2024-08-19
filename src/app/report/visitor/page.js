"use client";

import { Table } from "react-bootstrap";
import { useState, useEffect } from "react";

export default function Page() {
  const [visitor, setVisitor] = useState([]);
  const [sortColumn, setSortColumn] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");

  useEffect(() => {
    const fetchVisitor = async () => {
      try {
        const response = await fetch("/api/report-visitor");
        const data = await response.json();
        if (Array.isArray(data)) {
          setVisitor(data);
        } else {
          console.error("Invalid data format");
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchVisitor();
  }, []);

  const wibTime = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("id-ID", {
      timeZone: "Asia/Jakarta",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    }).format(date);
  };

  const handleSort = (column) => {
    if (sortColumn === column) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortOrder("asc");
    }
  };

  const sortedVisitor = [...visitor].sort((a, b) => {
    if (sortColumn) {
      if (sortOrder === "asc") {
        return a[sortColumn] < b[sortColumn] ? -1 : 1;
      } else {
        return a[sortColumn] > b[sortColumn] ? -1 : 1;
      }
    } else {
      return 0;
    }
  });

  return (
    <>
      <Table responsive bordered striped>
        <thead>
          <tr>
            <th onClick={() => handleSort()}>Nama Pengunjung</th>
            <th onClick={() => handleSort()}>Jenjang</th>
            <th onClick={() => handleSort()}>Kelas</th>
            <th onClick={() => handleSort()}>Jam Kunjungan</th>
          </tr>
        </thead>
        <tbody>
          {sortedVisitor.map((visitors) => (
            <tr key={visitors.visitor_id}>
              <td>{visitors.visitor_name}</td>
              <td>{visitors.unit_name}</td>
              <td>{visitors.class_desc}</td>
              <td>{wibTime(visitors.visitor_date).split("pukul")}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
}
