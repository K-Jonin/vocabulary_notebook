package vocabularies

import (
	"database/sql"
	"vocabulary_notebook/app/models"
)

// 単語
type Vocabulary struct {
	// 単語ID
	VocabularyId int
	// 単語テキスト
	VocabularyText string
	// 翻訳
	Translation string
	// メモ
	Memo string
	// 理解度
	Comprehension int
	// フォルダID
	FolderId int
	// ユーザーID
	UserId int
	// 作成日時
	CreatedAt string
	// 削除フラグ
	DeleteFlag bool
}

// 取得：ユーザーID
func GetAllByUserId(user_id int) (*sql.Rows, error) {
	cmd := `SELECT * FROM vocabularies WHERE user_id = ? AND delete_flag = 0 ORDER BY created_at DESC`
	return models.Db.Query(cmd, user_id)
}

// 取得：フォルダID
func GetAllByFolderId(folder_id int) (*sql.Rows, error) {
	cmd := `SELECT * FROM vocabularies WHERE folder_id = ? AND delete_flag = 0`
	return models.Db.Query(cmd, folder_id)
}

// 取得：理解度
func GetAllByComprehension(comprehension int, folder_id int) (*sql.Rows, error) {
	cmd := `SELECT * FROM vocabularies WHERE comprehension = ? AND folder_id = ? AND delete_flag = 0`
	return models.Db.Query(cmd, comprehension)
}

// 登録
func (vocabulary *Vocabulary) Insert() (err error) {
	cmd :=
		`INSERT INTO vocabularies
			(
				vocabulary_text,
				translation,
				memo,
				comprehension,
				folder_id,
				user_id
			) VALUES (?, ?, ?, ?, ?, ?)`

	_, err = models.Db.Exec(cmd,
		vocabulary.VocabularyText,
		vocabulary.Translation,
		vocabulary.Memo,
		vocabulary.Comprehension,
		vocabulary.FolderId,
		vocabulary.UserId,
	)
	return err
}

// 更新
func (vocabulary *Vocabulary) Update() (err error) {
	cmd :=
		`UPDATE vocabularies
			SET
				vocabulary_text = ?,
				translation = ?,
				memo = ?
			WHERE
				vocabulary_id = ?`

	_, err = models.Db.Exec(
		cmd,
		vocabulary.VocabularyText,
		vocabulary.Translation,
		vocabulary.Memo,
		vocabulary.VocabularyId,
	)
	return err
}

// 更新：理解度
func (vocabulary *Vocabulary) UpdateComprehension() (err error) {
	cmd :=
		`UPDATE vocabularies
			SET
				comprehension = ?
			WHERE
				vocabulary_id = ?`

	_, err = models.Db.Exec(
		cmd,
		vocabulary.Comprehension,
		vocabulary.VocabularyId,
	)
	return err
}

// 削除
func Delete(vocabularyId int) (err error) {
	cmd := `UPDATE vocabularies SET delete_flag = 1 WHERE vocabulary_id = ?`

	_, err = models.Db.Exec(cmd, vocabularyId)
	return err
}
