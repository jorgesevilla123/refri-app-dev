import {Request, Response} from 'express';
import Suppliers, { suppliersInterface } from '../../models/supplier-model';


export const getSuppliers = (req: Request, res: Response) => {
    Suppliers.find( (err, suppliers) => {
        if(err) {
            console.log(err);
        }
        else {
            res.json(suppliers);
        }
    })
}





export const searchSuppliers = (req: Request, res: Response) => {
let supplier = req.query.q

Suppliers.find({ company_name: new RegExp(`${supplier}`, 'gi')}).exec(
    (err, suppliers) => {
        if(err)  {
            console.log(err)
        }
        else {
            res.json(suppliers)
        }
    }
)




    
}




export const addSupplier = (req: Request, res: Response) => {
    const { company_name, contact_name, contact_email, rif, location, contact_phones  } = req.body
    const newSupplier = new Suppliers({ company_name, contact_name, contact_email, rif, location, contact_phones})
    newSupplier.save( (err, supplier) => {
        if(err) {
            res.json({message: 'error guardando proveedor', err})
        }
        else {
            res.json({message: 'Proveedor guardado!', supplier: supplier})
        }

    })


    
}



export const updateSupplier = (req: Request, res: Response) => {
    const id = req.params.id

    const updateData: any = {};

    if( req.body.company_name !== undefined || null) {
        updateData.company_name = req.body.company_name;
    }

    if( req.body.contact_name !== undefined || null) {
        updateData.contact_name = req.body.contact_name;
    }


    if( req.body.contact_email !== undefined || null) {
        updateData.contact_email = req.body.contact_email
    }


    if( req.body.rif !== undefined || null) {
        updateData.rif = req.body.rif
    }


    Suppliers.findOneAndUpdate({ _id: id}, updateData, {new: true}, (err, supplier) => {
        if(err) {
            res.json({ message: 'Error actualizando proveedor'});
        } 
        else {
            res.json({ message: 'Proveedor actualizado!', supplier});
        }
    })    
}







export const updateSupplierLocation = (req: Request, res: Response) => {
    const id = req.params.id
    const locationBody: any = {}
 

    console.log(req.body);

    if(req.body["location.address"] !== undefined || null) {
        locationBody['location.address'] = req.body['location.address']
    }



    if(req.body["location.city"] !== undefined || null) {
        locationBody['location.city'] = req.body['location.city']
    }


    if(req.body["location.state"] !== undefined || null) {
        locationBody['location.state'] = req.body['location.state']
    }


    if(req.body["location.postal_code"] !== undefined || null) {
        locationBody['location.postal_code'] = req.body['location.postal_code']
    }


    if(req.body["location.country"] !== undefined || null) {
        locationBody['location.country'] = req.body['location.country']
    }

    if(req.body["location.region"] !== undefined || null) {
        locationBody['location.region'] = req.body['location.region']
    }



    console.log(locationBody);




    Suppliers.findOneAndUpdate({_id: id}, locationBody, {new: true}, (err, supplier) => {
        if(err) {
            res.json({ message: 'Error actualizando ubicacion', err})
        }
        else {
            res.json({ message: 'Ubicacion actualizada!', supplier});
        }
    })
}
 










export const deleteSupplier = (req: Request, res: Response) => {
    const id = req.params.id
    Suppliers.findOneAndRemove({_id: id}).then(
        supplier => {
            res.json({message: 'Proveerdor borrado!', supplier: supplier})
        }
    ).catch(
        err => {
            console.log(err);
            res.json({message: 'Error eliminando proveedor'})
        }
    )
}




export const addSupplierNumber = (req: Request, res: Response) => {
    const id = req.params.id
    const numberQuery = req.query.number
    const number: any = Number(numberQuery)

    Suppliers.findOneAndUpdate({_id: id}, {$push: {contact_phones: number}}, {new: true}, (err, supplier) => {
        if(err) {
            res.json({ message: 'Error agregando numero', err})
        }
        else {
            res.json({ message: 'Numero agregado!', supplier});
        }
    })
}
 


export const deleteSupplierNumber = (req: Request, res: Response) => {
    const id = req.params.id
    const numberQuery = req.query.number
    const number: any = Number(numberQuery)

    Suppliers.findOneAndUpdate({_id: id}, {$pull: {contact_phones: number}}, {new: true}, (err, supplier) => {
        if(err) {
            res.json({ message: 'Error eliminando numero', err})
        }
        else {
            res.json({ message: 'Numero borrado!', supplier});
        }
    })

}

