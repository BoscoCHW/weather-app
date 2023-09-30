import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";

interface SearchPopupProps {
  show: boolean;
  onHide: () => void;
  onSearch: (query: string) => void;
  cityCards: JSX.Element[];
}

const SearchPopup: React.FC<SearchPopupProps> = ({
  show,
  onHide,
  onSearch,
  cityCards,
}) => {
  const [searchTerm, setSearchTerm] = useState<string>("");

  const handleSearch = () => {
    onSearch(searchTerm);
    setSearchTerm("");
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header>
        <Modal.Title className="m-auto">
          <div className="input-group d-flex m-auto">
            <span className="input-group-text">Search</span>
            <input
              type="text"
              className="form-control"
              placeholder="Search city"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSearch();
              }}
            />
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={handleSearch}
            >
              <i className="bi bi-search"></i>
            </button>
          </div>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="d-flex flex-wrap">{cityCards}</div>
      </Modal.Body>
    </Modal>
  );
};

export default SearchPopup;
