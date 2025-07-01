export function CreateTodo(){

    return <div style={{width: "40%", height : "fit-content", fontSize : "24px"}}>
        <input style={{padding: "10px 15px", color: "powderblue", borderRadius: "10px", border: "none", width : "80%", backgroundColor: "#ffff"}} type="text" placeholder="title"/><br />
        <input style={{padding: "10px 15px", color: "powderblue", borderRadius: "10px", border: "none", width : "80%", height : "250px", marginTop : "23px",backgroundColor: "#ffff"}} type="text" placeholder="description"/> <br />
        
        <button style={{width: "80%",padding: "10px 15px", color: "blue", borderRadius: "10px", border: "none", marginTop : "23px", fontSize : "22px"}}>add todo</button> 
    
    </div>
}