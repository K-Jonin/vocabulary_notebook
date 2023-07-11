import Folder from "./Folder"
import {getFolders} from "../../api/folderApi";
import { useState, useEffect } from "react";
import { folderModel } from "../../models/folderModel";
import "./folder.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

const Folders = () => {
    // フォルダモデル
    const [folders, setFolders] = useState<folderModel[]>([]);
    // テスト用ユーザーID
    const userId = "1";

    // フォルダ取得
    useEffect(() => {
        const fetchFolders = async () => {
            setFolders(await getFolders(userId));
        };
        fetchFolders();
    }, [setFolders]);

    // フォルダ作成ボタン押下
    function clickCreateFolder(e: React.MouseEvent) {
        setFolders([new folderModel(), ...folders]);
    }

    return (
        <div id="folders">
            <div className="menu">
                <button className="createBtn" onClick={(e) => clickCreateFolder(e)}>＋フォルダ作成</button>
                <p className="search">
                    <button>
                        <FontAwesomeIcon icon={faMagnifyingGlass} />
                    </button>
                    <input type="text" placeholder="フォルダ検索..." />
                </p>
            </div>
            <div className="main">
                {folders.map((folder, index) => (
                    <Folder
                        key={index}
                        userId={userId}
                        folder={folder}
                        folders={folders}
                        setFolders={setFolders} />
                ))}
            </div>
        </div>
    )
}

export default Folders