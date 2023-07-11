import React from 'react'
import { vocabularyInput } from "../../models/input/vocabularyInput"
import { vocabularyModel } from "../../models/vocabularyModel";
import { getVocabularies, insertVocabulary, modifyVocabulary } from "../../api/vocabularyApi";
import { showErrorToast, showToast } from "../../utils/message";
import { messages } from "../../utils/constants/messages";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";

type Props = {
    vocabularies: vocabularyModel,
    setVocabularies: React.Dispatch<React.SetStateAction<vocabularyModel[]>>
    isRegister: boolean,
    isModify: boolean,
    setIsRegisterOrMofify: React.Dispatch<React.SetStateAction<boolean>>,
    vocabularyInput:   vocabularyInput,
    folderId: string,
}

function InputButtons({
    isRegister,
    setIsRegisterOrMofify,
    isModify,
    vocabularyInput,
    vocabularies,
    setVocabularies,
    folderId,
}: Props) {
    // 完了ボタンクリック
    const clickCompleteButton = async () =>  {
        const formData = vocabularyInput.createModel().createFormData();
        let result = false;
        if (isRegister) {
            result = await insertVocabulary(formData);
        } else if (isModify) {
            console.log( vocabularyInput.createModel())
            result = await modifyVocabulary(formData);
        }

        if (!result) return;

        showToast(
            isRegister
                ? messages.MSG_CPMPLETE_REGISTER_VOCABULARY
                : messages.MSG_CPMPLETE_MODIFY_VOCABULARY);
        setIsRegisterOrMofify(false);
        setVocabularies(await getVocabularies(folderId));
    }

    return (
        <>
            <button
                className="btnCancel default"
                onClick={() => setIsRegisterOrMofify(false)} >
                <FontAwesomeIcon icon={faXmark} />
                <span>キャンセル</span>
            </button>
            <button
                className="btnComplete default"
                onClick={clickCompleteButton} >
                <FontAwesomeIcon icon={faCheck} />
                <span>完了</span>
            </button>
        </>
    )
}

export default InputButtons