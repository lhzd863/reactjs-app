import React, { Component } from 'react';
import { WingBlank, WhiteSpace,TextareaItem } from 'antd-mobile';
import "../../common/common.css";
import MyHeader from '../../components/MyHeader.js';
import { Button,Upload,Message} from 'element-react';
import 'element-theme-default';
import { Line } from 'react-chartjs-2';
import { createForm } from 'rc-form';
import PropTypes from 'prop-types';


function checkNumber(theObj) {
    var reg = /^[0-9]+.?[0-9]*$/;
    if (reg.test(theObj)) {
        return true;
    }
    return false;
}


class AppTmp extends Component {

  constructor(props) {
      super(props);
      this.state = {xaxis: props.xaxis||['January', 'February', 'March', 'April', 'May', 'June', 'July'],
                    yaxis: props.yaxis||[65, 59, 80, 81, 56, 55, 40],
                    edata: props.edata||[],
                    ctitle: props.ctitle||''
                   };
  }

  handleClickSubmit (e) {
       var input_data = this.refs.input_data.props.value;
       var arr = input_data.split(/[\r\n|\n]/);
       var xarr = new Array();
       var yarr = new Array();
       var earr = new Array();
       for ( var i=0;i<arr.length;i++) {
           if(arr[i].trim().length<1){
              earr.push(i+","+arr[i]);
              continue;
           }
           var subarr = arr[i].split(/[,|;]/);
           if(subarr.length>0&&checkNumber(subarr[1].trim())){
               xarr.push(subarr[0]);
               yarr.push(Number(subarr[1].trim()));
           }
       }
       this.props.arrayXDataCreate(xarr);
       this.props.arrayYDataCreate(yarr);
       this.props.arrayEDataCreate(earr);
       console.log(this.state.xaxis);   
  }

  handleRemove(file, fileList) {
      console.log('remove');
  }


  render() {
    const { getFieldProps } = this.props.form;
    const xaxis0  = this.props.xaxis;
    const yaxis0 = this.props.yaxis;
    const edata = this.props.edata;
    const data = {
        labels: xaxis0,
        datasets: [
        {
          label: 'My First dataset',
          fill: false,
          lineTension: 0.1,
          backgroundColor: 'rgba(75,192,192,0.4)',
          borderColor: 'rgba(75,192,192,1)',
          borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          pointBorderColor: 'rgba(75,192,192,1)',
          pointBackgroundColor: '#fff',
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: 'rgba(75,192,192,1)',
          pointHoverBorderColor: 'rgba(220,220,220,1)',
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: yaxis0
        }
       ]
    };
   
    return (
        <div>
              <MyHeader myheadertitle={ global.constants.const_app_qrcode_decode_title } />
              <WingBlank size="lg">
                  <WhiteSpace size="lg" />
                  <Line
                    data={data}
                    width={100}
                    height={50}
                  />
                  <WhiteSpace size="lg" />
                  <Button type="primary" onClick={() => {this.handleClickSubmit()}} icon="arrow-up"> </Button>
                  <TextareaItem
                      {...getFieldProps('input_data')}
                      ref = "input_data"
                      autoHeight
                      labelNumber={5}
                  />
                  <WhiteSpace size="lg" />
                  {global.constants.const_app_chart_err_title}
                  <WhiteSpace size="lg" />
                  <div>{edata}</div>
                  <WhiteSpace size="lg" />
              </WingBlank>
        </div>
    );
  }

  static propTypes = {
    xaxis: PropTypes.array,
    arrayXDataCreate: PropTypes.func,
    yaxis: PropTypes.array,
    arrayYDataCreate: PropTypes.func,
    edata: PropTypes.array,
    arrayEDataCreate: PropTypes.func,
  }
}
const AppTmpWrapper = createForm()(AppTmp);
export default AppTmpWrapper;
