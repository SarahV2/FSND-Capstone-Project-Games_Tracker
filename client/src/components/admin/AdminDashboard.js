import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import FullGameList from './FullGameList';

const AdminDashboard = (props) => {
  const { user } = useAuth0();
  const userRole = user && user['http://demozero.net/roles'][0];
  if (userRole === 'admin') {
    return <FullGameList token={props.tokenValue} />;
  } else {
    return <h4>Sorry, you're not authorized to view this page</h4>;
  }
};

export default AdminDashboard;
