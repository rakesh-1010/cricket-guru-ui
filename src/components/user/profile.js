import React from 'react';
import { useSelector } from "react-redux";

import { Card } from 'antd';


const Profile = () => {
    const { user: currentUser } = useSelector((state) => state.auth);
    return(
        <>
        <div className="site-card-border-less-wrapper">
            <Card title={currentUser.username} bordered={false}>
             <p>
                 <strong>Token:</strong> {currentUser.accessToken.substring(0, 20)} ...{" "}
                 {currentUser.accessToken.substr(currentUser.accessToken.length - 20)}
             </p>
             <p>
                 <strong>Id:</strong> {currentUser.id}
             </p>
             <p>
                 <strong>Email:</strong> {currentUser.email}
             </p>
             <strong>Authorities:</strong>
             <ul>
                 {currentUser.roles &&
                currentUser.roles.map((role, index) => <li key={index}>{role}</li>)}
            </ul>
            </Card>
        </div>
      </>
    )
}

export default Profile;