import { vocabularyModel } from "../../models/vocabularyModel"
import { constants } from "../../utils/constants/constants"
import { vocabularyInput } from "../../models/input/vocabularyInput"

type Props = {
    vocabularies: vocabularyModel,
    vocabularyInput: vocabularyInput,
}
function VocabularyInput({vocabularies, vocabularyInput}: Props) {
    return (
        <div className="vocabularyInput">
            <p className="vocabularyText">
                <label>{ constants.LABEL_NAME_VOCABYLARY_TEXT }</label>
                <textarea
                    name="text"
                    ref={ vocabularyInput.inputs.vocabularyText }
                    defaultValue={ vocabularies.vocabularyText } />
            </p>
            <p className="translation">
                <label>{ constants.LABEL_NAME_TRANSlATION }</label>
                <textarea
                    name="translation"
                    ref={ vocabularyInput.inputs.translation }
                    defaultValue={ vocabularies.translation } />
            </p>
            <p className="memo">
                <label>{ constants.LABEL_NAME_MEMO }</label>
                <textarea
                    name="memo"
                    ref={ vocabularyInput.inputs.memo }
                    defaultValue={ vocabularies.memo } />
            </p>
        </div>
    )
}

export default VocabularyInput