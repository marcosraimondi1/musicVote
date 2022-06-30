const ProgressBar = (props) => {
  const { bgcolor, completed } = props;

  const containerStyles = {
    height: "100%",
    width: "100%",
    backgroundColor: "#e0e0de",
    borderRadius: 50
  };

  const fillerStyles = {
    height: "100%",
    width: `${completed}%`,
    backgroundColor: bgcolor,
    borderRadius: "inherit",
    textAlign: "right"
  };

  const labelStyles = {
    color: "white",
    fontWeight: "bold"
  };
  if (!completed) {
    return <></>;
  }
  return (
    <div style={containerStyles}>
      <div style={fillerStyles}>
        <span style={labelStyles}>{``}</span>
      </div>
    </div>
  );
};

export default ProgressBar;
