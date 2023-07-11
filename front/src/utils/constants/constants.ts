export const constants = {
    /**  APIベースURL */
    API_BASE_URL: "http://localhost:8080",
    /** キー：APIレスポンスエラーメッセージ */
    KEY_API_RESPONSE_ERROR_MESSAGE: "msg",

    /**  パス：ログイン */
    PATH_LOGIN: "/",
    /**  パス：フォルダー */
    PATH_FOLDERS: "/folders",
    /**  パス：単語帳 */
    PATH_VOCABULARIES: "/vocabularies",
    /**  パス：エラーページ */
    PATH_ERROR_PAGE: "/error",

    /**  folders：フォルダID */
    TABLE_FOLDERS_FOLDER_ID: "FolderId",
    /**  folders：フォルダ名 */
    TABLE_FOLDERS_FOLDER_NAME: "FolderName",
    /**  folders：作成日時 */
    TABLE_FOLDERS_CREATED_AT: "CreatedAt",
    /**  folders：ユーザーID */
    TABLE_FOLDERS_USER_ID: "UserId",

    /**  vocabularies：単語ID */
    TABLE_VOCABULARIES_VOCABULARY_ID: "VocabularyId",
    /**  vocabularies：単語テキスト */
    TABLE_VOCABULARIES_VOCABULARY_TEXT: "VocabularyText",
    /**  vocabularies：翻訳 */
    TABLE_VOCABULARIES_TRANSLATION: "Translation",
    /**  vocabularies：メモ */
    TABLE_VOCABULARIES_MEMO: "Memo",
    /**  vocabularies：理解度 */
    TABLE_VOCABULARIES_COMPREHENSION: "Comprehension",
    /**  vocabularies：フォルダID */
    TABLE_VOCABULARIES_FOLDER_ID: "FolderId",
    /**  vocabularies：ユーザーID */
    TABLE_VOCABULARIES_USER_ID: "UserId",
    /**  vocabularies：作成日時 */
    TABLE_VOCABULARIES_CREATED_AT: "CreatedAt",

    /**  ラベル名：原文 */
    LABEL_NAME_VOCABYLARY_TEXT: "原文",
    /** ラベル名：翻訳 */
    LABEL_NAME_TRANSlATION: "翻訳",
    /** ラベル名：メモ */
    LABEL_NAME_MEMO: "メモ",
}