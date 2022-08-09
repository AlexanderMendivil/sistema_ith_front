import axios from 'axios';

export const getLogin =  async ({ name, password }) =>{

    try{

        const data = await axios.post("http://localhost:3000/auth", { name, password } );
        return data.data;
    }catch(e){
        console.log(e);
    }
}