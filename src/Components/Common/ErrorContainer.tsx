import { Error } from "../../Shared/types";

const ErrorContainer = ({ErrorMessage}:Error) => {
    return <div>{ErrorMessage}</div>;
};

export default ErrorContainer;
