import React, { useState } from 'react'
import { vocabularyModel } from "../../models/vocabularyModel";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight, faVolumeLow } from "@fortawesome/free-solid-svg-icons";

type Props = {
    vocabularies: vocabularyModel,
    isDisplayTranslation: boolean,
    setIsDisplayTranslation: React.Dispatch<React.SetStateAction<boolean>>,
    displayIndex: number,
    setDisplayIndex: React.Dispatch<React.SetStateAction<number>>,
    vocabularyLength: number,
    playAudio: (text: string, isTranslation: boolean) => void,
}

function Vocabulary({
    vocabularies,
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
                    <button onClick={(e) => clickPlayAudio(e)}>
                        <FontAwesomeIcon icon={faVolumeLow} />
                    </button>
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