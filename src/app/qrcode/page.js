"use client";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import QRCode from "qrcode.react";
import { useState } from "react";

function QRCodeGenerator() {
  const [text, setText] = useState("");

  const handleChange = (e) => {
    setText(e.target.value);
  };

  const notify = () => toast("Wow so easy!");

  return (
    <>
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <h1>QR Code Generator</h1>
        <input
          type="text"
          value={text}
          onChange={handleChange}
          placeholder="Enter text or URL"
          style={{ padding: "10px", fontSize: "16px" }}
        />
        <div style={{ marginTop: "20px" }}>
          <QRCode value={text} size={256} />
        </div>
      </div>
      <button onClick={notify}>Notify!</button>
      <ToastContainer />
    </>
  );
}

export default QRCodeGenerator;
