import 'zone.js/dist/zone-node';
import 'multer';
import * as parser from "body-parser";
import { ngExpressEngine } from '@nguniversal/express-engine';
import * as express from 'express';
import * as path from 'path';
import { AppServerModule } from './src/main.server';
import { APP_BASE_HREF } from '@angular/common';
import { existsSync} from 'fs';
import Product from './src/models/products-model';
import CurrencyChange from "./src/models/currency-change-model";
import Client from "./src/models/clients.model";
import * as multer from 'multer';
import 'fs-extra';
import { unlink } from 'fs-extra';

import { title } from 'process';
import { async } from '@angular/core/testing';



//file uploading with multer
var storage = multer.diskStorage({
  destination: function(req, file, cb){
    cb(null, path.join(__dirname, '../../../src/assets/products-images/uploads'));
  },
  filename: function(req, file, cb){
    cb(null, file.originalname)

  }

});


var upload = multer({storage});



// The Express app is exported so that it can be used by serverless Functions.
export function app() {
  const server = express();
  const distFolder = path.join(process.cwd(), 'dist/refri-data/browser');
  const indexHtml = existsSync(path.join(distFolder, 'index.original.html')) ? 'index.original.html' : 'index';

  // Our Universal express-engine (found @ https://github.com/angular/universal/tree/master/modules/express-engine)
  server.engine('html', ngExpressEngine({
    bootstrap: AppServerModule,
  }));

  server.set('view engine', 'html');
  server.set('views', distFolder);
  server.use(express.urlencoded({extended: false}));
  server.use(express.json());
  server.use(parser.urlencoded({extended: false}))
  server.use(parser.json());



  // Example Express Rest API endpoints

  //Route for getting the products
  server.get('/api/products', async (req, res) => { 
    try {
      const products = await Product.find();
      res.json(products);
      
    } catch (error) {
      console.error('Unexpected error getting products at GET route: ', error);
      res.status(500).send('Unexpected error getting product at GET route');
      
    }
  

  });




  server.get('/api/products/search?', async (req, res) => { 
    try {
      let product = req.query.title;
  let products = await Product.find( { $or: [{title: new RegExp(`${product}`, 'gi')}, {modelo: new RegExp(`${product}`, 'gi')}]  })
  res.json(products);
      
    } catch (error) {
      console.error('Unexpected error searching products at GET route: ', error);
      
    }
  

  });

  

  

  server.get('/api/products/:id', async (req, res) => { 
    const products = await Product.findById(req.params.id);
    res.json(products);

  });

   //Route for adding a product
  server.post('/api/products', upload.single('imagePath'), async (req, res) => {
   try {
     const {title, modelo, precio, cantidad} = req.body;
     const imagePath = '/uploads/' + req.file.filename;
     const newProduct = new Product({ title, modelo, precio, cantidad, imagePath})
     await newProduct.save()
     console.log('Product successfully saved');
     res.status(200)
           //If anything goes wrong with the request it throws this error
   } catch (error) {
    console.error('Unexpected error saving products at POST route: ', error);
     res.status(500).send('Unexpected error posting products at POST route');

     
   }

  })


  
  server.delete('/api/products/:id', async (req, res) => {
    try {
      const product = await Product.findByIdAndDelete(req.params.id);
      unlink(path.resolve('./src/assets/products-images' + product.imagePath))
    
            
    } catch (error) {
      console.error('Unexpected error deleting product at DELETE route ', error);
    
      
    }
  })

  server.put('/api/products/update/:id', upload.none() , async (req, res) => {
    try {
      let id = req.params.id;
    const { title, modelo, precio, cantidad } = req.body
    await Product.findOneAndUpdate({ _id: id }, { title: title, modelo: modelo, precio: precio, cantidad: cantidad}, { upsert: false }, (err, doc) => {
        if (err) {
            res.status(500).send(err);
        } else
            doc.save();
        res.status(200)

    });
      
    } catch (error) {
      console.error('Unexpected error updating products at PUT route: ', error);
      res.send(500).send(error);
      
      
    }
    
  })

  
  server.put('/api/products/update-photo/:id', upload.single('newImage') , async (req, res) => {
    try {
      let id = req.params.id;
    const imagePath = '/uploads/' +  req.file.filename;
    await Product.findOneAndUpdate({ _id: id }, {imagePath: imagePath}, { upsert: false }, (err, doc) => {
        if (err) {
            res.status(500).send(err);
        } else
            doc.save();
        res.status(200)

    });
      
    } catch (error) {
      console.error('Unexpected error updating products at PUT route: ', error);
      res.send(500).send(error);
      
      
  }
    
  })




//Routes for handleling prices changes in database 

server.get('/api/currency-change', async (req, res) => {
  try {
    const currency = await CurrencyChange.find();
    console.log(currency);
  
    
  } catch (error) {
    console.error('Unexpected error getting currency at GET route: ', error);
    res.status(500).send(error)
    
  
    
  }

})


server.get('/api/currency-change/most-recent', async (req, res) => {
  const currency = await CurrencyChange.findOne().sort({'date': -1});
  console.log(currency);
  res.json(currency);
})

server.post('/api/currency-change/addPrice', upload.none(), async (req, res) => {
  try {
    const {precio} = req.body;
    console.log(precio);
    const newPrecio = new CurrencyChange({ precio });
    console.log(newPrecio);
    await newPrecio.save();
    res.status(200).send('Price Successfully Added')
  
  
    
  } catch (error) {
    console.error('Error posting price at post route');
    res.status(500).send(error);
    
  }

})


server.get('/api/clients/getClients', async (req, res) => {
  try {
    const clients = await Client.find();
    res.json(clients);
    
  } catch (error) {
    console.log(error);
    
  }

})



server.post('/api/clients/addClient', upload.none(), async (req, res) => {
  try {
    const {name, cedula, email, constantBuyer, productsBought, mostBought, phoneNumber, lastPurchase } = req.body
    const newClient = new Client({name, cedula, email, constantBuyer, productsBought, mostBought, phoneNumber, lastPurchase})
    await newClient.save()
    console.log(newClient)
    res.json(newClient);
  } catch (error) {
    
  }

})

server.delete('/api/clients/deleteClient/:id', async (req, res) => {
  try {
    const client = await Client.findByIdAndDelete(req.params.id);
    res.json('Deleted succesfully');
  
  
          
  } catch (error) {
    console.error('Unexpected error deleting product at DELETE route ', error);
  
    
  }

})


server.put('/api/clients/updateClient/:id', upload.none(), async (req, res) => {
  try {
    const id = req.params.id
    const {name, cedula, email, phoneNumber} = req.body
    await Client.findOneAndUpdate({ _id: id }, {name, cedula, email, phoneNumber}, { upsert: false },  (err, client)=> {
      if (err) {
          res.status(500).send(err);
      } else
          client.save();
      res.status(200)

  });

    
  } catch (error) {
    console.log('Error updating product at updateClient: ', error);

    
  }
})

server.put('/api/clients/buyProduct/:id', async (req, res) => {
  const id = req.params.id;
  var products = req.body;
  await Client.findByIdAndUpdate({_id: id},  {$addToSet:{ productsBought: {$each: products}}, $sort: {fecha_de_compra: 1}}, {upsert: true}, (err, result) => {
    if(err){
      res.send(err);
      console.log(err);
    }
    result.save();
    res.send(200);
    console.log(result);

  }
    )

})


server.put('/api/clients/addToCart/:id', async (req, res) => {
  const id = req.params.id;
  var products = req.body;
  await Client.findByIdAndUpdate({_id: id},  {$addToSet:{ cart: {$each: products}}, $sort: {fecha_de_compra: 1}}, {upsert: true}, (err, result) => {
    if(err){
      res.send(err);
      console.log(err);
    }
    result.save();
    res.send(200);
    console.log(result);

  }
    )


})


server.get('/api/clients/searchClient?', async (req, res) => {
  try {
    let client = req.query.name;
    let clients = await Client.find({name : new RegExp(`${client}`, 'gi')});
    res.json(clients);


    
  } catch (error) {
    console.error('Unexpected error searching clients at GET route: ', error);
    
  }

})


// server.get('/api/shoppingBasket/showProducts', async (req, res) => {
//   try {
//     const inBasket = await shoppingBasket.find();
//     res.json(inBasket)
//     console.log('showing products');
//   } catch (error) {
//     console.log('Unexpected error getting product at shoppingBasket GET route', error);
    
//   }

// })


// server.post('/api/shoppingBasket/addToBasket', async (req, res) => {
//   try {
//     const {title, modelo, precio, cantidad, fecha_de_compra} = req.body;
//     const newShoppingBasket = new shoppingBasket({ title, modelo, precio, cantidad, fecha_de_compra})
//     await newShoppingBasket.save();
//     console.log('Product successfully bought!');
//     res.status(200)
//           //If anything goes wrong with the request it throws this error
//   } catch (error) {
//    console.error('Unexpected error buying products at POST route: ', error);
//     res.status(500).send('Unexpected error posting products at POST route');

    
//   }

// });

// server.delete('/api/shoppingBasket/removeProduct/:id', async (req, res) => {
//   const id = req.params.id
//   await shoppingBasket.findByIdAndDelete(id);

// })

// server.delete('/api/shoppingBasket/emptyBasket', async (req, res) => {

//   await shoppingBasket.find().remove( (err, result) => {
//     if(err){
//       res.json('an error occurred at emptyBasket');
//     }
//     res.json('removed successfully');
//   })


  



// })

  // Serve static files from /browser
  server.get('*.*', express.static(distFolder, {
    maxAge: '1y'
  }));

  // All regular routes use the Universal engine
  server.get('*', (req, res) => {
    res.render(indexHtml, { req, providers: [{ provide: APP_BASE_HREF, useValue: req.baseUrl }] });
  });

  return server;
}

function run() {
  const port = process.env.PORT || 4000;

  //Connection of the server to the database
  require('./db');

  // Start up the Node server
  const server = app();
  server.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

// Webpack will replace 'require' with '__webpack_require__'
// '__non_webpack_require__' is a proxy to Node 'require'
// The below code is to ensure that the server is run only when not requiring the bundle.
declare const __non_webpack_require__: NodeRequire;
const mainModule = __non_webpack_require__.main;
const moduleFilename = mainModule && mainModule.filename || '';
if (moduleFilename === __filename || moduleFilename.includes('iisnode')) {
  run();
}

export * from './src/main.server';
