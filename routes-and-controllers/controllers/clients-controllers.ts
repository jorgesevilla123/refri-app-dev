import { Router } from 'express';
import { Request, Response} from 'express';
import Client from "../../models/clients.model";
import upload from "../../fileProcessing";







export const clientRouteTest = (req: Request, res: Response) => {
    res.json({message: 'Client route working good'})
}






export const GetAllclients = (req: Request, res: Response) => {
    Client.find( (err, client) => {
        if(err){
            console.log(err)
            res.json({ message: 'Error fetching client' })
        }
        else {
            res.json(client);
        }
    })
}






export const getOneClient = (req: Request, res: Response) => {
    const id = req.params.id
    Client.findOne({_id: id}, (err, client) => {
      if(err){
        console.log(err)
      }
      res.json(client);
    });
}






export const searchClients = (req: Request, res: Response) => {
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
}






export const AddClient = async (req: Request, res: Response) => {
    const {name, cedula, email, constantBuyer, productsBought, mostBought, phoneNumber, lastPurchase } = req.body
    const newClient = new Client({name, cedula, email, constantBuyer, productsBought, mostBought, phoneNumber, lastPurchase})
    await newClient.save()
    res.json(newClient);
}






export const buyProduct = (req: Request, res: Response) => {
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
}






export const addToCart = (req: Request, res: Response) => {
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
}






// export const deleteClient = (req: Request, res: Response) => {
//     const id = req.params.id
//     Client.findByIdAndDelete({_id : id}, (err, client) => {
//         if(err) {
//             console.log(err)
//         }
//         else {
//             res.json(client);
//         }
// })
// }




export const deleteClient = (req: Request, res: Response) => {
  const id = req.params.id
  Client.findByIdAndDelete({_id : id}).then(
    client => {
      res.json(client);
    }

  ).catch(
    err => {
      console.log(err);
    }
  )


}







export const removeProductFromCart = (req: Request, res: Response) => {
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
}






export const clearClientCart = (req: Request, res: Response) => {
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
}






export const updateClient = (req: Request, res: Response) => {
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

}







