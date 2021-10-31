import { useHistory } from "react-router";
import { logout } from "utils/utils";
export default function Home() {
  const history = useHistory();
  const handerLogout = () => {
    logout();
    history.push("/login");
  };
  return (
    <div>
      home client
      <button
        onClick={handerLogout}
        className='px-2 py-2 mr-md-1 rounded cursor-pointer'>
        <span className='ion-logo-facebook mr-2 text-[#701a29]'> Out</span>
      </button>
      {/* <Button color='lightBlue' ripple='light'>
        Button
      </Button> */}
    </div>
  );
}
