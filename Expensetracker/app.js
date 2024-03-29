const express=require("express")
const bodyparser=require("body-parser")
const path=require("path")
const fs=require("fs")
const cors=require("cors")
const sequelize=require("./util/database")
const expenserouter=require("./routes/expense")
const purchaserouter=require("./routes/purchase")
const userrouter=require("./routes/user")
const premiumrouter=require("./routes/premium")
const passwordrouter=require("./routes/password")
const Expense=require("./models/expense")
const User=require("./models/user")
const Order=require("./models/order")
const DownloadedFilesUrl=require("./models/Downloadedfiles")
const ForgotPasswordRequests=require("./models/forgotpassword")
require("dotenv").config();

const accesslogstream=fs.createWriteStream(path.join(__dirname,"access.log"),{flags:"a"})
const helmet =require("helmet")
const compression=require("compression")
const morgan=require("morgan")

const app=express();
app.use(helmet())
app.use(compression())
app.use(morgan("combined",{stream:accesslogstream}))
app.use(cors())
app.use(bodyparser.json({extented:false}))
app.use("/expense",expenserouter)
app.use("/user",userrouter)
app.use("/purchase",purchaserouter)
app.use("/premium",premiumrouter)
app.use("/password",passwordrouter)

Expense.belongsTo(User,{constrainsts:true})
User.hasMany(Expense);

User.hasMany(Order)
Order.belongsTo(User)

User.hasMany(ForgotPasswordRequests)
ForgotPasswordRequests.belongsTo(User)

User.hasMany(DownloadedFilesUrl)
DownloadedFilesUrl.belongsTo(User)
sequelize.sync()
.then(()=>app.listen(process.env.CONNECTION_PORT ||4000))
.catch(err=>console.log(err))