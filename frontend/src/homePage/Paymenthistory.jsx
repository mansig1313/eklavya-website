import React, { useState } from "react";
import { Card, TextField, Button, Table, TableHead, TableRow, TableCell, TableBody } from "@mui/material";
import "./Paymenthistory.css";

const PaymentHistory = () => {
  const [teacher, setTeacher] = useState("");
  const [filteredPayments, setFilteredPayments] = useState([]);

  const payments = [
    { id: "INV001", date: "10-Feb-2025", teacher: "Mr. Sharma", amount: "₹2,500", method: "UPI", status: "Paid" },
    { id: "INV002", date: "05-Feb-2025", teacher: "Mrs. Mehta", amount: "₹3,000", method: "Credit Card", status: "Paid" },
    { id: "INV003", date: "25-Jan-2025", teacher: "Mr. Kumar", amount: "₹2,000", method: "Net Banking", status: "Failed" },
    { id: "INV004", date: "20-Jan-2025", teacher: "Mr. Verma", amount: "₹2,800", method: "Debit Card", status: "Paid" },
  ];

  const handleSearch = () => {
    if (!teacher.trim()) {
      setFilteredPayments([]);
      return;
    }
    const results = payments.filter((payment) =>
      payment.teacher.toLowerCase().includes(teacher.toLowerCase())
    );
    setFilteredPayments(results);
  };

  return (
    <div className="payment-history-container">
      <Card className="payment-history-card">
        <h2 className="payment-history-title">Search Payment History</h2>
        <div className="payment-history-search-bar">
          <TextField
            label="Enter Teacher ID or Name"
            variant="outlined"
            value={teacher}
            onChange={(e) => setTeacher(e.target.value)}
          />
          <Button variant="contained" color="primary" onClick={handleSearch}>
            Search
          </Button>
        </div>

        {filteredPayments.length > 0 && (
          <Table className="payment-history-table">
            <TableHead>
              <TableRow>
                <TableCell>Payment ID</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Teacher Name</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell>Method</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredPayments.map((payment, index) => (
                <TableRow key={index}>
                  <TableCell>{payment.id}</TableCell>
                  <TableCell>{payment.date}</TableCell>
                  <TableCell>{payment.teacher}</TableCell>
                  <TableCell>{payment.amount}</TableCell>
                  <TableCell>{payment.method}</TableCell>
                  <TableCell>{payment.status}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </Card>
    </div>
  );
};

export default PaymentHistory;
