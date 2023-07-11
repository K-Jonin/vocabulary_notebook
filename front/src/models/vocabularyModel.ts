import { constants } from "../utils/constants/constants";
import { modelBase } from "./modelBase";

/**
 * 単語モデル
 */
export class vocabularyModel extends modelBase {
    // 単語ID
    vocabularyId: string;
    // 単語テキスト
    vocabularyText: string;
    // 翻訳
    translation: string;
    // メモ
    memo: string;
    // 理解度
    comprehension: string;
    // フォルダID
    folderId: string;
    // ユーザーID
    userId: string;
    // 作成日時
    createdAt: string;

    /**
     * デフォルトコンストラクタ
     */
    constructor()

    /**
     * コンストラクタ
     * @param vocabulary 単語
     */
    constructor(vocabulary: any);

    /**
     * コンストラクタ
     * @param vocabulary 単語
     */
    constructor(vocabulary?: any) {
        super();
        this.vocabularyId = vocabulary == null ? "" : vocabulary[constants.TABLE_VOCABULARIES_VOCABULARY_ID];
        this.vocabularyText = vocabulary == null ? "" : vocabulary[constants.TABLE_VOCABULARIES_VOCABULARY_TEXT];
        this.translation = vocabulary == null ? "" : vocabulary[constants.TABLE_VOCABULARIES_TRANSLATION];
        this.memo = vocabulary == null ? "" : vocabulary[constants.TABLE_VOCABULARIES_MEMO];
        this.comprehension = vocabulary == null ? "" : vocabulary[constants.TABLE_VOCABULARIES_COMPREHENSION];
        this.folderId = vocabulary == null ? "" : vocabulary[constants.TABLE_VOCABULARIES_FOLDER_ID];
        this.userId = vocabulary == null ? "" : vocabulary[constants.TABLE_VOCABULARIES_USER_ID];
        this.createdAt = vocabulary == null ? "" : vocabulary[constants.TABLE_VOCABULARIES_CREATED_AT];
    }
}