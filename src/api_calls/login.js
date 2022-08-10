import axios from 'axios';

export const getLogin =  async (name, password) =>{

    const params = JSON.stringify({"name": name, "password": password});
    try{

        const data = await axios.post("http://localhost:3000/auth", params, {headers: {'Content-Type' : 'application/json' }} );
        if(data.data.Error) return data.data;
        
        return data.data[0];
    }catch(e){
        console.log(e);
    }
}