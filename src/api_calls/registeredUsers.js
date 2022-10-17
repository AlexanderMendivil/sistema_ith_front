import axios from 'axios';

export const getRegisteredUsers =  async () =>{
    try{
        const data = await axios.get("http://localhost:3000/records");
        return data.data;
    }catch(e){
        console.log(e);
    }
}