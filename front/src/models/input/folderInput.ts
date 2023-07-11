import React, { RefObject } from 'react'
import { inputBase } from "./inputBase"
import { folderModel } from "../folderModel";

/** インプット */
type Inputs = {
    /** フォルダ名 */
    folderName: RefObject<HTMLTextAreaElement>,
}

/**
 * フォルダインプット
 */
export class folderInput extends inputBase<folderModel> {
    /** フォルダモデル */
    folderModel: folderModel;
    /** インプット */
    inputs: Inputs;

    /**
     * コンストラクタ
     * @param model フォルダモデル
     */
    constructor(model: folderModel) {
        super(model);
        this.folderModel = model;
        this.inputs = {
            folderName: React.createRef(),
        }
    }

    /**
     * フォルダモデル作成
     * @returns フォルダモデル
     */
    createModel(): folderInput {
        this.folderModel.folderName = String(this.inputs.folderName.current?.value);
        return this;
    }
}