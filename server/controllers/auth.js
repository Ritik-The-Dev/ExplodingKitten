const  userSchema = require("../schema/userSchema");

exports.createProfile = async (req, res) => {
    try {
        const {userName} = req.body;
          if(!userName){
            return res.json({ msg: "Username is required",status:"false" })
        }
        const score = 0;
        const existingUser = await userSchema.findOne({ userName });
        if (existingUser) {
            return res.status(201).json({ msg: "Username already exists",status:"false" });
        }
        const data = await userSchema.create({ userName, score });
        return res.status(201).json({status:"success", data });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ msg: "Internal Server Error" });
    }
};


exports.AddScore = async (req, res) => {
    try {
        const { userId } = req.body;
        if(!userId) return res.json({ msg: "userId is required",status:"false" })
        const data = await userSchema.findByIdAndUpdate(userId, { $inc: { score: 1 } });
        return res.json({status:"success", data });
    } catch (err) {
        console.log(err);
    }
};

exports.ShowScore = async (req, res) => {
    try {
        const { userId } = req.body;
        if(!userId) return res.json({ msg: "userId is required",status:"false" })
        const { score } = await userSchema.findById(userId);
        return res.json({ status:"success",score });
    } catch (err) {
        console.log(err);
    }
};

exports.ShowAllScore = async (req, res) => {
    try {
        const data = await userSchema.find();
        return res.json({status:"success",data});
    } catch (err) {
        console.log(err);
    }
};
