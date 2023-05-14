const defaultState = {
    sinhVien: {
        maSV: "",
        tenSV: "",
        soDienThoai: "",
        email: "",
    },

    danhSachSinhVien: [
        {
            maSV: "1",
            tenSV: "Nguyễn Văn A",
            soDienThoai: "09381111111",
            email: "nguyenvana@gmail.com",
        },
        {
            maSV: "2",
            tenSV: "Nguyễn Văn B",
            soDienThoai: "09382223223",
            email: "nguyenvanb@gmail.com",
        },
    ],
    validErr: {
        maSV: "",
        tenSV: "",
        soDienThoai: "",
        email: "",
    },
    searchList: [],
    searchInp: "", 
};

export const StudentReducer = (state = defaultState, action) => {
    switch (action.type) {
        case "HANDLE_INPUT": {
            let { id, value, dataType } = action.payload;
            console.log(id, value);

            let inpSinhVien = { ...state.sinhVien };
            inpSinhVien[id] = value;
            state.sinhVien = inpSinhVien;

            let validError = { ...state.validErr };
            let errMess = "";
            if (value.trim() === "") {
                errMess = "Không để trống phần thông tin này!";
            } else {
                if (dataType === "id") {
                    if (state.danhSachSinhVien.find((sv) => sv.maSV === value)) {
                        errMess = "Mã sinh viên đã tồn tại!";
                    }
                    let regexNumberId = /^[0-9]*$/;
                    if (!regexNumberId.test(value)) {
                        errMess = "Mã sinh viên phải là số!";
                    }
                }

                if (dataType === "name") {
                    let regexName =
                        /[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s]+$/;
                    if (!regexName.test(value)) {
                        errMess = "Tên sinh viên phải là chữ";
                    }
                }

                if (dataType === "tel") {
                    let regexTel =
                        /^(0|84)(2(0[3-9]|1[0-6|8|9]|2[0-2|5-9]|3[2-9]|4[0-9]|5[1|2|4-9]|6[0-3|9]|7[0-7]|8[0-9]|9[0-4|6|7|9])|3[2-9]|5[5|6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])([0-9]{7})$/;
                    if (!regexTel.test(value)) {
                        errMess = "Số điện thoại không hợp lệ!";
                    }
                }

                if (dataType === "email") {
                    let regexMail = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
                    if (!regexMail.test(value)) {
                        errMess = "Email không hợp lệ!";
                    }
                }
            }
            validError[id] = errMess;
            state.validErr = validError;

            return { ...state };
        }

        case "HANDLE_CREATE": {
            let valid = true;
            let baoLoi = { ...state.validErr };

            for (let key in baoLoi) {
                if (baoLoi[key] !== "") {
                    valid = false;
                    break;
                }
            }

            for (let key in state.sinhVien) {
                if (state.sinhVien[key] === "") {
                    baoLoi[key] = "Không để trống phần thông tin này!";
                    valid = false;
                }
            }

            let sinhVienTrung = state.danhSachSinhVien.find(
                (sv) => sv.maSV === state.sinhVien.maSV
            );
            console.log("svtrung", sinhVienTrung);
            if (sinhVienTrung) {
                valid = false;
                baoLoi.maSV = "Sinh viên này đã được thêm trước đây!";
            }

            if (!valid) {
                console.log("err", baoLoi);
                state.validErr = baoLoi;
                alert("Dữ liệu không hợp lệ!");
                return { ...state };
            }

            let danhSachUpdate = [...state.danhSachSinhVien];
            danhSachUpdate.push(state.sinhVien);
            state.danhSachSinhVien = danhSachUpdate;
            console.log(valid);
            alert("Thêm sinh viên thành công!");
            return { ...state };
        }

        case "HANDLE_DELETE": {
            let { masinhvien } = action.payload;
            let danhSachSinhVienUpdate = [...state.danhSachSinhVien];
            let sinhVienIndex = danhSachSinhVienUpdate.findIndex(
                (sv) => sv.maSV === masinhvien
            );

            danhSachSinhVienUpdate.splice(sinhVienIndex, 1);
            state.danhSachSinhVien = danhSachSinhVienUpdate;
            state.searchList =
                ""; 
            alert("Xóa sinh viên này thành công");
            return { ...state };
        }

        case "HANDLE_UPDATE_RENDER": {
            let { sinhvien } = action.payload;
            state.sinhVien = sinhvien;
            console.log(state.sinhVien);
            return { ...state };
        }

        case "HANDLE_UPDATE_SUBMIT": {
            let updateDanhSachSV = [...state.danhSachSinhVien];
            let svIndex = updateDanhSachSV.findIndex(
                (sv) => sv.maSV === state.sinhVien.maSV
            );

            updateDanhSachSV[svIndex] = state.sinhVien;
            state.danhSachSinhVien = updateDanhSachSV;
            alert("Cập nhật thành công!");
            state.sinhVien = {
                maSV: "",
                tenSV: "",
                email: "",
                soDienThoai: "",
            };
            return { ...state };
        }
        
        case "HANDLE_SEARCH": {
            let { value } = action.payload;
            state.searchInp = value;
            console.log("......", state.searchInp)
            let searchValue = value.trim().toLowerCase();
            let searchArr = [...state.danhSachSinhVien];
            let SearchArrFilter = searchArr.filter(
                (sv) =>
                    sv.tenSV.toLocaleLowerCase().includes(searchValue) ||
                    sv.maSV.includes(searchValue) ||
                    sv.email.toLowerCase().includes(searchValue) ||
                    sv.soDienThoai.includes(searchValue)
            );
            state.searchList = SearchArrFilter;
            return { ...state };
        }

        default:
            return state;
    }
};
