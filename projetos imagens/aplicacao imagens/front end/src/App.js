import React,{useEffect, useState} from 'react';
import api from './configApi/api';
function App() {

  //listagem das imagens
  const [data , setData] = useState([]);
 const [url, setUrl] = useState('');

 const getImagens = async () =>{
 

  await api.get('/list_image').then((response)=>{
    // console.log(response.data);
     setData(response.data.images);
     setUrl(response.data.url);
  })

 }

  useEffect(()=>{
     getImagens();
  },[]);

//=====================================================



  const [ image, setImage] = useState("");
  const [img ] = useState('./usuario.jpg');
  const [status, setStatus ]= useState({
    type:'',
    mensagem:''
  })
  
     const uploadImage =  async  e => {
       e.preventDefault();
         console.log("Upload imagem");
        // console.log(image);
        // antes de envia transforma em um objeto 
        const formdata = new FormData();

        formdata.append('image',image);
      
        const headers ={
          'headers':{
            'Content-Type':'application/json '
          }
        }
 

        await api.post('/upload_imagens',formdata, headers ).then((response)=>{
          //console.log(response);
          setStatus({
            type:'success',
            mensagem: response.data.mensagem
          })
        }).catch((err)=>{
          if(err.response){
           // console.log(err.response);
            setStatus({
              type:'error',
              mensagem: err.response.data.mensagem
            })
          }else{
          // console.log("Error :  Tente mais tarde"); 
           setStatus({
            type:'error',
            mensagem: 'error :  Tente mais tarde'
          })
          }
        })
     }


  return (
    <div>
      <h1>Upload Imagem!</h1>
      <form onSubmit={uploadImage}>

        <label>Imagens:</label>
        
        {status.type === 'success' ? <p style={{color:"green"}}>{status.mensagem}</p> : ""}
        {status.type === 'error' ? <p style={{color:"red"}}>{status.mensagem}</p> : ""}

        <input type="file" name="image"  onChange={e => setImage(e.target.files[0])}/><br /><br />
        
        {image ? <img  src={URL.createObjectURL(image)}  alt="imagem" width="150"/> : <img  src={img} alt="imagem" width="150" height="150" />}<br /><br />


        <button type="submit">Salvar</button>
        
        
        </form>
         <br /><br />
         <hr/>
         <h1>Listar imagens</h1>
        
           {data.map(image =>(
             <div key={image.id}>
               <span>{image.id}</span><br />
               <span>{image.image}</span><br />
               <img src={url + image.image} alt={image.id} width="150"  />
             </div>
           ))}

    </div>
  );
}

export default App;
