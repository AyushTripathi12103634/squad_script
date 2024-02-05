import meetmodel from "../models/meetmodel.js";
export const createmeetController = async (req,res) => {
    try {
        const id = req.user._id;
        const checkid = await meetmodel.findOne({createdBy:id});
        let meet_id = "";
        const characters = 'abcdefghijklmnopqrstuvwxyz';
        let check_id = null;
        do {
            meet_id = "";
            for (let i = 0; i < 12; i++) {
                if (i > 0 && i % 3 === 0) {
                    meet_id += '-';
                }
                meet_id += characters.charAt(Math.floor(Math.random() * characters.length));
            }
            check_id = await meetmodel.findOne({meeting_id:meet_id});
        } while (check_id);
        if (!checkid){
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
        else{
            checkid.meeting_id = meet_id;
            checkid.save();
            return res.status(200).send({
                success:true,
                message:"meeting created successfully",
                meeting_id: meet_id,
                checkid
            })
        }
    } catch (error) {
        return res.status(400).send({
            success:false,
            message:"Failed to create meeting",
            error: error,
        })
    }
}
export const joinmeetController = async (req,res) => {
    try {
        const {meet_id} = req.params;
        const meet = await meetmodel.findOne({meeting_id:meet_id});
        const id = decode(req.header.authorization);
        meet.meeting_members.add(id);
        await meet.save();
        if (meet.meeting_members.length>=4){
            return res.status(200).send({
                success:false,
                message:"Meeting members can't be greater than 4"
            })
        }
        return res.status(200).send({
            success:true,
            message:"Joined Meeting"
        })
    } catch (error) {
        return res.status(400).send({
            success:false,
            message:"Error in joinmeet api"
        })
    }
}