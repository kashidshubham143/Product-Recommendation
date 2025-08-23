import React from "react";
import { Container, Row, Col, Nav, Tab } from "react-bootstrap";

function UserProfile() {
  return (
    <Container className="mt-4">
      <Row>
        {/* Sidebar Navigation */}
        <Col md={3} className="mb-3">
          <h4 className="text-center mb-4">My Account</h4>
          <Nav variant="pills" className="flex-column">
            <Nav.Item>
              <Nav.Link eventKey="orders">📦 Your Orders</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="wishlist">❤️ Wishlist</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="profile">👤 Change Profile</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="delete">🗑 Delete Profile</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="payment">💳 Payment</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="settings">⚙️ Settings</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="rewards">🏆 Rewards</Nav.Link>
            </Nav.Item>
          </Nav>
        </Col>

        {/* Content Area */}
        <Col md={9}>
          <Tab.Container defaultActiveKey="orders">
            <Tab.Content>
              <Tab.Pane eventKey="orders">
                <h3>Your Orders</h3>
                <p>List of all your past and current orders will be shown here.</p>
              </Tab.Pane>
              <Tab.Pane eventKey="wishlist">
                <h3>Wishlist</h3>
                <p>Products you’ve saved to buy later will appear here.</p>
              </Tab.Pane>
              <Tab.Pane eventKey="profile">
                <h3>Change Profile</h3>
                <p>Update your personal details like name, email, contact number etc.</p>
              </Tab.Pane>
              <Tab.Pane eventKey="delete">
                <h3>Delete Profile</h3>
                <p>If you wish to delete your account, you can do it here.</p>
              </Tab.Pane>
              <Tab.Pane eventKey="payment">
                <h3>Payment</h3>
                <p>Manage saved cards, UPI, and check payment history.</p>
              </Tab.Pane>
              <Tab.Pane eventKey="settings">
                <h3>Settings</h3>
                <p>Change app settings like notifications, privacy, etc.</p>
              </Tab.Pane>
              <Tab.Pane eventKey="rewards">
                <h3>Rewards</h3>
                <p>See your earned rewards, discounts, and cashback offers.</p>
              </Tab.Pane>
            </Tab.Content>
          </Tab.Container>
        </Col>
      </Row>
    </Container>
  );
}

export default UserProfile;
