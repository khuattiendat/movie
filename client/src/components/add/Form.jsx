import "./add.scss";
import React, {useEffect, useState} from "react";
import {toast, ToastContainer} from "react-toastify";
import {useNavigate} from "react-router-dom";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import '../../styles/custom.scss'
import {CKEditor} from "@ckeditor/ckeditor5-react";
import Loading from "../loading/loadingSpin/Loading.jsx";
import {useSelector} from "react-redux";
import {createUser, updateUser} from "../../apis/user.js";
import {createCategory, updateCategory} from "../../apis/category.js";
import {createActor, updateActor} from "../../apis/actor.js";
import NewMovie from "../newMovie/NewMovie.jsx";

const Form = (props) => {
    const {isEdit, type, columns, _data} = props;
    const user = useSelector(state => state.user)
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    console.log(_data)
    //
    const [data, setData] = useState({});
    useEffect(() => {
        console.log(_data)
        if (isEdit && _data) {
            setData(_data)
        }
    }, [])
    const handleChange = (e) => {
        const {name, value} = e.target;
        setData({...data, [name]: value});
    }
    // user
    const handleCreateUser = async () => {
        try {
            setLoading(true);
            await createUser(data);
            toast.success('Thêm mới thành công');
            setLoading(false);
            navigate(`/admin/user/danh-sach`, {replace: true});
        } catch (e) {
            toast.error(e.response.data.message, {
                autoClose: 1000
            });
            setLoading(false);
            console.log(e)
        }
    }
    const handleUpdateUser = async () => {
        try {
            setLoading(true);
            await updateUser(data.id, data);
            toast.success('Cập nhật thành công');
            setLoading(false);
            navigate(`/admin/user/danh-sach`, {replace: true});
        } catch (e) {
            toast.error(e.response.data.message, {
                autoClose: 1000
            });
            setLoading(false);
            console.log(e)
        }
    }
    // category
    const handleCreateCategory = async () => {
        try {
            setLoading(true);
            await createCategory(data);
            toast.success('Thêm mới thành công');
            setLoading(false);
            navigate(`/admin/category/danh-sach`, {replace: true});
        } catch (e) {
            toast.error(e.response.data.message, {
                autoClose: 1000
            });
            setLoading(false);
            console.log(e)
        }
    }
    const handleUpdateCategory = async () => {
        try {
            setLoading(true);
            await updateCategory(data.id, data);
            toast.success('Cập nhật thành công');
            setLoading(false);
            navigate(`/admin/category/danh-sach`, {replace: true});
        } catch (e) {
            toast.error(e.response.data.message, {
                autoClose: 1000
            });
            setLoading(false);
            console.log(e)
        }
    }
    // actor
    const handleCreateActor = async () => {
        try {
            setLoading(true);
            await createActor(data);
            toast.success('Thêm mới thành công');
            setLoading(false);
            navigate(`/admin/actor/danh-sach`, {replace: true});
        } catch (e) {
            toast.error(e.response.data.message, {
                autoClose: 1000
            });
            setLoading(false);
            console.log(e)
        }
    }
    const handleUpdateActor = async () => {
        try {
            setLoading(true);
            await updateActor(data.id, data);
            toast.success('Cập nhật thành công');
            setLoading(false);
            navigate(`/admin/actor/danh-sach`, {replace: true});
        } catch (e) {
            toast.error(e.response.data.message, {
                autoClose: 1000
            });
            setLoading(false);
            console.log(e)
        }
    }
    //submit
    const handleSubmit = async (e) => {
        e.preventDefault();
        switch (type) {
            case 'user':
                if (isEdit) {
                    await handleUpdateUser();
                    return;
                }
                await handleCreateUser();
                break;
            case 'category':
                if (isEdit) {
                    await handleUpdateCategory();
                    return;
                }
                await handleCreateCategory();
                break;
            case 'actor':
                if (isEdit) {
                    await handleUpdateActor();
                    return;
                }
                await handleCreateActor();
                break;
            default:
                break;
        }
    };
    return (
        <div className="add">
            <div className="_modal">
                <h1>Thêm mới {type}</h1>
                {
                    type !== 'movie' &&
                    <form onSubmit={handleSubmit}>
                        {
                            (isEdit && type === 'user' ? columns.filter(column => column.field !== 'password') : columns)
                                .map((column) => (
                                    <div className="item">
                                        <label>{column.headerName}</label>
                                        <input type={column.type} placeholder={column.headerName}
                                               name={column.field}
                                               required={column.required}
                                               value={data[column?.field]}
                                               onChange={handleChange}
                                        />
                                    </div>
                                ))
                        }
                        <div className='col-12'>
                            {loading ? <Loading/> :
                                <button className='btn btn-success'>{isEdit ? 'Cập nhật' : 'Thêm mới'} </button>
                            }
                        </div>

                    </form>
                }
                {
                    type === 'movie' && <NewMovie isEdit={isEdit} columns={columns} _data={_data}/>
                }

            </div>
            <ToastContainer/>
        </div>
    );
};

export default Form;
