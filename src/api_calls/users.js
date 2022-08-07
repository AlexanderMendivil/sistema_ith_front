import axios from 'axios';

export const getAllUsers =  async () =>{

    try{

        const data = await axios.get("http://localhost:3000/users");
        return data.data;
    }catch(e){
        console.log(e);
    }
}