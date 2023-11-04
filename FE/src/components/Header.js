import { Row, Col, Menu } from 'antd';
// redux
import { useDispatch, useSelector } from 'react-redux';
import { AppstoreOutlined, MailOutlined, SettingOutlined,UserOutlined,LogoutOutlined } from '@ant-design/icons';
import { AUTH_ACTIONS } from '../redux/action';
import SearchComponents from './SearchComponents';

const Banner = (  ) => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.auth?.user);
    const { name } = user;
    const profileItem =  [{
        label: '',
        key: 'SubMenu',
        icon: <UserOutlined />,
        children: [
          {
            label: 'Profile',
            key: 'profile',
            icon: <UserOutlined />,
            url: '/profile',
          },
          {
            label: 'Logout',
            key: 'logout',
            icon: <LogoutOutlined />,
            url: '/logout',
          },
        ],
        
    }]
return (
<Row style={{
    height: "100px",
}}>
    <Col span={4}>
      <Menu mode="horizontal"
      style={{
        height: '70px',

      }}
      >
        <Menu.Item key="home">
          Blog
        </Menu.Item>
      </Menu>
    </Col>
    <Col span={16}>
      {/* <Menu mode="horizontal">
        <Menu.Item key="products">
          Products
        </Menu.Item>
      </Menu> */}
      <SearchComponents />
    </Col>
    <Col span={4    }>
      {/* // display user name */}
        <Menu mode="horizontal" style={{
            height: '70px',
        }}>
            <Menu.SubMenu key="SubMenu" icon={<UserOutlined />} title={name}>
            <Menu.Item key="profile" >
                Profile
            </Menu.Item>
            <Menu.Item key="logout" onClick={
                () => {
                    dispatch({ type: AUTH_ACTIONS.LOGOUT })
                }
            }>
                Logout
            </Menu.Item>
            </Menu.SubMenu>
        </Menu>
    </Col>
  </Row>
)
}

export default Banner;
