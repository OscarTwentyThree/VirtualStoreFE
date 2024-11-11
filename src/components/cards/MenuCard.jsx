import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export const MenuCard = ({ title, link, fondo, externo = false }) => {
  const navigate = useNavigate();
  const openInNewTab = (url) => {
    window.open(url, "_blank", "noreferrer");
  };
  return externo ? (
    <Link onClick={() => openInNewTab(link)}>
      <div className="card rounded shadow">
        <div className="d-flex justify-content-center my-3">
          <img src={fondo} className="img-card-menu" alt="imagen" />
        </div>
        <div className="card-body">
          <h5 className="card-title text-none">{title}</h5>
        </div>
      </div>
    </Link>
  ) : (
    <Link to={link}>
      <div className="card rounded shadow">
        <div className="d-flex justify-content-center my-3">
          <img src={fondo} className="img-card-menu" alt="imagen" />
        </div>
        <div className="card-body">
          <label className="card-title text-none" style={{fontSize:"30px"}}>{title}</label>
        </div>
      </div>
    </Link>
  );
};