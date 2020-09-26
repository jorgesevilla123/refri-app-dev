import { Router } from 'express';
import { Request, Response} from 'express';
import Client from "../models/clients.model";
import upload from "../fileProcessing";

const router = Router();


router.route('/checkClients').get( (req: Request, res: Response) => {
    res.json({message: 'Client route working good'})

})

router.route('/getClients').get( (req: Request, res: Response) => {
    Client.find( (err, client) => {
        if(err){
            console.log(err)
            res.json({ message: 'Error fetching client' })

        }
        else {
            res.json(client);
        }
    })

})

router.route('/getClients').get( (req: Request, res: Response) => {
    Client.find( (err, client) => {
        if(err){
            console.log(err)
            res.json({ message: 'Error fetching client' })

        }
        else {
            res.json(client);
        }
    })

})



router.route('/loadClient/:id').get( (req: Request, res: Response) => {
    const id = req.params.id
    Client.findOne({_id: id}, (err, client) => {
      if(err){
        console.log(err)
      }
      res.json(client);
    });

})


router.route('/searchClient?').get( (req: Request, res: Response) => {
    let client = req.query.name;
    Client.find({name : new RegExp(`${client}`, 'gi')}, (err, client) => {
        if(err){
            console.log(err)
            res.json({message: 'Error retrieving client'})
        }
        else {
            res.json(client);
        }
    })
})

router.route('/addClient').post(upload.none(), async (req: Request, res: Response) => {
    const {name, cedula, email, constantBuyer, productsBought, mostBought, phoneNumber, lastPurchase } = req.body
    const newClient = new Client({name, cedula, email, constantBuyer, productsBought, mostBought, phoneNumber, lastPurchase})
    await newClient.save()
    res.json(newClient);
})





//Cart operations


router.route('/buyProduct/:id').post( async (req: Request, res: Response) => {
    const id = req.params.id;
    var products = req.body;
    Client.findOne({_id: id}, (err, client) => {
      if (client){
        client.productsBought.push(products);
        client.save();
      res.json(client);
      }
      else {
          console.log(err);
      }
})

})

router.route('/addToCart/:id').post( async (req: Request, res: Response) => {
    const id = req.params.id;
    var products = req.body;
     Client.findOne({_id: id}, (err, client) => {
      if(client){
        client.cart.push(products)
        client.save();
        res.json(client);
      }
      else{
        console.log(err);
      }
    })
})

router.route('/deleteClient/:id').delete( (req: Request, res: Response) => {
    const id = req.params.id
    Client.findByIdAndDelete({_id : id}, (err, client) => {
        if(err) {
            console.log(err)
        }
        else {
            res.json(client);
        }
})
})

router.route('/removeFromCart/:clientId/:productId').delete( (req: Request, res: Response) => {
    const ClientId = req.params.clientId;
    const ProductId = req.params.productId;

    Client.findOne({_id: ClientId}, (err, client) => {
      if(client){
        var product = client.cart.find( ({ _id }) => _id ==`${ProductId}`);
        product.remove();
        client.save();
        res.json(client);
      }
      else{
        console.log(err)
      }
    })
})


router.route('/clearCart/:id').delete( (req: Request, res: Response) => {
    const id = req.params.id
    Client.findOne({_id: id}, (err, client) => {
      if(client){
        client.cart.splice(0, client.cart.length);
        client.save();
        res.json(client);
      }
      else{
        console.log(err);
      }
    })
})


router.route('/updateClient/:id').put(upload.none(), (req: Request, res: Response) => {
    const id = req.params.id
    const {name, cedula, email, phoneNumber} = req.body
    Client.findOneAndUpdate({ _id: id }, {name, cedula, email, phoneNumber}, { upsert: false },  (err, client) => {
      if (err) {
          res.status(500).send(err);
      } else {
          client.save();
      res.json(client);
      }
  });

})







export default router;


