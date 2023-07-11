package users

import (
	"vocabulary_notebook/app/models"
	"vocabulary_notebook/utils"
)

// ユーザー
type User struct {
	// ユーザーID
	UserId int
	// 氏名
	Name string
	// Eメール
	Email string
	// パスワード
	Password string
	// 作成日時
	CreatedAt string
	// 更新日時
	UpdatedAt string
	// 削除フラグ
	DeleteFlag int
}

// 取得
func GetUserForLogin(email string, password string) (user User, err error) {
	user = User{}
	cmd := `SELECT * FROM users WHERE email = ? AND password = ? AND delete_flag = 0`
	err = models.Db.QueryRow(cmd, email, models.Encrypt(password)).Scan(
		&user.UserId,
		&user.Name,
		&user.Email,
		&user.Password,
		&user.CreatedAt,
		&user.UpdatedAt,
		&user.DeleteFlag,
	)
	return user, err
}

// 登録
func (user *User) Insert() (err error) {
	cmd :=
		`INSERT INTO users
			(
				name,
				email,
				password
			) VALUES (?, ?, ?)`

	_, err = models.Db.Exec(cmd, user.Name, user.Email, models.Encrypt(user.Password))

	return err
}

// 更新
func (user *User) Update() (err error) {
	cmd :=
		`UPDATE users
			SET
				name = ?,
				email = ?,
				password = ?
			WHERE
				user_id = ?`

	_, err = models.Db.Exec(cmd, user.Name, user.Email, models.Encrypt(user.Password), user.UserId)

	return err
}

// 削除
func Delete(user_id int) (err error) {
	cmd := `UPDATE users SET delete_flag = 1 WHERE user_id = ?`

	_, err = models.Db.Exec(cmd, user_id)
	if err != nil {
		utils.LoggingErrorLog(err)
	}
	return err
}
