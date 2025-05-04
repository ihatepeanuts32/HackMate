import { useBlockedUsers } from '../context/BlockedUsersContext';
import { useEffect } from 'react';
import '../styles/BlockedUsers.css';

//Hrishikesh Srirangam

function BlockedUsers() {
    const { blockedUsers, unblockUser } = useBlockedUsers();

    useEffect(() => {
        console.log('Raw blocked users data:', blockedUsers);
        if (blockedUsers?.length > 0) {
            blockedUsers.forEach((user, index) => {
                console.log(`Blocked user ${index} details:`, {
                    id: user._id,
                    blockedId: user.blockedId,
                    blockedIdType: typeof user.blockedId,
                    username: user.blockedId?.username,
                    firstName: user.blockedId?.firstName,
                    email: user.blockedId?.email,
                    fullObject: user
                });
            });
        }
    }, [blockedUsers]);

    const containerStyle = {
        maxWidth: '800px',
        margin: '2rem auto',
        padding: '0px',
        color: 'white',
        minHeight: '100vh'
    };

    const headingStyle = {
        fontSize: '2.8rem',
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

    const handleUnblock = async (blockedUser) => {
        try {
            const userId = blockedUser.blockedId._id || blockedUser.blockedId;
            await unblockUser(userId);
        } catch (error) {
            console.error('Error unblocking user:', error);
            alert('Failed to unblock user. Please try again.');
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
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
        <div className="blocked-users-container">
            <h1 className="blocked-users-heading">Blocked Users</h1>
            {blockedUsers.map((blockedUser) => (
                <div key={blockedUser._id || blockedUser.blockedId._id} className="blocked-user-card">
                    <div className="blocked-user-info">
                        <span className="blocked-user-name">
                            {blockedUser.blockedId?.fullName || 
                             (blockedUser.blockedId?.firstName && blockedUser.blockedId?.lastName ? 
                                `${blockedUser.blockedId.firstName} ${blockedUser.blockedId.lastName}`.trim() : 
                                blockedUser.blockedId?.username || 'Unknown User')}
                        </span>
                        <span className="blocked-user-date">
                            Blocked on: {formatDate(blockedUser.createdAt)}
                        </span>
                    </div>
                    <button
                        className="unblock-button"
                        onClick={() => handleUnblock(blockedUser)}
                    >
                        Unblock
                    </button>
                </div>
            ))}
        </div>
    );
}

export default BlockedUsers;