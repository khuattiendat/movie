import Form from "../../../components/add/Form.jsx";
import "./newUser.scss";
import {useEffect, useState} from "react";
import {inputDataUser} from "../../../utils/data/userData.js";
import {inputDataCategory} from "../../../utils/data/categoryData.js";
import {useNavigate, useParams} from "react-router-dom";
import Loading from "../../../components/loading/loadingSpin/Loading.jsx";
import {useSelector} from "react-redux";
import {getUserById} from "../../../apis/user.js";
import {getCategoryBySlugOrId} from "../../../apis/category.js";
import {getActorById} from "../../../apis/actor.js";
import {inputDataActor} from "../../../utils/data/actor.js";
import {inputDataMovie} from "../../../utils/data/movieData.js";
import {getMovieByIdOrSlug} from "../../../apis/movie.js";

const New = ({type, isEdit}) => {
    const params = useParams();
    const user = useSelector(state => state.user)
    // const user = JSON.parse(sessionStorage.getItem('user'))
    const navigate = useNavigate();
    const {id} = params;
    const [data, setData] = useState({})
    const [columns, setColumns] = useState([])
    const [loading, setLoading] = useState(false)
    // set columns
    useEffect(() => {
        switch (type) {
            case 'user':
                setColumns(inputDataUser)
                break;
            case 'category':
                setColumns(inputDataCategory)
                break;
            case 'actor':
                setColumns(inputDataActor)
                break;
            case 'movie':
                setColumns(inputDataMovie)
                break;
            default:
                break;
        }

    }, [])
    const fetchData = async () => {
        switch (type) {
            case 'user':
                try {
                    setLoading(true)
                    let exam = await getUserById(id);
                    setData(exam.data)
                    setLoading(false)
                } catch (e) {
                    setLoading(false)
                    console.log(e)
                }
                break;
            case 'category':
                try {
                    setLoading(true)
                    let exam = await getCategoryBySlugOrId(id);
                    setData(exam.data)
                    setLoading(false)
                } catch (e) {
                    setLoading(false)
                    console.log(e)
                }
                break;
            case 'actor':
                try {
                    setLoading(true)
                    let exam = await getActorById(id);
                    setData(exam.data)
                    setLoading(false)
                } catch (e) {
                    setLoading(false)
                    console.log(e)
                }
                break;
            case 'movie':
                try {
                    setLoading(true)
                    let exam = await getMovieByIdOrSlug(id);
                    setData(exam.data)
                    setLoading(false)
                } catch (e) {
                    setLoading(false)
                    console.log(e)
                }
                break
            default:
                break;
        }
    }
    useEffect(() => {
        if (isEdit) {
            fetchData();
        }
    }, [id])
    return (
        <div className='newUser'>
            {
                loading ? <Loading/> : (
                    <div>
                        {
                            isEdit && Object.keys(data).length > 0 &&
                            <Form isEdit={isEdit} _data={data} type={type} columns={columns}/>
                        }
                        {
                            !isEdit && <Form type={type} columns={columns}/>
                        }
                    </div>
                )
            }


        </div>
    )
}
export default New;