import React, { useState } from 'react'
import { vocabularyModel } from "../../models/vocabularyModel";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight, faVolumeLow } from "@fortawesome/free-solid-svg-icons";
import { getVocabularies, updateComprehension } from "../../api/vocabularyApi";
import { vocabularyInput } from "../../models/input/vocabularyInput";
import { showToast } from "../../utils/message";
import { messages } from "../../utils/constants/messages";
import { constants } from "../../utils/constants/constants";
import { faFaceFrown, faFaceSmile, faFaceSmileBeam } from "@fortawesome/free-solid-svg-icons";

type Props = {
    vocabularies: vocabularyModel,
    setVocabularies: React.Dispatch<React.SetStateAction<vocabularyModel[]>>,
    isDisplayTranslation: boolean,
    setIsDisplayTranslation: React.Dispatch<React.SetStateAction<boolean>>,
    displayIndex: number,
    setDisplayIndex: React.Dispatch<React.SetStateAction<number>>,
    vocabularyLength: number,
    playAudio: (text: string, isTranslation: boolean) => void,
}

function Vocabulary({
    vocabularies,
    setVocabularies,
    isDisplayTranslation,
    setIsDisplayTranslation,
    displayIndex,
    setDisplayIndex,
    vocabularyLength,
    playAudio,
}: Props) {
    // 次へまたは戻るボタンクリック
    function clickNextOrBack(num: number) {
        setIsDisplayTranslation(false);
        setDisplayIndex(displayIndex + num);
    }

    // 音声再生ボタンクリック
    function clickPlayAudio(e: React.MouseEvent) {
        e.stopPropagation();
        const text = isDisplayTranslation
            ? vocabularies.translation
            : vocabularies.vocabularyText;
        playAudio(text, isDisplayTranslation);
    }

    // 理解度ボタンクリック
    async function clickComprehension(e: React.MouseEvent, comprehension: number) {
        e.stopPropagation();
        const input = new vocabularyInput(vocabularies);
        input.inputs.comprehension = comprehension;
        const formData = input.createModel().createFormData();
        const result = await updateComprehension(formData);

        if (!result) return;

        showToast(messages.MSG_COMPLETE_UPDATE_COMPREHENSION);
        setVocabularies(await getVocabularies(vocabularies.folderId));
    }

    return (
        <>
            <div className="vocabulary" onClick={() => setIsDisplayTranslation(!isDisplayTranslation)}>
                <div className="vocabularyInner">
                    <p>
                        {(isDisplayTranslation == false)
                            ? vocabularies.vocabularyText
                            : vocabularies.translation
                        }
                    </p>
                    <button className="playAudio" onClick={(e) => clickPlayAudio(e)}>
                        <FontAwesomeIcon icon={faVolumeLow} />
                    </button>
                    <div className="comprehension">
                        <button className="bad" onClick={(e) => clickComprehension(e, constants.VOCABULARIES_COMPREHENSION_BAD)}>
                            <FontAwesomeIcon
                                icon={faFaceFrown}
                                color={vocabularies.comprehension == String(constants.VOCABULARIES_COMPREHENSION_BAD) ? "#A386F0" : "#FFF"} />
                            <span className="first"><span>BAD</span></span>
                        </button>
                        <button className="good" onClick={(e) => clickComprehension(e, constants.VOCABULARIES_COMPREHENSION_GOOD)}>
                            <FontAwesomeIcon
                                icon={faFaceSmile}
                                color={vocabularies.comprehension == String(constants.VOCABULARIES_COMPREHENSION_GOOD) ? "#E3D922" : "#FFF"} />
                            <span className="first"><span>GOOD</span></span>
                        </button>
                        <button className="perfect" onClick={(e) => clickComprehension(e, constants.VOCABULARIES_COMPREHENSION_PERFECT)}>
                            <FontAwesomeIcon
                                icon={faFaceSmileBeam}
                                color={vocabularies.comprehension == String(constants.VOCABULARIES_COMPREHENSION_PERFECT) ? "#FA5F34" : "#FFF"} />
                            <span className="first"><span>PERFECT</span></span>
                        </button>
                    </div>
                </div>
            </div>
            <div className="swicthPageButtons">
                <button onClick={() => clickNextOrBack(-1)} disabled={displayIndex === 0}>
                    <FontAwesomeIcon icon={faChevronLeft} />
                </button>
                <button onClick={() => clickNextOrBack(1)} disabled={displayIndex === (vocabularyLength - 1)}>
                    <FontAwesomeIcon icon={faChevronRight} />
                </button>
            </div>
            <div className="page">
                <p>{`${displayIndex + 1} / ${vocabularyLength}`}</p>
            </div>
        </>
    )
}

export default Vocabulary