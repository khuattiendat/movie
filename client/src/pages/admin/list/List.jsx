import {Link, useLocation, useNavigate, useParams} from "react-router-dom";
import './list.scss';
import DataTable from "../../../components/dataTable/DataTable.jsx";
import {userColumns} from "../../../utils/data/userData.js";
import {useEffect, useState} from "react";
import {getAllUser} from "../../../apis/user.js";
import {toast, ToastContainer} from "react-toastify";
import {useSelector} from "react-redux";
import {getAllCategory} from "../../../apis/category.js";
import {categoryColumns} from "../../../utils/data/categoryData.js";
import {getAllActor} from "../../../apis/actor.js";
import {actorColumns} from "../../../utils/data/actor.js";
import {getAllMovies} from "../../../apis/movie.js";
import {movieColumns} from "../../../utils/data/movieData.js";

const List = ({type}) => {
    const params = useParams()
    const {id} = params;
    const user = useSelector(state => state.user);
    const {state} = useLocation();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [rows, setRows] = useState([]);
    const [columns, setColumns] = useState([]);
    const fetchData = async () => {
        switch (type) {
            case 'user':
                try {
                    setLoading(true);
                    const res = await getAllUser(user?.token);
                    setColumns(userColumns);
                    setRows(res.data);
                    setLoading(false);
                } catch (e) {
                    toast.error(e.response.data.message, {
                        autoClose: 1000,
                    });
                    console.log(e);
                    setLoading(false);
                }
                break;
            case 'category':
                try {
                    setLoading(true);
                    const res = await getAllCategory(user?.token);
                    setColumns(categoryColumns);
                    setRows(res.data);
                    setLoading(false);
                } catch (e) {
                    toast.error(e.response.data.message, {
                        autoClose: 1000,
                    });
                    console.log(e);
                    setLoading(false);
                }
                break;
            case 'actor':
                try {
                    setLoading(true);
                    const res = await getAllActor(user?.token);
                    setColumns(actorColumns);
                    setRows(res.data);
                    setLoading(false);
                } catch (e) {
                    toast.error(e.response.data.message, {
                        autoClose: 1000,
                    });
                    console.log(e);
                    setLoading(false);
                }
                break;
            case 'movie':
                try {
                    setLoading(true);
                    const res = await getAllMovies(user?.token);
                    setColumns(movieColumns);
                    setRows(res.data);
                    setLoading(false);
                } catch (e) {
                    toast.error(e.response.data.message, {
                        autoClose: 1000,
                    });
                    console.log(e);
                    setLoading(false);
                }
                break;
            default:
                break;
        }
    }
    useEffect(() => {
        fetchData();

    }, [state, type])
    return (
        <div className="users">
            <div className="info">
                <h1>{type}</h1>
                <div className='d-flex justify-content-between align-items-center my-3 mx-3'>
                    <Link
                        to={`/admin/${type}/them-moi`}
                        className={'btn btn-secondary'}>Thêm
                        mới {type}</Link>
                </div>

            </div>
            {
                rows.length === 0 && <div className="empty">Không có dữ liệu</div>
            }
            <DataTable loading={loading} type={type} columns={columns} rows={rows}/>
            <ToastContainer/>
        </div>
    );
}
export default List;