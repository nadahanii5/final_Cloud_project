import React, { useState } from 'react';
import { Navbar, Container, Row, Nav, Form, Button, FormControl, Dropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';
import Cart from './Cart';

const NavBar = ({ filterbySearch }) => {
  const [searchValue, setSearchValue] = useState('');
  const { user, logout } = useAuth();

  const onSearch = (e) => {
    e.preventDefault();
    filterbySearch(searchValue);
    setSearchValue('');
  };

  return (
    <Row>
      <Navbar bg="dark" expand="lg" variant="dark" className="py-3">
        <Container>
          <Navbar.Brand as={Link} to="/" className="brand-color fs-4 fw-bold">
            مطعم جديد
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll" className="justify-content-between">
            <Nav className="me-auto" />

            <div className="d-flex align-items-center">

              {/* البحث */}
              <Form className="d-flex me-3" onSubmit={onSearch}>
                <FormControl
                  type="text"
                  placeholder="ابحث.."
                  className="mx-2"
                  onChange={(e) => setSearchValue(e.target.value)}
                  value={searchValue}
                  style={{ minWidth: '200px' }}
                />
                <Button variant="outline-light" type="submit">بحث</Button>
              </Form>

              {/* السلة */}
              <div className="me-3">
                <Cart />
              </div>

              {/* الازرار */}
              {!user ? (
                <div className="d-flex align-items-center gap-3">
                  <Button
                    as={Link}
                    to="/login"
                    variant="outline-light"
                  >
                    تسجيل الدخول
                  </Button>
                  <Button
                    as={Link}
                    to="/register"
                    variant="light"
                  >
                    إنشاء حساب
                  </Button>
                </div>
              ) : (
                <Dropdown align="end" className="ms-3">
                  <Dropdown.Toggle variant="outline-light" id="dropdown-basic">
                    مرحباً، {user.username}
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item as={Link} to="/profile">الملف الشخصي</Dropdown.Item>
                    <Dropdown.Item as={Link} to="/orders">طلباتي</Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item onClick={logout}>تسجيل الخروج</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              )}
            </div>

          </Navbar.Collapse>
        </Container>
      </Navbar>
    </Row>
  );
};

export default NavBar;
