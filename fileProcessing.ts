import * as multer from "multer";
import * as path from "path";
import { v4 as uuidv4 } from "uuid";



//file Proccessing with multer (proccessing files and saving it to the disk)


var storage = multer.diskStorage({
    destination: 'uploads',
    
    filename: function(req, file, cb){
      cb(null, uuidv4() + file.originalname)
  
    }
  
  });

  export default multer({storage})