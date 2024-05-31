import React, { Component } from "react";
import MUIDataTable from "mui-datatables";
import Card from "../components/Card";
import { MdOutlineArrowOutward, MdEdit } from "react-icons/md";
import { FiMinus } from "react-icons/fi";
import { FaRegEye } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { format, parse } from "date-fns";
import { id } from "date-fns/locale";

const columns = [
  "#",
  "Nomor Dokumen",
  "Judul Dokumen",
  "Kategori",
  "Bagian",
  "Tanggal Terbit",
  "Status",
  "Aksi",
];

const categories = [
  { category: "Surat Keputusan" },
  { category: "Standar Operasional Prosedur" },
  { category: "Kontrak Kerja" },
  { category: "Perizinan" },
  { category: "Kontrak Kerjasama" },
  { category: "Surat Masuk" },
  { category: "Surat Keluar" },
];

class Document extends Component {
  constructor(props) {
    super(props);
    this.state = {
      baseURL: process.env.REACT_APP_BASEURL,
      apiKey:
        "AKfycbwU1kRwcGkFvRf78lJJ-LH1g_hw5yVrT-sIuARaIou1kUyS6_xN4gPEB26uxLFoRfloNw",
      documents: [],
      isLoading: false,
      isFilter: false,
      filter: "",
      documentsFiltered: [],
      isMobile: window.innerWidth <= 768,
      documentInfo: {},
      modalShow: false,
    };
    this.handleResize = this.handleResize.bind(this);
  }
  componentWillUnmount() {
    window.removeEventListener("resize", this.handleResize);
  }

  handleResize() {
    this.setState({ isMobile: window.innerWidth <= 768 });
  }

  componentDidMount = () => {
    window.addEventListener("resize", this.handleResize);
    this.getAllDocument();
  };

  getAllDocument = async () => {
    const { baseURL, apiKey } = this.state;
    console.log(`${baseURL}/${apiKey}/exec`);
    try {
      this.setState({ isLoading: true });
      const response = await fetch(`${baseURL}/${apiKey}/exec`);
      const data = await response.json();
      if (data && Array.isArray(data.documents)) {
        this.setState({ documents: data.documents.slice(1) });
        console.log(data.documents.slice(1));
      } else {
        console.error("Fetched data does not contain a valid documents array");
      }
    } catch (error) {
      console.error("Error fetching documents:", error);
    } finally {
      this.setState({ isLoading: false });
    }
  };

  handleSelecet = async (e) => {
    await new Promise((resolve) => {
      this.setState({ filter: e.target.value }, resolve);
    });

    const { filter } = this.state;

    if (filter !== "Semua") {
      await this.handleFilter();
    } else {
      this.setState({ isFilter: false });
    }
  };

  handleFilter = () => {
    const { documents, filter } = this.state;
    const filteredDocuments = documents.filter(
      (document) => document.kategoriDokumen === filter
    );
    this.setState({ documentsFiltered: filteredDocuments, isFilter: true });
  };

  detailInfo = (document) => {
    this.setState({ documentInfo: document, modalShow: true });
  };

  handleEdit = (document) => {
    const link = document.link;
    const splitURL = link.split("?");
    const params = splitURL[1];
    const splitParams = params.split("=");
    const id = splitParams[1];
    window.location.href = `documents/${id}/edit`;
  };

  formatDate(dateString) {
    const date = new Date(dateString);
    const options = { day: "numeric", month: "long", year: "numeric" };
    return new Intl.DateTimeFormat("id-ID", options).format(date);
  }

  render() {
    const {
      documents,
      isLoading,
      isFilter,
      documentsFiltered,
      isMobile,
      modalShow,
      documentInfo,
    } = this.state;

    const data = documents.map((document, index) => {
      const tanggalTerbit = this.formatDate(document.tanggalTerbit);
      return [
        index + 1,
        document.nomorDokumen,
        document.judulDokumen,
        document.kategoriDokumen,
        document.bagian,
        tanggalTerbit,
        document.status,
        <div>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href={document.link}
            class="btn btn-primary btn-icon-split btn-sm mr-2 mb-2">
            <span class="icon text-white-50">
              <MdOutlineArrowOutward className="text-gray-300 mb-1" />
            </span>
            <span class="text">Link</span>
          </a>

          <button
            onClick={() => this.detailInfo(document)}
            class="btn btn-info btn-icon-split btn-sm mb-2">
            <span class="icon text-white-50">
              <FaRegEye className="text-gray-300 mb-1" />
            </span>
            <span class="text">Detail</span>
          </button>

          <button
            onClick={() => this.handleEdit(document)}
            class="btn btn-warning btn-icon-split btn-sm">
            <span class="icon text-white-50">
              <MdEdit className="text-gray-300 mb-1" />
            </span>
            <span class="text">Edit</span>
          </button>
        </div>,
      ];
    });

    const dataFilter = documentsFiltered.map((document, index) => {
      const tanggalTerbit = this.formatDate(document.tanggalTerbit);
      return [
        index + 1,
        document.nomorDokumen,
        document.judulDokumen,
        document.kategoriDokumen,
        document.bagian,
        tanggalTerbit,
        document.status,
        <div>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href={document.link}
            class="btn btn-primary btn-icon-split btn-sm mr-2 mb-2">
            <span class="icon text-white-50">
              <MdOutlineArrowOutward className="text-gray-300 mb-1" />
            </span>
            <span class="text">Link</span>
          </a>

          <button
            onClick={() => this.detailInfo(document)}
            class="btn btn-info btn-icon-split btn-sm">
            <span class="icon text-white-50">
              <FaRegEye className="text-gray-300 mb-1" />
            </span>
            <span class="text">Detail</span>
          </button>
        </div>,
      ];
    });

    const options = {
      selectableRows: "none",
      elevation: 0,
      rowsPerPage: 5,
      rowsPerPageOption: [5, 10, 15],
      filterDate: new Date().toLocaleDateString(),
    };

    return (
      <>
        <h1 className="h3 mb-2 text-gray-800">Data Dokumen</h1>
        {isMobile ? (
          <Card />
        ) : (
          <>
            <div className="card shadow mb-4">
              <div className="card-header py-3">
                <div className="row d-flex align-items-center">
                  <div className="col-lg-3">
                    <h6 className="m-0 font-weight-bold text-primary">
                      Tabel Dokumen Kosasih
                    </h6>
                  </div>
                  <div className="col-lg-4">
                    <select
                      className="form-select"
                      aria-label="Default select example"
                      onChange={this.handleSelecet}>
                      <option selected="" value="Semua">
                        Semua Kategori
                      </option>
                      {categories.map((category, index) => (
                        <option key={index} value={category.category}>
                          {category.category}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="col-lg-3 ml-auto">
                    <a
                      rel="noopener noreferrer"
                      target="_blank"
                      href="https://docs.google.com/forms/d/e/1FAIpQLSdzqRS4BmGaDf-E57lsV2qMFI1auYt77jsuCbMOGNTSoWwivw/viewform"
                      className="btn btn-primary btn-icon-split ml-auto">
                      <span className="icon text-white-50">
                        <IoMdAdd />
                      </span>
                      <span className="text">Tambah dokumen</span>
                    </a>
                  </div>
                </div>
              </div>
              <div className="card-body">
                {isLoading ? ( // Tampilkan pesan atau indikator loading jika isLoading true
                  <p>Memuat data...</p>
                ) : isFilter ? (
                  <MUIDataTable
                    className="table table-bordered"
                    id="dataTable"
                    width="100%"
                    cellSpacing={0}
                    title={"Dokument Table"}
                    data={dataFilter}
                    columns={columns}
                    options={options}
                  />
                ) : (
                  <div className="table-responsive">
                    <MUIDataTable
                      className="table table-bordered"
                      id="dataTable"
                      width="100%"
                      cellSpacing={0}
                      title={"Dokument Table"}
                      data={data}
                      columns={columns}
                      options={options}
                    />
                  </div>
                )}
              </div>
            </div>
          </>
        )}
        <DetailInfo
          show={modalShow}
          onHide={() => this.setState({ modalShow: false })}
          documentInfo={documentInfo}
        />
      </>
    );
  }
}

function DetailInfo(props) {
  const { show, onHide, documentInfo } = props;

  const formatDate = (dateString) => {
    try {
      const date = parse(dateString, "M/d/yyyy", new Date());
      return format(date, "dd MMMM yyyy", { locale: id });
    } catch (error) {
      return dateString;
    }
  };

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton></Modal.Header>
      <Modal.Body>
        <h4 className="text-primary fw-bold">{documentInfo.judulDokumen}</h4>
        <h6>
          {documentInfo.kategoriDokumen} <FiMinus />{" "}
          {formatDate(documentInfo.tanggalTerbit)}
        </h6>
        <p>{documentInfo.deskripsiDokumen}</p>
        <p className="text-primary">{documentInfo.bagian}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default Document;
