import { Form } from "antd";
import React, {useState, useEffect ,useHistory } from "react";
import {toast} from "react-toastify";
import {updateName, getName} from "./api";
import FormElement from "./Form";
import Loading from "./Loading";
import { useParams , useNavigate} from 'react-router-dom';

const Update = (props) => {
    const [name, setName] = useState("");
    const [loading, setLoading] = useState(false);


    const params = useParams();
    const navigate = useNavigate();
    useEffect(()   => {
        // console.log(params);
        const loadName = () => {
            getName(params.id).then((d) => setName(d.data.name));
        };
        loadName();
        
    }, []);


    

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        updateName(params.id, {name}).then( (res) => {
            setLoading(false);
            setName("");
            navigate('/');
        }).catch((err) => {
            setLoading(false);
            if(err.response.status === 400){
                console.log(err.response.data);
            }
        }); 
       
    };   
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-8">
                    {loading ? <Loading /> : (<h4>Update Name</h4>)}
                    <FormElement
                    handleSubmit={handleSubmit}
                    name={name}
                    setName={setName}
                    />
                </div>
            </div>
        </div>
    );
};

export default Update;