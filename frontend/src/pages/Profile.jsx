import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

const Profile = () => {
    const { user } = useSelector((state) => state.auth);
    //console.log
    return(
        <div>
            <div>{user.email}</div>
            <Link to="/editProfile">Edit</Link> 
        </div>
    )
}

export default Profile;