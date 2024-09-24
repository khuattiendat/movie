import React, {useEffect, useState} from "react";
import Loading from "../loading/loadingSpin/Loading.jsx";
import {getAllCategory} from "../../apis/category.js";
import {getAllActor} from "../../apis/actor.js";
import {toast} from "react-toastify";
import {createMovie, updateMovie} from "../../apis/movie.js";
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";

const NewMovie = (props) => {
    const {isEdit, type, columns, _data} = props;
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(false);
    const user = useSelector(state => state.user);
    const navigate = useNavigate();
    // actor
    const [actorSelected, setActorSelected] = useState([]);
    const [listActor, setListActor] = useState([]);
    const [originalListActor, setOriginalListActor] = useState([]);
    //category
    const [categorySelected, setCategorySelected] = useState([]);
    const [listCategory, setListCategory] = useState([]);
    const [originalListCategory, setOriginalListCategory] = useState([]);
    const fetchApi = async () => {
        try {
            const [actors, categories] = await Promise.all([getAllActor(user?.token), getAllCategory(user?.token)]);
            setOriginalListCategory(categories.data);
            setListCategory(categories.data);
            setOriginalListActor(actors.data);
            setListActor(actors.data);
        } catch (e) {
            toast.error(e.response.data.message, {
                autoClose: 1000
            });
            console.log(e);
        }
    };
    useEffect(() => {
        fetchApi();
        if (isEdit && _data) {
            setData(_data)
            setCategorySelected(_data.categories)
            setActorSelected(_data.actors)
        }
    }, [])
    const handleChange = (e) => {
        const {name, value} = e.target;
        setData({...data, [name]: value});
    }
    // actor
    const handleSearchActor = (e) => {
        const {value} = e.target;
        if (value) {
            const filteredList = originalListActor.filter((category) =>
                category.name.toLowerCase().includes(value.toLowerCase())
            );
            setListActor(filteredList);
        } else {
            setListActor(originalListActor);
        }
    };
    const handleSelectActor = (actor) => {
        if (!actorSelected.some(selectedActor => selectedActor.id === actor.id)) {
            setActorSelected([...actorSelected, actor]);
        }
    };
    const handleRemoveActor = (actorId) => {
        setActorSelected(actorSelected.filter(actor => actor.id !== actorId));
    };
    console.log(actorSelected)
    //category
    const handleSearchCategory = (e) => {
        const {value} = e.target;
        if (value) {
            const filteredList = originalListCategory.filter((category) =>
                category.name.toLowerCase().includes(value.toLowerCase())
            );
            setListCategory(filteredList);
        } else {
            setListCategory(originalListCategory);
        }
    };
    const handleSelectCategory = (category) => {
        if (!categorySelected.some(selectedCategory => selectedCategory.id === category.id)) {
            setCategorySelected([...categorySelected, category]);
        }
    };
    const handleRemoveCategory = (categoryId) => {
        setCategorySelected(categorySelected.filter(category => category.id !== categoryId));
    };
    //submit
    const handleCreateMovie = async () => {
        try {
            setLoading(true)
            if (actorSelected.length === 0 || categorySelected.length === 0) {
                toast.error('Vui lòng chọn diễn viên và thể loại', {
                    autoClose: 1000
                });
                setLoading(false)
                return
            }
            let payload = {
                ...data,
                account_can_view: data.account_can_view || 'often',
                actors: actorSelected,
                categories: categorySelected
            };
            await createMovie(user.token, payload);
            toast.success('Thêm mới thành công', {
                autoClose: 1000
            });
            navigate('/admin/movie/danh-sach', {replace: true});
            setLoading(false);
        } catch (e) {
            toast.error(e.response.data.message, {
                autoClose: 1000
            });
            console.log(e)
        }

    }
    const handleUpdateMovie = async () => {
        try {
            setLoading(true);
            if (actorSelected.length === 0 || categorySelected.length === 0) {
                toast.error('Vui lòng chọn diễn viên và thể loại', {
                    autoClose: 1000
                });
                setLoading(false)
                return;
            }
            let payload = {
                ...data,
                account_can_view: data.account_can_view || 'often',
                actors: actorSelected,
                categories: categorySelected
            };
            await updateMovie(user.token, data.id, payload);
            toast.success('Cập nhật thành công');
            setLoading(false);
            navigate(`/admin/movie/danh-sach`, {replace: true});
        } catch
            (e) {
            toast.error(e.response.data.message, {
                autoClose: 1000
            });
            setLoading(false);
            console.log(e)
        }
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isEdit) {
            handleUpdateMovie();
        } else {
            await handleCreateMovie();
        }
    }
    return (
        <div>
            <form action="" onSubmit={handleSubmit}>
                {
                    columns.map((column) => (
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
                <div className='item'>
                    <label>Người có thể xem</label>
                    <select name="account_can_view" value={data.account_can_view}
                            onChange={handleChange}>
                        <option value="often">Often</option>
                        <option value="vip">Vip</option>
                    </select>
                </div>
                <div className='item'></div>
                <div className='item'>
                    <label>Diễn viên</label>
                    <div className='w-100 item_actor'>
                        <div className='w-100 head'>
                        <span>
                                {
                                    actorSelected.map((actor) => (
                                        <span key={actor.id} className='bg-opacity-50 mx-1'>
                                            <span style={{
                                                cursor: 'pointer',
                                                padding: '0 5px',
                                                borderRadius: '4px',
                                                background: 'red',
                                                color: 'white'
                                            }} onClick={() => handleRemoveActor(actor.id)}>x</span>
                                            {actor.name}
                                        </span>
                                    ))
                                }
                            </span>
                        </div>
                        <div className='content'>
                            <input type="text" onChange={handleSearchActor} placeholder='search diễn viên'
                                   className='w-100'/>
                            <div className='category-list'>
                                {
                                    listActor.map((actor) => (
                                        <div className='category-item'
                                             onClick={() => handleSelectActor(actor)}>
                                            <span>{actor.name}</span>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                </div>
                <div className='item'>
                    <label>Thể loại</label>
                    <div className='w-100 item_actor'>
                        <div className='w-100 head'>
                        <span>
                                {
                                    categorySelected.map((category) => (
                                        <span key={category.id} className='bg-opacity-50 mx-1'>
                                            <span style={{
                                                cursor: 'pointer',
                                                padding: '0 5px',
                                                borderRadius: '4px',
                                                background: 'red',
                                                color: 'white'
                                            }} onClick={() => handleRemoveCategory(category.id)}>x</span>
                                            {category.name}
                                        </span>
                                    ))
                                }
                            </span>
                        </div>
                        <div className='content'>
                            <input type="text" onChange={handleSearchCategory} placeholder='search category'
                                   className='w-100'/>
                            <div className='category-list'>
                                {
                                    listCategory.map((category) => (
                                        <div className='category-item'
                                             onClick={() => handleSelectCategory(category)}>
                                            <span>{category.name}</span>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                </div>
                <div className='col-12'>
                    {loading ? <Loading/> :
                        <button className='btn btn-success'>{isEdit ? 'Cập nhật' : 'Thêm mới'} </button>
                    }
                </div>
            </form>
        </div>
    )
}
export default NewMovie;