function Badge({ text }) {
  const color =
    text === "Present" ? "green" :
    text === "Absent" ? "red" : "gray";

  return <span className={`badge ${color}`}>{text}</span>;
}

export default Badge;
