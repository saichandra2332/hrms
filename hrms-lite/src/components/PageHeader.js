function PageHeader({ title, action }) {
  return (
    <div className="page-header">
      <h2>{title}</h2>
      {action}
    </div>
  );
}

export default PageHeader;
