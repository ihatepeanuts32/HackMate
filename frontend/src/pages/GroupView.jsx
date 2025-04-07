import React from 'react';
import '../styles/GroupView.css';

//Created by Hrishikesh Srirangam
const GroupView = () => {

    return (
        <div className="groupViewContainer">
            <div className="headerContainer">
                <header className="groupName">
                    <h1 style={{ textAlign: 'left' }}>Group 1</h1>
                </header>
                <input type="text" className="inputs" name="message" placeholder="Message owner" />  {/*Allow the user to send a message to the group owner with their request to join*/}
                <button className="requestButton">Request to Join</button>
            </div>
            <div className="bottomBackground" style={{ display: 'flex' }}> 
                <div style ={{ flex: 1, padding: '1rem', backgroundColor: '#1C0049' }}>
                    <header className="description">
                        <h2 style={{ textAlign: 'left' }}>Description</h2>
                    </header> {/*The description of the group is shown here*/}
                    <h2 style={{ textAlign: 'left', color: 'white', fontSize: 40 }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi ut risus augue. Morbi consectetur dolor dignissim, convallis enim eget, suscipit mauris. Quisque massa libero, maximus eget tincidunt sed, finibus a mi. Aenean sed hendrerit lorem, sed rutrum magna. Sed a sapien ut arcu laoreet tempus.</h2>
                </div>

                <div style ={{ flex: 1, padding: '1rem', backgroundColor: '#1C0049' }}>
                    <header className="description">
                        <h2 style={{ textAlign: 'left' }}>Members</h2> {/*List the members of the group*/}
                    </header>
                    <li style={{color: 'white'}}><h2 style={{ textAlign: 'left', color: 'white', fontSize: 40}}>Member 1</h2></li> 
                    <li style={{color: 'white'}}><h2 style={{ textAlign: 'left', color: 'white', fontSize: 40 }}>Member 2</h2></li> 
                    <li style={{color: 'white'}}><h2 style={{ textAlign: 'left', color: 'white', fontSize: 40 }}>Member 3</h2></li> 
                </div>
            </div>
        </div>
    )
}

export default GroupView;