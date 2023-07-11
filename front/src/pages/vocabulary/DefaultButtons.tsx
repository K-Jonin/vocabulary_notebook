import React from 'react'
import { vocabularyInput } from "../../models/input/vocabularyInput";
import { vocabularyModel } from "../../models/vocabularyModel";
import { useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import { faPlay, faPlus, faStop } from "@fortawesome/free-solid-svg-icons";

type Props = {
    isRegister: boolean,
    setIsRegister: React.Dispatch<React.SetStateAction<boolean>>,
    isModify: boolean,
    setIsModify: React.Dispatch<React.SetStateAction<boolean>>,
    setInput: React.Dispatch<React.SetStateAction<vocabularyInput>>,
    folderId: string,
    isEmptyVocabularies: boolean,
    vocabularies: vocabularyModel[],
    vocabulary: vocabularyModel,
    setIsDisplayTranslation: React.Dispatch<React.SetStateAction<boolean>>,
    setDisplayIndex: React.Dispatch<React.SetStateAction<number>>,
    vocabulariesLength: number,
    playAudio: (text: string, isTranslation: boolean) => void,
}
function DefaultButtons({
    isRegister,
    setIsRegister,
    isModify,
    setIsModify,
    setInput,
    folderId,
    isEmptyVocabularies,
    vocabularies,
    vocabulary,
    setIsDisplayTranslation,
    setDisplayIndex,
    vocabulariesLength,
    playAudio,
}: Props) {
    // 再生中か
    const isPlaying = useRef<boolean>(false);

    // 追加ボタンクリック
    const clickBtnRegister = () => {
        setIsRegister(true);
        let model = new vocabularyModel();
        model.folderId = folderId;
        setInput(new vocabularyInput(model));
    }

    // 編集ボタンクリック
    const clickBtnModify = () => {
        setIsModify(true);
        setInput(new vocabularyInput(vocabulary));
    }

    // 再生ボタンクリック
    const clickBtnPlay = async () => {
        // 初期化
        isPlaying.current = true;
        setDisplayIndex(0);
        setIsDisplayTranslation(false);
        playAudio(vocabularies[0].vocabularyText, false);
        for (let i = 0; i < vocabulariesLength; i++) {
            if (!isPlaying.current) break;
            await sleep(2, () => {
                setIsDisplayTranslation(true);
                playAudio(vocabularies[i].translation, true);
            });

            if (!isPlaying.current || (i >= vocabulariesLength - 1)) break;
            await sleep(2, () => {
                setDisplayIndex(i + 1);
                setIsDisplayTranslation(false);
                playAudio(vocabularies[i + 1].vocabularyText, false);
            });
        }
        isPlaying.current = false;
    }

    // 処理をn秒間停止する
    const sleep = (waitSeconds: number, someFunction: () => void) => {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve(someFunction())
            }, waitSeconds * 1000)
        });
    }

    return (
        <>
            <button
                className="btnRegister default"
                onClick={clickBtnRegister}
                disabled={isPlaying.current} >
                <FontAwesomeIcon icon={faPlus} />
                <span>追加</span>
            </button>
            <button
                className="btnModify default"
                onClick={clickBtnModify}
                style={{ display: isEmptyVocabularies ? "none" : "block" }}
                disabled={isPlaying.current} >
                <FontAwesomeIcon icon={faPenToSquare} />
                <span>編集</span>
            </button>
            <button
                className="btnStopPlayback default"
                onClick={() => isPlaying.current = false}
                style={{ display: !isPlaying.current ? "none" : "block" }} >
                <FontAwesomeIcon icon={faStop} />
                <span>停止</span>
            </button>
            <button
                className={`btnPlaying ${isPlaying.current ? "onClick" : "default"}`}
                onClick={clickBtnPlay}
                style={{ display: isEmptyVocabularies ? "none" : "block" }}
                disabled={isPlaying.current} >
                <FontAwesomeIcon icon={faPlay} />
                <span>再生</span>
            </button>
        </>
    )
}

export default DefaultButtons