import { useNavigate } from "react-router-dom";

 function Dashboard() {
    const navigate = useNavigate();
    const Home = () => {
        navigate("/login")
    }
    return(
        <div>
            
            <button onClick={Home}>Home</button>
        </div>
    )
}

export default Dashboard