function SideContent({ title, content, className = '' }) {
  return (
    <div className={className}>
      <div className="d-flex align-items-center">
        <div className="heading_border m-3 m-sm-0"></div>
        <h2 className="font-weight-bold">{title}</h2>
      </div>

      {content && <p className="side_content--p">{content}</p>}
    </div>
  );
}

export default SideContent;
