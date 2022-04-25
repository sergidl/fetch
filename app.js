import express from 'express';
import moviesRouter from './routers/moviesRouter.js';
import userRouter from './routers/userRouter.js';
import clientErrorHandler from './middleware/errorHandler.js';
import errorRouter from './routers/errorRouter.js';
import cors from 'cors';
import dotenv from "dotenv";

const app=express();
app.use(cors());
app.use(express.json());
app.use((req,res,next)=>{
    console.log('---->app.js');
    next();
});

app.use('/movies',moviesRouter);

app.use('/users',userRouter);
//Otros direccionaminetos ...
app.get('/users/login',(req,res)=>{
    console.log('---->app.js:getUser');
    res.json({msg: 'This is CORS-enabled for all origins!'})
});
app.post('/users/register',(req,res)=>{
    console.log('---->app.js:getUser');

    res.json({msg: 'pppppp'})
});
app.listen(process.env.PORT,()=>{
    console.log('listening on 3011');
});



app.use('*',errorRouter);
app.use(clientErrorHandler);


export default app;