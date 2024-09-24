import "./home.scss";
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {toast} from "react-toastify";
import {useSelector} from "react-redux";
import ChartBox from "../../../components/chartBox/ChartBox.jsx";
import {
    chartBoxCategory,
    chartBoxMovie,
    chartBoxActor,
    chartBoxUser
} from "../../../utils/data/index.jsx";
import {getAllUser} from "../../../apis/user.js";
import {getAllMovies} from "../../../apis/movie.js";
import {getAllCategory} from "../../../apis/category.js";
import {getAllActor} from "../../../apis/actor.js";

const HomeAdmin = () => {
    const navigate = useNavigate();
    const user = useSelector(state => state.user);
    const [dataUsers, setDataUsers] = useState(chartBoxUser);
    const [dataMovies, setDataMovies] = useState(chartBoxMovie);
    const [dataCategories, setDataCategories] = useState(chartBoxCategory);
    const [dataActors, setDataActors] = useState(chartBoxActor);
    const fetchApi = async () => {
        try {
            const [users, movies, categories, actors] = await Promise.all([
                getAllUser(user.token),
                getAllMovies(user.token),
                getAllCategory(user.token),
                getAllActor(user.token),
            ]);
            setDataUsers({...dataUsers, number: users.data.length});
            setDataMovies({...dataMovies, number: movies.data.length});
            setDataCategories({...dataCategories, number: categories.data.length});
            setDataActors({...dataActors, number: actors.data.length});
        } catch (error) {
            toast.error(error.response.data.message, {
                autoClose: 1000,
            });
            console.log(error);
        }
    }
    useEffect(() => {
        if (!user || user?.role.toString() !== 'admin') {
            toast.error('Bạn không có quyền truy cập', {
                autoClose: 1000,
            })
            navigate('/admin/login')
        }
        fetchApi();
    }, [])
    return (
        <div className="home mt-3">
            <div className="box box2">
                <ChartBox {...dataUsers} />
            </div>
            <div className="box box3">
                <ChartBox {...dataActors} />
            </div>
            <div className="box box5">
                <ChartBox {...dataMovies} />
            </div>
            <div className="box box6">
                <ChartBox {...dataCategories} />
            </div>
        </div>
    );
};

export default HomeAdmin;
