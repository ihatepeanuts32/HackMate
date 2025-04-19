import React from "react";

//Hrishikesh Srirangam

const CreateGroup = () => {
    return (
        <div>
            <h1 style={{color:"white"}}>Create a Group</h1>
            <div className="split-row">
                <h3 style={{width:500, color:"white"}}>Group Name</h3>
                <input width={50} style={{fontSize: 18}}></input>
            </div>
            <div className="split-row">
                <h3 style={{width:500, color:"white"}}>Members</h3>
                <input width={50} style={{fontSize: 18}}></input>
            </div>
            <div className="split-row">
                <h3 style={{width:500, color:"white"}}>Description</h3>
                <textarea rows={6} cols={50} style={{fontSize: 18, borderRadius: 15, borderColor:'#1C0049', backgroundColor:'#1C0049'}}></textarea>
            </div>
            <button style={{fontSize: 24, borderColor:'#1C0049', backgroundColor:'#1C0049'}}>Submit</button>
        </div>
    )
}

export default CreateGroup;