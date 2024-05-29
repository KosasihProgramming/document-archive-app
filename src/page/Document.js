import React, { Component } from "react";
import MUIDataTable from "mui-datatables";

const columns = [
  "#",
  "Tanggal",
  "Email",
  "Nomor Dokumen",
  "Judul Dokumen",
  "Deskripsi",
  "Kategori",
  "Bagian",
  "Tanggal Terbit",
  "Link",
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
      apiKey: process.env.REACT_APP_APIKEY,
      documents: [],
      isLoading: false,
      isFilter: false,
      filter: "",
      documentsFiltered: [],
    };
  }

  componentDidMount = () => {
    const { baseURL, apiKey } = this.state;
    console.log(baseURL, apiKey);
    this.getAllDocument();
  };

  getAllDocument = async () => {
    const { baseURL, apiKey } = this.state;
    try {
      this.setState({ isLoading: true });
      const response = await fetch(`${baseURL}/${apiKey}/exec`);
      const data = await response.json();
      if (data && Array.isArray(data.documents)) {
        this.setState({ documents: data.documents.slice(1) });
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

    if (filter != "Semua") {
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

  formatDate(dateString) {
    const date = new Date(dateString);
    const options = { day: "numeric", month: "long", year: "numeric" };
    return new Intl.DateTimeFormat("id-ID", options).format(date);
  }

  render() {
    const { documents, isLoading, isFilter, documentsFiltered } = this.state;

    console.log(documents);

    const data = documents.map((document, index) => {
      const tanggal = this.formatDate(document.timeStamp);
      return [
        index + 1,
        tanggal,
        document.email,
        document.nomorDokumen,
        document.judulDokumen,
        document.deskripsiDokumen,
        document.kategoriDokumen,
        document.bagian,
        document.tanggalTerbit,
        <a
          href={document.link}
          className="btn btn-primary btn-sm"
          target="_blank">
          Lihat
        </a>,
      ];
    });

    const dataFilter = documentsFiltered.map((document, index) => {
      const tanggal = this.formatDate(document.timeStamp);
      return [
        index + 1,
        tanggal,
        document.email,
        document.nomorDokumen,
        document.judulDokumen,
        document.deskripsiDokumen,
        document.kategoriDokumen,
        document.bagian,
        document.tanggalTerbit,
        <a
          href={document.link}
          className="btn btn-primary btn-sm"
          target="_blank">
          Lihat
        </a>,
      ];
    });

    const options = {
      selectableRows: "none",
      elevation: 0,
      rowsPerPage: 5,
      rowsPerPageOption: [5, 10],
      filterDate: new Date().toLocaleDateString(),
    };

    return (
      <>
        <h1 className="h3 mb-2 text-gray-800">Data Dokumen</h1>
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
    );
  }
}

export default Document;
