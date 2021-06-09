import {createActionSendMessage} from "../actions/action-send-message";
import {processError} from "../../util/store-util";
import {download} from "../../service/server";

const processEffectDownload = async (dispatch: any, getStore : any, attachmentId: string, fileName: string): Promise<number> => {

    try {
        const blob = await download(attachmentId);

        const a = document.createElement("a");
        a.style.display = "none";
        document.body.appendChild(a);
        a.href = window.URL.createObjectURL(blob);
        a.setAttribute("download", fileName);
        a.click();

        window.URL.revokeObjectURL(a.href);

        document.body.removeChild(a);

        dispatch(createActionSendMessage(false, "Download complete"));
    }
    catch(err){
        let errorMessage = processError(err);
        dispatch(createActionSendMessage(true, errorMessage));
    }

    return 0;
}

export const createEffectDownload = (attachmentId: string, fileName: string) => {
    return (dispatch: any, getStore: any) => {
        processEffectDownload(dispatch, getStore, attachmentId, fileName)
            .then(()=>{})
            .catch(()=>{});
    }
}
