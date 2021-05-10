import React,{ useState, useEffect } from 'react';
import { connect } from "react-redux";
import { PageHeader,message,Row,Col,Button, Card,Input, Upload, Select } from 'antd';
import { logout } from "../../actions/authAction";
import {loading} from "../../actions/loadingAction";
import {
    PictureOutlined
} from '@ant-design/icons';
import ImgCrop from 'antd-img-crop';
import apis from "../../services/apis";
import http from "../../services/httpCall";
import { beforeUpload } from "../../services/beforeUpload";
import Errorhandler from "../../services/errorHandler";
import "./Poster.less"


function Poster(props) {
    const [posters,setPosters] = useState([])


    const fetchPosters = async()=>{
        try{
            props.loading(true);
            let responses = await http.get(apis.LIST_POSTER);
            console.log(responses.data)
            if(responses.data.status){
                setPosters(responses.data.data)
            }
            else{
                message.error(responses.data.message);
            }
        }
        catch(err){
            console.log(err);
            Errorhandler(err,props.logout);
        }
        finally{
            props.loading(false)
        }
    }


    const beforeUploadFunction = (file)=>{
        props.loading(true)
        beforeUpload(file,['image/jpeg','image/png'],2,()=>{
            const formData = new FormData();
            formData.append('poster',file);
            http.post(apis.UPLOAD_POSTER,formData,{
                headers : {
                    'Content-Type': 'multipart/form-data'
                }
            }).then((result)=>{
                if(result.data.status){
                    setPosters(result.data.data);
                    message.success(result.data.message);
                }
                else{
                    message.error(result.data.message);
                }
            }).catch((err)=>{
                console.log(err);
                Errorhandler(err,props.logout);
            }).finally(()=>{
                props.loading(false)
            })

        })
        return false;
    }


    const deleteMe = async(file)=>{
        try{
            props.loading(true);
            let responses = await http.post(apis.DELETE_POSTER,{file});
            console.log(responses.data)
            if(responses.data.status){
                setPosters(responses.data.data)
            }
            else{
                message.error(responses.data.message);
            }
        }
        catch(err){
            console.log(err);
            Errorhandler(err,props.logout);
        }
        finally{
            props.loading(false)
        }
    }


    useEffect(()=>{
        fetchPosters()
    },[])

    return (
        <div className="poster-list-wrapper full-width-height">
            <PageHeader
                className="site-page-header-responsive"
                title="All Posters"
                subTitle="List all posters"
                extra={[
                    <ImgCrop
                        grid={true}
                        shape="rect"
                        aspect={2.5}
                        key="1"
                    >
                        <Upload
                            name='file'
                            className="poster-uploader"
                            showUploadList={false}
                            beforeUpload={beforeUploadFunction}

                        >
                            <Button  type="primary"  icon={<PictureOutlined />}>Upload Poster</Button>
                        </Upload>
                    </ImgCrop>
                ]}
            />
            <div className="poster-list-inner padding-after-page-header" >
                {posters.length>0?
                    <div>
                        <Row gutter={20}>
                            {posters.map((ele,i)=>
                                <Col key={i} span={8} style={{marginBottom:'20px'}}>
                                    <Card
                                        hoverable
                                        style={{ width: '100%' }}
                                        cover={<img  src={ `${apis.BASE_SERVER_URL}${ele}`} />}


                                    >
                                        <Button onClick={()=>deleteMe(ele)} type="default" style={{width:'100%'}}>Delete</Button>
                                    </Card>
                                </Col>
                            )}
                        </Row>

                    </div>
                    :
                    <div className="no-poster">
                        <h4>No posters are uploaded</h4>
                    </div>
                }
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({
    Auth: state.Auth
});
export default connect(mapStateToProps, {
    logout,
    loading
})(Poster);