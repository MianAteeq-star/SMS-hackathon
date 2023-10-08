import React, { useState } from 'react';
import { Button, Form, FormGroup, Input, Label } from 'reactstrap'; // You can use Bootstrap components
import { collection, doc, updateDoc, getDoc } from 'firebase/firestore';
import { firestore } from '../../config/ConfigFirebase'; // Import your Firebase configuration

function AttendancePage() {
  const [rollNo, setRollNo] = useState('');
  const [courseName, setCourseName] = useState('');
  const [attendanceStatus, setAttendanceStatus] = useState('');

  const handleAttendanceSubmit = async (e) => {
    e.preventDefault();

    // Check if the student with the specified roll number exists in Firebase Firestore
    const studentDocRef = doc(firestore, 'students', rollNo);

    try {
      const studentDocSnapshot = await getDoc(studentDocRef);

      if (studentDocSnapshot.exists()) {
        // Student with the specified roll number exists
        const attendanceDocRef = doc(firestore, 'attendance', `${rollNo}_${courseName}`);

        // Create an object to store attendance data
        const attendanceData = {
          rollNo,
          courseName,
          attendanceStatus,
          date: new Date().toLocaleDateString(),
        };

        // Update the attendance record in Firebase Firestore
        await updateDoc(attendanceDocRef, attendanceData);

        // Clear the input fields after marking attendance
        setRollNo('');
        setCourseName('');
        setAttendanceStatus('');

        alert('Attendance marked successfully!');
      } else {
        // Student with the specified roll number doesn't exist
        alert('Student not found with the given roll number.');
      }
    } catch (error) {
      console.error('Error marking attendance:', error);
      alert('An error occurred while marking attendance.');
    }
  };

  return (
    <div>
      <h1 className='text-center'>Mark Attendance</h1>
      <Form onSubmit={handleAttendanceSubmit}>
        <FormGroup>
          <Label for="rollNo">Roll Number:</Label>
          <Input
            type="text"
            name="rollNo"
            id="rollNo"
            value={rollNo}
            onChange={(e) => setRollNo(e.target.value)}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label for="courseName">Course Name:</Label>
          <Input
            type="text"
            name="courseName"
            id="courseName"
            value={courseName}
            onChange={(e) => setCourseName(e.target.value)}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label for="attendanceStatus">Attendance Status:</Label>
          <Input
            type="select"
            name="attendanceStatus"
            id="attendanceStatus"
            value={attendanceStatus}
            onChange={(e) => setAttendanceStatus(e.target.value)}
            required
          >
            <option value="">Select Status</option>
            <option value="Present">Present</option>
            <option value="Absent">Absent</option>
          </Input>
        </FormGroup>
      <div className="text-center">  <Button  type="submit" className='btn btn-warning'>
          Mark Attendance
        </Button></div>
      </Form>
    </div>
  );
}

export default AttendancePage;
