import React, { useRef } from 'react'
import { modifyFolder, getFolders, registerFolder } from "../../api/folderApi";
import { folderModel } from "../../models/folderModel";
import { constants } from "../../utils/constants/constants";

type Props = {
    folder: folderModel,
    setFolders: React.Dispatch<React.SetStateAction<folderModel[]>>,
    userId: string,
}

const FolderInput = ({ folder, setFolders, userId }: Props) => {
    // フォルダー名
    const folderNameRef = useRef<HTMLInputElement>(null);

    // 更新ボタン押下
    async function clickModifyFolder(e: React.MouseEvent) {
        const folderName = String(folderNameRef.current?.value);
        const formData = new FormData();
        formData.append(constants.TABLE_FOLDERS_FOLDER_NAME, folderName);

        // 実行
        await modifyFolder(folder.folderId, formData);

        setFolders(await getFolders(userId));
    }

    // 作成ボタン押下
    async function clickCreateFolder(e: React.MouseEvent) {
        const folderName = String(folderNameRef.current?.value);
        const formData = new FormData();
        formData.append(constants.TABLE_FOLDERS_FOLDER_NAME, folderName);

        // 実行
        await registerFolder(userId, formData);

        setFolders(await getFolders(userId));
    }

    return (
        <>
            <input ref={folderNameRef} type="text" defaultValue={folder.folderName} />
            {folder.isModify
                ? <button onClick={(e) => clickModifyFolder(e)}>更新</button>
                : <button onClick={(e) => clickCreateFolder(e)}>作成</button>}
        </>
    )
}

export default FolderInput