import "../../utils/stringUtility"

/**
 * インプット基底クラス
 */
export class inputBase<T> {
    // モデル
    model: T;

    /**
     * コンストラクタ
     * @param model モデル
     */
    constructor(model: T) {
        this.model = model;
    }

    /**
     * フォームデータ作成
     * @returns フォームデータ
     */
    public createFormData() {
        const formData = new FormData();
        for (const key of Object.keys(this.model as object)) {
            formData.append(key.toCapitalized(), Object(this.model)[key]);
        }
        return formData;
    }
}