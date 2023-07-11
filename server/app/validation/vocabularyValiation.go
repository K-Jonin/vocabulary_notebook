package validation

import (
	"unicode/utf8"
	"vocabulary_notebook/app/constants"
	vocabularies "vocabulary_notebook/app/models/vocabulary"
)

// 入力値チェック：単語
func ValidateVocabulary(vocabulary vocabularies.Vocabulary) (errMsg []string) {
	if vocabulary.VocabularyText == "" {
		errMsg = append(errMsg, constants.ERROR_VOCABULARY_TEXT_EMPTY)
	} else if utf8.RuneCountInString(vocabulary.VocabularyText) > 100 {
		errMsg = append(errMsg, constants.ERROR_VOCABULARY_TEXT_LENGTH_OVER)
	}

	if vocabulary.Translation == "" {
		errMsg = append(errMsg, constants.ERROR_VOCABULARY_TRANSLATION_EMPTY)
	} else if utf8.RuneCountInString(vocabulary.Translation) > 100 {
		errMsg = append(errMsg, constants.ERROR_VOCABULARY_TRANSLATION_LENGTH_OVER)
	}

	if utf8.RuneCountInString(vocabulary.Memo) > 100 {
		errMsg = append(errMsg, constants.ERROR_VOCABULARY_MEMO_LENGTH_OVER)
	}

	return errMsg
}
