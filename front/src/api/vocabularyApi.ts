import axios from "axios";
import { vocabularyModel } from "../models/vocabularyModel";
import { constants } from "../utils/constants/constants";
import { showErrorToast } from "../utils/message";
import { errorMessages } from "../utils/constants/messages";

/**
 * 単語取得
 * @param folderId フォルダID
 */
export async function getVocabularies(folderId: string) {
    let result: vocabularyModel[] = [];
    try {
        const response = await axios.get(`${constants.API_BASE_URL}/vocabulary/${folderId}`);
        response.data.map((data: any, index: number) => {
            result[index] = new vocabularyModel(data);
        });
    } catch (err) {
        showErrorToast(errorMessages.ERROR_MSG_SYSTEM_ERROR);
    }
    return result;
}

/**
 * 単語登録
 * @param formData フォームデータ
 */
export async function insertVocabulary(formData: FormData) {
    let response;
    try {
        response = await axios.post(`${constants.API_BASE_URL}/vocabulary/register`, formData);
    } catch(err) {
        showErrorToast(errorMessages.ERROR_MSG_SYSTEM_ERROR);
        return false;
    }

    // エラーチェック
    if (constants.KEY_API_RESPONSE_ERROR_MESSAGE in response?.data) {
        for (const msg of response.data[constants.KEY_API_RESPONSE_ERROR_MESSAGE]) {
            showErrorToast(msg);
        }
        return false;
    }
    return true;
}

/**
 * 単語編集
 * @param formData フォームデータ
 */
export async function modifyVocabulary(formData: FormData) {
    let response;
    try {
        response = await axios.put(`${constants.API_BASE_URL}/vocabulary/modify`, formData);
    } catch(err) {
        showErrorToast(errorMessages.ERROR_MSG_SYSTEM_ERROR);
        return false;
    }

    // エラーチェック
    if (constants.KEY_API_RESPONSE_ERROR_MESSAGE in response?.data) {
        for (const msg of response.data[constants.KEY_API_RESPONSE_ERROR_MESSAGE]) {
            showErrorToast(msg);
        }
        return false;
    }
    return true;
}