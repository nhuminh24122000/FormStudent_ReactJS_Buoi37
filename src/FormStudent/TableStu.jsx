import React, { Component } from "react";
import { connect } from "react-redux";

class TableStu extends Component {
    renderThongTinSV = () => {
        let { ttSinhVien, searchList, searchInp } = this.props;
        if (!searchList.length) {
            if (searchInp !== "") {
                return (
                    <tr className="text-center">
                        <td colSpan={5}>Không có kết quả phù hợp!</td>
                    </tr>
                );
            }
            console.log("dssv", ttSinhVien);
            return ttSinhVien.map((sinhvien, index) => {
                return (
                    <tr className="text-center" key={index}>
                        <td>{sinhvien.maSV}</td>
                        <td>{sinhvien.tenSV}</td>
                        <td>{sinhvien.soDienThoai}</td>
                        <td>{sinhvien.email}</td>
                        <td>
                            <button
                                className="btn btn-danger mx-2"
                                onClick={() => {
                                    const action = {
                                        type: "HANDLE_DELETE",
                                        payload: {
                                            sinhvien: sinhvien,
                                            masinhvien: sinhvien.maSV,
                                        },
                                    };
                                    this.props.dispatch(action);
                                }}
                            >
                                Xóa
                            </button>
                            <button
                                className="btn btn-primary"
                                onClick={() => {
                                    //disable để không sửa được mã sinh viên
                                    document.getElementById("maSV").disabled = true;
                                    document.getElementById("create_btn").style.display = "none";
                                    document.getElementById("update_btn").style.display = "block";
                                    const action = {
                                        type: "HANDLE_UPDATE_RENDER",
                                        payload: {
                                            sinhvien: sinhvien,
                                            masinhvien: sinhvien.maSV,
                                        },
                                    };
                                    this.props.dispatch(action);
                                }}
                            >
                                Sửa
                            </button>
                        </td>
                    </tr>
                );
            });
        } else {
            console.log("searchlist nè", searchList);
            return searchList.map((sinhvien, index) => {
                return (
                    <tr className="text-center" key={index}>
                        <td>{sinhvien.maSV}</td>
                        <td>{sinhvien.tenSV}</td>
                        <td>{sinhvien.soDienThoai}</td>
                        <td>{sinhvien.email}</td>
                        <td>
                            <button
                                className="btn btn-danger mx-2"
                                onClick={() => {
                                    const action = {
                                        type: "HANDLE_DELETE",
                                        payload: {
                                            sinhvien: sinhvien,
                                            masinhvien: sinhvien.maSV,
                                        },
                                    };
                                    this.props.dispatch(action);
                                }}
                            >
                                Xóa
                            </button>
                            <button
                                className="btn btn-primary"
                                onClick={() => {
                                    //disable để không sửa được mã sinh viên
                                    document.getElementById("maSV").disabled = true;
                                    document.getElementById("create_btn").style.display = "none";
                                    document.getElementById("update_btn").style.display = "block";
                                    const action = {
                                        type: "HANDLE_UPDATE_RENDER",
                                        payload: {
                                            sinhvien: sinhvien,
                                            masinhvien: sinhvien.maSV,
                                        },
                                    };
                                    this.props.dispatch(action);
                                }}
                            >
                                Sửa
                            </button>
                        </td>
                    </tr>
                );
            });
        }
    };
    render() {
        return (
            <div className="container mt-5">
                <table className="table">
                    <thead className=" bg-dark text-white">
                        <tr className="text-center">
                            <th>Mã sinh viên</th>
                            <th>Họ tên</th>
                            <th>Số điện thoại</th>
                            <th>Email</th>
                            <th>
                                <i className="fa fa-gear"></i>
                            </th>
                        </tr>
                    </thead>
                    <tbody>{this.renderThongTinSV()}</tbody>
                </table>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    ttSinhVien: state.StudentReducer.danhSachSinhVien,
    searchList: state.StudentReducer.searchList,
    searchInp: state.StudentReducer.searchInp,
});

export default connect(mapStateToProps)(TableStu);
