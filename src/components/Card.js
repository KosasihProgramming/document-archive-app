import React, { useEffect, useState } from "react";
import { MdOutlineArrowOutward } from "react-icons/md";
import { IoMdAdd } from "react-icons/io";
import { FiMinus } from "react-icons/fi";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const baseURL = process.env.REACT_APP_BASEURL;
const apiKey = process.env.REACT_APP_APIKEY;

const Card = () => {
  const [documents, setDocuments] = useState([]);
  const [document, setDocument] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredDocuments, setFilteredDocuments] = useState([]);
  const [modalShow, setModalShow] = React.useState(false);

  useEffect(() => {
    getAllDocument();
  }, []);

  useEffect(() => {
    const results = documents.filter(
      (document) =>
        document.judulDokumen
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        document.bagian.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredDocuments(results);
  }, [searchQuery, documents]);

  const getAllDocument = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`${baseURL}/${apiKey}/exec`);
      const data = await response.json();
      if (data && Array.isArray(data.documents)) {
        setDocuments(data.documents.slice(1));
      } else {
        console.error("Fetched data does not contain a valid documents array");
      }
    } catch (error) {
      console.error("Error fetching documents:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearchChange = (event) => {
    setIsSearching(true);
    setSearchQuery(event.target.value);
  };

  const detailInfo = (document) => {
    setModalShow(true);
    setDocument(document);
  };

  return (
    <>
      <div className="card shadow mb-4">
        <div className="card-header py-3 justify-content-between align-items-center">
          <div className="d-flex mb-2 align-items-center">
            <h6 className="m-0 font-weight-bold text-primary">List Dokumen</h6>
            <a
              rel="noopener noreferrer"
              target="_blank"
              href="https://docs.google.com/forms/d/e/1FAIpQLSdzqRS4BmGaDf-E57lsV2qMFI1auYt77jsuCbMOGNTSoWwivw/viewform"
              className="btn btn-primary btn-icon-split btn-sm ml-auto">
              <span className="icon text-white-50">
                <IoMdAdd />
              </span>
              <span className="text">Tambah</span>
            </a>
          </div>
          <input
            type="text"
            className="form-control"
            placeholder="Cari dokumen..."
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </div>
        <div className="card-body">
          {isLoading ? (
            <p>Memuat data..</p>
          ) : (
            <>
              {isSearching ? (
                <>
                  {filteredDocuments.map((document) => (
                    <div className="col-xl-3 col-md-6 mb-4">
                      <div className="card border-left-primary shadow h-100 py-2">
                        <div
                          className="card-body"
                          onClick={() => detailInfo(document)}>
                          <div className="row no-gutters align-items-center">
                            <div className="col mr-2">
                              <div className="text-s font-weight-bold text-primary mb-1">
                                {document.judulDokumen}
                              </div>
                              <div className="text-xs mb-0 font-weight-bold text-gray-800">
                                {document.kategoriDokumen} <FiMinus />{" "}
                                {document.bagian}
                              </div>
                              <div className="text-xs mb-0 font-weight-bold text-primary">
                                <FiMinus /> {document.tanggalTerbit}
                              </div>

                              <div className="mb-0 mt-2">
                                <a
                                  rel="noopener noreferrer"
                                  target="_blank"
                                  href={document.link}
                                  class="btn btn-primary btn-icon-split btn-sm">
                                  <span class="icon text-white-50">
                                    <MdOutlineArrowOutward className="text-gray-300 mb-1" />
                                  </span>
                                  <span class="text">Lihat dokumen</span>
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </>
              ) : (
                <>
                  {documents.map((document) => (
                    <div className="col-xl-3 col-md-6 mb-4">
                      <div className="card border-left-primary shadow h-100 py-2">
                        <div
                          className="card-body"
                          onClick={() => detailInfo(document)}>
                          <div className="row no-gutters align-items-center">
                            <div className="col mr-2">
                              <div className="text-s font-weight-bold text-primary mb-1">
                                {document.judulDokumen}
                              </div>
                              <div className="text-xs mb-0 font-weight-bold text-gray-800">
                                {document.kategoriDokumen} <FiMinus />{" "}
                                {document.bagian}
                              </div>
                              <div className="text-xs mb-0 font-weight-bold text-primary">
                                <FiMinus /> {document.tanggalTerbit}
                              </div>

                              <div className="mb-0 mt-2">
                                <a
                                  rel="noopener noreferrer"
                                  target="_blank"
                                  href={document.link}
                                  class="btn btn-primary btn-icon-split btn-sm">
                                  <span class="icon text-white-50">
                                    <MdOutlineArrowOutward className="text-gray-300 mb-1" />
                                  </span>
                                  <span class="text">Lihat dokumen</span>
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </>
              )}
            </>
          )}
        </div>
      </div>
      <DetailInfo
        show={modalShow}
        onHide={() => setModalShow(false)}
        document={document}
      />
    </>
  );
};

function DetailInfo(props) {
  const { document } = props;
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter"></Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4 className="text-primary fw-bold">{document.judulDokumen}</h4>
        <h6>
          {document.kategoriDokumen} <FiMinus /> {document.tanggalTerbit}
        </h6>
        <p>{document.deskripsiDokumen}</p>
        <p className="text-primary">{document.bagian}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default Card;
