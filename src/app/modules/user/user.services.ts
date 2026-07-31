import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
import { UserModel } from "../auth/auth.model";
import { User } from "../auth/auth.interface";

const getAllUsers = async () => {
    const result = await UserModel.find();
    return result;
};

const getSingleUser = async (id: string) => {
    const result = await UserModel.findById(id);
    if (!result) {
        throw new ApiError(httpStatus.NOT_FOUND, "User not found");
    }
    return result;
};

const updateProfile = async (id: string, payload: Partial<User>) => {
    const result = await UserModel.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true,
    });
    if (!result) {
        throw new ApiError(httpStatus.NOT_FOUND, "User not found");
    }
    return result;
};

const deleteUser = async (id: string) => {
    const result = await UserModel.findByIdAndUpdate(
        id,
        { isDeleted: true },
        { new: true }
    );
    if (!result) {
        throw new ApiError(httpStatus.NOT_FOUND, "User not found");
    }
    return result;
};

export const userServices = {
    getAllUsers,
    getSingleUser,
    updateProfile,
    deleteUser,
};
