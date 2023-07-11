package folders

import (
	"database/sql"
	"vocabulary_notebook/app/models"
)

// フォルダ
type Folder struct {
	// フォルダID
	FolderId int
	// フォルダ名
	FolderName string
	// ユーザーID
	UserId int
	// 作成日時
	CreatedAt string
	// 削除フラグ
	DeleteFlag int
}

// 取得
func GetAllByUserId(userId int) (*sql.Rows, error) {
	cmd := `SELECT * FROM folders WHERE user_id = ? AND delete_flag = 0 ORDER BY created_at DESC`
	return models.Db.Query(cmd, userId)
}

// 登録
func (folder *Folder) Insert() (err error) {
	cmd :=
		`INSERT INTO folders
			(
				folder_name,
				user_id
			) VALUES (?, ?)`

	_, err = models.Db.Exec(cmd, folder.FolderName, folder.UserId)
	return err
}

// 更新
func (folder *Folder) Update() (err error) {
	cmd := `UPDATE folders SET folder_name = ? WHERE folder_id = ?`

	_, err = models.Db.Exec(cmd, folder.FolderName, folder.FolderId)
	return err
}

// 削除
func Delete(folderId int) (err error) {
	cmd := `UPDATE folders SET delete_flag = 1 WHERE folder_id = ?`

	_, err = models.Db.Exec(cmd, folderId)
	return err
}
