import React, { Component } from 'react';
import { WingBlank, WhiteSpace } from 'antd-mobile';
import "../../common/common.css";
import MyHeader from '../../components/MyHeader.js';
import { Button,Upload,Message} from 'element-react';
import 'element-theme-default';

class AppUpload extends Component {

  handleClickUpload (e) {
      window.location.href = global.constants.const_url;
  }

  handlePreview(file) {
      console.log('preview');
  }

  handleRemove(file, fileList) {
      console.log('remove');
  }

  beforeAvatarUpload(file) {
    const isLt2M = file.size / 1024 / 1024 < 200;

    if (!isLt2M) {
        Message('上传大小不能超过 200MB!');
    }
    return isLt2M;
  }


  render() {
    let accesstoken = '';
    if (JSON.parse(localStorage.getItem('cti') || '[]')[0]===undefined||
        JSON.parse(localStorage.getItem('cti') || '[]')[0].username===undefined){
          accesstoken = global.constants.const_default_accesstoken;
    }else{
          accesstoken = JSON.parse(localStorage.getItem('cti') || '[]')[0].accesstoken;
    }
    return (
        <div>
              <MyHeader myheadertitle={ global.constants.const_upload } />
              <WingBlank size="lg">
                  <WhiteSpace size="lg" />
                  <Upload
                      className="upload-demo"
                      action= {global.constants.const_api_url+"/app/upload?accesstoken="+accesstoken}
                      onPreview={file => this.handlePreview(file)}
                      onRemove={(file, fileList) => this.handleRemove(file, fileList)}
                      limit={30}
                      beforeUpload={file => this.beforeAvatarUpload(file)}
                      multiple={true}
                      onExceed={(files, fileList) => {
                          Message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
                      }}
                      tip={<div className="el-upload__tip">{ global.constants.const_app_upload_tip}</div>}
                  >
                      <Button size="small" type="primary"> { global.constants.const_app_click_upload}</Button>
                  </Upload>
                  <WhiteSpace size="lg" />
              </WingBlank>
        </div>
    );
  }

}

export default AppUpload;
