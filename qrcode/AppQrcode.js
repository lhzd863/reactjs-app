import React, { Component } from 'react';
import { Button,TextareaItem,WingBlank,WhiteSpace } from 'antd-mobile';
import "../../common/common.css";
import QRCode from 'qrcode.react';
import MyHeader from '../../components/MyHeader.js';
import PropTypes from 'prop-types';
import { createForm } from 'rc-form';

class AppQrcode extends Component {

  constructor(props) {
        super(props)
        this.state = {
            qrcode_context: props.qrcode_context || 'tmp'
        }
  }

  handleClickSubmit (e) {
      var input_qrcode_context = this.refs.input_qrcode_context.props.value;
      console.log(input_qrcode_context);
      this.props.qrcodeContextCreater(input_qrcode_context); 
  }

  render() {
    const {qrcode_context} = this.props;
    const { getFieldProps } = this.props.form;
    return (
        <div>
              <MyHeader myheadertitle={ global.constants.const_app_qrcode_title } />
                  <TextareaItem
                      {...getFieldProps('"input_qrcode_context"')}
                      ref = "input_qrcode_context"
                      title={global.constants.const_context}
                      autoHeight
                      labelNumber={5}
                  />
                  <WingBlank>
                      <WhiteSpace/>
                      <Button type="primary" onClick={() => {this.handleClickSubmit();}} >{global.constants.const_submit}</Button>
                      <WhiteSpace/>
                  <div className="am-div home-qrcode-pos">
                     <QRCode value={ qrcode_context }
                          size={200}
                          fgColor="#000000"
                          level="M"
                     />
                  </div>
                   
                  <div> {global.constants.const_context}: {qrcode_context} </div>
                  </WingBlank>
        </div>
    );
  }

  static propTypes = {
      qrcode_context: PropTypes.string,
      qrcodeContextCreater: PropTypes.func
  }
}

const AppQrcodeWrapper = createForm()(AppQrcode);
export default AppQrcodeWrapper;

