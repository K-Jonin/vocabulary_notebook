package constants

// フォルダー系エラーメッセージ
const (
	// 文字数超過
	ERROR_FOLDER_NAME_LENGTH_OVER = "文字数が超過しています。20文字以内で入力してください。"
	// 空入力
	ERROR_FOLDER_NAME_EMPTY = "フォルダ名を入力してください"
)

// 単語系エラーメッセージ
const (
	// 空文字：単語
	ERROR_VOCABULARY_TEXT_EMPTY = "単語を入力してください"
	// 文字数超過：単語
	ERROR_VOCABULARY_TEXT_LENGTH_OVER = "文字数が超過しています。単語は100文字以内で入力してください。"
	// 空文字：翻訳
	ERROR_VOCABULARY_TRANSLATION_EMPTY = "翻訳を入力してください"
	// 文字数超過：翻訳
	ERROR_VOCABULARY_TRANSLATION_LENGTH_OVER = "文字数が超過しています。翻訳は100文字以内で入力してください。"
	// 文字数超過：メモ
	ERROR_VOCABULARY_MEMO_LENGTH_OVER = "文字数が超過しています。メモは100文字以内で入力してください。"
)
