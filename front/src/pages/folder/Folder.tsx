import React, { useRef, useState } from 'react'
import { folderModel } from "../../models/folderModel";
import { deleteFolder, getFolders, modifyFolder, registerFolder } from "../../api/folderApi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFolder } from "@fortawesome/free-solid-svg-icons";
import { faPenToSquare, faTrashCan } from "@fortawesome/free-regular-svg-icons";
import { constants } from "../../utils/constants/constants";
import { useHistory } from "react-router-dom";

type Props = {
    userId: string,
    folder: folderModel,
    folders: folderModel[],
    setFolders: React.Dispatch<React.SetStateAction<folderModel[]>>,
}

const Folder = ({ userId, folder, folders, setFolders }: Props) => {
    // フォルダー名
    const folderNameRef = useRef<HTMLInputElement>(null);
    // ヒストリ
    const history = useHistory();
    // インプットを表示するか
    const isDisplayInput = (folder.folderId == "") || folder.isModify;

    // 編集ボタン押下
    async function clickModifyBtn(e: React.MouseEvent) {
        e.stopPropagation();
        const newFolders = folders.map((newFolder) => {
            if (newFolder.folderId == folder.folderId) {
                return { ...newFolder, isModify: true };
            }
            return newFolder;
        });
        setFolders(newFolders);
    }

    // 削除ボタン押下
    async function clickDeleteBtn(e: React.MouseEvent) {
        e.stopPropagation();
        if (window.confirm("削除を実行します") === false) return;

        // 削除実行
        await deleteFolder(folder.folderId);

        setFolders(await getFolders(userId));
    }

    // フォルダー名フォーカス時エンターキー押下
    function onKeyDownFolderName(e: React.KeyboardEvent<HTMLInputElement>) {
        if (e.key !== "Enter") return;
        handleRegisterOrModify();
    }

    // 登録または編集
    async function handleRegisterOrModify() {
        const folderName = String(folderNameRef.current?.value);
        const formData = new FormData();
        formData.append(constants.TABLE_FOLDERS_FOLDER_NAME, folderName);

        let result: boolean;
        if (folder.isModify) {
            result = await modifyFolder(folder.folderId, formData);
        } else {
            result = await registerFolder(userId, formData);
        }

        if (!result) return;

        setFolders(await getFolders(userId));
    }

    // フォルダクリック
    async function clickFolder() {
        if (isDisplayInput) return;
        history.push(
            constants.PATH_VOCABULARIES,
            { folderId: folder.folderId, folderName: folder.folderName }
        );
    }

    return (
        <div className="folder" onClick={() => clickFolder()}>
            <span className="icon"><FontAwesomeIcon icon={faFolder} /></span>
            {
                (isDisplayInput)
                    ? <input
                        ref={folderNameRef}
                        type="text"
                        defaultValue={folder.folderName}
                        onKeyDown={(e) => onKeyDownFolderName(e)}
                        onBlur={handleRegisterOrModify}
                        autoFocus={true} />
                    : <p>{folder.folderName}</p>
            }
            <div className="buttons">
                <button className="modify" onClick={(e) => clickModifyBtn(e)}>
                    <FontAwesomeIcon icon={faPenToSquare} color={folder.isModify ? "#80FF54" : "#708090"} />
                </button>
                <button className="delete" onClick={(e) => clickDeleteBtn(e)}>
                    <FontAwesomeIcon icon={faTrashCan} />
                </button>
            </div>
        </div>
    )
}

export default Folder