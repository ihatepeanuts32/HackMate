import { useBlockedUsers } from '../context/BlockedUsersContext';

//Hrishikesh Srirangam

function BlockedUsers() {
    const { blockedUsers, unblockUser } = useBlockedUsers();

    return (
        <div>
            <h1 style={{ color: "white" }}>Blocked Users</h1>
            {blockedUsers.map((user) => (
                <div
                    key={user.id}
                    style={{
                        display: 'flex',
                        gap: '20px',
                        marginBottom: '10px',
                        alignItems: 'center',
                    }}
                >
                    <span style={{
                        fontSize: 20,
                        borderRadius: 25,
                        borderColor: '#1C0049',
                        backgroundColor: '#1C0049',
                        color: 'white',
                        padding: '5px 10px',
                    }}>{user.name}</span>

                    <span style={{
                        fontSize: 20,
                        borderRadius: 25,
                        borderColor: '#1C0049',
                        backgroundColor: '#1C0049',
                        color: 'white',
                        padding: '5px 10px',
                    }}>{user.date}</span>

                    <button style={{
                            fontSize: 20,
                            borderColor: '#1C0049',
                            backgroundColor: '#1C0049',
                            color: 'white',
                            padding: '5px 10px',
                        }}
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