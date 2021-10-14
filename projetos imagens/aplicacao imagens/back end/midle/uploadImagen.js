const multer = require('multer');
const { format } = require('mysql2');


module.exports =(multer({
 
    storage: multer.diskStorage({
        destination:(req,file,cb)=>{  //cb indica pra qual local sera salvo
          cb(null,'./public/upload/users') //local onde sera salvo as imagens
        
        },
         // nome da imagem
        filename:(req,file,cb)=>{             //nome original da imagem  
            cb(null,Date.now().toString() +"_"+ file.originalname) // data atual em formato de string
        },

        
               
       

    }),
    //valida extensoes de imagen png jpg ...

     fileFilter:(req,file,cb)=>{
         const extensoesImagens =['image/png','image/jpg','image/jpeg'].find
         //formatoAceito é um array
         (formatoAceito => formatoAceito == file.mimetype);

         if(extensoesImagens){ // se a extensão for de acordo
             return cb(null , true);
         }
         //caso contrario 
         return cb(null,false)
     }    

}))