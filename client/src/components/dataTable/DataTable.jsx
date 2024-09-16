import {
    DataGrid,
    GridToolbar,
} from "@mui/x-data-grid";
import "./dataTable.scss";
import {Link, useNavigate} from "react-router-dom";
import {showAlertConfirm} from "../../utils/showAlert.js";
import {toast} from "react-toastify";
import {useEffect, useState} from "react";
import {createAxios} from "../../utils/createInstance.js";
import moment from "moment";
import {deleteUser} from "../../apis/user.js";
import Loading from "../loading/loadingSpin/Loading.jsx";
import {useSelector} from "react-redux";


const DataTable = (props) => {
    const {columns, rows, type, loading} = props;
    const user = useSelector(state => state.user)
    const navigate = useNavigate();
    const [_loading, setLoading] = useState(false);
    const handleDeleteUser = async (id) => {
        try {
            console.log(id)
            console.log(user)
            setLoading(true);
            if (id.toString() === user.id.toString()) {
                toast.error("Không thể xóa tài khoản của bạn", {
                    autoClose: 1000
                });
                return;
            }
            await deleteUser(id);
            toast.success("Xóa thành công", {
                autoClose: 1000
            });
            setLoading(false)
            navigate(`/admin/${type}/danh-sach`, {
                state: id,
            });
        } catch (e) {
            setLoading(false)
            console.log(e);
        }
    }
    const handleDelete = async (id) => {
        let confirm = await showAlertConfirm("Bạn có chắc chắn muốn xóa?", "Dữ liệu sẽ không thể khôi phục");
        if (confirm) {
            switch (type) {
                case "user":
                    await handleDeleteUser(id);
                    break;
                default:
                    break;
            }
        }
    }
    const actionColumn = {
        field: "action",
        headerName: "Action",
        width: 250,
        align: "center",
        renderCell: (params) => {
            return (
                <div className="action">
                    {
                        type !== 'data' &&
                        <Link to={`/admin/${type}/sua/${params.row.id}`}
                              className={'btn btn-secondary'}>
                            Sửa
                        </Link>
                    }

                    <div className="delete" onClick={() => handleDelete(params.row.id)}>
                        <button className='btn btn-danger'>Xóa</button>
                    </div>
                    {
                        type === 'exam' &&
                        <Link to={`/admin/data/${params.row._id}`}
                              className='btn btn-primary'>
                            Data
                        </Link>
                    }

                </div>
            );
        },
    };
    useEffect(() => {
        if (type === 'user') {
            rows.map(row => {
                row.createdAt = moment(row.createdAt).format('DD/MM/YYYY HH:mm:ss')
            })
        }
    }, [type, rows])
    return (
        <div className="dataTable">
            {

                <DataGrid
                    loading={loading || _loading}
                    className="dataGrid"
                    rows={rows}
                    columns={[...columns, actionColumn]}
                    initialState={{
                        pagination: {
                            paginationModel: {
                                pageSize: 9,
                            },
                        },
                    }}
                    slotProps={{
                        toolbar: {
                            showQuickFilter: true,
                            quickFilterProps: {debounceMs: 500},
                        },
                    }}
                    getRowId={(row) => row.id}
                    pageSizeOptions={[5]}
                    checkboxSelection
                    disableRowSelectionOnClick
                    disableColumnFilter
                    disableDensitySelector
                    disableColumnSelector
                    autoHeight
                />
            }
        </div>
    );
};

export default DataTable;
