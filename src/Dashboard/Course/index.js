import React, { useEffect, useState } from 'react';
import { Button, Col, Divider, Form, Input, Modal, Row,  Space, Tooltip, message } from 'antd';
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { useNavigate } from 'react-router-dom';
import { collection, deleteDoc, doc, getDocs, setDoc, updateDoc } from 'firebase/firestore';
import { firestore } from '../../config/ConfigFirebase';

export default function Index() {
  const [allDocuments, setAllDocuments] = useState([]);
  const [courseData ,setCourseData]= useState([])
  const [course, setCourse] = useState({});
  const [confirmLoading, setConfirmLoading] = useState(false);
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  // ______________________Create_____________________________
  
  const handleOk = async (e) => {
    e.preventDefault();
    const { name, code, discrp} = course;
    const courseData= {name, code, discrp,
id:Math.random().toString(36).slice(2)

    }

    if (!code) {
      return message.error("Please enter code No. of eleven (11)");
    }
    
    if (name.length < 3) {
      return message.error("Please enter a name.");
    }

    setConfirmLoading(true);
    
    try {
      
      await setDoc(doc(firestore, "courseData", courseData.id), courseData);
      setConfirmLoading(false);
      setIsModalOpen(false);
      message.success("Add courseData Successfully", "success");
    } catch (err) {
      message.error("courseData is not added", err.message);
      console.error('err', err);
      setConfirmLoading(false);
    }
    getcourse()
  };
  
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  
  const handleChange = (e) => setCourse((s) => ({ ...s, [e.target.name]: e.target.value }));
  
  // ______________________Read_____________________________
  const getcourse = async () => {
    const querySnapshot = await getDocs(collection(firestore, "courseData"));
    const array = [];
    querySnapshot.forEach((doc) => {
      let data = doc.data();
      array.push(data);
    });
    setAllDocuments(array);
  };
  
  useEffect(() => {
    getcourse();
  }, []);


  // _____________________Edit_____________________________

  const handleEdit = (courId) => {
    
    setIsModalOpen(true)
    // let { date, title, discription, color } = state
    
    const editcourse = allDocuments.find((data => data.id === courId))
    if (editcourse) {
      
      setCourse({
        name: editcourse.name,
        code: editcourse.code,
        discrp: editcourse.discrp,
      })
      setCourseData(editcourse.id)
    }
    handleUpdate()
    
    
  }

  // ________________________Update______________________
  


    const handleUpdate = async () => {
    const { name, code, discrp } = course;

    if (!discrp) {
      return message.error("Please enter Roll No.");
    }

    // Find the course to update
    const courseToUpdate = allDocuments.find((data) => data.id === courseData);

    if (!courseToUpdate) {
      return;
    }

    const updatedcourseData = {
      ...courseToUpdate,
      name,
      code,
      discrp,
    };

    try {
      
      await updateDoc(doc(firestore, "courseData", courseData), updatedcourseData);
      message.success("courseData updated successfully");
      setIsModalOpen(false);
      getcourse(); 
    } catch (err) {
      console.error(err);
      message.error("Something went wrong while updating the courseData");
    }
  };
  
    

  // ______________________Delete_____________________________
  const handleDelete = async (courseData) => {
    try {
      await deleteDoc(doc(firestore, "courseData", courseData.id));

      let documentsAfterDelete = allDocuments.filter((doc) => doc.id !== courseData.id);
      setAllDocuments(documentsAfterDelete);

      message.success("courseData deleted successfully");
    } catch (err) {
      console.error(err);
      message.error("Something went wrong while deleting the courseData");
    }
  };



  return (
    <>
    
      <div className='py-5'>
    <div className="container">
      <div className="row">
        <div className="col text-center">
          <h1>Course list</h1>

          <Button type="primary" onClick={showModal}>
    Add Course
  </Button>
  <Modal title="Course Data" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
  <Form layout="vertical" className='py-4'>
      <Row gutter={16}>
        <Col xs={24} lg={12}>
          <Form.Item label="Course Name">
            <Input placeholder='Input your Course Name' name='name'  value={course.name} onChange={handleChange}  />
          </Form.Item>
        </Col>
        <Col xs={24} lg={12}>
          <Form.Item label="Course Code">
            <Input type="number" placeholder='Input your  Course Code' name='code' value={course.code} onChange={handleChange}  />
          </Form.Item>
        </Col>
        <Col xs={24} lg={24}>
          <Form.Item label="Discription">
          <Input.TextArea  placeholder='Input your course Discription' name='discrp' value={course.discrp} onChange={handleChange} />
          </Form.Item>
        </Col>
      
          
          
      </Row>
      <button className='btn btn-primary p-2' onClick={handleUpdate}>Update Course</button>
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
                  <th>Course Name</th>
                  <th>Course Code</th>
                  <th>Discription</th>
                  
               </tr>
              </thead>
              <tbody>
                {allDocuments.map((curElm, i) => {

                  
                    return (
                      <tr key={i}>
                        <th>{i + 1}</th>
                        <td>{curElm.name}</td>
                        <td>{curElm.code}</td>
                        <td>{curElm.discrp}</td>
                          
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






// import React, { useEffect, useState } from 'react';
// import { Button, Col, Divider, Form, Input, Modal, Row, Space, Tooltip, message } from 'antd';
// import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
// import { useNavigate } from 'react-router-dom';
// import { collection, deleteDoc, doc, getDocs, setDoc, updateDoc, arrayUnion } from 'firebase/firestore';
// import { firestore } from '../../config/ConfigFirebase';

// export default function Index() {
//   const [allDocuments, setAllDocuments] = useState([]);
//   const [courseData, setCourseData] = useState([]);
//   const [course, setCourse] = useState({});
//   const [confirmLoading, setConfirmLoading] = useState(false);
//   const navigate = useNavigate();

//   const [isModalOpen, setIsModalOpen] = useState(false);

//   const showModal = () => {
//     setIsModalOpen(true);
//   };

//   // ______________________Create_____________________________

//   const handleOk = async (e) => {
//     e.preventDefault();
//     const { name, code, discrp } = course;
//     const courseData = {
//       name,
//       code,
//       discrp,
//       id: Math.random().toString(36).slice(2),
//     };

//     if (!code) {
//       return message.error("Please enter code No. of eleven (11)");
//     }

//     if (name.length < 3) {
//       return message.error("Please enter a name.");
//     }

//     setConfirmLoading(true);

//     try {
//       await setDoc(doc(firestore, "courseData", courseData.id), courseData);
//       setConfirmLoading(false);
//       setIsModalOpen(false);
//       message.success("Add courseData Successfully", "success");
//       getcourse(); // Refresh course data after adding
//     } catch (err) {
//       message.error("courseData is not added", err.message);
//       console.error('err', err);
//       setConfirmLoading(false);
//     }
//   };

//   const handleCancel = () => {
//     setIsModalOpen(false);
//   };

//   const handleChange = (e) => setCourse((s) => ({ ...s, [e.target.name]: e.target.value }));

//   // ______________________Read_____________________________
//   const getcourse = async () => {
//     const querySnapshot = await getDocs(collection(firestore, "courseData"));
//     const array = [];
//     querySnapshot.forEach((doc) => {
//       let data = doc.data();
//       array.push(data);
//     });
//     setAllDocuments(array);
//   };

//   useEffect(() => {
//     getcourse();
//   }, []);

//   // _____________________Edit_____________________________

//   const handleEdit = (courId) => {
//     setIsModalOpen(true);
//     const editcourse = allDocuments.find((data) => data.id === courId);
//     if (editcourse) {
//       setCourse({
//         name: editcourse.name,
//         code: editcourse.code,
//         discrp: editcourse.discrp,
//       });
//       setCourseData(editcourse.id);
//     }
//   };

//   // ________________________Update______________________

//   const handleUpdate = async () => {
//     const { name, code, discrp } = course;

//     if (!discrp) {
//       return message.error("Please enter Roll No.");
//     }

//     // Find the course to update
//     const courseToUpdate = allDocuments.find((data) => data.id === courseData);

//     if (!courseToUpdate) {
//       return;
//     }

//     const updatedcourseData = {
//       ...courseToUpdate,
//       name,
//       code,
//       discrp,
//     };

//     try {
//       // Update the course data
//       await updateDoc(doc(firestore, "courseData", courseData), updatedcourseData);
//       message.success("courseData updated successfully");
//       setIsModalOpen(false);
//       getcourse(); // Refresh course data after updating
//     } catch (err) {
//       console.error(err);
//       message.error("Something went wrong while updating the courseData");
//     }
//   };

//   // ______________________Delete_____________________________
//   const handleDelete = async (courseData) => {
//     try {
//       await deleteDoc(doc(firestore, "courseData", courseData.id));

//       let documentsAfterDelete = allDocuments.filter((doc) => doc.id !== courseData.id);
//       setAllDocuments(documentsAfterDelete);

//       message.success("courseData deleted successfully");
//     } catch (err) {
//       console.error(err);
//       message.error("Something went wrong while deleting the courseData");
//     }
//   };

//   return (
//     <>
//       {/* Your JSX code here */}
//     </>
//   );
// }
