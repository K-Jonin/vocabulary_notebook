package validation

import (
	"unicode/utf8"
	"vocabulary_notebook/app/constants"
	"vocabulary_notebook/app/models/folders"
)

// 入力値チェック：フォルダー
func ValidateFolder(folder folders.Folder) (errMsg []string) {
	if folder.FolderName == "" {
		errMsg = append(errMsg, constants.ERROR_FOLDER_NAME_EMPTY)
	} else if utf8.RuneCountInString(folder.FolderName) > 20 {
		errMsg = append(errMsg, constants.ERROR_FOLDER_NAME_LENGTH_OVER)
	}
	return errMsg
}
