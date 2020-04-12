import { Alert } from "../shared/alert/AlertModel";

export default interface BaseProps {
    /** 
     * used for testing to access specific elements
     * NOTE: When creating own components that wrap other components, provide a `data-testid` prop for testing!
     */
    "data-testid"?: string;

    theme?: string;
}

export interface DataComponentProps extends BaseProps {
    functionSet: {
        /**
         * Changes the header inside the AppBar
         */
        changeHeader(header: string): void;
        /**
         * Activates the Snackbar and displays the given alert
         * @param alert An alert from the type TypedAlert to render an Alert inside a Snackbar
         */
        openAlert(alert: Alert): void;
        /**
         * Toggles if loading is activated or not
         * @param loading boolean if the loading indicator is to be shown
         */
        toggleLoading(loading: boolean): void;
    };
}