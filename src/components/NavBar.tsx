import React, { useState } from 'react';
import { Navbar, Text, Avatar, Dropdown } from "@nextui-org/react";
import { Link } from 'react-router-dom';
import Logo from '../resources/img/Logo';
import { NavLink, useLocation } from 'react-router-dom';

function isActiveRoute(route, location) {
  return location.pathname === route;
}

function NavBar() {

  const [sales,SetSales] = useState(true);
  const [products,SetProducts] = useState(false);
  const [services,SetServices] = useState(false);
  const collapseItems = [
        "Profile",
        "Dashboard",
        "Activity",
        "Analytics",
        "System",
        "Deployments",
        "My Settings",
        "Team Settings",
        "Help & Feedback",
        "Log Out",
      ];

  return (
        <Navbar isBordered variant="sticky">
            <Navbar.Brand
                css={{
                    "@xs": {
                    w: "12%",
                    },
                }}>
                <Logo/>
                <Text b color="inherit" hideIn="xs">
                    Abyssal
                </Text>
            </Navbar.Brand> 
            <Navbar.Content
                enableCursorHighlight
                activeColor="secondary"
                hideIn="xs"
                variant="highlight-rounded"
            >
            <Navbar.Link isActive={sales} href="#">
              <Link to="/sales">Sales</Link>
            </Navbar.Link>
            <Navbar.Link isActive={products}  href="#">
              <Link to="/products">Products</Link>
            </Navbar.Link>
            <Navbar.Link isActive={services} href="#">
              <Link to="/services">Services</Link>
            </Navbar.Link>   
            </Navbar.Content>
          <Navbar.Content
            enableCursorHighlight
            activeColor="secondary"
            hideIn="xs"
            variant="highlight-rounded"
            >
            <Dropdown placement="bottom-right">
                <Navbar.Item>
                    <Dropdown.Trigger>
                        <Avatar
                            bordered
                            as="button"
                            color="secondary"
                            size="md"
                            src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
                        />
                    </Dropdown.Trigger>
                </Navbar.Item>
                <Dropdown.Menu
                aria-label="User menu actions"
                color="secondary"
                onAction={(actionKey) => console.log({ actionKey })}
                >
                <Dropdown.Item key="profile" css={{ height: "$18" }}>
                <Text b color="inherit" css={{ d: "flex" }}>
                  Signed in as
                </Text>
                <Text b color="inherit" css={{ d: "flex" }}>
                  zoey@example.com
                </Text>
              </Dropdown.Item>
              <Dropdown.Item key="settings" withDivider>
                My Settings
              </Dropdown.Item>
              <Dropdown.Item key="team_settings">Team Settings</Dropdown.Item>
              <Dropdown.Item key="analytics" withDivider>
                Analytics
              </Dropdown.Item>
              <Dropdown.Item key="system">System</Dropdown.Item>
              <Dropdown.Item key="configurations">Configurations</Dropdown.Item>
              <Dropdown.Item key="help_and_feedback" withDivider>
                Help & Feedback
              </Dropdown.Item>
              <Dropdown.Item key="logout" withDivider color="error">
                Log Out
              </Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
          </Navbar.Content>
        </Navbar>
    )
};

export default NavBar;