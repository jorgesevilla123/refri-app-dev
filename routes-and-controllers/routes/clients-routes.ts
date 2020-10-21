import { Router } from 'express';
import { Request, Response} from 'express';
import Client from "../../models/clients.model";
import upload from "../../fileProcessing";
import { AddClient, addToCart, buyProduct, clearClientCart, clientRouteTest, deleteClient, GetAllclients, getOneClient, removeProductFromCart, searchClients, updateClient } from 'routes-and-controllers/controllers/clients-controllers';

const router = Router();


router.route('/checkClients').get(clientRouteTest);




router.route('/getClients').get(GetAllclients);




router.route('/loadClient/:id').get(getOneClient);




router.route('/searchClient?').get(searchClients);




router.route('/addClient').post(upload.none(), AddClient);





//Cart operations


router.route('/buyProduct/:id').post(buyProduct);




router.route('/addToCart/:id').post(addToCart);




router.route('/deleteClient/:id').delete(deleteClient);




router.route('/removeFromCart/:clientId/:productId').delete(removeProductFromCart);




router.route('/clearCart/:id').delete(clearClientCart);




router.route('/updateClient/:id').put(upload.none(), updateClient);







export default router;


