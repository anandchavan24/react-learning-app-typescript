
interface Error{
    ErrorMessage:string
}

const ErrorContainer = ({ErrorMessage}:Error) => {
    return <div>{ErrorMessage}</div>;
};

export default ErrorContainer;
