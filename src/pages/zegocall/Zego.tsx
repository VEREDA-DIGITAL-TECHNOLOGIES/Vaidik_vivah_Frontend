import  { useCallback, useState } from 'react'
import { useNavigate } from 'react-router-dom';



const Zego = () => {
    const [value, setValue] = useState<string | undefined>(undefined);
    const navigate=useNavigate();

    const handleJoinRoom=useCallback(()=>{
        navigate(`/room/${value}`)
    },[navigate,value])
  return (
    <div>
        <input value={value}
        onChange={(e)=>setValue(e.target.value)}
         type="text" placeholder="Enter Room Code" />
        <button onClick={handleJoinRoom}>Join</button>
    </div>
  )
}

export default Zego


// const callUser = (callie) => {
//     const callerUid = currentUser.uid;
//     const roomId = `${callerUid}_${callie.uid}`;
//     navigate(`/room/${roomId}`);
// };
  