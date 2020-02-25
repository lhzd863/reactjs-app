import React, { Component } from 'react';
import { Toast, WingBlank, WhiteSpace, Button } from 'antd-mobile';
import "../../common/common.css";
import QrCode from "qrcode-reader";
import MyHeader from '../../components/MyHeader.js';
import PropTypes from 'prop-types';

  function  getObjectURL(file) {
     var url = null;
     if (window.createObjectURL !== undefined) {
          url = window.createObjectURL(file);
     } else if (window.URL !== undefined) {
        url = window.URL.createObjectURL(file);
     } else if (window.webkitURL !== undefined) {
          url = window.webkitURL.createObjectURL(file);
     }
     return url;
  }

class AppQrDecode extends Component {
  constructor(props) {
     super(props);
     this.state = {output_context: props.output_context || ''};
  }
  handleClick (e) {
      window.location.href = global.constants.const_url;
  }

  handleClickOutput (e) {
      window.location.href = global.constants.const_url;
  }

  handlerImg() {
     var Img = new Image();
     Img.src="http://122.51.161.53:8080/img/myinfo.JPG";
     Img.onload=function(){
       var canvas = document.createElement("canvas"),
       width=Img.width,
       height=Img.height;
       canvas.width=width;
       canvas.height=height;
       var context = canvas.getContext("2d");
       var data = context.getImageData(0, 0, width, height);
       var qr = new QrCode();
       qr.callback = function(error, result) {
          if(error) {
             console.log(error)
             return;
          }
          console.log(result)
       }
       qr.decode(data);
     };

  }
  
  
  componentDidMount() {
     //this.handlefunc();
  }

  handlefunc() {
    var newfile = document.getElementById('newfile').files;

    //newfile.onchange = function () {
       var qr = new QrCode();
       //console.log(newfile[0]);
       qr.decode(getObjectURL(newfile[0]));
        //console.log(getObjectURL(this.files[0]));
        //qr.decode(getObjectURL(this.files[0]));
        //qr.callback = function (imgMsg) {
        //    alert("二维码解析：" + imgMsg)
        //}
       qr.callback = function(error, obj) {
          if(error) {
             console.log(error)
             Toast.fail('Image QrCode parse failed !!!', 1);
             return;
          }
          //alert(obj.result)
          //this.setState({cardval: obj.result});
          Toast.info(obj.result , 30, null, false);
          
          //this.props.appQrDecodeCreater(obj.result.toString());
       //}
       //qr.decode(getObjectURL(newfile[0]));
    }    

  }
  render() {
    const {output_context} = this.props;
    return (
        <div>
              <MyHeader myheadertitle={ global.constants.const_app_qrcode_decode_title } />
              <WingBlank size="lg">
                  <WhiteSpace size="lg" />
                     <input type="file" id="newfile"  />
                  <WhiteSpace size="lg" />
                  <Button type="primary" onClick={() => {this.handlefunc();}} >{global.constants.const_submit}</Button>
                  <div> {output_context}  </div>
              </WingBlank>
        </div>
    );
  }

  static propTypes = {
    output_context: PropTypes.string,
    appQrDecodeCreater: PropTypes.func
  }

}

export default AppQrDecode;
