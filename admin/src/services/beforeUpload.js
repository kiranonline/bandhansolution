import { message } from 'antd';

export const beforeUpload = (file,extension,size,cb)=>{
    console.log(file.size/1024/1024,file.type)
    const isJpgOrPng = extension.includes(file.type);
    const isLt2M = (file.size / 1024 / 1024) < size;
    if (!isJpgOrPng) {
        message.error('Invalid file type!');
    }
    else{
        if (!isLt2M) {
            message.error('Too large file!');
        }
        else{
            cb();
        }
    }
}