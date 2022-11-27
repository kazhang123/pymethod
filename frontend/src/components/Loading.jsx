import "./styles.css";

export const SPINNER_TYPES = { GROW: "grow", BORDER: "border" };

const Loading = (props) => {
  const { size, type } = props;

  return (
    <div className="loader">
      <div
        className={type ? `spinner-${type}` : "spinner-grow"}
        style={{ width: size ? size : "3rem", height: size ? size : "3rem" }}
        role="status"
      ></div>
      <div style={{ margin: "10px" }}>Loading...</div>
    </div>
  );
};

export default Loading;
