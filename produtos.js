const express = require('express');
const router = express.Router();
const Produto = require('../models/produtos');
const mongoose = require ('mongoose');
const cors = require ("cors");

router.get('/', (req, res, next)=>{
    const produto =Produto.find({})
    .exec()
    .then(result =>{
        res.status(200).json({
            message: 'GET Request para /produtos',
            produtos: result
        })

    })
    .catch((err)=>res.status(500).json({error:err}))

});

router.post('/', (req, res, next)=>{
   
    const produto = new Produto ({
        _id: new mongoose.Types.ObjectId(),
        nome: req.body.nome,
        preco: req.body.preco
    });
    produto.save()
    .then(result => {
        res.status(201).json({
            message: 'POST Request para /produtos',
            produtoCriado: produto
        });
    })
    .catch(err => {
        res.status(500).json({
            error: err
        });
    });
    
});

//manipulando um unico produto //5e85ff4a247c202ccc8570ed
router.get('/:produtoId', (req, res, next)=>{
    const id = req.params.produtoId;
    Produto.findById(id)
    .exec()
    .then(doc => {
        res.status(200).json(doc);
    })
    .catch(err =>{
        res.status(500).json({error:err});
    })
    
});

//deletando um unico produto
router.delete('/:produtoID', cors(),( req, res, next)=> {
    const id = req.params.produtoID
    Produto.findByIdAndDelete(id) 
    .exec()
    .then(doc => {
        res.status(200).json({ message: "Deletado com sucesso" });
    })
    .catch((err) => {
        res.status(500).json({error:err});
    })
});

//Atualizando um produto
router.put('/:produtoID', cors(),(req, res, next)=> {
    const id = req.params.produtoID
    Produto.findByIdAndUpdate(id, req.body, {new:true})
    .exec()
    .then(doc => {
        res.status(200).json({ message: "Atualizado com sucesso" });
    })
    .catch((err) => {
        res.status(500).json({error:err});
    })
});



module.exports = router;