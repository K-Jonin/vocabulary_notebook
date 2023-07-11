import { constants } from "../utils/constants/constants";
import { modelBase } from "./modelBase";

/**
 * フォルダモデル
 */
export class folderModel extends modelBase {
    // フォルダID
    folderId: string;
    // フォルダ名
    folderName: string;
    // ユーザーID
    userId: string;
    // 作成日時
    createdAt: string;
    // 編集か
    isModify: boolean;

    /**
     * デフォルトコンストラクタ
     */
    constructor();

    /**
     * コンストラクタ
     * @param folder フォルダ
     * @param isMoify 編集か
     */
    constructor(folder: any, isMoify: boolean);

    /**
     * コンストラクタ
     * @param folder フォルダ
     * @param isModify 編集か
     */
    constructor(folder?: any, isModify: boolean = false) {
        super();
        this.folderId = folder == null ? "" : folder[constants.TABLE_FOLDERS_FOLDER_ID];
        this.folderName = folder == null ? "" : folder[constants.TABLE_FOLDERS_FOLDER_NAME];
        this.userId = folder == null ? "" : folder[constants.TABLE_FOLDERS_USER_ID];
        this.createdAt = folder == null ? "" : folder[constants.TABLE_FOLDERS_CREATED_AT];
        this.isModify = isModify;
    }

}