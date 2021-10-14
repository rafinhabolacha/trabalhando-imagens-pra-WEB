const express = require('express');
const app = express();
const cors = require('cors');
//const socket = require('socket.io');
const uploadUser = require('./midle/uploadImagen');
const Image = require('./models/imagens');

const path = require('path');

//http://localhost:8086/public/upload/users/image.jpg
//vai ficar assim
// é faça o teste  colocando na URL
//http://localhost:8086/files/users/1634165932931_20210904-185334.png
// depois é só cria a rota GET 
app.use('/files',express.static(path.resolve(__dirname,"public","upload")));


app.use((req,res,next)=>{
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");     
  res.header("Access-Control-Allow-Headers", "X-PINGOTHER,Content-Type,Authorization");
  app.use(cors())
  next();    
});
app.use(express.json());



 app.get('/list_image',async (req,res)=>{

  await Image.findAll()
  .then((images)=>{
     return res.json({
       error:false,
       images,
       url:"http://localhost:8086/files/users/"
     })   
  }).catch(()=>{
     return res.status(400).json({
       error:true,
       mensagem:"Nenhuma imagem foi encontrada!"
     })
  })
 })




                           //nome colocado no insomnia (image)
app.post('/upload_imagens',uploadUser.single('image'),async (req,res)=>{

  //verificar se  fez o upload
  if(req.file){

    //salvar no banco de dados MYSQL
      
    await  Image.create({image:req.file.filename}).then(()=>{
      return res.json({
        error:false,
        mensagem:"imagem salva com sucesso!"
    }); 
    }).catch(()=>{
      return res.status(400).json({
        error:true,
        mensagem:"Error : upload não realizado com sucesso!"
      })     
    })


    // return res.json({
    //    error:false,
    //    mensagem:"upload  realizado com sucesso!"
   // }); 
  }
    
  //return res.status(400).json({
   // error:true,
  //  mensagem:"Error : upload não realizado com sucesso! e necessario envia imagens PNG ou JPG ou JPEG"
  //})      
  
  
  
 
});


//instancia 
 app.listen(8086,function(){
  console.log('servidor rodando !');
});

///io = socket(server,{cors:["*"]});//libera a permissão de requisição

//receber a resposta
//io.on("connection",(socket)=>{
//  console.log(socket.id);
//});
// agora implementar o front end

