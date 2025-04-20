import { useBlockedUsers } from '../context/BlockedUsersContext';
import { useEffect } from 'react';

//Hrishikesh Srirangam

function BlockedUsers() {
    const { blockedUsers, unblockUser } = useBlockedUsers();

    useEffect(() => {
        console.log('Current blocked users:', blockedUsers);
    }, [blockedUsers]);

    const containerStyle = {
        maxWidth: '800px',
        margin: '2rem auto',
        padding: '20px',
        color: 'white',
        minHeight: '100vh'
    };

    const headingStyle = {
        fontSize: '2rem',
        marginBottom: '2rem',
        textAlign: 'center',
        color: 'white'
    };

    const userCardStyle = {
        backgroundColor: '#1C0049',
        padding: '20px',
        borderRadius: '8px',
        marginBottom: '1rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
    };

    const userInfoStyle = {
        display: 'flex',
        gap: '20px',
        alignItems: 'center'
    };

    const buttonStyle = {
        backgroundColor: '#ff4444',
        color: 'white',
        border: 'none',
        padding: '8px 16px',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '1rem'
    };

    if (!blockedUsers || blockedUsers.length === 0) {
        return (
            <div style={containerStyle}>
                <h1 style={headingStyle}>Blocked Users</h1>
                <p style={{ textAlign: 'center', color: 'white' }}>
                    No users are currently blocked
                </p>
            </div>
        );
    }

    return (
        <div style={containerStyle}>
            <h1 style={headingStyle}>Blocked Users</h1>
            {blockedUsers.map((user) => (
                <div key={user.id} style={userCardStyle}>
                    <div style={userInfoStyle}>
                        <span style={{ fontSize: '1.2rem' }}>{user.name}</span>
                        <span style={{ opacity: 0.7 }}>Blocked on: {user.date}</span>
                    </div>
                    <button
                        style={buttonStyle}
                        onClick={() => unblockUser(user.id)}
                    >
                        Unblock
                    </button>
                </div>
            ))}
        </div>
    );
}

export default BlockedUsers;