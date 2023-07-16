import "./vocabulary.scss";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";
import { useLocation } from 'react-router-dom';
import { vocabularyModel } from "../../models/vocabularyModel";
import Vocabulary from "./Vocabulary";
import VocabularyInput from "./VocabularyInput";
import InputButtons from "./InputButtons";
import DefaultButtons from "./DefaultButtons";
import { vocabularyInput } from "../../models/input/vocabularyInput";
import { getVocabularies } from "../../api/vocabularyApi";
import VocabularyEmpty from "./VocabularyEmpty";

function Vocabularies() {
    // ロケーション
    const location = useLocation<{ folderId: string, folderName: string }>();
    // 単語モデル
    const [vocabularies, setVocabularies] = useState<vocabularyModel[]>([new vocabularyModel()]);
    // 表示する単語番号
    const [displayIndex, setDisplayIndex] = useState(0);
    // 単語追加か
    const [isRegister, setIsRegister] = useState(false);
    // 単語編集か
    const [isModify, setIsModify] = useState(false);
    // 単語インプットクラス
    const [input, setInput] = useState<vocabularyInput>(new vocabularyInput(new vocabularyModel()));
    // 翻訳を表示するか
    const [isDisplayTranslation, setIsDisplayTranslation] = useState(false);
    // 再生中か
    const [isPlaying, setIsPlaying] = useState(false);

    // 単語取得
    useEffect(() => {
        const fetchVocabularies = async () => {
            setVocabularies(await getVocabularies(location.state.folderId));
        };
        fetchVocabularies();
    }, [setVocabularies]);

    // 単語要素取得
    function getVocabularyElements(): JSX.Element[] {
        let elements:JSX.Element[] = [];
        if (vocabularies.length > 0) {
            elements.push(
                (isRegister || isModify)
                    ? <VocabularyInput
                        key={displayIndex}
                        vocabularies={isRegister ? new vocabularyModel() : vocabularies[displayIndex]}
                        vocabularyInput={input} />
                    : <Vocabulary
                        key={displayIndex}
                        vocabularies={vocabularies[displayIndex]}
                        setVocabularies={setVocabularies}
                        isDisplayTranslation={isDisplayTranslation}
                        setIsDisplayTranslation={setIsDisplayTranslation}
                        displayIndex={displayIndex}
                        setDisplayIndex={setDisplayIndex}
                        vocabularyLength={vocabularies.length}
                        playAudio={playAudio} />)
        } else {
            elements.push(
                isRegister
                    ? <VocabularyInput
                        key={displayIndex}
                        vocabularies={new vocabularyModel()}
                        vocabularyInput={input} />
                    : <VocabularyEmpty key={displayIndex} />);
        }
        return elements;
    }

    // 音声再生
    function playAudio(text: string, isTlanslation: boolean): void {
        const utterance = new SpeechSynthesisUtterance();
        utterance.text = text;
        utterance.lang = isTlanslation ? "ja" : "en-US";

        speechSynthesis.speak(utterance);
    }

    return (
        <div className="vocabularies">
            <div className="buttons">
                {(isRegister || isModify)
                    ? <InputButtons
                        vocabularies={vocabularies[displayIndex]}
                        setVocabularies={setVocabularies}
                        isRegister={isRegister}
                        isModify={isModify}
                        setIsRegisterOrMofify={isRegister ? setIsRegister : setIsModify}
                        vocabularyInput={input}
                        folderId={location.state.folderId} />
                    : <DefaultButtons
                        isRegister={isRegister}
                        setIsRegister={setIsRegister}
                        isModify={isModify}
                        setIsModify={setIsModify}
                        setInput={setInput}
                        folderId={location.state.folderId}
                        isEmptyVocabularies={vocabularies.length < 1}
                        vocabularies={vocabularies}
                        vocabulary={vocabularies[displayIndex]}
                        setIsDisplayTranslation={setIsDisplayTranslation}
                        setDisplayIndex={setDisplayIndex}
                        vocabulariesLength={vocabularies.length}
                        playAudio={playAudio} />
                }
            </div>
            <div className="main">
                { getVocabularyElements() }
            </div>
        </div>
    )
}

export default Vocabularies