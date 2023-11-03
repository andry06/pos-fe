import { useSelector } from "react-redux";
import { capitalizeFirst } from "../../capitalize";

const IndexAccount = () => {
    let auth = useSelector(state => state.auth);
    const nama = capitalizeFirst(auth.user.full_name);
    
    if(auth.user !== null){
        return(
            <h4 className="text-start">Selamat Datang Di Halaman Account {nama}</h4>
        )
    }
}

export default IndexAccount;