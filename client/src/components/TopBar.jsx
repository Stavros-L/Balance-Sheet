import "./TopBar.css"

function TopBar() {
    const user = localStorage.getItem("user");

    // Function to handle logout
    const handleLogout = () => {
        localStorage.clear();
        window.location.href = "/"; // Refresh page
    };
if (user) {
    return (
        <div>
            <h3>Hello {user}, welcome to Balance Sheet App <button onClick={handleLogout}>Logout</button></h3>
        </div>
    );
}
return (<div><h3 style={{textAlign:"center"}} >Hello, please loggin</h3></div>);
}

export default TopBar;