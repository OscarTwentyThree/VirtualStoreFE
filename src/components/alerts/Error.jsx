export const ErrorAlert = ({ text }) => {
    return (
        <div
            className="alert alert-danger"
            role="alert"
        >
            <span className="">{text}</span>
        </div>
    );
};
