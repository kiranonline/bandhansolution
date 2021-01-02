import React,{ useState, useEffect } from 'react';
import { connect } from "react-redux";
import { PageHeader,message,Row,Col,Button, Form,Input, Upload, Select } from 'antd';
import { logout } from "../../actions/authAction"; 
import {loading} from "../../actions/loadingAction";
import { Link } from "react-router-dom";
import {
    LoadingOutlined,
    PlusCircleOutlined,
    MinusCircleOutlined,
    PlusOutlined,
    UnorderedListOutlined
} from '@ant-design/icons';
import ImgCrop from 'antd-img-crop';
import apis from "../../services/apis";
import http from "../../services/httpCall";
import { beforeUpload } from "../../services/beforeUpload";
import Errorhandler from "../../services/errorHandler";
import RichRextEditor from "../../services/TextEditor";
import {EditorState,convertToRaw,ContentState} from 'draft-js';
import "./Product.less";
const { Option } = Select;
const propertyKey = ["KG","GRAM","Pack","Piece","LTR","ML"]

function ProductCreate(props) {
    const [form] = Form.useForm(); 
    const [images,setImages] = useState([{link:null,loading:false,hasremove:false}]);
    const [properties,setProperties] = useState([])
    const [allCategories,setAllCategories] = useState([]);
    const [productDescription, setProductDescription] = useState(() => EditorState.createEmpty())

    const fetchAllCategory = ()=>{
        props.loading(true);
        let body = {
            pageNumber : 1,
            pageSize : 1000
        }
        http.post(apis.LIST_CATEGORY,body).then((result)=>{
            console.log(result.data)
            if(result.data.status){
                setAllCategories(result.data.data);
            }
            else{
                message.error(result.data.message);
            }
        }).catch((err)=>{
            console.log(err);
            Errorhandler(err,props.logout);
        }).finally(()=>{
            props.loading(false);
        })
    }

    const beforeUploadFunction = (file,index)=>{
        beforeUpload(file,['image/jpeg','image/png'],2,()=>{
            let img1 = [...images];
            img1[index]["loading"]=true;
            setImages(img1);
            const formData = new FormData();
            formData.append('image',file);
            http.post(apis.UPLOAD_PRODUCT_IMAGE,formData,{
                headers : {
                    'Content-Type': 'multipart/form-data'
                }
            }).then((result)=>{
                if(result.data.status){
                    let img2 = [...images];
                    img2[index]["link"]=result.data.file;
                    setImages(img2);
                }
                else{
                    message.error(result.data.message);
                }
            }).catch((err)=>{
                console.log(err);
                Errorhandler(err,props.logout);
            }).finally(()=>{
                let img3 = [...images];
                img3[index]["loading"]=false;
                setImages(img3);
            })
            
        })
        return false;
    }

    useEffect(()=>{
        fetchAllCategory();
    },[])

    const onFinish = (data)=>{
        let accepted=true;
        properties.forEach((ele,i)=>{
            if(ele && ele.type && ele.value){
                
            }
            else{
                accepted = false;
            }
        })
        if(isAllImagePresent()){
            if(accepted){
                let raw = convertToRaw(productDescription.getCurrentContent());
                const {name,category,regularPrice,salePrice,productVideo} = data;
                let body = {
                    name,
                    category,
                    regularPrice,
                    salePrice,
                    images : images.map(ele=>ele.link),
                    description : JSON.stringify(raw),
                    properties,
                    productVideo
                }
                console.log(body);
                props.loading(true);
                http.post(apis.CREATE_PRODUCT,body).then((result)=>{
                    if(result.data.status){
                        message.success(result.data.message);
                        form.resetFields();
                        setImages([{link:null,loading:false,hasremove:false}]);
                        const editorState = EditorState.push(productDescription, ContentState.createFromText(''));
                        setProductDescription(editorState);
                    }
                    else{
                        message.error(result.data.message)
                    }
                }).catch((err)=>{
                    console.log(err);
                    Errorhandler(err,props.logout);
                }).finally(()=>{
                    props.loading(false);
                })
            }
            else{
                message.error('Please clear the unwanted properties')   
            }
            
        }
        else{
            message.error('Please upload all images or remove them')   
        }
    }


    const addImage = ()=>{
        let img = [...images];
        let l = img.length;
        if(img[l-1].link){
            img.push({link:null,loading:false,hasremove:true});
            let newImg = img.map(ele=>{
                return {
                    ...ele,
                    hasremove : true
                }
            })
            setImages(newImg);        
        }
        
    }

    const removeImage = (ind)=>{
        let img = [...images];
        let l = img.length;
        if(l>1){
            img.splice(ind, 1);
        }
        if(l==2){
            img[0]["hasremove"]=false;
        }
        setImages(img);
    }

    const isAllImagePresent = ()=>{
        var flag = true;
        images.forEach(ele=>{
            if(!ele.link){
                flag = false;
            }
        })
        return flag
    }


    const addProperty = ()=>{
        let p = [...properties]
        p.push({type:"",value:""})
        setProperties(p)
    }


    const setPropertyType = (index,value)=>{
        let p = [...properties]
        p[index].type=value;
        setProperties(p)
    }
    const changePropertyValue = (index,value)=>{
        let p = [...properties]
        p[index].value=value;
        setProperties(p)
    }

    const removeProperty = (index)=>{
        let p = [...properties]
        p.splice(index, 1);
        setProperties(p)
    }


    return (
        <div className="product-create-wrapper full-width-height">
            <PageHeader
                className="site-page-header-responsive"
                title="Create Product"
                subTitle="Add new Product"
                extra={[<Link to="/admin/dashboard/product/list" key="1"><Button key="1" type="primary"  icon={<UnorderedListOutlined />}>List Products</Button></Link>]}                
            />
            <div className="product-create-from padding-after-page-header" >
                <Form
                    layout="vertical"
                    form={form}
                    onFinish={onFinish}
                    scrollToFirstError={true}
                    className="basic-form product-form"
                >
                    <Row gutter={16}>
                        <Col span="12">
                            <Form.Item 
                                label="Product Name" 
                                name="name"
                                rules={[{ required: true, message: `Please enter the product name` }]}
                            >
                                <Input placeholder="Product Name"  />
                            </Form.Item>                         
                        </Col>
                        <Col span="12">
                            <Form.Item 
                                label="Categories"
                                name="category"

                                rules={[{ required: true, message: `Please select the categories` }]}
                            >
                                <Select
                                    showSearch
                                    placeholder="Select one or more category"
                                    mode="multiple"
                                    filterOption={(input, option) =>
                                        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                    }
                                >
                                    {
                                        allCategories.map((ele,i)=>(
                                            <Select.Option key={i} value={ele._id}>{ele.name}</Select.Option>
                                        ))
                                    }
                                    
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16} style={{marginBottom:'40px'}}>
                        <Col span="24">
                            <RichRextEditor editorState={productDescription} onChange={setProductDescription} />
                        </Col>
                    </Row>
                    <Row gutter={16} style={{marginBottom:'20px'}}>
                        <Col span="8">
                            <Form.Item 
                                label="Regular Price (in rupees)" 
                                name="regularPrice"
                                rules={[{ required: true, message: `Please enter the regular Price` }]}
                            >
                                <Input placeholder="Regular Price" type="number"  />
                            </Form.Item> 
                        </Col>
                        <Col span="8">
                            <Form.Item 
                                label="Sale Price (in rupees)" 
                                name="salePrice"
                            >
                                <Input placeholder="Sale Price" type="number"  />
                            </Form.Item> 
                        </Col>
                        <Col span="8">
                            <Form.Item 
                                label="Product Video( video Id only)" 
                                name="productVideo"
                            >
                                <Input placeholder="Product video( video Id only)"  />
                            </Form.Item>                         
                        </Col>
                    </Row>
                    <p style={{marginBottom:'10px'}}>Product Properties</p>
                    
                        {properties.map((ele,i)=>(
                            <Row gutter={16} key={i} style={{marginBottom:'5px'}}>
                                <Col span="8" >
                                    <Select
                                        showSearch
                                        placeholder="Select a property"
                                        style={{width:"100%"}}
                                        value={ele.type}
                                        filterOption={(input, option) =>
                                            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                        }
                                        onChange={(val)=>setPropertyType(i,val)}
                                    >
                                        <Select.Option key={11111} value={""}>please select a key</Select.Option>
                                        {
                                            
                                            propertyKey.map((eleee,ii)=>(
                                                <Select.Option key={ii} value={eleee}>{eleee}</Select.Option>
                                            ))
                                        }
                                        
                                    </Select>
                                </Col>
                                <Col span="8" >
                                    <Input type="text" onChange={(val)=>changePropertyValue(i,val.target.value)} placeholder="please enter the value" value={ele.value} />
                                </Col>
                                <Col span="8" >
                                    <Button onClick={()=>removeProperty(i)}>
                                        remove
                                    </Button>
                                </Col>
                            </Row>
                            
                        ))}
                    
                    <Row gutter={16} justify="end" style={{marginBottom:'30px'}}>
                        <Col>
                            <Button type="default" onClick={addProperty}>Add Propert</Button>
                        </Col>
                    </Row>


                    <p style={{marginBottom:'10px'}}>Product Images</p>

                    <Row gutter={16}>
                        {images.map((ele,i)=>(
                            <Col span="8" key={i}>
                                <ImgCrop 
                                    grid={true} 
                                    shape="rect"
                                    aspect={0.75}
                                >
                                    <Upload
                                        name={`image${i}`}
                                        listType="picture-card"
                                        className="image-uploader"
                                        showUploadList={false}
                                        beforeUpload={(fl)=>beforeUploadFunction(fl,i)}

                                    >
                                        {
                                            ele.link?<img src={`${apis.BASE_SERVER_URL}${ele.link}`} className="uploaded-image"/>
                                            :
                                            <div>
                                                {ele.loading ? <LoadingOutlined /> : <PlusOutlined />}
                                                <div className="ant-upload-text">Upload</div>
                                            </div>
                                        }
                                    </Upload>
                                </ImgCrop>
                                {ele.hasremove?<Button type="default" onClick={()=>removeImage(i)}>Remove Image</Button>:null}
                            </Col>
                        ))}
                        
                    </Row>
                    <Row gutter={16} justify="end" style={{marginBottom:'30px'}}>
                        <Col>
                            <Button type="default" onClick={addImage}>Add Image</Button>
                        </Col>
                    </Row>
                    <Row justify="end" gutter={16}>
                        <Col>
                            <Form.Item>
                                <Button type="primary" htmlType="submit" >
                                    Create
                                </Button>
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
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
})(ProductCreate);