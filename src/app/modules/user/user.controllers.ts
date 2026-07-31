import { Request, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../../utils/catchAsync";
import sendResponse from "../../../utils/sendResponse";
import { userServices } from "./user.services";
import ApiError from "../../../errors/ApiError";

const getAllUsers = catchAsync(async (req: Request, res: Response) => {
    const result = await userServices.getAllUsers();
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Users retrieved successfully",
        data: result,
    });
});

const getSingleUser = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await userServices.getSingleUser(id as string);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "User retrieved successfully",
        data: result,
    });
});

const updateProfile = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    
    // Handle profile image if uploaded
    let profileImageUrl = undefined;
    if (req.file) {
        profileImageUrl = `/uploads/profile-images/${req.file.filename}`;
    }

    // Parse the body field if it's a string (standard for multipart/form-data)
    let data: any = {};
    if (req.body.body && typeof req.body.body === "string") {
        try {
            data = JSON.parse(req.body.body);
        } catch (error) {
            try {
                const bodyStr = `{${req.body.body}}`;
                data = JSON.parse(bodyStr);
            } catch (innerError) {
                throw new ApiError(httpStatus.BAD_REQUEST, "Invalid JSON in request body");
            }
        }
    } else {
        data = req.body;
    }

    // Construct update data based on the provided fields
    const updateData: any = {
        ...data,
        ...(profileImageUrl && { profileImage: profileImageUrl }),
    };

    const result = await userServices.updateProfile(id as string, updateData);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "User profile updated successfully",
        data: result,
    });
});

const deleteUser = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await userServices.deleteUser(id as string);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "User deleted successfully",
        data: result,
    });
});

export const userControllers = {
    getAllUsers,
    getSingleUser,
    updateProfile,
    deleteUser,
};
