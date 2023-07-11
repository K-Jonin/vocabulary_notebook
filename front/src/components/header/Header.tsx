import {useState} from 'react'
import Menu from "./Menu";
import "./header.scss";

const Header = () => {
  // メニューの表示状態
  const [active, setActive] = useState(false);

  return (
    <div className="header">
        <div className="menu-area">
          <div
            className={`menu-btn ${active ? "active" : ""}`}
            onClick={() => setActive(!active)}
          >
            <span></span><span></span><span></span>
          </div>
          <Menu active={active} />
        </div>
        <div className="user-info-area">
          <p className="name">テストテスト<span>様</span></p>
          <p className="user-icon"><img src={`${process.env.PUBLIC_URL}/images/user_icon.png`} alt="ユーザーアイコン" /></p>
        </div>
    </div>
  )
}

export default Header