import meetmodel from "../models/meetmodel.js";
export const createmeetController = async (req,res) => {
    try {
        const id = req.user._id;
        let meet_id = "";
        const characters = 'abcdefghijklmnopqrstuvwxyz';
        for (let i = 0; i < 12; i++) {
            if (i > 0 && i % 3 === 0) {
                meet_id += '-';
            }
            meet_id += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        try {
            const check_id = await meetmodel.findOne({meeting_id:meet_id});
            if (!check_id){
                const meet = await new meetmodel({
                    createdBy: id,
                    meeting_id: meet_id,
                }).save();
                return res.status(200).send({
                    success:true,
                    message:"meeting created successfully",
                    meeting_id: meet_id,
                    meet
                })
            }
        } catch (error) {
            return res.status(400).send({
                success:false,
                message:"Failed to create meeting",
                error: error,
            })
        }
    } catch (error) {
        return res.status(400).send({
            success:false,
            message:"Error in createmeet api"
        })
    }
}
export const joinmeetController = async (req,res) => {
    try {
        const {meet_id} = req.params;
        return res.status(200).send({
            meet_id
        })
    } catch (error) {
        return res.status(400).send({
            success:false,
            message:"Error in joinmeet api"
        })
    }
}