
import React, { useState } from 'react';
import {
  BookOutlined,
  CalendarOutlined,
  DoubleRightOutlined,
  FileTextOutlined,
  FormOutlined,
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  SearchOutlined,
  UnorderedListOutlined,
  UploadOutlined,
  UserOutlined,
  UsergroupAddOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';
import { Layout, Menu, Button, theme, Input, Divider } from 'antd';
import { Link } from 'react-router-dom';
import Routes from '../../../Dashboard/index'

const { Header, Sider, Content } = Layout;

const App = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout>
    <Sider trigger={null} collapsible collapsed={collapsed} className='bg-white p-3'>
      <div className="demo-logo-vertical" />
     <h5 className='text-info text-center'> Welcome</h5>
     <Divider/>
      <Input addonBefore={<SearchOutlined />} placeholder="Search" />
      <Divider/>

        <Menu
          theme="light"
          mode="inline"
          style={{
            border: "none"
          }}
          defaultSelectedKeys={["/"]}


          items={[
            {
              key: '/',
              icon: <FileTextOutlined />,
              label: <Link to="/" className='nav-link'>Home</Link>,
            },

            {
              key: '/student',
              icon: <UsergroupAddOutlined />,
              label: <Link to="/student" className='nav-link'>Student</Link>,
            },
         
            
            {
              key: '/course',
              icon: <BookOutlined />,
              label: <Link to="/course" className='nav-link'>Course</Link>,
            },
            {
              key: '/attendence',
              icon: <FormOutlined />,
              label: <Link to="/attendence" className='nav-link'>Attendence</Link>,
            },
        
          ]}
        />
   <Divider />

      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 30,
            }}

          />
          <span className='fs-3 fw-bold ms-2'>SMS👌😉</span>
        </Header>
        <Content
          style={{
            margin: '24px 16px',
           
            minHeight: 280,
            background: colorBgContainer,
          }}
        > 
          <div className="container d-flex flex-wrap  justify-content-between  ">
          <Link to={"/student"}> <div className="card shadow class bg-info rounded-4 p-3  gap-3 mt-2">
                    <section className='fs-2  text-center'>
            <UsergroupAddOutlined  className={"shadow"} /> 
           <br />
           <b className='student'>Total Students </b>
         </section>
        </div> </Link>  
           <Link to="/course"><div className="card shadow  bg-dark text-white class  rounded-4 p-3 gap-3 mt-2 ">
         <section className='fs-2  text-center'>
         <BookOutlined  className={"shadow text-danger"}/>
         <br />
         <b className='course'>Total Courses </b>
         </section>
          </div></Link>
          <Link to="/attendence"><div className="card shadow bg-warning class  rounded-4 p-3 mt-2">
         <section className='fs-2  text-center'>
         <FormOutlined className={"shadow"}/>
         <br />
         <b className='text-decoration-none attend'>Today Attendence </b>
         </section>
        </div></Link>
          </div>
        <Divider/>
          <Routes />
        </Content>
      </Layout>
    </Layout>
  );
};

export default App;

























































// import React, { useState } from 'react';
// import {
//   MenuFoldOutlined,
//   MenuUnfoldOutlined,
//   DoubleRightOutlined,
//   UnorderedListOutlined,
//   CalendarOutlined,
//   FileTextOutlined,
//   SearchOutlined,
//   PlusOutlined,
// } from '@ant-design/icons';
// import { Layout, Menu, Button, theme, Input, Divider, message } from 'antd';

// import { Link } from 'react-router-dom';
// // import Routes from '../../../Dashboard/index'
// import { signOut } from 'firebase/auth';
// import { useAuthContext } from '../../../Context/AuthConst'
// import { auth } from '../../../config/ConfigFirebase';
// const { Header, Sider, Content } = Layout;
// const { Search } = Input;
// export default function Sidbar() {

//   const [collapsed, setCollapsed] = useState(true);
//   const {
//     token: { colorBgContainer },
//   } = theme.useToken();
//   const { dispatch } = useAuthContext()

//   const handleLogout = () => {
//     signOut(auth)
//       .then(() => {
//         dispatch({ type: "LOGOUT" })
//         message.success("SignOut User successfuly!", "Success")
//       })
//       .catch((err) => {
//         message.error("Something wants wrong", "error")
//       })
//   }

//   return (




//     <Layout>
//       <Sider trigger={null} collapsible collapsed={collapsed} className='bg-white p-3'>
//         <div className="demo-logo-vertical" />
//        <h3>Menu</h3>
//         <Input addonBefore={<SearchOutlined />} placeholder="Search" />
//         <Divider/>


//         <h4>Tasks</h4>

//         <Menu
//           theme="light"
//           mode="inline"
//           style={{
//             border: "none"
//           }}
//           defaultSelectedKeys={["/"]}


//           items={[

//             {
//               key: '/attendence',
//               icon: <DoubleRightOutlined />,
//               label: <Link to="/attendence" className='nav-link'>Attendence</Link>,
//             },
//             {
//               key: '/course',
//               icon: <UnorderedListOutlined />,
//               label: <Link to="/course" className='nav-link'>Course</Link>,
//             },
//             {
//               key: '/student',
//               icon: <CalendarOutlined />,
//               label: <Link to="/student" className='nav-link'>Students</Link>,
//             },
//             {
//               key: '/',
//               icon: <FileTextOutlined />,
//               label: <Link to="/" className='nav-link'>Todo Sticky</Link>,
//             },
//           ]}
//         />

//         <Divider />

//        <h4>Lists</h4>
//         <Menu
//           theme="light"
//           mode="inline"
//           style={{
//             border: "none"
//           }}
//           items={[
//             {
//               key: '/personal',
//               icon: <div className='bg-danger ' style={{ width: "10px", height: "10px", borderRadius: "3px" }}></div>,
//               label: <Link to="/personal" className='nav-link'>Personal</Link>,
//             },
//             {
//               key: '/work',
//               icon: <div className='bg-dark ' style={{ width: "10px", height: "10px", borderRadius: "3px" }}></div>,
//               label: <Link to="/work" className='nav-link'>Work</Link>,
//             },
//             {
//               key: '3',
//               icon: <div className='bg-warning ' style={{ width: "10px", height: "10px", borderRadius: "3px" }}></div>,
//               label: 'List 1 ',
//             },
//             {
//               key: 'NewList',
//               icon: <PlusOutlined className='me-2' />,
//               label: <Link to="/work" className='nav-link'>Add New List</Link>,
//             },
//           ]}
//         />

//         <Divider />
//         <Menu
//           theme="light"
//           mode="inline"
//           style={{
//             border: "none"
//           }}

//           items={[

//             {
//               key: '3',
//               icon: <i className="fa-solid fa-arrow-right-from-bracket"></i>,
//               label: <a className=' nav-link' onClick={handleLogout} > Sign Out</a>,
//             },
//           ]}
//         />
//       </Sider>
//       <Layout>
//         <Header style={{ padding: 0, background: colorBgContainer }}>
//           <Button
//             type="text"
//             icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
//             onClick={() => setCollapsed(!collapsed)}
//             style={{
//               fontSize: '16px',
//               width: 64,
//               height: 64,
//             }}

//           />
//           <span className='fs-3 fw-bold ms-2'>Todo Sticky</span>
//         </Header>
//         <Content
//           style={{
//             margin: '24px 16px',
           
//             minHeight: 280,
//             background: colorBgContainer,
//           }}
//         >

          
//         </Content>
//       </Layout>
//     </Layout>
//   );
// }

