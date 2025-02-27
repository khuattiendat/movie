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
import {deleteCategory} from "../../apis/category.js";
import {deleteActor} from "../../apis/actor.js";
import {deleteMovie} from "../../apis/movie.js";
import {formatPrice, reverseFormatPrice} from "../../utils/validate.js";
import {MdEdit} from "react-icons/md";
import Modal from "react-bootstrap/Modal";
import {Form} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import {updateTransaction} from "../../apis/transaction.js";

const accountType = (id) => {
    const arr = ['admin', 'user', 'often']
    return arr[id - 1]
}
const TransactionStatus = (status) => {
    const arr = ['Chờ xử lý', 'Hoàn thành']
    return arr[status]
}
const reverseTransactionStatus = (statusText) => {
    const statusMap = {
        'Chờ xử lý': 0,
        'Hoàn thành': 1
    };
    return statusMap[statusText];
};
const DataTable = (props) => {
    const {columns, rows, type, loading} = props;
    const user = useSelector(state => state.user)
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);
    const [_loading, setLoading] = useState(false);
    const [transactionData, setTransactionData] = useState({
        amount: 0,
        status: 0
    });
    const handleShowModal = (data) => {
        setTransactionData({
            id: data.id,
            amount: reverseFormatPrice(data.amount),
            status: reverseTransactionStatus(data.status)
        });
        console.log(transactionData)
        setShowModal(true);
    }
    const handleCloseModal = () => {
        setShowModal(false);
    }


    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setTransactionData({
            ...transactionData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const payload = {
                amount: transactionData.amount,
                status: Number(transactionData.status)
            }
            const res = await updateTransaction(transactionData.id, payload, user.token);
            if (res.error) {
                toast.error(res.message, {
                    autoClose: 1000
                });
                handleCloseModal();
                return;
            }
            toast.success("Cập nhật thành công", {
                autoClose: 1000
            });
            navigate(`/admin/${type}/danh-sach`, {
                state: transactionData.id,
            });

            handleCloseModal();
        } catch (e) {
            toast(e.response.data.message, {
                autoClose: 1000
            })
            console.log(e);
        }
    };

    const handleDeleteUser = async (id) => {
        try {
            setLoading(true);
            if (id.toString() === user.id.toString()) {
                toast.error("Không thể xóa tài khoản của bạn", {
                    autoClose: 1000
                });
                return;
            }
            await deleteUser(user.token, id);
            toast.success("Xóa thành công", {
                autoClose: 1000
            });
            setLoading(false)
            navigate(`/admin/${type}/danh-sach`, {
                state: id,
            });
        } catch (e) {
            toast.error(e.response.data.message, {
                autoClose: 1000
            });
            setLoading(false)
            console.log(e);
        }
    }
    const handleDeleteCategory = async (id) => {
        try {
            setLoading(true);
            await deleteCategory(user.token, id);
            toast.success("Xóa thành công", {
                autoClose: 1000
            });
            setLoading(false)
            navigate(`/admin/${type}/danh-sach`, {
                state: id,
            });
        } catch (e) {
            toast.error(e.response.data.message, {
                autoClose: 1000
            });
            setLoading(false)
            console.log(e);
        }
    }
    const handleDeleteActor = async (id) => {
        try {
            setLoading(true);
            await deleteActor(user?.token, id);
            toast.success("Xóa thành công", {
                autoClose: 1000
            });
            setLoading(false)
            navigate(`/admin/${type}/danh-sach`, {
                state: id,
            });
        } catch (e) {
            toast.error(e.response.data.message, {
                autoClose: 1000
            });
            setLoading(false)
            console.log(e);
        }
    }
    const handleDeleteMovie = async (id) => {
        try {
            setLoading(true);
            await deleteMovie(user.token, id);
            toast.success("Xóa thành công", {
                autoClose: 1000
            });
            setLoading(false)
            navigate(`/admin/${type}/danh-sach`, {
                state: id,
            });
        } catch (e) {
            toast.error(e.response.data.message, {
                autoClose: 1000
            });
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
                case "category":
                    await handleDeleteCategory(id);
                    break;
                case "movie":
                    await handleDeleteMovie(id);
                    break;
                case "actor":
                    await handleDeleteActor(id);
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
                        type !== 'transaction' ? <>
                            {
                                <Link to={`/admin/${type}/sua/${params.row.id}`}
                                      className={'btn btn-secondary'}>
                                    Sửa
                                </Link>
                            }

                            <div className="delete"
                                 onClick={() => handleDelete(params.row.id)}>
                                <button className='btn btn-danger'>Xóa</button>
                            </div>
                        </> : <>
                            <div className="delete"
                                 onClick={() => handleShowModal(params.row)}>
                                <button className='btn btn-secondary d-flex align-items-center'>
                                    <MdEdit size={20}/>
                                    <span className='ms-1'>Edit</span>
                                </button>
                            </div>
                        </>
                    }
                </div>
            );
        },
    };
    useEffect(() => {
        if(type === 'movie'){
            rows.map(row => {
                row.createdAt = moment(row?.createdAt)?.format('DD/MM/YYYY HH:mm:ss')
            })
        }
        if (type === 'user') {
            rows.map(row => {
                row.createdAt = moment(row.createdAt).format('DD/MM/YYYY HH:mm:ss')
                row.account_type = accountType(row?.role_user?.role_id)
            })
        }
        if (type === 'transaction') {
            rows.map(row => {
                row.createdAt = moment(row.createdAt).format('DD/MM/YYYY HH:mm:ss');
                row.status = TransactionStatus(row?.status)
                row.amount = formatPrice(row?.amount)
                row.phone = row?.user?.phone
                row.full_name = row?.user?.full_name
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
                    components={{
                        Toolbar: GridToolbar,
                    }}
                    initialState={{
                        pagination: {
                            paginationModel: {
                                pageSize: 10,
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
            <Modal show={showModal} onHide={handleCloseModal} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Cập nhật giao dịch</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="formAmount">
                            <Form.Label>Tổng tiền</Form.Label>
                            <Form.Control
                                type="number"
                                name="amount"
                                value={transactionData.amount}
                                onChange={handleInputChange}
                                placeholder="Enter Amount"
                            />
                        </Form.Group>
                        <Form.Group controlId="formStatus">
                            <Form.Label>Trạng thái</Form.Label>
                            <Form.Select
                                role="button"
                                name="status"
                                value={transactionData.status}
                                onChange={handleInputChange}
                            >
                                <option role="button" value="0">Chờ xử lý</option>
                                <option role="button" value="1">Hoàn thành</option>
                            </Form.Select>
                        </Form.Group>
                        <div className='d-flex mt-5 w-100 justify-content-center'>
                            <Button variant="primary" type={"submit"} style={{minWidth: '200px'}}
                                    className='btn btn-primary'>
                                Lưu
                            </Button>
                        </div>
                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default DataTable;
