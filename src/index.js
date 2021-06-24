import express from 'express'
import userRouter from './routes/userRouter.js'
import mongoose from 'mongoose'

let app = express()
app.use(express.urlencoded())
app.use(express.json())

//connecting to mongoose - 'userdb' is database name
const connect = mongoose.connect('mongodb://localhost/userdb', { useNewUrlParser: true });

//checking the connection
connect.then((db) => {
    console.log('connected successfully!')
},(err) =>{console.log(err); });


const PORT = process.env.port || 3000
app.get('/',(req,res) => res.send('Hello!'))
app.listen(PORT, () => {
    console.log(`Server running at :${PORT}`)
});

app.use('/users',userRouter)

app.use(function (req, res, next) {
    next(createError(404));
  });
  
  // error handler
  app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
  
    // render the error page
    res.status(err.status || 500);
    res.send(res.locals.message);
  });
  


