import { constants } from "../utils/constants/constants";
import axios from "axios";
import { folderModel } from "../models/folderModel";
import { showErrorToast } from "../utils/message";
import { errorMessages } from "../utils/constants/messages";

/**
 * 取得
 * @param userId ユーザーID
 * @returns フォルダ情報
 */
export async function getFolders(userId: string) {
    let result: folderModel[] = [];
    try {
        const response = await axios.get(`${constants.API_BASE_URL}/folder/${userId}`);
        response.data.map((data: any, index: number) => {
            result[index] = new folderModel(data, false);
        });
    } catch (error) {
        showErrorToast(errorMessages.ERROR_MSG_SYSTEM_ERROR);
    }
    return result;
}

/**
 * 登録
 * @param userId ユーザーID
 * @param folder フォルダ情報
 */
export async function registerFolder(userId: string, folder : any) {
    let response;
    try {
        response = await axios.post(`${constants.API_BASE_URL}/folder/register/${userId}`, folder)
    } catch(error) {
        showErrorToast(errorMessages.ERROR_MSG_SYSTEM_ERROR);
    }

    // エラーチェック
    if (constants.KEY_API_RESPONSE_ERROR_MESSAGE in response?.data) {
        for (const msg of response?.data[constants.KEY_API_RESPONSE_ERROR_MESSAGE]) {
            showErrorToast(msg);
        }
        return false;
    }
    return true;
}


/**
 * 編集
 * @param folderId フォルダID
 * @param folder フォルダ情報
 */
export async function modifyFolder(folderId: string, folder: any) {
    let response;
    try {
        response = await axios.put(`${constants.API_BASE_URL}/folder/modify/${folderId}`, folder);
    } catch (error) {
        showErrorToast(errorMessages.ERROR_MSG_SYSTEM_ERROR);
    }

    // エラーチェック
    if (constants.KEY_API_RESPONSE_ERROR_MESSAGE in response?.data) {
        for (const msg of response?.data[constants.KEY_API_RESPONSE_ERROR_MESSAGE]) {
            showErrorToast(msg);
        }
        return false;
    }
    return true;
}

/**
 * 削除
 * @param folderId フォルダID
 */
export async function deleteFolder(folderId: string) {
    try {
        await axios.put(`${constants.API_BASE_URL}/folder/delete/${folderId}`);
    } catch (error) {
        showErrorToast(errorMessages.ERROR_MSG_SYSTEM_ERROR);
    }
}