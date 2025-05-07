require("dotenv").config()
let db = require("./model/connect")
let express = require("express")
let cookieParser = require("cookie-parser")
let morgan = require("morgan")
let app = express()
let cors = require("cors")
const { errorHandler } = require("./middleware/errorHandler")
let userRouter = require("./Routes/userRouter")
let memberRouter = require("./Routes/memberRouter")
let PORT = process.env.PORT || 3000
let Member = require("./model/memberSchema")
const { messageSender } = require("./utils/messageSender")
const { sendMailCustomer } = require("./utils/mail")
let path=require("path")

let _dirname=path.resolve()
// middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(morgan("tiny"))
app.use(cors({
    origin: "https://gymapp-wcgp.onrender.com/",
    credentials: true
}))


async function checkMembers() {
    try {
        let members = await Member.find();
        if (!members || members.length === 0) {
            console.log("No Member Found");
            return;
        }

        members.forEach(async (m) => {
            let now = new Date();
            let result = new Date(m.remind) - now;
            console.log("result", result);

            if (result < 0) {
                await messageSender(m.name, m.phone);
                await sendMailCustomer(m);

                let date = new Date(m.remind);
                date.setMonth(date.getMonth() + m.month);
                if (date.getMonth() > 12) {
                    date.setMonth(date.getMonth() - 12);
                    date.setFullYear(date.getFullYear() + 1);
                }
                m.remind = date.toISOString();
                await m.save();
                console.log("newDate", m.remind, "Name", m.name);
            }
        });
        console.log("No Defaulter");
    } catch (error) {
        console.log(error);
    }
}

// Run check every minute
setInterval(checkMembers, 60000);


// Routes
app.use("/user", userRouter)
app.use("/member", memberRouter)

app.use(express.static(path.join(_dirname,"/frontend/dist")))
app.get("/",(req,res)=>{
    res.sendFile(path.resolve(_dirname,"frontend","dist","index.html"))
})

app.use("/",(req, res, next) => {
    const error = new Error("Route not found");
    error.status = 404;
    next(error);
});


// Gloabl ErrorHandler
app.use(errorHandler)

app.listen(PORT, () => {
    console.log("Server running on PORT", PORT)
})