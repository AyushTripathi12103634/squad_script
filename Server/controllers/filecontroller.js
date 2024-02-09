import filemodel from "../models/filemodel.js";
import { decode } from "jsonwebtoken";

export const uploadFileController = async (req, res) => {
  try {
    const { title, language, content, meetingid, access } = req.body;
    const author = decode(req.headers.authorization)._id;

    if (!title) {
      return res.status(400).send({
        success: false,
        message: "Title is required",
      });
    }
    if (!language) {
      return res.status(400).send({
        success: false,
        message: "Language is required",
      });
    }
    if (!content) {
      return res.status(400).send({
        success: false,
        message: "Content is required",
      });
    }
    if (!author) {
      return res.status(400).send({
        success: false,
        message: "Author is required",
      });
    }
    if (!meetingid) {
      return res.status(400).send({
        success: false,
        message: "meetingid is required",
      });
    }
    if (access===null) {
      return res.status(400).send({
        success: false,
        message: "access is required",
      });
    }

    const exist_file = await filemodel.findOne({ meetingid: meetingid });
    if (exist_file) {
      return res.status(300).send({
        success: false,
        message: "File already exists",
      });
    }

    try {
      const file = await filemodel.create({
        title: title,
        language: language,
        content: content,
        author: author,
        meetingid: meetingid,
        access: access,
      });
      return res.status(200).send({
        success: true,
        message: "done",
      });
    } catch (error) {
      return res.status(400).send({
        sucess: false,
        message: "Error in saving",
        error: error,
      });
    }
  } catch (error) {
    return res.status(400).send({
      success: false,
      message: "Error in upload file API",
      error: error,
    });
  }
};

export const getFilesController = async (req, res) => {
  try {
    const files = await filemodel.find();

    return res.status(200).send({
      success: true,
      message: "Files retrieved successfully",
      files,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Error in get files API",
      error: error,
    });
  }
};

export const getFileByIdController = async (req, res) => {
  try {
    const id = decode(req.headers.authorization)._id;

    const file = await filemodel.findOne({ author: id }).populate("author");

    if (file) {
      return res.status(200).send({
        success: true,
        message: "File retrieved successfully",
        file,
      });
    } else {
      return res.status(404).send({
        success: false,
        message: "File not found",
      });
    }
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Error in get file by id API",
      error: error,
    });
  }
};

export const deleteFileController = async (req, res) => {
  try {
    const { meetid } = req.body;
    const id = decode(req.headers.authorization)._id;
    const check = await filemodel.findOne({ meetingid: meetid });
    if (check) {
      if (check.author == id) {
        const del = await filemodel.deleteOne({ meetingid: meetid });
        console.log(meetid)
        if (del.deletedCount == 1) {
          console.log("hello")
          return res.status(200).send({
            success: true,
            message: "deleted successfully",
          });
        }
      } else {
        return res.status(200).send({
          success: false,
          message: "access denied",
        });
      }
    }
    return res.status(200).send({
      success: false,
      message: "no meeting found",
    });
  } catch (error) {
    return res.status(400).send({
      success: false,
      message: "error in delete api",
    });
  }
};


export const updateFileController = async(req,res) => {
  try {
    const { title, language, content, meetid, access } = req.body;
    const id = decode(req.headers.authorization)._id;
    const check = await filemodel.findOne({meetingid:meetid});
    if (check){
      if (check.author == id){
        const del = await filemodel.updateOne({meeting:meetid},{ title, language, content, meetid, access });
        return res.status(200).send({
          success:true,
          message:"updated successfully",
        })
      }
      else{
        return res.status(200).send({
          success:false,
          message:"access denied"
        })
      }
    }
    return res.status(200).send({
      success:false,
      message:"no meeting found"
    })
  } catch (error) {
    return res.status(400).send({
      success:false,
      message:"error in updatefile api"
    })
  }
}