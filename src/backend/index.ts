import { Server, int } from 'azle';
import express, { NextFunction, Request } from 'express';

type fragance = {
    id: number;
    Name: string;
    scent: string;
    geneder: string;
    mark:  string;
}

let fragances: fragance[] = [{
    id: 1,
    Name: 'cloud',
    scent: 'floral',
    geneder: 'mujer',
    mark:  'ariana grande'
}];


export default Server(() => {
    const app = express();

    app.use(express.json());
   

    // GET
    app.get('/fragances', (req, res) =>{
        res.json(fragances);
    });
    

    //POST
    app.post('/fragances', (req, res) => {
        const id = req.body.id;
        const fragance = fragances.find((fragance) => fragance.id === id);

        if(!fragance){
            fragances = [...fragances, req.body]
        res.send("ok");
        }else{
            res.status(404).send("el id ya existe");
            return;
        }
        
    });

 //PUT
 app.put("/fraganes/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const fragance = fragances.find((fragance) => fragance.id === id);

    if(!fragance){
        res.status(404).send("error");
        return;
    }
    const updateBook = { ...fragance, ...req.body };
    fragances= fragances.map((b) => b.id === updateBook.id ? updateBook : b);

    res.send("ok");
});

//DELETE
app.delete("/fragances/:id", (req, res) => {
    const id = parseInt(req.params.id);
    fragances = fragances.filter((fragance) => fragance.id !== id);
    res.send("ok");
});


return app.listen();
});
