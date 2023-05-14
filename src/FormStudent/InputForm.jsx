import React, { Component } from "react";
import { connect } from "react-redux";

class InputForm extends Component {
    getInfo = (e) => {
        let { id, value } = e.target;
        let dataType = e.target.getAttribute("data-type");
        const action = {
            type: "HANDLE_INPUT",
            payload: {
                id: id,
                value: value,
                dataType: dataType,
            },
        };
        this.props.dispatch(action);
    };
    createStudent = (e) => {
        e.preventDefault();
        const action = {
            type: "HANDLE_CREATE",
        };
        this.props.dispatch(action);
    };
    updateSubmit = (e) => {
        e.preventDefault();
        let { sinhVien } = this.props;
        const action = {
            type: "HANDLE_UPDATE_SUBMIT",
            payload: {
                sinhVien: sinhVien,
                masinhvien: sinhVien.maSV,
            },
        };
        this.props.dispatch(action);
        document.getElementById("maSV").disabled = false;
        document.getElementById("update_btn").style.display = "none";
        document.getElementById("create_btn").style.display = "block"
    };
    render() {
        let { err, sinhVien } = this.props;
        return (
            <div className="container">
                <form className="card" onSubmit={this.createStudent}>
                    <div className="card-header bg-dark text-white">
                        <h2>Thông tin sinh viên</h2>
                    </div>
                    <div className="card-body">
                        <div className="row d-flex justify-content-between mb-3">
                            <div className="col-6 d-flex flex-column">
                                <span>Mã sinh viên</span>
                                <input
                                    type="text"
                                    name=""
                                    id="maSV"
                                    data-type="id"
                                    className="form-control"
                                    value={sinhVien.maSV}
                                    onChange={this.getInfo}
                                />
                                <span className="text-danger" style={{ fontSize: 14 }}>
                                    {err.maSV}
                                </span>
                            </div>
                            <div className="col-6 d-flex flex-column">
                                <span>Họ và tên</span>
                                <input
                                    type="text"
                                    name=""
                                    id="tenSV"
                                    data-type="name"
                                    className="form-control"
                                    value={sinhVien.tenSV}
                                    onChange={this.getInfo}
                                />
                                <span className="text-danger" style={{ fontSize: 14 }}>
                                    {err.tenSV}
                                </span>
                            </div>
                        </div>
                        <div className="row d-flex justify-content-between mb-3">
                            <div className="col-6 d-flex flex-column">
                                <span>Số điện thoại</span>
                                <input
                                    type="number"
                                    name=""
                                    id="soDienThoai"
                                    data-type="tel"
                                    className="form-control"
                                    value={sinhVien.soDienThoai}
                                    onChange={this.getInfo}
                                />
                                <span className="text-danger" style={{ fontSize: 14 }}>
                                    {err.soDienThoai}
                                </span>
                            </div>
                            <div className="col-6 d-flex flex-column">
                                <span>Email</span>
                                <input
                                    type="text"
                                    name=""
                                    id="email"
                                    data-type="email"
                                    className="form-control"
                                    value={sinhVien.email}
                                    onChange={this.getInfo}
                                />
                                <span className="text-danger" style={{ fontSize: 14 }}>
                                    {err.email}
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="card-footer bg-default">
                        <button
                            className="btn btn-success my-2"
                            type="submit"
                            onClick={this.createStudent}
                            id="create_btn"
                        >
                            Thêm sinh viên
                        </button>
                        <button
                            className="btn btn-warning my-2"
                            type="submit"
                            onClick={this.updateSubmit}
                            id="update_btn"
                            style={{ display: "none" }}
                        >
                            Cập nhật
                        </button>
                    </div>
                </form>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    err: state.StudentReducer.validErr,
    sinhVien: state.StudentReducer.sinhVien,
});

export default connect(mapStateToProps)(InputForm);
