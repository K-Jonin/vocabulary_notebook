import { toast } from "react-toastify";

/**
 * メッセージ取得
 * @param message メッセージ
 * @param replaceString 置換文字列
 * @returns メッセージ
 */
export function getMessage(message: string, ...replaceString: string[]) {
    for (let i = 0; i < replaceString.length; i++) {
        const replaceTag = "$" + (i+ 1);
        message = message.replace(replaceTag, replaceString[i])
    }
    return message;
}

/**
 * トースト表示
 * @param message メッセージ
 */
export function showToast(message: string) {
    toast.success(message, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
}

/**
 * エラー系トースト表示
 * @param errorMessage エラーメッセージ
 */
export function showErrorToast(errorMessage: string) {
    toast.error(errorMessage, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        });
}