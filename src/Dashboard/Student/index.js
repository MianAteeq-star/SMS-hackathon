import React, { useEffect, useState } from 'react';
import { Button, Col, Divider, Form, Input, Modal, Row,  Space, Tooltip, message } from 'antd';
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { useNavigate } from 'react-router-dom';
import { collection, deleteDoc, doc, getDocs, setDoc, updateDoc } from 'firebase/firestore';
import { firestore } from '../../config/ConfigFirebase';

export default function Index() {
  const [allDocuments, setAllDocuments] = useState([]);
  const [student ,setStudent]= useState([])
  const [std, setStd] = useState({});
  const [confirmLoading, setConfirmLoading] = useState(false);
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  // ______________________Create_____________________________
  
  const handleOk = async (e) => {
    e.preventDefault();
    const { name, contact, rollno, email } = std;
    const stdData= {name, contact, rollno, email ,
id:Math.random().toString(36).slice(2)

    }

    if (contact.length<11) {
      return message.error("Please enter contact No. of eleven (11) digits");
    }
    
    if (name.length < 3) {
      return message.error("Please enter a name.");
    }

    setConfirmLoading(true);
    
    try {
      
      await setDoc(doc(firestore, "student", stdData.id), stdData);
      setConfirmLoading(false);
      setIsModalOpen(false);
      message.success("Add student Successfully", "success");
    } catch (err) {
      message.error("Student is not added", err.message);
      console.error('err', err);
      setConfirmLoading(false);
    }
    getStd()
  };
  
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  
  const handleChange = (e) => setStd((s) => ({ ...s, [e.target.name]: e.target.value }));
  
  // ______________________Read_____________________________
  const getStd = async () => {
    const querySnapshot = await getDocs(collection(firestore, "student"));
    const array = [];
    querySnapshot.forEach((doc) => {
      let data = doc.data();
      array.push(data);
    });
    setAllDocuments(array);
  };
  
  useEffect(() => {
    getStd();
  }, []);


  // _____________________Edit_____________________________

  const handleEdit = (stdId) => {
    
    setIsModalOpen(true)
    // let { date, title, discription, color } = state
    
    const editStd = allDocuments.find((data => data.id === stdId))
    if (editStd) {
      
      setStd({
        name: editStd.name,
        contact: editStd.contact,
        rollno: editStd.rollno,
        email: editStd.email
      })
      setStudent(editStd.id)
    }
    handleUpdate()
    
    
  }

  // ________________________Update______________________
  
  const handleUpdate = async () => {
    
    setIsModalOpen(true)
    const { name, contact, rollno, email } = std;
    
    if (!rollno) {
      return message.error("Please enter Roll No.");
    }
    const stdToUpdate = allDocuments.find((data)=> data.id ===student);
    if(!stdToUpdate){
      return
    }
    
    const updatedStudent = {
      ...stdToUpdate ,  
      name,
      contact,
      rollno,
      email,
      id:Math.random().toString(36).slice(2)
    };
    
    try {
      await updateDoc(doc(firestore, "student",  student), updatedStudent);
      message.success("Student updated successfully");
      getStd()
      setIsModalOpen(false);
    } catch (err) {
      console.error(err);
      message.error("Something went wrong while updating the student");
    }
    setIsModalOpen(false)
  };
  
  // ______________________Delete_____________________________
  const handleDelete = async (student) => {
    try {
      await deleteDoc(doc(firestore, "student", student.id));

      let documentsAfterDelete = allDocuments.filter((doc) => doc.id !== student.id);
      setAllDocuments(documentsAfterDelete);

      message.success("Student deleted successfully");
    } catch (err) {
      console.error(err);
      message.error("Something went wrong while deleting the student");
    }
  };



  return (
    <>
    
      <div className='py-5'>
    <div className="container">
      <div className="row">
        <div className="col text-center">
          <h1>Student list</h1>

          <Button type="primary" onClick={showModal}>
    Add Student
  </Button>
  <Modal title="Student Data" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
  <Form layout="vertical" className='py-4'>
      <Row gutter={16}>
        <Col xs={24} lg={12}>
          <Form.Item label="Name">
            <Input placeholder='Input your Name' name='name'  value={std.name} onChange={handleChange}  />
          </Form.Item>
        </Col>
        <Col xs={24} lg={12}>
          <Form.Item label="Contact">
            <Input type="number" placeholder='Input your Contact Number' name='contact' value={std.contact} onChange={handleChange}  />
          </Form.Item>
        </Col>
        <Col xs={24} lg={12}>
          <Form.Item label="Roll No.">
            <Input type="number" placeholder='Input your Roll Number' name='rollno' value={std.rollno} onChange={handleChange} />
          </Form.Item>
        </Col>
        <Col xs={24} lg={12}>
          <Form.Item label="Email">
            <Input placeholder='Input your Email' name='email' value={std.email} onChange={handleChange}  />
          </Form.Item>
        </Col>
          
          
      </Row>
      <button className='btn btn-primary p-2' onClick={handleUpdate}>Update Student</button>
</Form>
   </Modal>
    


      </div>
      </div>
      <Divider />

      <div className="row">
        <div className="col">
          <div className="table-responsive">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Contact</th>
                  <th>Roll No.</th>
                  <th>Email</th>
               </tr>
              </thead>
              <tbody>
                {allDocuments.map((curElm, i) => {

                  
                    return (
                      <tr key={i}>
                        <th>{i + 1}</th>
                        <td>{curElm.name}</td>
                        <td>{curElm.contact}</td>
                        <td>{curElm.rollno}</td>
                        <td>{curElm.email}</td>
                          
                        <td>
                          <Space>
                            <Tooltip title="Delete" color='red'><Button danger icon={<DeleteOutlined />} onClick={() => { handleDelete(curElm) }} /></Tooltip>
                            <Tooltip title="Edit"><Button type="primary" icon={<EditOutlined />} onClick={() => {handleEdit(curElm.id)}} /></Tooltip>
                          </Space>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
