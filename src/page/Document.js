import React, { Component } from "react";
import MUIDataTable from "mui-datatables";

const columns = [
  "Tanggal",
  "Email",
  "Nomor Dokumen",
  "Judul Dokumen",
  "Deskripsi",
  "Kategori",
  "Bagian",
  "Link",
];

const options = {
  filterType: "checkbox",
};

class Document extends Component {
  constructor(props) {
    super(props);
    this.state = {
      baseURL: process.env.REACT_APP_BASEURL,
      apiKey: process.env.REACT_APP_APIKEY,
      documents: [],
    };
  }

  componentDidMount = () => {
    this.getAllDocument();
  };

  getAllDocument = async () => {
    const { baseURL, apiKey } = this.state;
    try {
      const response = await fetch(`${baseURL}/${apiKey}/exec`);
      const data = await response.json();
      if (data && Array.isArray(data.documents)) {
        this.setState({ documents: data.documents.slice(1) });
      } else {
        console.error("Fetched data does not contain a valid documents array");
      }
    } catch (error) {
      console.error("Error fetching documents:", error);
    }
  };

  formatDate(dateString) {
    const date = new Date(dateString);
    const options = { day: "numeric", month: "long", year: "numeric" };
    return new Intl.DateTimeFormat("id-ID", options).format(date);
  }

  render() {
    const { documents } = this.state;
    const data = documents.map((document) => {
      const tanggal = this.formatDate(document.timeStamp);
      return [
        tanggal,
        document.email,
        document.nomorDokumen,
        document.judulDokumen,
        document.deskripsiDokumen,
        document.kategoriDokumen,
        document.bagian,
        <a href={document.link} target="_blank">
          link
        </a>,
      ];
    });

    const options = {
      selectableRows: "none",
      elevation: 0,
      rowsPerPage: 10,
      rowsPerPageOption: [5, 10],
      filterDate: new Date().toLocaleDateString(),
    };

    return (
      <>
        <h1 className="h3 mb-2 text-gray-800">Data Dokumen</h1>
        <div className="card shadow mb-4">
          <div className="card-body">
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
          </div>
        </div>
      </>
    );
  }
}

export default Document;
