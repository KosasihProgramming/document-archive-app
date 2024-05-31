import { Component } from "react";
import withRouter from "../withRoutes";
import { GrUpdate } from "react-icons/gr";
import axios from "axios";

const categories = [
  { value: "Surat Keputusan" },
  { value: "Standar Operasional Prosedur" },
  { value: "Kontrak Kerja" },
  { value: "Perizinan" },
  { value: "Kontrak Kerjasama" },
  { value: "Surat Masuk" },
  { value: "Surat Keluar" },
];

const divisions = [
  { value: "Keuangan & Akuntansi" },
  { value: "Operasional Klinik" },
  { value: "Laboratorium" },
  { value: "Griya Terapi Sehat" },
  { value: "Komersil" },
  { value: "IT / Programmer" },
  { value: "HRD" },
];

class DocumentEdit extends Component {
  constructor(props) {
    super(props);
    const id = this.props.params.id;
    this.state = {
      baseURL: process.env.REACT_APP_BASEURL,
      apiKey:
        "AKfycbzkomPnrj-1HCcmG2qksjVOzS30VHCDe2vkE7Q_pIj2LJpgFZyO7DN_ojWEOiOswxVAfg",
      apiKeyUpdate: "",
      id: id,
      document: {
        email: "",
        nomorDokumen: "",
        tanggalTerbit: "",
        judulDokumen: "",
        deskripsiDokumen: "",
        kategoriDokumen: "",
        bagian: [],
        linkAsli: "",
        status: "",
      },
      tanggal: null,
      isLoading: false,
    };
  }

  componentDidMount = () => {
    this.getSingleDocument();
  };

  getSingleDocument = async () => {
    const { id, baseURL, apiKey } = this.state;
    const api = `${baseURL}/${apiKey}/exec`;
    const link = `https://drive.google.com/open?id=${id}`;

    try {
      this.setState({ isLoading: true });
      const response = await fetch(`${api}?link=${link}`);
      const data = await response.json();

      if (response.ok) {
        this.setState({ document: data });
      } else {
        console.error(
          "Failed to fetch document:",
          data.error || response.statusText
        );
      }
    } catch (error) {
      console.error("Error fetching document:", error);
    } finally {
      this.setState({ isLoading: false });
    }
  };

  handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      this.setState((prevState) => {
        const { bagian } = prevState.document;
        if (checked) {
          bagian.push(value);
        } else {
          const index = bagian.indexOf(value);
          if (index > -1) {
            bagian.splice(index, 1);
          }
        }
        return {
          document: {
            ...prevState.document,
            bagian,
          },
        };
      });
    } else {
      this.setState((prevState) => ({
        document: {
          ...prevState.document,
          [name]: value,
        },
      }));
    }
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log({ document: this.state.document });
      const response = await axios.post(
        "https://script.google.com/macros/s/AKfycbx1FB5HDuITSNLXkcawec9ci0FIhHG1ESyvnsfjTzPmYn8zmgEyF-U_OoEdsXCupXINkg/exec",
        this.state.document
      );
      console.log("Response:", response.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  render() {
    const { document, isLoading } = this.state;

    return (
      <>
        <h1 className="h3 mb-2 text-gray-800">Edit Dokumen</h1>
        <div className="row">
          <div className="col-8">
            <div className="card shadow mb-4">
              <div className="card-header py-3">
                <div className="row d-flex align-items-center">
                  <h6 className="m-0 font-weight-bold text-primary">
                    Form update data
                  </h6>
                </div>
              </div>
              <div className="card-body">
                {isLoading ? (
                  <p>Loading..</p>
                ) : (
                  <form encType="multipart/form-data">
                    <div className="mb-3 row">
                      <label className="col-sm-4 col-form-label">Email</label>
                      <div className="col-sm-6">
                        <input
                          type="text"
                          className="form-control"
                          name="email"
                          value={document.email}
                          onChange={this.handleChange}
                        />
                      </div>
                    </div>
                    <div className="mb-3 row">
                      <label className="col-sm-4 col-form-label">
                        Nomor Dokumen
                      </label>
                      <div className="col-sm-6">
                        <input
                          type="text"
                          className="form-control"
                          name="nomorDokumen"
                          value={document.nomorDokumen}
                          onChange={this.handleChange}
                        />
                      </div>
                    </div>
                    <div className="mb-3 row">
                      <label className="col-sm-4 col-form-label">
                        Tanggal Terbit
                      </label>
                      <div className="col-sm-6">
                        <input
                          type="date"
                          className="form-control"
                          name="tanggalTerbit"
                          value={document.tanggalTerbit}
                          onChange={this.handleChange}
                          disabled
                        />
                      </div>
                    </div>
                    <div className="mb-3 row">
                      <label className="col-sm-4 col-form-label">
                        Judul Dokumen
                      </label>
                      <div className="col-sm-6">
                        <input
                          type="text"
                          className="form-control"
                          name="judulDokumen"
                          value={document.judulDokumen}
                          onChange={this.handleChange}
                        />
                      </div>
                    </div>
                    <div className="mb-3 row">
                      <label className="col-sm-4 col-form-label">
                        Deskripsi Dokumen
                      </label>
                      <div className="form-floating col-sm-6">
                        <textarea
                          className="form-control"
                          name="deskripsiDokumen"
                          style={{ height: 100 }}
                          value={document.deskripsiDokumen}
                          onChange={this.handleChange}
                        />
                      </div>
                    </div>
                    <div className="mb-3 row">
                      <label className="col-sm-4 col-form-label">
                        Nama Kategori
                      </label>
                      <div className="col-sm-6">
                        <select
                          className="form-select"
                          name="kategoriDokumen"
                          value={document.kategoriDokumen}
                          onChange={this.handleChange}>
                          <option value="">Pilih Kategori Dokumen</option>
                          {categories.map((category) => (
                            <option key={category.value} value={category.value}>
                              {category.value}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className="mb-3 row">
                      <label className="col-sm-4 col-form-label">Bagian</label>
                      <div className="col-sm-6">
                        {divisions.map((divisi) => (
                          <div className="form-check" key={divisi.value}>
                            <input
                              className="form-check-input"
                              type="checkbox"
                              value={divisi.value}
                              checked={document.bagian.includes(divisi.value)}
                              onChange={this.handleChange}
                            />
                            <label className="form-check-label">
                              {divisi.value}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="mb-3 row">
                      <label className="col-sm-4 col-form-label">
                        Link Dokumen
                      </label>
                      <div className="col-sm-6">
                        <input
                          type="text"
                          className="form-control"
                          name="linkAsli"
                          value={document.linkAsli}
                          onChange={this.handleChange}
                        />
                      </div>
                    </div>
                    {/* <div className="mb-3 row">
                      <label className="col-sm-4 col-form-label">
                        Upload Dokumen
                      </label>
                      <div className="col-sm-6">
                        <input type="file" className="form-control" />
                      </div>
                    </div> */}
                    <div className="mb-3 row">
                      <label className="col-sm-4 col-form-label">
                        Status Dokumen
                      </label>
                      <div className="col-sm-6">
                        <select
                          className="form-select"
                          name="status"
                          value={document.status}
                          onChange={this.handleChange}>
                          <option value="">Pilih Status Dokumen</option>
                          <option value="Masih Berlaku">Masih Berlaku</option>
                          <option value="Tidak Berlaku">Tidak Berlaku</option>
                        </select>
                      </div>
                    </div>
                    <button
                      onClick={this.handleSubmit}
                      className="btn btn-primary btn-icon-split">
                      <span className="icon text-white-50">
                        <GrUpdate />
                      </span>
                      <span className="text">Update</span>
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
          <div className="col-4">
            <div className="card shadow mb-4">
              <div className="card-header py-3">
                <h6 className="m-0 font-weight-bold text-primary">
                  Preview Dokumen
                </h6>
              </div>
              <div className="card-body">
                <iframe
                  src={`${document.link}/preview`}
                  width="100%"
                  height="480"
                  allow="autoplay"></iframe>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default withRouter(DocumentEdit);
