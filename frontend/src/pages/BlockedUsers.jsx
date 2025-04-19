import React, { useState } from 'react';

//Hrishikesh Srirangam

function BlockedUsers() {
    const [rows, setRows] = useState([
        { user: 'User1', date: '04/01/2025' },
        { user: 'User2', date: '04/10/2025' },
    ]);

    const addRow = () => {
        const userNumber = rows.length + 1;
        setRows([...rows, { user: `User${userNumber}`, date: 'MM/DD/YYYY' }]);
    };

    const removeRow = (index) => {
        setRows(rows.filter((_, i) => i !== index));
    };

    return (
        <div>
            <h1 style={{ color: "white" }}>Blocked Users</h1>
            {rows.map((row, index) => (
                <div
                    key={index}
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
                    }}>{row.user}</span>

                    <span style={{
                        fontSize: 20,
                        borderRadius: 25,
                        borderColor: '#1C0049',
                        backgroundColor: '#1C0049',
                        color: 'white',
                        padding: '5px 10px',
                    }}>{row.date}</span>

                    <button style={{
                            fontSize: 20,
                            borderColor: '#1C0049',
                            backgroundColor: '#1C0049',
                            color: 'white',
                            padding: '5px 10px',
                        }}
                        onClick={() => removeRow(index)}
                    >
                        Unblock
                    </button>
                </div>
            ))}

            {/* <button style={{
                fontSize: 20,
                borderColor: '#1C0049',
                backgroundColor: '#1C0049',
                color: 'white',
                padding: '5px 10px',
            }}
                onClick={addRow}>Add Row</button> */}
        </div>
    );
}

export default BlockedUsers;