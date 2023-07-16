import React, { RefObject } from 'react'
import { vocabularyModel } from "../vocabularyModel"
import { inputBase } from "./inputBase";

/** インプット */
type Inputs = {
    /** 原文 */
    vocabularyText: RefObject<HTMLTextAreaElement>,
    /** 翻訳 */
    translation: RefObject<HTMLTextAreaElement>,
    /** メモ */
    memo: RefObject<HTMLTextAreaElement>,
    /** 理解度 */
    comprehension: number,
}

/**
 * 単語インプットクラス
 */
export class vocabularyInput extends inputBase<vocabularyModel> {
    /** 単語モデル */
    vocabularyModel: vocabularyModel;
    /** インプット */
    inputs: Inputs;

    // コンストラクタ
    constructor(model: vocabularyModel) {
        super(model);
        this.vocabularyModel = model;
        this.inputs = {
            vocabularyText: React.createRef(),
            translation: React.createRef(),
            memo: React.createRef(),
            comprehension: 0,
        }
    }

    /**
     * 単語モデル作成
     * @returns 単語モデル
     */
    createModel(): vocabularyInput {
        this.vocabularyModel.vocabularyText = String(this.inputs.vocabularyText.current?.value);
        this.vocabularyModel.translation = String(this.inputs.translation.current?.value);
        this.vocabularyModel.memo = String(this.inputs.memo.current?.value);
        this.vocabularyModel.comprehension = String(this.inputs.comprehension);
        return this;
    }
}