import React, { useEffect, useState } from "react";
import { MdOutlineArrowOutward } from "react-icons/md";

const baseURL = process.env.REACT_APP_BASEURL;
const apiKey = process.env.REACT_APP_APIKEY;

const Card = () => {
  const [documents, setDocuments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredDocuments, setFilteredDocuments] = useState([]);

  useEffect(() => {
    getAllDocument();
  }, []);

  useEffect(() => {
    const results = documents.filter((document) =>
      document.judulDokumen.toLowerCase().includes(searchQuery.toLowerCase())
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

  return (
    <>
      <div className="card shadow mb-4">
        <div className="card-header py-3">
          <div className="row d-flex align-items-center">
            <div className="col-lg-3">
              <h6 className="m-0 font-weight-bold text-primary">
                List Dokumen Kosasih
              </h6>
            </div>
            <div className="col-lg-3">
              <input
                type="text"
                className="form-control mt-3"
                placeholder="Cari nama dokumen..."
                value={searchQuery}
                onChange={handleSearchChange}
              />
            </div>
          </div>
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
                        <div className="card-body">
                          <div className="row no-gutters align-items-center">
                            <div className="col mr-2">
                              <div className="text-xs font-weight-bold text-primary mb-1">
                                {document.judulDokumen}
                              </div>
                              <div className="h5 mb-0 font-weight-bold text-gray-800">
                                {document.kategoriDokumen}
                              </div>
                            </div>
                            <div className="col-auto">
                              <a href={document.link} target="_blank">
                                <MdOutlineArrowOutward className="fa-2x text-gray-300" />
                              </a>
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
                        <div className="card-body">
                          <div className="row no-gutters align-items-center">
                            <div className="col mr-2">
                              <div className="text-xs font-weight-bold text-primary mb-1">
                                {document.judulDokumen}
                              </div>
                              <div className="h5 mb-0 font-weight-bold text-gray-800">
                                {document.kategoriDokumen}
                              </div>
                            </div>
                            <div className="col-auto">
                              <a href={document.link} target="_blank">
                                <MdOutlineArrowOutward className="fa-2x text-gray-300" />
                              </a>
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
    </>
  );
};

export default Card;
